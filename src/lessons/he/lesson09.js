const lesson09 = {
  id: 9,
  slug: "mega-riff",
  title: "מגה ריף",
  subtitle: "!בנו שיר אפי שלם",
  phase: 4,
  difficulty: 4,
  goal: "צרו קומפוזיציה שלמה עם אינטרו, חלק ראשי וסיום!",
  concepts: ["סידור שיר", "מבנה מוזיקלי", "שילוב כל הקונספטים"],
  estimatedMinutes: 15,

  steps: [
    {
      title: "חשבו כמו כותבי שירים",
      content: `לכל שיר גדול יש מבנה:

1. **אינטרו** -- התחילו פשוט, קבעו אווירה
2. **בנייה** -- הוסיפו עוד שכבות
3. **חלק ראשי** -- הכל בעוצמה מלאה!
4. **סיום** -- סגרו את העניין

אתם כבר מכירים את כל הכלים. עכשיו בואו נשתמש בכולם ביחד!`,
    },
    {
      title: "צליל משחק רטרו",
      content: `נשתמש בגל SQUARE לוייב הקלאסי של משחקי וידאו 8-ביט, בתוספת תופים חזקים.

הסוד הוא ADSR קצר:
\`\`\`
ADSR 2 60 0 40
\`\`\`
כל תו קופץ ונעלם מיד. חד!`,
    },
    {
      title: "סדרו את הכל",
      content: `הנה המבנה:

\`\`\`
# Intro -- רק מנגינה
LOOP 2:
    PLAY_SEQUENCE main_riff

# Full section -- מנגינה + תופים
LOOP 4:
    PLAY_SEQUENCE main_riff
    PLAY_PATTERN drums

# Ending
PLAY_SEQUENCE ending
\`\`\`

אינטרו נותן לכם לשמוע את המנגינה קודם. אחר כך תופים נכנסים. סיום עוטף הכל. לחצו Play ותהנו מהיצירה!`,
    },
  ],

  code: `# Mega Riff
# An epic retro game-style song!

BPM 120
AUDIO_RATE 16384

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SQUARE
    ADSR 2 60 0 40
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
    FREQ 900
    DECAY 50
    VOLUME 170

SEQUENCE main_riff:
    PLAY lead D4 0.25
    PLAY lead D4 0.25
    REST 0.25
    PLAY lead D5 0.25
    REST 0.25
    PLAY lead A4 0.5
    PLAY lead G#4 0.25
    PLAY lead G4 0.5
    PLAY lead F4 0.25
    REST 0.25

SEQUENCE ending:
    PLAY lead D4 0.5
    PLAY lead F4 0.25
    PLAY lead G4 0.75

PATTERN drums:
    BEAT 1: kick
    BEAT 2: snare
    BEAT 3: kick
    BEAT 4: snare

# Intro -- lead alone
LOOP 2:
    PLAY_SEQUENCE main_riff

# Full section -- lead + drums
LOOP 4:
    PLAY_SEQUENCE main_riff
    PLAY_PATTERN drums
    PLAY_SEQUENCE ending

# Final hit
PLAY_SEQUENCE ending`,

  challenges: [
    {
      id: "add-bass",
      text: "הוסיפו כלי בס (גל SAW, תווים כמו D2 ו-A2) שמנגן מתחת לריף הראשי!",
      hint: "שמרו על הבס פשוט -- רק 2-3 תווים ארוכים ונמוכים. הוא הבסיס, לא הכוכב!",
    },
    {
      id: "vary-ending",
      text: "הפכו את הסיום ליותר דרמטי! נסו תו גבוה כמו D6 מוחזק ל-2 פעימות.",
      hint: "לסיים על תו גבוה וארוך מרגיש כמו mic drop!",
    },
    {
      id: "longer-form",
      text: "הוסיפו 'גשר' בין החלק הראשי לסיום עם תווים שונים לגמרי.",
      hint: "גשר הוא חלק מפתיע ששומר על השיר ממשעמם!",
    },
  ],

  funFact:
    "המנגינה הזו בהשראת Megalovania מ-Undertale! טובי פוקס הוכיח שגלי SQUARE פשוטים והלחנה חכמה יכולים ליצור משהו אגדי. אתם משתמשים בדיוק באותם כלים!",
};

export default lesson09;
