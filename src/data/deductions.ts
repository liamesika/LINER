// Deduction shortcuts for Linear Algebra 1 — "if given X, you can deduce Y".
// Compiled from lectures, HW2-12, and past exams (2022-2025).
//
// Each deduction is meant to be:
//   - SHORT: given (1 line) → deduce (1 line) + 2-3 sentence "why"
//   - PRACTICAL: things that appear as steps in exam proofs

export type DeductionCategory =
  | 'span'
  | 'LI'
  | 'dim'
  | 'subspace'
  | 'rank'
  | 'invertibility'
  | 'determinant';

export interface Deduction {
  id: string;
  category: DeductionCategory;
  title: string;          // Hebrew short title
  given: string;          // formal "if" (math)
  deduce: string;         // formal "then" (math)
  why: string;            // 2-3 sentence intuition / mini-proof
  example?: string;       // optional concrete example
  source?: string;        // optional "HW8 Q4" or "מועד א 2025"
  starred?: boolean;      // flag exam-favorites
}

// ────────────────────────────────────────────────────────────────
// SPAN — פרישה
// ────────────────────────────────────────────────────────────────

const spanDeductions: Deduction[] = [
  {
    id: 's1',
    category: 'span',
    title: 'הוספת LC לא משנה span',
    given: 'v ∈ Span{v₁,...,vₖ}',
    deduce: 'Span{v₁,...,vₖ, v} = Span{v₁,...,vₖ}',
    why: 'אם v כבר LC של השאר, הוספתו לא מוסיפה וקטורים חדשים ל-span. כל LC של {v₁,...,vₖ, v} ניתן לכתוב גם כ-LC של {v₁,...,vₖ} בלבד.',
  },
  {
    id: 's2',
    category: 'span',
    title: 'הוקטור המבריח בולט',
    given: 'v ∈ Span{v₁,v₂,v₃} ∧ v ∉ Span{v₁,v₂}',
    deduce: 'v₃ ∉ Span{v₁,v₂}',
    why: 'נכתוב v = α₁v₁ + α₂v₂ + α₃v₃. אם v₃ ∈ Span{v₁,v₂} אז v כתוב כ-LC של v₁,v₂ בלבד — סתירה ל-v ∉ Span{v₁,v₂}. כלומר v₃ הוא "המבריח" שעוזר ל-v לצאת מ-Span{v₁,v₂}.',
    starred: true,
  },
  {
    id: 's3',
    category: 'span',
    title: 'הכלה משמרת span',
    given: 'A ⊆ B',
    deduce: 'Span(A) ⊆ Span(B)',
    why: 'כל LC של איברי A הוא גם LC של איברי B (פשוט עם מקדם 0 על האיברים החסרים).',
  },
  {
    id: 's4',
    category: 'span',
    title: 'איחוד span לפי האיברים',
    given: 'U = Span{u₁,...,uₖ}, W = Span{w₁,...,wₗ}',
    deduce: 'U + W = Span{u₁,...,uₖ, w₁,...,wₗ}',
    why: 'כל u+w הוא LC של {uᵢ} עם LC של {wⱼ} = LC משולב של כולם. ההפך: כל LC של האיחוד מתפצל ל-LC של U + LC של W.',
    starred: true,
  },
  {
    id: 's5',
    category: 'span',
    title: 'שוויון span דרך הכלה דו-כיוונית',
    given: 'A ⊆ Span(B) ∧ B ⊆ Span(A)',
    deduce: 'Span(A) = Span(B)',
    why: 'A ⊆ Span(B) ⟹ Span(A) ⊆ Span(B) (כי span סגור ל-LC). דומה לכיוון השני. שווה ערך: אם כל איבר של אחת ניתן לבטא כ-LC של האחרת.',
    starred: true,
  },
  {
    id: 's6',
    category: 'span',
    title: 'span תמיד תת-מרחב',
    given: 'v₁,...,vₖ ∈ V',
    deduce: 'Span{v₁,...,vₖ} ≤ V (תת-מרחב)',
    why: 'סגור לחיבור (LC + LC = LC) וכפל בסקלר (α·LC = LC). 0_V = 0·v₁ + ... + 0·vₖ ∈ Span. שלושת התנאים → תת-מרחב.',
  },
  {
    id: 's7',
    category: 'span',
    title: 'span = תת-המרחב הקטן ביותר המכיל',
    given: 'W ≤ V ∧ {v₁,...,vₖ} ⊆ W',
    deduce: 'Span{v₁,...,vₖ} ⊆ W',
    why: 'W סגור ל-LC, לכן כל LC של אבריו נשאר בו. ה-span הוא בדיוק האוסף של כל ה-LC, אז Span ⊆ W.',
  },
];

