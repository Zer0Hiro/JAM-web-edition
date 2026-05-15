const lesson16 = {
  id: 16,
  slug: "sweep-and-spin",
  title: "Sweep & Spin",
  subtitle: "Filter sweeps and auto-panning with LFO",
  phase: 5,
  difficulty: 3,
  goal: "Use LFO CUTOFF for automatic filter sweeps and LFO PAN for auto-panning. Combine multiple LFO targets on one instrument.",
  concepts: ["LFO CUTOFF (filter sweep)", "LFO PAN (auto-pan)", "Combining LFO targets"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "LFO CUTOFF -- wah wah!",
      content: `Remember the CUTOFF filter from Lesson 11? It blocks high frequencies. Now imagine that filter moving up and down automatically. That's **LFO CUTOFF** -- the classic wah-wah / acid bass sound.

\`\`\`
INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 2000
    LFO 1.5 200 CUTOFF
    VOLUME 220
\`\`\`

- **Rate** = how fast the filter sweeps (Hz)
- **Depth** = how far the cutoff moves (0-255)
- The instrument **must** have CUTOFF set for this to work

Slow sweep (0.5-2 Hz) = wah-wah. Fast sweep (4+ Hz) = bubbly acid sound.`,
    },
    {
      title: "LFO PAN -- auto spin",
      content: `LFO PAN automatically moves an instrument left and right in the stereo field. Like someone is slowly spinning a speaker around you.

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    PAN 127
    LFO 0.5 100 PAN    # ESP32 with I2S DAC only!
    VOLUME 180
\`\`\`

- **Rate 0.3-0.5** = slow breathing motion
- **Rate 2-4** = fast spinning effect
- **Depth** = how far it pans from center (0-255 range)
- The instrument **must** have PAN set

**Important:** LFO PAN only works on ESP32 boards with stereo I2S DAC output. It won't compile on Arduino. The web preview will simulate it though!`,
    },
    {
      title: "Mix all four LFO targets",
      content: `One instrument can have up to **four** LFOs, one per target:

\`\`\`
INSTRUMENT mega:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 3000
    PAN 127
    LFO 3.0 80 VOLUME     # tremolo
    LFO 5.0 30 PITCH      # vibrato
    LFO 1.0 180 CUTOFF    # filter sweep
    LFO 0.5 100 PAN       # auto-pan (ESP32 only!)
    VOLUME 200
\`\`\`

Each LFO runs at its own rate and depth. Together they create a sound that pulses, wobbles, sweeps, and spins all at once!`,
    },
    {
      title: "Putting it together",
      content: `You already know the building blocks:
- **CUTOFF and RESONANCE** from Lesson 11 (Filter Magic)
- **PAN** from Lesson 14 (Stereo Space)
- **LFO VOLUME and LFO PITCH** from Lesson 15 (Wobble & Shake)

Now you can combine them all. Try the code below -- the bass has a filter sweep and the lead has auto-panning. Put on headphones for the full effect!`,
    },
  ],

  code: `# Sweep & Spin -- LFO CUTOFF and LFO PAN
# Filter sweeps and auto-panning

BPM 100

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 60 300 100
    CUTOFF 2000
    RESONANCE 120
    LFO 1.5 200 CUTOFF
    VOLUME 220

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 40 200 120
    PAN 127
    LFO 0.5 100 PAN    # ESP32 with I2S DAC only!
    REVERB 100
    VOLUME 180

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

SEQUENCE bassline:
    PLAY bass C2 1 200 CUTOFF:800
    PLAY bass C2 0.5
    PLAY bass Eb2 0.5
    PLAY bass G2 1 200 CUTOFF:4000
    PLAY bass G2 1

SEQUENCE melody:
    PLAY lead G4 0.5
    PLAY lead Bb4 0.5
    PLAY lead C5 1
    REST 0.5
    PLAY lead Bb4 0.5
    PLAY lead G4 1

PATTERN beat:
    BEAT 1: kick
    BEAT 2.5: kick
    BEAT 4: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "faster-sweep",
      text: "Speed up the filter sweep on the bass to rate 4.0. It should sound bubbly and acidic!",
      hint: "Change LFO 1.5 200 CUTOFF to LFO 4.0 200 CUTOFF on the bass instrument.",
    },
    {
      id: "deep-pan",
      text: "Increase the auto-pan depth on the lead to 200. The melody should swing wide between your ears. Use headphones!",
      hint: "Change LFO 0.5 100 PAN to LFO 0.5 200 PAN on the lead instrument.",
    },
    {
      id: "bass-tremolo-too",
      text: "Add LFO 2.0 80 VOLUME to the bass so it pulses AND sweeps at the same time. Double wobble!",
      hint: "Add a new line LFO 2.0 80 VOLUME inside the bass INSTRUMENT block.",
    },
    {
      id: "high-resonance",
      text: "Crank the bass RESONANCE to 220. The filter sweep becomes sharp and screamy -- classic acid bass!",
      hint: "Change RESONANCE 120 to RESONANCE 220 on the bass instrument.",
    },
  ],

  funFact:
    "Auto-panning was huge in psychedelic 1960s music. Jimi Hendrix's 'Electric Ladyland' album used it to make guitars swirl around your head -- engineers literally spun a knob back and forth during recording!",
};

export default lesson16;
