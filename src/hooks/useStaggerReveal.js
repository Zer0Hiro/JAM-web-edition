import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../utils/gsap";

/**
 * Staggered entrance for elements matching `selector` inside the ref'd root.
 * Plays immediately when the group is already on screen (view switches can
 * restore arbitrary scroll offsets, which leaves a plain ScrollTrigger armed
 * with stale measurements); otherwise arms a one-shot trigger.
 */
export default function useStaggerReveal(
  selector,
  { y = 40, stagger = 0.08, duration = 0.8, delay = 0, start = "top 85%" } = {}
) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector);
      if (!targets.length) return;
      // CSS hover transitions on the cards would fight the per-frame GSAP
      // updates — suspend them for the duration of the entrance
      targets.forEach((el) => el.classList.add("gsap-revealing"));
      gsap.set(targets, { autoAlpha: 0, y });
      const show = () =>
        gsap.to(targets, {
          autoAlpha: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          onComplete: () => targets.forEach((el) => el.classList.remove("gsap-revealing")),
        });
      if (root.getBoundingClientRect().top < window.innerHeight * 0.95) {
        show();
      } else {
        ScrollTrigger.create({ trigger: root, start, once: true, onEnter: show });
      }
    }, root);

    return () => {
      const targets = root.querySelectorAll(".gsap-revealing");
      targets.forEach((el) => el.classList.remove("gsap-revealing"));
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector]);

  return ref;
}
