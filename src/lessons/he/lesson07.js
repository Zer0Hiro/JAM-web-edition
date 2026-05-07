const lesson07 = {
  id: 7,
  slug: "envelope-shapes",
  title: "צורות מעטפה",
  subtitle: "שלטו באיך צלילים נכנסים ויוצאים",
  phase: 3,
  difficulty: 3,
  goal: "השתמשו ב-ADSR כדי ליצור צלילים שנקרטים, מתנפחים או חובטים!",
  concepts: ["מעטפת ADSR", "Attack/Decay/Sustain/Release", "עיצוב צליל"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "לצלילים יש צורות!",
      content: `קטפו מיתר גיטרה -- הוא חזק בהתחלה, ואז נעלם. לחצו על מקש פסנתר והחזיקו -- התו נשאר עד שתשחררו.

ה"צורה" הזו של חזק-לשקט לאורך זמן נקראת **מעטפה**. ב-JAM, שולטים בה עם ארבעה מספרים: **ADSR**.`,
    },
    {
      title: "מה ADSR אומר",
      content: `\`\`\`
ADSR 10 50 200 100
\`\`\`

ארבעה מספרים, ארבעה שלבים (הכל במילישניות):

1. **Attack (10)** -- כמה מהר הצליל נדלק. קטן = חד!
2. **Decay (50)** -- כמה מהר הוא יורד מעוצמה מקסימלית.
3. **Sustain (200)** -- כמה זמן הוא מחזיק יציב.
4. **Release (100)** -- כמה מהר הוא נעלם בסוף.

חשבו על זה ככה: הגבירו למעלה, תנו לזה לרדת קצת, החזיקו, ואז דעכו החוצה.`,
    },
    {
      title: "קריטה לעומת פד",
      content: `ADSR שונה = צליל שונה לגמרי:

**קריטה** (כמו מפרט גיטרה):
\`\`\`
ADSR 2 80 0 60
\`\`\`
סופר מהיר, קופץ ונעלם.

**פד** (כמו מקהלה חלומית):
\`\`\`
ADSR 300 100 400 500
\`\`\`
כניסה איטית, החזקה ארוכה, דעיכה עדינה.

נסו את שניהם בקוד! שנו את ה-ADSR של הפד ושמעו מה קורה.`,
    },
  ],

  code: `# Envelope Shapes
# A dreamy pad and a snappy pluck!

BPM 90

INSTRUMENT pad:
    TYPE SYNTH
    WAVE SIN
    ADSR 300 100 400 500
    VOLUME 160

INSTRUMENT pluck:
    TYPE SYNTH
    WAVE SAW
    ADSR 2 80 0 60
    VOLUME 200

SEQUENCE chords:
    PLAY pad C4 4
    PLAY pad E4 4
    PLAY pad G4 4

SEQUENCE arpegg:
    PLAY pluck C5 0.25
    REST 0.25
    PLAY pluck E5 0.25
    REST 0.25
    PLAY pluck G5 0.25
    REST 0.25
    PLAY pluck C6 0.25
    REST 0.25

PLAY_SEQUENCE chords
LOOP 4:
    PLAY_SEQUENCE arpegg`,

  challenges: [
    {
      id: "long-pad",
      text: "שנו את ה-attack של הפד ל-500 וה-release ל-800. עוד יותר חלומי!",
      hint: "מעטפות ארוכות ואיטיות הן מה שגורם למוזיקה אמביינטית וצ'יל להרגיש כל כך מרחפת.",
    },
    {
      id: "stab",
      text: "שנו את ה-ADSR של הקריטה ל-5 100 50 30. עכשיו זה סטאב חזק!",
      hint: "מעטפות קצרות ואגרסיביות משמשות ב-EDM ומוזיקת דאנס כל הזמן.",
    },
    {
      id: "zero-release",
      text: "הגדירו את ה-release של הקריטה ל-0. התווים נחתכים מיד -- כמו גיטרה מושתקת!",
      hint: "Release של 0 אומר שהצליל פשוט נעצר. נסו!",
    },
  ],

  funFact:
    "מעטפות ADSR הומצאו בשנות ה-60 לסינתיסייזרים הראשונים. לפני כן, סינתיסייזרים יכלו רק להוציא צליל BZZZZZ רציף אחד. ADSR הפך מוזיקה אלקטרונית לאקספרסיבית באמת!",
};

export default lesson07;
