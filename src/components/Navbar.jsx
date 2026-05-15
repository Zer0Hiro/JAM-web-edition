import { useState } from "react";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { useLanguage } from "../i18n/context";
import { useTheme } from "../context/ThemeContext";
import logoSvg from "../assets/logo.svg";

export default function Navbar({ onNavigate, currentView }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, lang, setLang, langs } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: t.nav.home, view: "home" },
    { label: t.nav.lessons, view: "lessons" },
    { label: t.nav.sandbox, view: "sandbox" },
    { label: t.nav.sounds, view: "library" },
    { label: t.nav.guide, view: "buildGuides" },
  ];

  function handleNav(view) {
    setMobileOpen(false);
    onNavigate(view);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)]/80 backdrop-blur-lg border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Music Library (left group) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
          >
            <img src={logoSvg} alt="JEM" className="w-8 h-8 rounded-lg" />
            <span className="text-lg font-bold gradient-text">JEM</span>
          </button>

          <button
            onClick={() => handleNav("musicLibrary")}
            className={`hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer border
              ${currentView === "musicLibrary"
                ? "text-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)]/15 border-[var(--color-accent-cyan)]/60 shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                : "text-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)]/5 border-[var(--color-accent-cyan)]/25 hover:bg-[var(--color-accent-cyan)]/12 hover:border-[var(--color-accent-cyan)]/50 hover:shadow-[0_0_8px_rgba(0,240,255,0.18)]"
              }`}
          >
            {t.nav.musicLibrary}
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNav(item.view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-0
                ${
                  currentView === item.view
                    ? "text-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)]/10"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)]"
                }`}
            >
              {item.label}
            </button>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="ms-2 p-2 rounded-lg text-sm transition-colors cursor-pointer bg-transparent border-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)]"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)]"
            >
              <Globe size={15} />
              {langs.find((l) => l.code === lang)?.flag}
            </button>
            {langOpen && (
              <div className="absolute top-full end-0 mt-1 py-1 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-lg min-w-[140px] z-50">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full text-start px-4 py-2 text-sm transition-colors cursor-pointer bg-transparent border-0 flex items-center gap-2
                      ${lang === l.code
                        ? "text-[var(--color-accent-cyan)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
                      }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[var(--color-text-secondary)] cursor-pointer bg-transparent border-0"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
          {[...navItems, { label: t.nav.musicLibrary, view: "musicLibrary" }].map((item) => (
            <button
              key={item.view}
              onClick={() => handleNav(item.view)}
              className={`w-full text-start px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-0
                ${
                  currentView === item.view
                    ? "text-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)]/10"
                    : "text-[var(--color-text-secondary)]"
                }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile theme + language picker */}
          <div className="flex gap-2 px-4 pt-3 border-t border-[var(--color-border)] mt-2">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm cursor-pointer border-0 transition-colors bg-transparent text-[var(--color-text-secondary)]"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
          <div className="flex gap-2 px-4 pt-2">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setMobileOpen(false); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm cursor-pointer border-0 transition-colors
                  ${lang === l.code
                    ? "bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)]"
                    : "bg-transparent text-[var(--color-text-secondary)]"
                  }`}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
