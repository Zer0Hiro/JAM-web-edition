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
import shutil
import subprocess
import traceback
import os
from pathlib import Path

# Add the jamDsl project to the Python path so we can import the compiler
DSL_PATH = Path(__file__).resolve().parent.parent.parent / "jamDsl"
if str(DSL_PATH) not in sys.path:
    sys.path.insert(0, str(DSL_PATH))

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

try:
    from server.jamai_chat_routes import jamai_chat_bp
except ImportError:
    from jamai_chat_routes import jamai_chat_bp

app.register_blueprint(jamai_chat_bp)


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


@app.route("/api/preview", methods=["POST"])
def api_preview():
    """Render JAM source to WAV only (skip C++ codegen)."""
    data = request.get_json(silent=True)
    if not data or "source" not in data:
        return jsonify({"success": False, "wav_b64": None, "error": "Missing 'source' in request body"}), 400

    source = data["source"]
    if len(source) > 50000:
        return jsonify({"success": False, "wav_b64": None, "error": "Source too large (max 50KB)"}), 400

    from dsl.parser import parse, ParseError
    from dsl.lexer import LexerError
    from dsl.semantic import validate
    from dsl.wav_backend import WavRenderer

    result = {"success": False, "wav_b64": None, "error": None}

    try:
        program = parse(source)

        validation = validate(program)
        if not validation.ok:
            errors = [str(d) for d in validation.diagnostics if "ERROR" in str(d).upper() or "error" in str(d).lower()]
            if not errors:
                errors = [str(d) for d in validation.diagnostics]
            result["error"] = "; ".join(errors) if errors else "Validation failed"
            return jsonify(result)

        renderer = WavRenderer(program)
        wav_bytes = renderer.render_bytes()
        result["wav_b64"] = base64.b64encode(wav_bytes).decode("ascii")
        result["success"] = True

    except LexerError as e:
        result["error"] = f"Lexer error: {e}"
    except ParseError as e:
        result["error"] = f"Parse error: {e}"
    except Exception as e:
        result["error"] = f"Unexpected error: {e}"
        app.logger.error(traceback.format_exc())

    return jsonify(result)


@app.route("/api/upload", methods=["POST"])
def api_upload():
    """Compile JAM source to C++ and upload to ESP32 via PlatformIO."""
    data = request.get_json(silent=True)
    if not data or "source" not in data:
        return jsonify({"success": False, "stage": "input", "error": "Missing 'source' in request body", "output": None}), 400

    source = data["source"]
    if len(source) > 50000:
        return jsonify({"success": False, "stage": "input", "error": "Source too large (max 50KB)", "output": None}), 400

    audio_pin = data.get("pin")
    if audio_pin is not None:
        try:
            audio_pin = int(audio_pin)
        except (ValueError, TypeError):
            return jsonify({"success": False, "stage": "input", "error": "Invalid pin number", "output": None}), 400

    pio_bin = shutil.which("pio") or shutil.which("platformio")
    if not pio_bin:
        return jsonify({"success": False, "stage": "setup", "error": "PlatformIO not installed. Run: pip install platformio", "output": None})

    from dsl.parser import parse, ParseError
    from dsl.lexer import LexerError
    from dsl.semantic import validate
    from dsl.codegen import generate

    try:
        program = parse(source)

        validation = validate(program)
        if not validation.ok:
            errors = [str(d) for d in validation.diagnostics if "ERROR" in str(d).upper() or "error" in str(d).lower()]
            if not errors:
                errors = [str(d) for d in validation.diagnostics]
            return jsonify({"success": False, "stage": "validate", "error": "; ".join(errors) if errors else "Validation failed", "output": None})

        cpp_code = generate(program, audio_pin=audio_pin)

        sketch_path = DSL_PATH / "src" / "main.cpp"
        sketch_path.write_text(cpp_code, encoding="utf-8")

        proc = subprocess.run(
            [pio_bin, "run", "--target", "upload"],
            cwd=str(DSL_PATH),
            capture_output=True,
            text=True,
            timeout=120,
        )

        if proc.returncode == 0:
            return jsonify({"success": True, "stage": "done", "error": None, "output": proc.stdout[-2000:] if len(proc.stdout) > 2000 else proc.stdout})
        else:
            stderr = proc.stderr or proc.stdout
            if "no such port" in stderr.lower() or "could not open" in stderr.lower() or "upload_port" in stderr.lower():
                error_msg = "No ESP32 found. Check USB connection."
            elif "error" in stderr.lower() and "compil" in stderr.lower():
                error_msg = "C++ compilation failed."
            else:
                error_msg = "Upload failed."
            return jsonify({"success": False, "stage": "upload", "error": error_msg, "output": stderr[-2000:] if len(stderr) > 2000 else stderr})

    except subprocess.TimeoutExpired:
        return jsonify({"success": False, "stage": "upload", "error": "Upload timed out (120s). Check USB connection.", "output": None})
    except LexerError as e:
        return jsonify({"success": False, "stage": "compile", "error": f"Lexer error: {e}", "output": None})
    except ParseError as e:
        return jsonify({"success": False, "stage": "compile", "error": f"Parse error: {e}", "output": None})
    except Exception as e:
        app.logger.error(traceback.format_exc())
        return jsonify({"success": False, "stage": "compile", "error": f"Unexpected error: {e}", "output": None})


@app.route("/api/health", methods=["GET"])
def api_health():
    """Health check endpoint."""
    return jsonify({"status": "ok", "compiler": "jamDsl"})


def main():
    port = int(os.environ.get("PORT", 5050))
    print(f"JAM Compile Server starting on port {port}")
    print(f"DSL path: {DSL_PATH}")
    app.run(host="0.0.0.0", port=port, debug=False)

if __name__ == "__main__":
    main()