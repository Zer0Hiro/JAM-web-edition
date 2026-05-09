const lesson14 = {
  id: 14,
  slug: "echo-and-reverb",
  title: "חדר הדים",
  subtitle: "הוסיפו עומק עם ריוורב ודיליי",
  phase: 5,
  difficulty: 4,
  goal: "השתמשו ב-REVERB וב-DELAY כדי להוסיף מרחב והדים לכלים שלכם.",
  concepts: ["ריוורב", "דיליי/הד", "פידבק", "יבש/רטוב"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "מה זה ריוורב?",
      content: `**ריוורב** מדמה צליל שקופץ מהקירות בחדר. חדר קטן יוצר ריוורב קצר, קתדרלה יוצרת ריוורב ארוך.

ב-JEM, הוסיפו REVERB (0-255) לכלי:

\`\`\`
INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    REVERB 180
    VOLUME 200
\`\`\`

0 = יבש לגמרי (ללא ריוורב), 255 = ריוורב מקסימלי (מערה ענקית).`,
    },
    {
      title: "DELAY יוצר הדים",
      content: `**DELAY** חוזר על הצליל אחרי זמן מוגדר. שולטים בשני דברים:
- **זמן** באלפיות שנייה (כמה זמן עד ההד)
- **פידבק** 0-255 (כמה פעמים חוזר)

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    DELAY 300 150
    VOLUME 180
\`\`\`

הד כל 300ms עם פידבק בינוני. פידבק גבוה = יותר חזרות!`,
    },
    {
      title: "שילוב ריוורב ודיליי",
      content: `אפשר להשתמש בשניהם על אותו כלי לצליל עשיר ומרווח:

\`\`\`
INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    REVERB 120
    DELAY 400 100
    VOLUME 160
\`\`\`

הריוורב מוסיף אווירת חדר בעוד שהדיליי יוצר הדים קצביים. נסו את הקוד ושמעו את ההבדל בין הלידה היבשה לפאד הרטוב!`,
    },
  ],

  code: `# חדר הדים -- אפקטי ריוורב ודיליי
# הוסיפו מרחב והדים לצליל

BPM 100

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    DELAY 300 150
    VOLUME 180

INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    ADSR 200 100 400 300
    REVERB 180
    VOLUME 140

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 240

SEQUENCE lead_melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    REST 0.5
    PLAY lead A4 0.5
    PLAY lead G4 1

SEQUENCE pad_chords:
    PLAY pad [C3 E3 G3] 4

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE lead_melody
        PLAY_SEQUENCE pad_chords
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "long-delay",
      text: "שנו את הדיליי ל-500ms עם פידבק גבוה (220). ספרו את ההדים -- כמה שומעים?",
      hint: "שנו DELAY 300 150 ל-DELAY 500 220 בכלי הלידה.",
    },
    {
      id: "reverb-kick",
      text: "הוסיפו REVERB 100 לקיק. האם תוף עם ריוורב נשמע כאילו הוא בחדר גדול?",
      hint: "הוסיפו שורת REVERB 100 בתוך בלוק ה-INSTRUMENT של הקיק.",
    },
    {
      id: "dry-vs-wet",
      text: "הסירו את כל אפקטי REVERB ו-DELAY. השוו את הגרסה היבשה למקורית -- מה נשמע יותר טוב?",
      hint: "מחקו או סמנו כהערה את שורות REVERB ו-DELAY מכל הכלים.",
    },
  ],

  funFact:
    "הריוורב המלאכותי הראשון נוצר בשנות ה-40 על ידי השמעת מוזיקה דרך רמקול בחדר אמבטיה מרוצף והקלטתה עם מיקרופון! מאוחר יותר, אולפנים השתמשו בלוחות מתכת וקפיצים ליצירת ריוורב.",
};

export default lesson14;
