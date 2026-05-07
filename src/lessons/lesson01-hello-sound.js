const lesson01 = {
  id: 1,
  slug: "hello-sound",
  title: "Hello, Sound!",
  subtitle: "Make your first sound with code",
  phase: 1,
  difficulty: 1,
  goal: "Write your very first JAM program and hear a pure sine wave tone.",
  concepts: ["BPM (tempo)", "INSTRUMENT block", "SEQUENCE and PLAY"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "What is JAM?",
      content: `JAM is a simple music language that turns text into sound. Instead of clicking buttons in an app, you *type* your music -- like writing a recipe that tells an Arduino how to make sounds.

Every JAM program needs three things:
1. A **tempo** (how fast the music goes)
2. An **instrument** (what kind of sound to make)
3. A **sequence** (which notes to play)

Let's start with the simplest possible program.`,
    },
    {
      title: "Setting the tempo",
      content: `The first line sets how fast the music plays. BPM stands for "Beats Per Minute" -- it's like the heartbeat of your song.

\`\`\`
BPM 120
\`\`\`

120 BPM is a common tempo for pop music. A higher number means faster, lower means slower. Think of it like the speed setting on a treadmill.`,
    },
    {
      title: "Creating an instrument",
      content: `Next, we define what kind of sound we want. An INSTRUMENT block gives your sound a name and tells JAM how it should sound.

\`\`\`
INSTRUMENT tone:
    TYPE SYNTH
    WAVE SIN
    ADSR 10 50 200 100
    VOLUME 200
\`\`\`

Let's break that down:
- **INSTRUMENT tone:** -- we're naming this instrument "tone" (you can call it whatever you want!)
- **TYPE SYNTH** -- this is a melodic instrument (as opposed to a drum)
- **WAVE SIN** -- use a sine wave, which sounds smooth and pure, like a tuning fork
- **ADSR 10 50 200 100** -- this controls how the sound fades in and out (more on this in a later lesson!)
- **VOLUME 200** -- how loud it is (0 to 255)`,
    },
    {
      title: "Writing a sequence",
      content: `Now we tell JAM which notes to play and for how long.

\`\`\`
SEQUENCE melody:
    PLAY tone C4 2
    REST 1
    PLAY tone E4 2
\`\`\`

- **SEQUENCE melody:** -- we're naming this sequence "melody"
- **PLAY tone C4 2** -- play the note C4 on the "tone" instrument for 2 beats
- **REST 1** -- silence for 1 beat
- **PLAY tone E4 2** -- play E4 for 2 beats

C4 is "middle C" on a piano -- the note right in the middle of the keyboard. The number after the letter is the octave.`,
    },
    {
      title: "Playing the sequence",
      content: `Finally, we tell JAM to actually play our sequence:

\`\`\`
PLAY_SEQUENCE melody
\`\`\`

That's it! This line says "go play the sequence called melody". Without this line, JAM would know *about* the melody but never actually play it -- like writing a recipe but never cooking it.`,
    },
  ],

  code: `# Hello, Sound!
# Your very first JAM program -- a simple sine wave melody.

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
      text: "Change the first note from C4 to A4. What does it sound like?",
      hint: "A4 is the note used to tune orchestras -- it vibrates at exactly 440 times per second!",
    },
    {
      id: "add-note",
      text: "Add another PLAY line after the last note. Try PLAY tone C5 2 -- that's one octave higher than C4.",
      hint: "Each octave doubles the frequency. C5 sounds exactly like C4 but higher!",
    },
    {
      id: "change-tempo",
      text: "Change the BPM to 200. How does the music feel different?",
      hint: "200 BPM is the speed of most drum and bass music!",
    },
  ],

  funFact:
    "The sine wave is the simplest sound that exists -- it's a perfectly smooth vibration with no overtones. Every other sound can be built by combining sine waves of different frequencies, which is exactly how digital audio works!",
};

export default lesson01;
