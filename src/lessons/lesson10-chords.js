const lesson10 = {
  id: 10,
  slug: "chords",
  title: "Power Chords",
  subtitle: "Play multiple notes at once",
  phase: 3,
  difficulty: 3,
  goal: "Use chord brackets to play notes simultaneously and build harmonies!",
  concepts: ["Chords (bracket syntax)", "Major & minor triads", "Chord progressions"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "One note is lonely",
      content: `So far, every PLAY command plays one note at a time. But real music has **harmony** -- multiple notes ringing together.

When you strum a guitar or press piano keys at once, that's a **chord**. In JEM, you make chords by wrapping notes in square brackets: \`[C4 E4 G4]\``,
    },
    {
      title: "Bracket syntax",
      content: `Here's how it works:

\`\`\`
PLAY pad [C4 E4 G4] 2
\`\`\`

Same as a regular PLAY, but instead of one note you put **two or more notes** inside \`[ ]\`. All the notes play at the same time for the same duration.

The notes inside the brackets are just regular note names separated by spaces.`,
    },
    {
      title: "Major vs minor",
      content: `Two chords you'll hear everywhere:

**C Major** -- happy, bright:
\`\`\`
PLAY pad [C4 E4 G4] 2
\`\`\`

**A Minor** -- sad, moody:
\`\`\`
PLAY pad [A3 C4 E4] 2
\`\`\`

The difference? Just one note changes. That tiny shift completely changes the feeling!

Press Play to hear a chord progression that mixes major and minor chords.`,
    },
  ],

  code: `# Power Chords
# Play notes together with [ ] brackets

BPM 100

INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    ADSR 50 100 300 200
    VOLUME 180

SEQUENCE progression:
    PLAY pad [C4 E4 G4] 2
    PLAY pad [A3 C4 E4] 2
    PLAY pad [F3 A3 C4] 2
    PLAY pad [G3 B3 D4] 2

LOOP 2:
    PLAY_SEQUENCE progression`,

  challenges: [
    {
      id: "minor-mood",
      text: "Change all four chords to minor chords: [C4 Eb4 G4], [A3 C4 E4], [F3 Ab3 C4], [G3 Bb3 D4]. How does the mood change?",
      hint: "A minor chord lowers the middle note by one semitone. Eb is E-flat, Ab is A-flat, Bb is B-flat.",
    },
    {
      id: "slow-pad",
      text: "Change the ADSR to 300 100 400 500 and the WAVE to SIN. Now the chords sound dreamy and spacey!",
      hint: "Long attack + long release = sounds that float in and out. SIN wave is the smoothest.",
    },
    {
      id: "add-melody",
      text: "Add a second instrument (lead, WAVE TRIANGLE) and a melody sequence that plays single notes over the chords. Put both in the LOOP.",
      hint: "Chords are the background, melody is the foreground. Together they make harmony + tune!",
    },
  ],

  funFact:
    "The I-vi-IV-V chord progression (like C, Am, F, G) is called the '50s progression' because it was used in hundreds of pop songs. From 'Stand By Me' to modern hits, the same four chords keep coming back!",
};

export default lesson10;
