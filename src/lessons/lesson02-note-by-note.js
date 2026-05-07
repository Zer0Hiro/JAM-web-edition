const lesson02 = {
  id: 2,
  slug: "note-by-note",
  title: "Note by Note",
  subtitle: "Play different musical notes",
  phase: 1,
  difficulty: 1,
  goal: "Learn how notes work and play a real musical scale!",
  concepts: ["Musical notes (C, D, E...)", "Octaves", "Note duration"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "Notes are just vibrations",
      content: `Every note is a vibration. Faster vibration = higher sound.

Here are the main notes (like the white keys on a piano):
- **C4** = Middle C
- **D4, E4, F4, G4, A4, B4** = going up
- **C5** = one octave higher than C4

Higher number after the letter = higher pitch. C3 is lower than C4, which is lower than C5.`,
    },
    {
      title: "Sharps and flats",
      content: `Between some notes there are "in-between" notes (the black keys on a piano):

- **C#4** = C sharp (a tiny bit higher than C)
- **Bb4** = B flat (a tiny bit lower than B)

That gives you ALL the keys -- white and black!`,
    },
    {
      title: "How long notes last",
      content: `The number after the note name is how many beats it plays:

- **0.25** = super short
- **0.5** = short
- **1** = one beat
- **2** = long
- **4** = really long

At 120 BPM, one beat = half a second.`,
    },
    {
      title: "Play a scale!",
      content: `A scale is all the notes going up in order. Here's C major:

\`\`\`
SEQUENCE scale:
    PLAY synth C4 0.5
    PLAY synth D4 0.5
    PLAY synth E4 0.5
    PLAY synth F4 0.5
    PLAY synth G4 0.5
    PLAY synth A4 0.5
    PLAY synth B4 0.5
    PLAY synth C5 1
\`\`\`

Press Play and you'll hear it go up step by step!`,
    },
  ],

  code: `# Note by Note
# Playing a C major scale!

BPM 120

INSTRUMENT synth:
    TYPE SYNTH
    WAVE SIN
    ADSR 10 50 200 100
    VOLUME 200

SEQUENCE scale:
    PLAY synth C4 0.5
    PLAY synth D4 0.5
    PLAY synth E4 0.5
    PLAY synth F4 0.5
    PLAY synth G4 0.5
    PLAY synth A4 0.5
    PLAY synth B4 0.5
    PLAY synth C5 1

PLAY_SEQUENCE scale`,

  challenges: [
    {
      id: "descending",
      text: "Make the scale go back down! Add C5, B4, A4, G4... all the way back to C4.",
      hint: "Just add more PLAY lines in reverse order after the last one. Copy-paste and flip!",
    },
    {
      id: "minor-scale",
      text: "Change E4 to Eb4 and B4 to Bb4. Now it sounds sad! You just made a minor scale.",
      hint: "Minor scales sound darker and moodier. Lots of movie villain themes use them!",
    },
    {
      id: "speed-up",
      text: "Change all the 0.5 durations to 0.25. Zoom zoom!",
      hint: "Now each note is twice as fast -- like a speed run!",
    },
  ],

  funFact:
    "When you go up one octave, the vibrations double. A4 = 440 vibrations per second, A5 = 880. Your brain hears them as the 'same note' but higher!",
};

export default lesson02;
