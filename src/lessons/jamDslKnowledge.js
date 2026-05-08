// JAMai local knowledge: JAM/JEM DSL programming concepts
// Scope: programming and music-code concepts. Keep JAM/JEM keywords in English.

export const jamDslKnowledge = [
  {
    id: "jam-structure",
    title: "Common JAM code structure",
    tags: ["JAM", "JEM", "DSL", "programming", "structure"],
    level: "beginner",
    summary:
      "A JAM program is usually built from BPM, instruments, sequences or patterns, and an arrangement.",
    facts: [
      "BPM sets the tempo.",
      "INSTRUMENT defines a sound source.",
      "TYPE selects the kind of instrument, such as SYNTH or DRUM.",
      "WAVE selects a synth waveform.",
      "ADSR controls the volume shape of notes.",
      "VOLUME controls loudness.",
      "SEQUENCE or PATTERN defines what plays.",
      "ARRANGE or arrangement logic decides when parts play."
    ],
    studentExplanation:
      "JAM code is like a recipe: first set the speed, then create instruments, then write what they play.",
    exampleCode: `BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SQUARE
    ADSR 5 40 180 80
    VOLUME 120

SEQUENCE main:
    lead C4 D4 E4 REST G4`,
    exampleQuestions: [
      "What does BPM do?",
      "Where do I define the sound?",
      "Why does my sequence not play?"
    ]
  },
  {
    id: "jam-debugging-syntax",
    title: "Debugging JAM syntax",
    tags: ["JAM", "debugging", "syntax", "programming"],
    level: "beginner",
    summary:
      "Most beginner JAM bugs come from misspelled keywords, missing colons, wrong indentation, unknown notes, or referencing names that were not defined.",
    facts: [
      "Keep JAM keywords in English.",
      "Check that INSTRUMENT names match the names used later.",
      "Check that a block header has a colon when the syntax requires it.",
      "Check that notes use valid names and octaves.",
      "Check that REST is written as a rest token, not as a note.",
      "Change one thing at a time when debugging."
    ],
    studentExplanation:
      "When code does not work, do not rewrite everything. Check names, spelling, and one block at a time.",
    troubleshootingChecklist: [
      "Is BPM present?",
      "Is the instrument name spelled the same everywhere?",
      "Is the waveform valid?",
      "Are notes written with octave numbers, like C4?",
      "Are there accidental non-English keywords in code?"
    ],
    exampleQuestions: [
      "Why does my JAM code not run?",
      "Why is my instrument silent?",
      "How do I debug a sequence?"
    ]
  },
  {
    id: "jam-pattern-thinking",
    title: "Pattern thinking in music code",
    tags: ["JAM", "patterns", "loops", "programming", "composition"],
    level: "beginner",
    summary:
      "Patterns and loops help build longer music from small repeated ideas.",
    facts: [
      "A loop repeats a musical idea.",
      "Changing one note in a loop creates variation.",
      "Layering loops creates a fuller arrangement.",
      "A simple repeated bass can support a more active melody.",
      "Too many busy patterns at once can sound messy."
    ],
    studentExplanation:
      "Do not try to write the whole song at once. Create a small pattern, repeat it, then change small parts.",
    exampleQuestions: [
      "How do I make a longer track?",
      "How do I make my loop less boring?",
      "How do I layer sounds?"
    ]
  },
  {
    id: "jam-code-safety-boundaries",
    title: "Code answer boundaries",
    tags: ["JAMai", "programming", "answer rules"],
    level: "system",
    summary:
      "When answering programming questions, JAMai should not invent unsupported syntax. It should prefer the syntax documented in the local project knowledge.",
    facts: [
      "If a syntax feature is not in the local knowledge, say that it may not be supported.",
      "Keep JAM/JEM DSL keywords in English even when explaining in Hebrew or Russian.",
      "Give small code examples rather than large unrelated programs.",
      "Explain the mistake and the fix.",
      "For students, prefer direct examples over abstract compiler terms."
    ],
    exampleQuestions: [
      "Can I use this syntax?",
      "Fix my JAM code",
      "Why does this code fail?"
    ]
  }
];

export default jamDslKnowledge;
