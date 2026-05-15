const lesson17 = {
  id: 17,
  slug: "pluck-it",
  title: "Pluck It!",
  subtitle: "Guitar and harp sounds with Karplus-Strong synthesis",
  phase: 6,
  difficulty: 3,
  goal: "Use the PLUCK waveform and DECAY to create realistic plucked string sounds like guitar, harp, and banjo.",
  concepts: ["PLUCK waveform", "Karplus-Strong synthesis", "String sounds", "DECAY with PLUCK"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "What is PLUCK?",
      content: `**WAVE PLUCK** makes guitar and harp sounds. It uses a clever trick called **Karplus-Strong synthesis**: start with a tiny burst of random noise, then smooth it out really fast. The result sounds like a plucked string!

\`\`\`
INSTRUMENT guitar:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 150
    VOLUME 200
\`\`\`

Unlike other waveforms (SIN, SAW, SQUARE), PLUCK creates sounds that fade naturally -- just like a real guitar string that vibrates and slowly stops.`,
    },
    {
      title: "DECAY controls ring time",
      content: `With PLUCK, **DECAY** controls how long the string rings:

- **DECAY 30** = muted, short pluck (like a palm-muted guitar)
- **DECAY 150** = normal guitar pick
- **DECAY 300** = long ring, like a harp or bell
- **DECAY 500** = very long sustain, almost bell-like

Unlike ADSR, PLUCK uses DECAY for its entire sound shape. Short decay = tight and punchy. Long decay = open and ringing.`,
    },
    {
      title: "Picking and strumming",
      content: `Fast short notes sound like **finger picking**:

\`\`\`
PLAY guitar C4 0.5
PLAY guitar E4 0.5
PLAY guitar G4 0.5
PLAY guitar C5 0.5
\`\`\`

Use chord brackets for **strumming**:

\`\`\`
PLAY guitar [C4 E4 G4] 2
PLAY guitar [A3 C4 E4] 2
\`\`\`

Add **REVERB** for a realistic room sound -- like playing guitar in a cozy studio instead of a padded closet.`,
    },
  ],

  code: `# Pluck It! -- Karplus-Strong string sounds
# Guitar picking with a plucked bass

BPM 120

INSTRUMENT guitar:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 150
    REVERB 80
    VOLUME 200

INSTRUMENT bass_pluck:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 200
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 25
    VOLUME 140

SEQUENCE picking:
    PLAY guitar C4 0.5
    PLAY guitar E4 0.5
    PLAY guitar G4 0.5
    PLAY guitar C5 0.5
    PLAY guitar G4 0.5
    PLAY guitar E4 0.5
    PLAY guitar C4 0.5
    REST 0.5

SEQUENCE bass:
    PLAY bass_pluck C2 1
    PLAY bass_pluck G2 1
    PLAY bass_pluck A2 1
    PLAY bass_pluck E2 1

PATTERN beat:
    BEAT 1: kick
    BEAT 2: hat
    BEAT 3: kick
    BEAT 4: hat

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE picking
        PLAY_SEQUENCE bass
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "muted-pluck",
      text: "Change the guitar DECAY to 30. It should sound muted and tight, like a palm-muted guitar string.",
      hint: "Change DECAY 150 to DECAY 30 on the guitar instrument.",
    },
    {
      id: "chord-strum",
      text: "Replace the picking arpeggio with chord strums: [C4 E4 G4] for 2 beats, then [A3 C4 E4] for 2 beats.",
      hint: "Replace all the PLAY lines in the picking sequence with two chord lines using bracket notation.",
    },
    {
      id: "add-reverb",
      text: "Increase the guitar REVERB to 180. Does it sound like playing in a big hall?",
      hint: "Change REVERB 80 to REVERB 180 on the guitar instrument.",
    },
    {
      id: "harp-sound",
      text: "Set DECAY to 400 and slow the BPM to 80. Now it sounds more like a gentle harp than a guitar!",
      hint: "Change DECAY 150 to DECAY 400 on the guitar, and change BPM 120 to BPM 80.",
    },
  ],

  funFact:
    "Karplus-Strong synthesis was invented in 1983 by Kevin Karplus and Alex Strong. It creates realistic plucked string sounds from just a tiny loop of random noise that gets smoother with each repetition -- the computer is literally 'plucking' a virtual string!",
};

export default lesson17;
