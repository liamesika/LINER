// Moed G 2025-26 Prediction — v1
// Moed A tested: LI↔unique-rep, det(A+B)(A-B) sym/anti, ℂ as VS, Z₅ inverse, parametric 3-var, dim(U∩W)=n-2, span-equality char≠2, rank(AB)+rank(Bᵗ)+rank(BA)
// Moed B tested: def Aᵗ, (AB)ᵗ=BᵗAᵗ, row-sum→c≠0, משפט-השלוש, det 8×8, parametric 4-var, dim(U∩W) 6+6+7, Aᵗ+B-invertible, Span{v₁v₂v₃}=Span{v₁u₁u₂}, Aᵗ=A⁻¹+A→skew, ℂ-subspace iz,z→W=ℂ

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
  source: string;
  topic: string;
  why: string;
  hwTopRank?: number;
}

export const top10HwToSolve: TopHwQuestion[] = [
  { rank: 1, source: 'Top HW #5', topic: 'בסיס ל-NulA + אימות משפט הדרגה', why: 'מועד ג: rank-nullity — לא נשאל בכלל. זה התרגיל שמקבע את ההבנה.', hwTopRank: 5 },
  { rank: 2, source: 'Top HW #3', topic: 'AB=Iₙ ⇒ BA=Iₙ דרך dim Wₖ', why: 'הוכחה ארוכה שלא נדרשה עד כה — בדיוק מה שצפוי בטבלת שקילויות.', hwTopRank: 3 },
  { rank: 3, source: 'HW12 Q3', topic: 'det(AB) — בלוקים ומולטיפליקטיביות', why: 'חישוב כהכנה לשאלה תיאורטית על det(AB)=det(A)·det(B).' },
  { rank: 4, source: 'Top HW #6', topic: 'det 4×4 על שדה כללי בדירוג', why: 'מועד ב בדק 8×8 — מועד ג ידרוש הוכחה ובניה. תרגיל טוב לחימום.', hwTopRank: 6 },
  { rank: 5, source: 'HW11 Q1', topic: 'det 5×5 על Z₅ עם פרמטר α', why: 'שילוב שדה סופי + det + פרמטר — נושא שעדיין לא נשאל בצורה זו.' },
  { rank: 6, source: 'Top HW #10', topic: 'rank(AB)=rank(B) כאשר A הפיכה', why: 'תרגיל קישור בין הפיכות ל-rank — בסיס להוכחת שקילויות.', hwTopRank: 10 },
  { rank: 7, source: 'HW9 Q4a+4b', topic: 'הופכי 3×3 על Z₇ + בדיקת הפיכות', why: 'הכנה לקריטריוני הפיכות (rank, det, עמודות).' },
  { rank: 8, source: 'HW12 Q2', topic: 'det תלת-אלכסונית = n+1 (אינדוקציה)', why: 'אינדוקציה + מינורים — מבנה תשובה שנדרש בהוכחות det.' },
  { rank: 9, source: 'HW10 Q3b', topic: 'rank(A)=1 → A = x̄·ȳᵗ', why: 'תכונות rank נמוך — שאלה מבנית שמחברת rank ל-ColA.' },
  { rank: 10, source: 'HW8 Q4a-c', topic: 'dim(U+W) ≤ dim V (3 סעיפים)', why: 'תרגול המשפטים שנשאלו כבר — וריאציות על dim(U∩W) עשויות לחזור.' },
];

// ─────────────────── PREDICTED 5 QUESTIONS ───────────────────

