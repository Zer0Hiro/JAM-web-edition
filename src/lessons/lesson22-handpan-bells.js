const lesson22 = {
  id: 22,
  slug: "handpan-bells",
  title: "Handpan Bells",
  subtitle: "Ring like a struck metal drum",
  phase: 6,
  difficulty: "advanced",
  goal: "Understand the HANDPAN wave type, how it creates bell-like tones through additive synthesis, and how DECAY controls ring time.",
  concepts: ["WAVE HANDPAN", "Additive synthesis", "DECAY for ring time", "HANDPAN with effects"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "What is HANDPAN?",
      content: `**WAVE HANDPAN** creates the sound of a struck metal drum. When you hit a real handpan, the metal vibrates at a **fundamental frequency** plus several **overtones** above it -- this is called **additive synthesis**. The computer adds these frequencies together to recreate that shimmering, bell-like tone.

\`\`\`
INSTRUMENT pan:
    TYPE SYNTH
    WAVE HANDPAN
    DECAY 800
    VOLUME 200
\`\`\`

Unlike SIN (a pure single tone), HANDPAN layers multiple harmonics on top of each other, giving it that rich metallic character.`,
    },
    {
      title: "DECAY controls ring time",
      content: `With HANDPAN, **DECAY** is everything. It controls how long the bell rings after being struck:

- **DECAY 200** = short ping, like tapping a small bell
- **DECAY 500** = medium ring, clear and musical
- **DECAY 800** = long, singing tone that floats in the air
- **DECAY 1200** = very long sustain, almost like a singing bowl

A real handpan rings for a few seconds after each hit. Use longer DECAY values to capture that meditative quality.`,
    },
    {
      title: "Adding atmosphere with REVERB and DELAY",
      content: `HANDPAN sounds amazing with effects. **REVERB** puts your handpan in a big space, like playing under a cathedral dome:

\`\`\`
REVERB 200
\`\`\`

**DELAY** creates echoes of each note, so your melody seems to ripple outward:

\`\`\`
DELAY 375 100
\`\`\`

The first number (375) is echo time in milliseconds. The second (100) is how loud the echo is. Together, REVERB and DELAY turn a simple melody into something magical.`,
    },
    {
      title: "Building a handpan melody",
      content: `Handpan music often uses **scales with wide intervals** -- jumping between low and high notes rather than playing them in order. The notes D, A, Bb, E, F are common in real handpan scales.

Mix **long notes** (2 beats) with **short notes** (1 beat) for a natural, breathing feel:

\`\`\`
PLAY pan D4 2
PLAY pan A4 1
PLAY pan Bb4 1
\`\`\`

Use **LOOP** to repeat a verse, then end with a different chorus section. The slow BPM (72) gives each note room to ring out before the next one arrives.`,
    },
  ],

  code: `# Handpan Bells
# Metallic ringing with overtones

BPM 72

INSTRUMENT pan:
    TYPE SYNTH
    WAVE HANDPAN
    DECAY 800
    REVERB 200
    DELAY 375 100
    VOLUME 200

SEQUENCE verse:
    PLAY pan D4 2
    PLAY pan A4 1
    PLAY pan Bb4 1
    PLAY pan F4 2
    PLAY pan A4 1
    PLAY pan E4 1

SEQUENCE chorus:
    PLAY pan D5 1
    PLAY pan A4 1
    PLAY pan F4 1
    PLAY pan E4 1
    PLAY pan D4 2
    REST 2

LOOP 2:
    PLAY_SEQUENCE verse
PLAY_SEQUENCE chorus`,

  challenges: [
    {
      id: "short-ping",
      text: "Change DECAY from 800 to 200. The notes should sound like short, tight pings instead of long ringing bells.",
      hint: "Change DECAY 800 to DECAY 200 on the pan instrument.",
    },
    {
      id: "low-handpan",
      text: "Add a second INSTRUMENT called deep_pan with WAVE HANDPAN, lower notes (D3, A3), and DECAY 1000. Layer it with the original using PLAY_TOGETHER.",
      hint: "Create a new INSTRUMENT deep_pan with WAVE HANDPAN and DECAY 1000, write a sequence for it with lower octave notes, and wrap both in PLAY_TOGETHER.",
    },
    {
      id: "dark-tone",
      text: "Add CUTOFF 3000 to the pan instrument. This filters out high frequencies for a darker, warmer handpan tone.",
      hint: "Add the line CUTOFF 3000 inside the pan INSTRUMENT block, after VOLUME 200.",
    },
  ],

  funFact:
    "The handpan was invented in the year 2000 in Bern, Switzerland by Felix Rohner and Sabina Scharer. They called it the Hang (meaning 'hand' in Bernese dialect). It was inspired by steel drums, gongs, and singing bowls -- and became one of the most sought-after acoustic instruments of the 21st century!",
};

export default lesson22;
