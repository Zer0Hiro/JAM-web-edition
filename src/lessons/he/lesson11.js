const lesson11 = {
  id: 11,
  slug: "playing-together",
  title: "לנגן ביחד",
  subtitle: "גרמו לכלי נגינה לנגן בו-זמנית",
  phase: 3,
  difficulty: 3,
  goal: "!למדו איך לגרום למספר כלי נגינה לנגן ברגע בדיוק אותו באמצעות PATTERNs",
  concepts: ["נגינה בו-זמנית", "PATTERN מרובה כלים", "שכבות על אותו ביט"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "אחד אחד מול הכל ביחד",
      content: `בשיעורים קודמים, כשכתבתם:

\`\`\`
PLAY_SEQUENCE bassline
PLAY_SEQUENCE melody
\`\`\`

JEM ניגן קודם בס, **ואז** מלודיה **אחרי** שהוא סיים. זה סדרתי -- אחד בכל פעם.

אבל במוזיקה אמיתית בס, מלודיה ותופים מתנגנים **באותו זמן**! איך עושים את זה?`,
    },
    {
      title: "הסוד: PATTERN",
      content: `PATTERN מאפשר לכם לשים תווים במיקומי ביט מסוימים. והנה הקסם: **אפשר לשים כלים שונים על אותו ביט!**

\`\`\`
PATTERN duo:
    BEAT 1: bass C2
    BEAT 1: lead E4
\`\`\`

שני הכלים מופעלים בביט 1 -- הם מנגנים **בו-זמנית**! JEM מערבב אותם יחד כדי שתשמעו את שניהם.`,
    },
    {
      title: "בניית להקה שלמה",
      content: `ערמו כמה כלים שרוצים על כל ביט:

\`\`\`
PATTERN band:
    BEAT 1: bass C2
    BEAT 1: lead E4
    BEAT 1: kick
    BEAT 2: bass C2
    BEAT 2: lead G4
    BEAT 3: bass G2
    BEAT 3: lead A4
    BEAT 3: kick
    BEAT 4: bass G2
    BEAT 4: lead G4
\`\`\`

קיק בביטים 1 ו-3, בס וליד בכל ביט. זו להקה שלמה שמנגנת ביחד!

לחצו Play כדי לשמוע.`,
    },
    {
      title: "טיפים לשכבות טובות",
      content: `כשכלי נגינה מנגנים בו-זמנית, שימו לב ל:

- **טווחי גובה שונים** -- בס הולך נמוך (C2, G2), ליד הולך גבוה (E4, A4). אם הכל באותו טווח, זה נשמע עכור.
- **איזון עוצמה** -- תופים יכולים להיות חזקים (255), בס בינוני (200), ליד יותר שקט (160). כוונו VOLUME כדי שכל חלק יישמע ברור.
- **תשמרו על פשטות** -- 2-3 כלים בו-זמנית נשמע מעולה. יותר מדי בבת אחת יכול להיות מבולגן על החומרה.`,
    },
  ],

  code: `# לנגן ביחד
# !בס + ליד + תופים בו-זמנית

BPM 110

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 300 120
    VOLUME 200

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    VOLUME 160

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 30
    VOLUME 120

PATTERN band:
    BEAT 1: bass C2
    BEAT 1: lead E4
    BEAT 1: kick
    BEAT 1: hat
    BEAT 2: bass C2
    BEAT 2: lead G4
    BEAT 2: hat
    BEAT 3: bass G2
    BEAT 3: lead A4
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: bass G2
    BEAT 4: lead G4
    BEAT 4: hat

LOOP 4:
    PLAY_PATTERN band`,

  challenges: [
    {
      id: "add-melody-variation",
      text: "שנו את תווי הליד בביטים 2 ו-4 לתווים אחרים (נסו B4 ו-D5). שימו לב איך זה משנה את ההרגשה!",
      hint: ".תווים גבוהים בביטים זוגיים יוצרים תחושה של שאלה-תשובה",
    },
    {
      id: "add-snare",
      text: "הוסיפו סנר (WAVE NOISE, FREQ 200, DECAY 60) על ביטים 2 ו-4 לצד ההיי-האט.",
      hint: "!קיק על 1 ו-3, סנר על 2 ו-4 -- זה הביט הרוק הקלאסי! הוסיפו BEAT 2: snare ו-BEAT 4: snare",
    },
    {
      id: "two-bar-pattern",
      text: "הפכו את הפאטרן ל-8 ביטים על ידי הוספת ביטים 5-8 עם תווי בס אחרים (נסו E2, F2).",
      hint: ".פשוט תמשיכו! BEAT 5: bass E2, BEAT 5: lead C5 וכו'. פאטרנים ארוכים יותר = מוזיקה מעניינת יותר",
    },
  ],

  funFact:
    "!בתזמורת יש מעל 60 כלי נגינה שמנגנים בו-זמנית! תפקיד המנצח הוא כמו ה-PATTERN שלנו -- לוודא שכולם מנגנים בביט הנכון",
};

export default lesson11;
