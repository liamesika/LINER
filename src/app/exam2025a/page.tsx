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
          <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-lg">שאלה {num}</span>
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
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-emerald-100 transition-colors">
        <span className="font-bold text-sm text-emerald-700 flex items-center gap-2"><CheckCircle className="w-4 h-4" />פתרון מלא</span>
        {open ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-emerald-600" />}
      </button>
      {open && (<div className="px-4 pb-4 text-sm text-emerald-800 space-y-2 border-t border-emerald-200 pt-3">{children}</div>)}
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

export default function Exam2025APage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          מועד א&apos; 2025 — ניתוח + פתרונות
        </h1>
        <p className="text-gray-600">Linear Algebra 1, Moed A 2025 — Reichman University</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">
            5 שאלות, עונים על 4
          </span>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">
            25 נקודות כל שאלה
          </span>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">
            3 שעות
          </span>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">
            ללא חומר עזר
          </span>
        </div>
      </div>

      {/* Overview */}
      <Section title="סקירת נושאים" icon={<Target className="w-5 h-5" />} color="text-indigo-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { q: 'שאלה 1', topics: 'הגדרת בת"ל + הוכחה + סימטרית/אנטי-סימטרית', diff: 'בינוני' },
            { q: 'שאלה 2', topics: 'גרעין ותמונה + rank-nullity + ה"ל', diff: 'בינוני-קשה' },
            { q: 'שאלה 3', topics: 'אופרטור לינארי + היפוך מטריצה מעל Z₅', diff: 'קשה' },
            { q: 'שאלה 4', topics: 'מערכת עם פרמטר + הוכחת dim(U∩W)', diff: 'בינוני' },
            { q: 'שאלה 5', topics: 'שוויון Span + דרגת מכפלת מטריצות', diff: 'בינוני' },
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
          <strong>המלצה:</strong> דלג על שאלה 3 (אופרטור לינארי + חישוב מעל Z₅ = הכי מאתגר).
          שאלות 1, 4, 5, 2 הן הכי &quot;שוות&quot; מבחינת ניקוד מול מאמץ.
        </Tip>
      </Section>

      {/* ==================== */}
      {/* QUESTION 1 */}
      {/* ==================== */}
      <QuestionBox num={1} pts={25} topic="בת&quot;ל + מטריצות סימטריות ואנטי-סימטריות">
        <SubQ label="1.1" pts={17}>
          <SubQ label="1.1.1" pts={2}>
            <Problem>
              <p>הגדר מהי קבוצת וקטורים בלתי תלויה לינארית (בת&quot;ל).</p>
            </Problem>
            <Solution>
              <p>יהי V מ&quot;ו מעל שדה F. הוקטורים <M>v₁,...,vₖ ∈ V</M> נקראים <strong>בלתי תלויים לינארית (בת&quot;ל)</strong> אם:</p>
              <p className="font-mono text-center my-2">
                α₁v₁ + α₂v₂ + ... + αₖvₖ = 0_V &ensp;⟹&ensp; α₁ = α₂ = ... = αₖ = 0_F
              </p>
              <p>כלומר, הצירוף הלינארי היחיד שנותן את וקטור האפס הוא הצירוף הטריוויאלי.</p>
            </Solution>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 11 — הגדרת בת&quot;ל</p>
          </SubQ>

          <SubQ label="1.1.2" pts={15}>
            <Problem>
              <p>הוכח: <M>v₁,...,vₖ</M> בת&quot;ל אם ורק אם לכל <M>α₁,...,αₖ, β₁,...,βₖ ∈ F</M>:</p>
              <p className="font-mono text-center my-2">
                α₁v₁ + ... + αₖvₖ = β₁v₁ + ... + βₖvₖ &ensp;⟹&ensp; (α₁,...,αₖ) = (β₁,...,βₖ)
              </p>
            </Problem>
            <Solution>
              <p><strong>כיוון ⟹ (בת&quot;ל ⟹ ייצוג יחיד):</strong></p>
              <p>נניח <M>v₁,...,vₖ</M> בת&quot;ל. נניח:</p>
              <p className="font-mono text-center">α₁v₁ + ... + αₖvₖ = β₁v₁ + ... + βₖvₖ</p>
              <p>נחסר אגפים:</p>
              <p className="font-mono text-center">(α₁-β₁)v₁ + (α₂-β₂)v₂ + ... + (αₖ-βₖ)vₖ = 0_V</p>
              <p>מבת&quot;ל נובע: <M>αᵢ - βᵢ = 0</M> לכל i, כלומר <M>αᵢ = βᵢ</M> לכל i.</p>
              <p>לכן <M>(α₁,...,αₖ) = (β₁,...,βₖ)</M>. ✓</p>

              <p className="mt-3"><strong>כיוון ⟸ (ייצוג יחיד ⟹ בת&quot;ל):</strong></p>
              <p>נניח שלכל שני ייצוגים שווים, המקדמים שווים.</p>
              <p>נניח <M>α₁v₁ + ... + αₖvₖ = 0_V</M>.</p>
              <p>אבל גם <M>0·v₁ + ... + 0·vₖ = 0_V</M>.</p>
              <p>שני הצירופים שווים ל-<M>0_V</M>, מהנחה נובע:</p>
              <p className="font-mono text-center">(α₁,...,αₖ) = (0,...,0)</p>
              <p>כלומר <M>α₁ = ... = αₖ = 0</M>. לכן <M>v₁,...,vₖ</M> בת&quot;ל. ✓</p>
            </Solution>
            <Tip>זו למעשה הוכחת <strong>משפט יחידות הייצוג</strong> מההרצאה. מופיעה כמעט בכל מבחן!</Tip>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 11 — משפט יחידות הייצוג</p>
          </SubQ>
        </SubQ>

        <SubQ label="1.2" pts={8}>
          <Problem>
            <p>A מטריצה סימטרית (<M>Aᵗ = A</M>), B מטריצה אנטי-סימטרית (<M>Bᵗ = -B</M>).</p>
            <p>הוכח: <M>(A+B)(A-B)</M> היא מטריצה סימטרית.</p>
          </Problem>
          <Solution>
            <p>צריך להוכיח: <M>[(A+B)(A-B)]ᵗ = (A+B)(A-B)</M>.</p>
            <p className="mt-2"><strong>חישוב:</strong></p>
            <p className="font-mono text-center">[(A+B)(A-B)]ᵗ</p>
            <p>לפי <M>(XY)ᵗ = YᵗXᵗ</M>:</p>
            <p className="font-mono text-center">= (A-B)ᵗ · (A+B)ᵗ</p>
            <p>לפי <M>(X+Y)ᵗ = Xᵗ+Yᵗ</M>:</p>
            <p className="font-mono text-center">= (Aᵗ - Bᵗ) · (Aᵗ + Bᵗ)</p>
            <p>נציב <M>Aᵗ = A</M> ו-<M>Bᵗ = -B</M>:</p>
            <p className="font-mono text-center">= (A - (-B)) · (A + (-B))</p>
            <p className="font-mono text-center">= (A + B)(A - B)</p>
            <p className="mt-1">קיבלנו בדיוק את המטריצה המקורית. לכן <M>(A+B)(A-B)</M> סימטרית. ✓</p>
          </Solution>
          <Tip>
            <strong>מפתח:</strong> זכרו ש-<M>(AB)ᵗ = BᵗAᵗ</M> (סדר מתהפך!), ושסימטרית &quot;שורדת&quot; שחלוף ואנטי-סימטרית &quot;מתהפכת&quot;.
          </Tip>
          <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות על שחלוף — (AB)ᵗ=BᵗAᵗ</p>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 2 */}
      {/* ==================== */}
      <QuestionBox num={2} pts={25} topic="גרעין ותמונה + rank-nullity + ה&quot;ל">
        <SubQ label="2.1" pts={17}>
          <SubQ label="2.1.1" pts={2}>
            <Problem>
              <p>יהי <M>T: V → W</M> העתקה לינארית. הגדר את <M>ker T</M> ואת <M>Im T</M>.</p>
            </Problem>
            <Solution>
              <p><strong>גרעין:</strong> <M>ker T = {'{'}v ∈ V : T(v) = 0_W{'}'}</M></p>
              <p><strong>תמונה:</strong> <M>Im T = {'{'}T(v) : v ∈ V{'}'} = {'{'}w ∈ W : ∃v ∈ V, T(v) = w{'}'}</M></p>
            </Solution>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה על ה&quot;ל — הגדרות</p>
          </SubQ>

          <SubQ label="2.1.2" pts={15}>
            <Problem>
              <p>V סוף-ממדי. הוכח: <M>dim V = dim ker T + dim Im T</M> (משפט הממד / rank-nullity).</p>
            </Problem>
            <Solution>
              <p>נסמן <M>k = dim ker T</M>. יהי <M>(u₁,...,uₖ)</M> בסיס ל-<M>ker T</M>.</p>
              <p>נשלים לבסיס של V: <M>(u₁,...,uₖ, v₁,...,vₘ)</M> בסיס של V.</p>
              <p>כלומר <M>dim V = k + m</M>.</p>
              <p className="mt-2"><strong>נוכיח: <M>(T(v₁),...,T(vₘ))</M> בסיס של <M>Im T</M>.</strong></p>

              <p className="mt-2"><strong>פורש:</strong> יהי <M>w ∈ Im T</M>. קיים <M>v ∈ V</M> כך ש-<M>T(v) = w</M>.</p>
              <p>v = α₁u₁+...+αₖuₖ + β₁v₁+...+βₘvₘ (ייצוג בבסיס V).</p>
              <p>T(v) = α₁T(u₁)+...+αₖT(uₖ) + β₁T(v₁)+...+βₘT(vₘ).</p>
              <p>כי <M>uᵢ ∈ ker T</M>: <M>T(uᵢ) = 0</M>. לכן:</p>
              <p className="font-mono text-center">w = β₁T(v₁) + ... + βₘT(vₘ) ∈ Span(T(v₁),...,T(vₘ))</p>

              <p className="mt-2"><strong>בת&quot;ל:</strong> נניח <M>β₁T(v₁) + ... + βₘT(vₘ) = 0_W</M>.</p>
              <p>מלינאריות: <M>T(β₁v₁ + ... + βₘvₘ) = 0_W</M>.</p>
              <p>לכן <M>β₁v₁ + ... + βₘvₘ ∈ ker T</M>.</p>
              <p>קיימים <M>γ₁,...,γₖ</M> כך ש-<M>β₁v₁+...+βₘvₘ = γ₁u₁+...+γₖuₖ</M>.</p>
              <p>כלומר: <M>γ₁u₁+...+γₖuₖ - β₁v₁-...-βₘvₘ = 0</M>.</p>
              <p>כי <M>(u₁,...,uₖ,v₁,...,vₘ)</M> בת&quot;ל: כל המקדמים 0. בפרט <M>β₁=...=βₘ=0</M>. ✓</p>

              <p className="mt-2">לכן <M>dim Im T = m</M>, ומכאן:</p>
              <p className="font-mono text-center font-bold">dim V = k + m = dim ker T + dim Im T ✓</p>
            </Solution>
            <Tip>זו הוכחה מרכזית מההרצאה — חובה לשנן! המפתח: להשלים בסיס של ker T לבסיס של V, ולהראות שהתמונות של הוקטורים המשלימים הן בסיס ל-Im T.</Tip>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה — משפט הממד (rank-nullity)</p>
          </SubQ>
        </SubQ>

        <SubQ label="2.2" pts={8}>
          <Problem>
            <p>האם קיימת <M>S: R₂[x] → R₂[x]</M> העתקה לינארית כך ש:</p>
            <p className="font-mono text-center my-2">S(1+2x-x²) = 1+x</p>
            <p className="font-mono text-center my-2">S(2-x+x²) = x²</p>
            <p className="font-mono text-center my-2">S(-5x²+7x-4) = 1-x+x²</p>
          </Problem>
          <Solution>
            <p><strong>תשובה: לא קיימת.</strong></p>
            <p className="mt-2">נבדוק תלות לינארית בין הקלטים:</p>
            <p className="font-mono text-center my-2">2(1+2x-x²) - 3(2-x+x²) = 2+4x-2x² - 6+3x-3x² = -4+7x-5x²</p>
            <p>כלומר: <M>-5x²+7x-4 = 2·(1+2x-x²) + (-3)·(2-x+x²)</M>.</p>

            <p className="mt-2">אם S לינארית, אז בהכרח:</p>
            <p className="font-mono text-center">S(-5x²+7x-4) = 2·S(1+2x-x²) - 3·S(2-x+x²)</p>
            <p className="font-mono text-center">= 2(1+x) - 3(x²)</p>
            <p className="font-mono text-center">= 2 + 2x - 3x²</p>

            <p className="mt-2">אבל לפי הנתון: <M>S(-5x²+7x-4) = 1-x+x²</M>.</p>
            <p className="mt-1"><M>2+2x-3x² ≠ 1-x+x²</M>. <strong>סתירה!</strong></p>
            <p className="mt-1">לכן לא קיימת העתקה לינארית כזו. ✓</p>
          </Solution>
          <Tip>
            <strong>תבנית:</strong> כשנותנים 3 קלטים ו-3 פלטים — תמיד תבדוק אם יש תלות לינארית בין הקלטים. אם כן, הלינאריות מכריחה תלות זהה בפלטים. אם לא מתקיים — סתירה.
          </Tip>
          <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: תכונות ה&quot;ל — לינאריות + ת&quot;ל</p>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 3 */}
      {/* ==================== */}
      <QuestionBox num={3} pts={25} topic="אופרטור לינארי + היפוך מטריצה מעל Z₅">
        <SubQ label="3.1" pts={13}>
          <Problem>
            <p>V סוף-ממדי, <M>T: V → V</M> אופרטור לינארי עם <M>dim Im T ≤ 1</M>.</p>
            <p>הוכח: קיים <M>α ∈ F</M> כך ש-<M>T ∘ T = α · T</M>.</p>
          </Problem>
          <Solution>
            <p><strong>מקרה 1: <M>dim Im T = 0</M>.</strong></p>
            <p>אז <M>Im T = {'{0_V}'}</M>, כלומר <M>T = 0</M> (ההעתקת אפס).</p>
            <p>לכל <M>α ∈ F</M>: <M>T ∘ T = 0 = α · 0 = α · T</M>. ✓</p>

            <p className="mt-2"><strong>מקרה 2: <M>dim Im T = 1</M>.</strong></p>
            <p>אז קיים <M>w₀ ≠ 0_V</M> כך ש-<M>Im T = Span{'{w₀}'}</M>.</p>
            <p className="mt-1">בפרט, <M>w₀ ∈ V</M>, לכן <M>T(w₀) ∈ Im T = Span{'{w₀}'}</M>.</p>
            <p>כלומר קיים <M>α ∈ F</M> כך ש-<M>T(w₀) = α · w₀</M>.</p>

            <p className="mt-2"><strong>נוכיח: <M>T ∘ T = α · T</M>.</strong></p>
            <p>יהי <M>v ∈ V</M> שרירותי. <M>T(v) ∈ Im T = Span{'{w₀}'}</M>.</p>
            <p>לכן קיים <M>α₁ ∈ F</M> כך ש-<M>T(v) = α₁ · w₀</M>.</p>
            <p className="mt-1">נחשב:</p>
            <p className="font-mono text-center">(T ∘ T)(v) = T(T(v)) = T(α₁w₀) = α₁T(w₀) = α₁ · αw₀ = α · (α₁w₀) = α · T(v)</p>
            <p className="mt-1">זה נכון לכל <M>v ∈ V</M>, לכן <M>T ∘ T = α · T</M>. ✓</p>
          </Solution>
          <Tip>
            <strong>הרעיון:</strong> אם התמונה חד-ממדית, כל וקטור בתמונה הוא כפולה סקלרית של w₀. בפרט T(w₀) = αw₀, וזה ה-α שעובד.
          </Tip>
          <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות על אופרטורים לינאריים</p>
        </SubQ>

        <SubQ label="3.2" pts={12}>
          <Problem>
            <p>A ∈ M₄(Z₅) = </p>
            <div className="font-mono text-center my-2">
              <p>⎡1 0 2 1⎤</p>
              <p>⎢1 3 0 1⎥</p>
              <p>⎢0 0 0 1⎥</p>
              <p>⎣0 1 1 3⎦</p>
            </div>
            <p>חשב <M>A⁻¹</M> או הוכח שהמטריצה לא הפיכה. (כל החישובים מעל Z₅.)</p>
          </Problem>
          <Solution>
            <p><strong>עובדים מעל Z₅ = {'{0,1,2,3,4}'}</strong>. (זכרו: <M>-1 ≡ 4</M>, <M>2⁻¹ = 3</M>, <M>3⁻¹ = 2</M>, <M>4⁻¹ = 4</M>.)</p>
            <p className="mt-2">נדרג <M>[A | I₄]</M>:</p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 0 2 1 | 1 0 0 0]</p>
              <p>[1 3 0 1 | 0 1 0 0]</p>
              <p>[0 0 0 1 | 0 0 1 0]</p>
              <p>[0 1 1 3 | 0 0 0 1]</p>
            </div>
            <p className="mt-2"><strong>R₂ → R₂ - R₁:</strong></p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 0 2 1 | 1 0 0 0]</p>
              <p>[0 3 3 0 | 4 1 0 0]</p>
              <p>[0 0 0 1 | 0 0 1 0]</p>
              <p>[0 1 1 3 | 0 0 0 1]</p>
            </div>
            <p className="mt-2"><strong>R₂ → 2·R₂</strong> (כי 3⁻¹ = 2 ב-Z₅):</p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 0 2 1 | 1 0 0 0]</p>
              <p>[0 1 1 0 | 3 2 0 0]</p>
              <p>[0 0 0 1 | 0 0 1 0]</p>
              <p>[0 1 1 3 | 0 0 0 1]</p>
            </div>
            <p className="mt-2"><strong>R₄ → R₄ - R₂:</strong></p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 0 2 1 | 1 0 0 0]</p>
              <p>[0 1 1 0 | 3 2 0 0]</p>
              <p>[0 0 0 1 | 0 0 1 0]</p>
              <p>[0 0 0 3 | 2 3 0 1]</p>
            </div>
            <p className="mt-2"><strong>R₄ → R₄ - 3·R₃:</strong> (3·R₃ = [0,0,0,3|0,0,3,0])</p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 0 2 1 | 1 0 0 0]</p>
              <p>[0 1 1 0 | 3 2 0 0]</p>
              <p>[0 0 0 1 | 0 0 1 0]</p>
              <p>[0 0 0 0 | 2 3 2 1]</p>
            </div>
            <p className="mt-2">שורה 4 הפכה ל-<M>[0 0 0 0 | 2 3 2 1]</M>.</p>
            <p>צד שמאל = שורת אפסים, אבל צד ימין ≠ אפסים.</p>
            <p>זה אומר שהעמודה השלישית (העמודה של x₃) היא עמודה חופשית — אין פיבוט בעמודה 3.</p>

            <p className="mt-2"><strong>rank(A) = 3 &lt; 4</strong>, לכן <strong>A אינה הפיכה</strong>. ✓</p>

            <div className="mt-2 bg-red-50 border border-red-200 rounded p-2">
              <p className="font-bold text-red-800 text-sm">מסקנה: A לא הפיכה (rank(A) &lt; 4).</p>
            </div>
          </Solution>
          <Tip>
            <strong>מעל Z₅:</strong> תהיו זהירים עם החשבון — כל תוצאה mod 5. טבלת ההפכים: <M>1⁻¹=1, 2⁻¹=3, 3⁻¹=2, 4⁻¹=4</M>. ל-0 אין הופכי.
          </Tip>
          <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות 1-8 — דירוג מעל Z₅</p>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 4 */}
      {/* ==================== */}
      <QuestionBox num={4} pts={25} topic="מערכת עם פרמטר + הוכחת dim(U∩W)">
        <SubQ label="4.1" pts={11}>
          <Problem>
            <p>יהי a ∈ R. פתור את המערכת:</p>
            <div className="font-mono text-center my-2 space-y-1">
              <p>x + ay = 1</p>
              <p>ax + ay + z = a + 1</p>
              <p>(a+1)x + 2ay + (a+1)z = a + 3</p>
            </div>
          </Problem>
          <Solution>
            <p><strong>נדרג את המטריצה המורחבת:</strong></p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 &ensp;&ensp;a &ensp;&ensp;0 | 1 &ensp;]</p>
              <p>[a &ensp;&ensp;a &ensp;&ensp;1 | a+1 ]</p>
              <p>[a+1 &ensp;2a &ensp;a+1 | a+3 ]</p>
            </div>

            <p className="mt-2"><strong>R₂ → R₂ - a·R₁, R₃ → R₃ - (a+1)·R₁:</strong></p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 &ensp;a &ensp;&ensp;&ensp;0 &ensp;| 1 &ensp;&ensp;]</p>
              <p>[0 &ensp;a-a² &ensp;1 &ensp;| 1 &ensp;&ensp;]</p>
              <p>[0 &ensp;a-a &ensp;a+1 | 2 &ensp;&ensp;]</p>
            </div>

            <p className="mt-1">R₃: <M>2a - (a+1)·a = 2a - a² - a = a - a²</M>... כלומר <M>a(1-a)</M>.</p>
            <p>ועמודה אחרונה: <M>a+3 - (a+1)·1 = a+3-a-1 = 2</M>.</p>

            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 &ensp;a &ensp;&ensp;&ensp;&ensp;0 &ensp;| 1]</p>
              <p>[0 &ensp;a(1-a) &ensp;1 &ensp;| 1]</p>
              <p>[0 &ensp;a(1-a) &ensp;a+1 | 2]</p>
            </div>

            <p className="mt-2"><strong>R₃ → R₃ - R₂:</strong></p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 &ensp;a &ensp;&ensp;&ensp;&ensp;0 | 1]</p>
              <p>[0 &ensp;a(1-a) &ensp;1 | 1]</p>
              <p>[0 &ensp;0 &ensp;&ensp;&ensp;&ensp;a | 1]</p>
            </div>

            <p className="mt-3"><strong>מקרה a = 0:</strong></p>
            <p>שורה 3: <M>[0 0 0 | 1]</M> — <strong>שורת סתירה!</strong></p>
            <p><strong>אין פתרון.</strong></p>

            <p className="mt-3"><strong>מקרה a = 1:</strong></p>
            <p>שורה 2: <M>[0, 1·0, 1 | 1] = [0, 0, 1 | 1]</M>.</p>
            <p>שורה 3: <M>[0, 0, 1 | 1]</M>.</p>
            <div className="font-mono text-xs bg-white p-2 rounded border">
              <p>[1 1 0 | 1] / [0 0 1 | 1]</p>
            </div>
            <p><M>z = 1</M>, y חופשי (<M>y = t</M>), <M>x = 1 - t</M>.</p>
            <p><strong>פתרון כללי:</strong> <M>(1-t, t, 1)</M>, <M>t ∈ R</M>. <strong>אינסוף פתרונות.</strong></p>

            <p className="mt-3"><strong>מקרה a ≠ 0 וגם a ≠ 1:</strong></p>
            <p>שורה 3: <M>z = 1/a</M>.</p>
            <p>שורה 2: <M>a(1-a)y + 1/a = 1</M> ⟹ <M>a(1-a)y = 1 - 1/a = (a-1)/a</M>.</p>
            <p><M>y = (a-1) / [a · a(1-a)] = (a-1) / [a²(1-a)] = -(1-a) / [a²(1-a)] = -1/a²</M>.</p>
            <p>שורה 1: <M>x + a·(-1/a²) = 1</M> ⟹ <M>x = 1 + 1/a = (a+1)/a</M>.</p>
            <p><strong>פתרון יחיד:</strong> <M>((a+1)/a, -1/a², 1/a)</M>.</p>

            <div className="mt-3 bg-blue-50 border border-blue-200 rounded p-3">
              <p className="font-bold text-blue-800 text-xs mb-1">סיכום:</p>
              <p className="text-blue-700"><strong>a = 0:</strong> אין פתרון (שורת סתירה)</p>
              <p className="text-blue-700"><strong>a = 1:</strong> אינסוף פתרונות — (1-t, t, 1), t ∈ R</p>
              <p className="text-blue-700"><strong>a ≠ 0, a ≠ 1:</strong> פתרון יחיד — ((a+1)/a, -1/a², 1/a)</p>
            </div>
          </Solution>
          <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות 1-8 — דירוג מטריצות</p>
        </SubQ>

        <SubQ label="4.2" pts={14}>
          <Problem>
            <p><M>dim V = n ≥ 2</M>. U, W תתי-מרחבים של V עם <M>dim U = dim W = n-1</M> ו-<M>U ≠ W</M>.</p>
            <p>הוכח: <M>dim(U ∩ W) = n-2</M>.</p>
          </Problem>
          <Solution>
            <p><strong>מנוסחת הממדים:</strong></p>
            <p className="font-mono text-center">dim(U + W) = dim U + dim W - dim(U ∩ W) = (n-1) + (n-1) - dim(U ∩ W) = 2n-2-dim(U ∩ W)</p>

            <p className="mt-2"><strong>חסם תחתון:</strong></p>
            <p><M>U + W ⊆ V</M> ⟹ <M>dim(U+W) ≤ n</M>.</p>
            <p>לכן <M>2n-2-dim(U∩W) ≤ n</M> ⟹ <M>dim(U∩W) ≥ n-2</M>.</p>

            <p className="mt-2"><strong>חסם עליון:</strong></p>
            <p><M>U ∩ W ⊆ U</M> ⟹ <M>dim(U ∩ W) ≤ dim U = n-1</M>.</p>

            <p className="mt-2"><strong>נוכיח: <M>dim(U ∩ W) ≠ n-1</M>.</strong></p>
            <p>נניח בשלילה <M>dim(U ∩ W) = n-1</M>.</p>
            <p>אז <M>dim(U ∩ W) = n-1 = dim U</M>.</p>
            <p>כי <M>U ∩ W ⊆ U</M> ו-<M>dim(U ∩ W) = dim U</M>, נובע <M>U ∩ W = U</M>, כלומר <M>U ⊆ W</M>.</p>
            <p>באופן דומה, <M>dim(U ∩ W) = n-1 = dim W</M> ⟹ <M>W ⊆ U</M>.</p>
            <p>מ-<M>U ⊆ W</M> ו-<M>W ⊆ U</M> נובע <M>U = W</M>. <strong>סתירה!</strong> (נתון U ≠ W.)</p>

            <p className="mt-2">לכן <M>dim(U ∩ W) ≤ n-2</M>.</p>
            <p className="mt-1">ביחד עם החסם התחתון:</p>
            <p className="font-mono text-center font-bold">n-2 ≤ dim(U ∩ W) ≤ n-2 &ensp;⟹&ensp; dim(U ∩ W) = n-2 ✓</p>
          </Solution>
          <Tip>
            <strong>תבנית חוזרת:</strong> נוסחת ממדים + הנתון U ≠ W. המפתח: dim(U∩W) = dim U ⟹ U ⊆ W (כי U∩W ⊆ U ומרחב עם אותו ממד = אותו מרחב).
          </Tip>
          <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 14-15 — נוסחת הממדים + dim W=dim V ⟹ W=V</p>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 5 */}
      {/* ==================== */}
      <QuestionBox num={5} pts={25} topic="שוויון Span + דרגת מכפלת מטריצות">
        <SubQ label="5.1" pts={10}>
          <Problem>
            <p>נתון <M>1_F + 1_F ≠ 0_F</M>. הוכח:</p>
            <p className="font-mono text-center my-2">Span{'{v₁+v₂, v₁-v₂, v₁+v₃}'} = Span{'{v₁, v₂, v₃}'}</p>
          </Problem>
          <Solution>
            <p><strong>הכלה ⊆ :</strong></p>
            <p>כל וקטור באגף שמאל הוא צירוף לינארי של v₁, v₂, v₃:</p>
            <p><M>v₁+v₂ = 1·v₁+1·v₂+0·v₃ ∈ Span{'{v₁,v₂,v₃}'}</M></p>
            <p><M>v₁-v₂ = 1·v₁+(-1)·v₂+0·v₃ ∈ Span{'{v₁,v₂,v₃}'}</M></p>
            <p><M>v₁+v₃ = 1·v₁+0·v₂+1·v₃ ∈ Span{'{v₁,v₂,v₃}'}</M></p>
            <p>לכן <M>Span{'{v₁+v₂, v₁-v₂, v₁+v₃}'} ⊆ Span{'{v₁,v₂,v₃}'}</M>. ✓</p>

            <p className="mt-3"><strong>הכלה ⊇ :</strong></p>
            <p>נראה ש-v₁, v₂, v₃ הם צירופים לינאריים של {'{v₁+v₂, v₁-v₂, v₁+v₃}'}.</p>

            <p className="mt-1">נסמן <M>2 = 1_F+1_F</M>. לפי הנתון <M>2 ≠ 0_F</M>, לכן ל-2 יש הופכי <M>2⁻¹</M>.</p>

            <p className="mt-1"><strong>v₁:</strong></p>
            <p className="font-mono text-center">(v₁+v₂) + (v₁-v₂) = 2v₁</p>
            <p className="font-mono text-center">v₁ = 2⁻¹ · [(v₁+v₂) + (v₁-v₂)]</p>

            <p className="mt-1"><strong>v₂:</strong></p>
            <p className="font-mono text-center">(v₁+v₂) - (v₁-v₂) = 2v₂</p>
            <p className="font-mono text-center">v₂ = 2⁻¹ · [(v₁+v₂) - (v₁-v₂)]</p>

            <p className="mt-1"><strong>v₃:</strong></p>
            <p className="font-mono text-center">v₃ = (v₁+v₃) - v₁ = (v₁+v₃) - 2⁻¹[(v₁+v₂)+(v₁-v₂)]</p>

            <p className="mt-1">לכן <M>v₁, v₂, v₃ ∈ Span{'{v₁+v₂, v₁-v₂, v₁+v₃}'}</M>.</p>
            <p>⟹ <M>Span{'{v₁,v₂,v₃}'} ⊆ Span{'{v₁+v₂, v₁-v₂, v₁+v₃}'}</M>. ✓</p>

            <p className="mt-2 font-bold">משתי ההכלות: Span{'{v₁+v₂, v₁-v₂, v₁+v₃}'} = Span{'{v₁,v₂,v₃}'}. ✓</p>
          </Solution>
          <Tip>
            <strong>שימו לב לתנאי <M>1+1 ≠ 0</M>!</strong> זה מבטיח ש-char(F) ≠ 2, ולכן 2 הפיך. בלי זה לא היינו יכולים לחלק ב-2.
          </Tip>
          <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 10 — תכונות Span</p>
        </SubQ>

        <SubQ label="5.2" pts={15}>
          <Problem>
            <p><M>A, B ∈ Mₙ(F)</M>, <M>rank(A) = n</M> (כלומר A הפיכה).</p>
          </Problem>

          <SubQ label="5.2.1" pts={6}>
            <Problem>
              <p>הוכח: <M>rank(AB) = rank(B)</M>.</p>
            </Problem>
            <Solution>
              <p><M>rank(A) = n</M> ⟹ A הפיכה (מטריצה ריבועית n×n עם דרגה n).</p>
              <p className="mt-1"><strong>rank(AB) ≤ rank(B):</strong> כל צירוף לינארי של עמודות AB הוא A כפול צירוף של עמודות B. לכן <M>Col(AB) ⊆ A · Col(B)</M>... (או: Im(T_AB) ⊆ Im(T_A)).</p>
              <p className="mt-1"><strong>rank(AB) ≥ rank(B):</strong> A הפיכה, לכן <M>B = A⁻¹(AB)</M>. מאותו טיעון: <M>rank(B) = rank(A⁻¹·AB) ≤ rank(AB)</M>.</p>
              <p className="mt-1">ביחד: <M>rank(AB) = rank(B)</M>. ✓</p>
              <p className="mt-2"><strong>לחילופין (דרך נוספת):</strong></p>
              <p>A הפיכה ⟹ כפל ב-A משמאל = סדרת פעולות שורה אלמנטריות. פעולות שורה אלמנטריות לא משנות דרגה. לכן <M>rank(AB) = rank(B)</M>. ✓</p>
            </Solution>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות על דרגה — A הפיכה ⟹ rank(AB)=rank(B)</p>
          </SubQ>

          <SubQ label="5.2.2" pts={3}>
            <Problem>
              <p>הוכח: <M>rank(Bᵗ) = rank(B)</M>.</p>
            </Problem>
            <Solution>
              <p>לכל מטריצה B: <strong>דרגת שורה = דרגת עמודה</strong>.</p>
              <p><M>rank(B)</M> = דרגת עמודה של B = דרגת שורה של B.</p>
              <p><M>rank(Bᵗ)</M> = דרגת עמודה של Bᵗ = דרגת שורה של B.</p>
              <p>לכן <M>rank(Bᵗ) = rank(B)</M>. ✓</p>
            </Solution>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה — דרגת שורה = דרגת עמודה</p>
          </SubQ>

          <SubQ label="5.2.3" pts={6}>
            <Problem>
              <p>הוכח: <M>rank(BA) = rank(B)</M>.</p>
            </Problem>
            <Solution>
              <p>נשתמש בסעיפים הקודמים:</p>
              <p className="font-mono text-center mt-2">rank(BA) = rank((BA)ᵗ) &ensp;(לפי 5.2.2)</p>
              <p className="font-mono text-center">= rank(AᵗBᵗ)</p>

              <p className="mt-2">כעת, <M>rank(Aᵗ) = rank(A) = n</M> (לפי 5.2.2 עבור A).</p>
              <p>לכן Aᵗ הפיכה (מטריצה n×n עם דרגה n).</p>

              <p className="mt-1">נפעיל 5.2.1 עם Aᵗ במקום A ו-Bᵗ במקום B:</p>
              <p className="font-mono text-center">rank(AᵗBᵗ) = rank(Bᵗ) &ensp;(לפי 5.2.1)</p>

              <p className="mt-1">ולבסוף:</p>
              <p className="font-mono text-center">rank(Bᵗ) = rank(B) &ensp;(לפי 5.2.2)</p>

              <p className="mt-2 font-bold">ביחד: rank(BA) = rank(AᵗBᵗ) = rank(Bᵗ) = rank(B). ✓</p>
            </Solution>
            <Tip>
              <strong>טכניקה חשובה:</strong> כשיש כפל מימין (BA), &quot;הפוך&quot; עם שחלוף כדי לקבל כפל משמאל (AᵗBᵗ), ואז השתמש בתוצאה על כפל משמאל.
            </Tip>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: שילוב סעיפים קודמים</p>
          </SubQ>
        </SubQ>
      </QuestionBox>

      {/* Strategy */}
      <Section title="אסטרטגיה מומלצת" icon={<Star className="w-5 h-5" />} color="text-amber-700">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 space-y-2">
          <p className="font-bold text-amber-800">סדר מומלץ למבחן הזה:</p>
          <p className="text-amber-700">1. <strong>שאלה 1</strong> (25 נק&apos;) — הגדרה + הוכחה מההרצאה + חישוב שחלוף קצר</p>
          <p className="text-amber-700">2. <strong>שאלה 4</strong> (25 נק&apos;) — דירוג מכני + הוכחת ממדים עם נוסחה</p>
          <p className="text-amber-700">3. <strong>שאלה 5</strong> (25 נק&apos;) — שוויון Span + שלושה סעיפי דרגה (מבנים אחד על השני)</p>
          <p className="text-amber-700">4. <strong>שאלה 2</strong> (25 נק&apos;) — rank-nullity מההרצאה + בדיקת לינאריות</p>
          <p className="text-amber-700 opacity-60">5. שאלה 3 — רק אם נשאר זמן (אופרטור + חישוב Z₅ מייגע)</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-800">
            <strong>שאלה 3</strong> מכילה הוכחה על אופרטור לינארי (3.1) + חישוב דירוג ארוך מעל Z₅ (3.2). אם אתם לא בטוחים בעבודה מעל Z₅ — עדיף לדלג ולהשקיע בשאלות 1-2-4-5.
          </div>
        </div>
      </Section>

      {/* Key Topics Summary */}
      <Section title="נושאים מרכזיים למבחן" icon={<BookOpen className="w-5 h-5" />} color="text-purple-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="font-bold text-purple-800 text-sm mb-2">הגדרות חובה:</p>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• בת&quot;ל (שאלה 1.1.1)</li>
              <li>• ker T, Im T (שאלה 2.1.1)</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="font-bold text-purple-800 text-sm mb-2">הוכחות מההרצאה:</p>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• משפט יחידות הייצוג (שאלה 1.1.2)</li>
              <li>• rank-nullity (שאלה 2.1.2)</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="font-bold text-purple-800 text-sm mb-2">חישובים:</p>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• דירוג עם פרמטר (שאלה 4.1)</li>
              <li>• דירוג מעל Z₅ (שאלה 3.2)</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="font-bold text-purple-800 text-sm mb-2">הוכחות &quot;טריקים&quot;:</p>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• שחלוף מכפלה (שאלה 1.2)</li>
              <li>• dim(U∩W) + נוסחת ממדים (שאלה 4.2)</li>
              <li>• rank(BA) = rank(B) דרך שחלוף (שאלה 5.2)</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
