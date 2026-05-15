const lesson10 = {
  id: 10,
  slug: "dynamics",
  title: "Dynamics",
  subtitle: "Control how loud each note plays",
  phase: 3,
  difficulty: 2,
  goal: "Use velocity and VELOCITY_CURVE to make music that breathes and builds.",
  concepts: ["Per-note velocity", "Crescendo", "Decrescendo", "VELOCITY_CURVE"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "What is velocity?",
      content: `Imagine pressing a piano key gently vs smashing it hard. Same note, but way different volume. That's **velocity**.

In JEM, velocity is the number after the duration:

\`\`\`
PLAY lead C4 1 200
\`\`\`

That \`200\` is the velocity. Range is 0 (silent) to 255 (full blast). If you leave it out, JEM plays at full volume.

\`PLAY lead C4 1 50\` = quiet whisper. \`PLAY lead C4 1 200\` = loud and proud.`,
    },
    {
      title: "Crescendo by hand",
      content: `A **crescendo** is when music gets louder over time. Like walking toward a speaker.

You can write it manually by increasing the velocity on each note:

\`\`\`
PLAY lead C4 1 60
PLAY lead D4 1 100
PLAY lead E4 1 160
PLAY lead F4 1 220
\`\`\`

Each note is louder than the last. The music builds up and gets more intense. This is how you create tension and excitement!`,
    },
    {
      title: "VELOCITY_CURVE -- auto mode",
      content: `Writing velocities by hand works, but it gets tedious for long sections. VELOCITY_CURVE does it automatically:

\`\`\`
VELOCITY_CURVE CRESCENDO 40 230 6
\`\`\`

This spreads velocities from 40 to 230 over the next 6 notes. No manual numbers needed -- JEM calculates each step for you.

After 6 notes, velocity stays at the end value (230). It's like setting a volume ramp and letting JEM handle the math.`,
    },
    {
      title: "Decrescendo and OFF",
      content: `Getting quieter is just as powerful. Use DECRESCENDO:

\`\`\`
VELOCITY_CURVE DECRESCENDO 200 60 4
\`\`\`

This fades from loud (200) to quiet (60) over 4 notes. Like a sound drifting away.

Want to stop the curve early? Use:
\`\`\`
VELOCITY_CURVE OFF
\`\`\`

You can also override individual notes by adding an explicit velocity -- the curve skips that note and continues.`,
    },
  ],

  code: `# Dynamics
# Building intensity with velocity

BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 60 200 80
    VOLUME 200

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 60
    DECAY 80
    VOLUME 255

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 30
    VOLUME 140

SEQUENCE manual_build:
    PLAY lead C4 1 60
    PLAY lead D4 1 100
    PLAY lead E4 1 140
    PLAY lead F4 1 180
    PLAY lead G4 1 220
    REST 1

SEQUENCE auto_build:
    VELOCITY_CURVE CRESCENDO 40 230 6
    PLAY lead C4 0.5
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead C5 0.5
    PLAY lead E5 0.5
    PLAY lead G5 0.5
    VELOCITY_CURVE OFF
    REST 1

PATTERN beat:
    BEAT 1: kick
    BEAT 2: hat 0.5 100
    BEAT 2.5: hat 0.5 60
    BEAT 3: kick
    BEAT 4: hat 0.5 100
    BEAT 4.5: hat 0.5 60

LOOP 2:
    PLAY_SEQUENCE manual_build
LOOP 2:
    PLAY_SEQUENCE auto_build
    PLAY_PATTERN beat`,

  challenges: [
    {
      id: "decrescendo",
      text: "Reverse the manual_build velocities: start at 220 and go down to 60. How does the mood change?",
      hint: "Going from loud to quiet creates a fading, calming effect. Like footsteps walking away from you.",
    },
    {
      id: "ghost-notes",
      text: "Add extra hat hits at beats 1.5 and 3.5 with very low velocity (40). These quiet hits are called \"ghost notes\" and add subtle groove.",
      hint: "Add lines like BEAT 1.5: hat 0.5 40 to the pattern. Ghost notes are almost hidden but they make the beat feel more alive.",
    },
    {
      id: "auto-decrescendo",
      text: "Change VELOCITY_CURVE CRESCENDO to VELOCITY_CURVE DECRESCENDO 230 40 6. The arpeggio fades away instead of building up.",
      hint: "DECRESCENDO goes from loud to quiet. Same syntax, opposite direction. Try it and hear the notes melt away.",
    },
  ],

  funFact:
    "On a real piano, \"velocity\" literally means how fast the hammer hits the string. MIDI keyboards measure this with 0-127 values. JEM uses 0-255 for even more precision, so you have twice the control over how hard each note hits.",
};

export default lesson10;
