'use client';

import { useState } from 'react';
import { Grid3X3, ChevronDown, ChevronUp, ArrowDown, ArrowRight, Star, Zap, AlertTriangle, CheckCircle2, XCircle, BookOpen, Lightbulb, Wrench, GitBranch } from 'lucide-react';

// =============================================
// Section Component
// =============================================
function Section({ title, icon, color, children }: { title: string; icon: React.ReactNode; color: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className={`bg-gradient-to-r ${color} rounded-xl p-4 text-white flex items-center gap-3`}>
        {icon}
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// =============================================
// Card Components
// =============================================
function DefCard({ title, children, important }: { title: string; children: React.ReactNode; important?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={`rounded-xl border-2 border-blue-200 overflow-hidden ${important ? 'ring-2 ring-yellow-300 ring-offset-1' : ''}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-4 text-right bg-blue-50 hover:bg-blue-100 transition-all">
        <BookOpen className="w-5 h-5 text-blue-600 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">הגדרה</span>
            {important && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">חשוב</span>}
          </div>
          <h3 className="font-bold text-gray-900 mt-1">{title}</h3>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {open && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
}

function ThmCard({ title, children, important }: { title: string; children: React.ReactNode; important?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={`rounded-xl border-2 border-green-200 overflow-hidden ${important ? 'ring-2 ring-yellow-300 ring-offset-1' : ''}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-4 text-right bg-green-50 hover:bg-green-100 transition-all">
        <Lightbulb className="w-5 h-5 text-green-600 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">משפט</span>
            {important && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">חשוב</span>}
          </div>
          <h3 className="font-bold text-gray-900 mt-1">{title}</h3>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {open && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
}

function TechCard({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-xl border-2 border-orange-200 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-4 text-right bg-orange-50 hover:bg-orange-100 transition-all">
        <Wrench className="w-5 h-5 text-orange-600 shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">טכניקה</span>
          <h3 className="font-bold text-gray-900 mt-1">{title}</h3>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {open && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
}

function Math({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded">{children}</span>;
}

function Block({ children }: { children: React.ReactNode }) {
  return <div className="whitespace-pre-line text-sm leading-relaxed text-gray-800 font-mono bg-gray-50 rounded-lg p-3 border border-gray-100">{children}</div>;
}

function Implies({ from, to }: { from: string; to: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 py-1">
      <span className="font-semibold text-indigo-700">{from}</span>
      <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
      <span className="font-semibold text-green-700">{to}</span>
    </div>
  );
}

// =============================================
// Main Page
// =============================================

export default function MatricesPage() {
  const [expandAll, setExpandAll] = useState(true);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Grid3X3 className="w-7 h-7 text-rose-600" />
          סיכום מטריצות — הרצאות 17-20
        </h1>
        <p className="text-gray-500 mt-1">כל ההגדרות, כל המשפטים, מה גורר מה, ואיך להשתמש</p>
      </div>

      {/* The Big Picture */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl p-6 text-white">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          התמונה הגדולה
        </h2>
        <div className="text-sm leading-relaxed space-y-2 text-rose-100">
          <p><strong className="text-white">הרצאות 17-18:</strong> מגדירים <strong className="text-white">כפל מטריצות</strong>, מגלים ש-Ax = צ"ל של עמודות, מגדירים <strong className="text-white">מטריצה הפיכה</strong> ואלגוריתם היפוך.</p>
          <p><strong className="text-white">הרצאות 19-20:</strong> <strong className="text-white">מטריצות אלמנטריות</strong> — פעולות שורה זה כפל ממטריצה! זה מוביל ל<strong className="text-white">משפט המטריצה ההפיכה</strong> (13 תנאים שקולים!). בנוסף: <strong className="text-white">שחלוף</strong> ו<strong className="text-white">עקבה</strong>.</p>
          <p className="mt-3 text-white font-semibold">הקו המנחה: "מתי מטריצה הפיכה?" — יש 13 דרכים שונות לענות על זה, וכולן שקולות.</p>
        </div>
      </div>

      {/* ============================================= */}
      {/* WEEK 9: Lectures 17-18 */}
      {/* ============================================= */}
      <Section
        title="הרצאות 17-18 — כפל מטריצות, הפיכות, אלכסון"
        icon={<Grid3X3 className="w-6 h-6" />}
        color="from-slate-600 to-slate-700"
      >
        <DefCard title="כפל מטריצות" important>
          <Block>{`A ∈ Mₘₓₚ(F), B ∈ Mₚₓₙ(F)  →  AB ∈ Mₘₓₙ(F)

[AB]ᵢⱼ = Σₖ₌₁ᵖ aᵢₖ · bₖⱼ  (שורה i של A · עמודה j של B)

תנאי הכרחי: מספר עמודות A = מספר שורות B
(m×p) · (p×n) = (m×n)`}</Block>
        </DefCard>

        <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>

        <DefCard title="Ax = צירוף לינארי של עמודות A" important>
          <Block>{`אם A = [a₁ | a₂ | ... | aₙ]  (עמודות), אז:
Ax = x₁·a₁ + x₂·a₂ + ... + xₙ·aₙ

כפל מטריצה בווקטור = צ"ל של עמודות A עם מקדמים x₁,...,xₙ.`}</Block>
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-bold text-yellow-800 mb-1">למה זה חשוב?</p>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>• <Math>Ax ∈ Sp(עמודות A)</Math> תמיד!</p>
              <p>• <Math>Ax = b</Math> פתירה ⟺ <Math>b ∈ Sp(עמודות A)</Math></p>
              <p>• עמודות AB = A כפול כל עמודה של B</p>
            </div>
          </div>
        </DefCard>

        <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>

        <ThmCard title="תכונות כפל מטריצות" important>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="p-2 bg-green-50 rounded-lg flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-green-800">אסוציאטיבי</p>
                  <p className="text-green-700">(AB)C = A(BC)</p>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded-lg flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-green-800">פילוגי</p>
                  <p className="text-green-700">A(B+C) = AB + AC</p>
                  <p className="text-green-700">(B+C)A = BA + CA</p>
                </div>
              </div>
              <div className="p-2 bg-red-50 rounded-lg flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-red-800">לא קומוטטיבי!</p>
                  <p className="text-red-700">AB ≠ BA בדרך כלל</p>
                </div>
              </div>
              <div className="p-2 bg-red-50 rounded-lg flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-red-800">אין צמצום!</p>
                  <p className="text-red-700">BA = CA ⇏ B = C</p>
                </div>
              </div>
            </div>
          </div>
        </ThmCard>

        <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>

        <ThmCard title="קיימים מחלקי אפס!">
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-sm text-red-800">
              <p className="font-bold mb-1">שונה משדות!</p>
              <p>ייתכן <Math>AB = 0</Math> גם כאשר <Math>A ≠ 0</Math> ו-<Math>B ≠ 0</Math>.</p>
              <p className="mt-1">גם: עמודת אפסים של A נשמרת בכפל — אם עמודה j של A היא 0, אז גם עמודה j של BA היא 0.</p>
            </div>
          </div>
        </ThmCard>

        <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>

        <DefCard title="מטריצת יחידה Iₙ">
          <Block>{`Iₙ = מטריצה עם 1 באלכסון ו-0 מחוצה לו.
I·A = A·I = A   (כמו "1" בכפל מספרים)
A·eᵢ = העמודה ה-i של A`}</Block>
        </DefCard>

        <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>

        <DefCard title="מטריצה הפיכה" important>
          <Block>{`A ∈ Mₙ(F) הפיכה אם קיימת B כך ש-AB = BA = Iₙ.

B = A⁻¹ (ההופכית). היא יחידה.`}</Block>
          <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm font-bold text-indigo-800 mb-1">עובדה קריטית:</p>
            <p className="text-sm text-indigo-700">אם <Math>AB = Iₙ</Math> אז <strong>גם</strong> <Math>BA = Iₙ</Math>!</p>
            <p className="text-sm text-indigo-700 mt-1">מספיק לבדוק צד אחד! (רק למטריצות ריבועיות)</p>
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-xs font-semibold text-gray-500">מסקנות מיידיות:</p>
            <Implies from="A,B הפיכות" to="AB הפיכה ו-(AB)⁻¹ = B⁻¹A⁻¹" />
            <Implies from="A הפיכה" to="A⁻¹ הפיכה ו-(A⁻¹)⁻¹ = A" />
            <Implies from="A הפיכה" to="Aⁿ הפיכה ו-(Aⁿ)⁻¹ = (A⁻¹)ⁿ" />
          </div>
        </DefCard>

        <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>

        <ThmCard title="A הפיכה ⟹ Ax = b: פתרון יחיד" important>
          <Block>{`אם A הפיכה, אז לכל b ∈ Fⁿ:
Ax = b  →  פתרון יחיד:  x = A⁻¹b`}</Block>
          <p className="text-sm text-gray-600 mt-2">מטריצה הפיכה = המערכת תמיד פתירה באופן יחיד, לכל b.</p>
        </ThmCard>

        <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>

        <TechCard title="אלגוריתם היפוך: [A | I] → [I | A⁻¹]">
          <Block>{`1. בנה את המטריצה המורחבת [A | Iₙ]
2. דרג (Gauss-Jordan) עד שהצד השמאלי יהפוך ל-Iₙ
3. הצד הימני הוא A⁻¹

אם מופיעה שורת אפסים בצד השמאלי → A לא הפיכה!`}</Block>
        </TechCard>

        <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>

        <DefCard title="מטריצה אלכסונית">
          <Block>{`D אלכסונית: כל האיברים מחוץ לאלכסון = 0.
D = diag(d₁, d₂, ..., dₙ)

D הפיכה ⟺ כל dᵢ ≠ 0
D⁻¹ = diag(1/d₁, ..., 1/dₙ)

מטריצות אלכסוניות מתחלפות: D₁D₂ = D₂D₁`}</Block>
        </DefCard>

        <TechCard title="נוסחת 2×2">
          <Block>{`A = [[a,b],[c,d]]

A הפיכה ⟺ ad − bc ≠ 0

A⁻¹ = 1/(ad−bc) · [[d, −b],[−c, a]]`}</Block>
          <p className="text-sm text-gray-600 mt-2">(להחליף את האלכסון הראשי, לשנות סימן באלכסון המשני, לחלק ב-ad−bc)</p>
        </TechCard>
      </Section>

      {/* ============================================= */}
      {/* WEEK 10: Lectures 19-20 */}
      {/* ============================================= */}
      <Section
        title="הרצאות 19-20 — מטריצות אלמנטריות, משפט ההפיכות, שחלוף, עקבה"
        icon={<Star className="w-6 h-6" />}
        color="from-indigo-600 to-purple-700"
      >
        <DefCard title="מטריצה אלמנטרית" important>
          <Block>{`E = מטריצה שמתקבלת מ-Iₙ ע"י פעולת שורה אלמנטרית אחת.

3 סוגים:
  Rᵢ → cRᵢ (c ≠ 0)    →  E אלכסונית עם c במקום ה-i
  Rᵢ ↔ Rⱼ              →  E = Iₙ עם החלפת שורות i,j
  Rᵢ → Rᵢ + cRⱼ       →  E = Iₙ עם c במיקום (i,j)`}</Block>
          <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm font-bold text-indigo-800 mb-1">הרעיון המרכזי:</p>
            <p className="text-sm text-indigo-700">כפל ב-E <strong>משמאל</strong> מבצע את אותה פעולת שורה!</p>
            <p className="text-sm text-indigo-700 mt-1"><Math>EA = A</Math> אחרי פעולת השורה.</p>
          </div>
        </DefCard>

        <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>

        <ThmCard title="מטריצות אלמנטריות הפיכות" important>
          <Block>{`כל מטריצה אלמנטרית E הפיכה!
E⁻¹ = המטריצה האלמנטרית של הפעולה ההפוכה.

Rᵢ → cRᵢ      →  E⁻¹: Rᵢ → (1/c)Rᵢ
Rᵢ ↔ Rⱼ       →  E⁻¹: Rᵢ ↔ Rⱼ  (עצמית!)
Rᵢ → Rᵢ + cRⱼ →  E⁻¹: Rᵢ → Rᵢ − cRⱼ`}</Block>
        </ThmCard>

        <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>

        <ThmCard title="שקילות שורות = כפל במטריצות אלמנטריות">
          <Block>{`אם B מתקבלת מ-A ע"י פעולת שורה → B = E·A

אם A ו-B שקולות שורה, קיימות E₁,...,Eₖ אלמנטריות:
Eₖ · ... · E₁ · A = B`}</Block>
          <div className="mt-2 space-y-1">
            <Implies from="כל צעד בדירוג" to="כפל במטריצה אלמנטרית" />
            <Implies from="דירוג ל-RREF" to="מכפלת אלמנטריות כפול A" />
          </div>
        </ThmCard>

        <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>

        <ThmCard title="A הפיכה ⟺ A מכפלת מטריצות אלמנטריות" important>
          <Block>{`A הפיכה
  ⟺  A שקילת שורה ל-Iₙ
  ⟺  קיימות E₁,...,Eₖ אלמנטריות: Eₖ·...·E₁·A = Iₙ
  ⟺  A = E₁⁻¹·...·Eₖ⁻¹ = מכפלת אלמנטריות`}</Block>
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-bold text-green-800">ולכן גם:</p>
            <p className="text-sm text-green-700">אותן פעולות שורה שהופכות A ל-I, הופכות את I ל-A⁻¹.</p>
            <p className="text-sm text-green-700">זה בדיוק אלגוריתם ההיפוך [A|I] → [I|A⁻¹]!</p>
          </div>
        </ThmCard>
      </Section>

      {/* ============================================= */}
      {/* THE INVERTIBLE MATRIX THEOREM */}
      {/* ============================================= */}
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl p-4 text-white flex items-center gap-3">
          <Star className="w-6 h-6" />
          <div>
            <h2 className="text-lg font-bold">משפט המטריצה ההפיכה — THE BIG ONE</h2>
            <p className="text-sm text-yellow-100">13 תנאים שקולים. אם אחד נכון — כולם נכונים. אם אחד לא — אף אחד לא.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-yellow-300 p-6">
          <p className="text-sm font-bold text-gray-900 mb-4">יהי F שדה ו-A ∈ Mₙ(F). כל התנאים הבאים <strong className="text-yellow-700">שקולים</strong>:</p>

          <div className="space-y-2">
            {[
              { num: 1, text: 'A הפיכה', category: 'הפיכות', color: 'bg-blue-50 text-blue-800 border-blue-200' },
              { num: 2, text: 'לכל b ∈ Fⁿ, למערכת Ax = b יש פתרון יחיד', category: 'מערכות', color: 'bg-green-50 text-green-800 border-green-200' },
              { num: 3, text: 'קיים b ∈ Fⁿ כך ש-Ax = b פתירה ביחידות', category: 'מערכות', color: 'bg-green-50 text-green-800 border-green-200' },
              { num: 4, text: 'Ax = 0 → רק פתרון טריוויאלי (x = 0)', category: 'מערכות', color: 'bg-green-50 text-green-800 border-green-200' },
              { num: 5, text: 'A שקולת שורה ל-Iₙ (RREF של A הוא Iₙ)', category: 'דירוג', color: 'bg-purple-50 text-purple-800 border-purple-200' },
              { num: 6, text: 'A היא מכפלה של מטריצות אלמנטריות', category: 'אלמנטריות', color: 'bg-purple-50 text-purple-800 border-purple-200' },
              { num: 7, text: 'עמודות A בלתי-תלויות לינארית', category: 'עמודות', color: 'bg-rose-50 text-rose-800 border-rose-200' },
              { num: 8, text: 'עמודות A פורשות את Fⁿ', category: 'עמודות', color: 'bg-rose-50 text-rose-800 border-rose-200' },
              { num: 9, text: 'עמודות A מהוות בסיס ל-Fⁿ', category: 'עמודות', color: 'bg-rose-50 text-rose-800 border-rose-200' },
              { num: 10, text: 'שורות A בלתי-תלויות לינארית', category: 'שורות', color: 'bg-orange-50 text-orange-800 border-orange-200' },
              { num: 11, text: 'שורות A פורשות את Fⁿ', category: 'שורות', color: 'bg-orange-50 text-orange-800 border-orange-200' },
              { num: 12, text: 'שורות A מהוות בסיס ל-Fⁿ', category: 'שורות', color: 'bg-orange-50 text-orange-800 border-orange-200' },
              { num: 13, text: 'Aᵗ הפיכה', category: 'שחלוף', color: 'bg-teal-50 text-teal-800 border-teal-200' },
            ].map(item => (
              <div key={item.num} className={`flex items-start gap-3 p-3 rounded-lg border ${item.color}`}>
                <span className="w-7 h-7 rounded-full bg-yellow-400 text-yellow-900 font-bold text-sm flex items-center justify-center shrink-0">{item.num}</span>
                <div className="flex-1">
                  <p className="font-medium">{item.text}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/80 font-semibold shrink-0">{item.category}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-bold text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              הנגד (Contrapositive):
            </p>
            <p className="text-sm text-red-700 mt-1">
              אם <strong>אחד</strong> מהתנאים <strong>לא</strong> מתקיים — <strong>אף אחד</strong> לא מתקיים!
            </p>
            <p className="text-sm text-red-700">
              למשל: אם Ax = 0 יש פתרון לא-טריוויאלי → A לא הפיכה → עמודות A ת"ל → שורות A ת"ל → ...
            </p>
          </div>
        </div>
      </div>

      {/* ============================================= */}
      {/* TRANSPOSE & TRACE */}
      {/* ============================================= */}
      <Section
        title="שחלוף ועקבה"
        icon={<Grid3X3 className="w-6 h-6" />}
        color="from-teal-600 to-cyan-700"
      >
        <DefCard title="שחלוף (Transpose) — Aᵗ">
          <Block>{`[Aᵗ]ᵢⱼ = [A]ⱼᵢ

עמודות A → שורות Aᵗ  (ולהפך)
A ∈ Mₘₓₙ  →  Aᵗ ∈ Mₙₓₘ`}</Block>
        </DefCard>

        <ThmCard title="תכונות שחלוף" important>
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="p-2 bg-gray-50 rounded-lg text-sm font-mono">
                <p>(Aᵗ)ᵗ = A</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg text-sm font-mono">
                <p>(A ± B)ᵗ = Aᵗ ± Bᵗ</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg text-sm font-mono">
                <p>(αA)ᵗ = αAᵗ</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg text-sm font-mono border border-yellow-200">
                <p className="font-bold text-yellow-800">(AB)ᵗ = BᵗAᵗ</p>
                <p className="text-xs text-yellow-700 mt-1">הסדר מתהפך!</p>
              </div>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg text-sm font-mono border border-indigo-200">
              <p className="font-bold text-indigo-800">(Aᵗ)⁻¹ = (A⁻¹)ᵗ</p>
              <p className="text-xs text-indigo-700 mt-1">אם A הפיכה, גם Aᵗ הפיכה (תנאי 13 במשפט ההפיכה!)</p>
            </div>
          </div>
        </ThmCard>

        <DefCard title="מטריצה סימטרית ואנטי-סימטרית">
          <Block>{`סימטרית:        Aᵗ = A   (aᵢⱼ = aⱼᵢ, מראה סביב האלכסון)
אנטי-סימטרית:   Aᵗ = −A  (aᵢⱼ = −aⱼᵢ, באלכסון חייב 0)`}</Block>
          <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm">
            <p className="font-bold text-purple-800 mb-1">מימדים (כאשר 1+1 ≠ 0 בשדה):</p>
            <p className="text-purple-700">dim(SYM) = n(n+1)/2</p>
            <p className="text-purple-700">dim(AS) = n(n−1)/2</p>
            <p className="text-purple-700 mt-1">ביחד: n(n+1)/2 + n(n−1)/2 = n² = dim(Mₙ(F)) → סכום ישר!</p>
          </div>
        </DefCard>

        <DefCard title="עקבה (Trace)">
          <Block>{`tr(A) = Σᵢ₌₁ⁿ aᵢᵢ  (סכום האלכסון הראשי)

מוגדרת רק למטריצות ריבועיות.`}</Block>
        </DefCard>

        <ThmCard title="תכונות עקבה">
          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-2">
              <div className="p-2 bg-green-50 rounded-lg text-sm font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <div>
                  <p>tr(αA + βB) = α·tr(A) + β·tr(B)  <span className="text-green-700 font-sans">(העקבה לינארית!)</span></p>
                </div>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg text-sm font-mono border border-yellow-200 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-600 shrink-0" />
                <div>
                  <p className="font-bold text-yellow-800">tr(AB) = tr(BA)</p>
                  <p className="text-xs text-yellow-700 font-sans mt-1">גם כשהכפל לא קומוטטיבי, העקבה של המכפלה כן!</p>
                </div>
              </div>
            </div>
            <div className="mt-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-sm">
              <p className="font-bold text-indigo-800 mb-1">הוכחה מגניבה: tr(AAᵗ) = 0 ⟹ A = 0 (מעל R)</p>
              <p className="text-indigo-700">[AAᵗ]ᵢᵢ = Σⱼ aᵢⱼ² (סכום ריבועי שורה i)</p>
              <p className="text-indigo-700">tr(AAᵗ) = סכום ריבועי כל האיברים = 0 → כל איבר = 0</p>
              <p className="text-indigo-700 mt-1 font-semibold">לא עובד מעל C! (כי i² = −1)</p>
            </div>
          </div>
        </ThmCard>
      </Section>

      {/* ============================================= */}
      {/* HOW TO USE: Proof Strategies */}
      {/* ============================================= */}
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-xl p-4 text-white flex items-center gap-3">
          <Zap className="w-6 h-6" />
          <div>
            <h2 className="text-lg font-bold">איך להשתמש — אסטרטגיות הוכחה</h2>
            <p className="text-sm text-emerald-100">"נתון X, צריך להוכיח Y — באיזה משפט להשתמש?"</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {[
            {
              q: 'צריך להוכיח ש-A הפיכה',
              strategies: [
                'הראה ש-Ax = 0 → x = 0 (תנאי 4)',
                'הראה שעמודות A בת"ל (תנאי 7)',
                'הראה ש-RREF(A) = Iₙ (תנאי 5)',
                'מצא B כך ש-AB = I (מספיק צד אחד!)',
                'הראה ש-A מכפלת אלמנטריות (תנאי 6)',
              ],
            },
            {
              q: 'צריך להוכיח ש-A לא הפיכה',
              strategies: [
                'מצא x ≠ 0 כך ש-Ax = 0 (שלילת תנאי 4)',
                'הראה שעמודות A ת"ל (שלילת 7)',
                'הראה ש-RREF(A) ≠ Iₙ — יש שורת אפסים (שלילת 5)',
                'ל-2×2: הראה ש-ad − bc = 0',
              ],
            },
            {
              q: 'נתון AB = I, צריך להוכיח משהו',
              strategies: [
                'A הפיכה ו-B = A⁻¹ (מספיק צד אחד!)',
                'גם BA = I',
                'B הפיכה ו-A = B⁻¹',
                'עמודות A בת"ל, שורות A פורשות, וכו\'',
              ],
            },
            {
              q: 'נתון A הפיכה, צריך להוכיח על Aᵗ',
              strategies: [
                'Aᵗ הפיכה (תנאי 13)',
                '(Aᵗ)⁻¹ = (A⁻¹)ᵗ',
                'שורות Aᵗ = עמודות A → בת"ל, פורשות',
              ],
            },
            {
              q: 'צריך להוכיח ש-AB הפיכה',
              strategies: [
                'אם A, B שתיהן הפיכות → AB הפיכה',
                '(AB)⁻¹ = B⁻¹A⁻¹',
                'שקול: הראה ש-(AB)x = 0 → x = 0',
              ],
            },
            {
              q: 'צריך למצוא A⁻¹',
              strategies: [
                'אלגוריתם: [A|I] → [I|A⁻¹]',
                'ל-2×2: A⁻¹ = 1/(ad−bc) · [[d,−b],[−c,a]]',
                'אם A = E₁E₂...Eₖ: A⁻¹ = Eₖ⁻¹...E₂⁻¹E₁⁻¹',
                'אם A אלכסונית: A⁻¹ = diag(1/d₁,...,1/dₙ)',
              ],
            },
            {
              q: 'שאלה עם tr() — מה אפשר לעשות?',
              strategies: [
                'העקבה לינארית: tr(αA+βB) = αtr(A) + βtr(B)',
                'tr(AB) = tr(BA) — גם כש-AB ≠ BA',
                'tr(Aᵗ) = tr(A)',
                'מעל R: tr(AAᵗ) = 0 ⟹ A = 0',
              ],
            },
            {
              q: 'שאלה עם (·)ᵗ — מה אפשר לעשות?',
              strategies: [
                '(AB)ᵗ = BᵗAᵗ (הסדר מתהפך!)',
                '(Aᵗ)ᵗ = A',
                'A סימטרית ⟺ Aᵗ = A',
                'A הפיכה → (Aᵗ)⁻¹ = (A⁻¹)ᵗ',
                'Mₙ(F) = SYM ⊕ AS (סכום ישר: כל מטריצה = סימטרית + אנטי-סימטרית)',
              ],
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4">
              <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0">{idx + 1}</span>
                {item.q}
              </p>
              <ul className="space-y-1 mr-8">
                {item.strategies.map((s, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">→</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================= */}
      {/* DEPENDENCY CHAIN */}
      {/* ============================================= */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-purple-600" />
          שרשרת התלויות — מה מסתמך על מה
        </h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">שכבה 1: הבסיס</p>
            <p className="text-slate-700">כפל מטריצות → תכונות (אסוציאטיבי, פילוגי, לא קומוטטיבי)</p>
            <p className="text-slate-700">Ax = צ"ל עמודות → מטריצת יחידה I</p>
          </div>
          <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-bold text-blue-800 mb-2">שכבה 2: הפיכות</p>
            <p className="text-blue-700">I → הגדרת מטריצה הפיכה → AB=I ⟹ BA=I</p>
            <p className="text-blue-700">A הפיכה → Ax=b פתרון יחיד x = A⁻¹b</p>
          </div>
          <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="font-bold text-purple-800 mb-2">שכבה 3: מטריצות אלמנטריות</p>
            <p className="text-purple-700">E = פעולת שורה → E הפיכה → EA = פעולת שורה על A</p>
            <p className="text-purple-700">A שקילת שורה ל-I ⟺ A = מכפלת אלמנטריות ⟺ A הפיכה</p>
          </div>
          <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-300">
            <p className="font-bold text-yellow-800 mb-2">שכבה 4: משפט המטריצה ההפיכה (13 תנאים שקולים)</p>
            <p className="text-yellow-700">הפיכה ⟺ Ax=0 טריוויאלי ⟺ RREF=I ⟺ עמודות בת"ל ⟺ שורות בת"ל ⟺ ...</p>
          </div>
          <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-gray-300" /></div>
          <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
            <p className="font-bold text-teal-800 mb-2">שכבה 5: כלים נוספים</p>
            <p className="text-teal-700">שחלוף: (AB)ᵗ = BᵗAᵗ, A הפיכה → Aᵗ הפיכה</p>
            <p className="text-teal-700">עקבה: tr(AB) = tr(BA), tr לינארית</p>
            <p className="text-teal-700">Mₙ(F) = SYM ⊕ AS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
