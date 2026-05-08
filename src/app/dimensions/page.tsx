'use client';

import { useState } from 'react';
import {
  BookOpen, ChevronDown, ChevronUp, Lightbulb, AlertTriangle,
  CheckCircle, Layers, Target, Ruler, Grid3X3, FileText, Zap
} from 'lucide-react';

/* ─── reusable components ─── */

function Section({ title, icon, color, children }: {
  title: string; icon: React.ReactNode; color: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className={`font-bold text-xl mb-4 flex items-center gap-2 ${color}`}>{icon}{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Def({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="font-bold text-blue-800 text-sm mb-1">הגדרה: {title}</div>
      <div className="text-sm text-blue-900 space-y-1">{children}</div>
    </div>
  );
}

function Thm({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <div className="font-bold text-purple-800 text-sm mb-1">משפט: {title}</div>
      <div className="text-sm text-purple-900 space-y-1">{children}</div>
    </div>
  );
}

function Proof({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition-colors"
      >
        <span className="font-medium text-sm text-gray-700 flex items-center gap-2">
          <FileText className="w-3.5 h-3.5" /> הוכחה
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-700 space-y-2 border-t border-gray-200 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

function Example({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-emerald-100 transition-colors"
      >
        <span className="font-bold text-sm text-emerald-700 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> דוגמה: {title}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-emerald-600" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-emerald-800 space-y-2 border-t border-emerald-200 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 flex gap-2">
      <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-amber-800">{children}</div>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-50 border border-red-300 rounded-lg p-3 flex gap-2">
      <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-red-800">{children}</div>
    </div>
  );
}

function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono bg-gray-100 px-1 rounded text-sm">{children}</span>;
}

/* ─── main page ─── */

export default function DimensionsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ממדים — סיכום מלא
        </h1>
        <p className="text-gray-600">הרצאות 8–15 + תרגולים 6–11</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {['תלות לינארית', 'מרחב נפרש', 'בסיס', 'ממד', 'שטייניץ', 'נוסחת הממדים', 'דרגה ואפסיות', 'קואורדינטות'].map(t => (
            <span key={t} className="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-lg text-xs font-medium">{t}</span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 1: SUBSPACES */}
      {/* ═══════════════════════════════════════ */}
      <Section title="תת-מרחב (Subspace)" icon={<Layers className="w-5 h-5" />} color="text-indigo-700">
        <Def title="תת-מרחב וקטורי">
          <p>תת-קבוצה לא ריקה <M>W ⊆ V</M> היא <strong>תת-מרחב</strong> אם מתקיימים שלושת התנאים:</p>
          <ol className="list-decimal pr-6 space-y-1 mt-1">
            <li><M>0⃗ ∈ W</M></li>
            <li><strong>סגירות לחיבור:</strong> אם <M>u, w ∈ W</M> אז <M>u + w ∈ W</M></li>
            <li><strong>סגירות לכפל בסקלר:</strong> אם <M>u ∈ W</M> ו-<M>α ∈ F</M> אז <M>αu ∈ W</M></li>
          </ol>
        </Def>

        <Tip>
          <strong>קיצור דרך:</strong> אפשר לבדוק תנאי אחד במקום שלושה: <M>W ≠ ∅</M> ולכל <M>u, w ∈ W</M> ולכל <M>α, β ∈ F</M>: <M>αu + βw ∈ W</M>.
        </Tip>

        <Def title="חיבור תתי-מרחבים">
          <p><M>U + W = {'{u + w | u ∈ U, w ∈ W}'}</M></p>
          <p>זהו תת-מרחב של V, ובעצם הקטן ביותר שמכיל את U ואת W.</p>
        </Def>

        <Def title="סכום ישר (Direct Sum)">
          <p><M>V = U ⊕ W</M> אם <M>V = U + W</M> וגם <M>U ∩ W = {'{0⃗}'}</M>.</p>
          <p>שקול: כל <M>v ∈ V</M> מתפרק <strong>באופן יחיד</strong> ל-<M>v = u + w</M> עם <M>u ∈ U, w ∈ W</M>.</p>
        </Def>

        <Thm title="תכונות חשובות">
          <ul className="list-disc pr-6 space-y-1">
            <li>חיתוך של תתי-מרחבים הוא תת-מרחב: <M>U ∩ W</M> תת-מרחב</li>
            <li>איחוד של תתי-מרחבים <strong>לא</strong> בהכרח תת-מרחב! (אלא אם אחד מכיל את השני)</li>
            <li>אם <M>W ⊆ V</M> תת-מרחב ו-<M>dim W = dim V</M> אז <M>W = V</M></li>
          </ul>
        </Thm>

        <Warning>
          <strong>טעות נפוצה:</strong> לא לשכוח לבדוק <M>0⃗ ∈ W</M>! למשל, <M>{'W = {(x,y) | x + y = 1}'}</M> <strong>אינו</strong> תת-מרחב כי <M>(0,0) ∉ W</M>.
        </Warning>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 2: SPAN */}
      {/* ═══════════════════════════════════════ */}
      <Section title="מרחב נפרש (Span)" icon={<Grid3X3 className="w-5 h-5" />} color="text-blue-700">
        <Def title="מרחב נפרש">
          <p>עבור <M>v₁,...,vₖ ∈ V</M>:</p>
          <p className="font-mono text-center mt-1">Span{'{v₁,...,vₖ}'} = {'{α₁v₁ + ... + αₖvₖ | α₁,...,αₖ ∈ F}'}</p>
          <p className="mt-1">כלומר — אוסף כל <strong>הצירופים הלינאריים</strong> של הוקטורים.</p>
        </Def>

        <Thm title="תכונות Span">
          <ul className="list-disc pr-6 space-y-1">
            <li><M>Span(∅) = {'{0⃗}'}</M></li>
            <li><M>Span(S)</M> תמיד תת-מרחב</li>
            <li><M>Span(S)</M> הוא תת-המרחב <strong>הקטן ביותר</strong> שמכיל את S</li>
            <li>אם <M>v ∈ Span{'{v₁,...,vₖ}'}</M> אז <M>Span{'{v₁,...,vₖ}'} = Span{'{v₁,...,vₖ,v}'}</M></li>
            <li>אם <M>v ∉ Span{'{v₁,...,vₖ}'}</M> אז <M>v, v₁,...,vₖ</M> בת&quot;ל</li>
          </ul>
        </Thm>

        <Example title="האם וקטור שייך ל-Span?">
          <p>האם <M>(2,4,-7) ∈ Span{'{(1,1,0), (0,0,1), (1,2,3)}'}</M>?</p>
          <p className="mt-1">פותרים: <M>α₁(1,1,0) + α₂(0,0,1) + α₃(1,2,3) = (2,4,-7)</M></p>
          <div className="font-mono text-xs bg-white p-2 rounded border mt-1">
            <p>[1 0 1 | 2]</p>
            <p>[1 0 2 | 4]&ensp; → דירוג → פתרון יחיד</p>
            <p>[0 1 3 | -7]</p>
          </div>
          <p className="mt-1">נקבל: <M>α₁ = 0, α₂ = -4, α₃ = 2</M>. כלומר <strong>כן, שייך ל-Span</strong>.</p>
        </Example>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 3: LINEAR INDEPENDENCE */}
      {/* ═══════════════════════════════════════ */}
      <Section title="תלות / אי-תלות לינארית" icon={<Zap className="w-5 h-5" />} color="text-orange-700">
        <Def title="אי-תלות לינארית (בת&quot;ל)">
          <p><M>v₁,...,vₖ ∈ V</M> <strong>בלתי תלויים לינארית</strong> אם:</p>
          <p className="font-mono text-center mt-1">α₁v₁ + ... + αₖvₖ = 0⃗ ⟹ α₁ = ... = αₖ = 0</p>
          <p className="mt-1">כלומר — הצירוף הלינארי <strong>היחיד</strong> שנותן 0⃗ הוא הטריוויאלי.</p>
        </Def>

        <Def title="תלות לינארית (ת&quot;ל)">
          <p><M>v₁,...,vₖ</M> <strong>תלויים לינארית</strong> אם קיימים <M>α₁,...,αₖ</M> <strong>לא כולם 0</strong> כך ש-<M>α₁v₁ + ... + αₖvₖ = 0⃗</M>.</p>
          <p className="mt-1"><strong>שקול:</strong> אחד מהוקטורים הוא צ&quot;ל של האחרים.</p>
        </Def>

        <Thm title="תכונות חשובות">
          <ul className="list-disc pr-6 space-y-1">
            <li>וקטור בודד <M>v ≠ 0⃗</M> תמיד בת&quot;ל</li>
            <li>קבוצה שמכילה את <M>0⃗</M> תמיד ת&quot;ל</li>
            <li>אם <M>v₁, v₂</M> ת&quot;ל, אחד הוא כפולה סקלרית של השני</li>
            <li>תת-קבוצה של קבוצה בת&quot;ל — גם בת&quot;ל</li>
            <li>קבוצה שמכילה קבוצה ת&quot;ל — גם ת&quot;ל</li>
          </ul>
        </Thm>

        <Thm title="בת&quot;ל ⟺ ייצוג יחיד (הרצאה 9)">
          <p><M>v₁,...,vₖ</M> בת&quot;ל <strong>⟺</strong> לכל <M>v ∈ Span{'{v₁,...,vₖ}'}</M> קיים ייצוג <strong>יחיד</strong> כצ&quot;ל.</p>
        </Thm>
        <Proof>
          <p><strong>⟹ (בת&quot;ל → ייצוג יחיד):</strong></p>
          <p>נניח שני ייצוגים: <M>v = α₁v₁+...+αₖvₖ = β₁v₁+...+βₖvₖ</M></p>
          <p>חיסור: <M>(α₁-β₁)v₁ + ... + (αₖ-βₖ)vₖ = 0⃗</M></p>
          <p>מבת&quot;ל: <M>αᵢ - βᵢ = 0</M> לכל i, כלומר <M>αᵢ = βᵢ</M>. ✓</p>
          <p className="mt-2"><strong>⟸ (ייצוג יחיד → בת&quot;ל):</strong></p>
          <p>נניח <M>α₁v₁+...+αₖvₖ = 0⃗</M>. גם <M>0·v₁+...+0·vₖ = 0⃗</M>.</p>
          <p>מייצוג יחיד: <M>αᵢ = 0</M> לכל i. בת&quot;ל. ✓</p>
        </Proof>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="font-bold text-orange-800 text-sm mb-2">שיטת בדיקת בת&quot;ל (תרגול 6)</div>
          <ol className="list-decimal pr-6 text-sm text-orange-900 space-y-1">
            <li>כתוב <M>α₁v₁ + ... + αₖvₖ = 0⃗</M></li>
            <li>בנה מטריצת מקדמים A (הוקטורים כעמודות)</li>
            <li>דרג את <M>Ax = 0</M></li>
            <li>אם רק פתרון טריוויאלי → <strong>בת&quot;ל</strong></li>
            <li>אם יש משתנים חופשיים → <strong>ת&quot;ל</strong></li>
          </ol>
        </div>

        <Example title="בדיקת בת&quot;ל ב-ℝ³ (תרגול 6)">
          <p><M>v₁ = (1,1,0), v₂ = (0,0,1), v₃ = (2,2,-1)</M></p>
          <div className="font-mono text-xs bg-white p-2 rounded border mt-1">
            <p>[1 0 2 | 0]&ensp;&ensp; R₂→R₂-R₁</p>
            <p>[1 0 2 | 0]&ensp; ────────→&ensp; [1 0 2 | 0]</p>
            <p>[0 1 -1| 0]&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; [0 0 0 | 0]</p>
            <p>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; [0 1 -1| 0]</p>
          </div>
          <p className="mt-1"><M>α₃</M> משתנה חופשי → <strong>ת&quot;ל!</strong></p>
          <p>למשל <M>α₃ = 1</M> נותן <M>α₁ = -2, α₂ = 1</M>: כלומר <M>v₃ = 2v₁ - v₂</M>.</p>
        </Example>

        <Example title="בדיקת פרישה ב-ℝ³ (תרגול 6)">
          <p>האם <M>v₁ = (1,1,0), v₂ = (0,0,1), v₃ = (1,2,3)</M> פורשים את ℝ³?</p>
          <p className="mt-1">לכל <M>b = (b₁,b₂,b₃)</M> פותרים <M>x₁v₁ + x₂v₂ + x₃v₃ = b</M>:</p>
          <div className="font-mono text-xs bg-white p-2 rounded border mt-1">
            <p>[1 0 1 | b₁]&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; [1 0 0 | 2b₁-b₂]</p>
            <p>[1 0 2 | b₂]&ensp; → → →&ensp; [0 1 0 | b₃-3b₂+3b₁]</p>
            <p>[0 1 3 | b₃]&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; [0 0 1 | b₂-b₁]</p>
          </div>
          <p className="mt-1">פתרון יחיד <strong>לכל</strong> b → <strong>כן, פורשים את ℝ³</strong>. (וגם בת&quot;ל!)</p>
        </Example>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 4: BASIS */}
      {/* ═══════════════════════════════════════ */}
      <Section title="בסיס (Basis)" icon={<Target className="w-5 h-5" />} color="text-green-700">
        <Def title="בסיס">
          <p>קבוצה <M>B ⊆ V</M> היא <strong>בסיס</strong> של V אם:</p>
          <ol className="list-decimal pr-6 mt-1">
            <li><M>Span(B) = V</M> (B פורש את V)</li>
            <li>B <strong>בלתי תלוי לינארית</strong></li>
          </ol>
        </Def>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="font-bold text-green-800 text-sm mb-2">בסיסים סטנדרטיים</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-900">
            <div className="bg-white rounded p-2 border border-green-100">
              <div className="font-bold">Fⁿ:</div>
              <p><M>e₁=(1,0,...,0), e₂=(0,1,...,0),..., eₙ=(0,...,0,1)</M></p>
            </div>
            <div className="bg-white rounded p-2 border border-green-100">
              <div className="font-bold">Fₙ[x] (פולינומים מדרגה ≤ n):</div>
              <p><M>{'{1, x, x², ..., xⁿ}'}</M></p>
            </div>
            <div className="bg-white rounded p-2 border border-green-100">
              <div className="font-bold">M_{'{m×n}'}(F) (מטריצות):</div>
              <p><M>{'{Eᵢⱼ}'}</M> — מטריצה עם 1 במקום (i,j) ו-0 בשאר</p>
            </div>
          </div>
        </div>

        <Thm title="תכונות הבסיס">
          <ul className="list-disc pr-6 space-y-1">
            <li>לכל מ&quot;ו סוף-ממדי <strong>קיים</strong> בסיס</li>
            <li><strong>כל בסיס של V הוא באותו גודל</strong> (מלמת שטייניץ)</li>
            <li>אם B בסיס אז לכל <M>v ∈ V</M> יש ייצוג <strong>יחיד</strong> כצ&quot;ל של אברי B</li>
          </ul>
        </Thm>

        <Thm title="המשפט ה-&quot;שלישייה&quot; (הרצאה 10)">
          <p>אם <M>dim V = n</M> ו-<M>S ⊆ V</M> עם <M>|S| = n</M>, אז:</p>
          <p className="text-center font-bold mt-1">S בסיס ⟺ S בת&quot;ל ⟺ S פורש את V</p>
          <p className="mt-1"><strong>חשוב מאוד!</strong> מספיק לבדוק <strong>רק אחד</strong> מהשניים (בת&quot;ל או פורש) כשיש לנו בדיוק n וקטורים.</p>
        </Thm>

        <Tip>
          <strong>במבחן:</strong> אם נותנים n וקטורים ב-<M>Fⁿ</M> ושואלים &quot;האם בסיס?&quot; — מספיק לבדוק בת&quot;ל <strong>בלבד</strong> (או פריש בלבד). לא צריך את שניהם!
        </Tip>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="font-bold text-green-800 text-sm mb-2">איך מוצאים בסיס?</div>
          <div className="text-sm text-green-900 space-y-2">
            <p><strong>שיטה 1 — מקבוצה פורשת:</strong> מתחילים עם קבוצה פורשת, מסירים וקטורים תלויים עד שנשארת קבוצה בת&quot;ל.</p>
            <p><strong>שיטה 2 — מקבוצה בת&quot;ל:</strong> מתחילים עם קבוצה בת&quot;ל, מוסיפים וקטורים שלא ב-Span עד שפורשים.</p>
            <p><strong>שיטה 3 — פרמטריזציה:</strong> עבור תת-מרחב המוגדר ע&quot;י משוואות, מציבים פרמטרים ומוצאים וקטורים יוצרים.</p>
          </div>
        </div>

        <Example title="מציאת בסיס לתת-מרחב (תרגול 7)">
          <p><M>W = {'{(x,y,z) ∈ ℝ³ | x + y = 0}'}</M></p>
          <p className="mt-1">פרמטריזציה: <M>x = -y</M>, אז:</p>
          <p className="font-mono text-center">(x,y,z) = (-y, y, z) = y(-1,1,0) + z(0,0,1)</p>
          <p className="mt-1">בסיס: <M>{'{(-1,1,0), (0,0,1)}'}</M>, לכן <M>dim W = 2</M>.</p>
        </Example>

        <Example title="השלמה לבסיס (תרגול 8)">
          <p><M>S = {'{u₁=(1,0,1,2), u₂=(0,1,1,2)}'} ⊂ ℝ⁴</M>. השלם לבסיס של ℝ⁴.</p>
          <p className="mt-1">dim(Span S) = 2. צריכים עוד 2 וקטורים בת&quot;ל.</p>
          <p>מוסיפים: <M>u₃ = (0,0,1,0)</M> ו-<M>u₄ = (0,0,0,1)</M>.</p>
          <p className="mt-1">בסיס ℝ⁴: <M>{'{u₁, u₂, u₃, u₄}'}</M>. ✓</p>
          <p className="mt-1"><strong>בונוס:</strong> <M>W = Span{'{u₃, u₄}'}</M> הוא משלים ישר: <M>ℝ⁴ = U ⊕ W</M>.</p>
        </Example>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 5: DIMENSION */}
      {/* ═══════════════════════════════════════ */}
      <Section title="ממד (Dimension)" icon={<Ruler className="w-5 h-5" />} color="text-violet-700">
        <Def title="ממד">
          <p>הממד של מ&quot;ו V (מסומן <M>dim V</M>) הוא <strong>מספר האיברים בבסיס כלשהו</strong> של V.</p>
          <p className="mt-1">(מוגדר היטב כי כל הבסיסים באותו גודל.)</p>
        </Def>

        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
          <div className="font-bold text-violet-800 text-sm mb-2">ממדים חשובים</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-violet-900">
            <div className="flex justify-between bg-white rounded p-2 border border-violet-100">
              <span><M>dim(Fⁿ)</M></span><span className="font-bold">= n</span>
            </div>
            <div className="flex justify-between bg-white rounded p-2 border border-violet-100">
              <span><M>dim(Fₙ[x])</M></span><span className="font-bold">= n + 1</span>
            </div>
            <div className="flex justify-between bg-white rounded p-2 border border-violet-100">
              <span><M>dim(M_{'m×n'}(F))</M></span><span className="font-bold">= m · n</span>
            </div>
            <div className="flex justify-between bg-white rounded p-2 border border-violet-100">
              <span><M>dim({'{0⃗}'})</M></span><span className="font-bold">= 0</span>
            </div>
            <div className="flex justify-between bg-white rounded p-2 border border-violet-100">
              <span><M>dim(F[x])</M> (כל הפולינומים)</span><span className="font-bold">= ∞</span>
            </div>
          </div>
        </div>

        <Thm title="תכונות ממד">
          <ul className="list-disc pr-6 space-y-1">
            <li>אם <M>W ⊆ V</M> תת-מרחב אז <M>dim W ≤ dim V</M></li>
            <li>אם <M>W ⊆ V</M> ו-<M>dim W = dim V</M> אז <M>W = V</M></li>
            <li>כל קבוצה בת&quot;ל ב-V מכילה <strong>לכל היותר</strong> <M>dim V</M> וקטורים</li>
            <li>כל קבוצה פורשת של V מכילה <strong>לפחות</strong> <M>dim V</M> וקטורים</li>
          </ul>
        </Thm>

        <Warning>
          <strong>טעות נפוצה:</strong> <M>dim(Fₙ[x]) = n + 1</M> ולא n! הבסיס הוא <M>{'{1, x, x², ..., xⁿ}'}</M> — זה n+1 איברים.
        </Warning>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 6: STEINITZ */}
      {/* ═══════════════════════════════════════ */}
      <Section title="למת שטייניץ (Steinitz Lemma)" icon={<BookOpen className="w-5 h-5" />} color="text-red-700">
        <Thm title="למת שטייניץ (למת ההחלפה)">
          <p>יהיו <M>v₁,...,vₖ</M> בת&quot;ל ו-<M>w₁,...,wₘ</M> פורשים את V. אז:</p>
          <ol className="list-decimal pr-6 mt-1 space-y-1">
            <li><M>k ≤ m</M> (לא יכולים להיות יותר בת&quot;ל מפורשים)</li>
            <li>ניתן <strong>להחליף</strong> k מהוקטורים הפורשים בוקטורים הבת&quot;ל ולשמור על פריש</li>
          </ol>
        </Thm>
        <Proof>
          <p><strong>באינדוקציה על k:</strong></p>
          <p><strong>בסיס (k=0):</strong> <M>0 ≤ m</M> טריוויאלי.</p>
          <p className="mt-1"><strong>צעד:</strong> נניח נכון ל-k-1. הוקטורים <M>v₁,...,vₖ₋₁</M> בת&quot;ל (תת-קבוצה של קבוצה בת&quot;ל).</p>
          <p><M>vₖ ∈ V = Span{'{w₁,...,wₘ}'}</M>, אז <M>vₖ = Σβⱼwⱼ</M>. קיים j כך ש-<M>βⱼ ≠ 0</M> (כי <M>vₖ ≠ 0⃗</M>).</p>
          <p>בה&quot;כ j=m. אז <M>wₘ = (1/βₘ)(vₖ - Σⱼ₌₁ᵐ⁻¹ βⱼwⱼ)</M>.</p>
          <p>לכן <M>w₁,...,wₘ₋₁, vₖ</M> פורשים את V.</p>
          <p>מהנחת האינדוקציה על <M>v₁,...,vₖ₋₁</M> (בת&quot;ל) ו-<M>w₁,...,wₘ₋₁, vₖ</M> (פורשים, m איברים):</p>
          <p><M>k-1 ≤ m</M>, כלומר <M>k ≤ m+1</M>.</p>
          <p>בעצם: k-1 ≤ m (כי הקבוצה הפורשת היא m איברים), ולכן <M>k ≤ m</M>. ✓</p>
        </Proof>

        <Thm title="מסקנות מלמת שטייניץ">
          <ul className="list-disc pr-6 space-y-1">
            <li><strong>כל הבסיסים באותו גודל</strong> → dim מוגדר היטב</li>
            <li>ב-<M>Fⁿ</M>: יותר מ-n וקטורים = בהכרח ת&quot;ל</li>
            <li>פחות מ-n וקטורים = בהכרח לא פורשים את <M>Fⁿ</M></li>
          </ul>
        </Thm>

        <Tip>
          <strong>למבחן:</strong> הוכחת שטייניץ ארוכה. אם זה שאלת הוכחה במבחן — שקלו לדלג עליה ולעשות שאלה אחרת (אלא אם שיננתם).
        </Tip>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 7: DIMENSION FORMULA */}
      {/* ═══════════════════════════════════════ */}
      <Section title="נוסחת הממדים" icon={<Layers className="w-5 h-5" />} color="text-teal-700">
        <Thm title="נוסחת הממדים (הרצאה 12)">
          <p>עבור תתי-מרחבים <M>U, W ⊆ V</M> סוף-ממדיים:</p>
          <p className="text-center font-mono text-lg font-bold mt-2 mb-2 bg-teal-100 rounded-lg p-3">
            dim(U + W) = dim U + dim W − dim(U ∩ W)
          </p>
        </Thm>
        <Proof>
          <p>יהי <M>{'{w₁,...,wᵣ}'}</M> בסיס של <M>U ∩ W</M>.</p>
          <p>נשלים לבסיס של U: <M>{'{w₁,...,wᵣ, u₁,...,uₖ}'}</M> בסיס U.</p>
          <p>נשלים לבסיס של W: <M>{'{w₁,...,wᵣ, v₁,...,vₗ}'}</M> בסיס W.</p>
          <p className="mt-1"><strong>טענה:</strong> <M>{'{w₁,...,wᵣ, u₁,...,uₖ, v₁,...,vₗ}'}</M> בסיס של <M>U + W</M>.</p>
          <p className="mt-1"><strong>פורש:</strong> כל <M>u + w ∈ U + W</M> ניתן לכתוב כצ&quot;ל של הוקטורים הנ&quot;ל. ✓</p>
          <p><strong>בת&quot;ל:</strong> נניח <M>Σαᵢwᵢ + Σβⱼuⱼ + Σγₗvₗ = 0⃗</M>.</p>
          <p>אז <M>Σγₗvₗ = -Σαᵢwᵢ - Σβⱼuⱼ ∈ U</M>. אבל גם ∈ W. לכן ∈ <M>U ∩ W</M>.</p>
          <p>אז <M>Σγₗvₗ = Σδᵢwᵢ</M>. מבת&quot;ל של בסיס W: כל <M>γₗ = δᵢ = 0</M>.</p>
          <p>חוזרים ומקבלים שגם כל <M>αᵢ = βⱼ = 0</M>. ✓</p>
          <p className="mt-1">סה&quot;כ: <M>dim(U+W) = r + k + l = (r+k) + (r+l) - r = dim U + dim W - dim(U∩W)</M>. ✓</p>
        </Proof>

        <Thm title="מסקנות">
          <ul className="list-disc pr-6 space-y-1">
            <li>אם <M>U ∩ W = {'{0⃗}'}</M> אז <M>dim(U ⊕ W) = dim U + dim W</M></li>
            <li>אם <M>dim U + dim W {'>'} dim V</M> אז בהכרח <M>U ∩ W ≠ {'{0⃗}'}</M></li>
            <li><M>U ∩ W ⊆ U</M> ⟹ <M>dim(U ∩ W) ≤ dim U</M> (חסם עליון)</li>
            <li><M>U + W ⊆ V</M> ⟹ <M>dim(U+W) ≤ dim V</M> (חסם תחתון דרך הנוסחה)</li>
          </ul>
        </Thm>

        <Example title="חסמים על dim(U∩W) — תבנית מבחן! (מועד א&apos; 2024 שאלה 3ב)">
          <p><M>dim V = n, dim U = dim W = n-2</M>. הוכח: <M>n-4 ≤ dim(U∩W) ≤ n-2</M>.</p>
          <p className="mt-1"><strong>חסם עליון:</strong> <M>U ∩ W ⊆ U</M> ⟹ <M>dim(U∩W) ≤ dim U = n-2</M>. ✓</p>
          <p className="mt-1"><strong>חסם תחתון:</strong> <M>U + W ⊆ V</M> ⟹ <M>dim(U+W) ≤ n</M>.</p>
          <p>מנוסחת הממדים: <M>dim(U+W) = (n-2) + (n-2) - dim(U∩W) = 2n-4-dim(U∩W)</M></p>
          <p><M>2n-4-dim(U∩W) ≤ n</M> ⟹ <M>dim(U∩W) ≥ n-4</M>. ✓</p>
        </Example>

        <Example title="חישוב U∩W ו-dim(U+W) (תרגול 8)">
          <p><M>U = Span{'{(1,0,0), (0,1,0)}'}</M>, <M>W = Span{'{(0,0,1), (1,1,1)}'}</M></p>
          <p className="mt-1">מחפשים <M>U ∩ W</M>: וקטור <M>(a,b,c) ∈ U</M> ⟹ <M>c = 0</M>.</p>
          <p>וקטור <M>(a,b,0) ∈ W</M> ⟹ <M>(a,b,0) = α(0,0,1) + β(1,1,1)</M> ⟹ <M>a = β, b = β, 0 = α + β</M>.</p>
          <p>מ-<M>0 = α + β</M> ו-<M>a = β = b</M>: רק פתרון טריוויאלי.</p>
          <p><M>U ∩ W = {'{0⃗}'}</M> ⟹ <M>dim(U ∩ W) = 0</M>.</p>
          <p className="mt-1"><M>dim(U+W) = 2 + 2 - 0 = 4</M>, אבל אנחנו ב-ℝ³, אז <M>dim(U+W) = 3 = dim ℝ³</M>.</p>
          <p>כלומר <M>ℝ³ = U ⊕ W</M>. ✓</p>
        </Example>

        <Tip>
          <strong>תבנית חוזרת במבחנים:</strong> כששואלים &quot;הוכח חסמים על dim(U∩W)&quot; — <strong>חסם עליון</strong> תמיד מ-<M>U∩W ⊆ U</M>, <strong>חסם תחתון</strong> תמיד מ-<M>U+W ⊆ V</M> + נוסחת הממדים.
        </Tip>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 8: RANK AND NULLITY */}
      {/* ═══════════════════════════════════════ */}
      <Section title="דרגה ואפסיות (Rank & Nullity)" icon={<Grid3X3 className="w-5 h-5" />} color="text-cyan-700">
        <Def title="דרגה, אפסיות, גרעין">
          <p>עבור מטריצה <M>A ∈ M_{'m×n'}(F)</M>:</p>
          <ul className="list-disc pr-6 mt-1 space-y-1">
            <li><strong>גרעין (Kernel/Null space):</strong> <M>Ker(A) = NulA = {'{x⃗ ∈ Fⁿ | Ax⃗ = 0⃗}'}</M></li>
            <li><strong>דרגה:</strong> <M>rank(A)</M> = ממד מרחב השורות = ממד מרחב העמודות</li>
            <li><strong>אפסיות:</strong> <M>nullity(A) = dim(Ker A)</M> = מספר המשתנים החופשיים</li>
          </ul>
        </Def>

        <Thm title="משפט הדרגה-אפסיות (Rank-Nullity)">
          <p className="text-center font-mono text-lg font-bold mt-1 mb-1 bg-cyan-100 rounded-lg p-3">
            rank(A) + nullity(A) = n &ensp; (מספר העמודות)
          </p>
          <p className="mt-1">או שקול, לה&quot;ל <M>T: V → W</M>:</p>
          <p className="text-center font-mono font-bold"><M>dim(Ker T) + dim(Im T) = dim V</M></p>
        </Thm>

        <Example title="מציאת בסיס ל-NulA (תרגול 11)">
          <p><M>A = [[1,2,1,0],[0,1,0,3],[1,3,1,3]]</M></p>
          <p className="mt-1">דירוג:</p>
          <div className="font-mono text-xs bg-white p-2 rounded border">
            <p>[1 0 1 -6 | 0]</p>
            <p>[0 1 0 &ensp;3 | 0]</p>
            <p>[0 0 0 &ensp;0 | 0]</p>
          </div>
          <p className="mt-1">משתנים חופשיים: <M>z, w</M>. לכן <M>x = -z + 6w, y = -3w</M>.</p>
          <p className="font-mono text-center mt-1">NulA = Span{'{(-1,0,1,0), (6,-3,0,1)}'}</p>
          <p className="mt-1"><M>dim(NulA) = 2</M> (= nullity). rank(A) = 4 - 2 = 2. ✓</p>
        </Example>

        <Thm title="המשפט השקול הגדול — מטריצה מרובעת n×n">
          <p>עבור <M>A ∈ Mₙ(F)</M>, <strong>כולם שקולים</strong>:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {[
              'A הפיכה',
              'rank(A) = n',
              'det(A) ≠ 0',
              'Ax = 0 → רק פתרון טריוויאלי',
              'Ax = b פתיר לכל b (פתרון יחיד)',
              'עמודות A בת"ל',
              'עמודות A פורשות Fⁿ',
              'עמודות A בסיס של Fⁿ',
              'שורות A בת"ל',
              'A שקולת שורה ל-Iₙ',
              'A מכפלה של מטריצות אלמנטריות',
              'nullity(A) = 0',
            ].map(s => (
              <div key={s} className="bg-white rounded px-3 py-1.5 border border-cyan-100 text-xs font-medium text-cyan-900 flex items-center gap-1">
                <span className="text-cyan-500">⟺</span> {s}
              </div>
            ))}
          </div>
        </Thm>

        <Tip>
          <strong>טיפ למבחן:</strong> כשנותנים מטריצה מרובעת n×n עם פרמטר ושואלים &quot;מתי הפיכה?&quot; — חשב <M>det(A)</M> ומצא מתי <M>≠ 0</M>. הרבה יותר מהיר מדירוג!
        </Tip>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 9: COORDINATES */}
      {/* ═══════════════════════════════════════ */}
      <Section title="קואורדינטות והחלפת בסיס" icon={<Target className="w-5 h-5" />} color="text-pink-700">
        <Def title="וקטור קואורדינטות">
          <p>אם <M>B = {'{v₁,...,vₙ}'}</M> בסיס של V ו-<M>v = c₁v₁ + ... + cₙvₙ</M>, אז:</p>
          <p className="font-mono text-center mt-1">[v]_B = (c₁, c₂, ..., cₙ)ᵀ</p>
        </Def>

        <Example title="קואורדינטות בפולינומים">
          <p>ב-<M>F₂[x]</M> עם בסיס <M>B = {'{1, x, x²}'}</M>:</p>
          <p><M>p(x) = 2 + 3x - x²</M> → <M>[p]_B = (2, 3, -1)</M></p>
          <p><M>q(x) = 1 + x</M> → <M>[q]_B = (1, 1, 0)</M></p>
        </Example>

        <Def title="מטריצת מעבר (Change of Basis)">
          <p>אם <M>B = {'{v₁,...,vₙ}'}</M> ו-<M>B&apos; = {'{w₁,...,wₙ}'}</M> בסיסים של V, ו:</p>
          <p className="font-mono text-center mt-1">wⱼ = Σᵢ aᵢⱼ vᵢ</p>
          <p className="mt-1">אז <M>P = [aᵢⱼ]</M> היא <strong>מטריצת המעבר</strong> מ-B&apos; ל-B:</p>
          <p className="font-mono text-center font-bold mt-1">[v]_B = P · [v]_{'{B\''}</p>
          <p className="font-mono text-center font-bold">[v]_{'{B\''} = P⁻¹ · [v]_B</p>
        </Def>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 10: GENERAL SOLUTIONS */}
      {/* ═══════════════════════════════════════ */}
      <Section title="פתרון כללי של Ax = b" icon={<FileText className="w-5 h-5" />} color="text-slate-700">
        <Thm title="מבנה הפתרון הכללי (תרגול 11)">
          <p>אם <M>x₀</M> פתרון פרטי של <M>Ax = b</M>, אז:</p>
          <p className="text-center font-mono font-bold mt-1 bg-slate-100 rounded-lg p-2">
            פתרון כללי = x₀ + NulA = {'{x₀ + u | u ∈ NulA}'}
          </p>
        </Thm>

        <Example title="מציאת פתרון כללי (תרגול 11)">
          <p>ידועים שני פתרונות של <M>Ax = b</M>: <M>xₚ = (1,2)</M> ו-<M>xq = (4,5)</M>.</p>
          <p className="mt-1">ההפרש: <M>xₚ - xq = (-3,-3)</M> → ∈ NulA.</p>
          <p><M>NulA = Span{'{(-3,-3)}'} = Span{'{(1,1)}'}</M></p>
          <p className="mt-1"><strong>פתרון כללי:</strong> <M>{'{(1,2) + t(1,1) | t ∈ ℝ}'} = {'{(1+t, 2+t) | t ∈ ℝ}'}</M></p>
        </Example>

        <Tip>
          <strong>חשוב:</strong> מספר המשתנים החופשיים = dim(NulA) = nullity = n - rank. אם rank = n (מטריצה עם n עמודות) אז nullity = 0 ויש פתרון <strong>יחיד</strong> (אם קיים).
        </Tip>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 11: DIM OVER DIFFERENT FIELDS */}
      {/* ═══════════════════════════════════════ */}
      <Section title="ממד מעל שדות שונים" icon={<Layers className="w-5 h-5" />} color="text-amber-700">
        <Thm title="dim_ℂ(V) = n ⟹ dim_ℝ(V) = 2n (הרצאה 13, מבחן 2024 שאלה 4א)">
          <p>אם V מ&quot;ו מעל ℂ עם <M>dim_ℂ(V) = n</M>, אז <M>dim_ℝ(V) = 2n</M>.</p>
        </Thm>
        <Proof>
          <p>יהי <M>{'{v₁,...,vₙ}'}</M> בסיס של V מעל ℂ.</p>
          <p><strong>טענה:</strong> <M>B = {'{v₁,...,vₙ, iv₁,...,ivₙ}'}</M> בסיס מעל ℝ.</p>
          <p className="mt-1"><strong>B פורש:</strong> לכל <M>v ∈ V</M>, קיימים <M>αⱼ = aⱼ + bⱼi ∈ ℂ</M> כך ש-<M>v = Σαⱼvⱼ</M>.</p>
          <p>אז <M>v = Σaⱼvⱼ + Σbⱼ(ivⱼ) ∈ Span_ℝ(B)</M>. ✓</p>
          <p className="mt-1"><strong>B בת&quot;ל מעל ℝ:</strong> נניח <M>Σaⱼvⱼ + Σbⱼ(ivⱼ) = 0⃗</M> (כל a,b ∈ ℝ).</p>
          <p>⟹ <M>Σ(aⱼ + bⱼi)vⱼ = 0⃗</M>. כי <M>v₁,...,vₙ</M> בת&quot;ל מעל ℂ: <M>aⱼ + bⱼi = 0</M> לכל j.</p>
          <p>כי <M>aⱼ, bⱼ ∈ ℝ</M>: <M>aⱼ = bⱼ = 0</M> לכל j. ✓</p>
          <p className="mt-1"><M>|B| = 2n</M>, לכן <M>dim_ℝ(V) = 2n</M>. ✓</p>
        </Proof>

        <Tip>
          <strong>הרעיון:</strong> כל מקדם מרוכב <M>a + bi</M> &quot;נפרש&quot; ל-2 מקדמים ממשיים, ולכן הממד מוכפל ב-2.
        </Tip>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 12: EXAM PATTERNS */}
      {/* ═══════════════════════════════════════ */}
      <Section title="תבניות למבחן" icon={<Zap className="w-5 h-5" />} color="text-rose-700">
        <div className="space-y-3">
          {[
            {
              q: 'הוכח ש-dim W = n-1 ו-U ⊄ W ⟹ V = U + W',
              a: 'U ⊄ W ⟹ קיים u ∈ U\\W ⟹ dim(U+W) ≥ dim W + 1 = n ⟹ U+W = V.',
              src: 'מועד א\' 2024 שאלה 5א'
            },
            {
              q: 'מצא ערכי m שעבורם A הפיכה',
              a: 'חשב det(A) כפונקציה של m. A הפיכה ⟺ det(A) ≠ 0. פתור det = 0.',
              src: 'מועד א\' 2024 שאלה 4ב'
            },
            {
              q: 'הוכח חסמים על dim(U∩W)',
              a: 'עליון: U∩W ⊆ U → dim(U∩W) ≤ dim U. תחתון: U+W ⊆ V → dim(U+W) ≤ dim V → הציב בנוסחת הממדים.',
              src: 'מועד א\' 2024 שאלה 3ב'
            },
            {
              q: 'הוכח בת"ל ⟺ ייצוג יחיד',
              a: '⟹: חסר שני ייצוגים, מבת"ל מקדמים = 0. ⟸: נניח צ"ל = 0, גם הטריוויאלי = 0, מייצוג יחיד כולם 0.',
              src: 'מועד א\' 2024 שאלה 1א'
            },
            {
              q: 'הוכח שקבוצה בת"ל (עם וקטור "חדש")',
              a: 'הנח צ"ל = 0. הוכח בשלילה שהמקדם של הוקטור החדש = 0 (אחרת סתירה). אח"כ השאר נובע מבת"ל.',
              src: 'מועד א\' 2024 שאלה 1ב'
            },
            {
              q: 'AB = A+B ⟹ A-I הפיכה',
              a: 'טריק: AB - A - B + I = I ⟹ (A-I)(B-I) = I ⟹ A-I הפיכה והופכית = B-I.',
              src: 'מועד א\' 2024 שאלה 5ב'
            },
          ].map(({ q, a, src }) => (
            <div key={src} className="bg-rose-50 border border-rose-200 rounded-lg p-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="font-bold text-sm text-rose-800">{q}</div>
                <span className="text-xs text-rose-500 whitespace-nowrap">{src}</span>
              </div>
              <div className="text-sm text-rose-700">{a}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* SECTION 13: QUICK REFERENCE */}
      {/* ═══════════════════════════════════════ */}
      <Section title="שליפה מהירה" icon={<Zap className="w-5 h-5" />} color="text-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-right">מה רוצים</th>
                <th className="border border-gray-300 px-3 py-2 text-right">מה עושים</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['לבדוק בת"ל', 'דרג Ax = 0, רק פתרון טריוויאלי?'],
                ['למצוא dim', 'מצא בסיס, ספור איברים'],
                ['למצוא בסיס של תת-מרחב', 'פרמטריזציה → וקטורים יוצרים'],
                ['למצוא dim(U∩W)', 'נוסחת ממדים: dim U + dim W - dim(U+W)'],
                ['למצוא U∩W', 'מצא וקטור שמקיים תנאי U וגם תנאי W'],
                ['לבדוק הפיכות (n×n)', 'det ≠ 0 או דרג ל-Iₙ'],
                ['למצוא A⁻¹', 'דרג [A|I] → [I|A⁻¹]'],
                ['למצוא NulA', 'דרג Ax = 0, פרמטריזציה'],
                ['פתרון כללי Ax = b', 'x₀ (פרטי) + NulA'],
                ['לבדוק פריש', 'דרג Ax = b לכל b, יש פתרון?'],
              ].map(([what, how]) => (
                <tr key={what} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-1.5 font-medium">{what}</td>
                  <td className="border border-gray-300 px-3 py-1.5">{how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
