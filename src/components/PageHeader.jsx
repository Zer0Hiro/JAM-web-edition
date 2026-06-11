import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText, prefersReducedMotion } from "../utils/gsap";

/**
 * Shared kinetic page header: mono eyebrow, SplitText char-reveal headline,
 * staggered subtitle. Matches the lessons/sandbox entrance choreography.
 * Pass the headline as children (include a .gradient-text span if wanted).
 */
export default function PageHeader({ eyebrow, accent = "var(--color-accent-cyan)", subtitle, children }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const eyebrowEl = root.querySelector(".ph-eyebrow");
      if (eyebrowEl) {
        tl.from(eyebrowEl, { autoAlpha: 0, y: 14, duration: 0.5 });
      }
      const headline = root.querySelector(".ph-headline");
      if (headline) {
        const split = new SplitText(headline, { type: "chars" });
        // background-clip:text doesn't reach through split wrappers —
        // re-apply the gradient on each char inside the highlight span
        split.chars.forEach((c) => {
          if (c.closest(".gradient-text")) c.classList.add("gradient-text");
        });
        tl.from(
          split.chars,
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -50,
            duration: 0.8,
            stagger: 0.025,
            ease: "back.out(1.7)",
          },
          "-=0.25"
        );
      }
      tl.from(".ph-stagger", { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.1 }, "-=0.45");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="text-center pt-16 pb-12 px-4">
      {eyebrow && (
        <div
          className="ph-eyebrow inline-flex items-center gap-2 mb-5 text-[11px] font-semibold
                     tracking-[0.22em] uppercase"
          style={{ color: accent, fontFamily: "var(--font-mono)" }}
        >
          <span className="w-6 h-px" style={{ background: accent }} aria-hidden="true" />
          {eyebrow}
          <span className="w-6 h-px" style={{ background: accent }} aria-hidden="true" />
        </div>
      )}
      <h1
        className="ph-headline text-4xl md:text-6xl font-bold tracking-tight mb-4"
        style={{ perspective: "600px" }}
      >
        {children}
      </h1>
      {subtitle && (
        <p className="ph-stagger text-[var(--color-text-secondary)] max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
