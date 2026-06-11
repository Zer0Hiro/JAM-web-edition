import { Code, Music, Cpu, Headphones, BookOpen, Gamepad2 } from "lucide-react";
import { useLanguage } from "../i18n/context";
import { gsap } from "../utils/gsap";
import useReveal from "../hooks/useReveal";

const ICONS = [Code, Headphones, Cpu, BookOpen, Music, Gamepad2];
const COLORS = ["#85B7EB", "#AFA9EC", "#7F77DD", "#34d399", "#f97316", "#f43f5e"];

/** 3D tilt toward the cursor (desktop hover only). */
function handleTiltMove(e) {
  if (window.matchMedia("(hover: none)").matches) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  gsap.to(el, {
    rotateY: px * 10,
    rotateX: -py * 10,
    scale: 1.02,
    duration: 0.4,
    ease: "power2.out",
    transformPerspective: 700,
  });
}

function handleTiltLeave(e) {
  gsap.to(e.currentTarget, {
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    duration: 0.6,
    ease: "elastic.out(1, 0.5)",
  });
}

export default function FeatureCards() {
  const { t } = useLanguage();
  const sectionRef = useReveal(".feature-card", { stagger: 0.09 });

  return (
    <section ref={sectionRef} className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="feature-card text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            {t.features.title} <span className="gradient-text">{t.features.titleHighlight}</span>?
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1200px" }}>
          {t.features.items.map((item, idx) => {
            const Icon = ICONS[idx];
            const color = COLORS[idx];
            return (
              <div
                key={idx}
                className="feature-card group relative p-6 rounded-2xl bg-[var(--color-bg-card)]/70 backdrop-blur-sm
                           border border-[var(--color-border)] overflow-hidden will-change-transform"
                onMouseMove={handleTiltMove}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color + "60";
                  e.currentTarget.style.boxShadow = `0 20px 60px -20px ${color}40, 0 0 30px ${color}12`;
                }}
                onMouseLeave={(e) => {
                  handleTiltLeave(e);
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Corner glow accent */}
                <div
                  className="absolute -top-12 -end-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${color}22 0%, transparent 70%)` }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
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
