const lesson22 = {
  id: 22,
  slug: "lfo-modulation",
  title: "LFO -- Wobble & Vibrato",
  subtitle: "Add life to your sounds with low frequency oscillation",
  phase: 6,
  difficulty: 3,
  goal: "Use LFO to add tremolo (volume wobble) and vibrato (pitch wobble) to instruments.",
  concepts: ["LFO", "Tremolo", "Vibrato", "Modulation", "Rate and depth"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "What is an LFO?",
      content: `**LFO** stands for **Low Frequency Oscillator**. It's a slow, invisible wave that wiggles something back and forth automatically.

Think of it like this:
- You play a note on a guitar and hold it
- Now imagine slowly turning the volume knob up and down -- that wobble is **tremolo** (LFO on volume)
- Or imagine bending the string back and forth -- that wobble is **vibrato** (LFO on pitch)

In JEM, you add LFO inside an instrument definition:

\`\`\`
LFO 4.0 120 VOLUME    # tremolo: 4 Hz, depth 120
LFO 2.0 30 PITCH      # vibrato: 2 Hz, depth 30 cents
\`\`\``,
    },
    {
      title: "Tremolo -- volume wobble",
      content: `**Tremolo** makes the volume pulse up and down. It's the classic "helicopter" sound.

\`\`\`
LFO <rate> <depth> VOLUME
\`\`\`

- **rate** = how fast (Hz). 1-4 Hz is subtle, 6-10 Hz is intense
- **depth** = how much the volume swings (0-255). Higher = more dramatic

Try the code on the right -- the lead has a 3 Hz tremolo. Listen for the pulsing volume on each note.

Low rate + low depth = gentle breathing. High rate + high depth = alien ray gun!`,
    },
    {
      title: "Vibrato -- pitch wobble",
      content: `**Vibrato** bends the pitch slightly up and down. Singers and violinists do this naturally.

\`\`\`
LFO <rate> <depth> PITCH
\`\`\`

- **rate** = wobble speed in Hz (1-5 Hz is musical, >10 is extreme)
- **depth** = how far the pitch bends, in **cents** (100 cents = 1 semitone)

A depth of 20-50 cents sounds natural. Above 100 cents it becomes a siren effect!

You can have BOTH tremolo and vibrato on the same instrument -- they stack.`,
    },
  ],

  code: `# LFO Modulation -- Tremolo & Vibrato
# The lead has both volume wobble and pitch wobble

BPM 110

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 50 300 150
    VOLUME 180
    LFO 3.0 100 VOLUME
    LFO 1.5 40 PITCH
    REVERB 80

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SQUARE
    ADSR 5 30 200 80
    VOLUME 200
    LFO 0.5 60 VOLUME

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 240

SEQUENCE melody:
    PLAY lead C4 1
    PLAY lead E4 1
    PLAY lead G4 2
    PLAY lead A4 1
    PLAY lead G4 1
    PLAY lead E4 1
    PLAY lead D4 1

SEQUENCE bassline:
    PLAY bass C2 2
    PLAY bass G2 2
    PLAY bass A2 2
    PLAY bass G2 2

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
      text: "Change the lead's volume LFO rate from 3.0 to 8.0 Hz. It should pulse much faster, like a helicopter blade.",
      hint: "Change LFO 3.0 100 VOLUME to LFO 8.0 100 VOLUME.",
    },
    {
      id: "wide-vibrato",
      text: "Increase the lead's pitch LFO depth from 40 to 150. The pitch will bend dramatically -- almost like a siren!",
      hint: "Change LFO 1.5 40 PITCH to LFO 1.5 150 PITCH.",
    },
    {
      id: "remove-bass-lfo",
      text: "Remove the LFO from the bass instrument. Compare how it sounds with and without the slow pulsing.",
      hint: "Delete the line LFO 0.5 60 VOLUME from the bass instrument.",
    },
  ],

  funFact:
    "The tremolo effect was one of the first built-in effects in guitar amplifiers, dating back to the 1940s. The Fender Vibrolux amp (1956) actually labeled its tremolo knob as 'vibrato' -- which was technically wrong! Tremolo is volume wobble, vibrato is pitch wobble. The confusion between these two terms has persisted in music for over 60 years.",
};

export default lesson22;