export const predictedQuestions: PredictedQuestion[] = [
  {
    qNum: 1,
    estimatedPoints: 25,
    topic: 'משפט הדרגה (Rank-Nullity)',
    subtopics: ['NulA', 'rank A', 'rank A + dim NulA = n'],
    estimatedProbability: 92,
    likelyFormat: 'הגדרת NulA (2 נק) + הוכחה ש-NulA תת-מרחב (8 נק) + הוכחת rank A + dim NulA = n (15 נק)',
    suggestedTheorems: [2],
    suggestedHomework: [5],
    exampleQuestions: [
      'הגדירי NulA. הוכיחי ש-NulA הוא תת-מרחב של Fⁿ.',
      'הוכיחי: rank(A) + dim(NulA) = n.',
      'הסיקי: אם A ∈ M_{m×n}(F) ו-m < n, אזי Ax̄ = 0̄ יש פתרון לא טריוויאלי.',
    ],
    whyThisTopic:
      'המשפט הכי חשוב שלא נשאל בשום צורה — לא במועד א ולא במועד ב. יסוד תורת הדרגה. ב-2024/25 נשאל בגרסת LT; מועד ג יבדוק גרסת מטריצות.',
  },
  {
    qNum: 2,
    estimatedPoints: 25,
    topic: 'det(AB) = det(A)·det(B) — הוכחה',
    subtopics: ['מטריצה אלמנטרית', 'det(AB)', 'det(A⁻¹)', 'det(Aᵏ)'],
    estimatedProbability: 82,
    likelyFormat: 'הגדרת מטריצה אלמנטרית (3 נק) + הוכחת det(AB)=det(A)·det(B) (15 נק) + יישום חישובי (7 נק)',
    suggestedTheorems: [3, 8],
    suggestedHomework: [6, 7],
    exampleQuestions: [
      'הגדירי מטריצה אלמנטרית. הוכיחי: det(AB) = det(A)·det(B).',
      'הסיקי: אם A הפיכה אז det(A⁻¹) = (det A)⁻¹.',
      'A ∈ M₄(ℝ), det(A) = -2, det(B) = 3. חשבי det(A³B⁻¹Aᵗ).',
    ],
    whyThisTopic:
      'מועד ב בדק חישוב det של מטריצה ספציפית (8×8) — לא הוכחת המולטיפליקטיביות. ההוכחה עצמה (דרך מקרה הפיכה/לא-הפיכה) לא הוצגה בשום מועד של המשתמשת.',
  },
  {
    qNum: 3,
    estimatedPoints: 25,
    topic: 'שקילויות ההפיכות — הוכחה תיאורטית',
    subtopics: ['A הפיכה', 'rank = n', 'עמודות בסיס', 'AB=Iₙ → BA=Iₙ'],
    estimatedProbability: 78,
    likelyFormat: 'הוכחת זוג שקילויות מהטבלה (15 נק) + AB=Iₙ → BA=Iₙ (10 נק)',
    suggestedTheorems: [1, 2],
    suggestedHomework: [3, 10],
    exampleQuestions: [
      'הוכיחי: A ∈ Mₙ(F) הפיכה ⟺ עמודות A מהוות בסיס ל-Fⁿ.',
      'הוכיחי: A ∈ Mₙ(F) הפיכה ⟺ NulA = {0̄}.',
      'הוכיחי: A, B ∈ Mₙ(F), AB = Iₙ ⟹ BA = Iₙ.',
    ],
    whyThisTopic:
      'מועד ב בדק רק נכסים נקודתיים (סכום שורות = c → A הפיכה → c≠0). שרשרת שקילויות מלאה — במיוחד AB=Iₙ→BA=Iₙ — לא הוכחה בשום מועד.',
  },
  {
    qNum: 4,
    estimatedPoints: 25,
    topic: 'בסיס ומרחב — תיאוריה או חישוב',
    subtopics: ['LD ↔ vⱼ ∈ span{v₁,...,vⱼ₋₁}', 'צורה קנונית + P', 'A²=0 → ColA ⊆ NulA'],
    estimatedProbability: 70,
    likelyFormat: 'הוכחה תיאורטית על LI/LD (13 נק) + חישוב צורה קנונית + P הפיכה (12 נק)',
    suggestedTheorems: [4, 5],
    suggestedHomework: [5, 6],
    exampleQuestions: [
      'הוכיחי: v₁,...,vₖ תלויים לינארית ⟺ קיים 1≤j≤k כך ש-vⱼ ∈ span{v₁,...,vⱼ₋₁}.',
      'A² = 0. הוכיחי: (1) Iₙ+A הפיכה; (2) ColA ⊆ NulA; (3) rank(A) ≤ n/2.',
      'מצאי צורה קנונית C של A ומטריצה הפיכה P כך ש-PA = C.',
    ],
    whyThisTopic:
      'LI characterization נשאלה ב-2023 Moed B (Q1, 15 נק) אך לא בשום מועד של המשתמשת. A²=0 נשאלה ב-2022 — נושא "מסתובב" שטרם הגיע.',
  },
  {
    qNum: 5,
    estimatedPoints: 25,
    topic: 'Null(A) = Null(AᵀA) או שדה/מרחב פולינומים',
    subtopics: ['Null(A) ⊆ Null(AᵀA)', 'yᵀy=0 → y=0', 'F[x] תת-מרחב לא נוצר-סופית'],
    estimatedProbability: 62,
    likelyFormat: '3 סעיפים ½ טכניים (8+7+10 נק) — הוכחה צעד-אחר-צעד',
    suggestedTheorems: [2, 6],
    suggestedHomework: [5],
    exampleQuestions: [
      'הוכיחי: NulA ⊆ Null(AᵀA). הסיקי Null(A) = Null(AᵀA).',
      'הוכיחי: אם ȳ ∈ ℝᵐ מקיים ȳᵀȳ = 0 אז ȳ = 0̄.',
      'W = {p ∈ F[x] : p(α₁)=p(α₂)=0}. הוכיחי ש-W תת-מרחב ואינו נוצר-סופית.',
    ],
    whyThisTopic:
      'שתי וריאציות שמופיעות בתבנית "3 סעיפים מסתמכים זה על זה" — הופיעו ב-2024 Moed B ו-2025 Moed B. לא נשאלו בשום מועד של המשתמשת.',
  },
];

