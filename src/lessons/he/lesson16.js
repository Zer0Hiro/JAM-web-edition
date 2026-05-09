const lesson16 = {
  id: 16,
  slug: "stereo-space",
  title: "מרחב סטריאו",
  subtitle: "מקמו כלים שמאלה, במרכז או ימינה",
  phase: 5,
  difficulty: 4,
  goal: "השתמשו ב-PAN כדי למקם כלים בשדה הסטריאו -- אוזן שמאל, אוזן ימין, או בכל מקום ביניהם.",
  concepts: ["פאנינג סטריאו", "ערוצים שמאל/ימין", "אודיו מרחבי"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "מה זה פאנינג?",
      content: `עם אוזניות, שומעים צליל בשתי אוזניים בנפרד. **פאנינג** שולט באיזו אוזן שומעים יותר מכל כלי.

ב-JEM, הוסיפו **PAN** (0-255) לכלי:

\`\`\`
INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    PAN 0        # 0 = שמאל לגמרי
    VOLUME 200
\`\`\`

- **PAN 0** = שמאל לגמרי
- **PAN 127** = מרכז (ברירת מחדל)
- **PAN 255** = ימין לגמרי`,
    },
    {
      title: "פריסת הלהקה",
      content: `שימו כל כלי במקום שלו:

\`\`\`
INSTRUMENT bass:
    PAN 127    # מרכז (בס בדרך כלל במרכז)

INSTRUMENT lead:
    PAN 180    # קצת ימינה

INSTRUMENT rhythm:
    PAN 70     # קצת שמאלה
\`\`\`

זה יוצר "במה" שבה לכל כלי יש את המקום שלו. בדיוק כמו להקה אמיתית!`,
    },
    {
      title: "חבשו אוזניות!",
      content: `פאנינג עובד כמו שצריך רק עם אוזניות או רמקולי סטריאו. עם רמקול בודד לא תשמעו את ההבדל שמאל/ימין.

חבשו אוזניות ולחצו Play -- תצטרכו לשמוע את הבס במרכז, המנגינה ימינה, וגיטרת הריתם שמאלה!`,
    },
  ],

  code: `# מרחב סטריאו -- PAN שמאלה וימינה
# השתמשו באוזניות כדי לשמוע את האפקט המלא!

BPM 120

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 300 120
    PAN 127
    VOLUME 220

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    PAN 200
    VOLUME 180

INSTRUMENT rhythm:
    TYPE SYNTH
    WAVE SQUARE
    ADSR 5 20 150 80
    PAN 60
    VOLUME 140

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    PAN 127
    VOLUME 255

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass G2 1

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1

SEQUENCE chords:
    PLAY rhythm [C4 E4 G4] 2
    PLAY rhythm [F4 A4 C5] 2

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE chords
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "swap-sides",
      text: "החליפו את הפאנינג של הלידה והריתם (לידה שמאלה, ריתם ימינה). האם המיקס מרגיש אחרת?",
      hint: "שנו את PAN של הלידה ל-60 ושל הריתם ל-200.",
    },
    {
      id: "extreme-pan",
      text: "הגדירו את הלידה ל-PAN 0 (שמאל קשה) ואת הריתם ל-PAN 255 (ימין קשה). זה דרמטי אבל אולי מוגזם!",
      hint: "שנו ערכי PAN לקצוות: 0 ו-255.",
    },
    {
      id: "mono-compare",
      text: "הגדירו את כל הכלים ל-PAN 127 (מרכז). השוו עם הגרסה הסטריאו -- סטריאו נותן לכל כלי יותר מרחב!",
      hint: "שנו את כל ערכי ה-PAN ל-127 ותקשיבו. אחר כך שנו בחזרה.",
    },
  ],

  funFact:
    "המיקסים הסטריאו המוקדמים של הביטלס שמו את כל השירה ברמקול אחד ואת כל הכלים בשני -- זה נקרא 'פאנינג קשה'. מיקסים מודרניים הרבה יותר עדינים!",
};

export default lesson16;
