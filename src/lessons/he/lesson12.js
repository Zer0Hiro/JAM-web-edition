const lesson12 = {
  id: 12,
  slug: "echo-chamber",
  title: "חדר הדים",
  subtitle: "הוסיפו מרחב והדים למוזיקה",
  phase: 4,
  difficulty: 3,
  goal: "השתמשו ב-REVERB לאווירת חדר וב-DELAY להדים קצביים, ודרסו אותם על תווים בודדים.",
  concepts: ["ריוורב", "דיליי/הד", "פידבק", "דריסת REVERB ו-DELAY לכל תו"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "מה זה ריוורב?",
      content: `תשירו בחדר אמבטיה -- תשמעו את הקול מקפץ מהאריחים. תשירו בארון מלא בגדים -- שקט מוחלט. צליל ההד הזה מהקירות הוא **ריוורב**.

ב-JEM, מוסיפים REVERB לכלי:

\`\`\`
INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    REVERB 180
    VOLUME 160
\`\`\`

REVERB 0 = ארון יבש. REVERB 255 = קתדרלה ענקית. מספרים באמצע נותנים הכל, מחדר קטן עד אולם קונצרטים.`,
    },
    {
      title: "DELAY זה הד",
      content: `DELAY חוזר על הצליל אחרי זמן קבוע, כמו לצעוק לתוך קניון. שולטים בשני דברים:

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    DELAY 300 150
    VOLUME 180
\`\`\`

**זמן** (300) = הפער בין ההדים באלפיות שנייה. ב-BPM 120, ביט אחד הוא 500 אלפיות שנייה, אז 300 זה קצת יותר מהר מחצי ביט.

**פידבק** (150) = כמה פעמים ההד חוזר. 0 = הד אחד. 255 = הדים לנצח. 150 זה אמצע נחמד שבו ההדים דועכים בהדרגה.`,
    },
    {
      title: "דריסה לכל תו",
      content: `בדיוק כמו CUTOFF, אפשר לדרוס REVERB או DELAY על תו בודד:

\`\`\`
PLAY lead E4 1 REVERB:240
PLAY lead G4 1 200 DELAY:500:120
\`\`\`

שימו את הדריסה אחרי ה-velocity (או אחרי משך התו אם אין velocity). הכלי חייב שהאפקט כבר מוגדר בו כדי שהדריסה תעבוד.

דריסת DELAY בפורמט \`DELAY:<זמן>:<פידבק>\`.`,
    },
    {
      title: "שילוב אפקטים",
      content: `ריוורב ודיליי ביחד יוצרים צליל עצום ומרחבי. טריק טוב:

- **Lead** עם DELAY -- ההדים מוסיפים קצב ותנועה
- **Pad** עם REVERB -- יוצר שטיח של אווירה מאחורי הכל
- **תופים** יבשים או עם ריוורב קל -- שומר על הביט הדוק

לחצו Play כדי לשמוע את שלוש השכבות עובדות ביחד!`,
    },
  ],

  code: `# חדר הדים
# ריוורב לצליל חדר, דיליי להדים

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
    PLAY lead E4 0.5 REVERB:200
    REST 0.5

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
      text: "שנו את הדיליי של ה-lead ל-500 אלפיות שנייה עם פידבק 220. ספרו את ההדים -- כמה אתם שומעים לפני שהם דועכים?",
      hint: "שנו DELAY 300 150 ל-DELAY 500 220 בכלי ה-lead.",
    },
    {
      id: "reverb-kick",
      text: "הוסיפו REVERB 100 לקיק. האם זה נשמע כאילו התופים בחדר גדול עכשיו?",
      hint: "הוסיפו שורת REVERB 100 בתוך בלוק ה-INSTRUMENT של הקיק.",
    },
    {
      id: "dry-compare",
      text: "הסירו את כל שורות ה-REVERB וה-DELAY מכל הכלים. השוו את הגרסה היבשה לחלוטין עם המקורית. מה עדיף?",
      hint: "מחקו או שימו # לפני שורות ה-REVERB וה-DELAY מכלי ה-lead וה-pad.",
    },
  ],

  funFact:
    "הריוורב המלאכותי הראשון נוצר בשנות ה-40 על ידי השמעת מוזיקה דרך רמקול בחדר אמבטיה מרוצף והקלטה עם מיקרופון! מאוחר יותר, אולפנים השתמשו בלוחות מתכת וקפיצים במקום.",
};

export default lesson12;
