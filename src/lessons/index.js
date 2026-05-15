// Lessons index
import lesson01 from "./lesson01-hello-sound";
import lesson02 from "./lesson02-note-explorer";
import lesson03 from "./lesson03-wave-lab";
import lesson04 from "./lesson04-silence-is-golden";
import lesson05 from "./lesson05-beat-drop";
import lesson06 from "./lesson06-loop-machine";
import lesson07 from "./lesson07-band-mode";
import lesson08 from "./lesson08-sound-shapes";
import lesson09 from "./lesson09-power-chords";
import lesson10 from "./lesson10-dynamics";
import lesson11 from "./lesson11-filter-magic";
import lesson12 from "./lesson12-echo-chamber";
import lesson13 from "./lesson13-smooth-glide";
import lesson14 from "./lesson14-stereo-space";
import lesson15 from "./lesson15-wobble-and-shake";
import lesson16 from "./lesson16-sweep-and-spin";
import lesson17 from "./lesson17-pluck-it";
import lesson18 from "./lesson18-fat-sounds";
import lesson19 from "./lesson19-musical-keys";
import lesson20 from "./lesson20-get-groovy";
import lesson21 from "./lesson21-song-craft";
import lesson22 from "./lesson22-handpan-bells";
import lesson23 from "./lesson23-bell-and-time";
import lesson24 from "./lesson24-legato-and-polyphony";
import lesson25 from "./lesson25-reverb-and-ramp";
import { lessons as lessonsHe, phases as phasesHe } from "./he/index";

// JAMai local knowledge index
// Scope: music, programming, and electronics.
// No LLM/provider material.
import musicFundamentalsKnowledge from "./musicFundamentalsKnowledge.js";
import synthesisKnowledge from "./synthesisKnowledge.js";
import jamDslKnowledge from "./jamDslKnowledge.js";
import electronicsEsp32Knowledge from "./electronicsEsp32Knowledge.js";
import troubleshootingKnowledge from "./troubleshootingKnowledge.js";
import studentAnswerRulesKnowledge from "./studentAnswerRulesKnowledge.js";

export const lessons = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lesson08,
  lesson09,
  lesson10,
  lesson11,
  lesson12,
  lesson13,
  lesson14,
  lesson15,
  lesson16,
  lesson17,
  lesson18,
  lesson19,
  lesson20,
  lesson21,
  lesson22,
  lesson23,
  lesson24,
  lesson25,
];

export const phases = [
  {
    id: 1,
    title: "First Sounds",
    description: "Learn the basics of sound and the JEM language",
    color: "#22d3ee",
    lessons: [lesson01, lesson02, lesson03, lesson04],
  },
  {
    id: 2,
    title: "Beats & Loops",
    description: "Add drums, patterns, and repetition to your music",
    color: "#34d399",
    lessons: [lesson05, lesson06, lesson07],
  },
  {
    id: 3,
    title: "Expression",
    description: "Shape your sounds with envelopes, chords, and dynamics",
    color: "#f97316",
    lessons: [lesson08, lesson09, lesson10],
  },
  {
    id: 4,
    title: "Effects & Space",
    description: "Add filters, echoes, glide, and stereo to your music",
    color: "#a78bfa",
    lessons: [lesson11, lesson12, lesson13, lesson14],
  },
  {
    id: 5,
    title: "Wobble & Motion",
    description: "Automate your sounds with LFO modulation",
    color: "#f43f5e",
    lessons: [lesson15, lesson16],
  },
  {
    id: 6,
    title: "Pro Mode",
    description: "Master advanced synthesis, scales, and groove",
    color: "#10b981",
    lessons: [lesson17, lesson18, lesson19, lesson20, lesson22, lesson23, lesson24, lesson25],
  },
  {
    id: 7,
    title: "Boss Level",
    description: "Build a complete song with everything you've learned",
    color: "#8b5cf6",
    lessons: [lesson21],
  },
];

const lessonsByLang = {
  en: lessons,
  he: lessonsHe,
};

const phasesByLang = {
  en: phases,
  he: phasesHe,
};

export function getLessonsForLang(lang) {
  return lessonsByLang[lang] || lessonsByLang.en;
}

export function getPhasesForLang(lang) {
  return phasesByLang[lang] || phasesByLang.en;
}

export function getLessonBySlug(slug, lang = "en") {
  return getLessonsForLang(lang).find((lesson) => lesson.slug === slug);
}

export function getLessonById(id, lang = "en") {
  return getLessonsForLang(lang).find((lesson) => lesson.id === id);
}

export function getNextLesson(currentId, lang = "en") {
  const list = getLessonsForLang(lang);
  const currentIndex = list.findIndex((lesson) => lesson.id === currentId);

  return currentIndex >= 0 && currentIndex < list.length - 1
    ? list[currentIndex + 1]
    : null;
}

export function getPrevLesson(currentId, lang = "en") {
  const list = getLessonsForLang(lang);
  const currentIndex = list.findIndex((lesson) => lesson.id === currentId);

  return currentIndex > 0 ? list[currentIndex - 1] : null;
}

export const jamaiLocalKnowledge = {
  musicFundamentalsKnowledge,
  synthesisKnowledge,
  jamDslKnowledge,
  electronicsEsp32Knowledge,
  troubleshootingKnowledge,
  studentAnswerRulesKnowledge,
};

export const jamaiKnowledgeChunks = [
  ...musicFundamentalsKnowledge,
  ...synthesisKnowledge,
  ...jamDslKnowledge,
  ...electronicsEsp32Knowledge,
  ...troubleshootingKnowledge,
];

export default lessons;