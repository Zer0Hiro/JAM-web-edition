const lesson07 = {
  id: 7,
  slug: "envelope-shapes",
  title: "Envelope Shapes",
  subtitle: "Control how sounds fade in and out",
  phase: 3,
  difficulty: 3,
  goal: "Understand ADSR envelopes and use them to create plucks, pads, and stabs.",
  concepts: ["ADSR envelope", "Attack/Decay/Sustain/Release", "Sound shaping"],
  estimatedMinutes: 15,

  steps: [
    {
      title: "What is an envelope?",
      content: `When you pluck a guitar string, the sound is loud at first, then gradually fades away. When you press a piano key and hold it, the note starts quickly, sustains while you hold it, then fades when you release.

This "shape" of volume over time is called an **envelope**. In synthesis, we control this with four parameters: **Attack, Decay, Sustain, Release** -- or **ADSR**.`,
    },
    {
      title: "The four stages",
      content: `\`\`\`
ADSR 10 50 200 100
\`\`\`

Each number is a time in milliseconds:

1. **Attack (10ms)** -- How quickly the sound reaches full volume. Short = snappy, long = gradual fade-in.
2. **Decay (50ms)** -- How quickly it drops from the peak to the sustain level.
3. **Sustain (200ms)** -- How long the sound holds at a steady level.
4. **Release (100ms)** -- How quickly the sound fades out after the note ends.

Think of it like turning a dial up, letting it drop a bit, holding it steady, then turning it down to zero.`,
    },
    {
      title: "Pluck vs pad",
      content: `Different ADSR settings create totally different vibes:

**Pluck** (like a guitar pick):
\`\`\`
ADSR 2 80 0 60
\`\`\`
Very fast attack (2ms), quick decay (80ms), no sustain, short release. The sound pops and disappears.

**Pad** (like a choir):
\`\`\`
ADSR 300 100 400 500
\`\`\`
Slow attack (300ms), gentle decay, long sustain, long release. The sound swells in and lingers.

**Stab** (like a brass hit):
\`\`\`
ADSR 5 100 50 30
\`\`\`
Instant attack, medium decay, short sustain, quick release. Punchy and aggressive.`,
    },
  ],

  code: `# Envelope Shapes
# A pad with slow attack and a pluck with fast decay.

BPM 90

INSTRUMENT pad:
    TYPE SYNTH
    WAVE SIN
    ADSR 300 100 400 500
    VOLUME 160

INSTRUMENT pluck:
    TYPE SYNTH
    WAVE SAW
    ADSR 2 80 0 60
    VOLUME 200

SEQUENCE chords:
    PLAY pad C4 4
    PLAY pad E4 4
    PLAY pad G4 4

SEQUENCE arpegg:
    PLAY pluck C5 0.25
    REST 0.25
    PLAY pluck E5 0.25
    REST 0.25
    PLAY pluck G5 0.25
    REST 0.25
    PLAY pluck C6 0.25
    REST 0.25

PLAY_SEQUENCE chords
LOOP 4:
    PLAY_SEQUENCE arpegg`,

  challenges: [
    {
      id: "long-pad",
      text: "Change the pad's attack to 500 and release to 800. It becomes even more dreamy!",
      hint: "Long attacks and releases are what make ambient music feel so floaty.",
    },
    {
      id: "stab",
      text: "Change the pluck ADSR to 5 100 50 30 for a punchy stab sound.",
      hint: "Short, aggressive envelopes are used in EDM and house music all the time.",
    },
    {
      id: "zero-release",
      text: "Set the pluck's release to 0. The notes cut off instantly -- like a muted guitar.",
      hint: "A release of 0 means the sound stops dead the moment the note duration ends.",
    },
  ],

  funFact:
    "The ADSR envelope was invented by Vladimir Ussachevsky and Robert Moog in the 1960s for early analog synthesizers. Before ADSR, synthesizers could only produce continuous tones -- boring! ADSR gave electronic music its expressiveness.",
};

export default lesson07;
