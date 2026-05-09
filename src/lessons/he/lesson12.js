const lesson12 = {
  id: 12,
  slug: "velocity-dynamics",
  title: "חזק ושקט",
  subtitle: "שליטה בעוצמת כל תו",
  phase: 3,
  difficulty: 3,
  goal: "השתמשו ב-velocity כדי להפוך תווים מסוימים לחזקים ואחרים לשקטים -- להוסיף דינמיקה למוזיקה!",
  concepts: ["עוצמת תו", "דינמיקה", "ביטוי מוזיקלי"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "מה זה velocity?",
      content: `במוזיקה אמיתית, מקש פסנתר שנלחץ בחוזקה נשמע **חזק**, ולחיצה עדינה נשמעת **שקט**. זה נקרא **velocity** (מהירות).

ב-JEM, אפשר להוסיף מספר velocity (0-255) אחרי משך התו:

\`\`\`
PLAY lead C4 1 200    # חזק
PLAY lead E4 1 80     # שקט
\`\`\`

255 = עוצמה מקסימלית, 0 = שקט מוחלט. אם לא כותבים, הכלי מנגן בעוצמה מלאה.`,
    },
    {
      title: "יצירת קרשנדו",
      content: `קרשנדו פירושו להתחזק עם הזמן. שימו לב למספרי ה-velocity שגדלים:

\`\`\`
PLAY lead C4 0.5 60
PLAY lead D4 0.5 100
PLAY lead E4 0.5 160
PLAY lead F4 0.5 220
\`\`\`

כל תו חזק יותר מהקודם -- כמו ללכת לכיוון הרמקול!`,
    },
    {
      title: "הדגשת ביטים",
      content: `גם בתבניות תופים אפשר להדגיש ביטים מסוימים:

\`\`\`
BEAT 1: kick 220
BEAT 2: hat 100
BEAT 3: kick 180
BEAT 4: hat 80
\`\`\`

הקיקים מכים חזק יותר מהיי-האטים, ונותנים לביט גרוב. נסו לשנות את המספרים ולשמוע את ההבדל!`,
    },
  ],

  code: `# חזק ושקט -- דינמיקת Velocity
# הוסיפו מספר אחרי משך התו כדי לשלוט בעוצמה

BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 30 200 100
    VOLUME 200

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 30
    VOLUME 180

SEQUENCE melody:
    PLAY lead C4 0.5 60
    PLAY lead D4 0.5 100
    PLAY lead E4 0.5 160
    PLAY lead G4 0.5 220
    PLAY lead E4 0.5 180
    PLAY lead D4 0.5 120
    PLAY lead C4 1 200

PATTERN beat:
    BEAT 1: kick 220
    BEAT 2: hat 100
    BEAT 3: kick 180
    BEAT 4: hat 80

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "decrescendo",
      text: "הפכו את עוצמות המנגינה כדי ליצור דקרשנדו (להחליש). התחילו ב-220 וסיימו ב-60.",
      hint: "שנו את מספרי ה-velocity כך שיקטנו: 220, 180, 160, 120, 100, 80, 60.",
    },
    {
      id: "ghost-notes",
      text: "הוסיפו 'תווי רפאים' -- יי-האט שקטים מאוד (velocity 40) בביטים 1.5, 2.5, 3.5, 4.5.",
      hint: "הוסיפו BEAT 1.5: hat 40, BEAT 2.5: hat 40 וכו' לתבנית.",
    },
    {
      id: "velocity-chord",
      text: "נסו להוסיף velocity לאקורד: PLAY lead [C4 E4 G4] 2 150. האם זה עובד?",
      hint: "הוסיפו PLAY עם אקורד ו-velocity בסוף. כל האקורד מנגן באותה עוצמה.",
    },
  ],

  funFact:
    "בפסנתר אמיתי, velocity פירושו כמה מהר הפטיש פוגע במיתר. מקלדות MIDI מודדות זאת כ-0-127 -- JEM משתמש ב-0-255 לשליטה מדויקת יותר!",
};

export default lesson12;
