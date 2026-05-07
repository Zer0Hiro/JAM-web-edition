const lesson01 = {
  id: 1,
  slug: "hello-sound",
  title: "!שלום, צליל",
  subtitle: "צרו את הצליל הראשון שלכם עם קוד",
  phase: 1,
  difficulty: 1,
  goal: "!כתבו את תוכנית ה-JAM הראשונה שלכם ושמעו צליל יוצא",
  concepts: ["BPM (קצב)", "בלוק INSTRUMENT", "SEQUENCE ו-PLAY"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "?מה זה JAM",
      content: `JAM מאפשר ליצור מוזיקה על ידי הקלדת מילים. אתם מקלידים, והוא מנגן. כמו לשלוח הודעה לרובוט שמייצר צלילים בשבילכם!

כל תוכנית JAM צריכה שלושה דברים:
1. **קצב** -- כמה מהר הביט הולך
2. **כלי נגינה** -- איזה סוג צליל
3. **רצף** -- אילו תווים לנגן`,
    },
    {
      title: "קבעו את המהירות",
      content: `שורה ראשונה: כמה מהר השיר הולך. BPM = "פעימות לדקה".

\`\`\`
BPM 120
\`\`\`

120 זה מהירות פופ רגילה. מספר גדול יותר = מהר יותר. קטן יותר = איטי יותר. פשוט!`,
    },
    {
      title: "צרו כלי נגינה",
      content: `עכשיו תגידו ל-JAM איזה צליל אתם רוצים:

\`\`\`
INSTRUMENT tone:
    TYPE SYNTH
    WAVE SIN
    ADSR 10 50 200 100
    VOLUME 200
\`\`\`

- **INSTRUMENT tone:** -- אתם קוראים לו "tone" (בחרו כל שם שבא לכם!)
- **TYPE SYNTH** -- הוא מנגן תווים (לא תוף)
- **WAVE SIN** -- צליל חלק וטהור כמו שריקה
- **ADSR** -- איך הצליל נכנס ויוצא (נלמד מאוחר יותר, אל תדאגו!)
- **VOLUME 200** -- כמה חזק (מקסימום 255)`,
    },
    {
      title: "בחרו תווים",
      content: `תגידו ל-JAM אילו תווים לנגן:

\`\`\`
SEQUENCE melody:
    PLAY tone C4 2
    REST 1
    PLAY tone E4 2
\`\`\`

- **PLAY tone C4 2** -- נגן תו C4 למשך 2 פעימות עם "tone"
- **REST 1** -- שקט למשך פעימה אחת
- **C4** הוא דו אמצעי בפסנתר. המספר קובע כמה גבוה או נמוך הצליל.`,
    },
    {
      title: "!לחצו Play",
      content: `שלב אחרון -- תגידו ל-JAM באמת לנגן:

\`\`\`
PLAY_SEQUENCE melody
\`\`\`

בלי השורה הזו, JAM יודע את השיר שלכם אבל לא ינגן אותו. זה כמו לכתוב מתכון אבל לשכוח לבשל!`,
    },
  ],

  code: `# Hello, Sound!
# Your very first JAM program

BPM 120

INSTRUMENT tone:
    TYPE SYNTH
    WAVE SIN
    ADSR 10 50 200 100
    VOLUME 200

SEQUENCE melody:
    PLAY tone C4 2
    REST 1
    PLAY tone E4 2
    REST 1
    PLAY tone G4 2

PLAY_SEQUENCE melody`,

  challenges: [
    {
      id: "change-note",
      text: "שנו את התו הראשון מ-C4 ל-A4 ולחצו Play. נשמע אחרת?",
      hint: "!A4 הוא התו שתזמורות משתמשות בו לכוונון -- הוא עושה בדיוק 440 רטטים בשנייה",
    },
    {
      id: "add-note",
      text: "!הוסיפו עוד שורה: PLAY tone C5 2 בסוף. C5 הוא כמו C4 אבל גבוה יותר",
      hint: ".פשוט הוסיפו שורת PLAY חדשה אחרי האחרונה, לפני PLAY_SEQUENCE",
    },
    {
      id: "change-tempo",
      text: "!שנו BPM 120 ל-BPM 200. וואו, מהיר",
      hint: "!200 BPM זה סופר מהיר -- זה המהירות של מוזיקת drum and bass",
    },
  ],

  funFact:
    "גל סינוס הוא הצליל הפשוט ביותר ביקום -- רק רטט חלק אחד. כל צליל אחר (הקול שלכם, גיטרה, צופר מכונית) נוצר על ידי ערבוב גלי סינוס ביחד!",
};

export default lesson01;
