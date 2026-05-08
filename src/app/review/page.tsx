'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Target, AlertTriangle, Lightbulb, FileText, Zap, Star, CheckCircle } from 'lucide-react';

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
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Def({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">הגדרה</span>
        {title}
      </div>
      <div className="text-sm text-blue-800 space-y-1">{children}</div>
    </div>
  );
}

function Thm({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="font-bold text-green-900 text-sm mb-2 flex items-center gap-2">
        <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">משפט</span>
        {title}
      </div>
      <div className="text-sm text-green-800 space-y-1">{children}</div>
    </div>
  );
}

function Technique({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <div className="font-bold text-purple-900 text-sm mb-2 flex items-center gap-2">
        <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded">טכניקה</span>
        {title}
      </div>
      <div className="text-sm text-purple-800 space-y-1">{children}</div>
    </div>
  );
}

function ExamTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
      <div className="text-sm text-red-800 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <div>{children}</div>
      </div>
    </div>
  );
}

function Proof({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700"
      >
        <span>{title}</span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <div className="p-3 text-sm text-gray-700 space-y-2 bg-white">{children}</div>}
    </div>
  );
}

function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-gray-800 bg-gray-100 px-1 rounded text-xs">{children}</span>;
}

// =============================================
// Main Page
// =============================================

