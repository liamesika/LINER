// Data adapter: transforms LINER weeks data into BDIDA-compatible format
// All content translated to Hebrew for display

import { weeksData } from './liner-weeks';

export interface Definition {
  id: string;
  title: string;
  content: string;
  notation?: string;
  examples?: string[];
  source: string;
}

export interface Theorem {
  id: string;
  title: string;
  statement: string;
  proof?: string;
  source: string;
}

export interface Technique {
  id: string;
  title: string;
  description: string;
  steps?: string[];
  whenToUse: string;
  source: string;
}

export interface WeekContent {
  weekNumber: number;
  title: string;
  titleHe: string;
  lectures: number[];
  topics: string[];
  summary: string;
  definitions: Definition[];
  theorems: Theorem[];
  techniques: Technique[];
  keyFormulas?: string[];
  commonMistakes?: string[];
  examTips?: string[];
}

function extractLectureNumbers(files: string[]): number[] {
  const nums: number[] = [];
  for (const f of files) {
    const match = f.match(/lecture\s*(\d+)/i);
    if (match) nums.push(parseInt(match[1], 10));
  }
  return nums.length > 0 ? nums : [1];
}

function topicToHebrew(topic: string): string {
  const map: Record<string, string> = {
    'fields': 'שדות',
    'complex-numbers': 'מספרים מרוכבים',
    'linear-equations': 'משוואות ליניאריות',
    'vector-spaces': 'מרחבים וקטוריים',
    'subspaces': 'תת-מרחבים',
    'linear-combinations': 'צירופים לינאריים',
    'span': 'מרחב נפרש',
    'linear-independence': 'אי-תלות לינארית',
    'basis': 'בסיס',
    'dimension': 'מימד',
    'matrices': 'מטריצות',
    'invertible-matrices': 'מטריצות הפיכות',
    'systems-of-equations': 'מערכות משוואות',
    'row-reduction': 'דירוג שורות',
    'determinants': 'דטרמיננטות',
    'rank': 'דרגה',
    'row-column-space': 'מרחב שורות ועמודות',
    'other': 'אחר',
  };
  return map[topic] || topic.replace(/-/g, ' ');
}

