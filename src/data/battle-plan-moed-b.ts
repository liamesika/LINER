// Battle Plan for Linear Algebra 1, Moed B 2025-26.
// Today: 2026-05-10 (Sunday). Exam: 2026-05-14 (Thursday).
// Profile: User has NOT studied yet — starting from zero.
// Constraint: Tuesday 5/12 user MUST start past-exam practice.
//
// → 2 study days (Sun, Mon) for ALL theory + computation
// → 2 days (Tue, Wed) for past exams + final review
// → Thursday: EXAM
//
// Strategy:
//   Day 1: Foundations (Lectures 1-12) — fields, systems, vector spaces, span/LI/basis
//   Day 2: Build (Lectures 13-23) — dim, matrices, invertibility, det + 6 critical proofs
//   Day 3: First exam (Moed A 2025) + remaining HW + re-prove top-3 theorems
//   Day 4: Second exam (Moed B 2024) + final review of all 6 proofs
//   Day 5: EXAM

export type ItemImportance = 'critical' | 'must' | 'should';

export interface BattleLecture {
  number: string;          // "1-4", "11-12"
  title: string;
  summarySection: string;  // section in סיכום_לפי_נושאים.md
  durationMinutes: number;
  whatToLearn: string[];   // bullet list of concrete takeaways
}

export interface BattleDefinition {
  id: string;              // unique
  title: string;           // Hebrew name
  body: string;            // formal definition (math content allowed)
  importance: ItemImportance;
  lectureRef: string;      // which lecture
}

export interface BattleTheorem {
  id: string;
  name: string;
  statement: string;       // formal statement
  importance: ItemImportance;
  requiresProof: boolean;  // must memorize proof?
  lectureRef: string;
  topTheoremRank?: number; // link to /top-theorems#N
}

export interface BattleExercise {
  id: string;
  title: string;
  durationMinutes: number;
  topHomeworkRank?: number;   // link to /top-homework#N
  description?: string;
}

export interface BattleProofToWrite {
  topTheoremRank: number;  // refs theorems in top-theorems.ts
  targetMinutes: number;
}

export interface BattlePastExam {
  name: string;
  href: string;            // route
  durationMinutes: number;
  isMandatory: boolean;
  note?: string;
}

export interface BattleBlock {
  time: string;            // "08:00–09:30"
  hours: number;
  type: 'theory' | 'practice' | 'memorize' | 'simulation' | 'review' | 'rest';
  task: string;            // headline
  details?: string;        // extra detail
  ref?: string;
}

export interface BattleDay {
  day: number;             // 1..5
  date: string;            // ISO
  weekday: string;
  title: string;           // big title
  subtitle: string;        // 1-line context
  goal: string;            // what you should be able to do by end of day
  totalHours: number;
  blocks: BattleBlock[];
  // Concrete content for the day:
  lectures: BattleLecture[];
  definitions: BattleDefinition[];
  theorems: BattleTheorem[];
  proofsToMemorize: BattleProofToWrite[];
  exercises: BattleExercise[];
  pastExams: BattlePastExam[];
  // UI:
  accentColor: string;     // tailwind gradient suffix e.g. 'from-emerald-500 to-teal-600'
  emoji: string;
}

