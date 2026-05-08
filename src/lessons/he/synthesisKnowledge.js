// JAMai ידע מקומי: סינתזת צליל
// תחום: waveforms, envelopes, timbre ומושגי synth פשוטים עבור JAM/JEM.

export const synthesisKnowledge = [
  {
    id: "synthesis-waveforms",
    title: "Waveforms בסיסיים",
    tags: ["synthesis", "waveform", "sine", "square", "saw", "triangle", "noise"],
    level: "beginner",
    summary:
      "ל-waveforms שונים יש צבעי צליל שונים. ב-synth, שינוי ה-waveform משנה את האופי של הצליל.",
    facts: [
      "SINE נשמע חלק ונקי.",
      "SQUARE נשמע חלול, מזמזם או retro.",
      "SAW נשמע בהיר ועשיר.",
      "TRIANGLE נשמע רך יותר מ-square או saw.",
      "NOISE הוא אקראי ושימושי לתופים, אפקטים וכלי הקשה."
    ],
    studentExplanation:
      "Waveform היא הצורה הבסיסית של הצליל. אותו תו, אותו volume, אבל waveform שונה: אופי שונה.",
    jamExamples: [
      "WAVE SINE",
      "WAVE SQUARE",
      "WAVE SAW",
      "WAVE TRIANGLE"
    ],
    exampleQuestions: [
      "איזה waveform הכי טוב ל-bass?",
      "למה saw נשמע בהיר יותר מ-sine?",
      "איך עושים צליל retro game?"
    ]
  },
  {
    id: "synthesis-adsr",
    title: "ADSR envelope",
    tags: ["synthesis", "ADSR", "attack", "decay", "sustain", "release", "envelope"],
    level: "beginner",
    summary:
      "ADSR שולט באופן שבו עוצמת התו משתנה לאורך זמן: Attack, Decay, Sustain, Release.",
    facts: [
      "Attack: כמה מהר הצליל מתחיל.",
      "Decay: כמה מהר הצליל יורד אחרי שיא ה-attack.",
      "Sustain: הרמה שנשמרת בזמן שהתו ממשיך.",
      "Release: כמה זמן הצליל דועך אחרי שהתווים מסתיימים.",
      "Attack קצר יוצר התחלה חדה; attack ארוך יוצר fade-in."
    ],
    studentExplanation:
      "ADSR הוא כמו הצורה של ה-volume של הצליל. הוא קובע אם תו מתחיל בחדות, נכנס לאט, נחתך מהר או ממשיך להדהד.",
    jamExamples: [
      "ADSR 5 40 200 100",
      "ADSR 80 120 160 300"
    ],
    exampleQuestions: [
      "מה ADSR עושה?",
      "איך עושים צליל pluck?",
      "איך עושים צליל רך כמו pad?"
    ]
  },
  {
    id: "synthesis-volume-clipping",
    title: "Volume ו-clipping",
    tags: ["synthesis", "volume", "clipping", "distortion", "mixing"],
    level: "beginner",
    summary:
      "כאשר יותר מדי צלילים חזקים מנוגנים באותו זמן, הפלט יכול להגיע ל-clipping ולהישמע מעוות.",
    facts: [
      "Volume שולט בעוצמת הצליל.",
      "כמה כלים שמנגנים יחד יכולים להצטבר ולהיות חזקים מדי.",
      "Clipping קורה כאשר אות נדחף מעבר לטווח הפלט.",
      "הורדת volume של כלים בודדים יכולה להפוך את כל ה-mix לנקי יותר.",
      "צליל חזק הוא לא תמיד צליל טוב יותר."
    ],
    studentExplanation:
      "אם כל כלי נמצא על מקסימום, ה-mix יכול להפוך למבולגן. הורדת volume יכולה להפוך את המוזיקה לברורה יותר.",
    exampleQuestions: [
      "למה הצליל שלי מקרטע?",
      "למה הרמקול רועש כשכמה tracks מנגנים?",
      "איך עושים mix נקי יותר?"
    ]
  },
  {
    id: "synthesis-drums",
    title: "תופים סינתטיים",
    tags: ["synthesis", "drums", "kick", "snare", "hat", "noise"],
    level: "beginner",
    summary:
      "אפשר ליצור צלילי תופים עם envelopes קצרים, noise ושינויי pitch.",
    facts: [
      "Kick הוא בדרך כלל נמוך וקצר.",
      "Snare משתמש לעיתים קרובות ב-noise וב-envelope חד.",
      "Hi-hat הוא בדרך כלל קצר מאוד ורועש.",
      "Release קצר הופך percussion למהודק יותר.",
      "Drum patterns יוצרים groove באמצעות hits ו-rests שחוזרים על עצמם."
    ],
    studentExplanation:
      "תופים בקוד הם לא תמיד הקלטות. הם יכולים להיות צלילי synth קטנים שמעוצבים כדי להרגיש כמו מכות.",
    exampleQuestions: [
      "איך עושים kick חזק יותר?",
      "למה noise עובד טוב לתופים?",
      "איך עושים hi-hat קצר יותר?"
    ]
  }
];

export default synthesisKnowledge;