// =============================================
// Hebrew content overrides for all items
// Keyed to actual item IDs from liner-weeks.ts
// =============================================
const hebrewOverrides: Record<string, { titleHe?: string; content: string }> = {
  // === שבוע 1: שדות (Fields) ===
  'w1-def-field-axioms': {
    content: `שדה הוא קבוצה F עם שתי פעולות + (חיבור) ו-· (כפל) המקיימות 12 אקסיומות:
(A1) סגירות לחיבור (A2) קומוטטיביות של חיבור (A3) אסוציאטיביות של חיבור
(A4) קיום איבר יחידה חיבורי 0_F: a + 0_F = a
(A5) קיום נגדי חיבורי: a + (-a) = 0_F
(M1) סגירות לכפל (M2) קומוטטיביות של כפל (M3) אסוציאטיביות של כפל
(M4) קיום איבר יחידה כפלי 1_F: a · 1_F = a
(M5) קיום הופכי כפלי לכל a ≠ 0_F: a · a⁻¹ = 1_F
(D) חוק הפילוג: a · (b + c) = a · b + a · c
(S) 0_F ≠ 1_F`,
  },
  'w1-def-finite-field': {
    content: `שדה סופי הוא שדה עם מספר סופי של איברים.
דוגמאות: F₂ = {0,1} עם חיבור XOR וכפל AND.
F₃ = {0,1,2} עם חיבור וכפל מודולו 3.`,
  },
  'w1-def-custom-operation': {
    content: `הגדרת פעולה בינארית על R\\{1}: x ⊙ y := x + y − x·y.
נוכח: R\\{1} סגורה תחת ⊙; ⊙ קומוטטיבית; ⊙ אסוציאטיבית.`,
  },
  'w1-thm-no-zero-divisors': {
    content: `בכל שדה F (לא בהכרח סופי): אם a · b = 0_F אז a = 0_F או b = 0_F.
כלומר, אין מחלקי אפס בשדה.`,
  },
  'w1-thm-neg-sum': {
    content: `לכל a, b בשדה F: -(a + b) = -a + (-b).
הוכחה: באמצעות אסוציאטיביות, קומוטטיביות של חיבור ואקסיומת ההופכי.`,
  },
  'w1-thm-inv-product': {
    content: `לכל a, b בשדה F כאשר a,b ≠ 0_F: (a·b)⁻¹ = b⁻¹ · a⁻¹.
הוכחה: (a·b) · (b⁻¹·a⁻¹) = 1_F באמצעות אסוציאטיביות של כפל ואקסיומת ההופכי.`,
  },

  // === שבוע 2: מספרים מרוכבים (Complex Numbers) ===
  'w2-def-complex-numbers': {
    content: `המספרים המרוכבים C מוגדרים כקבוצה R² = {(a,b) : a,b ∈ R} עם הפעולות:
חיבור: (a,b) + (c,d) = (a+c, b+d)
כפל: (a,b) · (c,d) = (ac−bd, ad+bc)
מסומן: a + bi כאשר i = (0,1) ו-i² = −1.`,
  },
  'w2-def-conjugate': {
    content: `הצמוד של מספר מרוכב z = a + bi הוא z̄ = a − bi.
תכונות: z · z̄ = |z|², (z̄)̄ = z, z + z̄ = 2Re(z), z − z̄ = 2iIm(z).`,
  },
  'w2-def-modulus': {
    content: `הערך המוחלט (מודולוס) של z = a + bi הוא:
|z| = √(a² + b²) = √(z · z̄)`,
  },
  'w2-def-modular-equivalence': {
    content: `יהי n ∈ N. שני מספרים שלמים a, b שקולים מודולו n (מסומן a ≡ b (mod n)) אם n מחלק את a − b.`,
  },
  'w2-def-Zn': {
    content: `Zₙ = {[0], [1], ..., [n−1]} היא קבוצת מחלקות השקילות מודולו n, עם חיבור וכפל מודולרי.`,
  },
  'w2-thm-C-is-field': {
    content: `(C, +, ·) הוא שדה. איבר האפס הוא 0 = (0,0) ואיבר היחידה הוא 1 = (1,0).
ההופכי של z ≠ 0: z⁻¹ = z̄/|z|².`,
  },
  'w2-thm-Zp-field': {
    content: `Zₚ הוא שדה אם ורק אם p ראשוני.
Zₙ אינו שדה כאשר n מורכב (כי אז יש מחלקי אפס).`,
  },

  // === שבוע 3: משוואות ליניאריות (Linear Equations) ===
  'w3-def-linear-system': {
    content: `מערכת משוואות ליניאריות היא מערכת מהצורה:
a₁₁x₁ + a₁₂x₂ + ... + a₁ₙxₙ = b₁
a₂₁x₁ + a₂₂x₂ + ... + a₂ₙxₙ = b₂
...
aₘ₁x₁ + aₘ₂x₂ + ... + aₘₙxₙ = bₘ
כאשר aᵢⱼ, bᵢ ∈ F. בצורת מטריצות: Ax = b.`,
  },
  'w3-def-augmented-matrix': {
    content: `המטריצה המורחבת של המערכת Ax = b היא המטריצה [A|b] המתקבלת מצירוף עמודת b למטריצה A.`,
  },
  'w3-def-row-operations': {
    content: `שלוש פעולות השורה האלמנטריות הן:
1. החלפת שתי שורות: Rᵢ ↔ Rⱼ
2. כפל שורה בסקלר שונה מאפס: Rᵢ → cRᵢ (c ≠ 0)
3. הוספת כפולה של שורה אחת לאחרת: Rᵢ → Rᵢ + cRⱼ
כל פעולה הפיכה ושומרת על קבוצת הפתרונות.`,
  },
  'w3-def-echelon-form': {
    content: `מטריצה בצורת מדרגות (REF):
1. כל שורות האפס בתחתית
2. האיבר המוביל (ציר) של כל שורה מימין לציר שמעליו
3. כל האיברים מתחת לציר הם 0

צורת מדרגות מצומצמת (RREF) — בנוסף:
4. כל ציר שווה 1
5. כל ציר הוא היחיד שאינו 0 בעמודתו`,
  },
  'w3-def-free-bound-vars': {
    content: `בצורת מדרגות:
משתנה קשור — נמצא בעמודת ציר (נקבע ע"י המשוואה)
משתנה חופשי — לא בעמודת ציר (מקבל ערך שרירותי כפרמטר)`,
  },
  'w3-thm-unique-rref': {
    content: `לכל מטריצה יש צורת מדרגות מצומצמת (RREF) יחידה.`,
  },
  'w3-thm-solution-count': {
    content: `למערכת Ax = b יש:
- פתרון יחיד: אם אין משתנים חופשיים (ואין שורת סתירה)
- אינסוף פתרונות: אם יש משתנים חופשיים
- אין פתרון: אם יש שורה מהצורה [0 0 ... 0 | c] כאשר c ≠ 0`,
  },

  // === שבוע 4: מרחבים וקטוריים (Vector Spaces) ===
  'w4-def-Fn': {
    content: `Fⁿ = {(a₁, ..., aₙ) : aᵢ ∈ F} הוא מרחב וקטורי מעל F עם חיבור ברכיבים וכפל בסקלר ברכיבים.`,
  },
  'w4-def-vector-space': {
    content: `מרחב וקטורי מעל שדה F הוא קבוצה V עם שתי פעולות:
חיבור: V × V → V, כפל בסקלר: F × V → V
המקיימות (∀ u, v, w ∈ V, ∀ α, β ∈ F):
(V1) u + (v + w) = (u + v) + w
(V2) u + v = v + u
(V3) קיים 0 ∈ V: v + 0 = v
(V4) לכל v קיים (−v): v + (−v) = 0
(V5) α(βv) = (αβ)v
(V6) 1·v = v
(V7) α(u + v) = αu + αv
(V8) (α + β)v = αv + βv`,
  },
  'w4-def-subspace': {
    content: `תת-מרחב: W ⊆ V הוא תת-מרחב אם W עצמו מרחב וקטורי עם אותן פעולות.

מבחן תת-מרחב: W ⊆ V הוא תת-מרחב אם"ם:
1. 0 ∈ W (או W ≠ ∅)
2. סגירות לחיבור: u, v ∈ W ⟹ u + v ∈ W
3. סגירות לכפל בסקלר: α ∈ F, v ∈ W ⟹ αv ∈ W

שקול: αu + βv ∈ W לכל α, β ∈ F ו-u, v ∈ W.`,
  },
  'w4-thm-vs-properties': {
    content: `תכונות מרחב וקטורי:
- וקטור האפס 0 יחיד
- הנגדי של כל וקטור יחיד
- 0·v = 0 (סקלר אפס כפול וקטור = וקטור אפס)
- α·0 = 0 (סקלר כפול וקטור אפס = וקטור אפס)
- (−1)·v = −v`,
  },
  'w4-thm-subspace-criterion-2': {
    content: `מבחן תת-מרחב בשלב אחד: W ≠ ∅ הוא תת-מרחב אם"ם
לכל u, v ∈ W ולכל α, β ∈ F: αu + βv ∈ W.`,
  },
  'w4-thm-union-subspaces': {
    content: `איחוד של שני תתי-מרחבים W₁ ∪ W₂ הוא תת-מרחב אם"ם W₁ ⊆ W₂ או W₂ ⊆ W₁.`,
  },
  'w4-thm-homogeneous-subspace': {
    content: `קבוצת הפתרונות של מערכת הומוגנית Ax = 0 היא תת-מרחב של Fⁿ.`,
  },

  // === שבוע 5: צירופים לינאריים ופרישה (Linear Combinations & Span) ===
  'w5-def-linear-combination': {
    content: `יהי V מרחב וקטורי מעל F ויהיו v₁, ..., vₖ ∈ V.
צירוף לינארי של v₁, ..., vₖ הוא כל וקטור מהצורה:
α₁v₁ + α₂v₂ + ... + αₖvₖ
כאשר α₁, ..., αₖ ∈ F סקלרים.`,
  },
  'w5-def-span': {
    content: `הפרישה של S = {v₁, ..., vₖ} ⊆ V היא:
Sp(S) = Sp(v₁, ..., vₖ) = {α₁v₁ + ... + αₖvₖ : αᵢ ∈ F}

הפרישה = קבוצת כל הצירופים הלינאריים של הוקטורים ב-S.
מוסכמה: Sp(∅) = {0}.`,
  },
  'w5-def-spanning-set': {
    content: `S פורשת את V (S קבוצה פורשת של V) אם Sp(S) = V, כלומר כל וקטור ב-V הוא צירוף לינארי של וקטורים ב-S.`,
  },
  'w5-thm-span-is-subspace': {
    content: `לכל S ⊆ V, הקבוצה Sp(S) היא תת-מרחב של V.
יתרה מכך, Sp(S) הוא תת-המרחב הקטן ביותר המכיל את S.`,
  },
  'w5-thm-span-add-remove': {
    content: `אם v ∈ Sp(v₁, ..., vₖ), אז Sp(v₁, ..., vₖ, v) = Sp(v₁, ..., vₖ).
כלומר, הוספת וקטור שכבר נמצא בפרישה אינה משנה אותה.`,
  },

  // === שבוע 6: תלות לינארית (Linear Dependence) ===
  'def-t6-linear-dependence': {
    content: `יהי V מרחב וקטורי מעל F ויהיו v₁, ..., vₖ ∈ V.
- בלתי-תלויים לינארית (בת"ל): α₁v₁ + ... + αₖvₖ = 0 ⟹ α₁ = ... = αₖ = 0
  (הצירוף הלינארי היחיד השווה ל-0 הוא הטריוויאלי)
- תלויים לינארית (ת"ל): קיימים סקלרים לא כולם אפס כך ש-α₁v₁ + ... + αₖvₖ = 0.`,
  },
  'def-t6-checking-dependence': {
    content: `לבדיקת תלות/אי-תלות לינארית:
כותבים a₁v₁ + ... + aₖvₖ = 0, ממירים למערכת הומוגנית, ומדרגים.
אם הפתרון היחיד הוא הטריוויאלי — הוקטורים בת"ל.
אם יש משתנה חופשי — הוקטורים ת"ל.`,
  },
  'thm-t6-properties-of-dependence': {
    content: `תכונות תלות לינארית:
1. 0_V הוא ת"ל.
2. וקטור בודד v₁ הוא ת"ל אם"ם v₁ = 0_V.
3. אם אחד מהוקטורים הוא 0, הם ת"ל.
4. v, u ת"ל אם"ם קיים סקלר a כך ש-u = av או v = au.
5. אם A = {v₁,...,vₘ} בת"ל ו-B ⊆ A, גם B בת"ל.
6. v₁,...,vₖ בת"ל אם"ם לכל v ∈ Sp{v₁,...,vₖ} קיימים סקלרים יחידים.`,
  },
  'thm-t6-dependence-predecessors': {
    content: `v₁,...,vₖ ת"ל אם"ם קיים 1 ≤ j ≤ k כך ש-vⱼ ∈ Sp{v₁,...,vⱼ₋₁}.
שקול: v₁,...,vₖ ת"ל אם"ם ניתן לכתוב אחד מהם כצירוף לינארי של האחרים.`,
  },

  // === שבוע 7: בסיס (Basis) ===
  'def-t7-basis': {
    content: `בסיס למרחב וקטורי V הוא קבוצה B = {v₁, ..., vₙ} ⊆ V כך ש:
1. B בלתי-תלויה לינארית
2. B פורשת את V (Sp(B) = V)

שקול: B בסיס אם"ם כל v ∈ V ניתן לכתיבה באופן יחיד כ-v = α₁v₁ + ... + αₙvₙ.`,
  },
  'def-t7-standard-basis': {
    content: `הבסיס הסטנדרטי של Fⁿ הוא {e₁, e₂, ..., eₙ} כאשר eᵢ הוא הוקטור שהרכיב ה-i שלו 1 ושאר הרכיבים 0.
דוגמה: ב-R³, e₁ = (1,0,0), e₂ = (0,1,0), e₃ = (0,0,1).`,
  },
  'def-t7-dimension': {
    content: `המימד של מרחב וקטורי V (נוצר סופית), מסומן dim(V), הוא מספר האיברים בכל בסיס של V.
מוסכמה: dim({0}) = 0.`,
  },
  'thm-t7-steinitz-exchange': {
    titleHe: 'למת ההחלפה של שטייניץ',
    content: `אם {u₁, ..., uₘ} בת"ל ו-{w₁, ..., wₙ} פורשת את V, אז m ≤ n.
מסקנה: לכל שני בסיסים של מרחב וקטורי נוצר סופית יש אותו מספר איברים.`,
  },
  'thm-t7-all-bases-same-size': {
    content: `כל שני בסיסים של מרחב וקטורי נוצר סופית V מכילים אותו מספר איברים.
(נובע מלמת שטייניץ.)`,
  },
  'thm-t7-dim-n-equivalences': {
    content: `יהי V מרחב וקטורי עם dim(V) = n. אז:
- כל קבוצה בת"ל מכילה לכל היותר n וקטורים
- כל קבוצה פורשת מכילה לפחות n וקטורים
- קבוצה של n וקטורים בת"ל היא בסיס
- קבוצה של n וקטורים הפורשת את V היא בסיס`,
  },

  // === שבוע 8: השלמה לבסיס וסכום ישר (Extension to Basis & Direct Sum) ===
  'def-t8-sum-of-subspaces': {
    content: `סכום תתי-מרחבים: יהיו W₁, W₂ תתי-מרחבים של V. הסכום:
W₁ + W₂ = {w₁ + w₂ : w₁ ∈ W₁, w₂ ∈ W₂}
הוא תת-המרחב הקטן ביותר של V המכיל את W₁ ואת W₂.`,
  },
  'def-t8-direct-sum': {
    content: `סכום ישר: V = W₁ ⊕ W₂ אם V = W₁ + W₂ ו-W₁ ∩ W₂ = {0}.
שקול: כל v ∈ V ניתן לכתיבה באופן יחיד כ-v = w₁ + w₂ עם w₁ ∈ W₁, w₂ ∈ W₂.`,
  },
  'thm-t8-extension-to-basis': {
    content: `יהי V מרחב וקטורי נוצר סופית.
1. כל קבוצה בת"ל ניתנת להשלמה (הרחבה) לבסיס של V.
2. מכל קבוצה פורשת ניתן לחלץ בסיס.
3. אם W תת-מרחב של V אז dim(W) ≤ dim(V), עם שוויון אם"ם W = V.`,
  },
  'thm-t8-dimension-theorem': {
    content: `נוסחת המימדים: לתתי-מרחבים W₁, W₂ של V:
dim(W₁ + W₂) = dim(W₁) + dim(W₂) − dim(W₁ ∩ W₂)`,
  },
  'thm-t8-direct-sum-criterion': {
    content: `V = W₁ ⊕ W₂ אם"ם V = W₁ + W₂ ו-W₁ ∩ W₂ = {0}.
שקול: dim(V) = dim(W₁) + dim(W₂) כאשר V = W₁ + W₂.`,
  },

  // === שבוע 9: מטריצות (Matrices) ===
  'def-t9-matrix-multiplication': {
    content: `כפל מטריצות: עבור A ∈ Mₘₓₙ(F) ו-B ∈ Mₙₓₚ(F), המכפלה AB ∈ Mₘₓₚ(F) מוגדרת:
[AB]ᵢⱼ = Σₖ₌₁ⁿ [A]ᵢₖ · [B]ₖⱼ
שורה i של A כפול עמודה j של B.`,
  },
  'def-t9-identity-matrix': {
    content: `מטריצת היחידה Iₙ ∈ Mₙ(F): [Iₙ]ᵢⱼ = 1 אם i=j, 0 אחרת.
תכונה: A·Iₙ = Iₘ·A = A לכל A ∈ Mₘₓₙ(F).`,
  },
  'def-t9-invertible-matrix': {
    content: `מטריצה A ∈ Mₙ(F) הפיכה אם קיימת B ∈ Mₙ(F) כך ש-AB = BA = Iₙ.
B נקראת ההופכית של A ומסומנת A⁻¹. ההופכית יחידה (אם קיימת).`,
  },
  'def-t9-diagonal-matrix': {
    content: `מטריצה אלכסונית: A ∈ Mₙ(F) נקראת אלכסונית אם [A]ᵢⱼ = 0 לכל i ≠ j.
מסומנת diag(d₁, d₂, ..., dₙ).`,
  },
  'thm-t9-matrix-properties': {
    content: `תכונות כפל מטריצות:
- אסוציאטיביות: (AB)C = A(BC)
- פילוג: A(B+C) = AB + AC, (A+B)C = AC + BC
- כפל בסקלר: α(AB) = (αA)B = A(αB)
- כפל אינו קומוטטיבי: AB ≠ BA בכלל`,
  },
  'thm-t9-zero-divisors': {
    content: `ב-Mₙ(F) קיימים מחלקי אפס: ייתכן AB = 0 גם כאשר A ≠ 0 ו-B ≠ 0.
שונה משדות, שם אין מחלקי אפס.`,
  },

  // === שבוע 10: מטריצות הפיכות (Invertible Matrices) ===
  'def-elementary-matrix': {
    content: `מטריצה אלמנטרית E היא מטריצה המתקבלת מ-Iₙ ע"י פעולת שורה אלמנטרית אחת.
שלושה סוגים: Rᵢ → cRᵢ, Rᵢ ↔ Rⱼ, או Rᵢ → Rᵢ + cRⱼ.
כפל ב-E משמאל מבצע את אותה פעולת שורה.`,
  },
  'def-transpose': {
    content: `שחלוף: עבור A ∈ Mₘₓₙ(F), השחלוף Aᵗ ∈ Mₙₓₘ(F) מוגדר: [Aᵗ]ᵢⱼ = [A]ⱼᵢ.
עמודות A הופכות לשורות של Aᵗ ולהפך.`,
  },
  'def-symmetric-matrix': {
    content: `A ∈ Mₙ(F) סימטרית אם Aᵗ = A. אנטי-סימטרית אם Aᵗ = −A.`,
  },
  'def-trace': {
    content: `העקבה של A ∈ Mₙ(F): tr(A) = Σᵢ₌₁ⁿ [A]ᵢᵢ (סכום האלכסון הראשי).`,
  },
  'thm-elementary-invertible': {
    content: `כל מטריצה אלמנטרית הפיכה, והופכיתה גם מטריצה אלמנטרית (מאותו סוג).`,
  },
  'thm-invertible-product-elementary': {
    content: `מטריצה A הפיכה אם"ם A היא מכפלת מטריצות אלמנטריות: A = E₁·E₂·...·Eₖ.`,
  },
  'thm-invertible-matrix-theorem': {
    titleHe: 'משפט המטריצה ההפיכה',
    content: `עבור A ∈ Mₙ(F) התנאים הבאים שקולים:
1. A הפיכה
2. Ax = 0 ⟹ x = 0
3. RREF(A) = Iₙ
4. A מכפלת מטריצות אלמנטריות
5. Ax = b פתירה לכל b
6. rank(A) = n`,
  },
  'thm-transpose-properties': {
    content: `תכונות שחלוף: (Aᵗ)ᵗ = A, (A+B)ᵗ = Aᵗ+Bᵗ, (αA)ᵗ = αAᵗ, (AB)ᵗ = BᵗAᵗ.
אם A הפיכה: (Aᵗ)⁻¹ = (A⁻¹)ᵗ.`,
  },
  'thm-trace-linear': {
    content: `העקבה לינארית: tr(A+B) = tr(A) + tr(B), tr(αA) = α·tr(A).`,
  },
  'thm-trace-commutative': {
    content: `tr(AB) = tr(BA) לכל מטריצות A, B (בגדלים מתאימים).`,
  },

  // === שבוע 11: Ax=b ודטרמיננטה (Systems & Determinant intro) ===
  'def-null-space': {
    content: `מרחב האפס (גרעין) של A: Null(A) = {x ∈ Fⁿ : Ax = 0}.
Null(A) הוא תת-מרחב של Fⁿ.`,
  },
  'def-multilinear': {
    content: `פונקציה D: Mₙ(F) → F היא מולטי-לינארית (בשורות) אם היא לינארית בכל שורה בנפרד, כשהשאר קבועות.`,
  },
  'def-alternating': {
    content: `פונקציה D: Mₙ(F) → F אלטרנטיבית אם D(A) = 0 בכל פעם שלמטריצה A יש שתי שורות זהות.
שקול: החלפת שתי שורות משנה את הסימן של D.`,
  },
  'thm-null-space-subspace': {
    content: `Null(A) הוא תת-מרחב של Fⁿ.`,
  },
  'thm-null-space-dim': {
    content: `dim(Null(A)) = n − rank(A) (מספר המשתנים החופשיים).`,
  },
  'thm-solution-set-structure': {
    content: `מבנה קבוצת הפתרונות של Ax = b:
אם x₀ פתרון פרטי, אז: {x : Ax = b} = x₀ + Null(A) = {x₀ + h : Ah = 0}.
קבוצת הפתרונות ריקה, או תת-מרחב אפיני.`,
  },
  'thm-det-unique': {
    content: `קיימת פונקציה יחידה det: Mₙ(F) → F שהיא מולטי-לינארית, אלטרנטיבית ו-det(I) = 1.`,
  },
  'thm-det-row-operations': {
    content: `השפעת פעולות שורה על det(A):
1. החלפת שתי שורות: det משנה סימן
2. כפל שורה ב-c: det מוכפל ב-c
3. הוספת כפולה של שורה: det לא משתנה`,
  },

  // === שבוע 12: דטרמיננטה (Determinant) ===
  'def-minor': {
    content: `מינור: Mᵢⱼ הוא הדטרמיננטה של תת-המטריצה המתקבלת ממחיקת שורה i ועמודה j.`,
  },
  'def-det-recursive': {
    content: `הגדרה רקורסיבית של הדטרמיננטה:
det(A) = Σⱼ₌₁ⁿ (−1)ⁱ⁺ʲ aᵢⱼ Mᵢⱼ (פיתוח לפי שורה i)
מקרה בסיס: det([a]) = a.`,
  },
  'thm-cofactor-expansion': {
    content: `ניתן לפתח את הדטרמיננטה לפי כל שורה או כל עמודה:
לפי שורה i: det(A) = Σⱼ (−1)ⁱ⁺ʲ aᵢⱼ Mᵢⱼ
לפי עמודה j: det(A) = Σᵢ (−1)ⁱ⁺ʲ aᵢⱼ Mᵢⱼ`,
  },
  'thm-2x2-det': {
    content: `det[a b; c d] = ad − bc.`,
  },
  'thm-det-invertible': {
    content: `A הפיכה אם"ם det(A) ≠ 0.
אם A הפיכה: det(A⁻¹) = 1/det(A).`,
  },
  'thm-det-transpose-eq': {
    content: `det(Aᵗ) = det(A).`,
  },
  'thm-det-multiplicative': {
    content: `det(AB) = det(A) · det(B) לכל מטריצות ריבועיות A, B.`,
  },
  'thm-vandermonde-det': {
    content: `דטרמיננטת ונדרמונד: det של מטריצה שבה שורה i היא (1, xᵢ, xᵢ², ..., xᵢⁿ⁻¹) שווה ל-∏ᵢ<ⱼ(xⱼ − xᵢ).`,
  },

  // === שבוע 13: מרחב שורות ועמודות (Row & Column Space) ===
  'def-row-space': {
    content: `מרחב השורות של A ∈ Mₘₓₙ(F): Row(A) = Sp(שורות A) ⊆ Fⁿ.`,
  },
  'def-column-space': {
    content: `מרחב העמודות של A ∈ Mₘₓₙ(F): Col(A) = Sp(עמודות A) ⊆ Fᵐ.
שקול: Col(A) = {Ax : x ∈ Fⁿ}.`,
  },
  'def-rank': {
    content: `דרגת מטריצה: rank(A) = dim(Row(A)) = dim(Col(A)) = מספר הצירים ב-REF.`,
  },
  'thm-row-equiv-same-row-space': {
    content: `מטריצות שקולות שורה (אותו REF) יש אותו מרחב שורות.`,
  },
  'thm-row-basis-from-echelon': {
    content: `בסיס למרחב השורות: השורות השונות מאפס בצורת המדרגות של A.`,
  },
  'thm-col-basis-pivot-columns': {
    content: `בסיס למרחב העמודות: העמודות המקוריות של A המתאימות לעמודות הציר ב-REF.`,
  },
  'thm-rank-equals-dim-row-col': {
    content: `dim(Row(A)) = dim(Col(A)) = rank(A).
דרגת שורות = דרגת עמודות.`,
  },
  'thm-dimension-theorem-matrix': {
    content: `משפט המימדים למטריצות: rank(A) + dim(Null(A)) = n
כאשר A ∈ Mₘₓₙ(F).`,
  },
  'thm-rank-transpose': {
    content: `rank(Aᵗ) = rank(A).`,
  },
  'thm-rank-product-inequality': {
    content: `rank(AB) ≤ min(rank(A), rank(B)).`,
  },
};

