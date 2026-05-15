const lesson20He = {
  id: 20,
  slug: "get-groovy",
  title: "בואו נגרוב",
  subtitle: "תנו לביטים שלכם להרגיש אנושיים עם סווינג ואקראיות",
  phase: 6,
  difficulty: 3,
  goal: "השתמשו ב-SWING ו-HUMANIZE כדי לצאת מתזמון רובוטי וליצור גרוב אמיתי.",
  concepts: ["SWING", "HUMANIZE", "גרוב", "שינויי תזמון"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "למה מחשבים נשמעים רובוטיים",
      content: `מחשב מנגן כל צליל ברגע **המדויק**. זה אמור להישמע מעולה, לא? בעצם זה נשמע קשיח ומת.

מוזיקאים אמיתיים אף פעם לא בדיוק בזמן. תופף מכה קצת מוקדם פה, קצת מאוחר שם. גיטריסט ממהר לתוך הפזמון. חוסר השלמות הזה הוא הגרוב. זה מה שגורם לכם להנהן עם הראש.

ל-JEM יש שני כלים לתקן תזמון רובוטי: **SWING** ו-**HUMANIZE**.`,
    },
    {
      title: "SWING -- הקפצה",
      content: `**SWING** מעכב את שמיניות ה-offbeat, ויוצר תחושה קופצנית ומעורבלת. שימו את זה בראש הקובץ:

\`\`\`
BPM 100
SWING 40
\`\`\`

- **0** = ישר לגמרי, רובוטי (ברירת מחדל)
- **30-40** = קפצה קלה, גרוב עדין
- **50** = תחושת טריולה -- שאפל קלאסי של ג'אז והיפ-הופ
- **70+** = סווינג כבד, כמעט שיכור

חשבו: מצעד צבאי (SWING 0) מול תופף ג'אז (SWING 50). אותם צלילים, אנרגיה לגמרי אחרת!`,
    },
    {
      title: "HUMANIZE -- הרעידה",
      content: `**HUMANIZE** מוסיף הזזות תזמון אקראיות קטנטנות לכל צליל. כל צליל מגיע קצת מוקדם או מאוחר, בדיוק כמו בן אדם אמיתי שמנגן.

\`\`\`
BPM 100
HUMANIZE 8
\`\`\`

- **0** = תזמון מושלם (ברירת מחדל)
- **5-10** = עדין, נשמע טבעי
- **15-25** = רופף ורגוע
- **30+** = מרושל, כמו להקת מוסך אחרי חצות

בניגוד ל-SWING (שהוא מובנה), HUMANIZE הוא אקראי -- תנגנו את אותו שיר פעמיים והתזמון יהיה קצת שונה בכל פעם!`,
    },
    {
      title: "שלבו לקסם",
      content: `השתמשו בשניהם ביחד לגרוב אמיתי:

\`\`\`
BPM 100
SWING 40
HUMANIZE 8
\`\`\`

SWING נותן לכם את הקפצה המובנית. HUMANIZE מוסיף רפיון אקראי מעל. ביחד הם הופכים מוזיקת מחשב רובוטית למשהו שבאמת מרגיש חי.

נסו את הקוד למטה, ואז הסירו את שורות ה-SWING ו-HUMANIZE כדי לשמוע את ההבדל. זה כמו יום ולילה!`,
    },
  ],

  code: `# בואו נגרוב -- סווינג והיומנייז
# הסירו את שורות SWING ו-HUMANIZE כדי לשמוע את גרסת הרובוט!

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

SEQUENCE bass_groove:
    PLAY bass C2 1
    PLAY bass C2 0.5
    PLAY bass Bb1 0.5
    PLAY bass G1 1
    PLAY bass C2 1

PATTERN groovy_beat:
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
        PLAY_SEQUENCE bass_groove
        PLAY_PATTERN groovy_beat`,

  challenges: [
    {
      id: "hear-the-robot",
      text: "הסירו את שורות SWING ו-HUMANIZE (או הגדירו ל-0). שמעו כמה הנהייטים נשמעים קשיחים ומכניים בלי גרוב.",
      hint: "מחקו את שורות SWING 40 ו-HUMANIZE 8, או שנו שניהם ל-0.",
    },
    {
      id: "heavy-swing",
      text: "העלו SWING ל-65 לתחושת שאפל כבדה. זה מזכיר לכם תקליטי בלוז או ג'אז ישנים?",
      hint: "שנו SWING 40 ל-SWING 65.",
    },
    {
      id: "sloppy-humanize",
      text: "הגדירו HUMANIZE ל-30 לתחושת להקת-מוסך-בשלוש-בלילה מרושלת. שימו לב שכל השמעה נשמעת קצת אחרת!",
      hint: "שנו HUMANIZE 8 ל-HUMANIZE 30.",
    },
    {
      id: "swing-no-humanize",
      text: "נסו SWING 50 עם HUMANIZE 0. זה נותן שאפל טריולה נקי -- גרוב מובנה בלי אקראיות.",
      hint: "הגדירו SWING 50 ו-HUMANIZE 0 (או הסירו את שורת ה-HUMANIZE).",
    },
  ],

  funFact:
    "ג'יי דילה, מפיק ההיפ-הופ האגדי, היה מפורסם ב'ביטים שיכורים' שלו -- צלילים שהוצבו מחוץ לרשת בכוונה בהפרשים זעירים. מפיקים קוראים לזה 'פיל ג'יי דילה' וזה שינה את צליל ההיפ-הופ לנצח. HUMANIZE נותן לכם טעימה מהקסם הזה!",
};

export default lesson20He;
