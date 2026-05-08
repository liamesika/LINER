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

export default function Exam2023APage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          מועד א&apos; 2023 — ניתוח + פתרונות
        </h1>
        <p className="text-gray-600">Linear Algebra 1, Moed A 2023 — Reichman University</p>
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
            { q: 'שאלה 1', topics: 'תכונות Span — הוכחות', diff: 'בינוני' },
            { q: 'שאלה 2', topics: 'מערכת עם פרמטר + dim(Im)', diff: 'בינוני' },
            { q: 'שאלה 3', topics: 'ה"ל חח"ע + AB=BA', diff: 'בינוני-קשה' },
            { q: 'שאלה 4', topics: 'ת"ל מרוכבת + ממדי חיתוך', diff: 'בינוני' },
            { q: 'שאלה 5', topics: 'שרשרת Wₖ + Im(T)=W', diff: 'קשה' },
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
          <strong>המלצה:</strong> התחל משאלות 1, 4, 2, 3. שאלה 5 (שרשרת Wₖ) מסובכת — דלג עליה אלא אם נשאר זמן.
        </Tip>
      </Section>

      {/* ==================== */}
      {/* QUESTION 1 */}
      {/* ==================== */}
      <QuestionBox num={1} pts={25} topic="תכונות Span">
        <SubQ label="א" pts={13}>
          <Problem>
            <p>יהי V מ&quot;ו מעל שדה F, ויהיו <M>v₁,...,vₖ, v ∈ V</M>.</p>
            <p>הוכח: <M>v ∈ Span(v₁,...,vₖ)</M> אם ורק אם <M>Span(v₁,...,vₖ) = Span(v₁,...,vₖ,v)</M>.</p>
          </Problem>
          <Solution>
            <p><strong>כיוון ⟹:</strong> נניח <M>v ∈ Span(v₁,...,vₖ)</M>.</p>
            <p>צריך להוכיח <M>Span(v₁,...,vₖ) = Span(v₁,...,vₖ,v)</M>.</p>
            <p className="mt-1"><strong>הכלה ⊆:</strong> ברור ש-<M>Span(v₁,...,vₖ) ⊆ Span(v₁,...,vₖ,v)</M> (הוספנו עוד וקטור ליוצרים).</p>
            <p className="mt-1"><strong>הכלה ⊇:</strong> יהי <M>u ∈ Span(v₁,...,vₖ,v)</M>.</p>
            <p>אז <M>u = α₁v₁+...+αₖvₖ+αv</M>.</p>
            <p>כי <M>v ∈ Span(v₁,...,vₖ)</M>: קיימים <M>β₁,...,βₖ</M> כך ש-<M>v = β₁v₁+...+βₖvₖ</M>.</p>
            <p>נציב: <M>u = α₁v₁+...+αₖvₖ + α(β₁v₁+...+βₖvₖ) = (α₁+αβ₁)v₁+...+(αₖ+αβₖ)vₖ</M>.</p>
            <p>לכן <M>u ∈ Span(v₁,...,vₖ)</M>. ✓</p>
            <p className="mt-2"><strong>כיוון ⟸:</strong> נניח <M>Span(v₁,...,vₖ) = Span(v₁,...,vₖ,v)</M>.</p>
            <p><M>v = 0·v₁+...+0·vₖ+1·v ∈ Span(v₁,...,vₖ,v) = Span(v₁,...,vₖ)</M>.</p>
            <p>לכן <M>v ∈ Span(v₁,...,vₖ)</M>. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 10 — טענה (*) על Span</p>
          </Solution>
          <Tip>זו טענה (*) מהרצאה 10 — הוכחה קלאסית שחוזרת במבחנים. לשנן!</Tip>
        </SubQ>

        <SubQ label="ב" pts={12}>
          <Problem>
            <p>יהיו <M>u₁, u₂, u₃, w ∈ V</M>. נתון: <M>w ∈ Span(u₁,u₂,u₃)</M> וגם <M>w ∉ Span(u₂,u₃)</M>.</p>
            <p>הוכח: <M>Span(u₂,u₃,w) = Span(u₁,u₂,u₃)</M>.</p>
          </Problem>
          <Solution>
            <p><strong>שלב 1:</strong> כי <M>w ∈ Span(u₁,u₂,u₃)</M>, קיימים <M>α₁, α₂, α₃ ∈ F</M> כך ש:</p>
            <p className="font-mono text-center">w = α₁u₁ + α₂u₂ + α₃u₃</p>
            <p className="mt-2"><strong>שלב 2: נוכיח <M>α₁ ≠ 0</M>.</strong></p>
            <p>נניח בשלילה <M>α₁ = 0</M>. אז <M>w = α₂u₂ + α₃u₃ ∈ Span(u₂,u₃)</M>.</p>
            <p>סתירה לנתון ש-<M>w ∉ Span(u₂,u₃)</M>. לכן <M>α₁ ≠ 0</M>.</p>
            <p className="mt-2"><strong>שלב 3: נבטא את <M>u₁</M> באמצעות <M>u₂, u₃, w</M>.</strong></p>
            <p>מ-<M>w = α₁u₁ + α₂u₂ + α₃u₃</M> ומ-<M>α₁ ≠ 0</M>:</p>
            <p className="font-mono text-center">u₁ = α₁⁻¹w - α₁⁻¹α₂u₂ - α₁⁻¹α₃u₃</p>
            <p>לכן <M>u₁ ∈ Span(u₂,u₃,w)</M>.</p>
            <p className="mt-2"><strong>שלב 4:</strong> מסעיף (א): <M>u₁ ∈ Span(u₂,u₃,w)</M> ⟹ <M>Span(u₂,u₃,w) = Span(u₁,u₂,u₃,w)</M>.</p>
            <p>וגם <M>w ∈ Span(u₁,u₂,u₃)</M> ⟹ <M>Span(u₁,u₂,u₃) = Span(u₁,u₂,u₃,w)</M>.</p>
            <p>לכן: <M>Span(u₂,u₃,w) = Span(u₁,u₂,u₃,w) = Span(u₁,u₂,u₃)</M>. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 10 — שימוש בטענה (*) + טכניקת החלפה</p>
          </Solution>
          <Tip>
            <strong>תבנית חשובה:</strong> כשרוצים להחליף וקטור ב-Span — מבטאים אותו דרך השאר (ומראים שהמקדם ≠ 0). אז משתמשים בטענה (*) פעמיים.
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 2 */}
      {/* ==================== */}
      <QuestionBox num={2} pts={25} topic="מערכת עם פרמטר + dim(Im)">
        <SubQ label="א" pts={16}>
          <Problem>
            <p>יהי k ∈ ℝ. פתור את המערכת:</p>
            <div className="font-mono text-center my-2 space-y-1">
              <p>-x - 2y + z = 0</p>
              <p>2x + 5y + kz = 1</p>
              <p>7x + (9-k)y - 5z = -1</p>
            </div>
            <p>עבור אילו ערכי k יש פתרון יחיד? אין פתרון? אינסוף פתרונות?</p>
          </Problem>
          <Solution>
            <p><strong>דירוג המטריצה המורחבת:</strong></p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[-1 -2 &ensp;1 | 0]&emsp; R₁→(-1)R₁&emsp; [1 &ensp;2 -1 | 0]</p>
              <p>[ 2 &ensp;5 &ensp;k | 1]&emsp; R₂→R₂-2R₁&emsp; [0 &ensp;1 k+2| 1]</p>
              <p>[ 7 9-k -5 |-1]&emsp; R₃→R₃-7R₁&emsp; [0 -5-k &ensp;2 |-1]</p>
            </div>
            <p className="mt-2">R₃ → R₃ + (5+k)R₂:</p>
            <div className="font-mono text-xs bg-white p-2 rounded border border-gray-200 space-y-1">
              <p>[1 2 &ensp;-1&ensp;&ensp;&ensp; | 0]</p>
              <p>[0 1 &ensp;k+2&ensp;&ensp; | 1]</p>
              <p>[0 0 (k+2)(k+5)+2 | k+4]</p>
            </div>
            <p className="mt-1">נפתח: <M>(k+2)(k+5)+2 = k²+7k+10+2 = k²+7k+12 = (k+3)(k+4)</M>.</p>
            <div className="font-mono text-xs bg-white p-2 rounded border border-gray-200 space-y-1">
              <p>[1 2 -1&ensp;&ensp;&ensp;&ensp;&ensp; | 0]</p>
              <p>[0 1 k+2&ensp;&ensp;&ensp;&ensp; | 1]</p>
              <p>[0 0 (k+3)(k+4) | k+4]</p>
            </div>

            <p className="mt-3"><strong>מקרה k ∉ {'{-3, -4}'}:</strong></p>
            <p><M>(k+3)(k+4) ≠ 0</M>. שלוש שורות מובילות, 3 משתנים — <strong>פתרון יחיד</strong>.</p>
            <p>מR₃: <M>z = (k+4)/((k+3)(k+4)) = 1/(k+3)</M>.</p>
            <p>מR₂: <M>y = 1 - (k+2)z = 1 - (k+2)/(k+3) = 1/(k+3)</M>.</p>
            <p>מR₁: <M>x = -2y + z = -2/(k+3) + 1/(k+3) = -1/(k+3)</M>.</p>
            <p><strong>פתרון יחיד:</strong> <M>(-1/(k+3), 1/(k+3), 1/(k+3))</M>.</p>

            <p className="mt-3"><strong>מקרה k = -3:</strong></p>
            <p>שורה 3 הופכת ל-<M>[0 0 0 | 1]</M> — <strong>שורת סתירה. אין פתרון.</strong></p>

            <p className="mt-3"><strong>מקרה k = -4:</strong></p>
            <p>שורה 3 הופכת ל-<M>[0 0 0 | 0]</M>. z משתנה חופשי, z = t.</p>
            <p>מR₂: <M>y = 1 - (-4+2)t = 1 + 2t</M>.</p>
            <p>מR₁: <M>x = -2y + z = -2(1+2t) + t = -2 - 4t + t = -2 - 3t</M>.</p>
            <p><strong>אינסוף פתרונות:</strong> <M>(-2-3t, 1+2t, t)</M>, t ∈ ℝ.</p>

            <div className="mt-3 bg-blue-50 border border-blue-200 rounded p-3">
              <p className="font-bold text-blue-800 text-xs mb-1">סיכום:</p>
              <p className="text-blue-700">k = -3: <strong>אין פתרון</strong></p>
              <p className="text-blue-700">k = -4: <strong>אינסוף</strong> — (-2-3t, 1+2t, t)</p>
              <p className="text-blue-700">k ∉ {'{-3, -4}'}: <strong>יחיד</strong> — (-1/(k+3), 1/(k+3), 1/(k+3))</p>
            </div>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות 1-8 — דירוג מטריצות</p>
          </Solution>
          <Tip>
            <strong>שלבי העבודה:</strong> דרג → מצא ערכים בעייתיים (מאפסים את המקדם המוביל בשורה האחרונה) → בדוק כל מקרה בנפרד.
          </Tip>
        </SubQ>

        <SubQ label="ב" pts={9}>
          <Problem>
            <p>V, W, U מ&quot;ו מעל F. <M>T: V → W</M> ו-<M>S: W → U</M> ה&quot;ל.</p>
            <p>נתון: <M>S(T(v)) = 0_U</M> לכל <M>v ∈ V</M>.</p>
            <p>הוכח: <M>dim(Im T) + dim(Im S) ≤ dim(W)</M>.</p>
          </Problem>
          <Solution>
            <p><strong>שלב 1: נוכיח <M>Im(T) ⊆ Ker(S)</M>.</strong></p>
            <p>יהי <M>w ∈ Im(T)</M>. אז קיים <M>v ∈ V</M> כך ש-<M>w = T(v)</M>.</p>
            <p><M>S(w) = S(T(v)) = 0_U</M> (מהנתון). לכן <M>w ∈ Ker(S)</M>.</p>
            <p>קיבלנו: <M>Im(T) ⊆ Ker(S)</M>.</p>
            <p className="mt-2"><strong>שלב 2:</strong> מההכלה: <M>dim(Im T) ≤ dim(Ker S)</M>.</p>
            <p className="mt-2"><strong>שלב 3:</strong> ממשפט הממד (rank-nullity) עבור S:</p>
            <p className="font-mono text-center">dim(W) = dim(Ker S) + dim(Im S)</p>
            <p className="mt-2"><strong>שלב 4:</strong> לכן:</p>
            <p className="font-mono text-center">dim(Im T) + dim(Im S) ≤ dim(Ker S) + dim(Im S) = dim(W)</p>
            <p>✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה על משפט הממד (rank-nullity)</p>
          </Solution>
          <Tip>
            <strong>תבנית חוזרת:</strong> כשנותנים <M>S ∘ T = 0</M>, תמיד המסקנה הראשונה היא <M>Im(T) ⊆ Ker(S)</M>. משם ממשיכים עם rank-nullity.
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 3 */}
      {/* ==================== */}
      <QuestionBox num={3} pts={25} topic="העתקות לינאריות + אלגברה מטריצתית">
        <SubQ label="א-i" pts={8}>
          <Problem>
            <p><M>T: V → W</M> ה&quot;ל חח&quot;ע. <M>T(v₁),...,T(vₖ)</M> פורשים את W.</p>
            <p>הוכח: <M>v₁,...,vₖ</M> פורשים את V.</p>
          </Problem>
          <Solution>
            <p>יהי <M>v ∈ V</M>. צריך להוכיח <M>v ∈ Span(v₁,...,vₖ)</M>.</p>
            <p className="mt-1"><M>T(v) ∈ W = Span(T(v₁),...,T(vₖ))</M>.</p>
            <p>לכן קיימים <M>α₁,...,αₖ ∈ F</M> כך ש:</p>
            <p className="font-mono text-center">T(v) = α₁T(v₁) + ... + αₖT(vₖ)</p>
            <p className="mt-1">מלינאריות T:</p>
            <p className="font-mono text-center">T(v) = T(α₁v₁ + ... + αₖvₖ)</p>
            <p className="mt-1">T חח&quot;ע ⟹ v = α₁v₁ + ... + αₖvₖ.</p>
            <p>לכן <M>v ∈ Span(v₁,...,vₖ)</M>. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה על ה&quot;ל — חח&quot;ע ו-Span</p>
          </Solution>
        </SubQ>

        <SubQ label="א-ii" pts={9}>
          <Problem>
            <p>בהנחות מסעיף א-i, נניח בנוסף ש-<M>v₁,...,vₖ</M> בת&quot;ל.</p>
            <p>הוכח: <M>T(v₁),...,T(vₖ)</M> בת&quot;ל.</p>
          </Problem>
          <Solution>
            <p>נניח:</p>
            <p className="font-mono text-center">α₁T(v₁) + ... + αₖT(vₖ) = 0_W</p>
            <p className="mt-1">מלינאריות T:</p>
            <p className="font-mono text-center">T(α₁v₁ + ... + αₖvₖ) = 0_W = T(0_V)</p>
            <p className="mt-1">T חח&quot;ע ⟹ <M>α₁v₁ + ... + αₖvₖ = 0_V</M>.</p>
            <p className="mt-1">כי <M>v₁,...,vₖ</M> בת&quot;ל: <M>α₁ = ... = αₖ = 0</M>.</p>
            <p>לכן <M>T(v₁),...,T(vₖ)</M> בת&quot;ל. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה על ה&quot;ל — T חח&quot;ע שומרת בת&quot;ל</p>
          </Solution>
          <Tip>
            <strong>כלל זהב:</strong> T חח&quot;ע שומרת בת&quot;ל. ההוכחה תמיד: הנח צ&quot;ל = 0_W → העבר פנימה ל-T → השתמש בחח&quot;ע → השתמש בבת&quot;ל המקורית.
          </Tip>
        </SubQ>

        <SubQ label="ב" pts={8}>
          <Problem>
            <p><M>A ∈ Mₙ(F)</M>. נתון: <M>A = Iₙ - AB</M>.</p>
            <p>הוכח: <M>AB = BA</M>.</p>
          </Problem>
          <Solution>
            <p><strong>שלב 1: נוכיח ש-A הפיכה.</strong></p>
            <p>מ-<M>A = Iₙ - AB</M> נקבל:</p>
            <p className="font-mono text-center">A + AB = Iₙ</p>
            <p className="font-mono text-center">A(Iₙ + B) = Iₙ</p>
            <p>לכן A הפיכה ו-<M>A⁻¹ = Iₙ + B</M>.</p>
            <p className="mt-2"><strong>שלב 2:</strong> כי <M>A(Iₙ + B) = Iₙ</M> ו-A ריבועית, גם:</p>
            <p className="font-mono text-center">(Iₙ + B)A = Iₙ</p>
            <p>כלומר: <M>A + BA = Iₙ</M>.</p>
            <p className="mt-2"><strong>שלב 3:</strong> מהנתון: <M>A = Iₙ - AB</M> ⟹ <M>AB = Iₙ - A</M>.</p>
            <p>משלב 2: <M>A + BA = Iₙ</M> ⟹ <M>BA = Iₙ - A</M>.</p>
            <p className="mt-1">לכן: <M>AB = Iₙ - A = BA</M>. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות על מטריצות הפיכות — שימוש ב-AC=I ⟹ CA=I</p>
          </Solution>
          <Tip>
            <strong>הטריק המרכזי:</strong> אם <M>AC = I</M> כאשר A ריבועית, אז גם <M>CA = I</M>. זה מאפשר &quot;להפוך את סדר הכפל&quot;.
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 4 */}
      {/* ==================== */}
      <QuestionBox num={4} pts={25} topic="ת&quot;ל מרוכבת + ממדי חיתוך">
        <SubQ label="א" pts={9}>
          <Problem>
            <p>מצא <M>α ∈ ℂ</M> כך שהוקטורים:</p>
            <p className="font-mono text-center my-1">v₁ = (-3-5i, 3+i, 3-i)</p>
            <p className="font-mono text-center my-1">v₂ = (1-4i, α, 2+i)</p>
            <p>תלויים לינארית ב-<M>ℂ³</M>.</p>
          </Problem>
          <Solution>
            <p><M>v₁, v₂</M> ת&quot;ל ⟺ קיים <M>β ∈ ℂ</M> כך ש-<M>v₂ = β·v₁</M>.</p>
            <p className="mt-2"><strong>מהרכיב השלישי:</strong></p>
            <p className="font-mono text-center">2+i = β(3-i)</p>
            <p className="font-mono text-center">β = (2+i)/(3-i)</p>
            <p className="mt-1">נכפול בצמוד:</p>
            <p className="font-mono text-center">β = (2+i)(3+i) / ((3-i)(3+i)) = (6+2i+3i+i²) / (9+1) = (5+5i)/10 = ½(1+i)</p>
            <p className="mt-2"><strong>בדיקה עם הרכיב הראשון:</strong></p>
            <p className="font-mono text-center">½(1+i)(-3-5i) = ½(-3-5i-3i-5i²) = ½(-3-8i+5) = ½(2-8i) = 1-4i ✓</p>
            <p className="mt-2"><strong>חישוב α מהרכיב השני:</strong></p>
            <p className="font-mono text-center">α = β(3+i) = ½(1+i)(3+i) = ½(3+i+3i+i²) = ½(2+4i) = 1+2i</p>
            <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2">
              <p className="font-bold text-blue-800 text-sm">α = 1+2i</p>
            </div>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 11 — ת&quot;ל ב-ℂⁿ, מציאת סקלר</p>
          </Solution>
          <Tip>
            <strong>טכניקה:</strong> שני וקטורים ת&quot;ל ⟺ אחד הוא כפולה סקלרית של השני. מוצאים את הסקלר מרכיב אחד, בודקים עם השאר.
          </Tip>
        </SubQ>

        <SubQ label="ב-i" pts={6}>
          <Problem>
            <p>U, W תתי-מרחבים של V. נתון <M>U ⊄ W</M>.</p>
            <p>הוכח: <M>dim(U ∩ W) &lt; dim(U)</M>.</p>
          </Problem>
          <Solution>
            <p><M>U ∩ W ⊆ U</M> (חיתוך של U עם משהו תמיד מוכל ב-U).</p>
            <p>לכן <M>dim(U ∩ W) ≤ dim(U)</M>.</p>
            <p className="mt-2">נניח בשלילה <M>dim(U ∩ W) = dim(U)</M>.</p>
            <p>כי <M>U ∩ W ⊆ U</M> ושניהם בעלי אותו ממד, נקבל <M>U ∩ W = U</M>.</p>
            <p>(תת-מרחב עם אותו ממד כמו המרחב שמכיל אותו — שווה לו.)</p>
            <p>אבל <M>U ∩ W = U</M> ⟹ <M>U ⊆ W</M>. <strong>סתירה</strong> לנתון <M>U ⊄ W</M>.</p>
            <p>לכן <M>dim(U ∩ W) &lt; dim(U)</M>. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 14 — dim W = dim V ⟹ W = V</p>
          </Solution>
        </SubQ>

        <SubQ label="ב-ii" pts={10}>
          <Problem>
            <p>בהנחות מסעיף ב-i, נתון בנוסף: <M>dim(U+W) = dim(U ∩ W) + 1</M>.</p>
            <p>הוכח: <M>dim(W) ≤ dim(U)</M>.</p>
          </Problem>
          <Solution>
            <p><strong>נוסחת הממדים:</strong></p>
            <p className="font-mono text-center">dim(U+W) = dim(U) + dim(W) - dim(U ∩ W)</p>
            <p className="mt-1">מהנתון: <M>dim(U+W) = dim(U ∩ W) + 1</M>. נציב:</p>
            <p className="font-mono text-center">dim(U ∩ W) + 1 = dim(U) + dim(W) - dim(U ∩ W)</p>
            <p className="font-mono text-center">dim(U) + dim(W) = 2·dim(U ∩ W) + 1</p>
            <p className="mt-2">מסעיף ב-i: <M>dim(U ∩ W) &lt; dim(U)</M>, כלומר <M>dim(U ∩ W) ≤ dim(U) - 1</M>.</p>
            <p>לכן:</p>
            <p className="font-mono text-center">dim(U) + dim(W) = 2·dim(U ∩ W) + 1 ≤ 2(dim(U) - 1) + 1 = 2·dim(U) - 1</p>
            <p className="mt-1">⟹ <M>dim(W) ≤ 2·dim(U) - 1 - dim(U) = dim(U) - 1 &lt; dim(U)</M>.</p>
            <p>בפרט: <M>dim(W) ≤ dim(U)</M>. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 15 — נוסחת הממדים</p>
          </Solution>
          <Tip>
            <strong>תבנית:</strong> נוסחת הממדים + אי-שוויון ממד מסעיף קודם = שילוב קלאסי. תמיד תחפש איך לקשר בין הסעיפים!
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 5 */}
      {/* ==================== */}
      <QuestionBox num={5} pts={25} topic="שרשרת Wₖ + Im(T)=W">
        <SubQ label="א-i" pts={7}>
          <Problem>
            <p><M>B ∈ Mₙ(F)</M>. מגדירים <M>Wₖ = {'{'}Bᵏ · X : X ∈ Mₙ(F){'}'}</M>.</p>
            <p>הוכח: <M>Wₖ₊₁ ⊆ Wₖ</M>.</p>
          </Problem>
          <Solution>
            <p>יהי <M>A ∈ Wₖ₊₁</M>. אז קיימת <M>X ∈ Mₙ(F)</M> כך ש:</p>
            <p className="font-mono text-center">A = B^{'{k+1}'} · X = Bᵏ · (B · X)</p>
            <p className="mt-1">נסמן <M>Y = B · X ∈ Mₙ(F)</M>. אז:</p>
            <p className="font-mono text-center">A = Bᵏ · Y</p>
            <p>לכן <M>A ∈ Wₖ</M>.</p>
            <p>קיבלנו: <M>Wₖ₊₁ ⊆ Wₖ</M>. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: תכונות תת-מרחבים</p>
          </Solution>
        </SubQ>

        <SubQ label="א-ii" pts={8}>
          <Problem>
            <p>הוכח: קיים <M>ℓ ∈ ℕ</M> כך ש-<M>Wₗ₊₁ = Wₗ</M>.</p>
          </Problem>
          <Solution>
            <p>מסעיף א-i: <M>Wₖ₊₁ ⊆ Wₖ</M> לכל k, ולכן <M>dim(Wₖ₊₁) ≤ dim(Wₖ)</M>.</p>
            <p className="mt-1">נקבל שרשרת יורדת (לא עולה) של ממדים:</p>
            <p className="font-mono text-center">dim(W₀) ≥ dim(W₁) ≥ dim(W₂) ≥ ...</p>
            <p className="mt-1">הממדים הם מספרים שלמים אי-שליליים (חסומים מלמטה ב-0).</p>
            <p className="mt-1">אם לכל k מתקיים <M>Wₖ₊₁ ≠ Wₖ</M>, אז (כי <M>Wₖ₊₁ ⊆ Wₖ</M> ו-<M>Wₖ₊₁ ≠ Wₖ</M>):</p>
            <p className="font-mono text-center">dim(Wₖ₊₁) &lt; dim(Wₖ)</p>
            <p>כלומר ירידה חזקה (strict) בכל שלב. אבל אי אפשר לרדת אינסוף פעמים (הממד חסום מלמטה ב-0).</p>
            <p className="mt-1"><strong>סתירה!</strong> לכן קיים <M>ℓ</M> כך ש-<M>Wₗ₊₁ = Wₗ</M>. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות 12-14 — ארגומנט ממד (שרשרת יורדת מתייצבת)</p>
          </Solution>
          <Tip>
            <strong>ארגומנט ממד:</strong> סדרה יורדת (חזקה) של מספרים טבעיים חייבת להתייצב. זה כלי חזק להוכחת קיום.
          </Tip>
        </SubQ>

        <SubQ label="ב" pts={10}>
          <Problem>
            <p><M>T: Mₙ(ℝ) → Mₙ(ℝ)</M> מוגדרת <M>T(A) = A - Aᵗ</M>.</p>
            <p><M>W = {'{'}A ∈ Mₙ(ℝ) : A = -Aᵗ{'}'}</M> (מטריצות אנטי-סימטריות).</p>
            <p>הוכח: <M>Im(T) = W</M>.</p>
          </Problem>
          <Solution>
            <p><strong>שלב 1: <M>Im(T) ⊆ W</M>.</strong></p>
            <p>יהי <M>B ∈ Im(T)</M>. אז קיימת <M>A ∈ Mₙ(ℝ)</M> כך ש-<M>B = T(A) = A - Aᵗ</M>.</p>
            <p>נחשב:</p>
            <p className="font-mono text-center">-Bᵗ = -(A - Aᵗ)ᵗ = -(Aᵗ - (Aᵗ)ᵗ) = -(Aᵗ - A) = A - Aᵗ = B</p>
            <p>לכן <M>B = -Bᵗ</M>, כלומר <M>B ∈ W</M>. ✓</p>

            <p className="mt-2"><strong>שלב 2: חישוב <M>Ker(T)</M>.</strong></p>
            <p><M>T(A) = 0</M> ⟺ <M>A - Aᵗ = 0</M> ⟺ <M>A = Aᵗ</M>.</p>
            <p>לכן <M>Ker(T) = U</M> = מרחב המטריצות הסימטריות.</p>

            <p className="mt-2"><strong>שלב 3: חישוב ממדים.</strong></p>
            <p>ידוע (מההרצאה): <M>Mₙ(ℝ) = U ⊕ W</M> (סימטריות ⊕ אנטי-סימטריות).</p>
            <p>לכן: <M>dim(Mₙ) = dim(U) + dim(W)</M>.</p>
            <p className="mt-1">ממשפט הממד (rank-nullity) עבור T:</p>
            <p className="font-mono text-center">dim(Mₙ) = dim(Ker T) + dim(Im T) = dim(U) + dim(Im T)</p>
            <p className="mt-1">מהשוואת שתי המשוואות:</p>
            <p className="font-mono text-center">dim(U) + dim(W) = dim(U) + dim(Im T)</p>
            <p className="font-mono text-center">⟹ dim(Im T) = dim(W)</p>

            <p className="mt-2"><strong>שלב 4: סיכום.</strong></p>
            <p><M>Im(T) ⊆ W</M> (משלב 1) ו-<M>dim(Im T) = dim(W)</M> (משלב 3).</p>
            <p>תת-מרחב בעל אותו ממד כמו המרחב שמכיל אותו — שווה לו.</p>
            <p>לכן <M>Im(T) = W</M>. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה על פירוק Mₙ = Sym ⊕ Skew + rank-nullity</p>
          </Solution>
          <Tip>
            <strong>תבנית &quot;הכלה + ממד&quot;:</strong> כדי להוכיח <M>Im(T) = W</M>, מוכיחים: (1) <M>Im(T) ⊆ W</M>, (2) <M>dim(Im T) = dim(W)</M>. זה עובד כי תת-מרחב עם אותו ממד = המרחב עצמו.
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* Strategy */}
      <Section title="אסטרטגיה מומלצת" icon={<Star className="w-5 h-5" />} color="text-amber-700">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 space-y-2">
          <p className="font-bold text-amber-800">סדר מומלץ למבחן הזה:</p>
          <p className="text-amber-700">1. <strong>שאלה 1</strong> (25 נק&apos;) — הוכחות Span מההרצאה, הכי בטוחה</p>
          <p className="text-amber-700">2. <strong>שאלה 4</strong> (25 נק&apos;) — ת&quot;ל מרוכבת (חישוב) + ממדים (הוכחה קצרה)</p>
          <p className="text-amber-700">3. <strong>שאלה 2</strong> (25 נק&apos;) — דירוג מכני + rank-nullity קלאסי</p>
          <p className="text-amber-700">4. <strong>שאלה 3</strong> (25 נק&apos;) — ה&quot;ל + AB=BA, דורש חשיבה</p>
          <p className="text-amber-700 opacity-60">5. שאלה 5 — רק אם נשאר זמן (שרשרת Wₖ מסובכת)</p>
        </div>
      </Section>
    </div>
  );
}
