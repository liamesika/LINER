'use client';

import { useState } from 'react';
import {
  BookOpen, ChevronDown, ChevronUp, Target, Star,
  CheckCircle, AlertTriangle, Lightbulb, FileText
} from 'lucide-react';

function Section({ title, icon, color, children }: {
  title: string; icon: React.ReactNode; color: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className={`font-bold text-lg mb-4 flex items-center gap-2 ${color}`}>{icon}{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function QuestionBox({ num, pts, topic, children }: {
  num: number; pts: number; topic: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border-2 border-indigo-200 overflow-hidden">
      <div className="bg-indigo-50 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-lg">
            שאלה {num}
          </span>
          <span className="text-indigo-700 font-medium text-sm">{topic}</span>
        </div>
        <span className="text-indigo-600 font-bold text-sm">{pts} נקודות</span>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function SubQ({ label, pts, children }: { label: string; pts: number; children: React.ReactNode }) {
  return (
    <div className="border-r-4 border-gray-300 pr-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded">{label}</span>
        <span className="text-gray-500 text-xs">({pts} נק&apos;)</span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Problem({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-800">
      <div className="font-medium text-slate-600 text-xs mb-1 flex items-center gap-1">
        <FileText className="w-3 h-3" /> השאלה
      </div>
      {children}
    </div>
  );
}

function Solution({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-emerald-100 transition-colors"
      >
        <span className="font-bold text-sm text-emerald-700 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          פתרון מלא
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

function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono bg-gray-100 px-1 rounded text-sm">{children}</span>;
}

export default function Exam2024APage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          מועד א&apos; 2024 — ניתוח + פתרונות
        </h1>
        <p className="text-gray-600">Linear Algebra 1, Moed A 2024 — Reichman University</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">
            5 שאלות, עונים על 4
          </span>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">
            3 שעות
          </span>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">
            25 נקודות כל שאלה
          </span>
        </div>
      </div>

      {/* Overview */}
      <Section title="סקירת נושאים" icon={<Target className="w-5 h-5" />} color="text-indigo-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { q: 'שאלה 1', topics: 'בת"ל ⇔ ייצוג יחיד + הוכחת בת"ל', diff: 'בינוני' },
            { q: 'שאלה 2', topics: 'למת שטייניץ + בסיס פולינומים', diff: 'קשה (שטייניץ)' },
            { q: 'שאלה 3', topics: 'מערכת עם פרמטר + חסם dim(U∩W)', diff: 'בינוני' },
            { q: 'שאלה 4', topics: 'dim_ℂ→dim_ℝ + הפיכות עם פרמטר', diff: 'בינוני-קשה' },
            { q: 'שאלה 5', topics: 'V=U+W + AB=A+B הפיכות', diff: 'בינוני' },
          ].map(({ q, topics, diff }) => (
            <div key={q} className="bg-gray-50 rounded-lg p-3 flex justify-between items-start">
              <div>
                <div className="font-bold text-sm text-gray-800">{q}</div>
                <div className="text-xs text-gray-600 mt-1">{topics}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${
                diff.includes('קשה') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>{diff}</span>
            </div>
          ))}
        </div>
        <Tip>
          <strong>המלצה:</strong> דלג על שאלה 2 (שטייניץ = הוכחה ארוכה מההרצאה).
          שאלות 1, 3, 4, 5 הן הכי &quot;שוות&quot; מבחינת ניקוד מול מאמץ.
        </Tip>
      </Section>

      {/* ==================== */}
      {/* QUESTION 1 */}
      {/* ==================== */}
      <QuestionBox num={1} pts={25} topic="תלות/אי-תלות לינארית">
        <SubQ label="א" pts={15}>
          <Problem>
            <p>יהי F שדה, V מ&quot;ו מעל F, ו-v₁,...,vₖ ∈ V.</p>
            <p>הוכח: v₁,...,vₖ בת&quot;ל <strong>אם ורק אם</strong> לכל v ∈ Span(v₁,...,vₖ) קיימים α₁,...,αₖ ∈ F <strong>יחידים</strong> כך ש-v = α₁v₁+...+αₖvₖ.</p>
          </Problem>
          <Solution>
            <p><strong>כיוון ⟹ (בת&quot;ל ⟹ ייצוג יחיד):</strong></p>
            <p>נניח v₁,...,vₖ בת&quot;ל. יהי v ∈ Span(v₁,...,vₖ).</p>
            <p>נניח שני ייצוגים: v = α₁v₁+...+αₖvₖ = β₁v₁+...+βₖvₖ.</p>
            <p>אז (α₁-β₁)v₁+...+(αₖ-βₖ)vₖ = 0⃗.</p>
            <p>מבת&quot;ל: αᵢ-βᵢ = 0 לכל i, כלומר αᵢ = βᵢ. ✓</p>
            <p className="mt-2"><strong>כיוון ⟸ (ייצוג יחיד ⟹ בת&quot;ל):</strong></p>
            <p>נניח ייצוג יחיד. נניח α₁v₁+...+αₖvₖ = 0⃗.</p>
            <p>גם 0·v₁+...+0·vₖ = 0⃗ הוא ייצוג של 0⃗.</p>
            <p>מייצוג יחיד: αᵢ = 0 לכל i. לכן בת&quot;ל. ✓</p>
          </Solution>
          <Tip>זו הוכחה מההרצאה — לשנן בעל-פה. מופיעה כמעט בכל מבחן!</Tip>
        </SubQ>

        <SubQ label="ב" pts={10}>
          <Problem>
            <p>נניח v₁,...,vₖ בת&quot;ל. יהיו u, w ∈ V כך ש-u ∈ Span(v₁,...,vₖ) ו-w ∉ Span(v₁,...,vₖ). יהי α ∈ F.</p>
            <p>הוכח שהוקטורים α·u+w, v₁,...,vₖ הם בת&quot;ל.</p>
          </Problem>
          <Solution>
            <p>נניח:</p>
            <p className="text-center font-mono">β(αu + w) + α₁v₁ + ... + αₖvₖ = 0⃗ &emsp; (*)</p>
            <p className="mt-2"><strong>שלב 1: נוכיח β = 0.</strong></p>
            <p>נניח בשלילה β ≠ 0. אז:</p>
            <p className="font-mono text-center">βw = -αβu - α₁v₁ - ... - αₖvₖ</p>
            <p>כי β ≠ 0 קיים β⁻¹ ∈ F, לכן:</p>
            <p className="font-mono text-center">w = -αu - β⁻¹α₁v₁ - ... - β⁻¹αₖvₖ</p>
            <p>לכן w ∈ Span(u, v₁,...,vₖ). כי u ∈ Span(v₁,...,vₖ) נקבל:</p>
            <p>Span(u, v₁,...,vₖ) = Span(v₁,...,vₖ), לכן w ∈ Span(v₁,...,vₖ). <strong>סתירה!</strong></p>
            <p className="mt-2"><strong>שלב 2: β = 0.</strong></p>
            <p>נציב ב-(*): 0·(αu+w) + α₁v₁+...+αₖvₖ = 0⃗</p>
            <p>כלומר α₁v₁+...+αₖvₖ = 0⃗. כי v₁,...,vₖ בת&quot;ל: α₁=...=αₖ=0.</p>
            <p>לכן β = α₁ = ... = αₖ = 0 ⟹ בת&quot;ל. ✓</p>
          </Solution>
          <Tip>
            <strong>תבנית חשובה:</strong> כשרוצים להוכיח שקבוצה בת&quot;ל — תמיד תניח צ&quot;ל=0 ותוכיח שכל המקדמים 0. אם אחד מהם &quot;חשוד&quot;, הוכח אותו 0 בנפרד (בשלילה), ואז השאר נובע מבת&quot;ל.
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 2 */}
      {/* ==================== */}
      <QuestionBox num={2} pts={25} topic="למת שטייניץ + בסיס פולינומים">
        <SubQ label="א" pts={15}>
          <Problem>
            <p>יהי V מ&quot;ו מעל F. נניח v₁,...,vₖ בת&quot;ל ו-w₁,...,wₘ פורשים את V. הוכח: k ≤ m.</p>
          </Problem>
          <Solution>
            <p><strong>הוכחה מההרצאה (למת שטייניץ / Replacement Lemma):</strong></p>
            <p>באינדוקציה על k.</p>
            <p><strong>בסיס (k=0):</strong> 0 ≤ m מתקיים טריוויאלית.</p>
            <p><strong>צעד אינדוקציה:</strong> נניח שהטענה נכונה ל-k-1.</p>
            <p>v₁,...,vₖ בת&quot;ל ⟹ בפרט v₁,...,vₖ₋₁ בת&quot;ל.</p>
            <p>כי w₁,...,wₘ פורשים V, ובפרט vₖ = Σβⱼwⱼ. קיים j כך ש-βⱼ≠0 (כי vₖ≠0⃗).</p>
            <p>בלי הגבלת כלליות j=m. אז:</p>
            <p className="font-mono text-center">wₘ = (1/βₘ)(vₖ - Σⱼ₌₁ᵐ⁻¹ βⱼwⱼ)</p>
            <p>לכן w₁,...,wₘ₋₁, vₖ פורשים את V.</p>
            <p>מהנחת האינדוקציה (v₁,...,vₖ₋₁ בת&quot;ל, w₁,...,wₘ₋₁,vₖ פורשים): k-1 ≤ m.</p>
            <p>לכן k ≤ m+1... [ההוכחה המלאה מההרצאה].</p>
          </Solution>
          <Tip>
            <strong>הוכחה ארוכה מההרצאה.</strong> אם לא שננת אותה — שקול לדלג על שאלה 2 ולעשות שאלות אחרות.
          </Tip>
        </SubQ>

        <SubQ label="ב" pts={10}>
          <Problem>
            <p>יהיו p₀,...,pₙ ∈ F[x] כך ש-deg(pⱼ) = j לכל 0 ≤ j ≤ n. הוכח שהם בסיס של Fₙ[x].</p>
          </Problem>
          <Solution>
            <p><strong>מספיק להוכיח בת&quot;ל</strong> (כי dim(Fₙ[x]) = n+1 ויש n+1 וקטורים).</p>
            <p>נראה: לכל 0 ≤ j ≤ n, pⱼ ∉ Span(p₀,...,pⱼ₋₁).</p>
            <p className="mt-2"><strong>עבור j=0:</strong> deg(p₀)=0 אז p₀ קבוע ≠ 0 (כי deg מוגדר). p₀ ∉ Span(∅) = {'{0}'} ✓</p>
            <p className="mt-2"><strong>עבור 1 ≤ j ≤ n:</strong></p>
            <p>deg(p₀),...,deg(pⱼ₋₁) &lt; j, לכן Span(p₀,...,pⱼ₋₁) ⊆ Fⱼ₋₁[x].</p>
            <p>אבל deg(pⱼ) = j ⟹ pⱼ ∉ Fⱼ₋₁[x].</p>
            <p>לכן pⱼ ∉ Span(p₀,...,pⱼ₋₁). ✓</p>
            <p className="mt-2">n+1 וקטורים בת&quot;ל במרחב dim = n+1 ⟹ בסיס. ✓</p>
          </Solution>
          <Tip>
            <strong>טריק:</strong> במקום להוכיח בת&quot;ל ישירות (Σαⱼpⱼ=0 ⟹ ...), השתמשנו באפיון: בת&quot;ל ⟺ אף אחד לא ב-Span של קודמיו. לפעמים זה קצר יותר!
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 3 */}
      {/* ==================== */}
      <QuestionBox num={3} pts={25} topic="מערכת עם פרמטר + ממדים">
        <SubQ label="א" pts={18}>
          <Problem>
            <p>יהי a ∈ ℝ. פתור את המערכת:</p>
            <div className="font-mono text-center my-2 space-y-1">
              <p>x + y + w = 0</p>
              <p>4x + (a+4)y + (a²+a)w = 1</p>
              <p>3x + 3y + (a²-1)w = 1</p>
              <p>x + y + w + az = 0</p>
            </div>
            <p>i. למי אין פתרון? ii. אינסוף פתרונות? iii. פתרון יחיד?</p>
          </Problem>
          <Solution>
            <p><strong>דירוג המטריצה המורחבת:</strong></p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 1 1 0 | 0]&emsp; R₂→R₂-4R₁&emsp; [1 1 &ensp;1&ensp; 0 | 0]</p>
              <p>[4 a+4 a²+a 0|1]&emsp; R₃→R₃-3R₁&emsp; [0 a &ensp;a²+a-4 0|1]</p>
              <p>[3 3 a²-1 0|1]&emsp; R₄→R₄-R₁&emsp;&emsp; [0 0 &ensp;a²-4&ensp; 0|1]</p>
              <p>[1 1 1 a | 0]&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp; [0 0 &ensp;0&ensp;&ensp; a|0]</p>
            </div>
            <p className="mt-2">R₂→R₂-R₃:</p>
            <div className="font-mono text-xs bg-white p-2 rounded border border-gray-200">
              <p>[1 1 1 0|0] / [0 a a 0|0] / [0 0 a²-4 0|1] / [0 0 0 a|0]</p>
            </div>

            <p className="mt-3"><strong>מקרה a = 0:</strong></p>
            <p>שורה 2 אפסים, שורה 4 אפסים. נשאר:</p>
            <p className="font-mono text-xs">[1 1 1 0|0] / [0 0 -4 0|1]</p>
            <p>שני משתנים חופשיים (y=s, z=t). w = -1/4. x = -s+1/4.</p>
            <p><strong>פתרון כללי:</strong> (-s+1/4, s, -1/4, t), s,t ∈ ℝ. <strong>אינסוף פתרונות.</strong></p>

            <p className="mt-3"><strong>מקרה a ∈ {'{2, -2}'}:</strong></p>
            <p>a²-4 = 0 ⟹ שורה 3 הופכת ל-[0 0 0 0|1] — <strong>שורת סתירה. אין פתרון.</strong></p>

            <p className="mt-3"><strong>מקרה a ∈ ℝ \ {'{0, 2, -2}'}:</strong></p>
            <p>a ≠ 0 אז מR₂: R₂→a⁻¹R₂, R₄→a⁻¹R₄.</p>
            <p>a²-4 ≠ 0 אז R₃→(a²-4)⁻¹R₃.</p>
            <p>מקבלים: w = 1/(a²-4), y = -1/(a²-4), x = 0, z = 0.</p>
            <p><strong>פתרון יחיד:</strong> (0, -1/(a²-4), 1/(a²-4), 0).</p>

            <div className="mt-3 bg-blue-50 border border-blue-200 rounded p-3">
              <p className="font-bold text-blue-800 text-xs mb-1">סיכום:</p>
              <p className="text-blue-700">a ∈ {'{2, -2}'}: <strong>אין פתרון</strong></p>
              <p className="text-blue-700">a = 0: <strong>אינסוף</strong> — (-s+1/4, s, -1/4, t)</p>
              <p className="text-blue-700">a ∉ {'{0, 2, -2}'}: <strong>יחיד</strong> — (0, -1/(a²-4), 1/(a²-4), 0)</p>
            </div>
          </Solution>
        </SubQ>

        <SubQ label="ב" pts={7}>
          <Problem>
            <p>יהי n ∈ ℕ, n ≥ 4. dim V = n, U ו-W תתי-מרחבים עם dim(U) = dim(W) = n-2.</p>
            <p>הוכח: n-4 ≤ dim(U∩W) ≤ n-2.</p>
          </Problem>
          <Solution>
            <p>סמן dim(U∩W) = k ו-dim(U+W) = ℓ.</p>
            <p><strong>מנוסחת הממדים:</strong></p>
            <p className="font-mono text-center">ℓ = dim(U) + dim(W) - k = (n-2) + (n-2) - k = 2n-4-k</p>
            <p className="mt-2"><strong>חסם עליון:</strong> U∩W ⊆ U ⟹ dim(U∩W) ≤ dim(U) = n-2.</p>
            <p>כלומר k ≤ n-2. ✓</p>
            <p className="mt-2"><strong>חסם תחתון:</strong> U+W ⊆ V ⟹ ℓ ≤ n.</p>
            <p>2n-4-k ≤ n ⟹ k ≥ n-4. ✓</p>
            <p className="mt-1"><strong>ביחד: n-4 ≤ k ≤ n-2.</strong> ✓</p>
          </Solution>
          <Tip>תבנית חוזרת! בכל שאלה על חסם dim(U∩W): חסם עליון מ-U∩W⊆U, חסם תחתון מ-U+W⊆V.</Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 4 */}
      {/* ==================== */}
      <QuestionBox num={4} pts={25} topic="ממד מעל שדות שונים + הפיכות">
        <SubQ label="א" pts={15}>
          <Problem>
            <p>V מ&quot;ו מעל ℂ, dim_ℂ(V) = n. הוכח: dim_ℝ(V) = 2n.</p>
          </Problem>
          <Solution>
            <p>כי n = dim_ℂ(V), קיימים v₁,...,vₙ ∈ V בסיס מעל ℂ.</p>
            <p>נזכור: dim_ℝ(ℂ) = 2 עם בסיס (1, i).</p>
            <p className="mt-2"><strong>טענה:</strong> B = (v₁,...,vₙ, iv₁,...,ivₙ) בסיס של V מעל ℝ.</p>

            <p className="mt-2"><strong>B פורש:</strong> יהי v ∈ V. קיימים α₁,...,αₙ ∈ ℂ כך ש-v = Σαⱼvⱼ.</p>
            <p>לכל j: αⱼ = βⱼ₁ + βⱼ₂·i (βⱼ₁, βⱼ₂ ∈ ℝ). לכן:</p>
            <p className="font-mono text-center text-xs">v = Σ(βⱼ₁+βⱼ₂i)vⱼ = Σβⱼ₁vⱼ + Σβⱼ₂(ivⱼ) ∈ Span_ℝ(B)</p>

            <p className="mt-2"><strong>B בת&quot;ל מעל ℝ:</strong></p>
            <p>נניח Σβⱼ₁vⱼ + Σβⱼ₂(ivⱼ) = 0⃗ (כל ה-β ∈ ℝ).</p>
            <p>⟹ Σ(βⱼ₁ + βⱼ₂i)vⱼ = 0⃗.</p>
            <p>כי v₁,...,vₙ בת&quot;ל מעל ℂ: βⱼ₁ + βⱼ₂i = 0_ℂ לכל j.</p>
            <p>כי βⱼ₁, βⱼ₂ ∈ ℝ: βⱼ₁ = βⱼ₂ = 0 לכל j. ✓</p>
            <p className="mt-1">|B| = 2n, לכן dim_ℝ(V) = 2n. ✓</p>
          </Solution>
        </SubQ>

        <SubQ label="ב" pts={10}>
          <Problem>
            <p>יהי m ∈ ℝ. A = [[1, 1, 1-2m], [m, 1, -1], [1, m, -1]].</p>
            <p>מצא את כל ערכי m שעבורם A הפיכה (לא צריך לחשב A⁻¹).</p>
          </Problem>
          <Solution>
            <p><strong>A הפיכה ⟺ det(A) ≠ 0</strong> (או שקול: הצורה הקנונית = I₃).</p>
            <p>נדרג [A | I₃]:</p>
            <div className="font-mono text-xs bg-white p-2 rounded border space-y-1">
              <p>R₂→R₂-mR₁: [0, 1-m, -1-m+2m², ...]</p>
              <p>R₃→R₃-R₁:&ensp; [0, m-1, -2+2m, ...]</p>
              <p>R₃→R₃+R₂: [0, 0, -3+m+2m², ...]</p>
            </div>
            <p className="mt-2">A לא הפיכה ⟺ 2m²+m-3 = 0.</p>
            <p className="font-mono text-center">2m²+m-3 = (m-1)(2m+3) = 0</p>
            <p>⟹ m = 1 או m = -3/2.</p>
            <p className="mt-1">(בדיקה: m=1 ⟹ עמודות 1,2 זהות ⟹ ת&quot;ל ⟹ סינגולרית ✓)</p>
            <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2">
              <p className="font-bold text-blue-800 text-sm">A הפיכה ⟺ m ∈ ℝ \ {'{1, -3/2}'}</p>
            </div>
          </Solution>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 5 */}
      {/* ==================== */}
      <QuestionBox num={5} pts={25} topic="תתי-מרחבים + הפיכות מטריצתיות">
        <SubQ label="א" pts={15}>
          <Problem>
            <p>dim V = n. U, W תתי-מרחבים. dim W = n-1 ו-U ⊄ W. הוכח: V = U+W.</p>
          </Problem>
          <Solution>
            <p>כי dim(W) = n-1, קיים בסיס (w₁,...,wₙ₋₁) ל-W.</p>
            <p>(אם dim(V)=1 אז dim(W)=0 ⟹ W={'{0⃗}'}, הבסיס ריק.)</p>
            <p className="mt-2">כי U ⊄ W, קיים <strong>u ∈ U \ W</strong>.</p>
            <p>כלומר u ∉ W, לכן u ∉ Span(w₁,...,wₙ₋₁).</p>
            <p className="mt-2">נבדוק ש-{'{w₁,...,wₙ₋₁, u}'} בת&quot;ל:</p>
            <p>w₁,...,wₙ₋₁ בת&quot;ל (בסיס). u אינו צ&quot;ל של קודמיו (כי u ∉ Span שלהם).</p>
            <p>לכן בת&quot;ל. (שימוש באפיון: ת&quot;ל ⟺ אחד הוקטורים ב-Span של קודמיו)</p>
            <p className="mt-2">יש n וקטורים בת&quot;ל ב-V עם dim(V)=n ⟹ הם בסיס ⟹ פורשים V.</p>
            <p>{'{w₁,...,wₙ₋₁, u}'} ⊆ W ∪ U, לכן:</p>
            <p className="font-mono text-center">V = Span(w₁,...,wₙ₋₁, u) ⊆ U+W ⊆ V</p>
            <p>⟹ <strong>V = U+W</strong>. ✓</p>
          </Solution>
        </SubQ>

        <SubQ label="ב" pts={10}>
          <Problem>
            <p>A, B ∈ Mₙ(F). נתון AB = A + B.</p>
            <p>i. (5 נק&apos;) הוכח: A - Iₙ הפיכה.</p>
            <p>ii. (5 נק&apos;) הוכח: אם A הפיכה אז B הפיכה.</p>
          </Problem>
          <Solution>
            <p><strong>סעיף i:</strong></p>
            <p>AB = A + B ⟹ A = AB - B = (A-Iₙ)B + Iₙ (כי AB-B = (A-I)B).</p>
            <p>Wait, let&apos;s be more careful:</p>
            <p className="font-mono text-center">AB = A + B</p>
            <p className="font-mono text-center">AB - A - B = 0</p>
            <p className="font-mono text-center">AB - A - B + I = I</p>
            <p className="font-mono text-center">(A - I)(B - I) = I</p>
            <p className="mt-1">A-I הוא מטריצה ריבועית ו-(A-I)(B-I) = I.</p>
            <p>לכן A-I הפיכה, עם (A-I)⁻¹ = B-I. ✓</p>
            <p>ובפרט גם (B-I)(A-I) = I.</p>

            <p className="mt-3"><strong>סעיף ii:</strong></p>
            <p>AB = A+B ⟹ (A-I)B = A (כי AB-B = (A-I)B ו-A+B-B = A).</p>
            <p>A-I הפיכה (מסעיף i). לכן:</p>
            <p className="font-mono text-center">B = (A-I)⁻¹ · A</p>
            <p>B הוא מכפלה של שתי מטריצות הפיכות ((A-I)⁻¹ הפיכה, A הפיכה לפי הנתון).</p>
            <p>מכפלת הפיכות = הפיכה. לכן <strong>B הפיכה</strong>. ✓</p>
          </Solution>
          <Tip>
            <strong>הטריק המרכזי:</strong> AB-A-B+I = (A-I)(B-I). זה מופיע שוב ושוב במבחנים!
            כשיש משוואה מטריצתית, נסה להגיע לצורה (??)(???) = I.
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* Strategy */}
      <Section title="אסטרטגיה מומלצת" icon={<Star className="w-5 h-5" />} color="text-amber-700">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 space-y-2">
          <p className="font-bold text-amber-800">סדר מומלץ למבחן הזה:</p>
          <p className="text-amber-700">1. <strong>שאלה 5</strong> (25 נק&apos;) — הכי &quot;טכנית&quot;, שתי הוכחות קצרות</p>
          <p className="text-amber-700">2. <strong>שאלה 1</strong> (25 נק&apos;) — 1a מההרצאה, 1b תבנית סטנדרטית</p>
          <p className="text-amber-700">3. <strong>שאלה 3</strong> (25 נק&apos;) — דירוג מכני, חסם ממדים קצר</p>
          <p className="text-amber-700">4. <strong>שאלה 4</strong> (25 נק&apos;) — 4a הוכחה מההרצאה, 4b חישוב</p>
          <p className="text-amber-700 opacity-60">5. שאלה 2 — רק אם נשאר זמן (שטייניץ ארוכה)</p>
        </div>
      </Section>
    </div>
  );
}
