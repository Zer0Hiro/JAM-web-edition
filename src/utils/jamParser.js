/**
 * Lightweight JEM DSL parser for the browser.
 *
 * This is a simplified parser that extracts enough information from .jam source
 * to power the in-browser Web Audio API preview. It does NOT generate C++ --
 * that's handled by the Python backend. Instead, it produces a flat list of
 * audio events that the WebAudioPreview engine can play.
 */

// ── Note utilities ──────────────────────────────────────────────────────
const NOTE_BASES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const ACCIDENTALS = { "#": 1, s: 1, b: -1 };
const NOTE_RE = /^([A-Ga-g])([#sb]?)(-?\d+)$/;

export function noteToFreq(name) {
  const m = name.match(NOTE_RE);
  if (!m) return 0;
  const letter = m[1].toUpperCase();
  const acc = ACCIDENTALS[m[2]] || 0;
  const octave = parseInt(m[3], 10);
  const midi = (octave + 1) * 12 + NOTE_BASES[letter] + acc;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// ── Parser ──────────────────────────────────────────────────────────────
export function parseJam(source) {
  const lines = source.split("\n");
  const result = {
    bpm: 120,
    instruments: {},
    sequences: {},
    patterns: {},
    arrangement: [],
    errors: [],
  };

  let currentBlock = null; // { type, name }
  let currentInstrument = null;
  let currentSequence = null;
  let currentPattern = null;

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    let line = lines[i];

    // Strip comments (but preserve # in note names like D#3)
    const commentIdx = findCommentStart(line);
    if (commentIdx >= 0) line = line.slice(0, commentIdx);
    line = line.trimEnd();

    if (line.trim() === "") continue;

    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();
    const tokens = trimmed.split(/\s+/);

    // ── Top-level directives ─────────────────────────────
    if (indent === 0) {
      currentBlock = null;
      currentInstrument = null;
      currentSequence = null;
      currentPattern = null;

      if (tokens[0] === "BPM" && tokens[1]) {
        result.bpm = parseFloat(tokens[1]) || 120;
      } else if (tokens[0] === "AUDIO_RATE" || tokens[0] === "CONTROL_RATE") {
        // Ignored for browser preview
      } else if (tokens[0] === "INSTRUMENT" && tokens[1]) {
        const name = tokens[1].replace(":", "");
        currentInstrument = {
          name,
          type: "SYNTH",
          wave: "SIN",
          adsr: [10, 50, 200, 100],
          volume: 200,
          freq: null,
          decay: null,
        };
        result.instruments[name] = currentInstrument;
        currentBlock = { type: "instrument", name };
      } else if (tokens[0] === "SEQUENCE" && tokens[1]) {
        const name = tokens[1].replace(":", "");
        currentSequence = { name, events: [] };
        result.sequences[name] = currentSequence;
        currentBlock = { type: "sequence", name };
      } else if (tokens[0] === "PATTERN" && tokens[1]) {
        const name = tokens[1].replace(":", "");
        currentPattern = { name, events: [] };
        result.patterns[name] = currentPattern;
        currentBlock = { type: "pattern", name };
      } else if (tokens[0] === "PLAY_SEQUENCE" && tokens[1]) {
        result.arrangement.push({ type: "play_sequence", name: tokens[1] });
      } else if (tokens[0] === "PLAY_PATTERN" && tokens[1]) {
        result.arrangement.push({ type: "play_pattern", name: tokens[1] });
      } else if (tokens[0] === "LOOP" && tokens[1]) {
        const count = parseInt(tokens[1].replace(":", ""), 10) || 1;
        result.arrangement.push({ type: "loop_start", count });
      }
    } else {
      // ── Indented lines (inside a block) ──────────────
      if (currentBlock?.type === "instrument" && currentInstrument) {
        if (tokens[0] === "TYPE") currentInstrument.type = tokens[1] || "SYNTH";
        else if (tokens[0] === "WAVE") currentInstrument.wave = tokens[1] || "SIN";
        else if (tokens[0] === "VOLUME") currentInstrument.volume = parseInt(tokens[1], 10) || 200;
        else if (tokens[0] === "FREQ") currentInstrument.freq = parseInt(tokens[1], 10) || 60;
        else if (tokens[0] === "DECAY") currentInstrument.decay = parseInt(tokens[1], 10) || 80;
        else if (tokens[0] === "ADSR" && tokens.length >= 5) {
          currentInstrument.adsr = [
            parseInt(tokens[1], 10) || 10,
            parseInt(tokens[2], 10) || 50,
            parseInt(tokens[3], 10) || 200,
            parseInt(tokens[4], 10) || 100,
          ];
        }
      } else if (currentBlock?.type === "sequence" && currentSequence) {
        if (tokens[0] === "PLAY" && tokens.length >= 4) {
          const inst = tokens[1];
          const note = tokens[2];
          const dur = parseFloat(tokens[3]) || 1;
          currentSequence.events.push({ type: "play", instrument: inst, note, duration: dur });
        } else if (tokens[0] === "REST" && tokens[1]) {
          currentSequence.events.push({ type: "rest", duration: parseFloat(tokens[1]) || 1 });
        }
      } else if (currentBlock?.type === "pattern" && currentPattern) {
        if (tokens[0] === "BEAT" && tokens.length >= 3) {
          const beatPos = parseFloat(tokens[1].replace(":", "")) || 1;
          const inst = tokens[2] || tokens[1];
          // If format is "BEAT 1: kick" the instrument is tokens[2]
          // tokens = ["BEAT", "1:", "kick"] or ["BEAT", "1", ":", "kick"]
          let instName = inst;
          if (inst === ":") instName = tokens[3];
          else instName = inst.replace(":", "");

          // Try to find note and duration after instrument name
          const remaining = tokens.slice(tokens.indexOf(instName) + 1);
          let note = null;
          let dur = null;
          if (remaining.length > 0 && NOTE_RE.test(remaining[0])) {
            note = remaining[0];
            if (remaining.length > 1) dur = parseFloat(remaining[1]);
          }

          currentPattern.events.push({ beatPosition: beatPos, instrument: instName, note, duration: dur });
        }
      }

      // Handle indented PLAY_SEQUENCE / PLAY_PATTERN inside LOOP blocks
      if (tokens[0] === "PLAY_SEQUENCE" && tokens[1]) {
        // Check if we're inside a loop by looking at the last arrangement item
        const last = result.arrangement[result.arrangement.length - 1];
        if (last && last.type === "loop_start" && !last.body) {
          last.body = [];
        }
        if (last && last.type === "loop_start") {
          last.body = last.body || [];
          last.body.push({ type: "play_sequence", name: tokens[1] });
        }
      } else if (tokens[0] === "PLAY_PATTERN" && tokens[1]) {
        const last = result.arrangement[result.arrangement.length - 1];
        if (last && last.type === "loop_start") {
          last.body = last.body || [];
          last.body.push({ type: "play_pattern", name: tokens[1] });
        }
      }
    }
  }

  return result;
}

function findCommentStart(line) {
  for (let i = 0; i < line.length; i++) {
    if (line[i] === "#" && (i === 0 || line[i - 1] === " " || line[i - 1] === "\t")) {
      return i;
    }
  }
  return -1;
}

/**
 * Flatten a parsed JEM program into a list of timed audio events.
 */
export function flattenToEvents(parsed) {
  const events = [];
  const msPerBeat = 60000 / parsed.bpm;

  function flattenSequence(seqName) {
    const seq = parsed.sequences[seqName];
    if (!seq) return;
    for (const ev of seq.events) {
      if (ev.type === "rest") {
        events.push({ type: "rest", durationMs: ev.duration * msPerBeat });
      } else if (ev.type === "play") {
        const inst = parsed.instruments[ev.instrument];
        const freq = noteToFreq(ev.note);
        events.push({
          type: "note",
          instrument: ev.instrument,
          freq,
          durationMs: ev.duration * msPerBeat,
          wave: inst?.wave || "SIN",
          adsr: inst?.adsr || [10, 50, 200, 100],
          volume: (inst?.volume || 200) / 255,
        });
      }
    }
  }

  function flattenPattern(patName) {
    const pat = parsed.patterns[patName];
    if (!pat) return;

    const sorted = [...pat.events].sort((a, b) => a.beatPosition - b.beatPosition);
    if (sorted.length === 0) return;

    // Group by beat position
    const groups = [];
    let currentGroup = [sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
      if (Math.abs(sorted[i].beatPosition - currentGroup[0].beatPosition) < 0.01) {
        currentGroup.push(sorted[i]);
      } else {
        groups.push(currentGroup);
        currentGroup = [sorted[i]];
      }
    }
    groups.push(currentGroup);

    let currentBeat = 1.0;
    for (let gi = 0; gi < groups.length; gi++) {
      const group = groups[gi];
      const pos = group[0].beatPosition;
      const gap = pos - currentBeat;

      if (gap > 0.01) {
        events.push({ type: "rest", durationMs: gap * msPerBeat });
      }

      const nextPos = gi + 1 < groups.length ? groups[gi + 1][0].beatPosition : 5.0;
      const beatGapMs = (nextPos - pos) * msPerBeat;

      for (let ei = 0; ei < group.length; ei++) {
        const bev = group[ei];
        const inst = parsed.instruments[bev.instrument];
        let freq = 60;
        if (bev.note) freq = noteToFreq(bev.note);
        else if (inst?.freq) freq = inst.freq;

        let dur = inst?.decay || 80;
        if (bev.duration) dur = bev.duration * msPerBeat;

        const isLast = ei === group.length - 1;
        events.push({
          type: "note",
          instrument: bev.instrument,
          freq,
          durationMs: isLast ? beatGapMs : dur,
          wave: inst?.wave || "SIN",
          adsr: inst?.adsr || [10, 50, 200, 100],
          volume: (inst?.volume || 200) / 255,
          simultaneous: !isLast,
        });
      }
      currentBeat = nextPos;
    }
  }

  function flattenArrangement(items) {
    for (const item of items) {
      if (item.type === "play_sequence") {
        flattenSequence(item.name);
      } else if (item.type === "play_pattern") {
        flattenPattern(item.name);
      } else if (item.type === "loop_start") {
        const count = item.count || 1;
        const body = item.body || [];
        for (let i = 0; i < count; i++) {
          flattenArrangement(body);
        }
      }
    }
  }

  flattenArrangement(parsed.arrangement);
  return events;
}
