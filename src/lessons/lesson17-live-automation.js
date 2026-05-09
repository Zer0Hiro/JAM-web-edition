const lesson17 = {
  id: 17,
  slug: "live-automation",
  title: "Live Control",
  subtitle: "Change BPM and volume mid-song",
  phase: 5,
  difficulty: 4,
  goal: "Use BPM and VOLUME changes inside your arrangement to create speed-ups, slowdowns, and dynamic shifts.",
  concepts: ["BPM automation", "Volume automation", "Song dynamics"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "Changing speed mid-song",
      content: `So far, BPM is set once at the top. But what if your song speeds up for the chorus?

In JEM, you can put **BPM** inside a LOOP or arrangement block:

\`\`\`
LOOP 2:
    PLAY_SEQUENCE verse
BPM 160
LOOP 2:
    PLAY_SEQUENCE chorus
\`\`\`

The verse plays at the original tempo, then **BPM 160** kicks in and the chorus is faster!`,
    },
    {
      title: "Volume automation",
      content: `You can also change the master **VOLUME** mid-song:

\`\`\`
VOLUME 100
PLAY_SEQUENCE intro
VOLUME 200
PLAY_SEQUENCE main_part
VOLUME 255
PLAY_SEQUENCE climax
\`\`\`

This creates a build-up effect -- the song gets louder as it progresses. Great for creating tension and release!

VOLUME here is 0-255 and affects everything after it.`,
    },
    {
      title: "Combining both",
      content: `Use both BPM and VOLUME changes to create a real arrangement:

- Start slow and quiet (intro)
- Speed up and get louder (build)
- Full speed, full volume (drop)

The code below does exactly this. Press Play and feel the energy build!`,
    },
  ],

  code: `# Live Control -- BPM and VOLUME automation
# Change speed and volume mid-song!

BPM 90

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 30 200 100
    VOLUME 200

INSTRUMENT bass:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 5 40 300 120
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

SEQUENCE intro:
    PLAY lead C4 1
    PLAY lead E4 1
    PLAY lead G4 2

SEQUENCE verse:
    PLAY lead C4 0.5
    PLAY lead D4 0.5
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead E4 1

SEQUENCE chorus:
    PLAY lead G4 0.5
    PLAY lead A4 0.5
    PLAY lead C5 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

# Slow intro
PLAY_SEQUENCE intro
# Speed up for the verse
BPM 120
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE verse
        PLAY_PATTERN beat
# Fast and loud chorus!
BPM 150
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE chorus
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "slowdown",
      text: "Add a slowdown at the end: after the chorus, set BPM back to 80 and play the intro again as an outro.",
      hint: "Add BPM 80 after the chorus loops, then PLAY_SEQUENCE intro at the end.",
    },
    {
      id: "fade-out",
      text: "Create a fade-out by playing the chorus 3 more times, each time reducing the speed: BPM 130, then 110, then 90.",
      hint: "Add three more blocks: BPM 130 + PLAY_SEQUENCE chorus, BPM 110 + PLAY_SEQUENCE, BPM 90 + PLAY_SEQUENCE.",
    },
    {
      id: "dramatic-drop",
      text: "Make a dramatic drop: play the verse at BPM 80, then suddenly jump to BPM 180 for the chorus. Feel the energy!",
      hint: "Change the verse BPM to 80 and the chorus BPM to 180.",
    },
  ],

  funFact:
    "In classical music, the conductor controls tempo changes live by waving their baton faster or slower. The Italian terms 'accelerando' (speed up) and 'ritardando' (slow down) are written right in the sheet music!",
};

export default lesson17;
