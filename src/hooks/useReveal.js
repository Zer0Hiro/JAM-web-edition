import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../utils/gsap";

/**
 * Scroll-triggered reveal for elements inside a section.
 * Targets matching `selector` fade/slide in (staggered) when the
 * section enters the viewport. No-op when reduced motion is preferred.
 */
export default function useReveal(selector, options = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const {
      y = 40,
      stagger = 0.08,
      duration = 0.9,
      start = "top 78%",
      once = true,
    } = options;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector);
      if (!targets.length) return;
      gsap.set(targets, { autoAlpha: 0, y });
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          once,
        },
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector]);

  return ref;
}
