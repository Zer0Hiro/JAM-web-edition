const lesson19 = {
  id: 19,
  slug: "key-scales",
  title: "Stay in Key",
  subtitle: "Lock your music to a scale so every note sounds right",
  phase: 6,
  difficulty: 3,
  goal: "Use KEY to declare a musical scale and understand how scales shape the mood of your music.",
  concepts: ["Musical keys", "Scales", "Pitch classes", "Major vs Minor"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "What is a key?",
      content: `A **key** is a set of notes that sound good together. When you play only notes from one key, your melody sounds musical and "in tune."

In JEM, declare a key at the top of your file:

\`\`\`
KEY C4 MAJOR
\`\`\`

This tells the compiler: "I want to use the C major scale." If you accidentally write a note outside the scale, JEM will warn you!`,
    },
    {
      title: "Major vs Minor",
      content: `The two most common scales are **MAJOR** and **MINOR**:

- **MAJOR** — sounds happy, bright, uplifting (think birthday songs)
- **MINOR** — sounds sad, dark, mysterious (think movie villain themes)

\`\`\`
KEY C4 MAJOR    # C D E F G A B — happy
KEY A4 MINOR    # A B C D E F G — sad
\`\`\`

Try changing MAJOR to MINOR in the code and listen to how the mood shifts — same notes pattern, completely different feeling!`,
    },
    {
      title: "Exotic scales",
      content: `JEM supports 8 scales total. Try these for different vibes:

| Scale | Mood |
|-------|------|
| MAJOR | Happy, bright |
| MINOR | Sad, dark |
| PENTATONIC | Simple, universal — can't hit a wrong note! |
| BLUES | Soulful, gritty |
| DORIAN | Jazzy, sophisticated |
| PHRYGIAN | Spanish, exotic |
| LYDIAN | Dreamy, floating |
| MIXOLYDIAN | Bluesy rock |

**PENTATONIC** is great for beginners — it only has 5 notes, so almost anything you play sounds good!`,
    },
  ],

  code: `# Stay in Key -- Musical scales
# Change MAJOR to MINOR and hear the mood shift!

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
    REVERB 120
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
    PLAY lead E4 0.5
    PLAY lead F4 0.5
    PLAY lead G4 1
    PLAY lead E4 0.5
    PLAY lead D4 0.5
    PLAY lead C4 1

SEQUENCE chords:
    PLAY pad [C3 E3 G3] 4

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
      text: "Change KEY C4 MAJOR to KEY C4 MINOR. Does the melody sound sadder?",
      hint: "Just change the word MAJOR to MINOR on the KEY line.",
    },
    {
      id: "pentatonic",
      text: "Try KEY C4 PENTATONIC and change the melody to use only C, D, E, G, A notes. It should sound like a Chinese folk tune!",
      hint: "Change to KEY C4 PENTATONIC. Remove F4 from the melody — replace it with E4 or G4.",
    },
    {
      id: "blues-scale",
      text: "Set KEY E4 BLUES and write a 4-note melody using E4, G4, A4, B4. Add some DELAY for extra cool factor.",
      hint: "Change KEY to KEY E4 BLUES. Add DELAY 300 150 to the lead instrument.",
    },
  ],

  funFact:
    "The pentatonic scale is found in music from almost every culture on Earth — from ancient Chinese music to Scottish folk songs to blues guitar solos. Scientists think humans might be naturally wired to like these 5 notes!",
};

export default lesson19;
