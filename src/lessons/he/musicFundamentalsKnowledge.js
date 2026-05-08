// JAMai ידע מקומי: יסודות מוזיקה עבור JAM/JEM
// תחום: מושגי מוזיקה שימושיים לאתר לימודי סינתזת צליל לגילאי 13-15.
// לא כולל תוכן על LLM/provider.

export const musicFundamentalsKnowledge = [
  {
    id: "music-basics-sound",
    title: "מהו צליל",
    tags: ["music", "sound", "wave", "frequency", "amplitude"],
    level: "beginner",
    summary:
      "צליל הוא רטט שעובר באוויר. במוזיקה דיגיטלית מתארים צליל בעזרת frequency, amplitude, waveform וזמן.",
    facts: [
      "Frequency שולט בגובה הצליל: frequency גבוה נשמע גבוה יותר, ו-frequency נמוך נשמע עמוק יותר.",
      "Amplitude שולט בעוצמה: amplitude גדול יותר נשמע חזק יותר, ו-amplitude קטן יותר נשמע חלש יותר.",
      "Waveform היא צורת הרטט לאורך זמן.",
      "Note הוא צליל עם pitch ו-duration שנבחרו.",
      "Rest הוא שקט למשך זמן שנבחר."
    ],
    studentExplanation:
      "רמקול זז קדימה ואחורה מהר מאוד. התנועה הזאת דוחפת אוויר ויוצרת צליל. כשהתנועה חוזרת מהר יותר, התו נשמע גבוה יותר.",
    exampleQuestions: [
      "למה frequency גבוה נשמע גבוה יותר?",
      "מה ההבדל בין pitch ל-volume?",
      "מה זה rest בקוד מוזיקלי?"
    ]
  },
  {
    id: "music-basics-frequency-notes",
    title: "Frequency ותווים מוזיקליים",
    tags: ["music", "frequency", "notes", "pitch", "A4"],
    level: "beginner",
    summary:
      "אפשר לייצג תווים מוזיקליים כ-frequency. A4 מכוון בדרך כלל ל-440 Hz, וכל octave מכפיל או מחלק את ה-frequency בשניים.",
    facts: [
      "A4 הוא בדרך כלל 440 Hz.",
      "Octave אחד למעלה פירושו הכפלת ה-frequency.",
      "Octave אחד למטה פירושו חצי מה-frequency.",
      "אם A4 הוא 440 Hz, אז A5 הוא 880 Hz ו-A3 הוא 220 Hz.",
      "בכוונון equal temperament, semitones סמוכים מופרדים באותו יחס frequency."
    ],
    studentExplanation:
      "חשבו על octaves כמו אותה משפחת תווים בגבהים שונים. A5 הוא עדיין A, אבל הוא רוטט פי שניים מהר יותר מ-A4.",
    exampleQuestions: [
      "למה A5 נשמע כמו A גבוה יותר?",
      "איך תווים הופכים למספרים בקוד?",
      "למה הכפלת frequency יוצרת octave?"
    ]
  },
  {
    id: "music-basics-rhythm",
    title: "Rhythm, BPM ותזמון",
    tags: ["music", "rhythm", "BPM", "tempo", "timing"],
    level: "beginner",
    summary:
      "Rhythm הוא תבנית התזמון של צלילים ושקטים. BPM פירושו beats per minute והוא שולט במהירות המוזיקה.",
    facts: [
      "BPM פירושו beats per minute.",
      "BPM גבוה יותר אומר מוזיקה מהירה יותר.",
      "BPM נמוך יותר אומר מוזיקה איטית יותר.",
      "ב-120 BPM, beat אחד נמשך 0.5 שניות.",
      "Rhythm נוצר על ידי מיקום notes ו-rests על רשת זמן."
    ],
    studentExplanation:
      "BPM הוא כמו הגדרת המהירות של השיר. ב-120 BPM, הקצב יציב וקל לספירה: שני beats בשנייה.",
    exampleQuestions: [
      "מה אומר BPM?",
      "למה 160 BPM נשמע מהיר יותר מ-90 BPM?",
      "איך rests יוצרים rhythm?"
    ]
  },
  {
    id: "music-basics-melody-harmony-bass",
    title: "Melody, harmony ו-bass",
    tags: ["music", "melody", "harmony", "bass", "chords"],
    level: "beginner",
    summary:
      "Melody היא המנגינה המרכזית, harmony תומכת בה עם תווים נוספים, ו-bass נותן למוזיקה בסיס נמוך.",
    facts: [
      "Melody היא בדרך כלל החלק שאנשים זוכרים או שרים.",
      "Bass משתמש בתווים נמוכים ולעיתים קרובות חוזר על groove.",
      "Harmony פירושה תווים שנשמעים יחד או תומכים במלודיה.",
      "Chord הוא כמה תווים שמנוגנים יחד.",
      "שכבות של melody, bass ו-rhythm יוצרות track מלא יותר."
    ],
    studentExplanation:
      "אפשר לבנות שיר כמו שכבות: drums שומרים על זמן, bass נותן משקל, melody מספרת את הסיפור המרכזי, ו-chords מוסיפים צבע.",
    exampleQuestions: [
      "מה ההבדל בין melody ל-bass?",
      "למה chords גורמים לצליל להישמע מלא יותר?",
      "איך להפוך את ה-JAM track שלי לפחות ריק?"
    ]
  }
];

export default musicFundamentalsKnowledge;
