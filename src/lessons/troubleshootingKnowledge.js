// JAMai local knowledge: troubleshooting for music, programming, and electronics.

export const troubleshootingKnowledge = [
  {
    id: "trouble-no-sound",
    title: "No sound from speaker",
    tags: ["troubleshooting", "speaker", "no sound", "GPIO25", "GPIO26", "electronics"],
    category: "electronics",
    likelyCauses: [
      "Speaker wires are not connected to GPIO25 and GPIO26.",
      "Speaker wires are touching each other.",
      "The program is not running.",
      "The instrument or sequence is silent.",
      "Volume is too low.",
      "The ESP32 is not connected correctly."
    ],
    checks: [
      "Check speaker wire 1 goes to GPIO25.",
      "Check speaker wire 2 goes to GPIO26.",
      "Check the speaker wires are in separate breadboard columns.",
      "Check VOLUME in the JAM code.",
      "Run a very simple test sound.",
      "Reconnect the ESP32 after checking the circuit."
    ],
    safeAnswer:
      "Check wiring before connecting power. Do not move wires while the board is powered."
  },
  {
    id: "trouble-potentiometer",
    title: "Potentiometer does not change sound",
    tags: ["troubleshooting", "potentiometer", "GPIO34", "analog", "ADC"],
    category: "electronics",
    likelyCauses: [
      "Middle leg is not connected to GPIO34.",
      "Side legs are not connected to 3.3V and GND.",
      "The potentiometer is rotated in code but not mapped to a sound parameter.",
      "The potentiometer is not inserted correctly into the breadboard."
    ],
    checks: [
      "Check left leg -> red rail / 3.3V.",
      "Check right leg -> blue rail / GND.",
      "Check middle leg -> GPIO34.",
      "Check that the code reads the analog value from GPIO34.",
      "Try turning the knob slowly from one side to the other."
    ],
    safeAnswer:
      "Do not connect the potentiometer side legs to random pins. Use the guide wiring."
  },
  {
    id: "trouble-button",
    title: "Button does not respond",
    tags: ["troubleshooting", "button", "GPIO12", "GPIO14", "digital input"],
    category: "electronics",
    likelyCauses: [
      "Button is not crossing the breadboard groove.",
      "Button pin is connected to the wrong GPIO.",
      "GND side is missing.",
      "The code expects the other button pin.",
      "The wire is loose."
    ],
    checks: [
      "For Button A, check GPIO12 and GND.",
      "For Button B, check GPIO14 and GND.",
      "Check that each button crosses the breadboard center groove.",
      "Check that the button's opposite side goes to the blue GND rail.",
      "Press one button at a time while testing."
    ],
    safeAnswer:
      "Check the wiring with the ESP32 disconnected from the computer."
  },
  {
    id: "trouble-noisy-sound",
    title: "Noisy or distorted sound",
    tags: ["troubleshooting", "noise", "distortion", "volume", "synthesis"],
    category: "music",
    likelyCauses: [
      "Volume is too high.",
      "Too many instruments play loudly at the same time.",
      "Speaker wires are loose.",
      "Speaker wires are touching.",
      "The waveform is naturally buzzy, such as SAW or SQUARE."
    ],
    checks: [
      "Lower VOLUME values.",
      "Test one instrument at a time.",
      "Check speaker wires.",
      "Try SINE or TRIANGLE for a smoother sound.",
      "Use shorter ADSR release if sounds overlap too much."
    ],
    safeAnswer:
      "If the sound suddenly becomes harsh, lower volume and check wiring."
  },
  {
    id: "trouble-code-silent",
    title: "JAM code runs but is silent",
    tags: ["troubleshooting", "JAM", "code", "silent", "programming"],
    category: "programming",
    likelyCauses: [
      "The sequence contains only REST or very short notes.",
      "The instrument name in the sequence does not match the defined instrument.",
      "VOLUME is zero or too low.",
      "BPM or arrangement is missing.",
      "The code has unsupported syntax."
    ],
    checks: [
      "Use one known instrument and one simple note.",
      "Check exact spelling of the instrument name.",
      "Increase VOLUME moderately.",
      "Remove extra layers and test a minimal example.",
      "Check for syntax errors."
    ],
    safeAnswer:
      "Debug one small section at a time instead of changing the whole program."
  }
];

export default troubleshootingKnowledge;