// ─────────────────── EXCLUSIONS (already tested — do not over-prepare) ───────────────────

export const lowProbabilityMoedB = [
  // ── מועד א ──
  { topic: 'LI ⟺ ייצוג יחיד (יחידות הייצוג)', reason: 'נשאל מועד א Q1.1 (15 נק)' },
  { topic: 'det((A+B)(A-B)) עם sym/anti-sym', reason: 'נשאל מועד א Q1.2 (8/8)' },
  { topic: 'ℂ כמ"ו מעל ℝ — הגדרה ובדיקת אקסיומות', reason: 'נשאל מועד א (בצורה כלשהי)' },
  { topic: 'הופכי מטריצה מעל Z₅', reason: 'נשאל מועד א Q3.2' },
  { topic: 'מערכת 3 משתנים תלוית-פרמטר', reason: 'נשאל מועד א Q4.1 (0/12)' },
  { topic: 'dim(U∩W) = n−2 (וריאציה ישירה)', reason: 'נשאל מועד א Q4.2 (2/13)' },
  { topic: 'שוויון span תחת 1+1≠0 (char≠2)', reason: 'נשאל מועד א Q5.1' },
  { topic: 'rank(AB) + rank(Bᵗ) + rank(BA) — שלושה סעיפים', reason: 'נשאל מועד א Q5.2' },
  // ── מועד ב ──
  { topic: '(AB)ᵗ = BᵗAᵗ (הוכחה + הגדרת טרנספוז)', reason: 'נשאל מועד ב Q1.1 (17 נק)' },
  { topic: 'A הפיכה + סכום שורות = c → c ≠ 0', reason: 'נשאל מועד ב Q1.2 (8 נק)' },
  { topic: 'משפט השלוש (בסיס ↔ בת"ל ↔ פורשים)', reason: 'נשאל מועד ב Q2.1 (13 נק)' },
  { topic: 'det של מטריצה 8×8 (תת-אלכסונית)', reason: 'נשאל מועד ב Q2.2 (12 נק)' },
  { topic: 'מערכת 4 משתנים תלוית-פרמטר (a∈ℝ)', reason: 'נשאל מועד ב Q3.1 (13 נק)' },
  { topic: 'dim(U∩W) עם dim U=dim W=6, dim V=7, U≠W', reason: 'נשאל מועד ב Q3.2 (12 נק)' },
  { topic: 'Aᵗ+B הפיכה דרך det ודמיון (A=P⁻¹AP, Bᵗ=P⁻¹BP)', reason: 'נשאל מועד ב Q4.1 (12 נק)' },
  { topic: 'Span{v₁,v₂,v₃} = Span{v₁,u₁,u₂} (החלפת וקטורי בסיס)', reason: 'נשאל מועד ב Q4.2 (13 נק)' },
  { topic: 'A הפיכה, Aᵗ = A⁻¹ + A → A אנטי-סימטרית', reason: 'נשאל מועד ב Q5.1 (12 נק)' },
  { topic: 'ℂ כ-VS מעל ℝ: iz,z ∈ W → W = ℂ', reason: 'נשאל מועד ב Q5.2 (13 נק)' },
  { topic: 'העתקות ליניאריות (ker, Im, הרכבה)', reason: 'לא נלמד בקורס שלך' },
];

