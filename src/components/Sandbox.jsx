import CodeEditor from "./CodeEditor";
import { useLanguage } from "../i18n/context";

const SANDBOX_CODE = `# JEM Sandbox -- experiment freely!
# Try changing notes, waveforms, tempos, and instruments.

BPM 120

INSTRUMENT synth:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 200 100
    VOLUME 180

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 60
    VOLUME 200

SEQUENCE melody:
    PLAY synth C4 0.5
    PLAY synth E4 0.5
    PLAY synth G4 0.5
    PLAY synth C5 0.5
    PLAY synth G4 0.5
    PLAY synth E4 0.5
    PLAY synth C4 1
    REST 0.5

PATTERN beat:
    BEAT 1: kick
    BEAT 2: snare
    BEAT 3: kick
    BEAT 4: snare

LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat`;

export default function Sandbox({ initialCode }) {
  const { t } = useLanguage();

  return (
    <section id="sandbox" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">
            <span className="gradient-text">{t.sandbox.title}</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto">
            {t.sandbox.subtitle}
          </p>
        </div>

        <CodeEditor initialCode={initialCode ?? SANDBOX_CODE} />

        {/* Quick reference */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickRef title={t.sandbox.waveforms} items={t.sandbox.waveformItems} />
          <QuickRef title={t.sandbox.notes} items={t.sandbox.noteItems} />
          <QuickRef title={t.sandbox.structure} items={t.sandbox.structureItems} />
        </div>
      </div>
    </section>
  );
}

function QuickRef({ title, items }) {
  return (
    <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <h4 className="text-sm font-semibold text-[var(--color-accent-support)] mb-2">
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-xs text-[var(--color-text-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
