'use client';

import { useState } from 'react';
import { GitBranch, ChevronDown, ChevronUp, ArrowDown, BookOpen, Lightbulb, Wrench } from 'lucide-react';

// =============================================
// Concept Flow Data — Weeks 5–9
// =============================================

interface Concept {
  id: string;
  type: 'definition' | 'theorem' | 'technique' | 'corollary';
  title: string;
  meaning: string;
  dependsOn: string[];
  leadsTo: string[];
  week: number;
  important?: boolean;
}

const concepts: Concept[] = [
  // ========== WEEK 5 PREREQUISITES ==========
  {
    id: 'lc',
    type: 'definition',
    title: 'צירוף לינארי',
    meaning: 'וקטור v הוא צירוף לינארי של v₁,...,vₖ אם קיימים סקלרים α₁,...,αₖ כך ש:\nv = α₁v₁ + α₂v₂ + ... + αₖvₖ',
    dependsOn: [],
    leadsTo: ['span'],
    week: 5,
  },
  {
    id: 'span',
    type: 'definition',
    title: 'פרישה (Span)',
    meaning: 'Sp(v₁,...,vₖ) = קבוצת כל הצירופים הלינאריים של v₁,...,vₖ.\nזו התשובה לשאלה "מה אפשר לייצר מהוקטורים האלה?"',
    dependsOn: ['lc'],
    leadsTo: ['spanning-set', 'span-subspace'],
    week: 5,
    important: true,
  },
  {
    id: 'spanning-set',
    type: 'definition',
    title: 'קבוצה פורשת',
    meaning: 'S פורשת את V אם Sp(S) = V.\nכלומר: כל וקטור ב-V ניתן לכתיבה כצירוף לינארי של וקטורים ב-S.',
    dependsOn: ['span'],
    leadsTo: ['basis'],
    week: 5,
    important: true,
  },
  {
    id: 'span-subspace',
    type: 'theorem',
    title: 'הפרישה היא תת-מרחב',
    meaning: 'Sp(S) תמיד תת-מרחב של V. יתרה מכך — הוא תת-המרחב הקטן ביותר שמכיל את S.',
    dependsOn: ['span'],
    leadsTo: ['li-def'],
    week: 5,
  },
  {
    id: 'span-add',
    type: 'theorem',
    title: 'הוספה/הסרה מפרישה',
    meaning: 'אם v ∈ Sp(v₁,...,vₖ), אז Sp(v₁,...,vₖ, v) = Sp(v₁,...,vₖ).\nלהוסיף וקטור שכבר בפרישה — לא משנה כלום.',
    dependsOn: ['span'],
    leadsTo: ['ld-predecessors'],
    week: 5,
  },

  // ========== WEEK 6: תלות לינארית ==========
  {
    id: 'li-def',
    type: 'definition',
    title: 'בלתי תלות לינארית (בת"ל)',
    meaning: 'v₁,...,vₖ בלתי-תלויים לינארית אם:\nα₁v₁ + ... + αₖvₖ = 0  ⟹  α₁ = ... = αₖ = 0\nהדרך היחידה לקבל 0 היא שכל המקדמים יהיו 0.',
    dependsOn: ['lc', 'span-subspace'],
    leadsTo: ['ld-def', 'li-properties', 'check-li'],
    week: 6,
    important: true,
  },
  {
    id: 'ld-def',
    type: 'definition',
    title: 'תלות לינארית (ת"ל)',
    meaning: 'v₁,...,vₖ תלויים לינארית אם קיימים סקלרים לא כולם 0 כך ש:\nα₁v₁ + ... + αₖvₖ = 0\nכלומר: יש דרך "לא טריוויאלית" לקבל 0. יש מידע מיותר.',
    dependsOn: ['li-def'],
    leadsTo: ['li-properties', 'ld-predecessors'],
    week: 6,
    important: true,
  },
  {
    id: 'check-li',
    type: 'technique',
    title: 'בדיקת בת"ל/ת"ל ע"י דירוג',
    meaning: 'כותבים α₁v₁ + ... + αₖvₖ = 0, ממירים למערכת הומוגנית Ax = 0, ומדרגים.\n→ רק פתרון טריוויאלי (אין משתנים חופשיים) = בת"ל\n→ יש משתנה חופשי = ת"ל',
    dependsOn: ['li-def', 'ld-def'],
    leadsTo: ['verify-basis'],
    week: 6,
    important: true,
  },
  {
    id: 'li-properties',
    type: 'theorem',
    title: 'תכונות תלות/אי-תלות',
    meaning: '1. וקטור האפס 0 הוא תמיד ת"ל\n2. וקטור בודד v הוא ת"ל ⟺ v = 0\n3. אם יש 0 בין הוקטורים → ת"ל\n4. v,u ת"ל ⟺ אחד הוא כפולה סקלרית של השני\n5. תת-קבוצה של קבוצה בת"ל — גם בת"ל\n6. בת"ל ⟺ הייצוג כצירוף לינארי יחיד',
    dependsOn: ['li-def', 'ld-def'],
    leadsTo: ['ld-predecessors', 'basis'],
    week: 6,
    important: true,
  },
  {
    id: 'ld-predecessors',
    type: 'theorem',
    title: 'ת"ל ⟺ אחד הוא צ"ל של האחרים',
    meaning: 'v₁,...,vₖ ת"ל ⟺ קיים j כך ש-vⱼ ∈ Sp{v₁,...,vⱼ₋₁,vⱼ₊₁,...,vₖ}\nבמילים: אם הוקטורים ת"ל, אפשר "לזרוק" אחד מהם בלי לאבד מידע.\n\nגרסת הקודמים: ת"ל ⟺ ∃j: vⱼ ∈ Sp{v₁,...,vⱼ₋₁}',
    dependsOn: ['ld-def', 'span-add'],
    leadsTo: ['basis', 'extend-basis'],
    week: 6,
    important: true,
  },
  {
    id: 'li-v1v2-equiv',
    type: 'theorem',
    title: '{v₁,v₂} בת"ל ⟺ {v₁+v₂, v₁−v₂} בת"ל',
    meaning: 'מעל R (או כל שדה שבו 1+1≠0):\nאפשר להחליף בסיס של 2 וקטורים בסכום וההפרש שלהם ולשמור על בת"ל.',
    dependsOn: ['li-def'],
    leadsTo: [],
    week: 6,
  },

  // ========== WEEK 7: בסיס ומימד ==========
  {
    id: 'basis',
    type: 'definition',
    title: 'בסיס',
    meaning: 'B = {v₁,...,vₙ} הוא בסיס של V אם:\n① B בלתי-תלויה לינארית\n② B פורשת את V\n\nהבסיס = "מערכת מינימלית שמייצרת הכל".\nשקול: B בסיס ⟺ לכל v ∈ V יש ייצוג יחיד כצ"ל של B.',
    dependsOn: ['li-def', 'spanning-set', 'li-properties'],
    leadsTo: ['std-basis', 'steinitz', 'dim', 'dim-n-equiv', 'verify-basis'],
    week: 7,
    important: true,
  },
  {
    id: 'std-basis',
    type: 'definition',
    title: 'בסיס סטנדרטי',
    meaning: 'הבסיס הסטנדרטי של Fⁿ: {e₁, e₂, ..., eₙ}\nכאשר eᵢ = (0,...,0,1,0,...,0) (1 במקום ה-i).\n\nדוגמאות: dim Fⁿ = n,  dim Mₘₓₙ(F) = m·n,  dim Fₙ[x] = n+1',
    dependsOn: ['basis'],
    leadsTo: ['dim'],
    week: 7,
  },
  {
    id: 'steinitz',
    type: 'theorem',
    title: 'למת שטייניץ (ההחלפה)',
    meaning: 'אם {u₁,...,uₘ} בת"ל ו-{w₁,...,wₙ} פורשת את V, אז:\nm ≤ n\n\nבמילים: קבוצה בת"ל תמיד קטנה-או-שווה מקבוצה פורשת.\nזה המשפט שמאפשר להגדיר מימד!',
    dependsOn: ['basis'],
    leadsTo: ['all-bases-same', 'dim'],
    week: 7,
    important: true,
  },
  {
    id: 'all-bases-same',
    type: 'corollary',
    title: 'כל הבסיסים אותו גודל',
    meaning: 'לכל שני בסיסים של V יש אותו מספר איברים.\n(נובע מלמת שטייניץ: בסיס = בת"ל + פורש, אז שני בסיסים מגבילים זה את זה.)',
    dependsOn: ['steinitz'],
    leadsTo: ['dim'],
    week: 7,
    important: true,
  },
  {
    id: 'dim',
    type: 'definition',
    title: 'מימד (dim)',
    meaning: 'dim(V) = מספר הוקטורים בבסיס כלשהו של V.\n(מוגדר היטב כי כל הבסיסים אותו גודל!)\n\nמוסכמה: dim({0}) = 0.\nדוגמאות: dim(Rⁿ) = n, dim(M₂ₓ₃(R)) = 6',
    dependsOn: ['basis', 'all-bases-same'],
    leadsTo: ['dim-n-equiv', 'dim-formula', 'direct-sum-dim'],
    week: 7,
    important: true,
  },
  {
    id: 'dim-n-equiv',
    type: 'theorem',
    title: 'שקילויות כשיש n וקטורים (dim V = n)',
    meaning: 'אם dim(V) = n וקבוצה B מכילה בדיוק n וקטורים:\nB בסיס ⟺ B בת"ל ⟺ B פורשת\n\nמספיק לבדוק אחד משלושת התנאים!\n\nבנוסף: כל n+1 וקטורים הם ת"ל, וכל n−1 וקטורים לא פורשים.',
    dependsOn: ['dim', 'basis', 'steinitz'],
    leadsTo: ['verify-basis', 'extend-basis'],
    week: 7,
    important: true,
  },
  {
    id: 'verify-basis',
    type: 'technique',
    title: 'בדיקה שקבוצה היא בסיס',
    meaning: 'באופן כללי: צריך לבדוק גם בת"ל וגם פרישה (ע"י דירוג).\n\nאם ידוע dim(V) = n ויש לנו n וקטורים:\nמספיק לבדוק רק בת"ל (או רק פרישה) — והשני נובע אוטומטית!',
    dependsOn: ['dim-n-equiv', 'check-li'],
    leadsTo: [],
    week: 7,
  },

  // ========== WEEK 8: השלמה לבסיס וסכום ישר ==========
  {
    id: 'extend-basis',
    type: 'theorem',
    title: 'השלמה לבסיס',
    meaning: 'כל קבוצה בת"ל {v₁,...,vₖ} (k < n = dim V) ניתנת להרחבה לבסיס:\nנוסיף vₖ₊₁,...,vₙ כך ש-{v₁,...,vₙ} בסיס של V.\n\nגם ההפך: מכל קבוצה פורשת ניתן לחלץ בסיס (ע"י הסרת וקטורים מיותרים).',
    dependsOn: ['dim-n-equiv', 'ld-predecessors'],
    leadsTo: ['extend-algo', 'sum-subspaces'],
    week: 8,
    important: true,
  },
  {
    id: 'extend-algo',
    type: 'technique',
    title: 'אלגוריתם השלמה לבסיס',
    meaning: 'בהינתן {u₁,...,uₖ} בת"ל ב-V = Fⁿ:\n1. מצא את Sp{u₁,...,uₖ} (אילו אילוצים על הרכיבים)\n2. בחר וקטור שלא בפרישה\n3. וודא שעדיין בת"ל (זה תמיד יהיה כך)\n4. חזור עד שיש dim(V) וקטורים',
    dependsOn: ['extend-basis'],
    leadsTo: [],
    week: 8,
  },
  {
    id: 'sum-subspaces',
    type: 'definition',
    title: 'סכום תתי-מרחבים',
    meaning: 'U + W = {u + w : u ∈ U, w ∈ W}\n\nסכום של שני תתי-מרחבים = כל הסכומים האפשריים.\nU + W הוא תת-מרחב, וזה הקטן ביותר שמכיל גם את U וגם את W.',
    dependsOn: ['extend-basis'],
    leadsTo: ['dim-formula', 'direct-sum'],
    week: 8,
    important: true,
  },
  {
    id: 'dim-formula',
    type: 'theorem',
    title: 'נוסחת המימדים (הראשונה)',
    meaning: 'dim(U + W) = dim(U) + dim(W) − dim(U ∩ W)\n\nכמו הכלה-והדחה! מה שנספר פעמיים (החיתוך) מורידים.',
    dependsOn: ['sum-subspaces', 'dim'],
    leadsTo: ['direct-sum-dim'],
    week: 8,
    important: true,
  },
  {
    id: 'direct-sum',
    type: 'definition',
    title: 'סכום ישר (⊕)',
    meaning: 'V = U ⊕ W  אם:\n① V = U + W (הסכום שווה לכל V)\n② U ∩ W = {0} (החיתוך טריוויאלי)\n\nבמילים: כל וקטור ב-V מתפרק ל-u + w באופן יחיד.',
    dependsOn: ['sum-subspaces'],
    leadsTo: ['direct-sum-dim', 'direct-sum-unique'],
    week: 8,
    important: true,
  },
  {
    id: 'direct-sum-dim',
    type: 'theorem',
    title: 'סכום ישר לפי מימד',
    meaning: 'אם V = U + W, אז:\nV = U ⊕ W  ⟺  dim(V) = dim(U) + dim(W)\n\n(נובע מנוסחת המימדים: אם U ∩ W = {0} אז dim(U ∩ W) = 0)',
    dependsOn: ['direct-sum', 'dim-formula'],
    leadsTo: [],
    week: 8,
    important: true,
  },
  {
    id: 'direct-sum-unique',
    type: 'theorem',
    title: 'סכום ישר ⟺ הצגה יחידה',
    meaning: 'U ∩ W = {0}  ⟺  לכל v ∈ U + W יש הצגה יחידה v = u + w.\n\nהוכחה: אם u₁+w₁ = u₂+w₂ אז u₁−u₂ = w₂−w₁ ∈ U ∩ W = {0}, לכן u₁ = u₂, w₁ = w₂.',
    dependsOn: ['direct-sum'],
    leadsTo: [],
    week: 8,
  },

  // ========== WEEK 9: מטריצות ==========
  {
    id: 'mat-mult',
    type: 'definition',
    title: 'כפל מטריצות',
    meaning: 'A ∈ Mₘₓₚ, B ∈ Mₚₓₙ → AB ∈ Mₘₓₙ\n[AB]ᵢⱼ = (שורה i של A) · (עמודה j של B) = Σₖ aᵢₖ·bₖⱼ\n\nתנאי: מספר העמודות של A = מספר השורות של B.',
    dependsOn: [],
    leadsTo: ['mat-vec', 'mat-properties', 'identity'],
    week: 9,
    important: true,
  },
  {
    id: 'mat-vec',
    type: 'definition',
    title: 'Ax = צירוף לינארי של העמודות',
    meaning: 'אם A = [a₁|a₂|...|aₙ] (עמודות), אז:\nAx = x₁a₁ + x₂a₂ + ... + xₙaₙ\n\nכפל מטריצה בווקטור = צ"ל של העמודות עם מקדמים x₁,...,xₙ.\nלכן: Ax ∈ Sp(עמודות A) תמיד!',
    dependsOn: ['mat-mult', 'lc'],
    leadsTo: ['invertible-system'],
    week: 9,
    important: true,
  },
  {
    id: 'mat-properties',
    type: 'theorem',
    title: 'תכונות כפל מטריצות',
    meaning: '✓ אסוציאטיבי: (AB)C = A(BC)\n✓ פילוגי: A(B+C) = AB + AC\n✗ לא קומוטטיבי: AB ≠ BA בכלל!\n✗ אין צמצום: AB = AC ⇏ B = C',
    dependsOn: ['mat-mult'],
    leadsTo: ['zero-divisors'],
    week: 9,
  },
  {
    id: 'zero-divisors',
    type: 'theorem',
    title: 'קיימים מחלקי אפס',
    meaning: 'ייתכן AB = 0 גם כאשר A ≠ 0 ו-B ≠ 0!\nזה שונה משדות — בשדה אין מחלקי אפס.\n\nלכן: AB = 0 לא אומר ש-A = 0 או B = 0.',
    dependsOn: ['mat-properties'],
    leadsTo: [],
    week: 9,
  },
  {
    id: 'identity',
    type: 'definition',
    title: 'מטריצת יחידה Iₙ',
    meaning: 'Iₙ = מטריצה עם 1 באלכסון ו-0 בכל השאר.\nI·A = A·I = A (כמו "1" בכפל מספרים).\nגם: A·eᵢ = העמודה ה-i של A.',
    dependsOn: ['mat-mult'],
    leadsTo: ['invertible'],
    week: 9,
  },
  {
    id: 'invertible',
    type: 'definition',
    title: 'מטריצה הפיכה',
    meaning: 'A ∈ Mₙ(F) הפיכה אם קיימת B כך ש-AB = BA = Iₙ.\nB = A⁻¹ (ההופכית). היא יחידה.\n\nעובדה חשובה: אם AB = I אז גם BA = I (מספיק צד אחד!).',
    dependsOn: ['identity'],
    leadsTo: ['invertible-system', 'inversion-algo', 'diagonal'],
    week: 9,
    important: true,
  },
  {
    id: 'invertible-system',
    type: 'theorem',
    title: 'A הפיכה ⟹ Ax = b פתרון יחיד',
    meaning: 'אם A הפיכה, אז לכל b ∈ Fⁿ:\nAx = b  →  פתרון יחיד:  x = A⁻¹b\n\nמטריצה הפיכה = המערכת תמיד פתירה באופן יחיד.',
    dependsOn: ['invertible', 'mat-vec'],
    leadsTo: [],
    week: 9,
    important: true,
  },
  {
    id: 'inversion-algo',
    type: 'technique',
    title: 'אלגוריתם היפוך: [A|I] → [I|A⁻¹]',
    meaning: 'לחישוב A⁻¹: בונים את [A | Iₙ] ומדרגים.\nאם הצד השמאלי הופך ל-Iₙ → הצד הימני הוא A⁻¹.\nאם מופיעה שורת אפסים → A לא הפיכה.',
    dependsOn: ['invertible'],
    leadsTo: [],
    week: 9,
  },
  {
    id: 'diagonal',
    type: 'definition',
    title: 'מטריצה אלכסונית',
    meaning: 'D אלכסונית: כל האיברים מחוץ לאלכסון = 0.\nD הפיכה ⟺ כל האיברים באלכסון ≠ 0.\nD⁻¹ = diag(1/d₁, ..., 1/dₙ)\nמטריצות אלכסוניות מתחלפות: D₁D₂ = D₂D₁.',
    dependsOn: ['invertible'],
    leadsTo: [],
    week: 9,
  },
];

