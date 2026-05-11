// Moed B 2025-26 Prediction — v2
// Updated based on user feedback:
//   - Linear transformations NOT taught (remove ker/Im/T²=αT)
//   - Uniqueness of representation already tested in Moed A Q1.1
//   - Span equality already tested in Moed A Q5.1
//   - rank(AB)/rank(Bᵗ) exact triple already tested in Moed A Q5.2
//   - det(A+B)(A-B) sym/anti tested in Moed A Q1.2
//   - Matrix algebra props tested in Moed A Q1.1

export interface PredictedQuestion {
  qNum: number;
  estimatedPoints: 25;
  topic: string;
  subtopics: string[];
  estimatedProbability: number;
  likelyFormat: string;
  suggestedTheorems: number[];
  suggestedHomework: number[];
  exampleQuestions: string[];
  whyThisTopic: string;
}

export const moedBStructure = {
  totalQuestions: 5,
  answer: 4,
  pointsPerQuestion: 25,
  durationHours: 3,
  noAuxiliaryMaterial: true,
  proofWeight: 0.5,
  computationWeight: 0.5,
};

// ─────────────────── TOP 10 HW TO SOLVE ───────────────────

export interface TopHwQuestion {
  rank: number;
  source: string;       // "HW11 Q1"
  topic: string;
  why: string;          // 1-line reason
  hwTopRank?: number;   // link to /top-homework#N if exists
}

export const top10HwToSolve: TopHwQuestion[] = [
  { rank: 1, source: 'HW11 Q1', topic: 'det 5×5 על Z₅ עם פרמטר α', why: 'משלב 3 חולשות: det + Z_p + פרמטר' },
  { rank: 2, source: 'HW9 Q6', topic: 'AB=Iₙ → BA=Iₙ דרך dim Wₖ', why: 'הוכחה ארוכה — בדיוק שקילות במשפט ההפיכות' },
  { rank: 3, source: 'HW9 Q4a + Q4b', topic: 'הופכי 3×3 על Z₇ + סכום שורות=c', why: 'תיקון ישיר ל-3.2 שלך (3/12)', hwTopRank: 2 },
  { rank: 4, source: 'HW3 Q2a', topic: 'מערכת 4 משתנים תלוית פרמטר (a²)', why: 'תיקון ל-4.1 שלך (0/12)', hwTopRank: 1 },
  { rank: 5, source: 'HW10 Q5b', topic: 'BA=0 → B=0 לכל B ⟹ A הפיכה', why: 'תרגול קריטריון הפיכות דרך שורות בת"ל' },
  { rank: 6, source: 'HW12 Q3', topic: 'בלוקים + det(AB) multiplicativity', why: 'מולטיפליקטיביות + בלוקים — תבנית מאתגרת' },
  { rank: 7, source: 'HW10 Q3b', topic: 'rank(A)=1 → A = x̄·ȳᵗ', why: 'משפט מבני אהוב על בוחנים' },
  { rank: 8, source: 'HW8 Q4a-c', topic: 'dim(U+W) ≤ dim V (3 סעיפים)', why: 'תרגול ישיר על משפט המימדים' },
  { rank: 9, source: 'HW12 Q2', topic: 'det תלת-אלכסונית = n+1 (אינדוקציה)', why: 'תרגול אינדוקציה + מינורים' },
  { rank: 10, source: 'HW11 Q3', topic: 'alternating + multilinear (האקסיומות)', why: 'הבנת הגדרת det על בסיס האקסיומות' },
];

// ─────────────────── PREDICTED 5 QUESTIONS ───────────────────

