const DSL_MODULES = [
  "__init__",
  "ast_nodes",
  "lexer",
  "notes",
  "parser",
  "semantic",
  "codegen",
  "wav_backend",
];

const COMPILER_FUNCTIONS = `
import json, base64
from dsl.parser import parse, ParseError
from dsl.lexer import LexerError
from dsl.semantic import validate
from dsl.codegen import generate
from dsl.wav_backend import WavRenderer

# Overridden from JS per request with a callback posting progress messages
_js_progress = lambda frac: None

def _compile(source):
    result = {"success": False, "cpp": None, "wav_b64": None, "error": None, "warnings": None}
    try:
        program = parse(source)
        validation = validate(program)
        if not validation.ok:
            errors = [str(d) for d in validation.diagnostics if "ERROR" in str(d).upper() or "error" in str(d).lower()]
            if not errors:
                errors = [str(d) for d in validation.diagnostics]
            result["error"] = "; ".join(errors) if errors else "Validation failed"
            return json.dumps(result)

        if validation.warnings:
            result["warnings"] = [str(d) for d in validation.warnings]

        cpp_code = generate(program)
        result["cpp"] = cpp_code
        result["success"] = True

        try:
            renderer = WavRenderer(program, sample_rate=PREVIEW_SAMPLE_RATE)
            wav_bytes = renderer.render_bytes(progress_cb=_js_progress)
            result["wav_b64"] = base64.b64encode(wav_bytes).decode("ascii")
        except Exception:
            pass

        return json.dumps(result)
    except LexerError as e:
        result["error"] = f"Lexer error: {e}"
    except ParseError as e:
        result["error"] = f"Parse error: {e}"
    except Exception as e:
        result["error"] = f"Unexpected error: {e}"
    return json.dumps(result)

PREVIEW_SAMPLE_RATE = 22050  # half rate: ~2x faster render for in-editor playback

def _preview(source):
    result = {"success": False, "wav_b64": None, "error": None, "warnings": None}
    try:
        program = parse(source)
        validation = validate(program)
        if not validation.ok:
            errors = [str(d) for d in validation.diagnostics if "ERROR" in str(d).upper() or "error" in str(d).lower()]
            if not errors:
                errors = [str(d) for d in validation.diagnostics]
            result["error"] = "; ".join(errors) if errors else "Validation failed"
            return json.dumps(result)

        if validation.warnings:
            result["warnings"] = [str(d) for d in validation.warnings]

        renderer = WavRenderer(program, sample_rate=PREVIEW_SAMPLE_RATE)
        wav_bytes = renderer.render_bytes(progress_cb=_js_progress)
        result["wav_b64"] = base64.b64encode(wav_bytes).decode("ascii")
        result["success"] = True
        return json.dumps(result)
    except LexerError as e:
        result["error"] = f"Lexer error: {e}"
    except ParseError as e:
        result["error"] = f"Parse error: {e}"
    except Exception as e:
        result["error"] = f"Unexpected error: {e}"
    return json.dumps(result)

def _estimate_duration(source):
    """Return the composition duration in seconds (for render-time estimates)."""
    result = {"success": False, "duration_s": 0.0, "error": None}
    try:
        program = parse(source)
        validation = validate(program)
        if not validation.ok:
            result["error"] = "Validation failed"
            return json.dumps(result)
        result["duration_s"] = WavRenderer(program).total_duration_s()
        result["success"] = True
    except Exception as e:
        result["error"] = str(e)
    return json.dumps(result)

def _render_full(source):
    """Full-quality 44.1kHz render with progress reported via _js_progress."""
    result = {"success": False, "wav_b64": None, "error": None, "warnings": None}
    try:
        program = parse(source)
        validation = validate(program)
        if not validation.ok:
            errors = [str(d) for d in validation.diagnostics if "ERROR" in str(d).upper() or "error" in str(d).lower()]
            if not errors:
                errors = [str(d) for d in validation.diagnostics]
            result["error"] = "; ".join(errors) if errors else "Validation failed"
            return json.dumps(result)

        if validation.warnings:
            result["warnings"] = [str(d) for d in validation.warnings]

        renderer = WavRenderer(program)  # full 44100 Hz
        wav_bytes = renderer.render_bytes(progress_cb=_js_progress)
        result["wav_b64"] = base64.b64encode(wav_bytes).decode("ascii")
        result["success"] = True
        return json.dumps(result)
    except LexerError as e:
        result["error"] = f"Lexer error: {e}"
    except ParseError as e:
        result["error"] = f"Parse error: {e}"
    except Exception as e:
        result["error"] = f"Unexpected error: {e}"
    return json.dumps(result)
`;

let pyodide = null;

async function initPyodide() {
  if (pyodide) return;

  importScripts("https://cdn.jsdelivr.net/pyodide/v0.27.1/full/pyodide.js");
  pyodide = await loadPyodide();

  const moduleContents = {};
  await Promise.all(
    DSL_MODULES.map(async (name) => {
      const resp = await fetch(`/dsl/${name}.py`);
      if (!resp.ok) throw new Error(`Failed to fetch dsl/${name}.py: ${resp.status}`);
      moduleContents[name] = await resp.text();
    })
  );

  pyodide.runPython(`
import sys, os
os.makedirs('/home/pyodide/dsl', exist_ok=True)
`);

  for (const [name, content] of Object.entries(moduleContents)) {
    pyodide.FS.writeFile(`/home/pyodide/dsl/${name}.py`, content);
  }

  pyodide.runPython(`
import sys
if '/home/pyodide' not in sys.path:
    sys.path.insert(0, '/home/pyodide')
`);

  pyodide.runPython(COMPILER_FUNCTIONS);

  // Pre-warm: run a tiny compile so all imports are fully cached
  pyodide.globals.set("_source", "BPM 120\nINSTRUMENT s:\n  TYPE SYNTH\n  WAVE SIN\n  VOLUME 100\nSEQUENCE q:\n  PLAY C4 0.25\nPLAY_SEQUENCE q s");
  pyodide.runPython(`_preview(_source)`);

  self.postMessage({ id: 0, ready: true });
}

// Start init immediately when worker loads
initPyodide().catch((err) => {
  self.postMessage({ id: 0, error: "Init failed: " + err.message });
});

const ACTION_FNS = {
  compile: "_compile",
  preview: "_preview",
  renderFull: "_render_full",
  estimate: "_estimate_duration",
};

self.onmessage = async (e) => {
  const { id, action, source } = e.data;
  try {
    await initPyodide();
    pyodide.globals.set("_source", source);

    // Stream render progress back to the main thread (throttled to ~1% steps)
    if (action === "renderFull" || action === "preview" || action === "compile") {
      let lastSent = -1;
      pyodide.globals.set("_js_progress", (frac) => {
        const pct = Math.floor(frac * 100);
        if (pct !== lastSent) {
          lastSent = pct;
          self.postMessage({ id, progress: frac });
        }
      });
    } else {
      pyodide.globals.set("_js_progress", () => {});
    }

    const fn = ACTION_FNS[action] || "_preview";
    const result = pyodide.runPython(`${fn}(_source)`);
    self.postMessage({ id, result: JSON.parse(result) });
  } catch (err) {
    self.postMessage({ id, error: err.message });
  }
};
