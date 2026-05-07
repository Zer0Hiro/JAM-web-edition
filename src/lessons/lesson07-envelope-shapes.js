const lesson07 = {
  id: 7,
  slug: "envelope-shapes",
  title: "Envelope Shapes",
  subtitle: "Control how sounds fade in and out",
  phase: 3,
  difficulty: 3,
  goal: "Use ADSR to make sounds that pluck, swell, or punch!",
  concepts: ["ADSR envelope", "Attack/Decay/Sustain/Release", "Sound shaping"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "Sounds have shapes!",
      content: `Pluck a guitar string -- it's loud at first, then fades away. Press a piano key and hold it -- the note stays until you let go.

That "shape" of loud-to-quiet over time is called an **envelope**. In JEM, you control it with four numbers: **ADSR**.`,
    },
    {
      title: "What ADSR means",
      content: `\`\`\`
ADSR 10 50 200 100
\`\`\`

Four numbers, four stages (all in milliseconds):

1. **Attack (10)** -- How fast the sound turns on. Small = snappy!
2. **Decay (50)** -- How fast it drops from max volume.
3. **Sustain (200)** -- How long it holds steady.
4. **Release (100)** -- How fast it fades out at the end.

Think of it like: turn the volume UP, let it DROP a bit, HOLD it, then fade OUT.`,
    },
    {
      title: "Pluck vs Pad",
      content: `Different ADSR = totally different sound:

**Pluck** (like a guitar pick):
\`\`\`
ADSR 2 80 0 60
\`\`\`
Super fast, pops and disappears.

**Pad** (like a dreamy choir):
\`\`\`
ADSR 300 100 400 500
\`\`\`
Slow fade in, long hold, gentle fade out.

Try both in the code! Change the pad's ADSR and hear what happens.`,
    },
  ],

  code: `# Envelope Shapes
# A dreamy pad and a snappy pluck!

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
      text: "Change the pad's attack to 500 and release to 800. Even dreamier!",
      hint: "Long, slow envelopes are what make ambient and chill music feel so floaty.",
    },
    {
      id: "stab",
      text: "Change the pluck ADSR to 5 100 50 30. Now it's a punchy stab!",
      hint: "Short and aggressive envelopes are used in EDM and dance music all the time.",
    },
    {
      id: "zero-release",
      text: "Set the pluck's release to 0. The notes cut off instantly -- like a muted guitar!",
      hint: "Release of 0 means the sound just stops dead. Try it!",
    },
  ],

  funFact:
    "ADSR envelopes were invented in the 1960s for the first synthesizers. Before that, synths could only make one continuous BZZZZZ sound. ADSR made electronic music actually expressive!",
};

export default lesson07;
