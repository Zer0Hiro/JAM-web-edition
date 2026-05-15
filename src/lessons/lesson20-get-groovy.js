const lesson20 = {
  id: 20,
  slug: "get-groovy",
  title: "Get Groovy",
  subtitle: "Make your beats feel human with swing and randomness",
  phase: 6,
  difficulty: 3,
  goal: "Use SWING and HUMANIZE to break out of robotic timing and create real groove.",
  concepts: ["SWING", "HUMANIZE", "Groove", "Timing variation"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "Why computers sound robotic",
      content: `A computer plays every note at the **exact** right moment. That should sound great, right? Actually it sounds stiff and dead.

Real musicians are never perfectly on time. A drummer hits slightly early here, slightly late there. A guitarist rushes into the chorus. That imperfection IS the groove. It's what makes you nod your head.

JEM has two tools to fix robotic timing: **SWING** and **HUMANIZE**.`,
    },
    {
      title: "SWING -- the bounce",
      content: `**SWING** delays the offbeat eighth notes, creating a bouncy, shuffled feel. Put it at the top of your file:

\`\`\`
BPM 100
SWING 40
\`\`\`

- **0** = perfectly straight, robotic (default)
- **30-40** = light bounce, subtle groove
- **50** = triplet feel -- classic jazz and hip-hop shuffle
- **70+** = heavy, almost drunk-sounding swing

Think: military march (SWING 0) vs jazz drummer (SWING 50). Same notes, totally different energy!`,
    },
    {
      title: "HUMANIZE -- the wobble",
      content: `**HUMANIZE** adds tiny random timing shifts to every note. Each note arrives slightly early or late, just like a real person playing.

\`\`\`
BPM 100
HUMANIZE 8
\`\`\`

- **0** = perfect timing (default)
- **5-10** = subtle, sounds natural
- **15-25** = loose and laid-back
- **30+** = sloppy, like a garage band after midnight

Unlike SWING (which is structured), HUMANIZE is random -- play the same song twice and the timing will be slightly different each time!`,
    },
    {
      title: "Combine for magic",
      content: `Use both together for real groove:

\`\`\`
BPM 100
SWING 40
HUMANIZE 8
\`\`\`

SWING gives you the structured bounce. HUMANIZE adds random looseness on top. Together they transform robotic computer music into something that actually feels alive.

Try the code below, then remove the SWING and HUMANIZE lines to hear the difference. It's night and day!`,
    },
  ],

  code: `# Get Groovy -- Swing and Humanize
# Remove SWING and HUMANIZE lines to hear the robot version!

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

SEQUENCE bass_groove:
    PLAY bass C2 1
    PLAY bass C2 0.5
    PLAY bass Bb1 0.5
    PLAY bass G1 1
    PLAY bass C2 1

PATTERN groovy_beat:
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
        PLAY_SEQUENCE bass_groove
        PLAY_PATTERN groovy_beat`,

  challenges: [
    {
      id: "hear-the-robot",
      text: "Remove both SWING and HUMANIZE lines (or set them to 0). Listen to how stiff and mechanical the hi-hats sound without groove.",
      hint: "Delete the SWING 40 and HUMANIZE 8 lines, or change both to 0.",
    },
    {
      id: "heavy-swing",
      text: "Crank SWING up to 65 for a heavy shuffle feel. Does it remind you of old blues or jazz records?",
      hint: "Change SWING 40 to SWING 65.",
    },
    {
      id: "sloppy-humanize",
      text: "Set HUMANIZE to 30 for a very loose, garage-band-at-3am feel. Notice how every playback sounds slightly different!",
      hint: "Change HUMANIZE 8 to HUMANIZE 30.",
    },
    {
      id: "swing-no-humanize",
      text: "Try SWING 50 with HUMANIZE 0. This gives you a clean triplet shuffle -- structured groove without randomness.",
      hint: "Set SWING 50 and HUMANIZE 0 (or remove the HUMANIZE line).",
    },
  ],

  funFact:
    "J Dilla, the legendary hip-hop producer, was famous for his 'drunk beats' -- notes intentionally placed off the grid by tiny amounts. Producers call this 'J Dilla feel' and it changed the sound of hip-hop forever. HUMANIZE gives you a taste of that magic!",
};

export default lesson20;