export const predictedQuestions: PredictedQuestion[] = [
  {
    qNum: 1,
    estimatedPoints: 25,
    topic: 'משפט הדרגה (Rank-Nullity) + יישום',
    subtopics: ['rank A', 'NulA', 'משפט הדרגה'],
    estimatedProbability: 95,
    likelyFormat: 'הגדרה (10 נק) + הוכחה מלאה של המשפט (15 נק)',
    suggestedTheorems: [1],
    suggestedHomework: [3],
    exampleQuestions: [
      'הגדירי rank A ו-NulA. הוכיחי NulA תת-מרחב.',
      'הוכיחי משפט הדרגה: rank A + dim NulA = n.',
      'וריאציה: הוכיחי שאם m < n אז Ax̄=0̄ יש פתרון לא טריוויאלי.',
    ],
    whyThisTopic:
      'לא נשאל ב-מועד א בכלל. משפט מרכזי שמקשר בין dim NulA, dim ColA, ו-rank. סבירות גבוהה ביותר.',
  },
  {
    qNum: 2,
    estimatedPoints: 25,
    topic: 'טבלת שקילויות ההפיכות — הוכחה מלאה',
    subtopics: ['A הפיכה', 'rank=n', 'עמודות בסיס', 'AB=I→BA=I'],
    estimatedProbability: 85,
    likelyFormat: 'הוכחה של זוג שקילויות + הוכחת AB=I → BA=I',
    suggestedTheorems: [2],
    suggestedHomework: [2, 4],
    exampleQuestions: [
      'הוכיחי: A הפיכה ⟺ עמודות A בסיס ל-Fⁿ.',
      'הוכיחי: A∈Mₙ(F), AB=Iₙ ⟹ BA=Iₙ. (כמו HW9 Q6)',
      'הוכיחי: A הפיכה ⟺ det(A) ≠ 0.',
    ],
    whyThisTopic:
      'מועד א בדק רק חישוב הופכי (Z_5 ב-3.2). הוכחה תיאורטית של שקילויות לא הופיעה.',
  },
  {
    qNum: 3,
    estimatedPoints: 25,
    topic: 'דטרמיננטות — הוכחה + חישוב',
    subtopics: ['det(AB) multiplicative', 'בלוקים', 'det על Z_p'],
    estimatedProbability: 80,
    likelyFormat: 'חישוב det על Z_p (12 נק) + הוכחה תיאורטית (13 נק)',
    suggestedTheorems: [4, 9],
    suggestedHomework: [8],
    exampleQuestions: [
      'חשבי det של מטריצה 4×4 על Z₇ בעזרת דירוג. (HW11 Q1 כפול 4×4)',
      'הוכיחי: det(AB) = det(A)·det(B). (פיצול ל-2 מקרים)',
      'det(K)=180, det(I-A)=-6 → חשבי det(I+A). (HW12 Q3!)',
    ],
    whyThisTopic:
      'מועד א בדק רק det של (A+B)(A-B) עם sym/anti (1.2 — את צלחת 8/8). מולטיפליקטיביות לא הוכחה.',
  },
  {
    qNum: 4,
    estimatedPoints: 25,
    topic: 'מערכת תלוית פרמטר + מימד',
    subtopics: ['פרמטרים', 'rank A vs rank A⁺', 'dim(U+W)', 'dim(U∩W)'],
    estimatedProbability: 90,
    likelyFormat: 'מערכת תלוית פרמטר (12 נק) + הוכחת מימד תת-מרחב (13 נק)',
    suggestedTheorems: [7, 8],
    suggestedHomework: [1, 7],
    exampleQuestions: [
      'לכל a∈R: x + ay = 0, y + az = a, ax + z = 1. מתי 0/יחיד/אינסוף?',
      'U, W ⊆ V, dim V = n, dim U = k, dim W = n-k+1. הוכיחי U ∩ W ≠ {0_V}.',
      'וריאציה ל-HW8 Q4a: dim V=6, dim U≥4, dim W≥5 → dim(U∩W) ≥ 3.',
    ],
    whyThisTopic:
      'את כשלת ב-4.1 (0/12) וב-4.2 (2/13) ב-מועד א. צפוי לחזור בצורה שונה (פרמטר אחר, n אחר).',
  },
  {
    qNum: 5,
    estimatedPoints: 25,
    topic: 'בסיס + מימד — תיאוריה',
    subtopics: ['למת שטיינל', 'משפט השלוש', 'dim W ≤ dim V'],
    estimatedProbability: 75,
    likelyFormat: 'הוכחה אחת ארוכה או 2 הוכחות קצרות',
    suggestedTheorems: [3, 6, 8],
    suggestedHomework: [],
    exampleQuestions: [
      'הוכיחי את למת שטיינל: בסיס + פורש → k ≤ m.',
      'הוכיחי משפט השלוש: dim V = n + n וקטורים → בסיס ⟺ בת"ל ⟺ פורשים.',
      'W ≤ V (נוצר סופית), dim W = dim V → W = V.',
    ],
    whyThisTopic:
      'יסוד תורת המימד. שטיינל ומשפט השלוש לא נשאלו ב-מועד א. dim(U∩W) נשאל ישירות — אבל לא הוכחת שטיינל/השלוש.',
  },
];

