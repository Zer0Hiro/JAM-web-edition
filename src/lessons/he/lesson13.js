const lesson13 = {
  id: 13,
  slug: "smooth-glide",
  title: "גלישה חלקה",
  subtitle: "החליקו בין תווים כמו כיפוף מיתר בגיטרה",
  phase: 4,
  difficulty: 3,
  goal: "השתמשו ב-GLIDE (פורטמנטו) כדי שתווים יחליקו בצורה חלקה אחד לשני במקום לקפוץ.",
  concepts: ["פורטמנטו", "GLIDE", "החלקת גובה צליל"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "מה זה גלייד?",
      content: `בדרך כלל כש-JEM עובר מתו לתו, גובה הצליל קופץ מיידית. C4 -- חתך -- E4 -- חתך -- G4. נקי ומדויק.

**GLIDE** משנה את זה. במקום לקפוץ, גובה הצליל **מחליק** בצורה חלקה מתו לתו. כמו לכופף מיתר בגיטרה, או זמר שגולש בין תווים. השם הטכני הוא **פורטמנטו**.`,
    },
    {
      title: "מהיר מול איטי",
      content: `GLIDE מקבל מספר באלפיות שנייה -- כמה זמן ההחלקה לוקחת:

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    GLIDE 150
    VOLUME 200
\`\`\`

- **GLIDE 50** = החלקה מהירה, בקושי מורגשת
- **GLIDE 150** = החלקה בינונית, חלקה ומוזיקלית
- **GLIDE 500** = החלקה דרמטית איטית, כמו סירנה
- **GLIDE 0** = בלי החלקה בכלל (ברירת מחדל)

ההחלקה קורית בתחילת כל תו חדש. ככל שזמן ה-GLIDE ארוך יותר, לוקח יותר זמן להגיע לגובה הצליל היעד.`,
    },
    {
      title: "מרווחים גדולים נשמעים דרמטיים",
      content: `גלייד נשמע שונה בהתאם לכמה רחוקים התווים אחד מהשני.

**צעד קטן** (C4 ל-D4): עדין, כמעט כמו ויברטו. בקושי שמים לב.

**קפיצה גדולה** (C3 ל-C5): סוויפ דרמטי על פני שני אוקטבות שלמות. אי אפשר לפספס!

נסו את שניהם בקוד. מרווחים רחבים עם גלייד איטי = מקסימום דרמה.`,
    },
  ],

  code: `# גלישה חלקה
# תווים מחליקים אחד לשני עם GLIDE

BPM 100

INSTRUMENT slide_lead:
    TYPE SYNTH
    WAVE SAW
    GLIDE 150
    ADSR 10 30 200 100
    VOLUME 200

INSTRUMENT bass:
    TYPE SYNTH
    WAVE TRIANGLE
    GLIDE 80
    ADSR 5 40 300 120
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

SEQUENCE melody:
    PLAY slide_lead C4 1
    PLAY slide_lead E4 1
    PLAY slide_lead G4 1
    PLAY slide_lead C5 1
    PLAY slide_lead G4 1
    PLAY slide_lead E4 0.5
    PLAY slide_lead D4 0.5
    PLAY slide_lead C4 1

SEQUENCE bassline:
    PLAY bass C2 2
    PLAY bass G2 2
    PLAY bass F2 2
    PLAY bass G2 2

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE bassline
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "slow-glide",
      text: "שנו את ה-GLIDE של ה-lead ל-400. עכשיו כל תו לוקח כמעט חצי שנייה להחליק פנימה. סופר דרמטי!",
      hint: "שנו GLIDE 150 ל-GLIDE 400 בכלי slide_lead.",
    },
    {
      id: "no-glide",
      text: "הסירו את ה-GLIDE מה-lead לגמרי (או שנו ל-0). שמעו איך התווים קופצים מגובה צליל לגובה צליל? זה ההבדל.",
      hint: "מחקו את שורת GLIDE 150 מ-slide_lead, או שנו ל-GLIDE 0.",
    },
    {
      id: "octave-jumps",
      text: "שנו את המנגינה לקפיצות אוקטבה גדולות: C3, C5, C3, C5. עם GLIDE 300, כל תו סורק שני אוקטבות שלמות!",
      hint: "החליפו את תווי ה-PLAY במנגינה ל-C3 ו-C5 לסירוגין. הגדירו GLIDE ל-300 לעוד דרמה.",
    },
  ],

  funFact:
    "התרמין, שהומצא ב-1920, מחליק בין תווים בצורה טבעית כי שולטים בגובה הצליל על ידי הנפת ידיים באוויר. אין מקשים או סריגים לדייק אליהם -- כל תנועה יוצרת החלקה חלקה.",
};

export default lesson13;
