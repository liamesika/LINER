'use client';

import { useState } from 'react';
import {
  BookOpen, ChevronDown, ChevronUp, Trophy, Star,
  CheckCircle, Lightbulb, AlertTriangle, Zap,
} from 'lucide-react';

/* ── helper components ───────────────────────── */

function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono bg-gray-100 px-1 rounded text-sm">{children}</span>;
}

function Proof({ title, children }: { title?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-emerald-100 transition-colors"
      >
        <span className="font-bold text-sm text-emerald-700 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {title || 'הוכחה מלאה'}
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

function TheoremCard({ rank, title, statement, frequency, source, children }: {
  rank: number;
  title: string;
  statement: React.ReactNode;
  frequency: string;
  source: string;
  children: React.ReactNode;
}) {
  const medals = ['', '🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
  return (
    <div className="bg-white rounded-xl border-2 border-amber-300 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-l from-amber-50 to-amber-100 px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{medals[rank]}</span>
            <span className="bg-amber-600 text-white text-sm font-bold px-3 py-1 rounded-lg">
              משפט #{rank}
            </span>
          </div>
          <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" />{frequency}
          </span>
        </div>
        <h3 className="font-bold text-lg text-gray-900">{title}</h3>
      </div>

      {/* Statement */}
      <div className="px-5 pt-4 pb-2">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm text-indigo-900">
          <div className="font-bold text-xs text-indigo-600 mb-2 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />ניסוח המשפט
          </div>
          {statement}
        </div>
      </div>

      {/* Source badge */}
      <div className="px-5 py-2">
        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-200">
          📚 {source}
        </span>
      </div>

      {/* Proof + extras */}
      <div className="px-5 pb-5 space-y-3">
        {children}
      </div>
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

/* ── main page ───────────────────────────────── */

export default function Top5Page() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-amber-500" />
          5 המשפטים הכי חשובים למבחן
          <Trophy className="w-8 h-8 text-amber-500" />
        </h1>
        <p className="text-gray-600">ההוכחות שהכי סביר שיופיעו — עם הוכחות מלאות מההרצאות</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
            <Star className="w-4 h-4" />מבוסס על ניתוח 7 מבחנים
          </span>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">
            הוכחות מדויקות מההרצאות
          </span>
        </div>
      </div>

      {/* ═══════════ THEOREM #1 ═══════════ */}
      <TheoremCard
        rank={1}
        title="משפט הייצוג היחיד"
        frequency="הופיע ב-7/7 מבחנים"
        source="הרצאה 11, עמודים 9–11"
        statement={
          <div className="space-y-1">
            <p>יהי <M>V</M> מרחב וקטורי מעל שדה <M>F</M>, ויהיו <M>v₁, ..., vₖ ∈ V</M>.</p>
            <p className="font-bold">הווקטורים <M>v₁, ..., vₖ</M> בלתי תלויים לינארית (בת&quot;ל) אם ורק אם לכל <M>v ∈ Sp&#123;v₁,...,vₖ&#125;</M> הייצוג של <M>v</M> כצירוף לינארי של <M>v₁,...,vₖ</M> הוא <span className="text-red-600 underline">יחיד</span>.</p>
          </div>
        }
      >
        <Proof>
          <p className="font-bold text-emerald-900">כיוון ⇐ : בת&quot;ל ⟹ ייצוג יחיד</p>
          <p><strong>נתון:</strong> <M>v₁, ..., vₖ</M> בת&quot;ל.</p>
          <p><strong>נוכיח:</strong> הייצוג יחיד.</p>
          <p>נניח ש:</p>
          <p className="text-center font-mono">α₁v₁ + ... + αₖvₖ = β₁v₁ + ... + βₖvₖ</p>
          <p><strong>שלב 1:</strong> נעביר אגפים:</p>
          <p className="text-center font-mono">(α₁ - β₁)v₁ + ... + (αₖ - βₖ)vₖ = 0_V</p>
          <p><strong>שלב 2:</strong> מכיוון ש-<M>v₁,...,vₖ</M> בת&quot;ל, הדרך היחידה לכתוב את <M>0_V</M> כצירוף לינארי שלהם היא הצירוף הטריוויאלי:</p>
          <p className="text-center font-mono">(α₁ - β₁, ..., αₖ - βₖ) = (0, ..., 0)</p>
          <p><strong>שלב 3:</strong> לכן <M>(α₁,...,αₖ) = (β₁,...,βₖ)</M> — הייצוג יחיד. ✓</p>

          <hr className="border-emerald-300 my-3" />

          <p className="font-bold text-emerald-900">כיוון ⇒ : ייצוג יחיד ⟹ בת&quot;ל</p>
          <p><strong>נתון:</strong> לכל <M>v ∈ Sp&#123;v₁,...,vₖ&#125;</M> יש ייצוג יחיד.</p>
          <p><strong>נוכיח:</strong> <M>v₁,...,vₖ</M> בת&quot;ל.</p>
          <p><strong>שלב 1:</strong> יהיו <M>γ₁,...,γₖ ∈ F</M> כך ש:</p>
          <p className="text-center font-mono">γ₁v₁ + ... + γₖvₖ = 0_V</p>
          <p><strong>שלב 2:</strong> נשים לב שגם:</p>
          <p className="text-center font-mono">0·v₁ + ... + 0·vₖ = 0_V</p>
          <p>כלומר, הצירוף הטריוויאלי גם נותן <M>0_V</M>.</p>
          <p><strong>שלב 3:</strong> יש לנו שני ייצוגים של <M>0_V</M>. מהנתון (יחידות הייצוג):</p>
          <p className="text-center font-mono">(γ₁, ..., γₖ) = (0, ..., 0)</p>
          <p>לכן <M>v₁,...,vₖ</M> בת&quot;ל. ∎</p>
        </Proof>

        <Tip>
          <strong>מבנה ההוכחה:</strong> כיוון ⇐ — העבר אגפים והשתמש בהגדרת בת&quot;ל. כיוון ⇒ — השתמש בעובדה ש-<M>0_V</M> תמיד ניתן לייצוג ע&quot;י הצירוף הטריוויאלי.
        </Tip>
        <Warning>
          <strong>שאלה שחוזרת:</strong> בכל מבחן שואלים על קשר בין בת&quot;ל לייצוג יחיד — לפעמים כסעיף הוכחה ישיר, לפעמים בתוך שאלה על בסיס/מרחב.
        </Warning>
      </TheoremCard>

      {/* ═══════════ THEOREM #2 ═══════════ */}
      <TheoremCard
        rank={2}
        title="למת שטייניץ + כל הבסיסים שווים בגודלם"
        frequency="הופיע ב-5/7 מבחנים"
        source="הרצאה 12, עמודים 5–7"
        statement={
          <div className="space-y-2">
            <p><strong>למת שטייניץ:</strong> יהי <M>V</M> מ&quot;ו מעל <M>F</M>, יהיו <M>v₁,...,vₖ</M> בת&quot;ל ו-<M>w₁,...,wₘ</M> פורשים את <M>V</M>.</p>
            <p className="font-bold">אזי <span className="text-red-600 underline">k ≤ m</span>.</p>
            <hr className="border-indigo-200 my-1" />
            <p><strong>מסקנה:</strong> יהיו <M>v₁,...,vₖ</M> ו-<M>w₁,...,wₘ</M> שני בסיסים של <M>V</M>. אזי <M>k = m</M>.</p>
          </div>
        }
      >
        <Proof title="הוכחת המסקנה (כל הבסיסים שווים בגודלם)">
          <p className="font-bold text-emerald-900">הוכחה (שימוש בשטייניץ בשני הכיוונים):</p>
          <p><strong>כיוון 1 — k ≤ m:</strong></p>
          <p>• <M>v₁,...,vₖ</M> הוא בסיס ⟹ בפרט בת&quot;ל.</p>
          <p>• <M>w₁,...,wₘ</M> הוא בסיס ⟹ בפרט פורש את <M>V</M>.</p>
          <p>• מלמת שטייניץ: <M>k ≤ m</M>.</p>

          <p className="mt-2"><strong>כיוון 2 — m ≤ k:</strong></p>
          <p>• <M>w₁,...,wₘ</M> הוא בסיס ⟹ בפרט בת&quot;ל.</p>
          <p>• <M>v₁,...,vₖ</M> הוא בסיס ⟹ בפרט פורש את <M>V</M>.</p>
          <p>• מלמת שטייניץ: <M>m ≤ k</M>.</p>

          <p className="mt-2"><strong>משני הכיוונים:</strong> <M>k ≤ m</M> ו-<M>m ≤ k</M>, לכן <M>k = m</M>. ∎</p>
        </Proof>

        <Proof title="מסקנה חשובה: n+1 וקטורים ב-dim V = n הם ת&quot;ל">
          <p className="font-bold text-emerald-900">מסקנה 1: אם <M>dim V = n</M>, אזי כל <M>n+1</M> וקטורים ב-<M>V</M> הם ת&quot;ל.</p>
          <p><strong>הוכחה בשלילה:</strong></p>
          <p>נניח בשלילה שקיימים <M>w₁,...,w_(n+1)</M> שהם בת&quot;ל.</p>
          <p><strong>מקרה 1 (n = 0):</strong> <M>V = &#123;0_V&#125;</M>, אז <M>w₁ = 0_V</M>, אבל <M>1·0_V = 0_V</M> עם מקדם <M>1 ≠ 0</M> — סתירה לבת&quot;ל.</p>
          <p><strong>מקרה 2 (n {'>'} 0):</strong> כיוון ש-<M>dim V = n</M>, קיים בסיס <M>v₁,...,vₙ</M> של <M>V</M>. בפרט, הוא פורש את <M>V</M> ויש בו <M>n</M> וקטורים.</p>
          <p>אבל <M>w₁,...,w_(n+1)</M> בת&quot;ל ויש בהם <M>n+1</M> וקטורים.</p>
          <p>מלמת שטייניץ: <M>n+1 ≤ n</M> — סתירה! ∎</p>
        </Proof>

        <Tip>
          <strong>הטריק:</strong> המסקנה משתמשת בשטייניץ בשני הכיוונים — פעם אחת הבסיס הראשון הוא הבת&quot;ל, פעם שנייה הבסיס השני. זה מבנה קלאסי שחוזר במבחנים.
        </Tip>
      </TheoremCard>

      {/* ═══════════ THEOREM #3 ═══════════ */}
      <TheoremCard
        rank={3}
        title="נוסחת הממדים לסכום תת-מרחבים"
        frequency="הופיע ב-6/7 מבחנים"
        source="הרצאה 14 עמוד 12 (ניסוח), הרצאה 15 עמודים 2–5 (הוכחה)"
        statement={
          <div className="space-y-1">
            <p>יהי <M>V</M> מ&quot;ו נוצר סופית מעל <M>F</M>, ויהיו <M>U, W ≤ V</M> תתי-מרחבים.</p>
            <p className="font-bold text-lg text-center my-2 text-red-700">dim(U + W) = dim U + dim W − dim(U ∩ W)</p>
            <p><strong>מסקנה (סכום ישר):</strong> אם <M>U ∩ W = &#123;0&#125;</M> אז <M>dim(U ⊕ W) = dim U + dim W</M>.</p>
          </div>
        }
      >
        <Proof>
          <p className="font-bold text-emerald-900">הוכחה מלאה:</p>
          <p>נסמן: <M>dim U = k</M>, <M>dim W = l</M>, <M>dim(U ∩ W) = r</M>.</p>
          <p><strong>נוכיח:</strong> <M>dim(U + W) = k + l − r</M>.</p>

          <hr className="border-emerald-300 my-2" />

          <p className="font-bold">שלב 1 — בניית בסיס:</p>
          <p>יהי <M>&#123;v₁,...,vᵣ&#125;</M> בסיס של <M>U ∩ W</M>.</p>
          <p>כיוון ש-<M>U ∩ W ≤ U</M>, נשלים לבסיס של <M>U</M>:</p>
          <p className="text-center font-mono bg-white rounded p-1">&#123;v₁,...,vᵣ, u_(r+1),...,uₖ&#125; — בסיס של U</p>
          <p>כיוון ש-<M>U ∩ W ≤ W</M>, נשלים לבסיס של <M>W</M>:</p>
          <p className="text-center font-mono bg-white rounded p-1">&#123;v₁,...,vᵣ, w_(r+1),...,wₗ&#125; — בסיס של W</p>

          <p className="mt-2"><strong>טענה:</strong> הקבוצה <M>B = &#123;v₁,...,vᵣ, u_(r+1),...,uₖ, w_(r+1),...,wₗ&#125;</M> היא בסיס של <M>U + W</M>.</p>
          <p>גודל <M>B</M> = <M>r + (k−r) + (l−r) = k + l − r</M>.</p>

          <hr className="border-emerald-300 my-2" />

          <p className="font-bold">שלב 2 — B פורשת את U + W:</p>
          <p>יהי <M>v ∈ U + W</M>. אז קיימים <M>u ∈ U</M> ו-<M>w ∈ W</M> כך ש-<M>v = u + w</M>.</p>
          <p>מכיוון ש-<M>&#123;v₁,...,vᵣ, u_(r+1),...,uₖ&#125;</M> בסיס של <M>U</M>:</p>
          <p className="text-center font-mono">u = α₁v₁ + ... + αᵣvᵣ + α_(r+1)u_(r+1) + ... + αₖuₖ</p>
          <p>מכיוון ש-<M>&#123;v₁,...,vᵣ, w_(r+1),...,wₗ&#125;</M> בסיס של <M>W</M>:</p>
          <p className="text-center font-mono">w = β₁v₁ + ... + βᵣvᵣ + β_(r+1)w_(r+1) + ... + βₗwₗ</p>
          <p>לכן:</p>
          <p className="text-center font-mono">v = u + w = (α₁+β₁)v₁ + ... + (αᵣ+βᵣ)vᵣ + α_(r+1)u_(r+1) + ... + αₖuₖ + β_(r+1)w_(r+1) + ... + βₗwₗ</p>
          <p>כלומר <M>v ∈ Sp(B)</M>. ✓</p>

          <hr className="border-emerald-300 my-2" />

          <p className="font-bold">שלב 3 — B בת&quot;ל:</p>
          <p>נניח:</p>
          <p className="text-center font-mono">(*) α₁v₁ + ... + αᵣvᵣ + β_(r+1)u_(r+1) + ... + βₖuₖ + γ_(r+1)w_(r+1) + ... + γₗwₗ = 0_V</p>
          <p>נעביר את חלק ה-W לאגף ימין:</p>
          <p className="text-center font-mono">(**) α₁v₁ + ... + αᵣvᵣ + β_(r+1)u_(r+1) + ... + βₖuₖ = −γ_(r+1)w_(r+1) − ... − γₗwₗ</p>

          <p className="mt-2"><strong>תצפית מפתח:</strong></p>
          <p>• אגף שמאל ∈ <M>U</M> (כי כל הוקטורים שם מ-<M>U</M>)</p>
          <p>• אגף ימין ∈ <M>W</M> (כי כל הוקטורים שם מ-<M>W</M>)</p>
          <p>• הם שווים ⟹ הערך המשותף ∈ <M>U ∩ W</M>.</p>

          <p className="mt-2">מכיוון ש-<M>&#123;v₁,...,vᵣ&#125;</M> בסיס של <M>U ∩ W</M>, קיימים <M>δ₁,...,δᵣ</M> כך ש:</p>
          <p className="text-center font-mono">−γ_(r+1)w_(r+1) − ... − γₗwₗ = δ₁v₁ + ... + δᵣvᵣ</p>
          <p>נעביר אגפים:</p>
          <p className="text-center font-mono">δ₁v₁ + ... + δᵣvᵣ + γ_(r+1)w_(r+1) + ... + γₗwₗ = 0_V</p>
          <p>אבל <M>&#123;v₁,...,vᵣ, w_(r+1),...,wₗ&#125;</M> הוא בסיס של <M>W</M> (בפרט בת&quot;ל), לכן:</p>
          <p className="text-center font-mono bg-white rounded p-1">δ₁ = ... = δᵣ = γ_(r+1) = ... = γₗ = 0</p>

          <p className="mt-2">נציב בחזרה ב-(*) ונקבל:</p>
          <p className="text-center font-mono">α₁v₁ + ... + αᵣvᵣ + β_(r+1)u_(r+1) + ... + βₖuₖ = 0_V</p>
          <p>אבל <M>&#123;v₁,...,vᵣ, u_(r+1),...,uₖ&#125;</M> הוא בסיס של <M>U</M> (בפרט בת&quot;ל), לכן:</p>
          <p className="text-center font-mono bg-white rounded p-1">α₁ = ... = αᵣ = β_(r+1) = ... = βₖ = 0</p>

          <p className="mt-2"><strong>מסקנה:</strong> כל המקדמים = 0, לכן <M>B</M> בת&quot;ל. ✓</p>

          <hr className="border-emerald-300 my-2" />
          <p><M>B</M> פורשת ובת&quot;ל ⟹ <M>B</M> בסיס של <M>U + W</M>.</p>
          <p>גודל <M>B</M> = <M>k + l − r</M>, לכן <M>dim(U + W) = dim U + dim W − dim(U ∩ W)</M>. ∎</p>
        </Proof>

        <Tip>
          <strong>שלב המפתח:</strong> לזהות שהערך המשותף נמצא ב-<M>U ∩ W</M> — כי אגף אחד ב-<M>U</M> ואגף שני ב-<M>W</M>.
        </Tip>
      </TheoremCard>

      {/* ═══════════ THEOREM #4 ═══════════ */}
      <TheoremCard
        rank={4}
        title="דרגה + אפסיות = n (Rank-Nullity למטריצות)"
        frequency="הופיע ב-7/7 מבחנים"
        source="הרצאה 26, עמוד 5 (ניסוח); נגזר מצורת מדרגות"
        statement={
          <div className="space-y-1">
            <p>תהי <M>A ∈ M_(m×n)(F)</M>. אזי:</p>
            <p className="font-bold text-lg text-center my-2 text-red-700">rank(A) + dim Nul(A) = n</p>
            <p>כאשר <M>rank(A)</M> = מספר עמודות ציר בצורת מדרגות, ו-<M>dim Nul(A)</M> = מספר המשתנים החופשיים.</p>
          </div>
        }
      >
        <Proof>
          <p className="font-bold text-emerald-900">הוכחה (מצורת המדרגות):</p>
          <p>תהי <M>A ∈ M_(m×n)(F)</M>. נדרג את <M>A</M> לצורת מדרגות (אשלון) <M>R</M>.</p>

          <p className="mt-2"><strong>שלב 1 — הגדרות:</strong></p>
          <p>• נסמן ב-<M>r</M> את מספר עמודות הציר (pivot columns) ב-<M>R</M>. זהו <M>rank(A) = r</M>.</p>
          <p>• כל עמודה שאיננה עמודת ציר היא <strong>עמודה חופשית</strong>. מספר העמודות החופשיות = <M>n − r</M>.</p>

          <p className="mt-2"><strong>שלב 2 — Nul(A):</strong></p>
          <p>המערכת <M>Ax = 0</M> שקולה ל-<M>Rx = 0</M> (כי דירוג שומר על מרחב הפתרונות).</p>
          <p>ב-<M>Rx = 0</M>, כל משתנה חופשי יכול לקבל כל ערך ב-<M>F</M>, ומשתני הציר נקבעים לפיהם.</p>
          <p>לכן <M>dim Nul(A) = n − r</M> (מספר המשתנים החופשיים).</p>

          <p className="mt-2"><strong>שלב 3 — סיכום:</strong></p>
          <p className="text-center font-mono bg-white rounded p-1">rank(A) + dim Nul(A) = r + (n − r) = n</p>
          <p>∎</p>
        </Proof>

        <Proof title="מסקנה: עמודות A בת&quot;ל ⟺ Ax = 0 פתרון יחיד">
          <p className="font-bold text-emerald-900">מסקנה (הרצאה 17, עמודים 7–8):</p>
          <p>תהי <M>A ∈ M_(m×n)(F)</M>. עמודות <M>A</M> (כוקטורים ב-<M>Fᵐ</M>) בת&quot;ל ⟺ המערכת <M>Ax = 0</M> בעלת פתרון יחיד (<M>x = 0</M>).</p>

          <hr className="border-emerald-300 my-2" />

          <p><strong>(⟸):</strong> נניח שעמודות <M>A</M> הן <M>C₁,...,Cₙ</M> והן בת&quot;ל.</p>
          <p>אם <M>Ax = 0</M> אז <M>x₁C₁ + ... + xₙCₙ = 0</M>.</p>
          <p>מבת&quot;ל: <M>x₁ = ... = xₙ = 0</M>. פתרון יחיד. ✓</p>

          <p className="mt-2"><strong>(⟹):</strong> נניח ש-<M>Ax = 0</M> בעלת פתרון יחיד <M>x = 0</M>.</p>
          <p>יהיו <M>α₁,...,αₙ ∈ F</M> כך ש-<M>α₁C₁ + ... + αₙCₙ = 0</M>.</p>
          <p>אז <M>A(α₁,...,αₙ)ᵗ = 0</M>, לכן <M>(α₁,...,αₙ) = (0,...,0)</M> מהיחידות.</p>
          <p>לכן עמודות <M>A</M> בת&quot;ל. ✓ ∎</p>
        </Proof>

        <Tip>
          <strong>נוסחה קריטית:</strong> בכל מבחן שאלו שאלה שדורשת שימוש ב-rank + nullity = n. בד&quot;כ נותנים מטריצה או ה&quot;ל ושואלים על ממד תת-מרחב.
        </Tip>
      </TheoremCard>

      {/* ═══════════ THEOREM #5 ═══════════ */}
      <TheoremCard
        rank={5}
        title="שקילות Span: v ∈ Sp(S) ⟺ Sp(S) = Sp(S ∪ {v})"
        frequency="הופיע ב-7/7 מבחנים"
        source="הרצאה 10, עמוד 4"
        statement={
          <div className="space-y-1">
            <p>יהי <M>V</M> מ&quot;ו מעל <M>F</M>, ויהיו <M>v₁,...,vₖ, v ∈ V</M>.</p>
            <p className="font-bold">v ∈ Sp&#123;v₁,...,vₖ&#125; ⟺ Sp&#123;v₁,...,vₖ&#125; = Sp&#123;v₁,...,vₖ, v&#125;</p>
          </div>
        }
      >
        <Proof>
          <p className="font-bold text-emerald-900">תכונת עזר (#): Span הוא תת-המרחב הקטן ביותר</p>
          <p>יהיו <M>v₁,...,vₖ ∈ V</M>. אז:</p>
          <p>(1) לכל <M>1 ≤ i ≤ k</M>: <M>vᵢ ∈ Sp&#123;v₁,...,vₖ&#125;</M>.</p>
          <p>(2) לכל תת-מרחב <M>W ≤ V</M>: אם <M>v₁,...,vₖ ∈ W</M> אז <M>Sp&#123;v₁,...,vₖ&#125; ≤ W</M>.</p>
          <p className="text-xs text-emerald-600">(כלומר, Span הוא תת-המרחב הכי קטן שמכיל את כל הוקטורים.)</p>

          <hr className="border-emerald-300 my-3" />

          <p className="font-bold text-emerald-900">כיוון ⟸ : נניח v ∈ Sp&#123;v₁,...,vₖ&#125;</p>
          <p><strong>נוכיח:</strong> <M>Sp&#123;v₁,...,vₖ&#125; = Sp&#123;v₁,...,vₖ,v&#125;</M>.</p>
          <p><strong>הכלה ⊆:</strong> מכיוון ש-<M>&#123;v₁,...,vₖ&#125; ⊆ &#123;v₁,...,vₖ,v&#125;</M>, מהמונוטוניות של Span:</p>
          <p className="text-center font-mono">Sp&#123;v₁,...,vₖ&#125; ⊆ Sp&#123;v₁,...,vₖ,v&#125;</p>
          <p><strong>הכלה ⊇:</strong> <M>Sp&#123;v₁,...,vₖ&#125;</M> הוא תת-מרחב, ומכיל את <M>v₁,...,vₖ</M> (מתכונה 1).</p>
          <p>גם <M>v ∈ Sp&#123;v₁,...,vₖ&#125;</M> (מהנתון).</p>
          <p>לכן כל האיברים <M>v₁,...,vₖ,v</M> נמצאים בתת-המרחב <M>Sp&#123;v₁,...,vₖ&#125;</M>.</p>
          <p>מתכונה (#)(2): <M>Sp&#123;v₁,...,vₖ,v&#125; ⊆ Sp&#123;v₁,...,vₖ&#125;</M>. ✓</p>

          <hr className="border-emerald-300 my-3" />

          <p className="font-bold text-emerald-900">כיוון ⟹ : נניח Sp&#123;v₁,...,vₖ&#125; = Sp&#123;v₁,...,vₖ,v&#125;</p>
          <p><strong>נוכיח:</strong> <M>v ∈ Sp&#123;v₁,...,vₖ&#125;</M>.</p>
          <p>מתכונה (#)(1): <M>v ∈ Sp&#123;v₁,...,vₖ,v&#125;</M>.</p>
          <p>אבל <M>Sp&#123;v₁,...,vₖ,v&#125; = Sp&#123;v₁,...,vₖ&#125;</M> (מהנתון).</p>
          <p>לכן <M>v ∈ Sp&#123;v₁,...,vₖ&#125;</M>. ∎</p>
        </Proof>

        <Tip>
          <strong>שימוש נפוץ:</strong> משתמשים במשפט הזה כדי &quot;לזרוק&quot; וקטור מקבוצה פורשת (אם הוא צ&quot;ל של האחרים), או &quot;להוסיף&quot; וקטור מבלי לשנות את ה-Span. זה הבסיס לבניית בסיס מקבוצה פורשת.
        </Tip>
        <Warning>
          <strong>זהירות:</strong> הכיוון ⊇ בהוכחה דורש להשתמש בתכונה ש-Span הוא תת-המרחב הקטן ביותר — אל תשכחו לציין את (#)(2).
        </Warning>
      </TheoremCard>

      {/* Summary table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900">
          <Star className="w-5 h-5 text-amber-500" />
          סיכום — מפת מקורות
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-right py-2 px-3">#</th>
                <th className="text-right py-2 px-3">משפט</th>
                <th className="text-right py-2 px-3">מקור</th>
                <th className="text-right py-2 px-3">תדירות</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 bg-amber-50">
                <td className="py-2 px-3 font-bold">🥇</td>
                <td className="py-2 px-3">משפט הייצוג היחיד</td>
                <td className="py-2 px-3">הרצאה 11, עמ&apos; 9–11</td>
                <td className="py-2 px-3 text-red-600 font-bold">7/7</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-bold">🥈</td>
                <td className="py-2 px-3">למת שטייניץ + בסיסים שווים</td>
                <td className="py-2 px-3">הרצאה 12, עמ&apos; 5–7</td>
                <td className="py-2 px-3 text-red-600 font-bold">5/7</td>
              </tr>
              <tr className="border-b border-gray-100 bg-amber-50">
                <td className="py-2 px-3 font-bold">🥉</td>
                <td className="py-2 px-3">נוסחת הממדים לסכום</td>
                <td className="py-2 px-3">הרצאה 15, עמ&apos; 2–5</td>
                <td className="py-2 px-3 text-red-600 font-bold">6/7</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-bold">4️⃣</td>
                <td className="py-2 px-3">Rank + Nullity = n</td>
                <td className="py-2 px-3">הרצאה 26, עמ&apos; 5</td>
                <td className="py-2 px-3 text-red-600 font-bold">7/7</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold">5️⃣</td>
                <td className="py-2 px-3">שקילות Span</td>
                <td className="py-2 px-3">הרצאה 10, עמ&apos; 4</td>
                <td className="py-2 px-3 text-red-600 font-bold">7/7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
