const lesson02 = {
  id: 2,
  slug: "note-by-note",
  title: "Note by Note",
  subtitle: "Play different musical notes",
  phase: 1,
  difficulty: 1,
  goal: "Learn how musical notes map to frequencies and play a simple scale.",
  concepts: ["Musical notes (C, D, E...)", "Octaves", "Note duration"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "How notes work",
      content: `Every musical note is just a vibration at a specific speed. The note A4 vibrates 440 times per second -- we call this 440 Hz (Hertz).

In JAM, you write notes using **scientific pitch notation**: a letter name plus an octave number.

- **C4** = Middle C (262 Hz)
- **D4** = (294 Hz)
- **E4** = (330 Hz)
- **F4** = (349 Hz)
- **G4** = (392 Hz)
- **A4** = (440 Hz)
- **B4** = (494 Hz)
- **C5** = (523 Hz) -- one octave higher than C4

Higher octave numbers = higher pitch. C3 sounds lower than C4, which sounds lower than C5.`,
    },
    {
      title: "Sharps and flats",
      content: `Between some notes, there are "in-between" notes called sharps and flats:

- **C#4** or **Cs4** = C sharp (a half step above C)
- **Bb4** = B flat (a half step below B)
- **D#4** = D sharp
- **F#4** or **Fs4** = F sharp

These give you access to ALL the keys on a piano keyboard -- the white *and* black keys.`,
    },
    {
      title: "Note duration",
      content: `The number after the note name controls how long it plays, measured in beats:

- **0.25** = a sixteenth note (very short)
- **0.5** = an eighth note
- **1** = a quarter note (one beat)
- **2** = a half note
- **4** = a whole note (held for a full bar in 4/4 time)

At 120 BPM, one beat = 0.5 seconds. So a note with duration 2 plays for 1 full second.`,
    },
    {
      title: "Building a scale",
      content: `Let's play a C major scale -- all the white keys from C4 to C5:

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

Each note plays for half a beat (0.5), except the final C5 which rings out for a full beat. Try it out!`,
    },
  ],

  code: `# Note by Note
# Playing a C major scale -- the building block of Western music!

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
      text: "Make the scale go back down after reaching C5 (C5, B4, A4, G4... back to C4).",
      hint: "Just add more PLAY lines in reverse order after C5!",
    },
    {
      id: "minor-scale",
      text: "Change E4 to Eb4 and B4 to Bb4. You just made a C minor scale! Does it sound sadder?",
      hint: "Minor scales sound 'darker' because the intervals between notes are slightly different.",
    },
    {
      id: "speed-up",
      text: "Change all the 0.5 durations to 0.25 to play the scale twice as fast.",
      hint: "This is called 'double time' -- the notes fly by at twice the speed!",
    },
  ],

  funFact:
    "When you go up one octave, the frequency exactly doubles. A4 = 440 Hz, A5 = 880 Hz, A3 = 220 Hz. Your brain perceives these as the 'same' note, just higher or lower -- that's why octaves sound so natural!",
};

export default lesson02;
