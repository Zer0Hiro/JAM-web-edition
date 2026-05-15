const lesson16He = {
  id: 16,
  slug: "sweep-and-spin",
  title: "סחיפה וסיבוב",
  subtitle: "סוויפ פילטר ופאנינג אוטומטי עם LFO",
  phase: 5,
  difficulty: 3,
  goal: "השתמשו ב-LFO CUTOFF לסוויפ פילטר אוטומטי וב-LFO PAN לפאנינג אוטומטי. שלבו כמה יעדי LFO על כלי אחד.",
  concepts: ["LFO CUTOFF (סוויפ פילטר)", "LFO PAN (פאנינג אוטומטי)", "שילוב יעדי LFO"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "LFO CUTOFF -- ואה ואה!",
      content: `זוכרים את פילטר ה-CUTOFF משיעור 11? הוא חוסם תדרים גבוהים. עכשיו תדמיינו שהפילטר הזה זז למעלה ולמטה אוטומטית. זה **LFO CUTOFF** -- צליל הוואה-ואה / בס אסיד הקלאסי.

\`\`\`
INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 2000
    LFO 1.5 200 CUTOFF
    VOLUME 220
\`\`\`

- **קצב** = כמה מהר הפילטר סוחף (הרץ)
- **עומק** = כמה ה-CUTOFF זז (0-255)
- לכלי **חייב** להיות CUTOFF מוגדר כדי שזה יעבוד

סוויפ איטי (0.5-2 הרץ) = ואה-ואה. סוויפ מהיר (4+ הרץ) = צליל אסיד מבעבע.`,
    },
    {
      title: "LFO PAN -- סיבוב אוטומטי",
      content: `LFO PAN מזיז כלי שמאלה וימינה בשדה הסטריאו אוטומטית. כאילו מישהו מסובב לאט רמקול סביבכם.

\`\`\`
INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    PAN 127
    LFO 0.5 100 PAN    # ESP32 עם I2S DAC בלבד!
    VOLUME 180
\`\`\`

- **קצב 0.3-0.5** = תנועת נשימה איטית
- **קצב 2-4** = אפקט סיבוב מהיר
- **עומק** = כמה רחוק הפאנינג זז מהמרכז (טווח 0-255)
- לכלי **חייב** להיות PAN מוגדר

**חשוב:** LFO PAN עובד רק על לוחות ESP32 עם פלט I2S DAC סטריאו. לא יקומפל על Arduino. התצוגה המקדימה באתר תדמה את זה בכל זאת!`,
    },
    {
      title: "שלבו ארבעה יעדי LFO",
      content: `כלי אחד יכול לקבל עד **ארבעה** LFO, אחד לכל יעד:

\`\`\`
INSTRUMENT mega:
    TYPE SYNTH
    WAVE SAW
    CUTOFF 3000
    PAN 127
    LFO 3.0 80 VOLUME     # טרמולו
    LFO 5.0 30 PITCH      # יברטו
    LFO 1.0 180 CUTOFF    # סוויפ פילטר
    LFO 0.5 100 PAN       # פאנינג אוטומטי (ESP32 בלבד!)
    VOLUME 200
\`\`\`

כל LFO רץ בקצב ועומק משלו. ביחד הם יוצרים צליל שפועם, מתנדנד, סוחף ומסתובב בו-זמנית!`,
    },
    {
      title: "מחברים הכל",
      content: `אתם כבר מכירים את אבני הבניין:
- **CUTOFF ו-RESONANCE** משיעור 11 (קסם הפילטר)
- **PAN** משיעור 14 (מרחב סטריאו)
- **LFO VOLUME ו-LFO PITCH** משיעור 15 (רעד וניעור)

עכשיו אפשר לשלב הכל. נסו את הקוד למטה -- לבס יש סוויפ פילטר וללידה יש פאנינג אוטומטי. חבשו אוזניות לאפקט המלא!`,
    },
  ],

  code: `# סחיפה וסיבוב -- LFO CUTOFF ו-LFO PAN
# סוויפ פילטר ופאנינג אוטומטי

BPM 100

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 60 300 100
    CUTOFF 2000
    RESONANCE 120
    LFO 1.5 200 CUTOFF
    VOLUME 220

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 40 200 120
    PAN 127
    LFO 0.5 100 PAN    # ESP32 עם I2S DAC בלבד!
    REVERB 100
    VOLUME 180

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

SEQUENCE bassline:
    PLAY bass C2 1 200 CUTOFF:800
    PLAY bass C2 0.5
    PLAY bass Eb2 0.5
    PLAY bass G2 1 200 CUTOFF:4000
    PLAY bass G2 1

SEQUENCE melody:
    PLAY lead G4 0.5
    PLAY lead Bb4 0.5
    PLAY lead C5 1
    REST 0.5
    PLAY lead Bb4 0.5
    PLAY lead G4 1

PATTERN beat:
    BEAT 1: kick
    BEAT 2.5: kick
    BEAT 4: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "faster-sweep",
      text: "הגבירו את מהירות הסוויפ של הבס לקצב 4.0. זה אמור להישמע מבעבע ואסידי!",
      hint: "שנו LFO 1.5 200 CUTOFF ל-LFO 4.0 200 CUTOFF בכלי הבס.",
    },
    {
      id: "deep-pan",
      text: "הגדילו את עומק הפאנינג האוטומטי של הלידה ל-200. המנגינה תתנדנד רחב בין האוזניים. השתמשו באוזניות!",
      hint: "שנו LFO 0.5 100 PAN ל-LFO 0.5 200 PAN בכלי הלידה.",
    },
    {
      id: "bass-tremolo-too",
      text: "הוסיפו LFO 2.0 80 VOLUME לבס כדי שהוא יפעום וגם יסחף בו-זמנית. ניעור כפול!",
      hint: "הוסיפו שורה חדשה LFO 2.0 80 VOLUME בתוך בלוק ה-INSTRUMENT של הבס.",
    },
    {
      id: "high-resonance",
      text: "העלו את RESONANCE של הבס ל-220. סוויפ הפילטר הופך חד וצורח -- בס אסיד קלאסי!",
      hint: "שנו RESONANCE 120 ל-RESONANCE 220 בכלי הבס.",
    },
  ],

  funFact:
    "פאנינג אוטומטי היה ענק במוזיקה הפסיכדלית של שנות ה-60. באלבום 'Electric Ladyland' של ג'ימי הנדריקס השתמשו בו כדי לגרום לגיטרות להסתחרר סביב הראש -- מהנדסי הסאונד ממש סובבו כפתור קדימה ואחורה תוך כדי הקלטה!",
};

export default lesson16He;
