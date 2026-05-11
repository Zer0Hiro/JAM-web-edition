const lesson21 = {
  id: 21,
  slug: "fade-effects",
  title: "פייד אין, פייד אאוט",
  subtitle: "מעברי ווליום חלקים לאינטרואים וסיומים מקצועיים",
  phase: 6,
  difficulty: 2,
  goal: "השתמשו ב-FADE_IN וב-FADE_OUT כדי ליצור רמפות ווליום חלקות לאינטרואים וסיומים מקצועיים.",
  concepts: ["פייד אין", "פייד אאוט", "אוטומציית ווליום", "מבנה שיר"],
  estimatedMinutes: 8,

  steps: [
    {
      title: "?מה זה פיידים",
      content: `**פייד** הוא שינוי הדרגתי בעוצמה. שומעים פיידים כמעט בכל שיר:

(כמו זריחה) המוזיקה מתחילה משקט ונהיית חזקה בהדרגה — **פייד אין**
(סיום שיר קלאסי) המוזיקה נהיית שקטה בהדרגה עד שנעלמת — **פייד אאוט**

:ב-JEM, פיידים הם סופר פשוטים

\`\`\`
FADE_IN 4       # פייד משקט למלא ב-4 פעימות
FADE_OUT 8      # פייד לשקט ב-8 פעימות
\`\`\`

.המספר הוא כמה פעימות הפייד לוקח`,
    },
    {
      title: "פייד אין — אינטרו דרמטי",
      content: `:שימו **FADE_IN** לפני הקטע שרוצים לפייד

\`\`\`
FADE_IN 4
LOOP 2:
    PLAY_SEQUENCE intro
\`\`\`

.4 הפעימות הראשונות יעלו בהדרגה משקט לעוצמה מלאה. כל מה שאחרי מתנגן בעוצמה רגילה

.פיידים קצרים (2-4 פעימות) מרגישים פתאומיים ודרמטיים. פיידים ארוכים (8-16 פעימות) מרגישים חלקים וקולנועיים`,
    },
    {
      title: "פייד אאוט — הסיום הקלאסי",
      content: `:שימו **FADE_OUT** לפני הקטע האחרון

\`\`\`
LOOP 2:
    PLAY_SEQUENCE chorus
FADE_OUT 8
LOOP 2:
    PLAY_SEQUENCE outro
\`\`\`

המוזיקה תיעלם בהדרגה על פני 8 פעימות. ככה מאות שירים מפורסמים נגמרים — הלהקה ממשיכה לנגן אבל כפתור הווליום לאט לאט יורד!

.נסו את הקוד בצד — הוא משתמש גם בפייד אין בהתחלה וגם בפייד אאוט בסוף`,
    },
  ],

  code: `# פייד אין, פייד אאוט -- מעברי ווליום חלקים
# הקשיבו לאינטרו ההדרגתי ולסיום הנעלם

BPM 120

INSTRUMENT lead:
    TYPE SYNTH
    WAVE TRIANGLE
    ADSR 10 30 200 100
    DELAY 250 100
    VOLUME 180

INSTRUMENT pad:
    TYPE SYNTH
    WAVE SAW
    ADSR 200 100 400 300
    REVERB 150
    VOLUME 130

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 240

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 800
    DECAY 25
    VOLUME 140

SEQUENCE melody:
    PLAY lead E4 0.5
    PLAY lead G4 0.5
    PLAY lead A4 1
    PLAY lead G4 0.5
    PLAY lead E4 0.5
    PLAY lead D4 1
    PLAY lead C4 1

SEQUENCE chords:
    PLAY pad [C3 E3 G3] 4

PATTERN beat:
    BEAT 1: kick
    BEAT 1: hat
    BEAT 2: hat
    BEAT 2.5: hat
    BEAT 3: kick
    BEAT 3: hat
    BEAT 4: hat
    BEAT 4.5: hat

# פייד אין ב-4 פעימות
FADE_IN 4
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE chords
        PLAY_PATTERN beat

# פייד אאוט ב-8 פעימות
FADE_OUT 8
LOOP 2:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE chords
        PLAY_PATTERN beat`,

  challenges: [
    {
      id: "slow-fade-in",
      text: "שנו FADE_IN מ-4 פעימות ל-16 פעימות. האינטרו אמור להרגיש הרבה יותר הדרגתי וקולנועי.",
      hint: ".שנו FADE_IN 4 ל-FADE_IN 16",
    },
    {
      id: "quick-fade-out",
      text: "שנו FADE_OUT מ-8 ל-2 פעימות. זה אמור להרגיש כאילו מישהו פתאום הוריד את הווליום.",
      hint: ".שנו FADE_OUT 8 ל-FADE_OUT 2",
    },
    {
      id: "only-fade-out",
      text: "הסירו את FADE_IN אבל השאירו את FADE_OUT. זה מבנה השיר הקלאסי ביותר — התחלה חזקה, נעלם בהדרגה.",
      hint: ".מחקו את שורת FADE_IN 4. השאירו את כל השאר אותו דבר",
    },
  ],

  funFact:
    "הפייד אאוט הארוך ביותר בשיר להיט הוא 'Hey Jude' של הביטלס — הוא דועך במשך יותר מ-4 דקות! הלהקה המשיכה לשיר 'נה נה נה נה' בזמן שהמהנדס לאט לאט סובב את כפתור הווליום למטה. חלק מדי-ג'ייז ברדיו נהגו להתחיל לדבר על הפייד אאוט לפני שהוא נגמר.",
};

export default lesson21;
