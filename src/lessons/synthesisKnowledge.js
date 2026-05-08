// JAMai local knowledge: sound synthesis
// Scope: waveforms, envelopes, timbre, simple synth concepts for JAM/JEM.

export const synthesisKnowledge = [
  {
    id: "synthesis-waveforms",
    title: "Basic waveforms",
    tags: ["synthesis", "waveform", "sine", "square", "saw", "triangle", "noise"],
    level: "beginner",
    summary:
      "Different waveforms have different sound colors. In a synth, changing the waveform changes the character of the sound.",
    facts: [
      "SINE is smooth and pure.",
      "SQUARE sounds hollow, buzzy, or retro.",
      "SAW sounds bright and rich.",
      "TRIANGLE sounds softer than square or saw.",
      "NOISE is random and useful for drums, effects, and percussion."
    ],
    studentExplanation:
      "Waveform is the basic shape of the sound. Same note, same volume, different waveform: different character.",
    jamExamples: [
      "WAVE SINE",
      "WAVE SQUARE",
      "WAVE SAW",
      "WAVE TRIANGLE"
    ],
    exampleQuestions: [
      "Which waveform is best for bass?",
      "Why does saw sound brighter than sine?",
      "How do I make a retro game sound?"
    ]
  },
  {
    id: "synthesis-adsr",
    title: "ADSR envelope",
    tags: ["synthesis", "ADSR", "attack", "decay", "sustain", "release", "envelope"],
    level: "beginner",
    summary:
      "ADSR controls how the loudness of a note changes over time: Attack, Decay, Sustain, Release.",
    facts: [
      "Attack: how quickly the sound starts.",
      "Decay: how quickly the sound drops after the attack peak.",
      "Sustain: the level held while the note continues.",
      "Release: how long the sound fades after the note ends.",
      "Short attack creates a sharp start; long attack creates a fade-in."
    ],
    studentExplanation:
      "ADSR is like the shape of a sound's volume. It decides whether a note starts sharply, fades in slowly, cuts off quickly, or rings out.",
    jamExamples: [
      "ADSR 5 40 200 100",
      "ADSR 80 120 160 300"
    ],
    exampleQuestions: [
      "What does ADSR do?",
      "How do I make a pluck sound?",
      "How do I make a pad-like soft sound?"
    ]
  },
  {
    id: "synthesis-volume-clipping",
    title: "Volume and clipping",
    tags: ["synthesis", "volume", "clipping", "distortion", "mixing"],
    level: "beginner",
    summary:
      "When too many sounds are loud at the same time, the output can clip and sound distorted.",
    facts: [
      "Volume controls the strength of a sound.",
      "Several instruments playing together can add up and become too loud.",
      "Clipping happens when a signal is pushed beyond the output range.",
      "Reducing individual instrument volume can make the whole mix cleaner.",
      "A loud sound is not always a better sound."
    ],
    studentExplanation:
      "If every instrument is at maximum, the mix may become messy. Lowering volume can make the music clearer.",
    exampleQuestions: [
      "Why does my sound crackle?",
      "Why is the speaker noisy when many tracks play?",
      "How do I make the mix cleaner?"
    ]
  },
  {
    id: "synthesis-drums",
    title: "Synthetic drums",
    tags: ["synthesis", "drums", "kick", "snare", "hat", "noise"],
    level: "beginner",
    summary:
      "Drum sounds can be made with short envelopes, noise, and pitch changes.",
    facts: [
      "A kick is usually low and short.",
      "A snare often uses noise and a sharp envelope.",
      "A hi-hat is usually very short and noisy.",
      "Short release makes percussion tighter.",
      "Drum patterns create groove by repeating hits and rests."
    ],
    studentExplanation:
      "Drums in code are not always recordings. They can be tiny synth sounds shaped to feel like hits.",
    exampleQuestions: [
      "How do I make a kick stronger?",
      "Why does noise work for drums?",
      "How do I make a hi-hat shorter?"
    ]
  }
];

export default synthesisKnowledge;
