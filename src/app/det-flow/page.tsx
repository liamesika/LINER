'use client';

import { useState } from 'react';
import { GitBranch, ChevronDown, ChevronUp, ArrowDown, BookOpen, Lightbulb, Wrench, AlertTriangle } from 'lucide-react';

// =============================================
// Determinant Flow Data
// =============================================

interface Concept {
  id: string;
  type: 'definition' | 'theorem' | 'technique' | 'corollary' | 'warning';
  title: string;
  meaning: string;
  dependsOn: string[];
  leadsTo: string[];
  layer: number;
  important?: boolean;
  condition?: string;
}

const concepts: Concept[] = [
  // ========== LAYER 1: DEFINITION ==========
  {
    id: 'det-def',
    type: 'definition',
    title: 'דטרמיננטה — הגדרה (רקורסיבית)',
    meaning: 'det: Mₙ(F) → F\nמוגדרת רקורסיבית:\n• det([a]) = a  (מטריצה 1×1)\n• det(A) = Σⱼ (-1)^{1+j} · a₁ⱼ · det(A₁ⱼ)  (פיתוח לפי שורה 1)\n\nA₁ⱼ = Minor — המטריצה שנשארת אחרי מחיקת שורה 1 ועמודה j.',
    dependsOn: [],
    leadsTo: ['cofactor-expansion', 'det-identity', 'multilinear'],
    layer: 1,
    important: true,
  },
  {
    id: 'det-identity',
    type: 'theorem',
    title: 'det(Iₙ) = 1',
    meaning: 'הדטרמיננטה של מטריצת היחידה שווה 1.\nזו תכונת נורמליזציה בסיסית.',
    dependsOn: ['det-def'],
    leadsTo: ['det-invertible'],
    layer: 1,
  },

  // ========== LAYER 2: CORE PROPERTIES ==========
  {
    id: 'multilinear',
    type: 'theorem',
    title: 'רב-לינאריות (מולטי-לינאריות)',
    meaning: 'det לינארית בכל שורה בנפרד:\n\n1. det(..., αRᵢ, ...) = α · det(..., Rᵢ, ...)\n   כפל שורה בסקלר → det נכפל בסקלר\n\n2. det(..., Rᵢ + R\'ᵢ, ...) = det(..., Rᵢ, ...) + det(..., R\'ᵢ, ...)\n   פיצול שורה → סכום דטרמיננטות\n\nזה לא אומר ש-det(A+B) = det(A) + det(B)!',
    dependsOn: ['det-def'],
    leadsTo: ['row-scalar', 'det-zero-row', 'det-alpha-A'],
    layer: 2,
    important: true,
  },
  {
    id: 'alternating',
    type: 'theorem',
    title: 'חילופיות — החלפת שורות',
    meaning: 'החלפת שתי שורות → det מוכפל ב-(-1).\n\ndet(..., Rᵢ, ..., Rⱼ, ...) = -det(..., Rⱼ, ..., Rᵢ, ...)\n\nמסקנה: אם שתי שורות שוות → det = 0\n(כי החלפה לא משנה אבל כופל ב-(-1), אז det = -det → det = 0).',
    dependsOn: ['det-def'],
    leadsTo: ['row-swap', 'det-equal-rows', 'det-ld-rows'],
    layer: 2,
    important: true,
  },

  // ========== LAYER 3: ROW OPERATIONS ==========
  {
    id: 'row-swap',
    type: 'theorem',
    title: 'פעולה I: Rᵢ ↔ Rⱼ',
    meaning: 'החלפת שורות → det נכפל ב-(-1).\n\ndet(A\') = -det(A)\n\nזה נובע ישירות מתכונת החילופיות.',
    dependsOn: ['alternating'],
    leadsTo: ['det-via-reduction', 'det-elementary'],
    layer: 3,
    important: true,
    condition: 'det × (-1)',
  },
  {
    id: 'row-scalar',
    type: 'theorem',
    title: 'פעולה II: Rᵢ → αRᵢ',
    meaning: 'כפל שורה בסקלר α ≠ 0 → det נכפל ב-α.\n\ndet(A\') = α · det(A)\n\nזה נובע ישירות מרב-לינאריות.',
    dependsOn: ['multilinear'],
    leadsTo: ['det-via-reduction', 'det-elementary', 'det-alpha-A'],
    layer: 3,
    important: true,
    condition: 'det × α',
  },
  {
    id: 'row-add',
    type: 'theorem',
    title: 'פעולה III: Rᵢ → Rᵢ + αRⱼ',
    meaning: 'הוספת כפולה של שורה אחת לשורה אחרת → det לא משתנה!\n\ndet(A\') = det(A)\n\nזו הפעולה הכי "בטוחה" — לא משנה את הדטרמיננטה.',
    dependsOn: ['multilinear', 'alternating'],
    leadsTo: ['det-via-reduction', 'det-elementary'],
    layer: 3,
    important: true,
    condition: 'det לא משתנה',
  },

  // ========== LAYER 4: IMMEDIATE CONSEQUENCES ==========
  {
    id: 'det-zero-row',
    type: 'corollary',
    title: 'שורת אפסים → det = 0',
    meaning: 'אם למטריצה יש שורת אפסים, אז det(A) = 0.\n\nהוכחה: שורת אפסים = 0·שורה כלשהי.\nמרב-לינאריות: det = 0 · det(...) = 0.',
    dependsOn: ['multilinear'],
    leadsTo: ['det-ld-rows'],
    layer: 4,
  },
  {
    id: 'det-equal-rows',
    type: 'corollary',
    title: 'שורות שוות → det = 0',
    meaning: 'אם Rᵢ = Rⱼ (שתי שורות זהות), אז det(A) = 0.\n\nהוכחה: החלפת Rᵢ ↔ Rⱼ לא משנה את המטריצה אבל כופלת det ב-(-1).\nלכן det = -det → 2·det = 0 → det = 0.\n\n(מעל שדה שבו 2 ≠ 0)',
    dependsOn: ['alternating'],
    leadsTo: ['det-ld-rows'],
    layer: 4,
  },
  {
    id: 'det-ld-rows',
    type: 'theorem',
    title: 'שורות ת"ל → det = 0',
    meaning: 'אם שורות A תלויות לינארית, אז det(A) = 0.\n\nהוכחה: אם Rᵢ = Σⱼ≠ᵢ αⱼRⱼ, בצע Rᵢ → Rᵢ - Σαⱼ Rⱼ (פעולה III, לא משנה det).\nמקבלים שורת אפסים → det = 0.\n\nגרסה שקולה: det(A) ≠ 0 ⟹ שורות A בת"ל.',
    dependsOn: ['det-zero-row', 'det-equal-rows', 'row-add'],
    leadsTo: ['det-invertible'],
    layer: 4,
    important: true,
  },
  {
    id: 'det-alpha-A',
    type: 'corollary',
    title: 'det(αA) = αⁿ · det(A)',
    meaning: 'אם A ∈ Mₙ(F), אז:\ndet(αA) = αⁿ · det(A)\n\nהסבר: αA = כפל כל שורה ב-α. יש n שורות, כל אחת תורמת α.\nלכן: α^n.\n\nטעות נפוצה: det(2A) ≠ 2·det(A)!  (= 2ⁿ·det(A))',
    dependsOn: ['multilinear', 'row-scalar'],
    leadsTo: [],
    layer: 4,
    condition: 'n = גודל המטריצה',
  },

  // ========== LAYER 5: TRANSPOSE + COFACTORS ==========
  {
    id: 'det-transpose',
    type: 'theorem',
    title: 'det(Aᵗ) = det(A)',
    meaning: 'הדטרמיננטה לא משתנה בשחלוף.\n\nמשמעות: כל מה שנכון לשורות — נכון גם לעמודות!\n• עמודות ת"ל → det = 0\n• החלפת עמודות → det × (-1)\n• כפל עמודה בסקלר → det × α\n• הוספת כפולת עמודה → det לא משתנה',
    dependsOn: ['det-def'],
    leadsTo: ['cofactor-expansion', 'det-ld-rows'],
    layer: 5,
    important: true,
  },
  {
    id: 'cofactor-expansion',
    type: 'technique',
    title: 'פיתוח קופקטורים',
    meaning: 'אפשר לפתח לפי כל שורה i:\ndet(A) = Σⱼ (-1)^{i+j} · aᵢⱼ · det(Aᵢⱼ)\n\nאו לפי כל עמודה j:\ndet(A) = Σᵢ (-1)^{i+j} · aᵢⱼ · det(Aᵢⱼ)\n\nטיפ: תמיד בחרו את השורה/עמודה עם הכי הרבה אפסים!',
    dependsOn: ['det-def', 'det-transpose'],
    leadsTo: ['det-triangular', 'det-blocks', 'det-via-reduction'],
    layer: 5,
    important: true,
  },

  // ========== LAYER 6: ELEMENTARY MATRICES ==========
  {
    id: 'det-elementary',
    type: 'theorem',
    title: 'דטרמיננטה של מטריצות אלמנטריות',
    meaning: 'E₁ (החלפת שורות): det(E₁) = -1\nE₂ (כפל שורה ב-α):  det(E₂) = α\nE₃ (הוספת כפולה):   det(E₃) = 1\n\nעובדה מפתח: det(E·A) = det(E) · det(A)\nכלומר: הפעלת פעולה אלמנטרית = כפל ב-det של המטריצה האלמנטרית.',
    dependsOn: ['row-swap', 'row-scalar', 'row-add'],
    leadsTo: ['det-product'],
    layer: 6,
    important: true,
  },

  // ========== LAYER 7: MULTIPLICATIVITY ==========
  {
    id: 'det-product',
    type: 'theorem',
    title: 'det(AB) = det(A) · det(B)',
    meaning: 'הדטרמיננטה כפלית!\n\ndet(AB) = det(A) · det(B)\n\nזה עובד לכל A, B ∈ Mₙ(F) — לא משנה אם הפיכות או לא.\n\nהוכחה: כל מטריצה הפיכה היא מכפלת אלמנטריות.\nאם A לא הפיכה: rank(A) < n → rank(AB) < n → det(AB) = 0 = 0 · det(B).',
    dependsOn: ['det-elementary'],
    leadsTo: ['det-inverse', 'det-invertible', 'det-similar'],
    layer: 7,
    important: true,
  },
  {
    id: 'det-inverse',
    type: 'corollary',
    title: 'det(A⁻¹) = 1 / det(A)',
    meaning: 'אם A הפיכה:\ndet(A · A⁻¹) = det(I) = 1\ndet(A) · det(A⁻¹) = 1\n\nלכן: det(A⁻¹) = 1/det(A)\n\nתנאי: A הפיכה (כלומר det(A) ≠ 0, אז אפשר לחלק).',
    dependsOn: ['det-product'],
    leadsTo: [],
    layer: 7,
    condition: 'A הפיכה',
  },
  {
    id: 'det-similar',
    type: 'corollary',
    title: 'det(Aⁿ) = (det A)ⁿ',
    meaning: 'מכפליות חוזרת:\ndet(A²) = det(A·A) = det(A)·det(A) = (det A)²\ndet(A³) = (det A)³\n...\ndet(Aⁿ) = (det A)ⁿ\n\nועבור הופכית: det(A⁻ⁿ) = (det A)⁻ⁿ = 1/(det A)ⁿ',
    dependsOn: ['det-product', 'det-inverse'],
    leadsTo: [],
    layer: 7,
  },

  // ========== LAYER 8: THE BIG THEOREM ==========
  {
    id: 'det-invertible',
    type: 'theorem',
    title: 'det(A) ≠ 0 ⟺ A הפיכה',
    meaning: 'המשפט המרכזי! זה תנאי 8 מתוך 9 התנאים השקולים להפיכות:\n\n1. A הפיכה\n2. RREF(A) = I\n3. rank(A) = n\n4. שורות A בת"ל\n5. עמודות A בת"ל\n6. Ax = 0 רק פתרון טריוויאלי\n7. Ax = b פתרון יחיד לכל b\n8. det(A) ≠ 0 ←←← זה!\n9. A = מכפלת מטריצות אלמנטריות\n\nכל אחד מ-9 התנאים שקול לכל אחד אחר.',
    dependsOn: ['det-ld-rows', 'det-product', 'det-identity'],
    leadsTo: ['system-det', 'det-check-invertible'],
    layer: 8,
    important: true,
  },
  {
    id: 'system-det',
    type: 'corollary',
    title: 'מערכת Ax = b + det',
    meaning: 'Ax = b, כאשר A ∈ Mₙ(F):\n\ndet(A) ≠ 0 → פתרון יחיד (x = A⁻¹b)\ndet(A) = 0 → אין פתרון או אינסוף (תלוי ב-b)\n\nעבור מערכת הומוגנית Ax = 0:\ndet(A) ≠ 0 → רק x = 0\ndet(A) = 0 → יש אינסוף פתרונות (∃ משתנים חופשיים)',
    dependsOn: ['det-invertible'],
    leadsTo: ['system-parameter'],
    layer: 8,
    important: true,
  },

  // ========== LAYER 9: COMPUTATION TECHNIQUES ==========
  {
    id: 'det-triangular',
    type: 'theorem',
    title: 'מטריצה משולשית: det = מכפלת האלכסון',
    meaning: 'אם A משולשית (עליונה או תחתונה):\n\ndet(A) = a₁₁ · a₂₂ · ... · aₙₙ\n\nזה מכפלת האיברים על האלכסון בלבד!\n\nמקרה פרטי: מטריצה אלכסונית — גם מכפלת האלכסון.',
    dependsOn: ['cofactor-expansion'],
    leadsTo: ['det-via-reduction', 'det-blocks'],
    layer: 9,
    important: true,
  },
  {
    id: 'det-via-reduction',
    type: 'technique',
    title: 'חישוב det ע"י דירוג',
    meaning: 'אלגוריתם:\n1. דרג את A למטריצה משולשית עליונה U\n2. ספור: כמה החלפות שורות (k)? כמה כפל בסקלר (α₁,...,αₘ)?\n3. det(A) = (-1)^k · (1/α₁·...·αₘ) · det(U)\n4. det(U) = מכפלת האלכסון\n\nבפרט: אם השתמשת רק בפעולה III → det(A) = det(U) = מכפלת האלכסון.',
    dependsOn: ['row-swap', 'row-scalar', 'row-add', 'det-triangular'],
    leadsTo: ['det-check-invertible'],
    layer: 9,
    important: true,
  },
  {
    id: 'det-blocks',
    type: 'theorem',
    title: 'דטרמיננטת בלוקים משולשית',
    meaning: 'אם K = [[A, C], [0, B]] (בלוקים משולשית עליונה):\n\ndet(K) = det(A) · det(B)\n\nעובד גם למשולשית תחתונה: K = [[A, 0], [D, B]].\n\nלא חייב שהבלוקים יהיו באותו גודל!\nA ∈ Mₖ, B ∈ Mₗ → K ∈ M_{k+ℓ}.',
    dependsOn: ['cofactor-expansion', 'det-triangular'],
    leadsTo: [],
    layer: 9,
    important: true,
  },

  // ========== LAYER 10: EXAM APPLICATIONS ==========
  {
    id: 'system-parameter',
    type: 'technique',
    title: 'מערכת עם פרמטר α',
    meaning: 'אלגוריתם:\n1. כתוב מטריצת מקדמים A(α)\n2. חשב det(A(α)) — מקבלים פולינום ב-α\n3. מצא מתי det = 0 (שורשי הפולינום)\n\nα שנותן det ≠ 0 → פתרון יחיד\nα שנותן det = 0 → הצב ובדוק:\n   • סתירה → אין פתרון\n   • שורת אפסים → אינסוף פתרונות\n\nזכור: לפעמים אין α שנותן אינסוף!',
    dependsOn: ['system-det'],
    leadsTo: [],
    layer: 10,
    important: true,
  },
  {
    id: 'det-check-invertible',
    type: 'technique',
    title: 'בדיקת הפיכות ע"י det',
    meaning: 'כדי לבדוק אם A הפיכה:\n\nדרך 1: חשב det(A). אם ≠ 0 → הפיכה. אם = 0 → לא.\nדרך 2: דרג. אם RREF = I → הפיכה. אם יש שורת אפסים → לא.\n\nשתי הדרכים שקולות, אבל det לפעמים מהיר יותר (במיוחד 2×2, 3×3).',
    dependsOn: ['det-invertible', 'det-via-reduction'],
    leadsTo: [],
    layer: 10,
  },
  {
    id: 'det-spot-dependency',
    type: 'technique',
    title: 'זיהוי תלות לפני חישוב',
    meaning: 'לפני שמחשבים det של מטריצה גדולה (4×4+):\n\n1. בדוק הפרשים קבועים בשורות → סדרה חשבונית → תלות\n2. בדוק שורה/עמודה של אפסים → det = 0 מייד\n3. בדוק שורות פרופורציונליות → det = 0\n4. נסה 2Rᵢ - Rⱼ — אולי מקבלים שורה שלישית\n\nמציאת תלות = חוסכת 20 דקות חישוב!',
    dependsOn: ['det-ld-rows'],
    leadsTo: [],
    layer: 10,
    important: true,
  },
  {
    id: 'det-2x2',
    type: 'technique',
    title: 'נוסחאות מהירות: 2×2 ו-3×3',
    meaning: '2×2: det[[a,b],[c,d]] = ad - bc\n\n3×3 (כלל סארוס): פיתוח לפי שורה ראשונה:\ndet = a₁₁(a₂₂a₃₃ - a₂₃a₃₂)\n    - a₁₂(a₂₁a₃₃ - a₂₃a₃₁)\n    + a₁₃(a₂₁a₃₂ - a₂₂a₃₁)\n\nאו: אלכסונים ראשיים (+) פחות אלכסונים משניים (-)',
    dependsOn: ['cofactor-expansion'],
    leadsTo: [],
    layer: 10,
  },
];

