#!/usr/bin/env python3
"""
JAM Compile Server -- Flask backend for the JAM web editor.

Provides API endpoints to:
- Compile .jam source to Mozzi 2.0 C++ (via the jamDsl compiler)
- Render .jam source to WAV audio (for in-browser preview)

Run:
    python3 server/app.py

The server listens on port 5050 by default. The Vite dev server proxies
/api/* requests to this backend.
"""

import io
import base64
import sys
import traceback
from pathlib import Path

# Add the jamDsl project to the Python path so we can import the compiler
DSL_PATH = Path(__file__).resolve().parent.parent.parent / "jamDsl"
if str(DSL_PATH) not in sys.path:
    sys.path.insert(0, str(DSL_PATH))

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def compile_source(source: str) -> dict:
    """Compile JAM source to C++ and optionally to WAV.

    Args:
        source: The .jam source code.

    Returns:
        Dict with 'success', 'cpp', 'wav_b64', and 'error' keys.
    """
    from dsl.parser import parse, ParseError
    from dsl.lexer import LexerError
    from dsl.semantic import validate
    from dsl.codegen import generate
    from dsl.wav_backend import WavRenderer

    result = {"success": False, "cpp": None, "wav_b64": None, "error": None}

    try:
        # Parse
        program = parse(source)

        # Validate
        validation = validate(program)
        if not validation.ok:
            errors = [str(d) for d in validation.diagnostics if "ERROR" in str(d).upper() or "error" in str(d).lower()]
            if not errors:
                errors = [str(d) for d in validation.diagnostics]
            result["error"] = "; ".join(errors) if errors else "Validation failed"
            return result

        # Generate C++
        cpp_code = generate(program)
        result["cpp"] = cpp_code
        result["success"] = True

        # Generate WAV preview
        try:
            renderer = WavRenderer(program)
            wav_bytes = renderer.render_bytes()
            result["wav_b64"] = base64.b64encode(wav_bytes).decode("ascii")
        except Exception as wav_err:
            # WAV generation is optional -- don't fail the whole compile
            app.logger.warning(f"WAV render failed: {wav_err}")

        return result

    except LexerError as e:
        result["error"] = f"Lexer error: {e}"
    except ParseError as e:
        result["error"] = f"Parse error: {e}"
    except Exception as e:
        result["error"] = f"Unexpected error: {e}"
        app.logger.error(traceback.format_exc())

    return result


@app.route("/api/compile", methods=["POST"])
def api_compile():
    """Compile JAM source to C++ and WAV.

    Request body: { "source": "<jam code>" }
    Response: { "success": bool, "cpp": str|null, "wav_b64": str|null, "error": str|null }
    """
    data = request.get_json(silent=True)
    if not data or "source" not in data:
        return jsonify({"success": False, "error": "Missing 'source' in request body"}), 400

    source = data["source"]
    if len(source) > 50000:
        return jsonify({"success": False, "error": "Source too large (max 50KB)"}), 400

    result = compile_source(source)
    return jsonify(result)


@app.route("/api/health", methods=["GET"])
def api_health():
    """Health check endpoint."""
    return jsonify({"status": "ok", "compiler": "jamDsl"})


if __name__ == "__main__":
    print("JAM Compile Server starting on http://localhost:5050")
    print(f"DSL path: {DSL_PATH}")
    app.run(host="0.0.0.0", port=5050, debug=True)
