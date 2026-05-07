const en = {
  dir: "ltr",

  // Nav
  nav: {
    home: "Home",
    lessons: "Lessons",
    sandbox: "Sandbox",
    sounds: "Sounds",
  },

  // Hero
  hero: {
    badge: "Just Arduino Music",
    titleBefore: "Turn Code Into ",
    titleHighlight: "Music",
    subtitle: "Learn to create sounds, beats, and songs with the JAM language. Write code, hear it play, and upload it to an Arduino -- no experience needed.",
    startLearning: "Start Learning",
    tryEditor: "Try the Editor",
    scrollToExplore: "Scroll to explore",
    buildYourOwn: "Build Your Own",
  },

  // Feature Cards
  features: {
    title: "What is",
    titleHighlight: "JAM",
    subtitle: "JAM (Just Arduino Music) is a free platform for learning sound synthesis through code. No prior coding or music experience required.",
    items: [
      { title: "Write Simple Code", description: "JAM is a beginner-friendly language designed for music. If you can write a text message, you can write JAM code." },
      { title: "Hear It Instantly", description: "Press Play and hear your creation right in the browser. No setup, no downloads, no waiting." },
      { title: "Run on Real Hardware", description: "Compile your code and upload it to an Arduino Uno. Your music plays on actual hardware through a speaker." },
      { title: "Step-by-Step Lessons", description: "9 lessons that take you from zero to composing full tracks. Every line of code is explained." },
      { title: "Real Sound Synthesis", description: "Learn the same synthesis techniques used in professional music: oscillators, envelopes, mixing, and more." },
      { title: "Make Cool Stuff", description: "Build retro game sounds, drum machines, bass lines, and melodies. Impress your friends." },
    ],
  },

  // How It Works
  howItWorks: {
    title: "How It",
    titleHighlight: "Works",
    subtitle: "From typing your first line to hearing it on real hardware -- here's the journey.",
    steps: [
      { title: "Write your code", description: "Use the JAM language to define instruments, melodies, and drum patterns. The syntax is simple and readable." },
      { title: "Preview in browser", description: "Hit the Play button to hear your creation instantly using Web Audio. No hardware needed to get started." },
      { title: "Compile for Arduino", description: "When you're happy with your sound, compile it into real C++ code that runs on an Arduino Uno." },
      { title: "Play on hardware", description: "Upload to your Arduino and connect a speaker to pin 9. Your code becomes actual sound waves!" },
    ],
  },

  // Lesson List
  lessonList: {
    titleBefore: "Learn Step by ",
    titleHighlight: "Step",
    subtitle: (count, phaseCount) => `${count} lessons across ${phaseCount} phases. Start from zero and build up to full compositions.`,
    done: "Done",
    min: "min",
    difficulty: "Difficulty",
  },

  // Lesson phases
  phases: {
    1: { title: "Fundamentals", description: "Learn the basics of sound and the JAM language" },
    2: { title: "Rhythm & Timing", description: "Add beats, drums, and loops to your music" },
    3: { title: "Expression", description: "Shape your sounds and layer instruments" },
    4: { title: "Full Songs", description: "Put it all together into complete compositions" },
  },

  // Lesson View
  lessonView: {
    allLessons: "All Lessons",
    phase: "Phase",
    lesson: "Lesson",
    tryThese: "Your turn! Try these:",
    tryTheseSubtitle: "Edit the code on the right and press Play to hear your changes. No wrong answers!",
    needHint: "Need a hint?",
    hideHint: "Hide hint",
    showFunFact: "Show fun fact",
    hideFunFact: "Hide fun fact",
    markComplete: "Mark as Complete",
    completed: "Completed",
    nextLesson: "Next Lesson",
    previousLesson: "Previous lesson",
  },

  // Code Editor
  editor: {
    reset: "Reset",
    compile: "Compile",
    play: "Play",
    stop: "Stop",
    oops: "Oops!",
    noInstrument: "You need at least one INSTRUMENT block. Check the lesson for an example!",
    noArrangement: "Your code needs a PLAY_SEQUENCE or PLAY_PATTERN at the bottom to actually play something!",
    noNotes: "No notes to play! Make sure your sequence has PLAY commands.",
    genericError: (msg) => `Something went wrong: ${msg}. Double-check your code for typos!`,
    compileSuccess: "Compiled successfully! Your code is ready for Arduino.",
    compileOffline: "Compile server not connected. Use the Play button to preview your sound in the browser!",
    lexerError: "There's a word JAM doesn't recognize. Check for typos in your keywords (BPM, INSTRUMENT, PLAY, etc. must be UPPERCASE).",
    parseError: "JAM couldn't understand the structure of your code. Make sure indented lines are inside a block (INSTRUMENT, SEQUENCE, PATTERN, or LOOP).",
    undefinedInstrument: "You're trying to use an instrument that doesn't exist. Make sure you defined it with an INSTRUMENT block and spelled the name correctly!",
    undefinedSequence: "You're trying to play a sequence that doesn't exist. Check the name in PLAY_SEQUENCE matches your SEQUENCE block.",
    genericCompileError: "Something went wrong. Check your code for typos!",
  },

  // Sandbox
  sandbox: {
    title: "Sandbox",
    subtitle: "No rules, no lessons -- just you and the code. Write whatever you want and hit Play to hear it. Break things. Experiment. Have fun.",
    waveforms: "Waveforms",
    notes: "Notes",
    structure: "Structure",
    waveformItems: ["SIN -- smooth, pure", "SAW -- buzzy, bright", "SQUARE -- retro, hollow", "TRIANGLE -- mellow, soft", "NOISE -- random, percussive"],
    noteItems: ["C4 = Middle C", "A4 = 440 Hz", "C#4 / Db4 = sharps/flats", "C5 = octave above C4", "Duration: 0.25 to 4 beats"],
    structureItems: ["BPM sets tempo", "INSTRUMENT defines sounds", "SEQUENCE lists notes", "PATTERN places beats", "LOOP repeats sections"],
  },

  // Sound Library
  soundLibrary: {
    interactive: "Interactive",
    title: "Sound Library",
    subtitle: "Explore every note and waveform you can use in JAM. Hover a note to hear it — hover a wave card to hear the difference in texture.",
    noteExplorer: "Note Explorer",
    noteExplorerSub: "Hover any note to hear it. Tap on mobile.",
    octave: "Octave",
    middleOctave: "Middle octave",
    tip: "Tip:",
    tipText: "In JAM, you write notes like",
    tipSuffix: ". The number is the octave. The sharps (#) are the slightly higher in-between notes.",
    waveComparison: "Wave Comparison",
    waveComparisonSub: "Hover or click each card to hear what the waveform sounds like.",
    playing: "Playing...",
    hearIt: "Hear it",
    playsA4: "Plays A4 — 440 Hz",
    whyDifferent: "Why do they sound different?",
    whyDifferentText: "Every wave shape tells a speaker how fast to vibrate and in what pattern. A sine wave is perfectly smooth — just one pure frequency. A square wave slams between full on and full off, which adds lots of extra \"harmonics\" (extra frequencies) on top, giving that crunchy 8-bit sound. Sawtooth has even more harmonics, which is why it sounds so buzzy and bright.",
    waveDescs: {
      sine: "Smooth and round — like a hum or a flute. The purest sound, no harsh edges.",
      sawtooth: "Buzzy and bright — think electric guitar, synth leads, or a buzzing bee.",
      square: "Hollow and retro — this is the classic 8-bit video game sound. Super punchy!",
      triangle: "Soft but with a bit of an edge — like a mellow synth pad or an old-school bass.",
      noise: "Pure chaos — every frequency at once. Use it for drums, rain, or explosions!",
    },
  },

  // Footer
  footer: {
    tagline: "Just Arduino Music",
    mozzi: "Mozzi Library",
    github: "GitHub",
    builtFor: "Built for learning. Powered by Mozzi 2.0 and the Web Audio API.",
  },
};

export default en;
