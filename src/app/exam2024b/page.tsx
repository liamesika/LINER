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

export default function Exam2024BPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            אלגברה לינארית 1 — אוניברסיטת רייכמן
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">מבחן מועד ב&apos; 2023-24</h1>
          <p className="text-gray-500 text-sm">5 שאלות, עונים על 4 | 25 נקודות כל שאלה | 3 שעות | ללא דפי נוסחאות ומחשבונים</p>
        </div>

        {/* Strategy */}
        <Section title="אסטרטגיית פתרון מומלצת" icon={<Target className="w-5 h-5" />} color="text-purple-700">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <div className="text-purple-700 font-bold text-lg">1</div>
              <div className="text-purple-700 font-semibold text-sm">שאלה 2</div>
              <div className="text-purple-500 text-xs">סכום + yᵗy</div>
              <div className="text-purple-400 text-xs mt-1">~40 דק&apos;</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <div className="text-purple-700 font-bold text-lg">2</div>
              <div className="text-purple-700 font-semibold text-sm">שאלה 5</div>
              <div className="text-purple-500 text-xs">סכום ישר + פולינומים</div>
              <div className="text-purple-400 text-xs mt-1">~40 דק&apos;</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <div className="text-purple-700 font-bold text-lg">3</div>
              <div className="text-purple-700 font-semibold text-sm">שאלה 1</div>
              <div className="text-purple-500 text-xs">ת&quot;ל + תת-שדה</div>
              <div className="text-purple-400 text-xs mt-1">~45 דק&apos;</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <div className="text-purple-700 font-bold text-lg">4</div>
              <div className="text-purple-700 font-semibold text-sm">שאלה 3</div>
              <div className="text-purple-500 text-xs">אלגברה מטריצתית</div>
              <div className="text-purple-400 text-xs mt-1">~45 דק&apos;</div>
            </div>
          </div>
          <Tip>
            <strong>שאלה 4 היא האחרונה בעדיפות</strong> — חישובי דירוג ארוכים ומועדים לטעויות חישוב. עדיף לוותר עליה אם הזמן קצר.
          </Tip>
        </Section>

        {/* Exam Overview */}
        <Section title="סקירת נושאים" icon={<Star className="w-5 h-5" />} color="text-yellow-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <strong>שאלות 1-2:</strong> תלות לינארית, תת-מרחבים, סכום וממדים — הליבה של הקורס
              </div>
            </div>
            <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <strong>שאלה 3:</strong> אלגברה מטריצתית — הפיכות, כפל, שקילות שורית
              </div>
            </div>
            <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <strong>שאלה 4:</strong> צורה קנונית + חיתוך קבוצות מוזזות
              </div>
            </div>
            <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <strong>שאלה 5:</strong> סכום ישר, דוגמה נגדית, פולינומים — חשיבה מופשטת
              </div>
            </div>
          </div>
        </Section>

        {/* ==================== QUESTION 1 ==================== */}
        <QuestionBox num={1} pts={25} topic="אפיון תלות לינארית + תת-שדה">

          {/* 1a */}
          <SubQ label="סעיף א&apos;" pts={15}>
            <Problem>
              <p>
                הוכיחו: הוקטורים <M>v₁, ..., vₖ</M> תלויים לינארית אם ורק אם קיים <M>1 ≤ j ≤ k</M> כך ש-<M>vⱼ ∈ Span&#123;v₁, ..., vⱼ₋₁&#125;</M>.
              </p>
            </Problem>
            <Solution>
              <p className="font-bold">כיוון ⇐ (אם vⱼ ∈ Span&#123;v₁,...,vⱼ₋₁&#125; אז ת&quot;ל):</p>
              <p>
                נניח קיים <M>1 ≤ j ≤ k</M> כך ש-<M>vⱼ ∈ Span&#123;v₁, ..., vⱼ₋₁&#125;</M>.
              </p>
              <p>
                אז קיימים סקלרים <M>a₁, ..., aⱼ₋₁ ∈ F</M> כך ש-<M>vⱼ = a₁v₁ + ... + aⱼ₋₁vⱼ₋₁</M>.
              </p>
              <p>
                לכן: <M>a₁v₁ + ... + aⱼ₋₁vⱼ₋₁ + (-1)vⱼ + 0·vⱼ₊₁ + ... + 0·vₖ = 0⃗</M>.
              </p>
              <p>
                זהו צירוף לינארי ששווה לאפס עם מקדם <M>-1 ≠ 0</M> ליד <M>vⱼ</M>, לכן הוקטורים ת&quot;ל.
              </p>

              <p className="font-bold mt-3">כיוון ⇒ (אם ת&quot;ל אז ∃j כך ש-vⱼ ∈ Span&#123;v₁,...,vⱼ₋₁&#125;):</p>
              <p>
                נניח <M>v₁, ..., vₖ</M> ת&quot;ל. אז קיימים סקלרים <M>a₁, ..., aₖ</M> לא כולם אפס כך ש-<M>a₁v₁ + ... + aₖvₖ = 0⃗</M>.
              </p>
              <p>
                יהי <M>j = max&#123;i : aᵢ ≠ 0&#125;</M> (האינדקס הגדול ביותר עם מקדם שונה מאפס).
              </p>
              <p>
                אז <M>j ≥ 1</M> (כי לא כל המקדמים אפס), ומתקיים:
              </p>
              <p>
                <M>a₁v₁ + ... + aⱼvⱼ = 0⃗</M> (כי <M>aⱼ₊₁ = ... = aₖ = 0</M>).
              </p>
              <p>
                מכיוון ש-<M>aⱼ ≠ 0</M>, נחלק ב-<M>aⱼ</M>:
              </p>
              <p>
                <M>vⱼ = (-a₁/aⱼ)v₁ + ... + (-aⱼ₋₁/aⱼ)vⱼ₋₁</M>
              </p>
              <p>
                לכן <M>vⱼ ∈ Span&#123;v₁, ..., vⱼ₋₁&#125;</M>. ∎
              </p>

              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 11 — אפיון ת&quot;ל (משפט + הוכחה מלאה)</p>
            </Solution>
            <Tip>
              זו הוכחה קלאסית מההרצאות. הכיוון ⇒ הוא הקשה יותר — המפתח הוא לבחור את <M>j</M> כאינדקס <strong>המקסימלי</strong> עם מקדם שונה מאפס.
            </Tip>
          </SubQ>

          {/* 1b */}
          <SubQ label="סעיף ב&apos;" pts={10}>
            <Problem>
              <p>
                יהי <M>F</M> שדה, ותהי <M>∅ ≠ F₁ ⊆ F</M> קבוצה המקיימת את כל אקסיומות השדה <strong>פרט אולי</strong> לאקסיומת ההופכי הכפלי.
                אם <M>F₁</M> סופית, הוכיחו שלכל <M>0_F ≠ x ∈ F₁</M> מתקיים <M>x⁻¹ ∈ F₁</M>.
              </p>
            </Problem>
            <Solution>
              <p>
                יהי <M>x ∈ F₁</M>, <M>x ≠ 0</M>. נגדיר את הקבוצה:
              </p>
              <p>
                <M>A = &#123;xⁿ : n ≥ 0&#125; = &#123;1, x, x², x³, ...&#125;</M>
              </p>
              <p>
                <M>A ⊆ F₁</M> כי <M>F₁</M> סגורה לכפל (לפי אקסיומת הסגירות לכפל ש-<M>F₁</M> כן מקיימת) ו-<M>1 ∈ F₁</M>.
              </p>
              <p>
                מכיוון ש-<M>F₁</M> סופית, גם <M>A</M> סופית. לכן קיימים <M>n₁ &lt; n₂</M> (שניהם אי-שליליים) כך ש-<M>xⁿ¹ = xⁿ²</M>.
              </p>
              <p>
                עכשיו, <M>x ≠ 0</M> ו-<M>x ∈ F</M> (שדה), לכן <M>x</M> הפיך ב-<M>F</M>. בפרט, <M>xⁿ¹⁺¹</M> הפיך ב-<M>F</M> ומתקיים <M>(xⁿ¹⁺¹)⁻¹ = x⁻⁽ⁿ¹⁺¹⁾</M>.
              </p>
              <p>
                נכפול את שני הצדדים של <M>xⁿ¹ = xⁿ²</M> ב-<M>x⁻⁽ⁿ¹⁺¹⁾</M> (ב-<M>F</M>):
              </p>
              <p>
                <M>x⁻¹ = xⁿ²⁻ⁿ¹⁻¹</M>
              </p>
              <p>
                מכיוון ש-<M>n₂ &gt; n₁</M>, מתקיים <M>n₂ - n₁ - 1 ≥ 0</M>. אם <M>n₂ - n₁ - 1 = 0</M> אז <M>x⁻¹ = x⁰ = 1 ∈ F₁</M>. אחרת <M>n₂ - n₁ - 1 ≥ 1</M> ואז <M>xⁿ²⁻ⁿ¹⁻¹ ∈ A ⊆ F₁</M>.
              </p>
              <p>
                בכל מקרה, <M>x⁻¹ ∈ F₁</M>. ∎
              </p>

              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: תכונות שדות — הוכחה קומבינטורית</p>
            </Solution>
            <Tip>
              הרעיון: ב-<M>F₁</M> סופית, חזקות של <M>x</M> חייבות &quot;להתנגש&quot;. מכאן מוציאים את <M>x⁻¹</M> כחזקה חיובית של <M>x</M>.
            </Tip>
          </SubQ>
        </QuestionBox>

        {/* ==================== QUESTION 2 ==================== */}
        <QuestionBox num={2} pts={25} topic="סכום תת-מרחבים + yᵗy">

          {/* 2a */}
          <SubQ label="סעיף א&apos;" pts={18}>

            {/* 2a-i */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">i</span>
                <span className="text-gray-500 text-xs">(3 נק&apos;)</span>
              </div>
              <Problem>
                <p>
                  יהיו <M>U, W ⊆ V</M> תת-מרחבים. הגדירו את <M>U + W</M> והוכיחו שהוא תת-מרחב.
                </p>
              </Problem>
              <Solution>
                <p className="font-bold">הגדרה:</p>
                <p>
                  <M>U + W = &#123;u + w : u ∈ U, w ∈ W&#125;</M>
                </p>
                <p className="font-bold mt-2">הוכחה ש-U+W תת-מרחב:</p>
                <p>
                  <strong>1. לא ריק:</strong> <M>0⃗ = 0⃗ + 0⃗ ∈ U + W</M> (כי <M>0⃗ ∈ U</M> ו-<M>0⃗ ∈ W</M>).
                </p>
                <p>
                  <strong>2. סגירות לצירוף לינארי:</strong> יהיו <M>v₁ = u₁ + w₁, v₂ = u₂ + w₂ ∈ U + W</M> (כאשר <M>u₁, u₂ ∈ U</M> ו-<M>w₁, w₂ ∈ W</M>), ויהיו <M>α₁, α₂ ∈ F</M>.
                </p>
                <p>
                  <M>α₁v₁ + α₂v₂ = α₁(u₁ + w₁) + α₂(u₂ + w₂) = (α₁u₁ + α₂u₂) + (α₁w₁ + α₂w₂)</M>
                </p>
                <p>
                  מכיוון ש-<M>U</M> תת-מרחב: <M>α₁u₁ + α₂u₂ ∈ U</M>.
                </p>
                <p>
                  מכיוון ש-<M>W</M> תת-מרחב: <M>α₁w₁ + α₂w₂ ∈ W</M>.
                </p>
                <p>
                  לכן <M>α₁v₁ + α₂v₂ ∈ U + W</M>. ∎
                </p>

                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 14 — הגדרת סכום תת-מרחבים</p>
              </Solution>
            </div>

            {/* 2a-ii */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">ii</span>
                <span className="text-gray-500 text-xs">(15 נק&apos;)</span>
              </div>
              <Problem>
                <p>
                  <M>V</M> נוצר סופית. הוכיחו: <M>dim(U + W) = dim(U) + dim(W) - dim(U ∩ W)</M>.
                </p>
              </Problem>
              <Solution>
                <p>
                  יהי <M>dim(U ∩ W) = r</M>, ונבחר בסיס <M>B₀ = &#123;v₁, ..., vᵣ&#125;</M> ל-<M>U ∩ W</M>.
                </p>
                <p>
                  <M>U ∩ W ⊆ U</M>, לכן ניתן להשלים את <M>B₀</M> לבסיס של <M>U</M>:
                </p>
                <p>
                  <M>Bᵤ = &#123;v₁, ..., vᵣ, u₁, ..., uₛ&#125;</M> בסיס ל-<M>U</M>, כאשר <M>dim(U) = r + s</M>.
                </p>
                <p>
                  באופן דומה, נשלים את <M>B₀</M> לבסיס של <M>W</M>:
                </p>
                <p>
                  <M>B_W = &#123;v₁, ..., vᵣ, w₁, ..., wₜ&#125;</M> בסיס ל-<M>W</M>, כאשר <M>dim(W) = r + t</M>.
                </p>
                <p className="font-bold mt-2">טענה: <M>B = &#123;v₁, ..., vᵣ, u₁, ..., uₛ, w₁, ..., wₜ&#125;</M> בסיס ל-<M>U + W</M>.</p>

                <p className="font-bold mt-2">B פורשת את U+W:</p>
                <p>
                  יהי <M>v ∈ U + W</M>, אז <M>v = u + w</M> עם <M>u ∈ U</M>, <M>w ∈ W</M>.
                </p>
                <p>
                  <M>u ∈ U = Span(Bᵤ)</M> לכן <M>u = α₁v₁ + ... + αᵣvᵣ + β₁u₁ + ... + βₛuₛ</M>.
                </p>
                <p>
                  <M>w ∈ W = Span(B_W)</M> לכן <M>w = γ₁v₁ + ... + γᵣvᵣ + δ₁w₁ + ... + δₜwₜ</M>.
                </p>
                <p>
                  לכן <M>v = (α₁+γ₁)v₁ + ... + (αᵣ+γᵣ)vᵣ + β₁u₁ + ... + βₛuₛ + δ₁w₁ + ... + δₜwₜ ∈ Span(B)</M>.
                </p>

                <p className="font-bold mt-2">B בלתי תלויה לינארית:</p>
                <p>
                  נניח <M>α₁v₁ + ... + αᵣvᵣ + β₁u₁ + ... + βₛuₛ + δ₁w₁ + ... + δₜwₜ = 0⃗</M>.
                </p>
                <p>
                  נסמן: <M>x = α₁v₁ + ... + αᵣvᵣ + β₁u₁ + ... + βₛuₛ = -(δ₁w₁ + ... + δₜwₜ)</M>.
                </p>
                <p>
                  אגף שמאל: <M>x ∈ U</M> (צ&quot;ל של וקטורים מ-<M>U</M>).
                </p>
                <p>
                  אגף ימין: <M>x = -(δ₁w₁ + ... + δₜwₜ) ∈ W</M>.
                </p>
                <p>
                  לכן <M>x ∈ U ∩ W = Span&#123;v₁, ..., vᵣ&#125;</M>. קיימים <M>μ₁, ..., μᵣ</M> כך ש-<M>x = μ₁v₁ + ... + μᵣvᵣ</M>.
                </p>
                <p>
                  מצד שני: <M>x = -(δ₁w₁ + ... + δₜwₜ)</M>, לכן:
                </p>
                <p>
                  <M>μ₁v₁ + ... + μᵣvᵣ + δ₁w₁ + ... + δₜwₜ = 0⃗</M>
                </p>
                <p>
                  אלה וקטורים מ-<M>B_W</M> שהוא בסיס (ב&quot;ת), לכן <M>μ₁ = ... = μᵣ = δ₁ = ... = δₜ = 0</M>.
                </p>
                <p>
                  נחזור למשוואה המקורית: <M>α₁v₁ + ... + αᵣvᵣ + β₁u₁ + ... + βₛuₛ = 0⃗</M>.
                </p>
                <p>
                  אלה וקטורים מ-<M>Bᵤ</M> שהוא בסיס (ב&quot;ת), לכן <M>α₁ = ... = αᵣ = β₁ = ... = βₛ = 0</M>.
                </p>
                <p>
                  כל המקדמים אפס, לכן <M>B</M> ב&quot;ת. ∎
                </p>

                <p className="font-bold mt-2">סיכום:</p>
                <p>
                  <M>dim(U+W) = |B| = r + s + t = (r+s) + (r+t) - r = dim(U) + dim(W) - dim(U∩W)</M>. ∎
                </p>

                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 15 — נוסחת הממדים (הוכחה מלאה)</p>
              </Solution>
            </div>
          </SubQ>

          {/* 2b */}
          <SubQ label="סעיף ב&apos;" pts={7}>

            {/* 2b-i */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">i</span>
                <span className="text-gray-500 text-xs">(3 נק&apos;)</span>
              </div>
              <Problem>
                <p>
                  יהי <M>y⃗ ∈ ℝⁿ</M>. הוכיחו: אם <M>(y⃗)ᵗ · y⃗ = 0</M> אז <M>y⃗ = 0⃗</M>.
                </p>
              </Problem>
              <Solution>
                <p>
                  נסמן <M>y⃗ = (y₁, y₂, ..., yₙ)ᵗ</M>. אז:
                </p>
                <p>
                  <M>(y⃗)ᵗ · y⃗ = y₁² + y₂² + ... + yₙ² = 0</M>
                </p>
                <p>
                  לכל <M>i</M>: <M>yᵢ ∈ ℝ</M>, לכן <M>yᵢ² ≥ 0</M>.
                </p>
                <p>
                  סכום של מספרים אי-שליליים שווה לאפס אם ורק אם כל אחד מהם שווה לאפס.
                </p>
                <p>
                  לכן <M>yᵢ² = 0</M> לכל <M>i</M>, כלומר <M>yᵢ = 0</M> לכל <M>i</M>.
                </p>
                <p>
                  לכן <M>y⃗ = 0⃗</M>. ∎
                </p>

                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: תכונות ℝⁿ</p>
              </Solution>
            </div>

            {/* 2b-ii */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">ii</span>
                <span className="text-gray-500 text-xs">(4 נק&apos;)</span>
              </div>
              <Problem>
                <p>
                  <M>A ∈ Mₙ(ℝ)</M>, <M>x⃗ ∈ ℝⁿ</M>, ונתון <M>AᵗAx⃗ = 0⃗</M>. הוכיחו: <M>Ax⃗ = 0⃗</M>.
                </p>
              </Problem>
              <Solution>
                <p>
                  נסמן <M>y⃗ = Ax⃗</M>. נחשב:
                </p>
                <p>
                  <M>(y⃗)ᵗ · y⃗ = (Ax⃗)ᵗ · (Ax⃗) = (x⃗)ᵗAᵗ · Ax⃗ = (x⃗)ᵗ · (AᵗAx⃗) = (x⃗)ᵗ · 0⃗ = 0</M>
                </p>
                <p>
                  (השתמשנו בתכונה <M>(AB)ᵗ = BᵗAᵗ</M> ובנתון <M>AᵗAx⃗ = 0⃗</M>.)
                </p>
                <p>
                  מסעיף (i): <M>(y⃗)ᵗy⃗ = 0</M> גורר <M>y⃗ = 0⃗</M>.
                </p>
                <p>
                  לכן <M>Ax⃗ = y⃗ = 0⃗</M>. ∎
                </p>

                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: שימוש בתכונות שחלוף + סעיף i</p>
              </Solution>
              <Tip>
                הטריק: להגדיר <M>y⃗ = Ax⃗</M> ולחשב <M>yᵗy</M>. תכונת השחלוף <M>(Ax⃗)ᵗ = x⃗ᵗAᵗ</M> מאפשרת להשתמש בנתון.
              </Tip>
            </div>
          </SubQ>
        </QuestionBox>

        {/* ==================== QUESTION 3 ==================== */}
        <QuestionBox num={3} pts={25} topic="אלגברה מטריצתית + שקילות שורית">

          {/* 3a */}
          <SubQ label="סעיף א&apos;" pts={18}>

            {/* 3a-i */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">i</span>
                <span className="text-gray-500 text-xs">(8 נק&apos;)</span>
              </div>
              <Problem>
                <p>
                  <M>A, B ∈ Mₙ(F)</M>, <M>A = Iₙ - AB</M>. הוכיחו ש-<M>A</M> הפיכה וש-<M>AB = BA</M>.
                </p>
              </Problem>
              <Solution>
                <p className="font-bold">הוכחת הפיכות:</p>
                <p>
                  <M>A = Iₙ - AB</M>
                </p>
                <p>
                  <M>Iₙ = A + AB = A(Iₙ + B)</M>
                </p>
                <p>
                  מצאנו ש-<M>A · (Iₙ + B) = Iₙ</M>. ממשפט ההפיכות (אם <M>AC = I</M> אז <M>CA = I</M> ו-<M>A</M> הפיכה), <M>A</M> הפיכה ו-<M>A⁻¹ = Iₙ + B</M>.
                </p>

                <p className="font-bold mt-3">הוכחת AB = BA:</p>
                <p>
                  מ-<M>A⁻¹ = Iₙ + B</M> נובע גם:
                </p>
                <p>
                  <M>(Iₙ + B) · A = Iₙ</M>
                </p>
                <p>
                  <M>A + BA = Iₙ</M>
                </p>
                <p>
                  <M>BA = Iₙ - A</M>
                </p>
                <p>
                  אבל מהנתון: <M>AB = Iₙ - A</M>. לכן:
                </p>
                <p>
                  <M>AB = Iₙ - A = BA</M>. ∎
                </p>

                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות על הפיכות — AC=I ⟹ CA=I</p>
              </Solution>
            </div>

            {/* 3a-ii */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">ii</span>
                <span className="text-gray-500 text-xs">(10 נק&apos;)</span>
              </div>
              <Problem>
                <p>
                  בנוסף לנתונים בסעיף הקודם, נתון גם <M>B³ = 0</M>. הוכיחו: <M>A = Iₙ - B + B²</M>.
                </p>
              </Problem>
              <Solution>
                <p>
                  מהנתון: <M>A = Iₙ - AB</M>. נציב שוב ושוב:
                </p>
                <p>
                  <M>A = Iₙ - AB</M>
                </p>
                <p>
                  נציב <M>A = Iₙ - AB</M> בביטוי <M>AB</M>:
                </p>
                <p>
                  <M>AB = (Iₙ - AB)B = B - AB²</M>
                </p>
                <p>
                  לכן: <M>A = Iₙ - (B - AB²) = Iₙ - B + AB²</M>
                </p>
                <p>
                  נציב שוב <M>A = Iₙ - AB</M> בביטוי <M>AB²</M>:
                </p>
                <p>
                  <M>AB² = (Iₙ - AB)B² = B² - AB³ = B² - A · 0 = B²</M>
                </p>
                <p>
                  (השתמשנו ב-<M>B³ = 0</M>.)
                </p>
                <p>
                  לכן:
                </p>
                <p>
                  <M>A = Iₙ - B + AB² = Iₙ - B + B²</M>. ∎
                </p>

                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: אלגברה מטריצתית + B³=0</p>
              </Solution>
              <Tip>
                הטכניקה: הצבה חוזרת של <M>A = Iₙ - AB</M>. כל פעם מפרקים את <M>AB^k</M> ומשתמשים ב-<M>B³ = 0</M> לעצור את התהליך.
              </Tip>
            </div>
          </SubQ>

          {/* 3b */}
          <SubQ label="סעיף ב&apos;" pts={7}>
            <Problem>
              <p>
                <M>A ∈ M_&#123;m×n&#125;(F)</M>, <M>B ∈ M_&#123;n×m&#125;(F)</M>, <M>P ∈ Mₘ(F)</M> הפיכה, <M>B = AᵗP</M>.
                הוכיחו או הפריכו: <M>A</M> ו-<M>Bᵗ</M> שקולות שורית.
              </p>
            </Problem>
            <Solution>
              <p className="font-bold text-emerald-700">נכון! נוכיח:</p>
              <p>
                נחשב את <M>Bᵗ</M>:
              </p>
              <p>
                <M>Bᵗ = (AᵗP)ᵗ = Pᵗ · (Aᵗ)ᵗ = Pᵗ · A</M>
              </p>
              <p>
                (השתמשנו בתכונות: <M>(CD)ᵗ = DᵗCᵗ</M> ו-<M>(Aᵗ)ᵗ = A</M>.)
              </p>
              <p>
                <M>P</M> הפיכה ⟹ <M>Pᵗ</M> הפיכה (כי <M>(P⁻¹)ᵗ · Pᵗ = (PP⁻¹)ᵗ = Iᵗ = I</M>).
              </p>
              <p>
                לכן <M>Bᵗ = Pᵗ · A</M> כאשר <M>Pᵗ</M> הפיכה, וזו בדיוק ההגדרה של שקילות שורית:
              </p>
              <p>
                <M>A</M> ו-<M>Bᵗ</M> שקולות שורית. ∎
              </p>

              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות על שקילות שורית</p>
            </Solution>
            <Tip>
              המפתח: לפתוח את <M>Bᵗ</M> בעזרת תכונות השחלוף ולהראות ש-<M>Bᵗ = (מטריצה הפיכה) · A</M>.
            </Tip>
          </SubQ>
        </QuestionBox>

        {/* ==================== QUESTION 4 ==================== */}
        <QuestionBox num={4} pts={25} topic="צורה קנונית + חיתוך קבוצות">

          {/* 4a */}
          <SubQ label="סעיף א&apos;" pts={15}>
            <Problem>
              <p>
                <M>A ∈ M_&#123;4×3&#125;(ℝ)</M>:
              </p>
              <div className="font-mono text-center my-2">
                A = [[1/3, 0, 0], [-1, 0, 1], [2, 1, -2], [0, 0, 2]]
              </div>
              <p>
                מצאו את הצורה הקנונית <M>C</M> ומטריצה הפיכה <M>P ∈ M₄(ℝ)</M> כך ש-<M>PA = C</M>.
              </p>
            </Problem>
            <Solution>
              <p className="font-bold">דירוג המטריצה A:</p>
              <p>
                נבצע פעולות שורה אלמנטריות. נתחיל עם:
              </p>
              <div className="font-mono text-sm bg-white border border-emerald-300 rounded p-2 my-2 text-center">
                [1/3, 0, 0 | 1, 0, 0, 0]<br/>
                [-1, 0, 1 | 0, 1, 0, 0]<br/>
                [2, 1, -2 | 0, 0, 1, 0]<br/>
                [0, 0, 2 | 0, 0, 0, 1]
              </div>

              <p><strong>שלב 1:</strong> <M>R₁ ← 3R₁</M> (כדי להפוך את הכניסה המובילה ל-1 → למעשה ל-1 נכפול ב-3):</p>
              <div className="font-mono text-sm bg-white border border-emerald-300 rounded p-2 my-2 text-center">
                [1, 0, 0 | 3, 0, 0, 0]<br/>
                [-1, 0, 1 | 0, 1, 0, 0]<br/>
                [2, 1, -2 | 0, 0, 1, 0]<br/>
                [0, 0, 2 | 0, 0, 0, 1]
              </div>

              <p><strong>שלב 2:</strong> <M>R₂ ← R₂ + R₁</M>, <M>R₃ ← R₃ - 2R₁</M>:</p>
              <div className="font-mono text-sm bg-white border border-emerald-300 rounded p-2 my-2 text-center">
                [1, 0, 0 | 3, 0, 0, 0]<br/>
                [0, 0, 1 | 3, 1, 0, 0]<br/>
                [0, 1, -2 | -6, 0, 1, 0]<br/>
                [0, 0, 2 | 0, 0, 0, 1]
              </div>

              <p><strong>שלב 3:</strong> <M>R₂ ↔ R₃</M> (החלפת שורות):</p>
              <div className="font-mono text-sm bg-white border border-emerald-300 rounded p-2 my-2 text-center">
                [1, 0, 0 | 3, 0, 0, 0]<br/>
                [0, 1, -2 | -6, 0, 1, 0]<br/>
                [0, 0, 1 | 3, 1, 0, 0]<br/>
                [0, 0, 2 | 0, 0, 0, 1]
              </div>

              <p><strong>שלב 4:</strong> <M>R₄ ← R₄ - 2R₃</M>:</p>
              <div className="font-mono text-sm bg-white border border-emerald-300 rounded p-2 my-2 text-center">
                [1, 0, 0 | 3, 0, 0, 0]<br/>
                [0, 1, -2 | -6, 0, 1, 0]<br/>
                [0, 0, 1 | 3, 1, 0, 0]<br/>
                [0, 0, 0 | -6, -2, 0, 1]
              </div>

              <p><strong>שלב 5:</strong> <M>R₂ ← R₂ + 2R₃</M> (לאפס את הכניסה -2 בשורה 2):</p>
              <div className="font-mono text-sm bg-white border border-emerald-300 rounded p-2 my-2 text-center">
                [1, 0, 0 | 3, 0, 0, 0]<br/>
                [0, 1, 0 | 0, 2, 1, 0]<br/>
                [0, 0, 1 | 3, 1, 0, 0]<br/>
                [0, 0, 0 | -6, -2, 0, 1]
              </div>

              <p className="font-bold mt-2">תוצאות:</p>
              <div className="font-mono text-sm bg-white border border-emerald-300 rounded p-2 my-2 text-center">
                C = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 0, 0]]
              </div>
              <div className="font-mono text-sm bg-white border border-emerald-300 rounded p-2 my-2 text-center">
                P = [[3, 0, 0, 0], [0, 2, 1, 0], [3, 1, 0, 0], [-6, -2, 0, 1]]
              </div>

              <p><strong>אימות:</strong> <M>PA = C</M>. ∎</p>

              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות 1-8 — דירוג</p>
            </Solution>
            <Tip>
              רשמו את <M>[A | I₄]</M> ודרגו. הצד השמאלי נהיה <M>C</M> והצד הימני נהיה <M>P</M>. <strong>חשוב לוודא</strong> בסוף ש-<M>PA = C</M>.
            </Tip>
          </SubQ>

          {/* 4b */}
          <SubQ label="סעיף ב&apos;" pts={10}>
            <Problem>
              <p>
                <M>V = U + W</M> (כאשר <M>U, W</M> תת-מרחבים של <M>V</M>). יהיו <M>v₁, v₂ ∈ V</M>.
              </p>
              <p>
                <M>S₁ = &#123;v₁ + u : u ∈ U&#125;</M>, &nbsp; <M>S₂ = &#123;v₂ + w : w ∈ W&#125;</M>.
              </p>
              <p>
                הוכיחו: <M>S₁ ∩ S₂ ≠ ∅</M>.
              </p>
            </Problem>
            <Solution>
              <p>
                מכיוון ש-<M>v₁, v₂ ∈ V = U + W</M>, מתקיים <M>v₂ - v₁ ∈ V = U + W</M>.
              </p>
              <p>
                לכן קיימים <M>u₀ ∈ U</M> ו-<M>w₀ ∈ W</M> כך ש-<M>v₂ - v₁ = u₀ + w₀</M>.
              </p>
              <p>
                נגדיר <M>v = v₁ + u₀</M>. נראה ש-<M>v ∈ S₁ ∩ S₂</M>:
              </p>
              <p>
                <strong><M>v ∈ S₁</M>:</strong> <M>v = v₁ + u₀</M> עם <M>u₀ ∈ U</M>, לכן <M>v ∈ S₁</M> לפי ההגדרה.
              </p>
              <p>
                <strong><M>v ∈ S₂</M>:</strong> מ-<M>v₂ - v₁ = u₀ + w₀</M> נובע <M>v₁ + u₀ = v₂ - w₀</M>. לכן:
              </p>
              <p>
                <M>v = v₂ - w₀ = v₂ + (-w₀)</M>
              </p>
              <p>
                מכיוון ש-<M>W</M> תת-מרחב, <M>-w₀ ∈ W</M>. לכן <M>v = v₂ + (-w₀) ∈ S₂</M>.
              </p>
              <p>
                מצאנו <M>v ∈ S₁ ∩ S₂</M>, לכן <M>S₁ ∩ S₂ ≠ ∅</M>. ∎
              </p>

              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הגדרת סכום תת-מרחבים</p>
            </Solution>
            <Tip>
              הרעיון: לפרק את <M>v₂ - v₁</M> כסכום <M>u₀ + w₀</M> (אפשר כי <M>V = U + W</M>), ואז <M>v₁ + u₀ = v₂ - w₀</M> שייך לשתי הקבוצות.
            </Tip>
          </SubQ>
        </QuestionBox>

        {/* ==================== QUESTION 5 ==================== */}
        <QuestionBox num={5} pts={25} topic="סכום ישר + פולינומים">

          {/* 5a */}
          <SubQ label="סעיף א&apos;" pts={15}>

            {/* 5a-i */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">i</span>
                <span className="text-gray-500 text-xs">(8 נק&apos;)</span>
              </div>
              <Problem>
                <p>
                  <M>Y = U + W</M>. הוכיחו: <M>Y = U ⊕ W</M> אם ורק אם <M>dim(Y) = dim(U) + dim(W)</M>.
                </p>
              </Problem>
              <Solution>
                <p>
                  נשתמש בנוסחת הממדים: <M>dim(U + W) = dim(U) + dim(W) - dim(U ∩ W)</M>.
                </p>
                <p>
                  מכיוון ש-<M>Y = U + W</M>:
                </p>
                <p>
                  <M>dim(Y) = dim(U) + dim(W) - dim(U ∩ W)</M>
                </p>
                <p className="font-bold mt-2">כיוון ⇒:</p>
                <p>
                  נניח <M>Y = U ⊕ W</M>. אז בהגדרה <M>U ∩ W = &#123;0⃗&#125;</M>, לכן <M>dim(U ∩ W) = 0</M>.
                </p>
                <p>
                  מנוסחת הממדים: <M>dim(Y) = dim(U) + dim(W) - 0 = dim(U) + dim(W)</M>.
                </p>
                <p className="font-bold mt-2">כיוון ⇐:</p>
                <p>
                  נניח <M>dim(Y) = dim(U) + dim(W)</M>.
                </p>
                <p>
                  מנוסחת הממדים: <M>dim(U) + dim(W) = dim(U) + dim(W) - dim(U ∩ W)</M>.
                </p>
                <p>
                  לכן <M>dim(U ∩ W) = 0</M>, כלומר <M>U ∩ W = &#123;0⃗&#125;</M>.
                </p>
                <p>
                  מכיוון ש-<M>Y = U + W</M> ו-<M>U ∩ W = &#123;0⃗&#125;</M>, הסכום ישר: <M>Y = U ⊕ W</M>. ∎
                </p>

                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 15 — נוסחת הממדים + סכום ישר</p>
              </Solution>
            </div>

            {/* 5a-ii */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">ii</span>
                <span className="text-gray-500 text-xs">(7 נק&apos;)</span>
              </div>
              <Problem>
                <p>
                  האם נכון: <M>V = U ⊕ W</M> אם ורק אם <M>dim(V) = dim(U) + dim(W)</M>? (ללא ההנחה <M>V = U + W</M>)
                </p>
              </Problem>
              <Solution>
                <p className="font-bold text-red-600">לא נכון! נפריך בדוגמה נגדית:</p>
                <p>
                  ניקח <M>V = ℝ³</M>, <M>U = Span&#123;(1,0,0), (0,1,0)&#125;</M>, <M>W = Span&#123;(1,0,0)&#125;</M>.
                </p>
                <p>
                  <M>dim(V) = 3</M>, <M>dim(U) = 2</M>, <M>dim(W) = 1</M>.
                </p>
                <p>
                  אכן <M>dim(V) = 3 = 2 + 1 = dim(U) + dim(W)</M>.
                </p>
                <p>
                  אבל <M>V ≠ U ⊕ W</M>, כי:
                </p>
                <p>
                  1. <M>V ≠ U + W</M>: הוקטור <M>(0, 0, 1) ∈ V</M> אבל <M>(0, 0, 1) ∉ U + W</M>
                  (כי כל וקטור ב-<M>U + W</M> הוא מהצורה <M>(a, b, 0) + (c, 0, 0) = (a+c, b, 0)</M>, שהרכיב השלישי שלו תמיד 0).
                </p>
                <p>
                  2. גם <M>U ∩ W = Span&#123;(1,0,0)&#125; ≠ &#123;0⃗&#125;</M>.
                </p>
                <p>
                  לכן שוויון ממדים לבד <strong>לא מספיק</strong> — חייבים גם ש-<M>V = U + W</M>. ∎
                </p>

                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: דוגמה נגדית</p>
              </Solution>
              <Tip>
                ההבדל מסעיף (i): שם <strong>נתון</strong> ש-<M>Y = U + W</M>. כאן לא נתון, ולכן שוויון ממדים לא מספיק. הדוגמה הנגדית: תת-מרחבים שלא &quot;מכסים&quot; את כל <M>V</M>.
              </Tip>
            </div>
          </SubQ>

          {/* 5b */}
          <SubQ label="סעיף ב&apos;" pts={10}>

            {/* 5b-i */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">i</span>
                <span className="text-gray-500 text-xs">(4 נק&apos;)</span>
              </div>
              <Problem>
                <p>
                  <M>α₁, α₂ ∈ F</M>. <M>W = &#123;p ∈ F[x] : p(α₁) = 0 וגם p(α₂) = 0&#125;</M>. הוכיחו ש-<M>W</M> תת-מרחב של <M>F[x]</M>.
                </p>
              </Problem>
              <Solution>
                <p>
                  נבדוק את שלושת התנאים לתת-מרחב:
                </p>
                <p>
                  <strong>1. לא ריק:</strong> פולינום האפס <M>p(x) = 0</M> מקיים <M>p(α₁) = 0</M> ו-<M>p(α₂) = 0</M>, לכן <M>0 ∈ W</M>.
                </p>
                <p>
                  <strong>2. סגירות לחיבור:</strong> יהיו <M>p, q ∈ W</M>. אז <M>p(α₁) = 0</M>, <M>q(α₁) = 0</M> ולכן <M>(p + q)(α₁) = p(α₁) + q(α₁) = 0 + 0 = 0</M>. באופן דומה <M>(p + q)(α₂) = 0</M>. לכן <M>p + q ∈ W</M>.
                </p>
                <p>
                  <strong>3. סגירות לכפל בסקלר:</strong> יהי <M>p ∈ W</M> ו-<M>c ∈ F</M>. אז <M>(cp)(α₁) = c · p(α₁) = c · 0 = 0</M>. באופן דומה <M>(cp)(α₂) = 0</M>. לכן <M>cp ∈ W</M>.
                </p>
                <p>
                  לכן <M>W</M> תת-מרחב של <M>F[x]</M>. ∎
                </p>

                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: תכונות תת-מרחבים</p>
              </Solution>
            </div>

            {/* 5b-ii */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">ii</span>
                <span className="text-gray-500 text-xs">(6 נק&apos;)</span>
              </div>
              <Problem>
                <p>
                  הוכיחו ש-<M>W</M> <strong>אינו</strong> נוצר סופית.
                </p>
              </Problem>
              <Solution>
                <p>
                  <strong>הוכחה בשלילה:</strong> נניח בשלילה ש-<M>W</M> נוצר סופית, כלומר קיימים פולינומים <M>p₁, ..., pₙ ∈ W</M> כך ש-<M>W = Span&#123;p₁, ..., pₙ&#125;</M>.
                </p>
                <p>
                  נסמן <M>d = max&#123;deg(p₁), ..., deg(pₙ)&#125;</M>.
                </p>
                <p>
                  כל צירוף לינארי של <M>p₁, ..., pₙ</M> הוא פולינום מדרגה לכל היותר <M>d</M>. לכן:
                </p>
                <p>
                  <M>W = Span&#123;p₁, ..., pₙ&#125; ⊆ F_d[x]</M>
                </p>
                <p>
                  (כאשר <M>F_d[x]</M> הוא מרחב הפולינומים מדרגה ≤ <M>d</M>).
                </p>
                <p>
                  מצד שני, הפולינום <M>q(x) = (x - α₁)(x - α₂)</M> שייך ל-<M>W</M> (כי <M>q(α₁) = 0</M> ו-<M>q(α₂) = 0</M>).
                </p>
                <p>
                  ניקח את הפולינום <M>p(x) = x^d · q(x) = x^d · (x - α₁)(x - α₂)</M>.
                </p>
                <p>
                  <M>p ∈ W</M> כי <M>p(α₁) = α₁^d · 0 = 0</M> ו-<M>p(α₂) = α₂^d · 0 = 0</M>.
                </p>
                <p>
                  אבל <M>deg(p) = d + 2 &gt; d</M>, לכן <M>p ∉ F_d[x]</M>.
                </p>
                <p>
                  סתירה! כי <M>p ∈ W ⊆ F_d[x]</M> אבל <M>p ∉ F_d[x]</M>.
                </p>
                <p>
                  לכן ההנחה שגויה, ו-<M>W</M> אינו נוצר סופית. ∎
                </p>

                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 10 — F[x] אינו נוצר סופית + ארגומנט דרגה</p>
              </Solution>
              <Tip>
                ארגומנט הדרגה: קבוצה פורשת סופית תמיד &quot;כלואה&quot; בדרגה מקסימלית. אבל <M>W</M> מכיל פולינומים מכל דרגה (כפל <M>(x - α₁)(x - α₂)</M> ב-<M>xⁿ</M> לכל <M>n</M>), לכן אינו נוצר סופית.
              </Tip>
            </div>
          </SubQ>
        </QuestionBox>

        {/* Summary / Key Takeaways */}
        <Section title="נקודות מפתח למבחן" icon={<Star className="w-5 h-5" />} color="text-orange-600">
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>שאלה 1:</strong> אפיון ת&quot;ל — הוכחה סטנדרטית מההרצאות + טריק קומבינטורי לתת-שדות סופיים</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>שאלה 2:</strong> נוסחת הממדים — חובה לשנן את ההוכחה המלאה + <M>yᵗy = 0 ⟹ y = 0</M> ב-ℝⁿ</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>שאלה 3:</strong> אלגברה מטריצתית — <M>AC = I ⟹ A</M> הפיכה + הצבה חוזרת עם <M>B³ = 0</M></span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>שאלה 4:</strong> דירוג מטריצה עם <M>[A|I]</M> — זהירות בחישובים + חיתוך קבוצות מוזזות</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>שאלה 5:</strong> סכום ישר ⇔ dim <strong>רק כאשר נתון</strong> <M>Y = U + W</M> + F[x] אינו נוצר סופית</span>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
