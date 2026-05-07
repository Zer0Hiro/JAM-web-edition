const lesson03 = {
  id: 3,
  slug: "wave-surfing",
  title: "Wave Surfing",
  subtitle: "Explore different waveform shapes",
  phase: 1,
  difficulty: 1,
  goal: "Hear the difference between sine, sawtooth, square, and triangle waves.",
  concepts: ["Waveform types", "Timbre", "How oscillators shape sound"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "What is a waveform?",
      content: `Sound is vibration, and the **shape** of that vibration determines what it sounds like. This shape is called a **waveform**.

Think of it like this: a flute and a guitar can both play the same note (same pitch), but they sound totally different. That difference is the waveform -- also called **timbre** (pronounced "TAM-ber").

JAM gives you 5 waveform types to play with: SIN, SAW, SQUARE, TRIANGLE, and NOISE.`,
    },
    {
      title: "SIN -- the pure tone",
      content: `\`\`\`
WAVE SIN
\`\`\`

A sine wave is the smoothest, purest sound possible. No harmonics, no grit -- just a clean, mellow tone. It sounds like a tuning fork or a soft whistle.

Use it for: gentle pads, sub-bass, test tones.`,
    },
    {
      title: "SAW -- the buzzy one",
      content: `\`\`\`
WAVE SAW
\`\`\`

A sawtooth wave contains ALL the harmonics (overtones), which makes it sound rich, bright, and buzzy. It's the bread and butter of synthesizers.

Use it for: leads, bass lines, anything that needs to cut through a mix.`,
    },
    {
      title: "SQUARE -- the retro classic",
      content: `\`\`\`
WAVE SQUARE
\`\`\`

A square wave has only odd harmonics, giving it a hollow, "video game" quality. If you've ever played an old NES game, you've heard square waves.

Use it for: chiptune melodies, retro game sounds, hollow tones.`,
    },
    {
      title: "TRIANGLE -- the mellow middle",
      content: `\`\`\`
WAVE TRIANGLE
\`\`\`

A triangle wave is like a softer version of the square wave. It has the same odd harmonics but they're much quieter, giving it a mellow, flute-like character.

Use it for: bass, mellow leads, background pads.`,
    },
  ],

  code: `# Wave Surfing
# Compare different waveforms playing the same melody.
# Try changing WAVE SIN to WAVE SAW, SQUARE, or TRIANGLE!

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
      text: "Change WAVE SAW to WAVE SQUARE. How does the mood change?",
      hint: "Square waves have a hollow, 8-bit quality -- perfect for retro game music!",
    },
    {
      id: "try-triangle",
      text: "Try WAVE TRIANGLE. It's softer than SAW but brighter than SIN.",
      hint: "Triangle waves sound almost like a recorder or soft flute.",
    },
    {
      id: "noise",
      text: "Replace the waveform with WAVE NOISE. What happens? (It won't be musical!)",
      hint: "Noise is random vibrations -- useful for drums and sound effects, not so great for melodies.",
    },
  ],

  funFact:
    "In 1822, mathematician Joseph Fourier proved that ANY sound -- your voice, a guitar, a car horn -- can be broken down into a combination of simple sine waves. This is called Fourier analysis, and it's the foundation of all digital audio!",
};

export default lesson03;