// =============================================
// Helper Components
// =============================================

const typeConfig = {
  definition: { label: 'הגדרה', color: 'blue', icon: BookOpen, bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800', headerBg: 'bg-blue-600' },
  theorem: { label: 'משפט', color: 'green', icon: Lightbulb, bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-800', headerBg: 'bg-green-600' },
  corollary: { label: 'מסקנה', color: 'emerald', icon: Lightbulb, bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-800', headerBg: 'bg-emerald-600' },
  technique: { label: 'טכניקה', color: 'orange', icon: Wrench, bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800', headerBg: 'bg-orange-600' },
};

const weekConfig: Record<number, { title: string; subtitle: string; color: string; gradient: string }> = {
  5: { title: 'שבוע 5 — הרצאות 9-10', subtitle: 'צירופים לינאריים ופרישה', color: 'gray', gradient: 'from-gray-500 to-gray-600' },
  6: { title: 'שבוע 6 — הרצאות 11-12', subtitle: 'תלות לינארית', color: 'violet', gradient: 'from-violet-500 to-purple-600' },
  7: { title: 'שבוע 7 — הרצאות 13-14', subtitle: 'בסיס ומימד', color: 'blue', gradient: 'from-blue-500 to-indigo-600' },
  8: { title: 'שבוע 8 — הרצאות 15-16', subtitle: 'השלמה לבסיס וסכום ישר', color: 'teal', gradient: 'from-teal-500 to-cyan-600' },
  9: { title: 'שבוע 9 — הרצאות 17-18', subtitle: 'מטריצות', color: 'rose', gradient: 'from-rose-500 to-pink-600' },
};

// =============================================
// Main Page
// =============================================

export default function FlowPage() {
  const [expandAll, setExpandAll] = useState(false);
  const weeks = [5, 6, 7, 8, 9];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GitBranch className="w-7 h-7 text-violet-600" />
          מפת מושגים — שבועות 5-9
        </h1>
        <p className="text-gray-500 mt-1">
          כל ההגדרות, המשפטים והקשרים ביניהם — מצירוף לינארי ועד מטריצות
        </p>
      </div>

      {/* Legend + Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-100 text-blue-800">הגדרה</span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-green-100 text-green-800">משפט</span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800">מסקנה</span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-orange-100 text-orange-800">טכניקה</span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800">חשוב</span>
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
      <div className="bg-gradient-to-r from-violet-500 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-lg font-bold mb-3">התמונה הגדולה</h2>
        <div className="text-sm leading-relaxed space-y-2 text-violet-100">
          <p><strong className="text-white">שבוע 5:</strong> מגדירים <strong className="text-white">צירוף לינארי</strong> ו<strong className="text-white">פרישה</strong> — "מה אפשר לייצר מקבוצת וקטורים?"</p>
          <p><strong className="text-white">שבוע 6:</strong> שואלים "יש פה מידע מיותר?" — זו <strong className="text-white">תלות לינארית</strong>. בת"ל = אין כפילויות.</p>
          <p><strong className="text-white">שבוע 7:</strong> משלבים: פורשת + בת"ל = <strong className="text-white">בסיס</strong>. שטייניץ מוכיח שכל הבסיסים אותו גודל → <strong className="text-white">מימד</strong>.</p>
          <p><strong className="text-white">שבוע 8:</strong> כלים: <strong className="text-white">השלמה לבסיס</strong>, <strong className="text-white">סכום ישר</strong>, <strong className="text-white">נוסחת המימדים</strong>.</p>
          <p><strong className="text-white">שבוע 9:</strong> מעבר לעולם של <strong className="text-white">מטריצות</strong> — כפל, היפוך, Ax = צ"ל של עמודות.</p>
        </div>
      </div>

      {/* Week Sections */}
      {weeks.map((weekNum) => {
        const wCfg = weekConfig[weekNum];
        const weekConcepts = concepts.filter(c => c.week === weekNum);

        return (
          <div key={weekNum} className="space-y-3">
            {/* Week Header */}
            <div className={`bg-gradient-to-r ${wCfg.gradient} rounded-xl p-4 text-white`}>
              <h2 className="text-lg font-bold">{wCfg.title}</h2>
              <p className="text-sm opacity-80">{wCfg.subtitle}</p>
            </div>

            {/* Concept Cards */}
            <div className="space-y-3 relative">
              {weekConcepts.map((concept, idx) => (
                <div key={concept.id}>
                  <ConceptCardWrapper
                    concept={concept}
                    allConcepts={concepts}
                    forceExpand={expandAll}
                  />
                  {idx < weekConcepts.length - 1 && (
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
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">סיכום מהיר — "שרשרת ההגדרות"</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-blue-500 font-bold shrink-0">1.</span>
            <p><strong>צירוף לינארי</strong> — "אני יכול ליצור את v מ-v₁,...,vₖ?"</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 font-bold shrink-0">2.</span>
            <p><strong>פרישה Sp</strong> — "מה כל האוסף שאני יכול ליצור?"</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 font-bold shrink-0">3.</span>
            <p><strong>קבוצה פורשת</strong> — "אני יכול ליצור הכל?" (Sp(S) = V)</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-violet-500 font-bold shrink-0">4.</span>
            <p><strong>בת"ל</strong> — "אין מידע מיותר?" (הדרך היחידה לקבל 0 היא הטריוויאלית)</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-violet-500 font-bold shrink-0">5.</span>
            <p><strong>ת"ל</strong> — "יש מידע מיותר" (אפשר לזרוק אחד)</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold shrink-0">6.</span>
            <p><strong>בסיס</strong> — "פורשת + בת"ל" (מינימום שמייצר הכל, ייצוג יחיד)</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold shrink-0">7.</span>
            <p><strong>מימד</strong> — "כמה וקטורים בבסיס" (מוגדר היטב בגלל שטייניץ)</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-teal-500 font-bold shrink-0">8.</span>
            <p><strong>השלמה לבסיס</strong> — "בת"ל → תמיד אפשר להוסיף עד שיהיה בסיס"</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-teal-500 font-bold shrink-0">9.</span>
            <p><strong>סכום ישר</strong> — "V = U ⊕ W: כל וקטור מתפרק יחידה ל-u + w"</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-teal-500 font-bold shrink-0">10.</span>
            <p><strong>נוסחת המימדים</strong> — dim(U+W) = dim U + dim W − dim(U∩W)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper to handle forceExpand
function ConceptCardWrapper({ concept, allConcepts, forceExpand }: { concept: Concept; allConcepts: Concept[]; forceExpand: boolean }) {
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
    <div
      className={`rounded-xl border-2 ${cfg.border} ${concept.important ? 'ring-2 ring-offset-1 ring-yellow-300' : ''} overflow-hidden transition-all duration-200`}
    >
      <button
        onClick={() => setManualExpand(prev => prev === null ? !isExpanded : !prev)}
        className={`w-full flex items-center gap-3 p-4 text-right ${cfg.bg} hover:brightness-95 transition-all`}
      >
        <Icon className={`w-5 h-5 shrink-0`} style={{ color: `var(--color-${cfg.color}-600, #666)` }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>{cfg.label}</span>
            {concept.important && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">חשוב</span>
            )}
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
                  <span key={d.id} className={`text-xs px-2 py-1 rounded-full ${typeConfig[d.type].badge}`}>
                    {d.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {leads.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">מוביל ל:</p>
              <div className="flex flex-wrap gap-1.5">
                {leads.map(l => (
                  <span key={l.id} className={`text-xs px-2 py-1 rounded-full ${typeConfig[l.type].badge}`}>
                    {l.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
