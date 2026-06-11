#!/usr/bin/env python3
"""
JAM Server -- Flask backend for ESP32 upload and JEMai chat.

Compile and WAV preview are handled client-side via Pyodide.
This server provides:
- ESP32 upload via PlatformIO (/api/upload)
- JEMai RAG chat assistant (/api/jemai/chat)

Run:
    python3 server/app.py

The server listens on port 5050 by default. The Vite dev server proxies
/api/* requests to this backend.
"""

import sys
import shutil
import subprocess
import traceback
import os
from pathlib import Path

# Add the jamDsl project to the Python path so we can import the compiler
DSL_PATH = Path(__file__).resolve().parent / "jamDsl"
if str(DSL_PATH) not in sys.path:
    sys.path.insert(0, str(DSL_PATH))

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "https://jam-web-edition.vercel.app/",
    "http://localhost:5173"
])
try:
    from server.jemai_chat_routes import jemai_chat_bp
except ImportError:
    from jemai_chat_routes import jemai_chat_bp

app.register_blueprint(jemai_chat_bp)


@app.route("/api/upload", methods=["POST"])
def api_upload():
    """Compile JAM source to C++ and upload to ESP32 via PlatformIO."""
    data = request.get_json(silent=True)
    if not data or "source" not in data:
        return jsonify({"success": False, "stage": "input", "error": "Missing 'source' in request body", "output": None}), 400

    source = data["source"]
    if len(source) > 50000:
        return jsonify({"success": False, "stage": "input", "error": "Source too large (max 50KB)", "output": None}), 400

    board = data.get("board", "esp32")
    if board not in ("esp32", "uno"):
        return jsonify({"success": False, "stage": "input", "error": "Invalid board. Use 'esp32' or 'uno'.", "output": None}), 400

    audio_pin = data.get("pin")
    if audio_pin is not None:
        try:
            audio_pin = int(audio_pin)
        except (ValueError, TypeError):
            return jsonify({"success": False, "stage": "input", "error": "Invalid pin number", "output": None}), 400

    pio_env = "esp32dev" if board == "esp32" else "uno"

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
            [pio_bin, "run", "-e", pio_env, "--target", "upload"],
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