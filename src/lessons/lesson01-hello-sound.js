const lesson01 = {
  id: 1,
  slug: "hello-sound",
  title: "Hello, Sound!",
  subtitle: "Make your first sound with code",
  phase: 1,
  difficulty: 1,
  goal: "Write your very first JEM program and hear a sound come out!",
  concepts: ["BPM (tempo)", "INSTRUMENT block", "SEQUENCE and PLAY"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "What is JEM?",
      content: `JEM lets you make music by typing words. You type, it plays. Like texting a robot that makes sounds for you!

Every JEM program needs three things:
1. A **tempo** -- how fast the beat goes
2. An **instrument** -- what kind of sound
3. A **sequence** -- which notes to play`,
    },
    {
      title: "Set the speed",
      content: `First line: how fast your song goes. BPM = "Beats Per Minute."

\`\`\`
BPM 120
\`\`\`

120 is normal pop speed. Bigger number = faster. Smaller = slower. Easy!`,
    },
    {
      title: "Make an instrument",
      content: `Now tell JEM what sound you want:

\`\`\`
INSTRUMENT tone:
    TYPE SYNTH
    WAVE SIN
    ADSR 10 50 200 100
    VOLUME 200
\`\`\`

- **INSTRUMENT tone:** -- you're naming it "tone" (pick any name you like!)
- **TYPE SYNTH** -- it plays notes (not a drum)
- **WAVE SIN** -- smooth, pure sound like a whistle
- **ADSR** -- how the sound fades in and out (we'll learn this later, don't worry!)
- **VOLUME 200** -- how loud (max is 255)`,
    },
    {
      title: "Pick your notes",
      content: `Tell JEM what notes to play:

\`\`\`
SEQUENCE melody:
    PLAY tone C4 2
    REST 1
    PLAY tone E4 2
\`\`\`

- **PLAY tone C4 2** -- play note C4 for 2 beats using "tone"
- **REST 1** -- be quiet for 1 beat
- **C4** is middle C on a piano. The number is how high or low it sounds.`,
    },
    {
      title: "Hit play!",
      content: `Last step -- tell JEM to actually play it:

\`\`\`
PLAY_SEQUENCE melody
\`\`\`

Without this line, JEM knows your song but won't play it. It's like writing a recipe but forgetting to cook!`,
    },
  ],

  code: `# Hello, Sound!
# Your very first JAM program

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
      text: "Swap the first note from C4 to A4 and press Play. Does it sound different?",
      hint: "A4 is the note that orchestras use to tune up -- it makes exactly 440 vibrations per second!",
    },
    {
      id: "add-note",
      text: "Add one more line: PLAY tone C5 2 at the end. C5 is like C4 but higher!",
      hint: "Just add a new PLAY line right after the last one, before PLAY_SEQUENCE.",
    },
    {
      id: "change-tempo",
      text: "Change BPM 120 to BPM 200. Whoa, speedy!",
      hint: "200 BPM is super fast -- that's the speed of drum and bass music!",
    },
  ],

  funFact:
    "A sine wave is the simplest sound in the universe -- just one smooth vibration. Every other sound (your voice, a guitar, a car horn) is made by mixing sine waves together!",
};

export default lesson01;
