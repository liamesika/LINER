// Battle Plan for Linear Algebra 1, Moed B 2025-26.
// Today: 2026-05-09 (Saturday). Exam: 2026-05-14 (Thursday).
// 5 study days × 8 hours = 40 hours.
//
// Strategy:
//   - Days 1-2: Lock in the 4-6 critical theorem proofs (Tier-1 + det multiplicativity)
//   - Day 3:    Computational fluency (matrices, systems, determinants)
//   - Day 4:    Past Moed B exams (2022B, 2023B, 2024B) under timed conditions
//   - Day 5:    Final review + Moed A 2025 retake + memorization sweep
//   - Day 6:    EXAM DAY (light review + transit/calm)

export interface BattleBlock {
  time: string;          // "08:00–09:30"
  hours: number;         // exact hours of focused work
  task: string;          // what to do
  ref: string;           // resource / page in the app
  type: 'theory' | 'practice' | 'memorize' | 'simulation' | 'review' | 'rest';
}

export interface BattleDay {
  day: number;           // 1..6
  date: string;          // ISO date
  weekday: string;       // Hebrew weekday
  title: string;
  focus: string;
  totalHours: number;
  blocks: BattleBlock[];
  deliverable: string;   // what you should be able to do by end of day
  theoremsToReview: number[];   // theorem ranks to drill today
  homeworkToSolve: number[];    // homework problem ranks to solve today
}

