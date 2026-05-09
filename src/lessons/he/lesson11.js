const lesson11 = {
  id: 11,
  slug: "play-together",
  title: "כולם ביחד",
  subtitle: "נגנו כלי נגינה באותו הזמן בדיוק",
  phase: 3,
  difficulty: 3,
  goal: "השתמשו ב-PLAY_TOGETHER כדי שבס, מנגינה ותופים ינגנו בו-זמנית -- כמו להקה אמיתית!",
  concepts: ["PLAY_TOGETHER", "נגינה בו-זמנית", "סידורים בשכבות"],
  estimatedMinutes: 12,

  steps: [
    {
      title: "הבעיה עם אחד-אחרי-השני",
      content: `עד עכשיו, כשכותבים:

\`\`\`
PLAY_SEQUENCE bassline
PLAY_SEQUENCE melody
PLAY_PATTERN drums
\`\`\`

JEM מנגן את הבס **קודם**, אחר כך את המנגינה **אחריו**, ואז תופים **בסוף**. ככה להקה אמיתית לא עובדת -- כולם מנגנים באותו הזמן!`,
    },
    {
      title: "PLAY_TOGETHER מציל את המצב",
      content: `עטפו את הסיקוונסים והתבניות בבלוק **PLAY_TOGETHER** כדי למקסם אותם:

\`\`\`
PLAY_TOGETHER:
    PLAY_SEQUENCE bassline
    PLAY_SEQUENCE melody
    PLAY_PATTERN drums
\`\`\`

עכשיו שלושתם מנגנים בבת אחת -- הבס דוהר, המנגינה שרה, התופים שומרים על הקצב. ביחד!`,
    },
    {
      title: "בתוך LOOP",
      content: `אפשר לשים PLAY_TOGETHER בתוך LOOP כדי לחזור על כל הלהקה:

\`\`\`
LOOP 4:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_PATTERN beat
\`\`\`

זה חוזר על המיקס המלא 4 פעמים. כל הלהקה מנגנת ביחד בכל חזרה של הלולאה.

לחצו Play כדי לשמוע את ההבדל!`,
    },
  ],

  code: `# כולם ביחד!
# PLAY_TOGETHER גורם לכלים לנגן באותו הזמן

BPM 120

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 40 300 120
    VOLUME 220

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    VOLUME 180

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
    DECAY 30
    VOLUME 140

SEQUENCE bassline:
    PLAY bass C2 1
    PLAY bass C2 1
    PLAY bass G2 1
    PLAY bass F2 1

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1

PATTERN beat:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 2: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: hat

LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE bassline
        PLAY_SEQUENCE melody
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "add-snare",
      text: "הוסיפו סנר (WAVE NOISE, FREQ 200, DECAY 60) ושימו אותו על ביטים 2 ו-4 בתבנית. הוא ינגן ביחד עם כל השאר!",
      hint: "הוסיפו INSTRUMENT של סנר, ואז BEAT 2: snare ו-BEAT 4: snare לתבנית.",
    },
    {
      id: "second-melody",
      text: "צרו סיקוונס מנגינה שני בשם 'harmony' עם תווים גבוהים יותר (C5, E5, G5). הוסיפו אותו לבלוק PLAY_TOGETHER.",
      hint: "צרו SEQUENCE harmony: חדש עם תווי PLAY lead, ואז הוסיפו PLAY_SEQUENCE harmony בתוך PLAY_TOGETHER.",
    },
    {
      id: "compare",
      text: "נסו להוריד את PLAY_TOGETHER (השאירו את הסיקוונסים אבל תנגנו אותם אחד אחרי השני). שומעים את ההבדל? תחזירו את זה!",
      hint: "הורידו את שורת PLAY_TOGETHER: והוציאו את שורות PLAY_SEQUENCE מהזחה. אחר כך בטלו כדי לשמוע ביחד שוב.",
    },
  ],

  funFact:
    "כשלהקה מנגנת בהופעה חיה, כל נגן שומע את כולם ונשאר מסונכרן. PLAY_TOGETHER עושה את אותו הדבר -- הוא מיישר את כל החלקים כך שהם מתחילים בביט 1 ביחד, כמו מנצח שסופר '1, 2, 3, יאללה!'",
};

export default lesson11;
