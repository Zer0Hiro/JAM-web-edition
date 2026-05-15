const lesson07 = {
  id: 7,
  slug: "band-mode",
  title: "Band Mode",
  subtitle: "Play multiple instruments at the same time",
  phase: 2,
  difficulty: 2,
  goal: "Use PLAY_TOGETHER to layer instruments and make them play simultaneously.",
  concepts: [
    "PLAY_TOGETHER",
    "Simultaneous playback",
    "Multi-instrument arrangements",
  ],
  estimatedMinutes: 12,

  steps: [
    {
      title: "The problem",
      content: `So far, everything plays one after another. If you write:

\`\`\`
PLAY_SEQUENCE bassline
PLAY_SEQUENCE melody
\`\`\`

The bass finishes completely, THEN the melody starts. That's not how a band works! In a real band, everyone plays at the same time.`,
    },
    {
      title: "PLAY_TOGETHER",
      content: `PLAY_TOGETHER makes everything inside it start at the same time:

\`\`\`
PLAY_TOGETHER:
    PLAY_SEQUENCE bassline
    PLAY_SEQUENCE melody
    PLAY_PATTERN drums
\`\`\`

Bass, melody, and drums all kick in together. Like a conductor saying "1, 2, 3, go!" Everything inside finishes when the longest part finishes.`,
    },
    {
      title: "Inside a LOOP",
      content: `Put PLAY_TOGETHER inside a LOOP and you've got a real track:

\`\`\`
LOOP 4:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_PATTERN drums
\`\`\`

All parts play together, then the whole thing repeats 4 times. This is how you build an actual song -- layers of instruments all playing at once, looping to build sections.

Press Play to hear how the code sounds with bass, lead, kick, and hi-hat all together!`,
    },
  ],

  code: `# Band Mode
# Bass, lead, and drums all playing together

BPM 120

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 50 200 80
    VOLUME 200

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 40 150 100
    VOLUME 170

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 90
    VOLUME 255

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 25
    VOLUME 120

SEQUENCE bassline:
    PLAY bass C3 1
    PLAY bass C3 0.5
    REST 0.5
    PLAY bass G2 1
    PLAY bass G2 0.5
    REST 0.5

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1

PATTERN groove:
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
        PLAY_PATTERN groove`,

  challenges: [
    {
      id: "add-snare",
      text: "Add a snare instrument and put it on beats 2 and 4 in the pattern.",
      hint: "Create a DRUM with WAVE NOISE, FREQ 200, DECAY 60. Then add BEAT 2: snare and BEAT 4: snare to the pattern.",
    },
    {
      id: "add-harmony",
      text: "Create a third SEQUENCE called harmony with higher notes (like G4, B4, C5). Add it inside PLAY_TOGETHER.",
      hint: "Write a new SEQUENCE block, then add PLAY_SEQUENCE harmony inside the PLAY_TOGETHER block.",
    },
    {
      id: "remove-together",
      text: "Remove the PLAY_TOGETHER block (keep the PLAY_SEQUENCE and PLAY_PATTERN lines). Hear the difference!",
      hint: "Without PLAY_TOGETHER, each part plays one after another instead of at the same time. Big difference!",
    },
  ],

  funFact:
    "In a live band, musicians listen to each other and stay in sync naturally. PLAY_TOGETHER is like a digital conductor -- it tells every instrument exactly when to start so they play in perfect time.",
};

export default lesson07;