export const battlePlan: BattleDay[] = [
  {
    day: 1,
    date: '2026-05-09',
    weekday: 'שבת',
    title: 'יום 1 — הוכחות Tier-1 הקריטיות',
    focus: 'משפט הדרגה + טבלת ההפיכות + משפט השלוש (3 ההוכחות הכי חשובות)',
    totalHours: 8,
    theoremsToReview: [1, 2, 3],
    homeworkToSolve: [3, 4],
    blocks: [
      {
        time: '08:00–09:30',
        hours: 1.5,
        task: 'משפט הדרגה (Rank-Nullity) — קריאת הוכחה, הבנה, ואז כתיבה מהזיכרון',
        ref: '/top-theorems#1',
        type: 'theory',
      },
      {
        time: '09:30–10:00',
        hours: 0.5,
        task: 'הפסקה',
        ref: '',
        type: 'rest',
      },
      {
        time: '10:00–11:30',
        hours: 1.5,
        task: 'תרגיל 3: בסיס ל-NulA, ColA, RowA + אימות rank+dim(Nul)=n',
        ref: '/top-homework#3',
        type: 'practice',
      },
      {
        time: '11:30–13:00',
        hours: 1.5,
        task: 'משפט שקילויות ההפיכות — שינון 9 התנאים + תרגול שרשרת',
        ref: '/top-theorems#2',
        type: 'theory',
      },
      {
        time: '13:00–14:00',
        hours: 1,
        task: 'הפסקת צהריים',
        ref: '',
        type: 'rest',
      },
      {
        time: '14:00–15:30',
        hours: 1.5,
        task: 'משפט השלוש (dim V = n) — שתי הוכחות בשלילה',
        ref: '/top-theorems#3',
        type: 'theory',
      },
      {
        time: '15:30–17:00',
        hours: 1.5,
        task: 'תרגיל 4: rank(AB) = rank(B) (מועד א 2025 שאלה 5.2 — דרך אלמנטריות)',
        ref: '/top-homework#4',
        type: 'practice',
      },
      {
        time: '17:00–17:30',
        hours: 0.5,
        task: 'סיכום היום: כתוב 3 ההוכחות במחברת מהזיכרון',
        ref: '/top-theorems',
        type: 'memorize',
      },
    ],
    deliverable:
      'אתה יודע לכתוב את 3 ההוכחות הראשונות תוך 10-12 דק כל אחת, מהזיכרון, ללא רמזים.',
  },

  {
    day: 2,
    date: '2026-05-10',
    weekday: 'ראשון',
    title: 'יום 2 — הוכחות Tier-2 (det, rank rows=cols, Steinitz)',
    focus: 'מולטיפליקטיביות הדטרמיננטה + שוויון דרגות + שטיינל',
    totalHours: 8,
    theoremsToReview: [4, 5, 6, 9],
    homeworkToSolve: [8, 9, 5],
    blocks: [
      {
        time: '08:00–09:30',
        hours: 1.5,
        task: 'det(AB) = det(A)·det(B) — הוכחה ב-2 מקרים',
        ref: '/top-theorems#4',
        type: 'theory',
      },
      {
        time: '09:30–10:00',
        hours: 0.5,
        task: 'הפסקה',
        ref: '',
        type: 'rest',
      },
      {
        time: '10:00–11:30',
        hours: 1.5,
        task: 'תרגיל 8: חישוב det דרך דירוג למשולשית (4×4)',
        ref: '/top-homework#8',
        type: 'practice',
      },
      {
        time: '11:30–13:00',
        hours: 1.5,
        task: 'דרגת שורות = דרגת עמודות (משפט 5) + det(A^t) = det(A) (משפט 9)',
        ref: '/top-theorems#5',
        type: 'theory',
      },
      {
        time: '13:00–14:00',
        hours: 1,
        task: 'הפסקת צהריים',
        ref: '',
        type: 'rest',
      },
      {
        time: '14:00–15:30',
        hours: 1.5,
        task: 'למת שטיינל — הוכחת ההחלפה האינדוקטיבית',
        ref: '/top-theorems#6',
        type: 'theory',
      },
      {
        time: '15:30–17:00',
        hours: 1.5,
        task: 'תרגילים 5 + 9: span equality + סימטריות. שינון תבניות.',
        ref: '/top-homework#5',
        type: 'practice',
      },
      {
        time: '17:00–17:30',
        hours: 0.5,
        task: 'סיכום היום: רשימת 6 ההוכחות + מי משתמש במי',
        ref: '/top-theorems',
        type: 'memorize',
      },
    ],
    deliverable:
      'יש בידך 6 הוכחות מובנות. אתה יכול לזהות איזה משפט עוזר לאיזה משפט (תלות).',
  },

  {
    day: 3,
    date: '2026-05-11',
    weekday: 'שני',
    title: 'יום 3 — חישוב והכרה (טכניקות חזרתיות)',
    focus: 'מערכות עם פרמטר + הופכי ב-Z_p + dim(U+W)',
    totalHours: 8,
    theoremsToReview: [7, 8, 10],
    homeworkToSolve: [1, 2, 7, 10],
    blocks: [
      {
        time: '08:00–09:30',
        hours: 1.5,
        task: 'תרגיל 1: מערכת תלוית-פרמטר (a) — שינון התבנית',
        ref: '/top-homework#1',
        type: 'practice',
      },
      {
        time: '09:30–10:00',
        hours: 0.5,
        task: 'הפסקה',
        ref: '',
        type: 'rest',
      },
      {
        time: '10:00–11:30',
        hours: 1.5,
        task: 'תרגיל 2: הופכי מטריצה ב-Z_5 + שינון הופכים כפליים',
        ref: '/top-homework#2',
        type: 'practice',
      },
      {
        time: '11:30–13:00',
        hours: 1.5,
        task: 'משפט המימדים הראשון + תרגיל 7 (dim(U∩W) = n−2)',
        ref: '/top-theorems#7',
        type: 'theory',
      },
      {
        time: '13:00–14:00',
        hours: 1,
        task: 'הפסקת צהריים',
        ref: '',
        type: 'rest',
      },
      {
        time: '14:00–15:30',
        hours: 1.5,
        task: 'תרגיל 10: תת-מרחב ב-R_3[x] (פולינומים עם תנאי) — הכל הטכניקה',
        ref: '/top-homework#10',
        type: 'practice',
      },
      {
        time: '15:30–17:00',
        hours: 1.5,
        task: 'משפט 8 + 10 (תת-מרחב באותו מימד, יחידות הייצוג)',
        ref: '/top-theorems#8',
        type: 'theory',
      },
      {
        time: '17:00–17:30',
        hours: 0.5,
        task: 'בנק נוסחאות: כתוב את כל 10 הנוסחאות הקריטיות בכרטיסיה',
        ref: '/golden-rules',
        type: 'memorize',
      },
    ],
    deliverable:
      'אתה פותר תרגיל פרמטרים תוך 15 דק. אתה יודע את כל 10 ההוכחות הראשיות לפחות בקוים.',
  },

  {
    day: 4,
    date: '2026-05-12',
    weekday: 'שלישי',
    title: 'יום 4 — מבחני עבר (מועד ב 2022, 2023, 2024)',
    focus: 'תנאי מבחן: 3 שעות לכל מבחן, ניתוח שגיאות',
    totalHours: 8,
    theoremsToReview: [],
    homeworkToSolve: [],
    blocks: [
      {
        time: '08:00–11:00',
        hours: 3,
        task: 'מבחן 2022 מועד ב — בתנאי מבחן (3 שעות, ללא חומר עזר)',
        ref: '/exam2022b',
        type: 'simulation',
      },
      {
        time: '11:00–11:45',
        hours: 0.75,
        task: 'בדיקת תשובות + ניתוח שגיאות (כתוב כל שגיאה!)',
        ref: '/exam2022b',
        type: 'review',
      },
      {
        time: '11:45–12:30',
        hours: 0.75,
        task: 'הפסקה + צהריים',
        ref: '',
        type: 'rest',
      },
      {
        time: '12:30–15:30',
        hours: 3,
        task: 'מבחן 2023 מועד ב — בתנאי מבחן (3 שעות)',
        ref: '/exam2023b',
        type: 'simulation',
      },
      {
        time: '15:30–16:15',
        hours: 0.75,
        task: 'בדיקת תשובות + השוואה לטעויות מהמבחן הקודם',
        ref: '/exam2023b',
        type: 'review',
      },
      {
        time: '16:15–16:30',
        hours: 0.25,
        task: 'הפסקה',
        ref: '',
        type: 'rest',
      },
      {
        time: '16:30–17:30',
        hours: 1,
        task: 'מבחן 2024 מועד ב — שאלות שאתה יודע שחלשת בהן בלבד',
        ref: '/exam2024b',
        type: 'simulation',
      },
      {
        time: '17:30–18:00',
        hours: 0.5,
        task: 'רשימת "טעויות שלי" — שמור לסקירה ביום 5',
        ref: '/exam2024b',
        type: 'review',
      },
    ],
    deliverable:
      'יש לך תוצאות מבחן (אומדן ציון) ל-3 מבחני מועד ב. רשימת "השגיאות החוזרות" בידך.',
  },

  {
    day: 5,
    date: '2026-05-13',
    weekday: 'רביעי',
    title: 'יום 5 — סקירה אחרונה + מועד א 2025 + שינון',
    focus: 'תיקון נקודות חולשה + הזנה אחרונה של ההוכחות',
    totalHours: 8,
    theoremsToReview: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    homeworkToSolve: [],
    blocks: [
      {
        time: '08:30–11:30',
        hours: 3,
        task: 'מועד א 2025 (סימולציה אחרונה!) — בתנאי מבחן',
        ref: '/exam2025a',
        type: 'simulation',
      },
      {
        time: '11:30–12:00',
        hours: 0.5,
        task: 'בדיקה מול פתרונות',
        ref: '/exam2025a',
        type: 'review',
      },
      {
        time: '12:00–13:00',
        hours: 1,
        task: 'צהריים + הפסקה',
        ref: '',
        type: 'rest',
      },
      {
        time: '13:00–15:00',
        hours: 2,
        task: 'כתיבה מהזיכרון של 6 ההוכחות הראשונות (10 דק כל אחת)',
        ref: '/top-theorems',
        type: 'memorize',
      },
      {
        time: '15:00–15:30',
        hours: 0.5,
        task: 'הפסקה',
        ref: '',
        type: 'rest',
      },
      {
        time: '15:30–16:30',
        hours: 1,
        task: 'תיקון השגיאות החוזרות מיום 4 — תרגול ממוקד',
        ref: '/exams',
        type: 'practice',
      },
      {
        time: '16:30–17:30',
        hours: 1,
        task: 'בנק הנוסחאות + טבלת השקילויות + רשימת "מלכודות"',
        ref: '/golden-rules',
        type: 'memorize',
      },
      {
        time: '17:30–18:00',
        hours: 0.5,
        task: 'הכן ערכת מבחן: עט×3, מחק, סרגל, כריכת זיהוי, שעון',
        ref: '',
        type: 'rest',
      },
    ],
    deliverable:
      'יודע 10 ההוכחות בעל פה. כל 10 התרגילים פתורים. ציון משוער במבחן הסימולציה ≥85.',
  },

  {
    day: 6,
    date: '2026-05-14',
    weekday: 'חמישי',
    title: 'יום המבחן 🎯',
    focus: 'בוקר רגוע, סקירה קלה, מבחן',
    totalHours: 0,
    theoremsToReview: [],
    homeworkToSolve: [],
    blocks: [
      {
        time: '07:00–08:00',
        hours: 0,
        task: 'ארוחת בוקר טובה. תה / קפה. שחזור קצר של 3 ההוכחות הראשונות בלבד',
        ref: '/top-theorems',
        type: 'memorize',
      },
      {
        time: '08:00–09:00',
        hours: 0,
        task: 'בדוק טבלת השקילויות + נוסחאות (לא חומר חדש!)',
        ref: '/golden-rules',
        type: 'review',
      },
      {
        time: '09:00 ואילך',
        hours: 0,
        task: '🎯 המבחן! פתח קודם בשאלות שאתה הכי בטוח בהן. הקצב זמן: 35-40 דק לשאלה.',
        ref: '',
        type: 'simulation',
      },
    ],
    deliverable: 'בהצלחה! אתה מוכן.',
  },
];