// ============================================================
// DAY 1 — Sunday May 10 — FOUNDATIONS (from zero!)
// ============================================================
const day1: BattleDay = {
  day: 1,
  date: '2026-05-10',
  weekday: 'ראשון',
  title: 'יסודות — מאפס',
  subtitle: 'הרצאות 1-12: שדות → מערכות → מרחבים וקטוריים → span/LI/בסיס',
  goal: 'את יודעת לדרג מטריצה, מבינה מה זה מרחב וקטורי, ויודעת מה זה span ו-בת"ל.',
  totalHours: 8,
  accentColor: 'from-emerald-500 to-teal-600',
  emoji: '🌱',
  lectures: [
    {
      number: '1-4',
      title: 'שדות (Fields)',
      summarySection: 'סעיף 1',
      durationMinutes: 45,
      whatToLearn: [
        'מה זה שדה: קבוצה F עם + ו-· שמקיימים אקסיומות',
        'דוגמאות חשובות: Q, R, C, Z_p (כש-p ראשוני!)',
        'אין מחלקי אפס: x·y = 0 ⟹ x = 0 או y = 0',
        'הופכי כפלי: לכל x≠0 קיים x⁻¹ (חשוב במיוחד ב-Z_p!)',
      ],
    },
    {
      number: '4-6',
      title: 'מערכות ליניאריות + דירוג שורות',
      summarySection: 'סעיף 2',
      durationMinutes: 90,
      whatToLearn: [
        'מטריצה מורחבת A⁺ (שורה לכל משוואה)',
        '3 פעולות שורה אלמנטריות (כפל בסקלר, החלפה, הוספת כפולה)',
        'צורה מדורגת (EF) וצורה קנונית (REF) — REF היא יחידה!',
        'דרגה rank A = מספר המקדמים המובילים',
        'משתנה קשור (יש מוביל) vs משתנה חופשי',
        'מספר פתרונות: rank A < rank A⁺ → אין; rank A = rank A⁺ = n → יחיד; rank A = rank A⁺ < n → אינסוף',
      ],
    },
    {
      number: '7-8',
      title: 'מרחב וקטורי + תת-מרחב',
      summarySection: 'סעיף 3-4',
      durationMinutes: 60,
      whatToLearn: [
        '10 האקסיומות של מרחב וקטורי (חיבור + כפל בסקלר)',
        'דוגמאות חשובות: F^n, M_{m×n}(F), F[x], F_n[x]',
        'תת-מרחב: קריטריון מקוצר — סגירות ל-LC + 0_V ∈ W',
        'חיתוך תתי-מרחב = תת-מרחב; איחוד — לא בהכרח!',
      ],
    },
    {
      number: '9-10',
      title: 'span (פרישה) ותלות ליניארית',
      summarySection: 'סעיף 6-7',
      durationMinutes: 75,
      whatToLearn: [
        'צירוף ליניארי: v = α₁v₁ + ... + αₖvₖ',
        'span{v₁,...,vₖ} = כל הצירופים הליניאריים — תמיד תת-מרחב!',
        'בת"ל: α₁v₁+...+αₖvₖ = 0 ⟹ כל αᵢ = 0',
        'ת"ל: יש αᵢ-ים לא כולם 0 שמאפסים',
        'אינטואיציה: בת"ל = אף אחד לא "מיותר"',
      ],
    },
    {
      number: '11-12',
      title: 'בסיס (Basis)',
      summarySection: 'סעיף 8',
      durationMinutes: 60,
      whatToLearn: [
        'בסיס = בת"ל + פורש',
        'בסיסים סטנדרטיים: e₁,...,eₙ של F^n; 1,x,x²,...,xⁿ של F_n[x]',
        'יחידות הייצוג: בבסיס יש ייצוג יחיד לכל וקטור',
        'משפט: כל מ"ו נוצר סופית ≠{0} יש לו בסיס',
      ],
    },
  ],
  definitions: [
    { id: 'd1-1', title: 'שדה', body: 'קבוצה F עם פעולות + ו-· המקיימת: סגירות, חילופיות, קיבוציות, אדישים (0,1), נגדיים, הופכיים (לכל x≠0), פילוג. 0_F ≠ 1_F.', importance: 'must', lectureRef: '1-4' },
    { id: 'd1-2', title: 'Z_n', body: 'Z_n = {0,1,...,n−1} עם חיבור וכפל מודולו n. Z_n שדה ⟺ n ראשוני.', importance: 'must', lectureRef: '1-4' },
    { id: 'd1-3', title: 'מטריצה מורחבת A⁺', body: 'מטריצת המקדמים יחד עם עמודת ה-b: כל שורה = משוואה אחת.', importance: 'must', lectureRef: '4-6' },
    { id: 'd1-4', title: 'פעולות שורה אלמנטריות', body: '(1) Rᵢ → αRᵢ עבור α≠0. (2) Rᵢ ↔ Rⱼ. (3) Rᵢ → Rᵢ + αRⱼ. שלושתן לא משנות את קבוצת הפתרונות.', importance: 'critical', lectureRef: '4-6' },
    { id: 'd1-5', title: 'צורה מדורגת קנונית (REF)', body: 'מטריצה מדורגת + כל מוביל = 1 + מוביל הוא היחיד שלא 0 בעמודתו. ה-REF של מטריצה היא יחידה.', importance: 'critical', lectureRef: '4-6' },
    { id: 'd1-6', title: 'דרגה (rank)', body: 'rank A = מספר המקדמים המובילים בצורה הקנונית של A.', importance: 'critical', lectureRef: '4-6' },
    { id: 'd1-7', title: 'מרחב וקטורי', body: 'קבוצה V מעל שדה F עם פעולות + (וקטורים) ו-· (סקלר·וקטור) המקיימת 10 אקסיומות (חיבור: 5, כפל בסקלר: 3, פילוג: 2).', importance: 'must', lectureRef: '7-8' },
    { id: 'd1-8', title: 'תת-מרחב W ⊆ V', body: 'W ≠ ∅ + W סגור ל-LC: לכל α₁,α₂∈F ולכל w₁,w₂∈W: α₁w₁+α₂w₂ ∈ W. (שקול ל: 0_V∈W, סגור לחיבור, סגור לכפל בסקלר.)', importance: 'critical', lectureRef: '7-8' },
    { id: 'd1-9', title: 'צירוף ליניארי (LC)', body: 'v הוא LC של v₁,...,vₖ אם קיימים α₁,...,αₖ ∈ F כך ש v = α₁v₁ + ... + αₖvₖ.', importance: 'critical', lectureRef: '9-10' },
    { id: 'd1-10', title: 'span', body: 'span{v₁,...,vₖ} = {α₁v₁+...+αₖvₖ : αᵢ∈F} — קבוצת כל ה-LC. תמיד תת-מרחב.', importance: 'critical', lectureRef: '9-10' },
    { id: 'd1-11', title: 'בלתי תלות ליניארית (בת"ל)', body: 'v₁,...,vₖ בת"ל אם: α₁v₁+...+αₖvₖ = 0_V ⟹ α₁=...=αₖ=0. (אם קיים פתרון לא טריוויאלי — ת"ל.)', importance: 'critical', lectureRef: '9-10' },
    { id: 'd1-12', title: 'בסיס', body: 'v₁,...,vₙ בסיס של V אם: (1) בת"ל, (2) פורש את V. בבסיס יש ייצוג יחיד לכל v∈V.', importance: 'critical', lectureRef: '11-12' },
  ],
  theorems: [
    { id: 't1-1', name: 'מספר פתרונות לפי דרגה', statement: 'rank A < rank A⁺ → אין פתרון; rank A = rank A⁺ = n → יחיד; rank A = rank A⁺ < n → אינסוף.', importance: 'critical', requiresProof: false, lectureRef: '4-6' },
    { id: 't1-2', name: 'span תמיד תת-מרחב', statement: 'span{v₁,...,vₖ} הוא תת-מרחב של V.', importance: 'must', requiresProof: false, lectureRef: '9-10' },
    { id: 't1-3', name: 'הוספת וקטור ל-span', statement: 'v ∈ span{v₁,...,vₖ} ⟺ span{v₁,...,vₖ} = span{v₁,...,vₖ,v}.', importance: 'should', requiresProof: false, lectureRef: '9-10' },
    { id: 't1-4', name: 'תכונה שימושית של ת"ל', statement: 'v₁,...,vₖ ת"ל ⟺ קיים j כך ש vⱼ ∈ span{v₁,...,vⱼ₋₁}.', importance: 'must', requiresProof: false, lectureRef: '9-10' },
  ],
  proofsToMemorize: [],   // No proofs to memorize on Day 1 — focus on understanding
  exercises: [
    { id: 'e1-1', title: 'דרג 3 מטריצות 3×3 לקנונית (לוח, ניר, מוח)', durationMinutes: 30, description: 'אל תפתחי את הפתרון לפני שניסית 10 דק' },
    { id: 'e1-2', title: 'בדקי תת-מרחב: האם {(x,y,z) : x+y=z} ⊆ R³ תת-מרחב?', durationMinutes: 15 },
    { id: 'e1-3', title: 'בדקי בת"ל: האם (1,2,3), (2,4,6), (1,0,0) ב-R³ בת"ל?', durationMinutes: 15 },
    { id: 'e1-4', title: 'מצאי בסיס ל-span{(1,1,0), (0,1,1), (1,2,1)} ב-R³', durationMinutes: 20 },
  ],
  pastExams: [],
  blocks: [
    { time: '09:00–10:00', hours: 1, type: 'theory', task: 'הרצאה 1-4: שדות + Z_p', details: 'קראי את סעיף 1 בסיכום. שימי לב במיוחד לאקסיומות ולעובדה ש-Z_p שדה רק כש-p ראשוני.', ref: '/summary' },
    { time: '10:00–10:15', hours: 0.25, type: 'rest', task: 'הפסקה' },
    { time: '10:15–11:30', hours: 1.25, type: 'theory', task: 'הרצאה 4-6: מערכות ליניאריות + דירוג', details: 'הכי חשוב: 3 פעולות השורה האלמנטריות + REF.', ref: '/summary' },
    { time: '11:30–12:30', hours: 1, type: 'practice', task: 'תרגול דירוג: 3 מטריצות בעצמך', details: 'עבדי על נייר. אל תיגעי במחשבון. שגיאות זה חלק מהתהליך.' },
    { time: '12:30–13:30', hours: 1, type: 'rest', task: 'ארוחת צהריים' },
    { time: '13:30–14:30', hours: 1, type: 'theory', task: 'הרצאה 7-8: מרחב וקטורי + תת-מרחב', details: '10 אקסיומות + הקריטריון המקוצר לתת-מרחב.', ref: '/summary' },
    { time: '14:30–15:45', hours: 1.25, type: 'theory', task: 'הרצאה 9-10: span + בת"ל', details: 'הגדרות מאוד חשובות. צריכה לדעת אותן בעל פה.', ref: '/summary' },
    { time: '15:45–16:00', hours: 0.25, type: 'rest', task: 'הפסקה' },
    { time: '16:00–17:00', hours: 1, type: 'theory', task: 'הרצאה 11-12: בסיס', details: 'בסיס = בת"ל + פורש. ייצוג יחיד.', ref: '/summary' },
    { time: '17:00–18:00', hours: 1, type: 'memorize', task: 'שינון 12 ההגדרות של היום', details: 'כתבי כל הגדרה מהזיכרון. התמקדי ב"קריטיות".' },
  ],
};

