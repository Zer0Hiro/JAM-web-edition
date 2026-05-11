const lesson19 = {
  id: 19,
  slug: "key-scales",
  title: "תישארו בסולם",
  subtitle: "נעלו את המוזיקה לסולם כדי שכל תו יישמע נכון",
  phase: 6,
  difficulty: 3,
  goal: "השתמשו ב-KEY כדי להכריז על סולם מוזיקלי ולהבין איך סולמות מעצבים את מצב הרוח של המוזיקה.",
  concepts: ["מפתחות מוזיקליים", "סולמות", "מחלקות גובה", "מז'ור מול מינור"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "?מה זה מפתח",
      content: `**מפתח** הוא קבוצת תווים שנשמעים טוב יחד. כשמנגנים רק תווים ממפתח אחד, המנגינה נשמעת מוזיקלית ו"מכוונת".

:ב-JEM, מכריזים על מפתח בתחילת הקובץ

\`\`\`
KEY C4 MAJOR
\`\`\`

"אני רוצה להשתמש בסולם דו מז'ור." אם בטעות תכתבו תו מחוץ לסולם, JEM יזהיר אתכם :זה אומר לקומפיילר`,
    },
    {
      title: "מז'ור מול מינור",
      content: `:**מז'ור** ו**מינור** :שני הסולמות הנפוצים ביותר הם

(חשבו על שירי יום הולדת) שמח, בהיר, מרומם — **מז'ור**
(חשבו על מוזיקת נבלים) עצוב, כהה, מסתורי — **מינור**

\`\`\`
KEY C4 MAJOR    # דו רה מי פה סול לה סי — שמח
KEY A4 MINOR    # לה סי דו רה מי פה סול — עצוב
\`\`\`

!נסו לשנות MAJOR ל-MINOR בקוד ושמעו איך מצב הרוח משתנה — אותו דפוס תווים, תחושה לגמרי שונה`,
    },
    {
      title: "סולמות אקזוטיים",
      content: `:JEM תומך ב-8 סולמות. נסו את אלה לווייבים שונים

| סולם | מצב רוח |
|-------|------|
| MAJOR | שמח, בהיר |
| MINOR | עצוב, כהה |
| PENTATONIC | פשוט, אוניברסלי — אי אפשר לפגוע בתו לא נכון! |
| BLUES | נשמתי, גס |
| DORIAN | ג'אזי, מתוחכם |
| PHRYGIAN | ספרדי, אקזוטי |
| LYDIAN | חלומי, מרחף |
| MIXOLYDIAN | בלוזי-רוק |

!**PENTATONIC** מעולה למתחילים — יש רק 5 תווים, אז כמעט כל מה שתנגנו יישמע טוב`,
    },
  ],

  code: `# תישארו בסולם -- סולמות מוזיקליים
# !שנו MAJOR ל-MINOR ושמעו את השינוי

BPM 120
KEY C4 MAJOR

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    VOLUME 180

INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    ADSR 200 100 400 300
    REVERB 120
    VOLUME 120

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 240

SEQUENCE melody:
    PLAY lead C4 0.5
    PLAY lead D4 0.5
    PLAY lead E4 0.5
    PLAY lead F4 0.5
    PLAY lead G4 1
    PLAY lead E4 0.5
    PLAY lead D4 0.5
    PLAY lead C4 1

SEQUENCE chords:
    PLAY pad [C3 E3 G3] 4

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE chords
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "go-minor",
      text: "שנו KEY C4 MAJOR ל-KEY C4 MINOR. האם המנגינה נשמעת עצובה יותר?",
      hint: ".פשוט שנו את המילה MAJOR ל-MINOR בשורת KEY",
    },
    {
      id: "pentatonic",
      text: "נסו KEY C4 PENTATONIC ושנו את המנגינה להשתמש רק בתווים C, D, E, G, A. זה אמור להישמע כמו מנגינה סינית!",
      hint: ".שנו ל-KEY C4 PENTATONIC. הסירו F4 מהמנגינה — החליפו ב-E4 או G4",
    },
    {
      id: "blues-scale",
      text: "הגדירו KEY E4 BLUES וכתבו מנגינה של 4 תווים עם E4, G4, A4, B4. הוסיפו DELAY לאפקט מגניב.",
      hint: ".שנו KEY ל-KEY E4 BLUES. הוסיפו DELAY 300 150 לכלי הליד",
    },
  ],

  funFact:
    "הסולם הפנטטוני נמצא במוזיקה של כמעט כל תרבות על פני כדור הארץ — ממוזיקה סינית עתיקה דרך שירים סקוטיים ועד סולואים של גיטרת בלוז. מדענים חושבים שאולי בני אדם מחווטים באופן טבעי לאהוב את 5 התווים האלה!",
};

export default lesson19;
