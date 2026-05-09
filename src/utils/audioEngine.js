/**
 * Web Audio API engine for previewing JEM compositions in the browser.
 *
 * This creates a simple synthesizer that plays back the flat event list
 * produced by the JEM parser. It approximates the Mozzi output using
 * the standard Web Audio API oscillator nodes and gain envelopes.
 */

const WAVE_MAP = {
  SIN: "sine",
  SAW: "sawtooth",
  SQUARE: "square",
  TRIANGLE: "triangle",
  NOISE: "sine", // We'll fake noise with a noise buffer
};

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.scheduledNodes = [];
    this.onProgress = null;
    this.onComplete = null;
    this._progressInterval = null;
    this._startTime = 0;
    this._totalDuration = 0;
    this._lastFreq = {};
  }

  _ensureContext() {
    if (!this.ctx || this.ctx.state === "closed") {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  /**
   * Create a noise buffer node (since Web Audio doesn't have a noise oscillator).
   */
  _createNoiseNode(duration) {
    const bufferSize = this.ctx.sampleRate * Math.max(duration, 0.1);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const node = this.ctx.createBufferSource();
    node.buffer = buffer;
    node.loop = false;
    return node;
  }

  _scheduleNote(event, startTime) {
    const durationS = event.durationMs / 1000;
    const [attackMs, decayMs, sustainMs, releaseMs] = event.adsr;
    const attackS = attackMs / 1000;
    const decayS = decayMs / 1000;
    const releaseS = releaseMs / 1000;
    const totalS = durationS + releaseS + 0.05;

    let source;
    if (event.wave === "NOISE") {
      source = this._createNoiseNode(totalS);
    } else {
      source = this.ctx.createOscillator();
      source.type = WAVE_MAP[event.wave] || "sine";

      const instName = event.instrument || "_default";
      const prevFreq = this._lastFreq[instName];
      const glideMs = event.glide || 0;

      if (glideMs > 0 && prevFreq && prevFreq !== event.freq) {
        source.frequency.setValueAtTime(prevFreq, startTime);
        source.frequency.exponentialRampToValueAtTime(
          event.freq, startTime + glideMs / 1000
        );
      } else {
        source.frequency.setValueAtTime(event.freq, startTime);
      }
      this._lastFreq[instName] = event.freq;
    }

    // Build audio chain: source → [filter] → gain → [delay] → [pan] → destination
    const gainNode = this.ctx.createGain();
    const masterGain = event.volume * 0.3;

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(masterGain, startTime + attackS);
    const sustainLevel = masterGain * 0.7;
    gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackS + decayS);
    gainNode.gain.setValueAtTime(sustainLevel, startTime + durationS);
    gainNode.gain.linearRampToValueAtTime(0, startTime + durationS + releaseS);

    let lastNode = source;

    if (event.cutoff) {
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(event.cutoff, startTime);
      filter.Q.setValueAtTime(event.resonance ? event.resonance / 25.5 : 0.7, startTime);
      lastNode.connect(filter);
      lastNode = filter;
    }

    lastNode.connect(gainNode);
    lastNode = gainNode;

    if (event.delayTime > 0) {
      const dry = this.ctx.createGain();
      dry.gain.setValueAtTime(1, startTime);
      const wet = this.ctx.createGain();
      wet.gain.setValueAtTime((event.delayFeedback || 0) / 255 * 0.7, startTime);
      const delayNode = this.ctx.createDelay(2.0);
      delayNode.delayTime.setValueAtTime(event.delayTime / 1000, startTime);
      const feedback = this.ctx.createGain();
      feedback.gain.setValueAtTime((event.delayFeedback || 0) / 255 * 0.6, startTime);

      lastNode.connect(dry);
      lastNode.connect(delayNode);
      delayNode.connect(feedback);
      feedback.connect(delayNode);
      delayNode.connect(wet);

      const merger = this.ctx.createGain();
      dry.connect(merger);
      wet.connect(merger);
      lastNode = merger;
    }

    if (event.reverb > 0) {
      const dry = this.ctx.createGain();
      const wetGain = this.ctx.createGain();
      const reverbMix = (event.reverb || 0) / 255;
      dry.gain.setValueAtTime(1 - reverbMix * 0.5, startTime);
      wetGain.gain.setValueAtTime(reverbMix * 0.5, startTime);

      const d1 = this.ctx.createDelay(0.5);
      d1.delayTime.setValueAtTime(0.03, startTime);
      const d2 = this.ctx.createDelay(0.5);
      d2.delayTime.setValueAtTime(0.05, startTime);
      const d3 = this.ctx.createDelay(0.5);
      d3.delayTime.setValueAtTime(0.08, startTime);

      lastNode.connect(dry);
      lastNode.connect(d1);
      lastNode.connect(d2);
      lastNode.connect(d3);
      const merger = this.ctx.createGain();
      dry.connect(merger);
      d1.connect(wetGain);
      d2.connect(wetGain);
      d3.connect(wetGain);
      wetGain.connect(merger);
      lastNode = merger;
    }

    const pan = event.pan ?? 127;
    if (pan !== 127) {
      const panner = this.ctx.createStereoPanner();
      panner.pan.setValueAtTime((pan - 127) / 127, startTime);
      lastNode.connect(panner);
      lastNode = panner;
    }

    lastNode.connect(this.ctx.destination);

    source.start(startTime);
    source.stop(startTime + totalS);
    this.scheduledNodes.push(source);
  }

  /**
   * Play a list of events produced by flattenToEvents().
   */
  play(events) {
    this.stop();
    this._ensureContext();
    this._lastFreq = {};

    let currentTime = this.ctx.currentTime + 0.1; // Small buffer
    this._startTime = currentTime;

    for (const event of events) {
      if (event.type === "rest") {
        currentTime += event.durationMs / 1000;
      } else if (event.type === "note") {
        this._scheduleNote(event, currentTime);
        if (!event.simultaneous) {
          currentTime += event.durationMs / 1000;
        }
      }
    }

    this._totalDuration = currentTime - this._startTime;
    this.isPlaying = true;

    // Progress tracking
    if (this.onProgress) {
      this._progressInterval = setInterval(() => {
        if (!this.ctx || !this.isPlaying) return;
        const elapsed = this.ctx.currentTime - this._startTime;
        const progress = Math.min(1, elapsed / this._totalDuration);
        this.onProgress(progress);
        if (progress >= 1) {
          this.isPlaying = false;
          clearInterval(this._progressInterval);
          if (this.onComplete) this.onComplete();
        }
      }, 50);
    }

    // Auto-stop after total duration
    const stopTimer = setTimeout(() => {
      this.isPlaying = false;
      if (this.onComplete) this.onComplete();
    }, this._totalDuration * 1000 + 200);

    this._stopTimer = stopTimer;
  }

  /**
   * Stop all currently playing sounds.
   */
  stop() {
    this.isPlaying = false;
    clearInterval(this._progressInterval);
    clearTimeout(this._stopTimer);

    for (const node of this.scheduledNodes) {
      try {
        node.stop();
      } catch (e) {
        // Already stopped
      }
    }
    this.scheduledNodes = [];
  }

  /**
   * Get the total duration of the last played sequence.
   */
  getTotalDuration() {
    return this._totalDuration;
  }

  /**
   * Clean up resources.
   */
  destroy() {
    this.stop();
    if (this.ctx && this.ctx.state !== "closed") {
      this.ctx.close();
    }
  }
}

// Singleton instance
let _instance = null;
export function getAudioEngine() {
  if (!_instance) {
    _instance = new AudioEngine();
  }
  return _instance;
}
