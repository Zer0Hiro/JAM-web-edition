const lesson15 = {
  id: 15,
  slug: "smooth-glide",
  title: "Smooth Glide",
  subtitle: "Slide between notes like a guitar bend",
  phase: 5,
  difficulty: 4,
  goal: "Use GLIDE to make notes slide smoothly into each other instead of jumping.",
  concepts: ["Portamento", "Glide", "Pitch sliding"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "What is glide?",
      content: `Normally when you play two notes, the pitch **jumps** instantly. But on a trombone or guitar, you can **slide** between notes.

In JEM, add **GLIDE** (in milliseconds) to an instrument:

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    GLIDE 100
    VOLUME 200
\`\`\`

100 means it takes 100ms to slide from one note to the next. Bigger number = slower slide.`,
    },
    {
      title: "Fast vs slow glide",
      content: `The GLIDE value changes the character:

- **GLIDE 20** -- barely noticeable, subtle smoothness
- **GLIDE 100** -- classic synth portamento
- **GLIDE 300** -- dramatic slide, like a slide guitar
- **GLIDE 500** -- slow, dreamy pitch bending

Try changing the GLIDE value in the code below and hear how each one feels different!`,
    },
    {
      title: "Glide with big intervals",
      content: `Glide sounds most dramatic when notes are far apart:

\`\`\`
PLAY lead C3 1
PLAY lead C5 1
\`\`\`

That's a two-octave slide! With GLIDE 200 you'll hear the pitch sweep up dramatically. Small intervals (like C4 to D4) give a subtler wobble.`,
    },
  ],

  code: `# Smooth Glide -- Portamento
# Notes slide into each other

BPM 100

INSTRUMENT slide_lead:
    TYPE SYNTH
    WAVE SAW
    GLIDE 150
    ADSR 10 30 200 100
    VOLUME 200

INSTRUMENT bass:
    TYPE SYNTH
    WAVE TRIANGLE
    GLIDE 80
    ADSR 5 40 300 120
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

SEQUENCE melody:
    PLAY slide_lead C4 0.5
    PLAY slide_lead E4 0.5
    PLAY slide_lead G4 1
    PLAY slide_lead E4 0.5
    PLAY slide_lead C5 0.5
    PLAY slide_lead G4 1

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass G2 1
    PLAY bass E2 1
    PLAY bass G2 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE bassline
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "slow-slide",
      text: "Change the lead GLIDE to 400. Does it feel more dramatic or too slow?",
      hint: "Change GLIDE 150 to GLIDE 400 on the slide_lead instrument.",
    },
    {
      id: "no-glide-compare",
      text: "Remove GLIDE from the lead and listen. Then add it back -- can you hear the difference?",
      hint: "Delete the GLIDE 150 line, play, then add it back and play again.",
    },
    {
      id: "octave-jump",
      text: "Change the melody to jump between C3 and C5 (two octaves). With GLIDE 200, you'll hear a huge sweep!",
      hint: "Change the PLAY notes to alternate between C3 and C5.",
    },
  ],

  funFact:
    "The theremin, one of the earliest electronic instruments (1920), naturally glides between notes because you control pitch by moving your hand through the air -- there are no keys or frets to jump between!",
};

export default lesson15;