// ────────────────────────────────────────────────────────────────
// LI / LD — תלות לינארית
// ────────────────────────────────────────────────────────────────

const liDeductions: Deduction[] = [
  {
    id: 'l1',
    category: 'LI',
    title: 'הוספת וקטור מחוץ ל-span שומרת בת"ל',
    given: '{v₁,...,vₖ} בת"ל ∧ v ∉ Span{v₁,...,vₖ}',
    deduce: '{v₁,...,vₖ, v} בת"ל',
    why: 'נניח α₁v₁+...+αₖvₖ+βv = 0. אם β ≠ 0 אז v = -1/β·(αᵢvᵢ) ∈ Span — סתירה. אז β = 0, ומבת"ל של v₁,...,vₖ כל αᵢ = 0.',
    starred: true,
  },
  {
    id: 'l2',
    category: 'LI',
    title: 'תת-קבוצה של בת"ל היא בת"ל',
    given: '{v₁,...,vₖ} בת"ל ∧ B ⊆ {v₁,...,vₖ}',
    deduce: 'B בת"ל',
    why: 'אם LC לא-טריוויאלי של B נותן 0, נוכל להרחיב לכל הקבוצה במקדם 0 — וזה LC לא-טריוויאלי של הכל. סתירה.',
  },
  {
    id: 'l3',
    category: 'LI',
    title: 'על-קבוצה של ת"ל היא ת"ל',
    given: '{v₁,...,vₖ} ת"ל ∧ {v₁,...,vₖ} ⊆ A',
    deduce: 'A ת"ל',
    why: 'יש לנו כבר LC לא-טריוויאלי של חלק מהווקטורים שנותן 0. נשלים במקדמי 0 לאחרים ונקבל LC לא-טריוויאלי של A.',
  },
  {
    id: 'l4',
    category: 'LI',
    title: 'אם 0_V בקבוצה — ת"ל',
    given: '0_V ∈ {v₁,...,vₖ}',
    deduce: '{v₁,...,vₖ} ת"ל',
    why: '1·0_V = 0_V — מקדם 1 על וקטור האפס בלי האחרים נותן 0_V. זה LC לא-טריוויאלי.',
  },
  {
    id: 'l5',
    category: 'LI',
    title: 'שני וקטורים: ת"ל ⟺ אחד = כפולה',
    given: 'v₁, v₂ ∈ V, אף אחד אינו 0_V',
    deduce: 'ת"ל ⟺ ∃α ∈ F: v₂ = αv₁',
    why: 'אם α₁v₁ + α₂v₂ = 0 ו-α₂ ≠ 0 אז v₂ = -α₁/α₂·v₁. הכיוון ההפוך: 1·v₂ + (-α)·v₁ = 0.',
  },
  {
    id: 'l6',
    category: 'LI',
    title: 'הקריטריון התלותי הצעדי',
    given: '{v₁,...,vₖ} ת"ל',
    deduce: '∃j: vⱼ ∈ Span{v₁,...,vⱼ₋₁}',
    why: 'יש LC לא-טריוויאלי α₁v₁+...+αₖvₖ = 0. ניקח j = המקדם האחרון שלא 0. אז vⱼ = -1/αⱼ·(α₁v₁+...+αⱼ₋₁vⱼ₋₁).',
    starred: true,
  },
  {
    id: 'l7',
    category: 'LI',
    title: 'יותר מ-dim וקטורים → ת"ל',
    given: 'dim V = n ∧ k > n',
    deduce: 'כל k וקטורים ב-V הם ת"ל',
    why: 'מסקנה ישירה ממשפט שטיינל: אם k > n אז יש "יותר וקטורים מבסיס" — לפחות אחד הוא LC של האחרים.',
    starred: true,
  },
  {
    id: 'l8',
    category: 'LI',
    title: 'בת"ל ⟹ ייצוג יחיד',
    given: '{v₁,...,vₖ} בת"ל ∧ v = Σαᵢvᵢ = Σβᵢvᵢ',
    deduce: 'αᵢ = βᵢ לכל i',
    why: 'מחסרים: Σ(αᵢ-βᵢ)vᵢ = 0. בת"ל ⟹ αᵢ-βᵢ = 0 לכל i.',
    starred: true,
  },
  {
    id: 'l9',
    category: 'LI',
    title: 'בת"ל בעמודות ⟺ Ax=0 רק טריוויאלי',
    given: 'A∈M_{m×n}(F)',
    deduce: 'עמודות A בת"ל ⟺ NulA = {0̄}',
    why: 'Ax̄ = x₁C̄₁+...+xₙC̄ₙ. הצירוף הזה = 0̄ רק כש-x̄ = 0̄ ⟺ העמודות בת"ל.',
    starred: true,
  },
  {
    id: 'l10',
    category: 'LI',
    title: 'בת"ל באיחוד מצריך עוד תנאי',
    given: 'A, B ⊆ V, A∪B בת"ל',
    deduce: 'A∩B ⊆ {0_V}, A בת"ל, B בת"ל',
    why: 'תת-קבוצה של בת"ל היא בת"ל. גם — אם v ∈ A∩B (וגם v ≠ 0) אז v נחשב פעמיים, ובכל מקרה Span(A)∩Span(B) ⊆ Span(A∪B). זהירות: ההפך לא נכון!',
  },
];

