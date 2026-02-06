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
    'vector-spaces': 'מרחבים וקטוריים',
    'subspaces': 'תת-מרחבים',
    'linear-combinations': 'צירופים לינאריים',
    'span': 'מרחב נפרש',
    'linear-independence': 'אי-תלות לינארית',
    'basis': 'בסיס',
    'dimension': 'מימד',
    'linear-transformations': 'העתקות לינאריות',
    'matrix-representation': 'ייצוג מטריצי',
    'change-of-basis': 'החלפת בסיס',
    'rank': 'דרגה',
    'nullity': 'מימד הגרעין',
    'systems-of-equations': 'מערכות משוואות',
    'row-reduction': 'דירוג שורות',
    'determinants': 'דטרמיננטות',
    'eigenvalues': 'ערכים עצמיים',
    'eigenvectors': 'וקטורים עצמיים',
    'diagonalization': 'לכסון',
    'inner-products': 'מכפלות פנימיות',
    'orthogonality': 'אורתוגונליות',
    'gram-schmidt': 'גרם-שמידט',
    'least-squares': 'ריבועים פחותים',
    'singular-values': 'ערכים סינגולריים',
    'jordan-form': 'צורת ז\'ורדן',
    'bilinear-forms': 'תבניות בילינאריות',
    'quadratic-forms': 'תבניות ריבועיות',
    'other': 'אחר',
  };
  return map[topic] || topic.replace(/-/g, ' ');
}

