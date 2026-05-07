import { useRef, useCallback, useEffect, useState } from "react";
import Footer from "./Footer";
import { useLanguage } from "../i18n/context";

// ---------------------------------------------------------------------------
// Audio helpers
// ---------------------------------------------------------------------------

let _audioCtx = null;
function getCtx() {
  if (!_audioCtx || _audioCtx.state === "closed") {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_audioCtx.state === "suspended") {
    _audioCtx.resume();
  }
  return _audioCtx;
}

function playTone(freq, waveType = "sine", durationMs = 400, volumeScale = 1) {
  const ctx = getCtx();
  const now = ctx.currentTime;
  const dur = durationMs / 1000;

  let source;
  if (waveType === "noise") {
    const bufLen = ctx.sampleRate * (dur + 0.1);
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
    source = ctx.createBufferSource();
    source.buffer = buf;
  } else {
    source = ctx.createOscillator();
    source.type = waveType;
    source.frequency.setValueAtTime(freq, now);
  }

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.25 * volumeScale, now + 0.01);
  gain.gain.setValueAtTime(0.25 * volumeScale, now + dur * 0.7);
  gain.gain.linearRampToValueAtTime(0, now + dur);

  source.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
  source.stop(now + dur + 0.05);
}

// ---------------------------------------------------------------------------
// Note data
// ---------------------------------------------------------------------------

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function buildNotes() {
  const notes = [];
  for (let midi = 24; midi <= 96; midi++) {
    const octave = Math.floor(midi / 12) - 1;
    const nameIndex = midi % 12;
    notes.push({
      midi,
      name: NOTE_NAMES[nameIndex],
      octave,
      label: NOTE_NAMES[nameIndex] + octave,
      freq: parseFloat(midiToFreq(midi).toFixed(2)),
      isSharp: NOTE_NAMES[nameIndex].includes("#"),
    });
  }
  return notes;
}

const ALL_NOTES = buildNotes();
const OCTAVES = [1, 2, 3, 4, 5, 6, 7].map((oct) => ({
  octave: oct,
  notes: ALL_NOTES.filter((n) => n.octave === oct),
}));

const OCTAVE_COLORS = [
  { bg: "rgba(139,92,246,0.18)", border: "#8b5cf6", text: "#c4b5fd", glow: "rgba(139,92,246,0.5)" },
  { bg: "rgba(0,240,255,0.12)", border: "#00f0ff", text: "#67e8f9", glow: "rgba(0,240,255,0.4)" },
  { bg: "rgba(255,0,170,0.12)", border: "#ff00aa", text: "#f9a8d4", glow: "rgba(255,0,170,0.4)" },
  { bg: "rgba(249,115,22,0.15)", border: "#f97316", text: "#fdba74", glow: "rgba(249,115,22,0.4)" },
  { bg: "rgba(34,211,238,0.12)", border: "#22d3ee", text: "#a5f3fc", glow: "rgba(34,211,238,0.4)" },
  { bg: "rgba(255,0,170,0.10)", border: "#ff00aa", text: "#f9a8d4", glow: "rgba(255,0,170,0.35)" },
  { bg: "rgba(139,92,246,0.15)", border: "#8b5cf6", text: "#c4b5fd", glow: "rgba(139,92,246,0.45)" },
];

// ---------------------------------------------------------------------------
// Wave data
// ---------------------------------------------------------------------------

const WAVE_IDS = ["sine", "sawtooth", "square", "triangle", "noise"];
const WAVE_LABELS = ["SIN", "SAW", "SQUARE", "TRIANGLE", "NOISE"];
const WAVE_COLORS = [
  { color: "#00f0ff", glow: "rgba(0,240,255,0.4)", border: "rgba(0,240,255,0.5)", bg: "rgba(0,240,255,0.08)" },
  { color: "#ff00aa", glow: "rgba(255,0,170,0.4)", border: "rgba(255,0,170,0.5)", bg: "rgba(255,0,170,0.08)" },
  { color: "#f97316", glow: "rgba(249,115,22,0.4)", border: "rgba(249,115,22,0.5)", bg: "rgba(249,115,22,0.08)" },
  { color: "#8b5cf6", glow: "rgba(139,92,246,0.4)", border: "rgba(139,92,246,0.5)", bg: "rgba(139,92,246,0.08)" },
  { color: "#22d3ee", glow: "rgba(34,211,238,0.4)", border: "rgba(34,211,238,0.5)", bg: "rgba(34,211,238,0.08)" },
];