// =============================================
// Layer Configuration
// =============================================

const layerConfig: Record<number, { title: string; subtitle: string; gradient: string }> = {
  1: { title: 'שכבה 1 — הגדרה', subtitle: 'מה זו דטרמיננטה?', gradient: 'from-slate-600 to-slate-700' },
  2: { title: 'שכבה 2 — תכונות ליבה', subtitle: 'רב-לינאריות וחילופיות', gradient: 'from-violet-500 to-purple-600' },
  3: { title: 'שכבה 3 — פעולות שורה', subtitle: 'מה כל פעולה עושה ל-det?', gradient: 'from-blue-500 to-indigo-600' },
  4: { title: 'שכבה 4 — מסקנות מיידיות', subtitle: 'מתי det = 0?', gradient: 'from-red-500 to-rose-600' },
  5: { title: 'שכבה 5 — שחלוף + פיתוח', subtitle: 'det(Aᵗ) = det(A) + כלי חישוב', gradient: 'from-teal-500 to-cyan-600' },
  6: { title: 'שכבה 6 — מטריצות אלמנטריות', subtitle: 'det(E·A) = det(E)·det(A)', gradient: 'from-amber-500 to-orange-600' },
  7: { title: 'שכבה 7 — כפליות', subtitle: 'det(AB) = det(A)·det(B)', gradient: 'from-green-500 to-emerald-600' },
  8: { title: 'שכבה 8 — המשפט המרכזי', subtitle: 'det ≠ 0 ⟺ הפיכה', gradient: 'from-rose-600 to-red-700' },
  9: { title: 'שכבה 9 — טכניקות חישוב', subtitle: 'משולשית, דירוג, בלוקים', gradient: 'from-indigo-500 to-blue-600' },
  10: { title: 'שכבה 10 — שימושים במבחן', subtitle: 'פרמטר, הפיכות, תלות', gradient: 'from-purple-600 to-violet-700' },
};

