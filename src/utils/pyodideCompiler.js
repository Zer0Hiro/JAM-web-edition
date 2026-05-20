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
      const { id, result, error, ready: isReady } = e.data;

      if (isReady) {
        ready = true;
        if (readyResolve) readyResolve();
        return;
      }

      const handler = pending.get(id);
      if (!handler) return;
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

async function callWorker(action, source) {
  getWorker();
  if (!ready) await readyPromise;
  return new Promise((resolve, reject) => {
    const id = ++msgId;
    pending.set(id, { resolve, reject });
    worker.postMessage({ id, action, source });
  });
}

export function compileJam(source) {
  return callWorker("compile", source);
}

export function previewJam(source) {
  return callWorker("preview", source);
}

export function initPyodide() {
  getWorker();
}

export function isReady() {
  return ready;
}
