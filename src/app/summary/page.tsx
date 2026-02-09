'use client';

import { useState } from 'react';
import {
  BookOpen, ChevronDown, ChevronUp, Target, AlertTriangle,
  Lightbulb, Zap, Star, CheckCircle, Award, Brain
} from 'lucide-react';

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
    <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 flex gap-2">
      <Star className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-amber-800">{children}</div>
    </div>
  );
}

function GoldenRule({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 flex gap-2">
      <Award className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-yellow-800 font-medium">{children}</div>
    </div>
  );
}

function Proof({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-100 transition-colors"
      >
        <span className="font-medium text-sm text-gray-700 flex items-center gap-2">
          <span className="bg-gray-600 text-white text-xs px-2 py-0.5 rounded">הוכחה</span>
          {title}
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-700 space-y-2 border-t border-gray-200 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono bg-gray-100 px-1 rounded text-sm">{children}</span>;
}

// =============================================
// Main Page
// =============================================

export default function SummaryPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          סיכום מלא - אלגברה לינארית 1
        </h1>
        <p className="text-gray-600">
          כל ההגדרות, המשפטים, ההוכחות והטכניקות - מבוסס על הרצאות 1-26 + תרגולים + שיעורי בית
        </p>
        <div className="mt-3 inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-lg text-sm font-medium">
          <Target className="w-4 h-4" />
          מותאם להכנה למועדי א&apos; ו-ב&apos; 2024
        </div>
      </div>

      {/* ==================== */}
      {/* PART 1: FIELDS */}
      {/* ==================== */}
      <Section title="1. שדות (Fields)" icon={<BookOpen className="w-5 h-5" />} color="text-blue-700">
        <Def title="שדה (Field)">
          <p>קבוצה F עם שתי פעולות (+, ·) המקיימת:</p>
          <p>1. <strong>חיבור:</strong> קומוטטיבי, אסוציאטיבי, אדישות (0), נגדי (-a)</p>
          <p>2. <strong>כפל:</strong> קומוטטיבי, אסוציאטיבי, אדישות (1), הופכי (a⁻¹ לכל a≠0)</p>
          <p>3. <strong>דיסטריבוטיביות:</strong> <M>a(b+c) = ab + ac</M></p>
        </Def>

        <Def title="תת-שדה (Subfield)">
          <p><M>F₁ ⊆ F</M> הוא תת-שדה אם F₁ סגור לחיבור, כפל, הכיל 0 ו-1, ומכיל נגדיים והופכיים.</p>
        </Def>

        <ExamTip>
          <strong>מועד ב&apos; 2024 שאלה 1b:</strong> אם F₁ ⊆ F סופי ומקיים את כל האקסיומות (אולי בלי הופכי) — הוכח שהופכי קיים.
          <br />רמז: לכל x≠0, הפונקציה φ(y) = xy היא חח&quot;ע על F₁ (כי xy=xz ⟹ y=z), ובקבוצה סופית חח&quot;ע = על, לכן קיים y כך ש-xy=1.
        </ExamTip>

        <Thm title="דוגמאות חשובות לשדות">
          <p><M>ℝ, ℚ, ℂ, ℤₚ</M> (כאשר p ראשוני) הם שדות.</p>
          <p><M>ℤ</M> הוא <strong>לא</strong> שדה (אין הופכי ל-2 ב-ℤ).</p>
          <p><M>ℤ₆</M> <strong>לא</strong> שדה (2·3=0 אבל 2≠0 ו-3≠0).</p>
        </Thm>

        <GoldenRule>
          ב-<M>ℤₚ</M>: כל החישובים מודולו p. דטרמיננטה ב-<M>ℤ₅</M> — זכרו לקחת mod 5 בסוף!
        </GoldenRule>
      </Section>

      {/* ==================== */}
      {/* PART 2: VECTOR SPACES */}
      {/* ==================== */}
      <Section title="2. מרחבים וקטוריים (Vector Spaces)" icon={<BookOpen className="w-5 h-5" />} color="text-indigo-700">
        <Def title="מרחב וקטורי">
          <p>קבוצה V מעל שדה F עם פעולות חיבור וכפל בסקלר המקיימת 8 אקסיומות:</p>
          <p>חיבור: קומוטטיבי, אסוציאטיבי, אדישות (0⃗), נגדי</p>
          <p>כפל בסקלר: 1·v=v, אסוציאטיבי, דיסטריבוטיבי (2 סוגים)</p>
        </Def>

        <Def title="תת-מרחב (Subspace)">
          <p>קבוצה W ⊆ V היא תת-מרחב אם:</p>
          <p>1. W ≠ ∅ (בד&quot;כ מראים 0⃗ ∈ W)</p>
          <p>2. סגורה לחיבור: u,w ∈ W ⟹ u+w ∈ W</p>
          <p>3. סגורה לכפל בסקלר: α ∈ F, w ∈ W ⟹ αw ∈ W</p>
        </Def>

        <ExamTip>
          <strong>שאלת הגדרה חינמית!</strong> הגדרת תת-מרחב = 2-3 נקודות קלות. תמיד מופיעה במבחן.
          אפשר גם לאחד סעיפים 2+3: סגור לצירוף לינארי — αu + βw ∈ W.
        </ExamTip>

        <Thm title="דוגמאות קלאסיות של מרחבים וקטוריים">
          <p><M>{'F^n'}</M> — וקטורי עמודה</p>
          <p><M>{'M_{m×n}(F)'}</M> — מטריצות m×n</p>
          <p><M>{'F_n[x]'}</M> — פולינומים מדרגה ≤ n</p>
          <p><M>F[x]</M> — כל הפולינומים (אינסוף ממדי!)</p>
        </Thm>

        <Technique title="הוכחת תת-מרחב">
          <p>1. הראה <M>0⃗ ∈ W</M> (אם W מוגדר ע&quot;י תנאי, הצב 0 ובדוק)</p>
          <p>2. קח <M>u, w ∈ W</M> שרירותיים ו-<M>α ∈ F</M></p>
          <p>3. הראה <M>αu + w ∈ W</M> (מספיק לבדוק צירוף לינארי אחד)</p>
        </Technique>

        <Technique title="הפרכת תת-מרחב">
          <p>הראה שאחד מהתנאים לא מתקיים:</p>
          <p>- 0⃗ ∉ W (הדרך הקלה ביותר!)</p>
          <p>- דוגמת נגד לסגירות: מצא u,w ∈ W כך ש-u+w ∉ W</p>
        </Technique>

        <ExamTip>
          <strong>מועד ב&apos; 2024 שאלה 5b:</strong> W = {'{p ∈ F[x] : p(α₁)=0, p(α₂)=0}'} — הראה שזה תת-מרחב. הראה שזה לא נוצר סופית (dim=∞).
        </ExamTip>
      </Section>

      {/* ==================== */}
      {/* PART 3: SPAN, LI, BASIS */}
      {/* ==================== */}
      <Section title="3. Span, תלות/אי-תלות לינארית, בסיס" icon={<Brain className="w-5 h-5" />} color="text-purple-700">
        <Def title="צירוף לינארי">
          <p>וקטור v הוא צירוף לינארי של v₁,...,vₖ אם קיימים α₁,...,αₖ ∈ F כך ש-v = α₁v₁ + ... + αₖvₖ</p>
        </Def>

        <Def title="Span (מרחב הנפרש)">
          <p><M>Span(v₁,...,vₖ) = {'{α₁v₁ + ... + αₖvₖ : α₁,...,αₖ ∈ F}'}</M></p>
          <p>זוהי קבוצת כל הצירופים הלינאריים. תמיד תת-מרחב!</p>
          <p>מוסכמה: <M>Span(∅) = {'{0⃗}'}</M></p>
        </Def>

        <Def title="תלות לינארית">
          <p>v₁,...,vₖ תלויים לינארית (ת&quot;ל) אם קיימים α₁,...,αₖ ∈ F <strong>לא כולם 0</strong> כך ש-α₁v₁+...+αₖvₖ = 0⃗</p>
        </Def>

        <Def title="אי-תלות לינארית">
          <p>v₁,...,vₖ בלתי תלויים לינארית (בת&quot;ל) אם: α₁v₁+...+αₖvₖ = 0⃗ ⟹ α₁=...=αₖ=0</p>
          <p>כלומר, הצירוף הלינארי <strong>היחיד</strong> שנותן 0⃗ הוא הטריוויאלי.</p>
        </Def>

        <Thm title="אפיון ת&quot;ל">
          <p>v₁,...,vₖ ת&quot;ל ⟺ קיים j כך ש-vⱼ ∈ Span(v₁,...,vⱼ₋₁)</p>
          <p>(כלומר, אחד הוקטורים הוא צירוף לינארי של קודמיו)</p>
        </Thm>

        <Proof title="אפיון ת&quot;ל — הוכחה (מועד ב' 2024 שאלה 1a)">
          <p><strong>⟸:</strong> נניח קיים j כך ש-vⱼ = β₁v₁+...+βⱼ₋₁vⱼ₋₁.</p>
          <p>אז β₁v₁+...+βⱼ₋₁vⱼ₋₁+(-1)vⱼ+0·vⱼ₊₁+...+0·vₖ = 0⃗</p>
          <p>המקדם של vⱼ הוא -1 ≠ 0, לכן ת&quot;ל.</p>
          <p><strong>⟹:</strong> נניח ת&quot;ל: ∃ α₁,...,αₖ לא כולם 0 כך ש-Σαᵢvᵢ=0⃗.</p>
          <p>יהי j המקסימלי כך ש-αⱼ ≠ 0. אז:</p>
          <p>αⱼvⱼ = -α₁v₁-...-αⱼ₋₁vⱼ₋₁</p>
          <p>vⱼ = (-α₁/αⱼ)v₁+...+(-αⱼ₋₁/αⱼ)vⱼ₋₁ ∈ Span(v₁,...,vⱼ₋₁)</p>
        </Proof>

        <Thm title="בת&quot;ל ⟺ ייצוג יחיד">
          <p>v₁,...,vₖ בת&quot;ל ⟺ לכל v ∈ Span(v₁,...,vₖ) קיים ייצוג <strong>יחיד</strong> כצ&quot;ל של v₁,...,vₖ</p>
        </Thm>

        <Proof title="בת&quot;ל ⟺ ייצוג יחיד — הוכחה (מועד א' 2024 שאלה 1a)">
          <p><strong>⟹:</strong> נניח בת&quot;ל ויהי v ∈ Span(v₁,...,vₖ). נניח שני ייצוגים:</p>
          <p>v = α₁v₁+...+αₖvₖ = β₁v₁+...+βₖvₖ</p>
          <p>אז (α₁-β₁)v₁+...+(αₖ-βₖ)vₖ = 0⃗</p>
          <p>מבת&quot;ל: αᵢ-βᵢ=0 לכל i, כלומר αᵢ=βᵢ.</p>
          <p><strong>⟸:</strong> נניח ייצוג יחיד. נניח α₁v₁+...+αₖvₖ=0⃗.</p>
          <p>גם 0·v₁+...+0·vₖ=0⃗. מייצוג יחיד: αᵢ=0 לכל i. לכן בת&quot;ל.</p>
        </Proof>

        <Def title="בסיס (Basis)">
          <p>B = (v₁,...,vₙ) הוא בסיס של V אם:</p>
          <p>1. v₁,...,vₙ בת&quot;ל</p>
          <p>2. V = Span(v₁,...,vₙ)</p>
          <p>שקילות: B בסיס ⟺ כל v ∈ V ניתן לייצוג <strong>יחיד</strong> כצ&quot;ל של B</p>
        </Def>

        <Def title="ממד (Dimension)">
          <p>dim(V) = מספר האיברים בבסיס כלשהו של V</p>
          <p>מוגדר היטב: כל שני בסיסים של V הם באותו גודל (לפי למת שטייניץ)</p>
          <p><M>dim({'{0⃗}'}) = 0</M></p>
        </Def>

        <Thm title="למת שטייניץ (Steinitz Exchange Lemma)">
          <p>אם v₁,...,vₖ בת&quot;ל ו-w₁,...,wₘ פורשים את V, אז <M>k ≤ m</M>.</p>
        </Thm>

        <Proof title="למת שטייניץ — הוכחה (מועד א' 2024 שאלה 2a!)">
          <p>באינדוקציה על k.</p>
          <p><strong>בסיס k=0:</strong> 0 ≤ m טריוויאלי.</p>
          <p><strong>צעד:</strong> נניח שהטענה נכונה ל-k-1. נניח v₁,...,vₖ בת&quot;ל ו-w₁,...,wₘ פורשים.</p>
          <p>כי w₁,...,wₘ פורשים: vₖ = Σβⱼwⱼ. קיים j כך ש-βⱼ≠0 (כי vₖ≠0⃗).</p>
          <p>בלי הגבלת הכלליות j=m. אז wₘ = (1/βₘ)(vₖ - Σⱼ₌₁ᵐ⁻¹ βⱼwⱼ).</p>
          <p>לכן w₁,...,wₘ₋₁,vₖ פורשים את V.</p>
          <p>v₁,...,vₖ₋₁ בת&quot;ל (תת-קבוצה של בת&quot;ל). מהנחת האינדוקציה: k-1 ≤ m-1, לכן k ≤ m.</p>
        </Proof>

        <Thm title="מסקנות מלמת שטייניץ">
          <p>1. כל שני בסיסים של V הם באותו גודל</p>
          <p>2. אם dim(V)=n אז: כל n+1 וקטורים הם ת&quot;ל</p>
          <p>3. אם dim(V)=n אז: כל קבוצה פורשת מכילה לפחות n וקטורים</p>
          <p>4. אם dim(V)=n ו-v₁,...,vₙ בת&quot;ל ⟹ הם בסיס</p>
          <p>5. אם dim(V)=n ו-v₁,...,vₙ פורשים ⟹ הם בסיס</p>
        </Thm>

        <ExamTip>
          <strong>מועד א&apos; 2024 שאלה 2b:</strong> פולינומים p₀,...,pₙ עם deg(pⱼ)=j הם בסיס של Fₙ[x].
          רמז: dim(Fₙ[x])=n+1 ויש n+1 פולינומים, מספיק להוכיח בת&quot;ל. הניחו Σαⱼpⱼ=0, הסתכלו על המקדם המוביל.
        </ExamTip>

        <Thm title="השלמה לבסיס">
          <p>כל קבוצה בת&quot;ל ב-V נוצר סופית ניתנת להשלמה לבסיס.</p>
          <p>כל קבוצה פורשת מכילה בסיס.</p>
        </Thm>

        <Technique title="הוכחת αu+w, v₁,...,vₖ בת&quot;ל (מועד א' 2024 שאלה 1b)">
          <p>נתון: v₁,...,vₖ בת&quot;ל, u ∈ Span(v₁,...,vₖ), w ∉ Span(v₁,...,vₖ).</p>
          <p>נניח β(αu+w) + γ₁v₁+...+γₖvₖ = 0⃗.</p>
          <p>אם β≠0: w = (-γ₁/β)v₁+...+(-γₖ/β)vₖ + (-α)u. כי u ∈ Span ⟹ w ∈ Span — סתירה!</p>
          <p>לכן β=0, ואז γ₁v₁+...+γₖvₖ = 0⃗ ⟹ γᵢ=0 (בת&quot;ל). הכל 0, לכן בת&quot;ל.</p>
        </Technique>
      </Section>

      {/* ==================== */}
      {/* PART 4: SUBSPACE OPERATIONS */}
      {/* ==================== */}
      <Section title="4. פעולות על תתי-מרחבים" icon={<BookOpen className="w-5 h-5" />} color="text-teal-700">
        <Def title="סכום U + W">
          <p><M>U + W = {'{u + w : u ∈ U, w ∈ W}'}</M></p>
          <p>זהו תת-מרחב! (תמיד מכיל 0⃗ כי 0⃗+0⃗=0⃗)</p>
          <p>שקילות: U + W = Span(U ∪ W)</p>
        </Def>

        <Proof title="U+W תת-מרחב — הוכחה (מועד ב' 2024 שאלה 2a.i)">
          <p>0⃗ = 0⃗+0⃗ ∈ U+W (כי 0⃗ ∈ U ו-0⃗ ∈ W).</p>
          <p>יהיו x,y ∈ U+W ו-α ∈ F. אז x=u₁+w₁, y=u₂+w₂ (u ∈ U, w ∈ W).</p>
          <p>αx+y = (αu₁+u₂)+(αw₁+w₂) ∈ U+W (כי U,W תתי-מרחבים).</p>
        </Proof>

        <Thm title="נוסחת הממדים (Dimension Formula)">
          <p><M>dim(U+W) = dim(U) + dim(W) - dim(U∩W)</M></p>
        </Thm>

        <Proof title="נוסחת הממדים — הוכחה מלאה (מועד ב' 2024 שאלה 2a.ii!)">
          <p>יהי (a₁,...,aₖ) בסיס ל-U∩W, dim(U∩W)=k.</p>
          <p>השלם לבסיס U: (a₁,...,aₖ,u₁,...,uₚ), dim(U)=k+p.</p>
          <p>השלם לבסיס W: (a₁,...,aₖ,w₁,...,wq), dim(W)=k+q.</p>
          <p><strong>טענה:</strong> B = (a₁,...,aₖ,u₁,...,uₚ,w₁,...,wq) בסיס ל-U+W.</p>
          <p><strong>פורש:</strong> כל v ∈ U+W הוא v=u+w, u ∈ U, w ∈ W. ניתן לכתוב u כצ&quot;ל של aᵢ,uⱼ ו-w כצ&quot;ל של aᵢ,wⱼ.</p>
          <p><strong>בת&quot;ל:</strong> נניח Σαᵢaᵢ+Σβⱼuⱼ+Σγⱼwⱼ = 0⃗.</p>
          <p>אז Σγⱼwⱼ = -Σαᵢaᵢ-Σβⱼuⱼ ∈ U (צד ימין ∈ U). גם ∈ W (צד שמאל).</p>
          <p>לכן Σγⱼwⱼ ∈ U∩W, כלומר Σγⱼwⱼ = Σδᵢaᵢ.</p>
          <p>כי (a₁,...,aₖ,w₁,...,wq) בסיס W ⟹ γⱼ=0 לכל j ו-δᵢ=0.</p>
          <p>נשאר Σαᵢaᵢ+Σβⱼuⱼ = 0⃗ ⟹ αᵢ=βⱼ=0 (בסיס U).</p>
          <p>לכן dim(U+W) = k+p+q = (k+p)+(k+q)-k = dim(U)+dim(W)-dim(U∩W).</p>
        </Proof>

        <Def title="סכום ישר (Direct Sum)">
          <p>V = U ⊕ W אם:</p>
          <p>1. V = U + W</p>
          <p>2. U ∩ W = {'{0⃗}'}</p>
          <p>שקילות: כל v ∈ V ניתן לייצוג <strong>יחיד</strong> כ-v = u+w (u ∈ U, w ∈ W)</p>
        </Def>

        <Thm title="סכום ישר ⟺ dim(Y) = dim(U) + dim(W)">
          <p>Y = U+W. אז Y = U ⊕ W ⟺ dim(Y) = dim(U) + dim(W).</p>
          <p><strong>זהירות:</strong> V = U ⊕ W ⟺ dim(V) = dim(U) + dim(W) זה <strong>לא נכון</strong> באופן כללי!</p>
          <p>צריך גם V = U+W, לא מספיק שהממדים מסתדרים.</p>
        </Thm>

        <ExamTip>
          <strong>מועד ב&apos; 2024 שאלה 5a:</strong> הוכח Y=U⊕W ⟺ dim(Y)=dim(U)+dim(W), והפרך: V=U⊕W iff dim(V)=dim(U)+dim(W).
          דוגמת נגד להפרכה: V=ℝ², U=W=Span((1,0)). אז dim(V)=2=1+1=dim(U)+dim(W), אבל V≠U+W.
        </ExamTip>

        <Technique title="חסם על dim(U∩W) (מועד א' 2024 שאלה 3b)">
          <p>מנוסחת הממדים: dim(U∩W) = dim(U)+dim(W)-dim(U+W).</p>
          <p>כי U+W ⊆ V: dim(U+W) ≤ dim(V) = n.</p>
          <p>לכן dim(U∩W) ≥ dim(U)+dim(W)-n.</p>
          <p>כי U∩W ⊆ U: dim(U∩W) ≤ dim(U).</p>
          <p>דוגמה: dim(U)=dim(W)=n-2 ⟹ n-4 ≤ dim(U∩W) ≤ n-2.</p>
        </Technique>

        <Technique title="dim W = n-1, U ⊄ W ⟹ V = U+W (מועד א' 2024 שאלה 5a)">
          <p>כי U ⊄ W, קיים u ∈ U \ W. לכן u ∉ W.</p>
          <p>dim(W) = n-1, u ∉ W, לכן Span(W ∪ {'{u}'}) = V (כי dim ≥ n).</p>
          <p>Span(W ∪ {'{u}'}) ⊆ W + U, לכן V ⊆ U+W ⊆ V, כלומר V = U+W.</p>
        </Technique>
      </Section>

      {/* ==================== */}
      {/* PART 5: LINEAR SYSTEMS */}
      {/* ==================== */}
      <Section title="5. מערכות משוואות לינאריות" icon={<Zap className="w-5 h-5" />} color="text-orange-700">
        <Def title="מערכת לינארית ודירוג">
          <p>Ax = b — מערכת של m משוואות ב-n נעלמים.</p>
          <p>מדרגים את [A|b] ע&quot;י פעולות שורה אלמנטריות (R₁↔R₂, R₁→αR₁, R₁→R₁+αR₂).</p>
          <p>צורה קנונית = צורת מדרגות מצומצמת (RREF).</p>
        </Def>

        <Thm title="מספר הפתרונות">
          <p>- <strong>אין פתרון:</strong> שורת סתירה (0 0 ... 0 | c) כאשר c≠0</p>
          <p>- <strong>פתרון יחיד:</strong> אין שורת סתירה ואין משתנים חופשיים (rank = n)</p>
          <p>- <strong>אינסוף פתרונות:</strong> אין שורת סתירה ויש משתנים חופשיים</p>
        </Thm>

        <Technique title="מערכת עם פרמטר (מועד א' 2024 שאלה 3a!)">
          <p>1. כתוב את המטריצה המורחבת [A|b]</p>
          <p>2. דרג — שמור את הפרמטר כמו שהוא</p>
          <p>3. מצא מתי יש שורת סתירה (אין פתרון)</p>
          <p>4. בערכים שנותרו: מתי rank=n (פתרון יחיד) ומתי rank&lt;n (אינסוף)</p>
        </Technique>

        <GoldenRule>
          במערכת עם פרמטר a: תמיד לדרג קודם, ואז לבדוק ערכים קריטיים בנפרד. מחלקים ב-a רק אם a≠0!
        </GoldenRule>

        <Thm title="מרחב הפתרונות של Ax=0">
          <p>מרחב הפתרונות של Ax=0 הוא תת-מרחב של Fⁿ.</p>
          <p>dim(Null(A)) = n - rank(A) (Rank-Nullity)</p>
          <p>הפתרון הכללי של Ax=b: x = x₀ + Null(A), כאשר x₀ פתרון פרטי.</p>
        </Thm>

        <ExamTip>
          לזכור: אם Ax=0 ו-Bx=0 יש אותו מרחב פתרונות ⟺ A ו-B שקולות שורה (אותה צורה קנונית).
        </ExamTip>
      </Section>

      {/* ==================== */}
      {/* PART 6: MATRICES */}
      {/* ==================== */}
      <Section title="6. מטריצות" icon={<BookOpen className="w-5 h-5" />} color="text-red-700">
        <Def title="כפל מטריצות">
          <p>A ∈ M_{'{m×n}'}, B ∈ M_{'{n×p}'}: (AB)ᵢⱼ = Σₖ aᵢₖbₖⱼ</p>
          <p><strong>לא קומוטטיבי!</strong> AB ≠ BA בד&quot;כ.</p>
          <p>אסוציאטיבי: (AB)C = A(BC).</p>
          <p>דיסטריבוטיבי: A(B+C) = AB+AC.</p>
        </Def>

        <Def title="שחלוף (Transpose)">
          <p>(Aᵗ)ᵢⱼ = (A)ⱼᵢ — מחליפים שורות ועמודות</p>
          <p>תכונות: (A+B)ᵗ = Aᵗ+Bᵗ, (αA)ᵗ = αAᵗ, (AB)ᵗ = BᵗAᵗ (סדר הפוך!), (Aᵗ)ᵗ = A</p>
        </Def>

        <Thm title="(AB)ᵗ = BᵗAᵗ — הוכחה">
          <p>צריך להראות ((AB)ᵗ)ᵢⱼ = (BᵗAᵗ)ᵢⱼ.</p>
          <p>((AB)ᵗ)ᵢⱼ = (AB)ⱼᵢ = Σₖ aⱼₖbₖᵢ</p>
          <p>(BᵗAᵗ)ᵢⱼ = Σₖ (Bᵗ)ᵢₖ(Aᵗ)ₖⱼ = Σₖ bₖᵢaⱼₖ = Σₖ aⱼₖbₖᵢ ✓</p>
        </Thm>

        <Def title="סוגי מטריצות מיוחדים">
          <p><strong>סימטרית:</strong> Aᵗ = A (aᵢⱼ = aⱼᵢ)</p>
          <p><strong>אנטי-סימטרית:</strong> Aᵗ = -A (aᵢⱼ = -aⱼᵢ, ובפרט aᵢᵢ=0)</p>
          <p><strong>אלכסונית:</strong> aᵢⱼ = 0 לכל i≠j</p>
          <p><strong>משולשית עליונה/תחתונה:</strong> aᵢⱼ=0 מתחת/מעל לאלכסון</p>
          <p><strong>אידמפוטנטית:</strong> A² = A</p>
          <p><strong>נילפוטנטית:</strong> Aᵏ = 0 לאיזשהו k</p>
        </Def>

        <Thm title="תכונות מטריצה אנטי-סימטרית (מש&quot;ב 10)">
          <p>אם A אנטי-סימטרית (Aᵗ=-A) ו-B סימטרית (Bᵗ=B):</p>
          <p>AB סימטרית ⟺ AB = BA (AB מתחלפות)</p>
        </Thm>

        <Def title="עקבה (Trace)">
          <p><M>Tr(A) = Σᵢ aᵢᵢ</M> (סכום האלכסון)</p>
          <p>תכונות: Tr(A+B)=Tr(A)+Tr(B), Tr(αA)=αTr(A), <strong>Tr(AB)=Tr(BA)</strong></p>
        </Def>

        <GoldenRule>
          Tr(AB) = Tr(BA) תמיד! גם אם AB ≠ BA. טכניקה חזקה: Tr(A²) = Tr(A·A)
        </GoldenRule>
      </Section>

      {/* ==================== */}
      {/* PART 7: INVERTIBILITY */}
      {/* ==================== */}
      <Section title="7. הפיכות (Invertibility)" icon={<CheckCircle className="w-5 h-5" />} color="text-emerald-700">
        <Def title="מטריצה הפיכה">
          <p>A ∈ Mₙ(F) הפיכה אם קיימת B ∈ Mₙ(F) כך ש-AB = BA = Iₙ. סימון: B = A⁻¹.</p>
        </Def>

        <Thm title="משפט ההפיכות הגדול — 10+ תנאים שקולים">
          <p>עבור A ∈ Mₙ(F), <strong>כל</strong> התנאים הבאים שקולים:</p>
          <p>1. A הפיכה</p>
          <p>2. det(A) ≠ 0</p>
          <p>3. rank(A) = n</p>
          <p>4. עמודות A בת&quot;ל</p>
          <p>5. שורות A בת&quot;ל</p>
          <p>6. Ax=0 ⟹ x=0 (הפתרון היחיד הוא הטריוויאלי)</p>
          <p>7. Null(A) = {'{0⃗}'}</p>
          <p>8. Ax=b יש פתרון יחיד לכל b</p>
          <p>9. הצורה הקנונית של A היא Iₙ</p>
          <p>10. A מכפלה של מטריצות אלמנטריות</p>
          <p>11. קיימת B כך ש-AB = Iₙ (מספיק צד אחד!)</p>
          <p>12. קיימת B כך ש-BA = Iₙ</p>
        </Thm>

        <Thm title="תכונות הפיכות">
          <p>(AB)⁻¹ = B⁻¹A⁻¹ (סדר הפוך!)</p>
          <p>(Aᵗ)⁻¹ = (A⁻¹)ᵗ</p>
          <p>(αA)⁻¹ = (1/α)A⁻¹</p>
          <p>A הפיכה ⟹ A⁻¹ הפיכה ו-(A⁻¹)⁻¹ = A</p>
        </Thm>

        <Technique title="AB = A+B ⟹ A-I הפיכה (מועד א' 2024 שאלה 5b!)">
          <p>AB = A+B ⟹ AB-A-B = 0 ⟹ AB-A-B+I = I</p>
          <p>⟹ A(B-I)-(B-I) = I ⟹ (A-I)(B-I) = I</p>
          <p>לכן A-I הפיכה (עם הופכי B-I).</p>
          <p>אם גם A הפיכה: B = A⁻¹(A+B) = I+A⁻¹B, לכן B-I = A⁻¹B, לכן B(I-A⁻¹) = I... (או: (B-I)(A-I)=I גם, לכן B-I הפיכה).</p>
        </Technique>

        <Technique title="A = Iₙ - AB ⟹ הפיכות (מועד ב' 2024 שאלה 3a!)">
          <p><strong>הפיכות של A:</strong></p>
          <p>A = I-AB, לכן A+AB = I, לכן A(I+B) = I.</p>
          <p>לכן A הפיכה עם A⁻¹ = I+B.</p>
          <p><strong>AB = BA:</strong> A⁻¹ = I+B, לכן A(I+B)=I, גם (I+B)A=I.</p>
          <p>(I+B)A = I ⟹ A+BA=I ⟹ BA = I-A = AB. ✓</p>
          <p><strong>אם B³=0:</strong> A = I-AB = I-(I-A)B... מפתחים עד A = I-B+B².</p>
        </Technique>

        <GoldenRule>
          טריק מטריצות: כשיש משוואה מטריצתית, נסה לפרק ל-(??)(???) = I כדי למצוא הופכי!
          <br />דוגמה: AB-A-B=0 → הוסף I לשני הצדדים → (A-I)(B-I)=I.
        </GoldenRule>
      </Section>

      {/* ==================== */}
      {/* PART 8: RANK */}
      {/* ==================== */}
      <Section title="8. דרגה (Rank)" icon={<BookOpen className="w-5 h-5" />} color="text-cyan-700">
        <Def title="דרגה">
          <p>rank(A) = מספר השורות הלא-אפסיות בצורה המדורגת = מספר הפיבוטים.</p>
          <p>שקילות: rank(A) = dim(Col(A)) = dim(Row(A)).</p>
        </Def>

        <Thm title="תכונות דרגה">
          <p>1. rank(A) = rank(Aᵗ)</p>
          <p>2. rank(AB) ≤ min(rank(A), rank(B))</p>
          <p>3. rank(A+B) ≤ rank(A) + rank(B)</p>
          <p>4. P הפיכה ⟹ rank(PA) = rank(A) = rank(AQ) (Q הפיכה)</p>
          <p>5. <M>rank(A) + nullity(A) = n</M> (Rank-Nullity)</p>
        </Thm>

        <Thm title="rank(A) = 1 ⟺ A = uvᵗ (מש&quot;ב 10)">
          <p>A ∈ M_{'{m×n}'} בעלת דרגה 1 ⟺ קיימים u ∈ Fᵐ, v ∈ Fⁿ (לא אפס) כך ש-A = uvᵗ.</p>
        </Thm>

        <Thm title="שקילות שורות ודרגה">
          <p>A, B שקולות שורה ⟺ יש אותה צורה קנונית ⟺ rank(A) = rank(B) ושורות A ו-B פורשות אותו מרחב.</p>
          <p>B = PA (P הפיכה) ⟹ A, B שקולות שורה.</p>
        </Thm>

        <ExamTip>
          <strong>מועד ב&apos; 2024 שאלה 3b:</strong> B = AᵗP (P הפיכה). האם A, Bᵗ שקולות שורה?
          Bᵗ = (AᵗP)ᵗ = PᵗA. כי Pᵗ הפיכה ⟹ Bᵗ = PᵗA, לכן כן, שקולות שורה!
        </ExamTip>

        <ExamTip>
          <strong>מועד ב&apos; 2024 שאלה 4a:</strong> מצא צורה קנונית C ומטריצה הפיכה P כך ש-PA=C.
          פשוט דרג את A ורשום את פעולות השורה כמטריצות אלמנטריות. P = Eₖ·...·E₁.
          טיפ: דרג את [A|I] ⟹ תקבל [C|P].
        </ExamTip>

        <Thm title="Null(AᵗA) = Null(A) (מועד ב' 2024 שאלה 2b)">
          <p><strong>Null(A) ⊆ Null(AᵗA):</strong> x ∈ Null(A) ⟹ Ax=0⃗ ⟹ AᵗAx = Aᵗ·0⃗ = 0⃗.</p>
          <p><strong>Null(AᵗA) ⊆ Null(A):</strong> AᵗAx=0⃗ ⟹ xᵗAᵗAx=0 ⟹ (Ax)ᵗ(Ax)=0 ⟹ ||Ax||²=0 ⟹ Ax=0⃗.</p>
          <p>(השלב האחרון: (ȳ)ᵗȳ = Σyᵢ² = 0 ⟹ yᵢ=0 לכל i ⟹ ȳ=0⃗, עבור ℝ)</p>
        </Thm>
      </Section>

      {/* ==================== */}
      {/* PART 9: DETERMINANTS */}
      {/* ==================== */}
      <Section title="9. דטרמיננטות" icon={<BookOpen className="w-5 h-5" />} color="text-violet-700">
        <Def title="דטרמיננטה">
          <p>det: Mₙ(F) → F, מוגדרת ע&quot;י נוסחת לייבניץ:</p>
          <p><M>det(A) = Σ_{'{σ∈Sₙ}'} sgn(σ) · a_{'{1,σ(1)}'} · a_{'{2,σ(2)}'} · ... · a_{'{n,σ(n)}'}</M></p>
        </Def>

        <Thm title="תכונות דטרמיננטה">
          <p>1. det(Iₙ) = 1</p>
          <p>2. <strong>מולטילינארית:</strong> לינארית בכל שורה בנפרד</p>
          <p>3. <strong>אלטרנטיבית:</strong> שתי שורות זהות ⟹ det = 0</p>
          <p>4. det(Aᵗ) = det(A)</p>
          <p>5. <strong>det(AB) = det(A)·det(B)</strong></p>
          <p>6. A הפיכה ⟺ det(A) ≠ 0</p>
          <p>7. det(A⁻¹) = 1/det(A)</p>
          <p>8. det(αA) = αⁿ·det(A) (עבור A ∈ Mₙ)</p>
          <p>9. החלפת שורות: det מתחלף סימן</p>
          <p>10. הוספת כפולה של שורה לשורה אחרת: det לא משתנה</p>
        </Thm>

        <Technique title="חישוב דטרמיננטה">
          <p><strong>2×2:</strong> det = ad - bc</p>
          <p><strong>3×3:</strong> כלל סארוס או פיתוח לפי שורה/עמודה</p>
          <p><strong>n×n:</strong> פיתוח לפי שורה/עמודה (Cofactor expansion):</p>
          <p><M>det(A) = Σⱼ (-1)^{'{i+j}'} aᵢⱼ · Mᵢⱼ</M></p>
          <p>כאשר Mᵢⱼ הוא המינור (דטרמיננטה של המטריצה ללא שורה i ועמודה j).</p>
          <p><strong>טיפ:</strong> בחר שורה/עמודה עם הכי הרבה אפסים!</p>
        </Technique>

        <Thm title="דטרמיננטה של מטריצה משולשית">
          <p>מטריצה משולשית (עליונה או תחתונה): det = מכפלת האלכסון.</p>
          <p>גם מטריצת בלוקים משולשית: <M>det([A B; 0 D]) = det(A)·det(D)</M></p>
        </Thm>

        <Technique title="דטרמיננטה עם פרמטר (מועד א' 2024 שאלה 4b)">
          <p>A הפיכה ⟺ det(A) ≠ 0.</p>
          <p>חשב det(A) כפונקציה של m, פתור det(A)=0 ⟹ A הפיכה לכל m שלא מאפס.</p>
        </Technique>

        <Technique title="דטרמיננטה באינדוקציה (מש&quot;ב 12)">
          <p>למטריצות עם מבנה חוזר (טרידיאגונלית, וכו&apos;):</p>
          <p>1. חשב det(A₁), det(A₂) ידנית</p>
          <p>2. פתח לפי שורה/עמודה ראשונה ⟹ נוסחת נסיגה</p>
          <p>3. הוכח באינדוקציה</p>
          <p>דוגמה: Aₙ טרידיאגונלית עם 2 באלכסון ו-1 מעל/מתחת ⟹ det(Aₙ)=n+1</p>
        </Technique>

        <GoldenRule>
          דטרמיננטה של מטריצה אנטי-סימטרית n×n: אם n אי-זוגי ⟹ det(A) = 0.
          <br />הוכחה: det(A) = det(Aᵗ) = det(-A) = (-1)ⁿdet(A) = -det(A) ⟹ 2det(A)=0.
        </GoldenRule>
      </Section>

      {/* ==================== */}
      {/* PART 10: LINEAR TRANSFORMATIONS */}
      {/* ==================== */}
      <Section title="10. העתקות לינאריות" icon={<BookOpen className="w-5 h-5" />} color="text-pink-700">
        <Def title="העתקה לינארית">
          <p>T: V → W היא העתקה לינארית אם:</p>
          <p>1. T(u+v) = T(u)+T(v) לכל u,v ∈ V</p>
          <p>2. T(αv) = αT(v) לכל α ∈ F, v ∈ V</p>
          <p>שקילות: T(αu+βv) = αT(u)+βT(v) (שימור צירופים לינאריים)</p>
        </Def>

        <Thm title="תכונות בסיסיות">
          <p>T(0⃗) = 0⃗ (תמיד!)</p>
          <p>T(-v) = -T(v)</p>
          <p>T נקבעת לחלוטין ע&quot;י ערכיה על בסיס</p>
        </Thm>

        <Def title="גרעין ותמונה">
          <p><M>Ker(T) = {'{v ∈ V : T(v) = 0⃗}'}</M> — תת-מרחב של V</p>
          <p><M>Im(T) = {'{T(v) : v ∈ V}'}</M> — תת-מרחב של W</p>
        </Def>

        <Thm title="משפט הממד (Rank-Nullity for T)">
          <p><M>dim(V) = dim(Ker(T)) + dim(Im(T))</M></p>
        </Thm>

        <Thm title="חח&quot;ע, על, איזומורפיזם">
          <p>T חח&quot;ע ⟺ Ker(T) = {'{0⃗}'}</p>
          <p>T על ⟺ Im(T) = W</p>
          <p>T איזומורפיזם ⟺ T חח&quot;ע ועל ⟺ T הפיכה</p>
          <p>אם dim(V) = dim(W): T חח&quot;ע ⟺ T על (מספיק אחד!)</p>
        </Thm>

        <Def title="מטריצה מייצגת">
          <p>אם B = (v₁,...,vₙ) בסיס של V ו-C בסיס של W:</p>
          <p>[T]ᵇ_c = מטריצה שעמודותיה הן [T(vⱼ)]_c (קואורדינטות T(vⱼ) לפי C)</p>
          <p>rank(T) = rank([T])</p>
        </Def>
      </Section>

      {/* ==================== */}
      {/* PART 11: DIMENSION OVER DIFFERENT FIELDS */}
      {/* ==================== */}
      <Section title="11. ממד מעל שדות שונים" icon={<Lightbulb className="w-5 h-5" />} color="text-amber-700">
        <Thm title="dim_ℂ(V) = n ⟹ dim_ℝ(V) = 2n (מועד א' 2024 שאלה 4a!)">
          <p>יהי B = (v₁,...,vₙ) בסיס של V מעל ℂ.</p>
          <p><strong>טענה:</strong> B&apos; = (v₁, iv₁, v₂, iv₂, ..., vₙ, ivₙ) בסיס של V מעל ℝ.</p>
        </Thm>

        <Proof title="dim_ℂ(V)=n ⟹ dim_ℝ(V)=2n — הוכחה">
          <p><strong>פורש:</strong> יהי v ∈ V. כי B בסיס ℂ: v = Σ(αⱼ+iβⱼ)vⱼ = Σαⱼvⱼ + Σβⱼ(ivⱼ), כאשר αⱼ,βⱼ ∈ ℝ.</p>
          <p>לכן v ∈ Span_ℝ(v₁,iv₁,...,vₙ,ivₙ).</p>
          <p><strong>בת&quot;ל:</strong> נניח Σαⱼvⱼ + Σβⱼ(ivⱼ) = 0⃗ (αⱼ,βⱼ ∈ ℝ).</p>
          <p>⟹ Σ(αⱼ+iβⱼ)vⱼ = 0⃗. כי B בת&quot;ל מעל ℂ: αⱼ+iβⱼ = 0 לכל j.</p>
          <p>כי αⱼ,βⱼ ∈ ℝ: αⱼ=0 ו-βⱼ=0 לכל j. ✓</p>
        </Proof>
      </Section>

      {/* ==================== */}
      {/* PART 12: PROVE/DISPROVE */}
      {/* ==================== */}
      <Section title="12. הוכח/הפרך — טכניקות" icon={<AlertTriangle className="w-5 h-5" />} color="text-red-600">
        <Technique title="טכניקות הוכחה">
          <p><strong>ישירה:</strong> קח אלמנט כללי ← הראה שהוא מקיים את התכונה</p>
          <p><strong>בשלילה:</strong> הנח ההפך ← הגע לסתירה</p>
          <p><strong>הכלה דו-כיוונית:</strong> להוכיח A=B הוכח A⊆B ו-B⊆A</p>
          <p><strong>אינדוקציה:</strong> בסיס ← צעד (שימושי במיוחד לדטרמיננטות!)</p>
        </Technique>

        <Technique title="טכניקות הפרכה">
          <p>מספיק <strong>דוגמת נגד אחת</strong>!</p>
          <p><strong>דוגמאות נגד קלאסיות:</strong></p>
          <p>- A² = A אבל A ≠ 0 ו-A ≠ I: A = [[1,0],[0,0]]</p>
          <p>- AB ≠ BA: A = [[0,1],[0,0]], B = [[0,0],[1,0]]</p>
          <p>- AB = 0 אבל A≠0, B≠0: A = [[1,0],[0,0]], B = [[0,0],[0,1]]</p>
          <p>- U+W ≠ U∪W: U = Span((1,0)), W = Span((0,1)) ⟹ (1,1) ∈ U+W אבל (1,1) ∉ U∪W</p>
          <p>- U∪W לא תת-מרחב (אם U ⊄ W ו-W ⊄ U)</p>
        </Technique>

        <GoldenRule>
          בשאלת הוכח/הפרך: קודם נסה דוגמאות קטנות (2×2, ℝ²). אם עובד — נסה להוכיח. אם מצאת נגד — כתוב אותו.
        </GoldenRule>

        <ExamTip>
          <strong>מועד ב&apos; 2024 שאלה 4b:</strong> V=U+W, S₁={'{v₁+u: u∈U}'}, S₂={'{v₂+w: w∈W}'}. הוכח S₁∩S₂ ≠ ∅.
          <br />כי V=U+W: v₁-v₂ = u₀+w₀ (u₀∈U, w₀∈W). אז v₁+(-u₀) = v₂+w₀ ∈ S₁∩S₂.
        </ExamTip>
      </Section>

      {/* ==================== */}
      {/* PART 13: POLYNOMIALS */}
      {/* ==================== */}
      <Section title="13. מרחבי פולינומים" icon={<BookOpen className="w-5 h-5" />} color="text-lime-700">
        <Thm title="בסיס סטנדרטי של Fₙ[x]">
          <p>B = (1, x, x², ..., xⁿ) בסיס של Fₙ[x]. לכן dim(Fₙ[x]) = n+1.</p>
        </Thm>

        <Thm title="פולינומים עם דרגות שונות הם בסיס (מועד א' 2024 שאלה 2b)">
          <p>p₀,...,pₙ ∈ F[x] עם deg(pⱼ) = j ⟹ הם בסיס של Fₙ[x].</p>
        </Thm>

        <Proof title="פולינומים עם דרגות שונות — הוכחה">
          <p>יש n+1 פולינומים ו-dim(Fₙ[x])=n+1, מספיק להוכיח בת&quot;ל.</p>
          <p>נניח α₀p₀+...+αₙpₙ = 0 (פולינום האפס).</p>
          <p>הסתכל על המקדם המוביל (מדרגה n): רק pₙ תורם, לכן αₙ·(מקדם מוביל של pₙ) = 0 ⟹ αₙ=0.</p>
          <p>עכשיו הסתכל על דרגה n-1: רק pₙ₋₁ תורם (כי αₙ=0) ⟹ αₙ₋₁=0.</p>
          <p>ממשיכים כך עד α₀=0. ✓</p>
        </Proof>

        <Thm title="F[x] לא נוצר סופית">
          <p>dim(F[x]) = ∞. אין בסיס סופי.</p>
          <p>הוכחה: לכל n, הפולינומים 1,x,...,xⁿ בת&quot;ל, לכן dim ≥ n+1 לכל n.</p>
        </Thm>

        <ExamTip>
          <strong>מועד ב&apos; 2024 שאלה 5b:</strong> W = {'{p ∈ F[x] : p(α₁)=p(α₂)=0}'} לא נוצר סופית.
          <br />W מכיל (x-α₁)(x-α₂)·xⁿ לכל n, ואלה בת&quot;ל, לכן dim(W)=∞.
        </ExamTip>
      </Section>

      {/* ==================== */}
      {/* EXAM ANALYSIS */}
      {/* ==================== */}
      <Section title="ניתוח מבחני 2024 — מה לצפות" icon={<Target className="w-5 h-5" />} color="text-red-700">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <h3 className="font-bold text-indigo-900 text-sm mb-3">מועד א&apos; 2024 — 5 שאלות (עונים על 4)</h3>
          <div className="text-sm text-indigo-800 space-y-2">
            <p><strong>ש1:</strong> בת&quot;ל ⟺ ייצוג יחיד + הוכחת בת&quot;ל של αu+w,v₁,...,vₖ</p>
            <p><strong>ש2:</strong> למת שטייניץ (k≤m) + בסיס פולינומים</p>
            <p><strong>ש3:</strong> מערכת עם פרמטר + חסם dim(U∩W)</p>
            <p><strong>ש4:</strong> dim_ℂ=n ⟹ dim_ℝ=2n + הפיכות עם פרמטר (det)</p>
            <p><strong>ש5:</strong> dim W=n-1, U⊄W ⟹ V=U+W + AB=A+B הפיכות</p>
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
          <h3 className="font-bold text-rose-900 text-sm mb-3">מועד ב&apos; 2024 — 5 שאלות (עונים על 4)</h3>
          <div className="text-sm text-rose-800 space-y-2">
            <p><strong>ש1:</strong> אפיון ת&quot;ל (vⱼ ∈ Span קודמים) + תת-שדה סופי</p>
            <p><strong>ש2:</strong> הגדרת U+W + נוסחת ממדים + Null(AᵗA)=Null(A)</p>
            <p><strong>ש3:</strong> A=I-AB הפיכות, AB=BA, B³=0 + שקילות שורות</p>
            <p><strong>ש4:</strong> צורה קנונית + S₁∩S₂ ≠ ∅</p>
            <p><strong>ש5:</strong> סכום ישר ⟺ dim + פולינומים עם שורשים (W לא נ&quot;ס)</p>
          </div>
        </div>

        <GoldenRule>
          אסטרטגיה: קרא את כל 5 השאלות. בחר 4 שאת הכי בטוחה בהן. התחל מהקלה ביותר!
        </GoldenRule>
      </Section>

      {/* ==================== */}
      {/* GOLDEN RULES CHEAT SHEET */}
      {/* ==================== */}
      <Section title="כללי זהב לבחינה" icon={<Award className="w-5 h-5" />} color="text-yellow-700">
        <GoldenRule>
          1. <strong>כתוב הגדרות מדויקות!</strong> &quot;תשובות ללא הסבר לא יקבלו ניקוד.&quot; תמיד ציין את שם המשפט ותנאיו.
        </GoldenRule>
        <GoldenRule>
          2. <strong>הוכחת בת&quot;ל:</strong> תמיד התחל ב-&quot;נניח α₁v₁+...+αₖvₖ = 0⃗&quot; ⟹ ... ⟹ &quot;αᵢ=0 לכל i&quot;.
        </GoldenRule>
        <GoldenRule>
          3. <strong>הוכחת תת-מרחב:</strong> 3 צעדים — 0⃗ ∈ W, סגור לחיבור, סגור לכפל בסקלר.
        </GoldenRule>
        <GoldenRule>
          4. <strong>להפריך:</strong> מספיק דוגמת נגד אחת. השתמש ב-2×2 או ℝ².
        </GoldenRule>
        <GoldenRule>
          5. <strong>מערכת עם פרמטר:</strong> לדרג קודם, לחלק למקרים אח&quot;כ. לא לחלק ב-0!
        </GoldenRule>
        <GoldenRule>
          6. <strong>הפיכות:</strong> כשמגיעים ל-AB = I ⟹ A הפיכה (מספיק צד אחד למטריצות ריבועיות!).
        </GoldenRule>
        <GoldenRule>
          7. <strong>דטרמיננטה:</strong> det(AB) = det(A)·det(B). det ≠ 0 ⟺ הפיכה.
        </GoldenRule>
        <GoldenRule>
          8. <strong>נוסחת ממדים:</strong> dim(U+W) = dim(U)+dim(W)-dim(U∩W). שימושי לחסמים!
        </GoldenRule>
        <GoldenRule>
          9. <strong>dim(V)=n ⟹</strong> n וקטורים בת&quot;ל = בסיס, n וקטורים פורשים = בסיס.
        </GoldenRule>
        <GoldenRule>
          10. <strong>Rank-Nullity:</strong> rank(A) + nullity(A) = n. nullity = מס&apos; משתנים חופשיים.
        </GoldenRule>

        <div className="mt-4 bg-gradient-to-r from-amber-100 to-yellow-100 border border-yellow-300 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-yellow-800 mb-2">בהצלחה במבחן!</p>
          <p className="text-sm text-yellow-700">את שולטת בחומר. רק לזכור הגדרות מדויקות ולעבוד בסדר.</p>
        </div>
      </Section>
    </div>
  );
}
