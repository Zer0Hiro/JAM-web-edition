// JAMai ידע מקומי: מושגי תכנות בשפת JAM/JEM DSL
// תחום: תכנות ומושגים של מוזיקה בקוד. לשמור מילות מפתח JAM/JEM באנגלית.

export const jamDslKnowledge = [
  {
    id: "jam-structure",
    title: "מבנה נפוץ של קוד JAM",
    tags: ["JAM", "JEM", "DSL", "programming", "structure"],
    level: "beginner",
    summary:
      "תוכנית JAM בנויה בדרך כלל מ-BPM, כלים, sequences או patterns, ו-arrangement.",
    facts: [
      "BPM קובע את הקצב.",
      "INSTRUMENT מגדיר מקור צליל.",
      "TYPE בוחר את סוג הכלי, למשל SYNTH או DRUM.",
      "WAVE בוחר את צורת הגל של הסינתיסייזר.",
      "ADSR שולט בצורה של עוצמת התו לאורך זמן.",
      "VOLUME שולט בעוצמת הקול.",
      "SEQUENCE או PATTERN מגדירים מה מנוגן.",
      "ARRANGE או לוגיקת arrangement קובעים מתי החלקים מנוגנים."
    ],
    studentExplanation:
      "קוד JAM הוא כמו מתכון: קודם מגדירים מהירות, אחר כך יוצרים כלים, ואז כותבים מה הם מנגנים.",
    exampleCode: `BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SQUARE
    ADSR 5 40 180 80
    VOLUME 120

SEQUENCE main:
    lead C4 D4 E4 REST G4`,
    exampleQuestions: [
      "מה עושה BPM?",
      "איפה מגדירים את הצליל?",
      "למה ה-sequence שלי לא מתנגן?"
    ]
  },
  {
    id: "jam-debugging-syntax",
    title: "דיבוג syntax ב-JAM",
    tags: ["JAM", "debugging", "syntax", "programming"],
    level: "beginner",
    summary:
      "רוב הבאגים של מתחילים ב-JAM מגיעים ממילות מפתח שגויות, נקודתיים חסרות, indentation לא נכון, תווים לא תקינים או שימוש בשמות שלא הוגדרו.",
    facts: [
      "שמרו את מילות המפתח של JAM באנגלית.",
      "בדקו ששמות ה-INSTRUMENT תואמים לשמות שבהם משתמשים בהמשך.",
      "בדקו שלכותרת block יש נקודתיים כאשר ה-syntax דורש זאת.",
      "בדקו שהתווים נכתבים עם שמות ואוקטבות תקינים.",
      "בדקו ש-REST נכתב כפקודת מנוחה ולא כתו.",
      "שנו דבר אחד בכל פעם בזמן דיבוג."
    ],
    studentExplanation:
      "כשקוד לא עובד, אל תכתבו הכול מחדש. בדקו שמות, spelling וכל block בנפרד.",
    troubleshootingChecklist: [
      "האם BPM קיים?",
      "האם שם הכלי כתוב בדיוק אותו דבר בכל מקום?",
      "האם ה-waveform תקין?",
      "האם התווים כתובים עם מספרי octave, כמו C4?",
      "האם יש בטעות מילות מפתח שאינן באנגלית בתוך הקוד?"
    ],
    exampleQuestions: [
      "למה קוד JAM שלי לא רץ?",
      "למה הכלי שלי שקט?",
      "איך מדבגים sequence?"
    ]
  },
  {
    id: "jam-pattern-thinking",
    title: "חשיבה בתבניות בקוד מוזיקלי",
    tags: ["JAM", "patterns", "loops", "programming", "composition"],
    level: "beginner",
    summary:
      "Patterns ו-loops עוזרים לבנות מוזיקה ארוכה מרעיונות קטנים שחוזרים על עצמם.",
    facts: [
      "Loop חוזר על רעיון מוזיקלי.",
      "שינוי תו אחד ב-loop יוצר וריאציה.",
      "שכבות של loops יוצרות arrangement מלא יותר.",
      "בס פשוט שחוזר על עצמו יכול לתמוך במלודיה פעילה יותר.",
      "יותר מדי patterns עמוסים יחד יכולים להישמע מבולגנים."
    ],
    studentExplanation:
      "אל תנסו לכתוב את כל השיר בבת אחת. צרו pattern קטן, חזרו עליו, ואז שנו חלקים קטנים.",
    exampleQuestions: [
      "איך יוצרים track ארוך יותר?",
      "איך הופכים loop לפחות משעמם?",
      "איך יוצרים שכבות של צלילים?"
    ]
  },
  {
    id: "jam-code-safety-boundaries",
    title: "גבולות תשובה בקוד",
    tags: ["JAMai", "programming", "answer rules"],
    level: "system",
    summary:
      "כאשר JAMai עונה על שאלות תכנות, הוא לא צריך להמציא syntax שאינו נתמך. עליו להעדיף את ה-syntax שמתועד בידע המקומי של הפרויקט.",
    facts: [
      "אם syntax מסוים לא מופיע בידע המקומי, יש לומר שייתכן שהוא לא נתמך.",
      "שמרו מילות מפתח JAM/JEM DSL באנגלית גם כאשר ההסבר בעברית או ברוסית.",
      "תנו דוגמאות קוד קטנות במקום תוכניות גדולות ולא קשורות.",
      "הסבירו את הטעות ואת התיקון.",
      "לתלמידים, העדיפו דוגמאות ישירות על פני מונחי compiler מופשטים."
    ],
    exampleQuestions: [
      "אפשר להשתמש ב-syntax הזה?",
      "תקן את קוד ה-JAM שלי",
      "למה הקוד הזה נכשל?"
    ]
  }
];

export default jamDslKnowledge;
