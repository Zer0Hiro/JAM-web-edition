const lesson03 = {
  id: 3,
  slug: "wave-surfing",
  title: "Wave Surfing",
  subtitle: "Explore different sound shapes",
  phase: 1,
  difficulty: 1,
  goal: "Hear how SIN, SAW, SQUARE, and TRIANGLE sound different from each other.",
  concepts: ["Waveform types", "Timbre", "How oscillators shape sound"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "Same note, different vibe",
      content: `A guitar and a flute can play the same note but sound totally different. Why? The **shape** of the sound wave is different!

JAM gives you 5 wave shapes to pick from. Each one has its own personality.`,
    },
    {
      title: "Meet the waves",
      content: `**SIN** -- Smooth and pure. Like a whistle or a tuning fork.

**SAW** -- Buzzy and bright. Great for bass and lead sounds.

**SQUARE** -- Hollow and retro. This is the classic video game sound!

**TRIANGLE** -- Soft and mellow. Like a gentle flute.

**NOISE** -- Random static. Perfect for drums, not great for melodies!`,
    },
    {
      title: "Try it yourself",
      content: `In the code on the right, find this line:

\`\`\`
WAVE SAW
\`\`\`

Change \`SAW\` to \`SQUARE\`, then press Play. Hear the difference?

Now try \`TRIANGLE\` and \`SIN\`. Each wave has its own character!`,
    },
  ],

  code: `# Wave Surfing
# Change WAVE SAW to SIN, SQUARE, or TRIANGLE!

BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 40 180 100
    VOLUME 180

SEQUENCE riff:
    PLAY lead C4 0.5
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead C5 0.5
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead C4 1

PLAY_SEQUENCE riff`,

  challenges: [
    {
      id: "swap-wave",
      text: "Change WAVE SAW to WAVE SQUARE. Does it sound like an old video game?",
      hint: "Square waves were used in NES and Game Boy games. That's where the retro sound comes from!",
    },
    {
      id: "try-triangle",
      text: "Now try WAVE TRIANGLE. It's softer and more chill.",
      hint: "Triangle waves sound a bit like a recorder or a soft flute.",
    },
    {
      id: "noise",
      text: "Try WAVE NOISE. What happens? (Spoiler: it's weird!)",
      hint: "Noise is random vibrations -- great for drums and explosions, but melodies? Not so much!",
    },
  ],

  funFact:
    "In 1822, a mathematician named Fourier proved that ANY sound in the universe can be built by mixing simple sine waves together. Your voice, a dog bark, thunder -- all just sine waves stacked up!",
};

export default lesson03;
