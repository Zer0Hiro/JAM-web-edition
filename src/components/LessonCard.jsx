import { useRef, useCallback } from "react";
import { ChevronRight, Clock, Check } from "lucide-react";
import { useLanguage } from "../i18n/context";
import { gsap, prefersReducedMotion } from "../utils/gsap";

const PHASE_COLORS = {
  1: { bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.3)", text: "#22d3ee" },
  2: { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)", text: "#34d399" },
  3: { bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)", text: "#f97316" },
  4: { bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)", text: "#a78bfa" },
  5: { bg: "rgba(244,63,94,0.1)", border: "rgba(244,63,94,0.3)", text: "#f43f5e" },
};

function DifficultyStars({ level, maxLevel = 5 }) {
  return (
    <span className="inline-flex gap-0.5 text-sm" title={`${level}/${maxLevel}`}>
      {Array.from({ length: maxLevel }, (_, i) => (
        <span key={i} style={{ opacity: i < level ? 1 : 0.2 }}>
          {"⭐"}
        </span>
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
    // Cursor spotlight position
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    // Subtle 3D tilt toward the cursor
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

  return (
    <div style={{ perspective: "900px" }}>
      <button
        ref={cardRef}
        onClick={() => onClick(lesson)}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="lesson-card card-spotlight group w-full text-start p-5 rounded-xl border transition-colors cursor-pointer relative overflow-hidden"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: completed ? colors.text : "var(--color-border)",
          boxShadow: completed ? `0 0 20px ${colors.bg}` : "none",
          "--spot-color": colors.bg,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <div className="flex items-start justify-between gap-3 relative">
          <div className="flex-1 min-w-0">
            {/* Lesson number and difficulty */}
            <div className="flex items-center gap-3 mb-2">
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold transition-transform group-hover:scale-110"
                style={{ backgroundColor: colors.bg, color: colors.text }}
              >
                {completed ? <Check size={16} strokeWidth={3} /> : lesson.id}
              </span>
              <DifficultyStars level={lesson.difficulty} />
              {completed && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium">
                  {t.lessonList.done}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
              {lesson.title}
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              {lesson.subtitle}
            </p>

            {/* Concepts */}
            <div className="flex flex-wrap gap-2 mb-2">
              {lesson.concepts.map((concept) => (
                <span
                  key={concept}
                  className="text-xs px-2 py-1 rounded-md font-medium transition-transform group-hover:-translate-y-0.5"
                  style={{ backgroundColor: colors.bg, color: colors.text }}
                >
                  {concept}
                </span>
              ))}
            </div>

            {/* Time estimate */}
            <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <Clock size={12} />
              ~{lesson.estimatedMinutes} {t.lessonList.min}
            </div>
          </div>

          {/* Arrow nudges toward the click on hover */}
          <ChevronRight
            size={20}
            className="mt-2 text-[var(--color-text-muted)] flex-shrink-0 transition-all duration-300
                       group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:text-[var(--color-text-primary)]"
          />
        </div>
      </button>
    </div>
  );
}
