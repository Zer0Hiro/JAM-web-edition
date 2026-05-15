const lesson14 = {
  id: 14,
  slug: "stereo-space",
  title: "Stereo Space",
  subtitle: "Place instruments left, right, and center",
  phase: 4,
  difficulty: 3,
  goal: "Use PAN to position each instrument in the stereo field, spreading your band across the left and right speakers.",
  concepts: ["Stereo panning", "PAN", "Left/Center/Right"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "What is panning?",
      content: `Put on headphones. Some sounds come from your left ear, some from the right, and some sit right in the middle. That placement is called **panning**.

It's like arranging a band on stage. The drummer sits in the center, the guitarist stands to the left, the keyboard player to the right. Each musician has their own spot so the sound doesn't all pile up in one place.`,
    },
    {
      title: "PAN values",
      content: `Add PAN to an instrument to place it in the stereo field:

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    PAN 200
    VOLUME 180
\`\`\`

The number goes from 0 to 255:
- **PAN 0** = hard left (only left ear)
- **PAN 127** = center (both ears equally) -- this is the default
- **PAN 255** = hard right (only right ear)

Anything in between puts the sound somewhere between left and right.`,
    },
    {
      title: "Spread your band",
      content: `A good mix gives each instrument its own space:

- **Bass and kick**: PAN 127 (center) -- low sounds work best in the middle
- **Lead melody**: PAN 180 (slightly right) -- stands out without being extreme
- **Rhythm/chords**: PAN 70 (slightly left) -- balances the lead
- **Hi-hat**: PAN 160 (a bit right) -- adds width to the drums

When everything has its own spot, the whole mix sounds wider and clearer.`,
    },
    {
      title: "Put on headphones!",
      content: `PAN only works with headphones or stereo speakers (two separate speakers, left and right).

If you're listening through a single phone speaker or a mono speaker, you won't hear any difference. The sound just comes from one point.

For this lesson, headphones are the way to go. You'll hear the instruments spread out around your head!`,
    },
  ],

  code: `# Stereo Space
# Place instruments across left and right with PAN

BPM 120

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    PAN 127
    ADSR 5 40 300 120
    VOLUME 220

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    PAN 200
    ADSR 10 30 200 100
    VOLUME 180

INSTRUMENT rhythm:
    TYPE SYNTH
    WAVE SQUARE
    PAN 60
    ADSR 5 60 150 80
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
    PLAY bass C2 0.5
    PLAY bass G2 0.5
    PLAY bass F2 1
    PLAY bass F2 1

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1

SEQUENCE chords:
    PLAY rhythm [C4 E4 G4] 2
    PLAY rhythm [F3 A3 C4] 2

PATTERN beat:
    BEAT 1: kick
    BEAT 2.5: kick
    BEAT 3: kick
    BEAT 4: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE chords
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "swap-sides",
      text: "Swap the lead and rhythm PAN values. Now the melody comes from the left and the chords from the right. Does it feel different?",
      hint: "Change lead PAN 200 to PAN 60, and rhythm PAN 60 to PAN 200.",
    },
    {
      id: "extreme-pan",
      text: "Set the lead to PAN 0 (hard left) and rhythm to PAN 255 (hard right). It's dramatic -- like instruments are in separate rooms!",
      hint: "Change lead PAN to 0 and rhythm PAN to 255.",
    },
    {
      id: "mono-compare",
      text: "Set every instrument to PAN 127 (center). Now everything is mono. Compare with the stereo version -- hear how much wider the panned mix sounds?",
      hint: "Change all PAN values to 127 on every instrument.",
    },
  ],

  funFact:
    "Early Beatles stereo mixes used extreme 'hard panning' -- all vocals in one speaker, all instruments in the other. It sounded wild on headphones! Modern mixes are much more subtle, spreading things evenly.",
};

export default lesson14;
