const lesson19He = {
  id: 19,
  slug: "musical-keys",
  title: "סולמות מוזיקליים",
  subtitle: "בחרו סולם ואף צליל לא ישמע לא במקום",
  phase: 6,
  difficulty: 3,
  goal: "השתמשו ב-KEY כדי לנעול את המוזיקה לסולם, ולמדו איך סולמות שונים יוצרים מצבי רוח שונים.",
  concepts: ["KEY", "סולמות מוזיקליים", "מז'ור ומינור", "פנטטוני", "בלוז", "מודוסים"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "מה זה סולם?",
      content: `**סולם** הוא אוסף צלילים שנשמעים טוב ביחד. חשבו על זה כמו בחירת פלטת צבעים לציור -- בוחרים פלטה ונשארים איתה, וככה הכל נראה (נשמע) הרמוני.

ב-JEM, מכריזים על סולם בראש הקובץ:

\`\`\`
KEY C4 MAJOR
\`\`\`

זה אומר ל-JEM: "תשתמש בסולם דו מז'ור." הצליל (C4) קובע את השורש, והמילה אחריו בוחרת את סוג הסולם.`,
    },
    {
      title: "מז'ור מול מינור",
      content: `שני הסולמות הכי חשובים:

- **KEY C4 MAJOR** = C D E F G A B -- שמח, בהיר, מעודד
- **KEY C4 MINOR** = C D Eb F G Ab Bb -- עצוב, כהה, מסתורי

\`\`\`
KEY C4 MAJOR    # אווירת מסיבת יומולדת
KEY C4 MINOR    # נושא של נבל קולנועי
\`\`\`

מילה אחת משנה את כל מצב הרוח. אותה מנגינה, תחושה לגמרי אחרת. נסו להחליף בין MAJOR ל-MINOR בקוד למטה!`,
    },
    {
      title: "פנטטוני ובלוז",
      content: `שני הסולמות האלה הם בעצם "מצב קל" -- כמעט בלתי אפשרי לפגוע בצליל לא נכון:

- **PENTATONIC** = 5 צלילים. נשמע טוב לא משנה מה תנגנו. בשימוש בכל תרבות על פני כדור הארץ -- מסין העתיקה ועד סולואים של גיטרת רוק.
- **BLUES** = 6 צלילים. מוסיף "צליל בלוז" אחד לקצה נשמתי ומחוספס.

\`\`\`
KEY C4 PENTATONIC    # אי אפשר לטעות
KEY E4 BLUES         # נשמה מיידית
\`\`\`

אם אתם מנגנים חופשי ורוצים להישמע מעולה בלי מאמץ, PENTATONIC הוא החבר הכי טוב שלכם.`,
    },
    {
      title: "סולמות אקזוטיים",
      content: `JEM תומך גם בארבעה מודוסים שנותנים טעמים פחות שגרתיים:

| סולם | אווירה |
|-------|--------|
| DORIAN | ג'אזי, חלק |
| PHRYGIAN | גיטרה ספרדית, אקזוטי |
| LYDIAN | חלומי, מרחף, מדע בדיוני |
| MIXOLYDIAN | רוק בלוזי, פאנקי |

נסו כל אחד עם אותה מנגינה. זה כמו לשים משקפי שמש בצבעים שונים -- אותו עולם, תחושה לגמרי אחרת!`,
    },
  ],

  code: `# סולמות מוזיקליים -- הישארו בסולם
# נסו לשנות MAJOR ל-MINOR, PENTATONIC או BLUES!

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
    REVERB 150
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
    PLAY lead E4 1
    PLAY lead G4 0.5
    PLAY lead A4 0.5
    PLAY lead G4 1
    PLAY lead E4 0.5
    PLAY lead D4 0.5
    PLAY lead C4 2

SEQUENCE chords:
    PLAY pad [C3 E3 G3] 4
    PLAY pad [F3 A3 C4] 4

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
      text: "שנו KEY C4 MAJOR ל-KEY C4 MINOR. אותם צלילים, אבל מצב הרוח עובר משמש לעננים.",
      hint: "שנו את המילה MAJOR ל-MINOR בשורת ה-KEY.",
    },
    {
      id: "try-pentatonic",
      text: "עברו ל-KEY C4 PENTATONIC. הסירו F4 מהמנגינה (החליפו ב-E4 או G4) כי פנטטוני לא כולל F.",
      hint: "שנו KEY ל-PENTATONIC. המנגינה כבר בעיקר משתמשת בצלילים פנטטוניים -- פשוט החליפו כל F4 ב-E4 או G4.",
    },
    {
      id: "blues-key",
      text: "הגדירו KEY E4 BLUES ושכתבו את המנגינה עם E4, G4, A4, Bb4, B4, D5. הוסיפו DELAY 300 150 ללידה לטעם נוסף.",
      hint: "שנו KEY ל-KEY E4 BLUES. שכתבו את שורות ה-PLAY עם צלילי סולם הבלוז. הוסיפו DELAY 300 150 בתוך כלי הלידה.",
    },
    {
      id: "phrygian-vibes",
      text: "נסו KEY E4 PHRYGIAN לתחושה ספרדית/פלמנקו. השתמשו בצלילים E4, F4, G4, A4, B4 במנגינה.",
      hint: "שנו KEY ל-KEY E4 PHRYGIAN והתאימו את צלילי המנגינה.",
    },
  ],

  funFact:
    "הסולם הפנטטוני מופיע במוזיקה של כל תרבות על פני כדור הארץ -- מוזיקת חצר סינית עתיקה, שירי עם סקוטיים, קצבים מערב-אפריקאיים וגיטרת בלוז. חלק מהמדענים מאמינים שבני אדם מחוברים באופן טבעי ליהנות מ-5 הצלילים האלה!",
};

export default lesson19He;
