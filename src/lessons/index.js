import lesson01 from "./lesson01-hello-sound";
import lesson02 from "./lesson02-note-by-note";
import lesson03 from "./lesson03-wave-surfing";
import lesson04 from "./lesson04-tick-tock";
import lesson05 from "./lesson05-beat-drop";
import lesson06 from "./lesson06-loop-it";
import lesson07 from "./lesson07-envelope-shapes";
import lesson08 from "./lesson08-multi-track";
import lesson09 from "./lesson09-mega-riff";

import { lessons as lessonsHe, phases as phasesHe } from "./he";

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
];

export const phases = [
  {
    id: 1,
    title: "Fundamentals",
    description: "Learn the basics of sound and the JAM language",
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
    lessons: [lesson07, lesson08],
  },
  {
    id: 4,
    title: "Full Songs",
    description: "Put it all together into complete compositions",
    color: "#a78bfa",
    lessons: [lesson09],
  },
];

const lessonsByLang = { en: lessons, he: lessonsHe };
const phasesByLang = { en: phases, he: phasesHe };

export function getLessonsForLang(lang) {
  return lessonsByLang[lang] || lessonsByLang.en;
}

export function getPhasesForLang(lang) {
  return phasesByLang[lang] || phasesByLang.en;
}

export function getLessonById(id, lang = "en") {
  const list = getLessonsForLang(lang);
  return list.find((l) => l.id === id);
}

export function getLessonBySlug(slug) {
  return lessons.find((l) => l.slug === slug);
}

export function getNextLesson(currentId, lang = "en") {
  const list = getLessonsForLang(lang);
  const idx = list.findIndex((l) => l.id === currentId);
  return idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;
}

export function getPrevLesson(currentId, lang = "en") {
  const list = getLessonsForLang(lang);
  const idx = list.findIndex((l) => l.id === currentId);
  return idx > 0 ? list[idx - 1] : null;
}
