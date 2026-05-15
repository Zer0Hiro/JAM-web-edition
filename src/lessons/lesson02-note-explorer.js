const lesson02 = {
  id: 2,
  slug: "note-explorer",
  title: "Note Explorer",
  subtitle: "Discover the musical alphabet",
  phase: 1,
  difficulty: 1,
  goal: "Learn how musical notes, octaves, and durations work, then play a real scale.",
  concepts: ["Musical notes (C-B)", "Octaves", "Sharps and flats", "Note duration"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "The Musical Alphabet",
      content: `Music only uses 7 letters: **C D E F G A B**. Then it starts over from C again.

Think of it like levels in a game. After level B, you don't go to level H -- you loop back to C but one floor higher. That loop is called an **octave**.`,
    },
    {
      title: "Octaves",
      content: `The number after the letter is the octave -- like a floor in a building.

- **C2** = basement. Deep, rumbly bass.
- **C3** = ground floor.
- **C4** = middle C. The center of the piano.
- **C5** = one floor up. Same note, higher pitch.
- **C6** = way up top. Bright and sparkly.

Higher number = higher sound. C3 is lower than C4, which is lower than C5.`,
    },
    {
      title: "Sharps and Flats",
      content: `Between some notes there are "in-between" notes. Those are the black keys on a piano.

- **C#4** (C sharp) = a tiny bit higher than C4
- **Db4** (D flat) = a tiny bit lower than D4
- C#4 and Db4 are actually the same sound, just different names

Not every note has a sharp/flat between them. E-F and B-C are right next to each other with no gap.`,
    },
    {
      title: "How Long Notes Last",
      content: `The number after the note name is the **duration** -- how many beats it plays.

| Duration | Name | Feel |
|----------|------|------|
| 0.25 | Sixteenth note | Super quick |
| 0.5 | Eighth note | Short |
| 1 | Quarter note | Standard beat |
| 2 | Half note | Long |
| 4 | Whole note | Really long |

At BPM 120, one beat = half a second. So a note with duration 2 lasts a full second.`,
    },
  ],

  code: `# Note Explorer
# C major scale -- up and back down

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
    PLAY synth B4 0.5
    PLAY synth A4 0.5
    PLAY synth G4 0.5
    PLAY synth F4 0.5
    PLAY synth E4 0.5
    PLAY synth D4 0.5
    PLAY synth C4 1

PLAY_SEQUENCE scale`,

  challenges: [
    {
      id: "descending-only",
      text: "Delete the ascending part and keep only the descending half (C5 down to C4). A falling scale sounds totally different!",
      hint: "Start the sequence from PLAY synth C5 1 and go down to C4.",
    },
    {
      id: "minor-feel",
      text: "Change E4 to Eb4 and B4 to Bb4 (both going up and coming down). Now it sounds darker -- you just made a minor scale!",
      hint: "Eb4 and Bb4 are 'flat' versions -- a tiny bit lower. Minor scales have that moody, sad vibe.",
    },
    {
      id: "speed-run",
      text: "Change all the durations to 0.25. Speed run!",
      hint: "Each note is now twice as fast. It sounds like a quick musical waterfall.",
    },
  ],

  funFact:
    "When you go up one octave, the sound vibrates exactly twice as fast. A4 vibrates 440 times per second, and A5 vibrates 880 times per second. Your brain hears them as the 'same note' just higher up.",
};

export default lesson02;
