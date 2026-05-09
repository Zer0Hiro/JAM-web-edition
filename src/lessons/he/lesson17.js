const lesson17 = {
  id: 17,
  slug: "live-automation",
  title: "שליטה חיה",
  subtitle: "שנו BPM ועוצמה באמצע השיר",
  phase: 5,
  difficulty: 4,
  goal: "השתמשו בשינויי BPM ו-VOLUME בתוך הסידור כדי ליצור האצות, האטות ושינויי דינמיקה.",
  concepts: ["אוטומציית BPM", "אוטומציית עוצמה", "דינמיקת שיר"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "שינוי מהירות באמצע השיר",
      content: `עד עכשיו, BPM נקבע פעם אחת בהתחלה. אבל מה אם השיר מואץ לפזמון?

ב-JEM, אפשר לשים **BPM** בתוך בלוק LOOP או סידור:

\`\`\`
LOOP 2:
    PLAY_SEQUENCE verse
BPM 160
LOOP 2:
    PLAY_SEQUENCE chorus
\`\`\`

הבית מנגן בטמפו המקורי, ואז **BPM 160** נכנס והפזמון מהיר יותר!`,
    },
    {
      title: "אוטומציית עוצמה",
      content: `אפשר גם לשנות את **VOLUME** הראשי באמצע השיר:

\`\`\`
VOLUME 100
PLAY_SEQUENCE intro
VOLUME 200
PLAY_SEQUENCE main_part
VOLUME 255
PLAY_SEQUENCE climax
\`\`\`

זה יוצר אפקט בנייה -- השיר נהיה חזק יותר ככל שמתקדם. מעולה ליצירת מתח ושחרור!

VOLUME כאן הוא 0-255 ומשפיע על הכל אחריו.`,
    },
    {
      title: "שילוב שניהם",
      content: `השתמשו בשינויי BPM ו-VOLUME גם יחד כדי ליצור סידור אמיתי:

- התחילו איטי ושקט (אינטרו)
- האיצו והגבירו (בנייה)
- מהירות מלאה, עוצמה מלאה (דרופ)

הקוד למטה עושה בדיוק את זה. לחצו Play ותרגישו את האנרגיה נבנית!`,
    },
  ],

  code: `# שליטה חיה -- אוטומציית BPM ו-VOLUME
# שנו מהירות ועוצמה באמצע השיר!

BPM 90

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 30 200 100
    VOLUME 200

INSTRUMENT bass:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 5 40 300 120
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

SEQUENCE intro:
    PLAY lead C4 1
    PLAY lead E4 1
    PLAY lead G4 2

SEQUENCE verse:
    PLAY lead C4 0.5
    PLAY lead D4 0.5
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead E4 1

SEQUENCE chorus:
    PLAY lead G4 0.5
    PLAY lead A4 0.5
    PLAY lead C5 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

# אינטרו איטי
PLAY_SEQUENCE intro
# האצה לבית
BPM 120
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE verse
        PLAY_PATTERN beat
# פזמון מהיר וחזק!
BPM 150
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE chorus
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "slowdown",
      text: "הוסיפו האטה בסוף: אחרי הפזמון, הגדירו BPM בחזרה ל-80 ונגנו את האינטרו שוב כאאוטרו.",
      hint: "הוסיפו BPM 80 אחרי לולאות הפזמון, ואז PLAY_SEQUENCE intro בסוף.",
    },
    {
      id: "fade-out",
      text: "צרו פייד-אאוט על ידי ניגון הפזמון עוד 3 פעמים, כל פעם בהפחתת מהירות: BPM 130, אחר כך 110, אחר כך 90.",
      hint: "הוסיפו שלושה בלוקים נוספים: BPM 130 + PLAY_SEQUENCE chorus, BPM 110 + PLAY_SEQUENCE, BPM 90 + PLAY_SEQUENCE.",
    },
    {
      id: "dramatic-drop",
      text: "צרו דרופ דרמטי: נגנו את הבית ב-BPM 80, ואז קפצו פתאום ל-BPM 180 לפזמון. תרגישו את האנרגיה!",
      hint: "שנו את ה-BPM של הבית ל-80 ואת ה-BPM של הפזמון ל-180.",
    },
  ],

  funFact:
    "במוזיקה קלאסית, המנצח שולט בשינויי טמפו בזמן אמת על ידי הנפת השרביט מהר או לאט יותר. המונחים האיטלקיים 'אצ'לרנדו' (להאיץ) ו'ריטרדנדו' (להאט) כתובים ישר בתווים!",
};

export default lesson17;
