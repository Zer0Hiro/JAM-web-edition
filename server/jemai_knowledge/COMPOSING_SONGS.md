# Composing Songs in JAM

How to write real music in the JAM language: melodies, basslines, drum beats, chords, song structure, and mood.

## Song structure

A full JAM song usually has four parts, in this order:

1. **Config** — `BPM`, optional `KEY`, `TIME_SIGNATURE`, `SWING`
2. **Instruments** — one `INSTRUMENT` block per sound (lead, bass, kick, snare, hat)
3. **Material** — `SEQUENCE` blocks for melodies/basslines, `PATTERN` blocks for drums
4. **Arrangement** — `PLAY_SEQUENCE`, `PLAY_PATTERN`, `LOOP`, `PLAY_TOGETHER` at the bottom

A classic arrangement: intro (melody alone), verse (melody + drums together), repeat with `LOOP`, then `FADE_OUT`.

```
LOOP 2:
    PLAY_SEQUENCE intro
LOOP 4:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE bass
        PLAY_PATTERN drums
FADE_OUT 4
PLAY_SEQUENCE outro
```

## Writing a melody

- Pick a key first: `KEY C MAJOR` (happy) or `KEY A MINOR` (sad). The compiler warns when a note leaves the scale.
- Stay inside one octave (C4–C5) for a singable melody; jump an octave for a chorus lift.
- Use mostly short notes (0.5 beats) with a long note (1–2 beats) at the end of each phrase — that's a musical "sentence".
- Step to neighbouring scale notes most of the time; save big jumps for moments of drama.
- Repeat your phrase, then change its ending: AAAB is the oldest melody trick in the world.

```
SEQUENCE melody:
    PLAY lead C4 0.5
    PLAY lead D4 0.5
    PLAY lead E4 0.5
    PLAY lead G4 1
    PLAY lead E4 0.5
    PLAY lead D4 0.5
    PLAY lead C4 2
    REST 1
```

## Writing a bassline

- Use a `SAW` or `SQUARE` synth one or two octaves below the melody (octave 2).
- Play the root note of the key on the strong beats; keep durations long (1–2 beats).
- A classic pattern: root, root, fifth, root (`C2 C2 G2 C2`).
- Give the bass a low `CUTOFF` (300–800) to keep it warm and round.

```
INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 60 200 80
    CUTOFF 600
    VOLUME 200

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass C2 1
    PLAY bass G2 1
    PLAY bass C2 1
```

## Writing a drum beat

- Three drums cover almost everything: kick (`WAVE SIN`, `FREQ 50-60`), snare (`WAVE NOISE`, `FREQ 180-250`), hat (`WAVE NOISE`, `FREQ 6000-9000`, short `DECAY`).
- The universal rock/pop beat: kick on 1 and 3, snare on 2 and 4, hats on every half beat.
- Fractional positions make offbeats: `BEAT 1.5: hat`.
- Add `SWING 40` at the top of the file for a shuffle/groove feel.

```
PATTERN beat:
    BEAT 1: kick
    BEAT 1.5: hat
    BEAT 2: snare
    BEAT 2.5: hat
    BEAT 3: kick
    BEAT 3.5: hat
    BEAT 4: snare
    BEAT 4.5: hat
```

## Chords and harmony

- Chords use brackets: `PLAY pad [C4 E4 G4] 2` — major triad = root + 4 + 3 semitones, minor = root + 3 + 4.
- The four-chord pop progression in C major: C (C-E-G), G (G-B-D), Am (A-C-E), F (F-A-C).
- Give chord instruments `POLYPHONY 3` and a slow attack (`ADSR 80 200 400 300`) for a pad sound.

```
SEQUENCE chords:
    PLAY pad [C4 E4 G4] 2
    PLAY pad [G3 B3 D4] 2
    PLAY pad [A3 C4 E4] 2
    PLAY pad [F3 A3 C4] 2
```

## Mood guide

| Mood | Key/scale | BPM | Waves | Extras |
|------|-----------|-----|-------|--------|
| Happy / upbeat | `KEY C MAJOR` | 120–140 | SQUARE, SAW | drums every beat, hats on offbeats |
| Sad / emotional | `KEY A MINOR` | 70–90 | SIN, TRIANGLE | long notes, REVERB 120+, slow attack |
| Spooky / mysterious | `KEY D PHRYGIAN` | 80–100 | TRIANGLE, BELL | low octave, DELAY echo, minor seconds |
| Chill / dreamy | `KEY F LYDIAN` or PENTATONIC | 80–100 | SIN, HANDPAN | SWING 30, REVERB, sparse drums |
| Epic / dramatic | `KEY D MINOR` | 100–120 | SAW + VOICES 3 DETUNE 12 | chords, crescendo VELOCITY_CURVE, FADE_IN |
| Retro game | `KEY C MAJOR` | 140–160 | SQUARE, PLUCK | fast 0.25-beat notes, arpeggios |

## Making it expressive

- `VELOCITY_CURVE CRESCENDO 80 220 8` — gets louder across 8 notes (build-ups).
- Per-note velocity: `PLAY lead C4 0.5 120` — accent some notes, soften others.
- `GLIDE 80` on a synth makes notes slide into each other (great for basses and leads).
- `LFO 0.5 40 VOLUME` adds a slow tremble; `LFO 5 15 PITCH` adds vibrato.
- `BPM 140 OVER 8` mid-arrangement ramps the tempo smoothly — instant energy shift.
- End songs with `FADE_OUT 8` instead of stopping abruptly.

## Complete mini-song example

```
BPM 110
KEY C MAJOR

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 80 200 150
    REVERB 80
    VOLUME 200

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 60 200 80
    CUTOFF 600
    VOLUME 190

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 70
    VOLUME 190

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead C4 2

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass C2 1
    PLAY bass G2 1
    PLAY bass C2 1

PATTERN beat:
    BEAT 1: kick
    BEAT 2: snare
    BEAT 3: kick
    BEAT 4: snare

PLAY_SEQUENCE melody
LOOP 3:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE bassline
        PLAY_PATTERN beat
FADE_OUT 4
PLAY_SEQUENCE melody
```
