const lesson06 = {
  id: 6,
  slug: "loop-it",
  title: "!לופ על זה",
  subtitle: "חזרו ובנו את השיר שלכם",
  phase: 2,
  difficulty: 2,
  goal: ".השתמשו ב-LOOP כדי לחזור על מוזיקה ולבנות שיר עם חלקים שונים",
  concepts: ["חזרת LOOP", "מבנה שיר", "שילוב רצפים ותבניות"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "?למה לחזור",
      content: `כל שיר שאתם מכירים בנוי מחלקים שחוזרים. הפזמון חוזר, הביט ממשיך.

LOOP גורם לדברים לחזור:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE melody
\`\`\`

!זה מנגן את "melody" ארבע פעמים. בלי LOOP, הייתם צריכים להעתיק-הדביק הכל. בלאגן`,
    },
    {
      title: "לופ על כמה דברים",
      content: `שימו כמה דברים בתוך LOOP אחד:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN drums
\`\`\`

!כל פעם שעוברים: המנגינה מתנגנת, ואז התופים. ככה בונים חלק בשיר`,
    },
    {
      title: "בנו מיני-שיר",
      content: `השתמשו ב-LOOP שונים לחלקים שונים:

\`\`\`
LOOP 2:
    PLAY_SEQUENCE melody

LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN drums

PLAY_SEQUENCE melody
\`\`\`

!עכשיו לשיר שלכם יש התחלה, אמצע וסוף`,
    },
  ],

  code: `# Loop It!
# A melody that builds up when drums join in.

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
    BEAT 3: kick
    BEAT 2: snare
    BEAT 4: snare

# Intro -- melody alone
LOOP 2:
    PLAY_SEQUENCE melody

# Main section -- melody + drums
LOOP 4:
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat

# Ending
PLAY_SEQUENCE melody`,

  challenges: [
    {
      id: "more-loops",
      text: "!שנו את החלק הראשי ל-LOOP 8. זה נהיה היפנוטי",
      hint: "!מוזיקה אלקטרונית לעיתים קרובות חוזרת על אותו דבר 8 או 16 פעמים. זה שם אתכם בגרוב",
    },
    {
      id: "add-hat",
      text: ".הוסיפו כלי היי-האט ושימו אותו על כל 4 הפעימות ב-PATTERN",
      hint: "!השתמשו ב-TYPE DRUM, WAVE NOISE, FREQ 800, DECAY 30. ואז הוסיפו שורות BEAT 1/2/3/4 hat",
    },
    {
      id: "second-melody",
      text: ".צרו SEQUENCE שני בשם melody2 עם תווים שונים. נגנו אותו אחרי החלק הראשי",
      hint: ".צרו בלוק SEQUENCE חדש, ואז הוסיפו PLAY_SEQUENCE melody2 איפשהו בעיבוד",
    },
  ],

  funFact:
    "רעיון הלופ במוזיקה הומצא ב-1948 על ידי בחור שפשוט חתך סרט מגנטי לעיגולים שהתנגנו לנצח. היום, לופים הם אבני הבניין של כמעט כל המוזיקה האלקטרונית!",
};

export default lesson06;
