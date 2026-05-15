const lesson17He = {
  id: 17,
  slug: "pluck-it",
  title: "!פרטו את זה",
  subtitle: "צלילי גיטרה ונבל עם סינתזת Karplus-Strong",
  phase: 6,
  difficulty: 3,
  goal: "השתמשו בגל PLUCK וב-DECAY כדי ליצור צלילי מיתר פרוטים ריאליסטיים כמו גיטרה, נבל ובנג'ו.",
  concepts: ["גל PLUCK", "סינתזת Karplus-Strong", "צלילי מיתר", "DECAY עם PLUCK"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "מה זה PLUCK?",
      content: `**WAVE PLUCK** יוצר צלילי גיטרה ונבל. הוא משתמש בטריק חכם בשם **סינתזת Karplus-Strong**: מתחילים עם פרץ קטנטן של רעש אקראי, ואז מחליקים אותו ממש מהר. התוצאה נשמעת כמו מיתר שנפרט!

\`\`\`
INSTRUMENT guitar:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 150
    VOLUME 200
\`\`\`

בניגוד לגלים אחרים (SIN, SAW, SQUARE), PLUCK יוצר צלילים שדועכים באופן טבעי -- בדיוק כמו מיתר גיטרה אמיתי שרוטט ולאט נעצר.`,
    },
    {
      title: "DECAY שולט בזמן הצלצול",
      content: `עם PLUCK, **DECAY** שולט כמה זמן המיתר מצלצל:

- **DECAY 30** = מושתק, פריטה קצרה (כמו גיטרה עם השתקת כף יד)
- **DECAY 150** = פריטת גיטרה רגילה
- **DECAY 300** = צלצול ארוך, כמו נבל או פעמון
- **DECAY 500** = סאסטיין ארוך מאוד, כמעט כמו פעמון

בניגוד ל-ADSR, ב-PLUCK משתמשים ב-DECAY לכל צורת הצליל. DECAY קצר = הדוק ומרוכז. DECAY ארוך = פתוח ומצלצל.`,
    },
    {
      title: "פריטה ואקורדים",
      content: `תווים קצרים ומהירים נשמעים כמו **פינגרפיקינג**:

\`\`\`
PLAY guitar C4 0.5
PLAY guitar E4 0.5
PLAY guitar G4 0.5
PLAY guitar C5 0.5
\`\`\`

השתמשו בסוגריים מרובעים ל**סטראמינג** (פריטת אקורד):

\`\`\`
PLAY guitar [C4 E4 G4] 2
PLAY guitar [A3 C4 E4] 2
\`\`\`

הוסיפו **REVERB** לצליל חדר ריאליסטי -- כמו לנגן גיטרה באולפן נעים במקום בארון מרופד.`,
    },
  ],

  code: `# !פרטו את זה -- צלילי מיתר Karplus-Strong
# פריטת גיטרה עם בס פרוט

BPM 120

INSTRUMENT guitar:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 150
    REVERB 80
    VOLUME 200

INSTRUMENT bass_pluck:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 200
    VOLUME 220

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
    DECAY 25
    VOLUME 140

SEQUENCE picking:
    PLAY guitar C4 0.5
    PLAY guitar E4 0.5
    PLAY guitar G4 0.5
    PLAY guitar C5 0.5
    PLAY guitar G4 0.5
    PLAY guitar E4 0.5
    PLAY guitar C4 0.5
    REST 0.5

SEQUENCE bass:
    PLAY bass_pluck C2 1
    PLAY bass_pluck G2 1
    PLAY bass_pluck A2 1
    PLAY bass_pluck E2 1

PATTERN beat:
    BEAT 1: kick
    BEAT 2: hat
    BEAT 3: kick
    BEAT 4: hat

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE picking
        PLAY_SEQUENCE bass
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "muted-pluck",
      text: "שנו את DECAY של הגיטרה ל-30. זה אמור להישמע מושתק והדוק, כמו מיתר גיטרה עם השתקת כף יד.",
      hint: "שנו DECAY 150 ל-DECAY 30 בכלי guitar.",
    },
    {
      id: "chord-strum",
      text: "החליפו את הארפג'יו בפריטת אקורדים: [C4 E4 G4] ל-2 ביטים, ואז [A3 C4 E4] ל-2 ביטים.",
      hint: "החליפו את כל שורות ה-PLAY בסיקוונס picking בשתי שורות אקורדים עם סוגריים מרובעים.",
    },
    {
      id: "add-reverb",
      text: "העלו את REVERB של הגיטרה ל-180. זה נשמע כמו לנגן באולם גדול?",
      hint: "שנו REVERB 80 ל-REVERB 180 בכלי guitar.",
    },
    {
      id: "harp-sound",
      text: "הגדירו DECAY ל-400 והאטו את ה-BPM ל-80. עכשיו זה נשמע יותר כמו נבל עדין מאשר גיטרה!",
      hint: "שנו DECAY 150 ל-DECAY 400 בגיטרה, ושנו BPM 120 ל-BPM 80.",
    },
  ],

  funFact:
    "סינתזת Karplus-Strong הומצאה ב-1983 על ידי קווין קרפלוס ואלכס סטרונג. היא יוצרת צלילי מיתר פרוטים ריאליסטיים מלולאה קטנטנה של רעש אקראי שנהיית חלקה יותר בכל חזרה -- המחשב ממש 'פורט' מיתר וירטואלי!",
};

export default lesson17He;
