const lesson20 = {
  id: 20,
  slug: "swing-humanize",
  title: "Get Groovy",
  subtitle: "Add swing and human feel to your beats",
  phase: 6,
  difficulty: 3,
  goal: "Use SWING and HUMANIZE to make your music feel less robotic and more alive.",
  concepts: ["Swing feel", "Humanization", "Groove", "Timing variation"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "Why do computers sound robotic?",
      content: `When a computer plays music, every note hits at the **exact** right time. Sounds perfect, right? Actually, it sounds stiff and lifeless!

Real musicians are never perfectly on time — they play slightly early or late, and that's what gives music its **groove** and **feel**.

JEM has two tools to fix this: **SWING** and **HUMANIZE**.`,
    },
    {
      title: "SWING — the bounce",
      content: `**SWING** makes offbeat notes (the "and" counts) arrive slightly late, creating a bouncy, shuffled feel.

\`\`\`
BPM 100
SWING 40
\`\`\`

- **0** = perfectly straight (default, robotic)
- **30-40** = light swing (subtle groove)
- **50** = triplet feel (classic jazz/hip-hop shuffle)
- **70+** = heavy swing (very exaggerated)

Think of the difference between a military march (no swing) and a jazz drummer (lots of swing). Same notes, totally different feel!`,
    },
    {
      title: "HUMANIZE — the wobble",
      content: `**HUMANIZE** adds tiny random timing offsets to every note — like a real person playing.

\`\`\`
BPM 120
HUMANIZE 10
\`\`\`

- **0** = perfect timing (default)
- **5-10** = subtle human feel (sounds natural)
- **15-25** = loose, relaxed playing
- **30+** = very sloppy (intentionally messy)

You can combine SWING and HUMANIZE for maximum groove:

\`\`\`
BPM 100
SWING 35
HUMANIZE 8
\`\`\`

Try the code and compare with and without these settings!`,
    },
  ],

  code: `# Get Groovy -- Swing and Humanize
# Remove SWING and HUMANIZE lines to hear the robotic version!

BPM 100
SWING 40
HUMANIZE 8

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 150 80
    VOLUME 180

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 200 100
    CUTOFF 800
    VOLUME 200

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

SEQUENCE groove_melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 0.5
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    REST 0.5
    PLAY lead D4 0.5
    PLAY lead E4 0.5

SEQUENCE bass_line:
    PLAY bass C2 1
    PLAY bass C2 0.5
    PLAY bass Bb1 0.5
    PLAY bass G1 1
    PLAY bass C2 1

PATTERN groove_beat:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 1.5: hat
    BEAT 2: hat
    BEAT 2.5: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 3.5: hat
    BEAT 4: hat
    BEAT 4.5: hat

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE groove_melody
        PLAY_SEQUENCE bass_line
        PLAY_PATTERN groove_beat`,

  challenges: [
    {
      id: "no-swing",
      text: "Remove the SWING line (or set it to 0). Listen to how straight and robotic the hi-hats sound without swing.",
      hint: "Delete the SWING 40 line or change it to SWING 0.",
    },
    {
      id: "heavy-swing",
      text: "Crank SWING to 65 for a heavy shuffle feel. Does it remind you of blues or jazz music?",
      hint: "Change SWING 40 to SWING 65.",
    },
    {
      id: "sloppy-human",
      text: "Set HUMANIZE to 30 for a very loose, 'garage band' feel. Notice how each playback sounds slightly different!",
      hint: "Change HUMANIZE 8 to HUMANIZE 30.",
    },
  ],

  funFact:
    "The legendary hip-hop producer J Dilla was famous for his 'drunk' beats — notes that were intentionally off-grid by tiny amounts. Producers call this 'J Dilla feel' and it changed the sound of hip-hop forever. HUMANIZE gives you a taste of that magic!",
};

export default lesson20;
