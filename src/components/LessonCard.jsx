import { useRef, useCallback } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "../i18n/context";
import { gsap, prefersReducedMotion } from "../utils/gsap";

const PHASE_COLORS = {
  1: { bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.3)", text: "#22d3ee" },
  2: { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)", text: "#34d399" },
  3: { bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)", text: "#f97316" },
  4: { bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)", text: "#a78bfa" },
  5: { bg: "rgba(244,63,94,0.1)", border: "rgba(244,63,94,0.3)", text: "#f43f5e" },
};

/** Difficulty as a tiny equalizer: rising bars, filled up to the level. */
function DifficultyMeter({ level, color, maxLevel = 5 }) {
  return (
    <span
      className="inline-flex items-end gap-[3px] h-3.5"
      title={`${level}/${maxLevel}`}
      aria-label={`difficulty ${level}/${maxLevel}`}
    >
      {Array.from({ length: maxLevel }, (_, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full transition-colors"
          style={{
            height: `${34 + i * 16.5}%`,
            backgroundColor: i < level ? color : "var(--color-border)",
          }}
        />
      ))}
    </span>
  );
}

export default function LessonCard({ lesson, onClick, completed = false }) {
  const { t } = useLanguage();
  const colors = PHASE_COLORS[lesson.phase] || PHASE_COLORS[1];
  const cardRef = useRef(null);
  const quickRef = useRef(null);

  const getTweens = useCallback(() => {
    if (!quickRef.current && cardRef.current) {
      quickRef.current = {
        rx: gsap.quickTo(cardRef.current, "rotationX", { duration: 0.5, ease: "power3.out" }),
        ry: gsap.quickTo(cardRef.current, "rotationY", { duration: 0.5, ease: "power3.out" }),
        s: gsap.quickTo(cardRef.current, "scale", { duration: 0.4, ease: "power3.out" }),
      };
    }
    return quickRef.current;
  }, []);

  const handleMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    const tw = getTweens();
    if (tw) {
      tw.ry((px - 0.5) * 8);
      tw.rx((0.5 - py) * 6);
      tw.s(1.015);
    }
  }, [getTweens]);

  const handleLeave = useCallback(() => {
    const tw = getTweens();
    if (tw) {
      tw.rx(0);
      tw.ry(0);
      tw.s(1);
    }
  }, [getTweens]);

  const lessonNo = String(lesson.id).padStart(2, "0");

  return (
    <div className="h-full" style={{ perspective: "900px" }}>
      <button
        ref={cardRef}
        onClick={() => onClick(lesson)}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="lesson-card card-spotlight group w-full h-full text-start rounded-2xl border cursor-pointer
                   relative overflow-hidden flex flex-col"
        style={{
          background:
            "linear-gradient(160deg, color-mix(in srgb, var(--color-bg-elevated) 55%, transparent), transparent 55%), var(--color-bg-card)",
          borderColor: completed ? `${colors.text}66` : "var(--color-border)",
          boxShadow: completed ? `inset 0 0 30px ${colors.bg}, 0 0 18px ${colors.bg}` : "none",
          "--spot-color": colors.bg,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Giant ghost lesson number — editorial watermark */}
        <span
          className="absolute -top-5 end-1 text-[88px] font-black leading-none select-none
                     pointer-events-none tracking-tighter transition-opacity duration-300
                     opacity-[0.07] group-hover:opacity-[0.13]"
          style={{ color: colors.text, fontFamily: "var(--font-mono)" }}
          aria-hidden="true"
        >
          {lessonNo}
        </span>

        {/* Phase accent: hairline along the top edge */}
        <span
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.text}55, transparent)`,
          }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col flex-1 p-5">
          {/* Eyebrow: lesson label + difficulty meter */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-[11px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: colors.text, fontFamily: "var(--font-mono)" }}
            >
              {completed ? (
                <span className="inline-flex items-center gap-1">
                  <Check size={11} strokeWidth={3} /> {t.lessonList.done}
                </span>
              ) : (
                `· ${lessonNo}`
              )}
            </span>
            <DifficultyMeter level={lesson.difficulty} color={colors.text} />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1 tracking-tight">
            {lesson.title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            {lesson.subtitle}
          </p>

          {/* Concept tags: quiet mono ghosts */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {lesson.concepts.map((concept) => (
              <span
                key={concept}
                className="text-[11px] px-2 py-0.5 rounded-md border transition-all duration-300
                           group-hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-secondary)",
                  borderColor: `${colors.text}2a`,
                  backgroundColor: `${colors.text}0a`,
                }}
              >
                {concept}
              </span>
            ))}
          </div>

          {/* Footer: duration + action */}
          <div
            className="mt-auto flex items-center justify-between pt-3 border-t"
            style={{ borderColor: "color-mix(in srgb, var(--color-border) 60%, transparent)" }}
          >
            <span
              className="text-[11px] text-[var(--color-text-muted)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ~{lesson.estimatedMinutes} {t.lessonList.min}
            </span>
            <span
              className="card-action inline-flex items-center justify-center w-7 h-7 rounded-full border
                         transition-all duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              style={{
                borderColor: `${colors.text}40`,
                color: colors.text,
              }}
            >
              <ArrowRight size={13} className="rtl:rotate-180 transition-transform duration-300 group-hover:scale-110" />
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
