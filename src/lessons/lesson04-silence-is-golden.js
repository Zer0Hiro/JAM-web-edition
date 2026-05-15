const lesson04 = {
  id: 4,
  slug: "silence-is-golden",
  title: "Silence is Golden",
  subtitle: "Create rhythm with rests",
  phase: 1,
  difficulty: 1,
  goal: "Use REST to add silence between notes and build a rhythmic groove.",
  concepts: ["REST command", "Rhythmic patterns", "Musical timing"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "Silence is Part of Music",
      content: `Music isn't just about the notes you play -- the gaps between them matter just as much. Without pauses, everything blurs into one long blob of sound.

Think about comedy. A joke with no pauses isn't funny. Timing is everything. Same with music -- the silence between notes is what creates rhythm.`,
    },
    {
      title: "The REST Command",
      content: `\`REST\` creates silence. It uses the same time units as \`PLAY\`:

\`\`\`
REST 1       # one beat of quiet
REST 0.5     # half a beat of quiet
REST 0.25    # tiny gap
REST 2       # long pause
\`\`\`

Mix \`PLAY\` and \`REST\` and you get a rhythm. The pattern of sound and silence is what makes music bounce.`,
    },
    {
      title: "Build a Groove",
      content: `Check out the code on the right. Short notes, quick rests, and a few longer notes mixed in. That combination creates a funky, bouncy feel.

The \`LOOP 3\` at the bottom repeats the whole sequence three times. Repetition is what turns a pattern into a groove -- your brain locks in and starts nodding along.`,
    },
  ],

  code: `# Silence is Golden
# A funky rhythm with rests

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
      id: "tighter-rest",
      text: "Change the REST 0.5 in the middle to REST 0.25. Does it feel tighter and more intense?",
      hint: "Shorter rests = faster pace. The groove gets more urgent when the gaps shrink.",
    },
    {
      id: "fast-tempo",
      text: "Crank the BPM up to 170. Now it's high-energy!",
      hint: "Same notes, same rests, totally different energy. BPM changes everything about how a rhythm feels.",
    },
    {
      id: "more-loops",
      text: "Change LOOP 3 to LOOP 6. More repetition = more hypnotic.",
      hint: "Repetition is the secret ingredient of catchy music. That's why choruses and hooks repeat over and over.",
    },
  ],

  funFact:
    "The most famous drum break ever is the 'Amen break' -- just 7 seconds of drums from a 1969 song by The Winstons. It's been sampled in thousands of tracks across hip-hop, jungle, and drum and bass.",
};

export default lesson04;
