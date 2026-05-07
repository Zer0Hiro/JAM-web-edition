import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Circle,
  ChevronRight,
  ArrowLeft,
  ImageIcon,
  RotateCcw,
} from "lucide-react";
import Footer from "./Footer";
import { useLanguage } from "../i18n/context";
import step0Image from "../assets/0.jpeg";
import step1Image from "../assets/1.jpeg";
import step2Image from "../assets/2.jpeg";
import step3Image from "../assets/3.jpeg";
import step4Image from "../assets/4.jpeg";

const STORAGE_KEY = "jam-arduino-guide-step";

const STEP_IMAGES = {
  0: step0Image, 
  1: step1Image,
  2: step2Image,
  3: step3Image,
  4: step4Image,
};

const STEP_COLORS = [
  "#22d3ee",
  "#8b5cf6",
  "#34d399",
  "#f97316",
  "#ff00aa",
  "#00f0ff",
  "#a78bfa",
  "#f43f5e",
];

export default function ArduinoGuide({ onBack }) {
  const { t } = useLanguage();
  const steps = t.arduinoGuide.steps;
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeStep, setActiveStep] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const done = saved ? JSON.parse(saved) : [];
      return Math.min(done.length, steps.length - 1);
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  function markDone() {
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps((prev) => [...prev, activeStep]);
    }
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  }

  function resetProgress() {
    setCompletedSteps([]);
    setActiveStep(0);
    localStorage.removeItem(STORAGE_KEY);
  }

  const allDone = completedSteps.length === steps.length;
  const progress = (completedSteps.length / steps.length) * 100;
  const stepData = steps[activeStep];
  const step = { ...stepData, image: STEP_IMAGES[activeStep] || stepData.image };
  const color = STEP_COLORS[activeStep % STEP_COLORS.length];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer bg-transparent border-0"
          >
            <ArrowLeft size={16} />
            {t.arduinoGuide.back}
          </button>

          <span className="font-semibold text-sm">{t.arduinoGuide.title}</span>

          <button
            onClick={resetProgress}
            className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer bg-transparent border-0"
            title={t.arduinoGuide.resetProgress}
          >
            <RotateCcw size={13} />
            {t.arduinoGuide.reset}
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[var(--color-bg-secondary)]">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-magenta)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">

          {/* Sidebar — step list */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                {t.arduinoGuide.stepsLabel}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                {completedSteps.length}/{steps.length}
              </span>
            </div>

            <div className="space-y-1">
              {steps.map((s, idx) => {
                const done = completedSteps.includes(idx);
                const current = idx === activeStep;
                const stepColor = STEP_COLORS[idx % STEP_COLORS.length];
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-start text-sm transition-all cursor-pointer border-0
                      ${current
                        ? "bg-[var(--color-bg-card)] border border-[var(--color-border)]"
                        : "bg-transparent hover:bg-[var(--color-bg-secondary)]"
                      }`}
                  >
                    {done ? (
                      <CheckCircle2 size={16} style={{ color: stepColor }} className="flex-shrink-0" />
                    ) : (
                      <Circle size={16} className="flex-shrink-0" style={{ color: current ? stepColor : "var(--color-text-muted)" }} />
                    )}
                    <span className={`truncate ${current ? "text-[var(--color-text-primary)] font-medium" : "text-[var(--color-text-secondary)]"}`}>
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <div>
            {/* Step header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {activeStep + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>
                  {t.arduinoGuide.stepLabel} {activeStep + 1} {t.arduinoGuide.of} {steps.length}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{step.title}</h1>
              <p className="text-lg text-[var(--color-text-secondary)]">{step.subtitle}</p>
            </div>

            {/* Image or placeholder */}
            {step.image ? (
              <img
                src={step.image}
                alt={step.title}
                className="mb-8 rounded-2xl w-full object-cover border border-[var(--color-border)]"
              />
            ) : (
              <div
                className="mb-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-16 px-8"
                style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
              >
                <ImageIcon size={48} style={{ color, opacity: 0.4 }} />
                <p className="mt-4 text-sm text-[var(--color-text-muted)] text-center">
                  {step.imagePlaceholder || t.arduinoGuide.imagePlaceholder}
                </p>
                <span className="mt-2 text-xs font-mono text-[var(--color-text-muted)] opacity-60">
                  {step.imageFilename || `step-${activeStep + 1}.png`}
                </span>
              </div>
            )}

            {/* Text content placeholder */}
            <div className="mb-8 p-6 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
              <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
                {step.content || t.arduinoGuide.contentPlaceholder}
              </p>
            </div>

            {/* Tip box (if present) */}
            {step.tip && (
              <div
                className="mb-8 p-4 rounded-xl border text-sm"
                style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}
              >
                <strong style={{ color }}>{t.arduinoGuide.tipLabel}</strong>{" "}
                <span className="text-[var(--color-text-secondary)]">{step.tip}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
              {!completedSteps.includes(activeStep) ? (
                <button
                  onClick={markDone}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer border-0"
                  style={{ backgroundColor: color, color: "#000" }}
                >
                  <CheckCircle2 size={16} />
                  {activeStep < steps.length - 1
                    ? t.arduinoGuide.doneNext
                    : t.arduinoGuide.finish}
                </button>
              ) : (
                <>
                  <span className="flex items-center gap-2 text-sm font-medium" style={{ color }}>
                    <CheckCircle2 size={16} />
                    {t.arduinoGuide.stepDone}
                  </span>
                  {activeStep < steps.length - 1 && (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-primary)] border-2 border-[var(--color-border)] hover:border-[var(--color-accent-cyan)] transition-colors cursor-pointer bg-transparent"
                    >
                      {t.arduinoGuide.nextStep}
                      <ChevronRight size={16} />
                    </button>
                  )}
                </>
              )}
            </div>

            {/* All done celebration */}
            {allDone && (
              <div
                className="mt-8 p-6 rounded-2xl border-2 text-center"
                style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
              >
                <p className="text-2xl font-bold mb-2">{t.arduinoGuide.allDoneTitle}</p>
                <p className="text-[var(--color-text-secondary)]">{t.arduinoGuide.allDoneText}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
