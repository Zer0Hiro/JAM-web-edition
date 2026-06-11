import { useLayoutEffect, useRef, lazy, Suspense } from "react";
import { Volume2, Zap, ArrowDown, Cpu } from "lucide-react";
import { useLanguage } from "../i18n/context";
import { gsap, SplitText, prefersReducedMotion } from "../utils/gsap";

// three.js is heavy — load the scene after first paint
const HeroScene = lazy(() => import("./HeroScene"));

/** Magnetic hover: button leans toward the cursor (desktop only). */
function magnetize(el) {
  if (!el || window.matchMedia("(hover: none)").matches) return () => {};
  const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
  const onMove = (e) => {
    const r = el.getBoundingClientRect();
    xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
    yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    xTo(0);
    yTo(0);
  };
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  return () => {
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerleave", onLeave);
  };
}

export default function Hero({ onStartLearning, onTryEditor, onBuildYourOwn }) {
  const { t, lang } = useLanguage();
  const rootRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(titleRef.current, {
        type: "words",
        mask: "words", // clip container per word for the reveal
        wordsClass: "hero-word",
      });

      // background-clip:text doesn't reach through the mask wrappers —
      // re-apply the gradient on each split word inside the highlight span
      split.words.forEach((w) => {
        if (w.closest(".gradient-text")) w.classList.add("gradient-text");
      });

      gsap.set(".hero-stagger", { autoAlpha: 0, y: 28 });
      gsap.set(split.words, { yPercent: 120, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".hero-badge", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.15)
        .to(
          split.words,
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.07 },
          0.25
        )
        .to(".hero-sub", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.65)
        .to(
          ".hero-cta",
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 },
          0.85
        )
        .to(".hero-scroll", { autoAlpha: 1, y: 0, duration: 0.8 }, 1.3);

      return () => split.revert();
    }, rootRef);

    const cleanups = gsap.utils
      .toArray(".hero-cta", rootRef.current)
      .map(magnetize);

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, [lang]);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Three.js particle wave terrain */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Soft radial vignette over the scene */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, transparent 0%, var(--color-bg-primary) 95%)",
        }}
      />

      {/* Badge */}
      <div className="hero-badge hero-stagger mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium glass-chip text-accent">
          <Zap size={14} />
          {t.hero.badge}
        </span>
      </div>

      {/* Main title */}
      <h1
        ref={titleRef}
        className="hero-title text-center font-bold mb-6"
        style={{
          fontSize: "clamp(2.6rem, 7.5vw, 6.5rem)",
          lineHeight: 1.04,
          letterSpacing: "-0.03em",
          maxWidth: "14ch",
        }}
      >
        {t.hero.titleBefore}
        <span className="gradient-text">{t.hero.titleHighlight}</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-sub hero-stagger text-center text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mb-10">
        {t.hero.subtitle}
      </p>

      {/* CTA buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <button
          onClick={onStartLearning}
          className="hero-cta hero-stagger group flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-lg
                     bg-accent-support text-[var(--color-bg-primary)]
                     transition-shadow hover:shadow-card cursor-pointer border-0"
        >
          <Volume2 size={20} />
          {t.hero.startLearning}
        </button>

        <button
          onClick={onTryEditor}
          className="hero-cta hero-stagger flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-lg
                     glass-chip text-[var(--color-text-primary)]
                     hover:text-accent transition-colors cursor-pointer"
        >
          {t.hero.tryEditor}
        </button>

        <button
          onClick={onBuildYourOwn}
          className="hero-cta hero-stagger flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-lg
                     glass-chip text-[var(--color-text-primary)]
                     hover:text-accent transition-colors cursor-pointer"
        >
          <Cpu size={20} />
          {t.hero.buildYourOwn}
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll hero-stagger absolute bottom-8 flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
        <span className="text-xs uppercase tracking-[0.25em]">
          {t.hero.scrollToExplore}
        </span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
