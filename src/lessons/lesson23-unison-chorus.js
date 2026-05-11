const lesson23 = {
  id: 23,
  slug: "unison-chorus",
  title: "Unison & Chorus -- Fat Sounds",
  subtitle: "Stack voices and add chorus for massive, wide synth tones",
  phase: 6,
  difficulty: 3,
  goal: "Use VOICES, DETUNE, and CHORUS to create thick, professional-sounding synthesizer patches.",
  concepts: ["Unison", "Detuning", "Chorus effect", "Sound design", "Supersaw"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "Why one voice isn't enough",
      content: `A single oscillator sounds thin and digital. But real instruments are never perfectly in tune -- a choir has dozens of slightly different voices, a 12-string guitar has pairs of slightly detuned strings.

This "imperfection" is what makes sounds feel **big** and **alive**.

In JEM, you can stack multiple copies of an oscillator and detune them:

\`\`\`
VOICES 3        # 3 oscillator copies
DETUNE 15       # spread 15 cents apart
\`\`\`

This is called **unison** -- multiple voices playing the same note, slightly out of tune with each other.`,
    },
    {
      title: "VOICES and DETUNE",
      content: `Add these to any SYNTH instrument:

\`\`\`
VOICES 2       # 2 voices (1-4 allowed)
DETUNE 20      # 20 cents spread (0-100)
\`\`\`

- **VOICES** = how many oscillator copies (2-3 is the sweet spot)
- **DETUNE** = how far apart they are in cents (100 cents = 1 semitone)

Low detune (5-15) = subtle thickening, like a real instrument.
Medium detune (15-30) = classic supersaw, trance pads.
High detune (50+) = intentionally out of tune, experimental.

Try the code on the right -- the "supersaw" instrument uses 3 voices with 20 cents detune.`,
    },
    {
      title: "CHORUS -- instant width",
      content: `**CHORUS** adds a short, modulated delay that creates a shimmering, wide sound. It works even without multiple voices.

\`\`\`
CHORUS 100     # chorus amount (0-255)
\`\`\`

Low chorus (30-80) = subtle shimmer, like playing through a chorus pedal.
High chorus (100-200) = lush, dreamy wash.

Combine VOICES + DETUNE + CHORUS for maximum thickness:

\`\`\`
INSTRUMENT massive_pad:
    TYPE SYNTH
    WAVE SAW
    VOICES 3
    DETUNE 15
    CHORUS 120
\`\`\`

This is how producers create those huge, wall-of-sound synth pads you hear in electronic music.`,
    },
  ],

  code: `# Unison & Chorus -- Thick, fat synth sounds
# Compare the thin bass vs the massive supersaw

BPM 100

INSTRUMENT supersaw:
    TYPE SYNTH
    WAVE SAW
    ADSR 50 80 300 200
    VOLUME 160
    VOICES 3
    DETUNE 20
    CHORUS 100
    REVERB 100

INSTRUMENT thin_lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 30 200 100
    VOLUME 170

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SQUARE
    ADSR 5 30 200 80
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 50
    DECAY 100
    VOLUME 255

SEQUENCE pad_chords:
    PLAY supersaw [C3 E3 G3] 4
    PLAY supersaw [A2 C3 E3] 4
    PLAY supersaw [F2 A2 C3] 4
    PLAY supersaw [G2 B2 D3] 4

SEQUENCE lead_melody:
    PLAY thin_lead E4 0.5
    PLAY thin_lead G4 0.5
    PLAY thin_lead A4 1
    REST 0.5
    PLAY thin_lead G4 0.5
    PLAY thin_lead E4 1
    PLAY thin_lead D4 0.5
    PLAY thin_lead C4 0.5
    PLAY thin_lead D4 2
    REST 1

SEQUENCE bassline:
    PLAY bass C2 2
    PLAY bass C2 1
    PLAY bass G1 1
    PLAY bass A1 2
    PLAY bass A1 1
    PLAY bass E1 1
    PLAY bass F1 2
    PLAY bass F1 1
    PLAY bass C2 1
    PLAY bass G1 2
    PLAY bass G1 1
    PLAY bass D2 1

PATTERN beat:
    BEAT 1: kick
    BEAT 2.5: kick
    BEAT 4: kick

PLAY_TOGETHER:
    PLAY_SEQUENCE pad_chords
    PLAY_SEQUENCE lead_melody
    PLAY_SEQUENCE bassline
    PLAY_PATTERN beat
    PLAY_PATTERN beat
    PLAY_PATTERN beat
    PLAY_PATTERN beat`,

  challenges: [
    {
      id: "add-voices-to-lead",
      text: "Add VOICES 2 and DETUNE 10 to the thin_lead instrument. Compare the sound before and after -- it should feel much fuller.",
      hint: "Add two new lines inside the thin_lead instrument: VOICES 2 and DETUNE 10.",
    },
    {
      id: "max-detune",
      text: "Change the supersaw's DETUNE from 20 to 80. This extreme detuning creates a deliberately out-of-tune, experimental sound.",
      hint: "Change DETUNE 20 to DETUNE 80 in the supersaw instrument.",
    },
    {
      id: "chorus-only",
      text: "Remove VOICES and DETUNE from supersaw but keep CHORUS 100. Chorus alone still adds width and movement!",
      hint: "Delete the VOICES 3 and DETUNE 20 lines. Keep CHORUS 100.",
    },
  ],

  funFact:
    "The 'supersaw' sound was made famous by the Roland JP-8000 synthesizer in 1996. Its SuperSaw waveform stacked 7 detuned sawtooth oscillators and became THE sound of trance music. Producers like Armin van Buuren and Tiesto used it in nearly every track. Today, almost every synthesizer has a supersaw mode -- it's one of the most important sounds in electronic music history!",
};

export default lesson23;
