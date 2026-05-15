const lesson22He = {
  id: 22,
  slug: "handpan-bells",
  title: "פעמוני הנדפאן",
  subtitle: "צלילים מהדהדים כמו תוף מתכת",
  phase: 6,
  difficulty: "advanced",
  goal: "השתמשו בגל HANDPAN כדי ליצור צלילים מתכתיים מהדהדים עם אוברטונים עשירים -- כמו תוף הנדפאן האמיתי שמשלב תהודה מתכתית עם מלודיות חמות.",
  concepts: ["WAVE HANDPAN", "סינתזה חיברית", "DECAY לזמן הדהוד", "HANDPAN עם אפקטים"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "מה זה HANDPAN?",
      content: `**WAVE HANDPAN** יוצר צלילים מתכתיים מהדהדים עם אוברטונים עשירים. הוא מדמה את הצליל הייחודי של תוף ההנדפאן -- כלי מתכת קעור שמנגנים עליו בכפות הידיים.

\`\`\`
INSTRUMENT pan:
    TYPE SYNTH
    WAVE HANDPAN
    DECAY 800
    VOLUME 200
\`\`\`

בניגוד לגלים פשוטים כמו SIN או SAW, ל-HANDPAN יש אופי מתכתי טבעי עם הרמוניות שנבנות ודועכות -- בדיוק כמו הקשה על משטח מתכת מכוונן.`,
    },
    {
      title: "DECAY שולט בזמן ההדהוד",
      content: `עם HANDPAN, **DECAY** קובע כמה זמן הצליל המתכתי מהדהד:

- **DECAY 200** = הקשה קצרה ויבשה, כמו טפיחה מושתקת
- **DECAY 500** = הדהוד בינוני, טבעי
- **DECAY 800** = הדהוד ארוך ועשיר, הצליל צף באוויר
- **DECAY 1200** = סאסטיין ארוך מאוד, כמו פעמון מדיטציה

ככל ש-DECAY ארוך יותר, כך הצליל המתכתי מצלצל יותר זמן -- מושלם למלודיות איטיות ומדיטטיביות.`,
    },
    {
      title: "אפקטים עם HANDPAN",
      content: `HANDPAN נשמע מדהים עם אפקטים:

**REVERB** מוסיף תחושת מרחב -- כמו לנגן במערה:
\`\`\`
REVERB 200
\`\`\`

**DELAY** יוצר הדי צלילים חוזרים -- כמו הרים שמחזירים הד:
\`\`\`
DELAY 375 100
\`\`\`

השילוב של REVERB ו-DELAY עם HANDPAN יוצר נוף קולי עשיר ועוטף -- המרחב מרגיש אינסופי.`,
    },
    {
      title: "בניית מלודיה להנדפאן",
      content: `הנדפאן מתאים למלודיות עם מרווחים גדולים בין תווים. שלבו תווים ארוכים וקצרים:

\`\`\`
SEQUENCE verse:
    PLAY pan D4 2
    PLAY pan A4 1
    PLAY pan Bb4 1
    PLAY pan F4 2
    PLAY pan A4 1
    PLAY pan E4 1
\`\`\`

שימו לב לקפיצות בין D4 ל-A4 -- המרווח הזה נותן תחושה פתוחה ומרחבית. תווים ארוכים (2 ביטים) נותנים להדהוד המתכתי מקום לנשום.`,
    },
  ],

  code: `# Handpan Bells
# Metallic ringing with overtones

BPM 72

INSTRUMENT pan:
    TYPE SYNTH
    WAVE HANDPAN
    DECAY 800
    REVERB 200
    DELAY 375 100
    VOLUME 200

SEQUENCE verse:
    PLAY pan D4 2
    PLAY pan A4 1
    PLAY pan Bb4 1
    PLAY pan F4 2
    PLAY pan A4 1
    PLAY pan E4 1

SEQUENCE chorus:
    PLAY pan D5 1
    PLAY pan A4 1
    PLAY pan F4 1
    PLAY pan E4 1
    PLAY pan D4 2
    REST 2

LOOP 2:
    PLAY_SEQUENCE verse
PLAY_SEQUENCE chorus`,

  challenges: [
    {
      id: "short-decay",
      text: "שנו את DECAY ל-200. שימו לב איך הצליל הופך יבש וקצר יותר -- כמו הקשה מהירה על מתכת במקום צלצול ארוך.",
      hint: "שנו DECAY 800 ל-DECAY 200 בכלי pan.",
    },
    {
      id: "second-handpan",
      text: "הוסיפו כלי HANDPAN שני בשם pan2 עם DECAY 400 ו-VOLUME 180. כתבו לו סיקוונס משלו והשמיעו את שניהם יחד עם PLAY_TOGETHER.",
      hint: "הגדירו INSTRUMENT pan2 עם WAVE HANDPAN, ואז צרו SEQUENCE חדש והשתמשו ב-PLAY_TOGETHER כדי לנגן את שני הסיקוונסים במקביל.",
    },
    {
      id: "add-cutoff",
      text: "הוסיפו CUTOFF 600 לכלי pan. זה מסנן תדרים גבוהים ונותן לצליל אופי חם וכהה יותר -- כמו הנדפאן עטוף בבד.",
      hint: "הוסיפו את השורה CUTOFF 600 בתוך הגדרת הכלי pan, מתחת ל-VOLUME.",
    },
  ],

  funFact:
    "ההנדפאן הומצא בשנת 2000 בשוויץ על ידי פליקס רוהנר וסבינה שרר. הם שילבו השראה מתוף הסטיל הטרינידדי עם מחקר אקוסטי מתקדם, ויצרו כלי נגינה חדש לגמרי שהפך לאהוב ברחבי העולם בזכות הצליל המדיטטיבי והייחודי שלו.",
};

export default lesson22He;
