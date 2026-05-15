const lesson10 = {
  id: 10,
  slug: "dynamics",
  title: "דינמיקה",
  subtitle: "שלטו בעוצמה של כל תו",
  phase: 3,
  difficulty: 2,
  goal: "השתמשו ב-velocity וב-VELOCITY_CURVE כדי ליצור מוזיקה שנושמת ובונה עוצמה.",
  concepts: ["velocity לכל תו", "קרשנדו", "דקרשנדו", "VELOCITY_CURVE"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "מה זה velocity?",
      content: `דמיינו לחיצה עדינה על מקש פסנתר לעומת חבטה חזקה. אותו תו, אבל עוצמה שונה לגמרי. זה **velocity**.

ב-JEM, velocity הוא המספר אחרי משך התו:

\`\`\`
PLAY lead C4 1 200
\`\`\`

ה-\`200\` הזה הוא ה-velocity. הטווח הוא 0 (שקט) עד 255 (מלוא העוצמה). אם לא כותבים אותו, JEM מנגן בווליום מלא.

\`PLAY lead C4 1 50\` = לחישה שקטה. \`PLAY lead C4 1 200\` = חזק ובטוח.`,
    },
    {
      title: "קרשנדו ביד",
      content: `**קרשנדו** הוא כשהמוזיקה נהיית חזקה יותר עם הזמן. כמו ללכת לכיוון רמקול.

אפשר לכתוב את זה ידנית על ידי העלאת ה-velocity בכל תו:

\`\`\`
PLAY lead C4 1 60
PLAY lead D4 1 100
PLAY lead E4 1 160
PLAY lead F4 1 220
\`\`\`

כל תו חזק יותר מהקודם. המוזיקה בונה ונהיית יותר אינטנסיבית. ככה יוצרים מתח והתרגשות!`,
    },
    {
      title: "VELOCITY_CURVE -- מצב אוטומטי",
      content: `לכתוב velocity ביד עובד, אבל זה מעייף לקטעים ארוכים. VELOCITY_CURVE עושה את זה אוטומטית:

\`\`\`
VELOCITY_CURVE CRESCENDO 40 230 6
\`\`\`

זה פורס את העוצמות מ-40 עד 230 על פני 6 התווים הבאים. בלי מספרים ידניים -- JEM מחשב כל צעד בשבילכם.

אחרי 6 תווים, ה-velocity נשאר על הערך הסופי (230). זה כמו לקבוע רמפת ווליום ולתת ל-JEM לטפל בחשבון.`,
    },
    {
      title: "דקרשנדו ו-OFF",
      content: `להשקיט זה חזק באותה מידה. השתמשו ב-DECRESCENDO:

\`\`\`
VELOCITY_CURVE DECRESCENDO 200 60 4
\`\`\`

זה דועך מחזק (200) לשקט (60) על פני 4 תווים. כמו צליל שמתרחק.

רוצים לעצור את העקומה מוקדם? השתמשו ב:
\`\`\`
VELOCITY_CURVE OFF
\`\`\`

אפשר גם לדרוס תווים ספציפיים על ידי הוספת velocity מפורש -- העקומה מדלגת על התו הזה וממשיכה.`,
    },
  ],

  code: `# Dynamics
# בניית עוצמה עם velocity

BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 60 200 80
    VOLUME 200

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 60
    DECAY 80
    VOLUME 255

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 30
    VOLUME 140

SEQUENCE manual_build:
    PLAY lead C4 1 60
    PLAY lead D4 1 100
    PLAY lead E4 1 140
    PLAY lead F4 1 180
    PLAY lead G4 1 220
    REST 1

SEQUENCE auto_build:
    VELOCITY_CURVE CRESCENDO 40 230 6
    PLAY lead C4 0.5
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead C5 0.5
    PLAY lead E5 0.5
    PLAY lead G5 0.5
    VELOCITY_CURVE OFF
    REST 1

PATTERN beat:
    BEAT 1: kick
    BEAT 2: hat 0.5 100
    BEAT 2.5: hat 0.5 60
    BEAT 3: kick
    BEAT 4: hat 0.5 100
    BEAT 4.5: hat 0.5 60

LOOP 2:
    PLAY_SEQUENCE manual_build
LOOP 2:
    PLAY_SEQUENCE auto_build
    PLAY_PATTERN beat`,

  challenges: [
    {
      id: "decrescendo",
      text: "הפכו את הוולוסיטי של manual_build: התחילו ב-220 ורדו עד 60. איך מצב הרוח משתנה?",
      hint: "מחזק לשקט יוצר אפקט של דעיכה והרגעה. כמו צעדים שמתרחקים מכם.",
    },
    {
      id: "ghost-notes",
      text: "הוסיפו מכות hat בביטים 1.5 ו-3.5 עם velocity נמוך מאוד (40). המכות השקטות האלה נקראות \"ghost notes\" ומוסיפות גרוב עדין.",
      hint: "הוסיפו שורות כמו BEAT 1.5: hat 0.5 40 לתבנית. Ghost notes כמעט מוסתרים אבל הם גורמים לביט להרגיש יותר חי.",
    },
    {
      id: "auto-decrescendo",
      text: "שנו VELOCITY_CURVE CRESCENDO ל-VELOCITY_CURVE DECRESCENDO 230 40 6. הארפג'יו דועך במקום לבנות.",
      hint: "DECRESCENDO הולך מחזק לשקט. אותו תחביר, כיוון הפוך. נסו ותשמעו את התווים נמסים.",
    },
  ],

  funFact:
    "בפסנתר אמיתי, \"velocity\" פירושו כמה מהר הפטיש מכה במיתר. מקלדות MIDI מודדות את זה בערכים 0-127. JEM משתמש ב-0-255 לדיוק גבוה יותר, אז יש לכם פי שניים שליטה על כמה חזק כל תו מכה.",
};

export default lesson10;