// ============================================================
// DAY 2 — Monday May 11 — BUILD: dim, matrices, det, 6 proofs
// ============================================================
const day2: BattleDay = {
  day: 2,
  date: '2026-05-11',
  weekday: 'שני',
  title: 'בנייה: מימד, מטריצות, דטרמיננטות + 6 הוכחות חיוניות',
  subtitle: 'הרצאות 13-23: dim, מטריצות הפיכות, Nul/Col/Row, det + הוכחות',
  goal: 'את יודעת לכתוב את 6 ההוכחות הקריטיות, מחשבת det של 4×4, ופותרת מערכת עם פרמטר.',
  totalHours: 8,
  accentColor: 'from-violet-500 to-purple-600',
  emoji: '🛠️',
  lectures: [
    {
      number: '13-15',
      title: 'מימד (dimension)',
      summarySection: 'סעיף 9',
      durationMinutes: 60,
      whatToLearn: [
        'dim V = מספר וקטורים בבסיס (לא תלוי בבסיס!)',
        'משפט: dim V = n ⟹ כל n+1 וקטורים ת"ל; n−1 וקטורים לא פורשים',
        'משפט השלוש: dim V = n + יש לנו n וקטורים → בסיס ⟺ בת"ל ⟺ פורשים',
        'משפט המימדים הראשון: dim(U+W) = dim U + dim W − dim(U∩W)',
        'dim W ≤ dim V; dim W = dim V ⟹ W = V',
      ],
    },
    {
      number: '16-17',
      title: 'מטריצות + כפל מטריצות',
      summarySection: 'סעיף 10-11',
      durationMinutes: 60,
      whatToLearn: [
        'M_{m×n}(F) = מ"ו, dim = m·n',
        'כפל מטריצות לא קומוטטיבי! AB ≠ BA',
        'אסוציאטיביות (AB)C = A(BC) + פילוג',
        'Ax̄ = x₁C̄₁ + ... + xₙC̄ₙ (LC של עמודות!)',
        'Ax̄=b̄ פתיר ⟺ b̄ ∈ ColA',
      ],
    },
    {
      number: '17-18',
      title: 'מטריצה הפיכה + טבלת השקילויות',
      summarySection: 'סעיף 12',
      durationMinutes: 75,
      whatToLearn: [
        'A הפיכה ⟺ ∃B: AB=BA=I_n',
        '15 התנאים השקולים (rank=n, det≠0, עמודות בסיס, ...)',
        '(AB)⁻¹ = B⁻¹A⁻¹ (היפוך הסדר!)',
        'אלגוריתם: דרג [A | I_n] עד [I_n | A⁻¹]',
        'מטריצה אלמנטרית = I_n אחרי פעולת שורה אחת',
      ],
    },
    {
      number: '18-19',
      title: 'שחלוף + Nul/Col/Row + Rank-Nullity',
      summarySection: 'סעיף 13-14',
      durationMinutes: 75,
      whatToLearn: [
        '(AB)ᵗ = BᵗAᵗ (היפוך!)',
        'סימטרית: A=Aᵗ; אנטי-סימטרית: A=−Aᵗ',
        'NulA = פתרונות Ax̄=0̄. ColA = span{עמודות}. RowA = span{שורות}',
        'מימד RowA = מימד ColA = rank A',
        'rank A + dim NulA = n  ← משפט הדרגה',
      ],
    },
    {
      number: '20-23',
      title: 'דטרמיננטות',
      summarySection: 'סעיף 15',
      durationMinutes: 75,
      whatToLearn: [
        'det = פונקציה: M_n → F. מולטי-לינארית, מתחלפת, det(I)=1',
        'משולשית → det = מכפלת האלכסון',
        'פעולות שורה: כפל ב-c → ×c; החלפה → ×(−1); הוספת כפולה → לא משנה',
        'det(AB) = det(A)·det(B); det(Aᵗ) = det(A)',
        'A הפיכה ⟺ det(A) ≠ 0',
        'פיתוח לפי שורה/עמודה: det A = Σ (−1)^(i+j) [A]ᵢⱼ Mᵢⱼ',
      ],
    },
  ],
  definitions: [
    { id: 'd2-1', title: 'מימד dim V', body: 'מספר הוקטורים בבסיס של V. אם V={0_V} אז dim V=0.', importance: 'critical', lectureRef: '13-15' },
    { id: 'd2-2', title: 'סכום + סכום ישר', body: 'U+W = {u+w : u∈U, w∈W}. סכום ישר U⊕W: U+W כך ש U∩W = {0_V}.', importance: 'must', lectureRef: '13-15' },
    { id: 'd2-3', title: 'כפל מטריצות', body: '[AB]ᵢⱼ = Σₖ [A]ᵢₖ·[B]ₖⱼ. דרוש: מס\' עמודות A = מס\' שורות B.', importance: 'critical', lectureRef: '16-17' },
    { id: 'd2-4', title: 'מטריצה הפיכה', body: 'A∈M_n(F) הפיכה אם ∃B∈M_n(F) יחידה: AB=BA=I_n. סימון: B = A⁻¹.', importance: 'critical', lectureRef: '17-18' },
    { id: 'd2-5', title: 'מטריצה אלמנטרית', body: 'מטריצה שמתקבלת מ-I_n ע"י פעולת שורה אלמנטרית אחת. כל אלמנטרית הפיכה.', importance: 'critical', lectureRef: '17-18' },
    { id: 'd2-6', title: 'שחלוף Aᵗ', body: '[Aᵗ]ᵢⱼ = [A]ⱼᵢ (החלפת שורות-עמודות). (AB)ᵗ = BᵗAᵗ.', importance: 'must', lectureRef: '18-19' },
    { id: 'd2-7', title: 'Nul/Col/Row', body: 'NulA = {x̄ : Ax̄=0̄}. ColA = span{עמודות A}. RowA = span{שורות A}. כל השלושה תתי-מרחב.', importance: 'critical', lectureRef: '18-19' },
    { id: 'd2-8', title: 'דטרמיננטה', body: 'פונקציה Δ: M_n(F)→F המקיימת: (1) מולטי-לינארית בכל שורה, (2) מתחלפת (שתי שורות זהות → 0), (3) Δ(I_n)=1. קיימת ויחידה לכל n.', importance: 'critical', lectureRef: '20-23' },
    { id: 'd2-9', title: 'מינור Mᵢⱼ', body: 'הדטרמיננטה של המטריצה שמתקבלת מ-A ע"י מחיקת שורה i ועמודה j.', importance: 'must', lectureRef: '20-23' },
    { id: 'd2-10', title: 'סימטרית / אנטי-סימטרית', body: 'סימטרית: A=Aᵗ. אנטי-סימטרית: A=−Aᵗ. אם 1+1≠0: M_n(F) = S ⊕ AS.', importance: 'should', lectureRef: '18-19' },
  ],
  theorems: [
    { id: 't2-1', name: 'משפט הדרגה (Rank-Nullity)', statement: 'rank(A) + dim(NulA) = n (n = מספר העמודות).', importance: 'critical', requiresProof: true, lectureRef: '18-19', topTheoremRank: 1 },
    { id: 't2-2', name: 'טבלת שקילויות ההפיכות', statement: 'A∈M_n(F): A הפיכה ⟺ rank=n ⟺ det≠0 ⟺ עמודות בסיס ⟺ NulA={0} ⟺ Ax̄=b̄ פתיר יחיד לכל b̄ ⟺ ...', importance: 'critical', requiresProof: true, lectureRef: '17-18', topTheoremRank: 2 },
    { id: 't2-3', name: 'משפט השלוש', statement: 'אם dim V = n ויהיו v₁,...,vₙ ∈ V: בסיס ⟺ בת"ל ⟺ פורשים.', importance: 'critical', requiresProof: true, lectureRef: '13-15', topTheoremRank: 3 },
    { id: 't2-4', name: 'מולטיפליקטיביות det', statement: 'det(AB) = det(A) · det(B).', importance: 'critical', requiresProof: true, lectureRef: '20-23', topTheoremRank: 4 },
    { id: 't2-5', name: 'דרגת שורות = דרגת עמודות', statement: 'dim(ColA) = dim(RowA) = rank(A).', importance: 'critical', requiresProof: true, lectureRef: '18-19', topTheoremRank: 5 },
    { id: 't2-6', name: 'למת שטיינל', statement: '{v₁,...,vₖ} בסיס + {w₁,...,wₘ} פורש ⟹ k ≤ m. בפרט: כל שני בסיסים שווי גודל.', importance: 'critical', requiresProof: true, lectureRef: '13-15', topTheoremRank: 6 },
    { id: 't2-7', name: 'משפט המימדים הראשון', statement: 'dim(U+W) = dim U + dim W − dim(U∩W).', importance: 'must', requiresProof: false, lectureRef: '13-15', topTheoremRank: 7 },
    { id: 't2-8', name: 'det(Aᵗ) = det(A)', statement: 'לכל A ∈ M_n(F).', importance: 'must', requiresProof: false, lectureRef: '20-23', topTheoremRank: 9 },
    { id: 't2-9', name: 'משולשית', statement: 'A משולשית ⟹ det A = מכפלת האלכסון.', importance: 'must', requiresProof: false, lectureRef: '20-23' },
  ],
  proofsToMemorize: [
    { topTheoremRank: 1, targetMinutes: 10 }, // Rank-Nullity
    { topTheoremRank: 2, targetMinutes: 12 }, // Invertibility
    { topTheoremRank: 3, targetMinutes: 10 }, // Three Theorems
    { topTheoremRank: 4, targetMinutes: 8 },  // det(AB)
    { topTheoremRank: 5, targetMinutes: 10 }, // Row=Col rank
    { topTheoremRank: 6, targetMinutes: 8 },  // Steinitz
  ],
  exercises: [
    { id: 'e2-1', title: 'הופכי ב-Z_5 (תרגיל #2)', durationMinutes: 25, topHomeworkRank: 2 },
    { id: 'e2-2', title: 'בסיס ל-NulA ולCol/Row + אימות Rank-Nullity (תרגיל #3)', durationMinutes: 30, topHomeworkRank: 3 },
    { id: 'e2-3', title: 'מערכת תלוית-פרמטר (תרגיל #1)', durationMinutes: 30, topHomeworkRank: 1 },
    { id: 'e2-4', title: 'חישוב det 4×4 בדירוג למשולשית (תרגיל #8)', durationMinutes: 25, topHomeworkRank: 8 },
  ],
  pastExams: [],
  blocks: [
    { time: '09:00–10:30', hours: 1.5, type: 'theory', task: 'הרצאה 13-15: מימד + משפט השלוש + dim(U+W)', details: 'הרצאה הכי חשובה. מסקנות 1+2 + משפט השלוש.', ref: '/summary' },
    { time: '10:30–10:45', hours: 0.25, type: 'rest', task: 'הפסקה' },
    { time: '10:45–12:30', hours: 1.75, type: 'theory', task: 'הרצאה 16-18: מטריצות + הפיכות + Nul/Col/Row', details: 'טבלת השקילויות (15 תנאים) + Rank-Nullity.', ref: '/summary' },
    { time: '12:30–13:30', hours: 1, type: 'rest', task: 'ארוחת צהריים' },
    { time: '13:30–15:00', hours: 1.5, type: 'theory', task: 'הרצאה 20-23: דטרמיננטות', details: 'הגדרה (מולטי-לינארית, מתחלפת, det(I)=1) + משפט (*) על פעולות שורה.', ref: '/summary' },
    { time: '15:00–16:30', hours: 1.5, type: 'memorize', task: '🏆 שינון 6 הוכחות קריטיות', details: 'קראי כל אחת 3 פעמים, אז כתבי מהזיכרון. שמור על הסדר.', ref: '/top-theorems' },
    { time: '16:30–16:45', hours: 0.25, type: 'rest', task: 'הפסקה' },
    { time: '16:45–18:00', hours: 1.25, type: 'practice', task: '4 תרגילים מבית: #1, #2, #3, #8', details: 'נסי לבד 10 דק לכל אחד לפני שתיפתחי פתרון.', ref: '/top-homework' },
  ],
};

