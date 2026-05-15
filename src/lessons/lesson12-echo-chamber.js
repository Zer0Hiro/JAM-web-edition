const lesson12 = {
  id: 12,
  slug: "echo-chamber",
  title: "Echo Chamber",
  subtitle: "Add space and echoes to your music",
  phase: 4,
  difficulty: 3,
  goal: "Use REVERB for room ambience and DELAY for rhythmic echoes, then override them on individual notes.",
  concepts: ["Reverb", "Delay/Echo", "Feedback", "Per-note REVERB and DELAY overrides"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "What is reverb?",
      content: `Sing in a bathroom -- you hear your voice bouncing off the tiles. Sing in a closet full of clothes -- dead silence. That bouncy room sound is **reverb**.

In JEM, add REVERB to an instrument:

\`\`\`
INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    REVERB 180
    VOLUME 160
\`\`\`

REVERB 0 = dry closet. REVERB 255 = giant cathedral. Numbers in between give you everything from a small room to a concert hall.`,
    },
    {
      title: "DELAY is echo",
      content: `DELAY repeats a sound after a set time, like yelling into a canyon. You control two things:

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    DELAY 300 150
    VOLUME 180
\`\`\`

**Time** (300) = the gap between echoes in milliseconds. At BPM 120, one beat is 500ms, so 300ms is a bit faster than half a beat.

**Feedback** (150) = how many times the echo repeats. 0 = one echo. 255 = echoes for ages. 150 is a nice middle ground where echoes fade gradually.`,
    },
    {
      title: "Per-note overrides",
      content: `Just like CUTOFF, you can override REVERB or DELAY on a single note:

\`\`\`
PLAY lead E4 1 REVERB:240
PLAY lead G4 1 200 DELAY:500:120
\`\`\`

Put the override after the velocity (or after the duration if there's no velocity). The instrument must already have the effect configured for overrides to work.

DELAY overrides use the format \`DELAY:<time>:<feedback>\`.`,
    },
    {
      title: "Combining effects",
      content: `Reverb and delay together create a huge, spacious sound. A good trick:

- **Lead** with DELAY -- echoes add rhythm and movement
- **Pad** with REVERB -- creates a wash of atmosphere behind everything
- **Drums** dry or with light reverb -- keeps the beat tight

Press Play to hear all three layers working together!`,
    },
  ],

  code: `# Echo Chamber
# Reverb for room sound, Delay for echoes

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
    PLAY lead E4 0.5 REVERB:200
    REST 0.5

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
      text: "Change the lead delay to 500ms with feedback 220. Count the echoes -- how many can you hear before they fade?",
      hint: "Change DELAY 300 150 to DELAY 500 220 on the lead instrument.",
    },
    {
      id: "reverb-kick",
      text: "Add REVERB 100 to the kick drum. Does it sound like the drums are in a big room now?",
      hint: "Add a line REVERB 100 inside the kick INSTRUMENT block.",
    },
    {
      id: "dry-compare",
      text: "Remove all REVERB and DELAY lines from every instrument. Compare the bone-dry version to the original. Which do you prefer?",
      hint: "Delete or comment out the REVERB and DELAY lines from lead and pad instruments.",
    },
  ],

  funFact:
    "The first artificial reverb was created in the 1940s by playing music through a speaker in a tiled bathroom and recording it with a microphone! Later, studios used metal plates and springs instead.",
};

export default lesson12;