// ────────────────────────────────────────────────────────────────
// DIM — מימד
// ────────────────────────────────────────────────────────────────

const dimDeductions: Deduction[] = [
  {
    id: 'd1',
    category: 'dim',
    title: 'משפט השלוש (חזק!)',
    given: 'dim V = n ∧ |{v₁,...,vₙ}| = n',
    deduce: 'בסיס ⟺ בת"ל ⟺ פורש',
    why: 'אם בת"ל בגודל המימד — אסור שלא יפרשו (אחרת נוסיף ונחרוג ממימד). אם פורשים בגודל המימד — אסור שיהיו ת"ל (אחרת נוריד וניחות).',
    starred: true,
  },
  {
    id: 'd2',
    category: 'dim',
    title: 'מתחת למימד → לא פורש',
    given: 'dim V = n ∧ k < n',
    deduce: 'k וקטורים אינם פורשים את V',
    why: 'אם פרשו — מקרב הקבוצה הפורשת ניתן לחלץ בסיס בגודל ≤ k < n. סתירה לכך ש-dim V = n.',
  },
  {
    id: 'd3',
    category: 'dim',
    title: 'מעל המימד → ת"ל',
    given: 'dim V = n ∧ k > n',
    deduce: 'k וקטורים הם ת"ל',
    why: 'משפט שטיינל: בסיס ≤ פורש. אם k וקטורים בת"ל אז k ≤ dim V = n.',
    starred: true,
  },
  {
    id: 'd4',
    category: 'dim',
    title: 'תת-מרחב באותו מימד = שווה',
    given: 'W ≤ V ∧ dim W = dim V (סופי)',
    deduce: 'W = V',
    why: 'בסיס ל-W הוא n וקטורים בת"ל ב-V. לפי משפט השלוש, הם בסיס ל-V. לכן Span(B_W) = V, וגם ⊆ W. מסקנה: V = W.',
    starred: true,
  },
  {
    id: 'd5',
    category: 'dim',
    title: 'הכלה + מימד שווה ⟹ שוויון',
    given: 'U ⊆ W ⊆ V ∧ dim U = dim W',
    deduce: 'U = W',
    why: 'בסיס של U הוא LI ב-W. הוא בגודל dim W → לפי משפט השלוש, בסיס ל-W. לכן Span = W = U.',
    starred: true,
  },
  {
    id: 'd6',
    category: 'dim',
    title: 'משפט המימדים הראשון',
    given: 'U, W ≤ V (V נוצר סופית)',
    deduce: 'dim(U+W) = dim U + dim W − dim(U∩W)',
    why: 'ניקח בסיס ל-U∩W ונשלים פעם אחת לבסיס של U ופעם נוספת לבסיס של W. האיחוד הוא בסיס ל-U+W. סופרים.',
    starred: true,
  },
  {
    id: 'd7',
    category: 'dim',
    title: 'סכום ישר → סכום המימדים',
    given: 'V = U⊕W (כלומר U∩W = {0_V})',
    deduce: 'dim V = dim U + dim W',
    why: 'מ-משפט המימדים הראשון: dim(U+W) = dim U + dim W − 0. וכש-V = U+W זה גם dim V.',
  },
  {
    id: 'd8',
    category: 'dim',
    title: 'חסם תחתון על חיתוך',
    given: 'dim V = n ∧ dim U = a ∧ dim W = b',
    deduce: 'dim(U∩W) ≥ a + b − n',
    why: 'dim(U+W) ≤ n. מ-משפט המימדים הראשון: dim(U∩W) = a+b − dim(U+W) ≥ a+b − n.',
    starred: true,
  },
  {
    id: 'd9',
    category: 'dim',
    title: 'דוגמה: dim(U+W) ≤ dim V',
    given: 'U, W ≤ V (סופי), dim U + dim W > dim V',
    deduce: 'U ∩ W ≠ {0_V}',
    why: 'משפט המימדים: dim(U+W) = dim U + dim W − dim(U∩W). אם dim(U∩W) = 0 אז dim(U+W) > dim V, סתירה ל-U+W ⊆ V.',
    starred: true,
  },
  {
    id: 'd10',
    category: 'dim',
    title: 'משפט ההשלמה לבסיס',
    given: 'dim V = n ∧ {v₁,...,vₖ} בת"ל, k < n',
    deduce: '∃vₖ₊₁,...,vₙ ∈ V: {v₁,...,vₙ} בסיס',
    why: 'הוקטורים לא פורשים (k < n). יש v ∉ Span. נוסיפו → עדיין בת"ל. חוזרים עד שמגיעים ל-n.',
    starred: true,
  },
  {
    id: 'd11',
    category: 'dim',
    title: 'תת-מרחב נוצר סופית',
    given: 'V נוצר סופית ∧ W ≤ V',
    deduce: 'W נוצר סופית ∧ dim W ≤ dim V',
    why: 'כל קבוצה בת"ל ב-W היא בת"ל ב-V → גודלה ≤ dim V. ניקח בת"ל מקסימלי ב-W — בסיס.',
  },
];

