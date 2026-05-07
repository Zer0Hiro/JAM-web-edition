import { Code, Music, Cpu, Headphones, BookOpen, Gamepad2 } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Write Simple Code",
    description:
      "JAM is a beginner-friendly language designed for music. If you can write a text message, you can write JAM code.",
    color: "#00f0ff",
  },
  {
    icon: Headphones,
    title: "Hear It Instantly",
    description:
      "Press Play and hear your creation right in the browser. No setup, no downloads, no waiting.",
    color: "#ff00aa",
  },
  {
    icon: Cpu,
    title: "Run on Real Hardware",
    description:
      "Compile your code and upload it to an Arduino Uno. Your music plays on actual hardware through a speaker.",
    color: "#8b5cf6",
  },
  {
    icon: BookOpen,
    title: "Step-by-Step Lessons",
    description:
      "9 lessons that take you from zero to composing full tracks. Every line of code is explained.",
    color: "#34d399",
  },
  {
    icon: Music,
    title: "Real Sound Synthesis",
    description:
      "Learn the same synthesis techniques used in professional music: oscillators, envelopes, mixing, and more.",
    color: "#f97316",
  },
  {
    icon: Gamepad2,
    title: "Make Cool Stuff",
    description:
      "Build retro game sounds, drum machines, bass lines, and melodies. Impress your friends.",
    color: "#f43f5e",
  },
];

export default function FeatureCards() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            What is <span className="gradient-text">JAM</span>?
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            JAM (Junior Audio Maker) is a free platform for learning sound
            synthesis through code. No prior coding or music experience required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]
                         hover:border-opacity-50 transition-all"
              style={{
                "--hover-border": feature.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = feature.color + "50";
                e.currentTarget.style.boxShadow = `0 0 30px ${feature.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon size={20} style={{ color: feature.color }} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
