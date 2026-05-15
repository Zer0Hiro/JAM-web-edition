const lesson03 = {
  id: 3,
  slug: "wave-lab",
  title: "Wave Lab",
  subtitle: "Same note, totally different sound",
  phase: 1,
  difficulty: 1,
  goal: "Hear how different waveforms give the same notes completely different personalities.",
  concepts: ["Waveform types", "Timbre", "Sound character"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "Same Note, Different Vibe",
      content: `Play a C4 on a guitar and on a flute. Same note, totally different sound. Why?

The **shape of the sound wave** is different. In music, this is called **timbre** (pronounced "tam-ber"). It's like the personality of a sound. JEM lets you pick from different wave shapes, and each one has its own character.`,
    },
    {
      title: "Meet the Waves",
      content: `**SIN** -- Pure and smooth, like a whistle or a tuning fork. The simplest sound possible.

**SAW** -- Buzzy and bright, like a chainsaw. Great for bass and lead sounds.

**SQUARE** -- Hollow and retro. This is the classic 8-bit video game sound.

**TRIANGLE** -- Soft and mellow, like a gentle flute. Warm and quiet.

**NOISE** -- Pure static, like a TV with no signal. Useful for drums and sound effects, not for melodies.`,
    },
    {
      title: "Try Them All",
      content: `The code on the right uses \`WAVE SAW\`. To hear a different wave, just change that one line:

\`\`\`
WAVE SQUARE
\`\`\`

Same melody, totally different feeling. Try all five and pick your favorite!`,
    },
  ],

  code: `# Wave Lab
# Change WAVE SAW to SIN, SQUARE, TRIANGLE, or NOISE

BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 40 180 100
    VOLUME 180

SEQUENCE arpeggio:
    PLAY lead C4 0.5
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead C5 0.5
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead C4 1

PLAY_SEQUENCE arpeggio`,

  challenges: [
    {
      id: "swap-square",
      text: "Change WAVE SAW to WAVE SQUARE. Does it sound like an old video game?",
      hint: "Square waves were used in NES and Game Boy games. That hollow, bleepy sound is pure square wave.",
    },
    {
      id: "try-triangle",
      text: "Now try WAVE TRIANGLE. Much softer and more chill.",
      hint: "Triangle waves sound a bit like a recorder or a soft flute. Great for gentle melodies.",
    },
    {
      id: "try-noise",
      text: "Try WAVE NOISE. What happens to the melody?",
      hint: "Noise is random vibrations -- you can't really hear pitches anymore. That's why it's used for drums and sound effects instead.",
    },
  ],

  funFact:
    "In 1822, a mathematician named Joseph Fourier proved that ANY sound in the universe can be built by mixing simple sine waves together. Your voice, a dog bark, thunder -- all just sine waves stacked up in different combinations.",
};

export default lesson03;