// ─────────────────── HIGH PROBABILITY (Moed G focus) ───────────────────

export const highProbabilityMoedB = [
  { topic: 'משפט הדרגה: rank(A) + dim(NulA) = n', note: '92% — לא נשאל בשום מועד של המשתמשת' },
  { topic: 'det(AB) = det(A)·det(B) — הוכחה (2 מקרים)', note: '82% — חישוב נשאל במועד ב, הוכחה לא' },
  { topic: 'AB=Iₙ ⟹ BA=Iₙ + שקילויות ההפיכות', note: '78% — לא הוכח בשום מועד' },
  { topic: 'LD ⟺ vⱼ ∈ span{v₁,...,vⱼ₋₁} (characterization)', note: '65% — נשאל ב-2023 היסטורית, לא אצל המשתמשת' },
  { topic: 'A²=0: Iₙ+A הפיכה + ColA⊆NulA + rank≤n/2', note: '55% — נשאל ב-2022 היסטורית, לא אצל המשתמשת' },
  { topic: 'Null(A) = Null(AᵀA) + yᵀy=0 → y=0', note: '55% — נשאל ב-2024/25 היסטורית, לא אצל המשתמשת' },
  { topic: 'צורה קנונית + מציאת P הפיכה (PA=C)', note: '50% — נשאל ב-2023/24 היסטורית, לא אצל המשתמשת' },
  { topic: 'למת ההחלפה של שטיינל', note: '45% — עדיין לא נשאל' },
];

// ─────────────────── EXAM TACTICS ───────────────────

export const examTacticTips = [
  { title: 'בחרי את 4 השאלות בחוכמה', body: '5 שאלות, חייב 4. עברי על כל 5 ב-3 הדקות הראשונות; דרגי מהקלה לקשה; דלגי על הכי לא בטוחה.' },
  { title: 'הקצי 35-40 דק לשאלה', body: '180 דק / 4 = 45 דק, אבל השאירי 20 דק לסקירה.' },
  { title: 'תקועה ב-15 דק → דלגי', body: 'חזרי אליה אחר כך. אסון לבזבז שעה על שאלה אחת.' },
  { title: 'הוכחה = 50% מהציון', body: 'אל תרשמי רק תוצאה. "תשובה לא מוסברת = 0 נקודות".' },
  { title: 'ציטוט שמות משפטים', body: '"לפי משפט הדרגה" / "לפי שקילות (iv)↔(vii)" / "לפי מולטיפליקטיביות" — נותן בהירות ונקודות.' },
];

// ─────────────────── TIERED PROOFS ───────────────────

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
  whyNot?: string;
}

