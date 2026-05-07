import { useState, useCallback, useRef, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import { Play, Square, Download, RotateCcw, Loader2 } from "lucide-react";
import { parseJam, flattenToEvents } from "../utils/jamParser";
import { getAudioEngine } from "../utils/audioEngine";

// ── Simple JAM syntax highlighting mode ─────────────────────────────────
const jamLanguage = StreamLanguage.define({
  startState() {
    return {};
  },
  token(stream) {
    // Comments
    if (stream.match(/#/)) {
      // Check if it's a note accidental (preceded by a letter)
      const before = stream.string.slice(0, stream.pos - 1);
      if (before.length > 0 && /[A-Ga-g]$/.test(before)) {
        // This is part of a note name like D#3, not a comment
        return null;
      }
      stream.skipToEnd();
      return "comment";
    }

    // Numbers
    if (stream.match(/^-?\d+(\.\d+)?/)) return "number";

    // Note names (e.g. C4, D#3, Bb2)
    if (stream.match(/^[A-Ga-g][#sb]?\d+/)) return "string";

    // Keywords
    if (
      stream.match(
        /^(BPM|AUDIO_RATE|CONTROL_RATE|INSTRUMENT|TYPE|WAVE|ADSR|VOLUME|FREQ|DECAY|SEQUENCE|PATTERN|PLAY|REST|BEAT|LOOP|PLAY_SEQUENCE|PLAY_PATTERN|SYNTH|DRUM|SIN|SAW|SQUARE|TRIANGLE|NOISE)\b/
      )
    ) {
      return "keyword";
    }

    // Colon
    if (stream.match(/^:/)) return "punctuation";

    // Identifiers
    if (stream.match(/^[a-zA-Z_]\w*/)) return "variableName";

    // Skip whitespace
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

      // Basic validation
      const instNames = Object.keys(parsed.instruments);
      if (instNames.length === 0) {
        setError("You need at least one INSTRUMENT block. Check the lesson for an example!");
        return;
      }
      if (parsed.arrangement.length === 0) {
        setError("Your code needs a PLAY_SEQUENCE or PLAY_PATTERN at the bottom to actually play something!");
        return;
      }

      const events = flattenToEvents(parsed);
      if (events.length === 0) {
        setError("No notes to play! Make sure your sequence has PLAY commands.");
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
      setError(`Something went wrong: ${e.message}. Double-check your code for typos!`);
    }
  }, [code]);

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
          message: "Compiled successfully! Your code is ready for Arduino.",
          cppCode: data.cpp,
        });
      } else {
        setError(friendlyError(data.error));
      }
    } catch {
      // Server not running -- just show a message
      setCompileResult({
        type: "info",
        message: "Compile server not connected. Use the Play button to preview your sound in the browser!",
      });
    } finally {
      setIsCompiling(false);
    }
  }, [code]);

  return (
    <div className={`rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <div className="flex gap-1.5 mr-3">
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
            title="Reset to original code"
          >
            <RotateCcw size={14} />
            Reset
          </button>

          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg
                       bg-[var(--color-accent-purple)] text-white font-medium
                       hover:opacity-90 transition-opacity cursor-pointer
                       disabled:opacity-50 border-0"
            title="Compile to Arduino C++"
          >
            {isCompiling ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            Compile
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
                <Square size={14} /> Stop
              </>
            ) : (
              <>
                <Play size={14} /> Play
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
          <span className="font-semibold">Oops!</span> {error}
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
function friendlyError(rawError) {
  if (!rawError) return "Something went wrong. Check your code for typos!";

  if (rawError.includes("Lexer error"))
    return "There's a word JAM doesn't recognize. Check for typos in your keywords (BPM, INSTRUMENT, PLAY, etc. must be UPPERCASE).";

  if (rawError.includes("Parse error"))
    return "JAM couldn't understand the structure of your code. Make sure indented lines are inside a block (INSTRUMENT, SEQUENCE, PATTERN, or LOOP).";

  if (rawError.includes("Undefined instrument"))
    return "You're trying to use an instrument that doesn't exist. Make sure you defined it with an INSTRUMENT block and spelled the name correctly!";

  if (rawError.includes("Undefined sequence"))
    return "You're trying to play a sequence that doesn't exist. Check the name in PLAY_SEQUENCE matches your SEQUENCE block.";

  return rawError;
}
