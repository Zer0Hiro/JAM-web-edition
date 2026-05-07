import { useState } from "react";
import { Menu, X, Volume2 } from "lucide-react";

export default function Navbar({ onNavigate, currentView }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", view: "home" },
    { label: "Lessons", view: "lessons" },
    { label: "Sandbox", view: "sandbox" },
  ];

  function handleNav(view) {
    setMobileOpen(false);
    onNavigate(view);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)]/80 backdrop-blur-lg border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-magenta)] flex items-center justify-center">
            <Volume2 size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold gradient-text">JAM</span>
        </button>

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
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNav(item.view)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-0
                ${
                  currentView === item.view
                    ? "text-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)]/10"
                    : "text-[var(--color-text-secondary)]"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
