const en = {
  dir: "ltr",

  // Nav
  nav: {
    home: "Home",
    lessons: "Lessons",
    sandbox: "Sandbox",
    sounds: "Sounds",
    guide: "Build Guide",
  },

  // Hero
  hero: {
    badge: "Just ESP Music",
    titleBefore: "Turn Code Into ",
    titleHighlight: "Music",
    subtitle: "Learn to create sounds, beats, and songs with the JEM language. Write code, hear it play, and upload it to an ESP32 -- no experience needed.",
    startLearning: "Start Learning",
    tryEditor: "Try the Editor",
    buildYourOwn: "Build Your Own JEM",
    scrollToExplore: "Scroll to explore",
  },

  // Feature Cards
  features: {
    title: "What is",
    titleHighlight: "JEM",
    subtitle: "JEM (Just ESP Music) is a free platform for learning sound synthesis through code. No prior coding or music experience required.",
    items: [
      { title: "Write Simple Code", description: "JEM is a beginner-friendly language designed for music. If you can write a text message, you can write JEM code." },
      { title: "Hear It Instantly", description: "Press Play and hear your creation right in the browser. No setup, no downloads, no waiting." },
      { title: "Run on Real Hardware", description: "Compile your code and upload it to an ESP32. Your music plays on actual hardware through a speaker." },
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
      { title: "Write your code", description: "Use the JEM language to define instruments, melodies, and drum patterns. The syntax is simple and readable." },
      { title: "Preview in browser", description: "Hit the Play button to hear your creation instantly using Web Audio. No hardware needed to get started." },
      { title: "Compile for ESP32", description: "When you're happy with your sound, compile it into real C++ code that runs on an ESP32." },
      { title: "Play on hardware", description: "Upload to your ESP32 and connect a speaker to pin 9. Your code becomes actual sound waves!" },
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
    1: { title: "Fundamentals", description: "Learn the basics of sound and the JEM language" },
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
    compileSuccess: "Compiled successfully! Your code is ready for ESP32.",
    compileOffline: "Compile server not connected. Use the Play button to preview your sound in the browser!",
    lexerError: "There's a word JEM doesn't recognize. Check for typos in your keywords (BPM, INSTRUMENT, PLAY, etc. must be UPPERCASE).",
    parseError: "JEM couldn't understand the structure of your code. Make sure indented lines are inside a block (INSTRUMENT, SEQUENCE, PATTERN, or LOOP).",
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
    subtitle: "Explore every note and waveform you can use in JEM. Hover a note to hear it — hover a wave card to hear the difference in texture.",
    noteExplorer: "Note Explorer",
    noteExplorerSub: "Hover any note to hear it. Tap on mobile.",
    octave: "Octave",
    middleOctave: "Middle octave",
    tip: "Tip:",
    tipText: "In JEM, you write notes like",
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

  // Arduino Guide
  arduinoGuide: {
    title: "ESP32 Build Guide",
    back: "Back",
    reset: "Reset",
    resetProgress: "Reset all progress",
    stepsLabel: "Steps",
    stepLabel: "Step",
    of: "of",
    imagePlaceholder: "Image will be added here",
    contentPlaceholder: "Detailed instructions will be added here.",
    tipLabel: "Tip:",
    doneNext: "Done — Next Step",
    finish: "Finish!",
    stepDone: "Completed",
    nextStep: "Next Step",
    allDoneTitle: "You're all set!",
    allDoneText: "Your ESP32 is ready to play JEM music. Head to the lessons and start composing!",
    steps: [
      {
        title: "What You Need",
        subtitle: "Gather your parts before we start.",
        imagePlaceholder: "Photo of all required parts laid out on a table",
        imageFilename: "step-1-parts.png",
        content: "Parts list and descriptions will go here.",
        tip: "All of these parts come in most ESP32 starter kits.",
      },
      {
        title: "Install Arduino IDE",
        subtitle: "Download and install the software to program your ESP32.",
        imagePlaceholder: "Screenshot of the Arduino IDE download page",
        imageFilename: "step-2-ide.png",
        content: "Download and installation instructions will go here.",
      },
      {
        title: "Install the Mozzi Library",
        subtitle: "Add the sound synthesis library that JEM uses under the hood.",
        imagePlaceholder: "Screenshot of Arduino Library Manager with Mozzi",
        imageFilename: "step-3-mozzi.png",
        content: "Mozzi library installation instructions will go here.",
      },
      {
        title: "Wire the Circuit",
        subtitle: "Connect your speaker to the ESP32.",
        imagePlaceholder: "Wiring diagram: ESP32 pin 9 → resistor → speaker → GND",
        imageFilename: "step-4-wiring.png",
        content: "Wiring diagram and instructions will go here.",
        tip: "Use a 100Ω resistor between pin 9 and the speaker to protect the ESP32.",
      },
      {
        title: "Write Your JEM Code",
        subtitle: "Create a simple melody on the JEM website.",
        imagePlaceholder: "Screenshot of the JEM editor with a simple melody",
        imageFilename: "step-5-code.png",
        content: "Instructions for writing your first JEM program will go here.",
      },
      {
        title: "Compile to ESP32 Code",
        subtitle: "Turn your JEM code into C++ that the ESP32 understands.",
        imagePlaceholder: "Screenshot showing the Compile button and success message",
        imageFilename: "step-6-compile.png",
        content: "Compilation instructions will go here.",
      },
      {
        title: "Upload to ESP32",
        subtitle: "Send the compiled code to your ESP32 board.",
        imagePlaceholder: "Screenshot of Arduino IDE uploading the sketch",
        imageFilename: "step-7-upload.png",
        content: "Upload instructions will go here.",
        tip: "Make sure you select the correct board (ESP32) and port in the IDE.",
      },
      {
        title: "Hear Your Music!",
        subtitle: "Your ESP32 is now playing the music you composed!",
        imagePlaceholder: "Photo of the completed setup with speaker playing",
        imageFilename: "step-8-done.png",
        content: "Troubleshooting and next steps will go here.",
      },
    ],
  },

  // Footer
  footer: {
    tagline: "Just ESP Music",
    mozzi: "Mozzi Library",
    github: "GitHub",
    builtFor: "Built for learning. Powered by Mozzi 2.0 and the Web Audio API.",
  },
};

export default en;
