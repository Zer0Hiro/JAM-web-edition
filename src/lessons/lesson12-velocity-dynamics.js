const lesson12 = {
  id: 12,
  slug: "velocity-dynamics",
  title: "Loud & Soft",
  subtitle: "Control how hard each note is played",
  phase: 3,
  difficulty: 3,
  goal: "Use velocity to make some notes louder and others softer -- adding dynamics to your music!",
  concepts: ["Per-note velocity", "Dynamics", "Musical expression"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "What is velocity?",
      content: `In real music, a piano key hit hard sounds **loud**, and a gentle tap sounds **soft**. That's called **velocity**.

In JEM, you can add a velocity number (0-255) after the duration:

\`\`\`
PLAY lead C4 1 200    # loud
PLAY lead E4 1 80     # soft
\`\`\`

255 = maximum volume, 0 = silent. If you leave it out, the instrument plays at full volume.`,
    },
    {
      title: "Creating a crescendo",
      content: `A crescendo means getting louder over time. Watch the velocity numbers grow:

\`\`\`
PLAY lead C4 0.5 60
PLAY lead D4 0.5 100
PLAY lead E4 0.5 160
PLAY lead F4 0.5 220
\`\`\`

Each note is louder than the last -- like walking toward a speaker!`,
    },
    {
      title: "Accenting beats",
      content: `In drum patterns, you can accent certain beats too:

\`\`\`
BEAT 1: kick 220
BEAT 2: hat 100
BEAT 3: kick 180
BEAT 4: hat 80
\`\`\`

The kicks hit harder than the hi-hats, giving the beat a groove. Try changing the numbers and hear the difference!`,
    },
  ],

  code: `# Loud & Soft -- Velocity dynamics
# Add a number after duration to control volume per note

BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 30 200 100
    VOLUME 200

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
    VOLUME 180

SEQUENCE melody:
    PLAY lead C4 0.5 60
    PLAY lead D4 0.5 100
    PLAY lead E4 0.5 160
    PLAY lead G4 0.5 220
    PLAY lead E4 0.5 180
    PLAY lead D4 0.5 120
    PLAY lead C4 1 200

PATTERN beat:
    BEAT 1: kick 220
    BEAT 2: hat 100
    BEAT 3: kick 180
    BEAT 4: hat 80

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "decrescendo",
      text: "Reverse the melody velocities to create a decrescendo (getting softer). Start at 220 and end at 60.",
      hint: "Change the velocity numbers so they decrease: 220, 180, 160, 120, 100, 80, 60.",
    },
    {
      id: "ghost-notes",
      text: "Add 'ghost notes' -- very quiet hi-hat hits (velocity 40) on the 'and' beats (1.5, 2.5, 3.5, 4.5).",
      hint: "Add BEAT 1.5: hat 40, BEAT 2.5: hat 40, etc. to the pattern.",
    },
    {
      id: "velocity-chord",
      text: "Try adding velocity to a chord: PLAY lead [C4 E4 G4] 2 150. Does it work?",
      hint: "Add a PLAY with a chord and velocity at the end. The whole chord plays at that velocity.",
    },
  ],

  funFact:
    "On a real piano, velocity literally means how fast the hammer hits the string. MIDI keyboards measure this as 0-127 -- JEM uses 0-255 for finer control!",
};

export default lesson12;
