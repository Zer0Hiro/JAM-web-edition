const lesson18 = {
  id: 18,
  slug: "pluck-strings",
  title: "Pluck It!",
  subtitle: "Create realistic string sounds with PLUCK synthesis",
  phase: 6,
  difficulty: 3,
  goal: "Use the PLUCK waveform to create guitar, harp, and pizzicato string sounds.",
  concepts: ["Karplus-Strong synthesis", "PLUCK waveform", "Decay shaping", "String sounds"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "What is PLUCK?",
      content: `**PLUCK** is a special waveform that simulates plucked strings — like a guitar, harp, or pizzicato violin.

Unlike SIN or SAW which repeat the same shape forever, PLUCK starts with a burst of noise and smooths itself out over time. This is called **Karplus-Strong synthesis**.

\`\`\`
INSTRUMENT guitar:
    TYPE SYNTH
    WAVE PLUCK
    VOLUME 200
\`\`\`

No ADSR needed — PLUCK has its own natural decay built in!`,
    },
    {
      title: "Controlling the decay",
      content: `The **DECAY** property controls how long the string rings. Higher values = longer sustain.

\`\`\`
INSTRUMENT short_pluck:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 50
    VOLUME 200

INSTRUMENT long_pluck:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 200
    VOLUME 200
\`\`\`

Short decay sounds like a muted guitar pick. Long decay sounds like a harp letting the string ring out.`,
    },
    {
      title: "Pluck melodies and chords",
      content: `PLUCK sounds great for arpeggios (broken chords) and picking patterns:

\`\`\`
SEQUENCE arpeggio:
    PLAY guitar C4 0.25
    PLAY guitar E4 0.25
    PLAY guitar G4 0.25
    PLAY guitar C5 0.25
    PLAY guitar G4 0.25
    PLAY guitar E4 0.25
\`\`\`

You can also strum chords:

\`\`\`
SEQUENCE strum:
    PLAY guitar [C4 E4 G4] 2
    PLAY guitar [A3 C4 E4] 2
\`\`\`

Try the code on the right — it combines picking and strumming!`,
    },
  ],

  code: `# Pluck It! -- String synthesis with PLUCK
# Guitar-like sounds using Karplus-Strong

BPM 120

INSTRUMENT guitar:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 150
    VOLUME 200

INSTRUMENT bass_pluck:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 200
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 240

SEQUENCE picking:
    PLAY guitar C4 0.25
    PLAY guitar E4 0.25
    PLAY guitar G4 0.25
    PLAY guitar C5 0.25
    PLAY guitar G4 0.25
    PLAY guitar E4 0.25
    PLAY guitar D4 0.25
    PLAY guitar G4 0.25

SEQUENCE bass_line:
    PLAY bass_pluck C2 1
    PLAY bass_pluck C2 1
    PLAY bass_pluck G2 1
    PLAY bass_pluck F2 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE picking
        PLAY_SEQUENCE bass_line
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "short-decay",
      text: "Change the guitar DECAY to 30. How does it change the feel? It should sound more like a muted pick.",
      hint: "Change DECAY 150 to DECAY 30 on the guitar instrument.",
    },
    {
      id: "chord-strum",
      text: "Replace the picking sequence with strummed chords: [C4 E4 G4] for 2 beats, then [F3 A3 C4] for 2 beats.",
      hint: "Change PLAY guitar C4 0.25... to PLAY guitar [C4 E4 G4] 2 and PLAY guitar [F3 A3 C4] 2.",
    },
    {
      id: "add-reverb",
      text: "Add REVERB 120 to the guitar. Plucked strings with reverb sound like playing in a concert hall!",
      hint: "Add REVERB 120 inside the guitar INSTRUMENT block.",
    },
  ],

  funFact:
    "Karplus-Strong synthesis was invented in 1983 by Kevin Karplus and Alex Strong. It creates realistic string sounds using just a tiny loop of random noise that gets smoother over time — your computer is literally 'plucking' a virtual string!",
};

export default lesson18;
