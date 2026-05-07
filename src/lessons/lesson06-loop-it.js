const lesson06 = {
  id: 6,
  slug: "loop-it",
  title: "Loop It!",
  subtitle: "Repeat and layer sequences",
  phase: 2,
  difficulty: 2,
  goal: "Use LOOP blocks to repeat musical phrases and build song structure.",
  concepts: ["LOOP repetition", "Song structure", "Layering sequences and patterns"],
  estimatedMinutes: 15,

  steps: [
    {
      title: "Why loops matter",
      content: `Every song you've ever heard is built from loops -- short musical phrases that repeat over and over. The verse, the chorus, the beat -- they all repeat.

In JAM, the LOOP block repeats everything inside it a set number of times:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE melody
\`\`\`

This plays the "melody" sequence 4 times in a row. Without LOOP, you'd have to copy-paste the PLAY_SEQUENCE line 4 times -- messy!`,
    },
    {
      title: "Looping multiple things",
      content: `You can put multiple items inside a LOOP to play them together each time:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE bassline
    PLAY_SEQUENCE melody
    PLAY_PATTERN drums
\`\`\`

Each time through the loop, JAM plays the bassline, then the melody, then the drums. This is how you build a full section of a song!`,
    },
    {
      title: "Building song structure",
      content: `Real songs have structure: intro, verse, chorus, etc. You can create this by using multiple LOOPs and sequences:

\`\`\`
# Intro -- just the melody, 2 times
LOOP 2:
    PLAY_SEQUENCE melody

# Main section -- melody + drums, 4 times
LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN drums

# Ending -- one last melody
PLAY_SEQUENCE melody
\`\`\`

This creates a clear beginning, middle, and end.`,
    },
  ],

  code: `# Loop It!
# A melody with drums that builds up over time.

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
      text: "Change the main section from LOOP 4 to LOOP 8. The song gets longer and more hypnotic!",
      hint: "Electronic music often loops phrases 8 or 16 times to build atmosphere.",
    },
    {
      id: "add-hat",
      text: "Add a hi-hat instrument and add BEAT 1/2/3/4 hat lines to the pattern.",
      hint: "Copy the hat instrument definition from the Beat Drop lesson!",
    },
    {
      id: "second-melody",
      text: "Create a second SEQUENCE called 'melody2' with different notes, and alternate between them.",
      hint: "You could play melody in the first LOOP and melody2 in the second LOOP.",
    },
  ],

  funFact:
    "The concept of the musical 'loop' was pioneered by Pierre Schaeffer in 1948, who physically cut magnetic tape into rings that played continuously. Today, loops are the foundation of almost all electronic music production!",
};

export default lesson06;
