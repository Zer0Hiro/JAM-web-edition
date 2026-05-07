import { FileCode, Play, Cpu, Speaker } from "lucide-react";

const steps = [
  {
    icon: FileCode,
    number: "01",
    title: "Write your code",
    description:
      "Use the JAM language to define instruments, melodies, and drum patterns. The syntax is simple and readable.",
    color: "#00f0ff",
  },
  {
    icon: Play,
    number: "02",
    title: "Preview in browser",
    description:
      "Hit the Play button to hear your creation instantly using Web Audio. No hardware needed to get started.",
    color: "#ff00aa",
  },
  {
    icon: Cpu,
    number: "03",
    title: "Compile for Arduino",
    description:
      "When you're happy with your sound, compile it into real C++ code that runs on an Arduino Uno.",
    color: "#8b5cf6",
  },
  {
    icon: Speaker,
    number: "04",
    title: "Play on hardware",
    description:
      "Upload to your Arduino and connect a speaker to pin 9. Your code becomes actual sound waves!",
    color: "#34d399",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-[var(--color-bg-secondary)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto">
            From typing your first line to hearing it on real hardware -- here's the journey.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)]" />

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  idx % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <span
                    className="text-5xl font-bold opacity-20"
                    style={{ color: step.color }}
                  >
                    {step.number}
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
                      backgroundColor: `${step.color}15`,
                      border: `2px solid ${step.color}30`,
                    }}
                  >
                    <step.icon size={28} style={{ color: step.color }} />
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
