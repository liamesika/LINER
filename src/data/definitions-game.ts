// 20 most important definitions for Linear Algebra 1 Moed G
// Designed for flashcards, quiz, and memory-match game modes
// All content in my own concise Hebrew phrasing

export interface DefCard {
  id: string;
  title: string;       // short display name
  short: string;       // 1-line key phrase (for match mode)
  body: string;        // full definition (for flashcard)
  keywords: string[];  // for fill-in-blank mode
  source: string;      // lecture
  category: 'foundation' | 'spaces' | 'matrices' | 'det';
  difficulty: 1 | 2 | 3;
}

export const defCards: DefCard[] = [
  {
    id: 'field',
    title: 'שדה (Field)',
    short: 'קבוצה עם +,· שמקיימת 9 אקסיומות',
    body: 'קבוצה <span class="mathb">F</span> עם פעולות + ו-· המקיימת: סגירות, חילופיות, קיבוציות, איברים אדישים (<span class="mathb">0_F, 1_F</span>), נגדיים, הופכיים לכל <span class="mathb">a≠0</span>, ופילוג. תנאי: <span class="mathb">0_F ≠ 1_F</span>.',
    keywords: ['חילופיות', 'קיבוציות', 'אדיש', 'נגדי', 'הופכי', 'פילוג'],
    source: 'הרצ\' 1',
    category: 'foundation',
    difficulty: 1,
  },
  {
    id: 'zn',
    title: 'Z_n',
    short: 'שאריות מודולו n — שדה ⟺ n ראשוני',
    body: '<span class="mathb">Z_n = {0, 1, 2, ..., n−1}</span> עם חיבור וכפל מודולו n. שדה ⟺ <span class="mathb">n</span> ראשוני.',
    keywords: ['מודולו', 'ראשוני', 'הופכי'],
    source: 'הרצ\' 3',
    category: 'foundation',
    difficulty: 1,
  },
  {
    id: 'rref',
    title: 'מטריצה מדורגת קנונית (RREF)',
    short: 'מובילים = 1, יחידים בעמודה',
    body: 'מטריצה מדורגת שבה: (1) כל מקדם מוביל = <span class="mathb">1</span>, (2) המוביל הוא האיבר היחיד שאינו 0 בעמודתו. RREF של מטריצה היא <strong>יחידה</strong>.',
    keywords: ['מקדם מוביל', 'יחידה', 'עמודה'],
    source: 'הרצ\' 5',
    category: 'foundation',
    difficulty: 1,
  },
  {
    id: 'row-ops',
    title: 'פעולות שורה אלמנטריות',
    short: '3 פעולות שלא משנות פתרונות',
    body: '(1) <span class="mathb">R_i → α·R_i</span> כש-<span class="mathb">α≠0</span>. (2) <span class="mathb">R_i ↔ R_j</span>. (3) <span class="mathb">R_i → R_i + α·R_j</span>. שלושתן לא משנות את קבוצת הפתרונות.',
    keywords: ['כפל', 'החלפה', 'הוספה'],
    source: 'הרצ\' 5',
    category: 'foundation',
    difficulty: 1,
  },
  {
    id: 'rank',
    title: 'דרגה rank(A)',
    short: 'מספר מובילים בקנונית',
    body: '<span class="mathb">rank(A)</span> = מספר המקדמים המובילים בצורה הקנונית של <span class="mathb">A</span>. שווה ל-<span class="mathb">dim ColA = dim RowA</span>.',
    keywords: ['מובילים', 'קנונית', 'מימד'],
    source: 'הרצ\' 6',
    category: 'foundation',
    difficulty: 2,
  },
  {
    id: 'vec-space',
    title: 'מרחב וקטורי',
    short: 'קבוצה עם +, כפל בסקלר, 10 אקסיומות',
    body: 'קבוצה <span class="mathb">V</span> מעל שדה <span class="mathb">F</span> עם חיבור וכפל בסקלר המקיימת 10 אקסיומות: 5 לחיבור (סגירות, חילופיות, קיבוציות, <span class="mathb">0_V</span>, נגדי), 3 לכפל בסקלר (סגירות, קיבוציות, <span class="mathb">1·v=v</span>), 2 לפילוג.',
    keywords: ['אקסיומות', 'סגירות', 'אדיש', 'פילוג'],
    source: 'הרצ\' 7',
    category: 'spaces',
    difficulty: 2,
  },
  {
    id: 'subspace',
    title: 'תת-מרחב W ⊆ V',
    short: '0_V ∈ W + סגור ל-LC',
    body: 'תת-מרחב הוא תת-קבוצה <span class="mathb">W ⊆ V</span> המקיימת: <span class="mathb">0_V ∈ W</span>, סגור לחיבור, וסגור לכפל בסקלר. שווה ערך: סגור לצירוף ליניארי.',
    keywords: ['סגור', 'צירוף ליניארי', 'אפס'],
    source: 'הרצ\' 8',
    category: 'spaces',
    difficulty: 2,
  },
  {
    id: 'lc',
    title: 'צירוף ליניארי (LC)',
    short: 'v = α₁v₁ + ... + αₖvₖ',
    body: '<span class="mathb">v</span> הוא צירוף ליניארי של <span class="mathb">v_1, ..., v_k</span> אם קיימים סקלרים <span class="mathb">α_1, ..., α_k ∈ F</span> כך ש-<span class="mathb">v = α_1 v_1 + ... + α_k v_k</span>.',
    keywords: ['סקלרים', 'צירוף', 'מקדמים'],
    source: 'הרצ\' 9',
    category: 'spaces',
    difficulty: 1,
  },
  {
    id: 'span',
    title: 'Span (פרישה)',
    short: 'אוסף כל ה-LC — תמיד תת-מרחב',
    body: '<span class="mathb">Span{v_1, ..., v_k} = {α_1 v_1 + ... + α_k v_k : α_i ∈ F}</span> — קבוצת כל הצירופים הליניאריים. תמיד תת-מרחב. <span class="mathb">Span(∅) = {0_V}</span>.',
    keywords: ['צירופים', 'תת-מרחב', 'פורש'],
    source: 'הרצ\' 9',
    category: 'spaces',
    difficulty: 2,
  },
  {
    id: 'li',
    title: 'בלתי תלות ליניארית (בת"ל)',
    short: 'Σαᵢvᵢ = 0 ⟹ כל αᵢ = 0',
    body: '<span class="mathb">v_1, ..., v_k</span> בת"ל אם: <span class="mathb">α_1 v_1 + ... + α_k v_k = 0_V</span> גורר <span class="mathb">α_1 = ... = α_k = 0</span>.',
    keywords: ['טריוויאלי', 'אפס', 'מקדמים'],
    source: 'הרצ\' 10',
    category: 'spaces',
    difficulty: 2,
  },
  {
    id: 'ld',
    title: 'תלות ליניארית (ת"ל)',
    short: 'יש LC לא טריוויאלי = 0',
    body: '<span class="mathb">v_1, ..., v_k</span> ת"ל אם <strong>קיימים</strong> <span class="mathb">α_1, ..., α_k</span> <strong>לא כולם 0</strong> כך ש-<span class="mathb">α_1 v_1 + ... + α_k v_k = 0_V</span>.',
    keywords: ['לא טריוויאלי', 'מקדמים', 'אפס'],
    source: 'הרצ\' 10',
    category: 'spaces',
    difficulty: 2,
  },
  {
    id: 'basis',
    title: 'בסיס',
    short: 'בת"ל + פורש',
    body: '<span class="mathb">v_1, ..., v_n</span> בסיס של <span class="mathb">V</span> אם: (1) הם בת"ל, (2) הם פורשים את <span class="mathb">V</span>. כל וקטור ב-<span class="mathb">V</span> יש לו ייצוג <strong>יחיד</strong> כצירוף ליניארי שלהם.',
    keywords: ['בת"ל', 'פורש', 'יחיד'],
    source: 'הרצ\' 11',
    category: 'spaces',
    difficulty: 2,
  },
  {
    id: 'dim',
    title: 'מימד dim V',
    short: 'מספר וקטורים בבסיס',
    body: '<span class="mathb">dim V = </span> מספר הוקטורים בבסיס של <span class="mathb">V</span> (לא תלוי בבחירת הבסיס). אם <span class="mathb">V = {0_V}</span>: <span class="mathb">dim V = 0</span>. אם לא נוצר סופית: <span class="mathb">∞</span>.',
    keywords: ['בסיס', 'מספר', 'יחיד'],
    source: 'הרצ\' 13',
    category: 'spaces',
    difficulty: 2,
  },
  {
    id: 'mat-mult',
    title: 'כפל מטריצות',
    short: '[AB]ᵢⱼ = Σ [A]ᵢₖ·[B]ₖⱼ',
    body: 'אם <span class="mathb">A ∈ M_{m×n}</span> ו-<span class="mathb">B ∈ M_{n×r}</span>: <span class="mathb">[AB]_{ij} = Σ_k [A]_{ik}·[B]_{kj}</span>. דרישה: עמודות <span class="mathb">A</span> = שורות <span class="mathb">B</span>.',
    keywords: ['סכום', 'עמודות', 'שורות'],
    source: 'הרצ\' 16',
    category: 'matrices',
    difficulty: 2,
  },
  {
    id: 'invertible',
    title: 'מטריצה הפיכה',
    short: 'AB = BA = I_n, B = A⁻¹ יחיד',
    body: '<span class="mathb">A ∈ M_n(F)</span> הפיכה אם קיימת <span class="mathb">B</span> <strong>יחידה</strong> כך ש-<span class="mathb">AB = BA = I_n</span>. מסמנים <span class="mathb">B = A⁻¹</span>.',
    keywords: ['יחידה', 'I_n', 'דו-צדדי'],
    source: 'הרצ\' 17',
    category: 'matrices',
    difficulty: 1,
  },
  {
    id: 'elementary',
    title: 'מטריצה אלמנטרית',
    short: 'I_n אחרי פעולת שורה אחת',
    body: '<span class="mathb">E ∈ M_n(F)</span> אלמנטרית אם מתקבלת מ-<span class="mathb">I_n</span> ע"י פעולת שורה אלמנטרית <strong>אחת</strong>. כל אלמנטרית הפיכה, וההופכי שלה גם אלמנטרי.',
    keywords: ['פעולה', 'I_n', 'הפיכה'],
    source: 'הרצ\' 17',
    category: 'matrices',
    difficulty: 2,
  },
  {
    id: 'transpose',
    title: 'שחלוף Aᵗ + סימטרית',
    short: '[Aᵗ]ᵢⱼ = [A]ⱼᵢ',
    body: '<span class="mathb">[A^t]_{ij} = [A]_{ji}</span>. <strong>סימטרית:</strong> <span class="mathb">A = A^t</span>. <strong>אנטי-סימטרית:</strong> <span class="mathb">A = −A^t</span>. תכונה חשובה: <span class="mathb">(AB)^t = B^t A^t</span>.',
    keywords: ['החלפה', 'סימטרית', 'אנטי'],
    source: 'הרצ\' 18',
    category: 'matrices',
    difficulty: 2,
  },
  {
    id: 'nul-col-row',
    title: 'NulA, ColA, RowA',
    short: 'אפס · עמודות · שורות',
    body: '<span class="mathb">Nul(A) = {x̄ : Ax̄ = 0̄}</span> (תת-מרחב של <span class="mathb">F^n</span>). <span class="mathb">Col(A) = Span{עמודות}</span>. <span class="mathb">Row(A) = Span{שורות} = Col(A^t)</span>.',
    keywords: ['Span', 'אפס', 'תת-מרחב'],
    source: 'הרצ\' 19',
    category: 'matrices',
    difficulty: 3,
  },
  {
    id: 'det-axiomatic',
    title: 'דטרמיננטה (אקסיומטית)',
    short: 'מולטי-לינארית + אלטרנטיבית + det(I)=1',
    body: 'פונקציה <span class="mathb">Δ: M_n(F) → F</span> המקיימת: (1) מולטי-לינארית בכל שורה, (2) מתחלפת (alternating) — שורות זהות → 0, (3) <span class="mathb">Δ(I_n) = 1</span>. קיימת ויחידה (משפט חשוב 3).',
    keywords: ['מולטי-לינארית', 'מתחלפת', 'יחידה'],
    source: 'הרצ\' 20',
    category: 'det',
    difficulty: 3,
  },
  {
    id: 'minor',
    title: 'מינור Mᵢⱼ',
    short: 'det של תת-מטריצה אחרי מחיקה',
    body: '<span class="mathb">M_{ij}^{(A)}</span> — הדטרמיננטה של המטריצה <span class="mathb">(n-1) × (n-1)</span> שמתקבלת מ-<span class="mathb">A</span> ע"י <strong>מחיקת</strong> שורה <span class="mathb">i</span> ועמודה <span class="mathb">j</span>.',
    keywords: ['מחיקה', 'שורה', 'עמודה', 'תת-מטריצה'],
    source: 'הרצ\' 22',
    category: 'det',
    difficulty: 2,
  },
];

// Helpers
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getRandomDistractors(correctId: string, count: number): DefCard[] {
  return shuffle(defCards.filter((c) => c.id !== correctId)).slice(0, count);
}
