import { Code, Music, Cpu, Headphones, BookOpen, Gamepad2 } from "lucide-react";
import { useLanguage } from "../i18n/context";

const ICONS = [Code, Headphones, Cpu, BookOpen, Music, Gamepad2];
const COLORS = ["#85B7EB", "#AFA9EC", "#7F77DD", "#34d399", "#f97316", "#f43f5e"];

export default function FeatureCards() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            {t.features.title} <span className="gradient-text">{t.features.titleHighlight}</span>?
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.features.items.map((item, idx) => {
            const Icon = ICONS[idx];
            const color = COLORS[idx];
            return (
              <div
                key={idx}
                className="group p-6 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]
                           hover:border-opacity-50 transition-all"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color + "50";
                  e.currentTarget.style.boxShadow = `0 0 30px ${color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
