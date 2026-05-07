const lesson04 = {
  id: 4,
  slug: "tick-tock",
  title: "Tick Tock",
  subtitle: "Create rhythm with rests and timing",
  phase: 2,
  difficulty: 2,
  goal: "Use REST to create rhythmic patterns and pauses between notes.",
  concepts: ["REST command", "Rhythmic patterns", "Musical timing"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "Rhythm is silence + sound",
      content: `Music isn't just about the notes you play -- it's about the **spaces between them**. A melody without any pauses would sound like one long blur of noise.

The REST command creates silence for a given number of beats:

\`\`\`
REST 1      # silence for 1 beat
REST 0.5    # silence for half a beat
REST 0.25   # a quick gap
\`\`\`

By mixing short notes with rests, you can create rhythms that make people want to tap their feet.`,
    },
    {
      title: "Short and snappy",
      content: `Compare these two sequences:

**No rests (boring):**
\`\`\`
PLAY synth C4 1
PLAY synth E4 1
PLAY synth G4 1
\`\`\`

**With rests (rhythmic!):**
\`\`\`
PLAY synth C4 0.25
REST 0.25
PLAY synth E4 0.25
REST 0.25
PLAY synth G4 0.5
\`\`\`

The second version has energy and bounce because the notes are shorter and the rests give each note room to breathe.`,
    },
    {
      title: "Building a beat",
      content: `Here's a simple rhythmic pattern using a sawtooth lead. Notice how the mix of short notes, long notes, and rests creates a catchy rhythm:

\`\`\`
SEQUENCE groove:
    PLAY lead C4 0.25
    PLAY lead C4 0.25
    REST 0.25
    PLAY lead Eb4 0.25
    REST 0.5
    PLAY lead G4 0.5
    PLAY lead F4 0.25
    REST 0.25
\`\`\`

This pattern repeats every 2.5 beats. The mix of even and uneven spacing makes it interesting to listen to.`,
    },
  ],

  code: `# Tick Tock
# A rhythmic melody using rests to create a bouncy feel.

BPM 130

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 30 150 80
    VOLUME 180

SEQUENCE groove:
    PLAY lead C4 0.25
    PLAY lead C4 0.25
    REST 0.25
    PLAY lead Eb4 0.25
    REST 0.5
    PLAY lead G4 0.5
    PLAY lead F4 0.25
    REST 0.25

LOOP 3:
    PLAY_SEQUENCE groove`,

  challenges: [
    {
      id: "change-rhythm",
      text: "Remove the REST 0.5 in the middle and replace it with REST 0.25. How does the feel change?",
      hint: "Shorter rests make the rhythm tighter and more driving.",
    },
    {
      id: "double-time",
      text: "Change the BPM from 130 to 170. Now it feels like drum and bass!",
      hint: "The exact same notes feel completely different at a different tempo.",
    },
    {
      id: "add-loop",
      text: "Change LOOP 3 to LOOP 6. The pattern repeats more and starts to feel like a real track.",
      hint: "Repetition is the secret sauce of all catchy music!",
    },
  ],

  funFact:
    "The most common rhythm in pop music is called 'four on the floor' -- a kick drum on every beat. But the most popular drum pattern ever recorded is the 'Amen break,' a 7-second drum solo from 1969 that's been sampled in thousands of songs across hip-hop, jungle, and drum and bass!",
};

export default lesson04;
