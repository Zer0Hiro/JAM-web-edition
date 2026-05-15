const lesson21 = {
  id: 21,
  slug: "song-craft",
  title: "Song Craft",
  subtitle: "Build a complete song with fades, tempo changes, and everything you've learned",
  phase: 7,
  difficulty: 4,
  goal: "Combine instruments, sequences, patterns, PLAY_TOGETHER, LOOPs, FADE_IN, FADE_OUT, and mid-song BPM changes into a full multi-section song.",
  concepts: ["FADE_IN", "FADE_OUT", "Dynamic BPM", "Dynamic VOLUME", "AUDIO_RATE", "CONTROL_RATE", "Full song structure"],
  estimatedMinutes: 15,

  steps: [
    {
      title: "Fade in -- the dramatic intro",
      content: `**FADE_IN** makes your music rise from total silence. Place it right before the section it applies to:

\`\`\`
FADE_IN 4
LOOP 2:
    PLAY_SEQUENCE intro
\`\`\`

The number is how many beats the fade takes. Short fades (4 beats) feel sudden and punchy. Long fades (16 beats) feel cinematic, like a movie opening.

Range: 1-64 beats. The longer the fade, the more dramatic the entrance.`,
    },
    {
      title: "Fade out -- the classic ending",
      content: `**FADE_OUT** makes music disappear into silence. Place it before the final section:

\`\`\`
FADE_OUT 8
LOOP 2:
    PLAY_SEQUENCE outro
\`\`\`

This is how hundreds of famous songs end -- the band keeps playing, but the volume slowly turns down until there's nothing left.

Fun trick: you can use FADE_OUT with a long loop so the song slowly vanishes while still going. The Beatles did this for 4 minutes straight!`,
    },
    {
      title: "Changing speed mid-song",
      content: `Put **BPM** anywhere in your arrangement to change the tempo on the fly:

\`\`\`
BPM 90
PLAY_SEQUENCE intro
BPM 130
PLAY_SEQUENCE chorus
\`\`\`

Slow intro (BPM 90) into a fast chorus (BPM 130) creates a rush of energy. Or go the other way -- fast verse into a slow, heavy breakdown.

Real DJs do this all the time. Now you can too.`,
    },
    {
      title: "Master volume changes",
      content: `Use **VOLUME** as an arrangement command (not inside an instrument) to change the overall loudness mid-song:

\`\`\`
VOLUME 120
PLAY_SEQUENCE verse
VOLUME 220
PLAY_SEQUENCE chorus
\`\`\`

Quiet verse, loud chorus. It's the oldest trick in music production -- dynamics make songs feel alive. Without volume changes, everything sounds flat and boring.`,
    },
    {
      title: "The technical stuff",
      content: `Two settings you probably won't need to change, but good to know they exist:

- **AUDIO_RATE** -- how many audio samples per second. Default is 16384. Set to 32768 for higher quality sound (uses more processing power). Only matters on hardware.
- **CONTROL_RATE** -- how often effects like LFO and envelopes update. Default is 64 Hz. Higher values = smoother effects but more CPU load.

\`\`\`
AUDIO_RATE 32768
CONTROL_RATE 128
\`\`\`

Most projects work great with the defaults. Only tweak these if you're pushing your ESP32 to the limit and want to experiment.`,
    },
    {
      title: "Build a full song",
      content: `Time to put EVERYTHING together. A real song has sections:

- **Intro** -- simple, sets the mood (maybe with FADE_IN)
- **Verse** -- the main idea, moderate energy
- **Chorus** -- the big moment, full energy, faster tempo
- **Outro** -- wind down (with FADE_OUT)

The code below uses instruments, sequences, patterns, PLAY_TOGETHER, LOOPs, fades, and tempo changes. It's a complete song. Press Play, sit back, and enjoy what you've learned to build!`,
    },
  ],

  code: `# Song Craft -- A complete multi-section song
# Intro, verse, chorus, and fade-out ending

BPM 90

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 40 200 120
    DELAY 250 100
    VOLUME 180

INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    VOICES 2
    DETUNE 15
    CHORUS 80
    ADSR 200 100 400 300
    REVERB 150
    VOLUME 130

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 300 100
    CUTOFF 600
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 250

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 25
    VOLUME 130

INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 60
    VOLUME 200

# -- Intro: gentle melody alone --
SEQUENCE intro_melody:
    PLAY lead C4 1
    PLAY lead E4 1
    PLAY lead G4 2
    PLAY lead E4 1
    PLAY lead C4 1
    REST 2

# -- Verse: melody + chords + bass --
SEQUENCE verse_melody:
    PLAY lead C4 0.5
    PLAY lead D4 0.5
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1
    PLAY lead C4 1
    REST 2

SEQUENCE verse_chords:
    PLAY pad [C3 E3 G3] 4
    PLAY pad [A2 C3 E3] 4

SEQUENCE verse_bass:
    PLAY bass C2 1
    PLAY bass C2 0.5
    PLAY bass E2 0.5
    PLAY bass A1 1
    PLAY bass A1 0.5
    PLAY bass G1 0.5
    PLAY bass C2 1
    PLAY bass G1 1

# -- Chorus: big energy, faster --
SEQUENCE chorus_melody:
    PLAY lead G4 0.5
    PLAY lead A4 0.5
    PLAY lead C5 1
    PLAY lead A4 0.5
    PLAY lead G4 0.5
    PLAY lead E4 1
    PLAY lead G4 0.5
    PLAY lead A4 0.5
    PLAY lead C5 1
    PLAY lead D5 1
    PLAY lead C5 1

SEQUENCE chorus_chords:
    PLAY pad [F3 A3 C4] 4
    PLAY pad [G3 B3 D4] 4

SEQUENCE chorus_bass:
    PLAY bass F1 0.5
    PLAY bass F1 0.5
    PLAY bass A1 0.5
    PLAY bass C2 0.5
    PLAY bass G1 0.5
    PLAY bass G1 0.5
    PLAY bass B1 0.5
    PLAY bass D2 0.5

# -- Drum patterns --
PATTERN verse_beat:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 2: hat
    BEAT 2.5: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: hat
    BEAT 4.5: hat

PATTERN chorus_beat:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 1.5: hat
    BEAT 2: snare
    BEAT 2: hat
    BEAT 2.5: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 3.5: hat
    BEAT 4: snare
    BEAT 4: hat
    BEAT 4.5: hat

# ===== ARRANGEMENT =====

# Intro: fade in, melody alone
FADE_IN 4
LOOP 2:
    PLAY_SEQUENCE intro_melody

# Verse: add full band, slightly faster
BPM 120
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE verse_melody
        PLAY_SEQUENCE verse_chords
        PLAY_SEQUENCE verse_bass
        PLAY_PATTERN verse_beat

# Chorus: full energy, faster tempo
BPM 140
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE chorus_melody
        PLAY_SEQUENCE chorus_chords
        PLAY_SEQUENCE chorus_bass
        PLAY_PATTERN chorus_beat

# Outro: slow down, fade out
BPM 100
FADE_OUT 8
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE intro_melody
        PLAY_SEQUENCE verse_chords
        PLAY_PATTERN verse_beat`,

  challenges: [
    {
      id: "slow-fade-in",
      text: "Change FADE_IN from 4 beats to 16 beats. The intro should feel much more gradual and cinematic, like a movie opening.",
      hint: "Change FADE_IN 4 to FADE_IN 16.",
    },
    {
      id: "quick-fade-out",
      text: "Change FADE_OUT from 8 to 2 beats. The ending should feel sudden, like someone pulled the plug.",
      hint: "Change FADE_OUT 8 to FADE_OUT 2.",
    },
    {
      id: "dramatic-bpm-drop",
      text: "Set the outro to BPM 80 instead of 100. A slow outro after a fast chorus creates a huge contrast -- like taking a deep breath after sprinting.",
      hint: "Change the last BPM 100 to BPM 80.",
    },
    {
      id: "add-volume-dynamics",
      text: "Add VOLUME 150 before the verse and VOLUME 255 before the chorus. The chorus will hit harder when the verse is quieter.",
      hint: "Add VOLUME 150 on a new line before the verse section, and VOLUME 255 before the chorus section.",
    },
    {
      id: "extra-section",
      text: "Add a second verse after the chorus (before the outro) at BPM 120. Great songs repeat the verse-chorus cycle!",
      hint: "Before the outro section, add BPM 120 and another LOOP 2 block with the verse parts.",
    },
  ],

  funFact:
    "The Beatles' 'Hey Jude' holds the record for the longest fade-out on a hit song -- over 4 minutes of 'na na na na' slowly disappearing. The engineer kept fading the volume down while the band kept singing. Some radio DJs would start talking over the fade before it even finished!",
};

export default lesson21;
