const lesson07 = {
  id: 7,
  slug: "envelope-shapes",
  title: "צורות מעטפה",
  subtitle: "שלטו באיך צלילים נכנסים ויוצאים",
  phase: 3,
  difficulty: 3,
  goal: "!השתמשו ב-ADSR כדי ליצור צלילים שנפרטים, מתנפחים או מכים",
  concepts: ["מעטפת ADSR", "Attack/Decay/Sustain/Release", "עיצוב צליל"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "!לצלילים יש צורות",
      content: `פרטו מיתר בגיטרה -- זה חזק בהתחלה, ואז נעלם. לחצו על קליד בפסנתר והחזיקו -- התו נשאר עד שמרפים.

ה"צורה" של חזק-לשקט לאורך זמן נקראת **מעטפה**. ב-JAM, שולטים בה עם ארבעה מספרים: **ADSR**.`,
    },
    {
      title: "מה ADSR אומר",
      content: `\`\`\`
ADSR 10 50 200 100
\`\`\`

ארבעה מספרים, ארבעה שלבים (הכל במילישניות):

1. **Attack (10)** -- כמה מהר הצליל נדלק. קטן = חד!
2. **Decay (50)** -- כמה מהר הוא יורד מהעוצמה המקסימלית.
3. **Sustain (200)** -- כמה זמן הוא מחזיק קבוע.
4. **Release (100)** -- כמה מהר הוא נעלם בסוף.

.חשבו על זה ככה: תעלו את הווליום למעלה, תנו לו לרדת קצת, תחזיקו, ואז תעלימו`,
    },
    {
      title: "פריטה מול פד",
      content: `ADSR שונה = צליל לגמרי שונה:

**פריטה** (כמו מפרט בגיטרה):
\`\`\`
ADSR 2 80 0 60
\`\`\`
.סופר מהיר, קופץ ונעלם

**פד** (כמו מקהלה חלומית):
\`\`\`
ADSR 300 100 400 500
\`\`\`
.כניסה איטית, החזקה ארוכה, יציאה עדינה

!נסו את שניהם בקוד! שנו את ה-ADSR של ה-pad ושמעו מה קורה`,
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
      text: "!שנו את ה-Attack של ה-pad ל-500 ואת ה-Release ל-800. עוד יותר חלומי",
      hint: ".מעטפות ארוכות ואיטיות הן מה שגורם למוזיקת אמביינט וצ'יל להרגיש כל כך מרחפת",
    },
    {
      id: "stab",
      text: "!שנו את ה-ADSR של ה-pluck ל-5 100 50 30. עכשיו זה חבטה חזקה",
      hint: ".מעטפות קצרות ואגרסיביות משמשות במוזיקת EDM ודאנס כל הזמן",
    },
    {
      id: "zero-release",
      text: "!קבעו את ה-Release של ה-pluck ל-0. התווים נחתכים מיד -- כמו גיטרה מושתקת",
      hint: "!Release של 0 אומר שהצליל פשוט נעצר. נסו את זה",
    },
  ],

  funFact:
    "מעטפות ADSR הומצאו בשנות ה-60 עבור הסינתיסייזרים הראשונים. לפני כן, סינתיסייזרים יכלו רק להשמיע זמזום מתמשך אחד. ADSR הפך מוזיקה אלקטרונית לבעלת ביטוי אמיתי!",
};

export default lesson07;
