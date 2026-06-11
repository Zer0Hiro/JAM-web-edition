import { useRef, useCallback, useEffect, useLayoutEffect, useState } from "react";
import Footer from "./Footer";
import PageHeader from "./PageHeader";
import { useLanguage } from "../i18n/context";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../utils/gsap";

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
  if (waveType === "handpan") {
    const bufLen = Math.round(ctx.sampleRate * (dur + 0.1));
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    const decayS = dur * 0.8;
    const octDecayS = decayS * 0.6;
    const fifDecayS = decayS * 0.35;
    const noiseDurS = 0.012;
    for (let i = 0; i < bufLen; i++) {
      const t = i / ctx.sampleRate;
      const s1 = Math.sin(2 * Math.PI * freq * t);
      const s2 = Math.sin(2 * Math.PI * freq * 2 * t);
      const s3 = Math.sin(2 * Math.PI * freq * 3 * t);
      const a1 = Math.exp(-t / decayS);
      const a2 = t < octDecayS ? 0.6 * (1 - t / octDecayS) : 0;
      const a3 = t < fifDecayS ? 0.3 * (1 - t / fifDecayS) : 0;
      const a4 = t < noiseDurS ? 0.15 * (Math.random() * 2 - 1) : 0;
      data[i] = s1 * a1 + s2 * a2 + s3 * a3 + a4;
    }
    source = ctx.createBufferSource();
    source.buffer = buf;
  } else if (waveType === "pluck") {
    const bufLen = ctx.sampleRate * (dur + 0.1);
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    const period = Math.round(ctx.sampleRate / freq);
    const line = new Float32Array(period);
    for (let i = 0; i < period; i++) line[i] = Math.random() * 2 - 1;
    for (let i = 0; i < bufLen; i++) {
      const idx = i % period;
      data[i] = line[idx];
      line[idx] = (line[idx] + line[(idx + 1) % period]) * 0.498;
    }
    source = ctx.createBufferSource();
    source.buffer = buf;
  } else if (waveType === "bell") {
    const bufLen = Math.round(ctx.sampleRate * (dur + 0.1));
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    const decayS = dur * 0.8;
    const h2DecayS = decayS * 0.4;
    const h3DecayS = decayS * 0.2;
    for (let i = 0; i < bufLen; i++) {
      const t = i / ctx.sampleRate;
      const s1 = Math.sin(2 * Math.PI * freq * t);
      const s2 = Math.sin(2 * Math.PI * freq * 2 * t);
      const s3 = Math.sin(2 * Math.PI * freq * 3 * t);
      const a1 = Math.exp(-t / decayS);
      const a2 = t < h2DecayS ? 0.47 * (1 - t / h2DecayS) : 0;
      const a3 = t < h3DecayS ? 0.23 * (1 - t / h3DecayS) : 0;
      data[i] = s1 * a1 + s2 * a2 + s3 * a3;
    }
    source = ctx.createBufferSource();
    source.buffer = buf;
  } else if (waveType === "noise") {
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

const WAVE_IDS = ["sine", "sawtooth", "square", "triangle", "noise", "pluck", "handpan", "bell"];
const WAVE_LABELS = ["SIN", "SAW", "SQUARE", "TRIANGLE", "NOISE", "PLUCK", "HANDPAN", "BELL"];
const WAVE_COLORS = [
  { color: "#85B7EB", glow: "rgba(133,183,235,0.4)", border: "rgba(133,183,235,0.5)", bg: "rgba(133,183,235,0.08)" },
  { color: "#AFA9EC", glow: "rgba(175,169,236,0.4)", border: "rgba(175,169,236,0.5)", bg: "rgba(175,169,236,0.08)" },
  { color: "#f97316", glow: "rgba(249,115,22,0.4)", border: "rgba(249,115,22,0.5)", bg: "rgba(249,115,22,0.08)" },
  { color: "#7F77DD", glow: "rgba(127,119,221,0.4)", border: "rgba(127,119,221,0.5)", bg: "rgba(127,119,221,0.08)" },
  { color: "#22d3ee", glow: "rgba(34,211,238,0.4)", border: "rgba(34,211,238,0.5)", bg: "rgba(34,211,238,0.08)" },
  { color: "#eab308", glow: "rgba(234,179,8,0.4)", border: "rgba(234,179,8,0.5)", bg: "rgba(234,179,8,0.08)" },
  { color: "#10b981", glow: "rgba(16,185,129,0.4)", border: "rgba(16,185,129,0.5)", bg: "rgba(16,185,129,0.08)" },
  { color: "#e2b04a", glow: "rgba(226,176,74,0.4)", border: "rgba(226,176,74,0.5)", bg: "rgba(226,176,74,0.08)" },
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
  // pluck (decaying burst — Karplus-Strong visual)
  (w, h) => {
    const pts = [];
    let seed = 7;
    const rand = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; };
    for (let x = 0; x <= w; x += 2) {
      const t = x / w;
      const envelope = Math.exp(-t * 4);
      const osc = Math.sin(t * Math.PI * 16) * 0.6 + (rand() - 0.5) * 0.4;
      const y = h / 2 - osc * envelope * (h / 2.5);
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  },
  // handpan (fundamental + octave + fifth, all decaying)
  (w, h) => {
    const pts = [];
    for (let x = 0; x <= w; x += 2) {
      const t = x / w;
      const e1 = Math.exp(-t * 2.5);
      const e2 = Math.exp(-t * 5) * 0.6;
      const e3 = Math.exp(-t * 8) * 0.3;
      const s = Math.sin(t * Math.PI * 8) * e1
              + Math.sin(t * Math.PI * 16) * e2
              + Math.sin(t * Math.PI * 24) * e3;
      const y = h / 2 - s * (h / 3);
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  },
  // bell (sine fundamental + fast-decaying 2nd and 3rd harmonics)
  (w, h) => {
    const pts = [];
    for (let x = 0; x <= w; x += 2) {
      const t = x / w;
      const e1 = Math.exp(-t * 2);
      const e2 = Math.exp(-t * 6) * 0.47;
      const e3 = Math.exp(-t * 12) * 0.23;
      const s = Math.sin(t * Math.PI * 8) * e1
              + Math.sin(t * Math.PI * 16) * e2
              + Math.sin(t * Math.PI * 24) * e3;
      const y = h / 2 - s * (h / 3);
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
        border: `1px solid ${active ? color.border : "rgba(255,255,255,0.08)"}`,
        boxShadow: active ? `0 0 14px ${color.glow}, 0 0 4px ${color.glow}` : "none",
        color: active ? "#fff" : color.text,
        transform: active ? "translateY(-2px)" : "none",
        transition: "all 0.15s ease",
        cursor: "pointer",
        borderRadius: "10px",
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
  const descKey = WAVE_IDS[waveIdx];

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
      className="card-spotlight group relative overflow-hidden rounded-2xl border
                 bg-[var(--color-bg-card)] p-5 flex flex-col gap-3.5 select-none
                 transition-all duration-300 hover:-translate-y-1"
      style={{
        "--spot-color": c.bg,
        borderColor: active ? c.border : "var(--color-border)",
        boxShadow: active
          ? `0 0 24px ${c.glow}`
          : undefined,
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.boxShadow = `0 16px 40px -18px ${c.glow}`;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Accent hairline along the top edge */}
      <span
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${c.color}66, transparent)` }}
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between">
        <span
          className="text-[12px] font-bold tracking-[0.18em] uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: c.color,
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
          className="rounded-full px-3 py-1 text-[11px] font-semibold cursor-pointer
                     transition-all duration-200 border"
          style={{
            fontFamily: "var(--font-mono)",
            background: active ? c.border : `${c.color}0a`,
            borderColor: active ? c.border : `${c.color}40`,
            color: active ? "#fff" : c.color,
            boxShadow: active ? `0 0 10px ${c.glow}` : "none",
          }}
        >
          {active ? t.soundLibrary.playing : t.soundLibrary.hearIt}
        </button>
      </div>

      <div className="relative flex justify-center py-1">
        <WaveShape waveIdx={waveIdx} width={200} height={64} />
      </div>

      <p className="relative text-sm leading-relaxed text-[var(--color-text-secondary)] m-0">
        {t.soundLibrary.waveDescs[descKey]}
      </p>

      <div
        className="relative mt-auto pt-3 border-t text-[11px] text-[var(--color-text-muted)]"
        style={{
          fontFamily: "var(--font-mono)",
          borderColor: "color-mix(in srgb, var(--color-border) 60%, transparent)",
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
  const pageRef = useRef(null);

  // Reveal each section as it scrolls in (plays immediately when a view
  // switch lands with the section already on screen)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const root = pageRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".sl-section").forEach((el) => {
        gsap.set(el, { autoAlpha: 0, y: 40 });
        const show = () =>
          gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" });
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
          show();
        } else {
          ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: show });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

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
    <div ref={pageRef} className="pt-16 min-h-screen">
      {/* Page header */}
      <PageHeader eyebrow={t.soundLibrary.interactive} subtitle={t.soundLibrary.subtitle}>
        <span className="gradient-text">{t.soundLibrary.title}</span>
      </PageHeader>

      {/* Section 1 — Note Explorer */}
      <section
        className="sl-section"
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
                className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold cursor-pointer
                           border transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: on ? col.bg : "transparent",
                  borderColor: on ? col.border : "var(--color-border)",
                  color: on ? col.text : "var(--color-text-muted)",
                  boxShadow: on ? `0 0 12px ${col.glow ?? col.border}22` : "none",
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
                className="card-spotlight relative overflow-hidden rounded-2xl border
                           border-[var(--color-border)] bg-[var(--color-bg-card)] p-5
                           transition-all duration-300"
                style={{ "--spot-color": col.bg }}
              >
                {/* Accent hairline + giant ghost octave number */}
                <span
                  className="absolute top-0 inset-x-0 h-px pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${col.border}, transparent)`,
                  }}
                  aria-hidden="true"
                />
                <span
                  className="absolute -top-4 end-2 text-[72px] font-black leading-none select-none
                             pointer-events-none tracking-tighter opacity-[0.06]"
                  style={{ color: col.text, fontFamily: "var(--font-mono)" }}
                  aria-hidden="true"
                >
                  {octave}
                </span>
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
        className="sl-section"
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
          {WAVE_IDS.slice(0, 4).map((_, idx) => (
            <WaveCard key={idx} waveIdx={idx} t={t} />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "48px", marginBottom: "28px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #10b981, #e2b04a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            ✦
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
              {t.soundLibrary.specialWaves}
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
              {t.soundLibrary.specialWavesSub}
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
          {WAVE_IDS.slice(4).map((_, idx) => (
            <WaveCard key={idx + 4} waveIdx={idx + 4} t={t} />
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
