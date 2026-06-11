import { ExternalLink } from "lucide-react";
import { useLanguage } from "../i18n/context";
import logoSvg from "../assets/logo.svg";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 px-4 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / brand */}
          <div className="text-center md:text-start flex flex-col md:flex-row items-center gap-2">
            <img src={logoSvg} alt="JEM" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold gradient-text">JEM</span>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://sensorium.github.io/Mozzi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-support)] transition-colors no-underline"
            >
              {t.footer.mozzi}
              <ExternalLink size={12} />
            </a>
            <a
              href="https://github.com/Zer0Hiro/jamWeb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-support)] transition-colors no-underline"
            >
              {t.footer.github}
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            {t.footer.builtFor}
          </p>
        </div>
      </div>
    </footer>
  );
}
