const lesson23 = {
  id: 23,
  slug: "bell-and-time",
  title: "Bells & Time Signatures",
  subtitle: "Ring a bell in waltz time",
  phase: 6,
  difficulty: "intermediate",
  goal: "Learn the BELL waveform and how TIME_SIGNATURE changes the feel of your music by controlling beats per bar.",
  concepts: ["WAVE BELL", "TIME_SIGNATURE", "3/4 waltz time", "Bar length and BEAT positions"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "Meet the BELL waveform",
      content: `**WAVE BELL** creates the sound of a struck bell or chime. Like HANDPAN, it uses additive synthesis — a sine fundamental plus upper harmonics. The difference: BELL's harmonics **decay faster** than the fundamental, giving that characteristic "ding" where the brightness fades quickly but the base tone rings on.

\`\`\`
INSTRUMENT bell:
    TYPE SYNTH
    WAVE BELL
    ADSR 1 400 0 600
    VOLUME 190
\`\`\`

The suggested envelope \`ADSR 1 400 0 600\` gives a sharp attack (1ms), medium decay (400ms), no sustain, and a long release (600ms) — perfect for bell-like tones that ring out naturally.`,
    },
    {
      title: "What is TIME_SIGNATURE?",
      content: `So far, all our music has been in **4/4 time** — 4 beats per bar. That's the default. But not all music is in 4/4! Waltzes use **3/4 time** (3 beats per bar), and some styles use 6/8, 5/4, or even 7/8.

\`\`\`
TIME_SIGNATURE 3 4
\`\`\`

The first number is **how many beats** per bar (3). The second is the **note value** of each beat (4 = quarter note). This changes how \`PATTERN\` blocks work — now each bar has only 3 beats instead of 4.

Valid divisions: \`1\` (whole), \`2\` (half), \`4\` (quarter), \`8\` (eighth), \`16\` (sixteenth).`,
    },
    {
      title: "Patterns in 3/4",
      content: `In 3/4 time, your PATTERN beats only go up to 3. The classic waltz feel is **strong-weak-weak**:

\`\`\`
PATTERN waltz:
    BEAT 1: bell C5 0.5 200    # strong downbeat
    BEAT 2: bell E5 0.5 120    # weak
    BEAT 3: bell E5 0.5 120    # weak
\`\`\`

Notice the downbeat (BEAT 1) has higher velocity (200) than beats 2 and 3 (120). This "oom-pah-pah" emphasis is what makes a waltz feel like a waltz.

If you accidentally write \`BEAT 4:\` in 3/4 time, the compiler will give you an error — there is no beat 4 in a 3-beat bar!`,
    },
    {
      title: "Putting it together",
      content: `The starter code combines BELL with 3/4 time. The melody uses dotted rhythms (1.5 beats) which feel natural in waltz time — they stretch across the bar line in an elegant way.

Listen for:
- The **bell tone** ringing with its fast-fading harmonics
- The **waltz feel** with its 3-beat pulse
- The **REVERB** giving the bells space to breathe

Try changing \`TIME_SIGNATURE 3 4\` to \`TIME_SIGNATURE 4 4\` and listen to how the same notes feel completely different!`,
    },
  ],

  code: `# Bells in Waltz Time
# BELL waveform meets 3/4 time signature

BPM 92
TIME_SIGNATURE 3 4

INSTRUMENT bell:
    TYPE SYNTH
    WAVE BELL
    ADSR 1 400 0 600
    REVERB 160
    VOLUME 190

SEQUENCE melody:
    PLAY bell E5 1
    PLAY bell D5 0.5
    PLAY bell C5 0.5
    PLAY bell B4 1
    PLAY bell A4 1.5
    PLAY bell G4 1.5

PATTERN waltz_pulse:
    BEAT 1: bell C6 0.5 180
    BEAT 2: bell C6 0.5 100
    BEAT 3: bell C6 0.5 100

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_PATTERN waltz_pulse`,

  challenges: [
    {
      id: "change-time",
      text: "Change the TIME_SIGNATURE to 4 4 and add a BEAT 4 to the pattern. How does the feel change from waltz to march?",
      hint: "Change TIME_SIGNATURE 3 4 to TIME_SIGNATURE 4 4, then add BEAT 4: bell C6 0.5 100 to the pattern.",
    },
    {
      id: "compound-time",
      text: "Try TIME_SIGNATURE 6 8 for a compound feel. Adjust your pattern to use beats 1 through 6 with emphasis on beats 1 and 4.",
      hint: "Set TIME_SIGNATURE 6 8, then use BEAT 1 and BEAT 4 with high velocity, and BEAT 2, 3, 5, 6 with low velocity.",
    },
    {
      id: "two-bells",
      text: "Add a second INSTRUMENT called deep_bell with WAVE BELL, lower notes (C3, G3), and a longer ADSR release (1000ms). Play it on beat 1 only.",
      hint: "Create INSTRUMENT deep_bell with WAVE BELL, ADSR 1 400 0 1000. Add a sequence or pattern with low notes and combine using PLAY_TOGETHER.",
    },
  ],

  funFact:
    "The waltz was considered scandalous when it first appeared in Vienna around 1780 — it was the first popular dance where partners held each other close. The 3/4 time signature gives it that spinning, circular feel that made it so exciting (and controversial)!",
};

export default lesson23;
