const lesson03 = {
  id: 3,
  slug: "wave-surfing",
  title: "גלישת גלים",
  subtitle: "חקרו צורות צליל שונות",
  phase: 1,
  difficulty: 1,
  goal: ".שמעו איך SIN, SAW, SQUARE ו-TRIANGLE נשמעים שונה אחד מהשני",
  concepts: ["סוגי צורות גל", "טמבר", "איך אוסצילטורים מעצבים צליל"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "אותו תו, ויבה אחרת",
      content: `גיטרה וחליל יכולים לנגן את אותו תו אבל להישמע לגמרי אחרת. למה? **צורת** גל הצליל שונה!

.JAM נותן לכם 5 צורות גל לבחור מהן. לכל אחת אישיות משלה`,
    },
    {
      title: "הכירו את הגלים",
      content: `**SIN** -- חלק וטהור. כמו שריקה או מזלג כוונון.

.**SAW** -- זמזומי ובהיר. מעולה לבס ולצלילי לידים

!**SQUARE** -- חלול ורטרו. זה הצליל הקלאסי של משחקי וידאו

.**TRIANGLE** -- רך ועדין. כמו חליל שקט

!**NOISE** -- סטטי אקראי. מושלם לתופים, לא כל כך למנגינות`,
    },
    {
      title: "נסו בעצמכם",
      content: `בקוד מצד ימין, מצאו את השורה הזו:

\`\`\`
WAVE SAW
\`\`\`

שנו \`SAW\` ל-\`SQUARE\`, ואז לחצו Play. שומעים את ההבדל?

!עכשיו נסו \`TRIANGLE\` ו-\`SIN\`. לכל גל אופי משלו`,
    },
  ],

  code: `# Wave Surfing
# Change WAVE SAW to SIN, SQUARE, or TRIANGLE!

BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 40 180 100
    VOLUME 180

SEQUENCE riff:
    PLAY lead C4 0.5
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead C5 0.5
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead C4 1

PLAY_SEQUENCE riff`,

  challenges: [
    {
      id: "swap-wave",
      text: "שנו WAVE SAW ל-WAVE SQUARE. נשמע כמו משחק וידאו ישן?",
      hint: "!גלי Square שימשו במשחקי NES ו-Game Boy. משם מגיע הצליל הרטרו",
    },
    {
      id: "try-triangle",
      text: ".עכשיו נסו WAVE TRIANGLE. זה רך יותר ויותר רגוע",
      hint: ".גלי Triangle נשמעים קצת כמו חלילית או חליל רך",
    },
    {
      id: "noise",
      text: "(!נסו WAVE NOISE. מה קורה? (ספוילר: זה מוזר",
      hint: "!NOISE הם רטטים אקראיים -- מעולה לתופים ופיצוצים, אבל למנגינות? לא כל כך",
    },
  ],

  funFact:
    "ב-1822, מתמטיקאי בשם פורייה הוכיח שאפשר לבנות כל צליל ביקום על ידי ערבוב גלי סינוס פשוטים. הקול שלכם, נביחת כלב, רעם -- הכל פשוט גלי סינוס מוערמים!",
};

export default lesson03;
