import { getPhasesForLang } from "../lessons";
import LessonCard from "./LessonCard";
import { useLanguage } from "../i18n/context";
import useReveal from "../hooks/useReveal";

export default function LessonList({ onSelectLesson, completedLessons = new Set() }) {
  const { t, lang } = useLanguage();
  const phases = getPhasesForLang(lang);
  const totalLessons = phases.reduce((sum, p) => sum + p.lessons.length, 0);
  const sectionRef = useReveal(".lesson-reveal", { stagger: 0.1, start: "top 80%" });

  return (
    <section ref={sectionRef} id="lessons" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="lesson-reveal text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            {t.lessonList.titleBefore}
            <span className="gradient-text">{t.lessonList.titleHighlight}</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            {t.lessonList.subtitle(totalLessons, phases.length)}
          </p>
        </div>

        {/* Progress overview */}
        <div className="lesson-reveal flex items-center justify-center gap-6 mb-12 flex-wrap">
          {phases.map((phase) => {
            const completed = phase.lessons.filter((l) =>
              completedLessons.has(l.id)
            ).length;
            const total = phase.lessons.length;
            const pct = total > 0 ? (completed / total) * 100 : 0;
            const phaseT = t.phases[phase.id];

            return (
              <div key={phase.id} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: phase.color }}
                />
                <span className="text-xs text-[var(--color-text-muted)]">
                  {phaseT?.title || phase.title}
                </span>
                <div className="w-16 h-1.5 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: phase.color,
                    }}
                  />
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {completed}/{total}
                </span>
              </div>
            );
          })}
        </div>

        {/* Phase sections */}
        {phases.map((phase) => {
          const phaseT = t.phases[phase.id];
          return (
            <div key={phase.id} className="lesson-reveal mb-12">
              {/* Phase header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{
                    backgroundColor: `${phase.color}15`,
                    color: phase.color,
                  }}
                >
                  {phase.id}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {phaseT?.title || phase.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {phaseT?.description || phase.description}
                  </p>
                </div>
              </div>

              {/* Lesson cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ps-[52px]">
                {phase.lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onClick={onSelectLesson}
                    completed={completedLessons.has(lesson.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
