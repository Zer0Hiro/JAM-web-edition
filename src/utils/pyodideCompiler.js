let worker = null;
let msgId = 0;
const pending = new Map();

function getWorker() {
  if (!worker) {
    worker = new Worker("/pyodideWorker.js");
    worker.onmessage = (e) => {
      const { id, result, error } = e.data;
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

function callWorker(action, source) {
  return new Promise((resolve, reject) => {
    const id = ++msgId;
    pending.set(id, { resolve, reject });
    getWorker().postMessage({ id, action, source });
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

export function isLoaded() {
  return worker !== null;
}
