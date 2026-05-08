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

export default function Exam2023BPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-3xl font-extrabold">אלגברה לינארית 1 — מועד ב&apos; 2023</h1>
          </div>
          <p className="text-indigo-200 text-lg mb-2">אוניברסיטת רייכמן | סמסטר 2022-23</p>
          <div className="flex flex-wrap gap-4 text-sm text-indigo-200 mt-4">
            <span className="bg-indigo-600/50 px-3 py-1 rounded-lg">5 שאלות — עונים על 4</span>
            <span className="bg-indigo-600/50 px-3 py-1 rounded-lg">25 נקודות לשאלה</span>
            <span className="bg-indigo-600/50 px-3 py-1 rounded-lg">3 שעות</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Strategy Section */}
        <Section title="אסטרטגיית פתרון מומלצת" icon={<Target className="w-5 h-5" />} color="text-purple-700">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-700">סדר מומלץ:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-bold">1. שאלה 5</span>
              <span className="text-purple-400">→</span>
              <span className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-bold">2. שאלה 1</span>
              <span className="text-purple-400">→</span>
              <span className="bg-purple-400 text-white px-3 py-1 rounded-lg text-sm font-bold">3. שאלה 4</span>
              <span className="text-purple-400">→</span>
              <span className="bg-purple-300 text-white px-3 py-1 rounded-lg text-sm font-bold">4. שאלה 2</span>
            </div>
            <p className="text-sm text-purple-600 mt-3">
              <AlertTriangle className="w-4 h-4 inline ml-1" />
              שאלה 3 ניתנת לדילוג אם נגמר הזמן — שאלות 5 ו-1 הן הכי &quot;ידידותיות&quot; (הוכחות מהרצאות).
            </p>
          </div>
        </Section>

        {/* Question 1 */}
        <QuestionBox num={1} pts={25} topic="שטייניץ + צורה קנונית">

          {/* 1a */}
          <SubQ label="א" pts={15}>
            <Problem>
              <p>יהיו <M>v₁, ..., vₖ</M> בלתי תלויים לינארית ו-<M>w₁, ..., wₘ</M> פורשים את <M>V</M>.</p>
              <p className="font-bold mt-1">הוכיחו כי <M>k ≤ m</M>.</p>
            </Problem>
            <Solution>
              <p className="font-bold">הוכחה (למת שטייניץ / למת ההחלפה — באינדוקציה על k):</p>
              <p><strong>בסיס האינדוקציה (k=1):</strong></p>
              <p>
                <M>v₁</M> בלתי תלוי לינארית, כלומר <M>v₁ ≠ 0</M>.
                מכיוון ש-<M>w₁, ..., wₘ</M> פורשים את <M>V</M>, קיימים סקלרים <M>α₁, ..., αₘ</M> כך ש-<M>v₁ = α₁w₁ + ... + αₘwₘ</M>.
                בהכרח קיים <M>αⱼ ≠ 0</M> (כי <M>v₁ ≠ 0</M>).
                בפרט <M>m ≥ 1 = k</M>. ✓
              </p>
              <p><strong>הנחת האינדוקציה:</strong> הטענה נכונה עבור <M>k-1</M>, כלומר אם יש <M>k-1</M> בלתי תלויים ו-<M>m</M> פורשים, אז <M>k-1 ≤ m</M>.</p>
              <p><strong>צעד האינדוקציה (k):</strong></p>
              <p>
                נתון <M>v₁, ..., vₖ</M> בלתי תלויים לינארית. בפרט <M>v₁, ..., vₖ₋₁</M> בלתי תלויים לינארית.
                מהנחת האינדוקציה: <M>k-1 ≤ m</M>.
              </p>
              <p>
                מכיוון ש-<M>w₁, ..., wₘ</M> פורשים את <M>V</M>:
              </p>
              <p className="mr-4"><M>vₖ = α₁w₁ + α₂w₂ + ... + αₘwₘ</M></p>
              <p>
                בצעד הקודם של האינדוקציה, החלפנו <M>k-1</M> מתוך ה-<M>wⱼ</M> ב-<M>v₁, ..., vₖ₋₁</M>,
                וקיבלנו קבוצה פורשת: <M>{'{'}v₁, ..., vₖ₋₁, wₖ, ..., wₘ{'}'}</M> (WLOG, אחרי שינוי סדר).
              </p>
              <p>
                לכן: <M>vₖ = β₁v₁ + ... + βₖ₋₁vₖ₋₁ + βₖwₖ + ... + βₘwₘ</M>.
              </p>
              <p>
                בהכרח קיים <M>j ∈ {'{'}k, ..., m{'}'}</M> כך ש-<M>βⱼ ≠ 0</M>. (אחרת <M>vₖ = β₁v₁ + ... + βₖ₋₁vₖ₋₁</M>, סתירה לאי-תלות.)
              </p>
              <p>
                מכאן נוכל להחליף את <M>wⱼ</M> ב-<M>vₖ</M> ועדיין לפרוש.
                בפרט: <M>m ≥ k</M> (כי <M>j ∈ {'{'}k, ..., m{'}'}</M> קיים). ✓
              </p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 13 — למת שטייניץ (הוכחה מלאה באינדוקציה)</p>
            </Solution>
            <Tip>
              <p>זו הוכחה קלאסית מההרצאה — שחזרו אותה שלב-שלב. המפתח הוא <strong>צעד ההחלפה</strong>: תמיד קיים מקדם שונה מאפס של אחד מה-<M>w</M>-ים (אחרת סתירה לאי-תלות).</p>
            </Tip>
          </SubQ>

          {/* 1b */}
          <SubQ label="ב" pts={10}>
            <Problem>
              <p>נתונה <M>A ∈ M₃ₓ₄(Z₅)</M>:</p>
              <p className="text-center my-2 font-mono">
                A = [[1, 0, 2, 4], [0, 2, 3, 4], [0, 4, 2, 2]]
              </p>
              <p>מצאו מטריצה הפיכה <M>P ∈ M₃(Z₅)</M> כך ש-<M>PA</M> היא קנונית (RREF).</p>
            </Problem>
            <Solution>
              <p className="font-bold">שלב 1: דירוג מעל <M>Z₅</M></p>
              <p>עמודה 2: R₂ → R₂ · 3 (כי 2⁻¹ = 3 ב-<M>Z₅</M>):</p>
              <p className="mr-4 font-mono text-xs">[[1, 0, 2, 4], [0, 1, 4, 2], [0, 4, 2, 2]]</p>
              <p>R₃ → R₃ - 4·R₂:</p>
              <p className="mr-4 font-mono text-xs">[[1, 0, 2, 4], [0, 1, 4, 2], [0, 0, 2-16, 2-8]] = [[1, 0, 2, 4], [0, 1, 4, 2], [0, 0, -14, -6]]</p>
              <p>ב-<M>Z₅</M>: <M>-14 ≡ 1</M>, <M>-6 ≡ 4</M>:</p>
              <p className="mr-4 font-mono text-xs">[[1, 0, 2, 4], [0, 1, 4, 2], [0, 0, 1, 4]]</p>
              <p>R₂ → R₂ - 4·R₃:</p>
              <p className="mr-4 font-mono text-xs">[[1, 0, 2, 4], [0, 1, 0, 2-16] = [0, 1, 0, -14] = [0, 1, 0, 1], [0, 0, 1, 4]]</p>
              <p>R₁ → R₁ - 2·R₃:</p>
              <p className="mr-4 font-mono text-xs">[[1, 0, 0, 4-8], [0, 1, 0, 1], [0, 0, 1, 4]] = [[1, 0, 0, -4], [0, 1, 0, 1], [0, 0, 1, 4]]</p>
              <p>ב-<M>Z₅</M>: <M>-4 ≡ 1</M>:</p>
              <p className="mr-4 font-mono text-xs font-bold">RREF = [[1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 4]]</p>

              <p className="font-bold mt-3">שלב 2: מציאת P</p>
              <p><M>P</M> היא מכפלת המטריצות האלמנטריות. נבצע את אותן פעולות שורה על <M>I₃</M>:</p>
              <p>נתחיל מ-<M>I₃ = [[1,0,0],[0,1,0],[0,0,1]]</M></p>
              <p>R₂ → R₂ · 3: <M>[[1,0,0],[0,3,0],[0,0,1]]</M></p>
              <p>R₃ → R₃ - 4·R₂: <M>[[1,0,0],[0,3,0],[0,-12,1]] = [[1,0,0],[0,3,0],[0,3,1]]</M> (ב-<M>Z₅</M>: <M>-12 ≡ 3</M>)</p>
              <p>R₂ → R₂ - 4·R₃: <M>[[1,0,0],[0,3-12,0-4]] = [[1,0,0],[0,-9,-4],[0,3,1]] = [[1,0,0],[0,1,1],[0,3,1]]</M> (ב-<M>Z₅</M>: <M>-9 ≡ 1</M>, <M>-4 ≡ 1</M>)</p>
              <p>R₁ → R₁ - 2·R₃: <M>[[1-0,0-6,0-2],[0,1,1],[0,3,1]] = [[1,-6,-2],[0,1,1],[0,3,1]] = [[1,4,3],[0,1,1],[0,3,1]]</M> (ב-<M>Z₅</M>: <M>-6 ≡ 4</M>, <M>-2 ≡ 3</M>)</p>

              <p className="font-bold mt-2">תשובה:</p>
              <p className="text-center font-mono">P = [[1, 4, 3], [0, 1, 1], [0, 3, 1]]</p>

              <p className="mt-2"><strong>אימות:</strong> <M>PA = RREF</M> = [[1,0,0,1],[0,1,0,1],[0,0,1,4]]. ✓</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות 1-8 — דירוג מעל Z₅</p>
            </Solution>
            <Tip>
              <p>ב-<M>Z₅</M> חשוב לזכור: <M>2⁻¹ = 3</M>, <M>3⁻¹ = 2</M>, <M>4⁻¹ = 4</M>. כל חישוב מודולו 5!</p>
            </Tip>
          </SubQ>
        </QuestionBox>

        {/* Question 2 */}
        <QuestionBox num={2} pts={25} topic="מערכת משוואות + הפיכות">

          {/* 2a */}
          <SubQ label="א" pts={18}>
            <Problem>
              <p>נתונה מערכת המשוואות עם פרמטרים <M>a, b</M>:</p>
              <p className="font-mono text-center my-2">
                x + 2y - 3z = 4<br />
                3x - y + 5z = -2<br />
                ax + by + (a+b)z = b
              </p>
              <p><strong>i.</strong> הוכיחו שלמערכת תמיד יש פתרון.</p>
              <p><strong>ii.</strong> עבור אילו ערכי <M>a, b</M> הפתרון יחיד? מצאו אותו.</p>
            </Problem>
            <Solution>
              <p className="font-bold">דירוג המטריצה המורחבת:</p>
              <p className="font-mono text-xs mr-4">
                [[1, 2, -3 | 4], [3, -1, 5 | -2], [a, b, a+b | b]]
              </p>
              <p>R₂ → R₂ - 3·R₁:</p>
              <p className="font-mono text-xs mr-4">
                [[1, 2, -3 | 4], [0, -7, 14 | -14], [a, b, a+b | b]]
              </p>
              <p>R₃ → R₃ - a·R₁:</p>
              <p className="font-mono text-xs mr-4">
                [[1, 2, -3 | 4], [0, -7, 14 | -14], [0, b-2a, b+4a | b-4a]]
              </p>
              <p>R₂ → R₂ / (-7):</p>
              <p className="font-mono text-xs mr-4">
                [[1, 2, -3 | 4], [0, 1, -2 | 2], [0, b-2a, b+4a | b-4a]]
              </p>
              <p>R₃ → R₃ - (b-2a)·R₂:</p>
              <p className="font-mono text-xs mr-4">
                R₃ = [0, 0, (b+4a) - (b-2a)(-2) | (b-4a) - (b-2a)(2)]
              </p>
              <p className="font-mono text-xs mr-4">
                = [0, 0, b+4a+2b-4a | b-4a-2b+4a] = [0, 0, 3b | -b]
              </p>
              <p className="font-bold mt-3">i. הוכחה שתמיד יש פתרון:</p>
              <p>
                נניח בשלילה שאין פתרון. אז השורה השלישית היא <M>[0, 0, 0 | c]</M> כאשר <M>c ≠ 0</M>.
              </p>
              <p>
                מהשורה השלישית: <M>3b = 0</M> ו-<M>-b ≠ 0</M>.
              </p>
              <p>
                <M>3b = 0 ⟹ b = 0</M>. אבל אז <M>-b = 0</M>, סתירה ל-<M>-b ≠ 0</M>.
              </p>
              <p>
                מכאן שתמיד יש פתרון למערכת. ✓
              </p>

              <p className="font-bold mt-3">ii. פתרון יחיד כאשר <M>b ≠ 0</M>:</p>
              <p>
                אם <M>b ≠ 0</M> אז <M>3b ≠ 0</M>, ולכן המקדם של <M>z</M> בשורה השלישית שונה מאפס.
                יש 3 pivots → פתרון יחיד.
              </p>
              <p>
                אם <M>b = 0</M> אז השורה השלישית היא <M>[0, 0, 0 | 0]</M> — משתנה חופשי, אינסוף פתרונות.
              </p>
              <p className="font-bold mt-2">מציאת הפתרון (עבור <M>b ≠ 0</M>):</p>
              <p>משורה 3: <M>3b · z = -b ⟹ z = -b/(3b) = -1/3</M></p>
              <p>משורה 2: <M>y - 2z = 2 ⟹ y = 2 + 2(-1/3) = 2 - 2/3 = 4/3</M></p>
              <p>משורה 1: <M>x + 2y - 3z = 4 ⟹ x = 4 - 2(4/3) + 3(-1/3) = 4 - 8/3 - 1 = 3 - 8/3 = 1/3</M></p>
              <p className="font-bold text-center mt-2">(x, y, z) = (1/3, 4/3, -1/3)</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות 1-8 — דירוג מטריצות</p>
            </Solution>
            <Tip>
              <p>בהוכחת &quot;תמיד יש פתרון&quot; — שימו לב לטריק: בשלילה, <M>3b = 0</M> גורר <M>b = 0</M>, אבל אז <M>-b = 0</M>, סתירה!</p>
            </Tip>
          </SubQ>

          {/* 2b */}
          <SubQ label="ב" pts={7}>
            <Problem>
              <p>נתון <M>A³ + A² - A + 5Iₙ = 0</M>. הוכיחו ש-<M>A</M> הפיכה.</p>
            </Problem>
            <Solution>
              <p className="font-bold">הוכחה:</p>
              <p>נסדר מחדש:</p>
              <p className="mr-4"><M>A³ + A² - A = -5Iₙ</M></p>
              <p>נוציא <M>A</M> כגורם משמאל:</p>
              <p className="mr-4"><M>A(A² + A - Iₙ) = -5Iₙ</M></p>
              <p>נחלק ב-<M>-5</M>:</p>
              <p className="mr-4"><M>A · (-1/5)(A² + A - Iₙ) = Iₙ</M></p>
              <p>
                מצאנו מטריצה <M>B = (-1/5)(A² + A - Iₙ)</M> כך ש-<M>AB = Iₙ</M>.
              </p>
              <p>
                לכן <M>A</M> הפיכה, ו-<M>A⁻¹ = (-1/5)(A² + A - Iₙ)</M>. ✓
              </p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות על הפיכות — פירוק פולינום מטריצתי</p>
            </Solution>
            <Tip>
              <p>הטריק: בודדו את <M>Iₙ</M> בצד אחד, הוציאו <M>A</M> כגורם בצד השני. מה שנשאר הוא <M>A⁻¹</M>.</p>
            </Tip>
          </SubQ>
        </QuestionBox>

        {/* Question 3 */}
        <QuestionBox num={3} pts={25} topic="העתקות לינאריות">

          {/* 3a */}
          <SubQ label="א" pts={12}>
            <Problem>
              <p>תהי <M>T: V → W</M> העתקה לינארית.</p>
              <p><strong>i (7 נק&apos;):</strong> <M>T</M> חח&quot;ע ו-<M>T(v₁), ..., T(vₖ)</M> פורשים את <M>W</M>. הוכיחו ש-<M>v₁, ..., vₖ</M> פורשים את <M>V</M>.</p>
              <p><strong>ii (5 נק&apos;):</strong> <M>T(v₁), ..., T(vₖ)</M> פורשים את <M>W</M> וגם <M>v₁, ..., vₖ</M> פורשים את <M>V</M>. האם בהכרח <M>T</M> חח&quot;ע? הוכיחו או הפריכו.</p>
            </Problem>
            <Solution>
              <p className="font-bold">i. הוכחה:</p>
              <p>יהי <M>v ∈ V</M>. נראה ש-<M>v ∈ Span{'{'}v₁, ..., vₖ{'}'}</M>.</p>
              <p>
                <M>T(v) ∈ W</M>. מכיוון ש-<M>T(v₁), ..., T(vₖ)</M> פורשים את <M>W</M>, קיימים סקלרים <M>α₁, ..., αₖ</M> כך ש:
              </p>
              <p className="mr-4"><M>T(v) = α₁T(v₁) + ... + αₖT(vₖ)</M></p>
              <p>מלינאריות <M>T</M>:</p>
              <p className="mr-4"><M>T(v) = T(α₁v₁ + ... + αₖvₖ)</M></p>
              <p><M>T</M> חח&quot;ע, ולכן:</p>
              <p className="mr-4"><M>v = α₁v₁ + ... + αₖvₖ</M></p>
              <p>מכאן <M>v ∈ Span{'{'}v₁, ..., vₖ{'}'}</M>. ✓</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה על ה&quot;ל — חח&quot;ע + פריסה</p>

              <p className="font-bold mt-4">ii. הפרכה — התשובה: לא!</p>
              <p><strong>דוגמה נגדית:</strong></p>
              <p>
                <M>V = R²</M>, <M>W = R</M>, <M>T(x, y) = x</M>.
              </p>
              <p>
                ניקח <M>v₁ = (1, 0)</M>, <M>v₂ = (0, 1)</M>.
              </p>
              <p>
                <M>v₁, v₂</M> פורשים את <M>V = R²</M>. ✓
              </p>
              <p>
                <M>T(v₁) = 1</M>, <M>T(v₂) = 0</M> → <M>Span{'{'}1, 0{'}'} = R = W</M>. ✓
              </p>
              <p>
                אבל <M>T</M> <strong>לא</strong> חח&quot;ע: <M>T(1, 0) = 1 = T(1, 1)</M>, אך <M>(1, 0) ≠ (1, 1)</M>.
              </p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: דוגמה נגדית</p>
            </Solution>
            <Tip>
              <p>בסעיף ii, חפשו העתקה שהיא <strong>על</strong> אבל <strong>לא חח&quot;ע</strong> — הטלה (projection) היא דוגמה קלאסית.</p>
            </Tip>
          </SubQ>

          {/* 3b */}
          <SubQ label="ב" pts={13}>
            <Problem>
              <p>יהיו <M>V, W</M> ממימד סופי, <M>T: V → W</M>, <M>S: W → V</M> העתקות לינאריות.</p>
              <p><strong>i (6 נק&apos;):</strong> הוכיחו <M>dim ker(S ∘ T) ≥ dim ker(T)</M>.</p>
              <p><strong>ii (7 נק&apos;):</strong> הוכיחו: אם <M>dim(W) &lt; dim(V)</M> אז <M>S ∘ T</M> לא חח&quot;ע.</p>
            </Problem>
            <Solution>
              <p className="font-bold">i. הוכחה:</p>
              <p>נראה ש-<M>ker(T) ⊆ ker(S ∘ T)</M>:</p>
              <p>
                יהי <M>v ∈ ker(T)</M>. אז <M>T(v) = 0</M>.
              </p>
              <p>
                <M>(S ∘ T)(v) = S(T(v)) = S(0) = 0</M>.
              </p>
              <p>
                לכן <M>v ∈ ker(S ∘ T)</M>.
              </p>
              <p>
                מכאן: <M>ker(T) ⊆ ker(S ∘ T)</M>, ולכן:
              </p>
              <p className="mr-4 font-bold"><M>dim ker(S ∘ T) ≥ dim ker(T)</M> ✓</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: תכונות גרעין</p>

              <p className="font-bold mt-4">ii. הוכחה:</p>
              <p>ממשפט הממד (rank-nullity) עבור <M>T</M>:</p>
              <p className="mr-4"><M>dim V = dim ker(T) + dim Im(T)</M></p>
              <p><M>dim Im(T) ≤ dim W &lt; dim V</M>.</p>
              <p>לכן:</p>
              <p className="mr-4"><M>dim ker(T) = dim V - dim Im(T) &gt; dim V - dim V = 0</M></p>
              <p>כלומר <M>dim ker(T) &gt; 0</M>.</p>
              <p>מסעיף (i):</p>
              <p className="mr-4"><M>dim ker(S ∘ T) ≥ dim ker(T) &gt; 0</M></p>
              <p>
                לכן <M>ker(S ∘ T) ≠ {'{'}0{'}'}</M>, ומכאן <M>S ∘ T</M> <strong>לא חח&quot;ע</strong>. ✓
              </p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: משפט הממד (rank-nullity)</p>
            </Solution>
            <Tip>
              <p>סעיף ii משתמש בשרשרת: <M>dim Im(T) ≤ dim W &lt; dim V</M> → גרעין T לא טריוויאלי → גרעין S∘T לא טריוויאלי.</p>
            </Tip>
          </SubQ>
        </QuestionBox>

        {/* Question 4 */}
        <QuestionBox num={4} pts={25} topic="נילפוטנטיות + חילוף">

          {/* 4a */}
          <SubQ label="א" pts={18}>
            <Problem>
              <p>נתון <M>A² = 0ₙₓₙ</M>.</p>
              <p><strong>i (6 נק&apos;):</strong> הוכיחו ש-<M>Iₙ + A</M> הפיכה.</p>
              <p><strong>ii (6 נק&apos;):</strong> הוכיחו ש-<M>Col(A) ⊆ Nul(A)</M>.</p>
              <p><strong>iii (6 נק&apos;):</strong> הוכיחו ש-<M>rank(A) ≤ n/2</M>.</p>
            </Problem>
            <Solution>
              <p className="font-bold">i. הוכחה ש-<M>Iₙ + A</M> הפיכה:</p>
              <p>נחשב את המכפלה <M>(Iₙ + A)(Iₙ - A)</M>:</p>
              <p className="mr-4">
                <M>(Iₙ + A)(Iₙ - A) = Iₙ² - Iₙ·A + A·Iₙ - A² = Iₙ - A + A - A² = Iₙ - A²</M>
              </p>
              <p>מכיוון ש-<M>A² = 0</M>:</p>
              <p className="mr-4"><M>(Iₙ + A)(Iₙ - A) = Iₙ - 0 = Iₙ</M></p>
              <p>
                לכן <M>Iₙ + A</M> הפיכה ו-<M>(Iₙ + A)⁻¹ = Iₙ - A</M>. ✓
              </p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאות על הפיכות — פירוק אלגברי</p>

              <p className="font-bold mt-4">ii. הוכחה ש-<M>Col(A) ⊆ Nul(A)</M>:</p>
              <p>יהי <M>b ∈ Col(A)</M>. אז קיים <M>v</M> כך ש-<M>b = Av</M>.</p>
              <p>נבדוק אם <M>b ∈ Nul(A)</M>:</p>
              <p className="mr-4"><M>Ab = A(Av) = A²v = 0ₙₓₙ · v = 0</M></p>
              <p>לכן <M>Ab = 0</M>, כלומר <M>b ∈ Nul(A)</M>. ✓</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: תכונות מרחב עמודות/גרעין</p>

              <p className="font-bold mt-4">iii. הוכחה ש-<M>rank(A) ≤ n/2</M>:</p>
              <p>מסעיף (ii): <M>Col(A) ⊆ Nul(A)</M>.</p>
              <p>לכן:</p>
              <p className="mr-4"><M>dim Col(A) ≤ dim Nul(A)</M></p>
              <p className="mr-4"><M>rank(A) ≤ nullity(A)</M></p>
              <p>ממשפט הממד (rank-nullity):</p>
              <p className="mr-4"><M>rank(A) + nullity(A) = n</M></p>
              <p>לכן:</p>
              <p className="mr-4"><M>nullity(A) = n - rank(A)</M></p>
              <p>ומכאן:</p>
              <p className="mr-4"><M>rank(A) ≤ n - rank(A)</M></p>
              <p className="mr-4"><M>2 · rank(A) ≤ n</M></p>
              <p className="mr-4 font-bold"><M>rank(A) ≤ n/2</M> ✓</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: שימוש ב-rank-nullity</p>
            </Solution>
            <Tip>
              <p>שרשרת יפה: <M>A² = 0</M> → <M>Col(A) ⊆ Nul(A)</M> → <M>rank ≤ nullity</M> → <M>rank ≤ n/2</M>. כל סעיף בונה על הקודם!</p>
            </Tip>
          </SubQ>

          {/* 4b */}
          <SubQ label="ב" pts={7}>
            <Problem>
              <p>
                נתון <M>A ∈ M₂(R)</M> כך ש-<M>AB = BA</M> לכל מטריצה <M>B</M> <strong>אנטי-סימטרית</strong>.
                הוכיחו או הפריכו: <M>A = αI₂</M>.
              </p>
            </Problem>
            <Solution>
              <p className="font-bold">הפרכה — התשובה: לא בהכרח!</p>
              <p><strong>דוגמה נגדית:</strong></p>
              <p>ניקח <M>A = [[1, 1], [-1, 1]]</M>.</p>
              <p><M>A</M> היא <strong>לא</strong> כפולה של <M>I₂</M> (כי <M>A₁₂ = 1 ≠ 0</M>).</p>
              <p className="mt-2">כל מטריצה אנטי-סימטרית ב-<M>M₂(R)</M> היא מהצורה:</p>
              <p className="text-center font-mono"><M>B = [[0, k], [-k, 0]]</M></p>
              <p className="mt-2"><strong>חישוב AB:</strong></p>
              <p className="mr-4 font-mono text-xs">
                AB = [[1, 1], [-1, 1]] · [[0, k], [-k, 0]]<br />
                = [[0 + (-k), k + 0], [0 + (-k), -k + 0]]<br />
                = [[-k, k], [-k, -k]]
              </p>
              <p className="mt-2"><strong>חישוב BA:</strong></p>
              <p className="mr-4 font-mono text-xs">
                BA = [[0, k], [-k, 0]] · [[1, 1], [-1, 1]]<br />
                = [[0 + (-k), 0 + k], [-k + 0, -k + 0]]<br />
                = [[-k, k], [-k, -k]]
              </p>
              <p className="mt-2"><M>AB = BA = [[-k, k], [-k, -k]]</M> ✓</p>
              <p className="mt-2">מצאנו מטריצה <M>A ≠ αI₂</M> שמחליפה עם כל מטריצה אנטי-סימטרית. הטענה <strong>הופרכה</strong>.</p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: דוגמה נגדית + חישוב ישיר</p>
            </Solution>
            <Tip>
              <p>המפתח: ב-<M>M₂</M> יש רק &quot;מימד 1&quot; של מטריצות אנטי-סימטריות (כולן כפולות של <M>[[0,1],[-1,0]]</M>). לכן קל יחסית למצוא מטריצות שמחליפות איתן.</p>
            </Tip>
          </SubQ>
        </QuestionBox>

        {/* Question 5 */}
        <QuestionBox num={5} pts={25} topic="יחידות ייצוג + T(תתי-מרחבים)">

          {/* 5a */}
          <SubQ label="א" pts={13}>
            <Problem>
              <p>
                הוכיחו: <M>v₁, ..., vₖ</M> בלתי תלויים לינארית אם&quot;ם לכל <M>v ∈ Span{'{'}v₁, ..., vₖ{'}'}</M> קיימים <M>α₁, ..., αₖ</M> <strong>יחידים</strong> כך ש-<M>v = α₁v₁ + ... + αₖvₖ</M>.
              </p>
            </Problem>
            <Solution>
              <p className="font-bold">הוכחה (משפט יחידות הייצוג):</p>

              <p className="font-bold mt-2">כיוון 1 (⟸): יחידות הייצוג ⟹ אי-תלות לינארית</p>
              <p>
                נניח שלכל <M>v ∈ Span{'{'}v₁, ..., vₖ{'}'}</M> הייצוג יחיד.
                נראה ש-<M>v₁, ..., vₖ</M> בלתי תלויים.
              </p>
              <p>
                נניח <M>α₁v₁ + ... + αₖvₖ = 0</M>.
              </p>
              <p>
                הצירוף <M>0 = 0·v₁ + ... + 0·vₖ</M> הוא ייצוג של <M>0</M>.
              </p>
              <p>
                גם <M>0 = α₁v₁ + ... + αₖvₖ</M> הוא ייצוג של <M>0</M>.
              </p>
              <p>
                מיחידות הייצוג: <M>α₁ = 0, ..., αₖ = 0</M>.
              </p>
              <p>
                לכן <M>v₁, ..., vₖ</M> בלתי תלויים לינארית. ✓
              </p>

              <p className="font-bold mt-3">כיוון 2 (⟹): אי-תלות לינארית ⟹ יחידות הייצוג</p>
              <p>
                נניח <M>v₁, ..., vₖ</M> בלתי תלויים לינארית.
                יהי <M>v ∈ Span{'{'}v₁, ..., vₖ{'}'}</M>, ונניח שיש שני ייצוגים:
              </p>
              <p className="mr-4"><M>v = α₁v₁ + ... + αₖvₖ</M></p>
              <p className="mr-4"><M>v = β₁v₁ + ... + βₖvₖ</M></p>
              <p>נחסר:</p>
              <p className="mr-4"><M>0 = (α₁ - β₁)v₁ + ... + (αₖ - βₖ)vₖ</M></p>
              <p>
                מאי-תלות לינארית: <M>αᵢ - βᵢ = 0</M> לכל <M>i</M>, כלומר <M>αᵢ = βᵢ</M>.
              </p>
              <p>
                הייצוג יחיד. ✓
              </p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הרצאה 11 — משפט יחידות הייצוג (הוכחה מלאה)</p>
            </Solution>
            <Tip>
              <p>זו הוכחה קלאסית שמופיעה בהרצאה 11. שני הכיוונים קצרים — המפתח הוא <strong>חיסור שני ייצוגים</strong> ושימוש בהגדרת אי-תלות.</p>
            </Tip>
          </SubQ>

          {/* 5b */}
          <SubQ label="ב" pts={12}>
            <Problem>
              <p>
                יהיו <M>U, W ⊆ V</M> תתי-מרחבים, <M>T: V → V</M> העתקה לינארית.
                נגדיר: <M>U₁ = {'{'}T(u) : u ∈ U{'}'}</M>, <M>W₁ = {'{'}T(w) : w ∈ W{'}'}</M>.
              </p>
              <p><strong>i (4 נק&apos;):</strong> הוכיחו ש-<M>U₁</M> ו-<M>W₁</M> תתי-מרחבים של <M>V</M>.</p>
              <p><strong>ii (4 נק&apos;):</strong> הוכיחו: <M>V = U + W ⟹ Im(T) = U₁ + W₁</M>.</p>
              <p><strong>iii (4 נק&apos;):</strong> הוכיחו: <M>V = U ⊕ W</M> ו-<M>T</M> חח&quot;ע ⟹ <M>Im(T) = U₁ ⊕ W₁</M>.</p>
            </Problem>
            <Solution>
              <p className="font-bold">i. הוכחה ש-<M>U₁</M> תת-מרחב (וזהה ל-<M>W₁</M>):</p>
              <p><strong>לא ריק:</strong> <M>0 ∈ U</M> (כי <M>U</M> תת-מרחב), ולכן <M>T(0) = 0 ∈ U₁</M>.</p>
              <p><strong>סגור לצירוף לינארי:</strong></p>
              <p>
                יהיו <M>u₁, v₁ ∈ U₁</M>. אז קיימים <M>u, v ∈ U</M> כך ש-<M>u₁ = T(u)</M>, <M>v₁ = T(v)</M>.
              </p>
              <p>
                לכל סקלרים <M>α, β</M>:
              </p>
              <p className="mr-4">
                <M>αu₁ + βv₁ = αT(u) + βT(v) = T(αu + βv)</M>
              </p>
              <p>
                <M>αu + βv ∈ U</M> (כי <M>U</M> תת-מרחב), ולכן <M>T(αu + βv) ∈ U₁</M>.
              </p>
              <p>
                מכאן <M>U₁</M> תת-מרחב. הוכחה זהה עבור <M>W₁</M>. ✓
              </p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: תכונות ה&quot;ל + תת-מרחבים</p>

              <p className="font-bold mt-4">ii. הוכחה: <M>V = U + W ⟹ Im(T) = U₁ + W₁</M></p>
              <p><strong>כיוון ⊆:</strong></p>
              <p>
                יהי <M>v ∈ Im(T)</M>. אז קיים <M>v&apos; ∈ V</M> כך ש-<M>T(v&apos;) = v</M>.
              </p>
              <p>
                <M>V = U + W</M>, לכן <M>v&apos; = u + w</M> עבור <M>u ∈ U</M>, <M>w ∈ W</M>.
              </p>
              <p className="mr-4">
                <M>v = T(v&apos;) = T(u + w) = T(u) + T(w) ∈ U₁ + W₁</M>
              </p>
              <p><strong>כיוון ⊇:</strong></p>
              <p>
                <M>U₁ ⊆ Im(T)</M> ו-<M>W₁ ⊆ Im(T)</M> (כי <M>T(u) ∈ Im(T)</M> לכל <M>u</M>).
              </p>
              <p>
                לכן <M>U₁ + W₁ ⊆ Im(T)</M>. ✓
              </p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: הגדרת סכום + ה&quot;ל</p>

              <p className="font-bold mt-4">iii. הוכחה: <M>V = U ⊕ W</M>, <M>T</M> חח&quot;ע ⟹ <M>Im(T) = U₁ ⊕ W₁</M></p>
              <p>מסעיף (ii) כבר יודעים <M>Im(T) = U₁ + W₁</M> (כי <M>U ⊕ W</M> בפרט הוא <M>U + W</M>).</p>
              <p>נותר להוכיח: <M>U₁ ∩ W₁ = {'{'}0{'}'}</M>.</p>
              <p>
                יהי <M>v ∈ U₁ ∩ W₁</M>. אז קיימים <M>u ∈ U</M> ו-<M>w ∈ W</M> כך ש:
              </p>
              <p className="mr-4"><M>T(u) = v = T(w)</M></p>
              <p><M>T</M> חח&quot;ע, ולכן <M>u = w</M>.</p>
              <p>
                <M>u ∈ U</M> ו-<M>u = w ∈ W</M>, לכן <M>u ∈ U ∩ W</M>.
              </p>
              <p>
                <M>V = U ⊕ W</M>, לכן <M>U ∩ W = {'{'}0{'}'}</M>, ומכאן <M>u = 0</M>.
              </p>
              <p>
                <M>v = T(u) = T(0) = 0</M>.
              </p>
              <p>
                הוכחנו <M>U₁ ∩ W₁ = {'{'}0{'}'}</M>, ולכן <M>Im(T) = U₁ ⊕ W₁</M>. ✓
              </p>
              <p className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">📚 מקור: סכום ישר + חח&quot;ע</p>
            </Solution>
            <Tip>
              <p>בסעיף iii, המפתח: <M>T(u) = T(w)</M> + חח&quot;ע → <M>u = w</M> → <M>u ∈ U ∩ W = {'{'}0{'}'}</M>. זה שימוש יפה בשילוב סכום ישר וחח&quot;ע.</p>
            </Tip>
          </SubQ>
        </QuestionBox>

        {/* Summary Section */}
        <Section title="סיכום נושאים לפי שאלה" icon={<Star className="w-5 h-5" />} color="text-yellow-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="font-bold text-blue-700 text-sm mb-1">שאלה 1 — שטייניץ + קנונית</p>
              <p className="text-xs text-blue-600">למת שטייניץ (אינדוקציה), דירוג מעל Z₅, מטריצות אלמנטריות</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="font-bold text-green-700 text-sm mb-1">שאלה 2 — מערכות + הפיכות</p>
              <p className="text-xs text-green-600">דירוג עם פרמטרים, הוכחת קיום פתרון, פולינום מטריצתי</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <p className="font-bold text-purple-700 text-sm mb-1">שאלה 3 — העתקות לינאריות</p>
              <p className="text-xs text-purple-600">חח&quot;ע + פריסה, דוגמה נגדית, הרכבת ה&quot;ל, rank-nullity</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="font-bold text-red-700 text-sm mb-1">שאלה 4 — נילפוטנטיות + חילוף</p>
              <p className="text-xs text-red-600">A²=0 → הפיכות, Col⊆Nul, rank≤n/2, מטריצות אנטי-סימטריות</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:col-span-2">
              <p className="font-bold text-amber-700 text-sm mb-1">שאלה 5 — יחידות ייצוג + תמונת תתי-מרחבים</p>
              <p className="text-xs text-amber-600">משפט יחידות הייצוג, T(תתי-מרחבים), סכום ישר + חח&quot;ע</p>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