const WAVE_POINTS_FNS = [
  // sine
  (w, h) => {
    const pts = [];
    for (let x = 0; x <= w; x += 2) {
      const y = h / 2 - (h / 2.5) * Math.sin((x / w) * Math.PI * 4);
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  },
  // sawtooth
  (w, h) => {
    const cycles = 4;
    const pts = [];
    for (let c = 0; c < cycles; c++) {
      const x0 = (c / cycles) * w;
      const x1 = ((c + 1) / cycles) * w;
      pts.push(`${x0},${h * 0.85}`);
      pts.push(`${x1 - 1},${h * 0.15}`);
      pts.push(`${x1},${h * 0.85}`);
    }
    return pts.join(" ");
  },
  // square
  (w, h) => {
    const cycles = 4;
    const pts = [];
    const top = h * 0.2;
    const bot = h * 0.8;
    for (let c = 0; c < cycles; c++) {
      const x0 = (c / cycles) * w;
      const xm = ((c + 0.5) / cycles) * w;
      const x1 = ((c + 1) / cycles) * w;
      pts.push(`${x0},${bot}`);
      pts.push(`${x0},${top}`);
      pts.push(`${xm},${top}`);
      pts.push(`${xm},${bot}`);
      pts.push(`${x1},${bot}`);
    }
    return pts.join(" ");
  },
  // triangle
  (w, h) => {
    const cycles = 4;
    const pts = [];
    for (let c = 0; c < cycles; c++) {
      const x0 = (c / cycles) * w;
      const xm = ((c + 0.5) / cycles) * w;
      const x1 = ((c + 1) / cycles) * w;
      pts.push(`${x0},${h * 0.8}`);
      pts.push(`${xm},${h * 0.2}`);
      pts.push(`${x1},${h * 0.8}`);
    }
    return pts.join(" ");
  },
  // noise
  (w, h) => {
    const pts = [];
    let seed = 42;
    const rand = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; };
    for (let x = 0; x <= w; x += 3) {
      const y = h * 0.15 + rand() * h * 0.7;
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  },
];

// ---------------------------------------------------------------------------
// WaveShape SVG
// ---------------------------------------------------------------------------

function WaveShape({ waveIdx, width = 200, height = 70 }) {
  const pts = WAVE_POINTS_FNS[waveIdx](width, height);
  const c = WAVE_COLORS[waveIdx];
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      style={{ display: "block", overflow: "visible" }}
    >
      <polyline
        points={pts}
        fill="none"
        stroke={c.color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 5px ${c.glow})` }}
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// NoteButton
// ---------------------------------------------------------------------------

function NoteButton({ note, color }) {
  const [active, setActive] = useState(false);
  const timerRef = useRef(null);

  const trigger = useCallback(() => {
    playTone(note.freq, "sine", 500);
    setActive(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(false), 500);
  }, [note.freq]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <button
      onMouseEnter={trigger}
      onFocus={trigger}
      onTouchStart={trigger}
      title={`${note.label} — ${note.freq} Hz`}
      aria-label={`Play ${note.label}, ${note.freq} hertz`}
      style={{
        background: active ? color.border : color.bg,
        border: `1.5px solid ${active ? color.border : "rgba(255,255,255,0.1)"}`,
        boxShadow: active ? `0 0 14px ${color.glow}, 0 0 4px ${color.glow}` : "none",
        color: active ? "#fff" : color.text,
        transition: "all 0.15s ease",
        cursor: "pointer",
        borderRadius: "8px",
        padding: note.isSharp ? "6px 4px" : "8px 6px",
        minWidth: note.isSharp ? "42px" : "50px",
        fontSize: "0.72rem",
        fontFamily: "var(--font-mono)",
        lineHeight: 1.2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px",
        opacity: note.isSharp ? 0.85 : 1,
      }}
    >
      <span style={{ fontWeight: 700, fontSize: "0.8rem" }}>{note.name}</span>
      <span style={{ fontSize: "0.62rem", opacity: 0.75 }}>{note.freq}</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// WaveCard
// ---------------------------------------------------------------------------

function WaveCard({ waveIdx, t }) {
  const [active, setActive] = useState(false);
  const stopRef = useRef(null);
  const c = WAVE_COLORS[waveIdx];
  const id = WAVE_IDS[waveIdx];
  const label = WAVE_LABELS[waveIdx];
  const descKey = ["sine", "sawtooth", "square", "triangle", "noise"][waveIdx];

  const startSound = useCallback(() => {
    playTone(440, id, 800);
    setActive(true);
    if (stopRef.current) clearTimeout(stopRef.current);
    stopRef.current = setTimeout(() => setActive(false), 800);
  }, [id]);

  const stopSound = useCallback(() => {
    if (stopRef.current) clearTimeout(stopRef.current);
    setActive(false);
  }, []);

  useEffect(() => () => { if (stopRef.current) clearTimeout(stopRef.current); }, []);

  return (
    <div
      style={{
        background: active ? c.bg : "var(--color-bg-card)",
        border: `1.5px solid ${active ? c.border : "var(--color-border)"}`,
        boxShadow: active ? `0 0 24px ${c.glow}` : "none",
        borderRadius: "16px",
        padding: "24px 20px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        transition: "all 0.2s ease",
        userSelect: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: c.color,
            letterSpacing: "0.08em",
            textShadow: active ? `0 0 10px ${c.glow}` : "none",
          }}
        >
          {label}
        </span>
        <button
          onMouseEnter={startSound}
          onMouseLeave={stopSound}
          onFocus={startSound}
          onBlur={stopSound}
          onTouchStart={startSound}
          onClick={startSound}
          aria-label={`Preview ${label} wave`}
          style={{
            background: active ? c.border : "transparent",
            border: `1.5px solid ${c.border}`,
            borderRadius: "8px",
            color: active ? "#fff" : c.color,
            padding: "5px 12px",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            cursor: "pointer",
            transition: "all 0.15s ease",
            boxShadow: active ? `0 0 10px ${c.glow}` : "none",
            fontWeight: 600,
          }}
        >
          {active ? t.soundLibrary.playing : t.soundLibrary.hearIt}
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
        <WaveShape waveIdx={waveIdx} width={200} height={64} />
      </div>

      <p
        style={{
          fontSize: "0.85rem",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {t.soundLibrary.waveDescs[descKey]}
      </p>

      <div
        style={{
          fontSize: "0.7rem",
          fontFamily: "var(--font-mono)",
          color: "var(--color-text-muted)",
          opacity: 0.8,
        }}
      >
        {t.soundLibrary.playsA4}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main SoundLibrary
// ---------------------------------------------------------------------------

export default function SoundLibrary() {
  const { t } = useLanguage();
  const [visibleOctaves, setVisibleOctaves] = useState(new Set([3, 4, 5]));

  function toggleOctave(oct) {
    setVisibleOctaves((prev) => {
      const next = new Set(prev);
      if (next.has(oct)) {
        if (next.size > 1) next.delete(oct);
      } else {
        next.add(oct);
      }
      return next;
    });
  }

  return (
    <div className="pt-16 min-h-screen" style={{ background: "var(--color-bg-primary)" }}>
      {/* Page header */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "48px 24px 32px",
        }}
      >
        <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent-cyan)",
              background: "rgba(0,240,255,0.1)",
              border: "1px solid rgba(0,240,255,0.25)",
              borderRadius: "6px",
              padding: "3px 10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {t.soundLibrary.interactive}
          </span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
          className="gradient-text"
        >
          {t.soundLibrary.title}
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--color-text-secondary)",
            maxWidth: "600px",
            lineHeight: 1.6,
          }}
        >
          {t.soundLibrary.subtitle}
        </p>
      </div>

      {/* Section 1 — Note Explorer */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #8b5cf6, #00f0ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            ♪
          </div>
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                lineHeight: 1.2,
              }}
            >
              {t.soundLibrary.noteExplorer}
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
              {t.soundLibrary.noteExplorerSub}
            </p>
          </div>
        </div>

        {/* Octave filter pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          {OCTAVES.map(({ octave }) => {
            const col = OCTAVE_COLORS[octave - 1];
            const on = visibleOctaves.has(octave);
            return (
              <button
                key={octave}
                onClick={() => toggleOctave(octave)}
                style={{
                  background: on ? col.border : "transparent",
                  border: `1.5px solid ${col.border}`,
                  color: on ? "#fff" : col.text,
                  borderRadius: "20px",
                  padding: "5px 14px",
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-mono)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  fontWeight: 600,
                }}
              >
                {t.soundLibrary.octave} {octave}
              </button>
            );
          })}
        </div>

        {/* Note grids per octave */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {OCTAVES.filter(({ octave }) => visibleOctaves.has(octave)).map(({ octave, notes }) => {
            const col = OCTAVE_COLORS[octave - 1];
            return (
              <div
                key={octave}
                style={{
                  background: "var(--color-bg-card)",
                  border: `1px solid var(--color-border)`,
                  borderRadius: "14px",
                  padding: "18px 20px",
                  borderInlineStart: `4px solid ${col.border}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: col.text,
                    }}
                  >
                    {t.soundLibrary.octave} {octave}
                  </span>
                  <span
                    style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {notes[0].freq} – {notes[notes.length - 1].freq} Hz
                  </span>
                  {octave === 4 && (
                    <span
                      style={{
                        fontSize: "0.68rem",
                        background: "rgba(0,240,255,0.12)",
                        border: "1px solid rgba(0,240,255,0.3)",
                        color: "#00f0ff",
                        borderRadius: "4px",
                        padding: "1px 7px",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {t.soundLibrary.middleOctave}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {notes.map((note) => (
                    <NoteButton key={note.midi} note={note} color={col} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Helpful hint */}
        <div
          style={{
            marginTop: "20px",
            padding: "12px 16px",
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.2)",
            borderRadius: "10px",
            fontSize: "0.82rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: "#c4b5fd" }}>{t.soundLibrary.tip}</strong> {t.soundLibrary.tipText}{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              background: "rgba(139,92,246,0.15)",
              padding: "1px 5px",
              borderRadius: "4px",
              color: "#a5b4fc",
            }}
          >
            A4
          </code>
          ,{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              background: "rgba(139,92,246,0.15)",
              padding: "1px 5px",
              borderRadius: "4px",
              color: "#a5b4fc",
            }}
          >
            C#5
          </code>
          ,{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              background: "rgba(139,92,246,0.15)",
              padding: "1px 5px",
              borderRadius: "4px",
              color: "#a5b4fc",
            }}
          >
            G3
          </code>
          {t.soundLibrary.tipSuffix}
        </div>
      </section>

      {/* Section 2 — Wave Comparison */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--color-border), transparent)",
            marginBottom: "48px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #ff00aa, #f97316)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            ∿
          </div>
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                lineHeight: 1.2,
              }}
            >
              {t.soundLibrary.waveComparison}
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
              {t.soundLibrary.waveComparisonSub}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {WAVE_IDS.map((_, idx) => (
            <WaveCard key={idx} waveIdx={idx} t={t} />
          ))}
        </div>

        {/* Explainer callout */}
        <div
          style={{
            marginTop: "28px",
            padding: "16px 20px",
            background: "rgba(255,0,170,0.06)",
            border: "1px solid rgba(255,0,170,0.2)",
            borderRadius: "10px",
            fontSize: "0.85rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: "#f9a8d4" }}>{t.soundLibrary.whyDifferent}</strong>{" "}
          {t.soundLibrary.whyDifferentText}
        </div>
      </section>

      <Footer />
    </div>
  );
}
