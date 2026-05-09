// Lessons index
import lesson01 from "./lesson01-hello-sound";
import lesson02 from "./lesson02-note-by-note";
import lesson03 from "./lesson03-wave-surfing";
import lesson04 from "./lesson04-tick-tock";
import lesson05 from "./lesson05-beat-drop";
import lesson06 from "./lesson06-loop-it";
import lesson07 from "./lesson07-envelope-shapes";
import lesson08 from "./lesson08-multi-track";
import lesson09 from "./lesson09-mega-riff";
import lesson10 from "./lesson10-chords";
import lesson11 from "./lesson11-play-together";
import lesson12 from "./lesson12-velocity-dynamics";
import lesson13 from "./lesson13-filter-sweep";
import lesson14 from "./lesson14-echo-and-reverb";
import lesson15 from "./lesson15-smooth-glide";
import lesson16 from "./lesson16-stereo-space";
import lesson17 from "./lesson17-live-automation";
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
];

export const phases = [
  {
    id: 1,
    title: "Fundamentals",
    description: "Learn the basics of sound and the JEM language",
    color: "#22d3ee",
    lessons: [lesson01, lesson02, lesson03],
  },
  {
    id: 2,
    title: "Rhythm & Timing",
    description: "Add beats, drums, and loops to your music",
    color: "#34d399",
    lessons: [lesson04, lesson05, lesson06],
  },
  {
    id: 3,
    title: "Expression",
    description: "Shape your sounds and layer instruments",
    color: "#f97316",
    lessons: [lesson07, lesson08, lesson10, lesson11, lesson12, lesson13],
  },
  {
    id: 4,
    title: "Full Songs",
    description: "Put it all together into complete compositions",
    color: "#a78bfa",
    lessons: [lesson09],
  },
  {
    id: 5,
    title: "Sound Design",
    description: "Add effects, space, and movement to your music",
    color: "#f43f5e",
    lessons: [lesson14, lesson15, lesson16, lesson17],
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