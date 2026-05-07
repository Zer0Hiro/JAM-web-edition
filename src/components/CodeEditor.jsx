import { useState, useCallback, useRef, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import { Play, Square, Download, RotateCcw, Loader2 } from "lucide-react";
import { parseJam, flattenToEvents } from "../utils/jamParser";
import { getAudioEngine } from "../utils/audioEngine";
import { useLanguage } from "../i18n/context";

// ── Simple JAM syntax highlighting mode ─────────────────────────────────
const jamLanguage = StreamLanguage.define({
  startState() {
    return {};
  },
  token(stream) {
    if (stream.match(/#/)) {
      const before = stream.string.slice(0, stream.pos - 1);
      if (before.length > 0 && /[A-Ga-g]$/.test(before)) {
        return null;
      }
      stream.skipToEnd();
      return "comment";
    }

    if (stream.match(/^-?\d+(\.\d+)?/)) return "number";
    if (stream.match(/^[A-Ga-g][#sb]?\d+/)) return "string";

    if (
      stream.match(
        /^(BPM|AUDIO_RATE|CONTROL_RATE|INSTRUMENT|TYPE|WAVE|ADSR|VOLUME|FREQ|DECAY|SEQUENCE|PATTERN|PLAY|REST|BEAT|LOOP|PLAY_SEQUENCE|PLAY_PATTERN|SYNTH|DRUM|SIN|SAW|SQUARE|TRIANGLE|NOISE)\b/
      )
    ) {
      return "keyword";
    }

    if (stream.match(/^:/)) return "punctuation";
    if (stream.match(/^[a-zA-Z_]\w*/)) return "variableName";

    stream.next();
    return null;
  },
});

// ── Editor component ────────────────────────────────────────────────────
export default function CodeEditor({
  initialCode = "",
  onCodeChange,
  className = "",
}) {
  const { t } = useLanguage();
  const [code, setCode] = useState(initialCode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [compileResult, setCompileResult] = useState(null);
  const engineRef = useRef(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleChange = useCallback(
    (val) => {
      setCode(val);
      setError(null);
      setCompileResult(null);
      if (onCodeChange) onCodeChange(val);
    },
    [onCodeChange]
  );

  const handlePlay = useCallback(() => {
    setError(null);

    try {
      const parsed = parseJam(code);

      const instNames = Object.keys(parsed.instruments);
      if (instNames.length === 0) {
        setError(t.editor.noInstrument);
        return;
      }
      if (parsed.arrangement.length === 0) {
        setError(t.editor.noArrangement);
        return;
      }

      const events = flattenToEvents(parsed);
      if (events.length === 0) {
        setError(t.editor.noNotes);
        return;
      }

      const engine = getAudioEngine();
      engineRef.current = engine;

      engine.onProgress = (p) => setProgress(p);
      engine.onComplete = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      engine.play(events);
      setIsPlaying(true);
    } catch (e) {
      setError(t.editor.genericError(e.message));
    }
  }, [code, t]);

  const handleStop = useCallback(() => {
    const engine = getAudioEngine();
    engine.stop();
    setIsPlaying(false);
    setProgress(0);
  }, []);

  const handleReset = useCallback(() => {
    setCode(initialCode);
    setError(null);
    setCompileResult(null);
    handleStop();
  }, [initialCode, handleStop]);

  const handleCompile = useCallback(async () => {
    setIsCompiling(true);
    setError(null);
    setCompileResult(null);

    try {
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: code }),
      });
      const data = await response.json();

      if (data.success) {
        setCompileResult({
          type: "success",
          message: t.editor.compileSuccess,
          cppCode: data.cpp,
        });
      } else {
        setError(friendlyError(data.error, t));
      }
    } catch {
      setCompileResult({
        type: "info",
        message: t.editor.compileOffline,
      });
    } finally {
      setIsCompiling(false);
    }
  }, [code, t]);

  return (
    <div className={`rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <div className="flex gap-1.5 me-3">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-sm text-[var(--color-text-muted)] font-mono">
            sketch.jam
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg
                       bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]
                       hover:bg-[var(--color-bg-card)] hover:text-[var(--color-text-primary)]
                       transition-colors cursor-pointer border-0"
            title={t.editor.reset}
          >
            <RotateCcw size={14} />
            {t.editor.reset}
          </button>

          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg
                       bg-[var(--color-accent-purple)] text-white font-medium
                       hover:opacity-90 transition-opacity cursor-pointer
                       disabled:opacity-50 border-0"
            title={t.editor.compile}
          >
            {isCompiling ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {t.editor.compile}
          </button>

          <button
            onClick={isPlaying ? handleStop : handlePlay}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg font-semibold
                       transition-all cursor-pointer border-0
                       ${isPlaying
                         ? "bg-red-500 text-white hover:bg-red-600"
                         : "bg-[var(--color-accent-cyan)] text-[var(--color-bg-primary)] hover:opacity-90"
                       }`}
          >
            {isPlaying ? (
              <>
                <Square size={14} /> {t.editor.stop}
              </>
            ) : (
              <>
                <Play size={14} /> {t.editor.play}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {isPlaying && (
        <div className="h-1 bg-[var(--color-bg-secondary)]">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-magenta)] transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      {/* Editor */}
      <CodeMirror
        value={code}
        height="360px"
        theme={oneDark}
        extensions={[jamLanguage]}
        onChange={handleChange}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
          autocompletion: false,
        }}
      />

      {/* Error / success display */}
      {error && (
        <div className="px-4 py-3 bg-red-950/50 border-t border-red-500/30 text-red-300 text-sm">
          <span className="font-semibold">{t.editor.oops}</span> {error}
        </div>
      )}

      {compileResult && (
        <div
          className={`px-4 py-3 border-t text-sm ${
            compileResult.type === "success"
              ? "bg-green-950/50 border-green-500/30 text-green-300"
              : "bg-blue-950/50 border-blue-500/30 text-blue-300"
          }`}
        >
          {compileResult.message}
        </div>
      )}
    </div>
  );
}

// ── Friendly error messages ─────────────────────────────────────────────
function friendlyError(rawError, t) {
  if (!rawError) return t.editor.genericCompileError;
  if (rawError.includes("Lexer error")) return t.editor.lexerError;
  if (rawError.includes("Parse error")) return t.editor.parseError;
  if (rawError.includes("Undefined instrument")) return t.editor.undefinedInstrument;
  if (rawError.includes("Undefined sequence")) return t.editor.undefinedSequence;
  return rawError;
}