// =============================================
// Type Configuration
// =============================================

const typeConfig = {
  definition: { label: 'הגדרה', bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800', icon: BookOpen },
  theorem: { label: 'משפט', bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-800', icon: Lightbulb },
  corollary: { label: 'מסקנה', bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-800', icon: Lightbulb },
  technique: { label: 'טכניקה', bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800', icon: Wrench },
  warning: { label: 'אזהרה', bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-800', icon: AlertTriangle },
};

// =============================================
// Components
// =============================================

function ConceptCard({ concept, allConcepts, forceExpand }: { concept: Concept; allConcepts: Concept[]; forceExpand: boolean }) {
  const [manualExpand, setManualExpand] = useState<boolean | null>(null);
  const cfg = typeConfig[concept.type];
  const Icon = cfg.icon;
  const isExpanded = manualExpand !== null ? manualExpand : (forceExpand || (concept.important ?? false));

  const deps = concept.dependsOn
    .map(id => allConcepts.find(c => c.id === id))
    .filter(Boolean) as Concept[];
  const leads = concept.leadsTo
    .map(id => allConcepts.find(c => c.id === id))
    .filter(Boolean) as Concept[];

  return (
    <div className={`rounded-xl border-2 ${cfg.border} ${concept.important ? 'ring-2 ring-offset-1 ring-yellow-300' : ''} overflow-hidden transition-all duration-200`}>
      <button
        onClick={() => setManualExpand(prev => prev === null ? !isExpanded : !prev)}
        className={`w-full flex items-center gap-3 p-4 text-right ${cfg.bg} hover:brightness-95 transition-all`}
      >
        <Icon className="w-5 h-5 shrink-0 text-gray-600" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>{cfg.label}</span>
            {concept.important && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">חשוב</span>}
            {concept.condition && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">{concept.condition}</span>}
          </div>
          <h3 className="font-bold text-gray-900 mt-1">{concept.title}</h3>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>

      {isExpanded && (
        <div className="p-4 bg-white space-y-3">
          <div className="whitespace-pre-line text-sm leading-relaxed text-gray-800 font-mono bg-gray-50 rounded-lg p-3 border border-gray-100">
            {concept.meaning}
          </div>

          {deps.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">מסתמך על:</p>
              <div className="flex flex-wrap gap-1.5">
                {deps.map(d => (
                  <span key={d.id} className={`text-xs px-2 py-1 rounded-full ${typeConfig[d.type].badge}`}>{d.title}</span>
                ))}
              </div>
            </div>
          )}

          {leads.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">מוביל ל:</p>
              <div className="flex flex-wrap gap-1.5">
                {leads.map(l => (
                  <span key={l.id} className={`text-xs px-2 py-1 rounded-full ${typeConfig[l.type].badge}`}>{l.title}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================
// Main Page
// =============================================

export default function DetFlowPage() {
  const [expandAll, setExpandAll] = useState(false);
  const layers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GitBranch className="w-7 h-7 text-violet-600" />
          עץ דטרמיננטות — מה גורר מה?
        </h1>
        <p className="text-gray-500 mt-1">כל המשפטים, התכונות והקשרים — מההגדרה ועד השימושים במבחן</p>
        <p className="text-gray-400 text-xs mt-1">הרצאות 21-25</p>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-100 text-blue-800">הגדרה</span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-green-100 text-green-800">משפט</span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800">מסקנה</span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-orange-100 text-orange-800">טכניקה</span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800">חשוב</span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-purple-100 text-purple-800">תנאי</span>
          </div>
          <button
            onClick={() => setExpandAll(!expandAll)}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {expandAll ? 'כווץ הכל' : 'פתח הכל'}
          </button>
        </div>
      </div>

      {/* The Big Picture */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-xl p-6 text-white">
        <h2 className="text-lg font-bold mb-3">התמונה הגדולה — עץ הדטרמיננטות</h2>
        <div className="text-sm leading-relaxed space-y-2 text-violet-100">
          <p><strong className="text-white">הגדרה:</strong> det מוגדרת רקורסיבית (פיתוח קופקטורים).</p>
          <p><strong className="text-white">תכונות ליבה:</strong> <strong className="text-yellow-200">רב-לינאריות</strong> (לינארית בכל שורה) + <strong className="text-yellow-200">חילופיות</strong> (החלפה → ×(-1)). שתי התכונות האלה גוררות הכל!</p>
          <p><strong className="text-white">פעולות שורה:</strong> החלפה → ×(-1), כפל → ×α, הוספה → ללא שינוי.</p>
          <p><strong className="text-white">המשפט הגדול:</strong> det(AB) = det(A)·det(B) → ומכאן: <strong className="text-yellow-200">det ≠ 0 ⟺ הפיכה</strong>.</p>
          <p><strong className="text-white">שימושים:</strong> מערכות עם פרמטר, בדיקת הפיכות, זיהוי תלות, חישוב ע&quot;י דירוג.</p>
        </div>
      </div>

      {/* Row Operations Quick Reference */}
      <div className="bg-white rounded-xl border-2 border-blue-200 p-5">
        <h2 className="font-bold text-blue-800 text-lg mb-3">תרשים מהיר — פעולות שורה ו-det</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
            <div className="text-2xl font-bold text-blue-700 mb-1">Rᵢ ↔ Rⱼ</div>
            <div className="text-sm text-blue-600">החלפת שורות</div>
            <div className="mt-2 bg-blue-600 text-white rounded-lg py-1.5 font-bold">det × (-1)</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
            <div className="text-2xl font-bold text-green-700 mb-1">Rᵢ → αRᵢ</div>
            <div className="text-sm text-green-600">כפל שורה בסקלר</div>
            <div className="mt-2 bg-green-600 text-white rounded-lg py-1.5 font-bold">det × α</div>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-200">
            <div className="text-2xl font-bold text-amber-700 mb-1">Rᵢ → Rᵢ + αRⱼ</div>
            <div className="text-sm text-amber-600">הוספת כפולת שורה</div>
            <div className="mt-2 bg-amber-600 text-white rounded-lg py-1.5 font-bold">det לא משתנה!</div>
          </div>
        </div>
      </div>

      {/* Implication Chain */}
      <div className="bg-white rounded-xl border-2 border-rose-200 p-5">
        <h2 className="font-bold text-rose-800 text-lg mb-3">שרשרת הגררות המרכזית</h2>
        <div className="space-y-2">
          {[
            { from: 'רב-לינאריות + חילופיות', to: 'שורות ת"ל → det = 0', color: 'text-violet-700' },
            { from: 'det(E·A) = det(E)·det(A)', to: 'det(AB) = det(A)·det(B)', color: 'text-blue-700' },
            { from: 'det(AB) = det(A)·det(B) + det(I)=1', to: 'A הפיכה ⟺ det(A) ≠ 0', color: 'text-green-700' },
            { from: 'det(A) ≠ 0 ⟺ A הפיכה', to: 'Ax=b: det≠0 → יחיד, det=0 → אין/אינסוף', color: 'text-rose-700' },
            { from: 'det(Aᵗ) = det(A)', to: 'כל מה שנכון לשורות נכון גם לעמודות', color: 'text-teal-700' },
          ].map(({ from, to, color }, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="bg-gray-100 rounded-lg px-3 py-1.5 font-mono text-xs text-gray-700 shrink-0">{from}</span>
              <span className="text-gray-400 font-bold shrink-0">⟹</span>
              <span className={`font-bold ${color}`}>{to}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Layer Sections */}
      {layers.map((layerNum) => {
        const lCfg = layerConfig[layerNum];
        const layerConcepts = concepts.filter(c => c.layer === layerNum);
        if (layerConcepts.length === 0) return null;

        return (
          <div key={layerNum} className="space-y-3">
            <div className={`bg-gradient-to-r ${lCfg.gradient} rounded-xl p-4 text-white`}>
              <h2 className="text-lg font-bold">{lCfg.title}</h2>
              <p className="text-sm opacity-80">{lCfg.subtitle}</p>
            </div>
            <div className="space-y-3 relative">
              {layerConcepts.map((concept, idx) => (
                <div key={concept.id}>
                  <ConceptCard concept={concept} allConcepts={concepts} forceExpand={expandAll} />
                  {idx < layerConcepts.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="w-4 h-4 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Summary Cheat Sheet */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">סיכום מהיר — &quot;מתי det = 0?&quot;</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 text-sm mb-2">det = 0 כאשר:</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• שורת/עמודת אפסים</li>
              <li>• שתי שורות/עמודות שוות</li>
              <li>• שורות/עמודות ת&quot;ל</li>
              <li>• rank(A) &lt; n</li>
              <li>• A לא הפיכה</li>
              <li>• Ax = 0 יש פתרון לא-טריוויאלי</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 text-sm mb-2">det ≠ 0 כאשר:</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• שורות A בת&quot;ל</li>
              <li>• עמודות A בת&quot;ל</li>
              <li>• rank(A) = n</li>
              <li>• A הפיכה</li>
              <li>• RREF(A) = I</li>
              <li>• Ax = b פתרון יחיד לכל b</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="bg-white rounded-xl border-2 border-amber-200 p-6">
        <h2 className="font-bold text-amber-800 text-lg mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          טעויות נפוצות בדטרמיננטות
        </h2>
        <div className="space-y-3">
          {[
            { wrong: 'det(A + B) = det(A) + det(B)', right: 'det לינארית בכל שורה, לא בסכום מטריצות! det(A+B) ≠ det(A) + det(B) בכלל.' },
            { wrong: 'det(2A) = 2·det(A)', right: 'det(αA) = αⁿ·det(A). עבור 2×2: det(2A) = 4·det(A). עבור 3×3: det(2A) = 8·det(A).' },
            { wrong: 'det(AB) = det(A) + det(B)', right: 'det כפלית, לא חיבורית! det(AB) = det(A) · det(B).' },
            { wrong: 'det(Aᵗ) = -det(A)', right: 'det(Aᵗ) = det(A) (שווה, לא מינוס!).' },
            { wrong: 'מתחילים פיתוח 5×5 בלי לבדוק תלות', right: 'תמיד בדוק תלות שורות/עמודות לפני חישוב! הפרשים קבועים = רמז.' },
          ].map(({ wrong, right }, i) => (
            <div key={i} className="flex items-start gap-3 bg-amber-50 rounded-lg p-3 border border-amber-200">
              <span className="text-red-500 font-bold text-sm shrink-0">✗</span>
              <div>
                <p className="text-sm text-red-700 font-mono line-through">{wrong}</p>
                <p className="text-sm text-green-800 mt-1">{right}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