// ────────────────────────────────────────────────────────────────
// SUBSPACE + sums — תת-מרחב + סכומים
// ────────────────────────────────────────────────────────────────

const subspaceDeductions: Deduction[] = [
  {
    id: 'sp1',
    category: 'subspace',
    title: 'חיתוך תתי-מרחב = תת-מרחב',
    given: 'U, W ≤ V',
    deduce: 'U ∩ W ≤ V',
    why: '0_V ∈ U ו-0_V ∈ W → 0_V ∈ U∩W. סגירות: אם x,y ∈ U∩W ו-α∈F, אז αx+y ∈ U וגם ∈ W → ∈ U∩W.',
  },
  {
    id: 'sp2',
    category: 'subspace',
    title: 'סכום U+W תמיד תת-מרחב',
    given: 'U, W ≤ V',
    deduce: 'U + W ≤ V',
    why: '0_V = 0_V + 0_V ∈ U+W. סגירות: (u₁+w₁) + α(u₂+w₂) = (u₁+αu₂) + (w₁+αw₂) ∈ U+W.',
  },
  {
    id: 'sp3',
    category: 'subspace',
    title: 'איחוד תתי-מרחב — בדרך כלל לא תת-מרחב',
    given: 'U, W ≤ V ∧ U ⊄ W ∧ W ⊄ U',
    deduce: 'U ∪ W אינו תת-מרחב',
    why: '∃u ∈ U \\ W, ∃w ∈ W \\ U. נטען u+w ∉ U∪W. אם u+w ∈ U אז w = (u+w)−u ∈ U — סתירה. דומה ל-W.',
    starred: true,
  },
  {
    id: 'sp4',
    category: 'subspace',
    title: 'V כאיחוד שני תתי-מרחב',
    given: 'V = U ∪ W (U, W ≤ V)',
    deduce: 'U = V ∨ W = V',
    why: 'נובע מהקודם בשלילה: אם אף אחד לא = V אז U ⊄ V וכן W. אז U ∪ W ⊊ V — סתירה.',
  },
  {
    id: 'sp5',
    category: 'subspace',
    title: 'סכום ישר אמ"מ חיתוך טריוויאלי',
    given: 'U, W ≤ V',
    deduce: 'U+W = U⊕W ⟺ U ∩ W = {0_V}',
    why: 'הגדרה. שווה ערך לכך שלכל v ∈ U+W יש פירוק יחיד v = u + w (u ∈ U, w ∈ W).',
    starred: true,
  },
  {
    id: 'sp6',
    category: 'subspace',
    title: 'הקריטריון המקוצר לתת-מרחב',
    given: 'W ⊆ V ∧ W ≠ ∅ ∧ ∀α∈F, ∀w₁,w₂∈W: αw₁+w₂ ∈ W',
    deduce: 'W ≤ V (תת-מרחב)',
    why: 'מהתנאי α=0, w₂=w → w ∈ W (טריוויאלי). α=1, w₁=w, w₂=-w → 0 ∈ W. סגירות לחיבור: α=1. סגירות לכפל: w₂=0_V.',
  },
  {
    id: 'sp7',
    category: 'subspace',
    title: 'מימד החיתוך — שני (n−1)-מימדיים שונים',
    given: 'dim V = n ∧ dim U = dim W = n−1 ∧ U ≠ W',
    deduce: 'dim(U ∩ W) = n − 2',
    why: 'U+W ⊆ V, אבל U+W ⊋ U (אחרת U=W). לכן n ≥ dim(U+W) ≥ n. שוויון! עכשיו 2(n−1) = dim(U+W) + dim(U∩W) = n + dim(U∩W). מסקנה: dim(U∩W) = n − 2.',
    source: 'מועד א 2025 Q4.2',
    starred: true,
  },
];

