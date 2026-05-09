const lesson15 = {
  id: 15,
  slug: "smooth-glide",
  title: "גלישה חלקה",
  subtitle: "החליקו בין תווים כמו בגיטרה",
  phase: 5,
  difficulty: 4,
  goal: "השתמשו ב-GLIDE כדי שתווים יחליקו בצורה חלקה אחד לשני במקום לקפוץ.",
  concepts: ["פורטמנטו", "גלישה", "החלקת גובה צליל"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "מה זה גלישה?",
      content: `בדרך כלל כששני תווים מנגנים, גובה הצליל **קופץ** מיד. אבל בטרומבון או גיטרה, אפשר **להחליק** בין תווים.

ב-JEM, הוסיפו **GLIDE** (באלפיות שנייה) לכלי:

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    GLIDE 100
    VOLUME 200
\`\`\`

100 פירושו שלוקח 100ms להחליק מתו לתו. מספר גדול יותר = גלישה איטית יותר.`,
    },
    {
      title: "גלישה מהירה מול איטית",
      content: `ערך ה-GLIDE משנה את האופי:

- **GLIDE 20** -- בקושי מורגש, חלקות עדינה
- **GLIDE 100** -- פורטמנטו סינתי קלאסי
- **GLIDE 300** -- גלישה דרמטית, כמו גיטרת סלייד
- **GLIDE 500** -- כיפוף צליל איטי וחלומי

נסו לשנות את ערך ה-GLIDE בקוד למטה ושמעו איך כל אחד מרגיש אחרת!`,
    },
    {
      title: "גלישה עם מרווחים גדולים",
      content: `גלישה נשמעת הכי דרמטית כשהתווים רחוקים זה מזה:

\`\`\`
PLAY lead C3 1
PLAY lead C5 1
\`\`\`

זו גלישה של שני אוקטבות! עם GLIDE 200 תשמעו את הצליל עולה בצורה דרמטית. מרווחים קטנים (כמו C4 ל-D4) נותנים רעד עדין יותר.`,
    },
  ],

  code: `# גלישה חלקה -- פורטמנטו
# תווים מחליקים אחד לשני

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
    PLAY slide_lead C4 0.5
    PLAY slide_lead E4 0.5
    PLAY slide_lead G4 1
    PLAY slide_lead E4 0.5
    PLAY slide_lead C5 0.5
    PLAY slide_lead G4 1

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass G2 1
    PLAY bass E2 1
    PLAY bass G2 1

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
      id: "slow-slide",
      text: "שנו את GLIDE של הלידה ל-400. האם זה מרגיש יותר דרמטי או איטי מדי?",
      hint: "שנו GLIDE 150 ל-GLIDE 400 בכלי slide_lead.",
    },
    {
      id: "no-glide-compare",
      text: "הסירו GLIDE מהלידה ותקשיבו. אחר כך החזירו -- שומעים את ההבדל?",
      hint: "מחקו את שורת GLIDE 150, נגנו, ואז הוסיפו בחזרה ונגנו שוב.",
    },
    {
      id: "octave-jump",
      text: "שנו את המנגינה לקפיצות בין C3 ו-C5 (שני אוקטבות). עם GLIDE 200, תשמעו סוויפ ענק!",
      hint: "שנו את תווי ה-PLAY כך שיתחלפו בין C3 ל-C5.",
    },
  ],

  funFact:
    "התרמין, אחד הכלים האלקטרוניים הראשונים (1920), מחליק באופן טבעי בין תווים כי שולטים בגובה הצליל על ידי הזזת היד באוויר -- אין מקשים או סריגים לקפוץ ביניהם!",
};

export default lesson15;