// ─────────────────── EXCLUSIONS (low probability) ───────────────────

export const lowProbabilityMoedB = [
  { topic: 'העתקות ליניאריות (ker, Im, T²=αT, קיום העתקה)', reason: 'לא נלמד בקורס שלך' },
  { topic: 'יחידות הייצוג: בת"ל ⟺ ייצוג יחיד', reason: 'נשאל ב-מועד א Q1.1 (15 נק)' },
  { topic: 'span equality תחת 1+1≠0', reason: 'נשאל ב-מועד א Q5.1' },
  { topic: 'rank(AB) + rank(Bᵗ) + rank(BA) — שלושה סעיפים', reason: 'נשאל ב-מועד א Q5.2' },
  { topic: 'det((A+B)(A-B)) עם sym/anti-sym', reason: 'נשאל ב-מועד א Q1.2 (8/8)' },
  { topic: 'אסוציאטיביות / דיסטריביוטיביות של כפל מטריצות', reason: 'נשאל ב-מועד א Q1.1 (17 נק)' },
  { topic: 'בלוקים משולשית — חישוב פשוט', reason: 'נשאל בסימולציה' },
  { topic: 'C כמ"ו מעל R', reason: 'נשאל ב-מועד א' },
];

// ─────────────────── HIGH PROBABILITY ───────────────────

export const highProbabilityMoedB = [
  { topic: 'משפט הדרגה (rank + dim NulA = n) — הוכחה', note: '95% — לא נשאל בכלל ב-מועד א' },
  { topic: 'משפט השלוש (dim V = n) — הוכחה', note: '85% — לא נשאל' },
  { topic: 'טבלת שקילויות ההפיכות — הוכחה תיאורטית', note: '85% — רק חישוב נשאל' },
  { topic: 'AB=I → BA=I (HW9 Q6)', note: '80% — הוכחה אלגנטית דרך dim Wₖ' },
  { topic: 'det(AB) = det(A)·det(B) — הוכחה', note: '75% — רק חישוב נשאל' },
  { topic: 'למת שטיינל', note: '70% — לא נשאל' },
  { topic: 'dim(U+W) או dim(U∩W) — וריאציה חדשה', note: '70% — n-2 כבר נשאל, אבל הנושא יחזור' },
  { topic: 'מערכת תלוית פרמטר (פרמטר חדש)', note: '70% — את "כשלת" → יחזור בצורה אחרת' },
];

// ─────────────────── EXAM TACTICS ───────────────────

export const examTacticTips = [
  { title: 'בחרי את 4 השאלות בחוכמה', body: '5 שאלות, חייב 4. עברי על כל 5 ב-3 הדקות הראשונות; דרגי מהקלה לקשה; דלגי על הכי לא בטוחה.' },
  { title: 'הקצי 35-40 דק לשאלה', body: '180 דק / 4 = 45 דק, אבל השאירי 20 דק לסקירה.' },
  { title: 'תקועה ב-15 דק → דלגי', body: 'חזרי אליה אחר כך. אסון לבזבז שעה על שאלה אחת.' },
  { title: 'הוכחה = 50% מהציון', body: 'אל תרשמי רק תוצאה. "תשובה לא מוסברת = 0 נקודות".' },
  { title: 'ציטוט שמות משפטים', body: '"לפי משפט הדרגה" / "לפי משפט השלוש" / "לפי למת שטיינל" — נותן בהירות.' },
];
