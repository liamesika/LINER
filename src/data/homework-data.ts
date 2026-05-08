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

// ══════════════════════════════════════════════════════════════════
// Hebrew translations for homework questions and solutions
// ══════════════════════════════════════════════════════════════════
const hebrewOverrides: Record<string, { question: string; solution: string }> = {
  // ── HW 1: שדות ──
  'hw-1-1': {
    question: 'תהי F קבוצה עם +,·. הגדירו: כפל שאינו אסוציאטיבי. הגדירו: חוק הצמצום לא מתקיים.',
    solution: 'כפל לא אסוציאטיבי: קיימים x,y,z ∈ F כך ש-(x·y)·z ≠ x·(y·z).\nחוק הצמצום לא מתקיים: קיימים x,y,z ∈ F כך ש-x+z=y+z אבל x≠y.',
  },
  'hw-1-2': {
    question: 'יהי F שדה, x,y ∈ F. הוכיחו: (א) x-y=0 ⟹ x=y, (ב) x²=x ⟹ x=0 או x=1, (ג) (x+y)(x-y)=x²-y².',
    solution: '(א) x+(−y)=0=y+(−y), מחוק הצמצום x=y.\n(ב) x²−x=0 ⟹ x(x−1)=0, אין מחלקי אפס ⟹ x=0 או x=1.\n(ג) פיתוח באמצעות דיסטריביוטיביות, אסוציאטיביות וקומוטטיביות.',
  },
  'hw-1-4': {
    question: 'בנו שדה עם ארבעה איברים. הגדירו טבלאות + ו-· ואמתו את האקסיומות.',
    solution: 'F₄ = {0,1,a,b}. בונים טבלאות חיבור וכפל שמקיימות את כל אקסיומות השדה.',
  },

  // ── HW 2: מספרים מרוכבים ומבני שדה ──
  'hw-2-1': {
    question: 'מצאו a,b ∈ ℝ עבור z=a+bi: (א) z=(2+3i)(1-i), (ב) z=(1+i)⁴, (ג) z=(3+4i)/(1-2i), (ד) z=i²⁰²⁵.',
    solution: '(א) 5+i, (ב) -4, (ג) (-5+10i)/5 = -1+2i, (ד) i²⁰²⁵ = i^(4·506+1) = i.',
  },
  'hw-2-3': {
    question: 'נתון ℝ² עם חיבור רגיל (a₁,a₂)+(b₁,b₂)=(a₁+b₁,a₂+b₂) וכפל מותאם. האם זה שדה?',
    solution: 'בודקים את כל אקסיומות השדה עם הפעולות הנתונות.\nהמפתח: לוודא שקיימים הופכיים כפליים.',
  },
  'hw-2-4': {
    question: 'מחלקי אפס: סטודנט X חקר מבנים שהם "כמעט שדה". זהו מחלקי אפס.',
    solution: 'מצאו a,b≠0 כך ש-a·b=0.\nלשדות אין מחלקי אפס; ל-Zₙ עבור n מורכב יש מחלקי אפס.',
  },

  // ── HW 3: מערכות משוואות ודירוג ──
  'hw-3-2': {
    question: 'פתרו מערכות משוואות לינאריות בעזרת דירוג גאוס. מצאו RREF וקבוצות פתרונות.',
    solution: 'מבצעים פעולות שורה להגעה לצורה מדורגת/מדורגת קנונית.\nמזהים משתנים חופשיים.\nכותבים פתרון כפרטי + הומוגני.',
  },
  'hw-3-3': {
    question: 'מצאו מערכת לינארית עבור כל מקרה: (א) פתרון יחיד, (ב) אין פתרון, (ג) אינסוף פתרונות עם משתנה חופשי אחד.',
    solution: '(א) מערכת בדרגה מלאה.\n(ב) שורה סותרת ב-RREF.\n(ג) משתנה חופשי אחד ⟹ n-rank(A)=1.',
  },

  // ── HW 4: מרחבים וקטוריים ותת-מרחבים ──
  'hw-4-1': {
    question: 'הוכיחו שכל קבוצה אינה מרחב וקטורי מעל ℝ: (א) V=∅, (ב) V={(x,y): x≥0}, (ג) V=ℝ² עם פעולות מותאמות.',
    solution: '(א) אין וקטור אפס.\n(ב) לא סגור לכפל בסקלר: -1·(1,1)=(-1,-1)∉V.\n(ג) מוצאים אקסיומה שלא מתקיימת.',
  },
  'hw-4-2': {
    question: 'הוכיחו שכל קבוצה היא תת-מרחב: (א) {(x,y,z): x+y+z=0}, (ב) מטריצות סימטריות ב-M₂(ℝ).',
    solution: 'בודקים 3 תנאים: (1) 0∈W, (2) סגירות לחיבור, (3) סגירות לכפל בסקלר.\nעבור (א): 0+0+0=0 ✓; אם x+y+z=0 ו-x\'+y\'+z\'=0, אז הסכום=0 ✓.',
  },
  'hw-4-4': {
    question: 'יהיו U,W תת-מרחבים של V עם U⊆W או W⊆U. הוכיחו ש-U∪W הוא תת-מרחב. הוכיחו גם את הכיוון ההפוך.',
    solution: 'אם U⊆W אז U∪W=W, תת-מרחב.\nכיוון הפוך: אם U∪W תת-מרחב, ניקח u∈U\\W, w∈W\\U, אז u+w חייב להיות ב-U או ב-W, מה שמוביל לסתירה.',
  },
  'hw-4-6': {
    question: 'האם מרחב וקטורי יכול להיכתב כאיחוד לא-טריוויאלי של שני תתי-מרחבים ממש? הוכיחו או הפריכו.',
    solution: 'מעל שדות אינסופיים: לא (הוכחה בשלילה דרך u+w).\nמעל F₂: כן, למשל F₂²=Sp{e₁}∪Sp{e₂}∪Sp{e₁+e₂}.',
  },

  // ── HW 5: פרישה ──
  'hw-5-1': {
    question: 'הוכיחו/הפריכו: (א) Sp{v₁}⊆Sp{v₂,v₃} ⟹ v₁∈Sp{v₂} או v₁∈Sp{v₃}. (ב) v∈Sp{v₁,v₂,v₃}, v∉Sp{v₁,v₂} ⟹ v₃∉Sp{v₁,v₂}.',
    solution: '(א) לא נכון. v₁=(1,1), v₂=(1,0), v₃=(0,1). v₁∈Sp{v₂,v₃} אבל v₁∉Sp{v₂} ו-v₁∉Sp{v₃}.\n(ב) נכון. אם v₃∈Sp{v₁,v₂} אז Sp{v₁,v₂,v₃}=Sp{v₁,v₂}, סתירה.',
  },
  'hw-5-2': {
    question: 'עבור כל קבוצה, הוכיחו שהיא מרחב וקטורי על ידי מציאת קבוצה פורשת.',
    solution: 'מבטאים איברים כצירופים לינאריים. מראים V=Sp{קבוצה פורשת}. מוודאים שהקבוצה הפורשת שייכת ל-V.',
  },
  'hw-5-4': {
    question: 'יהיו v₁,v₂,v₃,v,w ∈ V, v₃∈Sp{v₁,v₂}, v∈Sp{v₁,v₂,v₃}. הוכיחו: Sp{v₁,v₂,v,w}=Sp{v₁,v₂,w}.',
    solution: 'מכיוון ש-v₃∈Sp{v₁,v₂} ו-v∈Sp{v₁,v₂,v₃}=Sp{v₁,v₂}, הסרת v₃ ו-v לא משנה את הפרישה.',
  },

  // ── HW 6: תלות/אי-תלות לינארית ──
  'hw-6-1a': {
    question: 'הוכיחו ש-u₁=(1,-3,2), u₂=(2,-1,1), u₃=(3,-4,3) תלויים לינארית ב-ℝ³.',
    solution: 'u₁ + u₂ = u₃, לכן u₁ + u₂ - u₃ = 0. צירוף לא-טריוויאלי ⟹ תלויים.',
  },
  'hw-6-1b': {
    question: 'הוכיחו ש-w₁=(1,0,i), w₂=(i,1,1), w₃=(1,i,0) בלתי תלויים לינארית ב-ℂ³.',
    solution: 'בונים מטריצת מקדמים, מדרגים. det ≠ 0 ⟹ רק פתרון טריוויאלי ⟹ בת״ל.',
  },
  'hw-6-2': {
    question: 'יהי α∈Z₅. עבור אילו ערכי α הוקטורים u₁,u₂,u₃ ∈ Z₅³ בלתי תלויים לינארית?',
    solution: 'מדרגים את מטריצת הוקטורים מעל Z₅. מוצאים אילו ערכי α נותנים דרגה מלאה (כל הפיבוטים).',
  },
  'hw-6-4': {
    question: 'יהיו v₁,...,vₖ,u,v ∈ V. אם {v₁,...,vₖ,u} בת״ל ו-v∈Sp{v₁,...,vₖ}, הוכיחו ש-{v₁,...,vₖ,u+v} בת״ל.',
    solution: 'נניח α₁v₁+...+αₖvₖ+β(u+v)=0. מכיוון ש-v=Σcᵢvᵢ: (α₁+βc₁)v₁+...+βu=0.\nמבת״ל של {v₁,...,vₖ,u}, β=0, ואז כל αᵢ=0.',
  },

  // ── HW 8: כפל מטריצות, בסיס ומימד ──
  'hw-8-1': {
    question: 'נסחו דיסטריביוטיביות ואסוציאטיביות למטריצות. חשבו מכפלות מטריצות נתונות.',
    solution: 'דיסטריביוטיביות: (A₂+A₃)A₁ = A₂A₁+A₃A₁.\nאסוציאטיביות: (CA)B = C(AB).\nחשבו מכפלות ישירות.',
  },
  'hw-8-3': {
    question: 'נתונים תת-מרחבים W₁,W₂ של V. מצאו בסיס ומימד. אמתו את נוסחת המימדים.',
    solution: 'מוצאים בסיס לכל תת-מרחב, מחשבים מימדים.\nמאמתים: dim(W₁+W₂) = dim(W₁)+dim(W₂)-dim(W₁∩W₂).',
  },
  'hw-8-4': {
    question: 'הוכיחו: dim(W₁+W₂) = dim(W₁)+dim(W₂)-dim(W₁∩W₂). הוכיחו/הפריכו טענות קשורות.',
    solution: 'מתחילים מבסיס לחיתוך, מרחיבים לבסיסים של W₁ ו-W₂, מראים שהאיחוד פורש את W₁+W₂ ובת״ל.',
  },

  // ── HW 9: הפיכות מטריצות ──
  'hw-9-1': {
    question: 'חשבו את ההופכי של כל מטריצה, או הוכיחו שהיא לא הפיכה.',
    solution: 'משתמשים בדירוג שורות על [A|I].\nאם A מצטמצמת ל-I, הצד הימני הוא A⁻¹.\nאם מופיעה שורת אפסים, A לא הפיכה.',
  },
  'hw-9-2': {
    question: 'יהי α∈ℝ. עבור אילו ערכי α המטריצה A הפיכה? כאשר היא הפיכה, מצאו את A⁻¹.',
    solution: 'מדרגים [A|I] עם פרמטר α.\nמוצאים ערכי α שיוצרים שורת אפסים (לא הפיכה).\naחרת מבטאים את A⁻¹ במונחי α.',
  },
  'hw-9-3': {
    question: 'הוכיחו/הפריכו: (א) אם AB הפיכה, אז A,B הפיכות. (ב) אם A²=I אז A הפיכה.',
    solution: '(א) נכון. ל-(AB) יש הופכי, ולכן B(AB)⁻¹ הופכי ימני של A.\n(ב) נכון. A²=I ⟹ A·A=I ⟹ A⁻¹=A.',
  },

  // ── HW 10: הפיכות, מערכות שקולות, עקבה ──
  'hw-10-1': {
    question: 'יהי P הפיכה. הוכיחו/הפריכו: (א) Ax=0 ו-(PA)x=0 שקולות. (ב) Ax=b ו-PAx=b שקולות.',
    solution: '(א) נכון. אם Ax=0 אז (PA)x=P(Ax)=P0=0. הפוך: (PA)x=0 ⟹ P⁻¹(PA)x=Ax=0.\n(ב) לא נכון. דוגמה נגדית עם מטריצות 2×2.',
  },
  'hw-10-2': {
    question: 'יהיו A,B∈Mₙ(F) עם A+B=A³. (א) הוכיחו: B הפיכה ⟹ A הפיכה. (ב) שאלת גרעין קשורה.',
    solution: '(א) B=A³-A=A(A²-I). B הפיכה ⟹ ל-A יש הופכי ימני (A²-I)B⁻¹.\nמטריצה ריבועית עם הופכי ימני היא הפיכה.',
  },
  'hw-10-4': {
    question: 'תהי A∈Mₙ(ℝ) עם A²=A (אידמפוטנטית). הוכיחו תכונות של A ו-I-A.',
    solution: 'A²=A ⟹ (I-A)²=I-2A+A²=I-2A+A=I-A.\nכמו כן rank(A)+rank(I-A)=n.',
  },
  'hw-10-6': {
    question: 'תכונות עקבה: tr(AB)=tr(BA), tr(A+B)=tr(A)+tr(B), והוכחות קשורות.',
    solution: 'tr(AB)=Σᵢ(AB)ᵢᵢ=ΣᵢΣⱼaᵢⱼbⱼᵢ=ΣⱼΣᵢbⱼᵢaᵢⱼ=Σⱼ(BA)ⱼⱼ=tr(BA).',
  },

  // ── HW 11: דטרמיננטות ──
  'hw-11-1': {
    question: 'יהי α∈Z₅. חשבו det(A) עבור A∈M₅(Z₅). מצאו α שעבורם A סינגולרית.',
    solution: 'מדרגים מעל Z₅ (כל החשבון מודולו 5). det≠0 ⟹ הפיכה. מוצאים α שעבורם det=0.',
  },
  'hw-11-3': {
    question: 'הוכיחו/הפריכו טענות על דטרמיננטות: det(A+B), det(cA), det(Aᵀ).',
    solution: 'det(cA)=cⁿdet(A). det(Aᵀ)=det(A).\ndet(A+B)≠det(A)+det(B) בכלליות (דוגמה נגדית).',
  },

  // ── HW 12: חישובי דטרמיננטות ──
  'hw-12-1': {
    question: 'חשבו את הדטרמיננטה של מטריצות 4×4 ו-5×5 נתונות בעזרת פיתוח קופקטורים.',
    solution: 'בוחרים שורה/עמודה עם הכי הרבה אפסים.\nמפעילים פיתוח קופקטורים: det(A) = Σⱼ (-1)^(i+j) aᵢⱼ Mᵢⱼ.',
  },
  'hw-12-2': {
    question: 'חשבו det של מטריצה n×n תלת-אלכסונית A עם דפוס מסוים. מצאו נוסחת נסיגה.',
    solution: 'פיתוח לפי שורה ראשונה: det(Aₙ) = a·det(Aₙ₋₁) - bc·det(Aₙ₋₂). פותרים נוסחת נסיגה.',
  },
  'hw-12-5': {
    question: 'חשבו det של מטריצה n×n עם דפוס מסוים. השתמשו בפעולות שורה ואינדוקציה.',
    solution: 'מפעילים פעולות שורה לפישוט. משתמשים באינדוקציה על n לנוסחה הכללית.',
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
