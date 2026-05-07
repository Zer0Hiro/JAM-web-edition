const lesson04 = {
  id: 4,
  slug: "tick-tock",
  title: "טיק טוק",
  subtitle: "צרו קצב עם הפסקות",
  phase: 2,
  difficulty: 2,
  goal: ".השתמשו ב-REST כדי להוסיף שקט בין תווים וליצור קצב קליט",
  concepts: ["פקודת REST", "תבניות קצביות", "תזמון מוזיקלי"],
  estimatedMinutes: 10,

  steps: [
    {
      title: "!שקט הוא חלק מהמוזיקה",
      content: `מוזיקה זה לא רק תווים -- הרווחים בין התווים גם חשובים! בלי הפסקות, הכל נשמע כמו כתם גדול אחד של צליל.

\`REST\` יוצר שקט:

\`\`\`
REST 1
REST 0.5
REST 0.25
\`\`\`

!שלבו תווים קצרים עם REST ותקבלו קצב`,
    },
    {
      title: "הרגישו את ההבדל",
      content: `**בלי REST (משעמם):**
\`\`\`
PLAY synth C4 1
PLAY synth E4 1
PLAY synth G4 1
\`\`\`

**:(!עם REST (גרוב**
\`\`\`
PLAY synth C4 0.25
REST 0.25
PLAY synth E4 0.25
REST 0.25
PLAY synth G4 0.5
\`\`\`

!אותם תווים, אבל השני קופץ`,
    },
    {
      title: "בנו גרוב",
      content: `.לחצו Play כדי לשמוע את הקוד מצד ימין. שימו לב איך התווים הקצרים וה-REST יוצרים תחושה קליטה וקצבית, כמו ביט שתשמעו במשחק`,
    },
  ],

  code: `# Tick Tock
# A bouncy rhythm with rests!

BPM 130

INSTRUMENT lead:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 30 150 80
    VOLUME 180

SEQUENCE groove:
    PLAY lead C4 0.25
    PLAY lead C4 0.25
    REST 0.25
    PLAY lead Eb4 0.25
    REST 0.5
    PLAY lead G4 0.5
    PLAY lead F4 0.25
    REST 0.25

LOOP 3:
    PLAY_SEQUENCE groove`,

  challenges: [
    {
      id: "change-rhythm",
      text: "?שנו את ה-REST 0.5 באמצע ל-REST 0.25. מרגיש יותר הדוק",
      hint: "!REST קצר יותר = קצב מהיר יותר. הקצב נהיה אינטנסיבי יותר",
    },
    {
      id: "double-time",
      text: "!העלו את ה-BPM ל-170. עכשיו זה סופר מהיר",
      hint: "!אותם תווים, אנרגיה לגמרי אחרת. BPM משנה הכל",
    },
    {
      id: "add-loop",
      text: "!שנו LOOP 3 ל-LOOP 6. יותר חזרות = יותר היפנוטי",
      hint: "!חזרה היא המרכיב הסודי של מוזיקה קליטה. לכן פזמונים חוזרים",
    },
  ],

  funFact:
    "הברייק תופים המפורסם ביותר אי פעם הוא ה-'Amen break' -- רק 7 שניות של תופים משיר מ-1969. הוא נדגם באלפי שירים ברחבי היפ-הופ, ג'אנגל ודראם אנד בס!",
};

export default lesson04;
