const lesson08 = {
  id: 8,
  slug: "sound-shapes",
  title: "Sound Shapes",
  subtitle: "Control how sounds fade in and out",
  phase: 3,
  difficulty: 2,
  goal: "Use ADSR envelopes to shape sounds into plucks, pads, and stabs.",
  concepts: ["ADSR envelope", "Attack", "Decay", "Sustain", "Release"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "Sounds have shapes!",
      content: `Hit a piano key -- instant loud, then it fades. Draw a bow across a violin -- the sound slowly swells up, holds, then fades away.

Same note, but the **shape** of the sound is totally different. That shape is what makes a piano sound like a piano and a violin sound like a violin. In JEM, you control this shape with four numbers called **ADSR**.`,
    },
    {
      title: "A-D-S-R",
      content: `ADSR stands for four stages, all measured in milliseconds:

\`\`\`
ADSR 10 80 200 100
\`\`\`

1. **Attack (10 ms)** -- How fast the sound starts. Low number = instant snap. High number = slow swell.
2. **Decay (80 ms)** -- How fast it drops from peak volume. Like a ball bouncing down.
3. **Sustain (200 ms)** -- How long the sound holds steady. The "body" of the note.
4. **Release (100 ms)** -- How fast it fades to silence after the note ends.

Think of it like: ramp UP, drop DOWN, HOLD, fade OUT.`,
    },
    {
      title: "Pluck vs Pad",
      content: `Different ADSR values = completely different character:

**Pluck** -- snappy, like picking a guitar string:
\`\`\`
ADSR 2 80 0 60
\`\`\`
Instant attack, no sustain. It pops and disappears.

**Pad** -- dreamy, like a slow choir:
\`\`\`
ADSR 300 100 400 500
\`\`\`
Slow swell in, long hold, gentle fade out. Perfect for background atmosphere.

**Stab** -- punchy, like a horn hit:
\`\`\`
ADSR 5 100 50 30
\`\`\`
Quick punch, short body, cuts off fast. Great for dance music.

Try changing the ADSR in the code below and hear the difference!`,
    },
  ],

  code: `# Sound Shapes
# A dreamy pad and a snappy pluck together

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

SEQUENCE arpeggio:
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
    PLAY_SEQUENCE arpeggio`,

  challenges: [
    {
      id: "long-pad",
      text: "Make the pad even dreamier: change attack to 500 and release to 800.",
      hint: "Longer attack means the sound creeps in slowly. Longer release means it lingers after the note ends. Perfect for ambient music.",
    },
    {
      id: "stab-sound",
      text: "Change the pluck ADSR to 5 100 50 30. Now it's a punchy stab!",
      hint: "Short and aggressive envelopes are used in EDM and dance music. The note hits hard and disappears fast.",
    },
    {
      id: "zero-release",
      text: "Set the pluck's release to 0. The notes cut off instantly -- like a muted guitar string!",
      hint: "Release 0 means the sound just stops dead. No fade at all. Try it and listen for the sharp cutoff.",
    },
  ],

  funFact:
    "ADSR envelopes were invented in the 1960s for the first synthesizers. Before that, electronic instruments could only make one continuous BZZZZZ sound. ADSR is what made electronic music actually expressive.",
};

export default lesson08;
