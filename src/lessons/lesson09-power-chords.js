const lesson09 = {
  id: 9,
  slug: "power-chords",
  title: "Power Chords",
  subtitle: "Play multiple notes at the same time",
  phase: 3,
  difficulty: 2,
  goal: "Use bracket syntax to play chords and build chord progressions.",
  concepts: ["Chords (bracket syntax)", "Major & minor triads", "Chord progressions"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "One note is lonely",
      content: `So far, every PLAY command plays a single note. Melodies are great, but real music has **harmony** -- multiple notes ringing at the same time.

When you strum a guitar or press several piano keys at once, that's a **chord**. Chords add instant richness and emotion. One note tells a story. Three notes set the whole mood.`,
    },
    {
      title: "Bracket syntax",
      content: `In JEM, you make a chord by wrapping notes in square brackets:

\`\`\`
PLAY pad [C4 E4 G4] 2
\`\`\`

Same as a regular PLAY, but instead of one note you put **two or more notes** inside \`[ ]\`. All the notes play at the same time for the same duration.

You can put as many notes as you want, but 3-4 notes usually sounds best. More than that can get muddy.`,
    },
    {
      title: "Major vs Minor",
      content: `Two flavors of chords you'll hear everywhere:

**C Major** (happy, bright):
\`\`\`
PLAY pad [C4 E4 G4] 2
\`\`\`

**C Minor** (sad, dark):
\`\`\`
PLAY pad [C4 Eb4 G4] 2
\`\`\`

The only difference? The middle note dropped by one semitone (E became Eb). That tiny change flips the entire feeling. Major = sunshine. Minor = rain.`,
    },
    {
      title: "Chord progressions",
      content: `A **chord progression** is a sequence of chords played one after another. It's the emotional backbone of a song.

The classic **I-V-vi-IV** progression (C, G, Am, F) shows up in thousands of pop songs:

\`\`\`
PLAY pad [C4 E4 G4] 2
PLAY pad [G3 B3 D4] 2
PLAY pad [A3 C4 E4] 2
PLAY pad [F3 A3 C4] 2
\`\`\`

Press Play to hear this progression. You'll probably recognize the sound -- it's everywhere in pop music!`,
    },
  ],

  code: `# Power Chords
# A classic chord progression with bracket syntax

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
      id: "all-minor",
      text: "Change all four chords to minor: [C4 Eb4 G4], [A3 C4 E4], [F3 Ab3 C4], [G3 Bb3 D4]. How does the mood change?",
      hint: "Minor chords lower the middle note by one semitone. Eb is E-flat, Ab is A-flat, Bb is B-flat. The whole thing will sound darker and moodier.",
    },
    {
      id: "slow-pad",
      text: "Change ADSR to 300 100 400 500 and WAVE to SIN for a dreamy, spacey sound.",
      hint: "Long attack means chords fade in slowly. Long release means they linger. SIN wave is the smoothest and purest.",
    },
    {
      id: "add-melody",
      text: "Add a second instrument (WAVE TRIANGLE) and write a melody of single notes that plays over the chords.",
      hint: "Create a new INSTRUMENT and SEQUENCE with single notes like E4, G4, A4. Put both PLAY_SEQUENCE lines in the LOOP. Melody + chords = a real song!",
    },
  ],

  funFact:
    "The I-vi-IV-V chord progression has been used in hundreds of pop songs, from \"Stand By Me\" by Ben E. King to modern hits. Songwriters call it the \"four chord song\" because those same four chords just keep working.",
};

export default lesson09;
