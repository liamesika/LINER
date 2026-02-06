// Data adapter: transforms LINER homework data into BDIDA-compatible format

import { homeworkData } from './liner-homework';

export interface HomeworkQuestion {
  id: string;
  homeworkNumber: number;
  questionNumber: number;
  subQuestion?: string;
  topic: string;
  question: string;
  solution: string;
  keyTechnique?: string;
}

export interface HomeworkSet {
  number: number;
  title: string;
  topics: string[];
  questions: HomeworkQuestion[];
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

// ══════════════════════════════════════════════════════════════════
// Hebrew translations for homework questions and solutions
// ══════════════════════════════════════════════════════════════════
const hebrewOverrides: Record<string, { question: string; solution: string }> = {
  // ── HW 1: שדות ומרחבים וקטוריים ──
  'hw-1-1': {
    question: 'הוכיחו שקבוצת השלמים ℤ אינה שדה.',
    solution: 'לשלמים אין הופכיים כפליים לכל איבר שונה מאפס.\nלדוגמה: 2 ∈ ℤ אין לו הופכי כפלי שלם כי 1/2 ∉ ℤ.',
  },
  'hw-1-2': {
    question: 'הראו ש-ℤₚ = {0, 1, ..., p-1} עם חיבור וכפל מודולו p הוא שדה כאשר p ראשוני.',
    solution: 'בודקים את כל אקסיומות השדה.\nהמפתח: הופכיים כפליים קיימים כי gcd(a,p) = 1 לכל 0 < a < p כאשר p ראשוני.',
  },
  'hw-1-3': {
    question: 'ודאו ש-F² = {(a,b) : a,b ∈ F} עם פעולות רכיב-רכיב הוא מרחב וקטורי מעל F.',
    solution: 'מוודאים את כל 8 אקסיומות המרחב הוקטורי.\nוקטור האפס הוא (0,0). ההופכי החיבורי של (a,b) הוא (-a,-b).',
  },

  // ── HW 2: תת-מרחבים ──
  'hw-2-1': {
    question: 'האם W = {(x,y,z) ∈ ℝ³ : x + y + z = 0} הוא תת-מרחב של ℝ³? הוכיחו או הפריכו.',
    solution: 'כן.\n(0,0,0) ∈ W כי 0+0+0=0. ✓\nסגירות לחיבור: אם x+y+z=0 וגם x\'+y\'+z\'=0, אז (x+x\')+(y+y\')+(z+z\')=0. ✓\nסגירות לכפל בסקלר: c(x+y+z)=c·0=0. ✓',
  },
  'hw-2-2': {
    question: 'האם W = {(x,y,z) ∈ ℝ³ : x + y + z = 1} הוא תת-מרחב של ℝ³? הוכיחו או הפריכו.',
    solution: 'לא.\n(0,0,0) ∉ W כי 0+0+0=0≠1. ✗\nלכן W אינו תת-מרחב.',
  },
  'hw-2-3': {
    question: 'האם W = {A ∈ M₂(ℝ) : A סימטרית} הוא תת-מרחב של M₂(ℝ)?',
    solution: 'כן.\nמטריצת האפס סימטרית. ✓\nסכום מטריצות סימטריות הוא סימטרי. ✓\nכפל סקלרי של מטריצה סימטרית הוא סימטרי. ✓',
  },
  'hw-2-4': {
    question: 'הוכיחו: W₁ ∩ W₂ הוא תת-מרחב כאשר W₁, W₂ תת-מרחבים.',
    solution: '0 ∈ W₁ ∩ W₂ (כי 0 בשניהם). ✓\nאם v,w ∈ W₁ ∩ W₂, אז v+w ∈ W₁ וגם v+w ∈ W₂, לכן v+w ∈ W₁ ∩ W₂. ✓\nבאופן דומה לכפל בסקלר. ✓',
  },

  // ── HW 3: פרישה ותלות לינארית ──
  'hw-3-1': {
    question: 'קבעו האם v₁=(1,2,3), v₂=(4,5,6), v₃=(7,8,9) בלתי תלויים לינארית ב-ℝ³.',
    solution: 'תלויים לינארית.\nv₃ = 2v₂ - v₁.\nלחלופין: נבנה מטריצה, נדרג, ונמצא פתרון לא טריוויאלי.\nהצבה: a(1,2,3) + b(4,5,6) + c(7,8,9) = (0,0,0)\nבניית מטריצה: [[1,4,7],[2,5,8],[3,6,9]]\nדירוג: det = 0\nהוקטורים תלויים לינארית.',
  },
  'hw-3-2': {
    question: 'מצאו את Sp{(1,0,1), (0,1,1)} ב-ℝ³. האם (2,3,5) שייך לפרישה?',
    solution: 'Sp = {(a,b,a+b) : a,b ∈ ℝ}.\nבדיקה: (2,3,5) = 2(1,0,1) + 3(0,1,1) = (2,3,5) ✓\nכן, (2,3,5) שייך לפרישה.',
  },
  'hw-3-3': {
    question: 'הוכיחו: אם S בת״ל ו-v ∉ Sp(S), אז S ∪ {v} בת״ל.',
    solution: 'נניח α₁v₁+...+αₙvₙ+βv=0.\nאם β≠0, אז v = -(α₁v₁+...+αₙvₙ)/β ∈ Sp(S), בסתירה.\nלכן β=0, ואז כל αᵢ=0 מאי-תלות של S.',
  },

  // ── HW 4: בסיס ומימד ──
  'hw-4-1': {
    question: 'מצאו בסיס לתת-המרחב W = {(x,y,z) ∈ ℝ³ : x - y + z = 0}.',
    solution: 'x = y - z.\nW = {(y-z, y, z) : y,z ∈ ℝ} = Sp{(1,1,0), (-1,0,1)}.\nבסיס: {(1,1,0), (-1,0,1)}, dim = 2.',
  },
  'hw-4-2': {
    question: 'מצאו את dim(W) כאשר W = {p(x) ∈ ℝ[x]₃ : p(1) = 0}.',
    solution: 'p(x) = a + bx + cx² + dx³ עם a+b+c+d=0.\nלכן a = -b-c-d.\nבסיס: {x-1, x²-1, x³-1}.\ndim = 3.',
  },
  'hw-4-3': {
    question: 'הרחיבו את B = {(1,1,0,0), (0,1,1,0)} לבסיס של ℝ⁴.',
    solution: 'נוסיף וקטורים מהבסיס הסטנדרטי: e₃=(0,0,1,0), e₄=(0,0,0,1).\nנבדוק אי-תלות.\nבסיס: {(1,1,0,0), (0,1,1,0), (0,0,1,0), (0,0,0,1)}.',
  },

  // ── HW 5: העתקות לינאריות ──
  'hw-5-1': {
    question: 'תהי T: ℝ² → ℝ² מוגדרת T(x,y) = (x+y, x-y). מצאו את ker(T) ו-Im(T).',
    solution: 'ker(T): x+y=0 וגם x-y=0 ⟹ x=y=0.\nלכן ker(T)={0}.\nT חח\"ע, ולכן Im(T)=ℝ² (על).\nלפי משפט המימד: dim(ker)+dim(Im)=2, ואכן 0+2=2. ✓',
  },
  'hw-5-2': {
    question: 'ודאו שהנגזרת D: ℝ[x]₂ → ℝ[x]₁ היא העתקה לינארית.',
    solution: 'D(p+q) = (p+q)\' = p\' + q\' = D(p) + D(q). ✓\nD(cp) = (cp)\' = cp\' = cD(p). ✓\nשני התנאים מתקיימים, לכן D העתקה לינארית.',
  },
  'hw-5-3': {
    question: 'מצאו ker(T) ו-Im(T) עבור T: M₂(ℝ) → M₂(ℝ), T(A) = A - Aᵀ.',
    solution: 'ker(T) = {A : A = Aᵀ} = מטריצות סימטריות, dim = 3.\nIm(T) = {B : B = -Bᵀ} = מטריצות אנטי-סימטריות, dim = 1.',
  },

  // ── HW 6: ייצוג מטריציוני ──
  'hw-6-1': {
    question: 'מצאו את [T]_B כאשר T: ℝ² → ℝ² מוגדרת T(x,y) = (2x+y, x-y) ו-B = {(1,0), (0,1)}.',
    solution: 'T(1,0)=(2,1), T(0,1)=(1,-1).\nהעמודות הן הקואורדינטות:\n[T]_B = [[2,1],[1,-1]].',
  },
  'hw-6-2': {
    question: 'מצאו את מטריצת המעבר מ-B = {(1,1), (1,-1)} לבסיס הסטנדרטי ב-ℝ².',
    solution: 'P = [[1,1],[1,-1]] (העמודות הן וקטורי הבסיס).\nP⁻¹ = (1/2)[[1,1],[1,-1]].',
  },
  'hw-6-3': {
    question: 'תהי T: ℝ² → ℝ³ מוגדרת T(x,y) = (x, x+y, y). מצאו את [T]_{E,B} עבור בסיסים סטנדרטיים E,B.',
    solution: 'T(1,0)=(1,1,0), T(0,1)=(0,1,1).\n[T] = [[1,0],[1,1],[0,1]].',
  },

  // ── HW 7: דרגה ואפסות ──
  'hw-7-1': {
    question: 'עבור A = [[1,2,3],[4,5,6],[7,8,9]], מצאו rank(A) ו-nullity(A).',
    solution: 'דירוג שורות למטריצה מדורגת:\nrank(A) = 2.\nלפי משפט המימד (Rank-Nullity):\nnullity = 3 - 2 = 1.',
  },
  'hw-7-2': {
    question: 'הוכיחו: rank(AB) ≤ min(rank(A), rank(B)).',
    solution: 'Im(AB) ⊆ Im(A) ולכן rank(AB) ≤ rank(A).\nכמו כן Im(AB) = A(Im(B)) ולכן rank(AB) ≤ dim(Im(B)) = rank(B).\nמכאן rank(AB) ≤ min(rank(A), rank(B)).',
  },

  // ── HW 8: מערכות משוואות ──
  'hw-8-1': {
    question: 'פתרו את המערכת: x + 2y + 3z = 1, 4x + 5y + 6z = 2, 7x + 8y + 9z = 3.',
    solution: 'דירוג המטריצה המורחבת [A|b].\nמתקבל: x = -1/3 + t, y = 2/3, z = t עבור t ∈ ℝ.\n(משתנה חופשי אחד).',
  },
  'hw-8-2': {
    question: 'עבור אילו ערכי k למערכת x+y+z=1, x+2y+3z=k, x+4y+9z=k² יש פתרון?',
    solution: 'דירוג המטריצה המורחבת.\nתנאי עקביות: k² - 3k + 2 = 0.\nלכן k = 1 או k = 2.',
  },

  // ── HW 9: דטרמיננטות ──
  'hw-9-1': {
    question: 'חשבו det([[1,2,3],[4,5,6],[7,8,10]]).',
    solution: 'פיתוח לפי השורה הראשונה:\n= 1(5·10-6·8) - 2(4·10-6·7) + 3(4·8-5·7)\n= 1(50-48) - 2(40-42) + 3(32-35)\n= 2 + 4 - 9 = -3.',
  },
  'hw-9-2': {
    question: 'אם det(A) = 5, מצאו det(2A), det(A⁻¹), det(Aᵀ), det(A²) עבור מטריצה A בגודל 3×3.',
    solution: 'det(2A) = 2³·5 = 40.\ndet(A⁻¹) = 1/5.\ndet(Aᵀ) = 5.\ndet(A²) = 5² = 25.',
  },
  'hw-9-3': {
    question: 'הוכיחו: det(AB) = det(A)·det(B).',
    solution: 'משתמשים בפירוק לפעולות שורה אלמנטריות או בהוכחה ישירה דרך מולטי-לינאריות.\nהמפתח: הדטרמיננטה היא פונקציה כפלית.',
  },

  // ── HW 10: ערכים עצמיים ──
  'hw-10-1': {
    question: 'מצאו ערכים עצמיים ווקטורים עצמיים של A = [[3,1],[0,2]].',
    solution: 'פולינום אופייני: p(λ) = (3-λ)(2-λ) = 0.\nע״ע: λ₁=3, λ₂=2.\nעבור λ=3: פותרים (A-3I)v=0 → v=(1,0).\nעבור λ=2: פותרים (A-2I)v=0 → v=(-1,1).',
  },
  'hw-10-2': {
    question: 'מצאו ערכים עצמיים של A = [[0,1,0],[0,0,1],[6,-11,6]].',
    solution: 'det(A-λI) = -λ³ + 6λ² - 11λ + 6 = -(λ-1)(λ-2)(λ-3).\nערכים עצמיים: λ = 1, 2, 3.',
  },

  // ── HW 11: לכסון ──
  'hw-11-1': {
    question: 'האם A = [[1,1,0],[0,1,0],[0,0,2]] לכסינה? אם כן, מצאו P ו-D.',
    solution: 'ע״ע: λ=1 (ריבוי אלגברי 2), λ=2 (ריבוי אלגברי 1).\nE₁=Sp{(1,0,0)}, ריבוי גיאומטרי 1.\n1≠2, לכן המטריצה לא לכסינה.',
  },
  'hw-11-2': {
    question: 'לכסנו את A = [[4,0,1],[-2,1,0],[-2,0,1]] אם אפשר.',
    solution: 'ע״ע: λ=1 (ריבוי 2), λ=3 (ריבוי 1).\nבודקים ריבוי גיאומטרי של λ=1.\nאם ריבוי גיאומטרי = אלגברי = 2, המטריצה לכסינה.',
  },
  'hw-11-3': {
    question: 'הוכיחו: אם A לכסינה ו-λ ע״ע עם ריבוי k, אז dim(Eλ) = k.',
    solution: 'A לכסינה ⟺ סכום הריבויים הגיאומטריים = n.\nמכיוון שריבוי גיאומטרי ≤ ריבוי אלגברי לכל ע״ע, נדרש שוויון לכולם.',
  },

  // ── HW 12: מכפלות פנימיות ואורתוגונליות ──
  'hw-12-1': {
    question: 'ודאו ש-⟨p,q⟩ = ∫₀¹ p(x)q(x)dx היא מכפלה פנימית על ℝ[x]₂.',
    solution: 'בדיקת 3 אקסיומות:\nסימטריה: ∫pq = ∫qp. ✓\nלינאריות: ∫(αp+βq)r = α∫pr + β∫qr. ✓\nחיוביות: ∫p² ≥ 0, ושווה 0 רק אם p=0. ✓',
  },
  'hw-12-2': {
    question: 'מצאו את ההטלה האורתוגונלית של v = (1,2,3) על W = Sp{(1,0,1), (0,1,0)}.',
    solution: 'proj_W(v) = ⟨v,u₁⟩u₁ + ⟨v,u₂⟩u₂\nכאשר {u₁,u₂} בסיס אורתונורמלי של W.\nתחילה מפעילים גרם-שמידט אם צריך.',
  },
  'hw-12-3': {
    question: 'הפעילו גרם-שמידט על {(1,1,1), (1,1,0), (1,0,0)} ב-ℝ³.',
    solution: 'u₁ = (1,1,1)/√3.\nw₂ = (1,1,0) - (2/3)(1,1,1) = (1/3,1/3,-2/3)\nu₂ = w₂/‖w₂‖.\nממשיכים באופן דומה עבור w₃ ו-u₃.',
  },
  'hw-12-4': {
    question: 'מצאו פתרון ריבועים פחותים למערכת x + y = 1, 2x - y = 3, x + 2y = 0.',
    solution: 'A = [[1,1],[2,-1],[1,2]], b = (1,3,0).\nפותרים AᵀAx̂ = Aᵀb עבור x̂.',
  },
};

// Group homework by homework number
const hwSetMap = new Map<number, HomeworkQuestion[]>();
for (const hw of homeworkData) {
  const num = hw.homeworkNumber;
  const override = hebrewOverrides[hw.id];
  if (!hwSetMap.has(num)) hwSetMap.set(num, []);
  hwSetMap.get(num)!.push({
    id: hw.id,
    homeworkNumber: hw.homeworkNumber,
    questionNumber: typeof hw.questionNumber === 'string' ? parseInt(hw.questionNumber, 10) || 1 : hw.questionNumber,
    subQuestion: undefined,
    topic: topicToHebrew(hw.topic),
    question: override?.question || hw.question,
    solution: override?.solution || hw.solution || 'ראה פתרון בקובץ המקור',
    keyTechnique: hw.evidence?.reasoningHe || undefined,
  });
}

// Determine title for each HW set
function getHwTitle(num: number): string {
  const questions = hwSetMap.get(num) || [];
  const topics = [...new Set(questions.map((q) => q.topic))];
  return topics.slice(0, 2).join(' + ');
}

export const homeworkSets: HomeworkSet[] = Array.from(hwSetMap.entries())
  .sort(([a], [b]) => a - b)
  .map(([num, questions]) => ({
    number: num,
    title: getHwTitle(num),
    topics: [...new Set(questions.map((q) => q.topic))],
    questions,
  }));

export function getAllHomework(): HomeworkSet[] {
  return homeworkSets;
}
