const lesson13 = {
  id: 13,
  slug: "filter-sweep",
  title: "Filter Sweep",
  subtitle: "Shape your sound with a low-pass filter",
  phase: 3,
  difficulty: 3,
  goal: "Use CUTOFF and RESONANCE to make instruments sound warmer, darker, or more aggressive.",
  concepts: ["Low-pass filter", "CUTOFF frequency", "RESONANCE"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "What is a filter?",
      content: `A **low-pass filter** lets low sounds through and blocks high sounds. Imagine putting a pillow over a speaker -- the bass still comes through but the treble is muffled.

In JEM, add **CUTOFF** to an instrument to set where the filter cuts:

\`\`\`
INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 800
    VOLUME 200
\`\`\`

800 Hz means everything above 800 Hz gets quieter. Lower number = darker sound.`,
    },
    {
      title: "RESONANCE adds bite",
      content: `**RESONANCE** boosts frequencies right at the cutoff point, creating a sharp, resonant peak:

\`\`\`
INSTRUMENT synth:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 1200
    RESONANCE 180
    VOLUME 200
\`\`\`

High resonance (up to 255) makes the filter "ring" -- great for acid bass lines and electronic music!`,
    },
    {
      title: "Comparing filtered vs unfiltered",
      content: `Try the code below -- the lead has no filter (bright and buzzy), while the bass has CUTOFF 600 (warm and round).

A SAW wave has lots of high harmonics. The filter removes them, turning a harsh buzz into a smooth tone.

Change CUTOFF from 200 to 2000 and listen to how the bass changes from dull to bright!`,
    },
  ],

  code: `# Filter Sweep -- CUTOFF and RESONANCE
# Low-pass filter shapes your sound

BPM 110

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 600
    RESONANCE 100
    ADSR 5 40 300 120
    VOLUME 220

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 30 200 100
    VOLUME 180

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass C2 0.5
    PLAY bass G2 0.5
    PLAY bass F2 1
    PLAY bass F2 1

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody`,

  challenges: [
    {
      id: "dark-bass",
      text: "Make the bass super dark by setting CUTOFF to 300. How does it sound compared to 600?",
      hint: "Change CUTOFF 600 to CUTOFF 300 on the bass instrument.",
    },
    {
      id: "resonant-lead",
      text: "Add CUTOFF 2000 and RESONANCE 200 to the lead. It should sound sharp and metallic!",
      hint: "Add CUTOFF 2000 and RESONANCE 200 lines inside the lead INSTRUMENT block.",
    },
    {
      id: "filter-compare",
      text: "Remove CUTOFF from the bass entirely. Compare the unfiltered SAW with the filtered version -- big difference!",
      hint: "Delete or comment out the CUTOFF and RESONANCE lines from the bass instrument.",
    },
  ],

  funFact:
    "The Moog synthesizer, invented in 1964, became famous because of its incredible low-pass filter. Every synth since has tried to copy that warm, creamy sound!",
};

export default lesson13;
