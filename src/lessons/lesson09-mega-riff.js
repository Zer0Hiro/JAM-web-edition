const lesson09 = {
  id: 9,
  slug: "mega-riff",
  title: "Mega Riff",
  subtitle: "Build an epic full song!",
  phase: 4,
  difficulty: 4,
  goal: "Create a full composition with intro, main section, and ending!",
  concepts: ["Song arrangement", "Musical form", "Combining all concepts"],
  estimatedMinutes: 15,

  steps: [
    {
      title: "Think like a songwriter",
      content: `Every great song has structure:

1. **Intro** -- start simple, set the mood
2. **Build** -- add more layers
3. **Main section** -- everything at full blast!
4. **Ending** -- bring it home

You already know all the tools. Now let's use them all together!`,
    },
    {
      title: "The retro game sound",
      content: `We'll use a SQUARE wave for that classic 8-bit video game vibe, plus punchy drums.

The secret sauce is a short ADSR:
\`\`\`
ADSR 2 60 0 40
\`\`\`
Each note pops and disappears instantly. Snappy!`,
    },
    {
      title: "Arrange the whole thing",
      content: `Here's the structure:

\`\`\`
# Intro -- just the melody
LOOP 2:
    PLAY_SEQUENCE main_riff

# Full section -- melody + drums
LOOP 4:
    PLAY_SEQUENCE main_riff
    PLAY_PATTERN drums

# Ending
PLAY_SEQUENCE ending
\`\`\`

Intro lets you hear the melody first. Then drums kick in. Ending wraps it up. Press Play and enjoy your masterpiece!`,
    },
  ],

  code: `# Mega Riff
# An epic retro game-style song!

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
      text: "Add a bass instrument (SAW wave, notes like D2 and A2) playing under the main riff!",
      hint: "Keep the bass simple -- just 2-3 long, low notes. It's the foundation, not the star!",
    },
    {
      id: "vary-ending",
      text: "Make the ending more dramatic! Try a high note like D6 held for 2 beats.",
      hint: "Ending on a high, long note feels like a mic drop!",
    },
    {
      id: "longer-form",
      text: "Add a 'bridge' between the main section and ending with totally different notes.",
      hint: "A bridge is a surprise section that keeps the song from getting boring!",
    },
  ],

  funFact:
    "This melody is inspired by Megalovania from Undertale! Toby Fox proved that simple square waves and clever composition can create something legendary. You're using the exact same tools!",
};

export default lesson09;
