// JAMai local knowledge: music fundamentals for JAM/JEM
// Scope: music concepts useful for a 13-15 educational sound synthesis site.
// No LLM/provider content included.

export const musicFundamentalsKnowledge = [
  {
    id: "music-basics-sound",
    title: "What sound is",
    tags: ["music", "sound", "wave", "frequency", "amplitude"],
    level: "beginner",
    summary:
      "Sound is vibration that travels through air. In digital music, we describe sound using frequency, amplitude, waveform, and time.",
    facts: [
      "Frequency controls pitch: higher frequency sounds higher, lower frequency sounds deeper.",
      "Amplitude controls loudness: larger amplitude sounds louder, smaller amplitude sounds quieter.",
      "A waveform is the shape of the vibration over time.",
      "A note is a sound with a chosen pitch and duration.",
      "A rest is silence for a chosen duration."
    ],
    studentExplanation:
      "A speaker moves back and forth very fast. That movement pushes air and creates sound. When the movement repeats faster, the note sounds higher.",
    exampleQuestions: [
      "Why does a higher frequency sound higher?",
      "What is the difference between pitch and volume?",
      "What is a rest in music code?"
    ]
  },
  {
    id: "music-basics-frequency-notes",
    title: "Frequency and musical notes",
    tags: ["music", "frequency", "notes", "pitch", "A4"],
    level: "beginner",
    summary:
      "Musical notes can be represented as frequencies. A4 is commonly tuned to 440 Hz, and each octave doubles or halves the frequency.",
    facts: [
      "A4 is commonly 440 Hz.",
      "One octave up means double the frequency.",
      "One octave down means half the frequency.",
      "If A4 is 440 Hz, A5 is 880 Hz and A3 is 220 Hz.",
      "Adjacent semitones in equal temperament are separated by the same frequency ratio."
    ],
    studentExplanation:
      "Think of octaves as the same note family at different heights. A5 is still A, but it vibrates twice as fast as A4.",
    exampleQuestions: [
      "Why does A5 sound like a higher A?",
      "How do notes become numbers in code?",
      "Why does doubling frequency make an octave?"
    ]
  },
  {
    id: "music-basics-rhythm",
    title: "Rhythm, BPM, and timing",
    tags: ["music", "rhythm", "BPM", "tempo", "timing"],
    level: "beginner",
    summary:
      "Rhythm is the timing pattern of sounds and silences. BPM means beats per minute and controls the speed of the music.",
    facts: [
      "BPM stands for beats per minute.",
      "Higher BPM means faster music.",
      "Lower BPM means slower music.",
      "At 120 BPM, one beat lasts 0.5 seconds.",
      "Rhythm is created by placing notes and rests on a time grid."
    ],
    studentExplanation:
      "BPM is like the speed setting of the song. At 120 BPM, the beat is steady and easy to count: two beats per second.",
    exampleQuestions: [
      "What does BPM mean?",
      "Why does 160 BPM sound faster than 90 BPM?",
      "How do rests create rhythm?"
    ]
  },
  {
    id: "music-basics-melody-harmony-bass",
    title: "Melody, harmony, and bass",
    tags: ["music", "melody", "harmony", "bass", "chords"],
    level: "beginner",
    summary:
      "A melody is the main tune, harmony supports it with other notes, and bass gives the music a low foundation.",
    facts: [
      "Melody is usually the part people remember or sing.",
      "Bass uses lower notes and often repeats a groove.",
      "Harmony means notes that sound together or support the melody.",
      "A chord is multiple notes played together.",
      "Layering melody, bass, and rhythm makes a fuller track."
    ],
    studentExplanation:
      "A song can be built like layers: drums keep time, bass gives weight, melody tells the main story, and chords add color.",
    exampleQuestions: [
      "What is the difference between melody and bass?",
      "Why do chords make the sound fuller?",
      "How do I make my JAM track less empty?"
    ]
  }
];

export default musicFundamentalsKnowledge;
