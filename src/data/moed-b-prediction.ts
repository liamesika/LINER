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

// ─────────────────── TIERED PROOFS (calibrated) ───────────────────
// Honest assessment based on:
//   - What was actually tested in user's Moed A 2026
//   - Expert prep document (מיקוד_6_משפטים_מועד_ב.pdf)
//   - Historical Moed B 2022-2024 patterns
//
// Each tier has confidence range — NO single 95%+ predictions.

export type ProofTier = 1 | 2 | 3;

export interface TieredProof {
  rank: number;
  tier: ProofTier;
  probabilityLow: number;
  probabilityHigh: number;
  name: string;
  statement: string;
  topTheoremRank: number;
  whyConfident: string;
  whyNot?: string;       // honest counter-arguments
}

export const tieredProofs: TieredProof[] = [
  // ─── Tier 1: 70-85% ───
  {
    rank: 1,
    tier: 1,
    probabilityLow: 75,
    probabilityHigh: 85,
    name: 'משפט השלוש (dim V = n)',
    statement: 'dim V = n + |{v₁,...,vₙ}| = n → בסיס ⟺ בת"ל ⟺ פורש',
    topTheoremRank: 3,
    whyConfident: 'לא נשאל בשום צורה במועד א 2026. מופיע כמעט בכל מועד ב היסטורית. יסוד.',
  },
  {
    rank: 2,
    tier: 1,
    probabilityLow: 70,
    probabilityHigh: 80,
    name: 'טבלת שקילויות ההפיכות (הוכחה תיאורטית)',
    statement: 'A∈M_n: הפיכה ⟺ rank=n ⟺ עמודות בסיס ⟺ AB=I→BA=I ⟺ ...',
    topTheoremRank: 2,
    whyConfident: 'במועד א נבדק רק חישוב (Z_5 inverse) ולא שרשרת שקילויות. HW9 Q6 מכין במיוחד ל-AB=I→BA=I.',
    whyNot: 'אם הבוחן בחר להמשיך עם חישוב במקום הוכחה, הסיכוי יורד.',
  },
  {
    rank: 3,
    tier: 1,
    probabilityLow: 65,
    probabilityHigh: 75,
    name: 'למת שטיינל (Steinitz)',
    statement: '{v₁,...,vₖ} בסיס + {w₁,...,wₘ} פורש → k ≤ m. כל שני בסיסים שווי גודל.',
    topTheoremRank: 6,
    whyConfident: 'לא נשאל. יסוד תורת המימד. הוכחה אלגנטית באינדוקציה.',
    whyNot: 'יותר מתאים ל-Linear Algebra 2 לעתים. אבל בסילבוס שלך זה הרצאה 11.',
  },

  // ─── Tier 2: 50-70% ───
  {
    rank: 4,
    tier: 2,
    probabilityLow: 60,
    probabilityHigh: 70,
    name: 'det(AB) = det(A)·det(B)',
    statement: 'A, B ∈ M_n(F) → det(AB) = det(A)·det(B)',
    topTheoremRank: 4,
    whyConfident: 'במועד א נבדק det((A+B)(A-B)) עם sym/anti — תכונה שונה. ההוכחה הזו לא נעשתה.',
    whyNot: 'ההוכחה דורשת פיצול ל-2 מקרים (הפיכה / לא הפיכה) — לפעמים מעדיפים שאלות יותר קצרות.',
  },
  {
    rank: 5,
    tier: 2,
    probabilityLow: 50,
    probabilityHigh: 65,
    name: 'משפט הדרגה — גרסת מטריצות',
    statement: 'A ∈ M_{m×n}(F): rank A + dim NulA = n',
    topTheoremRank: 1,
    whyConfident: 'הגרסה התיאורטית של מטריצות עם NulA — לא נעשתה ישירות.',
    whyNot: '⚠️ במועד א Q2.1.2 נשאלה הגרסה ל-LT (dim V = dim ker T + dim Im T). הבוחנים יחשבו "אותה הוכחה" — סיכוי גבוה שלא יחזרו.',
  },
  {
    rank: 6,
    tier: 2,
    probabilityLow: 45,
    probabilityHigh: 60,
    name: 'det(A^t) = det(A)',
    statement: 'A ∈ M_n(F) → det(A^t) = det(A)',
    topTheoremRank: 9,
    whyConfident: 'לבנת בניין שלא הוכחה ישירות. משמשת להסיק שתכונות שורות תקפות לעמודות.',
    whyNot: 'יותר "טכני" — לפעמים מסומן כ"לא דורש הוכחה".',
  },

  // ─── Tier 3: 25-50% ───
  {
    rank: 7,
    tier: 3,
    probabilityLow: 30,
    probabilityHigh: 50,
    name: 'dim ColA = dim RowA = rank',
    statement: 'A ∈ M_{m×n}(F) → dim ColA = dim RowA = rank A',
    topTheoremRank: 5,
    whyConfident: 'לא נשאל ישירות.',
    whyNot: '⚠️ במועד א Q5.2.2 נשאלה rank(B^t) = rank(B) — שזה חלק מהרעיון. סיכוי מסוים שלא יחזור.',
  },
  {
    rank: 8,
    tier: 3,
    probabilityLow: 25,
    probabilityHigh: 45,
    name: 'משפט המימדים הראשון (הוכחה מלאה)',
    statement: 'dim(U+W) = dim U + dim W − dim(U∩W)',
    topTheoremRank: 7,
    whyConfident: 'ההוכחה עצמה לא נעשתה.',
    whyNot: '⚠️ במועד א Q4.2 נשאלה וריאציה (dim(U∩W) = n-2). הבוחנים סביר שיחשבו שכבר נבדק.',
  },
  {
    rank: 9,
    tier: 3,
    probabilityLow: 25,
    probabilityHigh: 40,
    name: 'W ≤ V, dim W = dim V → W = V',
    statement: 'V נוצר סופית, W ≤ V, dim W = dim V → W = V',
    topTheoremRank: 8,
    whyConfident: 'הוכחה קצרה ואלגנטית.',
    whyNot: 'בד"כ משמשת כצעד בתוך הוכחה אחרת, פחות כשאלה עצמאית.',
  },
];

