const lesson21 = {
  id: 21,
  slug: "fade-effects",
  title: "Fade In, Fade Out",
  subtitle: "Smooth volume transitions for professional intros and endings",
  phase: 6,
  difficulty: 2,
  goal: "Use FADE_IN and FADE_OUT to create smooth volume ramps for professional-sounding intros and outros.",
  concepts: ["Fade in", "Fade out", "Volume automation", "Song structure"],
  estimatedMinutes: 8,

  steps: [
    {
      title: "What are fades?",
      content: `A **fade** is a gradual change in volume. You hear fades in almost every song:

- **Fade in** — music starts from silence and gradually gets louder (like a sunrise)
- **Fade out** — music gradually gets quieter until it disappears (classic song ending)

In JEM, fades are super simple:

\`\`\`
FADE_IN 4       # fade from silence to full over 4 beats
FADE_OUT 8      # fade to silence over 8 beats
\`\`\`

The number is how many beats the fade takes.`,
    },
    {
      title: "Fade in — the dramatic intro",
      content: `Place **FADE_IN** before the section you want to fade in:

\`\`\`
FADE_IN 4
LOOP 2:
    PLAY_SEQUENCE intro
\`\`\`

The first 4 beats will gradually rise from silence to full volume. Everything after that plays at normal volume.

Short fades (2-4 beats) feel sudden and dramatic. Long fades (8-16 beats) feel smooth and cinematic.`,
    },
    {
      title: "Fade out — the classic ending",
      content: `Place **FADE_OUT** before the final section:

\`\`\`
LOOP 2:
    PLAY_SEQUENCE chorus
FADE_OUT 8
LOOP 2:
    PLAY_SEQUENCE outro
\`\`\`

The music will gradually disappear over 8 beats. This is how hundreds of famous songs end — the band keeps playing but the volume knob slowly turns down!

Try the code on the right — it uses both a fade in at the start and a fade out at the end.`,
    },
  ],

  code: `# Fade In, Fade Out -- Smooth volume transitions
# Listen for the gradual intro and the disappearing ending

BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    DELAY 250 100
    VOLUME 180

INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    ADSR 200 100 400 300
    REVERB 150
    VOLUME 130

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 240

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 25
    VOLUME 140

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1
    PLAY lead C4 1

SEQUENCE chords:
    PLAY pad [C3 E3 G3] 4

PATTERN beat:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 2: hat
    BEAT 2.5: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: hat
    BEAT 4.5: hat

# Fade in over 4 beats
FADE_IN 4
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE chords
        PLAY_PATTERN beat

# Fade out over 8 beats
FADE_OUT 8
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE chords
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "slow-fade-in",
      text: "Change FADE_IN from 4 beats to 16 beats. The intro should feel much more gradual and cinematic.",
      hint: "Change FADE_IN 4 to FADE_IN 16.",
    },
    {
      id: "quick-fade-out",
      text: "Change FADE_OUT from 8 to 2 beats. It should feel like someone suddenly turned the volume down.",
      hint: "Change FADE_OUT 8 to FADE_OUT 2.",
    },
    {
      id: "only-fade-out",
      text: "Remove the FADE_IN but keep the FADE_OUT. This is the most classic song structure — start strong, fade away.",
      hint: "Delete the FADE_IN 4 line. Keep everything else the same.",
    },
  ],

  funFact:
    "The longest fade-out in a hit song is 'Hey Jude' by The Beatles — it fades for over 4 minutes! The band kept singing 'na na na na' while the engineer slowly turned the volume knob down. Some radio DJs used to start talking over the fade-out before it finished.",
};

export default lesson21;
