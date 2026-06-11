import { useLayoutEffect, useRef } from "react";
import { FileCode, Play, Cpu, Speaker } from "lucide-react";
import { useLanguage } from "../i18n/context";
import { gsap, prefersReducedMotion } from "../utils/gsap";

const ICONS = [FileCode, Play, Cpu, Speaker];
const COLORS = ["#85B7EB", "#AFA9EC", "#7F77DD", "#85B7EB"];
const NUMBERS = ["01", "02", "03", "04"];

export default function HowItWorks() {
  const { t } = useLanguage();
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".hiw-header", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });

      // Center line draws as you scroll through the section
      gsap.fromTo(
        ".hiw-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".hiw-steps",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      // Steps slide in from alternating sides
      gsap.utils.toArray(".hiw-step").forEach((step, idx) => {
        gsap.from(step, {
          autoAlpha: 0,
          x: idx % 2 === 0 ? -60 : 60,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 80%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="py-24 px-4 bg-[var(--color-bg-secondary)] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="hiw-header text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            {t.howItWorks.title} <span className="gradient-text">{t.howItWorks.titleHighlight}</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="relative hiw-steps">
          {/* Connection line (drawn on scroll) */}
          <div
            className="hiw-line hidden md:block absolute left-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              background:
                "linear-gradient(to bottom, #85B7EB, #AFA9EC, #7F77DD, #85B7EB)",
            }}
          />

          <div className="space-y-16">
            {t.howItWorks.steps.map((step, idx) => {
              const Icon = ICONS[idx];
              const color = COLORS[idx];
              return (
                <div
                  key={idx}
                  className={`hiw-step flex flex-col md:flex-row items-center gap-8 ${
                    idx % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 text-center md:text-start">
                    <span
                      className="text-6xl font-bold opacity-15 select-none"
                      style={{ color, letterSpacing: "-0.04em" }}
                    >
                      {NUMBERS[idx]}
                    </span>
                    <h3 className="text-xl font-semibold mt-2 mb-2 text-[var(--color-text-primary)]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Icon node */}
                  <div className="relative z-10">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-sm transition-transform duration-300 hover:scale-110"
                      style={{
                        backgroundColor: `${color}15`,
                        border: `2px solid ${color}35`,
                        boxShadow: "var(--shadow-md)",
                      }}
                    >
                      <Icon size={28} style={{ color }} />
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
