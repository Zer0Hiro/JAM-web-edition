const lesson07He = {
  id: 7,
  slug: "band-mode",
  title: "מצב להקה",
  subtitle: "נגנו כמה כלים באותו זמן",
  phase: 2,
  difficulty: 2,
  goal: "השתמשו ב-PLAY_TOGETHER כדי לשכב כלים ולגרום להם לנגן בו-זמנית.",
  concepts: [
    "PLAY_TOGETHER",
    "נגינה בו-זמנית",
    "עיבודים מרובי כלים",
  ],
  estimatedMinutes: 12,

  steps: [
    {
      title: "הבעיה",
      content: `עד עכשיו, הכל מתנגן אחד אחרי השני. אם תכתבו:

\`\`\`
PLAY_SEQUENCE bassline
PLAY_SEQUENCE melody
\`\`\`

הבס מסיים לגמרי, ורק אז המנגינה מתחילה. ככה להקה לא עובדת! בלהקה אמיתית, כולם מנגנים ביחד.`,
    },
    {
      title: "PLAY_TOGETHER",
      content: `PLAY_TOGETHER גורם לכל מה שבתוכו להתחיל באותו זמן:

\`\`\`
PLAY_TOGETHER:
    PLAY_SEQUENCE bassline
    PLAY_SEQUENCE melody
    PLAY_PATTERN drums
\`\`\`

בס, מנגינה ותופים כולם נכנסים ביחד. כמו מנצח שאומר "1, 2, 3, יאללה!" הכל בתוך הבלוק נגמר כשהחלק הארוך ביותר נגמר.`,
    },
    {
      title: "בתוך LOOP",
      content: `שימו PLAY_TOGETHER בתוך LOOP ויש לכם טראק אמיתי:

\`\`\`
LOOP 4:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_PATTERN drums
\`\`\`

כל החלקים מתנגנים ביחד, ואז הכל חוזר 4 פעמים. ככה בונים שיר אמיתי -- שכבות של כלים שמנגנים ביחד, חוזרים כדי לבנות חלקים.

לחצו Play כדי לשמוע איך הקוד נשמע עם בס, לידים, kick ו-hat כולם ביחד!`,
    },
  ],

  code: `# Band Mode
# בס, ליד ותופים מנגנים ביחד

BPM 120

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 50 200 80
    VOLUME 200

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 40 150 100
    VOLUME 170

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 90
    VOLUME 255

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 25
    VOLUME 120

SEQUENCE bassline:
    PLAY bass C3 1
    PLAY bass C3 0.5
    REST 0.5
    PLAY bass G2 1
    PLAY bass G2 0.5
    REST 0.5

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1

PATTERN groove:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 2: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: hat

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_PATTERN groove`,

  challenges: [
    {
      id: "add-snare",
      text: "הוסיפו כלי סנר ושימו אותו על ביטים 2 ו-4 בתבנית.",
      hint: "צרו DRUM עם WAVE NOISE, FREQ 200, DECAY 60. ואז הוסיפו BEAT 2: snare ו-BEAT 4: snare לתבנית.",
    },
    {
      id: "add-harmony",
      text: "צרו SEQUENCE שלישי בשם harmony עם תווים גבוהים יותר (כמו G4, B4, C5). הוסיפו אותו בתוך PLAY_TOGETHER.",
      hint: "כתבו בלוק SEQUENCE חדש, ואז הוסיפו PLAY_SEQUENCE harmony בתוך בלוק ה-PLAY_TOGETHER.",
    },
    {
      id: "remove-together",
      text: "הסירו את בלוק ה-PLAY_TOGETHER (השאירו את שורות ה-PLAY_SEQUENCE וה-PLAY_PATTERN). תשמעו את ההבדל!",
      hint: "בלי PLAY_TOGETHER, כל חלק מתנגן אחד אחרי השני במקום באותו זמן. הבדל ענק!",
    },
  ],

  funFact:
    "בלהקה חיה, מוזיקאים מקשיבים אחד לשני ונשארים מסונכרנים בצורה טבעית. PLAY_TOGETHER הוא כמו מנצח דיגיטלי -- הוא אומר לכל כלי בדיוק מתי להתחיל כדי שכולם ינגנו בתזמון מושלם.",
};

export default lesson07He;
