import { useState, useCallback, useRef, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { Play, Square, Download, RotateCcw, Loader2, Code, ChevronDown, ChevronUp, FileAudio, Cpu, Check, AlertTriangle, Upload, MoreVertical } from "lucide-react";
import { useLanguage } from "../i18n/context";
import { previewJam, compileJam, renderFullJam, cancelAll } from "../utils/pyodideCompiler";
import { setAnalyser, clearAnalyser } from "../utils/audioBus";

// ── Simple JEM syntax highlighting mode ─────────────────────────────────
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
        /^(BPM|AUDIO_RATE|CONTROL_RATE|INSTRUMENT|TYPE|WAVE|ADSR|VOLUME|FREQ|DECAY|SEQUENCE|PATTERN|PLAY|REST|BEAT|LOOP|PLAY_TOGETHER|PLAY_SEQUENCE|PLAY_PATTERN|SYNTH|DRUM|SIN|SAW|SQUARE|TRIANGLE|NOISE|CUTOFF|RESONANCE|REVERB|DELAY|GLIDE|PAN|PLUCK|HANDPAN|BELL|TIME_SIGNATURE|LEGATO|POLYPHONY|ROOM|OVER|FADE_IN|FADE_OUT|VELOCITY_CURVE|CRESCENDO|DECRESCENDO|SWING|HUMANIZE|KEY)\b/
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

// ── WAV playback from base64 ────────────────────────────────────────────
function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

class WavPlayer {
  constructor() {
    this.ctx = null;
    this.source = null;
    this.startTime = 0;
    this.duration = 0;
    this.onProgress = null;
    this.onComplete = null;
    this._raf = null;
  }

  async play(wavBase64) {
    this.stop();
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = base64ToArrayBuffer(wavBase64);
    const audioBuffer = await this.ctx.decodeAudioData(buffer);

    this.source = this.ctx.createBufferSource();
    this.source.buffer = audioBuffer;

    // Route through an analyser so visualizer scenes can react to playback
    const analyser = this.ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.78;
    this.source.connect(analyser);
    analyser.connect(this.ctx.destination);
    setAnalyser(analyser);

    this.duration = audioBuffer.duration;
    this.startTime = this.ctx.currentTime;

    this.source.onended = () => {
      this._stopTracking();
      clearAnalyser();
      if (this.onComplete) this.onComplete();
    };

    this.source.start();
    this._startTracking();
  }

  _startTracking() {
    const tick = () => {
      if (!this.ctx || !this.source) return;
      const elapsed = this.ctx.currentTime - this.startTime;
      const p = Math.min(1, elapsed / this.duration);
      if (this.onProgress) this.onProgress(p);
      if (p < 1) this._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  }

  _stopTracking() {
    if (this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }
  }

  stop() {
    this._stopTracking();
    clearAnalyser();
    if (this.source) {
      try { this.source.stop(); } catch { }
      this.source = null;
    }
    if (this.ctx && this.ctx.state !== "closed") {
      this.ctx.close();
    }
    this.ctx = null;
  }
}

// ── Editor component ────────────────────────────────────────────────────
export default function CodeEditor({
  initialCode = "",
  onCodeChange,
  className = "",
}) {
  const { t } = useLanguage();
  const [code, setCode] = useState(initialCode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingPlay, setIsLoadingPlay] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [warnings, setWarnings] = useState(null);
  const [compileResult, setCompileResult] = useState(null);
  const [cppCode, setCppCode] = useState(null);
  const [showCpp, setShowCpp] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState("esp32");
  const [showBoardSelector, setShowBoardSelector] = useState(false);
  const [selectedPin, setSelectedPin] = useState(25);
  const [showMenu, setShowMenu] = useState(false);
  const [isRenderingWav, setIsRenderingWav] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderEta, setRenderEta] = useState(null);
  const [compileProgress, setCompileProgress] = useState(0);
  const renderStartRef = useRef(0);
  const wavPlayerRef = useRef(null);

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

  const playWavFromBase64 = useCallback((wavBase64) => {
    const player = new WavPlayer();
    wavPlayerRef.current = player;
    player.onProgress = (p) => setProgress(p);
    player.onComplete = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    player.play(wavBase64);
    setIsPlaying(true);
  }, []);


  const boardLabel = selectedBoard === "esp32" ? t.editor.boardEsp32 : t.editor.boardArduino;

  const uploadToBoard = useCallback(async (source, board, pin) => {
    setUploadStatus("uploading");
    setUploadMessage(t.editor.uploadingBoard.replace("{board}", board === "esp32" ? "ESP32" : "Arduino Uno"));
    try {
      const body = { source, board };
      if (board === "esp32" && pin != null) body.pin = pin;
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.success) {
        setUploadStatus("success");
        setUploadMessage(t.editor.uploadSuccess.replace("{board}", board === "esp32" ? "ESP32" : "Arduino Uno"));
        setTimeout(() => setUploadStatus(null), 5000);
      } else {
        setUploadStatus("error");
        setUploadMessage(data.error || t.editor.uploadFailed);
        setTimeout(() => setUploadStatus(null), 8000);
      }
    } catch {
      setUploadStatus("error");
      setUploadMessage(t.editor.uploadOffline);
      setTimeout(() => setUploadStatus(null), 5000);
    }
  }, [t]);

  const handleUpload = useCallback(() => {
    uploadToBoard(code, selectedBoard, selectedBoard === "esp32" ? selectedPin : null);
  }, [code, selectedBoard, selectedPin, uploadToBoard]);

  const handlePlay = useCallback(async () => {
    setError(null);
    setWarnings(null);
    setIsLoadingPlay(true);
    setCompileProgress(0);

    try {
      const data = await previewJam(code, (p) => setCompileProgress(p));

      if (data.success && data.wav_b64) {
        playWavFromBase64(data.wav_b64);
        if (data.warnings && data.warnings.length > 0) {
          setWarnings(data.warnings);
        }
      } else if (data.error) {
        setError(friendlyError(data.error, t));
      }
    } catch (err) {
      setError("Compiler unavailable: " + err.message);
    } finally {
      setIsLoadingPlay(false);
      setCompileProgress(0);
    }
  }, [code, t, playWavFromBase64]);

  const handleStop = useCallback(() => {
    if (wavPlayerRef.current) {
      wavPlayerRef.current.stop();
      wavPlayerRef.current = null;
    }
    setIsPlaying(false);
    setProgress(0);
  }, []);

  const handleReset = useCallback(() => {
    setCode(initialCode);
    setError(null);
    setCompileResult(null);
    setCppCode(null);
    setShowCpp(false);
    setWarnings(null);
    setUploadStatus(null);
    setUploadMessage(null);
    setShowMenu(false);
    handleStop();
  }, [initialCode, handleStop]);

  const handleCompile = useCallback(async () => {
    setIsCompiling(true);
    setError(null);
    setWarnings(null);
    setCompileResult(null);
    setCompileProgress(0);

    try {
      const data = await compileJam(code, (p) => setCompileProgress(p));

      if (data.success) {
        setCompileResult({ type: "success", message: t.editor.compileSuccess });
        if (data.cpp) {
          setCppCode(data.cpp);
          setShowCpp(true);
        }
        if (data.wav_b64) {
          playWavFromBase64(data.wav_b64);
        }
        if (data.warnings && data.warnings.length > 0) {
          setWarnings(data.warnings);
        }
      } else {
        setError(friendlyError(data.error, t));
      }
    } catch (err) {
      setCompileResult({ type: "info", message: "Compiler unavailable: " + err.message });
    } finally {
      setIsCompiling(false);
      setCompileProgress(0);
    }
  }, [code, t, playWavFromBase64]);

  // Download = fresh full-quality (44.1kHz) render with live progress.
  // The in-editor preview uses a lower sample rate for speed.
  const handleDownloadWav = useCallback(async () => {
    if (isRenderingWav) return;
    setError(null);
    setIsRenderingWav(true);
    setRenderProgress(0);
    setRenderEta(null);
    renderStartRef.current = performance.now();

    try {
      const data = await renderFullJam(code, (p) => {
        setRenderProgress(p);
        if (p > 0.02) {
          const elapsed = (performance.now() - renderStartRef.current) / 1000;
          setRenderEta(Math.max(0, Math.round(elapsed / p - elapsed)));
        }
      });

      if (data.success && data.wav_b64) {
        const bytes = base64ToArrayBuffer(data.wav_b64);
        const blob = new Blob([bytes], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sketch.wav";
        a.click();
        URL.revokeObjectURL(url);
      } else {
        setError(data.error ? friendlyError(data.error, t) : t.editor.renderFailed);
      }
    } catch (err) {
      if (err.message !== "cancelled") {
        setError(t.editor.renderFailed + ": " + err.message);
      }
    } finally {
      setIsRenderingWav(false);
      setRenderProgress(0);
      setRenderEta(null);
    }
  }, [code, t, isRenderingWav]);

  const handleCancelRender = useCallback(() => {
    cancelAll();
    setIsRenderingWav(false);
    setRenderProgress(0);
    setRenderEta(null);
  }, []);

  return (
    <div className={`rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 me-3">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-sm text-[var(--color-text-muted)] font-mono">
            sketch.jam
          </span>
          {uploadStatus && (
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${uploadStatus === "uploading" ? "bg-yellow-500/20 text-yellow-300" :
              uploadStatus === "success" ? "bg-green-500/20 text-green-300" :
                "bg-red-500/20 text-red-300"
              }`}>
              {uploadStatus === "uploading" ? <Loader2 size={10} className="animate-spin" /> :
                uploadStatus === "success" ? <Check size={10} /> :
                  <AlertTriangle size={10} />}
              <Cpu size={10} />
              <span>{uploadMessage}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* More menu (Reset, Compile, WAV, C++) */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center justify-center w-8 h-8 rounded-lg
                         bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]
                         hover:bg-[var(--color-bg-card)] hover:text-[var(--color-text-primary)]
                         transition-colors cursor-pointer border-0"
              title={t.editor.more}
            >
              <MoreVertical size={16} />
            </button>
            {showMenu && (
              <div className="absolute top-full right-0 mt-1 bg-[var(--color-bg-elevated)] border border-[var(--color-border)]
                              rounded-lg shadow-xl z-50 py-1 min-w-[160px]">
                <button
                  onClick={() => { handleReset(); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)]
                             hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer border-0 text-left"
                >
                  <RotateCcw size={14} />
                  {t.editor.reset}
                </button>
                <button
                  onClick={() => { handleCompile(); setShowMenu(false); }}
                  disabled={isCompiling}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-accent-purple)]
                             hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer border-0 text-left
                             disabled:opacity-50"
                >
                  {isCompiling ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                  {t.editor.compile}
                </button>
                <button
                  onClick={() => { handleDownloadWav(); setShowMenu(false); }}
                  disabled={isRenderingWav}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-accent-magenta)]
                             hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer border-0 text-left
                             disabled:opacity-50"
                >
                  {isRenderingWav ? <Loader2 size={14} className="animate-spin" /> : <FileAudio size={14} />}
                  {t.editor.downloadWav}
                </button>
                {cppCode && (
                  <button
                    onClick={() => { setShowCpp(!showCpp); setShowMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-accent-cyan)]
                               hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer border-0 text-left"
                  >
                    <Code size={14} />
                    {t.editor.viewCpp}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Upload — board selector + pin (ESP32 only) */}
          <div className="relative flex items-center h-8">
            <button
              onClick={handleUpload}
              disabled={uploadStatus === "uploading"}
              className="flex items-center gap-1.5 px-3 h-8 text-sm rounded-s-lg
                         bg-[var(--color-accent-magenta)] text-white font-medium
                         hover:opacity-90 transition-opacity cursor-pointer
                         disabled:opacity-50 border-0"
              title={t.editor.uploadBoard}
            >
              {uploadStatus === "uploading" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Upload size={14} />
              )}
              {boardLabel}
            </button>
            <div className="relative">
              <button
                onClick={() => { setShowBoardSelector(!showBoardSelector); setShowMenu(false); }}
                className="flex items-center gap-1 px-1.5 h-8 text-sm rounded-e-lg
                           bg-[var(--color-accent-magenta)] text-white font-medium
                           hover:opacity-90 transition-opacity cursor-pointer border-0
                           border-l border-l-white/20"
                title={t.editor.selectBoard}
              >
                <ChevronDown size={12} />
              </button>
              {showBoardSelector && (
                <div className="absolute top-full right-0 mt-1 bg-[var(--color-bg-elevated)] border border-[var(--color-border)]
                                rounded-lg shadow-xl z-50 py-1 min-w-[140px]">
                  {[
                    { id: "esp32", label: t.editor.boardEsp32 },
                    { id: "uno", label: t.editor.boardArduino },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => { setSelectedBoard(b.id); setShowBoardSelector(false); }}
                      className={`w-full text-left px-3 py-1.5 text-sm cursor-pointer border-0
                                  hover:bg-[var(--color-bg-secondary)] transition-colors
                                  ${selectedBoard === b.id
                          ? "text-[var(--color-accent-magenta)] font-semibold bg-[var(--color-bg-secondary)]"
                          : "text-[var(--color-text-secondary)]"
                        }`}
                    >
                      {b.label}
                    </button>
                  ))}
                  {selectedBoard === "esp32" && (
                    <>
                      <div className="border-t border-[var(--color-border)] my-1" />
                      <div className="px-3 py-1 text-xs text-[var(--color-text-tertiary)]">{t.editor.selectPin}</div>
                      <div className="max-h-[150px] overflow-y-auto">
                        {[2, 4, 5, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 27, 32, 33].map((pin) => (
                          <button
                            key={pin}
                            onClick={() => { setSelectedPin(pin); setShowBoardSelector(false); }}
                            className={`w-full text-left px-3 py-1 text-sm cursor-pointer border-0
                                        hover:bg-[var(--color-bg-secondary)] transition-colors
                                        ${selectedPin === pin
                                ? "text-[var(--color-accent-magenta)] font-semibold bg-[var(--color-bg-secondary)]"
                                : "text-[var(--color-text-secondary)]"
                              }`}
                          >
                            GPIO {pin}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Play / Stop */}
          <button
            onClick={isPlaying ? handleStop : handlePlay}
            disabled={isLoadingPlay}
            className={`flex items-center gap-1.5 px-4 h-8 text-sm rounded-lg font-semibold
                       transition-all cursor-pointer border-0 disabled:cursor-not-allowed
                       ${isLoadingPlay
                ? "btn-compiling"
                : isPlaying
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-[var(--color-accent-cyan)] text-[var(--color-bg-primary)] hover:opacity-90"
              }`}
          >
            {isLoadingPlay ? (
              <>
                <Loader2 size={14} className="animate-spin" /> {t.editor.compiling}
                {compileProgress > 0 && ` ${Math.round(compileProgress * 100)}%`}
              </>
            ) : isPlaying ? (
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

      {/* Progress bar: real compile progress while rendering, playhead while playing */}
      {(isPlaying || isLoadingPlay || isCompiling) && (
        <div className="h-1 bg-[var(--color-bg-secondary)]">
          {isPlaying ? (
            <div
              className="h-full transition-all duration-100 bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-magenta)]"
              style={{ width: `${progress * 100}%` }}
            />
          ) : compileProgress > 0 ? (
            <div
              className="h-full transition-all duration-150 bg-[var(--color-accent-cyan)]"
              style={{ width: `${compileProgress * 100}%` }}
            />
          ) : (
            // Worker still initializing / parsing — no progress signal yet
            <div className="h-full w-full bg-[var(--color-accent-cyan)] animate-pulse" />
          )}
        </div>
      )}

      {/* Full-quality WAV render progress */}
      {isRenderingWav && (
        <div className="flex items-center gap-3 px-4 py-2 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
          <Loader2 size={14} className="animate-spin text-[var(--color-accent-magenta)] shrink-0" />
          <span className="text-xs text-[var(--color-text-secondary)] whitespace-nowrap">
            {t.editor.renderingWav} {Math.round(renderProgress * 100)}%
            {" · "}
            {renderEta != null
              ? t.editor.renderEta.replace("{s}", renderEta)
              : t.editor.renderEstimating}
          </span>
          <div className="flex-1 h-1.5 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-magenta)] to-[var(--color-accent-purple)] transition-all duration-200"
              style={{ width: `${renderProgress * 100}%` }}
            />
          </div>
          <button
            onClick={handleCancelRender}
            className="text-xs px-2 py-1 rounded bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]
                       hover:text-[var(--color-text-primary)] transition-colors cursor-pointer border-0 shrink-0"
          >
            {t.editor.renderCancel}
          </button>
        </div>
      )}

      {/* Editor */}
      <div dir="ltr">
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
      </div>

      {/* Error / success display */}
      {error && (
        <div className="px-4 py-3 bg-red-950/50 border-t border-red-500/30 text-red-300 text-sm">
          <span className="font-semibold">{t.editor.oops}</span> {error}
        </div>
      )}
      {warnings && warnings.length > 0 && (
        <div className="px-4 py-3 bg-yellow-950/50 border-t border-yellow-500/30 text-yellow-300 text-sm">
          <span className="font-semibold">⚠️</span> {warnings.join("; ")}
        </div>
      )}

      {compileResult && (
        <div
          className={`px-4 py-3 border-t text-sm ${compileResult.type === "success"
            ? "bg-green-950/50 border-green-500/30 text-green-300"
            : "bg-blue-950/50 border-blue-500/30 text-blue-300"
            }`}
        >
          {compileResult.message}
        </div>
      )}

      {/* C++ Code Viewer */}
      {showCpp && cppCode && (
        <div className="border-t border-[var(--color-border)]">
          <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-bg-elevated)]">
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              {t.editor.generatedCpp}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(cppCode);
              }}
              className="text-xs px-2 py-1 rounded bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]
                         hover:text-[var(--color-text-primary)] transition-colors cursor-pointer border-0"
            >
              {t.editor.copyCpp}
            </button>
          </div>
          <div dir="ltr">
            <CodeMirror
              value={cppCode}
              height="300px"
              theme={oneDark}
              extensions={[cpp()]}
              editable={false}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: false,
                autocompletion: false,
              }}
            />
          </div>
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
