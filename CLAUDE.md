# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JEM (Just ESP Music) — interactive educational website teaching 13-15 year olds ESP32/Mozzi sound synthesis through a custom DSL. Students write JEM code in-browser, hear it via Web Audio, then compile to C++ for ESP32.

## Commands

```bash
npm run dev      # Vite dev server (port 5173)
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

Backend (Flask, separate process):
```bash
cd backend && python app.py  # Compile API + RAG AI tutor
```

## Architecture

**Frontend:** React 18 + Vite 5 + Tailwind CSS. Single-page app with view-based routing (no React Router).

**Key data flow:**
- `App.jsx` manages view state (`home|lessons|sandbox|lesson|library|guide`) and selected lesson ID
- Lessons are data objects (not components) in `src/lessons/`. Each has: title, steps, code, challenges, funFact
- `src/lessons/index.js` exports language-aware helpers: `getLessonById(id, lang)`, `getNextLesson(id, lang)`, `getPhasesForLang(lang)`
- Hebrew translations live in `src/lessons/he/` — same structure, same IDs, translated text but **English code fields**

**i18n system:**
- `src/i18n/context.jsx` — React Context providing `{t, lang, setLang, langs}`
- `src/i18n/en.js`, `src/i18n/he.js` — UI string dictionaries
- RTL handled via `dir` attribute on `<html>` + CSS logical properties (`ms-`, `me-`, `ps-`, `text-start`, `borderInlineStart`)
- Language persisted in localStorage key `jam-lang`

**JEM DSL pipeline:**
- `src/utils/jamParser.js` — lexer/parser producing AST with instruments, sequences, patterns, arrangement
- `src/utils/audioEngine.js` — Web Audio API playback from parsed events
- Backend `/api/compile` — JEM → C++ transpilation for ESP32

**AI tutor:** `src/components/MichaelAI/` — floating chat assistant using backend RAG API

**Arduino/ESP32 Guide:** `src/components/ArduinoGuide.jsx` — step-by-step interactive hardware setup guide with progress persistence

## Code Conventions

- All components use CSS custom properties (`var(--color-*)`) for theming, defined in `src/index.css`
- Use CSS logical properties for RTL support — never `margin-left`/`padding-right`
- JEM keywords (BPM, INSTRUMENT, PLAY, SIN, SAW, etc.) and note names (C4, A4) stay in English in all translations
- Lesson `code` fields are always English (they're JEM source code)
- Components import `useLanguage()` from `../i18n/context` and read `t.*` for UI strings
