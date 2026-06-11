import {
  Cpu,
  Mic2,
  SlidersHorizontal,
  Speaker,
  ArrowRight,
  Lock,
} from "lucide-react";
import Footer from "./Footer";
import PageHeader from "./PageHeader";
import useStaggerReveal from "../hooks/useStaggerReveal";

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
      className={`guide-card card-spotlight group text-start rounded-2xl border p-6 md:p-7 min-h-[280px]
                  relative overflow-hidden flex flex-col transition-all duration-300
                  bg-[var(--color-bg-card)] ${
        guide.active
          ? "cursor-pointer hover:-translate-y-1.5"
          : "cursor-not-allowed"
      }`}
      style={{
        "--spot-color": guide.active ? `${guide.accent}12` : "transparent",
        borderColor: guide.active ? `${guide.accent}44` : "var(--color-border)",
      }}
      onMouseEnter={
        guide.active
          ? (e) => {
              e.currentTarget.style.borderColor = `${guide.accent}77`;
              e.currentTarget.style.boxShadow = `0 18px 50px -18px ${guide.accent}4d`;
            }
          : undefined
      }
      onMouseLeave={
        guide.active
          ? (e) => {
              e.currentTarget.style.borderColor = `${guide.accent}44`;
              e.currentTarget.style.boxShadow = "";
            }
          : undefined
      }
    >
      {/* Ghost icon watermark */}
      <Icon
        size={150}
        className={`absolute -bottom-7 -end-7 pointer-events-none transition-all duration-500
                    ${guide.active ? "opacity-[0.06] group-hover:opacity-[0.11] group-hover:rotate-6" : "opacity-[0.04]"}`}
        style={{ color: guide.accent }}
        aria-hidden="true"
      />
      {/* Accent hairline along the top edge */}
      <span
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${guide.accent}${guide.active ? "66" : "22"}, transparent)`,
        }}
        aria-hidden="true"
      />

      <div className={`relative flex flex-col flex-1 ${guide.active ? "" : "opacity-60"}`}>
        {/* Header row: icon chip + mono status */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="rounded-xl w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              color: guide.accent,
              background: `${guide.accent}16`,
              border: `1px solid ${guide.accent}33`,
            }}
          >
            <Icon size={22} />
          </div>
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: guide.active ? guide.accent : "var(--color-text-muted)",
            }}
          >
            {!guide.active && <Lock size={11} />}
            {guide.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2 tracking-tight">
          {guide.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5">
          {guide.subtitle}
        </p>

        {/* Tags: quiet mono ghosts */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {[guide.steps, guide.level].map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-md border"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-secondary)",
                borderColor: `${guide.accent}2a`,
                backgroundColor: `${guide.accent}0a`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer action */}
        <div
          className="mt-auto flex items-center justify-between pt-4 border-t"
          style={{ borderColor: "color-mix(in srgb, var(--color-border) 60%, transparent)" }}
        >
          <span
            className="text-sm font-semibold"
            style={{ color: guide.active ? guide.accent : "var(--color-text-muted)" }}
          >
            {guide.active ? "Open guide" : "Locked for now"}
          </span>
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border
                       transition-all duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            style={{
              borderColor: guide.active ? `${guide.accent}40` : "var(--color-border)",
              color: guide.active ? guide.accent : "var(--color-text-muted)",
            }}
          >
            {guide.active ? (
              <ArrowRight size={14} className="rtl:rotate-180" />
            ) : (
              <Lock size={13} />
            )}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function BuildGuides({ onOpenArduinoGuide, onOpenVoiceSoundGuide }) {
  const gridRef = useStaggerReveal(".guide-card", { y: 48, stagger: 0.1 });

  const getGuideAction = (guide) => {
    if (guide.id === "esp32-buzzer") return onOpenArduinoGuide;
    if (guide.id === "voice-sound-control") return onOpenVoiceSoundGuide;
    return undefined;
  };

  return (
    <div className="pt-16 min-h-screen">
      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <PageHeader
            eyebrow="Hardware paths"
            subtitle="Choose a hardware guide and build your JEM setup step by step."
          >
            Build <span className="gradient-text">Guides</span>
          </PageHeader>

          {/* Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
