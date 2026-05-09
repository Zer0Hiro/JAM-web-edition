const lesson13 = {
  id: 13,
  slug: "filter-sweep",
  title: "סינון צלילים",
  subtitle: "עצבו את הצליל עם מסנן תדרים נמוכים",
  phase: 3,
  difficulty: 3,
  goal: "השתמשו ב-CUTOFF וב-RESONANCE כדי להפוך כלים לחמימים יותר, כהים יותר, או אגרסיביים יותר.",
  concepts: ["מסנן תדרים נמוכים", "תדר חיתוך CUTOFF", "תהודה RESONANCE"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "מה זה מסנן?",
      content: `**מסנן תדרים נמוכים** מעביר צלילים נמוכים וחוסם צלילים גבוהים. דמיינו כרית על רמקול -- הבס עדיין עובר אבל הטרבל מתעמעם.

ב-JEM, הוסיפו **CUTOFF** לכלי כדי לקבוע איפה המסנן חותך:

\`\`\`
INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 800
    VOLUME 200
\`\`\`

800 Hz אומר שהכל מעל 800 Hz נחלש. מספר נמוך יותר = צליל כהה יותר.`,
    },
    {
      title: "RESONANCE מוסיף עוקץ",
      content: `**RESONANCE** מגביר תדרים ממש בנקודת החיתוך, ויוצר שיא חד ותהודתי:

\`\`\`
INSTRUMENT synth:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 1200
    RESONANCE 180
    VOLUME 200
\`\`\`

תהודה גבוהה (עד 255) גורמת למסנן "לצלצל" -- מעולה לבס אסידי ומוזיקה אלקטרונית!`,
    },
    {
      title: "השוואה בין מסונן ללא מסנן",
      content: `נסו את הקוד למטה -- ללידה אין מסנן (בהיר וזמזומי), בעוד שלבס יש CUTOFF 600 (חמים ועגול).

גל SAW מכיל הרבה הרמוניות גבוהות. המסנן מסיר אותן והופך זמזום חד לטון חלק.

שנו CUTOFF מ-200 ל-2000 ושמעו איך הבס משתנה מעמום לבהיר!`,
    },
  ],

  code: `# סינון צלילים -- CUTOFF ו-RESONANCE
# מסנן תדרים נמוכים מעצב את הצליל

BPM 110

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 600
    RESONANCE 100
    ADSR 5 40 300 120
    VOLUME 220

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 30 200 100
    VOLUME 180

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass C2 0.5
    PLAY bass G2 0.5
    PLAY bass F2 1
    PLAY bass F2 1

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody`,

  challenges: [
    {
      id: "dark-bass",
      text: "הפכו את הבס לסופר כהה על ידי הגדרת CUTOFF ל-300. איך זה נשמע לעומת 600?",
      hint: "שנו CUTOFF 600 ל-CUTOFF 300 בכלי הבס.",
    },
    {
      id: "resonant-lead",
      text: "הוסיפו CUTOFF 2000 ו-RESONANCE 200 ללידה. זה צריך להישמע חד ומתכתי!",
      hint: "הוסיפו שורות CUTOFF 2000 ו-RESONANCE 200 בתוך בלוק ה-INSTRUMENT של הלידה.",
    },
    {
      id: "filter-compare",
      text: "הסירו את CUTOFF מהבס לגמרי. השוו בין SAW ללא מסנן לגרסה המסוננת -- הבדל גדול!",
      hint: "מחקו או סמנו כהערה את שורות CUTOFF ו-RESONANCE מכלי הבס.",
    },
  ],

  funFact:
    "סינתיסייזר Moog, שהומצא ב-1964, הפך למפורסם בזכות מסנן התדרים הנמוכים המדהים שלו. כל סינתיסייזר מאז ניסה לחקות את הצליל החמים והקרמי הזה!",
};

export default lesson13;
