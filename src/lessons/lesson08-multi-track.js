const lesson08 = {
  id: 8,
  slug: "multi-track",
  title: "Mix It Up",
  subtitle: "Combine bass, lead, and drums",
  phase: 3,
  difficulty: 3,
  goal: "Build a track with bass, melody, AND drums all playing together!",
  concepts: ["Multi-instrument arrangements", "Bass lines", "Layering"],
  estimatedMinutes: 15,

  steps: [
    {
      title: "Songs have layers",
      content: `Think about your favorite song. You can hear different things happening at once:
- **Bass** -- the deep, rumbly part
- **Melody** -- the main tune you'd hum
- **Drums** -- the beat that keeps it all together

In JAM, you make separate instruments for each layer and combine them!`,
    },
    {
      title: "Build a bass line",
      content: `Bass uses low notes (C2, G2) and a SAW wave for that deep rumble:

\`\`\`
INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    VOLUME 220
\`\`\`

Good bass lines are simple and repetitive. They're the foundation!`,
    },
    {
      title: "Stack it all up",
      content: `Put everything inside a LOOP:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE bassline
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat
\`\`\`

JAM plays bass, then melody, then drums, and repeats. That's a real track!

Press Play to hear all three layers working together.`,
    },
  ],

  code: `# Mix It Up
# Bass + lead + drums = a real track!

BPM 120

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 300 120
    VOLUME 220

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

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass C2 1
    PLAY bass G2 1
    PLAY bass F2 1

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

LOOP 2:
    PLAY_SEQUENCE bassline
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat`,

  challenges: [
    {
      id: "add-snare",
      text: "Add a snare! Make a new DRUM instrument with WAVE NOISE, FREQ 200, DECAY 60. Then add BEAT 2: snare and BEAT 4: snare to the pattern.",
      hint: "Kick on 1 and 3, snare on 2 and 4 -- that's the classic rock beat!",
    },
    {
      id: "change-bass",
      text: "Change the bass notes to C2, E2, F2, G2. It sounds like it's 'walking' up!",
      hint: "A walking bass line goes step-by-step. Jazz and funk use this a lot!",
    },
    {
      id: "add-hat",
      text: "Add a hi-hat on all 4 beats for a fuller sound.",
      hint: "TYPE DRUM, WAVE NOISE, FREQ 800, DECAY 30. Then add BEAT 1/2/3/4 hat lines to the pattern!",
    },
  ],

  funFact:
    "Mixing is all about giving each instrument its own space. Bass goes low, melody goes in the middle, cymbals go high. That's why they don't all smoosh into one muddy sound!",
};

export default lesson08;
