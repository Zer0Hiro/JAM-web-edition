const lesson05 = {
  id: 5,
  slug: "beat-drop",
  title: "הביט נוחת",
  subtitle: "הוסיפו תופים למוזיקה",
  phase: 2,
  difficulty: 2,
  goal: "צרו צלילי תופים ובנו את תבנית הביט הראשונה שלכם!",
  concepts: ["כלי DRUM", "בלוק PATTERN", "מיקום BEAT"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "תופים הם מיוחדים",
      content: `תופים לא מנגנים תווים כמו C4 או G5. הם פשוט עושים בום או טשש בגובה אחד.

צרו תוף עם \`TYPE DRUM\`:

\`\`\`
INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 60
    DECAY 80
    VOLUME 255
\`\`\`

- **FREQ** = גובה הצליל (מספר נמוך = חבטה עמוקה)
- **DECAY** = כמה מהר הצליל נעלם
- **גל SIN + FREQ נמוך** = קיק מושלם!`,
    },
    {
      title: "סנר והיי-האט",
      content: `**סנר** (צליל ה"קראק") -- השתמשו ב-NOISE:
\`\`\`
INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 60
    VOLUME 220
\`\`\`

**היי-האט** (צליל ה"טס טס") -- NOISE אבל גבוה וקצר יותר:
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
      content: `PATTERN מאפשר לשים חבטות תופים במקומות ספציפיים בתיבה:

\`\`\`
PATTERN basic_beat:
    BEAT 1: kick
    BEAT 2: snare
    BEAT 3: kick
    BEAT 4: snare
\`\`\`

הביטים הולכים 1, 2, 3, 4. אפשר גם לערום צלילים על אותו ביט -- kick ו-hat באותו זמן!`,
    },
  ],

  code: `# Beat Drop
# A drum pattern with kick, snare, and hi-hat!

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
      text: "הוסיפו שורה: BEAT 3.5: kick. עכשיו יש לכם דאבל-קיק! מגניב, נכון?",
      hint: "אפשר להשתמש במספרים עשרוניים כמו 1.5, 2.5, 3.5 לחבטות בין הביטים הראשיים!",
    },
    {
      id: "faster",
      text: "שנו BPM ל-140. זה נהיה יותר אינטנסיבי!",
      hint: "אותו ביט, אווירה שונה. מהירות משנה את ההרגשה של מוזיקה!",
    },
    {
      id: "remove-hat",
      text: "מחקו את כל שורות ה-hat. איך הביט מרגיש בלי היי-האטים?",
      hint: "היי-האטים מוסיפים אנרגיה קבועה של 'טס טס'. בלעדיהם זה מרגיש יותר פתוח ומרווח.",
    },
  ],

  funFact:
    "מכונת התופים Roland TR-808 נכשלה כשיצאה ב-1980 כי היא לא נשמעה כמו תופים אמיתיים. אבל מפיקי היפ-הופ אהבו את הקיק העמוק שלה. היום זה צליל התופים המפורסם ביותר בפופ וראפ!",
};

export default lesson05;
