const lesson11 = {
  id: 11,
  slug: "play-together",
  title: "All Together Now",
  subtitle: "Play instruments at the exact same time",
  phase: 3,
  difficulty: 3,
  goal: "Use PLAY_TOGETHER to make bass, melody, and drums play simultaneously -- like a real band!",
  concepts: ["PLAY_TOGETHER", "Simultaneous playback", "Layered arrangements"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "The problem with one-at-a-time",
      content: `Up to now, when you write:

\`\`\`
PLAY_SEQUENCE bassline
PLAY_SEQUENCE melody
PLAY_PATTERN drums
\`\`\`

JEM plays bass **first**, then melody **after**, then drums **last**. That's not how a real band works -- they all play at the same time!`,
    },
    {
      title: "PLAY_TOGETHER to the rescue",
      content: `Wrap your sequences and patterns in a **PLAY_TOGETHER** block to mix them:

\`\`\`
PLAY_TOGETHER:
    PLAY_SEQUENCE bassline
    PLAY_SEQUENCE melody
    PLAY_PATTERN drums
\`\`\`

Now all three play at once -- bass thumps, melody sings, drums keep the beat. Together!`,
    },
    {
      title: "Inside a LOOP",
      content: `You can put PLAY_TOGETHER inside a LOOP to repeat the whole band:

\`\`\`
LOOP 4:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_PATTERN beat
\`\`\`

This repeats the full mix 4 times. The whole band plays together each time through the loop.

Press Play to hear the difference!`,
    },
  ],

  code: `# All Together Now!
# PLAY_TOGETHER makes instruments play at the same time

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

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 30
    VOLUME 140

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
    BEAT 1: hat
    BEAT 2: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: hat

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "add-snare",
      text: "Add a snare drum (WAVE NOISE, FREQ 200, DECAY 60) and put it on beats 2 and 4 in the pattern. It'll play together with everything else!",
      hint: "Add the snare INSTRUMENT, then add BEAT 2: snare and BEAT 4: snare to the pattern.",
    },
    {
      id: "second-melody",
      text: "Create a second melody sequence called 'harmony' using higher notes (C5, E5, G5). Add it to the PLAY_TOGETHER block.",
      hint: "Make a new SEQUENCE harmony: with PLAY lead notes, then add PLAY_SEQUENCE harmony inside PLAY_TOGETHER.",
    },
    {
      id: "compare",
      text: "Try removing PLAY_TOGETHER (keep the sequences but play them one after another). Hear the difference? Put it back!",
      hint: "Remove the PLAY_TOGETHER: line and un-indent the PLAY_SEQUENCE lines. Then undo to hear together again.",
    },
  ],

  funFact:
    "When a band plays live, every musician hears everyone else and stays in sync. PLAY_TOGETHER does the same thing -- it lines up all the parts so they start at beat 1 together, like a conductor counting '1, 2, 3, go!'",
};

export default lesson11;