// ────────────────────────────────────────────────────────────────
// RANK — דרגה
// ────────────────────────────────────────────────────────────────

const rankDeductions: Deduction[] = [
  {
    id: 'r1',
    category: 'rank',
    title: 'משפט הדרגה',
    given: 'A ∈ M_{m×n}(F)',
    deduce: 'rank A + dim NulA = n',
    why: 'דירוג ל-REF: k מובילים → k משתנים קשורים → n−k משתנים חופשיים. בסיס ל-NulA דרך הצבת 1 בכל חופשי בנפרד.',
    starred: true,
  },
  {
    id: 'r2',
    category: 'rank',
    title: 'rank עמודות = rank שורות = rank',
    given: 'A ∈ M_{m×n}(F)',
    deduce: 'dim ColA = dim RowA = rank A',
    why: 'REF: שורות לא-אפס בת"ל = rank. עמודות מובילות בת"ל ופורשות את ColA. שתי הזהויות אותו מספר.',
    starred: true,
  },
  {
    id: 'r3',
    category: 'rank',
    title: 'rank לעולם לא עולה במכפלה',
    given: 'A, B מטריצות מתאימות לכפל',
    deduce: 'rank(AB) ≤ min(rank A, rank B)',
    why: 'ColumnsOfAB ⊆ ColA → dim ≤ rank A. RowsOfAB ⊆ RowB → dim ≤ rank B.',
    starred: true,
  },
  {
    id: 'r4',
    category: 'rank',
    title: 'rank עמודות = n ⟹ עמודות בסיס',
    given: 'A ∈ M_{m×n}(F) ∧ rank A = n',
    deduce: 'עמודות A בת"ל ב-F^m',
    why: 'rank A = dim ColA = n. יש n עמודות בת"ל ב-ColA → הן בסיס ל-ColA. בפרט בת"ל ב-F^m.',
  },
  {
    id: 'r5',
    category: 'rank',
    title: 'rank ≤ min(m,n)',
    given: 'A ∈ M_{m×n}(F)',
    deduce: '0 ≤ rank A ≤ min(m, n)',
    why: 'rank = מספר מובילים בקנונית. לא יכול לעלות על מספר שורות (m) או מספר עמודות (n).',
  },
  {
    id: 'r6',
    category: 'rank',
    title: 'rank עם הפיכה שמורה',
    given: 'A ∈ M_n(F) הפיכה ∧ B ∈ M_n(F)',
    deduce: 'rank(AB) = rank(BA) = rank B',
    why: 'A הפיכה ⟹ מכפלת אלמנטריות. כפל באלמנטרית = פעולת שורה/עמודה. פעולות אלמנטריות לא משנות rank.',
    source: 'מועד א 2025 Q5.2',
    starred: true,
  },
];

