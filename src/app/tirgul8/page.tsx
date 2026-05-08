'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Layers, ArrowDown, ArrowRight, Star, AlertTriangle, Lightbulb } from 'lucide-react';

// =============================================
// Helper Components
// =============================================

function Section({ title, icon, color, children }: {
  title: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className={`font-bold text-lg mb-4 flex items-center gap-2 ${color}`}>
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
}

function Def({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="bg-blue-50 border border-blue-200 rounded-lg p-4 scroll-mt-20">
      <div className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">הגדרה</span>
        {title}
      </div>
      <div className="text-sm text-blue-800 space-y-1">{children}</div>
    </div>
  );
}

function Thm({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="bg-green-50 border border-green-200 rounded-lg p-4 scroll-mt-20">
      <div className="font-bold text-green-900 text-sm mb-2 flex items-center gap-2">
        <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">משפט</span>
        {title}
      </div>
      <div className="text-sm text-green-800 space-y-1">{children}</div>
    </div>
  );
}

function Claim({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 scroll-mt-20">
      <div className="font-bold text-emerald-900 text-sm mb-2 flex items-center gap-2">
        <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded">טענה</span>
        {title}
      </div>
      <div className="text-sm text-emerald-800 space-y-1">{children}</div>
    </div>
  );
}

function Remark({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <div className="font-bold text-amber-900 text-sm mb-1 flex items-center gap-2">
        <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded">הערה</span>
      </div>
      <div className="text-sm text-amber-800">{children}</div>
    </div>
  );
}

function Example({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <div className="font-bold text-purple-900 text-sm mb-2 flex items-center gap-2">
        <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded">דוגמה</span>
        {title && <span>{title}</span>}
      </div>
      <div className="text-sm text-purple-800 space-y-1">{children}</div>
    </div>
  );
}

function Exercise({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <div className="font-semibold text-gray-900 text-sm flex items-center gap-2">
          <span className="bg-gray-700 text-white text-xs px-2 py-0.5 rounded">תרגיל</span>
          {title}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-4 pb-4 text-sm text-gray-700 space-y-2 border-t border-gray-200 pt-3">{children}</div>}
    </div>
  );
}

function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono bg-gray-100 px-1 rounded text-sm">{children}</span>;
}

function Implies() {
  return <ArrowRight className="w-4 h-4 text-gray-500 inline mx-1 flex-shrink-0" />;
}

// =============================================
// Navigation
// =============================================

const sections = [
  { id: 'extend-basis', label: 'השלמה לבסיס' },
  { id: 'subspace-sum', label: 'סכום תת-מרחבים' },
  { id: 'dim-theorem', label: 'משפט המימדים' },
  { id: 'direct-sum', label: 'סכום ישר' },
  { id: 'matrices', label: 'כפל מטריצות' },
];

// =============================================
// Main Page
// =============================================