export const tieredProofs: TieredProof[] = [
  // ─── Tier 1: 70-85% ───
  {
    rank: 1,
    tier: 1,
    probabilityLow: 78,
    probabilityHigh: 88,
    name: 'משפט הדרגה (Rank-Nullity)',
    statement: 'A ∈ M_{m×n}(F): rank(A) + dim(NulA) = n',
    topTheoremRank: 2,
    whyConfident: 'המשפט המרכזי היחיד שלא נשאל בשום מועד של המשתמשת (א+ב). ב-2024/25 הגרסה של LT נשאלה — גרסת מטריצות עדיין פתוחה.',
    whyNot: 'אם הבוחן מעדיף לחזור לגרסת LT (נשאלה 2025) — אבל זה מועד ג של המשתמשת, לא 2025.',
  },
  {
    rank: 2,
    tier: 1,
    probabilityLow: 68,
    probabilityHigh: 80,
    name: 'det(AB) = det(A)·det(B)',
    statement: 'A, B ∈ Mₙ(F) → det(AB) = det(A)·det(B)',
    topTheoremRank: 3,
    whyConfident: 'חישוב det נשאל במועד ב (8×8). ההוכחה עצמה — 2 מקרים: B הפיכה/לא-הפיכה — לא הוצגה בשום מועד.',
    whyNot: 'לפעמים מסמנים אותה "נסמך על ידיעה" ולא דורשים הוכחה מלאה.',
  },
  {
    rank: 3,
    tier: 1,
    probabilityLow: 62,
    probabilityHigh: 78,
    name: 'AB=Iₙ ⟹ BA=Iₙ (הפיכות)',
    statement: 'A, B ∈ Mₙ(F), AB = Iₙ ⟹ BA = Iₙ',
    topTheoremRank: 1,
    whyConfident: 'חלק מטבלת שקילויות ההפיכות. לא הוכח ישירות. HW Top #3 מכין ישירות. מועד ב בדק רק נכס חד-נקודתי של A הפיכה.',
    whyNot: 'אם הבוחן בוחר שקילות אחרת (A הפיכה↔rank=n) ולא את AB=I→BA=I.',
  },

  // ─── Tier 2: 45-65% ───
  {
    rank: 4,
    tier: 2,
    probabilityLow: 50,
    probabilityHigh: 65,
    name: 'LD ⟺ vⱼ ∈ span{v₁,...,vⱼ₋₁}',
    statement: 'v₁,...,vₖ תלויים ⟺ ∃j: vⱼ ∈ span{v₁,...,vⱼ₋₁}',
    topTheoremRank: 4,
    whyConfident: 'נשאל ב-2023 Moed B (Q1, 15 נק) ו-2024 Moed B (Q1, 15 נק) — נושא מחזורי. לא נשאל אף פעם אצל המשתמשת.',
    whyNot: 'אם הבוחן בחר להשאיר את הנושא לתרגיל LI/LD "קל יותר" — אבל סטנדרטי מאוד.',
  },
  {
    rank: 5,
    tier: 2,
    probabilityLow: 40,
    probabilityHigh: 58,
    name: 'A²=0 → ColA ⊆ NulA ו-rank(A) ≤ n/2',
    statement: 'A ∈ Mₙ(F), A² = 0ₙ ⟹ ColA ⊆ NulA ⟹ rank(A) ≤ n/2',
    topTheoremRank: 2,
    whyConfident: 'נשאל ב-2022 Moed B (Q4) — מחזורי לאורך שנים. לא נשאל אצל המשתמשת. מבוסס על rank-nullity + ColA/NulA.',
    whyNot: 'דורש ידע של rank-nullity — שאם ייבדק ב-Q1, ייתכן שלא יחזרו על אותו כלי ב-Q5.',
  },
  {
    rank: 6,
    tier: 2,
    probabilityLow: 40,
    probabilityHigh: 55,
    name: 'Null(A) = Null(AᵀA)',
    statement: 'A ∈ M_{m×n}(ℝ): Null(A) = Null(AᵀA)',
    topTheoremRank: 2,
    whyConfident: 'נשאל ב-2024 ו-2025 Moed B — תבנית "3 סעיפים: Nul⊆Nul, yᵀy=0, הסיקי". לא נשאל אצל המשתמשת.',
    whyNot: 'מועד ב 2026 כבר היה עמוס — אם חיפשו מנוחה ממטריצות ריאליות.',
  },

  // ─── Tier 3: 20-45% ───
  {
    rank: 7,
    tier: 3,
    probabilityLow: 30,
    probabilityHigh: 45,
    name: 'למת ההחלפה של שטיינל',
    statement: '{v₁,...,vₖ} בסיס + {w₁,...,wₘ} פורש → k ≤ m; כל שני בסיסים שווי גודל',
    topTheoremRank: 4,
    whyConfident: 'לא נשאל בשום מועד של המשתמשת. יסוד תורת המימד. הוכחה אינדוקטיבית אלגנטית.',
    whyNot: 'משפט השלוש (שמסתמך על שטיינל) כבר נשאל — יש סיכוי שהבוחן לא יחזור לבסיס.',
  },
  {
    rank: 8,
    tier: 3,
    probabilityLow: 25,
    probabilityHigh: 40,
    name: 'dim ColA = dim RowA = rank(A)',
    statement: 'A ∈ M_{m×n}(F): dim(ColA) = dim(RowA) = rank(A)',
    topTheoremRank: 5,
    whyConfident: 'לא נשאל ישירות. נגע בנושא ב-rank(Bᵗ) מועד א — אבל הוכחה עצמאית לא הוצגה.',
    whyNot: '⚠️ מועד א Q5.2 כיסה rank(Bᵗ)=rank(B) — הבוחן עשוי לחשוב שנבדק.',
  },
  {
    rank: 9,
    tier: 3,
    probabilityLow: 20,
    probabilityHigh: 35,
    name: 'det(Aᵗ) = det(A)',
    statement: 'A ∈ Mₙ(F) → det(Aᵗ) = det(A)',
    topTheoremRank: 8,
    whyConfident: 'לא הוכח ישירות. משמש כ"בלבן יסוד" בהוכחות det אחרות.',
    whyNot: 'הוכחה קצרה מדי לשאלה עצמאית — לרוב מסומן "לא דורש הוכחה".',
  },
];

