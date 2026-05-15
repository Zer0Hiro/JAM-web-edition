const lesson18 = {
  id: 18,
  slug: "fat-sounds",
  title: "Fat Sounds",
  subtitle: "Stack voices for massive, powerful tones",
  phase: 6,
  difficulty: 3,
  goal: "Use VOICES, DETUNE, and CHORUS to turn thin single oscillators into huge, wide, room-filling sounds.",
  concepts: ["Unison", "VOICES", "DETUNE", "CHORUS", "Supersaw"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "Why one voice isn't enough",
      content: `Play a single SAW oscillator. It sounds clear, but also kind of thin. Like one person singing.

Now imagine a whole choir singing the same note, each voice slightly different in pitch. That's **unison** -- multiple copies of the same sound, slightly detuned from each other. The result is massive.

In synthesizers, this is how you go from "meh" to "WHOA."`,
    },
    {
      title: "VOICES and DETUNE",
      content: `**VOICES** controls how many copies of the oscillator play at once. **DETUNE** controls how far apart they are in pitch (measured in cents -- 100 cents = 1 semitone).

\`\`\`
INSTRUMENT fat_lead:
    TYPE SYNTH
    WAVE SAW
    VOICES 3
    DETUNE 20
    VOLUME 200
\`\`\`

- **VOICES 2** = two copies, subtle thickening
- **VOICES 3** = three copies, seriously fat
- **DETUNE 10** = tight and focused
- **DETUNE 40** = wide and washy

Heads up: VOICES above 2 uses more memory. On an Arduino AVR board, stick to 2 -- ESP32 handles 3-4 easily.`,
    },
    {
      title: "CHORUS -- instant width",
      content: `**CHORUS** adds a short modulated delay that makes even a single voice sound wider and richer. Think of it as a "make it sound bigger" knob.

\`\`\`
INSTRUMENT wide_pad:
    TYPE SYNTH
    WAVE SAW
    CHORUS 120
    VOLUME 180
\`\`\`

CHORUS goes from 0 (off) to 255 (maximum widening). It works even with VOICES 1, so it's a cheap way to add fatness without extra memory.`,
    },
    {
      title: "The Supersaw",
      content: `Combine all three for the legendary **supersaw** sound -- the backbone of trance, EDM, and future bass:

\`\`\`
INSTRUMENT supersaw:
    TYPE SYNTH
    WAVE SAW
    VOICES 3
    DETUNE 20
    CHORUS 100
    REVERB 120
    VOLUME 180
\`\`\`

SAW wave + multiple voices + detuning + chorus + reverb = that huge wall-of-sound you hear in every festival drop. Press Play and feel it!`,
    },
  ],

  code: `# Fat Sounds -- Unison, Detune, and Chorus
# Compare the supersaw pad with the thin lead!

BPM 100

INSTRUMENT supersaw:
    TYPE SYNTH
    WAVE SAW
    VOICES 3
    DETUNE 20
    CHORUS 100
    ADSR 100 80 300 200
    REVERB 120
    VOLUME 180

INSTRUMENT thin_lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 30 200 80
    VOLUME 200

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SQUARE
    ADSR 5 40 300 100
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 240

SEQUENCE pad_chords:
    PLAY supersaw [C4 E4 G4] 4
    PLAY supersaw [A3 C4 E4] 4
    PLAY supersaw [F3 A3 C4] 4
    PLAY supersaw [G3 B3 D4] 4

SEQUENCE melody:
    PLAY thin_lead E5 0.5
    PLAY thin_lead D5 0.5
    PLAY thin_lead C5 1
    PLAY thin_lead D5 0.5
    PLAY thin_lead E5 0.5
    PLAY thin_lead G5 1
    REST 1
    PLAY thin_lead E5 0.5
    PLAY thin_lead D5 0.5
    PLAY thin_lead C5 1
    PLAY thin_lead B4 0.5
    PLAY thin_lead A4 0.5
    PLAY thin_lead G4 2

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass C2 1
    PLAY bass A1 1
    PLAY bass A1 1
    PLAY bass F1 1
    PLAY bass F1 1
    PLAY bass G1 1
    PLAY bass G1 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE pad_chords
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE bassline
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "fatten-lead",
      text: "Add VOICES 2 and DETUNE 10 to the thin_lead instrument. Compare before and after -- even 2 voices makes a big difference!",
      hint: "Add VOICES 2 and DETUNE 10 inside the thin_lead INSTRUMENT block.",
    },
    {
      id: "max-detune",
      text: "Crank the supersaw DETUNE to 80. It gets washy and almost out of tune -- sometimes that's exactly the vibe you want!",
      hint: "Change DETUNE 20 to DETUNE 80 on the supersaw instrument.",
    },
    {
      id: "chorus-only",
      text: "Remove VOICES and DETUNE from the supersaw but keep CHORUS 100. Listen to how chorus alone adds width without the same thickness.",
      hint: "Delete the VOICES 3 and DETUNE 20 lines from the supersaw instrument.",
    },
    {
      id: "triangle-pad",
      text: "Change the supersaw's WAVE from SAW to TRIANGLE. Unison triangle waves sound softer and more ambient.",
      hint: "Change WAVE SAW to WAVE TRIANGLE on the supersaw instrument.",
    },
  ],

  funFact:
    "The Roland JP-8000 synthesizer introduced the 'SuperSaw' waveform in 1996 -- 7 detuned sawtooth waves stacked together. It became THE sound of trance music. Artists like Armin van Buuren and Tiesto built entire careers on that one waveform!",
};

export default lesson18;
