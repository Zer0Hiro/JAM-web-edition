const lesson13 = {
  id: 13,
  slug: "smooth-glide",
  title: "Smooth Glide",
  subtitle: "Slide between notes like a guitar bend",
  phase: 4,
  difficulty: 3,
  goal: "Use GLIDE (portamento) to make notes slide smoothly into each other instead of jumping.",
  concepts: ["Portamento", "GLIDE", "Pitch sliding"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "What is glide?",
      content: `Normally when JEM moves from one note to the next, the pitch jumps instantly. C4 -- snap -- E4 -- snap -- G4. Clean and precise.

**GLIDE** changes that. Instead of jumping, the pitch **slides** smoothly from one note to the next. Like bending a guitar string, or a singer swooping between notes. The technical name is **portamento**.`,
    },
    {
      title: "Fast vs slow",
      content: `GLIDE takes a number in milliseconds -- how long the slide takes:

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    GLIDE 150
    VOLUME 200
\`\`\`

- **GLIDE 50** = quick slide, barely noticeable
- **GLIDE 150** = medium slide, smooth and musical
- **GLIDE 500** = slow dramatic slide, like a siren
- **GLIDE 0** = no slide at all (the default)

The slide happens at the start of each new note. The longer the GLIDE time, the longer it takes to reach the target pitch.`,
    },
    {
      title: "Big intervals sound dramatic",
      content: `Glide sounds different depending on how far apart the notes are.

**Small step** (C4 to D4): subtle, almost like vibrato. You might barely notice it.

**Big jump** (C3 to C5): dramatic sweep across two whole octaves. Impossible to miss!

Try both in your code. Wide intervals with slow glide = maximum drama.`,
    },
  ],

  code: `# Smooth Glide
# Notes slide into each other with GLIDE

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
    PLAY slide_lead C4 1
    PLAY slide_lead E4 1
    PLAY slide_lead G4 1
    PLAY slide_lead C5 1
    PLAY slide_lead G4 1
    PLAY slide_lead E4 0.5
    PLAY slide_lead D4 0.5
    PLAY slide_lead C4 1

SEQUENCE bassline:
    PLAY bass C2 2
    PLAY bass G2 2
    PLAY bass F2 2
    PLAY bass G2 2

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
      id: "slow-glide",
      text: "Change the lead GLIDE to 400. Now every note takes almost half a second to slide in. Super dramatic!",
      hint: "Change GLIDE 150 to GLIDE 400 on the slide_lead instrument.",
    },
    {
      id: "no-glide",
      text: "Remove GLIDE from the lead entirely (or set it to 0). Hear how the notes snap from pitch to pitch? That's the difference.",
      hint: "Delete the GLIDE 150 line from slide_lead, or change it to GLIDE 0.",
    },
    {
      id: "octave-jumps",
      text: "Change the melody to use big octave jumps: C3, C5, C3, C5. With GLIDE 300, each note sweeps across two full octaves!",
      hint: "Replace the melody PLAY notes with alternating C3 and C5 notes. Set GLIDE to 300 for extra drama.",
    },
  ],

  funFact:
    "The theremin, invented in 1920, naturally glides between notes because you control pitch by waving your hands through the air. There are no keys or frets to snap to -- every movement creates a smooth slide.",
};

export default lesson13;