// ─────────────────── PREDICTED DEFINITIONS ───────────────────

export interface PredictedDefinition {
  rank: number;
  probability: number;
  title: string;
  body: string;
  category: 'must-memorize' | 'should-know' | 'recognize';
  pairedWith?: string;
  whyLikely: string;
  alreadyTested?: boolean;
}

export const predictedDefinitions: PredictedDefinition[] = [
  // ─── Must memorize (75%+) ───
  {
    rank: 1,
    probability: 88,
    title: 'NulA, ColA',
    body: 'NulA = {x̄ ∈ Fⁿ : Ax̄ = 0̄}. ColA = span{עמודות A} = {Ax̄ : x̄ ∈ Fⁿ}.',
    category: 'must-memorize',
    pairedWith: 'Q1 — משפט הדרגה',
    whyLikely: 'חייבים להגדיר לפני הוכחת rank + dim NulA = n. הגדרה שלא נשאלה ישירות בשום מועד.',
  },
  {
    rank: 2,
    probability: 82,
    title: 'מטריצה אלמנטרית',
    body: 'E ∈ Mₙ(F) אלמנטרית אם מתקבלת מ-Iₙ ע"י פעולת שורה אלמנטרית אחת. כל E אלמנטרית היא הפיכה.',
    category: 'must-memorize',
    pairedWith: 'Q2 — det(AB)',
    whyLikely: 'דרושה לבנות הוכחת det(AB)=det(A)·det(B) דרך מקרה B הפיכה = מכפלת אלמנטריות.',
  },
  {
    rank: 3,
    probability: 78,
    title: 'דרגה rank(A)',
    body: 'rank(A) = מספר המקדמים המובילים בצורה הקנונית של A = dim(ColA) = dim(RowA).',
    category: 'must-memorize',
    pairedWith: 'Q1 — משפט הדרגה',
    whyLikely: 'בסיס הכרחי להגדיר לפני rank-nullity.',
  },
  {
    rank: 4,
    probability: 75,
    title: 'מטריצה הפיכה',
    body: 'A ∈ Mₙ(F) הפיכה אם קיימת B ∈ Mₙ(F) כך ש-AB = BA = Iₙ. B = A⁻¹.',
    category: 'must-memorize',
    pairedWith: 'Q3 — שקילויות הפיכות',
    whyLikely: 'ההגדרה הבסיסית ביותר לשאלת שקילויות.',
  },
  {
    rank: 5,
    probability: 70,
    title: 'דטרמיננטה (אקסיומטית)',
    body: 'det: Mₙ(F) → F מקיימת: (1) מולטי-לינארית בכל שורה; (2) מתחלפת (שורות זהות → 0); (3) det(Iₙ) = 1.',
    category: 'must-memorize',
    pairedWith: 'Q2 — det(AB)',
    whyLikely: 'צריך להגדיר לפני הוכחת מולטיפליקטיביות.',
  },

  // ─── Should know (50-70%) ───
  {
    rank: 6,
    probability: 62,
    title: 'בסיס של V',
    body: 'v₁,...,vₙ בסיס של V אם: (1) v₁,...,vₙ בת"ל; (2) v₁,...,vₙ פורשים את V.',
    category: 'should-know',
    pairedWith: 'Q3 — שקילויות: עמודות A בסיס ↔ A הפיכה',
    whyLikely: 'נדרש להגדיר בשאלת שקילויות ההפיכות. משפט השלוש כבר נשאל — הגדרה בלבד.',
  },
  {
    rank: 7,
    probability: 58,
    title: 'בלתי תלות לינארית (LI)',
    body: 'v₁,...,vₖ בת"ל אם: α₁v₁+...+αₖvₖ = 0̄ ⟹ α₁=...=αₖ=0. אחרת תלויים (LD).',
    category: 'should-know',
    pairedWith: 'Q4 — LD ↔ vⱼ ∈ span{v₁,...,vⱼ₋₁}',
    whyLikely: 'נדרש להגדיר בשאלת LD characterization.',
  },
  {
    rank: 8,
    probability: 50,
    title: 'מינור Mᵢⱼ + פיתוח לפי שורה',
    body: 'Mᵢⱼ = det של A ללא שורה i ועמודה j. Cofactor Cᵢⱼ = (-1)^{i+j}Mᵢⱼ. det(A) = Σⱼ [A]ᵢⱼ·Cᵢⱼ.',
    category: 'should-know',
    pairedWith: 'Q2 — det(AB)',
    whyLikely: 'כלי טכני בהוכחת det(AB) דרך מינורים/אינדוקציה.',
  },

  // ─── Recognize (25-50%) ───
  {
    rank: 9,
    probability: 42,
    title: 'תת-מרחב W ≤ V',
    body: 'W ≤ V אם: W ≠ ∅; ∀α₁,α₂∈F, w₁,w₂∈W: α₁w₁+α₂w₂ ∈ W.',
    category: 'recognize',
    pairedWith: 'Q1 — NulA תת-מרחב',
    whyLikely: 'בסיס להוכחת NulA ≤ Fⁿ — אבל ההגדרה עצמה קצת "פשוטה מדי" לשאלה נפרדת.',
  },
  {
    rank: 10,
    probability: 35,
    title: 'span (פרישה)',
    body: 'span{v₁,...,vₖ} = {α₁v₁+...+αₖvₖ : αᵢ∈F} — קבוצת כל הצירופים הלינאריים.',
    category: 'recognize',
    pairedWith: 'Q4 — LI/LD characterization',
    whyLikely: 'בסיס לכל הוכחה — אבל נחשב "מובן מאליו" ולא נשאל בנפרד.',
  },

  // ─── Already tested (Moed A or Moed B) ───
  {
    rank: 11,
    probability: 5,
    title: 'בלתי תלות לינארית (LI)',
    body: 'נשאל מועד א Q1.1 (כהגדרה מרומזת)',
    category: 'recognize',
    whyLikely: 'נשאל כבר.',
    alreadyTested: true,
  },
  {
    rank: 12,
    probability: 5,
    title: 'ker T, Im T (LT)',
    body: 'ker T = {v∈V : T(v)=0_W}. Im T = {T(v) : v∈V}.',
    category: 'recognize',
    whyLikely: 'העתקות ליניאריות לא נלמדו בקורס.',
    alreadyTested: true,
  },
  {
    rank: 13,
    probability: 5,
    title: 'טרנספוז A^t',
    body: '[A^t]_{ij} = [A]_{ji}.',
    category: 'recognize',
    whyLikely: 'נשאל מועד ב Q1.1.1 (2 נק).',
    alreadyTested: true,
  },
  {
    rank: 14,
    probability: 5,
    title: 'סכום ישר U⊕W',
    body: 'U⊕W = U+W כאשר U∩W = {0_V}.',
    category: 'recognize',
    whyLikely: 'נשאל מועד ב Q1.1.1 (כחלק מהגדרת U⊕W).',
    alreadyTested: true,
  },
  {
    rank: 15,
    probability: 5,
    title: 'תת-מרחב W ≤ V (הגדרה פורמלית)',
    body: 'נשאל מועד ב Q2.1.1 (2 נק).',
    category: 'recognize',
    whyLikely: 'כבר נשאל.',
    alreadyTested: true,
  },
];

export function getProofsByTier(tier: ProofTier): TieredProof[] {
  return tieredProofs.filter((p) => p.tier === tier);
}

export function getDefinitionsByCategory(c: 'must-memorize' | 'should-know' | 'recognize'): PredictedDefinition[] {
  return predictedDefinitions.filter((d) => d.category === c);
}
