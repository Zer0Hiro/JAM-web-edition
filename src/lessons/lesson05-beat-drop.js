const lesson05 = {
  id: 5,
  slug: "beat-drop",
  title: "Beat Drop",
  subtitle: "Add drums to your music",
  phase: 2,
  difficulty: 2,
  goal: "Create drum instruments and build a drum pattern using PATTERN and BEAT.",
  concepts: ["DRUM instruments", "PATTERN block", "BEAT positioning"],
  estimatedMinutes: 15,

  steps: [
    {
      title: "Drums are different",
      content: `Drums work differently from melodic instruments. Instead of playing specific notes like C4 or G5, drums make short bursts of sound at a fixed pitch.

In JAM, you create a drum with \`TYPE DRUM\` instead of \`TYPE SYNTH\`:

\`\`\`
INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN       # deep thump
    FREQ 60        # fixed low frequency
    DECAY 80       # how quickly the sound fades
    VOLUME 255     # max volume!
\`\`\`

- **FREQ** sets a fixed pitch (drums don't change notes)
- **DECAY** controls how quickly the sound fades out (in milliseconds)
- A sine wave at a low frequency makes a great kick drum!`,
    },
    {
      title: "Snare and hi-hat",
      content: `For a snare drum, use NOISE instead of SIN -- it creates that "crack" sound:

\`\`\`
INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 60
    VOLUME 220
\`\`\`

For a hi-hat (the "tss tss tss" sound), use NOISE with a higher frequency and shorter decay:

\`\`\`
INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 30
    VOLUME 140
\`\`\`

Lower DECAY = shorter sound. Higher FREQ = brighter/clickier.`,
    },
    {
      title: "The PATTERN block",
      content: `Instead of SEQUENCE (which plays notes one after another), PATTERN lets you place drum hits at specific beat positions within a bar:

\`\`\`
PATTERN basic_beat:
    BEAT 1: kick
    BEAT 2: snare
    BEAT 3: kick
    BEAT 4: snare
\`\`\`

Each BEAT line says "at beat X, trigger this instrument." Beats are numbered 1, 2, 3, 4 in a standard 4/4 time bar.

The key difference: in a PATTERN, multiple instruments can play at the same beat position! That's how you layer a kick and hi-hat on beat 1.`,
    },
    {
      title: "Layering sounds",
      content: `You can stack multiple instruments on the same beat:

\`\`\`
PATTERN rock_beat:
    BEAT 1: kick
    BEAT 1: hat     # hat AND kick on beat 1
    BEAT 2: snare
    BEAT 2: hat     # hat AND snare on beat 2
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: snare
    BEAT 4: hat
\`\`\`

This creates a full drum groove where the hi-hat plays on every beat alongside the kick and snare. That's how real drum patterns work!`,
    },
  ],

  code: `# Beat Drop
# A full drum pattern with kick, snare, and hi-hat.

BPM 110

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 60
    DECAY 80
    VOLUME 255

INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 60
    VOLUME 220

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 30
    VOLUME 140

PATTERN basic_beat:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 2: snare
    BEAT 2: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: snare
    BEAT 4: hat

LOOP 4:
    PLAY_PATTERN basic_beat`,

  challenges: [
    {
      id: "double-kick",
      text: "Add another kick hit at BEAT 3.5 to create a double-kick pattern.",
      hint: "You can use decimal beat positions like 1.5, 2.5, 3.5 for off-beat hits!",
    },
    {
      id: "faster",
      text: "Change the BPM to 140. Now it sounds like a fast punk beat!",
      hint: "The same pattern feels completely different at different tempos.",
    },
    {
      id: "remove-hat",
      text: "Remove all the hat lines. How does the beat feel without the hi-hat?",
      hint: "Hi-hats add a sense of constant motion. Without them, the beat feels more open and spacey.",
    },
  ],

  funFact:
    "Roland's TR-808 drum machine, released in 1980, was considered a commercial failure because it didn't sound like real drums. But hip-hop producers loved its deep bass kick and snappy snare. Today, the 808 kick is the most iconic sound in rap and pop music!",
};

export default lesson05;
