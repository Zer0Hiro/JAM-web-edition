const lesson11 = {
  id: 11,
  slug: "filter-magic",
  title: "Filter Magic",
  subtitle: "Shape your sound by blocking frequencies",
  phase: 4,
  difficulty: 3,
  goal: "Use CUTOFF and RESONANCE to sculpt how bright or dark each instrument sounds, and override the filter on individual notes.",
  concepts: ["Low-pass filter", "CUTOFF frequency", "RESONANCE", "Per-note CUTOFF override"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "What is a filter?",
      content: `Every sound is a mix of low frequencies (bass) and high frequencies (treble). A **low-pass filter** blocks the highs and lets the lows through.

Think of putting a pillow on a speaker. The bass still thumps through, but the sparkly treble gets muffled. In JEM, that pillow is called **CUTOFF** -- it sets the frequency where blocking starts.`,
    },
    {
      title: "CUTOFF",
      content: `Add CUTOFF to any instrument to set where the filter cuts:

\`\`\`
INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 800
    VOLUME 200
\`\`\`

**CUTOFF 800** means everything above 800 Hz gets quieter. Lower number = darker, muddier sound. Higher number = brighter, sharper. The range goes from 20 to 20000 Hz.

A SAW wave sounds buzzy on its own. With CUTOFF 800, it becomes warm and round. With CUTOFF 200, it's a deep rumble.`,
    },
    {
      title: "RESONANCE",
      content: `RESONANCE boosts the sound right at the cutoff point. It creates a sharp, ringy peak -- like the filter is shouting "I'm here!"

\`\`\`
INSTRUMENT acid:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 1200
    RESONANCE 180
    VOLUME 200
\`\`\`

RESONANCE goes from 0 (no boost) to 255 (intense ring). Low values are subtle. High values create that classic acid/electronic sound you hear in dance music.`,
    },
    {
      title: "Per-note CUTOFF override",
      content: `You can change the CUTOFF for a single note by adding \`CUTOFF:<value>\` at the end of a PLAY line:

\`\`\`
SEQUENCE riff:
    PLAY bass C2 1 CUTOFF:400    # dark
    PLAY bass E2 1 CUTOFF:3000   # bright
    PLAY bass G2 1               # back to default
\`\`\`

The override only lasts for that one note. After it, the filter snaps back to the instrument's default. If you also have a velocity, put it before the CUTOFF:

\`\`\`
PLAY bass C2 1 180 CUTOFF:500
\`\`\`

The instrument must have CUTOFF set for overrides to work.`,
    },
  ],

  code: `# Filter Magic
# Shape sound with CUTOFF and RESONANCE

BPM 110

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 1200
    RESONANCE 80
    ADSR 5 40 300 120
    VOLUME 220

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 4000
    ADSR 10 30 200 100
    VOLUME 180

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

SEQUENCE bassline:
    PLAY bass C2 1 CUTOFF:400
    PLAY bass C2 0.5
    PLAY bass G2 0.5 CUTOFF:2000
    PLAY bass F2 1 CUTOFF:600
    PLAY bass F2 1

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "dark-bass",
      text: "Set the bass CUTOFF to 300. Now it sounds like it's playing through a wall. Compare it with 1200 -- huge difference!",
      hint: "Change CUTOFF 1200 to CUTOFF 300 on the bass instrument.",
    },
    {
      id: "resonant-lead",
      text: "Add RESONANCE 200 to the lead instrument. It should sound sharp and metallic, like a laser.",
      hint: "Add a line RESONANCE 200 inside the lead INSTRUMENT block, after the CUTOFF line.",
    },
    {
      id: "no-filter",
      text: "Remove the CUTOFF line from the bass completely. Compare the raw SAW buzz with the filtered version.",
      hint: "Delete (or comment out with #) the CUTOFF and RESONANCE lines from the bass instrument.",
    },
    {
      id: "bright-accent",
      text: "Add CUTOFF:8000 to one of the melody notes to make it pop out, bright and cutting.",
      hint: "Change a PLAY lead line to something like PLAY lead A4 1 CUTOFF:8000. The lead must have a CUTOFF set.",
    },
  ],

  funFact:
    "The Moog synthesizer, invented by Robert Moog in 1964, became legendary because of its incredible low-pass filter. Every synth maker since has tried to copy that warm, creamy sound.",
};

export default lesson11;
