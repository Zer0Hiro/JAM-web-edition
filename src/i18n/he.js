const he = {
  dir: "rtl",

  // Nav
  nav: {
    home: "בית",
    lessons: "שיעורים",
    sandbox: "ארגז חול",
    sounds: "צלילים",
    guide: "מדריך בנייה",
  },

  // Hero
  hero: {
    badge: "Just ESP Music",
    titleBefore: "הפוך קוד ",
    titleHighlight: "למוזיקה",
    subtitle: "למדו ליצור צלילים, ביטים ושירים עם שפת JEM. כתבו קוד, שמעו אותו מתנגן, והעלו אותו ל-ESP32 - בלי ניסיון קודם.",
    startLearning: "התחילו ללמוד",
    tryEditor: "נסו את העורך",
    buildYourOwn: "בנו JEM משלכם",
    scrollToExplore: "גללו לגלות",
  },

  // Feature Cards
  features: {
    title: "מה זה",
    titleHighlight: "JEM",
    subtitle: "JEM (ג׳ם ESP מוזיקה) היא פלטפורמה חינמית ללמידת סינתזת קול דרך קוד. לא נדרש ניסיון קודם בתכנות או מוזיקה.",
    items: [
      { title: "כתבו קוד פשוט", description: "JEM היא שפה ידידותית למתחילים שמיועדת למוזיקה. אם אתם יודעים לכתוב הודעה, אתם יכולים לכתוב קוד JEM." },
      { title: "שמעו מיד", description: "לחצו Play ושמעו את היצירה שלכם ישר בדפדפן. בלי התקנות, בלי הורדות, בלי המתנה." },
      { title: "הריצו על חומרה אמיתית", description: "קמפלו את הקוד והעלו אותו ל-ESP32. המוזיקה שלכם מתנגנת על חומרה אמיתית דרך רמקול." },
      { title: "שיעורים צעד אחר צעד", description: "9 שיעורים שלוקחים אתכם מאפס להלחנת שירים שלמים. כל שורת קוד מוסברת." },
      { title: "סינתזת קול אמיתית", description: "למדו את אותן טכניקות סינתזה שמשמשות במוזיקה מקצועית: אוסצילטורים, מעטפות, מיקסינג ועוד." },
      { title: "צרו דברים מגניבים", description: "בנו צלילי משחקים רטרו, מכונות תופים, קווי בס ומנגינות. תרשימו את החברים." },
    ],
  },

  // How It Works
  howItWorks: {
    title: "איך זה",
    titleHighlight: "עובד",
    subtitle: "מהשורה הראשונה שתקלידו ועד לשמיעה על חומרה אמיתית - הנה המסע.",
    steps: [
      { title: "כתבו את הקוד", description: "השתמשו בשפת JEM כדי להגדיר כלי נגינה, מנגינות ותבניות תופים. התחביר פשוט וקריא." },
      { title: "תצוגה מקדימה בדפדפן", description: "לחצו על כפתור Play כדי לשמוע את היצירה מיד באמצעות Web Audio. לא צריך חומרה כדי להתחיל." },
      { title: "קמפלו ל-ESP32", description: "כשאתם מרוצים מהצליל, קמפלו את הקוד לקוד C++ אמיתי שרץ על ESP32." },
      { title: "נגנו על חומרה", description: "העלו ל-ESP32 וחברו רמקול לפין 9. הקוד שלכם הופך לגלי קול אמיתיים!" },
    ],
  },

  // Lesson List
  lessonList: {
    titleBefore: "למדו צעד אחרי ",
    titleHighlight: "צעד",
    subtitle: (count, phaseCount) => `${count} שיעורים ב-${phaseCount} שלבים. התחילו מאפס והגיעו להלחנת שירים שלמים.`,
    done: "הושלם",
    min: "דק׳",
    difficulty: "רמת קושי",
  },

  // Lesson phases
  phases: {
    1: { title: "יסודות", description: "למדו את הבסיס של צליל ושפת JEM" },
    2: { title: "קצב ותזמון", description: "הוסיפו ביטים, תופים ולולאות למוזיקה" },
    3: { title: "ביטוי", description: "עצבו את הצלילים ושלבו כלי נגינה" },
    4: { title: "שירים שלמים", description: "שלבו הכל יחד ליצירות מושלמות" },
  },

  // Lesson View
  lessonView: {
    allLessons: "כל השיעורים",
    phase: "שלב",
    lesson: "שיעור",
    tryThese: "!התור שלכם! נסו את אלה",
    tryTheseSubtitle: "ערכו את הקוד בצד ולחצו Play כדי לשמוע את השינויים. אין תשובות לא נכונות!",
    needHint: "?צריכים רמז",
    hideHint: "הסתירו רמז",
    showFunFact: "הראו עובדה מעניינת",
    hideFunFact: "הסתירו עובדה מעניינת",
    markComplete: "סמנו כהושלם",
    completed: "הושלם",
    nextLesson: "שיעור הבא",
    previousLesson: "שיעור קודם",
  },

  // Code Editor
  editor: {
    reset: "איפוס",
    compile: "קמפול",
    play: "נגן",
    stop: "עצור",
    oops: "!אופס",
    noInstrument: "צריך לפחות בלוק INSTRUMENT אחד. בדקו את השיעור לדוגמה!",
    noArrangement: "הקוד צריך PLAY_SEQUENCE או PLAY_PATTERN בתחתית כדי באמת לנגן משהו!",
    noNotes: "!אין תווים לנגן! ודאו שהרצף מכיל פקודות PLAY",
    genericError: (msg) => `משהו השתבש: ${msg}. בדקו שוב את הקוד לשגיאות כתיב!`,
    compileSuccess: "!הקומפילציה הצליחה! הקוד שלכם מוכן ל-ESP32",
    compileOffline: "שרת הקומפילציה לא מחובר. השתמשו בכפתור Play לתצוגה מקדימה בדפדפן!",
    lexerError: "יש מילה ש-JEM לא מזהה. בדקו שגיאות כתיב במילות מפתח (BPM, INSTRUMENT, PLAY וכו׳ חייבים להיות באותיות גדולות).",
    parseError: "JEM לא הצליח להבין את מבנה הקוד. ודאו ששורות מוזחות נמצאות בתוך בלוק (INSTRUMENT, SEQUENCE, PATTERN או LOOP).",
    undefinedInstrument: "אתם מנסים להשתמש בכלי נגינה שלא קיים. ודאו שהגדרתם אותו עם בלוק INSTRUMENT ושהשם מאוית נכון!",
    undefinedSequence: "אתם מנסים לנגן רצף שלא קיים. בדקו שהשם ב-PLAY_SEQUENCE תואם לבלוק SEQUENCE שלכם.",
    genericCompileError: "משהו השתבש. בדקו את הקוד לשגיאות כתיב!",
  },

  // Sandbox
  sandbox: {
    title: "ארגז חול",
    subtitle: "בלי חוקים, בלי שיעורים -- רק אתם והקוד. כתבו מה שבא לכם ולחצו Play כדי לשמוע. שברו דברים. נסו. תהנו.",
    waveforms: "צורות גל",
    notes: "תווים",
    structure: "מבנה",
    waveformItems: ["SIN -- חלק, נקי", "SAW -- זמזומי, בהיר", "SQUARE -- רטרו, חלול", "TRIANGLE -- עדין, רך", "NOISE -- אקראי, כלי הקשה"],
    noteItems: ["C4 = דו אמצעי", "A4 = 440 הרץ", "C#4 / Db4 = דיאזים/במולים", "C5 = אוקטבה מעל C4", "משך: 0.25 עד 4 פעימות"],
    structureItems: ["BPM קובע קצב", "INSTRUMENT מגדיר צלילים", "SEQUENCE מפרט תווים", "PATTERN ממקם פעימות", "LOOP חוזר על חלקים"],
  },

  // Sound Library
  soundLibrary: {
    interactive: "אינטראקטיבי",
    title: "ספריית צלילים",
    subtitle: "חקרו כל תו וצורת גל שאפשר להשתמש בהם ב-JEM. העבירו עכבר על תו כדי לשמוע אותו — העבירו על כרטיס גל כדי לשמוע את ההבדל.",
    noteExplorer: "סייר תווים",
    noteExplorerSub: "העבירו עכבר על תו כדי לשמוע. הקישו בנייד.",
    octave: "אוקטבה",
    middleOctave: "אוקטבה אמצעית",
    tip: ":טיפ",
    tipText: "ב-JEM, כותבים תווים כמו",
    tipSuffix: ". המספר הוא האוקטבה. הדיאזים (#) הם התווים הגבוהים מעט שביניהם.",
    waveComparison: "השוואת גלים",
    waveComparisonSub: "העבירו עכבר או לחצו על כל כרטיס כדי לשמוע איך צורת הגל נשמעת.",
    playing: "...מנגן",
    hearIt: "שמעו",
    playsA4: "מנגן A4 — 440 הרץ",
    whyDifferent: "?למה הם נשמעים שונה",
    whyDifferentText: "כל צורת גל אומרת לרמקול כמה מהר לרטוט ובאיזה דפוס. גל סינוס הוא חלק לחלוטין — רק תדר טהור אחד. גל מרובע קופץ בין מלא לכבוי, מה שמוסיף הרבה \"הרמוניות\" (תדרים נוספים) ונותן את הצליל המרוסק של 8-ביט. שן המסור מכיל עוד יותר הרמוניות, ולכן הוא נשמע כל כך זמזומי ובהיר.",
    waveDescs: {
      sine: "חלק ועגול — כמו זמזום או חליל. הצליל הנקי ביותר, בלי קצוות חדים.",
      sawtooth: "זמזומי ובהיר — חשבו על גיטרה חשמלית, סולו סינתיסייזר, או דבורה מזמזמת.",
      square: "חלול ורטרו — זה הצליל הקלאסי של משחקי וידאו 8-ביט. סופר חזק!",
      triangle: "רך אבל עם קצת אופי — כמו פד סינתיסייזר עדין או בס ישן.",
      noise: "כאוס טהור — כל התדרים בבת אחת. השתמשו לתופים, גשם או פיצוצים!",
    },
  },

  // Arduino Guide
  arduinoGuide: {
    title: "מדריך בניית ESP32",
    back: "חזרה",
    reset: "איפוס",
    resetProgress: "אפסו את כל ההתקדמות",
    stepsLabel: "שלבים",
    stepLabel: "שלב",
    of: "מתוך",
    imagePlaceholder: "תמונה תתווסף כאן",
    contentPlaceholder: "הוראות מפורטות יתווספו כאן.",
    tipLabel: ":טיפ",
    doneNext: "סיימתי — שלב הבא",
    finish: "!סיום",
    stepDone: "הושלם",
    nextStep: "שלב הבא",
    allDoneTitle: "!הכל מוכן",
    allDoneText: "ה-ESP32 שלכם מוכן לנגן מוזיקת JEM. לכו לשיעורים והתחילו להלחין!",
    steps: [
      {
        title: "מה צריך",
        subtitle: "אספו את החלקים לפני שמתחילים.",
        imagePlaceholder: "תמונה של כל החלקים הנדרשים מסודרים על שולחן",
        imageFilename: "step-1-parts.png",
        content: "רשימת חלקים ותיאורים יתווספו כאן.",
        tip: "כל החלקים האלה מגיעים ברוב ערכות ESP32 למתחילים.",
      },
      {
        title: "התקינו Arduino IDE",
        subtitle: "הורידו והתקינו את התוכנה לתכנות ה-ESP32.",
        imagePlaceholder: "צילום מסך של דף ההורדה של Arduino IDE",
        imageFilename: "step-2-ide.png",
        content: "הוראות הורדה והתקנה יתווספו כאן.",
      },
      {
        title: "התקינו ספריית Mozzi",
        subtitle: "הוסיפו את ספריית סינתזת הקול שבה JEM משתמש מאחורי הקלעים.",
        imagePlaceholder: "צילום מסך של Arduino Library Manager עם Mozzi",
        imageFilename: "step-3-mozzi.png",
        content: "הוראות התקנת ספריית Mozzi יתווספו כאן.",
      },
      {
        title: "חברו את המעגל",
        subtitle: "חברו את הרמקול ל-ESP32.",
        imagePlaceholder: "תרשים חיווט: ESP32 pin 9 → נגד → רמקול → GND",
        imageFilename: "step-4-wiring.png",
        content: "תרשים חיווט והוראות יתווספו כאן.",
        tip: "השתמשו בנגד 100Ω בין pin 9 לרמקול כדי להגן על ה-ESP32.",
      },
      {
        title: "כתבו קוד JEM",
        subtitle: "צרו מנגינה פשוטה באתר JEM.",
        imagePlaceholder: "צילום מסך של עורך JEM עם מנגינה פשוטה",
        imageFilename: "step-5-code.png",
        content: "הוראות לכתיבת תוכנית JEM ראשונה יתווספו כאן.",
      },
      {
        title: "קמפלו לקוד ESP32",
        subtitle: ".הפכו את קוד JEM ל-C++ שה-ESP32 מבין",
        imagePlaceholder: "צילום מסך שמראה את כפתור Compile והודעת הצלחה",
        imageFilename: "step-6-compile.png",
        content: "הוראות קומפילציה יתווספו כאן.",
      },
      {
        title: "העלו ל-ESP32",
        subtitle: "שלחו את הקוד המקומפל ללוח ה-ESP32.",
        imagePlaceholder: "צילום מסך של Arduino IDE מעלה את הסקיצה",
        imageFilename: "step-7-upload.png",
        content: "הוראות העלאה יתווספו כאן.",
        tip: "ודאו שבחרתם את הלוח הנכון (ESP32) ואת הפורט הנכון ב-IDE.",
      },
      {
        title: "!שמעו את המוזיקה",
        subtitle: "!ה-ESP32 שלכם עכשיו מנגן את המוזיקה שהלחנתם",
        imagePlaceholder: "תמונה של ההתקנה המושלמת עם רמקול מנגן",
        imageFilename: "step-8-done.png",
        content: "פתרון בעיות וצעדים הבאים יתווספו כאן.",
      },
    ],
  },

  // Footer
  footer: {
    tagline: "Just ESP Music",
    mozzi: "ספריית Mozzi",
    github: "GitHub",
    builtFor: ".נבנה ללמידה. מופעל על ידי Mozzi 2.0 ו-Web Audio API",
  },
};

export default he;
