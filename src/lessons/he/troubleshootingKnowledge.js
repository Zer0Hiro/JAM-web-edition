// JAMai ידע מקומי: פתרון תקלות במוזיקה, תכנות ואלקטרוניקה.

export const troubleshootingKnowledge = [
  {
    id: "trouble-no-sound",
    title: "אין צליל מהרמקול",
    tags: ["troubleshooting", "speaker", "no sound", "GPIO25", "GPIO26", "electronics"],
    category: "electronics",
    likelyCauses: [
      "חוטי הרמקול לא מחוברים ל-GPIO25 ול-GPIO26.",
      "חוטי הרמקול נוגעים אחד בשני.",
      "התוכנית לא רצה.",
      "ה-INSTRUMENT או ה-SEQUENCE שקטים.",
      "ה-VOLUME נמוך מדי.",
      "ה-ESP32 לא מחובר נכון."
    ],
    checks: [
      "בדקו שחוט רמקול 1 מחובר ל-GPIO25.",
      "בדקו שחוט רמקול 2 מחובר ל-GPIO26.",
      "בדקו שחוטי הרמקול נמצאים בעמודות נפרדות במטריצה.",
      "בדקו את VOLUME בקוד JAM.",
      "הריצו צליל בדיקה פשוט מאוד.",
      "חברו מחדש את ה-ESP32 אחרי בדיקת המעגל."
    ],
    safeAnswer:
      "בדקו את החיווט לפני חיבור לחשמל. אל תזיזו חוטים בזמן שהלוח מחובר לחשמל."
  },
  {
    id: "trouble-potentiometer",
    title: "הפוטנציומטר לא משנה את הצליל",
    tags: ["troubleshooting", "potentiometer", "GPIO34", "analog", "ADC"],
    category: "electronics",
    likelyCauses: [
      "הרגל האמצעית לא מחוברת ל-GPIO34.",
      "רגלי הצד לא מחוברות ל-3.3V ול-GND.",
      "הפוטנציומטר מחובר, אבל הקוד לא ממפה אותו לפרמטר של צליל.",
      "הפוטנציומטר לא מוכנס נכון למטריצה."
    ],
    checks: [
      "בדקו: רגל שמאלית -> מסילה אדומה / 3.3V.",
      "בדקו: רגל ימנית -> מסילה כחולה / GND.",
      "בדקו: רגל אמצעית -> GPIO34.",
      "בדקו שהקוד קורא את הערך האנלוגי מ-GPIO34.",
      "נסו לסובב את הכפתור לאט מצד לצד."
    ],
    safeAnswer:
      "אל תחברו את רגלי הצד של הפוטנציומטר לפינים אקראיים. השתמשו בחיווט של המדריך."
  },
  {
    id: "trouble-button",
    title: "הלחצן לא מגיב",
    tags: ["troubleshooting", "button", "GPIO12", "GPIO14", "digital input"],
    category: "electronics",
    likelyCauses: [
      "הלחצן לא עובר מעל החריץ של המטריצה.",
      "פין הלחצן מחובר ל-GPIO לא נכון.",
      "חיבור GND חסר.",
      "הקוד מצפה לפין של לחצן אחר.",
      "החוט רופף."
    ],
    checks: [
      "עבור Button A, בדקו GPIO12 ו-GND.",
      "עבור Button B, בדקו GPIO14 ו-GND.",
      "בדקו שכל לחצן עובר מעל החריץ המרכזי של המטריצה.",
      "בדקו שהצד הנגדי של הלחצן מחובר למסילת GND הכחולה.",
      "לחצו על לחצן אחד בכל פעם בזמן הבדיקה."
    ],
    safeAnswer:
      "בדקו את החיווט כאשר ה-ESP32 מנותק מהמחשב."
  },
  {
    id: "trouble-noisy-sound",
    title: "צליל רועש או מעוות",
    tags: ["troubleshooting", "noise", "distortion", "volume", "synthesis"],
    category: "music",
    likelyCauses: [
      "ה-VOLUME גבוה מדי.",
      "יותר מדי כלים מנגנים חזק באותו זמן.",
      "חוטי הרמקול רופפים.",
      "חוטי הרמקול נוגעים אחד בשני.",
      "ה-waveform באופן טבעי מזמזם, למשל SAW או SQUARE."
    ],
    checks: [
      "הורידו ערכי VOLUME.",
      "בדקו כלי אחד בכל פעם.",
      "בדקו את חוטי הרמקול.",
      "נסו SINE או TRIANGLE לצליל חלק יותר.",
      "השתמשו ב-ADSR release קצר יותר אם צלילים חופפים יותר מדי."
    ],
    safeAnswer:
      "אם הצליל נהיה פתאום צורם, הורידו volume ובדקו חיווט."
  },
  {
    id: "trouble-code-silent",
    title: "קוד JAM רץ אבל שקט",
    tags: ["troubleshooting", "JAM", "code", "silent", "programming"],
    category: "programming",
    likelyCauses: [
      "ה-SEQUENCE מכיל רק REST או תווים קצרים מאוד.",
      "שם ה-INSTRUMENT ב-SEQUENCE לא תואם לכלי שהוגדר.",
      "VOLUME הוא אפס או נמוך מדי.",
      "BPM או arrangement חסרים.",
      "הקוד משתמש ב-syntax שלא נתמך."
    ],
    checks: [
      "השתמשו בכלי מוכר אחד ובתו פשוט אחד.",
      "בדקו spelling מדויק של שם הכלי.",
      "העלו VOLUME בצורה מתונה.",
      "הסירו שכבות מיותרות ובדקו דוגמה מינימלית.",
      "בדקו שגיאות syntax."
    ],
    safeAnswer:
      "דבגו חלק קטן אחד בכל פעם במקום לשנות את כל התוכנית."
  }
];

export default troubleshootingKnowledge;