// ============================================================
// DAY 3 — Tuesday May 12 — Moed A 2025 + remaining HW + re-prove top-3
// ============================================================
const day3: BattleDay = {
  day: 3,
  date: '2026-05-12',
  weekday: 'שלישי',
  title: 'מבחן ראשון: מועד א 2025 + תרגילים',
  subtitle: '3 שעות מבחן בתנאי אמת, אז ניתוח שגיאות + השלמת תרגילים',
  goal: 'את עברת בסימולציה ראשונה. את יודעת איפה החולשות. 3 ההוכחות הראשונות יושבות לך מצוין.',
  totalHours: 8,
  accentColor: 'from-amber-500 to-orange-600',
  emoji: '⚔️',
  lectures: [],
  definitions: [],
  theorems: [],
  proofsToMemorize: [
    { topTheoremRank: 1, targetMinutes: 8 },  // Rank-Nullity (faster!)
    { topTheoremRank: 2, targetMinutes: 10 }, // Invertibility
    { topTheoremRank: 3, targetMinutes: 8 },  // Three Theorems
  ],
  exercises: [
    { id: 'e3-1', title: 'rank(AB)=rank(B) (תרגיל #4)', durationMinutes: 25, topHomeworkRank: 4 },
    { id: 'e3-2', title: 'span equality (תרגיל #5)', durationMinutes: 25, topHomeworkRank: 5 },
    { id: 'e3-3', title: 'קיום העתקה ליניארית (תרגיל #6)', durationMinutes: 25, topHomeworkRank: 6 },
    { id: 'e3-4', title: 'dim(U∩W) = n−2 (תרגיל #7)', durationMinutes: 30, topHomeworkRank: 7 },
    { id: 'e3-5', title: 'תת-מרחב פולינומים (תרגיל #10)', durationMinutes: 25, topHomeworkRank: 10 },
  ],
  pastExams: [
    { name: 'מועד א 2025', href: '/exam2025a', durationMinutes: 180, isMandatory: true, note: 'בתנאי מבחן! ללא חומר עזר, ללא הפסקות. סטופר.' },
  ],
  blocks: [
    { time: '09:00–12:00', hours: 3, type: 'simulation', task: '⚠️ מבחן מועד א 2025 בתנאי אמת', details: 'סטופר. ללא חומר עזר. כתבי כאילו זה המבחן. אם תקועה ב-15 דק — דלגי.', ref: '/exam2025a' },
    { time: '12:00–13:00', hours: 1, type: 'rest', task: 'ארוחת צהריים + פירוק' },
    { time: '13:00–14:30', hours: 1.5, type: 'review', task: 'בדקי תשובות + הבני כל שגיאה', details: 'רשמי במחברת "השגיאות שלי" כל טעות. זו רשימה לחזרה ביום ד.', ref: '/exam2025a' },
    { time: '14:30–14:45', hours: 0.25, type: 'rest', task: 'הפסקה' },
    { time: '14:45–16:30', hours: 1.75, type: 'practice', task: 'תרגילים #4, #5, #6, #7, #10', details: 'התמקדי ב-#7 (dim(U∩W)) ו-#4 (rank theorems) — שאלת מועד ב צפויה.', ref: '/top-homework' },
    { time: '16:30–18:00', hours: 1.5, type: 'memorize', task: 'כתיבה מהזיכרון: 3 ההוכחות הראשונות', details: 'Rank-Nullity → Invertibility → Three Theorems. סטופר 10 דק לכל אחת.', ref: '/top-theorems' },
  ],
};

