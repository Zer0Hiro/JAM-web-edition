# JAM Web

Interactive web editor for the JAM music DSL. Write music code, hear it in the browser, and upload to ESP32 hardware -- all from one page.

More about [JAM DSL compiler](https://github.com/Zer0Hiro/JAM-DSL-Compiler).
## Features

- **Code editor** with JAM syntax highlighting (CodeMirror + oneDark theme)
- **Browser playback** via WAV rendering (server-side) or Web Audio API (client-side fallback)
- **ESP32 upload** with GPIO pin selector -- compile and flash directly from the browser
- **Simultaneous multi-instrument playback** via PATTERN beat-grid notation
- **Chords** with bracket notation `[C4 E4 G4]`
- **C++ viewer** to inspect generated Mozzi 2.0 code
- **WAV download** for offline listening
- **11 interactive lessons** teaching sound synthesis from scratch (EN + HE)
- **Sandbox mode** for free experimentation
- **JAMai chat assistant** for guided learning (RAG-based)
- **i18n** support (English, Hebrew)

For the full JAM language syntax, see the [JEM DSL Reference](https://github.com/Zer0Hiro/JAM-DSL-Compiler).

## Architecture

```
jamWeb/
    src/
        App.jsx               Main app with lesson navigation
        components/
            CodeEditor.jsx    Editor + toolbar (play, upload, compile)
            LessonView.jsx    Lesson renderer with steps and challenges
        lessons/              Lesson content (EN)
        lessons/he/           Lesson content (HE)
        i18n/                 Translation strings
        utils/
            jamParser.js      Client-side JEM parser
            audioEngine.js    Web Audio API playback engine
    server/
        app.py                Flask backend (compile, preview, upload APIs)
        jamai_chat_routes.py  JAMai chat API endpoints
        jamai_rag.py          RAG knowledge retrieval
```

## Setup

### 1. Clone both repos side by side

```bash
git clone https://github.com/Zer0Hiro/JAM-DSL-Compiler.git jamDsl
git clone https://github.com/Zer0Hiro/JAM-web-edition jamWeb
```

The server expects `jamDsl` as a sibling directory:

```
parent/
    jamDsl/     <-- JAM DSL Compiler
    jamWeb/     <-- this repo
```

### 2. Frontend

```bash
cd jamWeb
npm install
npm run dev
```

Runs on `http://localhost:5173` with Vite HMR.

### 3. Backend

```bash
pip install flask flask-cors
python3 server/app.py
```

Runs on `http://localhost:5050`. Vite proxies `/api/*` to backend.

### ESP32 Upload

Requires:
- PlatformIO installed (`pip install platformio`)
- ESP32 connected via USB
- On WSL2: `usbipd-win` for USB passthrough, user in `dialout` group

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/compile` | POST | Compile JEM to C++ and WAV |
| `/api/preview` | POST | Render JEM to WAV only |
| `/api/upload` | POST | Compile + upload to ESP32 (accepts `pin` for GPIO selection) |
| `/api/health` | GET | Health check |

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- CodeMirror 6
- Lucide icons
- Flask (backend)
- jamDsl compiler (Python)
- Mozzi 2.0 (audio synthesis on hardware)