// ─────────────────── PREDICTED DEFINITIONS (calibrated) ───────────────────
// Every major Moed B question typically has a "Define X" subquestion worth 2-3 pts.
// Based on user's Moed A: בת"ל was tested in Q1.1.1, ker T/Im T in Q2.1.1 (LT).

export interface PredictedDefinition {
  rank: number;
  probability: number;
  title: string;
  body: string;
  category: 'must-memorize' | 'should-know' | 'recognize';
  pairedWith?: string;   // which Moed B question this likely pairs with
  whyLikely: string;
  alreadyTested?: boolean;
}

export const predictedDefinitions: PredictedDefinition[] = [
  // ─── Must memorize (75%+) ───
  {
    rank: 1,
    probability: 85,
    title: 'בסיס של V',
    body: 'v₁,...,vₙ בסיס של V אם: (1) v₁,...,vₙ בת"ל; (2) v₁,...,vₙ פורשים את V.',
    category: 'must-memorize',
    pairedWith: 'Q5 — משפט השלוש / שטיינל',
    whyLikely: 'יסוד הקורס. לא נשאל במועד א. יזווג עם הוכחת משפט השלוש או שטיינל.',
  },
  {
    rank: 2,
    probability: 85,
    title: 'NulA, ColA, RowA',
    body: 'NulA = {x̄ ∈ F^n : Ax̄ = 0̄}. ColA = span{עמודות A}. RowA = span{שורות A} = ColAᵗ.',
    category: 'must-memorize',
    pairedWith: 'Q1 — משפט הדרגה',
    whyLikely: 'הכרחי להגדיר לפני הוכחת משפט הדרגה. סבירות גבוהה מאוד.',
  },
  {
    rank: 3,
    probability: 80,
    title: 'מטריצה הפיכה',
    body: 'A ∈ M_n(F) הפיכה אם קיימת B ∈ M_n(F) יחידה כך ש AB = BA = I_n. B = A⁻¹.',
    category: 'must-memorize',
    pairedWith: 'Q2 — טבלת שקילויות',
    whyLikely: 'דרושה כקדם להוכחת טבלת השקילויות. סטנדרטי.',
  },
  {
    rank: 4,
    probability: 80,
    title: 'מימד dim V',
    body: 'אם V = {0_V}: dim V = 0. אחרת dim V = מספר הוקטורים בבסיס (לא תלוי בבסיס!). אם V לא נוצר סופית: dim V = ∞.',
    category: 'must-memorize',
    pairedWith: 'Q5 — משפט השלוש',
    whyLikely: 'בסיס למשפט השלוש ולכל מה שקשור בו.',
  },
  {
    rank: 5,
    probability: 75,
    title: 'דטרמיננטה (אקסיומטית)',
    body: 'פונקציה Δ: M_n(F) → F המקיימת: (1) מולטי-לינארית בכל שורה; (2) מתחלפת (2 שורות זהות → 0); (3) Δ(I_n) = 1.',
    category: 'must-memorize',
    pairedWith: 'Q3 — det(AB)',
    whyLikely: 'דרושה להגדיר לפני הוכחת det(AB) = det(A)·det(B).',
  },
  {
    rank: 6,
    probability: 75,
    title: 'דרגה rank A',
    body: 'rank A = מספר המקדמים המובילים בצורה הקנונית של A. שווה ל-dim ColA = dim RowA.',
    category: 'must-memorize',
    pairedWith: 'Q1 — משפט הדרגה',
    whyLikely: 'בלי הגדרת rank אי אפשר להוכיח את משפט הדרגה.',
  },

  // ─── Should know (55-75%) ───
  {
    rank: 7,
    probability: 65,
    title: 'span (פרישה)',
    body: 'span{v₁,...,vₖ} = {α₁v₁ + ... + αₖvₖ : αᵢ ∈ F} — קבוצת כל הצירופים הליניאריים. תמיד תת-מרחב.',
    category: 'should-know',
    pairedWith: 'Q5 — בסיס / שטיינל',
    whyLikely: 'בסיס לכמעט כל הוכחה. אבל פחות סביר כשאלה ייעודית (כי "פשוטה מדי").',
  },
  {
    rank: 8,
    probability: 60,
    title: 'מטריצה אלמנטרית',
    body: 'מטריצה E ∈ M_n(F) שמתקבלת מ-I_n ע"י פעולת שורה אלמנטרית אחת. כל מטריצה אלמנטרית הפיכה.',
    category: 'should-know',
    pairedWith: 'Q2 — שקילויות / det(AB)',
    whyLikely: 'דרושה להוכחות של det(AB) ושל "A הפיכה ⟺ מכפלת אלמנטריות".',
  },
  {
    rank: 9,
    probability: 60,
    title: 'תת-מרחב W ≤ V',
    body: 'W ⊆ V הוא תת-מרחב אם: W ≠ ∅; לכל α₁,α₂ ∈ F ו-w₁,w₂ ∈ W: α₁w₁ + α₂w₂ ∈ W (סגירות ל-LC).',
    category: 'should-know',
    pairedWith: 'Q4 — מערכות + מימד',
    whyLikely: 'מופיע בכמעט כל שאלה הקשורה לסכומי תת-מרחב.',
  },
  {
    rank: 10,
    probability: 55,
    title: 'מינור Mᵢⱼ',
    body: 'Mᵢⱼ — הדטרמיננטה של המטריצה שמתקבלת מ-A ע"י מחיקת שורה i ועמודה j.',
    category: 'should-know',
    pairedWith: 'Q3 — det(AB)',
    whyLikely: 'דרוש לפיתוח det לפי שורה/עמודה.',
  },

  // ─── Recognize (30-55%) ───
  {
    rank: 11,
    probability: 45,
    title: 'סכום ישר U⊕W',
    body: 'U+W = U⊕W כאשר U ∩ W = {0_V}. כל v ∈ U+W ניתן לפירוק יחיד v = u + w.',
    category: 'recognize',
    pairedWith: 'Q4 — מימדים',
    whyLikely: 'דרוש לבעיות sum/intersection.',
  },
  {
    rank: 12,
    probability: 40,
    title: 'שדה F',
    body: 'קבוצה F עם +, · המקיימת אקסיומות חיבור (חילופי, קיבוצי, 0, נגדי), כפל (חילופי, קיבוצי, 1, הופכי לכל x≠0), ופילוג. 0_F ≠ 1_F.',
    category: 'recognize',
    whyLikely: 'יסוד, אבל לרוב נחשב "מובן מאליו" ולא נשאל ישירות.',
  },

  // ─── Already tested in Moed A → low probability ───
  {
    rank: 13,
    probability: 15,
    title: 'בלתי תלות לינארית',
    body: 'v₁,...,vₖ בת"ל אם: α₁v₁+...+αₖvₖ = 0_V → α₁=...=αₖ=0.',
    category: 'recognize',
    whyLikely: 'בסיסי, אבל...',
    alreadyTested: true,
  },
  {
    rank: 14,
    probability: 10,
    title: 'ker T, Im T',
    body: 'ker T = {v∈V : T(v) = 0_W}. Im T = {T(v) : v ∈ V}.',
    category: 'recognize',
    whyLikely: 'נשאל במועד א Q2.1.1. LT כנראה לא חוזר במועד ב.',
    alreadyTested: true,
  },
];

// Quick getters
export function getProofsByTier(tier: ProofTier): TieredProof[] {
  return tieredProofs.filter((p) => p.tier === tier);
}

export function getDefinitionsByCategory(c: 'must-memorize' | 'should-know' | 'recognize'): PredictedDefinition[] {
  return predictedDefinitions.filter((d) => d.category === c);
}
