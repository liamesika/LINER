'use client';

// =============================================
// Print-Friendly Summary: Weeks 10–12
// Invertible Matrices, Systems Ax=b, Determinants
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

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-yellow-400 pl-4 py-2 my-3 bg-yellow-50 print:break-inside-avoid print:bg-white">
      <div className="font-bold text-sm mb-1 text-yellow-700">טיפ למבחן:</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Example({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-cyan-500 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="text-cyan-700">דוגמה:</span> {title}</div>
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

export default function PrintWeeks10to12Page() {
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
          <a href="/" className="text-indigo-600 underline text-sm">חזרה לעמוד הראשי</a>
        </div>

        {/* Header */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-2xl font-bold">סיכום שבועות 10–12 — גרסת הדפסה</h1>
          <p className="text-gray-600 mt-1">אלגברה לינארית 1 — הרצאות 19–24 + תרגולים 10–12</p>
        </div>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* WEEK 10: INVERTIBLE MATRICES                             */}
        {/* ══════════════════════════════════════════════════════════ */}
        <SectionHeader title="שבוע 10: מטריצות הפיכות (Invertible Matrices)" />

        <Def title="מטריצה אלמנטרית (Elementary Matrix)">
          <p>תהי <M>E ∈ M_n(F)</M>. נאמר ש-E <strong>מטריצה אלמנטרית</strong> אם E מתקבלת מ-<M>I_n</M> ע&quot;י ביצוע פעולת שורה אלמנטרית אחת.</p>
          <p>כלומר, קיימים <M>1 ≤ i ≠ j ≤ n</M> ו-<M>c ≠ 0</M> כך ש-E מתקבלת מ-<M>I_n</M> ע&quot;י אחת מ:</p>
          <p>1. <M>R_i → c·R_i</M> (כפל שורה בסקלר)</p>
          <p>2. <M>R_i ↔ R_j</M> (החלפת שורות)</p>
          <p>3. <M>R_i → R_i + c·R_j</M> (חיבור כפולה של שורה)</p>
        </Def>

        <Thm title="מטריצות אלמנטריות הפיכות">
          <p>כל מטריצה אלמנטרית הפיכה, והופכית שלה <M>E⁻¹</M> היא המטריצה האלמנטרית המתאימה לפעולת השורה ההפוכה.</p>
          <p>1. <M>R_i → c·R_i</M> → ההפוכה: <M>R_i → (1/c)·R_i</M></p>
          <p>2. <M>R_i ↔ R_j</M> → ההפוכה: <M>R_i ↔ R_j</M> (עצמית!)</p>
          <p>3. <M>R_i → R_i + c·R_j</M> → ההפוכה: <M>R_i → R_i − c·R_j</M></p>
        </Thm>

        <Thm title="שקילות שורה באמצעות מטריצות אלמנטריות">
          <p>תהיינה <M>A, B ∈ M_{'{m×n}'}(F)</M> ונניח ש-B מתקבלת מ-A ע&quot;י פעולת שורה אלמנטרית אחת.</p>
          <p>תהי <M>E ∈ M_m(F)</M> המטריצה האלמנטרית המתאימה. אזי <M>EA = B</M>.</p>
          <p className="mt-1">בהכללה: אם A ו-B שקולות שורה, קיימות מטריצות אלמנטריות <M>E₁,...,E_k ∈ M_m(F)</M> כך ש:</p>
          <p className="text-center font-mono">E_k · ... · E₁ · A = B</p>
        </Thm>

        <Thm title="מטריצה הפיכה = מכפלת אלמנטריות">
          <p>מטריצה ריבועית <M>A ∈ M_n(F)</M> הפיכה אם ורק אם A שקולת שורה ל-<M>I_n</M>.</p>
          <p>במקרה זה, A היא מכפלה של מטריצות אלמנטריות.</p>
          <p>פעולות השורה (= הכפלה במטריצות אלמנטריות) שמעבירות את A ל-<M>I_n</M> גם מעבירות את <M>I_n</M> ל-<M>A⁻¹</M>.</p>
        </Thm>

        <Thm title="משפט המטריצה ההפיכה (Invertible Matrix Theorem)">
          <p>תהי <M>A ∈ M_n(F)</M>. <strong>כל התנאים הבאים שקולים:</strong></p>
          <p>1. A הפיכה</p>
          <p>2. לכל <M>b ∈ Fⁿ</M>, ל-<M>Ax = b</M> יש פתרון יחיד</p>
          <p>3. קיים <M>b ∈ Fⁿ</M> כך של-<M>Ax = b</M> יש פתרון יחיד</p>
          <p>4. ל-<M>Ax = 0</M> יש רק פתרון טריוויאלי</p>
          <p>5. A שקולת שורה ל-<M>I_n</M></p>
          <p>6. A היא מכפלה של מטריצות אלמנטריות</p>
          <p>7. עמודות A בת&quot;ל</p>
          <p>8. עמודות A פורשות את <M>Fⁿ</M></p>
          <p>9. עמודות A בסיס של <M>Fⁿ</M></p>
          <p>10. שורות A בת&quot;ל</p>
          <p>11. שורות A פורשות את <M>Fⁿ</M></p>
          <p>12. שורות A בסיס של <M>Fⁿ</M></p>
          <p>13. <M>Aᵗ</M> הפיכה</p>
        </Thm>

        <Tip>
          <p>כשנותנים מטריצה ריבועית n×n עם פרמטר ושואלים &quot;מתי הפיכה?&quot; — חשבו <M>det(A)</M> ומצאו מתי <M>det(A) ≠ 0</M>. הרבה יותר מהיר מדירוג!</p>
          <p className="mt-1">במבחן: מספיק לבדוק רק <strong>אחד</strong> מ-13 התנאים. אם יש n וקטורים ב-<M>Fⁿ</M> ושואלים &quot;האם בסיס?&quot; — מספיק לבדוק בת&quot;ל בלבד (או פריש בלבד).</p>
        </Tip>

        <Claim title="אלגוריתם היפוך מטריצה">
          <p>כדי למצוא <M>A⁻¹</M>: בנו את המטריצה המורחבת <M>(A | I_n)</M>, ודרגו לצורה קנונית.</p>
          <p>אם הצד השמאלי הפך ל-<M>I_n</M>, הצד הימני הוא <M>A⁻¹</M>:</p>
          <p className="text-center font-mono mt-1">(A | I_n) → ··· → (I_n | A⁻¹)</p>
          <p>אם מופיעה שורת אפסים בצד שמאל — A <strong>לא הפיכה</strong>.</p>
        </Claim>

        <Claim title="נוסחת הופכית 2×2">
          <p>עבור <M>A = (a b ; c d) ∈ M₂(F)</M>:</p>
          <p>A הפיכה אם ורק אם <M>ad − bc ≠ 0</M>, ובמקרה זה:</p>
          <p className="text-center font-mono mt-1">A⁻¹ = (1/(ad−bc)) · (d −b ; −c a)</p>
        </Claim>

        <SectionHeader title="שחלוף, סימטריה ועקבה" />

        <Def title="שחלוף (Transpose)">
          <p>תהי <M>A ∈ M_{'{m×n}'}(F)</M>. <strong>השחלוף של A</strong>, מסומן <M>Aᵗ</M>, היא המטריצה <M>Aᵗ ∈ M_{'{n×m}'}(F)</M> המקיימת:</p>
          <p className="text-center font-mono">[Aᵗ]_ij = [A]_ji</p>
          <p>כלומר, העמודות של A הופכות לשורות של <M>Aᵗ</M> ולהפך.</p>
        </Def>

        <Thm title="תכונות השחלוף">
          <p>תהיינה A, B מטריצות מגדלים מתאימים. אזי:</p>
          <p>1. <M>(Aᵗ)ᵗ = A</M></p>
          <p>2. <M>(A ± B)ᵗ = Aᵗ ± Bᵗ</M></p>
          <p>3. <M>(αA)ᵗ = α·Aᵗ</M></p>
          <p>4. <M>(AB)ᵗ = Bᵗ·Aᵗ</M> (שימו לב להיפוך הסדר!)</p>
          <p>5. <M>(Aᵗ)⁻¹ = (A⁻¹)ᵗ</M></p>
        </Thm>

        <Def title="מטריצה סימטרית ואנטי-סימטרית">
          <p>תהי <M>A ∈ M_n(F)</M>.</p>
          <p>A נקראת <strong>סימטרית</strong> אם <M>Aᵗ = A</M>.</p>
          <p>A נקראת <strong>אנטי-סימטרית</strong> אם <M>Aᵗ = −A</M>.</p>
        </Def>

        <Claim title="ממד מרחבי מטריצות סימטריות ואנטי-סימטריות">
          <p>בהנחה ש-<M>1_F + 1_F ≠ 0_F</M> (כלומר, מאפיין השדה שונה מ-2):</p>
          <p>תהי <M>SYM = {'\\{'}A ∈ M_n(F) | Aᵗ = A{'\\}'}</M>, <M>AS = {'\\{'}A ∈ M_n(F) | Aᵗ = −A{'\\}'}</M>.</p>
          <p className="font-mono text-center mt-1">dim(SYM) = n(n+1)/2 , dim(AS) = n(n−1)/2</p>
          <Proof>
            <p>עבור AS: איברים על האלכסון חייבים להיות 0 (כי <M>a_ii = −a_ii</M>).</p>
            <p>לכל <M>i {'<'} j</M>: <M>[A]_ij = −[A]_ji</M>, כלומר מספיק לקבוע רק את האיברים מעל האלכסון.</p>
            <p>בסיס: <M>{'\\{'}B_ij{'\\}'}_{'{i<j}'}</M> כאשר <M>B_ij</M> היא מטריצה עם 1 במקום (i,j) ו-<M>−1</M> במקום (j,i).</p>
            <p>מספר האיברים: <M>n(n−1)/2</M>.</p>
            <p>עבור SYM: <M>dim(SYM) = n² − n(n−1)/2 = n(n+1)/2</M>.</p>
          </Proof>
        </Claim>

        <Remark>
          <p><strong>חשוב:</strong> בהנחה ש-<M>1+1 ≠ 0</M>, כל מטריצה A ניתנת לפירוק יחיד: <M>A = S + T</M> כאשר S סימטרית ו-T אנטי-סימטרית.</p>
          <p className="font-mono">S = (A + Aᵗ)/2 , T = (A − Aᵗ)/2</p>
          <p>כלומר <M>M_n(F) = SYM ⊕ AS</M> (סכום ישר).</p>
        </Remark>

        <Def title="עקבה (Trace)">
          <p>תהי <M>A ∈ M_n(F)</M> מטריצה ריבועית. <strong>העקבה של A</strong> היא סכום איברי האלכסון:</p>
          <p className="text-center font-mono mt-1">tr(A) = Σᵢ₌₁ⁿ [A]_ii</p>
          <p>העקבה מוגדרת על <M>tr: M_n(F) → F</M> (רק עבור מטריצות ריבועיות).</p>
        </Def>

        <Claim title="העקבה לינארית">
          <p>תהיינה <M>A, B ∈ M_n(F)</M> ו-<M>α, β ∈ F</M>. אזי:</p>
          <p className="text-center font-mono">tr(αA + βB) = α·tr(A) + β·tr(B)</p>
        </Claim>

        <Lemma title="קומוטטיביות עקבה של מכפלה">
          <p>לכל <M>C, D ∈ M_n(F)</M>:</p>
          <p className="text-center font-mono">tr(C·D) = tr(D·C)</p>
          <Proof>
            <p className="font-mono">tr(CD) = Σᵢ (CD)_ii = Σᵢ Σⱼ c_ij·d_ji = Σⱼ Σᵢ d_ji·c_ij = Σⱼ (DC)_jj = tr(DC)</p>
          </Proof>
        </Lemma>

        <Remark>
          <p><strong>זהירות!</strong> באופן כללי <M>tr(ABC) ≠ tr(BAC)</M>. אפשר להזיז &quot;ציקלית&quot;: <M>tr(ABC) = tr(CAB) = tr(BCA)</M>.</p>
        </Remark>

        <Claim title="tr(AAᵗ) = 0 גורר A = 0 (מעל ℝ)">
          <p>תהי <M>A ∈ M_{'{m×n}'}(ℝ)</M>. אם <M>tr(AAᵗ) = 0</M> אזי <M>A = 0</M>.</p>
          <Proof>
            <p>האיבר <M>(i,i)</M> של <M>AAᵗ</M> שווה לסכום הריבועים של איברי השורה ה-i של A.</p>
            <p>לכן <M>tr(AAᵗ)</M> = סכום ריבועי <strong>כל</strong> איברי A.</p>
            <p>מעל <M>ℝ</M>: סכום ריבועים = 0 אם ורק אם כל איבר = 0, ולכן A = 0.</p>
            <p className="text-red-600 mt-1"><strong>שימו לב:</strong> זה נכשל מעל שדות אחרים! למשל מעל <M>ℂ</M>: <M>A = (i i ; 1 1)</M> מקיימת <M>tr(AAᵗ) = 0</M> אבל <M>A ≠ 0</M>.</p>
          </Proof>
        </Claim>

        <Example title="תרגיל 10 — מערכות שקולות (HW10 שאלה 1)">
          <p>תהי P הפיכה. הוכיחו/הפריכו:</p>
          <p><strong>(א)</strong> <M>Ax = 0</M> ו-<M>(PA)x = 0</M> שקולות.</p>
          <p><strong>פתרון (א):</strong> נכון. אם <M>Ax = 0</M> אז <M>(PA)x = P(Ax) = P·0 = 0</M>.</p>
          <p>הפוך: <M>(PA)x = 0 ⟹ P⁻¹(PA)x = Ax = 0</M>.</p>
          <p className="mt-2"><strong>(ב)</strong> <M>Ax = b</M> ו-<M>PAx = b</M> שקולות.</p>
          <p><strong>פתרון (ב):</strong> לא נכון! דוגמה נגדית: <M>A = I</M>, <M>P = 2I</M>, <M>b = (1)</M>.</p>
          <p><M>Ax = b</M> → <M>x = 1</M>. <M>PAx = b</M> → <M>2x = 1</M> → <M>x = 1/2</M>. פתרונות שונים!</p>
          <p className="font-semibold mt-1">המערכות השקולות הן: <M>Ax = b</M> ו-<M>PAx = Pb</M> (צריך להכפיל גם את b!).</p>
        </Example>

        <Example title="תרגיל 10 — אידמפוטנטיות (HW10 שאלה 4)">
          <p>תהי <M>A ∈ M_n(ℝ)</M> עם <M>A² = A</M> (אידמפוטנטית). הוכיחו תכונות של A ו-<M>I−A</M>.</p>
          <p><strong>פתרון:</strong></p>
          <p><M>(I−A)² = I − 2A + A² = I − 2A + A = I − A</M>.</p>
          <p>כלומר <M>I−A</M> גם אידמפוטנטית!</p>
          <p className="mt-1">בנוסף: <M>rank(A) + rank(I−A) = n</M>.</p>
        </Example>

        <Example title="תרגיל 10 — עקבה (HW10 שאלה 6)">
          <p>הוכיחו: <M>tr(AB) = tr(BA)</M>, <M>tr(A+B) = tr(A) + tr(B)</M>.</p>
          <p><strong>פתרון:</strong></p>
          <p className="font-mono">tr(AB) = Σᵢ (AB)_ii = Σᵢ Σⱼ a_ij·b_ji = Σⱼ Σᵢ b_ji·a_ij = Σⱼ (BA)_jj = tr(BA)</p>
        </Example>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* WEEK 11: SYSTEMS Ax=b AND INTRO TO DETERMINANTS          */}
        {/* ══════════════════════════════════════════════════════════ */}
        <SectionHeader title="שבוע 11: מערכות Ax=b ומבוא לדטרמיננטה" />

        <Def title="מערכת ליניארית Ax = b">
          <p>תהי <M>A ∈ M_{'{m×n}'}(F)</M>, <M>b ∈ Fᵐ</M>, <M>x ∈ Fⁿ</M>.</p>
          <p>המערכת הליניארית <M>Ax = b</M> עם משתנים <M>(x₁,...,x_n)</M> היא:</p>
          <p className="font-mono text-center">a₁₁x₁ + ··· + a₁ₙxₙ = b₁ , ... , aₘ₁x₁ + ··· + aₘₙxₙ = bₘ</p>
          <p>פתרון הוא כל וקטור <M>v ∈ Fⁿ</M> המקיים <M>Av = b</M>.</p>
        </Def>

        <Def title="מרחב האפס — NulA (Null Space / Kernel)">
          <p>תהי <M>A ∈ M_{'{m×n}'}(F)</M>. <strong>מרחב האפס של A</strong>, מסומן NulA, הוא אוסף כל הפתרונות של המערכת ההומוגנית <M>Ax = 0</M>:</p>
          <p className="text-center font-mono mt-1">NulA = {'\\{'}x ∈ Fⁿ : Ax = 0{'\\}'}</p>
        </Def>

        <Claim title="מרחב האפס הוא תת-מרחב">
          <p>לכל <M>A ∈ M_{'{m×n}'}(F)</M>, NulA הוא <strong>תת-מרחב</strong> של <M>Fⁿ</M>.</p>
          <Proof>
            <p>1. <M>A·0 = 0</M>, ולכן <M>0 ∈ NulA</M>.</p>
            <p>2. לכל <M>v, w ∈ NulA</M> ו-<M>α, β ∈ F</M>:</p>
            <p className="font-mono text-center">A(αv + βw) = αAv + βAw = α·0 + β·0 = 0</p>
            <p>ולכן <M>αv + βw ∈ NulA</M>.</p>
          </Proof>
        </Claim>

        <Thm title="מימד מרחב האפס = מספר המשתנים החופשיים">
          <p>ממד מרחב האפס של A שווה למספר המשתנים החופשיים.</p>
          <p>כדי למצוא <strong>בסיס ל-NulA</strong>: דרגו את A, ולכל משתנה חופשי הציבו 1 בו ו-0 בשאר — הוקטור שמתקבל הוא איבר בסיס.</p>
        </Thm>

        <Example title="מציאת בסיס ל-NulA (תרגול 11)">
          <p><M>A = [[1,2,1,0],[0,1,0,3],[1,3,1,3]]</M></p>
          <p>דירוג:</p>
          <div className="font-mono bg-gray-100 p-2 rounded my-1">
            <p>[1 2 1 0] {'  '}→{'  '} [1 0 1 -6]</p>
            <p>[0 1 0 3] {'  '}→{'  '} [0 1 0 {'  '}3]</p>
            <p>[0 0 0 0] {'  '}→{'  '} [0 0 0 {'  '}0]</p>
          </div>
          <p>משתנים חופשיים: <M>z, w</M>. לכן <M>x = −z + 6w</M>, <M>y = −3w</M>.</p>
          <p className="font-mono">NulA = Span{'\\{'}(−1, 0, 1, 0), (6, −3, 0, 1){'\\}'}</p>
          <p><M>dim(NulA) = 2</M> (= nullity). <M>rank(A) = 4 − 2 = 2</M>.</p>
        </Example>

        <Thm title="מבנה קבוצת הפתרונות — פתרון כללי">
          <p>תהי <M>A ∈ M_{'{m×n}'}(F)</M>, <M>b ∈ Fᵐ</M>.</p>
          <p>נסמן <M>H = {'\\{'}u ∈ Fⁿ : Au = 0{'\\}'}</M> (פתרון הומוגני = NulA).</p>
          <p>נסמן <M>G = {'\\{'}w ∈ Fⁿ : Aw = b{'\\}'}</M> (קבוצת כל הפתרונות).</p>
          <p className="mt-1">אם <M>x₀ ∈ G</M> פתרון פרטי כלשהו, אזי:</p>
          <p className="text-center font-mono text-base mt-1 font-bold">G = x₀ + NulA = {'\\{'}x₀ + u | u ∈ NulA{'\\}'}</p>
          <p className="mt-1">כלומר: <strong>פתרון כללי = פתרון פרטי + פתרון הומוגני</strong>.</p>
        </Thm>

        <Tip>
          <p><strong>חשוב:</strong> מספר המשתנים החופשיים = nullity = n − rank.</p>
          <p>אם <M>rank = n</M> (מטריצה עם n עמודות) אז nullity = 0 ויש פתרון יחיד (אם קיים).</p>
        </Tip>

        <Example title="פתרון כללי (תרגול 11)">
          <p>נתון ש-<M>x_p = (1,2)ᵗ</M> ו-<M>x_q = (4,5)ᵗ</M> שני פתרונות של <M>Ax = b</M>.</p>
          <p>ההפרש: <M>x_p − x_q = (−3, −3)ᵗ ∈ NulA</M>.</p>
          <p className="font-mono">NulA = Span{'\\{'}(−3,−3)ᵗ{'\\}'} = Span{'\\{'}(1,1)ᵗ{'\\}'}</p>
          <p className="font-mono">פתרון כללי: {'\\{'}(1,2)ᵗ + t(1,1)ᵗ | t ∈ ℝ{'\\}'} = {'\\{'}(1+t, 2+t) | t ∈ ℝ{'\\}'}</p>
        </Example>

        <SectionHeader title="מבוא לדטרמיננטה — הגדרה אקסיומטית" />

        <Def title="פונקציה מולטי-לינארית (Multi-linear)">
          <p>תהי <M>Δ: M_n(F) → F</M>. Δ נקראת <strong>מולטי-לינארית</strong> אם היא לינארית בכל שורה בנפרד.</p>
          <p>כלומר, לכל <M>1 ≤ i ≤ n</M>, לכל <M>α, β ∈ F</M> ולכל שורות <M>R, R̃</M>:</p>
          <p className="text-center font-mono">Δ(R₁ ⋯ αR + βR̃ ⋯ Rₙ) = α·Δ(R₁ ⋯ R ⋯ Rₙ) + β·Δ(R₁ ⋯ R̃ ⋯ Rₙ)</p>
          <p>(שאר השורות נשארות קבועות)</p>
        </Def>

        <Def title="פונקציה מתחלפת (Alternating)">
          <p>תהי <M>Δ: M_n(F) → F</M>. Δ נקראת <strong>מתחלפת</strong> אם לכל <M>A ∈ M_n(F)</M> עם שתי שורות זהות:</p>
          <p className="text-center font-mono">Δ(A) = 0_F</p>
        </Def>

        <Def title="פונקציית דטרמיננטה (פונקציית נפח)">
          <p><M>Δ: M_n(F) → F</M> היא <strong>פונקציית דטרמיננטה</strong> אם:</p>
          <p>1. Δ <strong>מולטי-לינארית</strong></p>
          <p>2. Δ <strong>מתחלפת</strong></p>
          <p>3. <M>Δ(I_n) = 1_F</M></p>
        </Def>

        <Thm title="קיום ויחידות פונקציית הדטרמיננטה">
          <p>קיימת פונקציית דטרמיננטה <strong>יחידה</strong> <M>Δ: M_n(F) → F</M>.</p>
          <p>היא נקראת <strong>הדטרמיננטה</strong> ומסומנת <M>det(A)</M> או <M>|A|</M>.</p>
        </Thm>

        <Thm title="השפעת פעולות שורה על הדטרמיננטה (משפט *)">
          <p>תהי <M>Δ: M_n(F) → F</M> מולטי-לינארית ומתחלפת. תהיינה A, B כך ש-B מתקבלת מ-A בפעולת שורה אחת:</p>
          <p><strong>1.</strong> <M>R_i → c·R_i (c ≠ 0)</M>: <M>Δ(B) = c · Δ(A)</M></p>
          <p><strong>2.</strong> <M>R_i ↔ R_j (i ≠ j)</M>: <M>Δ(B) = −Δ(A)</M></p>
          <p><strong>3.</strong> <M>R_i → R_i + αR_j (i ≠ j)</M>: <M>Δ(B) = Δ(A)</M></p>
        </Thm>

        <Corollary title="מסקנות ממשפט *">
          <p>1. <M>Δ(A) = 0 ⟺ Δ(B) = 0</M> עבור A, B שקולות שורה.</p>
          <p>2. A לא הפיכה → <M>Δ(A) = 0</M> (כי A שקולה למטריצה עם שורת אפסים).</p>
          <p>3. A הפיכה + Δ דטרמיננטה → <M>Δ(A) ≠ 0</M>.</p>
        </Corollary>

        <Thm title="דטרמיננטה של מטריצה משולשית">
          <p>תהי <M>A ∈ M_n(F)</M> מטריצה משולשית (עליונה או תחתונה).</p>
          <p>אזי <M>det(A) = [A]₁₁ · [A]₂₂ · ··· · [A]_nn</M> (מכפלת איברי האלכסון).</p>
        </Thm>

        <Claim title="חישוב דטרמיננטה בדירוג">
          <p>כדי לחשב <M>det(A)</M>: בצעו פעולות שורה עד למטריצה משולשית.</p>
          <p>עקבו אחרי ההשפעה:</p>
          <p>• <M>R_i → R_i + αR_j</M> — לא משנה את det</p>
          <p>• <M>R_i ↔ R_j</M> — הופך סימן (×(−1))</p>
          <p>• <M>R_i → c·R_i</M> — כופל ב-c</p>
          <p>בסוף: <M>det = </M>מכפלת האלכסון × תיקונים.</p>
        </Claim>

        <Claim title="דטרמיננטה של כפולה סקלרית">
          <p className="text-center font-mono text-base">det(αA) = αⁿ · det(A)</p>
          <p>בפרט: <M>det(−A) = (−1)ⁿ · det(A)</M>.</p>
        </Claim>

        <Example title="חישוב det בדירוג (תרגול 11)">
          <p><M>A = [[1,2,3],[1,4,3],[0,3,0]]</M></p>
          <p><M>R₂ → R₂ − R₁</M>: <M>[[1,2,3],[0,2,0],[0,3,0]]</M> (det לא משתנה)</p>
          <p><M>R₂ → (1/2)R₂</M>: גורם 2. <M>R₃ → R₃ − 3R₂</M>: <M>[[1,2,3],[0,1,0],[0,0,−3]]</M></p>
          <p>משולשית: מכפלת אלכסון = <M>1·1·(−3) = −3</M>.</p>
          <p>עם הגורם: <M>det(A) = 2·(−3) = −6</M>.</p>
        </Example>

        <Example title="מטריצה 11×11 עם איברים אי-זוגיים (תרגול 11)">
          <p>תהי A מטריצה 11×11 ממשית שכל איבריה אי-זוגיים. הוכיחו ש-1024 מחלק את <M>det(A)</M>.</p>
          <Proof>
            <p>לכל i מ-2 עד 11, בצעו <M>R_i → R_i + R₁</M>. פעולה זו לא משנה את det.</p>
            <p>כעת כל שורה i (עבור <M>i ≥ 2</M>) מכילה סכומי מספרים אי-זוגיים → כל האיברים זוגיים.</p>
            <p>הוציאו גורם 2 מכל אחת מ-10 השורות:</p>
            <p className="font-mono text-center">det(A) = 2¹⁰ · det(C) = 1024 · det(C)</p>
            <p>כאשר C מטריצה עם איברים שלמים, ולכן <M>det(C) ∈ ℤ</M>.</p>
          </Proof>
        </Example>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* WEEK 12: DETERMINANTS                                    */}
        {/* ══════════════════════════════════════════════════════════ */}
        <SectionHeader title="שבוע 12: דטרמיננטות — פיתוח ותכונות" />

        <Def title="מינור (Minor)">
          <p>תהי <M>A ∈ M_n(F)</M> ויהיו <M>1 ≤ i, j ≤ n</M>.</p>
          <p><strong>המינור ה-ij של A</strong>, מסומן <M>M_ij^(A)</M>, הוא <strong>הדטרמיננטה של המטריצה מסדר (n−1)×(n−1)</strong> המתקבלת ממחיקת שורה i ועמודה j מ-A.</p>
        </Def>

        <Def title="הגדרה רקורסיבית של det">
          <p>לכל <M>n ∈ ℕ</M> נגדיר <M>det: M_n(F) → F</M>:</p>
          <p><strong>בסיס:</strong> <M>det((a)) = a</M> עבור <M>(a) ∈ M₁(F)</M>.</p>
          <p><strong>צעד:</strong> לכל <M>n ≥ 2</M>, לכל <M>A ∈ M_n(F)</M>:</p>
          <p className="text-center font-mono text-base mt-1">det(A) = Σᵢ₌₁ⁿ (−1)^(i+1) · [A]_{'{i1}'} · M_{'{i1}'}^(A)</p>
          <p>(פיתוח לפי עמודה 1. הסימן מתחלף: +, −, +, −, ...)</p>
        </Def>

        <Thm title="פיתוח לפי מינורים — כל שורה או עמודה (Cofactor Expansion)">
          <p>ניתן לפתח את הדטרמיננטה לפי <strong>כל שורה או עמודה</strong>:</p>
          <p><strong>פיתוח לפי שורה i:</strong></p>
          <p className="text-center font-mono">det(A) = Σⱼ₌₁ⁿ (−1)^(i+j) · [A]_ij · M_ij^(A)</p>
          <p><strong>פיתוח לפי עמודה j:</strong></p>
          <p className="text-center font-mono">det(A) = Σᵢ₌₁ⁿ (−1)^(i+j) · [A]_ij · M_ij^(A)</p>
          <p className="mt-1">דפוס הסימנים (checkerboard):</p>
          <div className="font-mono bg-gray-100 p-2 rounded my-1 text-center">
            <p>+ − + − ...</p>
            <p>− + − + ...</p>
            <p>+ − + − ...</p>
          </div>
        </Thm>

        <Tip>
          <p>בחרו את השורה/עמודה <strong>עם הכי הרבה אפסים</strong> — זה מפחית את מספר המינורים שצריך לחשב!</p>
        </Tip>

        <Claim title="דטרמיננטה 2×2">
          <p className="text-center font-mono text-base">det(a b ; c d) = ad − bc</p>
        </Claim>

        <Remark>
          <p><strong>כלל סרוס (Sarrus) — רק עבור 3×3:</strong></p>
          <p className="font-mono text-center">det(a b c ; d e f ; g h i) = aei + bfg + cdh − afh − bdi − ceg</p>
          <p className="font-semibold">שיטת סרוס עובדת רק על 3×3! לא על 4×4 ומעלה.</p>
        </Remark>

        <Thm title="A הפיכה אם ורק אם det(A) ≠ 0">
          <p>תהי <M>A ∈ M_n(F)</M>. אזי:</p>
          <p className="text-center font-mono text-base font-bold">A הפיכה ⟺ det(A) ≠ 0</p>
          <p className="mt-1">מסקנה: <M>det(A⁻¹) = (det(A))⁻¹ = 1/det(A)</M>.</p>
        </Thm>

        <Thm title="det(Aᵗ) = det(A)">
          <p>לכל <M>A ∈ M_n(F)</M>: <M>det(Aᵗ) = det(A)</M>.</p>
          <p className="text-gray-600">מסקנה: כל תכונה שנכונה לשורות (פעולות שורה, פיתוח, וכו&apos;) נכונה גם לעמודות.</p>
        </Thm>

        <Thm title="הדטרמיננטה כפלית — det(AB) = det(A)·det(B)">
          <p>תהיינה <M>A, B ∈ M_n(F)</M>. אזי:</p>
          <p className="text-center font-mono text-base font-bold">det(AB) = det(A) · det(B)</p>
          <Proof>
            <p><strong>מקרה 1:</strong> A לא הפיכה.</p>
            <p>אזי AB לא הפיכה (כי אם AB היתה הפיכה → A הפיכה, סתירה).</p>
            <p className="font-mono text-center">det(AB) = 0 = 0 · det(B) = det(A) · det(B)</p>
            <p className="mt-2"><strong>מקרה 2:</strong> A הפיכה.</p>
            <p>אזי <M>A = E₁ · ··· · E_k</M> (מכפלת אלמנטריות).</p>
            <p>משימוש חוזר בלמה <M>Δ(EA) = Δ(E)·Δ(A)</M>:</p>
            <p className="font-mono text-center">det(AB) = det(E₁)·...·det(E_k)·det(B) = det(E₁·...·E_k)·det(B) = det(A)·det(B)</p>
          </Proof>
        </Thm>

        <Thm title="דטרמיננטה של ונדרמונד (Vandermonde)">
          <p>מטריצת ונדרמונד <M>V</M> עם <M>V_ij = x_i^{'{j-1}'}</M>:</p>
          <p className="text-center font-mono text-base mt-1">det(V) = ∏_{'{1 ≤ i < j ≤ n}'} (x_j − x_i)</p>
          <p className="mt-1">עבור 3×3 עם פרמטרים a, b, c:</p>
          <p className="text-center font-mono">det[[1,a,a²],[1,b,b²],[1,c,c²]] = (b−a)(c−a)(c−b)</p>
          <p className="mt-1 font-semibold">ונדרמונד הפיכה ⟺ כל ה-<M>x_i</M> שונים זה מזה.</p>
        </Thm>

        <Claim title="דטרמיננטה של מטריצה שלמה היא שלם">
          <p>אם <M>A ∈ M_n(ℝ)</M> עם איברים שלמים, אזי <M>det(A) ∈ ℤ</M>.</p>
          <Proof>
            <p>באינדוקציה על n באמצעות פיתוח קופקטורים:</p>
            <p>בסיס n=1: <M>det((a)) = a ∈ ℤ</M>.</p>
            <p>צעד: המינורים הם דטרמיננטות של מטריצות שלמות (n−1)×(n−1), מהנחת האינדוקציה הם שלמים. סכום מכפלות שלמים הוא שלם.</p>
          </Proof>
        </Claim>

        <Thm title="מטריצה אנטי-סימטרית מסדר אי-זוגי — לא הפיכה">
          <p>תהי <M>A ∈ M_n(F)</M> אנטי-סימטרית (<M>Aᵗ = −A</M>), n אי-זוגי, ו-<M>1+1 ≠ 0</M> ב-F.</p>
          <p>אזי A <strong>לא הפיכה</strong>.</p>
          <Proof>
            <p className="font-mono text-center">det(A) = det(Aᵗ) = det(−A) = (−1)ⁿ · det(A) = −det(A)</p>
            <p>(כי n אי-זוגי)</p>
            <p>ולכן <M>2 · det(A) = 0</M>.</p>
            <p>מכיוון ש-<M>1+1 ≠ 0</M> (כלומר 2 הפיך ב-F): <M>det(A) = 0</M>.</p>
            <p className="text-red-600 mt-1"><strong>זהירות:</strong> מעל <M>ℤ₂</M> זה נכשל! למשל <M>I₃</M> אנטי-סימטרית מעל <M>ℤ₂</M> (כי <M>−1 = 1</M>) אבל הפיכה.</p>
          </Proof>
        </Thm>

        <SectionHeader title="בלוקים ודטרמיננטה עם פרמטר" />

        <Def title="מטריצת בלוקים (Block Matrix)">
          <p>מטריצת בלוקים היא דרך לרשום מטריצה ע&quot;י חלוקה למטריצות קטנות יותר:</p>
          <p className="text-center font-mono">K = (A C ; D B)</p>
          <p>• <strong>משולשית עליונה:</strong> <M>K = (A C ; 0 B)</M> (כש-D = 0)</p>
          <p>• <strong>משולשית תחתונה:</strong> <M>K = (A 0 ; D B)</M> (כש-C = 0)</p>
          <p>• <strong>אלכסונית:</strong> <M>K = (A 0 ; 0 B)</M> (כש-C = D = 0)</p>
        </Def>

        <Thm title="דטרמיננטה של מטריצת בלוקים משולשית">
          <p className="text-center font-mono text-base font-bold">det(A C ; 0 B) = det(A) · det(B)</p>
          <p className="text-center font-mono text-base font-bold mt-1">det(A 0 ; D B) = det(A) · det(B)</p>
          <Proof>
            <p>באינדוקציה על n+m.</p>
            <p><strong>בסיס (n=1, m=1):</strong> <M>det(a c ; 0 b) = ab − 0·c = ab = det(A)·det(B)</M>.</p>
            <p><strong>צעד:</strong> פיתוח לפי עמודה 1. מכיוון ש-<M>[K]_{'{i1}'} = 0</M> לכל <M>i {'>'} n</M>:</p>
            <p className="font-mono text-center">det(K) = Σᵢ₌₁ⁿ (−1)^(i+1) [A]_{'{i1}'} · M_{'{i1}'}^(K)</p>
            <p>כל מינור <M>M_{'{i1}'}^(K)</M> הוא שוב מטריצת בלוקים משולשית מסדר קטן יותר.</p>
            <p>מהנחת האינדוקציה: <M>M_{'{i1}'}^(K) = M_{'{i1}'}^(A) · det(B)</M>.</p>
            <p className="font-mono text-center">det(K) = (Σᵢ (−1)^(i+1)[A]_{'{i1}'}·M_{'{i1}'}^(A)) · det(B) = det(A) · det(B)</p>
          </Proof>
        </Thm>

        <Claim title="דטרמיננטה עם פרמטר">
          <p>כאשר מטריצה מכילה פרמטר α, <M>det(A(α))</M> הופך <strong>לפולינום ב-α</strong>.</p>
          <p>המטריצה לא הפיכה בדיוק עבור ערכי α שהם <strong>שורשי הפולינום</strong>.</p>
          <p>שלבו דירוג + פיתוח קופקטורים לפישוט.</p>
        </Claim>

        <Example title="דטרמיננטה עם פרמטר (תרגול 12)">
          <p>עבור אילו ערכי <M>α ∈ ℝ</M> המטריצה הפיכה?</p>
          <p className="font-mono text-center">A = [[1,1,1],[1,α,−1],[1,α²,1]]</p>
          <p>אחרי דירוג: <M>det = 2(α² − 1) = 2(α−1)(α+1)</M>.</p>
          <p className="font-semibold">A הפיכה כאשר <M>α ≠ 1</M> וגם <M>α ≠ −1</M>.</p>
        </Example>

        <Example title="A² − 2A + I = 0 (תרגול 12)">
          <p>הוכיחו ש-<M>A−I</M> לא הפיכה אבל A הפיכה.</p>
          <p><strong>A−I לא הפיכה:</strong> <M>A² − 2A + I = (A−I)² = 0</M>.</p>
          <p className="font-mono">det((A−I)²) = (det(A−I))² = 0 → det(A−I) = 0</p>
          <p className="mt-1"><strong>A הפיכה:</strong> <M>A² − 2A = −I → A(A−2I) = −I</M>.</p>
          <p className="font-mono">det(A)·det(A−2I) = det(−I) = (−1)ⁿ ≠ 0 → det(A) ≠ 0</p>
        </Example>

        <Example title="A³ + A² + A + I = 0 → A הפיכה (תרגול 12)">
          <p>סדרו מחדש: <M>A³ + A² + A = −I</M>, כלומר <M>A(A²+A+I) = −I</M>.</p>
          <p>קחו דטרמיננטה:</p>
          <p className="font-mono text-center">det(A) · det(A²+A+I) = (−1)ⁿ ≠ 0</p>
          <p>מכיוון שהמכפלה שונה מאפס, בפרט <M>det(A) ≠ 0</M>, ולכן A הפיכה.</p>
        </Example>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* CHEAT SHEET                                               */}
        {/* ══════════════════════════════════════════════════════════ */}
        <SectionHeader title="גיליון סיכום — כל הנוסחאות" />

        <div className="border border-gray-400 rounded p-4 font-mono text-sm space-y-3 print:break-inside-avoid">
          <div>
            <p className="font-bold mb-1"># מטריצות הפיכות</p>
            <p>A הפיכה ⟺ rank(A) = n ⟺ det(A) ≠ 0</p>
            <p>A הפיכה ⟺ Ax=0 רק פתרון טריוויאלי</p>
            <p>A הפיכה ⟺ עמודות/שורות בת&quot;ל ⟺ פורשות ⟺ בסיס</p>
            <p>A הפיכה ⟺ מכפלת אלמנטריות</p>
            <p>היפוך: (A|I) → (I|A⁻¹)</p>
            <p>2×2: A⁻¹ = (1/(ad−bc))(d −b ; −c a)</p>
          </div>

          <div>
            <p className="font-bold mb-1"># שחלוף ועקבה</p>
            <p>(AB)ᵗ = BᵗAᵗ {'  '}(היפוך סדר!)</p>
            <p>(Aᵗ)⁻¹ = (A⁻¹)ᵗ</p>
            <p>tr(αA+βB) = α·tr(A)+β·tr(B)</p>
            <p>tr(CD) = tr(DC)</p>
            <p>dim(SYM) = n(n+1)/2 , dim(AS) = n(n−1)/2</p>
          </div>

          <div>
            <p className="font-bold mb-1"># Ax=b ו-NulA</p>
            <p>NulA = {'\\{'}x | Ax=0{'\\}'} תת-מרחב של Fⁿ</p>
            <p>dim(NulA) = מספר משתנים חופשיים = n − rank(A)</p>
            <p>פתרון כללי = x₀ (פרטי) + NulA (הומוגני)</p>
          </div>

          <div>
            <p className="font-bold mb-1"># פעולות שורה על det</p>
            <p>R_i → c·R_i {'  '}⟹ det ×c</p>
            <p>R_i ↔ R_j {'    '}⟹ det ×(−1)</p>
            <p>R_i → R_i+αR_j ⟹ det ללא שינוי</p>
          </div>

          <div>
            <p className="font-bold mb-1"># חישוב דטרמיננטה</p>
            <p>det 2×2: ad − bc</p>
            <p>det 3×3 (Sarrus): aei+bfg+cdh−afh−bdi−ceg</p>
            <p>פיתוח לפי שורה i: Σⱼ (−1)^(i+j)·a_ij·M_ij</p>
            <p>פיתוח לפי עמודה j: Σᵢ (−1)^(i+j)·a_ij·M_ij</p>
            <p>משולשית: det = מכפלת אלכסון</p>
          </div>

          <div>
            <p className="font-bold mb-1"># משפטים חשובים</p>
            <p>A הפיכה ⟺ det(A) ≠ 0</p>
            <p>det(AB) = det(A)·det(B)</p>
            <p>det(Aᵗ) = det(A)</p>
            <p>det(A⁻¹) = 1/det(A)</p>
            <p>det(αA) = αⁿ·det(A)</p>
            <p>Aᵗ=−A, n אי-זוגי, char≠2 ⟹ det(A)=0</p>
          </div>

          <div>
            <p className="font-bold mb-1"># בלוקים</p>
            <p>det(A C ; 0 B) = det(A)·det(B)</p>
            <p>det(A 0 ; D B) = det(A)·det(B)</p>
          </div>

          <div>
            <p className="font-bold mb-1"># ונדרמונד</p>
            <p>det(V) = ∏(x_j − x_i) לכל i{'<'}j</p>
            <p>3×3: (b−a)(c−a)(c−b)</p>
            <p>הפיכה ⟺ כל ה-x_i שונים</p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* EXAM PATTERNS                                             */}
        {/* ══════════════════════════════════════════════════════════ */}
        <SectionHeader title="תבניות למבחן" />

        <div className="space-y-2 print:break-inside-avoid">
          <div className="border border-gray-300 rounded p-3 text-sm">
            <div className="flex justify-between"><span className="font-bold">מצא ערכי α שעבורם A הפיכה</span><span className="text-gray-500">שכיחות גבוהה</span></div>
            <p>חשב <M>det(A)</M> כפונקציה של α. A הפיכה ⟺ <M>det ≠ 0</M>. פתור <M>det = 0</M>.</p>
          </div>
          <div className="border border-gray-300 rounded p-3 text-sm">
            <div className="flex justify-between"><span className="font-bold">הוכח ש-A הפיכה/לא הפיכה</span><span className="text-gray-500">שכיחות גבוהה</span></div>
            <p>טריק: <M>f(A) = 0</M> → פרקו ל-<M>A·g(A) = ±I</M>. קחו det משני הצדדים.</p>
          </div>
          <div className="border border-gray-300 rounded p-3 text-sm">
            <div className="flex justify-between"><span className="font-bold">חשב det של מטריצה גדולה</span><span className="text-gray-500">שכיחות גבוהה</span></div>
            <p>דרגו + עקבו אחרי סימנים. או פתחו לפי שורה/עמודה עם הכי הרבה אפסים.</p>
          </div>
          <div className="border border-gray-300 rounded p-3 text-sm">
            <div className="flex justify-between"><span className="font-bold">מצא פתרון כללי ל-Ax=b</span><span className="text-gray-500">שכיחות גבוהה</span></div>
            <p>מצא פתרון פרטי <M>x₀</M>. מצא בסיס ל-NulA (דרג <M>Ax=0</M>).</p>
            <p>פתרון כללי: <M>x₀ + NulA</M>.</p>
          </div>
          <div className="border border-gray-300 rounded p-3 text-sm">
            <div className="flex justify-between"><span className="font-bold">הוכח ש-det(A) מתחלק ב-k</span><span className="text-gray-500">שכיחות בינונית</span></div>
            <p>בצעו פעולות שורה שלא משנות det, עד שניתן להוציא גורמים משותפים.</p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* QUICK REFERENCE                                           */}
        {/* ══════════════════════════════════════════════════════════ */}
        <SectionHeader title="שליפה מהירה" />

        <div className="border border-gray-300 rounded overflow-hidden text-sm print:break-inside-avoid">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-right border-b">מה רוצים</th>
                <th className="py-2 px-3 text-right border-b">מה עושים</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="py-2 px-3">לבדוק הפיכות (n×n)</td><td className="py-2 px-3"><M>det ≠ 0</M> או דרג ל-<M>I_n</M></td></tr>
              <tr className="border-b"><td className="py-2 px-3">למצוא <M>A⁻¹</M></td><td className="py-2 px-3">דרג <M>[A|I] → [I|A⁻¹]</M></td></tr>
              <tr className="border-b"><td className="py-2 px-3">למצוא NulA</td><td className="py-2 px-3">דרג <M>Ax=0</M>, פרמטריזציה</td></tr>
              <tr className="border-b"><td className="py-2 px-3">פתרון כללי <M>Ax=b</M></td><td className="py-2 px-3"><M>x₀</M> (פרטי) + NulA</td></tr>
              <tr className="border-b"><td className="py-2 px-3">חשב det</td><td className="py-2 px-3">דירוג / קופקטורים (בחר שורה דלילה)</td></tr>
              <tr className="border-b"><td className="py-2 px-3">det עם פרמטר</td><td className="py-2 px-3">חשב כפולינום, מצא שורשים</td></tr>
              <tr className="border-b"><td className="py-2 px-3">det של בלוקים</td><td className="py-2 px-3"><M>det(A)·det(B)</M> (משולשית בלוקים)</td></tr>
              <tr><td className="py-2 px-3">ונדרמונד 3×3</td><td className="py-2 px-3"><M>(b−a)(c−a)(c−b)</M></td></tr>
            </tbody>
          </table>
        </div>

        <div className="text-center text-gray-400 text-xs mt-8 print:mt-4">
          Built by <strong>Lia Mesika</strong>. All rights reserved.
        </div>

      </div>
    </>
  );
}