// ============================================================
// DAY 4 — Wednesday May 13 — Moed B 2024 + final review of all 6 proofs
// ============================================================
const day4: BattleDay = {
  day: 4,
  date: '2026-05-13',
  weekday: 'רביעי',
  title: 'מבחן שני: מועד ב 2024 + סקירה סופית',
  subtitle: 'מבחן מועד ב אמיתי + שינון אחרון של כל 6 ההוכחות',
  goal: 'את עברת מבחן מועד ב מציאותי. כל 6 ההוכחות יושבות. את מוכנה.',
  totalHours: 8,
  accentColor: 'from-blue-500 to-indigo-600',
  emoji: '🎯',
  lectures: [],
  definitions: [],
  theorems: [],
  proofsToMemorize: [
    { topTheoremRank: 1, targetMinutes: 8 },
    { topTheoremRank: 2, targetMinutes: 10 },
    { topTheoremRank: 3, targetMinutes: 8 },
    { topTheoremRank: 4, targetMinutes: 8 },
    { topTheoremRank: 5, targetMinutes: 10 },
    { topTheoremRank: 6, targetMinutes: 8 },
  ],
  exercises: [
    { id: 'e4-1', title: 'סימטריות + מכפלות (תרגיל #9) — אם נשאר זמן', durationMinutes: 15, topHomeworkRank: 9 },
  ],
  pastExams: [
    { name: 'מועד ב 2024', href: '/exam2024b', durationMinutes: 180, isMandatory: true, note: 'הסימולציה הכי קרובה למועד ב הקרוב.' },
    { name: 'מועד ב 2023 — שאלות מנושאי חולשה בלבד', href: '/exam2023b', durationMinutes: 60, isMandatory: false, note: 'בחרי 1-2 שאלות מהנושאים שטעית בהם אתמול.' },
  ],
  blocks: [
    { time: '09:00–12:00', hours: 3, type: 'simulation', task: '⚠️ מבחן מועד ב 2024 בתנאי אמת', details: 'הכי קרוב למועד ב שלך. סטופר. ללא חומר. בחרי 4 שאלות בחוכמה.', ref: '/exam2024b' },
    { time: '12:00–13:00', hours: 1, type: 'rest', task: 'ארוחת צהריים' },
    { time: '13:00–14:30', hours: 1.5, type: 'review', task: 'בדקי תשובות + רשימת שגיאות מעודכנת', details: 'השווי לרשימת השגיאות מאתמול — מה חוזר?', ref: '/exam2024b' },
    { time: '14:30–15:30', hours: 1, type: 'practice', task: 'מועד ב 2023: 1-2 שאלות מהנושאים החלשים', details: 'אל תעשי את כל המבחן — רק את הנושאים החלשים.', ref: '/exam2023b' },
    { time: '15:30–15:45', hours: 0.25, type: 'rest', task: 'הפסקה' },
    { time: '15:45–17:00', hours: 1.25, type: 'memorize', task: 'כתיבה מהזיכרון: כל 6 ההוכחות', details: 'סטופר 10 דק לכל אחת. אם נכשלת — קראי שוב וכתבי שוב.', ref: '/top-theorems' },
    { time: '17:00–18:00', hours: 1, type: 'review', task: 'דף נוסחאות אחרון + 8 כללי הזהב', details: 'רעננו את טבלת השקילויות + מלכודות נפוצות. תכינו את ערכת המבחן (עט×3, מחק, סרגל, תעודה, שעון).', ref: '/golden-rules' },
  ],
};

