let worker = null;
let msgId = 0;
let ready = false;
let readyPromise = null;
let readyResolve = null;
const pending = new Map();

function getWorker() {
  if (!worker) {
    readyPromise = new Promise((resolve) => { readyResolve = resolve; });
    worker = new Worker("/pyodideWorker.js");
    worker.onmessage = (e) => {
      const { id, result, error, ready: isReady, progress } = e.data;

      if (isReady) {
        ready = true;
        if (readyResolve) readyResolve();
        return;
      }

      const handler = pending.get(id);
      if (!handler) return;

      if (progress !== undefined) {
        if (handler.onProgress) handler.onProgress(progress);
        return;
      }

      pending.delete(id);
      if (error) {
        handler.reject(new Error(error));
      } else {
        handler.resolve(result);
      }
    };
    worker.onerror = (e) => {
      for (const [id, handler] of pending) {
        handler.reject(new Error(e.message || "Worker error"));
        pending.delete(id);
      }
    };
  }
  return worker;
}

async function callWorker(action, source, onProgress) {
  getWorker();
  if (!ready) await readyPromise;
  return new Promise((resolve, reject) => {
    const id = ++msgId;
    pending.set(id, { resolve, reject, onProgress });
    worker.postMessage({ id, action, source });
  });
}

export function compileJam(source) {
  return callWorker("compile", source);
}

export function previewJam(source) {
  return callWorker("preview", source);
}

/** Full-quality 44.1kHz render. onProgress receives a fraction in [0, 1]. */
export function renderFullJam(source, onProgress) {
  return callWorker("renderFull", source, onProgress);
}

/** Composition duration in seconds (cheap — no audio rendered). */
export function estimateDuration(source) {
  return callWorker("estimate", source);
}

/**
 * Abort all in-flight work by killing the worker. Pyodide re-initializes
 * lazily on the next call (takes a few seconds).
 */
export function cancelAll() {
  if (worker) {
    worker.terminate();
    worker = null;
    ready = false;
    readyPromise = null;
    readyResolve = null;
    for (const [id, handler] of pending) {
      handler.reject(new Error("cancelled"));
      pending.delete(id);
    }
  }
}

export function initPyodide() {
  getWorker();
}

export function isReady() {
  return ready;
}
