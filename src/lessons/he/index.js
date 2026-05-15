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
import lesson12 from "./lesson12";
import lesson13 from "./lesson13";
import lesson14 from "./lesson14";
import lesson15 from "./lesson15";
import lesson16 from "./lesson16";
import lesson17 from "./lesson17";
import lesson18 from "./lesson18";
import lesson19 from "./lesson19";
import lesson20 from "./lesson20";
import lesson21 from "./lesson21";
import lesson22 from "./lesson22";

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
];

export const phases = [
  {
    id: 1,
    title: "צלילים ראשונים",
    description: "למדו את הבסיס של צליל ושפת JEM",
    color: "#22d3ee",
    lessons: [lesson01, lesson02, lesson03, lesson04],
  },
  {
    id: 2,
    title: "ביטים ולולאות",
    description: "הוסיפו תופים, תבניות וחזרות למוזיקה",
    color: "#34d399",
    lessons: [lesson05, lesson06, lesson07],
  },
  {
    id: 3,
    title: "ביטוי",
    description: "עצבו צלילים עם מעטפות, אקורדים ודינמיקה",
    color: "#f97316",
    lessons: [lesson08, lesson09, lesson10],
  },
  {
    id: 4,
    title: "אפקטים ומרחב",
    description: "הוסיפו פילטרים, הדים, גלישה וסטריאו",
    color: "#a78bfa",
    lessons: [lesson11, lesson12, lesson13, lesson14],
  },
  {
    id: 5,
    title: "רעד ותנועה",
    description: "הפעילו אוטומציה עם מודולציית LFO",
    color: "#f43f5e",
    lessons: [lesson15, lesson16],
  },
  {
    id: 6,
    title: "מצב מקצועי",
    description: "שלטו בסינתזה מתקדמת, סולמות וגרוב",
    color: "#10b981",
    lessons: [lesson17, lesson18, lesson19, lesson20, lesson22],
  },
  {
    id: 7,
    title: "שלב הבוס",
    description: "בנו שיר שלם עם כל מה שלמדתם",
    color: "#8b5cf6",
    lessons: [lesson21],
  },
];
