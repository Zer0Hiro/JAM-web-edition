const lesson20 = {
  id: 20,
  slug: "swing-humanize",
  title: "תהיו גרוביים",
  subtitle: "הוסיפו סווינג ותחושה אנושית לביטים",
  phase: 6,
  difficulty: 3,
  goal: "השתמשו ב-SWING וב-HUMANIZE כדי שהמוזיקה תרגיש פחות רובוטית ויותר חיה.",
  concepts: ["תחושת סווינג", "הומניזציה", "גרוב", "שינויי תזמון"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "?למה מחשבים נשמעים רובוטיים",
      content: `כשמחשב מנגן מוזיקה, כל תו פוגע ב**דיוק** בזמן הנכון. נשמע מושלם, נכון? בעצם, זה נשמע נוקשה וחסר חיים!

מוזיקאים אמיתיים אף פעם לא מדויקים לחלוטין — הם מנגנים קצת מוקדם או מאוחר, וזה מה שנותן למוזיקה את ה**גרוב** וה**תחושה**.

.**SWING** ו-**HUMANIZE** :ל-JEM יש שני כלים לתקן את זה`,
    },
    {
      title: "SWING — הקפיצה",
      content: `**SWING** גורם לתווים שלא על הפעימה (ספירות ה-"ו") להגיע מעט מאוחר, מה שיוצר תחושה קופצנית ומשופלת.

\`\`\`
BPM 100
SWING 40
\`\`\`

(ברירת מחדל, רובוטי) ישר לחלוטין = **0**
(גרוב עדין) סווינג קל = **30-40**
(שאפל ג'אז/היפ-הופ קלאסי) תחושת שלישיות = **50**
(מאוד מוגזם) סווינג כבד = **+70**

.חשבו על ההבדל בין מצעד צבאי (בלי סווינג) לבין תופף ג'אז (הרבה סווינג). אותם תווים, תחושה לגמרי שונה`,
    },
    {
      title: "HUMANIZE — הרעידה",
      content: `**HUMANIZE** מוסיף הסטות תזמון אקראיות קטנות לכל תו — כמו אדם אמיתי שמנגן.

\`\`\`
BPM 120
HUMANIZE 10
\`\`\`

(ברירת מחדל) תזמון מושלם = **0**
(נשמע טבעי) תחושה אנושית עדינה = **5-10**
נגינה רופפת, רגועה = **15-25**
(מרושל בכוונה) מאוד רופף = **+30**

:אפשר לשלב SWING ו-HUMANIZE לגרוב מקסימלי

\`\`\`
BPM 100
SWING 35
HUMANIZE 8
\`\`\`

!נסו את הקוד והשוו עם ובלי ההגדרות האלה`,
    },
  ],

  code: `# תהיו גרוביים -- סווינג והומניזציה
# !הסירו את שורות SWING ו-HUMANIZE כדי לשמוע את הגרסה הרובוטית

BPM 100
SWING 40
HUMANIZE 8

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 150 80
    VOLUME 180

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 200 100
    CUTOFF 800
    VOLUME 200

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 240

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 25
    VOLUME 140

SEQUENCE groove_melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 0.5
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    REST 0.5
    PLAY lead D4 0.5
    PLAY lead E4 0.5

SEQUENCE bass_line:
    PLAY bass C2 1
    PLAY bass C2 0.5
    PLAY bass Bb1 0.5
    PLAY bass G1 1
    PLAY bass C2 1

PATTERN groove_beat:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 1.5: hat
    BEAT 2: hat
    BEAT 2.5: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 3.5: hat
    BEAT 4: hat
    BEAT 4.5: hat

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE groove_melody
        PLAY_SEQUENCE bass_line
        PLAY_PATTERN groove_beat`,

  challenges: [
    {
      id: "no-swing",
      text: "הסירו את שורת SWING (או הגדירו 0). שמעו כמה ישרים ורובוטיים נשמעים ההיי-האטים בלי סווינג.",
      hint: ".מחקו את שורת SWING 40 או שנו ל-SWING 0",
    },
    {
      id: "heavy-swing",
      text: "העלו SWING ל-65 לתחושת שאפל כבדה. זה מזכיר לכם בלוז או ג'אז?",
      hint: ".שנו SWING 40 ל-SWING 65",
    },
    {
      id: "sloppy-human",
      text: "הגדירו HUMANIZE ל-30 לתחושת 'להקת מוסך' רופפת. שימו לב שכל נגינה נשמעת קצת אחרת!",
      hint: ".שנו HUMANIZE 8 ל-HUMANIZE 30",
    },
  ],

  funFact:
    "המפיק האגדי ג'יי דילה היה מפורסם בביטים ה'שיכורים' שלו — תווים שהיו בכוונה לא על הגריד בכמויות זעירות. מפיקים קוראים לזה 'תחושת ג'יי דילה' וזה שינה את הצליל של היפ-הופ לנצח. HUMANIZE נותן לכם טעימה מהקסם הזה!",
};

export default lesson20;
