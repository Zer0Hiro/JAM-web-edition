const lesson15He = {
  id: 15,
  slug: "wobble-and-shake",
  title: "רעד וניעור",
  subtitle: "הוסיפו טרמולו ויברטו עם LFO",
  phase: 5,
  difficulty: 3,
  goal: "השתמשו ב-LFO כדי להוסיף ניעור עוצמה אוטומטי (טרמולו) וניעור גובה צליל (יברטו) לכלים שלכם.",
  concepts: ["LFO", "טרמולו (LFO VOLUME)", "יברטו (LFO PITCH)", "קצב ועומק"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "מה זה LFO?",
      content: `**LFO** זה ראשי תיבות של Low Frequency Oscillator -- מתנד בתדר נמוך. תחשבו על זה כמו גל בלתי נראה שמנענע משהו אוטומטית. כאילו רובוט מסובב עבורכם כפתור למעלה ולמטה, שוב ושוב.

ל-LFO יש שני הגדרות:
- **קצב (Rate)** -- כמה מהר מנענע (בהרץ). 1 הרץ = ניעור מלא אחד בשנייה.
- **עומק (Depth)** -- כמה שינוי. גדול יותר = יותר דרמטי.`,
    },
    {
      title: "טרמולו -- ניעור עוצמה",
      content: `**LFO VOLUME** גורם לעוצמה לעלות ולרדת אוטומטית. זה נקרא **טרמולו**.

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    LFO 3.0 100 VOLUME
    VOLUME 200
\`\`\`

- **קצב 1-4** = פעימה עדינה (כמו נשימה)
- **קצב 6-10** = ניעור אינטנסיבי (כמו מסוק או אקדח לייזר)
- **עומק 0-255** = כמה העוצמה מתנדנדת

עומק נמוך זה עדין. העלו את זה והצליל פועם בכוח!`,
    },
    {
      title: "יברטו -- ניעור גובה צליל",
      content: `**LFO PITCH** מנענע את גובה הצליל למעלה ולמטה. זה נקרא **יברטו** -- זמרים וגיטריסטים עושים את זה באופן טבעי.

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    LFO 5.0 30 PITCH
    VOLUME 200
\`\`\`

העומק כאן נמדד ב**סנטים** (100 סנט = חצי טון):
- **20-50 סנט** = יברטו טבעי, כמו קול של זמר
- **100+ סנט** = צליל סירנה או אזעקה!

נסו לשמור על קצב של 4-6 הרץ לתחושה טבעית.`,
    },
    {
      title: "שלבו את שניהם!",
      content: `הנה החלק המגניב: אפשר לשים **גם** LFO VOLUME **וגם** LFO PITCH על אותו כלי. הם עובדים באופן עצמאי.

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    LFO 3.0 100 VOLUME
    LFO 5.0 30 PITCH
    VOLUME 200
\`\`\`

העוצמה פועמת ב-3 הרץ בזמן שגובה הצליל מתנדנד ב-5 הרץ. שני ניעורים בו-זמנית! נסו את הקוד למטה כדי לשמוע את זה בפעולה.`,
    },
  ],

  code: `# רעד וניעור -- טרמולו ויברטו
# LFO מוסיף תנועה אוטומטית לצליל

BPM 110

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 40 200 120
    LFO 3.0 100 VOLUME
    LFO 5.0 40 PITCH
    REVERB 120
    VOLUME 200

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SQUARE
    ADSR 5 60 300 100
    LFO 0.5 60 VOLUME
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead C4 1

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass G2 1
    PLAY bass A2 1
    PLAY bass G2 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE bassline
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "fast-tremolo",
      text: "שנו את קצב הטרמולו של הלידה ל-8.0. זה נשמע כמו אקדח לייזר או מסוק?",
      hint: "שנו LFO 3.0 100 VOLUME ל-LFO 8.0 100 VOLUME בכלי הלידה.",
    },
    {
      id: "wide-vibrato",
      text: "הגדירו את עומק היברטו של הלידה ל-150 סנט. זה יותר מחצי טון של ניעור גובה צליל -- מצב סירנה מלא!",
      hint: "שנו LFO 5.0 40 PITCH ל-LFO 5.0 150 PITCH בכלי הלידה.",
    },
    {
      id: "remove-bass-lfo",
      text: "הסירו את LFO VOLUME מהבס. השוו בין הבס היציב לגרסה המתנדנדת. מה נשמע יותר טוב?",
      hint: "מחקו את שורת LFO 0.5 60 VOLUME מכלי הבס.",
    },
    {
      id: "slow-deep-tremolo",
      text: "נסו טרמולו איטי ועמוק על הלידה: קצב 1.0 ועומק 200. זה אמור לפעום כמו פעימת לב.",
      hint: "שנו LFO 3.0 100 VOLUME ל-LFO 1.0 200 VOLUME בכלי הלידה.",
    },
  ],

  funFact:
    "מגבר הוויברולוקס של פנדר משנת 1956 סימן את כפתור הטרמולו שלו בתור 'vibrato' -- טעות טכנית! טרמולו זה ניעור עוצמה, יברטו זה ניעור גובה צליל. הבלבול הזה מבלבל גיטריסטים כבר יותר מ-60 שנה.",
};

export default lesson15He;
