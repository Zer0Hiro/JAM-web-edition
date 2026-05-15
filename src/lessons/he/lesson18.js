const lesson18He = {
  id: 18,
  slug: "fat-sounds",
  title: "צלילים שמנים",
  subtitle: "ערמו קולות לצלילים ענקיים ועוצמתיים",
  phase: 6,
  difficulty: 3,
  goal: "השתמשו ב-VOICES, DETUNE ו-CHORUS כדי להפוך אוסילטור בודד ודק לצליל ענק, רחב וממלא חלל.",
  concepts: ["יוניסון", "VOICES", "DETUNE", "CHORUS", "סופרסאו"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "למה קול אחד לא מספיק",
      content: `נגנו גל SAW בודד. זה נשמע ברור, אבל גם קצת דק. כמו בן אדם אחד שר.

עכשיו דמיינו מקהלה שלמה שרה את אותו צליל, כל קול קצת שונה בגובה. זה **יוניסון** -- כמה עותקים של אותו צליל, עם פערי גובה קטנים ביניהם. התוצאה מאסיבית.

בסינתיסייזרים, ככה עוברים מ"בסדר" ל"וואו".`,
    },
    {
      title: "VOICES ו-DETUNE",
      content: `**VOICES** שולט בכמה עותקים של האוסילטור מנגנים בו-זמנית. **DETUNE** שולט כמה רחוקים הם אחד מהשני בגובה (נמדד בסנטים -- 100 סנטים = חצי טון).

\`\`\`
INSTRUMENT fat_lead:
    TYPE SYNTH
    WAVE SAW
    VOICES 3
    DETUNE 20
    VOLUME 200
\`\`\`

- **VOICES 2** = שני עותקים, עיבוי עדין
- **VOICES 3** = שלושה עותקים, ממש שמן
- **DETUNE 10** = צמוד וממוקד
- **DETUNE 40** = רחב ומרוח

שימו לב: VOICES מעל 2 צורך יותר זיכרון. על לוח Arduino AVR, תישארו עם 2 -- ESP32 מסתדר עם 3-4 בקלות.`,
    },
    {
      title: "CHORUS -- רוחב מיידי",
      content: `**CHORUS** מוסיף דיליי קצר ומאופנן שגורם לאפילו קול בודד להישמע רחב ועשיר יותר. חשבו על זה כמו כפתור "תגדיל את הצליל".

\`\`\`
INSTRUMENT wide_pad:
    TYPE SYNTH
    WAVE SAW
    CHORUS 120
    VOLUME 180
\`\`\`

CHORUS הולך מ-0 (כבוי) עד 255 (מקסימום הרחבה). זה עובד אפילו עם VOICES 1, אז זו דרך זולה להוסיף שומן בלי זיכרון נוסף.`,
    },
    {
      title: "הסופרסאו",
      content: `שלבו את שלושתם לצליל **הסופרסאו** האגדי -- עמוד השדרה של טראנס, EDM ופיוצ'ר בייס:

\`\`\`
INSTRUMENT supersaw:
    TYPE SYNTH
    WAVE SAW
    VOICES 3
    DETUNE 20
    CHORUS 100
    REVERB 120
    VOLUME 180
\`\`\`

גל SAW + כמה קולות + דיטון + כורוס + ריוורב = קיר הצליל הענק הזה שאתם שומעים בכל דרופ בפסטיבל. לחצו Play ותרגישו את זה!`,
    },
  ],

  code: `# צלילים שמנים -- יוניסון, דיטון וכורוס
# השוו בין פד הסופרסאו ללידה הדקה!

BPM 100

INSTRUMENT supersaw:
    TYPE SYNTH
    WAVE SAW
    VOICES 3
    DETUNE 20
    CHORUS 100
    ADSR 100 80 300 200
    REVERB 120
    VOLUME 180

INSTRUMENT thin_lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 10 30 200 80
    VOLUME 200

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SQUARE
    ADSR 5 40 300 100
    VOLUME 220

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 240

SEQUENCE pad_chords:
    PLAY supersaw [C4 E4 G4] 4
    PLAY supersaw [A3 C4 E4] 4
    PLAY supersaw [F3 A3 C4] 4
    PLAY supersaw [G3 B3 D4] 4

SEQUENCE melody:
    PLAY thin_lead E5 0.5
    PLAY thin_lead D5 0.5
    PLAY thin_lead C5 1
    PLAY thin_lead D5 0.5
    PLAY thin_lead E5 0.5
    PLAY thin_lead G5 1
    REST 1
    PLAY thin_lead E5 0.5
    PLAY thin_lead D5 0.5
    PLAY thin_lead C5 1
    PLAY thin_lead B4 0.5
    PLAY thin_lead A4 0.5
    PLAY thin_lead G4 2

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass C2 1
    PLAY bass A1 1
    PLAY bass A1 1
    PLAY bass F1 1
    PLAY bass F1 1
    PLAY bass G1 1
    PLAY bass G1 1

PATTERN beat:
    BEAT 1: kick
    BEAT 3: kick

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE pad_chords
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE bassline
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "fatten-lead",
      text: "הוסיפו VOICES 2 ו-DETUNE 10 ללידה הדקה. השוו לפני ואחרי -- אפילו 2 קולות עושים הבדל ענק!",
      hint: "הוסיפו VOICES 2 ו-DETUNE 10 בתוך בלוק INSTRUMENT של thin_lead.",
    },
    {
      id: "max-detune",
      text: "העלו את DETUNE של הסופרסאו ל-80. זה נהיה מרוח וכמעט לא מכוון -- לפעמים זה בדיוק הוייב שמחפשים!",
      hint: "שנו DETUNE 20 ל-DETUNE 80 בכלי הסופרסאו.",
    },
    {
      id: "chorus-only",
      text: "הסירו VOICES ו-DETUNE מהסופרסאו אבל השאירו CHORUS 100. שמעו איך כורוס לבד מוסיף רוחב בלי אותו עובי.",
      hint: "מחקו את שורות VOICES 3 ו-DETUNE 20 מכלי הסופרסאו.",
    },
    {
      id: "triangle-pad",
      text: "שנו את WAVE של הסופרסאו מ-SAW ל-TRIANGLE. יוניסון של גלי משולש נשמע רך ואמביינטי יותר.",
      hint: "שנו WAVE SAW ל-WAVE TRIANGLE בכלי הסופרסאו.",
    },
  ],

  funFact:
    "הסינתיסייזר Roland JP-8000 הציג את צורת הגל 'SuperSaw' ב-1996 -- 7 גלי SAW מדוטנים מוערמים יחד. זה הפך לצליל של מוזיקת טראנס. אמנים כמו ארמין ואן בורן וטיאסטו בנו קריירות שלמות על צורת הגל הזו!",
};

export default lesson18He;
