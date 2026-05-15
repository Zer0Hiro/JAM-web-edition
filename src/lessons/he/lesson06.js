const lesson06He = {
  id: 6,
  slug: "loop-machine",
  title: "מכונת לולאות",
  subtitle: "חזרו, שכבו ובנו מבנה שיר",
  phase: 2,
  difficulty: 2,
  goal: "השתמשו ב-LOOP כדי לחזור על חלקים ולבנות מיני-שיר עם מבנה.",
  concepts: ["חזרת LOOP", "לולאות מקוננות", "מבנה שיר"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "למה לחזור?",
      content: `כל המוזיקה חוזרת. פזמון, בית, פזמון. הביט ממשיך. זה מה שעושה שירים קליטים.

LOOP גורם לדברים לחזור בלי copy-paste:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE melody
\`\`\`

זה מנגן את "melody" ארבע פעמים ברצף. המספר אחרי LOOP הוא כמה פעמים. כל מה שמוזח מתחת חוזר.`,
    },
    {
      title: "לולאה על כמה דברים",
      content: `אפשר לשים סיקוונסים ותבניות בתוך LOOP אחד. הם מתנגנים אחד אחרי השני, ואז כל הבלוק חוזר:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN drums
\`\`\`

כל פעם: melody מתנגן, אחר כך drums מתנגן, ואז חוזרים להתחלה. ככה בונים חלק בשיר!`,
    },
    {
      title: "לולאות מקוננות",
      content: `אפשר לשים LOOP בתוך LOOP. כמו בובת מטריושקה.

\`\`\`
LOOP 2:
    LOOP 4:
        PLAY_SEQUENCE riff
    PLAY_PATTERN drums
\`\`\`

הלולאה הפנימית רצה 4 פעמים כל פעם שהלולאה החיצונית מתקתקת פעם אחת. אז "riff" מתנגן 4 פעמים, אחר כך "drums" פעם אחת, ואז הכל חוזר. סך הכל: riff מתנגן 8 פעמים, drums מתנגן פעמיים.`,
    },
    {
      title: "בנו מיני-שיר",
      content: `לשירים אמיתיים יש חלקים -- אינטרו, בית, פזמון, סיום. השתמשו ב-LOOP שונים לכל חלק:

\`\`\`
# Intro -- רק מנגינה
LOOP 2:
    PLAY_SEQUENCE melody

# Main -- מנגינה + תופים
LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat

# Ending -- מנגינה פעם אחת
PLAY_SEQUENCE melody
\`\`\`

עכשיו למוזיקה שלכם יש התחלה, אמצע וסוף. לחצו Play כדי לשמוע את המבנה המלא!`,
    },
  ],

  code: `# Loop Machine
# מנגינה שמתעצמת כשתופים מצטרפים

BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    VOLUME 180

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 50
    VOLUME 200

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1

PATTERN beat:
    BEAT 1: kick
    BEAT 2: snare
    BEAT 3: kick
    BEAT 4: snare

# Intro -- מנגינה לבד
LOOP 2:
    PLAY_SEQUENCE melody

# Main -- מנגינה + תופים
LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat

# Ending
PLAY_SEQUENCE melody`,

  challenges: [
    {
      id: "more-loops",
      text: "שנו את החלק הראשי ל-LOOP 8. מרגיש יותר היפנוטי?",
      hint: "מוזיקה אלקטרונית חוזרת לפעמים על אותו דבר 8 או 16 פעמים. חזרה שמה אתכם בגרוב!",
    },
    {
      id: "add-hat",
      text: "הוסיפו כלי היי-האט (TYPE DRUM, WAVE NOISE, FREQ 800, DECAY 30) ושימו אותו על כל 4 הביטים בתבנית.",
      hint: "הוסיפו BEAT 1: hat, BEAT 2: hat, BEAT 3: hat, BEAT 4: hat לתבנית. אנרגיה מיידית!",
    },
    {
      id: "second-melody",
      text: "צרו SEQUENCE שני בשם melody2 עם תווים אחרים. נגנו אותו אחרי החלק הראשי בתור אאוטרו!",
      hint: "צרו בלוק SEQUENCE חדש עם תווים חדשים, ואז הוסיפו PLAY_SEQUENCE melody2 בסוף הסידור.",
    },
  ],

  funFact:
    "הרעיון של לולאות במוזיקה הומצא ב-1948 כשבחור פשוט חתך סרט מגנטי לעיגולים שניגנו לנצח. היום, לולאות הן אבני הבניין של כמעט כל המוזיקה האלקטרונית.",
};

export default lesson06He;
