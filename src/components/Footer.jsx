import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / brand */}
          <div className="text-center md:text-left">
            <span className="text-xl font-bold gradient-text">JAM</span>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Just Arduino Music
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://sensorium.github.io/Mozzi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-colors no-underline"
            >
              Mozzi Library
              <ExternalLink size={12} />
            </a>
            <a
              href="https://github.com/Zer0Hiro/jamWeb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-colors no-underline"
            >
              GitHub
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            Built for learning. Powered by Mozzi 2.0 and the Web Audio API.
          </p>
        </div>
      </div>
    </footer>
  );
}
