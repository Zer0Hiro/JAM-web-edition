const lesson08 = {
  id: 8,
  slug: "multi-track",
  title: "!מיקס",
  subtitle: "שלבו בס, לידים ותופים",
  phase: 3,
  difficulty: 3,
  goal: "!בנו טראק עם בס, מנגינה ותופים -- הכל מתנגן ביחד",
  concepts: ["עיבודים מרובי כלים", "קווי בס", "שכבות"],
  estimatedMinutes: 15,

  steps: [
    {
      title: "לשירים יש שכבות",
      content: `חשבו על השיר האהוב עליכם. אפשר לשמוע דברים שונים קורים בו-זמנית:
- **בס** -- החלק העמוק והרועד
- **מנגינה** -- הלחן הראשי שהייתם מזמזמים
- **תופים** -- הביט שמחזיק הכל ביחד

!ב-JAM, יוצרים כלי נגינה נפרד לכל שכבה ומשלבים אותם`,
    },
    {
      title: "בנו קו בס",
      content: `בס משתמש בתווים נמוכים (C2, G2) וגל SAW לרעד העמוק:

\`\`\`
INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    VOLUME 220
\`\`\`

!קווי בס טובים פשוטים וחוזרניים. הם היסוד`,
    },
    {
      title: "ערמו הכל",
      content: `שימו הכל בתוך LOOP:

\`\`\`
LOOP 4:
    PLAY_SEQUENCE bassline
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat
\`\`\`

!JAM מנגן בס, אז מנגינה, אז תופים, וחוזר. זה טראק אמיתי

.לחצו Play כדי לשמוע את שלוש השכבות עובדות ביחד`,
    },
  ],

  code: `# Mix It Up
# Bass + lead + drums = a real track!

BPM 120

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 300 120
    VOLUME 220

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

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass C2 1
    PLAY bass G2 1
    PLAY bass F2 1

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

LOOP 2:
    PLAY_SEQUENCE bassline
    PLAY_SEQUENCE melody
    PLAY_PATTERN beat`,

  challenges: [
    {
      id: "add-snare",
      text: ".הוסיפו סנייר! צרו כלי DRUM חדש עם WAVE NOISE, FREQ 200, DECAY 60. ואז הוסיפו BEAT 2: snare ו-BEAT 4: snare ל-PATTERN",
      hint: "!kick על 1 ו-3, snare על 2 ו-4 -- זה הביט הקלאסי של רוק",
    },
    {
      id: "change-bass",
      text: "!שנו את תווי הבס ל-C2, E2, F2, G2. נשמע כאילו הוא 'הולך' למעלה",
      hint: "!קו בס הולך עולה צעד אחר צעד. ג'אז ופאנק משתמשים בזה הרבה",
    },
    {
      id: "add-hat",
      text: ".הוסיפו היי-האט על כל 4 הפעימות לצליל מלא יותר",
      hint: "!השתמשו ב-TYPE DRUM, WAVE NOISE, FREQ 800, DECAY 30. ואז הוסיפו שורות BEAT 1/2/3/4 hat ל-PATTERN",
    },
  ],

  funFact:
    "מיקס זה הכל על לתת לכל כלי נגינה מקום משלו. בס הולך נמוך, מנגינה באמצע, מצילות גבוה. לכן לא הכל נמרח לצליל בוצי אחד!",
};

export default lesson08;
