const lesson18 = {
  id: 18,
  slug: "pluck-strings",
  title: "פרוט מיתרים!",
  subtitle: "צרו צלילי מיתרים ריאליסטיים עם סינתזת PLUCK",
  phase: 6,
  difficulty: 3,
  goal: "השתמשו בצורת הגל PLUCK כדי ליצור צלילי גיטרה, נבל ומיתרים פרוטים.",
  concepts: ["סינתזת Karplus-Strong", "צורת גל PLUCK", "עיצוב דעיכה", "צלילי מיתרים"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "?מה זה PLUCK",
      content: `**PLUCK** היא צורת גל מיוחדת שמדמה מיתרים פרוטים — כמו גיטרה, נבל או כינור פיציקטו.

בניגוד ל-SIN או SAW שחוזרים על אותה צורה לנצח, PLUCK מתחיל בפרץ רעש ומחליק את עצמו לאורך זמן. זה נקרא **סינתזת Karplus-Strong**.

\`\`\`
INSTRUMENT guitar:
    TYPE SYNTH
    WAVE PLUCK
    VOLUME 200
\`\`\`

!לא צריך ADSR — ל-PLUCK יש דעיכה טבעית מובנית`,
    },
    {
      title: "שליטה בדעיכה",
      content: `המאפיין **DECAY** שולט כמה זמן המיתר מצלצל. ערכים גבוהים = צליל ארוך יותר.

\`\`\`
INSTRUMENT short_pluck:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 50
    VOLUME 200

INSTRUMENT long_pluck:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 200
    VOLUME 200
\`\`\`

.דעיכה קצרה נשמעת כמו פריטה מושתקת. דעיכה ארוכה נשמעת כמו נבל שנותן למיתר לצלצל`,
    },
    {
      title: "מנגינות ואקורדים פרוטים",
      content: `PLUCK נשמע מעולה לארפג'יו (אקורדים שבורים) ותבניות פריטה:

\`\`\`
SEQUENCE arpeggio:
    PLAY guitar C4 0.25
    PLAY guitar E4 0.25
    PLAY guitar G4 0.25
    PLAY guitar C5 0.25
    PLAY guitar G4 0.25
    PLAY guitar E4 0.25
\`\`\`

:אפשר גם לפרוט אקורדים

\`\`\`
SEQUENCE strum:
    PLAY guitar [C4 E4 G4] 2
    PLAY guitar [A3 C4 E4] 2
\`\`\`

!נסו את הקוד בצד — הוא משלב פריטה ואקורדים`,
    },
  ],

  code: `# !פרוט מיתרים -- סינתזת מיתרים עם PLUCK
# צלילי גיטרה באמצעות Karplus-Strong

BPM 120

INSTRUMENT guitar:
    TYPE SYNTH
    WAVE PLUCK
    DECAY 150
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
    VOLUME 240

SEQUENCE picking:
    PLAY guitar C4 0.25
    PLAY guitar E4 0.25
    PLAY guitar G4 0.25
    PLAY guitar C5 0.25
    PLAY guitar G4 0.25
    PLAY guitar E4 0.25
    PLAY guitar D4 0.25
    PLAY guitar G4 0.25

SEQUENCE bass_line:
    PLAY bass_pluck C2 1
    PLAY bass_pluck C2 1
    PLAY bass_pluck G2 1
    PLAY bass_pluck F2 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE picking
        PLAY_SEQUENCE bass_line
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "short-decay",
      text: "שנו את DECAY של הגיטרה ל-30. איך זה משנה את התחושה? זה אמור להישמע כמו פריטה מושתקת.",
      hint: "שנו DECAY 150 ל-DECAY 30 בכלי הגיטרה.",
    },
    {
      id: "chord-strum",
      text: "החליפו את רצף הפריטה באקורדים: [C4 E4 G4] ל-2 פעימות, ואז [F3 A3 C4] ל-2 פעימות.",
      hint: "שנו PLAY guitar C4 0.25... ל-PLAY guitar [C4 E4 G4] 2 ו-PLAY guitar [F3 A3 C4] 2.",
    },
    {
      id: "add-reverb",
      text: "הוסיפו REVERB 120 לגיטרה. מיתרים פרוטים עם ריוורב נשמעים כמו נגינה באולם קונצרטים!",
      hint: "הוסיפו REVERB 120 בתוך בלוק INSTRUMENT של הגיטרה.",
    },
  ],

  funFact:
    "סינתזת Karplus-Strong הומצאה ב-1983 על ידי קווין קרפלוס ואלכס סטרונג. היא יוצרת צלילי מיתרים ריאליסטיים באמצעות לולאה קטנה של רעש אקראי שנהיה חלק יותר עם הזמן — המחשב שלכם ממש 'פורט' מיתר וירטואלי!",
};

export default lesson18;
