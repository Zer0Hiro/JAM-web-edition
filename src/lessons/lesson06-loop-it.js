const lesson06 = {
  id: 6,
  slug: "loop-it",
  title: "Loop It!",
  subtitle: "Repeat and build up your song",
  phase: 2,
  difficulty: 2,
  goal: "Use LOOP to repeat music and build a song with different sections.",
  concepts: ["LOOP repetition", "Song structure", "Layering sequences and patterns"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "Why repeat?",
      content: `Every song you know is built from repeating parts. The chorus comes back, the beat keeps going.

LOOP makes things repeat:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE melody
\`\`\`

This plays "melody" four times. Without LOOP, you'd have to copy-paste everything. Yuck!`,
    },
    {
      title: "Loop multiple things",
      content: `Put several things inside one LOOP:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN drums
\`\`\`

Each time through: melody plays, then drums play. That's how you build a section of a song!`,
    },
    {
      title: "Build a mini-song",
      content: `Use different LOOPs for different sections:

\`\`\`
# Intro -- just melody
LOOP 2:
    PLAY_SEQUENCE melody

# Main part -- melody + drums
LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN drums

# Ending
PLAY_SEQUENCE melody
\`\`\`

Now your song has a beginning, middle, and end!`,
    },
  ],

  code: `# Loop It!
# A melody that builds up when drums join in.

BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    VOLUME 180

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 50
    VOLUME 200

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick
    BEAT 2: snare
    BEAT 4: snare

# Intro -- melody alone
LOOP 2:
    PLAY_SEQUENCE melody

# Main section -- melody + drums
LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat

# Ending
PLAY_SEQUENCE melody`,

  challenges: [
    {
      id: "more-loops",
      text: "Change the main section to LOOP 8. It gets hypnotic!",
      hint: "Electronic music often repeats the same thing 8 or 16 times. It puts you in a groove!",
    },
    {
      id: "add-hat",
      text: "Add a hi-hat instrument and put it on all 4 beats in the pattern.",
      hint: "Use TYPE DRUM, WAVE NOISE, FREQ 800, DECAY 30. Then add BEAT 1/2/3/4 hat lines!",
    },
    {
      id: "second-melody",
      text: "Make a second SEQUENCE called melody2 with different notes. Play it after the main section!",
      hint: "Create a new SEQUENCE block, then add PLAY_SEQUENCE melody2 somewhere in your arrangement.",
    },
  ],

  funFact:
    "The idea of looping music was invented in 1948 by a guy who literally cut magnetic tape into circles that played forever. Today, loops are the building blocks of almost ALL electronic music!",
};

export default lesson06;
