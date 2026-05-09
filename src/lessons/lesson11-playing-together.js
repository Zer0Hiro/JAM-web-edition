const lesson11 = {
  id: 11,
  slug: "playing-together",
  title: "Playing Together",
  subtitle: "Make instruments play at the same time",
  phase: 3,
  difficulty: 3,
  goal: "Learn how to make multiple instruments sound at the exact same moment using PATTERNs!",
  concepts: ["Simultaneous playback", "PATTERN multi-instrument", "Layering on same beat"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "One at a time vs. all at once",
      content: `In previous lessons, when you wrote:

\`\`\`
PLAY_SEQUENCE bassline
PLAY_SEQUENCE melody
\`\`\`

JEM played bass **first**, then melody **after** it finished. That's sequential -- one at a time.

But real music has bass, melody, and drums all happening **at the same time**! How do we do that?`,
    },
    {
      title: "The secret: PATTERN",
      content: `A PATTERN lets you place notes at specific beat positions. And here's the magic: **you can put different instruments on the same beat!**

\`\`\`
PATTERN duo:
    BEAT 1: bass C2
    BEAT 1: lead E4
\`\`\`

Both instruments trigger on beat 1 -- they play **simultaneously**! JEM mixes them together so you hear both at once.`,
    },
    {
      title: "Building a full band",
      content: `Stack as many instruments as you want on each beat:

\`\`\`
PATTERN band:
    BEAT 1: bass C2
    BEAT 1: lead E4
    BEAT 1: kick
    BEAT 2: bass C2
    BEAT 2: lead G4
    BEAT 3: bass G2
    BEAT 3: lead A4
    BEAT 3: kick
    BEAT 4: bass G2
    BEAT 4: lead G4
\`\`\`

Kick drums on beats 1 and 3, bass and lead on every beat. That's a full band playing together!

Press Play to hear it.`,
    },
    {
      title: "Tips for good layers",
      content: `When instruments play at the same time, keep these in mind:

- **Different pitch ranges** -- bass goes low (C2, G2), lead goes high (E4, A4). If everything is in the same range, it sounds muddy.
- **Volume balance** -- drums can be loud (255), bass medium (200), lead softer (160). Adjust VOLUME to make each part clear.
- **Keep it simple** -- 2-3 simultaneous instruments sounds great. Too many at once can get messy on hardware.`,
    },
  ],

  code: `# Playing Together
# Bass + lead + drums at the same time!

BPM 110

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 300 120
    VOLUME 200

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    VOLUME 160

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
    VOLUME 120

PATTERN band:
    BEAT 1: bass C2
    BEAT 1: lead E4
    BEAT 1: kick
    BEAT 1: hat
    BEAT 2: bass C2
    BEAT 2: lead G4
    BEAT 2: hat
    BEAT 3: bass G2
    BEAT 3: lead A4
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: bass G2
    BEAT 4: lead G4
    BEAT 4: hat

LOOP 4:
    PLAY_PATTERN band`,

  challenges: [
    {
      id: "add-melody-variation",
      text: "Change the lead notes on beats 2 and 4 to different notes (try B4 and D5). Notice how it changes the feel!",
      hint: "Higher notes on even beats create a call-and-response feeling.",
    },
    {
      id: "add-snare",
      text: "Add a snare drum (WAVE NOISE, FREQ 200, DECAY 60) on beats 2 and 4 alongside the hi-hat.",
      hint: "Kick on 1 & 3, snare on 2 & 4 -- that's the classic rock beat! Add BEAT 2: snare and BEAT 4: snare.",
    },
    {
      id: "two-bar-pattern",
      text: "Make the pattern 8 beats long by adding beats 5-8 with different bass notes (try E2, F2).",
      hint: "Just keep going! BEAT 5: bass E2, BEAT 5: lead C5, etc. Longer patterns = more interesting music.",
    },
  ],

  funFact:
    "An orchestra has over 60 instruments playing simultaneously! The conductor's job is like our PATTERN -- making sure everyone plays at the right beat.",
};

export default lesson11;