export default function ReviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Target className="w-7 h-7 text-red-600" />
          חזרה למבחן — כל מה שצריך לדעת
        </h1>
        <p className="text-gray-500 mt-1">מבוסס על ניתוח מועד א&apos; 2025, מועד ב&apos; 2025, וסימולציה 2026</p>
      </div>

      {/* Alert */}
      <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
        <h3 className="font-bold text-red-800 flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5" />
          כלל חובה במבחן!
        </h3>
        <p className="text-sm text-red-700">
          &quot;תשובות ללא הסבר לא יקבלו ניקוד. חובה לציין את כל התנאים לכל משפט או טענה.&quot;
          — זה אומר: <strong>תמיד כתבי &quot;לפי משפט X...&quot; + &quot;מכיוון ש-...&quot; לפני כל שימוש.</strong>
        </p>
      </div>

      {/* Quick Nav */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-bold text-sm text-gray-700 mb-2">ניווט מהיר:</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { href: '#defs', label: 'הגדרות (2 נק\' חינם!)' },
            { href: '#systems', label: 'מערכות משוואות + פרמטר' },
            { href: '#subspaces', label: 'תת-מרחבים + מימד' },
            { href: '#matrices', label: 'מטריצות + שחלוף' },
            { href: '#rank', label: 'דרגה + מרחב שורות' },
            { href: '#det', label: 'דטרמיננטות' },
            { href: '#invertibility', label: 'הפיכות' },
            { href: '#lt', label: 'ה"ל' },
            { href: '#prove-disprove', label: 'הוכח/הפרך' },
            { href: '#cheatsheet', label: 'שליף נוסחאות' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-sm rounded-full text-gray-700 hover:text-indigo-700 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* ============================== */}
      {/* 1. DEFINITIONS */}
      {/* ============================== */}
      <div id="defs">
        <Section title="הגדרות — 2 נקודות חינם בכל שאלה!" icon={<BookOpen className="w-5 h-5" />} color="text-blue-700">
          <ExamTip>
            <strong>בכל מבחן שאלה 1 ו-2 מתחילות בהגדרה של 2 נקודות.</strong> תשיני אותן בע&quot;פ — זה 4 נקודות בטוחות!
          </ExamTip>

          <Def title="אי-תלות לינארית (Linear Independence)">
            <p>הוקטורים <M>v₁,...,vₖ ∈ V</M> הם <strong>בלתי תלויים לינארית</strong> אם:</p>
            <p className="text-center font-mono mt-1">α₁v₁ + ... + αₖvₖ = 0 ⟹ α₁ = ... = αₖ = 0</p>
            <p>(הצירוף הלינארי הטריוויאלי הוא היחיד שנותן 0.)</p>
          </Def>

          <Def title="תת-מרחב (Subspace)">
            <p><M>W ⊆ V</M> הוא <strong>תת-מרחב</strong> של V אם:</p>
            <p>1. <M>0_V ∈ W</M></p>
            <p>2. לכל <M>u, w ∈ W</M>: <M>u + w ∈ W</M> (סגירות לחיבור)</p>
            <p>3. לכל <M>α ∈ F</M>, <M>w ∈ W</M>: <M>αw ∈ W</M> (סגירות לכפל בסקלר)</p>
          </Def>

          <Def title="סכום ישר (Direct Sum) — U ⊕ W">
            <p>נאמר ש-<M>V = U ⊕ W</M> אם:</p>
            <p>1. <M>V = U + W</M> (כל וקטור ב-V הוא סכום של וקטור מ-U ווקטור מ-W)</p>
            <p>2. <M>U ∩ W = {'{0}'}</M></p>
            <p><strong>שקול:</strong> לכל <M>v ∈ V</M> קיים <strong>פירוק יחיד</strong> <M>v = u + w</M> עם <M>u ∈ U, w ∈ W</M>.</p>
          </Def>

          <Def title="גרעין ותמונה (Kernel & Image)">
            <p>תהי <M>T: V → W</M> ה&quot;ל (העתקה לינארית).</p>
            <p><strong>גרעין:</strong> <M>ker(T) = {'{v ∈ V : T(v) = 0_W}'}</M></p>
            <p><strong>תמונה:</strong> <M>Im(T) = {'{T(v) : v ∈ V}'}</M></p>
            <p>ker(T) הוא תת-מרחב של V. Im(T) הוא תת-מרחב של W.</p>
          </Def>

          <Def title="מכפלת מטריצות (Matrix Multiplication)">
            <p>תהיינה <M>A ∈ M_{'m×n'}(F)</M> ו-<M>B ∈ M_{'n×r'}(F)</M>.</p>
            <p>המטריצה <M>AB ∈ M_{'m×r'}(F)</M> מוגדרת ע&quot;י:</p>
            <p className="text-center font-mono mt-1">[AB]_ij = Σₖ₌₁ⁿ [A]_ik · [B]_kj</p>
            <p>(שורה i של A כפול עמודה j של B.)</p>
          </Def>

          <Def title="מטריצה הפיכה (Invertible Matrix)">
            <p><M>A ∈ M_n(F)</M> נקראת <strong>הפיכה</strong> אם קיימת <M>B ∈ M_n(F)</M> כך ש-<M>AB = BA = I_n</M>.</p>
            <p>נסמן <M>B = A⁻¹</M>.</p>
          </Def>

          <Def title="דרגה (Rank)">
            <p><M>rank(A) = dim(row(A)) = dim(col(A))</M></p>
            <p>= מספר השורות הלא-אפסיות אחרי דירוג = מספר הפיבוטים.</p>
          </Def>

          <Def title="דטרמיננטה">
            <p>פונקציה <M>Δ: M_n(F) → F</M> נקראת <strong>דטרמיננטה</strong> אם:</p>
            <p>1. <strong>מולטי-לינארית</strong> — לינארית בכל שורה בנפרד</p>
            <p>2. <strong>אלטרנטיבית</strong> — אם 2 שורות שוות אז Δ(A) = 0</p>
            <p>3. <M>Δ(I_n) = 1_F</M></p>
          </Def>

          <Def title="בסיס (Basis)">
            <p>קבוצת וקטורים B של V היא <strong>בסיס</strong> אם:</p>
            <p>1. B פורשת את V (כלומר <M>Sp(B) = V</M>)</p>
            <p>2. B בלתי תלויה לינארית</p>
          </Def>

          <Def title="מטריצה סימטרית / אנטי-סימטרית">
            <p><strong>סימטרית:</strong> <M>Aᵗ = A</M> (כלומר <M>a_ij = a_ji</M>)</p>
            <p><strong>אנטי-סימטרית (skew-symmetric):</strong> <M>Aᵗ = -A</M> (כלומר <M>a_ij = -a_ji</M>, ובפרט <M>a_ii = 0</M>)</p>
          </Def>
        </Section>
      </div>

      {/* ============================== */}
      {/* 2. LINEAR SYSTEMS */}
      {/* ============================== */}
      <div id="systems">
        <Section title="מערכות משוואות עם פרמטר — 100% מופיע!" icon={<Zap className="w-5 h-5" />} color="text-orange-700">
          <ExamTip>
            בכל מבחן יש שאלה: &quot;נתונה מערכת עם פרמטר α. מצאו מתי אין פתרון / פתרון יחיד / אינסוף.&quot;
            <br />
            <strong>מועד א&apos; Q4.1 | מועד ב&apos; Q3.1 | סימולציה Q3.1</strong>
          </ExamTip>

          <Technique title="שיטת הפתרון">
            <p><strong>שלב 1:</strong> רשמי מטריצה מורחבת <M>(A|b)</M></p>
            <p><strong>שלב 2:</strong> דרגי שורות (Gaussian elimination) — השאירי את α כמו שהוא</p>
            <p><strong>שלב 3:</strong> מצאי את הביטוי שתלוי ב-α (בדרך כלל הפיבוט האחרון)</p>
            <p><strong>שלב 4:</strong> סווגי:</p>
            <div className="bg-white rounded p-3 mt-2 space-y-1">
              <p><strong>פתרון יחיד:</strong> כל עמודה היא עמודת פיבוט ← <M>rank(A) = rank(A|b) = n</M></p>
              <p><strong>אינסוף פתרונות:</strong> <M>rank(A) = rank(A|b) &lt; n</M> ← יש משתנים חופשיים</p>
              <p><strong>אין פתרון:</strong> <M>rank(A) &lt; rank(A|b)</M> ← שורת סתירה <M>(0 0 ... 0 | c≠0)</M></p>
            </div>
          </Technique>

          <Technique title="דוגמה: סימולציה Q3.1">
            <p>מערכת: <M>αx - y + z = 1</M>, <M>2x + αy + z = 0</M>, <M>2x + y - αz = α</M></p>
            <p><strong>1.</strong> רשמי מטריצה מורחבת:</p>
            <p className="text-center font-mono">(α -1 1 | 1 ; 2 α 1 | 0 ; 2 1 -α | α)</p>
            <p><strong>2.</strong> דרגי: R₃←R₃-R₂ → (0, 1-α, -α-1 | α)</p>
            <p><strong>3.</strong> מצאי ערכי α שבהם הפיבוט נעלם או נוצרת סתירה.</p>
            <p><strong>4.</strong> det(A) = 0 פותר — אם det(A)≠0 יש פתרון יחיד. אם det(A)=0, בדקי rank.</p>
          </Technique>

          <Thm title="משפט קיום פתרונות (Rouché-Capelli)">
            <p>למערכת <M>Ax = b</M>:</p>
            <p>יש פתרון ⟺ <M>rank(A) = rank(A|b)</M></p>
            <p>הפתרון יחיד ⟺ <M>rank(A) = n</M> (מספר הנעלמים)</p>
          </Thm>
        </Section>
      </div>

      {/* ============================== */}
      {/* 3. SUBSPACES & DIMENSION */}
      {/* ============================== */}
      <div id="subspaces">
        <Section title="תת-מרחבים ומימד — הנושא הגדול!" icon={<Star className="w-5 h-5" />} color="text-yellow-700">
          <ExamTip>
            בכל מבחן שואלים הוכחה על dim — בדרך כלל נוסחת המימדים או dim(W)≤dim(V).
            <br />
            <strong>מועד א&apos; Q4.2 | מועד ב&apos; Q1.1.2, Q2.1.2 | סימולציה Q3.2, Q4.2</strong>
          </ExamTip>

          <Thm title="נוסחת המימדים (Dimension Formula) — ★★★">
            <p>תהי V נ&quot;ס (נוצר סופית), ויהיו U, W תת-מרחבים.</p>
            <p className="text-center font-mono text-base mt-2 mb-2 font-bold">dim(U + W) = dim(U) + dim(W) - dim(U ∩ W)</p>
            <Proof title="הוכחה — נשאלה ישירות במועד ב'!">
              <p>1. יהי <M>{'{a₁,...,aₖ}'}</M> בסיס ל-<M>U ∩ W</M>.</p>
              <p>2. השלימי לבסיס של U: <M>{'{a₁,...,aₖ, u₁,...,uₛ}'}</M> בסיס ל-U.</p>
              <p>3. השלימי לבסיס של W: <M>{'{a₁,...,aₖ, w₁,...,wₜ}'}</M> בסיס ל-W.</p>
              <p>4. <strong>טענה:</strong> <M>{'{a₁,...,aₖ, u₁,...,uₛ, w₁,...,wₜ}'}</M> בסיס ל-<M>U + W</M>.</p>
              <p>5. <strong>פורש:</strong> כל <M>v ∈ U + W</M> הוא <M>v = u + w</M> עם <M>u ∈ U, w ∈ W</M>. פרקי כל אחד לפי הבסיסים.</p>
              <p>6. <strong>בלתי תלוי:</strong> נניח <M>Σαᵢaᵢ + Σβⱼuⱼ + Σγₗwₗ = 0</M>. אז <M>Σαᵢaᵢ + Σβⱼuⱼ = -Σγₗwₗ</M>. צד שמאל ∈ U, צד ימין ∈ W. לכן שניהם ∈ U∩W. אז <M>-Σγₗwₗ = Σδᵢaᵢ</M>, ומא&quot;ת של הבסיס של W נובע <M>γₗ = 0</M> לכל l, ואז <M>δᵢ = 0</M>. ואז <M>Σαᵢaᵢ + Σβⱼuⱼ = 0</M> ומא&quot;ת של בסיס U נובע הכל 0.</p>
              <p>7. <strong>מסקנה:</strong> <M>dim(U+W) = k + s + t = (k+s) + (k+t) - k = dim U + dim W - dim(U∩W)</M>.</p>
            </Proof>
          </Thm>

          <Thm title="dim(W) ≤ dim(V)">
            <p>אם V נ&quot;ס ו-W תת-מרחב של V, אז <M>dim(W) ≤ dim(V)</M>.</p>
            <Proof title="הוכחה">
              <p>כל קבוצה בלתי תלויה ב-V מכילה לכל היותר dim(V) וקטורים (למת שטיינייץ).</p>
              <p>בסיס של W הוא קבוצה ב&quot;ת ב-V, לכן |בסיס W| ≤ dim(V).</p>
            </Proof>
          </Thm>

          <Thm title="dim(W) = dim(V) ⟹ W = V ★★">
            <p>אם V נ&quot;ס, W תת-מרחב, ו-<M>dim(W) = dim(V)</M>, אז <M>W = V</M>.</p>
            <Proof title="הוכחה — נשאלה ישירות במועד ב'!">
              <p>יהי <M>{'{w₁,...,wₙ}'}</M> בסיס ל-W (n = dim V).</p>
              <p>זו קבוצה ב&quot;ת בת n וקטורים ב-V שבו dim(V) = n.</p>
              <p>לפי משפט — קבוצה ב&quot;ת בת dim(V) וקטורים במ&quot;ו נ&quot;ס היא בסיס.</p>
              <p>לכן <M>{'{w₁,...,wₙ}'}</M> פורשת את V, ולכן <M>V = Sp(w₁,...,wₙ) ⊆ W ⊆ V</M>, כלומר <M>W = V</M>.</p>
            </Proof>
          </Thm>

          <Thm title="dim(U∩W) = n-2 (מועד א' Q4.2)">
            <p>אם <M>dim(V) = n</M>, U ≠ W תת-מרחבים, <M>dim U = dim W = n-1</M>:</p>
            <p className="text-center font-mono">dim(U∩W) = n - 2</p>
            <Proof title="הוכחה">
              <p>1. <M>U + W ⊆ V</M> ← תת-מרחב של V, אז <M>dim(U+W) ≤ n</M>.</p>
              <p>2. U ≠ W ← אז U אינו מוכל ב-W (שניהם n-1, אם מוכל אז שווה). לכן <M>U + W ⊋ W</M> ← <M>dim(U+W) &gt; n-1</M> ← <M>dim(U+W) = n</M>.</p>
              <p>3. לפי נוסחת המימדים: <M>n = (n-1) + (n-1) - dim(U∩W)</M> ← <M>dim(U∩W) = n-2</M>.</p>
            </Proof>
          </Thm>

          <Technique title="הוכחת שוויון Spans">
            <p>כדי להוכיח <M>Sp(S₁) = Sp(S₂)</M>:</p>
            <p><strong>שיטה 1 (הכלה כפולה):</strong> הראי <M>Sp(S₁) ⊆ Sp(S₂)</M> וגם <M>Sp(S₂) ⊆ Sp(S₁)</M>.</p>
            <p>כלומר: הראי שכל וקטור ב-S₁ ניתן לכתוב כצ&quot;ל של S₂, וההפך.</p>
            <p><strong>שיטה 2 (מימד):</strong> אם <M>Sp(S₁) ⊆ Sp(S₂)</M> ו-<M>dim Sp(S₁) = dim Sp(S₂)</M> אז שווים.</p>
          </Technique>
        </Section>
      </div>

      {/* ============================== */}
      {/* 4. MATRICES & TRANSPOSE */}
      {/* ============================== */}
      <div id="matrices">
        <Section title="מטריצות + שחלוף" icon={<FileText className="w-5 h-5" />} color="text-indigo-700">
          <ExamTip>
            <strong>(AB)ᵗ = BᵗAᵗ נשאלה ישירות בסימולציה Q1.1.2!</strong>
            <br />
            מטריצות סימטריות/אנטי נשאלות כ-&quot;הוכח או הפרך&quot; בכל מבחן.
          </ExamTip>

          <Thm title="(AB)ᵗ = BᵗAᵗ ★★★">
            <p>תהיינה <M>A ∈ M_{'m×n'}(F)</M>, <M>B ∈ M_{'n×r'}(F)</M>. אז <M>(AB)ᵗ = BᵗAᵗ</M>.</p>
            <Proof title="הוכחה — נשאלה ישירות בסימולציה!">
              <p>צריך להראות: <M>[(AB)ᵗ]_ij = [BᵗAᵗ]_ij</M> לכל i, j.</p>
              <p><M>[(AB)ᵗ]_ij = [AB]_ji = Σₖ [A]_jk · [B]_ki</M></p>
              <p><M>[BᵗAᵗ]_ij = Σₖ [Bᵗ]_ik · [Aᵗ]_kj = Σₖ [B]_ki · [A]_jk</M></p>
              <p>שתי הסכומות זהות (כפל קומוטטיבי בשדה). ∎</p>
            </Proof>
          </Thm>

          <Thm title="תכונות שחלוף">
            <p>1. <M>(A + B)ᵗ = Aᵗ + Bᵗ</M></p>
            <p>2. <M>(αA)ᵗ = αAᵗ</M></p>
            <p>3. <M>(AB)ᵗ = BᵗAᵗ</M> (שימו לב להיפוך הסדר!)</p>
            <p>4. <M>(Aᵗ)ᵗ = A</M></p>
            <p>5. <M>(A⁻¹)ᵗ = (Aᵗ)⁻¹</M></p>
          </Thm>

          <Technique title="עבודה עם סימטרית / אנטי-סימטרית">
            <p><strong>סימטרית:</strong> <M>Aᵗ = A</M></p>
            <p><strong>אנטי-סימטרית:</strong> <M>Aᵗ = -A</M></p>
            <p><strong>כללים:</strong></p>
            <p>• A סימטרית ← <M>A² = AᵗA</M> (סימטרית)</p>
            <p>• A, B סימטריות ← <M>AB</M> סימטרית ⟺ <M>AB = BA</M></p>
            <p>• A, B אנטי ← <M>AB</M> סימטרית ⟺ <M>AB = BA</M></p>
            <p className="mt-2 text-red-700 font-medium">להפרכה: תמיד תנסי מטריצות 2×2 פשוטות!</p>
          </Technique>
        </Section>
      </div>

      {/* ============================== */}
      {/* 5. RANK */}
      {/* ============================== */}
      <div id="rank">
        <Section title="דרגה + מרחב שורות" icon={<Lightbulb className="w-5 h-5" />} color="text-emerald-700">
          <ExamTip>
            <strong>שאלה 5 בכל מבחן עוסקת ב-rank!</strong>
            <br />
            מועד א&apos; Q5.2: rank(AB)=rank(B) | מועד ב&apos; Q5.1: Null(AᵗA)=Null(A) | סימולציה Q5.2: rank inequality
          </ExamTip>

          <Thm title="rank(AB) ≤ min(rank A, rank B)">
            <p>כי <M>Im(AB) ⊆ Im(A)</M> ← rank(AB) ≤ rank(A)</p>
            <p>וכן <M>ker(B) ⊆ ker(AB)</M> ← nullity(B) ≤ nullity(AB) ← rank(AB) ≤ rank(B)</p>
          </Thm>

          <Thm title="A הפיכה ⟹ rank(AB) = rank(B) ★★★">
            <p>אם <M>A ∈ M_n(F)</M> <strong>הפיכה</strong> ו-<M>B ∈ M_n(F)</M>, אז <M>rank(AB) = rank(B)</M>.</p>
            <Proof title="הוכחה — נשאלה ישירות במועד א'!">
              <p>כבר ידוע <M>rank(AB) ≤ rank(B)</M>.</p>
              <p>לכיוון השני: <M>B = A⁻¹(AB)</M>, אז <M>rank(B) = rank(A⁻¹(AB)) ≤ rank(AB)</M>.</p>
              <p>לכן <M>rank(AB) = rank(B)</M>. ∎</p>
            </Proof>
          </Thm>

          <Thm title="rank(Bᵗ) = rank(B)">
            <p>דרגת מטריצה = דרגת שחלופה.</p>
            <p><strong>כי:</strong> rank = dim(row space), ו-row space של Bᵗ = col space של B = rank(B).</p>
          </Thm>

          <Thm title="rank(BA) = rank(B) כש-A הפיכה">
            <Proof title="הוכחה">
              <p><M>rank(BA) = rank((BA)ᵗ) = rank(AᵗBᵗ)</M>.</p>
              <p>Aᵗ הפיכה (כי A הפיכה), לכן <M>rank(AᵗBᵗ) = rank(Bᵗ) = rank(B)</M>. ∎</p>
            </Proof>
          </Thm>

          <Thm title="row(A+B) ⊆ row(A) + row(B) (סימולציה Q5.2)">
            <Proof title="הוכחה">
              <p>כל שורה של A+B היא <M>R_i(A+B) = R_i(A) + R_i(B)</M>.</p>
              <p>אז <M>R_i(A+B) ∈ row(A) + row(B)</M>.</p>
              <p>לכן <M>row(A+B) = Sp(R₁(A+B),...) ⊆ row(A) + row(B)</M>. ∎</p>
            </Proof>
          </Thm>

          <Thm title="rank(A) - rank(B) ≤ rank(A+B) ≤ rank(A) + rank(B)">
            <Proof title="הוכחה">
              <p><strong>צד ימין:</strong> <M>row(A+B) ⊆ row(A) + row(B)</M>, אז <M>rank(A+B) ≤ dim(row(A) + row(B)) ≤ rank(A) + rank(B)</M>.</p>
              <p><strong>צד שמאל:</strong> <M>A = (A+B) + (-B)</M>, אז <M>rank(A) ≤ rank(A+B) + rank(-B) = rank(A+B) + rank(B)</M>. ∎</p>
            </Proof>
          </Thm>

          <Thm title="Null(A) ⊆ Null(AᵗA) ובעצם Null(A) = Null(AᵗA) (מועד ב' Q5.1)">
            <Proof title="הוכחה">
              <p><strong>Null(A) ⊆ Null(AᵗA):</strong> אם <M>Ax = 0</M> אז <M>AᵗAx = Aᵗ·0 = 0</M>. ∎</p>
              <p><strong>Null(AᵗA) ⊆ Null(A):</strong> נניח <M>AᵗAx = 0</M>. אז <M>xᵗAᵗAx = 0</M>, כלומר <M>(Ax)ᵗ(Ax) = 0</M>.</p>
              <p>סמני <M>y = Ax</M>. אז <M>yᵗy = y₁² + ... + yₘ² = 0</M>. מעל ℝ, זה אפשרי רק אם <M>y = 0</M>, כלומר <M>Ax = 0</M>. ∎</p>
            </Proof>
          </Thm>
        </Section>
      </div>

      {/* ============================== */}
      {/* 6. DETERMINANTS */}
      {/* ============================== */}
      <div id="det">
        <Section title="דטרמיננטות" icon={<Target className="w-5 h-5" />} color="text-red-700">
          <ExamTip>
            <strong>בסימולציה 2 שאלות על דטרמיננטות!</strong> Q2.1: det בלוקים, Q4.1: חישוב det 5×5.
          </ExamTip>

          <Thm title="det(AB) = det(A) · det(B)">
            <p>לכל <M>A, B ∈ M_n(F)</M>.</p>
          </Thm>

          <Thm title="det(Aᵗ) = det(A)">
            <p>לכל <M>A ∈ M_n(F)</M>.</p>
          </Thm>

          <Thm title="A הפיכה ⟺ det(A) ≠ 0">
            <p>וכאשר A הפיכה: <M>det(A⁻¹) = 1/det(A)</M></p>
          </Thm>

          <Thm title="det מטריצה משולשית = מכפלת האלכסון">
            <p>אם A משולשית עליונה/תחתונה: <M>det(A) = a₁₁ · a₂₂ · ... · aₙₙ</M></p>
          </Thm>

          <Thm title="det בלוקים משולשית = det(A)·det(B) ★★★">
            <p>תהי K מטריצת בלוקים משולשית עליונה <M>K = (A C ; 0 B)</M> כאשר <M>A ∈ M_n, B ∈ M_m</M>.</p>
            <p className="text-center font-mono mt-1 font-bold">det(K) = det(A) · det(B)</p>
            <Proof title="הוכחה — נשאלה ישירות בסימולציה!">
              <p><strong>מקרה 1: A סינגולרית.</strong> אז rank(A) &lt; n, ולכן rank(K) &lt; n+m, כלומר K סינגולרית ← det(K) = 0 = 0·det(B) = det(A)·det(B). ✓</p>
              <p><strong>מקרה 2: A הפיכה.</strong> A = מכפלת מטריצות אלמנטריות <M>E₁·...·Eₖ</M>.</p>
              <p>ניתן להראות ש-<M>(E 0 ; 0 I)(A C ; 0 B) = (EA EC ; 0 B)</M>.</p>
              <p>ולכן <M>det(K) = det(E₁)·...·det(Eₖ)·det(I_n C&apos; ; 0 B)</M>.</p>
              <p>עבור <M>(I C&apos; ; 0 B)</M>: פיתוח לפי עמודה 1, ואינדוקציה → <M>det = det(B)</M>.</p>
              <p>סה&quot;כ: <M>det(K) = det(E₁)·...·det(Eₖ)·det(B) = det(A)·det(B)</M>. ∎</p>
            </Proof>
          </Thm>

          <Technique title="חישוב det ע&quot;י פעולות שורה">
            <p><strong>כלל:</strong> דרגי לצורה משולשית, det = מכפלת אלכסון (עם תיקונים).</p>
            <p>• <M>R_i ↔ R_j</M> (החלפת שורות): <strong>det הופך סימן</strong></p>
            <p>• <M>R_i ← R_i + αR_j</M>: <strong>det לא משתנה</strong></p>
            <p>• <M>R_i ← c·R_i</M>: <strong>det מוכפל ב-c</strong></p>
            <p className="mt-2"><strong>דוגמה (סימולציה Q4.1):</strong> det של 5×5 — עשי R₂←R₂-R₁, R₃←R₃-R₂, ... עד שתקבלי מטריצה משולשית.</p>
          </Technique>

          <Technique title="כלל סרוס (3×3 בלבד!)">
            <p className="font-mono text-center">det = aei + bfg + cdh - ceg - bdi - afh</p>
            <p className="text-red-600 font-medium">לא עובד על 4×4 ומעלה!</p>
          </Technique>
        </Section>
      </div>

      {/* ============================== */}
      {/* 7. INVERTIBILITY */}
      {/* ============================== */}
      <div id="invertibility">
        <Section title="הפיכות" icon={<CheckCircle className="w-5 h-5" />} color="text-cyan-700">
          <ExamTip>
            <strong>מועד א&apos; Q3.2:</strong> מצאו A⁻¹ ב-Z₅ | <strong>מועד ב&apos; Q4.1:</strong> הוכיחו T הפיכה | <strong>סימולציה Q2.2:</strong> מצאו הפיכה שמאלית
          </ExamTip>

          <Thm title="תנאים שקולים להפיכות (הרשימה הגדולה) ★★★">
            <p>עבור <M>A ∈ M_n(F)</M>, הבאים שקולים:</p>
            <p>1. A הפיכה</p>
            <p>2. <M>det(A) ≠ 0</M></p>
            <p>3. <M>rank(A) = n</M></p>
            <p>4. שורות A בלתי תלויות</p>
            <p>5. עמודות A בלתי תלויות</p>
            <p>6. <M>Ax = 0</M> → <M>x = 0</M> (ker = 0)</p>
            <p>7. <M>Ax = b</M> פתירה לכל b (Im = Fⁿ)</p>
            <p>8. RREF של A הוא <M>I_n</M></p>
            <p>9. A מכפלת מטריצות אלמנטריות</p>
          </Thm>

          <Technique title="מציאת A⁻¹ ע&quot;י דירוג">
            <p><strong>שלב 1:</strong> כתבי <M>(A | I_n)</M></p>
            <p><strong>שלב 2:</strong> דרגי שורות עד RREF</p>
            <p><strong>שלב 3:</strong> אם צד שמאל הפך ל-<M>I_n</M> → צד ימין הוא <M>A⁻¹</M></p>
            <p><strong>שלב 4:</strong> אם לא הגעת ל-<M>I_n</M> → A לא הפיכה</p>
          </Technique>

          <Technique title="הפיכה שמאלית / ימנית">
            <p><strong>הפיכה שמאלית:</strong> קיימת B כך ש-<M>BA = I</M>. קיימת ⟺ עמודות A בלתי תלויות.</p>
            <p><strong>הפיכה ימנית:</strong> קיימת C כך ש-<M>AC = I</M>. קיימת ⟺ שורות A פורשות.</p>
            <p className="text-sm mt-1">עבור מטריצה שאינה ריבועית: <M>A ∈ M_{'m×n'}</M> עם m &lt; n ← אין הפיכה שמאלית. עם m &gt; n ← יכול להיות.</p>
          </Technique>
        </Section>
      </div>

      {/* ============================== */}
      {/* 8. LINEAR TRANSFORMATIONS */}
      {/* ============================== */}
      <div id="lt">
        <Section title="העתקות לינאריות" icon={<Zap className="w-5 h-5" />} color="text-violet-700">
          <ExamTip>
            <strong>מועד א&apos; Q2+Q3 | מועד ב&apos; Q4+Q5</strong>
          </ExamTip>

          <Thm title="משפט rank-nullity ★★★">
            <p>תהי <M>T: V → W</M> ה&quot;ל, V נ&quot;ס. אז:</p>
            <p className="text-center font-mono text-base font-bold mt-1 mb-1">dim(V) = dim(ker T) + dim(Im T)</p>
            <Proof title="הוכחה — נשאלה ישירות במועד א'!">
              <p>1. יהי <M>{'{v₁,...,vₖ}'}</M> בסיס ל-ker(T).</p>
              <p>2. השלימי לבסיס של V: <M>{'{v₁,...,vₖ, u₁,...,uᵣ}'}</M>.</p>
              <p>3. <strong>טענה:</strong> <M>{'{T(u₁),...,T(uᵣ)}'}</M> בסיס ל-Im(T).</p>
              <p>4. <strong>פורש:</strong> לכל <M>w ∈ Im(T)</M>, קיים <M>v = Σαᵢvᵢ + Σβⱼuⱼ</M> כך ש-<M>T(v) = w</M>. אז <M>w = ΣαᵢT(vᵢ) + ΣβⱼT(uⱼ) = ΣβⱼT(uⱼ)</M> (כי vᵢ ∈ ker).</p>
              <p>5. <strong>בלתי תלוי:</strong> אם <M>Σβⱼ T(uⱼ) = 0</M> אז <M>T(Σβⱼuⱼ) = 0</M>, כלומר <M>Σβⱼuⱼ ∈ ker(T)</M>. לכן <M>Σβⱼuⱼ = Σγᵢvᵢ</M>. מא&quot;ת של בסיס V → כל המקדמים 0.</p>
              <p>6. <strong>מסקנה:</strong> <M>dim(V) = k + r = dim(ker T) + dim(Im T)</M>. ∎</p>
            </Proof>
          </Thm>

          <Thm title="T חח&quot;ע ⟺ ker(T) = {'{0}'}">
            <p>T: V → W לינארית. אז T חד-חד ערכית ⟺ <M>ker(T) = {'{0_V}'}</M>.</p>
          </Thm>

          <Technique title="חישוב T(v) כשנתונים T על וקטורים אחרים">
            <p>אם <M>T(v₁) = w₁</M> ו-<M>T(v₂) = w₂</M>:</p>
            <p>1. כתבי את v כצ&quot;ל: <M>v = αv₁ + βv₂</M></p>
            <p>2. לפי לינאריות: <M>T(v) = αT(v₁) + βT(v₂) = αw₁ + βw₂</M></p>
          </Technique>
        </Section>
      </div>

      {/* ============================== */}
      {/* 9. PROVE/DISPROVE */}
      {/* ============================== */}
      <div id="prove-disprove">
        <Section title="הוכח או הפרך — טיפים" icon={<AlertTriangle className="w-5 h-5" />} color="text-amber-700">
          <ExamTip>
            <strong>בכל מבחן יש 2-3 שאלות &quot;הוכח או הפרך&quot; של 7-8 נקודות כ&quot;א.</strong>
          </ExamTip>

          <Technique title="שיטה כללית">
            <p><strong>שלב 1:</strong> נסי עם מטריצות/וקטורים פשוטים (2×2, I, 0, e₁, e₂)</p>
            <p><strong>שלב 2:</strong> אם נראה נכון → נסי להוכיח</p>
            <p><strong>שלב 3:</strong> אם מצאת דוגמה נגדית → &quot;הטענה <strong>אינה</strong> נכונה. דוגמה נגדית:...&quot;</p>
          </Technique>

          <Technique title="דוגמאות נגדיות קלאסיות לשינון">
            <p><strong>AB ≠ BA:</strong> <M>A = (1 1 ; 0 0), B = (0 0 ; 1 1)</M> → AB ≠ BA</p>
            <p><strong>Tr(A²)=0 ↛ Tr(A)=0:</strong> <M>A = (0 1 ; -1 0)</M> → A²=-I, Tr(A²)=-2, Tr(A)=0... תבדקי אם אפשר למצוא דוגמה הפוכה מעל Z₂ וכו&apos;</p>
            <p><strong>AB=0 ↛ A=0 או B=0:</strong> <M>A = B = (0 1 ; 0 0)</M></p>
            <p><strong>rank(A+B) ≠ rank(A)+rank(B):</strong> <M>A = I, B = -I</M></p>
          </Technique>

          <Technique title="דוגמה: סימולציה Q1.2 — Tr(A²)=0 → Tr(A)=0?">
            <p><strong>הפרכה.</strong> ניקח <M>A = (1 0 ; 0 -1) ∈ M₂(ℝ)</M>.</p>
            <p><M>A² = I₂</M>, אז <M>Tr(A²) = 2 ≠ 0</M>... זה לא עובד.</p>
            <p>ניקח שדה <M>F = Z₂</M>: <M>A = I₂</M> → <M>Tr(A) = 1+1 = 0</M>, <M>Tr(A²) = 0</M>. גם לא דוגמה נגדית.</p>
            <p>ניקח <M>A = (0 1 ; 0 0)</M>: <M>A² = 0</M>, <M>Tr(A²) = 0</M>, <M>Tr(A) = 0</M>. עדיין נכון.</p>
            <p>ניקח <M>A = (1 0 ; 0 0)</M> מעל <M>Z₃</M>: <M>A² = A</M>, <M>Tr(A²) = 1 ≠ 0</M>.</p>
            <p className="mt-1 font-medium">טריק: אם לא מצאת דוגמה נגדית אחרי 2 דקות — כנראה צריך להוכיח!</p>
          </Technique>
        </Section>
      </div>

      {/* ============================== */}
      {/* 10. CHEAT SHEET */}
      {/* ============================== */}
      <div id="cheatsheet">
        <Section title="שליף נוסחאות — הכל במקום אחד" icon={<Zap className="w-5 h-5" />} color="text-gray-900">
          <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-xs space-y-3 overflow-x-auto">
            <p className="text-yellow-400 font-bold">═══ מימד ═══</p>
            <p>dim(U+W) = dim U + dim W - dim(U∩W)</p>
            <p>dim V = dim ker T + dim Im T &nbsp;&nbsp;(rank-nullity)</p>
            <p>dim W ≤ dim V &nbsp;&nbsp;(W תת-מרחב של V)</p>
            <p>dim W = dim V → W = V</p>

            <p className="text-yellow-400 font-bold mt-3">═══ דרגה ═══</p>
            <p>rank(AB) ≤ min(rank A, rank B)</p>
            <p>A הפיכה → rank(AB) = rank(B), rank(BA) = rank(B)</p>
            <p>rank(Aᵗ) = rank(A)</p>
            <p>rank(A) - rank(B) ≤ rank(A+B) ≤ rank(A) + rank(B)</p>
            <p>rank(A) + nullity(A) = n &nbsp;&nbsp;(מספר העמודות)</p>

            <p className="text-yellow-400 font-bold mt-3">═══ שחלוף ═══</p>
            <p>(AB)ᵗ = BᵗAᵗ &nbsp;&nbsp;(היפוך סדר!)</p>
            <p>(A⁻¹)ᵗ = (Aᵗ)⁻¹</p>
            <p>det(Aᵗ) = det(A)</p>

            <p className="text-yellow-400 font-bold mt-3">═══ דטרמיננטות ═══</p>
            <p>det(AB) = det(A)·det(B)</p>
            <p>det(A⁻¹) = 1/det(A)</p>
            <p>det(αA) = αⁿ·det(A) &nbsp;&nbsp;(n = סדר המטריצה)</p>
            <p>det(מטריצה משולשית) = מכפלת אלכסון</p>
            <p>det(A C ; 0 B) = det(A)·det(B) &nbsp;&nbsp;(בלוקים)</p>
            <p>A·adj(A) = det(A)·I</p>
            <p>A הפיכה ⟺ det(A) ≠ 0</p>

            <p className="text-yellow-400 font-bold mt-3">═══ הפיכות ═══</p>
            <p>A הפיכה ⟺ det≠0 ⟺ rank=n ⟺ ker=0 ⟺ RREF=I</p>
            <p>(AB)⁻¹ = B⁻¹A⁻¹ &nbsp;&nbsp;(היפוך סדר!)</p>

            <p className="text-yellow-400 font-bold mt-3">═══ מערכות Ax=b ═══</p>
            <p>פתרון יחיד: rank(A) = rank(A|b) = n</p>
            <p>אינסוף: rank(A) = rank(A|b) &lt; n</p>
            <p>אין פתרון: rank(A) &lt; rank(A|b)</p>

            <p className="text-yellow-400 font-bold mt-3">═══ ה&quot;ל ═══</p>
            <p>T חח&quot;ע ⟺ ker(T) = {'{0}'}</p>
            <p>T על ⟺ Im(T) = W</p>
            <p>T(αu + βv) = αT(u) + βT(v)</p>
          </div>
        </Section>
      </div>

      {/* ============================== */}
      {/* EXAM ORDER */}
      {/* ============================== */}
      <Section title="סדר עשיית המבחנים" icon={<Star className="w-5 h-5" />} color="text-red-700">
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-800 mb-2">1. סימולציה 2026 (קודם!)</h3>
            <p className="text-sm text-red-700 mb-2">זה המבחן של המרצים שלך השנה — הכי קרוב למה שיהיה.</p>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Q1:</strong> הגדרת כפל מטריצות (2 נק&apos;) + הוכחת (AB)ᵗ=BᵗAᵗ (15 נק&apos;) + Tr(A²)=0→Tr(A)=0? (8 נק&apos;)</p>
              <p><strong>Q2:</strong> det בלוקים (13 נק&apos;) + הפיכה שמאלית (12 נק&apos;)</p>
              <p><strong>Q3:</strong> מערכת עם α (13 נק&apos;) + Span + א&quot;ת לינארית (12 נק&apos;)</p>
              <p><strong>Q4:</strong> חישוב det 5×5 (11 נק&apos;) + dim(W + Sp{'{u+v}'}) (14 נק&apos;)</p>
              <p><strong>Q5:</strong> (U+W)\U ⊆ W → הוכחה (12 נק&apos;) + row(A+B) ⊆ row A + row B + rank inequality (13 נק&apos;)</p>
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-bold text-orange-800 mb-2">2. מועד א&apos; 2025 (שני)</h3>
            <p className="text-sm text-orange-700 mb-2">מאותם מרצים, שנה קודמת.</p>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Q1:</strong> הגדרת א&quot;ת (2 נק&apos;) + הוכחת שקילות (15 נק&apos;) + (A+B)(A-B) סימטרית? (8 נק&apos;)</p>
              <p><strong>Q2:</strong> הגדרת ker/im (2 נק&apos;) + rank-nullity (15 נק&apos;) + קיום אופרטור ב-R₂[x] (8 נק&apos;)</p>
              <p><strong>Q3:</strong> dim ImT ≤ 1 → T∘T = αT (13 נק&apos;) + מציאת A⁻¹ ב-Z₅ (12 נק&apos;)</p>
              <p><strong>Q4:</strong> מערכת עם a (11 נק&apos;) + dim(U∩W) = n-2 (14 נק&apos;)</p>
              <p><strong>Q5:</strong> שוויון Spans (10 נק&apos;) + rank(AB)=rank(B) כש-A הפיכה (15 נק&apos;)</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
