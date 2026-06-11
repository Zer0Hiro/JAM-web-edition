/**
 * Tiny global audio bus: the WAV player publishes its AnalyserNode here so
 * three.js scenes can render audio-reactive visuals without prop drilling.
 */

let analyser = null;
let freqData = null;

export function setAnalyser(node) {
  analyser = node;
  freqData = node ? new Uint8Array(node.frequencyBinCount) : null;
}

export function clearAnalyser() {
  analyser = null;
  freqData = null;
}

/** True while audio is playing and an analyser is available. */
export function hasAnalyser() {
  return analyser !== null;
}

/**
 * Latest frequency spectrum (Uint8Array, 0-255 per bin) or null when idle.
 * Reuses one buffer — callers must not hold references across frames.
 */
export function getFrequencyData() {
  if (!analyser) return null;
  analyser.getByteFrequencyData(freqData);
  return freqData;
}

/** Average level 0..1 of the lowest quarter of the spectrum (bass thump). */
export function getBassLevel() {
  const data = getFrequencyData();
  if (!data) return 0;
  const n = Math.max(1, data.length >> 2);
  let sum = 0;
  for (let i = 0; i < n; i++) sum += data[i];
  return sum / (n * 255);
}
