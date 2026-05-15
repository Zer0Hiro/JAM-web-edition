const lesson24 = {
  id: 24,
  slug: "legato-and-polyphony",
  title: "Legato & Polyphony",
  subtitle: "Overlapping notes and multi-voice instruments",
  phase: 6,
  difficulty: "advanced",
  goal: "Learn how LEGATO lets notes overlap and POLYPHONY controls how many notes can sound at once from a single instrument.",
  concepts: ["LEGATO", "POLYPHONY", "Monophonic vs polyphonic", "Voice management"],
  estimatedMinutes: 14,

  steps: [
    {
      title: "What is LEGATO?",
      content: `By default, when an instrument plays a new note, the previous note is **cut off** immediately. This is called **monophonic** behavior — only one note at a time.

**LEGATO** changes this. When enabled, consecutive notes **overlap** — the previous note keeps ringing while the new one starts. This creates smooth, connected phrases where notes blend into each other.

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    LEGATO
    ADSR 10 50 200 100
    VOLUME 180
\`\`\`

Just add \`LEGATO\` — it's a flag with no value. Its presence enables the behavior. It only works on \`SYNTH\` instruments (drums are always one-shot).`,
    },
    {
      title: "What is POLYPHONY?",
      content: `**POLYPHONY** controls the maximum number of notes that can sound **simultaneously** from one instrument. The default is \`1\` (monophonic).

\`\`\`
INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    POLYPHONY 4
    ADSR 50 100 300 200
    VOLUME 180
\`\`\`

With \`POLYPHONY 4\`, up to 4 notes can ring at the same time. When a 5th note starts, the oldest note is cut to make room.

Think of it like piano pedaling — with the sustain pedal down (high polyphony), notes pile up and blend. With the pedal up (polyphony 1), each new note replaces the last.`,
    },
    {
      title: "LEGATO + POLYPHONY together",
      content: `These two features work together beautifully:

- **LEGATO alone** (POLYPHONY 1) — notes overlap briefly during transitions, but only one voice is active. Great for smooth lead lines.
- **POLYPHONY alone** (no LEGATO) — multiple notes can sound, but each new note from a sequence still cuts the previous. Mainly useful for chords.
- **LEGATO + POLYPHONY** — notes overlap AND multiple voices ring simultaneously. Perfect for lush pads, piano-like sustain, or arpeggiated chords that ring out.

\`\`\`
INSTRUMENT lush_pad:
    TYPE SYNTH
    WAVE SAW
    LEGATO
    POLYPHONY 4
    ADSR 50 100 300 200
    VOLUME 160
\`\`\`

Watch your total polyphony! The compiler warns if the sum across all instruments exceeds 8 — AVR microcontrollers have limited RAM.`,
    },
    {
      title: "Hearing the difference",
      content: `The starter code has two instruments playing the same melody — one without LEGATO (dry, staccato) and one with LEGATO and POLYPHONY 3 (smooth, overlapping).

Listen carefully to the difference:
- **Without LEGATO**: each note has a clear start and end, with tiny gaps between them
- **With LEGATO + POLYPHONY**: notes flow into each other, creating a richer, more sustained sound

Try removing \`LEGATO\` from the smooth instrument and listen to how it changes. Then try setting \`POLYPHONY 1\` — the overlap disappears even with LEGATO because there's only room for one voice.`,
    },
  ],

  code: `# Legato & Polyphony
# Compare staccato vs smooth overlapping notes

BPM 100

INSTRUMENT staccato_lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 50 200 100
    VOLUME 180

INSTRUMENT smooth_lead:
    TYPE SYNTH
    WAVE TRIANGLE
    LEGATO
    POLYPHONY 3
    ADSR 10 50 300 200
    VOLUME 160

SEQUENCE phrase:
    PLAY staccato_lead C4 1
    PLAY staccato_lead E4 1
    PLAY staccato_lead G4 1
    PLAY staccato_lead C5 2
    REST 1

SEQUENCE smooth_phrase:
    PLAY smooth_lead C4 1
    PLAY smooth_lead E4 1
    PLAY smooth_lead G4 1
    PLAY smooth_lead C5 2
    REST 1

# First hear staccato, then smooth
PLAY_SEQUENCE phrase
PLAY_SEQUENCE smooth_phrase

# Now together
PLAY_TOGETHER:
    PLAY_SEQUENCE phrase
    PLAY_SEQUENCE smooth_phrase`,

  challenges: [
    {
      id: "remove-legato",
      text: "Remove LEGATO from smooth_lead. Play both sequences again — can you hear the difference disappear?",
      hint: "Delete the LEGATO line from the smooth_lead instrument definition.",
    },
    {
      id: "pad-chords",
      text: "Create a new INSTRUMENT called pad with POLYPHONY 4, LEGATO, and WAVE SAW. Write a chord sequence using bracket notation [C4 E4 G4] and hear the notes sustain together.",
      hint: "Add INSTRUMENT pad with TYPE SYNTH, WAVE SAW, LEGATO, POLYPHONY 4, and ADSR 50 100 300 200. Write a SEQUENCE with PLAY pad [C4 E4 G4] 2.",
    },
    {
      id: "polyphony-limit",
      text: "Set POLYPHONY 1 on smooth_lead but keep LEGATO. Listen — with only 1 voice, LEGATO creates a brief crossfade but can't sustain multiple notes.",
      hint: "Change POLYPHONY 3 to POLYPHONY 1 on the smooth_lead instrument.",
    },
  ],

  funFact:
    "Early synthesizers like the Minimoog (1970) were monophonic — they could only play one note at a time! Polyphonic synths didn't arrive until the Oberheim Four Voice in 1975, and even then 4 voices was considered luxurious. Today's digital synths can play hundreds of notes simultaneously.",
};

export default lesson24;
