import { useLayoutEffect, useRef, lazy, Suspense } from "react";
import CodeEditor from "./CodeEditor";
import { useLanguage } from "../i18n/context";
import { gsap, SplitText, prefersReducedMotion } from "../utils/gsap";

// three.js is heavy — load the visualizer after first paint
const SandboxScene = lazy(() => import("./three/SandboxScene"));

const SANDBOX_CODE = `# JEM Sandbox -- experiment freely!
# Try changing notes, waveforms, tempos, and instruments.

BPM 120

INSTRUMENT synth:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 200 100
    VOLUME 180

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 60
    VOLUME 200

SEQUENCE melody:
    PLAY synth C4 0.5
    PLAY synth E4 0.5
    PLAY synth G4 0.5
    PLAY synth C5 0.5
    PLAY synth G4 0.5
    PLAY synth E4 0.5
    PLAY synth C4 1
    REST 0.5

PATTERN beat:
    BEAT 1: kick
    BEAT 2: snare
    BEAT 3: kick
    BEAT 4: snare

LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat`;

/**
 * The sandbox. With `immersive` (dedicated view) the header hosts an
 * audio-reactive three.js spectrum ring that dances with the preview
 * playback, plus GSAP entrance choreography. Embedded on the home page
 * it stays the compact layout.
 */
export default function Sandbox({ initialCode, immersive = false }) {
  const { t } = useLanguage();
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!immersive || prefersReducedMotion()) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Suspend CSS hover transitions on animated targets while revealing
      const animated = root.querySelectorAll(".sandbox-editor, .sandbox-ref, .sandbox-sub");
      animated.forEach((el) => el.classList.add("gsap-revealing"));
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => animated.forEach((el) => el.classList.remove("gsap-revealing")),
      });

      const headline = root.querySelector(".sandbox-headline");
      if (headline) {
        const split = new SplitText(headline, { type: "chars" });
        // background-clip:text doesn't reach through split wrappers —
        // re-apply the gradient on each char inside the highlight span
        split.chars.forEach((c) => {
          if (c.closest(".gradient-text")) c.classList.add("gradient-text");
        });
        tl.from(split.chars, {
          yPercent: 120,
          opacity: 0,
          rotateX: -50,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.out(1.7)",
        });
      }
      tl.from(".sandbox-sub", { autoAlpha: 0, y: 24, duration: 0.7 }, "-=0.4");
      tl.from(
        ".sandbox-editor",
        { autoAlpha: 0, y: 60, scale: 0.985, duration: 0.9, clearProps: "transform,opacity,visibility" },
        "-=0.35"
      );
      tl.from(
        ".sandbox-ref",
        { autoAlpha: 0, y: 36, duration: 0.6, stagger: 0.1, clearProps: "transform,opacity,visibility" },
        "-=0.5"
      );
    }, root);

    return () => ctx.revert();
  }, [immersive]);

  return (
    <section ref={rootRef} id="sandbox" className={immersive ? "pb-20 px-4" : "py-20 px-4"}>
      {immersive ? (
        /* Audio-reactive hero header */
        <div className="relative h-[320px] md:h-[400px] -mx-4 mb-2 flex items-center justify-center overflow-hidden">
          {/* Visualizer anchored low so the ring sits beneath the copy */}
          <div className="absolute inset-x-0 top-24 -bottom-24">
            <Suspense fallback={null}>
              <SandboxScene />
            </Suspense>
          </div>
          {/* Readability scrim between the ring and the text */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 50% at 50% 38%, var(--color-bg-primary) 0%, color-mix(in srgb, var(--color-bg-primary) 70%, transparent) 50%, transparent 78%)",
            }}
          />
          <div className="text-center relative pointer-events-none -translate-y-6">
            <h2
              className="sandbox-headline text-4xl md:text-6xl font-bold tracking-tight mb-4"
              style={{ perspective: "600px" }}
            >
              <span className="gradient-text">{t.sandbox.title}</span>
            </h2>
            <p
              className="sandbox-sub text-[var(--color-text-secondary)] max-w-lg mx-auto"
              style={{ textShadow: "0 1px 12px var(--color-bg-primary), 0 0 4px var(--color-bg-primary)" }}
            >
              {t.sandbox.subtitle}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">
            <span className="gradient-text">{t.sandbox.title}</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto">
            {t.sandbox.subtitle}
          </p>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="sandbox-editor">
          <CodeEditor initialCode={initialCode ?? SANDBOX_CODE} />
        </div>

        {/* Quick reference */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickRef className="sandbox-ref" title={t.sandbox.waveforms} items={t.sandbox.waveformItems} />
          <QuickRef className="sandbox-ref" title={t.sandbox.notes} items={t.sandbox.noteItems} />
          <QuickRef className="sandbox-ref" title={t.sandbox.structure} items={t.sandbox.structureItems} />
        </div>
      </div>
    </section>
  );
}

function QuickRef({ title, items, className = "" }) {
  return (
    <div
      className={`${className} p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]
                  transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-cyan)]/40
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]`}
    >
      <h4 className="text-sm font-semibold text-[var(--color-accent-cyan)] mb-2">
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-xs text-[var(--color-text-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
