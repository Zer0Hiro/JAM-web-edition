import { ChevronRight, Clock } from "lucide-react";
import { useLanguage } from "../i18n/context";

const PHASE_COLORS = {
  1: { bg: "rgba(175,169,236,0.1)", border: "rgba(175,169,236,0.3)", text: "var(--color-accent)" },
  2: { bg: "rgba(133,183,235,0.1)", border: "rgba(133,183,235,0.3)", text: "var(--color-accent-support)" },
  3: { bg: "rgba(175,169,236,0.1)", border: "rgba(175,169,236,0.3)", text: "var(--color-accent)" },
  4: { bg: "rgba(133,183,235,0.1)", border: "rgba(133,183,235,0.3)", text: "var(--color-accent-support)" },
  5: { bg: "rgba(175,169,236,0.1)", border: "rgba(175,169,236,0.3)", text: "var(--color-accent)" },
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

  return (
    <button
      onClick={() => onClick(lesson)}
      className="lesson-card w-full text-start p-5 rounded-xl border transition-all cursor-pointer"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: completed ? "var(--color-success)" : "var(--color-border)",
        boxShadow: completed ? "var(--shadow-md)" : "none",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Lesson number and difficulty */}
          <div className="flex items-center gap-3 mb-2">
            <span
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {lesson.id}
            </span>
            <DifficultyStars level={lesson.difficulty} />
            {completed && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success font-medium">
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
                className="text-xs px-2 py-1 rounded-md font-medium"
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

        {/* Arrow */}
        <ChevronRight
          size={20}
          className="mt-2 text-[var(--color-text-muted)] flex-shrink-0"
        />
      </div>
    </button>
  );
}
