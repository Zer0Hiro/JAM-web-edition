const lesson06 = {
  id: 6,
  slug: "loop-machine",
  title: "Loop Machine",
  subtitle: "Repeat, layer, and build song structure",
  phase: 2,
  difficulty: 2,
  goal: "Use LOOP to repeat sections and build a mini-song with structure.",
  concepts: ["LOOP repetition", "Nesting loops", "Song structure"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "Why repeat?",
      content: `All music repeats. Chorus, verse, chorus. The beat keeps going. That's what makes songs catchy.

LOOP makes things repeat without copy-pasting:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE melody
\`\`\`

This plays "melody" four times in a row. The number after LOOP is how many times. Everything indented underneath gets repeated.`,
    },
    {
      title: "Loop multiple things",
      content: `You can put sequences AND patterns inside one LOOP. They play one after another, then the whole block repeats:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN drums
\`\`\`

Each time through: melody plays, then drums play, then it loops back. That's how you build a section of a song!`,
    },
    {
      title: "Nested loops",
      content: `You can put a LOOP inside another LOOP. Like a Russian nesting doll.

\`\`\`
LOOP 2:
    LOOP 4:
        PLAY_SEQUENCE riff
    PLAY_PATTERN drums
\`\`\`

The inner LOOP runs 4 times every time the outer LOOP ticks once. So "riff" plays 4 times, then "drums" plays once, then the whole thing repeats. Total: riff plays 8 times, drums plays 2 times.`,
    },
    {
      title: "Build a mini-song",
      content: `Real songs have sections -- intro, verse, chorus, ending. Use different LOOPs for each:

\`\`\`
# Intro -- melody alone
LOOP 2:
    PLAY_SEQUENCE melody

# Main -- melody + drums
LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat

# Ending -- melody once
PLAY_SEQUENCE melody
\`\`\`

Now your music has a beginning, middle, and end. Press Play to hear the full structure!`,
    },
  ],

  code: `# Loop Machine
# A melody that builds up when drums join in

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
    BEAT 2: snare
    BEAT 3: kick
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
      text: "Change the main section to LOOP 8. Does it feel more hypnotic?",
      hint: "Electronic music often repeats the same thing 8 or 16 times. Repetition puts you in a groove!",
    },
    {
      id: "add-hat",
      text: "Add a hi-hat instrument (TYPE DRUM, WAVE NOISE, FREQ 800, DECAY 30) and put it on all 4 beats in the pattern.",
      hint: "Add BEAT 1: hat, BEAT 2: hat, BEAT 3: hat, BEAT 4: hat to the pattern. Instant energy!",
    },
    {
      id: "second-melody",
      text: "Create a second SEQUENCE called melody2 with different notes. Play it after the main section as an outro!",
      hint: "Make a new SEQUENCE block with new notes, then add PLAY_SEQUENCE melody2 at the end of your arrangement.",
    },
  ],

  funFact:
    "The idea of looping music was invented in 1948 when a guy literally cut magnetic tape into circles that played forever. Today, loops are the building blocks of almost all electronic music.",
};

export default lesson06;
