const lesson01 = {
  id: 1,
  slug: "hello-sound",
  title: "Hello, Sound!",
  subtitle: "Make your first sound with code",
  phase: 1,
  difficulty: 1,
  goal: "Write your very first JEM program and hear a sound come out.",
  concepts: ["BPM (tempo)", "INSTRUMENT block", "SEQUENCE and PLAY", "PLAY_SEQUENCE"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "What is JEM?",
      content: `JEM lets you make music by typing words. You type, it plays. Like texting a robot that turns your words into sounds.

Every JEM program needs three things:
1. A **tempo** -- how fast the beat goes
2. An **instrument** -- what kind of sound to use
3. **Notes** -- which sounds to play and when`,
    },
    {
      title: "Set the Speed",
      content: `First line: how fast your song goes. BPM stands for "Beats Per Minute."

\`\`\`
BPM 120
\`\`\`

120 is normal pop song speed. Bigger number = faster. Smaller = slower. Try changing it later!`,
    },
    {
      title: "Build an Instrument",
      content: `Now tell JEM what sound you want:

\`\`\`
INSTRUMENT tone:
    TYPE SYNTH
    WAVE SIN
    ADSR 10 50 200 100
    VOLUME 200
\`\`\`

- **INSTRUMENT tone:** -- you're naming it "tone" (pick any name you want)
- **TYPE SYNTH** -- it plays notes (not a drum)
- **WAVE SIN** -- smooth, pure sound like a whistle
- **ADSR** -- controls how the sound fades in and out (we'll learn this later, don't worry)
- **VOLUME 200** -- how loud, from 0 to 255`,
    },
    {
      title: "Write Your Notes",
      content: `Tell JEM which notes to play and for how long:

\`\`\`
SEQUENCE melody:
    PLAY tone C4 2
    REST 1
    PLAY tone E4 2
\`\`\`

- **PLAY tone C4 2** -- play note C4 for 2 beats using your "tone" instrument
- **REST 1** -- stay quiet for 1 beat
- **C4** is middle C on a piano. The number is the octave -- how high or low.`,
    },
    {
      title: "Hit Play!",
      content: `Last step -- tell JEM to actually play your music:

\`\`\`
PLAY_SEQUENCE melody
\`\`\`

Without this line, JEM knows your song but won't play it. Like writing a recipe but never cooking it.

Press the Play button and listen to your first program!`,
    },
  ],

  code: `# Hello, Sound!
# Your very first JEM program

BPM 120

INSTRUMENT tone:
    TYPE SYNTH
    WAVE SIN
    ADSR 10 50 200 100
    VOLUME 200

SEQUENCE melody:
    PLAY tone C4 2
    REST 1
    PLAY tone E4 2
    REST 1
    PLAY tone G4 2

PLAY_SEQUENCE melody`,

  challenges: [
    {
      id: "change-note",
      text: "Change the first note from C4 to A4 and press Play. Does it sound different?",
      hint: "A4 is the note orchestras use to tune up -- it vibrates exactly 440 times per second.",
    },
    {
      id: "add-note",
      text: "Add a new line PLAY tone C5 2 at the end of the sequence. C5 is like C4 but one floor higher!",
      hint: "Add it right after the last PLAY line, before PLAY_SEQUENCE.",
    },
    {
      id: "change-tempo",
      text: "Change BPM 120 to BPM 200. Feel the speed!",
      hint: "200 BPM is super fast -- that's the speed of drum and bass music.",
    },
  ],

  funFact:
    "A sine wave is the simplest sound in the universe -- just one smooth vibration. Every other sound you hear (your voice, a guitar, a car horn) is actually made by mixing sine waves together.",
};

export default lesson01;
