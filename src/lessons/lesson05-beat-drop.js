const lesson05 = {
  id: 5,
  slug: "beat-drop",
  title: "Beat Drop",
  subtitle: "Add drums to your music",
  phase: 2,
  difficulty: 2,
  goal: "Make drum sounds and build your first beat pattern!",
  concepts: ["DRUM instruments", "PATTERN block", "BEAT positioning"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "Drums are special",
      content: `Drums don't play notes like C4 or G5. They just go BOOM or TSHH at one pitch.

Make a drum with \`TYPE DRUM\`:

\`\`\`
INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 60
    DECAY 80
    VOLUME 255
\`\`\`

- **FREQ** = the pitch (low number = deep thump)
- **DECAY** = how fast the sound fades away
- **SIN wave + low FREQ** = perfect kick drum!`,
    },
    {
      title: "Snare and hi-hat",
      content: `**Snare** (the "crack" sound) -- use NOISE:
\`\`\`
INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 60
    VOLUME 220
\`\`\`

**Hi-hat** (the "tss tss" sound) -- NOISE but higher and shorter:
\`\`\`
INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 30
    VOLUME 140
\`\`\``,
    },
    {
      title: "Place your beats",
      content: `PATTERN lets you put drum hits at specific spots in a bar:

\`\`\`
PATTERN basic_beat:
    BEAT 1: kick
    BEAT 2: snare
    BEAT 3: kick
    BEAT 4: snare
\`\`\`

Beats go 1, 2, 3, 4. You can even stack sounds on the same beat -- kick AND hi-hat at the same time!`,
    },
  ],

  code: `# Beat Drop
# A drum pattern with kick, snare, and hi-hat!

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
      text: "Add a line: BEAT 3.5: kick. Now you have a double-kick! Cool, right?",
      hint: "You can use decimal numbers like 1.5, 2.5, 3.5 for hits between the main beats!",
    },
    {
      id: "faster",
      text: "Change BPM to 140. It gets more intense!",
      hint: "Same beat, different vibe. Speed changes how music feels!",
    },
    {
      id: "remove-hat",
      text: "Delete all the hat lines. How does the beat feel without hi-hats?",
      hint: "Hi-hats add that constant 'tss tss' energy. Without them it feels more open and spacey.",
    },
  ],

  funFact:
    "The Roland TR-808 drum machine flopped when it came out in 1980 because it didn't sound like real drums. But hip-hop producers LOVED its deep kick. Now it's the most famous drum sound in pop and rap!",
};

export default lesson05;
