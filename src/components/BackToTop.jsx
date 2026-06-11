import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "../i18n/context";

/**
 * Floating back-to-top button. Fades in after scrolling past the hero;
 * fixed bottom-left so it never collides with the JAMai widget pinned
 * bottom-right.
 */
export default function BackToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t.nav.backToTop}
      title={t.nav.backToTop}
      className={`fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full glass-chip
                  flex items-center justify-center text-[var(--color-text-secondary)]
                  transition-all duration-300 cursor-pointer
                  hover:text-[var(--color-accent-cyan)] hover:-translate-y-1
                  hover:shadow-[0_8px_24px_rgba(133,183,235,0.3)]
                  ${visible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <ArrowUp size={18} />
    </button>
  );
}
