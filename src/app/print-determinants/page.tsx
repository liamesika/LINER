'use client';

// =============================================
// Print-Friendly Summary: Determinants
// =============================================

function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono bg-gray-100 px-1 rounded text-sm print:bg-transparent">{children}</span>;
}

function Def({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-blue-500 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="text-blue-700">הגדרה:</span> {title}</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Thm({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-green-600 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="text-green-700">משפט:</span> {title}</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Lemma({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-teal-500 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="text-teal-700">למה:</span> {title}</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Claim({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-emerald-500 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="text-emerald-700">טענה:</span> {title}</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Corollary({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-orange-500 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="text-orange-700">מסקנה:</span> {title}</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Proof({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 bg-gray-50 border border-gray-200 rounded p-3 text-sm space-y-2 print:break-inside-avoid print:bg-white print:border-gray-300">
      <div className="font-bold text-gray-700 text-xs mb-1">הוכחה:</div>
      {children}
      <div className="text-left font-bold text-gray-500">&#8718;</div>
    </div>
  );
}

function Remark({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-amber-400 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1 text-amber-700">הערה:</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-bold border-b-2 border-gray-400 pb-1 mt-8 mb-4 print:break-after-avoid">
      {title}
    </h2>
  );
}

// =============================================
// Main Print Page
// =============================================

export default function PrintDeterminantsPage() {
  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; font-size: 11pt; }
          * { box-shadow: none !important; }
          .print-page { padding: 0 !important; max-width: 100% !important; }
          h2 { page-break-after: avoid; }
          .print\\:break-inside-avoid { break-inside: avoid; }
          .print\\:bg-white { background: white !important; }
          .print\\:bg-transparent { background: transparent !important; }
          .print\\:border-gray-300 { border-color: #d1d5db !important; }
          @page { margin: 1.5cm; }
        }
      `}</style>

      <div dir="rtl" className="print-page max-w-4xl mx-auto p-6 bg-white text-black space-y-2">

        {/* Print Button */}
        <div className="no-print flex justify-between items-center mb-4">
          <button
            onClick={() => window.print()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
          >
            הדפס עמוד
          </button>
          <a href="/determinants" className="text-indigo-600 underline text-sm">חזרה לעמוד הרגיל</a>
        </div>

        {/* Header */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-2xl font-bold">סיכום דטרמיננטות — גרסת הדפסה</h1>
          <p className="text-gray-600 mt-1">אלגברה לינארית 1 — הרצאות 20–25</p>
        </div>

        {/* ================================================== */}
        {/* LECTURES 20-21 */}
        {/* ================================================== */}
        <SectionHeader title="הרצאות 20-21: הגדרה אקסיומטית + תכונות" />

        <Remark>
          <p>בהרצאה 20 מתחילים דטרמיננטות בסוף ההרצאה, אחרי חומר על Null space, מרחב עמודות ומרחב שורות.</p>
        </Remark>

        <Claim title="תנאי הפיכות למטריצה 2×2">
          <p>תהי <M>A = (a b ; c d) ∈ M₂(F)</M>.</p>
          <p>A הפיכה אם ורק אם <M>ad - bc ≠ 0_F</M>.</p>
        </Claim>

        <Remark>
          <p><strong>פרשנות גיאומטרית:</strong> עבור <M>F = ℝ</M>, הביטוי <M>|ad - bc|</M> מייצג את שטח המקבילית הנפרשת ע&quot;י שורות המטריצה כוקטורים ב-<M>ℝ²</M>.</p>
          <p>אם השטח = 0, הוקטורים תלויים לינארית ← A לא הפיכה.</p>
        </Remark>

        <Claim title="תכונות פונקציית השטח S למטריצה 2×2">
          <p>עבור <M>S: M₂(ℝ) → ℝ</M> המוגדרת <M>S(a b ; c d) = ad - cb</M>:</p>
          <p>1. <strong>יחס לסקלר בשורה:</strong> <M>S(αV₁, V₂) = α·S(V₁, V₂)</M> וגם <M>S(V₁, αV₂) = α·S(V₁, V₂)</M></p>
          <p>2. <strong>יחס לחיבור וקטורים בשורה:</strong> <M>S(V₁+U₁, V₂) = S(V₁, V₂) + S(U₁, V₂)</M></p>
          <p>3. <strong>יחס לצירופים לינאריים בשורה:</strong> <M>S(αV₁+βU₁, V₂) = α·S(V₁, V₂) + β·S(U₁, V₂)</M></p>
          <p className="font-semibold mt-2">S לינארית בכל שורה באופן נפרד, אבל לא לפי עמודות!</p>
        </Claim>

        <Remark>
          <p><strong>פונקציונל (Functional):</strong> פונקציה <M>f: M_n(F) → F</M> נקראת פורם/פונקציונל.</p>
          <p><strong>מטריצה רגולרית (Regular):</strong> מטריצה הפיכה. <strong>מטריצה סינגולרית (Singular):</strong> מטריצה לא הפיכה.</p>
          <p><strong>תזכורת:</strong> A הפיכה ⟺ <M>A = E₁·...·E_k</M> מכפלת מטריצות אלמנטריות, וכן <M>A⁻¹ = E_k⁻¹·...·E₁⁻¹</M>.</p>
        </Remark>

        <Def title="לינאריות בשורה i">
          <p>תהי <M>Δ: M_n(F) → F</M> פונקציה ויהי <M>1 ≤ i ≤ n</M>.</p>
          <p>נאמר ש-Δ <strong>לינארית בשורה i</strong> אם לכל <M>α, β ∈ F</M>, לכל שורות <M>R₁,...,R_i, R̃_i,...,R_n ∈ M_{'1×n'}(F)</M>:</p>
          <p className="text-center font-mono mt-1">
            α·Δ(R₁ ⋯ R_i ⋯ R_n) + β·Δ(R₁ ⋯ R̃_i ⋯ R_n) = Δ(R₁ ⋯ αR_i+βR̃_i ⋯ R_n)
          </p>
        </Def>

        <Def title="מולטי-לינאריות (Multi-linear)">
          <p>תהי <M>Δ: M_n(F) → F</M> פונקציה.</p>
          <p>נאמר ש-Δ היא <strong>מולטי-לינארית</strong> אם Δ לינארית בכל שורה i באופן נפרד, לכל <M>1 ≤ i ≤ n</M>.</p>
          <p>כלומר, שאר השורות נותרות קבועות ללא שינוי.</p>
        </Def>

        <Claim title="שורת אפסים ← ערך אפס">
          <p>תהי <M>Δ: M_n(F) → F</M> מולטי-לינארית, תהי <M>A ∈ M_n(F)</M> ונניח שיש ב-A שורת אפסים.</p>
          <p>אזי <M>Δ(A) = 0_F</M>.</p>
          <Proof>
            <p>נסמן את שורות A כ-<M>R₁,...,R_n ∈ M_{'1×n'}(F)</M>.</p>
            <p>מכיוון שיש ב-A שורת אפסים, קיים <M>1 ≤ i ≤ n</M> כך ש-<M>R_i = 0_{'1×n'}</M>.</p>
            <p>בלינאריות בשורה i:</p>
            <p className="text-center font-mono">Δ(A) = Δ(R₁ ⋯ 0_{'1×n'} ⋯ R_n) = Δ(R₁ ⋯ 0_F·0_{'1×n'} ⋯ R_n) = 0_F · Δ(R₁ ⋯ 0_{'1×n'} ⋯ R_n) = 0_F</p>
          </Proof>
        </Claim>

        <Def title="מתחלפת (Alternating)">
          <p>תהי <M>Δ: M_n(F) → F</M> פונקציה.</p>
          <p>נאמר ש-Δ <strong>מתחלפת</strong> אם לכל <M>A ∈ M_n(F)</M> כך שב-A יש שתי שורות זהות, מתקיים <M>Δ(A) = 0_F</M>.</p>
        </Def>

        <Def title="פונקציית דטרמיננטה">
          <p>תהי <M>Δ: M_n(F) → F</M> פונקציה. Δ היא <strong>פונקציית דטרמיננטה</strong> (פונקציית נפח מכוונת) אם ורק אם:</p>
          <p>1. Δ מולטי-לינארית</p>
          <p>2. Δ מתחלפת</p>
          <p>3. <M>Δ(I_n) = 1_F</M></p>
        </Def>

        <Thm title="משפט (*) — השפעת פעולות שורה אלמנטריות">
          <p>תהי <M>Δ: M_n(F) → F</M> פונקציה <strong>מולטי-לינארית ומתחלפת</strong>.</p>
          <p>תהיינה <M>A, B ∈ M_n(F)</M>, ונניח ש-B מתקבלת ע&quot;י ביצוע פעולת שורה אלמנטרית אחת על A.</p>
          <p className="mt-2"><strong>1.</strong> אם <M>A →(R_i → c·R_i, c ≠ 0_F)→ B</M>, אזי <M>Δ(B) = c · Δ(A)</M>.</p>
          <p><strong>2.</strong> אם <M>A →(R_i ↔ R_j, i ≠ j)→ B</M>, אזי <M>Δ(B) = −Δ(A)</M>.</p>
          <p><strong>3.</strong> אם <M>A →(R_i → R_i + αR_j, i ≠ j)→ B</M>, אזי <M>Δ(B) = Δ(A)</M>.</p>
          <Proof>
            <p>נסמן את שורות A כ-<M>R₁,...,R_n ∈ M_{'1×n'}(F)</M>.</p>
            <p><strong>חלק 1:</strong> יהי <M>1 ≤ i ≤ n</M> ונסמן <M>c ∈ F\{'{0_F}'}</M>.</p>
            <p>B מתקבלת מ-A ע&quot;י <M>R_i → c·R_i</M>. בלינאריות בשורה i:</p>
            <p className="text-center font-mono">Δ(B) = Δ(R₁ ⋯ c·R_i ⋯ R_n) = c · Δ(R₁ ⋯ R_i ⋯ R_n) = c · Δ(A)</p>

            <p className="mt-3"><strong>חלק 2:</strong> יהיו <M>1 ≤ i,j ≤ n</M>, <M>i ≠ j</M>. בה&quot;כ נניח <M>i {'<'} j</M>.</p>
            <p>מכיוון ש-Δ מתחלפת:</p>
            <p className="text-center font-mono">Δ(R₁ ⋯ R_i+R_j ⋯ R_i+R_j ⋯ R_n) = 0_F</p>
            <p>בפיתוח לינארי בשורה i ואח&quot;כ בשורה j:</p>
            <p className="text-center font-mono">= Δ(⋯R_i⋯R_i⋯) + Δ(⋯R_i⋯R_j⋯) + Δ(⋯R_j⋯R_i⋯) + Δ(⋯R_j⋯R_j⋯)</p>
            <p className="text-center font-mono">= 0 + Δ(A) + Δ(B) + 0 = 0_F</p>
            <p>ולכן <M>Δ(B) = −Δ(A)</M>.</p>

            <p className="mt-3"><strong>חלק 3:</strong> יהיו <M>1 ≤ i,j ≤ n</M>, <M>i ≠ j</M>, ויהי <M>α ∈ F</M>.</p>
            <p className="text-center font-mono">Δ(B) = Δ(R₁ ⋯ R_i+αR_j ⋯ R_j ⋯ R_n)</p>
            <p>בלינאריות בשורה i:</p>
            <p className="text-center font-mono">= Δ(R₁⋯R_i⋯R_j⋯R_n) + α·Δ(R₁⋯R_j⋯R_j⋯R_n) = Δ(A) + α·0 = Δ(A)</p>
          </Proof>
        </Thm>

        <Corollary title="מסקנה 1 — שקילות אפס תחת פעולות שורה">
          <p>תהי <M>Δ: M_n(F) → F</M> מולטי-לינארית ומתחלפת.</p>
          <p>תהיינה <M>A, B ∈ M_n(F)</M>, ונניח ש-B מתקבלת מ-A בפעולת שורה אלמנטרית אחת.</p>
          <p>אזי <M>Δ(A) = 0_F</M> אם ורק אם <M>Δ(B) = 0_F</M>.</p>
        </Corollary>

        <Corollary title="מסקנה 2 — שקילות אפס למטריצות שקולות שורה">
          <p>תהי <M>Δ: M_n(F) → F</M> מולטי-לינארית ומתחלפת.</p>
          <p>תהיינה <M>A, B ∈ M_n(F)</M> שקולות שורה. אזי <M>Δ(A) = 0_F</M> אם ורק אם <M>Δ(B) = 0_F</M>.</p>
        </Corollary>

        <Claim title="A לא הפיכה ← Δ(A) = 0">
          <p>תהי <M>Δ: M_n(F) → F</M> מולטי-לינארית ומתחלפת.</p>
          <p>תהי <M>A ∈ M_n(F)</M> ונניח ש-A <strong>לא הפיכה</strong>.</p>
          <p>אזי <M>Δ(A) = 0_F</M>.</p>
          <Proof>
            <p>תהי <M>C ∈ M_n(F)</M> הצורה הקנונית של A.</p>
            <p>מכיוון ש-A לא הפיכה, ב-C יש שורת אפסים.</p>
            <p>מכיוון ש-Δ מולטי-לינארית: <M>Δ(C) = 0_F</M>.</p>
            <p>מכיוון ש-Δ מולטי-לינארית ומתחלפת, ו-A,C שקולות שורה (מסקנה 2):</p>
            <p className="text-center font-mono">Δ(A) = 0_F ⟺ Δ(C) = 0_F</p>
            <p>לכן <M>Δ(A) = 0_F</M>.</p>
          </Proof>
        </Claim>

        <Claim title="Δ דטרמיננטה ו-A הפיכה ← Δ(A) ≠ 0">
          <p>תהי <M>Δ: M_n(F) → F</M> <strong>פונקציית דטרמיננטה</strong> (מולטי-לינארית, מתחלפת, <M>Δ(I_n) = 1_F</M>).</p>
          <p>תהי <M>A ∈ M_n(F)</M> ונניח ש-A <strong>הפיכה</strong>.</p>
          <p>אזי <M>Δ(A) ≠ 0_F</M>.</p>
          <Proof>
            <p><strong>(⟸)</strong> מהטענה הקודמת.</p>
            <p><strong>(⟹)</strong> נניח ש-A הפיכה. תהי <M>C ∈ M_n(F)</M> הצורה הקנונית.</p>
            <p>מכיוון ש-A הפיכה: <M>C = I_n</M>.</p>
            <p>ולכן <M>Δ(C) = Δ(I_n) = 1_F</M>.</p>
            <p>מכיוון ש-A,C שקולות שורה, ונקבל ממסקנה 2: <M>Δ(A) ≠ 0_F</M>.</p>
          </Proof>
        </Claim>

        {/* ================================================== */}
        {/* LECTURE 22 */}
        {/* ================================================== */}
        <SectionHeader title="הרצאה 22: משפטים חשובים — det(AB), det(Aᵗ), יחידות" />

        <Lemma title="למה 1 — Δ(EA) = Δ(E)·Δ(A)">
          <p>תהי <M>Δ: M_n(F) → F</M> פונקציית דטרמיננטה.</p>
          <p>תהיינה <M>A, E ∈ M_n(F)</M>, ונניח ש-E מטריצה אלמנטרית.</p>
          <p>אזי <M>Δ(EA) = Δ(E) · Δ(A)</M>.</p>
          <Proof>
            <p>נסתכל על 3 מקרים:</p>
            <p><strong>1.</strong> <M>I_n →(R_i → c·R_i)→ E</M>:</p>
            <p>במקרה זה <M>A →(R_i → c·R_i)→ EA</M>.</p>
            <p>לפי משפט (*): <M>Δ(EA) = c · Δ(A)</M>.</p>
            <p>כמו כן: <M>Δ(E) = c · Δ(I_n) = c · 1_F = c</M>.</p>
            <p>ולכן: <M>Δ(EA) = c · Δ(A) = Δ(E) · Δ(A)</M>.</p>
            <p className="mt-2"><strong>2.</strong> <M>I_n →(R_i ↔ R_j)→ E</M>:</p>
            <p>לפי משפט (*): <M>Δ(E) = −Δ(I_n) = −1_F</M>.</p>
            <p>וגם: <M>Δ(EA) = −Δ(A) = −1_F · Δ(A) = Δ(E) · Δ(A)</M>.</p>
            <p className="mt-2"><strong>3.</strong> <M>I_n →(R_i → R_i + αR_j)→ E</M>:</p>
            <p>לפי משפט (*): <M>Δ(E) = Δ(I_n) = 1_F</M>.</p>
            <p>וגם: <M>Δ(EA) = Δ(A) = 1_F · Δ(A) = Δ(E) · Δ(A)</M>.</p>
          </Proof>
        </Lemma>

        <Thm title="משפט חשוב 1 — det(AB) = det(A)·det(B)">
          <p>תהי <M>Δ: M_n(F) → F</M> פונקציית דטרמיננטה.</p>
          <p>תהיינה <M>A, B ∈ M_n(F)</M>.</p>
          <p>אזי <M>Δ(AB) = Δ(A) · Δ(B)</M>.</p>
          <Proof>
            <p><strong>מקרה 1:</strong> A לא הפיכה.</p>
            <p>אזי AB לא הפיכה (כי אם AB היתה הפיכה אז A היתה הפיכה — סתירה), ולכן:</p>
            <p className="text-center font-mono">Δ(AB) = 0_F = 0_F · Δ(B) = Δ(A) · Δ(B)</p>

            <p className="mt-2"><strong>מקרה 2:</strong> A הפיכה.</p>
            <p>אזי ניתן לייצג את A כמכפלת מטריצות אלמנטריות:</p>
            <p className="text-center font-mono">A = E₁ · ... · E_k</p>
            <p>כך ש:</p>
            <p className="text-center font-mono">Δ(AB) = Δ(E₁·...·E_k·B)</p>
            <p>שימוש חוזר בלמה 1:</p>
            <p className="text-center font-mono">= Δ(E₁)·...·Δ(E_k)·Δ(B)</p>
            <p>שימוש חוזר בלמה 1 שוב:</p>
            <p className="text-center font-mono">= Δ(E₁·...·E_k)·Δ(B) = Δ(A)·Δ(B)</p>
          </Proof>
        </Thm>

        <Corollary title="מסקנה — det(A⁻¹) = (det(A))⁻¹">
          <p>תהי <M>Δ: M_n(F) → F</M> פונקציית דטרמיננטה.</p>
          <p>תהי <M>A ∈ M_n(F)</M> ונניח ש-A הפיכה.</p>
          <p>אזי <M>Δ(A⁻¹) = (Δ(A))⁻¹</M>.</p>
          <Proof>
            <p>ממשפט חשוב 1:</p>
            <p className="text-center font-mono">Δ(A) · Δ(A⁻¹) = Δ(A·A⁻¹) = Δ(I_n) = 1_F</p>
            <p>ולכן <M>(Δ(A))⁻¹ = Δ(A⁻¹)</M>, שהרי Δ(A) ≠ 0 כי A הפיכה.</p>
          </Proof>
        </Corollary>

        <Lemma title="למה 2 — Δ(Eᵗ) = Δ(E) עבור E אלמנטרית">
          <p>תהי <M>Δ: M_n(F) → F</M> פונקציית דטרמיננטה.</p>
          <p>תהי <M>E ∈ M_n(F)</M> מטריצה אלמנטרית.</p>
          <p>אזי <M>Δ(Eᵗ) = Δ(E)</M>.</p>
          <Proof>
            <p>נסתכל על 3 מקרים:</p>
            <p><strong>1.</strong> <M>I_n →(R_i → c·R_i)→ E</M>: במקרה זה <M>Eᵗ = E</M>, ולכן <M>Δ(Eᵗ) = Δ(E)</M>.</p>
            <p><strong>2.</strong> <M>I_n →(R_i ↔ R_j)→ E</M>: במקרה זה <M>Eᵗ = E</M>, ולכן <M>Δ(Eᵗ) = Δ(E)</M>.</p>
            <p><strong>3.</strong> <M>I_n →(R_i → R_i + αR_j)→ E</M>: במקרה זה <M>Eᵗ</M> היא פ&quot;ש מסוג <M>R_j → R_j + αR_i</M>.</p>
            <p>לפי משפט (*): <M>Δ(Eᵗ) = Δ(I_n) = 1_F = Δ(E)</M>.</p>
          </Proof>
        </Lemma>

        <Thm title="משפט חשוב 2 — det(Aᵗ) = det(A)">
          <p>תהי <M>Δ: M_n(F) → F</M> פונקציית דטרמיננטה.</p>
          <p>תהי <M>A ∈ M_n(F)</M>.</p>
          <p>אזי <M>Δ(Aᵗ) = Δ(A)</M>.</p>
          <Proof>
            <p><strong>מקרה 1:</strong> A לא הפיכה → Aᵗ לא הפיכה, ולכן <M>Δ(A) = 0_F = Δ(Aᵗ)</M>.</p>
            <p><strong>מקרה 2:</strong> A הפיכה → <M>A = E₁·...·E_k</M> (מכפלת אלמנטריות).</p>
            <p className="text-center font-mono">Δ(Aᵗ) = Δ((E₁·...·E_k)ᵗ) = Δ(E_kᵗ·...·E₁ᵗ)</p>
            <p>לפי משפט חשוב 1:</p>
            <p className="text-center font-mono">= Δ(E_kᵗ)·...·Δ(E₁ᵗ)</p>
            <p>לפי למה 2:</p>
            <p className="text-center font-mono">= Δ(E_k)·...·Δ(E₁)</p>
            <p>קומוטטיביות ב-F:</p>
            <p className="text-center font-mono">= Δ(E₁)·...·Δ(E_k)</p>
            <p>לפי משפט חשוב 1:</p>
            <p className="text-center font-mono">= Δ(E₁·...·E_k) = Δ(A)</p>
          </Proof>
        </Thm>

        <Lemma title="למה 3 — שוויון על אלמנטריות">
          <p>תהיינה <M>Δ, Δ̃: M_n(F) → F</M> פונקציות דטרמיננטה.</p>
          <p>תהי <M>E ∈ M_n(F)</M> מטריצה אלמנטרית.</p>
          <p>אזי <M>Δ(E) = Δ̃(E)</M>.</p>
          <Proof>
            <p>נסתכל על 3 מקרים:</p>
            <p><strong>1.</strong> <M>I_n →(R_i → c·R_i)→ E</M>: <M>Δ(E) = c · Δ(I_n) = c · 1_F = c · Δ̃(I_n) = Δ̃(E)</M>.</p>
            <p><strong>2.</strong> <M>I_n →(R_i ↔ R_j)→ E</M>: <M>Δ(E) = −Δ(I_n) = −1_F = −Δ̃(I_n) = Δ̃(E)</M>.</p>
            <p><strong>3.</strong> <M>I_n →(R_i → R_i+αR_j)→ E</M>: <M>Δ(E) = Δ(I_n) = 1_F = Δ̃(I_n) = Δ̃(E)</M>.</p>
          </Proof>
        </Lemma>

        <Thm title="משפט חשוב 3 — יחידות פונקציית הדטרמיננטה">
          <p>תהיינה <M>Δ, Δ̃: M_n(F) → F</M> פונקציות דטרמיננטה.</p>
          <p>אזי <M>Δ = Δ̃</M>.</p>
          <Proof>
            <p>נוכיח שלכל <M>A ∈ M_n(F)</M> מתקיים <M>Δ(A) = Δ̃(A)</M>.</p>
            <p>תהי <M>A ∈ M_n(F)</M>.</p>
            <p>אם A לא הפיכה: <M>Δ(A) = 0_F = Δ̃(A)</M>.</p>
            <p>אם A הפיכה: <M>A = E₁·...·E_k</M> (אלמנטריות), כך ש:</p>
            <p className="text-center font-mono">Δ(A) = Δ(E₁·...·E_k) = Δ(E₁)·...·Δ(E_k)</p>
            <p>לפי למה 3:</p>
            <p className="text-center font-mono">= Δ̃(E₁)·...·Δ̃(E_k) = Δ̃(E₁·...·E_k) = Δ̃(A)</p>
          </Proof>
        </Thm>

        <Thm title="משפט — קיום פונקציית דטרמיננטה">
          <p>לכל <M>n ∈ ℕ</M>, קיימת פונקציית דטרמיננטה <M>Δ_n: M_n(F) → F</M>.</p>
          <p className="text-gray-600">(ההוכחה בהרצאה הבאה — באמצעות הגדרה רקורסיבית)</p>
        </Thm>

        {/* ================================================== */}
        {/* LECTURE 23 */}
        {/* ================================================== */}
        <SectionHeader title="הרצאה 23: הגדרה רקורסיבית + פיתוח" />

        <Def title="הדטרמיננטה של A — סימון">
          <p>תהי <M>A ∈ M_n(F)</M>. <strong>הדטרמיננטה של A</strong> מוגדרת להיות <M>det(A) = Δ_n(A)</M>,</p>
          <p>כאשר <M>Δ_n</M> היא פונקציית הדטרמיננטה היחידה על <M>M_n(F)</M>.</p>
          <p>סימון נוסף לדטרמיננטה: <M>|A|</M>.</p>
        </Def>

        <Remark>
          <p><M>det: M₂(F) → F</M> היא פונקציית הדטרמיננטה המוכרת: <M>det(a b ; c d) = ad − bc</M>.</p>
        </Remark>

        <Def title="מינור (Minor) — M_ij^(A)">
          <p>תהי <M>A ∈ M_n(F)</M> ויהיו <M>1 ≤ i, j ≤ n</M>.</p>
          <p><strong>המינור ה-ij של A</strong>, מסומן <M>M_ij^(A)</M> (ij&apos;th minor), הוא <strong>הדטרמיננטה של המטריצה מסדר (n−1)×(n−1)</strong> המתקבלת ע&quot;י מחיקת שורה i ועמודה j מ-A.</p>
        </Def>

        <Def title="הגדרה רקורסיבית של det (פיתוח לפי עמודה 1)">
          <p>לכל <M>n ∈ ℕ</M> נגדיר <M>det: M_n(F) → F</M> בצורה הבאה:</p>
          <p><strong>1.</strong> לכל <M>(a) ∈ M₁(F)</M> נגדיר: <M>det(a) = a</M>.</p>
          <p><strong>2.</strong> לכל <M>2 ≤ n ∈ ℕ</M>, ולכל <M>A ∈ M_n(F)</M> נגדיר:</p>
          <p className="text-center font-mono text-base mt-1">
            det(A) = Σᵢ₌₁ⁿ (−1_F)^(i+1) · [A]_{'{i1}'} · M_{'{i1}'}^(A)
          </p>
          <p className="text-gray-600 mt-1">(המינור הוא קופקטור האיבר בשורה i, עמודה 1. הסימן מתחלף: +, −, +, −, ...)</p>
        </Def>

        <Claim title="det מולטי-לינארית">
          <p>לכל <M>n ∈ ℕ</M>, הפונקציה <M>det: M_n(F) → F</M> היא מולטי-לינארית.</p>
          <Proof>
            <p>נוכיח ש-det לינארית בשורה הראשונה (ההוכחה לשאר השורות דומה).</p>
            <p><strong>בסיס האינדוקציה (n=1):</strong> <M>det(αa + βã) = αa + βã = α·det(a) + β·det(ã)</M>.</p>
            <p><strong>צעד האינדוקציה (n ≥ 2):</strong> נניח שהפונקציה <M>det: M_{'{n-1}'}(F) → F</M> לינארית בשורה 1.</p>
            <p>נוכיח ש-<M>det: M_n(F) → F</M> לינארית בשורה 1.</p>
            <p>תהיינה A, B ∈ M_n(F) שונות רק בשורה 1, נסמן C את המטריצה עם <M>αR₁+βR̃₁</M> בשורה הראשונה.</p>
            <p className="text-center font-mono">det(C) = Σᵢ₌₁ⁿ (−1)^(i+1) [C]_{'{i1}'} · M_{'{i1}'}^(C)</p>
            <p>עבור i=1: <M>[C]_{'{11}'} = αa₁₁ + βã₁₁</M> ו-<M>M_{'{11}'}^(C) = M_{'{11}'}^(A)</M>.</p>
            <p>עבור i≥2: <M>[C]_{'{i1}'} = [A]_{'{i1}'}</M> ו-<M>M_{'{i1}'}^(C) = α·M_{'{i1}'}^(A) + β·M_{'{i1}'}^(B)</M> (מהנחת האינדוקציה).</p>
            <p>פיתוח ופישוט נותן: <M>det(C) = α·det(A) + β·det(B)</M>.</p>
          </Proof>
        </Claim>

        <Claim title="det מתחלפת">
          <p>לכל <M>2 ≤ n ∈ ℕ</M>, הפונקציה <M>det: M_n(F) → F</M> מתחלפת.</p>
          <Proof>
            <p>נוכיח באינדוקציה על n.</p>
            <p><strong>בסיס (n=2):</strong> הוכחנו בהרצאה 21 ש-<M>det(a b ; a b) = ab − ab = 0</M>.</p>
            <p><strong>צעד (n ≥ 3):</strong> נניח ש-<M>det: M_{'{n-1}'}(F) → F</M> מתחלפת.</p>
            <p>תהי A עם שתי שורות זהות: <M>R_l = R_k</M> כאשר <M>1 ≤ l {'<'} k ≤ n</M>.</p>
            <p>נחשב <M>det(A) = Σᵢ₌₁ⁿ (−1)^(i+1) [A]_{'{i1}'} · M_{'{i1}'}^(A)</M>.</p>
            <p>לכל <M>i ≠ l</M> וגם <M>i ≠ k</M>: כשמוחקים שורה i ועמודה 1, המטריצה (n-1)×(n-1) עדיין מכילה 2 שורות זהות. מהנחת האינדוקציה: <M>M_{'{i1}'}^(A) = 0_F</M>.</p>
            <p>נשארים רק 2 איברים (i=l ו-i=k) עם <M>[A]_{'{l1}'} = [A]_{'{k1}'}</M>.</p>
            <p>מראים ש-<M>M_{'{k1}'}^(A) = (−1)^(k−l−1) · M_{'{l1}'}^(A)</M> (ע&quot;י k−l−1 החלפות שורה).</p>
            <p>ובסיכום: <M>(−1)^(l+1)·M_{'{l1}'} + (−1)^(k+1)·(−1)^(k−l−1)·M_{'{l1}'} = (−1)^(l+1)·M_{'{l1}'}·[1+(−1)^(2k−2l−1)] = 0</M>.</p>
          </Proof>
        </Claim>

        <Claim title="מטריצה משולשית — det = מכפלת האלכסון">
          <p>תהי <M>A ∈ M_n(F)</M> ונניח ש-A <strong>משולשית עליונה</strong> (upper triangular).</p>
          <p>אזי <M>det(A) = [A]₁₁ · [A]₂₂ · ... · [A]_nn</M>.</p>
          <Proof>
            <p>באינדוקציה על n. עבור n=1: <M>det(a) = a = [A]₁₁</M>.</p>
            <p>עבור n ≥ 2: מכיוון ש-A משולשית עליונה, <M>[A]_{'{i1}'} = 0_F</M> לכל <M>2 ≤ i ≤ n</M>.</p>
            <p>לכן <M>det(A) = [A]₁₁ · M₁₁^(A)</M>.</p>
            <p>המטריצה שנותרת גם משולשית עליונה מסדר (n-1), ולפי הנחת האינדוקציה:</p>
            <p className="text-center font-mono">M₁₁^(A) = [A]₂₂ · ... · [A]_nn</p>
            <p>ולכן <M>det(A) = [A]₁₁ · [A]₂₂ · ... · [A]_nn</M>.</p>
          </Proof>
        </Claim>

        <Corollary title="מסקנה — det(I_n) = 1_F">
          <p>לכל <M>n ∈ ℕ</M> מתקיים <M>det(I_n) = 1_F</M>.</p>
          <Proof>
            <p>יהי <M>n ∈ ℕ</M>. המטריצה <M>I_n</M> היא משולשית עליונה, ולפי המשפט הקודם:</p>
            <p className="text-center font-mono">det(I_n) = 1_F · ... · 1_F = 1_F</p>
          </Proof>
        </Corollary>

        <Def title="מטריצה משולשית (עליונה / תחתונה)">
          <p>תהי <M>A ∈ M_n(F)</M>.</p>
          <p>A היא <strong>משולשית עליונה</strong> (upper triangular) אם <M>[A]_ij = 0_F</M> לכל <M>1 ≤ j {'<'} i ≤ n</M>.</p>
          <p>A היא <strong>משולשית תחתונה</strong> (lower triangular) אם <M>[A]_ij = 0_F</M> לכל <M>1 ≤ i {'<'} j ≤ n</M>.</p>
          <p>A היא <strong>משולשית</strong> אם היא משולשית עליונה או משולשית תחתונה.</p>
        </Def>

        <Corollary title="מסקנה — פיתוח לפי עמודה j">
          <p>יהי <M>2 ≤ n ∈ ℕ</M> ויהי <M>1 ≤ j ≤ n</M>.</p>
          <p>אזי לכל <M>A ∈ M_n(F)</M> מתקיים:</p>
          <p className="text-center font-mono text-base mt-1">
            det(A) = Σᵢ₌₁ⁿ (−1)^(i+j) · [A]_ij · M_ij^(A)
          </p>
        </Corollary>

        <Corollary title="מסקנה — פיתוח לפי שורה i">
          <p>יהי <M>2 ≤ n ∈ ℕ</M> ויהי <M>1 ≤ i ≤ n</M>.</p>
          <p>אזי לכל <M>A ∈ M_n(F)</M> מתקיים:</p>
          <p className="text-center font-mono text-base mt-1">
            det(A) = Σⱼ₌₁ⁿ (−1)^(i+j) · [A]_ij · M_ij^(A)
          </p>
          <Proof>
            <p>נובע ישירות מ-<M>det(A) = det(Aᵗ)</M>.</p>
            <p>פיתוח <M>det(Aᵗ)</M> לפי עמודה i: <M>det(Aᵗ) = Σⱼ (−1)^(j+i) [Aᵗ]_ji · M_ji^(Aᵗ)</M>.</p>
            <p>מכיוון ש-<M>[Aᵗ]_ji = [A]_ij</M> ו-<M>M_ji^(Aᵗ) = M_ij^(A)</M>, נקבל את הנוסחה.</p>
          </Proof>
        </Corollary>

        <Remark>
          <p><strong>כלל סרוס (Sarrus) — עבור 3×3 בלבד:</strong></p>
          <p>עבור <M>A = (a b c ; d e f ; g h i) ∈ M₃(F)</M>:</p>
          <p className="text-center font-mono">det(A) = aei + bfg + cdh − afh − bdi − ceg</p>
          <p className="font-semibold mt-1">שיטת סרוס עובדת רק על 3×3! לא על 4×4 ומעלה.</p>
        </Remark>

        {/* ================================================== */}
        {/* LECTURE 24 */}
        {/* ================================================== */}
        <SectionHeader title="הרצאה 24: בלוקים + מטריצה מצורפת" />

        <Def title="מטריצת בלוקים (Block Matrix)">
          <p>תהיינה <M>A ∈ M_n(F)</M>, <M>B ∈ M_m(F)</M>, <M>C ∈ M_{'{n×m}'}(F)</M>, <M>D ∈ M_{'{m×n}'}(F)</M>.</p>
          <p>נסתכל על המטריצה <M>K ∈ M_{'{n+m}'}(F)</M> במבנה הבא:</p>
          <p className="text-center font-mono text-base mt-1">K = (A C ; D B)</p>
          <p>1. K נקראת <strong>מטריצת בלוקים משולשית עליונה</strong> אם <M>D = 0_{'{m×n}'}</M>, כלומר <M>K = (A C ; 0 B)</M>.</p>
          <p>2. K נקראת <strong>מטריצת בלוקים משולשית תחתונה</strong> אם <M>C = 0_{'{n×m}'}</M>, כלומר <M>K = (A 0 ; D B)</M>.</p>
          <p>3. K נקראת <strong>מטריצת בלוקים אלכסונית</strong> אם <M>C = 0_{'{n×m}'}</M> ו-<M>D = 0_{'{m×n}'}</M>.</p>
        </Def>

        <Claim title="דטרמיננטת בלוקים משולשית עליונה">
          <p>תהיינה <M>A ∈ M_n(F)</M>, <M>B ∈ M_m(F)</M>, <M>C ∈ M_{'{n×m}'}(F)</M>.</p>
          <p>ותהי <M>K = (A C ; 0_{'{m×n}'} B) ∈ M_{'{n+m}'}(F)</M> מטריצת בלוקים משולשית עליונה.</p>
          <p>אזי <M>det(K) = det(A) · det(B)</M>.</p>
          <Proof>
            <p>נוכיח באינדוקציה על <M>n+m</M>.</p>
            <p><strong>בסיס (n=1, m=1):</strong> <M>K = (a c ; 0 b)</M>, ואכן <M>det(K) = ab − 0·c = ab = det(A)·det(B)</M>.</p>
            <p><strong>צעד:</strong> נניח שהטענה נכונה לסדר n+m−1.</p>
            <p>נפתח את det(K) לפי עמודה 1. מכיוון ש-<M>[K]_{'{i1}'} = 0_F</M> לכל <M>i {'>'} n</M>:</p>
            <p className="text-center font-mono">det(K) = Σᵢ₌₁ⁿ (−1)^(i+1) [A]_{'{i1}'} · M_{'{i1}'}^(K)</p>
            <p>לכל <M>1 ≤ i ≤ n</M>: <M>[K]_{'{i1}'} = [A]_{'{i1}'}</M> ו-<M>M_{'{i1}'}^(K) = M_{'{i1}'}^(A) · det(B)</M> (מהנחת האינדוקציה).</p>
            <p>ולכן:</p>
            <p className="text-center font-mono">det(K) = (Σᵢ₌₁ⁿ (−1)^(i+1) [A]_{'{i1}'} · M_{'{i1}'}^(A)) · det(B) = det(A) · det(B)</p>
          </Proof>
        </Claim>

        <Corollary title="מסקנה — בלוקים משולשית תחתונה">
          <p>תהיינה <M>A ∈ M_n(F)</M>, <M>B ∈ M_m(F)</M>, <M>D ∈ M_{'{m×n}'}(F)</M>.</p>
          <p>ותהי <M>K = (A 0_{'{n×m}'} ; D B) ∈ M_{'{n+m}'}(F)</M>.</p>
          <p>אזי <M>det(K) = det(A) · det(B)</M>.</p>
          <Proof>
            <p className="text-center font-mono">det(K) = det(Kᵗ) = det(Aᵗ 0 ; Dᵗ Bᵗ) = det(Aᵗ) · det(Bᵗ) = det(A) · det(B)</p>
          </Proof>
        </Corollary>

        <Def title="מטריצה מצורפת (Adjoint) — adj(A)">
          <p>תהי <M>A ∈ M_n(F)</M>.</p>
          <p><strong>המטריצה המצורפת של A</strong>, מסומנת <M>adj(A) ∈ M_n(F)</M>, מוגדרת באופן הבא:</p>
          <p className="text-center font-mono text-base mt-1">
            [adj(A)]_ij = (−1_F)^(i+j) · M_ji^(A)
          </p>
          <p>לכל <M>1 ≤ i, j ≤ n</M>.</p>
          <p className="text-gray-600 mt-1">(שימו לב: M_ji ולא M_ij — יש שחלוף של האינדקסים!)</p>
        </Def>

        <Remark>
          <p><strong>דוגמה 2×2:</strong> עבור <M>A = (a b ; c d) ∈ M₂(F)</M>:</p>
          <p className="text-center font-mono">adj(A) = (d −b ; −c a)</p>
        </Remark>

        <Claim title="A · adj(A) = det(A) · I_n">
          <p>תהי <M>A ∈ M_n(F)</M>.</p>
          <p>אזי <M>A · adj(A) = adj(A) · A = det(A) · I_n</M>.</p>
          <Proof>
            <p>נוכיח ש-<M>A · adj(A) = det(A) · I_n</M> (ובאופן דומה adj(A)·A).</p>
            <p>מספיק ונוכיח 2 מקרים:</p>
            <p><strong>1. לכל <M>1 ≤ i ≤ n</M> (אלכסון):</strong></p>
            <p className="text-center font-mono">[A · adj(A)]_ii = Σₖ₌₁ⁿ [A]_ik · [adj(A)]_ki = Σₖ₌₁ⁿ [A]_ik · (−1)^(k+i) · M_ik^(A)</p>
            <p>זהו בדיוק פיתוח לפי שורה i: <M>= det(A)</M>.</p>
            <p className="mt-2"><strong>2. לכל <M>i ≠ j</M> (מחוץ לאלכסון):</strong></p>
            <p className="text-center font-mono">[A · adj(A)]_ij = Σₖ₌₁ⁿ [A]_ik · (−1)^(k+j) · M_jk^(A)</p>
            <p>נסתכל על המטריצה B שמתקבלת מ-A ע&quot;י החלפת שורה j בשורה i.</p>
            <p>ב-B יש 2 שורות זהות (i ו-j), ולכן <M>det(B) = 0_F</M>.</p>
            <p>פיתוח det(B) לפי שורה j: <M>det(B) = Σₖ (−1)^(k+j) [B]_jk · M_jk^(B)</M>.</p>
            <p>מכיוון ש-<M>[B]_jk = [A]_ik</M> ו-<M>M_jk^(B) = M_jk^(A)</M>:</p>
            <p className="text-center font-mono">[A · adj(A)]_ij = det(B) = 0_F</p>
          </Proof>
        </Claim>

        <Corollary title="מסקנה 1 — נוסחת ההופכי דרך adj">
          <p>תהי <M>A ∈ M_n(F)</M> <strong>מטריצה הפיכה</strong>.</p>
          <p>אזי:</p>
          <p className="text-center font-mono text-base mt-1">A⁻¹ = adj(A) / det(A)</p>
          <Proof>
            <p>מהטענה הקודמת: <M>A · adj(A) = det(A) · I_n</M>.</p>
            <p>מכיוון ש-A הפיכה: <M>det(A) ≠ 0_F</M>.</p>
            <p>לכן <M>A · (adj(A)/det(A)) = I_n</M>, כלומר <M>A⁻¹ = adj(A)/det(A)</M>.</p>
          </Proof>
        </Corollary>

        <Corollary title="מסקנה 2 — A לא הפיכה">
          <p>תהי <M>A ∈ M_n(F)</M> <strong>לא הפיכה</strong>.</p>
          <p>אזי <M>A · adj(A) = adj(A) · A = O_n</M> (מטריצת האפס).</p>
          <Proof>
            <p>מהטענה הקודמת: <M>A · adj(A) = det(A) · I_n</M>.</p>
            <p>מכיוון ש-<M>det(A) = 0_F</M>: <M>A · adj(A) = 0_F · I_n = O_n</M>.</p>
          </Proof>
        </Corollary>

        {/* ================================================== */}
        {/* LECTURE 25 */}
        {/* ================================================== */}
        <SectionHeader title="הרצאה 25: כלל קרמר" />

        <Thm title="משפט — כלל קרמר (Cramer's Rule)">
          <p>תהי <M>A ∈ M_n(F)</M> ונניח ש-A <strong>הפיכה</strong>.</p>
          <p>יהי <M>b⃗ ∈ Fⁿ</M> ונסתכל על המערכת <M>Ax⃗ = b⃗</M>.</p>
          <p>נסמן ב-<M>x⃗ = (x₁, ..., x_n)ᵗ ∈ Fⁿ</M> את הפתרון היחיד למערכת (<M>x⃗ = A⁻¹b⃗</M>).</p>
          <p className="mt-2">אזי לכל <M>1 ≤ j ≤ n</M>:</p>
          <p className="text-center font-mono text-base mt-1">
            x_j = det(A_j) / det(A)
          </p>
          <p className="mt-1">כאשר <M>A_j</M> היא המטריצה המתקבלת מ-A ע&quot;י <strong>החלפת עמודה j ב-b⃗</strong>.</p>
          <p className="font-mono text-sm">A_j = (a⃗₁ ⋯ a⃗_{'{j-1}'} b⃗ a⃗_{'{j+1}'} ⋯ a⃗_n)</p>
          <Proof>
            <p>יהי <M>1 ≤ j ≤ n</M>. נוכיח ש-<M>x_j = (det A)⁻¹ · det A_j</M>.</p>
            <p>מתחילה, מכיוון ש-A הפיכה, <M>det A ≠ 0_F</M> ולכן <M>(det A)⁻¹ ∈ F</M>.</p>
            <p>והביטוי <M>(det A)⁻¹ · det A_j</M> מוגדר.</p>
            <p className="mt-2"><M>x⃗ = A⁻¹b⃗ = (det A)⁻¹ · adj(A) · b⃗</M></p>
            <p className="mt-1"><M>x_j = [x⃗]_{'{j1}'} = [(det A)⁻¹ · adj(A) · b⃗]_{'{j1}'}</M></p>
            <p><M>= (det A)⁻¹ · [adj(A) · b⃗]_{'{j1}'}</M></p>
            <p><M>= (det A)⁻¹ · Σₖ₌₁ⁿ [adj(A)]_{'{jk}'} · [b⃗]_{'{k1}'}</M></p>
            <p>הגדרת ה-adjoint: <M>[adj(A)]_{'{jk}'} = (−1)^(j+k) · M_{'{kj}'}^(A)</M>.</p>
            <p><M>= (det A)⁻¹ · Σₖ₌₁ⁿ (−1)^(j+k) · M_{'{kj}'}^(A) · [b⃗]_{'{k1}'}</M></p>
            <p>שימו לב: <M>[b⃗]_{'{k1}'} = [A_j]_{'{kj}'}</M> ו-<M>M_{'{kj}'}^(A) = M_{'{kj}'}^(A_j)</M>.</p>
            <p>ולכן:</p>
            <p className="text-center font-mono">= (det A)⁻¹ · Σₖ₌₁ⁿ (−1)^(j+k) · [A_j]_{'{kj}'} · M_{'{kj}'}^(A_j) = (det A)⁻¹ · det(A_j)</p>
            <p>(שורת הסיכום האחרונה היא בדיוק פיתוח לפי עמודה j).</p>
          </Proof>
        </Thm>

        {/* ================================================== */}
        {/* SUMMARY CHEAT SHEET */}
        {/* ================================================== */}
        <SectionHeader title="גיליון סיכום — כל הנוסחאות" />

        <div className="border border-gray-400 rounded p-4 font-mono text-sm space-y-3 print:break-inside-avoid">

          <div>
            <p className="font-bold mb-1"># תכונות פעולות שורה (משפט *)</p>
            <p>R_i → c·R_i {'  '}==&gt; Δ(B) = c·Δ(A)</p>
            <p>R_i ↔ R_j {'    '}==&gt; Δ(B) = −Δ(A)</p>
            <p>R_i → R_i+αR_j ==&gt; Δ(B) = Δ(A)</p>
          </div>

          <div>
            <p className="font-bold mb-1"># משפטים חשובים</p>
            <p>det(AB) = det(A)·det(B)</p>
            <p>det(Aᵗ) = det(A)</p>
            <p>det(A⁻¹) = (det(A))⁻¹</p>
            <p>A לא הפיכה ⟺ det(A) = 0</p>
          </div>

          <div>
            <p className="font-bold mb-1"># נוסחאות חישוב</p>
            <p>det 2×2: ad − bc</p>
            <p>det 3×3 (Sarrus): aei + bfg + cdh − afh − bdi − ceg</p>
            <p>פיתוח לפי עמודה j: det(A) = Σᵢ (−1)^(i+j)·[A]_ij·M_ij</p>
            <p>פיתוח לפי שורה i:  det(A) = Σⱼ (−1)^(i+j)·[A]_ij·M_ij</p>
            <p>משולשית: det(A) = [A]₁₁·...·[A]_nn</p>
          </div>

          <div>
            <p className="font-bold mb-1"># בלוקים</p>
            <p>det(A C ; 0 B) = det(A)·det(B)</p>
            <p>det(A 0 ; D B) = det(A)·det(B)</p>
          </div>

          <div>
            <p className="font-bold mb-1"># מטריצה מצורפת</p>
            <p>[adj(A)]_ij = (−1)^(i+j)·M_ji</p>
            <p>A·adj(A) = adj(A)·A = det(A)·I_n</p>
            <p>A⁻¹ = adj(A)/det(A)  (A הפיכה)</p>
            <p>A·adj(A) = O_n {'         '}(A לא הפיכה)</p>
          </div>

          <div>
            <p className="font-bold mb-1"># כלל קרמר</p>
            <p>Ax⃗ = b⃗, A הפיכה ==&gt; x_j = det(A_j)/det(A)</p>
            <p>A_j = A עם עמודה j מוחלפת ב-b⃗</p>
          </div>

        </div>

      </div>
    </>
  );
}
