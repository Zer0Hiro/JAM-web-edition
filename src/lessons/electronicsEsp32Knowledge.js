// JAMai local knowledge: ESP32 electronics for the Build Guides
// Scope: breadboard, pins, potentiometer, buttons, speaker, safe checks.
// Important: do not invent extra wiring. Use this as source-of-truth for guide answers.

export const electronicsEsp32Knowledge = [
  {
    id: "build-guide-parts",
    title: "Sound control build guide: required parts",
    tags: ["build guide", "ESP32", "parts", "electronics", "breadboard"],
    level: "beginner",
    summary:
      "The sound control build uses an ESP32, a potentiometer, two buttons, a speaker, female-to-male jumper wires, and a large breadboard.",
    parts: [
      "ESP32 controller board, outside the breadboard",
      "Potentiometer / variable resistor",
      "2 push buttons",
      "Speaker",
      "Female-to-male jumper wires",
      "Large breadboard"
    ],
    studentExplanation:
      "The ESP32 is the brain. The potentiometer changes a value smoothly. The buttons send simple on/off commands. The speaker plays the sound.",
    exampleQuestions: [
      "What parts do I need?",
      "What does the potentiometer do?",
      "Why is the ESP32 outside the breadboard?"
    ]
  },
  {
    id: "build-guide-layout",
    title: "Breadboard layout",
    tags: ["build guide", "breadboard", "layout", "electronics"],
    level: "beginner",
    summary:
      "The guide places the potentiometer on the left, two buttons in the center across the breadboard groove, and speaker wires on the right.",
    steps: [
      "Place the potentiometer on the left side of the breadboard.",
      "Place the two buttons in the center, each across the middle separating groove.",
      "Place the two speaker wires on the right side, each wire in a separate column."
    ],
    studentExplanation:
      "The layout keeps the circuit readable: input knob on the left, buttons in the middle, speaker output on the right.",
    exampleQuestions: [
      "Where do I place the buttons?",
      "Where should the speaker wires go?",
      "How do I organize the breadboard?"
    ]
  },
  {
    id: "build-guide-power-rails",
    title: "Power rails: 3.3V and GND",
    tags: ["build guide", "power", "3.3V", "GND", "breadboard"],
    level: "beginner",
    summary:
      "The blue rail is used for GND and the red rail is used for 3.3V.",
    wiring: [
      "Connect ESP32 GND to the long blue rail on the breadboard.",
      "Connect ESP32 3.3V to the long red rail on the breadboard."
    ],
    safety:
      "Before connecting the ESP32 to the computer, check that 3.3V and GND are not accidentally connected together.",
    studentExplanation:
      "The side rails are like shared roads. Instead of running many wires back to the ESP32, parts can connect to the red 3.3V rail and blue GND rail.",
    exampleQuestions: [
      "What is the blue rail?",
      "What is the red rail?",
      "Why do we create power rails?"
    ]
  },
  {
    id: "build-guide-potentiometer",
    title: "Potentiometer wiring",
    tags: ["build guide", "potentiometer", "GPIO34", "ADC", "analog input"],
    level: "beginner",
    summary:
      "The potentiometer has three legs. In this guide: left leg to 3.3V, right leg to GND, middle leg to GPIO34.",
    wiring: [
      "Left leg -> red rail / 3.3V",
      "Right leg -> blue rail / GND",
      "Middle leg -> ESP32 GPIO34"
    ],
    technicalFacts: [
      "GPIO34 is an ADC1-capable input pin on ESP32.",
      "GPIO34 is input-only, so it is suitable for reading a potentiometer but not for driving output."
    ],
    studentExplanation:
      "The potentiometer works like a knob. The middle leg sends a changing voltage to GPIO34, and the ESP32 reads that value.",
    troubleshooting: [
      "If the knob does nothing, check that the middle leg goes to GPIO34.",
      "Check that the side legs go to 3.3V and GND.",
      "Check that the potentiometer is seated correctly in the breadboard."
    ],
    exampleQuestions: [
      "How do I connect the potentiometer?",
      "Why use GPIO34 for the knob?",
      "Why does the potentiometer not change the sound?"
    ]
  },
  {
    id: "build-guide-buttons",
    title: "Button wiring",
    tags: ["build guide", "buttons", "GPIO12", "GPIO14", "digital input", "GND"],
    level: "beginner",
    summary:
      "Button A connects to GPIO12 and GND. Button B connects to GPIO14 and GND.",
    wiring: [
      "Button A: one side -> GPIO12, opposite side -> blue rail / GND",
      "Button B: one side -> GPIO14, opposite side -> blue rail / GND"
    ],
    studentExplanation:
      "A button is a simple switch. When pressed, it connects the GPIO side to ground. The program can detect that change.",
    troubleshooting: [
      "If a button does not respond, check that it crosses the breadboard center groove.",
      "Check that one side goes to the correct GPIO pin.",
      "Check that the opposite side goes to GND.",
      "Check that Button A and Button B are not accidentally connected to each other."
    ],
    exampleQuestions: [
      "Which GPIO pins do the buttons use?",
      "Why must the button cross the breadboard groove?",
      "Why does my button not work?"
    ]
  },
  {
    id: "build-guide-speaker",
    title: "Speaker wiring",
    tags: ["build guide", "speaker", "GPIO25", "GPIO26", "DAC", "audio output"],
    level: "beginner",
    summary:
      "The guide connects the speaker wires to GPIO25 and GPIO26 as a simple speaker connection model.",
    wiring: [
      "Speaker wire 1 column -> ESP32 GPIO25",
      "Speaker wire 2 column -> ESP32 GPIO26"
    ],
    technicalFacts: [
      "ESP32 has DAC channels on GPIO25 and GPIO26.",
      "GPIO25 is DAC channel 1 and GPIO26 is DAC channel 2 on ESP32."
    ],
    safety:
      "Use only the wiring shown in the guide. Do not connect speaker wires to random pins.",
    studentExplanation:
      "The speaker is the output. The ESP32 changes the signal on the audio pins, and the speaker turns that signal into sound.",
    troubleshooting: [
      "If there is no sound, check GPIO25 and GPIO26.",
      "Check that the two speaker wires are in separate columns.",
      "Check that the speaker wires are not touching each other.",
      "Check that the code is running and the ESP32 is connected."
    ],
    exampleQuestions: [
      "How do I connect the speaker?",
      "Why use GPIO25 and GPIO26?",
      "Why is there no sound?"
    ]
  },
  {
    id: "build-guide-final-check",
    title: "Final wiring check",
    tags: ["build guide", "safety", "checklist", "electronics"],
    level: "beginner",
    summary:
      "Before running the code, verify ground, power, speaker wires, button wires, and ESP32 connection.",
    checklist: [
      "All parts that need GND are connected to the blue rail.",
      "The red rail is connected to 3.3V, not to GND.",
      "Speaker wires are not touching each other.",
      "Button wires are not touching each other.",
      "The potentiometer middle leg goes to GPIO34.",
      "Button A goes to GPIO12.",
      "Button B goes to GPIO14.",
      "Speaker wires go to GPIO25 and GPIO26.",
      "ESP32 is connected to the computer only after checking the wiring."
    ],
    studentExplanation:
      "Most circuit problems are simple wiring problems. Check slowly before powering the board.",
    exampleQuestions: [
      "What should I check before powering the ESP32?",
      "How do I know if my wiring is safe?",
      "What are the common mistakes?"
    ]
  }
];

export default electronicsEsp32Knowledge;
