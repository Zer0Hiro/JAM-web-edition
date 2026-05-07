import WaveformVisualizer from "./WaveformVisualizer";
import { Volume2, Zap, ArrowDown } from "lucide-react";

export default function Hero({ onStartLearning, onTryEditor }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.15) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 20% 80%, rgba(0,240,255,0.08) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 80%, rgba(255,0,170,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Badge */}
      <div className="mb-6 fade-in-up" style={{ animationDelay: "0.1s" }}>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)] border border-[var(--color-accent-purple)]/20">
          <Zap size={14} />
          Just Arduino Music
        </span>
      </div>

      {/* Main title */}
      <h1
        className="hero-title text-center font-bold leading-tight mb-4 fade-in-up"
        style={{ fontSize: "4rem", animationDelay: "0.2s" }}
      >
        Turn Code Into{" "}
        <span className="gradient-text">Music</span>
      </h1>

      {/* Subtitle */}
      <p
        className="hero-subtitle text-center text-xl text-[var(--color-text-secondary)] max-w-2xl mb-8 fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        Learn to create sounds, beats, and songs with the JAM language.
        Write code, hear it play, and upload it to an Arduino -- no experience needed.
      </p>

      {/* CTA buttons */}
      <div
        className="flex flex-wrap items-center justify-center gap-4 mb-12 fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        <button
          onClick={onStartLearning}
          className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-lg
                     bg-[var(--color-accent-cyan)] text-[var(--color-bg-primary)]
                     hover:scale-105 transition-transform pulse-glow cursor-pointer border-0"
        >
          <Volume2 size={20} className="group-hover:animate-bounce" />
          Start Learning
        </button>

        <button
          onClick={onTryEditor}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-lg
                     bg-transparent text-[var(--color-text-primary)]
                     border-2 border-[var(--color-border)] hover:border-[var(--color-accent-magenta)]
                     hover:text-[var(--color-accent-magenta)] transition-colors cursor-pointer"
        >
          Try the Editor
        </button>
      </div>

      {/* Waveform */}
      <div
        className="w-full max-w-4xl fade-in-up"
        style={{ animationDelay: "0.5s" }}
      >
        <WaveformVisualizer
          width={1200}
          height={180}
          color="#00f0ff"
          secondaryColor="#ff00aa"
          active={true}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-[var(--color-text-muted)] animate-bounce">
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <ArrowDown size={16} />
      </div>
    </section>
  );
}