// ============================================================
// DAY 5 — Thursday May 14 — EXAM
// ============================================================
const day5: BattleDay = {
  day: 5,
  date: '2026-05-14',
  weekday: 'חמישי',
  title: 'יום המבחן 🎯',
  subtitle: 'בוקר רגוע, סקירה קלה, מבחן',
  goal: 'את שולטת. אל תלמדי חומר חדש היום!',
  totalHours: 0,
  accentColor: 'from-rose-500 to-red-600',
  emoji: '🏆',
  lectures: [],
  definitions: [],
  theorems: [],
  proofsToMemorize: [],
  exercises: [],
  pastExams: [],
  blocks: [
    { time: '07:00–08:00', hours: 0, type: 'rest', task: 'ארוחת בוקר טובה. תה / קפה.', details: 'אל תלמדי חומר חדש! פשוט תני למוח לעבוד.' },
    { time: '08:00–09:00', hours: 0, type: 'review', task: 'סקירה קלה: 3 ההוכחות הראשונות + טבלת שקילויות', details: 'רק לרענן. אל תיכנסי לפרטים.', ref: '/top-theorems' },
    { time: '09:00 ואילך', hours: 0, type: 'simulation', task: '🎯 המבחן! 3 שעות, 5 שאלות, 4 לתשובה.', details: 'התחילי בשאלות שאת בטוחה בהן. הקצי 35-40 דק לשאלה. בהצלחה!' },
  ],
};

