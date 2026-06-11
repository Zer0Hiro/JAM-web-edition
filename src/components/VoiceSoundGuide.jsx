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
import voiceStep1 from "../assets/2_1.jpeg";
import voiceStep2 from "../assets/2_2.jpeg";
import voiceStep3 from "../assets/2_3.jpeg";
import voiceStep4 from "../assets/2_4.jpeg";
import voiceStep5 from "../assets/2_5.jpeg";
import voiceStep6 from "../assets/2_6.jpeg";

const STORAGE_KEY = "jam-voice-sound-guide-progress";

const STEP_COLORS = [
  "#7f77dd",
  "#afa9ec",
  "#85b7eb",
  "#afa9ec",
  "#85b7eb",
  "#afa9ec",
];

const steps = [
  {
    title: "What You Need",
    subtitle: "Gather the parts before building the sound control circuit.",
    image: voiceStep1,
    content:
      "To build this guide, you need an ESP32 controller board, a potentiometer, two push buttons, a speaker, female-to-male jumper wires, and a large breadboard.",
    tip: "Keep the ESP32 outside the breadboard for this build. The breadboard will hold the input and output components.",
  },
  {
    title: "Step 1: Placement",
    subtitle: "Place each component in a clear area of the breadboard.",
    image: voiceStep2,
    content:
      "Start by organizing the breadboard into separate areas. Insert the potentiometer on the left side of the breadboard. Insert the two push buttons in the center, with each button crossing the middle groove. Insert the two speaker wires on the right side of the breadboard, with each wire in a separate column.",
    tip: "Separating the controls and speaker wires makes the circuit easier to debug later.",
  },
  {
    title: "Step 2: Power Rails",
    subtitle: "Connect voltage and ground rails for the whole circuit.",
    image: voiceStep3,
    content:
      "Many parts need voltage and ground, so prepare the side rails first. Connect a jumper wire from a GND pin on the ESP32 to the long blue rail on the breadboard. Then connect a jumper wire from the 3.3V pin on the ESP32 to the long red rail on the breadboard.",
    tip: "Use the blue rail for ground and the red rail for 3.3V. Keeping these colors consistent prevents wiring mistakes.",
  },
  {
    title: "Step 3: Potentiometer",
    subtitle: "Wire the variable resistor so it can control sound values.",
    image: voiceStep4,
    content:
      "The potentiometer has three legs in a row. Connect the left leg to the red rail for voltage. Connect the right leg to the blue rail for ground. Connect the middle leg to GPIO 34 on the ESP32. This middle leg sends the changing control value to the board.",
    tip: "GPIO 34 is an input-only pin on many ESP32 boards, which makes it a good choice for reading analog control values.",
  },
  {
    title: "Step 4: Buttons and Speaker",
    subtitle: "Add two command buttons and connect speaker output pins.",
    image: voiceStep5,
    content:
      "For each push button, one side goes to a command pin and the other side goes to ground. Connect one side of Button A to GPIO 12. Connect one side of Button B to GPIO 14. Connect the opposite legs of both buttons to the blue ground rail. Then connect the speaker: connect one speaker wire column to GPIO 25 and the other speaker wire column to GPIO 26.",
    tip: "The buttons act like simple digital controls. The speaker is connected to GPIO 25 and GPIO 26 for sound output.",
  },
  {
    title: "Step 5: Final Check",
    subtitle: "Check the circuit before connecting power and running code.",
    image: voiceStep6,
    content:
      "Before powering the circuit, make sure every component that needs ground is connected to the blue rail. Make sure the speaker wires and button wires are not touching each other. When everything looks correct, connect the ESP32 to the computer and run the code.",
    tip: "If something does not work, disconnect the board first, then check one section at a time: power rails, potentiometer, buttons, and speaker.",
  },
];

export default function VoiceSoundGuide({ onBack }) {
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
  const step = steps[activeStep];
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
            Build Guides
          </button>

          <span className="font-semibold text-sm">Voice and Sound Control</span>

          <button
            onClick={resetProgress}
            className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer bg-transparent border-0"
            title="Reset progress"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[var(--color-bg-secondary)]">
          <div
            className="h-full bg-gradient-to-r from-accent-deep to-accent-support transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">

          {/* Sidebar */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Steps
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
                  Step {activeStep + 1} of {steps.length}
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
                className="mb-8 rounded-xl w-full object-cover border border-[var(--color-border)]"
              />
            ) : (
              <div
                className="mb-8 rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-16 px-8"
                style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
              >
                <ImageIcon size={48} style={{ color, opacity: 0.4 }} />
                <p className="mt-4 text-sm text-[var(--color-text-muted)] text-center">
                  Step image coming soon
                </p>
                <span className="mt-2 text-xs font-mono text-[var(--color-text-muted)] opacity-60">
                  {`step-${activeStep + 1}.png`}
                </span>
              </div>
            )}

            {/* Content card */}
            <div className="mb-8 p-6 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
              <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
                {step.content}
              </p>
            </div>

            {/* Tip box */}
            {step.tip && (
              <div
                className="mb-8 p-4 rounded-xl border text-sm"
                style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}
              >
                <strong style={{ color }}>Tip:</strong>{" "}
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
                  {activeStep < steps.length - 1 ? "Done — Next Step" : "Finish"}
                </button>
              ) : (
                <>
                  <span className="flex items-center gap-2 text-sm font-medium" style={{ color }}>
                    <CheckCircle2 size={16} />
                    Step done
                  </span>
                  {activeStep < steps.length - 1 && (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-primary)] border-2 border-[var(--color-border)] hover:border-accent transition-colors cursor-pointer bg-transparent"
                    >
                      Next step
                      <ChevronRight size={16} />
                    </button>
                  )}
                </>
              )}
            </div>

            {/* All done */}
            {allDone && (
              <div
                className="mt-8 p-6 rounded-xl border-2 text-center"
                style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
              >
                <p className="text-2xl font-bold mb-2">All set!</p>
                <p className="text-[var(--color-text-secondary)]">
                  Your Voice and Sound Control circuit is ready for JEM experiments.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