export const examMeta = {
  examDate: '2026-05-14',
  examLabel: 'יום חמישי, 14 במאי 2026',
  daysFromToday: 5,           // when battle plan starts (2026-05-09)
  totalStudyHours: 40,
  hoursPerDay: 8,
  studyDays: 5,
};

export const goldenRules = [
  {
    title: 'תמיד לציין תנאים',
    body: 'A ∈ M_n(F), F שדה, V נוצר סופית — אל תשמיט אף תנאי. "תשובה לא מוסברת = 0 נקודות".',
  },
  {
    title: 'בקש את שם המשפט',
    body: '"לפי משפט הדרגה...", "לפי משפט השלוש..." — תמיד צטט בשם.',
  },
  {
    title: 'אם זה אמ"מ — שני כיוונים',
    body: 'הוכח (⇒) ואז (⇐). אל תניח שכיוון אחד מספיק.',
  },
  {
    title: 'פצל למקרים בעת מתן פרמטר',
    body: 'אם יש a ∈ R בשאלה, חייב לבחון את כל ערכי a שמשנים את הדירוג (אלכסון = 0?).',
  },
  {
    title: 'דירוג שורה: לעבוד שורה אחת בכל פעם',
    body: 'אסור לערבב מספר פעולות בשורה אחת — הבוחנים מורידים נקודות. כן: R_2→R_2−2R_1, אחרי כן: R_3→R_3+R_2.',
  },
  {
    title: '(AB)^t = B^t·A^t — היפוך הסדר',
    body: 'גם להופכי: (AB)⁻¹ = B⁻¹·A⁻¹. גם למכפלת אלמנטריות: (E_1...E_k)⁻¹ = E_k⁻¹...E_1⁻¹.',
  },
  {
    title: 'בודק לפני שמחלק',
    body: 'בכל שדה (במיוחד Z_p): ודא שהאיבר ≠ 0 לפני שאתה לוקח הופכי. ב-R: ודא ש-α ≠ 0.',
  },
  {
    title: 'אל תסתמך על תוצאות שלא הוכחו בקורס',
    body: '"אסור להישען על חומר שלא נלמד בקורס". אם אינך זוכר אם משפט נלמד — אל תשתמש בו.',
  },
];
