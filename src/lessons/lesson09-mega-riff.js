const lesson09 = {
  id: 9,
  slug: "mega-riff",
  title: "Mega Riff",
  subtitle: "Build an epic multi-section composition",
  phase: 4,
  difficulty: 4,
  goal: "Create a full song with intro, main section, and ending using everything you've learned.",
  concepts: ["Song arrangement", "Musical form", "Combining all concepts"],
  estimatedMinutes: 20,

  steps: [
    {
      title: "Thinking like a songwriter",
      content: `Every great song tells a story through its structure. Even a short piece needs a beginning, middle, and end. Here's a simple template:

1. **Intro** -- Set the mood. Start with just one instrument.
2. **Build** -- Add layers. Bring in the drums and bass.
3. **Main section** -- Everything playing together at full power.
4. **Ending** -- Strip things back. End on a strong note.

You already know all the tools to do this: instruments, sequences, patterns, loops, and arrangement.`,
    },
    {
      title: "The retro game approach",
      content: `Let's build a retro game-style riff. We'll use a SQUARE wave for that classic 8-bit sound, combined with punchy drums.

The key to a good riff: use **repetition with variation**. The main phrase repeats, but small changes keep it interesting.

Our riff will use a staccato (short, punchy) playing style with quick ADSR settings:
\`\`\`
ADSR 2 60 0 40
\`\`\`
This means: almost instant attack, quick decay, no sustain, short release. Each note pops and disappears.`,
    },
    {
      title: "Arranging the full piece",
      content: `Here's how we structure the arrangement:

\`\`\`
# Intro -- lead alone, 2 bars
LOOP 2:
    PLAY_SEQUENCE main_riff

# Full section -- lead + drums, 4 bars
LOOP 4:
    PLAY_SEQUENCE main_riff
    PLAY_PATTERN drums

# Ending -- one more riff
PLAY_SEQUENCE main_riff
\`\`\`

The intro lets the listener get familiar with the melody. Then the drums kick in for the main section. The ending is a callback to the beginning, bringing everything full circle.`,
    },
  ],

  code: `# Mega Riff
# An epic retro game-style composition.

BPM 120
AUDIO_RATE 16384

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SQUARE
    ADSR 2 60 0 40
    VOLUME 180

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 900
    DECAY 50
    VOLUME 170

SEQUENCE main_riff:
    PLAY lead D4 0.25
    PLAY lead D4 0.25
    REST 0.25
    PLAY lead D5 0.25
    REST 0.25
    PLAY lead A4 0.5
    PLAY lead G#4 0.25
    PLAY lead G4 0.5
    PLAY lead F4 0.25
    REST 0.25

SEQUENCE ending:
    PLAY lead D4 0.5
    PLAY lead F4 0.25
    PLAY lead G4 0.75

PATTERN drums:
    BEAT 1: kick
    BEAT 2: snare
    BEAT 3: kick
    BEAT 4: snare

# Intro -- lead alone
LOOP 2:
    PLAY_SEQUENCE main_riff

# Full section -- lead + drums
LOOP 4:
    PLAY_SEQUENCE main_riff
    PLAY_PATTERN drums
    PLAY_SEQUENCE ending

# Final hit
PLAY_SEQUENCE ending`,

  challenges: [
    {
      id: "add-bass",
      text: "Add a bass instrument (SAW wave, low notes like D2 and A2) and a bass sequence that plays under the main riff.",
      hint: "Keep the bass simple -- just 2-3 long notes that follow the root notes of the melody.",
    },
    {
      id: "vary-ending",
      text: "Create a different ending sequence with a high note (like D6) held for 2 beats.",
      hint: "Ending on a high, sustained note creates a dramatic finish!",
    },
    {
      id: "longer-form",
      text: "Add a 'bridge' section between the main section and ending with different notes.",
      hint: "A bridge introduces new musical ideas to keep the song interesting before the final section.",
    },
  ],

  funFact:
    "The melody in the example is inspired by Megalovania from Undertale, composed by Toby Fox. It became one of the most recognizable video game melodies ever, proving that simple waveforms and clever composition can create something legendary!",
};

export default lesson09;
