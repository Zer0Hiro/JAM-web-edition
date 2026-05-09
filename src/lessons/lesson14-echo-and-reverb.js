const lesson14 = {
  id: 14,
  slug: "echo-and-reverb",
  title: "Echo Chamber",
  subtitle: "Add depth with reverb and delay",
  phase: 5,
  difficulty: 4,
  goal: "Use REVERB and DELAY to add space and echoes to your instruments.",
  concepts: ["Reverb", "Delay/Echo", "Feedback", "Wet/Dry mix"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "What is reverb?",
      content: `**Reverb** simulates the sound bouncing off walls in a room. A small room has short reverb, a cathedral has long reverb.

In JEM, add REVERB (0-255) to an instrument:

\`\`\`
INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    REVERB 180
    VOLUME 200
\`\`\`

0 = completely dry (no reverb), 255 = maximum reverb (huge cave).`,
    },
    {
      title: "DELAY creates echoes",
      content: `**DELAY** repeats the sound after a set time. You control two things:
- **Time** in milliseconds (how long until the echo)
- **Feedback** 0-255 (how many times it repeats)

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    DELAY 300 150
    VOLUME 180
\`\`\`

This echoes every 300ms with medium feedback. High feedback = more repeats!`,
    },
    {
      title: "Combining reverb and delay",
      content: `You can use both on the same instrument for a lush, spacious sound:

\`\`\`
INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    REVERB 120
    DELAY 400 100
    VOLUME 160
\`\`\`

The reverb adds room ambience while the delay creates rhythmic echoes. Try the code and listen to the difference between the dry lead and the wet pad!`,
    },
  ],

  code: `# Echo Chamber -- Reverb and Delay effects
# Add space and echoes to your sound

BPM 100

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    DELAY 300 150
    VOLUME 180

INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    ADSR 200 100 400 300
    REVERB 180
    VOLUME 140

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 240

SEQUENCE lead_melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    REST 0.5
    PLAY lead A4 0.5
    PLAY lead G4 1

SEQUENCE pad_chords:
    PLAY pad [C3 E3 G3] 4

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE lead_melody
        PLAY_SEQUENCE pad_chords
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "long-delay",
      text: "Change the delay to 500ms with high feedback (220). Count the echoes -- how many do you hear?",
      hint: "Change DELAY 300 150 to DELAY 500 220 on the lead instrument.",
    },
    {
      id: "reverb-kick",
      text: "Add REVERB 100 to the kick drum. Does a drum with reverb sound like it's in a big room?",
      hint: "Add a REVERB 100 line inside the kick INSTRUMENT block.",
    },
    {
      id: "dry-vs-wet",
      text: "Remove all REVERB and DELAY effects. Compare the dry version with the original -- which sounds better?",
      hint: "Delete or comment out the REVERB and DELAY lines from all instruments.",
    },
  ],

  funFact:
    "The first artificial reverb was created in the 1940s by playing music through a speaker in a tiled bathroom and recording it with a microphone! Later, studios used metal plates and springs to create reverb.",
};

export default lesson14;