export const battlePlan: BattleDay[] = [day1, day2, day3, day4, day5];

export const examMeta = {
  examDate: '2026-05-14',
  examLabel: 'יום חמישי, 14 במאי 2026',
  daysFromToday: 4,           // recalculate dynamically; this is informational
  totalStudyHours: 32,        // 8 + 8 + 8 + 8 + 0
  hoursPerDay: 8,
  studyDays: 4,
};

export const goldenRules = [
  { title: 'תמיד לציין תנאים', body: 'A ∈ M_n(F), F שדה, V נוצר סופית — אל תשמיטי אף תנאי. "תשובה לא מוסברת = 0 נקודות".' },
  { title: 'בקשי את שם המשפט', body: '"לפי משפט הדרגה...", "לפי משפט השלוש..." — תמיד צטטי בשם.' },
  { title: 'אם זה אמ"מ — שני כיוונים', body: 'הוכיחי (⇒) ואז (⇐). אל תניחי שכיוון אחד מספיק.' },
  { title: 'פצלי למקרים בעת מתן פרמטר', body: 'אם יש a ∈ R בשאלה, חייב לבחון את כל ערכי a שמשנים את הדירוג (אלכסון = 0?).' },
  { title: 'דירוג שורה: לעבוד שורה אחת בכל פעם', body: 'אסור לערבב מספר פעולות בשורה אחת — הבוחנים מורידים נקודות.' },
  { title: '(AB)ᵗ = BᵗAᵗ — היפוך הסדר', body: 'גם להופכי: (AB)⁻¹ = B⁻¹·A⁻¹. שכחה של זה = הורדת נקודות.' },
  { title: 'בדקי לפני שמחלקת', body: 'בכל שדה (במיוחד Z_p): ודאי שהאיבר ≠ 0 לפני שאת לוקחת הופכי.' },
  { title: 'אל תסתמכי על תוצאות שלא הוכחו בקורס', body: '"אסור להישען על חומר שלא נלמד בקורס".' },
];

// Helper for the page UI
export function getDayProgressKeys(day: BattleDay): string[] {
  const keys: string[] = [];
  day.blocks.forEach((_, i) => keys.push(`d${day.day}-block-${i}`));
  day.lectures.forEach((l) => keys.push(`d${day.day}-lec-${l.number}`));
  day.definitions.forEach((d) => keys.push(`d${day.day}-def-${d.id}`));
  day.theorems.forEach((t) => keys.push(`d${day.day}-thm-${t.id}`));
  day.exercises.forEach((e) => keys.push(`d${day.day}-ex-${e.id}`));
  day.pastExams.forEach((e) => keys.push(`d${day.day}-exam-${e.name}`));
  day.proofsToMemorize.forEach((p) => keys.push(`d${day.day}-proof-${p.topTheoremRank}`));
  return keys;
}
