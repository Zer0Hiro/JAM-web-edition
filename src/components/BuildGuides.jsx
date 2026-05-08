import {
  Cpu,
  Mic2,
  SlidersHorizontal,
  Speaker,
  ArrowRight,
  Lock,
} from "lucide-react";
import Footer from "./Footer";

const guides = [
  {
    id: "esp32-buzzer",
    title: "ESP32 Buzzer Build",
    subtitle:
      "Build your first physical JEM setup with an ESP32, breadboard, jumper wires, and buzzer.",
    status: "Ready",
    steps: "9 steps",
    level: "Beginner",
    icon: Cpu,
    accent: "var(--color-accent-cyan)",
    active: true,
  },
  {
    id: "voice-sound-control",
    title: "Voice and Sound Control",
    subtitle:
      "Use voice or sound input to control how your JEM project reacts and plays.",
    status: "Ready",
    steps: "6 steps",
    level: "Intermediate",
    icon: Mic2,
    accent: "var(--color-accent-magenta)",
    active: true,
  },
  {
    id: "sensors-interaction",
    title: "Sensors & Interaction",
    subtitle:
      "Connect buttons, sensors, and simple controls to make your sound project interactive.",
    status: "Coming soon",
    steps: "Soon",
    level: "Beginner",
    icon: SlidersHorizontal,
    accent: "var(--color-accent-purple)",
    active: false,
  },
  {
    id: "advanced-output",
    title: "Advanced Sound Output",
    subtitle:
      "Improve wiring, volume, speakers, and output quality for stronger physical sound.",
    status: "Coming soon",
    steps: "Soon",
    level: "Advanced",
    icon: Speaker,
    accent: "var(--color-accent-orange)",
    active: false,
  },
];

function GuideCard({ guide, onOpen }) {
  const Icon = guide.icon;

  return (
    <button
      type="button"
      onClick={guide.active && onOpen ? onOpen : undefined}
      disabled={!guide.active || !onOpen}
      className={`group text-start rounded-2xl border p-6 min-h-[280px] transition-all duration-200 ${
        guide.active
          ? "cursor-pointer hover:-translate-y-1 hover:shadow-2xl"
          : "cursor-not-allowed opacity-70"
      }`}
      style={{
        background:
          "linear-gradient(180deg, var(--color-bg-card), var(--color-bg-secondary))",
        borderColor: guide.active
          ? `${guide.accent}66`
          : "var(--color-border)",
        boxShadow: guide.active ? `0 0 24px ${guide.accent}18` : "none",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-5">
        {/* Icon */}
        <div
          className="rounded-xl w-12 h-12 flex items-center justify-center"
          style={{
            color: guide.accent,
            background: `${guide.accent}18`,
            border: `1px solid ${guide.accent}33`,
          }}
        >
          <Icon size={22} />
        </div>

        {/* Status badge */}
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={
            guide.active
              ? {
                  color: "var(--color-bg-primary)",
                  background: guide.accent,
                }
              : {
                  color: "var(--color-text-secondary)",
                  background: "var(--color-bg-elevated)",
                }
          }
        >
          {guide.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
        {guide.title}
      </h3>

      {/* Subtitle */}
      <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
        {guide.subtitle}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]">
          {guide.steps}
        </span>
        <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]">
          {guide.level}
        </span>
      </div>

      {/* Bottom action */}
      <div
        className="mt-auto flex items-center gap-2 font-semibold"
        style={{
          color: guide.active ? guide.accent : "var(--color-text-muted)",
        }}
      >
        {guide.active ? (
          <>
            <span>Open guide</span>
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </>
        ) : (
          <>
            <span>Locked for now</span>
            <Lock size={16} />
          </>
        )}
      </div>
    </button>
  );
}

export default function BuildGuides({ onOpenArduinoGuide, onOpenVoiceSoundGuide }) {
  const getGuideAction = (guide) => {
    if (guide.id === "esp32-buzzer") return onOpenArduinoGuide;
    if (guide.id === "voice-sound-control") return onOpenVoiceSoundGuide;
    return undefined;
  };

  return (
    <div
      className="pt-16 min-h-screen"
      style={{ background: "var(--color-bg-primary)" }}
    >
      <section className="relative px-4 py-20 overflow-hidden">
        {/* Decorative background */}
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 30%, rgba(255,0,170,0.08) 0%, transparent 45%)",
          }}
        />

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/20 mb-6">
              Hardware paths
            </span>

            <h1 className="text-5xl md:text-6xl font-bold mb-5">
              Build <span className="gradient-text">Guides</span>
            </h1>

            <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Choose a hardware guide and build your JEM setup step by step.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                onOpen={getGuideAction(guide)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
