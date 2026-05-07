const lesson08 = {
  id: 8,
  slug: "multi-track",
  title: "Mix It Up",
  subtitle: "Combine bass, lead, and drums",
  phase: 3,
  difficulty: 3,
  goal: "Build a multi-instrument track with bass, melody, and drums playing together.",
  concepts: ["Multi-instrument arrangements", "Bass lines", "Layering"],
  estimatedMinutes: 18,

  steps: [
    {
      title: "Real music uses layers",
      content: `Think about your favorite song. You can probably pick out different "layers":
- A **bass line** holding down the low end
- A **melody** carrying the main tune
- **Drums** keeping the rhythm

In JAM, you create separate instruments and sequences for each layer, then combine them using LOOP blocks. The sequencer plays everything together!`,
    },
    {
      title: "Building a bass line",
      content: `Bass uses low notes (C2, G2, F2) and a SAW wave for that deep, rumbling sound:

\`\`\`
INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 300 120
    VOLUME 220

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass C2 1
    PLAY bass G2 1
    PLAY bass F2 1
\`\`\`

The bassline is simple and repetitive -- that's intentional! A good bass line provides a solid foundation without being distracting.`,
    },
    {
      title: "Adding a melody on top",
      content: `The lead melody uses higher notes and a different waveform:

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    VOLUME 180

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1
\`\`\`

Using TRIANGLE for the lead and SAW for the bass means they won't clash -- each instrument occupies its own "space" in the mix.`,
    },
    {
      title: "Putting it all together",
      content: `Finally, combine everything in a LOOP:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE bassline
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat
\`\`\`

The sequencer interleaves events from all three layers, creating a full multi-track composition. Each time through the loop, you hear bass + melody + drums together.`,
    },
  ],

  code: `# Mix It Up
# A multi-instrument track: bass + lead + drums.

BPM 120

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 300 120
    VOLUME 220

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    VOLUME 180

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass C2 1
    PLAY bass G2 1
    PLAY bass F2 1

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_SEQUENCE bassline
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat`,

  challenges: [
    {
      id: "add-snare",
      text: "Add a snare instrument (TYPE DRUM, WAVE NOISE, FREQ 200, DECAY 60) and add BEAT 2 and BEAT 4 snare hits to the pattern.",
      hint: "Kick on 1 and 3, snare on 2 and 4 is the classic rock/pop beat!",
    },
    {
      id: "change-bass",
      text: "Change the bass notes to C2, E2, F2, G2 for a walking bass line.",
      hint: "A walking bass line moves step by step through the scale -- it's a jazz and funk technique.",
    },
    {
      id: "add-hat",
      text: "Add a hi-hat on all four beats of the pattern for a fuller groove.",
      hint: "Use WAVE NOISE with FREQ 800 and DECAY 30 for a crisp hi-hat sound.",
    },
  ],

  funFact:
    "Professional music producers call the process of balancing instruments 'mixing.' A good mix ensures you can hear every element clearly. The secret? Give each instrument its own frequency range -- bass down low, melody in the middle, cymbals up high.",
};

export default lesson08;
