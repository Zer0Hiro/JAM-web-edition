const lesson15 = {
  id: 15,
  slug: "wobble-and-shake",
  title: "Wobble & Shake",
  subtitle: "Add tremolo and vibrato with LFO",
  phase: 5,
  difficulty: 3,
  goal: "Use LFO to add automatic volume wobble (tremolo) and pitch wobble (vibrato) to your instruments.",
  concepts: ["LFO", "Tremolo (LFO VOLUME)", "Vibrato (LFO PITCH)", "Rate and depth"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "What is an LFO?",
      content: `**LFO** stands for Low Frequency Oscillator. Think of it as an invisible wave that wiggles something automatically. Like a robot slowly turning a knob up and down for you, over and over.

An LFO has two settings:
- **Rate** -- how fast it wiggles (in Hz). 1 Hz = one full wobble per second.
- **Depth** -- how much it changes. Bigger = more dramatic.`,
    },
    {
      title: "Tremolo -- volume wobble",
      content: `**LFO VOLUME** makes the volume go up and down automatically. This is called **tremolo**.

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    LFO 3.0 100 VOLUME
    VOLUME 200
\`\`\`

- **Rate 1-4** = gentle pulse (like breathing)
- **Rate 6-10** = intense wobble (helicopter / ray-gun vibe)
- **Depth 0-255** = how much the volume swings

Low depth is subtle. Crank it up and the sound pulses hard!`,
    },
    {
      title: "Vibrato -- pitch wobble",
      content: `**LFO PITCH** wobbles the pitch up and down. This is called **vibrato** -- singers and guitarists do it naturally.

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    LFO 5.0 30 PITCH
    VOLUME 200
\`\`\`

Depth here is in **cents** (100 cents = 1 semitone):
- **20-50 cents** = natural vibrato, like a singer's voice
- **100+ cents** = siren or alarm sound!

Try keeping the rate around 4-6 Hz for a natural feel.`,
    },
    {
      title: "Stack both!",
      content: `Here's the cool part: you can have **both** LFO VOLUME and LFO PITCH on the same instrument. They work independently.

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    LFO 3.0 100 VOLUME
    LFO 5.0 30 PITCH
    VOLUME 200
\`\`\`

The volume pulses at 3 Hz while the pitch wiggles at 5 Hz. Two wobbles at once! Try the code below to hear it in action.`,
    },
  ],

  code: `# Wobble & Shake -- Tremolo and Vibrato
# LFO adds automatic movement to your sound

BPM 110

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 40 200 120
    LFO 3.0 100 VOLUME
    LFO 5.0 40 PITCH
    REVERB 120
    VOLUME 200

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SQUARE
    ADSR 5 60 300 100
    LFO 0.5 60 VOLUME
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead C4 1

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass G2 1
    PLAY bass A2 1
    PLAY bass G2 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE bassline
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "fast-tremolo",
      text: "Change the lead tremolo rate to 8.0. Does it sound like a ray gun or a helicopter?",
      hint: "Change LFO 3.0 100 VOLUME to LFO 8.0 100 VOLUME on the lead instrument.",
    },
    {
      id: "wide-vibrato",
      text: "Set the lead vibrato depth to 150 cents. That's more than a full semitone of pitch wobble -- total siren mode!",
      hint: "Change LFO 5.0 40 PITCH to LFO 5.0 150 PITCH on the lead instrument.",
    },
    {
      id: "remove-bass-lfo",
      text: "Remove the LFO VOLUME from the bass. Compare the steady bass with the wobbling version. Which sounds better?",
      hint: "Delete the LFO 0.5 60 VOLUME line from the bass instrument.",
    },
    {
      id: "slow-deep-tremolo",
      text: "Try a slow, deep tremolo on the lead: rate 1.0 and depth 200. It should pulse like a heartbeat.",
      hint: "Change LFO 3.0 100 VOLUME to LFO 1.0 200 VOLUME on the lead instrument.",
    },
  ],

  funFact:
    "Fender's Vibrolux amplifier from 1956 labeled its tremolo knob 'vibrato' -- technically wrong! Tremolo is volume wobble, vibrato is pitch wobble. The mix-up has confused guitarists for over 60 years.",
};

export default lesson15;
