const lesson05He = {
  id: 5,
  slug: "beat-drop",
  title: "הביט נוחת",
  subtitle: "בנו ביטים עם כלי תופים",
  phase: 2,
  difficulty: 2,
  goal: "צרו צלילי תופים וסדרו אותם לתבנית ביט.",
  concepts: [
    "כלי DRUM",
    "FREQ ו-DECAY",
    "בלוק PATTERN",
    "מיקום BEAT",
    "PLAY_PATTERN",
  ],
  estimatedMinutes: 12,

  steps: [
    {
      title: "תופים הם מיוחדים",
      content: `כלים רגילים מנגנים תווים כמו C4 או G5. תופים שונים -- הם פשוט עושים בום או טשש בגובה אחד.

כדי ליצור תוף, השתמשו ב-\`TYPE DRUM\` במקום \`TYPE SYNTH\`:

\`\`\`
INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 60
    DECAY 80
    VOLUME 255
\`\`\`

**FREQ** שולט בגובה הצליל -- מספרים נמוכים נותנים חבטה עמוקה. **DECAY** שולט כמה מהר הצליל נעלם. לא צריך תווים!`,
    },
    {
      title: "קיק, סנר, היי-האט",
      content: `כל ביט צריך שלושה צלילים בסיסיים:

**קיק** (ה"בום" העמוק) -- גל SIN, FREQ 60, DECAY 80:
\`\`\`
INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 60
    DECAY 80
    VOLUME 255
\`\`\`

**סנר** (ה"קראק" החד) -- גל NOISE, FREQ 200, DECAY 60:
\`\`\`
INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 60
    VOLUME 220
\`\`\`

**היי-האט** (ה"טס" המהיר) -- גל NOISE, FREQ גבוה, DECAY קצר:
\`\`\`
INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 30
    VOLUME 140
\`\`\``,
    },
    {
      title: "מקמו את הביטים",
      content: `PATTERN מאפשר למקם חבטות תופים במיקומים מדויקים בתוך תיבה.

\`\`\`
PATTERN my_beat:
    BEAT 1: kick
    BEAT 2: snare
    BEAT 3: kick
    BEAT 4: snare
\`\`\`

מיקומים 1 עד 4 הם הביטים הראשיים. רוצים חבטות בין הביטים? השתמשו בעשרוניים! BEAT 1.5 נוחת באמצע בין ביט 1 ל-2. BEAT 2.5 הוא האופביט אחרי ביט 2.

אפשר גם לערום צלילים על אותו ביט -- kick ו-hat ביחד, בלי בעיה.`,
    },
    {
      title: "PLAY_PATTERN",
      content: `בדיוק כמו שסיקוונסים צריכים PLAY_SEQUENCE כדי להתנגן, תבניות צריכות PLAY_PATTERN:

\`\`\`
PLAY_PATTERN my_beat
\`\`\`

זה מנגן תיבה אחת של התבנית. עטפו את זה ב-LOOP כדי שזה ימשיך:

\`\`\`
LOOP 4:
    PLAY_PATTERN my_beat
\`\`\`

לחצו Play ותשמעו את הביט! הקוד מימין מכיל תבנית מוכנה של kick-snare-hat.`,
    },
  ],

  code: `# Beat Drop
# תבנית תופים עם kick, snare ו-hat

BPM 110

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 60
    DECAY 80
    VOLUME 255

INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 60
    VOLUME 220

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 30
    VOLUME 140

PATTERN basic_beat:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 2: snare
    BEAT 2: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: snare
    BEAT 4: hat

LOOP 4:
    PLAY_PATTERN basic_beat`,

  challenges: [
    {
      id: "double-kick",
      text: "הוסיפו BEAT 3.5: kick לתבנית. עכשיו יש לכם דאבל-קיק!",
      hint: "מיקומים עשרוניים כמו 1.5, 2.5, 3.5 שמים חבטות בין הביטים הראשיים. זה מוסיף אנרגיה!",
    },
    {
      id: "faster-beat",
      text: "שנו BPM ל-140. איך הביט מרגיש עכשיו?",
      hint: "אותה תבנית, אנרגיה לגמרי אחרת. מהירות משנה הכל בתחושה של ביט.",
    },
    {
      id: "no-hats",
      text: "מחקו את כל שורות ה-hat מהתבנית. איך זה נשמע בלי היי-האטים?",
      hint: "היי-האטים מוסיפים אנרגיה קבועה של 'טס טס'. בלעדיהם הביט מרגיש פתוח ומרווח יותר.",
    },
  ],

  funFact:
    "מכונת התופים Roland TR-808 נכשלה כשיצאה ב-1980 כי היא לא נשמעה כמו תופים אמיתיים. אבל מפיקי היפ-הופ אהבו את הקיק המאסיבי שלה. היום זה מכונת התופים המפורסמת ביותר בהיסטוריה של פופ וראפ!",
};

export default lesson05He;
