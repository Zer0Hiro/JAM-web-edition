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

  /**
   * Schedule a single note event.
   */
  _scheduleNote(event, startTime) {
    const durationS = event.durationMs / 1000;
    const [attackMs, decayMs, sustainMs, releaseMs] = event.adsr;
    const attackS = attackMs / 1000;
    const decayS = decayMs / 1000;
    const releaseS = releaseMs / 1000;

    // Create oscillator or noise source
    let source;
    if (event.wave === "NOISE") {
      source = this._createNoiseNode(durationS + releaseS);
    } else {
      source = this.ctx.createOscillator();
      source.type = WAVE_MAP[event.wave] || "sine";
      source.frequency.setValueAtTime(event.freq, startTime);
    }

    // Create gain envelope
    const gainNode = this.ctx.createGain();
    const masterGain = event.volume * 0.3; // Scale down to avoid clipping

    // ADSR envelope
    gainNode.gain.setValueAtTime(0, startTime);
    // Attack
    gainNode.gain.linearRampToValueAtTime(masterGain, startTime + attackS);
    // Decay to sustain level
    const sustainLevel = masterGain * 0.7;
    gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackS + decayS);
    // Sustain (hold until note end)
    gainNode.gain.setValueAtTime(sustainLevel, startTime + durationS);
    // Release
    gainNode.gain.linearRampToValueAtTime(0, startTime + durationS + releaseS);

    source.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    source.start(startTime);
    source.stop(startTime + durationS + releaseS + 0.05);

    this.scheduledNodes.push(source);
  }

  /**
   * Play a list of events produced by flattenToEvents().
   */
  play(events) {
    this.stop();
    this._ensureContext();

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
