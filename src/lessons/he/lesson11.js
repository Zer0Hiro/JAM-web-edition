const lesson11 = {
  id: 11,
  slug: "filter-magic",
  title: "קסם הפילטר",
  subtitle: "עצבו את הצליל על ידי חסימת תדרים",
  phase: 4,
  difficulty: 3,
  goal: "השתמשו ב-CUTOFF וב-RESONANCE כדי לעצב כמה בהיר או כהה כל כלי נשמע, ולשנות את הפילטר על תווים בודדים.",
  concepts: ["פילטר מעביר-נמוכים", "תדר CUTOFF", "RESONANCE", "דריסת CUTOFF לכל תו"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "מה זה פילטר?",
      content: `כל צליל הוא תערובת של תדרים נמוכים (באס) ותדרים גבוהים (טרבל). **פילטר מעביר-נמוכים** חוסם את הגבוהים ומעביר את הנמוכים.

תחשבו על זה כמו לשים כרית על רמקול. הבאס עדיין עובר, אבל הצלילים החדים נחנקים. ב-JEM, הכרית הזו נקראת **CUTOFF** -- היא קובעת מאיפה הוא מתחיל לחסום.`,
    },
    {
      title: "CUTOFF",
      content: `הוסיפו CUTOFF לכלי כלשהו כדי לקבוע איפה הפילטר חותך:

\`\`\`
INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 800
    VOLUME 200
\`\`\`

**CUTOFF 800** אומר שהכל מעל 800 הרץ נעשה שקט יותר. מספר נמוך = צליל כהה ועמום. מספר גבוה = בהיר וחד. הטווח הוא מ-20 עד 20000 הרץ.

גל SAW נשמע זמזומי בפני עצמו. עם CUTOFF 800 הוא נהפך לחם ועגול. עם CUTOFF 200 הוא רעידה עמוקה.`,
    },
    {
      title: "RESONANCE",
      content: `RESONANCE מגביר את הצליל בדיוק בנקודת ה-CUTOFF. הוא יוצר שיא חד ומצלצל -- כאילו הפילטר צועק "אני פה!"

\`\`\`
INSTRUMENT acid:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 1200
    RESONANCE 180
    VOLUME 200
\`\`\`

RESONANCE הולך מ-0 (בלי הגברה) עד 255 (צלצול אינטנסיבי). ערכים נמוכים עדינים. ערכים גבוהים יוצרים את הצליל האסידי/אלקטרוני הקלאסי שאפשר לשמוע במוזיקת ריקודים.`,
    },
    {
      title: "דריסת CUTOFF לכל תו",
      content: `אפשר לשנות את ה-CUTOFF לתו בודד על ידי הוספת \`CUTOFF:<ערך>\` בסוף שורת PLAY:

\`\`\`
SEQUENCE riff:
    PLAY bass C2 1 CUTOFF:400    # כהה
    PLAY bass E2 1 CUTOFF:3000   # בהיר
    PLAY bass G2 1               # חזרה לברירת מחדל
\`\`\`

הדריסה מחזיקה רק לתו ההוא. אחריו, הפילטר חוזר להגדרת ברירת המחדל של הכלי. אם יש גם velocity, שימו אותו לפני ה-CUTOFF:

\`\`\`
PLAY bass C2 1 180 CUTOFF:500
\`\`\`

חייב להיות CUTOFF מוגדר בכלי כדי שהדריסה תעבוד.`,
    },
  ],

  code: `# קסם הפילטר
# עיצוב צליל עם CUTOFF ו-RESONANCE

BPM 110

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 1200
    RESONANCE 80
    ADSR 5 40 300 120
    VOLUME 220

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 4000
    ADSR 10 30 200 100
    VOLUME 180

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

SEQUENCE bassline:
    PLAY bass C2 1 CUTOFF:400
    PLAY bass C2 0.5
    PLAY bass G2 0.5 CUTOFF:2000
    PLAY bass F2 1 CUTOFF:600
    PLAY bass F2 1

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "dark-bass",
      text: "הגדירו את ה-CUTOFF של הבאס ל-300. עכשיו זה נשמע כאילו הוא מנגן מאחורי קיר. השוו עם 1200 -- הבדל עצום!",
      hint: "שנו CUTOFF 1200 ל-CUTOFF 300 בכלי הבאס.",
    },
    {
      id: "resonant-lead",
      text: "הוסיפו RESONANCE 200 ל-lead. זה צריך להישמע חד ומתכתי, כמו לייזר.",
      hint: "הוסיפו שורת RESONANCE 200 בתוך בלוק ה-INSTRUMENT של ה-lead, אחרי שורת ה-CUTOFF.",
    },
    {
      id: "no-filter",
      text: "הסירו את שורת ה-CUTOFF מהבאס לגמרי. השוו את הזמזום הגולמי של SAW עם הגרסה המפולטרת.",
      hint: "מחקו (או שימו # לפני) שורות ה-CUTOFF וה-RESONANCE מכלי הבאס.",
    },
    {
      id: "bright-accent",
      text: "הוסיפו CUTOFF:8000 לאחד מתווי המנגינה כדי שהוא יבלוט, בהיר וחותך.",
      hint: "שנו שורת PLAY lead למשהו כמו PLAY lead A4 1 CUTOFF:8000. חייב להיות CUTOFF מוגדר ב-lead.",
    },
  ],

  funFact:
    "הסינתסייזר של מוג, שהמציא רוברט מוג ב-1964, הפך לאגדי בזכות הפילטר המדהים שלו. כל יצרן סינטים מאז ניסה להעתיק את הצליל החם והקרמי הזה.",
};

export default lesson11;