// =============================================
// Build adapted data
// =============================================
const weeksContent: WeekContent[] = weeksData.map((week) => {
  const definitions: Definition[] = week.definitions.map((d) => {
    const override = hebrewOverrides[d.id];
    return {
      id: d.id,
      title: override?.titleHe || d.titleHe || d.title,
      content: override?.content || d.verbatimContent,
      notation: undefined,
      examples: d.explanation ? [d.explanation] : undefined,
      source: `${d.source}, עמ' ${d.pageNumber}`,
    };
  });

  const theorems: Theorem[] = week.theorems.map((t) => {
    const override = hebrewOverrides[t.id];
    const matchingProof = week.proofs.find(
      (p) => p.relatedItems.includes(t.id) || p.title.includes(t.title)
    );
    return {
      id: t.id,
      title: override?.titleHe || t.titleHe || t.title,
      statement: override?.content || t.verbatimContent,
      proof: matchingProof?.verbatimContent || undefined,
      source: `${t.source}, עמ' ${t.pageNumber}`,
    };
  });

  const techniques: Technique[] = week.techniques.map((t) => {
    const override = hebrewOverrides[t.id];
    return {
      id: t.id,
      title: override?.titleHe || t.titleHe || t.title,
      description: override?.content || t.verbatimContent,
      steps: t.explanation ? t.explanation.split('\n').filter(Boolean) : undefined,
      whenToUse: t.explanation || 'ראה תיאור',
      source: `${t.source}, עמ' ${t.pageNumber}`,
    };
  });

  const keyFormulas = week.formulas.map((f) => f.verbatimContent);

  return {
    weekNumber: week.weekNumber,
    title: week.title,
    titleHe: week.titleHe || week.title,
    lectures: extractLectureNumbers(week.lectureFiles),
    topics: week.topics.map(topicToHebrew),
    summary: week.description,
    definitions,
    theorems,
    techniques,
    keyFormulas: keyFormulas.length > 0 ? keyFormulas : undefined,
  };
});

export function getAllWeeks(): WeekContent[] {
  return weeksContent;
}

export function getWeekContent(weekNumber: number): WeekContent | undefined {
  return weeksContent.find((w) => w.weekNumber === weekNumber);
}
