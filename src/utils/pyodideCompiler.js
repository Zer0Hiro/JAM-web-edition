let pyodide = null;
let loadingPromise = null;

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
            renderer = WavRenderer(program)
            wav_bytes = renderer.render_bytes()
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

        renderer = WavRenderer(program)
        wav_bytes = renderer.render_bytes()
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

async function loadPyodideInstance() {
  if (pyodide) return pyodide;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const { loadPyodide: load } = await import("https://cdn.jsdelivr.net/pyodide/v0.27.1/full/pyodide.mjs");
    pyodide = await load();

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

    return pyodide;
  })();

  return loadingPromise;
}

export async function compileJam(source) {
  const py = await loadPyodideInstance();
  py.globals.set("_source", source);
  const result = py.runPython(`_compile(_source)`);
  return JSON.parse(result);
}

export async function previewJam(source) {
  const py = await loadPyodideInstance();
  py.globals.set("_source", source);
  const result = py.runPython(`_preview(_source)`);
  return JSON.parse(result);
}

export function isLoaded() {
  return pyodide !== null;
}

export { loadPyodideInstance as initPyodide };
