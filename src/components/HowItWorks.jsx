import { FileCode, Play, Cpu, Speaker } from "lucide-react";
import { useLanguage } from "../i18n/context";

const ICONS = [FileCode, Play, Cpu, Speaker];
const COLORS = ["#85B7EB", "#AFA9EC", "#7F77DD", "#34d399"];
const NUMBERS = ["01", "02", "03", "04"];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-[var(--color-bg-secondary)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            {t.howItWorks.title} <span className="gradient-text">{t.howItWorks.titleHighlight}</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)]" />

          <div className="space-y-12">
            {t.howItWorks.steps.map((step, idx) => {
              const Icon = ICONS[idx];
              const color = COLORS[idx];
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    idx % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 text-center md:text-start">
                    <span
                      className="text-5xl font-bold opacity-20"
                      style={{ color }}
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
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${color}15`,
                        border: `2px solid ${color}30`,
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