// ────────────────────────────────────────────────────────────────
// INVERTIBILITY — הפיכות
// ────────────────────────────────────────────────────────────────

const invertDeductions: Deduction[] = [
  {
    id: 'i1',
    category: 'invertibility',
    title: 'טבלת השקילויות (חלקית)',
    given: 'A ∈ M_n(F)',
    deduce: 'A הפיכה ⟺ rank=n ⟺ det≠0 ⟺ עמודות בסיס ⟺ NulA={0} ⟺ Ax=b פתיר יחיד לכל b',
    why: 'כל אחד מהתנאים שווה ערך לאחרים. כל הוכחה של זוג מקבילה. מתחילים מ-rank=n → ColA=F^n → Ax=b פתיר → ...',
    starred: true,
  },
  {
    id: 'i2',
    category: 'invertibility',
    title: 'AB=I (ריבועיות) ⟹ BA=I',
    given: 'A, B ∈ M_n(F) ∧ AB = Iₙ',
    deduce: 'BA = Iₙ ∧ A⁻¹ = B',
    why: 'AB=I → A על → A הפיכה (מטריצה ריבועית). יחידות ההופכי → BA = I אוטומטית.',
    source: 'HW9 Q6',
    starred: true,
  },
  {
    id: 'i3',
    category: 'invertibility',
    title: 'מכפלת הפיכות → הפיכה',
    given: 'A, B ∈ M_n(F) הפיכות',
    deduce: 'AB הפיכה ∧ (AB)⁻¹ = B⁻¹A⁻¹',
    why: '(AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = A·I·A⁻¹ = I. שימי לב להיפוך הסדר!',
    starred: true,
  },
  {
    id: 'i4',
    category: 'invertibility',
    title: 'הפיכה ⟺ צורה קנונית = I',
    given: 'A ∈ M_n(F)',
    deduce: 'A הפיכה ⟺ הצורה הקנונית של A היא Iₙ',
    why: 'הפיכה ⟺ rank = n ⟺ n מובילים בקנונית ⟺ הקנונית = Iₙ.',
  },
  {
    id: 'i5',
    category: 'invertibility',
    title: 'שורת אפסים → לא הפיכה',
    given: 'A ∈ M_n(F) עם שורת אפסים',
    deduce: 'A אינה הפיכה',
    why: 'AB יורש את שורת האפסים → AB ≠ I. גם: שורת אפסים → rank < n → לא הפיכה.',
  },
  {
    id: 'i6',
    category: 'invertibility',
    title: 'A^t הפיכה ⟺ A הפיכה',
    given: 'A ∈ M_n(F)',
    deduce: 'A הפיכה ⟺ A^t הפיכה ∧ (A^t)⁻¹ = (A⁻¹)^t',
    why: 'אם AB = BA = I, אז (AB)^t = B^t A^t = I^t = I. כלומר B^t הוא ההופכי של A^t.',
  },
  {
    id: 'i7',
    category: 'invertibility',
    title: 'BA = 0 לכל B ⟹ A הפיכה',
    given: '∀B ∈ M_n(F): BA = 0ₙ ⟹ B = 0ₙ',
    deduce: 'A הפיכה',
    why: 'בשלילה: אם A לא הפיכה, שורות A ת"ל. ∃x̄≠0̄: x̄^t·A = 0̄. ניקח B עם x̄^t בכל שורה → BA = 0 אבל B ≠ 0.',
    source: 'HW10 Q5b',
    starred: true,
  },
];

