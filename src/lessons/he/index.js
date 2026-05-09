import lesson01 from "./lesson01";
import lesson02 from "./lesson02";
import lesson03 from "./lesson03";
import lesson04 from "./lesson04";
import lesson05 from "./lesson05";
import lesson06 from "./lesson06";
import lesson07 from "./lesson07";
import lesson08 from "./lesson08";
import lesson09 from "./lesson09";
import lesson10 from "./lesson10";
import lesson11 from "./lesson11";

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
];

export const phases = [
  {
    id: 1,
    title: "יסודות",
    description: "למדו את הבסיס של צליל ושפת JEM",
    color: "#22d3ee",
    lessons: [lesson01, lesson02, lesson03],
  },
  {
    id: 2,
    title: "קצב ותזמון",
    description: "הוסיפו ביטים, תופים ולולאות למוזיקה",
    color: "#34d399",
    lessons: [lesson04, lesson05, lesson06],
  },
  {
    id: 3,
    title: "ביטוי",
    description: "עצבו את הצלילים ושלבו כלי נגינה",
    color: "#f97316",
    lessons: [lesson07, lesson08, lesson10, lesson11],
  },
  {
    id: 4,
    title: "שירים שלמים",
    description: "שלבו הכל יחד ליצירות מושלמות",
    color: "#a78bfa",
    lessons: [lesson09],
  },
];
