const lesson16 = {
  id: 16,
  slug: "stereo-space",
  title: "Stereo Space",
  subtitle: "Place instruments left, center, or right",
  phase: 5,
  difficulty: 4,
  goal: "Use PAN to position instruments in the stereo field -- left ear, right ear, or anywhere in between.",
  concepts: ["Stereo panning", "Left/Right channels", "Spatial audio"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "What is panning?",
      content: `With headphones, you hear sound in two ears separately. **Panning** controls which ear hears more of each instrument.

In JEM, add **PAN** (0-255) to an instrument:

\`\`\`
INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    PAN 0        # 0 = fully left
    VOLUME 200
\`\`\`

- **PAN 0** = all the way left
- **PAN 127** = center (default)
- **PAN 255** = all the way right`,
    },
    {
      title: "Spreading the band",
      content: `Put each instrument in its own space:

\`\`\`
INSTRUMENT bass:
    PAN 127    # center (bass is usually centered)

INSTRUMENT lead:
    PAN 180    # slightly right

INSTRUMENT rhythm:
    PAN 70     # slightly left
\`\`\`

This creates a "stage" where each instrument has its own spot. Just like a real band!`,
    },
    {
      title: "Wear headphones!",
      content: `Panning only works properly with headphones or stereo speakers. With a single speaker, you won't hear the left/right difference.

Put on headphones and press Play -- you should hear the bass centered, melody to the right, and rhythm guitar to the left!`,
    },
  ],

  code: `# Stereo Space -- PAN left and right
# Use headphones to hear the full effect!

BPM 120

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 300 120
    PAN 127
    VOLUME 220

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    PAN 200
    VOLUME 180

INSTRUMENT rhythm:
    TYPE SYNTH
    WAVE SQUARE
    ADSR 5 20 150 80
    PAN 60
    VOLUME 140

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    PAN 127
    VOLUME 255

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass G2 1

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1

SEQUENCE chords:
    PLAY rhythm [C4 E4 G4] 2
    PLAY rhythm [F4 A4 C5] 2

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE chords
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "swap-sides",
      text: "Swap the lead and rhythm panning (lead to left, rhythm to right). Does the mix feel different?",
      hint: "Change lead PAN to 60 and rhythm PAN to 200.",
    },
    {
      id: "extreme-pan",
      text: "Set the lead to PAN 0 (hard left) and rhythm to PAN 255 (hard right). It's dramatic but might be too much!",
      hint: "Change PAN values to the extremes: 0 and 255.",
    },
    {
      id: "mono-compare",
      text: "Set all instruments to PAN 127 (center). Compare with the stereo version -- stereo gives each instrument more space!",
      hint: "Change all PAN values to 127 and listen. Then change them back.",
    },
  ],

  funFact:
    "The Beatles' early stereo mixes put all the vocals in one speaker and all the instruments in the other -- that's called 'hard panning.' Modern mixes are much more subtle!",
};

export default lesson16;