export default function Tirgul8Page() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-l from-violet-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8" />
          <h1 className="text-2xl font-bold">סיכום תרגול 8</h1>
        </div>
        <p className="text-indigo-200 text-sm">
          השלמה לבסיס, סכום תת-מרחבים, משפט המימדים הראשון, סכום ישר, כפל מטריצות
        </p>
      </div>

      {/* Quick Nav */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="text-sm font-medium text-gray-500 mb-2">ניווט מהיר</div>
        <div className="flex flex-wrap gap-2">
          {sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* ============================================= */}
      {/* SECTION 1: Extension to Basis */}
      {/* ============================================= */}
      <div id="extend-basis">
        <Section title="1. השלמה לבסיס" icon={<Layers className="w-5 h-5" />} color="text-indigo-700">
          <div className="space-y-4">
            <Thm id="thm-extend-basis" title="משפט ההשלמה לבסיס">
              <p>
                יהא <M>V</M> מרחב וקטורי נוצר סופית מעל שדה <M>F</M> עם <M>dim V = n</M>.
              </p>
              <p>
                אם <M>v₁, ..., vₖ ∈ V</M> בת&quot;ל עבור <M>k &lt; n</M>, אזי קיימים <M>vₖ₊₁, ..., vₙ ∈ V</M> כך
                ש-<M>v₁, ..., vₖ, ..., vₙ</M> בסיס ל-<M>V</M>.
              </p>
            </Thm>

            <Remark>
              <p>השלמה לבסיס אינה יחידה — ניתן לבחור וקטורים שונים להשלמה, והפרישה עשויה להשתנות.</p>
            </Remark>

            <Exercise title="השלמה לבסיס של R⁴">
              <p>
                <strong>נתון:</strong>{' '}
                <M>S = {'{'} u₁ = (1,0,1,2), u₂ = (0,1,1,2) {'}'} ⊆ R⁴</M> ו-<M>U = Sp(S)</M>.
              </p>
              <p>
                <strong>משימה:</strong> השלם את <M>S</M> לבסיס של <M>R⁴</M> ומצא תת-מרחב <M>W</M> כך
                ש-<M>U ∩ W = {'{'}0{'}'}</M> וגם <M>dim W = dim R⁴ - dim U</M>.
              </p>

              <div className="bg-white rounded p-3 mt-2 space-y-2">
                <p><strong>פתרון:</strong></p>
                <p>
                  <M>S</M> בת&quot;ל ו-<M>dim R⁴ = 4</M>, לכן צריך למצוא 2 וקטורים נוספים.
                </p>
                <p><strong>שלב 1 — מציאת u₃:</strong></p>
                <p>
                  כל וקטור ב-<M>Sp(u₁,u₂)</M> הוא מהצורה <M>(α, β, α+β, 2α+2β)</M>.
                  כלומר: קואורדינטה 3 = סכום שתי הראשונות, קואורדינטה 4 = כפליים הסכום.
                </p>
                <p>
                  לכן <M>u₃ = (0,0,1,0)</M> אינו צ&quot;ל שלהם (קואורדינטה 3 ≠ 0+0).
                </p>

                <p><strong>שלב 2 — מציאת u₄:</strong></p>
                <p>
                  כל וקטור ב-<M>Sp(u₁,u₂,u₃)</M> הוא מהצורה <M>(α, β, α+β+γ, 2α+2β)</M>.
                  קואורדינטה 4 תמיד שווה ל-<M>2α+2β</M>.
                </p>
                <p>
                  לכן <M>u₄ = (0,0,0,1)</M> אינו צ&quot;ל שלהם.
                </p>
                <p>
                  <M>{'{'}u₁, u₂, u₃, u₄{'}'}</M> — 4 וקטורים בת&quot;ל ב-<M>R⁴</M> <Implies /> בסיס.
                </p>
                <p>
                  <M>W = Sp{'{'}u₃, u₄{'}'} = Sp{'{'}(0,0,1,0), (0,0,0,1){'}'}</M>. מימד 2, וחיתוך <M>U ∩ W = {'{'}0{'}'}</M>.
                </p>
              </div>
            </Exercise>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="font-bold text-indigo-900 text-sm mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                האסטרטגיה להשלמה לבסיס
              </div>
              <ol className="text-sm text-indigo-800 space-y-1 list-decimal list-inside">
                <li>מצא את <M>Sp(S)</M> — מהי הצורה הכללית של צירוף לינארי.</li>
                <li>זהה את ה&quot;אילוצים&quot; — אילו קשרים קיימים בין הקואורדינטות.</li>
                <li>בחר וקטור ששובר אילוץ אחד.</li>
                <li>חזור עד שיש <M>n</M> וקטורים בת&quot;ל.</li>
              </ol>
            </div>

          </div>
        </Section>
      </div>

      {/* ============================================= */}
      {/* SECTION 2: Sum of Subspaces */}
      {/* ============================================= */}
      <div id="subspace-sum">
        <Section title="2. סכום של תת-מרחבים" icon={<Layers className="w-5 h-5" />} color="text-blue-700">
          <div className="space-y-4">
            {/* Motivation */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
              <strong>מוטיבציה:</strong> עבור תת-מרחבים <M>U, W ⊆ V</M>:
              <ul className="mt-1 space-y-1 mr-4">
                <li>&#8226; <M>U ∩ W</M> — תמיד תת-מרחב</li>
                <li>&#8226; <M>U ∪ W</M> — תת-מרחב רק אם <M>U ⊆ W</M> או <M>W ⊆ U</M></li>
              </ul>
              <p className="mt-1">
                אז מה התת-מרחב הכי קטן שמכיל את שניהם? <strong>הסכום <M>U + W</M></strong>.
              </p>
            </div>

            <Def id="def-sum" title="סכום תת-מרחבים (U + W)">
              <p>
                יהא <M>V</M> מרחב וקטורי מעל <M>F</M>, ויהיו <M>U, W ⊆ V</M> תת-מרחבים.
              </p>
              <p className="font-semibold mt-1">
                U + W = {'{'} u + w | u ∈ U, w ∈ W {'}'}
              </p>
              <p className="mt-1">
                קבוצת כל הסכומים של וקטור מ-<M>U</M> ווקטור מ-<M>W</M>.
              </p>
            </Def>

            <Claim id="claim-sum-contains" title="U, W ⊆ U + W ⊆ V">
              <p>
                לכל <M>u ∈ U</M>: <M>u = u + 0 ∈ U + W</M> (כי <M>0 ∈ W</M>).
              </p>
              <p>
                לכל <M>w ∈ W</M>: <M>w = 0 + w ∈ U + W</M> (כי <M>0 ∈ U</M>).
              </p>
              <p>
                <M>U + W ⊆ V</M> מסגירות <M>V</M> לחיבור.
              </p>
            </Claim>

            <Claim id="claim-sum-subspace" title="U + W הוא תת-מרחב של V">
              <p>סכום של שני תת-מרחבים הוא תמיד תת-מרחב.</p>
            </Claim>

            <Thm id="thm-span-sum" title="Sp(S) + Sp(T) = Sp(S ∪ T)">
              <p>
                יהא <M>V</M> מרחב וקטורי מעל <M>F</M>, ויהיו <M>S, T ⊆ V</M> שתי תת-קבוצות.
              </p>
              <p className="font-semibold">
                Sp(S) + Sp(T) = Sp(S ∪ T)
              </p>
            </Thm>

            <Example title="Sp{(2,1)} + Sp{(1,3)} = R²">
              <p>
                <M>Sp{'{'} (2,1) {'}'} + Sp{'{'} (1,3) {'}'}</M>
              </p>
              <p>
                = {'{'} α(2,1) + β(1,3) | α,β ∈ R {'}'} = Sp{'{'} (2,1), (1,3) {'}'} = R²
              </p>
              <p className="text-purple-600 mt-1">
                כי (2,1) ו-(1,3) בת&quot;ל, לכן פורשים את <M>R²</M>.
              </p>
            </Example>

            <Claim id="claim-sum-self" title="תכונות סכום">
              <p><strong>1.</strong> <M>U + U = U</M></p>
              <p className="text-xs text-emerald-600 mr-4">
                (⊆): u = u + 0 ∈ U + U. &nbsp;(⊇): u₁ + u₂ ∈ U מסגירות לחיבור.
              </p>
              <p className="mt-1"><strong>2.</strong> <M>U + V = V</M></p>
              <p className="text-xs text-emerald-600 mr-4">
                U + V ⊆ V (טענה קודמת). V ⊆ U + V כי v = 0 + v.
              </p>
            </Claim>

          </div>
        </Section>
      </div>

      {/* ============================================= */}
      {/* SECTION 3: First Dimension Theorem */}
      {/* ============================================= */}
      <div id="dim-theorem">
        <Section title="3. משפט המימדים הראשון" icon={<Star className="w-5 h-5" />} color="text-green-700">
          <div className="space-y-4">
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
              <div className="font-bold text-yellow-900 text-sm mb-1 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                אינטואיציה שגויה
              </div>
              <p className="text-sm text-yellow-800">
                היינו חושבים: <M>dim(U + W) = dim U + dim W</M>.
              </p>
              <p className="text-sm text-yellow-800 mt-1">
                <strong>דוגמה נגדית:</strong> <M>V = R²</M>, <M>U = W = R²</M>.
                אז <M>U + W = R²</M> אבל <M>dim U + dim W = 4 ≠ 2 = dim V</M>.
              </p>
              <p className="text-sm text-yellow-800 mt-1">
                הבעיה: U ו-W &quot;חופפים&quot; — צריך לחסר את החפיפה!
              </p>
            </div>

            <Thm id="thm-dimension" title="משפט המימדים הראשון">
              <p>
                יהיו <M>U, W</M> תת-מרחבים של מ&quot;ו נ&quot;ס <M>V</M> מעל <M>F</M>. אזי:
              </p>
              <div className="bg-green-100 rounded-lg p-3 mt-2 text-center font-bold text-green-900">
                dim(U + W) = dim U + dim W - dim(U ∩ W)
              </div>
            </Thm>

            <Exercise title="חישוב מימד חיתוך באמצעות משפט המימדים">
              <p>
                <strong>חשב:</strong> <M>dim( Sp{'{'}(1,0,0),(0,1,0){'}'} ∩ Sp{'{'}(0,0,1),(1,1,1){'}'} )</M>
              </p>
              <div className="bg-white rounded p-3 mt-2 space-y-2">
                <p><strong>פתרון:</strong></p>
                <p>
                  <M>U = Sp{'{'}(1,0,0),(0,1,0){'}'}</M> — שתי הקבוצות בת&quot;ל <Implies /> <M>dim U = 2</M>.
                </p>
                <p>
                  <M>W = Sp{'{'}(0,0,1),(1,1,1){'}'}</M> — בת&quot;ל <Implies /> <M>dim W = 2</M>.
                </p>
                <p>
                  מהמשפט: <M>Sp(S) + Sp(T) = Sp(S ∪ T)</M>. ארבעת הוקטורים פורשים את <M>R³</M>,
                  לכן <M>dim(U+W) = 3</M>.
                </p>
                <p className="font-semibold">
                  dim(U ∩ W) = dim U + dim W - dim(U + W) = 2 + 2 - 3 = 1
                </p>
              </div>
            </Exercise>

            <Thm id="thm-dim-equals-v" title="תת-מרחב עם אותו מימד = המרחב כולו">
              <p>
                יהא <M>V</M> מ&quot;ו נ&quot;ס, ויהא <M>W ⊆ V</M> תת-מרחב עם <M>dim W = dim V</M>.
              </p>
              <p className="font-semibold">אזי <M>W = V</M>.</p>
            </Thm>

            <Exercise title="Rₙ[x] = {p(x) | p(0)=0} + {p(x) | p(1)=0}">
              <p>
                <strong>הוכח:</strong> <M>Rₙ[x] = {'{'}p(x) ∈ Rₙ[x] | p(0)=0{'}'} + {'{'}p(x) ∈ Rₙ[x] | p(1)=0{'}'}</M>
              </p>
              <div className="bg-white rounded p-3 mt-2 space-y-2">
                <p><strong>פתרון מבני:</strong></p>
                <p>
                  יהא <M>p(x) = aₙxⁿ + ... + a₁x + a₀</M>. נכתוב:
                </p>
                <p className="font-mono bg-gray-100 p-2 rounded">
                  p(x) = (aₙxⁿ + ... + a₁x + a₀x) + (a₀ - a₀x)
                </p>
                <p>
                  הגורם הראשון מתאפס ב-0 (כל האיברים כוללים x).
                  הגורם השני מתאפס ב-1 (כי <M>a₀ - a₀·1 = 0</M>).
                </p>

                <p className="mt-2"><strong>פתרון באמצעות משפט המימדים:</strong></p>
                <p>
                  <M>dim Rₙ[x] = n+1</M>.
                  לכל <M>a ∈ R</M>: <M>dim{'{'}p(x) | p(a)=0{'}'} = n</M>.
                </p>
                <p>
                  החיתוך: <M>p(0)=0</M> גורר <M>a₀=0</M>. אז <M>p(1)=0</M> גורר <M>a₁ = -(aₙ+...+a₂)</M>.
                </p>
                <p>
                  <M>p(x) ∈ Sp{'{'}xⁿ-x, xⁿ⁻¹-x, ..., x²-x{'}'}</M> — קבוצה בת&quot;ל, לכן <M>dim(חיתוך) = n-1</M>.
                </p>
                <p className="font-semibold">
                  dim(סכום) = n + n - (n-1) = n+1 = dim Rₙ[x] <Implies /> שיוויון.
                </p>
              </div>
            </Exercise>

            <Exercise title="EVEN + ODD = R^R">
              <p>
                הוכח כי <M>EVEN + ODD = R^R</M> כאשר:
              </p>
              <p>
                <M>EVEN = {'{'}f ∈ R^R | f(x)=f(-x){'}'}</M>, <M>ODD = {'{'}f ∈ R^R | f(x)=-f(-x){'}'}</M>
              </p>
              <div className="bg-white rounded p-3 mt-2 space-y-2">
                <p><strong>פתרון:</strong></p>
                <p>
                  <strong>שים לב:</strong> לא ניתן להשתמש במשפט המימדים — <M>R^R</M> לא נ&quot;ס!
                </p>
                <p>
                  ההכלה <M>EVEN + ODD ⊆ R^R</M> טריוויאלית.
                </p>
                <p>לכיוון השני, תהא <M>f ∈ R^R</M>. נכתוב:</p>
                <div className="font-mono bg-gray-100 p-2 rounded text-center">
                  f(x) = ½(f(x)+f(-x)) + ½(f(x)-f(-x))
                </div>
                <p className="mt-1">
                  <M>f_even(x) = ½(f(x)+f(-x))</M> — זוגית:
                  <M>f_even(-x) = ½(f(-x)+f(x)) = f_even(x)</M>
                </p>
                <p>
                  <M>f_odd(x) = ½(f(x)-f(-x))</M> — אי-זוגית:
                  <M>f_odd(-x) = ½(f(-x)-f(x)) = -f_odd(x)</M>
                </p>
                <p className="font-semibold">לכן <M>f ∈ EVEN + ODD</M>.</p>
              </div>
            </Exercise>

            <Exercise title="חיתוך של סכום תת-מרחבים">
              <p>
                יהיו <M>U, W, Z ⊆ V</M> תת-מרחבים. נניח <M>U ∩ W = {'{'}0{'}'}</M> ו-<M>(U+W) ∩ Z = {'{'}0{'}'}</M>.
              </p>
              <p>
                <strong>הוכח:</strong> <M>U ∩ (W+Z) = {'{'}0{'}'}</M>.
              </p>
              <div className="bg-white rounded p-3 mt-2 space-y-2">
                <p><strong>פתרון:</strong> נוכיח <M>dim(U ∩ (W+Z)) = 0</M>.</p>
                <p>משפט המימדים פעמיים:</p>
                <p className="font-mono bg-gray-100 p-2 rounded text-xs">
                  dim((U+W)+Z) = dim(U+W) + dim Z - dim((U+W)∩Z)<br />
                  dim(U+(W+Z)) = dim U + dim(W+Z) - dim(U∩(W+Z))
                </p>
                <p>
                  היות ש-<M>W∩Z ⊆ (U+W)∩Z</M> ו-<M>dim((U+W)∩Z)=0</M>, לכן <M>dim(W∩Z)=0</M>.
                </p>
                <p>
                  מ-<M>U∩W={'{'}0{'}'}</M>: <M>dim(U+W) = dim U + dim W</M>.
                  מ-<M>W∩Z={'{'}0{'}'}</M>: <M>dim(W+Z) = dim W + dim Z</M>.
                </p>
                <p>
                  האגפים שווים (אסוציאטיביות הסכום). נחסר <M>dim U, dim W, dim Z</M>:
                </p>
                <p className="font-semibold">dim(U ∩ (W+Z)) = 0</p>
              </div>
            </Exercise>

          </div>
        </Section>
      </div>

      {/* ============================================= */}
      {/* SECTION 4: Direct Sum */}
      {/* ============================================= */}
      <div id="direct-sum">
        <Section title="4. סכום ישר" icon={<Layers className="w-5 h-5" />} color="text-purple-700">
          <div className="space-y-4">
            <Def id="def-direct-sum" title="סכום ישר (V = U ⊕ W)">
              <p>
                יהיו <M>U, W</M> תת-מרחבים של מרחב וקטורי <M>V</M>. אזי <M>V</M> הוא סכום ישר של <M>U</M> ו-<M>W</M> אם:
              </p>
              <ol className="mt-1 mr-4 space-y-1 list-decimal list-inside font-semibold">
                <li>V = U + W</li>
                <li>U ∩ W = {'{'}0{'}'}  </li>
              </ol>
              <p className="mt-1">במקרה כזה נסמן <M>V = U ⊕ W</M>.</p>
            </Def>

            <Example title="R² = Sp{(1,0)} ⊕ Sp{(0,1)}">
              <p>
                <M>Sp{'{'}(1,0){'}'} + Sp{'{'}(0,1){'}'} = R²</M> (פורשים את R²).
              </p>
              <p>
                <M>Sp{'{'}(1,0){'}'} ∩ Sp{'{'}(0,1){'}'} = {'{'}0{'}'}</M> (ציר X ∩ ציר Y).
              </p>
              <p className="font-semibold">לכן זה סכום ישר.</p>
            </Example>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="font-bold text-red-900 text-sm mb-2">
                אנטי-דוגמה: Sp{'{'}(1,0){'}'} + Sp{'{'}(0,1),(1,1){'}'} = R² אבל לא סכום ישר
              </div>
              <p className="text-sm text-red-800">
                החיתוך אינו טריוויאלי: הוקטור <M>(1,0)</M> נמצא בשני המחוברים.
              </p>
            </div>

            <Thm id="thm-direct-sum-dim" title="תנאי מימדי לסכום ישר">
              <p>
                יהיו <M>U, W</M> תת-מרחבים של מ&quot;ו נ&quot;ס <M>V</M>, כך שמתקיים <M>V = U + W</M>.
              </p>
              <p className="font-semibold mt-1">
                V = U ⊕ W &nbsp;⟺&nbsp; dim V = dim U + dim W
              </p>
            </Thm>

            <Claim id="claim-unique-decomp" title="תנאי שקול — הצגה יחידה">
              <p>
                יהיו <M>U, W</M> תת-מרחבים של <M>V</M>.
              </p>
              <p className="font-semibold mt-1">
                U ∩ W = {'{'}0{'}'} &nbsp;⟺&nbsp; לכל v ∈ U + W קיימים יחידים u ∈ U ו-w ∈ W כך ש-v = u + w
              </p>
              <div className="mt-2 space-y-2 text-xs">
                <p><strong>הוכחה (⟹):</strong></p>
                <p>
                  נניח <M>v = u₁+w₁ = u₂+w₂</M>. מהעברת אגפים: <M>u₁-u₂ = w₂-w₁</M>.
                  מסגירות, <M>u₁-u₂ ∈ U</M> ו-<M>w₂-w₁ ∈ W</M>,
                  לכן <M>u₁-u₂, w₂-w₁ ∈ U ∩ W = {'{'}0{'}'}</M>.
                  לכן <M>u₁=u₂, w₁=w₂</M>.
                </p>
                <p><strong>הוכחה (⟸):</strong></p>
                <p>
                  נניח <M>U ∩ W ≠ {'{'}0{'}'}</M>. קיים <M>v ≠ 0, v ∈ U ∩ W</M>.
                  אז <M>-v ∈ U ∩ W</M> (תת-מרחב).
                  נכתוב: <M>0 = v + (-v) = 0 + 0</M> — שתי הצגות שונות, סתירה.
                </p>
              </div>
            </Claim>

            <Exercise title="האם Rₙ[x] = {p | p(0)=0} ⊕ {p | p(1)=0}?">
              <p>תלוי ב-<M>n</M>.</p>
              <div className="bg-white rounded p-3 mt-2 space-y-2">
                <p>
                  הוכחנו: <M>dim{'{'}p | p(0)=0{'}'} = dim{'{'}p | p(1)=0{'}'} = n</M>.
                </p>
                <p>
                  וגם: <M>dim(חיתוך) = n - 1</M>.
                </p>
                <p>
                  החיתוך = <M>{'{'}0{'}'}</M> רק אם <M>n - 1 = 0</M>, כלומר <M>n = 1</M>.
                </p>
                <p className="font-semibold">
                  לכן: <M>R₁[x] = {'{'}p | p(0)=0{'}'} ⊕ {'{'}p | p(1)=0{'}'}</M>.
                  עבור <M>n &gt; 1</M> — סכום, אבל לא ישר.
                </p>
              </div>
            </Exercise>

            {/* Summary table */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="font-bold text-purple-900 text-sm mb-3">סיכום: סכום vs סכום ישר</div>
              <div className="overflow-x-auto">
                <table className="text-sm w-full">
                  <thead>
                    <tr className="border-b border-purple-200">
                      <th className="text-right py-1 pl-4 text-purple-900">תכונה</th>
                      <th className="text-right py-1 pl-4 text-purple-900">U + W</th>
                      <th className="text-right py-1 text-purple-900">U ⊕ W</th>
                    </tr>
                  </thead>
                  <tbody className="text-purple-800">
                    <tr className="border-b border-purple-100">
                      <td className="py-1 pl-4">תת-מרחב?</td>
                      <td className="py-1 pl-4">כן, תמיד</td>
                      <td className="py-1">כן</td>
                    </tr>
                    <tr className="border-b border-purple-100">
                      <td className="py-1 pl-4">חיתוך</td>
                      <td className="py-1 pl-4">יכול להיות כל דבר</td>
                      <td className="py-1">{'{'}0{'}'} בלבד</td>
                    </tr>
                    <tr className="border-b border-purple-100">
                      <td className="py-1 pl-4">הצגה</td>
                      <td className="py-1 pl-4">v = u + w (לא בהכרח יחידה)</td>
                      <td className="py-1">v = u + w (יחידה!)</td>
                    </tr>
                    <tr>
                      <td className="py-1 pl-4">נוסחת מימדים</td>
                      <td className="py-1 pl-4">dim(U+W) = dimU + dimW - dim(U∩W)</td>
                      <td className="py-1">dim V = dim U + dim W</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </Section>
      </div>

      {/* ============================================= */}
      {/* SECTION 5: Matrix Multiplication */}
      {/* ============================================= */}
      <div id="matrices">
        <Section title="5. כפל מטריצות" icon={<Layers className="w-5 h-5" />} color="text-orange-700">
          <div className="space-y-4">
            <Def id="def-mn" title="Mₙ(F) — מטריצות ריבועיות">
              <p>
                קבוצת המטריצות הריבועיות מסדר <M>n × n</M> מעל שדה <M>F</M> מסומנת <M>Mₙ(F)</M>.
              </p>
            </Def>

            <Def id="def-matrix-mult" title="כפל מטריצות">
              <p>
                עבור <M>A ∈ M_{'m×p'}(F)</M> ו-<M>B ∈ M_{'p×n'}(F)</M>, המכפלה <M>AB</M> היא
                מטריצה מסדר <M>m × n</M>:
              </p>
              <div className="bg-blue-100 rounded p-2 mt-2 text-center font-semibold font-mono">
                [AB]ᵢⱼ = aᵢ₁b₁ⱼ + aᵢ₂b₂ⱼ + ... + aᵢₚbₚⱼ = Σₖ aᵢₖbₖⱼ
              </div>
              <p className="mt-2">
                כלומר: האיבר בשורה <M>i</M> ועמודה <M>j</M> = מכפלה סקלרית של שורה <M>i</M> של <M>A</M> בעמודה <M>j</M> של <M>B</M>.
              </p>
            </Def>

            <Remark>
              <p>
                ניתן להכפיל <M>A</M> ו-<M>B</M> רק אם <strong>מספר העמודות של A = מספר השורות של B</strong>.
              </p>
              <p className="mt-1">
                <M>A</M> מסדר <M>m×p</M>, <M>B</M> מסדר <M>p×n</M> <Implies /> <M>AB</M> מסדר <M>m×n</M>.
              </p>
              <p className="mt-1">
                בכיוון ההפוך (<M>BA</M>) — לא בהכרח מוגדר (מידות שונות)!
              </p>
            </Remark>

            <Example title="דוגמת כפל 3×2 · 2×4">
              <div className="font-mono text-xs bg-purple-100 p-3 rounded overflow-x-auto">
                <pre className="whitespace-pre">{`⎛ 1  2 ⎞          ⎛-11 -14  -3 -20⎞
⎜ 0 -4 ⎟ · (-1 -2 -3 -4) = ⎜ 20  24   0  32⎟
⎝ 5  6 ⎠   (-5 -6  0 -8)   ⎝-35 -46 -15 -68⎠`}</pre>
              </div>
              <p className="mt-2">
                למשל: <M>[AB]₁₁ = 1·(-1) + 2·(-5) = -1-10 = -11</M>.
              </p>
            </Example>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="font-bold text-orange-900 text-sm mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                סימון סיגמה (Σ)
              </div>
              <div className="text-sm text-orange-800 space-y-1">
                <p>
                  דרך מקוצרת לכתוב סכום:
                  <M>Σᵢ₌₁ⁿ i = 1 + 2 + ... + n</M>
                </p>
                <p>
                  בכפל מטריצות: <M>[AB]ᵢⱼ = Σₖ₌₁ᵖ aᵢₖbₖⱼ</M>
                </p>
              </div>
            </div>

            <Exercise title="עמודת אפסים ב-A → עמודת אפסים ב-BA">
              <p>
                יהא <M>F</M> שדה ותהא <M>A ∈ Mₙ(F)</M>. נניח שקיים <M>1 ≤ j ≤ n</M> כך שלכל <M>1 ≤ i ≤ n</M>
                מתקיים <M>[A]ᵢⱼ = 0</M> (העמודה ה-<M>j</M> של <M>A</M> היא עמודת אפסים).
              </p>
              <p>
                <strong>הוכח:</strong> לכל <M>B ∈ Mₙ(F)</M> ולכל <M>1 ≤ i ≤ n</M> מתקיים <M>[BA]ᵢⱼ = 0</M>
                (העמודה ה-<M>j</M> של <M>BA</M> היא עמודת אפסים).
              </p>
              <div className="bg-white rounded p-3 mt-2 space-y-2">
                <p><strong>פתרון:</strong> תהא <M>B ∈ Mₙ(F)</M>. יהא <M>1 ≤ i ≤ n</M>:</p>
                <div className="font-mono bg-gray-100 p-2 rounded text-xs">
                  [BA]ᵢⱼ = Σₖ [B]ᵢₖ[A]ₖⱼ = [B]ᵢ₁·0 + ... + [B]ᵢₙ·0 = (Σₖ [B]ᵢₖ)·0 = 0
                </div>
                <p>
                  כל <M>[A]ₖⱼ = 0</M> (עמודה j אפסים), לכן כל מחובר = 0.
                </p>
              </div>
            </Exercise>

          </div>
        </Section>
      </div>

      {/* ============================================= */}
      {/* Summary Cheat Sheet */}
      {/* ============================================= */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="font-bold text-white text-lg mb-4">סיכום אולטרה-קצר — תרגול 8</h2>
        <div className="space-y-1">
          {[
            'השלמה לבסיס: k בת"ל, dim V=n → השלם ל-n ע"י שבירת אילוצי Span.',
            'U + W = { u+w | u∈U, w∈W }. תמיד תת-מרחב.',
            'Sp(S) + Sp(T) = Sp(S∪T).',
            'U + U = U. U + V = V.',
            'משפט המימדים: dim(U+W) = dimU + dimW - dim(U∩W).',
            'dim W = dim V, W⊆V → W = V.',
            'סכום ישר: V = U⊕W ⟺ V=U+W וגם U∩W={0}.',
            'U⊕W ⟺ הצגה יחידה v=u+w.',
            'V=U+W → V=U⊕W ⟺ dimV = dimU + dimW.',
            '[AB]ᵢⱼ = שורה i של A · עמודה j של B.',
            'AB מוגדר ⟺ עמודות A = שורות B.',
            'עמודת אפסים ב-A → עמודת אפסים ב-BA.',
          ].map((line, i) => (
            <div key={i} className="text-sm text-green-400 font-mono">{line}</div>
          ))}
        </div>
      </div>

    </div>
  );
}