// =============================================
// Hebrew content overrides for all items
// =============================================
const hebrewOverrides: Record<string, { titleHe?: string; content: string }> = {
  // === שבוע 1: שדות ומרחבים וקטוריים ===
  'def-field': {
    content: `שדה (F, +, ·) הוא קבוצה F עם שתי פעולות בינאריות + (חיבור) ו-· (כפל) כך ש:
1. (F, +) היא חבורה אבלית עם איבר יחידה 0
2. (F\\{0}, ·) היא חבורה אבלית עם איבר יחידה 1
3. חוק הפילוג: a·(b+c) = a·b + a·c לכל a,b,c ∈ F`,
  },
  'def-vector-space': {
    content: `מרחב וקטורי מעל שדה F הוא קבוצה V יחד עם שתי פעולות:
1. חיבור וקטורים: V × V → V, (u, v) ↦ u + v
2. כפל בסקלר: F × V → V, (α, v) ↦ αv

המקיימות את האקסיומות הבאות (∀ u, v, w ∈ V ו-∀ α, β ∈ F):
(V1) u + (v + w) = (u + v) + w (אסוציאטיביות)
(V2) u + v = v + u (קומוטטיביות)
(V3) ∃ 0 ∈ V: v + 0 = v (וקטור אפס)
(V4) ∀ v ∈ V, ∃ (-v) ∈ V: v + (-v) = 0 (נגדי חיבורי)
(V5) α(βv) = (αβ)v
(V6) 1·v = v
(V7) α(u + v) = αu + αv
(V8) (α + β)v = αv + βv`,
  },
  'thm-zero-unique': {
    titleHe: 'יחידות וקטור האפס',
    content: `בכל מרחב וקטורי V, וקטור האפס 0 הוא יחיד.
הוכחה: נניח ש-0 ו-0' שניהם וקטורי אפס. אז:
0 = 0 + 0' (כי 0' הוא אפס)
  = 0' (כי 0 הוא אפס)`,
  },
  'thm-zero-scalar': {
    titleHe: 'כפל בסקלר אפס',
    content: `לכל וקטור v במרחב וקטורי V מעל שדה F:
0·v = 0 (סקלר אפס כפול כל וקטור שווה וקטור האפס)
α·0 = 0 (כל סקלר כפול וקטור האפס שווה וקטור האפס)
(-1)·v = -v`,
  },

  // === שבוע 2: תתי-מרחבים וצירופים לינאריים ===
  'def-subspace': {
    content: `תת-קבוצה W של מרחב וקטורי V מעל F נקראת תת-מרחב של V אם W הוא בעצמו מרחב וקטורי מעל F עם אותן פעולות.

מבחן תת-מרחב: W ⊆ V הוא תת-מרחב אם ורק אם:
1. W ≠ ∅ (באופן שקול, 0 ∈ W)
2. W סגור לחיבור: u, v ∈ W ⟹ u + v ∈ W
3. W סגור לכפל בסקלר: α ∈ F, v ∈ W ⟹ αv ∈ W

באופן שקול: W הוא תת-מרחב אם"ם αu + βv ∈ W לכל α, β ∈ F ו-u, v ∈ W`,
  },
  'def-linear-combination': {
    content: `יהי V מרחב וקטורי מעל F ויהיו v₁, v₂, ..., vₙ ∈ V.
צירוף לינארי של v₁, ..., vₙ הוא כל וקטור מהצורה:
α₁v₁ + α₂v₂ + ... + αₙvₙ
כאשר α₁, ..., αₙ ∈ F הם סקלרים.`,
  },
  'thm-intersection-subspace': {
    titleHe: 'חיתוך תתי-מרחבים',
    content: `יהיו W₁ ו-W₂ תתי-מרחבים של V. אז W₁ ∩ W₂ הוא גם תת-מרחב של V.

באופן כללי יותר: אם {Wᵢ}ᵢ∈I היא אוסף כלשהו של תתי-מרחבים של V, אז ∩ᵢ∈I Wᵢ הוא תת-מרחב של V.`,
  },
  'thm-sum-subspace': {
    titleHe: 'סכום תתי-מרחבים',
    content: `יהיו W₁ ו-W₂ תתי-מרחבים של V. הסכום:
W₁ + W₂ = {w₁ + w₂ : w₁ ∈ W₁, w₂ ∈ W₂}
הוא תת-המרחב הקטן ביותר של V המכיל את W₁ ואת W₂.`,
  },

  // === שבוע 3: פרישה ואי-תלות לינארית ===
  'def-span': {
    content: `יהי S = {v₁, v₂, ..., vₙ} ⊆ V. הפרישה של S היא:
Sp(S) = Sp(v₁, ..., vₙ) = {α₁v₁ + ... + αₙvₙ : αᵢ ∈ F}

הפרישה היא קבוצת כל הצירופים הלינאריים של הוקטורים ב-S.
אומרים ש-S פורש את V (או ש-S היא קבוצה פורשת של V) אם Sp(S) = V.

מוסכמה: Sp(∅) = {0}`,
  },
  'def-linear-independence': {
    content: `וקטורים v₁, v₂, ..., vₙ ∈ V הם בלתי-תלויים לינארית אם:
α₁v₁ + α₂v₂ + ... + αₙvₙ = 0 ⟹ α₁ = α₂ = ... = αₙ = 0

באופן שקול: הצירוף הלינארי היחיד השווה ל-0 הוא הצירוף הטריוויאלי.

וקטורים הם תלויים לינארית אם הם אינם בלתי-תלויים לינארית, כלומר קיימים סקלרים α₁, ..., αₙ שלא כולם אפס כך ש-α₁v₁ + ... + αₙvₙ = 0.`,
  },
  'thm-span-subspace': {
    titleHe: 'פרישה היא תת-מרחב',
    content: `לכל תת-קבוצה S של V, הקבוצה Sp(S) היא תת-מרחב של V.
יתרה מכך, Sp(S) הוא תת-המרחב הקטן ביותר המכיל את S.`,
  },
  'thm-dependence-one-combination': {
    titleHe: 'תלות באמצעות צירוף לינארי',
    content: `יהיו v₁, ..., vₙ וקטורים ב-V. הם תלויים לינארית אם ורק אם ניתן לכתוב את אחד מהם כצירוף לינארי של האחרים.`,
  },
  'thm-zero-dependent': {
    titleHe: 'וקטור אפס גורר תלות',
    content: `כל קבוצת וקטורים המכילה את וקטור האפס היא תלויה לינארית.`,
  },

  // === שבוע 4: בסיס ומימד ===
  'def-basis': {
    content: `בסיס למרחב וקטורי V הוא קבוצה B = {v₁, ..., vₙ} ⊆ V כך ש:
1. B בלתי-תלויה לינארית
2. B פורשת את V (כלומר Sp(B) = V)

באופן שקול: B היא בסיס אם"ם כל v ∈ V ניתן לכתיבה באופן יחיד כ:
v = α₁v₁ + α₂v₂ + ... + αₙvₙ
עבור סקלרים יחידים α₁, ..., αₙ ∈ F.`,
  },
  'def-dimension': {
    content: `המימד של מרחב וקטורי נוצר סופית V, המסומן dim(V), הוא מספר הוקטורים בכל בסיס של V.

מוסכמה: dim({0}) = 0

אם ל-V אין בסיס סופי, V נקרא אינסוף-מימדי.`,
  },
  'def-coordinates': {
    content: `יהי B = {v₁, ..., vₙ} בסיס סדור של V. אם v = α₁v₁ + ... + αₙvₙ, אז וקטור הקואורדינטות של v ביחס ל-B הוא:
[v]_B = (α₁, α₂, ..., αₙ) ∈ Fⁿ`,
  },
  'thm-basis-unique-rep': {
    titleHe: 'ייצוג יחיד',
    content: `יהי B = {v₁, ..., vₙ} בסיס של V. אז כל וקטור v ∈ V ניתן לכתיבה באופן יחיד כצירוף לינארי של איברי B.`,
  },
  'thm-steinitz-exchange': {
    titleHe: 'למת ההחלפה של שטייניץ',
    content: `יהי V מרחב וקטורי. אם {u₁, ..., uₘ} בלתי-תלויה לינארית ו-{w₁, ..., wₙ} פורשת את V, אז m ≤ n.

מסקנה: לכל שני בסיסים של מרחב וקטורי נוצר סופית יש אותו מספר איברים.`,
  },
  'thm-extend-to-basis': {
    titleHe: 'הרחבה לבסיס',
    content: `יהי V מרחב וקטורי נוצר סופית עם dim(V) = n.
1. כל קבוצה בלתי-תלויה לינארית ניתנת להרחבה לבסיס.
2. כל קבוצה פורשת מכילה בסיס.
3. אם W הוא תת-מרחב של V, אז dim(W) ≤ dim(V), עם שוויון אם"ם W = V.`,
  },

  // === שבוע 5: העתקות לינאריות ===
  'def-linear-transformation': {
    content: `פונקציה T: V → W בין מרחבים וקטוריים מעל F נקראת העתקה לינארית אם לכל u, v ∈ V ו-α ∈ F:
1. T(u + v) = T(u) + T(v) (אדיטיביות)
2. T(αv) = αT(v) (הומוגניות)

באופן שקול: T(αu + βv) = αT(u) + βT(v) לכל α, β ∈ F ו-u, v ∈ V.`,
  },
  'def-kernel': {
    content: `הגרעין (מרחב האפס) של העתקה לינארית T: V → W הוא:
ker(T) = {v ∈ V : T(v) = 0}

ker(T) הוא תת-מרחב של V.`,
  },
  'def-image': {
    content: `התמונה (הטווח) של העתקה לינארית T: V → W היא:
Im(T) = {T(v) : v ∈ V} = {w ∈ W : ∃v ∈ V, T(v) = w}

Im(T) הוא תת-מרחב של W.`,
  },
  'thm-T-zero': {
    titleHe: 'T(0) = 0',
    content: `לכל העתקה לינארית T: V → W מתקיים T(0_V) = 0_W.`,
  },
  'thm-injective-kernel': {
    titleHe: 'חד-חד-ערכיות וגרעין',
    content: `העתקה לינארית T: V → W היא חד-חד-ערכית (חח"ע) אם ורק אם ker(T) = {0}.`,
  },
  'thm-determined-by-basis': {
    titleHe: 'העתקה לינארית נקבעת ע"י בסיס',
    content: `יהי B = {v₁, ..., vₙ} בסיס של V ויהיו w₁, ..., wₙ ∈ W וקטורים כלשהם. אז קיימת העתקה לינארית יחידה T: V → W כך ש-T(vᵢ) = wᵢ עבור i = 1, ..., n.`,
  },

  // === שבוע 6: ייצוג מטריצי ===
  'def-matrix-representation': {
    content: `תהי T: V → W העתקה לינארית, B = {v₁,...,vₙ} בסיס של V, ו-C = {w₁,...,wₘ} בסיס של W.
הייצוג המטריצי של T ביחס ל-B ו-C הוא המטריצה m×n [T]_B^C כאשר:
- העמודה ה-j היא [T(vⱼ)]_C (קואורדינטות של T(vⱼ) בבסיס C)

אז: [T(v)]_C = [T]_B^C · [v]_B`,
  },
  'def-change-of-basis': {
    content: `יהיו B ו-B' שני בסיסים של V. מטריצת המעבר מ-B ל-B' היא:
P_B^B' = [I]_B^B'
כאשר I: V → V היא העתקת הזהות. אז: [v]_B' = P_B^B' · [v]_B

תכונות:
- P_B'^B = (P_B^B')⁻¹
- אם T: V → V ו-A = [T]_B, A' = [T]_B', אז A' = P⁻¹AP כאשר P = P_B^B'`,
  },
  'thm-matrix-composition': {
    titleHe: 'מטריצה של הרכבה',
    content: `יהיו S: U → V ו-T: V → W העתקות לינאריות. אז:
[T ∘ S] = [T] · [S]
(עם בסיסים מתאימים)`,
  },
  'thm-similar-matrices': {
    titleHe: 'מטריצות דומות',
    content: `שתי מטריצות A ו-B הן דומות (A ~ B) אם קיימת מטריצה הפיכה P כך ש-B = P⁻¹AP.

מטריצות דומות אם"ם הן מייצגות את אותה העתקה לינארית ביחס לבסיסים שונים.

למטריצות דומות יש:
- אותה דטרמיננטה
- אותו עקבה (trace)
- אותה דרגה
- אותו פולינום אופייני
- אותם ערכים עצמיים`,
  },

  // === שבוע 7: דרגה ואפסיות ===
  'def-rank': {
    content: `הדרגה של העתקה לינארית T: V → W היא:
rank(T) = dim(Im(T))

עבור מטריצה A: rank(A) = dim(מרחב העמודות של A) = dim(מרחב השורות של A)`,
  },
  'def-nullity': {
    content: `האפסיות של העתקה לינארית T: V → W היא:
nullity(T) = dim(ker(T))

עבור מטריצה A: nullity(A) = dim(מרחב האפס של A)`,
  },
  'thm-rank-nullity': {
    content: `תהי T: V → W העתקה לינארית כאשר V נוצר סופית. אז:
dim(V) = rank(T) + nullity(T)

באופן שקול: dim(V) = dim(Im(T)) + dim(ker(T))

עבור מטריצה m×n בשם A: n = rank(A) + nullity(A)`,
  },
  'thm-rank-row-col': {
    titleHe: 'דרגת שורות שווה לדרגת עמודות',
    content: `לכל מטריצה A: דרגת שורות(A) = דרגת עמודות(A) = rank(A)`,
  },

  // === שבוע 8: דירוג ומערכות משוואות ===
  'def-row-echelon': {
    content: `מטריצה נמצאת בצורת מדרגות (REF) אם:
1. כל שורות האפס נמצאות בתחתית
2. האיבר המוביל (ציר) של כל שורה שאינה אפס נמצא מימין לציר בשורה שמעליה
3. כל האיברים מתחת לציר הם אפס

מטריצה נמצאת בצורת מדרגות מצומצמת (RREF) אם בנוסף:
4. כל ציר שווה 1
5. כל ציר הוא האיבר היחיד שאינו אפס בעמודתו`,
  },
  'def-elementary-operations': {
    content: `שלוש פעולות השורה האלמנטריות הן:
1. החלפת שתי שורות: Rᵢ ↔ Rⱼ
2. כפל שורה בסקלר שונה מאפס: Rᵢ → cRᵢ (c ≠ 0)
3. הוספת כפולה של שורה אחת לאחרת: Rᵢ → Rᵢ + cRⱼ

כל פעולה הפיכה ושומרת על קבוצת הפתרונות של Ax = b.`,
  },
  'thm-rref-unique': {
    titleHe: 'יחידות צורת מדרגות מצומצמת',
    content: `לכל מטריצה יש צורת מדרגות מצומצמת (RREF) יחידה.`,
  },
  'thm-solutions-structure': {
    titleHe: 'מבנה קבוצת הפתרונות',
    content: `עבור מערכת לינארית Ax = b:
1. אם b ∉ Col(A), אין פתרון
2. אם b ∈ Col(A), יהי x₀ פתרון פרטי. אז:
   {x : Ax = b} = x₀ + ker(A) = {x₀ + h : h ∈ ker(A)}

קבוצת הפתרונות היא ריקה או תת-מרחב אפיני.`,
  },

  // === שבוע 9: דטרמיננטות ===
  'def-determinant': {
    content: `הדטרמיננטה היא הפונקציה היחידה det: Mₙ(F) → F המקיימת:
1. det היא מולטי-לינארית בשורות (לינארית בכל שורה)
2. det היא אלטרנטיבית (החלפת שתי שורות משנה סימן)
3. det(I) = 1

נוסחה מפורשת: det(A) = Σ_{σ∈Sₙ} sign(σ) · a₁,σ(1) · a₂,σ(2) · ... · aₙ,σ(n)

עבור 2×2: det[a b; c d] = ad - bc
עבור 3×3: det = a(ei-fh) - b(di-fg) + c(dh-eg) (פיתוח לפי שורה)`,
  },
  'thm-det-product': {
    titleHe: 'דטרמיננטה של מכפלה',
    content: `עבור מטריצות ריבועיות A ו-B: det(AB) = det(A) · det(B)`,
  },
  'thm-det-inverse': {
    titleHe: 'דטרמיננטה והפיכות',
    content: `מטריצה ריבועית A הפיכה אם ורק אם det(A) ≠ 0.
יתרה מכך: det(A⁻¹) = 1/det(A)`,
  },
  'thm-det-transpose': {
    titleHe: 'דטרמיננטה של שחלוף',
    content: `det(Aᵀ) = det(A)`,
  },
  'thm-det-row-ops': {
    titleHe: 'דטרמיננטה ופעולות שורה',
    content: `השפעת פעולות שורה על det(A):
1. החלפת שתי שורות: הדטרמיננטה משנה סימן
2. כפל שורה ב-c: הדטרמיננטה מוכפלת ב-c
3. הוספת כפולה של שורה לאחרת: הדטרמיננטה לא משתנה`,
  },

  // === שבוע 10: ערכים עצמיים ווקטורים עצמיים ===
  'def-eigenvalue': {
    content: `יהי T: V → V אופרטור לינארי (או A מטריצה n×n).
סקלר λ ∈ F הוא ערך עצמי של T אם קיים וקטור v ≠ 0 ב-V כך ש:
T(v) = λv (או Av = λv)

וקטור v ≠ 0 כזה נקרא וקטור עצמי המתאים ל-λ.

המרחב העצמי של λ הוא: E_λ = ker(T - λI) = {v ∈ V : Tv = λv}`,
  },
  'def-characteristic-polynomial': {
    content: `הפולינום האופייני של מטריצה A (או אופרטור T) הוא:
p_A(λ) = det(A - λI)

זהו פולינום מתוקן (מוני) ממעלה n. שורשיו הם הערכים העצמיים של A.`,
  },
  'def-algebraic-geometric-mult': {
    titleHe: 'ריבוי אלגברי וגאומטרי',
    content: `עבור ערך עצמי λ:
- ריבוי אלגברי: הריבוי של λ כשורש של הפולינום האופייני
- ריבוי גאומטרי: dim(E_λ) = dim(ker(A - λI))

תמיד: 1 ≤ ריבוי גאומטרי ≤ ריבוי אלגברי`,
  },
  'thm-eigen-independent': {
    titleHe: 'וקטורים עצמיים של ע"ע שונים הם בת"ל',
    content: `וקטורים עצמיים המתאימים לערכים עצמיים שונים הם בלתי-תלויים לינארית.

מסקנה: אם למטריצה n×n יש n ערכים עצמיים שונים, היא לכסינה.`,
  },
  'thm-sum-product-eigenvalues': {
    titleHe: 'עקבה ודטרמיננטה דרך ע"ע',
    content: `עבור מטריצה n×n בשם A עם ערכים עצמיים λ₁, ..., λₙ (עם ריבוי):
- tr(A) = λ₁ + λ₂ + ... + λₙ
- det(A) = λ₁ · λ₂ · ... · λₙ`,
  },

  // === שבוע 11: לכסון ===
  'def-diagonalizable': {
    content: `מטריצה A היא לכסינה אם היא דומה למטריצה אלכסונית, כלומר קיימת מטריצה הפיכה P כך ש:
P⁻¹AP = D
כאשר D אלכסונית.

באופן שקול: A לכסינה אם"ם קיים בסיס של וקטורים עצמיים ל-Fⁿ.`,
  },
  'thm-diagonalization-criterion': {
    titleHe: 'קריטריון לכסינות',
    content: `מטריצה n×n בשם A היא לכסינה אם ורק אם:
1. הפולינום האופייני מתפרק לחלוטין (כל השורשים ב-F), וגם
2. לכל ערך עצמי λ: ריבוי גאומטרי = ריבוי אלגברי

באופן שקול: A לכסינה אם"ם סכום מימדי המרחבים העצמיים שווה n.`,
  },
  'thm-powers-diagonal': {
    titleHe: 'חזקות של מטריצות לכסינות',
    content: `אם A = PDP⁻¹ כאשר D אלכסונית, אז:
Aⁿ = PDⁿP⁻¹
כאשר Dⁿ = diag(λ₁ⁿ, λ₂ⁿ, ..., λₖⁿ)`,
  },

  // === שבוע 12: מכפלות פנימיות ואורתוגונליות ===
  'def-inner-product': {
    content: `מכפלה פנימית על מרחב וקטורי ממשי V היא פונקציה ⟨·,·⟩: V×V → ℝ המקיימת:
1. ⟨u,v⟩ = ⟨v,u⟩ (סימטריה)
2. ⟨αu + βv, w⟩ = α⟨u,w⟩ + β⟨v,w⟩ (לינאריות ברכיב הראשון)
3. ⟨v,v⟩ ≥ 0 ו-⟨v,v⟩ = 0 אם"ם v = 0 (חיוביות מוחלטת)

מכפלה פנימית סטנדרטית ב-ℝⁿ: ⟨x,y⟩ = x₁y₁ + x₂y₂ + ... + xₙyₙ = xᵀy`,
  },
  'def-norm': {
    content: `הנורמה של וקטור v במרחב מכפלה פנימית היא:
‖v‖ = √⟨v,v⟩

תכונות:
- ‖v‖ ≥ 0, עם שוויון אם"ם v = 0
- ‖αv‖ = |α| · ‖v‖
- ‖u + v‖ ≤ ‖u‖ + ‖v‖ (אי-שוויון המשולש)`,
  },
  'def-orthogonal': {
    content: `שני וקטורים u ו-v הם אורתוגונליים (u ⊥ v) אם ⟨u,v⟩ = 0.

קבוצת וקטורים היא אורתוגונלית אם כל זוג בה אורתוגונלי.
קבוצה היא אורתונורמלית אם היא אורתוגונלית וכל וקטור בה הוא בעל נורמה 1.`,
  },
  'def-orthogonal-complement': {
    content: `המשלים האורתוגונלי של תת-מרחב W ⊆ V הוא:
W⊥ = {v ∈ V : ⟨v,w⟩ = 0 לכל w ∈ W}

W⊥ הוא תת-מרחב של V.`,
  },
  'thm-cauchy-schwarz': {
    titleHe: 'אי-שוויון קושי-שוורץ',
    content: `לכל u, v במרחב מכפלה פנימית:
|⟨u,v⟩| ≤ ‖u‖ · ‖v‖

שוויון מתקיים אם"ם u ו-v תלויים לינארית.`,
  },
  'thm-orthonormal-independent': {
    titleHe: 'קבוצה אורתונורמלית היא בת"ל',
    content: `כל קבוצה אורתונורמלית היא בלתי-תלויה לינארית.`,
  },
  'thm-orthogonal-decomposition': {
    titleHe: 'פירוק אורתוגונלי',
    content: `אם W הוא תת-מרחב נוצר סופית של מרחב מכפלה פנימית V, אז:
V = W ⊕ W⊥

כל v ∈ V ניתן לכתיבה באופן יחיד כ-v = w + w⊥ כאשר w ∈ W ו-w⊥ ∈ W⊥.`,
  },

  // === שבוע 13: גרם-שמידט ויישומים ===
  'def-orthogonal-projection': {
    content: `ההיטל האורתוגונלי של v על תת-מרחב W הוא הוקטור היחיד proj_W(v) ∈ W כך ש:
v - proj_W(v) ∈ W⊥

אם {u₁,...,uₖ} בסיס אורתונורמלי של W:
proj_W(v) = ⟨v,u₁⟩u₁ + ⟨v,u₂⟩u₂ + ... + ⟨v,uₖ⟩uₖ`,
  },
  'thm-gram-schmidt': {
    content: `בהינתן וקטורים בלתי-תלויים לינארית {v₁,...,vₖ}, תהליך גרם-שמידט מייצר קבוצה אורתונורמלית {u₁,...,uₖ} הפורשת את אותו תת-מרחב:

w₁ = v₁,  u₁ = w₁/‖w₁‖
w₂ = v₂ - ⟨v₂,u₁⟩u₁,  u₂ = w₂/‖w₂‖
w₃ = v₃ - ⟨v₃,u₁⟩u₁ - ⟨v₃,u₂⟩u₂,  u₃ = w₃/‖w₃‖
...
wₖ = vₖ - Σⱼ₌₁ᵏ⁻¹ ⟨vₖ,uⱼ⟩uⱼ,  uₖ = wₖ/‖wₖ‖`,
  },
  'thm-best-approximation': {
    titleHe: 'קירוב מיטבי',
    content: `יהי W תת-מרחב נוצר סופית של V. לכל v ∈ V:
proj_W(v) הוא הוקטור היחיד ב-W הקרוב ביותר ל-v.

כלומר: ‖v - proj_W(v)‖ < ‖v - w‖ לכל w ∈ W, w ≠ proj_W(v)`,
  },
  'thm-least-squares': {
    titleHe: 'פתרון ריבועים פחותים',
    content: `פתרון הריבועים הפחותים של Ax = b (כאשר ל-Ax = b אין בהכרח פתרון) הוא כל x̂ המקיים:
AᵀAx̂ = Aᵀb

x̂ זה ממזער את ‖Ax - b‖.

אם ל-A דרגת עמודות מלאה, אז AᵀA הפיכה ו:
x̂ = (AᵀA)⁻¹Aᵀb`,
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
