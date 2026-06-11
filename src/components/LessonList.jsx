import { useLayoutEffect, useRef, lazy, Suspense } from "react";
import { getPhasesForLang } from "../lessons";
import LessonCard from "./LessonCard";
import { useLanguage } from "../i18n/context";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "../utils/gsap";

// three.js is heavy — load the backdrop after first paint
const LessonsScene = lazy(() => import("./three/LessonsScene"));

/**
 * The lessons journey. With `immersive` (dedicated lessons view) it gets a
 * three.js particle backdrop whose color travels through the phases, a
 * kinetic header with an animated progress ring, and a scroll-drawn
 * timeline connecting the phases. Embedded on the home page it stays the
 * lighter reveal-on-scroll layout.
 */
export default function LessonList({
  onSelectLesson,
  completedLessons = new Set(),
  immersive = false,
}) {
  const { t, lang } = useLanguage();
  const phases = getPhasesForLang(lang);
  const totalLessons = phases.reduce((sum, p) => sum + p.lessons.length, 0);
  const totalCompleted = phases.reduce(
    (sum, p) => sum + p.lessons.filter((l) => completedLessons.has(l.id)).length,
    0
  );
  const overallPct = totalLessons > 0 ? totalCompleted / totalLessons : 0;

  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Kinetic headline (immersive only — element won't exist otherwise)
      const headline = root.querySelector(".lessons-headline");
      if (headline) {
        const split = new SplitText(headline, { type: "chars" });
        // background-clip:text doesn't reach through split wrappers —
        // re-apply the gradient on each char inside the highlight span
        split.chars.forEach((c) => {
          if (c.closest(".gradient-text")) c.classList.add("gradient-text");
        });
        gsap.from(split.chars, {
          yPercent: 110,
          opacity: 0,
          rotateX: -45,
          duration: 0.9,
          stagger: 0.025,
          ease: "back.out(1.6)",
        });
      }

      // Progress ring draws in, counter counts up
      const ring = root.querySelector(".progress-ring-fill");
      if (ring) {
        const len = ring.getTotalLength?.() ?? 264;
        gsap.fromTo(
          ring,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: len * (1 - overallPct),
            duration: 1.6,
            ease: "power3.inOut",
            delay: 0.4,
          }
        );
      }
      const counter = root.querySelector(".progress-counter");
      if (counter) {
        const obj = { n: 0 };
        gsap.to(obj, {
          n: totalCompleted,
          duration: 1.4,
          delay: 0.4,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = Math.round(obj.n);
          },
        });
      }

      // Generic reveals
      gsap.utils.toArray(".lesson-reveal").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 44,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });

      // Card cascade per phase
      gsap.utils.toArray(".phase-cards").forEach((grid) => {
        gsap.from(grid.children, {
          autoAlpha: 0,
          y: 36,
          scale: 0.97,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        });
      });

      // Timeline spine draws with scroll; phase nodes pop as they arrive
      const spine = root.querySelector(".timeline-spine-fill");
      const track = root.querySelector(".timeline-track");
      if (spine && track) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: track,
              start: "top 65%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          }
        );
      }
      gsap.utils.toArray(".phase-node").forEach((node) => {
        gsap.from(node, {
          scale: 0,
          duration: 0.55,
          ease: "back.out(2.5)",
          scrollTrigger: { trigger: node, start: "top 75%", once: true },
        });
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, immersive]);

  return (
    <section ref={rootRef} id="lessons" className={immersive ? "pb-24 px-4 relative" : "py-24 px-4"}>
      {immersive && (
        <Suspense fallback={null}>
          <LessonsScene phaseColors={phases.map((p) => p.color)} />
        </Suspense>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {immersive ? (
          <div className="text-center pt-16 pb-14">
            <h2
              className="lessons-headline text-4xl md:text-6xl font-bold tracking-tight mb-4"
              style={{ perspective: "600px" }}
            >
              {t.lessonList.titleBefore}
              <span className="gradient-text">{t.lessonList.titleHighlight}</span>
            </h2>
            <p className="lesson-reveal text-[var(--color-text-secondary)] max-w-xl mx-auto mb-10">
              {t.lessonList.subtitle(totalLessons, phases.length)}
            </p>

            {/* Overall progress ring */}
            <div className="lesson-reveal inline-flex items-center gap-5 px-6 py-4 rounded-2xl
                            bg-[var(--color-bg-card)]/60 border border-[var(--color-border)] backdrop-blur-md">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke="var(--color-bg-elevated)" strokeWidth="8"
                  />
                  <circle
                    className="progress-ring-fill"
                    cx="50" cy="50" r="42" fill="none"
                    stroke="url(#lessonRingGrad)" strokeWidth="8" strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="lessonRingGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent-cyan)" />
                      <stop offset="100%" stopColor="var(--color-accent-purple)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-[var(--color-text-primary)]">
                    <span className="progress-counter">{totalCompleted}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">/{totalLessons}</span>
                  </span>
                </div>
              </div>
              <div className="text-start">
                {phases.map((phase) => {
                  const completed = phase.lessons.filter((l) => completedLessons.has(l.id)).length;
                  const pct = phase.lessons.length > 0 ? (completed / phase.lessons.length) * 100 : 0;
                  const phaseT = t.phases[phase.id];
                  return (
                    <div key={phase.id} className="flex items-center gap-2 mb-1 last:mb-0">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: phase.color }} />
                      <span className="text-[11px] text-[var(--color-text-muted)] w-28 truncate text-start">
                        {phaseT?.title || phase.title}
                      </span>
                      <div className="w-20 h-1 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: phase.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="lesson-reveal text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                {t.lessonList.titleBefore}
                <span className="gradient-text">{t.lessonList.titleHighlight}</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
                {t.lessonList.subtitle(totalLessons, phases.length)}
              </p>
            </div>

            <div className="lesson-reveal flex items-center justify-center gap-6 mb-12 flex-wrap">
              {phases.map((phase) => {
                const completed = phase.lessons.filter((l) => completedLessons.has(l.id)).length;
                const total = phase.lessons.length;
                const pct = total > 0 ? (completed / total) * 100 : 0;
                const phaseT = t.phases[phase.id];
                return (
                  <div key={phase.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.color }} />
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {phaseT?.title || phase.title}
                    </span>
                    <div className="w-16 h-1.5 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: phase.color }}
                      />
                    </div>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {completed}/{total}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Phase timeline */}
        <div className="timeline-track relative">
          {/* Spine: track + scroll-drawn fill */}
          <div className="absolute top-2 bottom-2 start-[19px] w-0.5 bg-[var(--color-border)] hidden sm:block" />
          <div
            className="timeline-spine-fill absolute top-2 bottom-2 start-[19px] w-0.5 hidden sm:block origin-top"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-accent-cyan), var(--color-accent-purple), var(--color-accent-magenta))",
            }}
          />

          {phases.map((phase) => {
            const phaseT = t.phases[phase.id];
            const completed = phase.lessons.filter((l) => completedLessons.has(l.id)).length;
            const phaseDone = completed === phase.lessons.length && phase.lessons.length > 0;
            return (
              <div key={phase.id} className="relative mb-14 last:mb-0">
                {/* Phase header with timeline node */}
                <div className="lesson-reveal flex items-center gap-3 mb-5 relative">
                  <div
                    className="phase-node w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold relative z-10"
                    style={{
                      backgroundColor: `${phase.color}22`,
                      color: phase.color,
                      boxShadow: phaseDone
                        ? `0 0 18px ${phase.color}66`
                        : `0 0 0 4px var(--color-bg-primary)`,
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
                  <span
                    className="ms-auto text-xs font-mono px-2 py-1 rounded-md hidden sm:block"
                    style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
                  >
                    {completed}/{phase.lessons.length}
                  </span>
                </div>

                {/* Lesson cards */}
                <div className="phase-cards grid grid-cols-1 md:grid-cols-2 gap-3 sm:ps-[52px]">
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
      </div>
    </section>
  );
}
