const lesson21He = {
  id: 21,
  slug: "song-craft",
  title: "יצירת שיר",
  subtitle: "בנו שיר שלם עם פיידים, שינויי טמפו וכל מה שלמדתם",
  phase: 7,
  difficulty: 4,
  goal: "שלבו כלים, סיקוונסים, פטרנים, PLAY_TOGETHER, לולאות, FADE_IN, FADE_OUT ושינויי BPM באמצע השיר לשיר מלא ורב-חלקי.",
  concepts: ["FADE_IN", "FADE_OUT", "BPM דינמי", "VOLUME דינמי", "AUDIO_RATE", "CONTROL_RATE", "מבנה שיר מלא"],
  estimatedMinutes: 15,

  steps: [
    {
      title: "פייד אין -- אינטרו דרמטי",
      content: `**FADE_IN** גורם למוזיקה לעלות משקט מוחלט. שימו אותו ממש לפני הקטע שאליו הוא מתייחס:

\`\`\`
FADE_IN 4
LOOP 2:
    PLAY_SEQUENCE intro
\`\`\`

המספר הוא כמה פעימות הפייד לוקח. פיידים קצרים (4 פעימות) מרגישים פתאומיים ואנרגטיים. פיידים ארוכים (16 פעימות) מרגישים קולנועיים, כמו פתיחת סרט.

טווח: 1-64 פעימות. ככל שהפייד ארוך יותר, הכניסה דרמטית יותר.`,
    },
    {
      title: "פייד אאוט -- הסיום הקלאסי",
      content: `**FADE_OUT** גורם למוזיקה להיעלם לתוך שקט. שימו אותו לפני הקטע האחרון:

\`\`\`
FADE_OUT 8
LOOP 2:
    PLAY_SEQUENCE outro
\`\`\`

ככה מאות שירים מפורסמים נגמרים -- הלהקה ממשיכה לנגן, אבל הווליום יורד לאט עד שלא נשאר כלום.

טריק מגניב: אפשר להשתמש ב-FADE_OUT עם לולאה ארוכה כדי שהשיר ייעלם לאט בזמן שהוא עדיין רץ. הביטלס עשו את זה במשך 4 דקות רצוף!`,
    },
    {
      title: "שינוי מהירות באמצע השיר",
      content: `שימו **BPM** בכל מקום בסידור כדי לשנות את הטמפו תוך כדי:

\`\`\`
BPM 90
PLAY_SEQUENCE intro
BPM 130
PLAY_SEQUENCE chorus
\`\`\`

אינטרו איטי (BPM 90) לתוך פזמון מהיר (BPM 130) יוצר גל של אנרגיה. או הפוך -- בית מהיר לתוך ברייקדאון איטי וכבד.

די-ג'ייז אמיתיים עושים את זה כל הזמן. עכשיו גם אתם יכולים.`,
    },
    {
      title: "שינויי ווליום ראשי",
      content: `השתמשו ב-**VOLUME** כפקודת סידור (לא בתוך כלי) כדי לשנות את העוצמה הכללית באמצע השיר:

\`\`\`
VOLUME 120
PLAY_SEQUENCE verse
VOLUME 220
PLAY_SEQUENCE chorus
\`\`\`

בית שקט, פזמון חזק. זה הטריק הכי ותיק בהפקת מוזיקה -- דינמיקה גורמת לשירים להרגיש חיים. בלי שינויי עוצמה, הכל נשמע שטוח ומשעמם.`,
    },
    {
      title: "הדברים הטכניים",
      content: `שתי הגדרות שכנראה לא תצטרכו לשנות, אבל טוב לדעת שהן קיימות:

- **AUDIO_RATE** -- כמה דגימות אודיו בשנייה. ברירת מחדל 16384. אפשר 32768 לאיכות צליל גבוהה יותר (צורך יותר כוח עיבוד). רלוונטי רק על חומרה.
- **CONTROL_RATE** -- כמה פעמים בשנייה אפקטים כמו LFO ומעטפות מתעדכנים. ברירת מחדל 64 הרץ. ערכים גבוהים = אפקטים חלקים יותר אבל יותר עומס על המעבד.

\`\`\`
AUDIO_RATE 32768
CONTROL_RATE 128
\`\`\`

רוב הפרויקטים עובדים מצוין עם ברירות המחדל. תשנו את אלה רק אם אתם דוחפים את ה-ESP32 לגבולות ורוצים להתנסות.`,
    },
    {
      title: "בנו שיר שלם",
      content: `הגיע הזמן לחבר את הכל ביחד. לשיר אמיתי יש חלקים:

- **אינטרו** -- פשוט, קובע את האווירה (אולי עם FADE_IN)
- **בית** -- הרעיון המרכזי, אנרגיה בינונית
- **פזמון** -- הרגע הגדול, אנרגיה מלאה, טמפו מהיר יותר
- **אאוטרו** -- נרגעים (עם FADE_OUT)

הקוד למטה משתמש בכלים, סיקוונסים, פטרנים, PLAY_TOGETHER, לולאות, פיידים ושינויי טמפו. זה שיר שלם. לחצו Play, שבו לאחור, ותהנו ממה שלמדתם לבנות!`,
    },
  ],

  code: `# יצירת שיר -- שיר שלם רב-חלקי
# אינטרו, בית, פזמון וסיום עם פייד אאוט

BPM 90

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 40 200 120
    DELAY 250 100
    VOLUME 180

INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    VOICES 2
    DETUNE 15
    CHORUS 80
    ADSR 200 100 400 300
    REVERB 150
    VOLUME 130

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 300 100
    CUTOFF 600
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 250

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 25
    VOLUME 130

INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 60
    VOLUME 200

# -- אינטרו: מנגינה עדינה לבד --
SEQUENCE intro_melody:
    PLAY lead C4 1
    PLAY lead E4 1
    PLAY lead G4 2
    PLAY lead E4 1
    PLAY lead C4 1
    REST 2

# -- בית: מנגינה + אקורדים + בס --
SEQUENCE verse_melody:
    PLAY lead C4 0.5
    PLAY lead D4 0.5
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1
    PLAY lead C4 1
    REST 2

SEQUENCE verse_chords:
    PLAY pad [C3 E3 G3] 4
    PLAY pad [A2 C3 E3] 4

SEQUENCE verse_bass:
    PLAY bass C2 1
    PLAY bass C2 0.5
    PLAY bass E2 0.5
    PLAY bass A1 1
    PLAY bass A1 0.5
    PLAY bass G1 0.5
    PLAY bass C2 1
    PLAY bass G1 1

# -- פזמון: אנרגיה גדולה, יותר מהיר --
SEQUENCE chorus_melody:
    PLAY lead G4 0.5
    PLAY lead A4 0.5
    PLAY lead C5 1
    PLAY lead A4 0.5
    PLAY lead G4 0.5
    PLAY lead E4 1
    PLAY lead G4 0.5
    PLAY lead A4 0.5
    PLAY lead C5 1
    PLAY lead D5 1
    PLAY lead C5 1

SEQUENCE chorus_chords:
    PLAY pad [F3 A3 C4] 4
    PLAY pad [G3 B3 D4] 4

SEQUENCE chorus_bass:
    PLAY bass F1 0.5
    PLAY bass F1 0.5
    PLAY bass A1 0.5
    PLAY bass C2 0.5
    PLAY bass G1 0.5
    PLAY bass G1 0.5
    PLAY bass B1 0.5
    PLAY bass D2 0.5

# -- פטרני תופים --
PATTERN verse_beat:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 2: hat
    BEAT 2.5: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: hat
    BEAT 4.5: hat

PATTERN chorus_beat:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 1.5: hat
    BEAT 2: snare
    BEAT 2: hat
    BEAT 2.5: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 3.5: hat
    BEAT 4: snare
    BEAT 4: hat
    BEAT 4.5: hat

# ===== סידור =====

# אינטרו: פייד אין, מנגינה לבד
FADE_IN 4
LOOP 2:
    PLAY_SEQUENCE intro_melody

# בית: להקה מלאה, קצת יותר מהיר
BPM 120
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE verse_melody
        PLAY_SEQUENCE verse_chords
        PLAY_SEQUENCE verse_bass
        PLAY_PATTERN verse_beat

# פזמון: אנרגיה מלאה, טמפו מהיר
BPM 140
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE chorus_melody
        PLAY_SEQUENCE chorus_chords
        PLAY_SEQUENCE chorus_bass
        PLAY_PATTERN chorus_beat

# אאוטרו: האטה, פייד אאוט
BPM 100
FADE_OUT 8
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE intro_melody
        PLAY_SEQUENCE verse_chords
        PLAY_PATTERN verse_beat`,

  challenges: [
    {
      id: "slow-fade-in",
      text: "שנו FADE_IN מ-4 פעימות ל-16 פעימות. האינטרו אמור להרגיש הרבה יותר הדרגתי וקולנועי, כמו פתיחת סרט.",
      hint: "שנו FADE_IN 4 ל-FADE_IN 16.",
    },
    {
      id: "quick-fade-out",
      text: "שנו FADE_OUT מ-8 ל-2 פעימות. הסיום אמור להרגיש פתאומי, כאילו מישהו שלף את התקע.",
      hint: "שנו FADE_OUT 8 ל-FADE_OUT 2.",
    },
    {
      id: "dramatic-bpm-drop",
      text: "הגדירו את האאוטרו ל-BPM 80 במקום 100. אאוטרו איטי אחרי פזמון מהיר יוצר ניגוד ענק -- כמו נשימה עמוקה אחרי ריצה.",
      hint: "שנו את ה-BPM 100 האחרון ל-BPM 80.",
    },
    {
      id: "add-volume-dynamics",
      text: "הוסיפו VOLUME 150 לפני הבית ו-VOLUME 255 לפני הפזמון. הפזמון יפגע חזק יותר כשהבית שקט.",
      hint: "הוסיפו VOLUME 150 בשורה חדשה לפני חלק הבית, ו-VOLUME 255 לפני חלק הפזמון.",
    },
    {
      id: "extra-section",
      text: "הוסיפו בית שני אחרי הפזמון (לפני האאוטרו) ב-BPM 120. שירים טובים חוזרים על מחזור בית-פזמון!",
      hint: "לפני חלק האאוטרו, הוסיפו BPM 120 ועוד בלוק LOOP 2 עם חלקי הבית.",
    },
  ],

  funFact:
    "'Hey Jude' של הביטלס מחזיק בשיא הפייד אאוט הארוך ביותר בשיר להיט -- יותר מ-4 דקות של 'נה נה נה נה' שנעלם לאט. המהנדס המשיך להוריד את הווליום בזמן שהלהקה המשיכה לשיר. חלק מדי-ג'ייז ברדיו היו מתחילים לדבר על הפייד אאוט לפני שהוא בכלל נגמר!",
};

export default lesson21He;
