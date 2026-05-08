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

export default function Exam2025BPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          מועד ב&apos; 2025 — ניתוח + פתרונות
        </h1>
        <p className="text-gray-600">Linear Algebra 1, Moed B 2025 — Reichman University</p>
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
            { q: 'שאלה 1', topics: 'סכום ישר + משפט הממד (rank-nullity)', diff: 'בינוני' },
            { q: 'שאלה 2', topics: 'תת-מרחב + מטריצות אנטי-סימטריות', diff: 'בינוני' },
            { q: 'שאלה 3', topics: 'מערכת עם פרמטר + Z₂₃', diff: 'בינוני' },
            { q: 'שאלה 4', topics: 'העתקה לינארית + מטריצה אלכסונית', diff: 'בינוני-קשה' },
            { q: 'שאלה 5', topics: 'Null(AᵗA) + dim Hom(V,W)', diff: 'בינוני' },
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
          <strong>המלצה:</strong> שאלות 1, 2, 3, 5 הן הכי &quot;שוות&quot; מבחינת ניקוד מול מאמץ.
          שאלה 4 מכילה חישובים כבדים יותר — דלג עליה אם הזמן לוחץ.
        </Tip>
      </Section>

      {/* ==================== */}
      {/* QUESTION 1 */}
      {/* ==================== */}
      <QuestionBox num={1} pts={25} topic="סכום ישר + משפט הממד">
        <SubQ label="1.1" pts={17}>
          <SubQ label="1.1.1" pts={2}>
            <Problem>
              <p>הגדר סכום ישר U⊕W.</p>
            </Problem>
            <Solution>
              <p><strong>הגדרה:</strong></p>
              <p>יהיו U, W תתי-מרחבים של מרחב וקטורי V.</p>
              <p>הסכום <M>U+W = {'\\{u+w : u \\in U, w \\in W\\}'}</M>.</p>
              <p>אם <M>U ∩ W = {'\\{0_V\\}'}</M> אז הסכום נקרא <strong>סכום ישר</strong> ומסומן <M>U ⊕ W = U + W</M>.</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 14 — הגדרת סכום ישר</p>
            </Solution>
          </SubQ>

          <SubQ label="1.1.2" pts={15}>
            <Problem>
              <p>V מרחב וקטורי סופי-ממדי, U ו-W תתי-מרחבים. הוכח:</p>
              <p className="font-mono text-center my-2">dim(U+W) = dim(U) + dim(W) - dim(U∩W)</p>
            </Problem>
            <Solution>
              <p><strong>הוכחה (נוסחת הממדים):</strong></p>
              <p>ראו הרצאה — הוכחה מלאה מההרצאות.</p>
              <p className="mt-2"><strong>רעיון מרכזי:</strong> ניקח בסיס ל-U∩W, נרחיב לבסיס של U ולבסיס של W בנפרד, ונראה שהאיחוד של שלושת חלקי הבסיס הוא בסיס ל-U+W.</p>
              <p className="mt-1">פירוט: יהי <M>{'\\{v₁,...,v_k\\}'}</M> בסיס ל-U∩W. נרחיב לבסיס של U: <M>{'\\{v₁,...,v_k, u₁,...,u_r\\}'}</M>. נרחיב לבסיס של W: <M>{'\\{v₁,...,v_k, w₁,...,w_s\\}'}</M>.</p>
              <p>נוכיח ש-<M>{'\\{v₁,...,v_k, u₁,...,u_r, w₁,...,w_s\\}'}</M> בסיס ל-U+W.</p>
              <p>אז: dim(U+W) = k + r + s = (k+r) + (k+s) - k = dim(U) + dim(W) - dim(U∩W). ✓</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 15 — נוסחת הממדים</p>
            </Solution>
            <Tip>זו הוכחה קלאסית מההרצאה — לשנן בעל-פה. מופיעה כמעט בכל מבחן!</Tip>
          </SubQ>
        </SubQ>

        <SubQ label="1.2" pts={8}>
          <Problem>
            <p>האם קיימת העתקה לינארית <M>T: ℝ⁹ → ℝ⁴</M> כך ש-<M>dim Ker T ≤ dim Im T</M>?</p>
          </Problem>
          <Solution>
            <p><strong>תשובה: לא קיימת.</strong></p>
            <p className="mt-2"><strong>הוכחה בשלילה:</strong></p>
            <p>נניח בשלילה שקיימת T כזו.</p>
            <p>Im T ⊆ ℝ⁴ ⟹ <M>dim Im T ≤ 4</M>.</p>
            <p>לפי הנתון: <M>dim Ker T ≤ dim Im T ≤ 4</M>.</p>
            <p className="mt-1">ממשפט הממד (rank-nullity):</p>
            <p className="font-mono text-center">9 = dim ℝ⁹ = dim Ker T + dim Im T</p>
            <p>אבל <M>dim Ker T + dim Im T ≤ 4 + 4 = 8</M>.</p>
            <p>כלומר 9 ≤ 8 — <strong>סתירה!</strong> ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: משפט הממד (rank-nullity)</p>
          </Solution>
          <Tip>
            <strong>תבנית:</strong> כשיש שאלה &quot;האם קיימת ה&quot;ל עם תנאי על Ker/Im&quot; — תמיד תשתמש במשפט הממד: dim Ker T + dim Im T = dim מרחב המקור.
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 2 */}
      {/* ==================== */}
      <QuestionBox num={2} pts={25} topic="תת-מרחב + אנטי-סימטריות">
        <SubQ label="2.1" pts={17}>
          <SubQ label="2.1.1" pts={2}>
            <Problem>
              <p>הגדר תת-מרחב.</p>
            </Problem>
            <Solution>
              <p><strong>הגדרה:</strong></p>
              <p>יהי V מרחב וקטורי מעל שדה F. תת-קבוצה W ⊆ V נקראת <strong>תת-מרחב</strong> אם W סגורה תחת אותן פעולות חיבור וכפל בסקלר של V.</p>
              <p>כלומר: (1) 0⃗ ∈ W. (2) לכל u,v ∈ W: u+v ∈ W. (3) לכל α ∈ F, v ∈ W: αv ∈ W.</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 9-10 — הגדרת תת-מרחב</p>
            </Solution>
          </SubQ>

          <SubQ label="2.1.2" pts={15}>
            <Problem>
              <p>V מרחב וקטורי סופי-ממדי, W תת-מרחב של V.</p>
            </Problem>

            <SubQ label="2.1.2.1" pts={8}>
              <Problem>
                <p>הוכח: <M>dim(W) ≤ dim(V)</M>.</p>
              </Problem>
              <Solution>
                <p><strong>הוכחה:</strong></p>
                <p>ראו הרצאה — הוכחה מלאה.</p>
                <p className="mt-1"><strong>רעיון:</strong> כל קבוצה בת&quot;ל ב-W היא גם קבוצה בת&quot;ל ב-V. לכן בסיס של W (קבוצה בת&quot;ל מקסימלית ב-W) הוא קבוצה בת&quot;ל ב-V, ומספר האיברים בו לא עולה על dim(V) (ממשפט שטייניץ). ✓</p>
                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 14 — ת&quot;מ של מ&quot;ו נ&quot;ס הוא נ&quot;ס</p>
              </Solution>
            </SubQ>

            <SubQ label="2.1.2.2" pts={7}>
              <Problem>
                <p>הוכח: אם <M>dim(W) = dim(V)</M> אז <M>W = V</M>.</p>
              </Problem>
              <Solution>
                <p><strong>הוכחה:</strong></p>
                <p>ראו הרצאה — הוכחה מלאה.</p>
                <p className="mt-1"><strong>רעיון:</strong> יהי B בסיס ל-W. אז |B| = dim(W) = dim(V) = n. B בת&quot;ל ב-V ומכיל n איברים, לכן B בסיס ל-V (n וקטורים בת&quot;ל במרחב ממד n ⟹ בסיס). לכן V = Span(B) = W. ✓</p>
                <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 14 — dim W=dim V ⟹ W=V</p>
              </Solution>
            </SubQ>
          </SubQ>
        </SubQ>

        <SubQ label="2.2" pts={8}>
          <Problem>
            <p>A, B מטריצות אנטי-סימטריות (<M>Aᵗ = -A</M>, <M>Bᵗ = -B</M>).</p>
            <p>הוכח: <strong>AB סימטרית ⟺ AB = BA</strong>.</p>
          </Problem>
          <Solution>
            <p><strong>כיוון ⟹ (AB סימטרית ⟹ AB = BA):</strong></p>
            <p>AB סימטרית, כלומר <M>(AB)ᵗ = AB</M>.</p>
            <p>מצד שני: <M>(AB)ᵗ = BᵗAᵗ = (-B)(-A) = BA</M>.</p>
            <p>לכן <M>BA = AB</M>. ✓</p>
            <p className="mt-3"><strong>כיוון ⟸ (AB = BA ⟹ AB סימטרית):</strong></p>
            <p>צריך להוכיח: <M>(AB)ᵗ = AB</M>.</p>
            <p><M>(AB)ᵗ = BᵗAᵗ = (-B)(-A) = BA</M>.</p>
            <p>מהנתון <M>AB = BA</M>, לכן <M>(AB)ᵗ = BA = AB</M>.</p>
            <p>כלומר AB סימטרית. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: תכונות שחלוף</p>
          </Solution>
          <Tip>
            <strong>מפתח:</strong> לזכור ש-<M>(AB)ᵗ = BᵗAᵗ</M> ושלמטריצה אנטי-סימטרית <M>Aᵗ = -A</M>. שני הכיוונים קצרים כשמשתמשים בזה!
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 3 */}
      {/* ==================== */}
      <QuestionBox num={3} pts={25} topic="מערכת עם פרמטר + Z₂₃">
        <SubQ label="3.1" pts={18}>
          <Problem>
            <p>יהי α ∈ ℝ. פתור את המערכת:</p>
            <div className="font-mono text-center my-2 space-y-1">
              <p>x + y + αz = 2</p>
              <p>3x + 4y + 2z = α</p>
              <p>2x + 3y - z = 1</p>
            </div>
          </Problem>
          <Solution>
            <p><strong>דירוג המטריצה המורחבת:</strong></p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 &ensp;1 &ensp;α &ensp;| 2]</p>
              <p>[3 &ensp;4 &ensp;2 &ensp;| α]</p>
              <p>[2 &ensp;3 &ensp;-1 | 1]</p>
            </div>
            <p className="mt-2">R₂ → R₂ - 3R₁, &ensp; R₃ → R₃ - 2R₁:</p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 &ensp;1 &ensp;&ensp;α &ensp;&ensp;&ensp;| 2]</p>
              <p>[0 &ensp;1 &ensp;&ensp;2-3α &ensp;| α-6]</p>
              <p>[0 &ensp;1 &ensp;&ensp;-1-2α | -3]</p>
            </div>
            <p className="mt-2">R₃ → R₃ - R₂:</p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto space-y-1">
              <p>[1 &ensp;1 &ensp;α &ensp;&ensp;&ensp;| 2]</p>
              <p>[0 &ensp;1 &ensp;2-3α &ensp;| α-6]</p>
              <p>[0 &ensp;0 &ensp;α-3 &ensp;&ensp;| 3-α]</p>
            </div>

            <p className="mt-3"><strong>שורה 3:</strong> <M>(α-3)z = 3-α = -(α-3)</M></p>

            <p className="mt-3"><strong>מקרה α ≠ 3:</strong></p>
            <p><M>α-3 ≠ 0</M>, לכן <M>z = -(α-3)/(α-3) = -1</M>.</p>
            <p>משורה 2: <M>y = (α-6) - (2-3α)(-1) = α-6+2-3α = -2α-4</M>.</p>
            <p>משורה 1: <M>x = 2 - y - αz = 2 - (-2α-4) - α(-1) = 2+2α+4+α = 3α+6</M>.</p>
            <p><strong>פתרון יחיד:</strong> <M>(x,y,z) = (3α+6, -2α-4, -1)</M>.</p>

            <p className="mt-3"><strong>מקרה α = 3:</strong></p>
            <p>שורה 3 הופכת ל-<M>0·z = 0</M> — z חופשי. נסמן z = t.</p>
            <p>משורה 2: <M>y = (3-6) - (2-9)t = -3 + 7t</M>.</p>
            <p>משורה 1: <M>x = 2 - y - 3t = 2 - (-3+7t) - 3t = 5 - 10t</M>.</p>
            <p><strong>אינסוף פתרונות:</strong> <M>(x,y,z) = (5-10t, -3+7t, t)</M>, t ∈ ℝ.</p>

            <div className="mt-3 bg-blue-50 border border-blue-200 rounded p-3">
              <p className="font-bold text-blue-800 text-xs mb-1">סיכום:</p>
              <p className="text-blue-700">α ≠ 3: <strong>פתרון יחיד</strong> — (3α+6, -2α-4, -1)</p>
              <p className="text-blue-700">α = 3: <strong>אינסוף פתרונות</strong> — (5-10t, -3+7t, t), t ∈ ℝ</p>
            </div>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות 1-8 — דירוג</p>
          </Solution>
          <Tip>
            <strong>טיפ:</strong> שימו לב שבשורה 3 מקבלים <M>(α-3)z = -(α-3)</M>. אם α=3, שני הצדדים 0 (משתנה חופשי). אם α≠3, מחלקים ומקבלים z=-1.
          </Tip>
        </SubQ>

        <SubQ label="3.2" pts={7}>
          <Problem>
            <p>פתור את המשוואה <M>3x² = 4</M> ב-<M>Z₂₃</M>.</p>
          </Problem>
          <Solution>
            <p><strong>שלב 1: מצא 3⁻¹ mod 23.</strong></p>
            <p><M>3 · 8 = 24 = 23 + 1 ≡ 1 (mod 23)</M>.</p>
            <p>לכן <M>3⁻¹ = 8</M> ב-Z₂₃.</p>
            <p className="mt-2"><strong>שלב 2: כפול בהופכי.</strong></p>
            <p><M>x² = 8 · 4 = 32 ≡ 9 (mod 23)</M>.</p>
            <p className="mt-2"><strong>שלב 3: פתור x² ≡ 9.</strong></p>
            <p><M>x = 3</M>: בדיקה — <M>3² = 9 ≡ 9</M> ✓</p>
            <p><M>x = -3 ≡ 20 (mod 23)</M>: בדיקה — <M>20² = 400 = 17·23 + 9 ≡ 9</M> ✓</p>
            <p className="mt-2"><strong>שני פתרונות:</strong> <M>x = 3</M> ו-<M>x = 20</M> ב-Z₂₃.</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: אריתמטיקה מודולרית</p>
          </Solution>
          <Tip>
            <strong>שיטה:</strong> (1) מצא הופכי של המקדם, (2) כפול, (3) מצא שורשים. בZ_p לכל ריבוע שאינו 0 יש 0 או 2 שורשים (x ו--x).
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 4 */}
      {/* ==================== */}
      <QuestionBox num={4} pts={25} topic="העתקה לינארית + מטריצה אלכסונית">
        <SubQ label="4.1" pts={13}>
          <Problem>
            <p><M>T: ℝ² → ℝ²</M> העתקה לינארית. נתון: <M>T(2,-3) = (1,2)</M>, <M>T(3,-2) = (1,1)</M>.</p>
          </Problem>

          <SubQ label="4.1.1" pts={4}>
            <Problem>
              <p>חשב <M>T(0,-5)</M>.</p>
            </Problem>
            <Solution>
              <p><strong>נכתוב (0,-5) כצ&quot;ל של (2,-3) ו-(3,-2):</strong></p>
              <p><M>(0,-5) = a(2,-3) + b(3,-2)</M></p>
              <p className="font-mono text-center">2a + 3b = 0 &emsp; ⟹ &emsp; a = -3b/2</p>
              <p className="font-mono text-center">-3a - 2b = -5 &emsp; ⟹ &emsp; 9b/2 - 2b = -5 &emsp; ⟹ &emsp; 5b/2 = -5 &emsp; ⟹ &emsp; b = -2</p>
              <p>לכן a = 3, b = -2.</p>
              <p><M>(0,-5) = 3(2,-3) - 2(3,-2)</M>.</p>
              <p className="mt-2">מלינאריות T:</p>
              <p><M>T(0,-5) = 3·T(2,-3) - 2·T(3,-2) = 3(1,2) - 2(1,1) = (3,6)-(2,2) = (1,4)</M>.</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: שימוש בלינאריות</p>
            </Solution>
          </SubQ>

          <SubQ label="4.1.2" pts={4}>
            <Problem>
              <p>הוכח ש-T הפיכה.</p>
            </Problem>
            <Solution>
              <p><strong>הוכחה:</strong></p>
              <p>ראשית, <M>{'\\{(2,-3), (3,-2)\\}'}</M> בת&quot;ל (אינם כפולה סקלרית זה של זה), לכן הם בסיס ל-ℝ².</p>
              <p>T מעבירה אותם ל-<M>{'\\{(1,2), (1,1)\\}'}</M>.</p>
              <p><M>{'\\{(1,2), (1,1)\\}'}</M> בת&quot;ל (אינם כפולה סקלרית זה של זה), לכן הם בסיס ל-ℝ².</p>
              <p className="mt-1">T מעבירה בסיס לבסיס ⟹ T הפיכה. ✓</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה על ה&quot;ל — בסיס לבסיס ⟹ הפיך</p>
            </Solution>
          </SubQ>

          <SubQ label="4.1.3" pts={5}>
            <Problem>
              <p>חשב <M>T⁻¹(4,6)</M>.</p>
            </Problem>
            <Solution>
              <p><strong>נכתוב (4,6) כצ&quot;ל של התמונות (1,2) ו-(1,1):</strong></p>
              <p><M>(4,6) = a(1,2) + b(1,1)</M></p>
              <p className="font-mono text-center">a + b = 4</p>
              <p className="font-mono text-center">2a + b = 6</p>
              <p>⟹ a = 2, b = 2.</p>
              <p className="mt-2"><M>(4,6) = 2·(1,2) + 2·(1,1) = 2·T(2,-3) + 2·T(3,-2) = T(2·(2,-3) + 2·(3,-2))</M></p>
              <p><M>= T(4+6, -6-4) = T(10,-10)</M>.</p>
              <p className="mt-1">לכן <M>T⁻¹(4,6) = (-10, 10)</M>.</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: שימוש בבסיס + הפיכות</p>
            </Solution>
            <Tip>
              <strong>שיטה:</strong> כדי למצוא T⁻¹(v), כתוב v כצ&quot;ל של T(b₁), T(b₂) (תמונות הבסיס). אותם מקדמים על b₁, b₂ נותנים את T⁻¹(v).
            </Tip>
          </SubQ>
        </SubQ>

        <SubQ label="4.2" pts={12}>
          <Problem>
            <p><M>D = diag(α₁,...,αₙ)</M> מטריצה אלכסונית עם <M>αᵢ</M> שונים זה מזה.</p>
            <p>אם <M>KD = DK</M>, הוכח ש-K מטריצה אלכסונית.</p>
          </Problem>
          <Solution>
            <p><strong>הוכחה:</strong></p>
            <p>נחשב את הכניסה (i,j) של כל צד:</p>
            <p><M>[KD]ᵢⱼ = Σₗ [K]ᵢₗ [D]ₗⱼ = [K]ᵢⱼ · αⱼ</M></p>
            <p>(כי D אלכסונית, <M>[D]ₗⱼ = 0</M> אלא אם ℓ = j).</p>
            <p className="mt-1"><M>[DK]ᵢⱼ = Σₗ [D]ᵢₗ [K]ₗⱼ = αᵢ · [K]ᵢⱼ</M></p>
            <p>(כי D אלכסונית, <M>[D]ᵢₗ = 0</M> אלא אם ℓ = i).</p>
            <p className="mt-2">מ-<M>KD = DK</M>:</p>
            <p className="font-mono text-center">[K]ᵢⱼ · αⱼ = αᵢ · [K]ᵢⱼ</p>
            <p className="font-mono text-center">[K]ᵢⱼ · (αⱼ - αᵢ) = 0</p>
            <p className="mt-2">עבור i ≠ j: <M>αᵢ ≠ αⱼ</M> (נתון שכולם שונים), לכן <M>αⱼ - αᵢ ≠ 0</M>.</p>
            <p>מכאן <M>[K]ᵢⱼ = 0</M> לכל i ≠ j.</p>
            <p className="mt-1">כלומר כל הכניסות מחוץ לאלכסון הן 0 ⟹ <strong>K מטריצה אלכסונית</strong>. ✓</p>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: חישוב ישיר עם כפל מטריצות</p>
          </Solution>
          <Tip>
            <strong>מפתח:</strong> כפל במטריצה אלכסונית משמאל משנה שורות (כופל שורה i ב-αᵢ), כפל מימין משנה עמודות (כופל עמודה j ב-αⱼ). זה מה שהופך את החישוב לפשוט.
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* ==================== */}
      {/* QUESTION 5 */}
      {/* ==================== */}
      <QuestionBox num={5} pts={25} topic="Null(AᵗA) + Hom">
        <SubQ label="5.1" pts={15}>
          <Problem>
            <p><M>A ∈ M_{'m×n'}(ℝ)</M>.</p>
          </Problem>

          <SubQ label="5.1.1" pts={5}>
            <Problem>
              <p>הוכח: <M>Null(A) ⊆ Null(AᵗA)</M>.</p>
            </Problem>
            <Solution>
              <p><strong>הוכחה:</strong></p>
              <p>יהי <M>x⃗ ∈ Null(A)</M>, כלומר <M>Ax⃗ = 0⃗</M>.</p>
              <p>אז: <M>AᵗAx⃗ = Aᵗ(Ax⃗) = Aᵗ · 0⃗ = 0⃗</M>.</p>
              <p>לכן <M>x⃗ ∈ Null(AᵗA)</M>. ✓</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: תכונות מרחב אפס</p>
            </Solution>
          </SubQ>

          <SubQ label="5.1.2" pts={5}>
            <Problem>
              <p>יהי <M>y⃗ ∈ ℝᵐ</M>. הוכח: אם <M>(y⃗)ᵗy⃗ = 0</M> אז <M>y⃗ = 0⃗</M>.</p>
            </Problem>
            <Solution>
              <p><strong>הוכחה:</strong></p>
              <p>נכתוב <M>y⃗ = (y₁, y₂, ..., yₘ)ᵗ</M>.</p>
              <p><M>(y⃗)ᵗy⃗ = y₁² + y₂² + ... + yₘ² = 0</M>.</p>
              <p>כי <M>yᵢ ∈ ℝ</M>, מתקיים <M>yᵢ² ≥ 0</M> לכל i.</p>
              <p>סכום של מספרים אי-שליליים שווה ל-0 ⟹ כל אחד מהם 0.</p>
              <p>לכן <M>yᵢ = 0</M> לכל i, כלומר <M>y⃗ = 0⃗</M>. ✓</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: תכונות ℝⁿ</p>
            </Solution>
          </SubQ>

          <SubQ label="5.1.3" pts={5}>
            <Problem>
              <p>הוכח: <M>Null(AᵗA) = Null(A)</M>.</p>
            </Problem>
            <Solution>
              <p><strong>הוכחה:</strong></p>
              <p><strong>⊆ מסעיף 5.1.1:</strong> <M>Null(A) ⊆ Null(AᵗA)</M>. ✓</p>
              <p className="mt-2"><strong>⊇ נוכיח: Null(AᵗA) ⊆ Null(A):</strong></p>
              <p>יהי <M>x⃗ ∈ Null(AᵗA)</M>, כלומר <M>AᵗAx⃗ = 0⃗</M>.</p>
              <p>נסמן <M>y⃗ = Ax⃗</M>. אז:</p>
              <p className="font-mono text-center">(y⃗)ᵗy⃗ = (Ax⃗)ᵗ(Ax⃗) = x⃗ᵗAᵗAx⃗ = x⃗ᵗ · 0⃗ = 0</p>
              <p>מסעיף 5.1.2: <M>(y⃗)ᵗy⃗ = 0 ⟹ y⃗ = 0⃗</M>.</p>
              <p>לכן <M>Ax⃗ = y⃗ = 0⃗</M>, כלומר <M>x⃗ ∈ Null(A)</M>. ✓</p>
              <p className="mt-1"><strong>ביחד: Null(AᵗA) = Null(A).</strong> ✓</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: שימוש בסעיפים קודמים</p>
            </Solution>
            <Tip>
              <strong>תבנית:</strong> שאלות שהסעיפים בונים זה על זה! סעיף 5.1.1 נותן כיוון אחד, 5.1.2 נותן כלי, ו-5.1.3 משלב את שניהם. תמיד תבדוק אם סעיפים קודמים רלוונטיים.
            </Tip>
          </SubQ>
        </SubQ>

        <SubQ label="5.2" pts={10}>
          <Problem>
            <p><M>dim V ≥ 1</M>, <M>dim Hom(V,W) = 8</M>, <M>T: V → W</M> חח&quot;ע (injective).</p>
            <p>חשב <M>dim Im T</M>.</p>
          </Problem>
          <Solution>
            <p><strong>פתרון:</strong></p>
            <p>נזכר: <M>dim Hom(V,W) = dim V · dim W</M>.</p>
            <p>לכן <M>dim V · dim W = 8</M>.</p>
            <p className="mt-2">T חח&quot;ע ⟹ <M>dim Ker T = 0</M>.</p>
            <p>ממשפט הממד: <M>dim Im T = dim V - dim Ker T = dim V</M>.</p>
            <p className="mt-2">כי <M>Im T ⊆ W</M>: <M>dim Im T ≤ dim W</M>, כלומר <M>dim V ≤ dim W</M>.</p>
            <p className="mt-2"><strong>הפירוקים האפשריים של 8 = dim V · dim W עם dim V ≤ dim W ו-dim V ≥ 1:</strong></p>
            <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200 space-y-1">
              <p>dim V = 1, dim W = 8 → dim Im T = 1</p>
              <p>dim V = 2, dim W = 4 → dim Im T = 2</p>
              <p>dim V = 4, dim W = 2 → dim V &gt; dim W, סתירה</p>
              <p>dim V = 8, dim W = 1 → dim V &gt; dim W, סתירה</p>
            </div>
            <p className="mt-2"><strong>שני מקרים אפשריים:</strong></p>
            <p>• dim V = 1, dim W = 8 ⟹ <M>dim Im T = 1</M></p>
            <p>• dim V = 2, dim W = 4 ⟹ <M>dim Im T = 2</M></p>
            <div className="mt-2 bg-amber-50 border border-amber-200 rounded p-2">
              <p className="text-amber-800 text-sm"><strong>הערה:</strong> ללא מידע נוסף, שתי האפשרויות תקפות. אם השאלה דורשת תשובה אחת, סביר שחסר נתון (כגון dim V &gt; 1), ואז <M>dim Im T = 2</M>.</p>
            </div>
            <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה על Hom — dim Hom(V,W) = dim V · dim W</p>
          </Solution>
          <Tip>
            <strong>נוסחה חשובה:</strong> <M>dim Hom(V,W) = dim V · dim W</M>. שימושית מאוד בשאלות שנותנות מידע על Hom ומבקשות ממדים.
          </Tip>
        </SubQ>
      </QuestionBox>

      {/* Strategy */}
      <Section title="אסטרטגיה מומלצת" icon={<Star className="w-5 h-5" />} color="text-amber-700">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 space-y-2">
          <p className="font-bold text-amber-800">סדר מומלץ למבחן הזה:</p>
          <p className="text-amber-700">1. <strong>שאלה 1</strong> (25 נק&apos;) — 1.1 מההרצאה, 1.2 שלילה קצרה עם rank-nullity</p>
          <p className="text-amber-700">2. <strong>שאלה 2</strong> (25 נק&apos;) — 2.1 הגדרות + הוכחות מההרצאה, 2.2 שחלוף קצר</p>
          <p className="text-amber-700">3. <strong>שאלה 3</strong> (25 נק&apos;) — דירוג מכני + אריתמטיקה מודולרית</p>
          <p className="text-amber-700">4. <strong>שאלה 5</strong> (25 נק&apos;) — 5.1 סעיפים שבונים זה על זה, 5.2 נוסחת Hom</p>
          <p className="text-amber-700 opacity-60">5. שאלה 4 — רק אם נשאר זמן (חישובי ה&quot;ל + הוכחת אלכסונית)</p>
        </div>
        <Tip>
          <strong>כלל אצבע:</strong> התחל מהשאלות עם הוכחות מההרצאה (שאלות 1, 2) — אלה הנקודות &quot;הקלות&quot; ביותר. אחר כך חישובים מכניים (שאלה 3). שאלה 5 דורשת הבנה אבל קצרה. שאלה 4 הכי כבדה בחישובים.
        </Tip>
      </Section>
    </div>
  );
}
