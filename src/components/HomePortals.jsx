import { useLayoutEffect, useRef } from "react";
import { ArrowRight, GraduationCap, FlaskConical } from "lucide-react";
import { getPhasesForLang } from "../lessons";
import { useLanguage } from "../i18n/context";
import { gsap, prefersReducedMotion } from "../utils/gsap";

/**
 * Home page gateways to the two main experiences. Replaces the old
 * full embeds of LessonList and Sandbox with two bold portal cards:
 * the lessons card maps the curriculum phases (live progress), the
 * sandbox card runs a CSS equalizer in the app's accent gradient.
 */
export default function HomePortals({
  onOpenLessons,
  onOpenSandbox,
  completedLessons = new Set(),
}) {
  const { t, lang } = useLanguage();
  const phases = getPhasesForLang(lang);
  const totalLessons = phases.reduce((sum, p) => sum + p.lessons.length, 0);
  const totalCompleted = phases.reduce(
    (sum, p) => sum + p.lessons.filter((l) => completedLessons.has(l.id)).length,
    0
  );
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".portal-card", {
        autoAlpha: 0,
        y: 64,
        scale: 0.97,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="portals" className="py-24 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* ── Lessons portal ─────────────────────────────────────── */}
        <button
          onClick={onOpenLessons}
          className="portal-card card-spotlight group relative overflow-hidden rounded-3xl border
                     border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 md:p-10 text-start
                     cursor-pointer transition-all duration-500
                     hover:border-[var(--color-accent-cyan)]/50 hover:shadow-[0_20px_60px_-20px_rgba(34,211,238,0.25)]"
          style={{ "--spot-color": "rgba(34,211,238,0.08)" }}
        >
          {/* Phase-colored aurora */}
          <div
            className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-80 pointer-events-none"
            style={{
              background: `
                radial-gradient(420px circle at 85% -10%, ${phases[0]?.color}22, transparent 60%),
                radial-gradient(380px circle at -10% 110%, ${phases[3]?.color || "#a78bfa"}1e, transparent 60%)`,
            }}
            aria-hidden="true"
          />

          <div className="relative">
            <div className="flex items-center gap-2 mb-6 text-[var(--color-accent-cyan)]">
              <GraduationCap size={18} />
              <span
                className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t.nav.lessons}
              </span>
              <span
                className="ms-auto text-[11px] text-[var(--color-text-muted)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {totalCompleted}/{totalLessons}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              {t.lessonList.titleBefore}
              <span className="gradient-text">{t.lessonList.titleHighlight}</span>
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-8 max-w-sm">
              {t.lessonList.subtitle(totalLessons, phases.length)}
            </p>

            {/* Curriculum map: one segment per phase, filled by progress */}
            <div className="flex items-center gap-1.5 mb-2">
              {phases.map((phase) => {
                const done = phase.lessons.filter((l) => completedLessons.has(l.id)).length;
                const pct = phase.lessons.length ? (done / phase.lessons.length) * 100 : 0;
                return (
                  <div
                    key={phase.id}
                    className="h-1.5 flex-1 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-y-[1.6]"
                    style={{ backgroundColor: `${phase.color}26` }}
                    title={t.phases[phase.id]?.title}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: phase.color }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mb-8">
              <span className="text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                {t.phases[1]?.title}
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                {t.phases[phases.length]?.title || ""}
              </span>
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-cyan)]">
              {t.hero.startLearning}
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-current/40
                           transition-all duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1
                           group-hover:bg-[var(--color-accent-cyan)]/10"
              >
                <ArrowRight size={14} className="rtl:rotate-180" />
              </span>
            </span>
          </div>
        </button>

        {/* ── Sandbox portal ─────────────────────────────────────── */}
        <button
          onClick={onOpenSandbox}
          className="portal-card card-spotlight group relative overflow-hidden rounded-3xl border
                     border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 md:p-10 text-start
                     cursor-pointer transition-all duration-500
                     hover:border-[var(--color-accent-magenta)]/50 hover:shadow-[0_20px_60px_-20px_rgba(175,169,236,0.3)]"
          style={{ "--spot-color": "rgba(175,169,236,0.08)" }}
        >
          {/* Equalizer skyline along the bottom edge */}
          <div
            className="absolute inset-x-6 bottom-0 h-24 flex items-end gap-1 opacity-35
                       transition-opacity duration-500 group-hover:opacity-70 pointer-events-none"
            aria-hidden="true"
          >
            {Array.from({ length: 28 }, (_, i) => (
              <span
                key={i}
                className="eq-bar flex-1 rounded-t-sm"
                style={{
                  height: `${22 + ((i * 37) % 62)}%`,
                  background: "linear-gradient(to top, var(--color-accent-cyan), var(--color-accent-purple))",
                  animationDelay: `${(i % 7) * 0.13}s`,
                  animationDuration: `${0.9 + ((i * 13) % 5) * 0.12}s`,
                }}
              />
            ))}
          </div>
          {/* Fade so the bars never collide with the copy */}
          <div
            className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
            style={{
              background: "linear-gradient(to top, transparent 30%, var(--color-bg-card))",
              opacity: 0.55,
            }}
            aria-hidden="true"
          />

          <div className="relative">
            <div className="flex items-center gap-2 mb-6 text-[var(--color-accent-magenta)]">
              <FlaskConical size={18} />
              <span
                className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t.nav.sandbox}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              <span className="gradient-text">{t.sandbox.title}</span>
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-8 max-w-sm">
              {t.sandbox.subtitle}
            </p>

            {/* Code teaser */}
            <div
              className="inline-block text-[11px] leading-relaxed px-3 py-2 rounded-lg mb-8
                         bg-[var(--color-bg-primary)]/60 border border-[var(--color-border)]"
              style={{ fontFamily: "var(--font-mono)" }}
              dir="ltr"
            >
              <span className="text-[var(--color-accent-purple)]">PLAY</span>{" "}
              <span className="text-[var(--color-text-secondary)]">synth</span>{" "}
              <span className="text-[var(--color-accent-cyan)]">C4</span>{" "}
              <span className="text-[var(--color-text-muted)]">0.5</span>
              <span className="inline-block w-1.5 h-3 ms-1 align-middle bg-[var(--color-accent-cyan)] animate-pulse" />
            </div>

            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-magenta)]">
                {t.hero.tryEditor}
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-current/40
                             transition-all duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1
                             group-hover:bg-[var(--color-accent-magenta)]/10"
                >
                  <ArrowRight size={14} className="rtl:rotate-180" />
                </span>
              </span>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
