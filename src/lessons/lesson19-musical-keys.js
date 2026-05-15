const lesson19 = {
  id: 19,
  slug: "musical-keys",
  title: "Musical Keys",
  subtitle: "Pick a scale and never hit a wrong note",
  phase: 6,
  difficulty: 3,
  goal: "Use KEY to lock your music to a scale, and learn how different scales create different moods.",
  concepts: ["KEY", "Musical scales", "Major and Minor", "Pentatonic", "Blues", "Modes"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "What is a key?",
      content: `A **key** is a set of notes that sound good together. Think of it like choosing a color palette for a painting -- you pick a palette and stick to it, so everything looks (sounds) harmonious.

In JEM, declare a key at the top of your file:

\`\`\`
KEY C4 MAJOR
\`\`\`

This tells JEM: "Use the C major scale." The note (C4) sets the root, and the word after it picks which scale to use.`,
    },
    {
      title: "Major vs Minor",
      content: `The two most important scales:

- **KEY C4 MAJOR** = C D E F G A B -- happy, bright, uplifting
- **KEY C4 MINOR** = C D Eb F G Ab Bb -- sad, dark, mysterious

\`\`\`
KEY C4 MAJOR    # birthday party vibes
KEY C4 MINOR    # movie villain theme
\`\`\`

Just one word changes the entire mood. Same melody, completely different feeling. Try swapping MAJOR and MINOR in the code below!`,
    },
    {
      title: "Pentatonic and Blues",
      content: `These two scales are basically "easy mode" -- almost impossible to play a wrong note:

- **PENTATONIC** = 5 notes. Sounds good no matter what you play. Used in every culture on Earth -- from ancient China to rock guitar solos.
- **BLUES** = 6 notes. Adds one "blue note" for a soulful, gritty edge.

\`\`\`
KEY C4 PENTATONIC    # can't go wrong
KEY E4 BLUES         # instant soul
\`\`\`

If you're jamming and want to sound great with zero effort, PENTATONIC is your best friend.`,
    },
    {
      title: "Exotic scales",
      content: `JEM also supports four modes that give you more unusual flavors:

| Scale | Mood |
|-------|------|
| DORIAN | Jazzy, smooth |
| PHRYGIAN | Spanish guitar, exotic |
| LYDIAN | Dreamy, floating, sci-fi |
| MIXOLYDIAN | Bluesy rock, funky |

Try each one with the same melody. It's like putting on different color sunglasses -- same world, totally different feel!`,
    },
  ],

  code: `# Musical Keys -- Stay in scale
# Try changing MAJOR to MINOR, PENTATONIC, or BLUES!

BPM 120
KEY C4 MAJOR

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    VOLUME 180

INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    ADSR 200 100 400 300
    REVERB 150
    VOLUME 120

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 240

SEQUENCE melody:
    PLAY lead C4 0.5
    PLAY lead D4 0.5
    PLAY lead E4 1
    PLAY lead G4 0.5
    PLAY lead A4 0.5
    PLAY lead G4 1
    PLAY lead E4 0.5
    PLAY lead D4 0.5
    PLAY lead C4 2

SEQUENCE chords:
    PLAY pad [C3 E3 G3] 4
    PLAY pad [F3 A3 C4] 4

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE chords
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "go-minor",
      text: "Change KEY C4 MAJOR to KEY C4 MINOR. Same notes, but the mood goes from sunshine to storm clouds.",
      hint: "Change the word MAJOR to MINOR on the KEY line.",
    },
    {
      id: "try-pentatonic",
      text: "Switch to KEY C4 PENTATONIC. Remove F4 from the melody (replace with E4 or G4) since pentatonic doesn't include F.",
      hint: "Change KEY to PENTATONIC. The melody already mostly uses pentatonic notes -- just swap any F4 for E4 or G4.",
    },
    {
      id: "blues-key",
      text: "Set KEY E4 BLUES and rewrite the melody using E4, G4, A4, Bb4, B4, D5. Add DELAY 300 150 to the lead for extra flavor.",
      hint: "Change KEY to KEY E4 BLUES. Rewrite the PLAY lines using blues scale notes. Add DELAY 300 150 inside the lead instrument.",
    },
    {
      id: "phrygian-vibes",
      text: "Try KEY E4 PHRYGIAN for a Spanish/flamenco feel. Use notes E4, F4, G4, A4, B4 in your melody.",
      hint: "Change KEY to KEY E4 PHRYGIAN and adjust the melody notes.",
    },
  ],

  funFact:
    "The pentatonic scale shows up in music from every culture on Earth -- ancient Chinese court music, Scottish folk songs, West African rhythms, and blues guitar. Some scientists believe humans are naturally wired to enjoy these 5 notes!",
};

export default lesson19;
