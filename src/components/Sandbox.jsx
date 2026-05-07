import CodeEditor from "./CodeEditor";

const SANDBOX_CODE = `# JAM Sandbox -- experiment freely!
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

export default function Sandbox() {
  return (
    <section id="sandbox" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">
            <span className="gradient-text">Sandbox</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto">
            No rules, no lessons -- just you and the code. Write whatever you want
            and hit Play to hear it. Break things. Experiment. Have fun.
          </p>
        </div>

        <CodeEditor initialCode={SANDBOX_CODE} />

        {/* Quick reference */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickRef
            title="Waveforms"
            items={["SIN -- smooth, pure", "SAW -- buzzy, bright", "SQUARE -- retro, hollow", "TRIANGLE -- mellow, soft", "NOISE -- random, percussive"]}
          />
          <QuickRef
            title="Notes"
            items={["C4 = Middle C", "A4 = 440 Hz", "C#4 / Db4 = sharps/flats", "C5 = octave above C4", "Duration: 0.25 to 4 beats"]}
          />
          <QuickRef
            title="Structure"
            items={["BPM sets tempo", "INSTRUMENT defines sounds", "SEQUENCE lists notes", "PATTERN places beats", "LOOP repeats sections"]}
          />
        </div>
      </div>
    </section>
  );
}

function QuickRef({ title, items }) {
  return (
    <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <h4 className="text-sm font-semibold text-[var(--color-accent-cyan)] mb-2">
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