// ────────────────────────────────────────────────────────────────
// DETERMINANT — דטרמיננטה
// ────────────────────────────────────────────────────────────────

const detDeductions: Deduction[] = [
  {
    id: 'dt1',
    category: 'determinant',
    title: 'det = 0 ⟺ לא הפיכה',
    given: 'A ∈ M_n(F)',
    deduce: 'det A = 0 ⟺ A אינה הפיכה',
    why: 'הפיכות ⟺ rank=n ⟺ הקנונית = I ⟺ det = 1 (אחרי תיקון פעולות). אם rank<n, יש שורת אפסים בקנונית → det=0.',
    starred: true,
  },
  {
    id: 'dt2',
    category: 'determinant',
    title: 'מולטיפליקטיביות',
    given: 'A, B ∈ M_n(F)',
    deduce: 'det(AB) = det(A)·det(B)',
    why: 'אם B לא הפיכה: rank(AB) ≤ rank(B) < n → det(AB) = 0 = det(A)·0. אם B הפיכה: B = מכפלת אלמנטריות, ולמה: det(EA) = det(E)·det(A).',
    starred: true,
  },
  {
    id: 'dt3',
    category: 'determinant',
    title: 'שתי שורות זהות → 0',
    given: 'A ∈ M_n(F) עם 2 שורות זהות',
    deduce: 'det A = 0',
    why: 'תכונת ה-alternating בהגדרת det. אינטואיציה: ניחלף את השורות → סימן הפוך, אבל המטריצה לא השתנתה → det = -det → det = 0.',
  },
  {
    id: 'dt4',
    category: 'determinant',
    title: 'שורת אפסים → det = 0',
    given: 'A ∈ M_n(F) עם שורת אפסים',
    deduce: 'det A = 0',
    why: 'מולטי-לינארית: שורת 0 = 0·שורה → det = 0·det = 0.',
  },
  {
    id: 'dt5',
    category: 'determinant',
    title: 'det(A^t) = det(A)',
    given: 'A ∈ M_n(F)',
    deduce: 'det(A^t) = det(A)',
    why: 'מקרים: אם A לא הפיכה — גם A^t (תכונה) → שניהם 0. אם A הפיכה — A = מכפלת אלמנטריות, ולכל אלמנטרית: det(E^t) = det(E).',
    starred: true,
  },
  {
    id: 'dt6',
    category: 'determinant',
    title: 'det של הופכי',
    given: 'A ∈ M_n(F) הפיכה',
    deduce: 'det(A⁻¹) = 1/det(A)',
    why: 'AA⁻¹ = I. det(I) = 1. ממולטיפליקטיביות: det(A)·det(A⁻¹) = 1.',
  },
  {
    id: 'dt7',
    category: 'determinant',
    title: 'משולשית → מכפלת אלכסון',
    given: 'A ∈ M_n(F) משולשית (עליונה/תחתונה)',
    deduce: 'det A = ∏[A]ᵢᵢ',
    why: 'פיתוח רקורסיבי לפי שורה/עמודה אחרונה: רק אלמנט אלכסון לא מתאפס. או: דירוג שומר על משולשית עד I, וכל פעולת שורה מעבירה את det דרך.',
    starred: true,
  },
  {
    id: 'dt8',
    category: 'determinant',
    title: 'פעולות שורה ו-det',
    given: 'B מתקבל מ-A ע"י פעולת שורה',
    deduce: 'Rᵢ→cRᵢ: det B = c·det A · Rᵢ↔Rⱼ: det B = −det A · Rᵢ→Rᵢ+αRⱼ: det B = det A',
    why: 'כפל שורה ב-c: מולטי-לינארית. החלפה: alternating. הוספת כפולה: לא משנה (פיתוח מולטי-לינארי שמתאפס כי שורות תלויות).',
    starred: true,
  },
  {
    id: 'dt9',
    category: 'determinant',
    title: 'בלוקים משולשית',
    given: 'M = [[A, C], [0, B]] (בלוקים), A∈M_n, B∈M_m',
    deduce: 'det M = det(A)·det(B)',
    why: 'פיתוח רקורסיבי לאורך עמודות התחתון-שמאלי: 0 בכל מקום → רק התרומה האלכסונית של A על B.',
  },
];

