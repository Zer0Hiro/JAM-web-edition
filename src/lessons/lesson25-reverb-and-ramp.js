const lesson25 = {
  id: 25,
  slug: "reverb-and-ramp",
  title: "Deep Reverb & Tempo Ramps",
  subtitle: "Shape space and time in your music",
  phase: 6,
  difficulty: "advanced",
  goal: "Master the extended REVERB syntax (DECAY and ROOM parameters) and learn how BPM OVER creates smooth tempo transitions.",
  concepts: ["Extended REVERB", "REVERB DECAY", "REVERB ROOM", "BPM OVER", "Smooth tempo ramp"],
  estimatedMinutes: 14,

  steps: [
    {
      title: "Beyond basic REVERB",
      content: `You already know \`REVERB 120\` sets the wet/dry mix (0–255). But now REVERB has two new optional parameters that give you much more control over the space your sound lives in:

\`\`\`
REVERB 160 DECAY 4000 ROOM 0.8
\`\`\`

- **DECAY** (100–10000 ms) — how long the reverb tail rings. Short decay (500ms) = small room. Long decay (5000ms) = cathedral.
- **ROOM** (0.0–1.0) — the size of the virtual space. 0.0 = tiny closet, 1.0 = massive cathedral.

The mix still controls how much reverb you hear. DECAY and ROOM shape **what kind** of reverb it is.`,
    },
    {
      title: "Designing spaces",
      content: `Different combinations create different environments:

- **\`REVERB 80 DECAY 300 ROOM 0.2\`** — small room, like playing in a bathroom
- **\`REVERB 120 DECAY 2000 ROOM 0.5\`** — medium hall, like a concert stage
- **\`REVERB 200 DECAY 5000 ROOM 0.9\`** — cathedral, notes swim in echoes
- **\`REVERB 160 DECAY 8000 ROOM 1.0\`** — infinite space, ambient wash

Each instrument gets its own reverb settings independently. So your lead can be in a small room while your pad floats in a cathedral — this is a powerful mixing technique called **contrast in space**.

Per-note \`REVERB:value\` overrides still control mix only — DECAY and ROOM stay at the instrument level.`,
    },
    {
      title: "Smooth BPM ramps",
      content: `You've used \`BPM 140\` to instantly change tempo. But instant changes can feel jarring. **BPM OVER** creates a smooth ramp from the current tempo to a target:

\`\`\`
BPM 140 OVER 8
\`\`\`

This gradually ramps to 140 BPM over 8 beats. The transition is smooth and musical — like a real band speeding up or slowing down together.

| Parameter | Range | Description |
|---|---|---|
| target | 1–300 | Where you want the tempo to end up |
| beats | 1–64 | How many beats the transition takes |

Keep ramps at least 2 beats long — very short ramps (1 beat) sound more like a glitch than a smooth change.`,
    },
    {
      title: "Combining space and time",
      content: `The starter code demonstrates both features together. The piece starts at BPM 100, plays through a verse with medium reverb, then:

1. **Ramps up** to BPM 130 over 8 beats for an energetic chorus
2. **Ramps back down** to BPM 80 over 6 beats for a dreamy outro with cathedral reverb

Listen for how the tempo ramp creates momentum going into the chorus, and how the slowdown combined with heavy reverb creates a floating, spacious ending.

Try changing the ROOM values — put everything in a tiny room (0.1) vs a cathedral (1.0) and hear how dramatically the feel changes.`,
    },
  ],

  code: `# Deep Reverb & Tempo Ramps
# Shape the space and pacing of your music

BPM 100

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    REVERB 120 DECAY 2000 ROOM 0.5
    ADSR 10 50 200 100
    VOLUME 180

INSTRUMENT pad:
    TYPE SYNTH
    WAVE SIN
    REVERB 200 DECAY 5000 ROOM 0.9
    ADSR 100 80 300 400
    VOLUME 140

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    REVERB 40 DECAY 500 ROOM 0.2
    ADSR 5 40 200 80
    VOLUME 220

SEQUENCE verse_melody:
    PLAY lead E4 1
    PLAY lead G4 0.5
    PLAY lead A4 0.5
    PLAY lead G4 1
    PLAY lead E4 1

SEQUENCE chorus_melody:
    PLAY lead C5 0.5
    PLAY lead B4 0.5
    PLAY lead A4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 2

SEQUENCE pad_chords:
    PLAY pad [C4 E4 G4] 4
    PLAY pad [A3 C4 E4] 4

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass C2 0.5
    REST 0.5
    PLAY bass G2 1
    PLAY bass E2 1

# Verse at BPM 100
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE verse_melody
        PLAY_SEQUENCE pad_chords
        PLAY_SEQUENCE bassline

# Ramp up to chorus
BPM 130 OVER 8
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE chorus_melody
        PLAY_SEQUENCE pad_chords
        PLAY_SEQUENCE bassline

# Slow down for dreamy outro
BPM 80 OVER 6
LOOP 1:
    PLAY_TOGETHER:
        PLAY_SEQUENCE pad_chords
        PLAY_SEQUENCE verse_melody`,

  challenges: [
    {
      id: "tiny-room",
      text: "Change all ROOM values to 0.1 and DECAY to 300. How does the intimate, dry sound compare to the original spacious mix?",
      hint: "Change each REVERB line: lead to REVERB 120 DECAY 300 ROOM 0.1, pad to REVERB 200 DECAY 300 ROOM 0.1, bass to REVERB 40 DECAY 300 ROOM 0.1.",
    },
    {
      id: "dramatic-ramp",
      text: "Change the chorus ramp to BPM 160 OVER 4 for a more dramatic acceleration. Then slow the outro to BPM 60 OVER 12 for maximum contrast.",
      hint: "Replace BPM 130 OVER 8 with BPM 160 OVER 4, and BPM 80 OVER 6 with BPM 60 OVER 12.",
    },
    {
      id: "reverb-contrast",
      text: "Give the lead a tiny room (ROOM 0.1, DECAY 300) while giving the pad a cathedral (ROOM 1.0, DECAY 8000). This contrast puts the lead upfront while the pad floats far behind.",
      hint: "Change lead REVERB to REVERB 100 DECAY 300 ROOM 0.1 and pad REVERB to REVERB 200 DECAY 8000 ROOM 1.0.",
    },
  ],

  funFact:
    "The longest natural reverb ever measured is in the Inchindown oil storage tanks in Scotland — a clap echoes for 112 seconds! Concert halls are typically designed for 1.5–2.5 seconds of reverb. Recording studios often have 'dead rooms' with almost zero reverb, so engineers can add exactly the right amount digitally.",
};

export default lesson25;
