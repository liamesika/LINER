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
function QuestionBox({ num, pts, topic, children }: { num: number; pts: number; topic: string; children: React.ReactNode; }) {
  return (<div className="bg-white rounded-xl border-2 border-indigo-200 overflow-hidden"><div className="bg-indigo-50 px-5 py-3 flex items-center justify-between"><div className="flex items-center gap-3"><span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-lg">שאלה {num}</span><span className="text-indigo-700 font-medium text-sm">{topic}</span></div><span className="text-indigo-600 font-bold text-sm">{pts} נקודות</span></div><div className="p-5 space-y-4">{children}</div></div>);
}
function SubQ({ label, pts, children }: { label: string; pts: number; children: React.ReactNode }) {
  return (<div className="border-r-4 border-gray-300 pr-4"><div className="flex items-center gap-2 mb-2"><span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded">{label}</span><span className="text-gray-500 text-xs">({pts} נק&apos;)</span></div><div className="space-y-2">{children}</div></div>);
}
function Problem({ children }: { children: React.ReactNode }) {
  return (<div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-800"><div className="font-medium text-slate-600 text-xs mb-1 flex items-center gap-1"><FileText className="w-3 h-3" /> השאלה</div>{children}</div>);
}
function Solution({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (<div className="bg-emerald-50 border border-emerald-200 rounded-lg overflow-hidden"><button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-emerald-100 transition-colors"><span className="font-bold text-sm text-emerald-700 flex items-center gap-2"><CheckCircle className="w-4 h-4" />פתרון מלא</span>{open ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-emerald-600" />}</button>{open && (<div className="px-4 pb-4 text-sm text-emerald-800 space-y-2 border-t border-emerald-200 pt-3">{children}</div>)}</div>);
}
function Tip({ children }: { children: React.ReactNode }) {
  return (<div className="bg-amber-50 border border-amber-300 rounded-lg p-3 flex gap-2"><Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" /><div className="text-sm text-amber-800">{children}</div></div>);
}
function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono bg-gray-100 px-1 rounded text-sm">{children}</span>;
}

export default function SimulationPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          סימולציה 2026 — ניתוח + פתרונות
        </h1>
        <p className="text-gray-600">Linear Algebra 1, Simulation 2026 — Reichman University</p>
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
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium">
            ללא חומר עזר
          </span>
        </div>
      </div>

      {/* Overview */}
      <Section title="סקירת נושאים" icon={<Target className="w-5 h-5" />} color="text-indigo-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { q: 'שאלה 1', topics: 'כפל מטריצות + Trace', diff: 'בינוני' },
            { q: 'שאלה 2', topics: 'דטרמיננטת בלוקים + הפיכות שמאלית', diff: 'קשה' },
            { q: 'שאלה 3', topics: 'מערכת עם פרמטר + בת"ל/פרישה', diff: 'בינוני' },
            { q: 'שאלה 4', topics: 'דטרמיננטה 5×5 + ממד תת-מרחבים', diff: 'בינוני-קשה' },
            { q: 'שאלה 5', topics: 'הכלת תת-מרחבים + חסמי דרגה', diff: 'בינוני' },
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
          <strong>אסטרטגיה מומלצת:</strong> Q3 → Q1 → Q5 → Q4 (דלג על Q2 — הוכחת בלוקים ארוכה מההרצאה + חישוב הפיכות שמאלית).
        </Tip>
      </Section>

      {/* Strategy */}
      <Section title="סדר פתרון מומלץ" icon={<Star className="w-5 h-5" />} color="text-amber-600">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { order: '1', q: 'שאלה 3', reason: 'מערכת + בת"ל — שגרתי', time: '~40 דק' },
            { order: '2', q: 'שאלה 1', reason: 'הגדרה + הוכחה מהרצאה + דוגמה נגדית', time: '~40 דק' },
            { order: '3', q: 'שאלה 5', reason: 'הוכחה בשלילה + דרגות', time: '~45 דק' },
            { order: '4', q: 'שאלה 4', reason: 'דטרמיננטה + ממדים', time: '~45 דק' },
          ].map(({ order, q, reason, time }) => (
            <div key={order} className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-amber-600">{order}</div>
              <div className="font-bold text-sm mt-1">{q}</div>
              <div className="text-xs text-gray-600 mt-1">{reason}</div>
              <div className="text-xs font-medium text-amber-700 mt-2">{time}</div>
            </div>
          ))}
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-800">
            <strong>דלג על שאלה 2:</strong> הוכחת det(K)=det(A)det(B) למטריצת בלוקים היא הוכחה ארוכה מההרצאה, וחישוב הפיכות שמאלית דורש עבודה מכנית. עדיף להשקיע את הזמן בשאלות 3, 1, 5, 4.
          </div>
        </div>
      </Section>

      {/* ==================== */}
      {/* QUESTION 1 */}
      {/* ==================== */}
      <QuestionBox num={1} pts={25} topic="כפל מטריצות + Trace">
        <SubQ label="1.1" pts={17}>
          <div className="space-y-4">
            <SubQ label="1.1.1" pts={2}>
              <Problem>
                <p>הגדר את כפל המטריצות AB עבור <M>A ∈ M_{'{m×n}'}(F)</M>, <M>B ∈ M_{'{n×r}'}(F)</M>.</p>
              </Problem>
              <Solution>
                <p><strong>הגדרה:</strong> יהיו <M>A ∈ M_{'{m×n}'}(F)</M> ו-<M>B ∈ M_{'{n×r}'}(F)</M>.</p>
                <p>המכפלה <M>AB ∈ M_{'{m×r}'}(F)</M> מוגדרת ע&quot;י:</p>
                <p className="text-center font-mono my-2">[AB]ᵢⱼ = Σₖ₌₁ⁿ [A]ᵢₖ · [B]ₖⱼ</p>
                <p>כלומר, האיבר בשורה i ועמודה j הוא המכפלה הסקלרית של שורה i ב-A עם עמודה j ב-B.</p>
                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות על כפל מטריצות</p>
              </Solution>
            </SubQ>

            <SubQ label="1.1.2" pts={15}>
              <Problem>
                <p>הוכח: <M>(AB)ᵗ = BᵗAᵗ</M>.</p>
              </Problem>
              <Solution>
                <p><strong>הוכחה:</strong></p>
                <p>צריך להראות ש-<M>[(AB)ᵗ]ᵢⱼ = [BᵗAᵗ]ᵢⱼ</M> לכל i, j.</p>
                <p className="mt-2"><strong>צד שמאל:</strong></p>
                <p className="font-mono text-center">[(AB)ᵗ]ᵢⱼ = [AB]ⱼᵢ = Σₖ [A]ⱼₖ · [B]ₖᵢ</p>
                <p className="mt-2"><strong>צד ימין:</strong></p>
                <p className="font-mono text-center">[BᵗAᵗ]ᵢⱼ = Σₖ [Bᵗ]ᵢₖ · [Aᵗ]ₖⱼ = Σₖ [B]ₖᵢ · [A]ⱼₖ</p>
                <p className="mt-2">מקומוטטיביות הכפל בשדה: <M>[A]ⱼₖ · [B]ₖᵢ = [B]ₖᵢ · [A]ⱼₖ</M>.</p>
                <p>לכן שני הצדדים שווים. ∎</p>
                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה — (AB)ᵗ=BᵗAᵗ</p>
              </Solution>
              <Tip>זו הוכחה קלאסית מההרצאה. הטריק: לפתוח את שני הצדדים לפי הגדרת כפל + שחלוף, ולהשתמש בקומוטטיביות של סקלרים.</Tip>
            </SubQ>
          </div>
        </SubQ>

        <SubQ label="1.2" pts={8}>
          <Problem>
            <p>נכון או לא: <M>Tr(A²) = 0 ⟹ Tr(A) = 0</M>?</p>
          </Problem>
          <Solution>
            <p><strong>לא נכון!</strong></p>
            <p className="mt-2"><strong>דוגמה נגדית:</strong></p>
            <p>ניקח:</p>
            <div className="font-mono text-center my-2">
              <p>A = [[1, 1], [-1, 1]]</p>
            </div>
            <p>אז <M>Tr(A) = 1 + 1 = 2 ≠ 0</M>.</p>
            <p className="mt-2">נחשב <M>A²</M>:</p>
            <div className="font-mono text-center my-2">
              <p>A² = [[1·1+1·(-1), 1·1+1·1], [(-1)·1+1·(-1), (-1)·1+1·1]]</p>
              <p>= [[0, 2], [-2, 0]]</p>
            </div>
            <p>לכן <M>Tr(A²) = 0 + 0 = 0</M>, אבל <M>Tr(A) = 2 ≠ 0</M>. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: דוגמה נגדית</p>
          </Solution>
          <Tip>
            <strong>טיפ:</strong> כשהטענה נראית &quot;חשודה&quot; — חפש דוגמה נגדית 2×2. מטריצות עם 1 ו-(-1) הן מקום טוב להתחיל.
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 2 */}
      {/* ==================== */}
      <QuestionBox num={2} pts={25} topic="דטרמיננטת בלוקים + הפיכות שמאלית">
        <div className="bg-red-50 border border-red-300 rounded-lg p-3 flex gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-800">
            <strong>שאלה מומלצת לדילוג:</strong> הוכחת בלוקים = הוכחה ארוכה מההרצאה, הפיכות שמאלית = חישוב מכני.
          </div>
        </div>

        <SubQ label="2.1" pts={13}>
          <Problem>
            <p>תהי <M>K = [[A, C], [0, B]]</M> מטריצת בלוקים משולשית עליונה, כאשר A ו-B מטריצות ריבועיות.</p>
            <p>הוכח: <M>det(K) = det(A) · det(B)</M>.</p>
          </Problem>
          <Solution>
            <p><strong>הוכחה (מההרצאות):</strong></p>
            <p>נסמן <M>A ∈ M_{'{k×k}'}</M>, <M>B ∈ M_{'{ℓ×ℓ}'}</M>. אז <M>K ∈ M_{'{(k+ℓ)×(k+ℓ)}'}</M>.</p>
            <p className="mt-2">ההוכחה היא באינדוקציה על k (גודל הבלוק A).</p>
            <p className="mt-1"><strong>בסיס (k=1):</strong> A = [a₁₁], פיתוח לפי שורה 1:</p>
            <p className="font-mono text-center">det(K) = a₁₁ · det(B&apos;)</p>
            <p>כאשר B&apos; היא התת-מטריצה המתאימה, שמתכנסת ל-det(B) (כי הבלוק התחתון-שמאלי הוא 0).</p>
            <p className="mt-2"><strong>צעד:</strong> פיתוח לפי שורה ראשונה של K. האיברים היחידים שאינם אפס בשורה 1 הם מ-A ומ-C. לאחר פיתוח, כל minor שמתקבל שומר על המבנה המשולשי העליוני, ולכן מהנחת האינדוקציה נקבל:</p>
            <p className="font-mono text-center">det(K) = det(A) · det(B)</p>
            <p className="mt-2">(ההוכחה המלאה מופיעה בהרצאות על דטרמיננטות.) ∎</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות על דטרמיננטות — מטריצת בלוקים</p>
          </Solution>
          <Tip>הוכחה ארוכה מההרצאה. אם לא שננת — עדיף לדלג על שאלה 2 ולהשקיע בשאלות אחרות.</Tip>
        </SubQ>

        <SubQ label="2.2" pts={12}>
          <Problem>
            <p>תהי <M>A ∈ M_{'{2×3}'}(ℝ)</M>:</p>
            <div className="font-mono text-center my-2">
              <p>A = [[1, 2, -1], [0, -1, 2]]</p>
            </div>
            <p>מצא הופכית שמאלית ל-A, או הוכח שלא קיימת.</p>
          </Problem>
          <Solution>
            <p><strong>הופכית שמאלית:</strong> B ∈ M_{'{3×2}'} כך ש-<M>BA = I₃</M>.</p>
            <p className="mt-2">נסמן:</p>
            <div className="font-mono text-center my-2">
              <p>B = [[x, u], [y, v], [z, w]]</p>
            </div>
            <p>הדרישה BA = I₃ נותנת:</p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>שורה 1: x·1+u·0=1, x·2+u·(-1)=0, x·(-1)+u·2=0</p>
              <p>שורה 2: y·1+v·0=0, y·2+v·(-1)=1, y·(-1)+v·2=0</p>
              <p>שורה 3: z·1+w·0=0, z·2+w·(-1)=0, z·(-1)+w·2=1</p>
            </div>
            <p className="mt-2"><strong>משורה 3:</strong></p>
            <p className="font-mono">z = 0, 2z - w = 0 ⟹ w = 0</p>
            <p className="font-mono">-z + 2w = 1 ⟹ 0 + 0 = 1 ⟹ <strong>סתירה!</strong></p>
            <p className="mt-2"><strong>מסקנה:</strong> אין הופכית שמאלית ל-A.</p>
            <p className="mt-2 text-xs text-gray-600">
              <strong>הסבר אינטואיטיבי:</strong> A בגודל 2×3, כלומר rank(A) ≤ 2 &lt; 3. כדי ש-BA = I₃ נצטרך rank(BA) = 3, אבל rank(BA) ≤ rank(A) ≤ 2. סתירה.
            </p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות על הפיכות — שמאלית/ימנית</p>
          </Solution>
          <Tip>
            <strong>דרך מהירה:</strong> rank(BA) ≤ min(rank(B), rank(A)) ≤ rank(A) ≤ min(2,3) = 2 &lt; 3 = rank(I₃). אז BA ≠ I₃ לכל B. אין הופכית שמאלית!
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 3 */}
      {/* ==================== */}
      <QuestionBox num={3} pts={25} topic="מערכת עם פרמטר + בת&quot;ל / פרישה">
        <SubQ label="3.1" pts={13}>
          <Problem>
            <p>יהי α ∈ ℝ. פתור את המערכת:</p>
            <div className="font-mono text-center my-2 space-y-1">
              <p>αx - y + z = 1</p>
              <p>2x + αy + z = 0</p>
              <p>2x + y - αz = α</p>
            </div>
            <p>עבור אילו ערכי α יש פתרון יחיד? אינסוף פתרונות? אין פתרון?</p>
          </Problem>
          <Solution>
            <p><strong>שלב 1: חישוב הדטרמיננטה</strong></p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>|α  -1   1|</p>
              <p>|2   α   1| = ?</p>
              <p>|2   1  -α|</p>
            </div>
            <p className="mt-2">פיתוח לפי שורה 1:</p>
            <p className="font-mono text-center">det = α(-α²-1) -(-1)(-2α-2) + 1(2-2α)</p>
            <p className="font-mono text-center">= α(-α²-1) - (2α+2) + (2-2α)</p>
            <p className="font-mono text-center">= -α³ - α - 2α - 2 + 2 - 2α</p>
            <p className="font-mono text-center">= -α³ - 5α</p>
            <p className="font-mono text-center">= -α(α² + 5)</p>

            <p className="mt-3"><strong>שלב 2: ניתוח</strong></p>
            <p>det(A) = -α(α² + 5).</p>
            <p>שימו לב: <M>α² + 5 &gt; 0</M> לכל α ∈ ℝ (כי α² ≥ 0).</p>
            <p>לכן det(A) = 0 <strong>אם ורק אם α = 0</strong>.</p>

            <p className="mt-3"><strong>עבור α ≠ 0:</strong></p>
            <p>det(A) ≠ 0 ⟹ <strong>פתרון יחיד</strong> (לפי כלל קרמר / מטריצה הפיכה).</p>

            <p className="mt-3"><strong>עבור α = 0:</strong></p>
            <p>המערכת הופכת ל:</p>
            <div className="font-mono text-center my-2 space-y-1">
              <p>-y + z = 1</p>
              <p>2x + z = 0</p>
              <p>2x + y = 0</p>
            </div>
            <p>מהמשוואה הראשונה: z = y + 1.</p>
            <p>מהמשוואה השלישית: y = -2x.</p>
            <p>נציב במשוואה השנייה: 2x + (-2x + 1) = 0 ⟹ 1 = 0. <strong>סתירה!</strong></p>

            <div className="mt-3 bg-blue-50 border border-blue-200 rounded p-3">
              <p className="font-bold text-blue-800 text-xs mb-1">סיכום:</p>
              <p className="text-blue-700">α ≠ 0: <strong>פתרון יחיד</strong> (det ≠ 0)</p>
              <p className="text-blue-700">α = 0: <strong>אין פתרון</strong> (סתירה)</p>
              <p className="text-blue-700 font-bold">אין שום ערך α שנותן אינסוף פתרונות!</p>
            </div>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: דטרמיננטות + דירוג</p>
          </Solution>
          <Tip>
            <strong>שימו לב לתוצאה המפתיעה:</strong> אין אף ערך של α שנותן אינסוף פתרונות. לפעמים התשובה היא &quot;אין כזה ערך&quot;!
          </Tip>
        </SubQ>

        <SubQ label="3.2" pts={12}>
          <div className="space-y-4">
            <Problem>
              <p>יהי V מ&quot;ו מעל שדה F. יהיו v₁, v₂, v₃ ∈ V בת&quot;ל, ויהי v₄ ∈ V כך ש-<M>v₄ ∉ Span{'{v₁, v₂, v₃}'}</M>.</p>
            </Problem>

            <SubQ label="3.2.1" pts={4}>
              <Problem>
                <p>הוכח: v₁, v₂, v₃, v₄ בת&quot;ל ו-<M>dim Span{'{v₁, v₂, v₃, v₄}'} = 4</M>.</p>
              </Problem>
              <Solution>
                <p><strong>הוכחה באמצעות אפיון בת&quot;ל:</strong></p>
                <p>נשתמש באפיון: v₁,...,vₖ בת&quot;ל ⟺ לכל j: vⱼ ∉ Span(v₁,...,vⱼ₋₁).</p>
                <p className="mt-2">נבדוק:</p>
                <p>• v₁ ∉ Span(∅) = {'{0⃗}'} ✓ (כי v₁,...,v₃ בת&quot;ל ⟹ v₁ ≠ 0⃗)</p>
                <p>• v₂ ∉ Span(v₁) ✓ (כי v₁, v₂, v₃ בת&quot;ל)</p>
                <p>• v₃ ∉ Span(v₁, v₂) ✓ (כי v₁, v₂, v₃ בת&quot;ל)</p>
                <p>• v₄ ∉ Span(v₁, v₂, v₃) ✓ (<strong>נתון!</strong>)</p>
                <p className="mt-2">לכן v₁, v₂, v₃, v₄ בת&quot;ל.</p>
                <p>4 וקטורים בת&quot;ל ⟹ <M>dim Span{'{v₁, v₂, v₃, v₄}'} = 4</M>. ∎</p>
                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 11 — אפיון בת&quot;ל</p>
              </Solution>
            </SubQ>

            <SubQ label="3.2.2" pts={8}>
              <Problem>
                <p>הוכח: <M>dim Span{'{v₁+v₄, v₂+v₄, v₃+v₄}'} = 3</M>.</p>
              </Problem>
              <Solution>
                <p><strong>הוכחה:</strong> מספיק להראות ש-v₁+v₄, v₂+v₄, v₃+v₄ בת&quot;ל.</p>
                <p className="mt-2">נניח:</p>
                <p className="font-mono text-center">α₁(v₁+v₄) + α₂(v₂+v₄) + α₃(v₃+v₄) = 0⃗</p>
                <p className="mt-1">נפתח:</p>
                <p className="font-mono text-center">α₁v₁ + α₂v₂ + α₃v₃ + (α₁+α₂+α₃)v₄ = 0⃗</p>
                <p className="mt-2">מסעיף 3.2.1: v₁, v₂, v₃, v₄ <strong>בת&quot;ל</strong>.</p>
                <p>לכן כל המקדמים אפס:</p>
                <p className="font-mono text-center">α₁ = 0, α₂ = 0, α₃ = 0, α₁+α₂+α₃ = 0</p>
                <p className="mt-1">בפרט: α₁ = α₂ = α₃ = 0.</p>
                <p className="mt-2">לכן v₁+v₄, v₂+v₄, v₃+v₄ בת&quot;ל. ⟹ dim Span = 3. ∎</p>
                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 11 — הוכחת בת&quot;ל מההגדרה</p>
              </Solution>
              <Tip>
                <strong>תבנית:</strong> כדי להוכיח שוקטורים בת&quot;ל — פתח צ&quot;ל = 0⃗, ארגן לפי הוקטורים הבת&quot;ל שכבר ידועים, ואז הסק שכל המקדמים 0.
              </Tip>
            </SubQ>
          </div>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 4 */}
      {/* ==================== */}
      <QuestionBox num={4} pts={25} topic="דטרמיננטה 5×5 + ממד תת-מרחבים">
        <SubQ label="4.1" pts={11}>
          <Problem>
            <p>חשב את הדטרמיננטה:</p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto text-center space-y-1">
              <p>| 3   5   7   9  11|</p>
              <p>| 5   8  11  14  17|</p>
              <p>| 7  11  15  19  23|</p>
              <p>| 9  14  19  24  29|</p>
              <p>|11  17  23  29  35|</p>
            </div>
          </Problem>
          <Solution>
            <p><strong>פתרון:</strong> נבדוק תלות בין שורות.</p>
            <p className="mt-2">שורה 1: (3, 5, 7, 9, 11)</p>
            <p>שורה 2: (5, 8, 11, 14, 17)</p>
            <p>שורה 3: (7, 11, 15, 19, 23)</p>
            <p className="mt-2"><strong>בדיקה:</strong> 2·R₂ - R₁ = ?</p>
            <p className="font-mono text-center">2·(5,8,11,14,17) - (3,5,7,9,11) = (7,11,15,19,23) = R₃ ✓</p>
            <p className="mt-2">שורה 3 היא צירוף לינארי של שורות 1 ו-2!</p>
            <p className="mt-2"><strong>R₃ = 2R₂ - R₁</strong> ⟹ השורות תלויות לינארית.</p>
            <p className="mt-2"><strong>לכן: det = 0.</strong> ∎</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: דטרמיננטות — שורות ת&quot;ל</p>
          </Solution>
          <Tip>
            <strong>טיפ למבחן:</strong> לפני שמתחילים פיתוח ארוך, תמיד בדקו אם יש תלות בין שורות/עמודות. הפרשים קבועים הם רמז חזק לתלות!
          </Tip>
        </SubQ>

        <SubQ label="4.2" pts={14}>
          <Problem>
            <p>יהי V מ&quot;ו נוצר סופית מעל F. תהי W תת-מרחב של V, ויהיו u, v ∈ V.</p>
            <p>נתון: <M>dim(W + Span{'{u+v}'}) &lt; dim(W + Span{'{v}'})</M>.</p>
            <p>הוכח: <M>dim(W + Span{'{u+v}'}) = dim(W)</M> וגם <M>dim(W + Span{'{v}'}) = dim(W) + 1</M>.</p>
          </Problem>
          <Solution>
            <p><strong>הוכחה:</strong></p>
            <p className="mt-2"><strong>עובדה מקדימה:</strong> לכל תת-מרחב W ולכל וקטור w ∈ V:</p>
            <p className="font-mono text-center">dim(W) ≤ dim(W + Span{'{w}'}) ≤ dim(W) + 1</p>
            <p className="text-xs text-gray-500 mt-1">(כי W ⊆ W+Span{'{w}'}, והוספת וקטור אחד מעלה ממד לכל היותר ב-1.)</p>

            <p className="mt-3"><strong>נסמן:</strong></p>
            <p>• <M>a = dim(W + Span{'{u+v}'})</M></p>
            <p>• <M>b = dim(W + Span{'{v}'})</M></p>

            <p className="mt-2">מהעובדה:</p>
            <p className="font-mono text-center">dim(W) ≤ a ≤ dim(W) + 1</p>
            <p className="font-mono text-center">dim(W) ≤ b ≤ dim(W) + 1</p>

            <p className="mt-2">נתון: a &lt; b.</p>
            <p className="mt-1">מכיוון שגם a וגם b נמצאים בקבוצה {'{dim(W), dim(W)+1}'}, והנתון a &lt; b, האפשרות <strong>היחידה</strong> היא:</p>

            <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-3">
              <p className="font-bold text-blue-800">a = dim(W) וגם b = dim(W) + 1</p>
            </div>

            <p className="mt-2">כלומר:</p>
            <p>• <M>dim(W + Span{'{u+v}'}) = dim(W)</M> ✓</p>
            <p>• <M>dim(W + Span{'{v}'}) = dim(W) + 1</M> ✓</p>
            <p className="mt-1">∎</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 15 — נוסחת הממדים + ארגומנט ממד</p>
          </Solution>
          <Tip>
            <strong>ארגומנט ממד:</strong> כש-dim(W+Span{'{w}'}) ∈ {'{dim(W), dim(W)+1}'} ויש אי-שוויון חד, יש רק אפשרות אחת. זו טכניקה חוזרת!
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 5 */}
      {/* ==================== */}
      <QuestionBox num={5} pts={25} topic="הכלת תת-מרחבים + חסמי דרגה">
        <SubQ label="5.1" pts={12}>
          <Problem>
            <p>יהי V מ&quot;ו מעל F. יהיו U, W תתי-מרחבים של V.</p>
            <p>נתון: <M>(U + W) \ U ⊆ W</M>.</p>
            <p>הוכח: <M>U ⊆ W</M> או <M>W ⊆ U</M>.</p>
          </Problem>
          <Solution>
            <p><strong>הוכחה בשלילה:</strong></p>
            <p>נניח בשלילה ש-<M>U ⊄ W</M> וגם <M>W ⊄ U</M>.</p>
            <p className="mt-2">אז קיימים:</p>
            <p>• <M>u ∈ U \ W</M> (כלומר u ∈ U ו-u ∉ W)</p>
            <p>• <M>w ∈ W \ U</M> (כלומר w ∈ W ו-w ∉ U)</p>

            <p className="mt-2">נתבונן ב-<M>v = u + w</M>.</p>
            <p>ברור ש-<M>v ∈ U + W</M> (כי u ∈ U ו-w ∈ W).</p>

            <p className="mt-2"><strong>טענה: v ∉ U.</strong></p>
            <p>נניח בשלילה v = u + w ∈ U. אז w = v - u ∈ U (כי U תת-מרחב, v ∈ U ו-u ∈ U).</p>
            <p>אבל w ∉ U — <strong>סתירה!</strong> לכן v ∉ U.</p>

            <p className="mt-2">מכאן: <M>v ∈ (U + W) \ U</M>.</p>
            <p>מהנתון: <M>(U + W) \ U ⊆ W</M>, לכן <M>v ∈ W</M>.</p>

            <p className="mt-2"><strong>אבל:</strong> v = u + w ∈ W ⟹ u = v - w ∈ W (כי W תת-מרחב, v ∈ W ו-w ∈ W).</p>
            <p>זו <strong>סתירה</strong> ל-u ∉ W!</p>

            <p className="mt-2">לכן ההנחה שגויה, ומתקיים <M>U ⊆ W</M> או <M>W ⊆ U</M>. ∎</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הוכחה בשלילה — תכונות תת-מרחבים</p>
          </Solution>
          <Tip>
            <strong>תבנית הוכחה בשלילה:</strong> כשצריך להוכיח &quot;A או B&quot;, נניח בשלילה &quot;לא A וגם לא B&quot; ומגיעים לסתירה. הטריק הקלאסי: בוחרים u + w ומראים שהוא גם ב-W וגם לא ב-W.
          </Tip>
        </SubQ>

        <SubQ label="5.2" pts={13}>
          <div className="space-y-4">
            <Problem>
              <p>יהיו <M>A, B ∈ M_{'{m×n}'}(F)</M>.</p>
            </Problem>

            <SubQ label="5.2.1" pts={5}>
              <Problem>
                <p>הוכח: <M>row(A + B) ⊆ row(A) + row(B)</M>.</p>
              </Problem>
              <Solution>
                <p><strong>הוכחה:</strong></p>
                <p>נסמן את שורות A: R₁, ..., Rₘ ∈ Fⁿ.</p>
                <p>נסמן את שורות B: Q₁, ..., Qₘ ∈ Fⁿ.</p>
                <p className="mt-2">אז שורות A+B הן: R₁+Q₁, R₂+Q₂, ..., Rₘ+Qₘ.</p>
                <p className="mt-2">לכל i: Rᵢ ∈ row(A) ו-Qᵢ ∈ row(B), לכן Rᵢ + Qᵢ ∈ row(A) + row(B).</p>
                <p className="mt-2">מכאן: כל שורה של A+B שייכת ל-row(A) + row(B).</p>
                <p>row(A+B) = Span(שורות A+B) ⊆ row(A) + row(B) (כי row(A)+row(B) תת-מרחב המכיל את כל השורות). ∎</p>
                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הגדרת מרחב שורות</p>
              </Solution>
            </SubQ>

            <SubQ label="5.2.2" pts={8}>
              <Problem>
                <p>הוכח: <M>rank(A) - rank(B) ≤ rank(A + B) ≤ rank(A) + rank(B)</M>.</p>
              </Problem>
              <Solution>
                <p><strong>חסם עליון:</strong></p>
                <p>מסעיף 5.2.1:</p>
                <p className="font-mono text-center">row(A+B) ⊆ row(A) + row(B)</p>
                <p>לכן:</p>
                <p className="font-mono text-center">rank(A+B) = dim row(A+B) ≤ dim(row(A) + row(B))</p>
                <p className="font-mono text-center">≤ dim row(A) + dim row(B) = rank(A) + rank(B)</p>
                <p className="text-xs text-gray-500">(השתמשנו ב-dim(U+W) ≤ dim U + dim W.)</p>

                <p className="mt-3"><strong>חסם תחתון:</strong></p>
                <p>נכתוב: A = (A + B) + (-B).</p>
                <p>מהחסם העליון (שהוכחנו) עבור A+B ו-(-B):</p>
                <p className="font-mono text-center">rank(A) = rank((A+B) + (-B)) ≤ rank(A+B) + rank(-B)</p>
                <p className="mt-1">כי <M>rank(-B) = rank(B)</M> (כפל בסקלר לא-אפס לא משנה דרגה):</p>
                <p className="font-mono text-center">rank(A) ≤ rank(A+B) + rank(B)</p>
                <p className="font-mono text-center">⟹ rank(A) - rank(B) ≤ rank(A+B)</p>

                <p className="mt-2"><strong>ביחד:</strong></p>
                <p className="font-mono text-center font-bold">rank(A) - rank(B) ≤ rank(A+B) ≤ rank(A) + rank(B)</p>
                <p className="mt-1">∎</p>
                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: נוסחת הממדים + מרחב שורות</p>
              </Solution>
              <Tip>
                <strong>טריק קלאסי:</strong> להוכחת חסם תחתון — כתוב A = (A+B) + (-B) והשתמש בחסם העליון שכבר הוכחת. זו טכניקה שחוזרת!
              </Tip>
            </SubQ>
          </div>
        </SubQ>
      </QuestionBox>

      {/* Summary */}
      <Section title="סיכום וטיפים אחרונים" icon={<BookOpen className="w-5 h-5" />} color="text-purple-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-bold text-purple-800 text-sm mb-2">נושאים מרכזיים</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• כפל מטריצות — הגדרה + (AB)ᵗ = BᵗAᵗ</li>
              <li>• דטרמיננטות — בלוקים, תלות שורות</li>
              <li>• מערכות — פרמטר, דטרמיננטה</li>
              <li>• בת&quot;ל/ממדים — אפיון, Span, dim</li>
              <li>• דרגות — חסמי rank(A+B)</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-bold text-green-800 text-sm mb-2">טיפים למבחן</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• לפני חישוב — בדוק תלות שורות/עמודות</li>
              <li>• דוגמה נגדית: נסה 2×2 עם 1, -1</li>
              <li>• הוכחת &quot;A או B&quot; → שלילה: &quot;לא A וגם לא B&quot;</li>
              <li>• חסם תחתון → כתוב A = (A+B) + (-B)</li>
              <li>• dim(W+Span{'{w}'}) ∈ {'{dim W, dim W+1}'}</li>
            </ul>
          </div>
        </div>
        <Tip>
          <strong>זכור:</strong> עונים על 4 מתוך 5! דלג על שאלה 2 (הכי ארוכה) ותרוויח זמן לשאר השאלות.
        </Tip>
      </Section>
    </div>
  );
}
