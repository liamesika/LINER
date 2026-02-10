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
            <Star className="w-4 h-4" />מבוסס על ניתוח 7 מבחנים + חומר חדש
          </span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />דטרמיננטות נכנסות לראשונה!
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
        title="A · adj(A) = det(A) · Iₙ (משפט המטריצה המצורפת)"
        frequency="חדש! צפוי מאוד — דטרמיננטות לראשונה"
        source="הרצאה 24"
        statement={
          <div className="space-y-1">
            <p>תהי <M>A ∈ Mₙ(F)</M>.</p>
            <p className="font-bold text-lg text-center my-2 text-red-700">A · adj(A) = adj(A) · A = det(A) · Iₙ</p>
            <p><strong>מסקנה 1:</strong> אם A הפיכה אז <M>A⁻¹ = adj(A) / det(A)</M>.</p>
            <p><strong>מסקנה 2:</strong> אם A לא הפיכה אז <M>A · adj(A) = Oₙ</M>.</p>
          </div>
        }
      >
        <Proof>
          <p className="font-bold text-emerald-900">הוכחה (A · adj(A) = det(A) · Iₙ):</p>
          <p>נוכיח שלכל <M>1 ≤ i, j ≤ n</M>: <M>[A · adj(A)]_ij = [det(A) · Iₙ]_ij</M>.</p>

          <hr className="border-emerald-300 my-2" />

          <p className="font-bold">מקרה 1 — אלכסון (i = j):</p>
          <p className="text-center font-mono">[A · adj(A)]_ii = Σₖ₌₁ⁿ [A]_ik · [adj(A)]_ki</p>
          <p>מהגדרת adj: <M>[adj(A)]_ki = (−1)^(k+i) · M_ik^(A)</M>. לכן:</p>
          <p className="text-center font-mono">= Σₖ₌₁ⁿ [A]_ik · (−1)^(k+i) · M_ik^(A)</p>
          <p>זהו בדיוק <strong>פיתוח det(A) לפי שורה i</strong>:</p>
          <p className="text-center font-mono bg-white rounded p-1">= det(A) ✓</p>

          <hr className="border-emerald-300 my-2" />

          <p className="font-bold">מקרה 2 — מחוץ לאלכסון (i ≠ j):</p>
          <p className="text-center font-mono">[A · adj(A)]_ij = Σₖ₌₁ⁿ [A]_ik · [adj(A)]_kj = Σₖ₌₁ⁿ [A]_ik · (−1)^(k+j) · M_jk^(A)</p>

          <p className="mt-2"><strong>הטריק (&quot;שורת רפאים&quot;):</strong> נבנה מטריצה <M>B</M> שמתקבלת מ-A ע&quot;י <strong>החלפת שורה j בשורה i</strong>.</p>
          <p>ב-B יש 2 שורות זהות (שורות i ו-j), ולכן <M>det(B) = 0_F</M>.</p>

          <p className="mt-2">נפתח את <M>det(B)</M> לפי שורה j:</p>
          <p className="text-center font-mono">det(B) = Σₖ₌₁ⁿ (−1)^(k+j) · [B]_jk · M_jk^(B)</p>
          <p>מכיוון ש-<M>[B]_jk = [A]_ik</M> (כי שורה j הוחלפה בשורה i)</p>
          <p>ו-<M>M_jk^(B) = M_jk^(A)</M> (כי מוחקים שורה j — השורה שהשתנתה):</p>
          <p className="text-center font-mono bg-white rounded p-1">[A · adj(A)]_ij = det(B) = 0_F ✓</p>

          <hr className="border-emerald-300 my-2" />
          <p>מהמקרים: <M>[A · adj(A)]_ij = det(A)</M> אם <M>i = j</M>, ו-<M>0_F</M> אם <M>i ≠ j</M>.</p>
          <p>כלומר: <M>A · adj(A) = det(A) · Iₙ</M>. ∎</p>
        </Proof>

        <Proof title="מסקנה 1: A⁻¹ = adj(A)/det(A)">
          <p>מהמשפט: <M>A · adj(A) = det(A) · Iₙ</M>.</p>
          <p>A הפיכה ⟹ <M>det(A) ≠ 0_F</M>.</p>
          <p>נחלק בdet(A): <M>A · (adj(A)/det(A)) = Iₙ</M>.</p>
          <p>לכן <M>A⁻¹ = adj(A)/det(A)</M>. ∎</p>
        </Proof>

        <Tip>
          <strong>הטריק המרכזי:</strong> מחוץ לאלכסון בונים &quot;מטריצת רפאים&quot; B עם 2 שורות זהות → det(B) = 0. זה הופך את הסכום לפיתוח דטרמיננטה של מטריצה סינגולרית.
        </Tip>
        <Warning>
          <strong>חדש במבחן!</strong> דטרמיננטות נכנסות לראשונה. משפט זה מחבר בין adj, det, והפיכות — צפוי מאוד כשאלת הוכחה.
        </Warning>
      </TheoremCard>

      {/* ═══════════ THEOREM #4 ═══════════ */}
      <TheoremCard
        rank={4}
        title="det(AB) = det(A) · det(B) (כפליות הדטרמיננטה)"
        frequency="חדש! צפוי מאוד — דטרמיננטות לראשונה"
        source="הרצאה 22 (משפט חשוב 1 + למה 1)"
        statement={
          <div className="space-y-1">
            <p>תהי <M>Δ: Mₙ(F) → F</M> פונקציית דטרמיננטה.</p>
            <p>תהיינה <M>A, B ∈ Mₙ(F)</M>.</p>
            <p className="font-bold text-lg text-center my-2 text-red-700">Δ(AB) = Δ(A) · Δ(B)</p>
          </div>
        }
      >
        <Proof title="למה 1: Δ(EA) = Δ(E) · Δ(A) עבור E אלמנטרית">
          <p className="font-bold text-emerald-900">הוכחה (למה 1 — בסיס למשפט):</p>
          <p>תהי <M>E ∈ Mₙ(F)</M> אלמנטרית, <M>A ∈ Mₙ(F)</M>.</p>
          <p>3 מקרים:</p>

          <p className="mt-2"><strong>1.</strong> <M>Iₙ →(Rᵢ → c·Rᵢ)→ E</M>:</p>
          <p>EA מתקבלת מ-A ע&quot;י <M>Rᵢ → c·Rᵢ</M>.</p>
          <p>ממשפט (*): <M>Δ(EA) = c · Δ(A)</M>.</p>
          <p>כמו כן: <M>Δ(E) = c · Δ(Iₙ) = c</M>.</p>
          <p>לכן: <M>Δ(EA) = c · Δ(A) = Δ(E) · Δ(A)</M>. ✓</p>

          <p className="mt-2"><strong>2.</strong> <M>Iₙ →(Rᵢ ↔ Rⱼ)→ E</M>:</p>
          <p>ממשפט (*): <M>Δ(E) = −1_F</M> ו-<M>Δ(EA) = −Δ(A)</M>.</p>
          <p>לכן: <M>Δ(EA) = −Δ(A) = Δ(E) · Δ(A)</M>. ✓</p>

          <p className="mt-2"><strong>3.</strong> <M>Iₙ →(Rᵢ → Rᵢ + αRⱼ)→ E</M>:</p>
          <p>ממשפט (*): <M>Δ(E) = 1_F</M> ו-<M>Δ(EA) = Δ(A)</M>.</p>
          <p>לכן: <M>Δ(EA) = Δ(A) = 1_F · Δ(A) = Δ(E) · Δ(A)</M>. ✓ ∎</p>
        </Proof>

        <Proof title="משפט: Δ(AB) = Δ(A) · Δ(B)">
          <p className="font-bold text-emerald-900">הוכחה (המשפט עצמו):</p>

          <p><strong>מקרה 1:</strong> A <strong>לא הפיכה</strong>.</p>
          <p>אזי AB לא הפיכה (כי אם AB הפיכה אז A הפיכה — סתירה).</p>
          <p className="text-center font-mono">Δ(AB) = 0_F = 0_F · Δ(B) = Δ(A) · Δ(B) ✓</p>

          <hr className="border-emerald-300 my-2" />

          <p><strong>מקרה 2:</strong> A <strong>הפיכה</strong>.</p>
          <p>אזי <M>A = E₁ · ... · Eₖ</M> (מכפלת מטריצות אלמנטריות).</p>
          <p className="text-center font-mono">Δ(AB) = Δ(E₁ · ... · Eₖ · B)</p>
          <p>שימוש חוזר בלמה 1 (k פעמים):</p>
          <p className="text-center font-mono">= Δ(E₁) · Δ(E₂ · ... · Eₖ · B) = ... = Δ(E₁) · ... · Δ(Eₖ) · Δ(B)</p>
          <p>שימוש חוזר בלמה 1 על <M>A = E₁ · ... · Eₖ</M>:</p>
          <p className="text-center font-mono bg-white rounded p-1">= Δ(E₁ · ... · Eₖ) · Δ(B) = Δ(A) · Δ(B) ✓ ∎</p>
        </Proof>

        <Tip>
          <strong>מבנה ההוכחה:</strong> קודם מוכיחים למה על מטריצה אלמנטרית (3 מקרים מ-(*)), ואז המשפט מתחלק ל-2 מקרים: A לא הפיכה (הכל 0) ו-A הפיכה (פירוק לאלמנטריות).
        </Tip>
        <Warning>
          <strong>חדש במבחן!</strong> זהו המשפט המרכזי של דטרמיננטות. ממנו נובעים: <M>det(A⁻¹) = (det A)⁻¹</M>, <M>det(Aᵗ) = det(A)</M>, ויחידות הדטרמיננטה. צפוי כשאלת הוכחה מלאה או חלקית (למה 1 בלבד).
        </Warning>
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
              <tr className="border-b border-gray-100 bg-purple-50">
                <td className="py-2 px-3 font-bold">🥉</td>
                <td className="py-2 px-3">A · adj(A) = det(A) · Iₙ</td>
                <td className="py-2 px-3">הרצאה 24</td>
                <td className="py-2 px-3 text-purple-600 font-bold">חדש!</td>
              </tr>
              <tr className="border-b border-gray-100 bg-purple-50">
                <td className="py-2 px-3 font-bold">4️⃣</td>
                <td className="py-2 px-3">det(AB) = det(A) · det(B)</td>
                <td className="py-2 px-3">הרצאה 22</td>
                <td className="py-2 px-3 text-purple-600 font-bold">חדש!</td>
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
