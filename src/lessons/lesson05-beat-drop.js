const lesson05 = {
  id: 5,
  slug: "beat-drop",
  title: "Beat Drop",
  subtitle: "Build beats with drum instruments",
  phase: 2,
  difficulty: 2,
  goal: "Create drum sounds and arrange them into a beat pattern.",
  concepts: [
    "DRUM instruments",
    "FREQ and DECAY",
    "PATTERN block",
    "BEAT positioning",
    "PLAY_PATTERN",
  ],
  estimatedMinutes: 12,

  steps: [
    {
      title: "Drums are special",
      content: `Regular instruments play notes like C4 or G5. Drums are different -- they just go BOOM or TSHH at one pitch.

To make a drum, use \`TYPE DRUM\` instead of \`TYPE SYNTH\`:

\`\`\`
INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 60
    DECAY 80
    VOLUME 255
\`\`\`

**FREQ** controls the pitch -- low numbers give a deep thump. **DECAY** controls how fast the sound fades away. No notes needed!`,
    },
    {
      title: "Kick, Snare, Hi-Hat",
      content: `Every beat needs three core sounds:

**Kick** (the deep "boom") -- SIN wave, FREQ 60, DECAY 80:
\`\`\`
INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 60
    DECAY 80
    VOLUME 255
\`\`\`

**Snare** (the sharp "crack") -- NOISE wave, FREQ 200, DECAY 60:
\`\`\`
INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 60
    VOLUME 220
\`\`\`

**Hi-hat** (the quick "tss") -- NOISE wave, high FREQ, short DECAY:
\`\`\`
INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 30
    VOLUME 140
\`\`\``,
    },
    {
      title: "Place your beats",
      content: `PATTERN lets you place drum hits at exact positions in a bar.

\`\`\`
PATTERN my_beat:
    BEAT 1: kick
    BEAT 2: snare
    BEAT 3: kick
    BEAT 4: snare
\`\`\`

Positions 1 through 4 are the main beats. Want hits between the beats? Use decimals! BEAT 1.5 lands halfway between beat 1 and 2. BEAT 2.5 is the offbeat after beat 2.

You can stack sounds on the same beat too -- kick AND hat on beat 1, no problem.`,
    },
    {
      title: "PLAY_PATTERN",
      content: `Just like sequences need PLAY_SEQUENCE to actually play, patterns need PLAY_PATTERN:

\`\`\`
PLAY_PATTERN my_beat
\`\`\`

This plays one bar of the pattern. Wrap it in a LOOP to keep it going:

\`\`\`
LOOP 4:
    PLAY_PATTERN my_beat
\`\`\`

Press Play and hear your beat! The code on the right has a full kick-snare-hat pattern ready to go.`,
    },
  ],

  code: `# Beat Drop
# A drum pattern with kick, snare, and hi-hat

BPM 110

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 60
    DECAY 80
    VOLUME 255

INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 60
    VOLUME 220

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 30
    VOLUME 140

PATTERN basic_beat:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 2: snare
    BEAT 2: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: snare
    BEAT 4: hat

LOOP 4:
    PLAY_PATTERN basic_beat`,

  challenges: [
    {
      id: "double-kick",
      text: "Add BEAT 3.5: kick to the pattern. Now you've got a double-kick!",
      hint: "Decimal positions like 1.5, 2.5, 3.5 put hits between the main beats. It adds energy!",
    },
    {
      id: "faster-beat",
      text: "Change BPM to 140. How does the beat feel now?",
      hint: "Same pattern, totally different energy. Speed changes everything about how a beat feels.",
    },
    {
      id: "no-hats",
      text: "Delete all the hat lines from the pattern. How does it sound without hi-hats?",
      hint: "Hi-hats add constant 'tss tss' energy. Without them the beat feels more open and spacey.",
    },
  ],

  funFact:
    "The Roland TR-808 drum machine flopped when it came out in 1980 because it didn't sound like real drums. But hip-hop producers loved its massive kick sound. Now it's the most famous drum machine in pop and rap history!",
};

export default lesson05;
