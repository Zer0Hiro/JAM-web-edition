const lesson04 = {
  id: 4,
  slug: "tick-tock",
  title: "Tick Tock",
  subtitle: "Create rhythm with pauses",
  phase: 2,
  difficulty: 2,
  goal: "Use REST to add silence between notes and create a catchy rhythm.",
  concepts: ["REST command", "Rhythmic patterns", "Musical timing"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "Silence is part of music!",
      content: `Music isn't just notes -- the spaces between notes matter too! Without pauses, everything sounds like one big blob of sound.

\`REST\` creates silence:

\`\`\`
REST 1      # quiet for 1 beat
REST 0.5    # quiet for half a beat
REST 0.25   # tiny gap
\`\`\`

Mix short notes with rests and you get rhythm!`,
    },
    {
      title: "Feel the difference",
      content: `**Without rests (boring):**
\`\`\`
PLAY synth C4 1
PLAY synth E4 1
PLAY synth G4 1
\`\`\`

**With rests (groovy!):**
\`\`\`
PLAY synth C4 0.25
REST 0.25
PLAY synth E4 0.25
REST 0.25
PLAY synth G4 0.5
\`\`\`

Same notes, but the second one bounces!`,
    },
    {
      title: "Build a groove",
      content: `Press Play to hear the code on the right. Notice how the short notes and rests make it feel catchy and rhythmic, like a beat you'd hear in a game.`,
    },
  ],

  code: `# Tick Tock
# A bouncy rhythm with rests!

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
      text: "Change the REST 0.5 in the middle to REST 0.25. Does it feel tighter?",
      hint: "Shorter rests = faster pace. The rhythm gets more intense!",
    },
    {
      id: "double-time",
      text: "Crank the BPM up to 170. Now it's super fast!",
      hint: "Same notes, totally different energy. BPM changes everything!",
    },
    {
      id: "add-loop",
      text: "Change LOOP 3 to LOOP 6. More repetition = more hypnotic!",
      hint: "Repetition is the secret ingredient of catchy music. That's why choruses repeat!",
    },
  ],

  funFact:
    "The most famous drum break ever is the 'Amen break' -- just 7 seconds of drums from a 1969 song. It's been sampled in THOUSANDS of songs across hip-hop, jungle, and drum and bass!",
};

export default lesson04;
