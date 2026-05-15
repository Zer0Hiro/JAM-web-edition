const lesson14 = {
  id: 14,
  slug: "stereo-space",
  title: "מרחב סטריאו",
  subtitle: "מקמו כלים משמאל, מימין ובמרכז",
  phase: 4,
  difficulty: 3,
  goal: "השתמשו ב-PAN כדי למקם כל כלי בשדה הסטריאו, ולפרוס את הלהקה בין הרמקולים.",
  concepts: ["פאנינג סטריאו", "PAN", "שמאל/מרכז/ימין"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "מה זה פאנינג?",
      content: `שימו אוזניות. חלק מהצלילים מגיעים מהאוזן השמאלית, חלק מהימנית, וחלק יושבים בדיוק באמצע. המיקום הזה נקרא **פאנינג**.

זה כמו לסדר להקה על הבמה. המתופף יושב במרכז, הגיטריסט עומד משמאל, הקלידן מימין. לכל נגן יש מקום משלו כדי שהצליל לא ייערם במקום אחד.`,
    },
    {
      title: "ערכי PAN",
      content: `הוסיפו PAN לכלי כדי למקם אותו בשדה הסטריאו:

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    PAN 200
    VOLUME 180
\`\`\`

המספר הולך מ-0 עד 255:
- **PAN 0** = שמאל קיצוני (רק אוזן שמאלית)
- **PAN 127** = מרכז (שתי האוזניים שווה) -- זו ברירת המחדל
- **PAN 255** = ימין קיצוני (רק אוזן ימנית)

כל מספר ביניהם שם את הצליל איפשהו בין שמאל לימין.`,
    },
    {
      title: "פרשו את הלהקה",
      content: `מיקס טוב נותן לכל כלי מקום משלו:

- **באס וקיק**: PAN 127 (מרכז) -- צלילים נמוכים עובדים הכי טוב באמצע
- **מנגינה ראשית**: PAN 180 (קצת ימינה) -- בולט בלי להיות קיצוני
- **קצב/אקורדים**: PAN 70 (קצת שמאלה) -- מאזן את המנגינה
- **היי-האט**: PAN 160 (קצת ימינה) -- מוסיף רוחב לתופים

כשלכל כלי יש מקום משלו, כל המיקס נשמע רחב ונקי יותר.`,
    },
    {
      title: "שימו אוזניות!",
      content: `PAN עובד רק עם אוזניות או רמקולים סטריאו (שני רמקולים נפרדים, שמאל וימין).

אם אתם מקשיבים דרך רמקול יחיד של טלפון או רמקול מונו, לא תשמעו שום הבדל. הצליל פשוט יוצא מנקודה אחת.

לשיעור הזה, אוזניות זה הדרך. תשמעו את הכלים מתפרסים מסביב לראש!`,
    },
  ],

  code: `# מרחב סטריאו
# מיקום כלים בין שמאל לימין עם PAN

BPM 120

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    PAN 127
    ADSR 5 40 300 120
    VOLUME 220

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    PAN 200
    ADSR 10 30 200 100
    VOLUME 180

INSTRUMENT rhythm:
    TYPE SYNTH
    WAVE SQUARE
    PAN 60
    ADSR 5 60 150 80
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

SEQUENCE chords:
    PLAY rhythm [C4 E4 G4] 2
    PLAY rhythm [F3 A3 C4] 2

PATTERN beat:
    BEAT 1: kick
    BEAT 2.5: kick
    BEAT 3: kick
    BEAT 4: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE chords
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "swap-sides",
      text: "החליפו את ערכי ה-PAN של lead ו-rhythm. עכשיו המנגינה מגיעה משמאל והאקורדים מימין. מרגיש שונה?",
      hint: "שנו PAN 200 של lead ל-PAN 60, ו-PAN 60 של rhythm ל-PAN 200.",
    },
    {
      id: "extreme-pan",
      text: "הגדירו את ה-lead ל-PAN 0 (שמאל קיצוני) ואת rhythm ל-PAN 255 (ימין קיצוני). דרמטי -- כאילו הכלים בחדרים נפרדים!",
      hint: "שנו PAN של lead ל-0 ו-PAN של rhythm ל-255.",
    },
    {
      id: "mono-compare",
      text: "הגדירו את כל הכלים ל-PAN 127 (מרכז). עכשיו הכל מונו. השוו עם הגרסה הסטריאו -- שמעו כמה יותר רחב המיקס עם פאנינג?",
      hint: "שנו את כל ערכי ה-PAN ל-127 בכל הכלים.",
    },
  ],

  funFact:
    "המיקסים הסטריאו המוקדמים של הביטלס השתמשו ב'פאנינג קיצוני' -- כל השירה ברמקול אחד, כל הכלים בשני. זה נשמע פרוע באוזניות! מיקסים מודרניים הרבה יותר עדינים, עם פיזור שווה.",
};

export default lesson14;