// ────────────────────────────────────────────────────────────────
// EXPORT
// ────────────────────────────────────────────────────────────────

export const allDeductions: Deduction[] = [
  ...spanDeductions,
  ...liDeductions,
  ...dimDeductions,
  ...subspaceDeductions,
  ...rankDeductions,
  ...invertDeductions,
  ...detDeductions,
];

export const categoryLabels: Record<DeductionCategory, string> = {
  span: 'span (פרישה)',
  LI: 'תלות לינארית',
  dim: 'מימד',
  subspace: 'תת-מרחב + סכומים',
  rank: 'דרגה',
  invertibility: 'הפיכות',
  determinant: 'דטרמיננטה',
};

export const categoryColors: Record<DeductionCategory, { bg: string; text: string; border: string; dot: string }> = {
  span:          { bg: 'bg-indigo-50',  text: 'text-indigo-800',  border: 'border-indigo-200',  dot: 'bg-indigo-500' },
  LI:            { bg: 'bg-violet-50',  text: 'text-violet-800',  border: 'border-violet-200',  dot: 'bg-violet-500' },
  dim:           { bg: 'bg-purple-50',  text: 'text-purple-800',  border: 'border-purple-200',  dot: 'bg-purple-500' },
  subspace:      { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  rank:          { bg: 'bg-blue-50',    text: 'text-blue-800',    border: 'border-blue-200',    dot: 'bg-blue-500' },
  invertibility: { bg: 'bg-orange-50',  text: 'text-orange-800',  border: 'border-orange-200',  dot: 'bg-orange-500' },
  determinant:   { bg: 'bg-rose-50',    text: 'text-rose-800',    border: 'border-rose-200',    dot: 'bg-rose-500' },
};

export function getDeductionsByCategory(c: DeductionCategory): Deduction[] {
  return allDeductions.filter((d) => d.category === c);
}

export function getStarredDeductions(): Deduction[] {
  return allDeductions.filter((d) => d.starred);
}
