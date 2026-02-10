'use client';

import { useState } from 'react';
import {
  BookOpen, ChevronDown, ChevronUp, Target, Star,
  CheckCircle, AlertTriangle, Lightbulb, FileText,
  Eye, Award, GraduationCap, Zap, Search, Brain
} from 'lucide-react';

/* ─── Reusable Components ─── */

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
        <span className="font-bold text-sm text-emerald-700 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />פתרון מלא מפורט
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

function GoldenRule({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3 flex gap-2">
      <Award className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-yellow-900"><strong>כלל זהב:</strong> {children}</div>
    </div>
  );
}

function HowToIdentify({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-purple-50 border border-purple-300 rounded-lg p-3 flex gap-2">
      <Search className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-purple-800"><strong>איך לזהות:</strong> {children}</div>
    </div>
  );
}

function LectureRef({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 flex gap-2">
      <GraduationCap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
      <div className="text-xs text-blue-700">{children}</div>
    </div>
  );
}

function WhatILearned({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-teal-50 border border-teal-300 rounded-lg p-3 flex gap-2">
      <Brain className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-teal-800"><strong>מה לקחת מהתרגיל:</strong> {children}</div>
    </div>
  );
}

function StepExplain({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">{num}</div>
      <div className="flex-1">
        <div className="font-bold text-sm text-emerald-900 mb-1">{title}</div>
        <div className="text-sm text-emerald-800 space-y-1">{children}</div>
      </div>
    </div>
  );
}


export default function SimulationPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">

      {/* ═══════════════════════════════════════ */}
      {/* HEADER */}
      {/* ═══════════════════════════════════════ */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          סימולציה 2026 — ניתוח מלא + פתרונות מפורטים
        </h1>
        <p className="text-gray-600">Linear Algebra 1, Simulation 2026 — Reichman University</p>
        <p className="text-gray-500 text-sm mt-1">כל תרגיל עם הסברים, כללי זהב, הפניות להרצאות, ומה ללמוד ממנו</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">5 שאלות, עונים על 4</span>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">25 נקודות כל שאלה</span>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">3 שעות</span>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium">ללא חומר עזר</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* OVERVIEW */}
      {/* ═══════════════════════════════════════ */}
      <Section title="סקירת נושאים + רמת קושי" icon={<Target className="w-5 h-5" />} color="text-indigo-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { q: 'שאלה 1', topics: 'כפל מטריצות + Trace', diff: 'בינוני', lectures: 'הרצאות 16, 20' },
            { q: 'שאלה 2', topics: 'דטרמיננטת בלוקים + הפיכות שמאלית', diff: 'קשה', lectures: 'הרצאות 21-25, 17-19' },
            { q: 'שאלה 3', topics: 'מערכת עם פרמטר + בת"ל/פרישה', diff: 'בינוני', lectures: 'הרצאות 21-25, 11' },
            { q: 'שאלה 4', topics: 'דטרמיננטה 5×5 + ממד תת-מרחבים', diff: 'בינוני-קשה', lectures: 'הרצאות 21-25, 14-15' },
            { q: 'שאלה 5', topics: 'הכלת תת-מרחבים + חסמי דרגה', diff: 'בינוני', lectures: 'הרצאות 8-9, 20' },
          ].map(({ q, topics, diff, lectures }) => (
            <div key={q} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-sm text-gray-800">{q}</div>
                  <div className="text-xs text-gray-600 mt-1">{topics}</div>
                  <div className="text-xs text-blue-500 mt-1">{lectures}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  diff.includes('קשה') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>{diff}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* STRATEGY */}
      {/* ═══════════════════════════════════════ */}
      <Section title="סדר פתרון מומלץ" icon={<Star className="w-5 h-5" />} color="text-amber-600">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { order: '1', q: 'שאלה 3', reason: 'מערכת + בת"ל — שגרתי', time: '~40 דק' },
            { order: '2', q: 'שאלה 1', reason: 'הגדרה + הוכחה + דוגמה נגדית', time: '~40 דק' },
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
            <strong>דלג על שאלה 2:</strong> הוכחת det(K)=det(A)det(B) למטריצת בלוקים היא הוכחה ארוכה מההרצאה שצריך לשנן, וחישוב הפיכות שמאלית דורש עבודה מכנית עם 6 נעלמים. עדיף להשקיע את הזמן בשאלות 3, 1, 5, 4.
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════ */}
      {/* GOLDEN RULES SUMMARY */}
      {/* ═══════════════════════════════════════ */}
      <Section title="כללי הזהב — ריכוז מהיר" icon={<Award className="w-5 h-5" />} color="text-yellow-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { rule: 'להוכיח A = B למטריצות → הראה [A]ᵢⱼ = [B]ᵢⱼ לכל i,j', source: 'שאלה 1' },
            { rule: 'שואלים "נכון או לא?" → נסה דוגמה נגדית 2×2 עם {-1, 0, 1}', source: 'שאלה 1' },
            { rule: 'מטריצת בלוקים משולשית → det = מכפלת ה-det של הבלוקים באלכסון', source: 'שאלה 2' },
            { rule: 'det ≠ 0 → פתרון יחיד. det = 0 → בדוק מקרה-מקרה', source: 'שאלה 3' },
            { rule: 'להוכיח בת"ל → נניח Σαᵢvᵢ = 0, נראה כל αᵢ = 0', source: 'שאלה 3' },
            { rule: 'לפני חישוב det גדול → בדוק תלות שורות/עמודות!', source: 'שאלה 4' },
            { rule: 'dim(W + Span{w}) ∈ {dim W, dim W + 1} תמיד', source: 'שאלה 4' },
            { rule: 'להוכיח "A או B" → שלילה: נניח ¬A ∧ ¬B → סתירה', source: 'שאלה 5' },
            { rule: 'חסם תחתון ל-rank(A+B) → כתוב A = (A+B) + (-B) והשתמש בחסם עליון', source: 'שאלה 5' },
            { rule: 'להוכיח U ⊆ W → הראה שכל איבר פורש של U נמצא ב-W', source: 'שאלה 5' },
          ].map(({ rule, source }, i) => (
            <div key={i} className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 flex gap-2">
              <span className="text-yellow-600 font-bold text-sm mt-0.5 flex-shrink-0">{i+1}.</span>
              <div>
                <p className="text-sm text-yellow-900 font-medium">{rule}</p>
                <p className="text-xs text-yellow-600 mt-1">({source})</p>
              </div>
            </div>
          ))}
        </div>
      </Section>


      {/* ═══════════════════════════════════════════════ */}
      {/* ═══════════════ QUESTION 1 ═══════════════════ */}
      {/* ═══════════════════════════════════════════════ */}
      <QuestionBox num={1} pts={25} topic="כפל מטריצות + Trace">

        <HowToIdentify>
          כשרואים <strong>&quot;הגדר את כפל המטריצות&quot;</strong> — זו שאלת הגדרה. צריך לכתוב את הנוסחה המדויקת מהרצאה 16.
          כשרואים <strong>&quot;הוכח (AB)ᵗ = BᵗAᵗ&quot;</strong> — זו הוכחת שוויון מטריצות: פותחים שני צדדים לפי הגדרות ומראים שווים איבר-איבר.
          כשרואים <strong>&quot;נכון או לא&quot;</strong> — קודם מנסים דוגמה נגדית! אם לא מצליחים, מנסים להוכיח.
        </HowToIdentify>

        <GoldenRule>
          שוויון מטריצות: כדי להוכיח <M>A = B</M>, צריך להראות <M>[A]ᵢⱼ = [B]ᵢⱼ</M> לכל i ו-j. זה הבסיס לכל הוכחה של שוויון מטריצות!
        </GoldenRule>

        {/* ── 1.1.1 ── */}
        <SubQ label="1.1" pts={17}>
          <div className="space-y-4">
            <SubQ label="1.1.1" pts={2}>
              <Problem>
                <p>הגדר את כפל המטריצות AB עבור <M>A ∈ M_{'{m×n}'}(F)</M>, <M>B ∈ M_{'{n×r}'}(F)</M>.</p>
              </Problem>
              <Solution>
                <StepExplain num={1} title="ציין את הגדלים">
                  <p>יהיו <M>A ∈ M_{'{m×n}'}(F)</M> ו-<M>B ∈ M_{'{n×r}'}(F)</M>.</p>
                  <p className="text-xs text-gray-500">שימו לב: מספר העמודות של A חייב להיות שווה למספר השורות של B (= n). בלי זה הכפל לא מוגדר!</p>
                </StepExplain>
                <StepExplain num={2} title="ציין את גודל התוצאה">
                  <p>המכפלה <M>AB ∈ M_{'{m×r}'}(F)</M>.</p>
                  <p className="text-xs text-gray-500">m שורות (כמו A) ו-r עמודות (כמו B).</p>
                </StepExplain>
                <StepExplain num={3} title="כתוב את הנוסחה">
                  <p className="text-center font-mono my-2">[AB]ᵢⱼ = Σₖ₌₁ⁿ [A]ᵢₖ · [B]ₖⱼ</p>
                  <p className="text-xs text-gray-500">במילים: האיבר בשורה i ועמודה j של AB הוא הסכום של מכפלות האיברים משורה i של A עם עמודה j של B.</p>
                </StepExplain>
                <LectureRef>הרצאה 16 — הגדרת כפל מטריצות. זו הגדרה שצריך לדעת בעל פה!</LectureRef>
              </Solution>
              <Tip>
                <strong>2 נקודות חינם:</strong> שאלת הגדרה היא הנקודות הכי קלות במבחן. כתוב את הנוסחה המדויקת, ציין את הגדלים, ואל תשכח לכתוב &quot;לכל 1 ≤ i ≤ m ולכל 1 ≤ j ≤ r&quot;.
              </Tip>
            </SubQ>

            {/* ── 1.1.2 ── */}
            <SubQ label="1.1.2" pts={15}>
              <Problem>
                <p>הוכח: <M>(AB)ᵗ = BᵗAᵗ</M>.</p>
              </Problem>
              <Solution>
                <p className="font-bold text-emerald-900 mb-2">תרגום הפתרון הרשמי בעברית פשוטה:</p>
                <p className="mb-3 text-gray-600 text-xs">הרעיון: פותחים את שני הצדדים לפי ההגדרות, ומראים שכל איבר (i,j) שווה.</p>

                <StepExplain num={1} title="בדיקת גדלים — שני הצדדים אותו גודל">
                  <p>A ∈ M_{'{m×n}'}, B ∈ M_{'{n×r}'} ⟹ AB ∈ M_{'{m×r}'} ⟹ (AB)ᵗ ∈ M_{'{r×m}'}.</p>
                  <p>Bᵗ ∈ M_{'{r×n}'}, Aᵗ ∈ M_{'{n×m}'} ⟹ BᵗAᵗ ∈ M_{'{r×m}'}. ✓ אותו גודל.</p>
                  <p className="text-xs text-gray-500">זה שלב שלא חובה לכתוב, אבל מראה לבודק שאת מבינה מה קורה.</p>
                </StepExplain>

                <StepExplain num={2} title="צד שמאל — פתיחת (AB)ᵗ">
                  <p>לפי הגדרת שחלוף: <M>[(AB)ᵗ]ᵢⱼ = [AB]ⱼᵢ</M></p>
                  <p>לפי הגדרת כפל: <M>[AB]ⱼᵢ = Σₖ₌₁ⁿ [A]ⱼₖ · [B]ₖᵢ</M></p>
                  <p className="text-xs text-gray-500">שימו לב: השחלוף הופך את הסדר של i,j! לכן [AB]ⱼᵢ ולא [AB]ᵢⱼ.</p>
                </StepExplain>

                <StepExplain num={3} title="צד ימין — פתיחת BᵗAᵗ">
                  <p>לפי הגדרת כפל: <M>[BᵗAᵗ]ᵢⱼ = Σₖ₌₁ⁿ [Bᵗ]ᵢₖ · [Aᵗ]ₖⱼ</M></p>
                  <p>לפי הגדרת שחלוף: <M>[Bᵗ]ᵢₖ = [B]ₖᵢ</M> ו-<M>[Aᵗ]ₖⱼ = [A]ⱼₖ</M></p>
                  <p>לכן: <M>[BᵗAᵗ]ᵢⱼ = Σₖ₌₁ⁿ [B]ₖᵢ · [A]ⱼₖ</M></p>
                </StepExplain>

                <StepExplain num={4} title="השוואה — קומוטטיביות סקלרים">
                  <p>צד שמאל: <M>Σₖ [A]ⱼₖ · [B]ₖᵢ</M></p>
                  <p>צד ימין: <M>Σₖ [B]ₖᵢ · [A]ⱼₖ</M></p>
                  <p>מקומוטטיביות הכפל בשדה F: <M>a · b = b · a</M> לכל a, b ∈ F.</p>
                  <p>לכן שני הצדדים שווים. ∎</p>
                </StepExplain>

                <LectureRef>
                  <strong>הרצאה 16</strong> — הגדרת כפל מטריצות (הנוסחה Σₖ [A]ᵢₖ[B]ₖⱼ).
                  <strong> הרצאה 20</strong> — הגדרת שחלוף ([Aᵗ]ᵢⱼ = [A]ⱼᵢ).
                  התכונה (AB)ᵗ = BᵗAᵗ נובעת ישירות משתי ההגדרות האלה — אין צורך במשפט נוסף.
                </LectureRef>
              </Solution>
              <Tip>
                <strong>טריק ההוכחה:</strong> תמיד אותו תבנית: (1) פתח צד שמאל לפי הגדרות, (2) פתח צד ימין לפי הגדרות, (3) השווה. הצעד האחרון תמיד יהיה קומוטטיביות או אסוציאטיביות של סקלרים.
              </Tip>
            </SubQ>
          </div>
        </SubQ>

        {/* ── 1.2 ── */}
        <SubQ label="1.2" pts={8}>
          <Problem>
            <p>נכון או לא: <M>Tr(A²) = 0 ⟹ Tr(A) = 0</M>?</p>
          </Problem>
          <Solution>
            <p className="font-bold text-emerald-900 mb-2">תרגום הפתרון:</p>
            <p className="mb-3 text-gray-600 text-xs">הטענה לא נכונה. צריך למצוא מטריצה A כך ש-Tr(A²)=0 אבל Tr(A)≠0.</p>

            <StepExplain num={1} title="אסטרטגיה — חיפוש דוגמה נגדית">
              <p>רואים &quot;נכון או לא&quot; → ננסה קודם למצוא דוגמה נגדית.</p>
              <p>אנחנו צריכים: Tr(A) ≠ 0 (כלומר סכום האלכסון ≠ 0) אבל Tr(A²) = 0 (סכום האלכסון של A² כן = 0).</p>
              <p className="text-xs text-gray-500">ננסה מטריצה 2×2 — הכי פשוט לחשב.</p>
            </StepExplain>

            <StepExplain num={2} title="בחירת מטריצה">
              <p>ניקח:</p>
              <div className="font-mono text-center my-2 bg-white rounded p-2 border">
                A = [[1, 1], [-1, 1]]
              </div>
              <p><M>Tr(A) = 1 + 1 = 2 ≠ 0</M>. ✓ טוב, יש לנו Trace לא-אפס.</p>
            </StepExplain>

            <StepExplain num={3} title="חישוב A²">
              <div className="font-mono text-xs bg-white p-2 rounded border space-y-1">
                <p>A² = A·A = [[1·1+1·(-1), 1·1+1·1], [(-1)·1+1·(-1), (-1)·1+1·1]]</p>
                <p>= [[0, 2], [-2, 0]]</p>
              </div>
            </StepExplain>

            <StepExplain num={4} title="בדיקה">
              <p><M>Tr(A²) = 0 + 0 = 0</M> ✓</p>
              <p><M>Tr(A) = 2 ≠ 0</M> ✓</p>
              <p className="font-bold mt-1">מצאנו דוגמה נגדית! הטענה <span className="text-red-600">לא נכונה</span>. ∎</p>
            </StepExplain>

            <LectureRef>
              <strong>הרצאה 16</strong> — Trace מוגדר כסכום איברי האלכסון: Tr(A) = Σᵢ [A]ᵢᵢ. כפל מטריצות לפי הנוסחה.
            </LectureRef>
          </Solution>
          <Tip>
            <strong>מתכון לדוגמאות נגדיות:</strong> (1) התחל עם 2×2. (2) נסה איברים מ-{'{-1, 0, 1}'}. (3) אם האלכסון צריך לבטל → שים ערכים מנוגדים מחוץ לאלכסון. המטריצה [[1,1],[-1,1]] היא &quot;שחקנית&quot; מעולה לדוגמאות נגדיות!
          </Tip>
        </SubQ>

        <WhatILearned>
          <ul className="space-y-1">
            <li>• <strong>שאלת הגדרה</strong> = נקודות חינם. שנן את הגדרת כפל מטריצות ואת הגדרת השחלוף.</li>
            <li>• <strong>הוכחת שוויון מטריצות</strong> = תמיד לפי הגדרות, איבר-איבר. אין קיצורים.</li>
            <li>• <strong>&quot;נכון או לא&quot;</strong> = תמיד נסה דוגמה נגדית 2×2 קודם. רק אם לא מצליח — נסה להוכיח.</li>
            <li>• <strong>Trace:</strong> Tr(AB) = Tr(BA), אבל אין קשר בין Tr(A²) ל-Tr(A). אל תניח שיש &quot;חוקים&quot; שלא הוכחת!</li>
          </ul>
        </WhatILearned>
      </QuestionBox>


      {/* ═══════════════════════════════════════════════ */}
      {/* ═══════════════ QUESTION 2 ═══════════════════ */}
      {/* ═══════════════════════════════════════════════ */}
      <QuestionBox num={2} pts={25} topic="דטרמיננטת בלוקים + הפיכות שמאלית">

        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-800">
            <strong>מומלץ לדלג!</strong> שאלה 2 היא הקשה והארוכה ביותר בסימולציה. הוכחת det(בלוקים) = הוכחה ארוכה מההרצאה שצריך לשנן, והפיכות שמאלית = חישוב מכני עם 6 נעלמים. אם אין לך זמן — דלגי על שאלה 2 ותשקיעי ב-3, 1, 5, 4.
          </div>
        </div>

        <HowToIdentify>
          כשרואים <strong>&quot;מטריצת בלוקים משולשית&quot;</strong> + <strong>&quot;הוכח det(K) = det(A)·det(B)&quot;</strong> — זו הוכחה מההרצאות, צריך לשנן.
          כשרואים <strong>&quot;מצא הופכית שמאלית/ימנית&quot;</strong> — קודם בדוק גדלים! אם הגדלים לא מאפשרים (m &lt; n להופכית ימנית, m &gt; n להופכית שמאלית) — הוכח שלא קיימת דרך rank.
        </HowToIdentify>

        <GoldenRule>
          הופכית שמאלית BA = I. הופכית ימנית AB = I. אם A ∈ M_{'{m×n}'} עם m &lt; n, אז rank(A) ≤ m &lt; n, ולכן לא יכולה להיות הופכית שמאלית (כי BA = Iₙ דורש rank = n).
        </GoldenRule>

        {/* ── 2.1 ── */}
        <SubQ label="2.1" pts={13}>
          <Problem>
            <p>תהי <M>K = [[A, C], [0, B]]</M> מטריצת בלוקים משולשית עליונה, כאשר A ו-B מטריצות ריבועיות.</p>
            <p>הוכח: <M>det(K) = det(A) · det(B)</M>.</p>
          </Problem>
          <Solution>
            <p className="font-bold text-emerald-900 mb-2">תרגום הפתרון:</p>
            <p className="text-gray-600 text-xs mb-3">זו הוכחה מההרצאות על דטרמיננטות. צריך לדעת את הרעיון הכללי — אינדוקציה על גודל הבלוק A.</p>

            <StepExplain num={1} title="הגדרת סימונים">
              <p>נסמן <M>A ∈ M_{'{k×k}'}</M>, <M>B ∈ M_{'{ℓ×ℓ}'}</M>. אז <M>K ∈ M_{'{(k+ℓ)×(k+ℓ)}'}</M>.</p>
            </StepExplain>

            <StepExplain num={2} title="בסיס אינדוקציה (k=1)">
              <p>אם A = [a₁₁] (בלוק 1×1), אז K נראית כך:</p>
              <div className="font-mono text-xs bg-white p-2 rounded border text-center">
                K = [[a₁₁, c₁₁, ..., c₁ℓ], [0, b₁₁, ..., b₁ℓ], [...], [0, bℓ₁, ..., bℓℓ]]
              </div>
              <p className="mt-1">פיתוח לפי שורה ראשונה: האיבר היחיד שאינו 0 בעמודה 1 (מתחת ל-a₁₁) הוא 0.</p>
              <p>לכן <M>det(K) = a₁₁ · det(B&apos;)</M> כאשר B&apos; היא Minor שנשמר כ-B (בגלל בלוק האפסים).</p>
              <p>נקבל: <M>det(K) = a₁₁ · det(B) = det(A) · det(B)</M>. ✓</p>
            </StepExplain>

            <StepExplain num={3} title="צעד אינדוקציה">
              <p>נניח נכון לכל בלוק A בגודל (k-1)×(k-1).</p>
              <p>פיתוח לפי שורה ראשונה של K. בגלל מבנה הבלוקים, כל Minor ששומר על שורה ראשונה שומר גם על המבנה המשולשי העליוני.</p>
              <p>מהנחת האינדוקציה, כל Minor כזה מקיים את הנוסחה, ולכן:</p>
              <p className="font-mono text-center font-bold">det(K) = det(A) · det(B) ∎</p>
            </StepExplain>

            <LectureRef>
              <strong>הרצאות 21-25</strong> — דטרמיננטות. המשפט על מטריצת בלוקים משולשית מופיע בהרצאות. ההוכחה משתמשת בפיתוח לפי שורה + אינדוקציה.
            </LectureRef>
          </Solution>
          <Tip><strong>אם לא שננת את ההוכחה</strong> — עדיף לדלג. זו הוכחה שצריך לזכור כמעט מילה במילה מההרצאה.</Tip>
        </SubQ>

        {/* ── 2.2 ── */}
        <SubQ label="2.2" pts={12}>
          <Problem>
            <p>תהי <M>A ∈ M_{'{2×3}'}(ℝ)</M>:</p>
            <div className="font-mono text-center my-2">A = [[1, 2, -1], [0, -1, 2]]</div>
            <p>מצא הופכית שמאלית ל-A, או הוכח שלא קיימת.</p>
          </Problem>
          <Solution>
            <p className="font-bold text-emerald-900 mb-2">תרגום הפתרון:</p>
            <p className="text-gray-600 text-xs mb-3">הופכית שמאלית של A: מטריצה B כך ש-BA = Iₙ. כאן n=3, אז צריך BA = I₃.</p>

            <StepExplain num={1} title="בדיקת גדלים מהירה (דרך מהירה!)">
              <p>A ∈ M_{'{2×3}'} ⟹ rank(A) ≤ min(2,3) = 2.</p>
              <p>אם BA = I₃ אז rank(I₃) = 3, אבל rank(BA) ≤ rank(A) ≤ 2.</p>
              <p className="font-bold">סתירה! אין הופכית שמאלית.</p>
              <p className="text-xs text-gray-500">זו הדרך המהירה. הבודק יקבל את זה.</p>
            </StepExplain>

            <StepExplain num={2} title="דרך ארוכה — חישוב ישיר (לתרגול)">
              <p>נסמן B = [[x,u],[y,v],[z,w]] ∈ M_{'{3×2}'}.</p>
              <p>BA = I₃ נותנת 9 משוואות. בפרט, שורה 3:</p>
              <div className="font-mono text-xs bg-white p-2 rounded border space-y-1">
                <p>z·1 + w·0 = 0 ⟹ z = 0</p>
                <p>z·2 + w·(-1) = 0 ⟹ -w = 0 ⟹ w = 0</p>
                <p>z·(-1) + w·2 = 1 ⟹ 0 + 0 = 1 ⟹ סתירה!</p>
              </div>
              <p className="mt-1">לכן אין הופכית שמאלית ל-A. ∎</p>
            </StepExplain>

            <LectureRef>
              <strong>הרצאות 17-19</strong> — הפיכות, הופכית שמאלית/ימנית.
              <strong> הרצאה 20</strong> — rank(BA) ≤ min(rank(B), rank(A)). זה הכלי המהיר ביותר.
            </LectureRef>
          </Solution>
          <Tip>
            <strong>טיפ מהיר:</strong> לפני שפותחים חישוב, בדוק גדלים: A ∈ M_{'{m×n}'}. אם m &lt; n → rank(A) ≤ m &lt; n → אין הופכית שמאלית (כי BA = Iₙ דורש rank ≥ n). חוסך המון זמן!
          </Tip>
        </SubQ>

        <WhatILearned>
          <ul className="space-y-1">
            <li>• <strong>מטריצת בלוקים משולשית:</strong> det = מכפלת det של הבלוקים על האלכסון. זה חוסך חישובים ארוכים.</li>
            <li>• <strong>הופכית שמאלית/ימנית:</strong> תמיד בדוק גדלים ו-rank לפני שמתחיל חישוב!</li>
            <li>• <strong>rank(BA) ≤ rank(A):</strong> כלי חזק ומהיר להוכחות אי-קיום.</li>
          </ul>
        </WhatILearned>
      </QuestionBox>


      {/* ═══════════════════════════════════════════════ */}
      {/* ═══════════════ QUESTION 3 ═══════════════════ */}
      {/* ═══════════════════════════════════════════════ */}
      <QuestionBox num={3} pts={25} topic="מערכת עם פרמטר + בת&quot;ל / פרישה">

        <HowToIdentify>
          כשרואים <strong>&quot;מערכת משוואות עם פרמטר α&quot;</strong> + <strong>&quot;עבור אילו ערכים יש פתרון יחיד/אינסוף/אין?&quot;</strong> — חשב det של מטריצת המקדמים. det ≠ 0 → יחיד, det = 0 → בדוק כל מקרה.
          כשרואים <strong>&quot;הוכח שוקטורים בת&quot;ל&quot;</strong> — השתמש בהגדרה: Σαᵢvᵢ = 0 → αᵢ = 0 לכל i.
        </HowToIdentify>

        <GoldenRule>
          מערכת 3×3 עם פרמטר: (1) חשב det — מצא מתי = 0. (2) det ≠ 0 → פתרון יחיד. (3) det = 0 → הציב את ערך הפרמטר ובדוק: האם יש סתירה (= אין פתרון) או יש שורת אפסים (= אינסוף). לפעמים התשובה &quot;אין שום α שנותן אינסוף&quot;!
        </GoldenRule>

        {/* ── 3.1 ── */}
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
            <p className="font-bold text-emerald-900 mb-2">תרגום הפתרון:</p>
            <p className="text-gray-600 text-xs mb-3">הרעיון: חשב det של מטריצת המקדמים. אם det ≠ 0 → פתרון יחיד. אם det = 0 → בדוק מה קורה.</p>

            <StepExplain num={1} title="כתיבת מטריצת המקדמים">
              <div className="font-mono text-xs bg-white p-3 rounded border text-center space-y-1">
                <p>|α  -1   1|</p>
                <p>|2   α   1|</p>
                <p>|2   1  -α|</p>
              </div>
            </StepExplain>

            <StepExplain num={2} title="חישוב det — פיתוח לפי שורה 1">
              <p>פיתוח קופקטורים לפי שורה ראשונה:</p>
              <div className="font-mono text-xs bg-white p-2 rounded border space-y-1">
                <p>det = α · det[[α,1],[1,-α]] - (-1) · det[[2,1],[2,-α]] + 1 · det[[2,α],[2,1]]</p>
                <p>= α(-α²-1) + 1(-2α-2) + 1(2-2α)</p>
                <p>= -α³ - α - 2α - 2 + 2 - 2α</p>
                <p>= <strong>-α³ - 5α = -α(α² + 5)</strong></p>
              </div>
            </StepExplain>

            <StepExplain num={3} title="ניתוח — מתי det = 0?">
              <p><M>det = -α(α² + 5)</M></p>
              <p>שימו לב: <M>α² + 5 &gt; 0</M> <strong>לכל</strong> α ∈ ℝ (כי α² ≥ 0, ועוד 5 &gt; 0).</p>
              <p className="font-bold">לכן det = 0 אם ורק אם α = 0.</p>
              <p className="text-xs text-gray-500">זה המפתח! α²+5 לעולם לא מתאפס מעל ℝ.</p>
            </StepExplain>

            <StepExplain num={4} title="מקרה α ≠ 0">
              <p>det(A) ≠ 0 ⟹ A הפיכה ⟹ <strong>פתרון יחיד</strong>.</p>
              <p className="text-xs text-gray-500">ממשפט: Ax = b יש פתרון יחיד ⟺ A הפיכה ⟺ det(A) ≠ 0 (הרצאה 19, תנאי 1+8).</p>
            </StepExplain>

            <StepExplain num={5} title="מקרה α = 0 — הצבה ובדיקה">
              <p>מציבים α = 0:</p>
              <div className="font-mono text-center my-1 space-y-1 text-xs">
                <p>-y + z = 1 &nbsp;(I)</p>
                <p>2x + z = 0 &nbsp;(II)</p>
                <p>2x + y = 0 &nbsp;(III)</p>
              </div>
              <p>מ-(I): z = y + 1. מ-(III): y = -2x. נציב ב-(II):</p>
              <p className="font-mono text-center">2x + (-2x + 1) = 0 ⟹ 1 = 0 ← סתירה!</p>
              <p className="font-bold">עבור α = 0: אין פתרון.</p>
            </StepExplain>

            <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-2">
              <p className="font-bold text-blue-800 text-sm mb-1">סיכום:</p>
              <p className="text-blue-700">• α ≠ 0: <strong>פתרון יחיד</strong> (כי det ≠ 0)</p>
              <p className="text-blue-700">• α = 0: <strong>אין פתרון</strong> (סתירה)</p>
              <p className="text-blue-700 font-bold">• אין שום ערך α שנותן אינסוף פתרונות!</p>
            </div>

            <LectureRef>
              <strong>הרצאות 21-25</strong> — חישוב דטרמיננטה, פיתוח קופקטורים.
              <strong> הרצאה 19</strong> — 9 התנאים השקולים להפיכות (תנאי 8: det ≠ 0 ⟺ הפיכה).
              <strong> הרצאות 1-5</strong> — פתרון מערכות, הצבה לאחור.
            </LectureRef>
          </Solution>
          <Tip>
            <strong>תוצאה מפתיעה:</strong> אל תניח שתמיד יש ערך שנותן אינסוף פתרונות! לפעמים det = 0 רק עבור ערך אחד, ובערך הזה — סתירה ולא אינסוף. תכתוב &quot;אין ערך α שנותן אינסוף&quot; — זו תשובה לגיטימית!
          </Tip>
        </SubQ>

        {/* ── 3.2 ── */}
        <SubQ label="3.2" pts={12}>
          <div className="space-y-4">
            <Problem>
              <p>יהי V מ&quot;ו מעל שדה F. יהיו v₁, v₂, v₃ ∈ V בת&quot;ל, ויהי v₄ ∈ V כך ש-<M>v₄ ∉ Span{'{v₁, v₂, v₃}'}</M>.</p>
            </Problem>

            {/* ── 3.2.1 ── */}
            <SubQ label="3.2.1" pts={4}>
              <Problem>
                <p>הוכח: v₁, v₂, v₃, v₄ בת&quot;ל ו-<M>dim Span{'{v₁, v₂, v₃, v₄}'} = 4</M>.</p>
              </Problem>
              <Solution>
                <p className="font-bold text-emerald-900 mb-2">תרגום הפתרון:</p>
                <p className="text-gray-600 text-xs mb-3">הרעיון: נשתמש באפיון הידוע של בת&quot;ל — כל וקטור לא ב-Span של קודמיו.</p>

                <StepExplain num={1} title="שימוש באפיון בת&quot;ל">
                  <p><strong>משפט (הרצאה 11):</strong> v₁,...,vₖ בת&quot;ל ⟺ לכל j: vⱼ ∉ Span(v₁,...,vⱼ₋₁).</p>
                </StepExplain>

                <StepExplain num={2} title="בדיקת 4 התנאים">
                  <p>• v₁ ∉ Span(∅) = {'{0⃗}'} ✓ — כי v₁,...,v₃ בת&quot;ל ⟹ v₁ ≠ 0⃗</p>
                  <p>• v₂ ∉ Span(v₁) ✓ — כי v₁, v₂, v₃ בת&quot;ל (נובע מהאפיון)</p>
                  <p>• v₃ ∉ Span(v₁, v₂) ✓ — כי v₁, v₂, v₃ בת&quot;ל (נובע מהאפיון)</p>
                  <p>• v₄ ∉ Span(v₁, v₂, v₃) ✓ — <strong>נתון!</strong></p>
                </StepExplain>

                <StepExplain num={3} title="מסקנה">
                  <p>לכן v₁, v₂, v₃, v₄ בת&quot;ל.</p>
                  <p>4 וקטורים בת&quot;ל פורשים מרחב מממד 4, לכן <M>dim Span{'{v₁, v₂, v₃, v₄}'} = 4</M>. ∎</p>
                </StepExplain>

                <LectureRef>
                  <strong>הרצאה 11</strong> — אפיון בת&quot;ל: vⱼ ∉ Span(v₁,...,vⱼ₋₁). זה האפיון הכי שימושי להוכחות בת&quot;ל!
                </LectureRef>
              </Solution>
            </SubQ>

            {/* ── 3.2.2 ── */}
            <SubQ label="3.2.2" pts={8}>
              <Problem>
                <p>הוכח: <M>dim Span{'{v₁+v₄, v₂+v₄, v₃+v₄}'} = 3</M>.</p>
              </Problem>
              <Solution>
                <p className="font-bold text-emerald-900 mb-2">תרגום הפתרון:</p>
                <p className="text-gray-600 text-xs mb-3">הרעיון: dim Span = מספר וקטורים בת&quot;ל. אז צריך להוכיח שהשלושה בת&quot;ל.</p>

                <StepExplain num={1} title="כתוב את הגדרת בת&quot;ל">
                  <p>נניח:</p>
                  <p className="font-mono text-center my-1">α₁(v₁+v₄) + α₂(v₂+v₄) + α₃(v₃+v₄) = 0⃗</p>
                  <p>צריך להוכיח: α₁ = α₂ = α₃ = 0.</p>
                </StepExplain>

                <StepExplain num={2} title="פתח ואסוף לפי וקטורים ידועים">
                  <p className="font-mono text-center">α₁v₁ + α₂v₂ + α₃v₃ + (α₁+α₂+α₃)v₄ = 0⃗</p>
                  <p className="text-xs text-gray-500">שימו לב! קיבלנו צירוף לינארי של v₁, v₂, v₃, v₄ — שהם בת&quot;ל מסעיף 3.2.1!</p>
                </StepExplain>

                <StepExplain num={3} title="השתמש בעובדה ש-v₁,...,v₄ בת&quot;ל">
                  <p>מסעיף 3.2.1: v₁, v₂, v₃, v₄ בת&quot;ל.</p>
                  <p>לכן <strong>כל המקדמים = 0:</strong></p>
                  <p className="font-mono text-center">α₁ = 0, &nbsp; α₂ = 0, &nbsp; α₃ = 0, &nbsp; α₁+α₂+α₃ = 0</p>
                </StepExplain>

                <StepExplain num={4} title="מסקנה">
                  <p>α₁ = α₂ = α₃ = 0 ⟹ v₁+v₄, v₂+v₄, v₃+v₄ בת&quot;ל.</p>
                  <p>3 וקטורים בת&quot;ל ⟹ <M>dim Span{'{v₁+v₄, v₂+v₄, v₃+v₄}'} = 3</M>. ∎</p>
                </StepExplain>

                <LectureRef>
                  <strong>הרצאה 11</strong> — הגדרת בת&quot;ל: Σαᵢvᵢ = 0 ⟹ αᵢ = 0 לכל i.
                  <strong> הרצאה 13</strong> — dim Span{'{v₁,...,vₖ}'} = k ⟺ v₁,...,vₖ בת&quot;ל.
                </LectureRef>
              </Solution>
              <Tip>
                <strong>תבנית חוזרת:</strong> להוכחת בת&quot;ל של &quot;וקטורים מוזזים&quot; (vᵢ + w): פתח את הצ&quot;ל, ארגן מחדש לפי הוקטורים <strong>המקוריים</strong> שידוע שהם בת&quot;ל, והסק שכל מקדם = 0. זו טכניקה שחוזרת!
              </Tip>
            </SubQ>
          </div>
        </SubQ>

        <WhatILearned>
          <ul className="space-y-1">
            <li>• <strong>מערכת עם פרמטר:</strong> det → ניתוח מקרים. לא להניח שתמיד יהיו 3 מקרים — לפעמים אין &quot;אינסוף פתרונות&quot;!</li>
            <li>• <strong>הוכחת בת&quot;ל:</strong> שני כלים: (1) הגדרה — Σαᵢvᵢ = 0 ⟹ αᵢ = 0. (2) אפיון — vⱼ ∉ Span של קודמיו.</li>
            <li>• <strong>שימוש בסעיף קודם:</strong> שים לב שסעיף 3.2.2 משתמש בתוצאה של 3.2.1! זה דפוס נפוץ — אם לא פתרת סעיף קודם, עדיין תוכל להשתמש בתוצאה שלו.</li>
          </ul>
        </WhatILearned>
      </QuestionBox>


      {/* ═══════════════════════════════════════════════ */}
      {/* ═══════════════ QUESTION 4 ═══════════════════ */}
      {/* ═══════════════════════════════════════════════ */}
      <QuestionBox num={4} pts={25} topic="דטרמיננטה 5×5 + ממד תת-מרחבים">

        <HowToIdentify>
          כשרואים <strong>דטרמיננטה של מטריצה גדולה (4×4 ומעלה)</strong> — אל תתחיל פיתוח קופקטורים! קודם בדוק אם יש תלות בין שורות/עמודות. חפש דפוסים אריתמטיים (הפרשים קבועים).
          כשרואים <strong>&quot;dim(W + Span{'{w}'}), dim&quot;</strong> — חשוב על ארגומנט הסנדוויץ&apos;: dim W ≤ dim(W + Span{'{w}'}) ≤ dim W + 1.
        </HowToIdentify>

        <GoldenRule>
          לפני חישוב דטרמיננטה — תמיד בדוק תלות! אם Rᵢ = αRⱼ + βRₖ לשורות כלשהן, אז det = 0 מייד. חיפוש תלות ב-5×5 חוסך 20 דקות של חישוב.
        </GoldenRule>

        {/* ── 4.1 ── */}
        <SubQ label="4.1" pts={11}>
          <Problem>
            <p>חשב את הדטרמיננטה:</p>
            <div className="font-mono text-xs bg-white p-3 rounded border text-center space-y-1">
              <p>| 3 &nbsp; 5 &nbsp; 7 &nbsp; 9 &nbsp;11|</p>
              <p>| 5 &nbsp; 8 &nbsp;11 &nbsp;14 &nbsp;17|</p>
              <p>| 7 &nbsp;11 &nbsp;15 &nbsp;19 &nbsp;23|</p>
              <p>| 9 &nbsp;14 &nbsp;19 &nbsp;24 &nbsp;29|</p>
              <p>|11 &nbsp;17 &nbsp;23 &nbsp;29 &nbsp;35|</p>
            </div>
          </Problem>
          <Solution>
            <p className="font-bold text-emerald-900 mb-2">תרגום הפתרון:</p>
            <p className="text-gray-600 text-xs mb-3">הרעיון: מטריצה 5×5 — פיתוח קופקטורים יהיה סיוט. חייבים למצוא תלות בין שורות.</p>

            <StepExplain num={1} title="התבוננות — חיפוש דפוס">
              <p>נסתכל על ההפרשים:</p>
              <p>שורה 1: 3, 5, 7, 9, 11 — הפרש 2</p>
              <p>שורה 2: 5, 8, 11, 14, 17 — הפרש 3</p>
              <p>שורה 3: 7, 11, 15, 19, 23 — הפרש 4</p>
              <p className="text-xs text-gray-500">כל שורה היא סדרה חשבונית! וההפרשים עצמם עולים ב-1. זה רמז חזק לתלות.</p>
            </StepExplain>

            <StepExplain num={2} title="מציאת תלות">
              <p>ננסה: <M>R₃ = aR₁ + bR₂</M>:</p>
              <p className="font-mono text-center">2·R₂ - R₁ = 2·(5,8,11,14,17) - (3,5,7,9,11)</p>
              <p className="font-mono text-center">= (10-3, 16-5, 22-7, 28-9, 34-11)</p>
              <p className="font-mono text-center">= (7, 11, 15, 19, 23) = R₃ ✓</p>
            </StepExplain>

            <StepExplain num={3} title="מסקנה">
              <p><strong>R₃ = 2R₂ - R₁</strong></p>
              <p>שורה 3 היא צירוף לינארי של שורות 1 ו-2.</p>
              <p>שורות תלויות לינארית ⟹ <strong className="text-lg">det = 0</strong> ∎</p>
            </StepExplain>

            <LectureRef>
              <strong>הרצאות 21-25</strong> — דטרמיננטה של מטריצה עם שורות ת&quot;ל = 0. זה נובע מכך שדירוג לא משנה det (עד סימן/סקלר), ודירוג ייתן שורת אפסים.
            </LectureRef>
          </Solution>
          <Tip>
            <strong>טיפ למבחן:</strong> ברגע שאת רואה מטריצה 4×4 או גדולה יותר — <strong>אל תתחילי פיתוח!</strong> בדקי הפרשים בין שורות/עמודות. הפרשים קבועים = סדרה חשבונית = סביר שיש תלות. נסי 2Rᵢ - Rⱼ.
          </Tip>
        </SubQ>

        {/* ── 4.2 ── */}
        <SubQ label="4.2" pts={14}>
          <Problem>
            <p>יהי V מ&quot;ו נוצר סופית מעל F. תהי W תת-מרחב של V, ויהיו u, v ∈ V.</p>
            <p>נתון: <M>dim(W + Span{'{u+v}'}) &lt; dim(W + Span{'{v}'})</M>.</p>
            <p>הוכח: <M>dim(W + Span{'{u+v}'}) = dim(W)</M> וגם <M>dim(W + Span{'{v}'}) = dim(W) + 1</M>.</p>
          </Problem>
          <Solution>
            <p className="font-bold text-emerald-900 mb-2">תרגום הפתרון:</p>
            <p className="text-gray-600 text-xs mb-3">הרעיון: &quot;ארגומנט סנדוויץ&apos;&quot; — כששני מספרים נמצאים בקבוצה של 2 ערכים בלבד, ויש ביניהם אי-שוויון חד — יש רק אפשרות אחת.</p>

            <StepExplain num={1} title="עובדה מפתח — ארגומנט הסנדוויץ&apos;">
              <p><strong>עובדה:</strong> לכל תת-מרחב W ולכל וקטור w ∈ V:</p>
              <p className="font-mono text-center my-1">dim(W) ≤ dim(W + Span{'{w}'}) ≤ dim(W) + 1</p>
              <p className="text-xs text-gray-500"><strong>למה?</strong> W ⊆ W+Span{'{w}'} ⟹ dim(W) ≤ dim(W+Span{'{w}'}). והוספת וקטור אחד מעלה ממד ב-0 או ב-1 בלבד.</p>
              <p className="text-xs text-gray-500">כלומר: dim(W+Span{'{w}'}) ∈ {'{dim(W), dim(W)+1}'} — רק שתי אפשרויות!</p>
            </StepExplain>

            <StepExplain num={2} title="הפעלת העובדה על שני הצדדים">
              <p>נסמן: <M>a = dim(W + Span{'{u+v}'})</M>, <M>b = dim(W + Span{'{v}'})</M>.</p>
              <p>מהעובדה:</p>
              <p className="font-mono text-center">a ∈ {'{dim(W), dim(W)+1}'}</p>
              <p className="font-mono text-center">b ∈ {'{dim(W), dim(W)+1}'}</p>
            </StepExplain>

            <StepExplain num={3} title="שימוש בנתון a &lt; b">
              <p>נתון: a &lt; b.</p>
              <p>שניהם מהקבוצה {'{dim(W), dim(W)+1}'} ו-a &lt; b.</p>
              <p><strong>האפשרות היחידה:</strong></p>
              <div className="bg-white border-2 border-emerald-400 rounded p-2 my-1 text-center font-bold">
                a = dim(W) &nbsp;&nbsp; וגם &nbsp;&nbsp; b = dim(W) + 1
              </div>
            </StepExplain>

            <StepExplain num={4} title="מסקנה">
              <p>• dim(W + Span{'{u+v}'}) = dim(W) ✓</p>
              <p>• dim(W + Span{'{v}'}) = dim(W) + 1 ✓</p>
              <p>∎</p>
            </StepExplain>

            <LectureRef>
              <strong>הרצאה 14-15</strong> — נוסחת הממדים, dim(U+W). העובדה ש-dim(W+Span{'{w}'}) ∈ {'{dim W, dim W+1}'} נובעת מכך ש-W ⊆ W+Span{'{w}'} ו-dim(W+Span{'{w}'}) ≤ dim(W) + dim(Span{'{w}'}) = dim(W) + 1.
            </LectureRef>
          </Solution>
          <Tip>
            <strong>ארגומנט הסנדוויץ&apos; — תבנית חוזרת:</strong> כשמוסיפים וקטור אחד לתת-מרחב, הממד עולה ב-0 או ב-1 בלבד. אם יש אי-שוויון חד בין שתי אפשרויות כאלה — יש תוצאה יחידה. טכניקה שחוזרת שוב ושוב!
          </Tip>
        </SubQ>

        <WhatILearned>
          <ul className="space-y-1">
            <li>• <strong>דטרמיננטה גדולה:</strong> תמיד בדוק תלות בין שורות לפני שמתחיל פיתוח. חפש סדרות חשבוניות.</li>
            <li>• <strong>ארגומנט הסנדוויץ&apos;:</strong> dim(W+Span{'{w}'}) ∈ {'{dim W, dim W+1}'}. אם יש אי-שוויון — מסקנה מיידית.</li>
            <li>• <strong>שימוש בעובדות פשוטות:</strong> לפעמים שאלה שנראית קשה נפתרת ע&quot;י עובדה בסיסית בלבד. אל תחפשי טריקים מסובכים!</li>
          </ul>
        </WhatILearned>
      </QuestionBox>


      {/* ═══════════════════════════════════════════════ */}
      {/* ═══════════════ QUESTION 5 ═══════════════════ */}
      {/* ═══════════════════════════════════════════════ */}
      <QuestionBox num={5} pts={25} topic="הכלת תת-מרחבים + חסמי דרגה">

        <HowToIdentify>
          כשרואים <strong>&quot;הוכח U ⊆ W או W ⊆ U&quot;</strong> — הוכחה בשלילה! נניח שאף אחד לא מוכל בשני, ונגיע לסתירה.
          כשרואים <strong>&quot;row(A+B) ⊆ row(A) + row(B)&quot;</strong> — הכלת מרחב שורות. צריך להראות שכל פורש של הצד השמאלי נמצא בצד הימני.
          כשרואים <strong>&quot;rank(A) - rank(B) ≤ rank(A+B)&quot;</strong> — חסם תחתון. כתוב A = (A+B) + (-B) והשתמש בחסם העליון.
        </HowToIdentify>

        <GoldenRule>
          להוכחת &quot;A או B&quot;: נניח בשלילה ¬A ∧ ¬B. &nbsp;|&nbsp; להוכחת חסם תחתון: כתוב A = (A+B) + (-B) והפעל חסם עליון.
        </GoldenRule>

        {/* ── 5.1 ── */}
        <SubQ label="5.1" pts={12}>
          <Problem>
            <p>יהי V מ&quot;ו מעל F. יהיו U, W תתי-מרחבים של V.</p>
            <p>נתון: <M>(U + W) \ U ⊆ W</M>.</p>
            <p>הוכח: <M>U ⊆ W</M> או <M>W ⊆ U</M>.</p>
          </Problem>
          <Solution>
            <p className="font-bold text-emerald-900 mb-2">תרגום הפתרון:</p>
            <p className="text-gray-600 text-xs mb-3">הרעיון: צריך להוכיח &quot;A או B&quot;. נניח בשלילה ש-&quot;לא A וגם לא B&quot; ונגיע לסתירה.</p>

            <StepExplain num={1} title="הנחת שלילה">
              <p>נניח בשלילה ש-<M>U ⊄ W</M> וגם <M>W ⊄ U</M>.</p>
              <p className="text-xs text-gray-500">זה אומר שיש איבר ב-U שלא ב-W, וגם איבר ב-W שלא ב-U.</p>
            </StepExplain>

            <StepExplain num={2} title="בחירת נציגים">
              <p>קיימים:</p>
              <p>• u ∈ U \ W (כלומר u ∈ U ו-u ∉ W)</p>
              <p>• w ∈ W \ U (כלומר w ∈ W ו-w ∉ U)</p>
            </StepExplain>

            <StepExplain num={3} title="התבוננות ב-v = u + w">
              <p>ברור ש-<M>v = u + w ∈ U + W</M> (כי u ∈ U ו-w ∈ W).</p>
              <p className="mt-1"><strong>טענה: v ∉ U.</strong></p>
              <p>נניח בשלילה v = u + w ∈ U. אז w = v - u ∈ U (כי U סגור לחיסור).</p>
              <p>אבל w ∉ U — <strong>סתירה!</strong> לכן v ∉ U.</p>
            </StepExplain>

            <StepExplain num={4} title="שימוש בנתון">
              <p>v ∈ U + W ו-v ∉ U ⟹ v ∈ (U + W) \ U.</p>
              <p>מהנתון: (U + W) \ U ⊆ W, לכן <strong>v ∈ W</strong>.</p>
            </StepExplain>

            <StepExplain num={5} title="הגעה לסתירה">
              <p>v = u + w ∈ W ⟹ u = v - w ∈ W (כי W סגור לחיסור, v ∈ W ו-w ∈ W).</p>
              <p>אבל u ∉ W — <strong>סתירה!</strong></p>
              <p className="mt-1">לכן ההנחה שגויה, ומתקיים U ⊆ W או W ⊆ U. ∎</p>
            </StepExplain>

            <LectureRef>
              <strong>הרצאות 8-9</strong> — תתי-מרחבים, סגירות לחיבור ולכפל בסקלר. הוכחה בשלילה — טכניקה כללית.
              <strong> הרצאה 14</strong> — סכום תתי-מרחבים U + W.
            </LectureRef>
          </Solution>
          <Tip>
            <strong>תבנית הוכחה בשלילה להוכחת &quot;A או B&quot;:</strong><br />
            (1) נניח ¬A ∧ ¬B. (2) בוחרים נציגים. (3) בונים איבר חדש (בד&quot;כ u+w). (4) מראים שהוא גם ב-X וגם לא ב-X — סתירה.
            הטריק: תמיד לבנות u+w ולבדוק שייכות שלו.
          </Tip>
        </SubQ>

        {/* ── 5.2 ── */}
        <SubQ label="5.2" pts={13}>
          <div className="space-y-4">
            <Problem>
              <p>יהיו <M>A, B ∈ M_{'{m×n}'}(F)</M>.</p>
            </Problem>

            {/* ── 5.2.1 ── */}
            <SubQ label="5.2.1" pts={5}>
              <Problem>
                <p>הוכח: <M>row(A + B) ⊆ row(A) + row(B)</M>.</p>
              </Problem>
              <Solution>
                <p className="font-bold text-emerald-900 mb-2">תרגום הפתרון:</p>
                <p className="text-gray-600 text-xs mb-3">הרעיון: row(A+B) = Span של שורות A+B. כל שורה של A+B היא סכום של שורה מ-A ושורה מ-B.</p>

                <StepExplain num={1} title="מי הפורשים של row(A+B)?">
                  <p>שורות A: R₁, ..., Rₘ ∈ Fⁿ.</p>
                  <p>שורות B: Q₁, ..., Qₘ ∈ Fⁿ.</p>
                  <p>שורות A+B: R₁+Q₁, R₂+Q₂, ..., Rₘ+Qₘ.</p>
                </StepExplain>

                <StepExplain num={2} title="כל פורש נמצא ב-row(A) + row(B)">
                  <p>לכל i: Rᵢ ∈ row(A) ו-Qᵢ ∈ row(B).</p>
                  <p>לכן Rᵢ + Qᵢ ∈ row(A) + row(B) (לפי הגדרת סכום תת-מרחבים).</p>
                </StepExplain>

                <StepExplain num={3} title="מסקנה">
                  <p>כל שורה של A+B נמצאת ב-row(A) + row(B).</p>
                  <p>row(A+B) = Span(שורות A+B) ⊆ row(A) + row(B).</p>
                  <p className="text-xs text-gray-500">(כי row(A)+row(B) תת-מרחב שמכיל את כל הפורשים, ולכן מכיל את ה-Span שלהם.)</p>
                  <p>∎</p>
                </StepExplain>

                <LectureRef>
                  <strong>הרצאה 20</strong> — הגדרת מרחב שורות: row(A) = Span(שורות A).
                  <strong> הרצאה 14</strong> — סכום תתי-מרחבים: U+W = {'{u+w : u∈U, w∈W}'}.
                </LectureRef>
              </Solution>
              <Tip>
                <strong>תבנית להוכחת הכלה:</strong> כדי להוכיח Span(S) ⊆ W, מספיק להראות שכל איבר של S נמצא ב-W (כי W תת-מרחב ולכן סגור לצירופים).
              </Tip>
            </SubQ>

            {/* ── 5.2.2 ── */}
            <SubQ label="5.2.2" pts={8}>
              <Problem>
                <p>הוכח: <M>rank(A) - rank(B) ≤ rank(A + B) ≤ rank(A) + rank(B)</M>.</p>
              </Problem>
              <Solution>
                <p className="font-bold text-emerald-900 mb-2">תרגום הפתרון:</p>
                <p className="text-gray-600 text-xs mb-3">הרעיון: שני חסמים. חסם עליון — ישיר מ-5.2.1. חסם תחתון — טריק: כתוב A = (A+B) + (-B).</p>

                <StepExplain num={1} title="חסם עליון — rank(A+B) ≤ rank(A) + rank(B)">
                  <p>מסעיף 5.2.1: row(A+B) ⊆ row(A) + row(B).</p>
                  <p>לכן:</p>
                  <div className="font-mono text-xs bg-white p-2 rounded border space-y-1">
                    <p>rank(A+B) = dim row(A+B)</p>
                    <p>≤ dim(row(A) + row(B)) &nbsp;&nbsp;[כי U⊆W ⟹ dim U ≤ dim W]</p>
                    <p>≤ dim row(A) + dim row(B) &nbsp;&nbsp;[כי dim(U+W) ≤ dim U + dim W]</p>
                    <p>= rank(A) + rank(B) ✓</p>
                  </div>
                </StepExplain>

                <StepExplain num={2} title="חסם תחתון — rank(A) - rank(B) ≤ rank(A+B)">
                  <p><strong>הטריק:</strong> נכתוב A = (A + B) + (-B).</p>
                  <p>נפעיל את <strong>החסם העליון שכבר הוכחנו</strong> על (A+B) ו-(-B):</p>
                  <div className="font-mono text-xs bg-white p-2 rounded border space-y-1">
                    <p>rank(A) = rank((A+B) + (-B))</p>
                    <p>≤ rank(A+B) + rank(-B) &nbsp;&nbsp;[חסם עליון]</p>
                    <p>= rank(A+B) + rank(B) &nbsp;&nbsp;[כי rank(-B) = rank(B)]</p>
                  </div>
                  <p className="mt-1">מעבירם אגף:</p>
                  <p className="font-mono text-center font-bold">rank(A) - rank(B) ≤ rank(A+B) ✓</p>
                </StepExplain>

                <StepExplain num={3} title="סיכום">
                  <p className="font-mono text-center font-bold text-lg">rank(A) - rank(B) ≤ rank(A+B) ≤ rank(A) + rank(B)</p>
                  <p>∎</p>
                </StepExplain>

                <div className="bg-gray-100 border border-gray-300 rounded p-2 mt-2 text-xs text-gray-600">
                  <strong>הערה:</strong> rank(-B) = rank(B) כי כפל בסקלר לא-אפס (-1) לא משנה דרגה. זה נובע מכך שפעולות שורה אלמנטריות כפל בסקלר לא-אפס לא משנות rank, וכפל כל השורות ב-(-1) הוא בדיוק כזה.
                </div>

                <LectureRef>
                  <strong>הרצאה 20</strong> — rank = dim row space.
                  <strong> הרצאה 14</strong> — dim(U+W) ≤ dim U + dim W.
                  טריק ה-&quot;כתוב A = (A+B) + (-B)&quot; הוא טכניקה סטנדרטית להוכחת חסמים תחתונים.
                </LectureRef>
              </Solution>
              <Tip>
                <strong>טריק קלאסי שחוזר:</strong> להוכחת חסם תחתון, כתוב A = (A+B) + (-B) והשתמש בחסם העליון שכבר הוכחת. זה עובד בהרבה הקשרים: rank, dim, נורמות, ועוד.
              </Tip>
            </SubQ>
          </div>
        </SubQ>

        <WhatILearned>
          <ul className="space-y-1">
            <li>• <strong>הוכחה בשלילה:</strong> להוכחת &quot;A או B&quot; — תמיד נניח ¬A ∧ ¬B. זו תבנית קבועה.</li>
            <li>• <strong>הכלת Span:</strong> מספיק להראות שכל פורש של הצד השמאלי נמצא בצד הימני.</li>
            <li>• <strong>חסם תחתון:</strong> &quot;אני רוצה rank(A+B) ≥ ...&quot; → &quot;אני יודע rank(X+Y) ≤ rank(X) + rank(Y)&quot; → &quot;אכתוב A = (A+B)+(-B) ואפעיל!&quot;</li>
            <li>• <strong>שימוש בסעיף קודם:</strong> סעיף 5.2.2 משתמש ב-5.2.1! גם אם לא פתרת 5.2.1, השתמש בתוצאה שלו ב-5.2.2.</li>
          </ul>
        </WhatILearned>
      </QuestionBox>


      {/* ═══════════════════════════════════════════════ */}
      {/* PATTERN RECOGNITION GUIDE */}
      {/* ═══════════════════════════════════════════════ */}
      <Section title="מדריך זיהוי תבניות — איך לדעת מה רוצים ממני?" icon={<Eye className="w-5 h-5" />} color="text-purple-700">
        <div className="space-y-3">
          {[
            {
              trigger: '"הגדר..." / "מהי ההגדרה של..."',
              what: 'שאלת הגדרה — כתוב הגדרה פורמלית מההרצאה',
              action: 'שנן הגדרות מפתח: כפל מטריצות, שחלוף, דטרמיננטה, בת"ל, פרישה, בסיס, ממד, rank, תת-מרחב',
              color: 'bg-green-50 border-green-300',
            },
            {
              trigger: '"הוכח ש-A = B" (למטריצות)',
              what: 'הוכחת שוויון מטריצות — הראה איבר-איבר',
              action: 'פתח [A]ᵢⱼ ו-[B]ᵢⱼ לפי הגדרות, הראה שווים. הצעד האחרון: קומוטטיביות/אסוציאטיביות.',
              color: 'bg-blue-50 border-blue-300',
            },
            {
              trigger: '"נכון או לא?" / "הוכח או הפרך"',
              what: 'שאלת נכון/לא — קודם נסה דוגמה נגדית',
              action: 'התחל עם מטריצה 2×2 עם {-1,0,1}. אם לא עובד → נסה להוכיח.',
              color: 'bg-amber-50 border-amber-300',
            },
            {
              trigger: '"הוכח: v₁,...,vₖ בת"ל"',
              what: 'הוכחת בת"ל — מההגדרה או מהאפיון',
              action: 'דרך 1: Σαᵢvᵢ = 0 ⟹ αᵢ=0 לכל i. דרך 2: vⱼ ∉ Span(v₁,...,vⱼ₋₁).',
              color: 'bg-indigo-50 border-indigo-300',
            },
            {
              trigger: '"הוכח: A או B"',
              what: 'הוכחה בשלילה',
              action: 'נניח ¬A ∧ ¬B, בחר נציגים, בנה u+w, הגע לסתירה.',
              color: 'bg-red-50 border-red-300',
            },
            {
              trigger: '"פתור מערכת עם פרמטר α"',
              what: 'חישוב det + ניתוח מקרים',
              action: 'חשב det(A). det≠0 → יחיד. det=0 → הצב α ובדוק: סתירה=אין, שורת אפסים=אינסוף.',
              color: 'bg-orange-50 border-orange-300',
            },
            {
              trigger: '"חשב דטרמיננטה 4×4 / 5×5"',
              what: 'קודם בדוק תלות!',
              action: 'חפש הפרשים קבועים, שורות/עמודות פרופורציונליות. אם יש תלות → det=0. אחרת → פיתוח קופקטורים.',
              color: 'bg-purple-50 border-purple-300',
            },
            {
              trigger: '"הוכח U ⊆ W" (תת-מרחבים)',
              what: 'הוכחת הכלה — הראה שכל פורש נמצא',
              action: 'אם U = Span(S), הראה שכל s∈S נמצא ב-W. מכיוון ש-W תת-מרחב, גם Span(S) ⊆ W.',
              color: 'bg-teal-50 border-teal-300',
            },
            {
              trigger: '"rank(A+B) ≤ ..." / חסמי rank',
              what: 'חסמי דרגה — שילוב dim + row space',
              action: 'עליון: row(A+B)⊆row(A)+row(B), dim. תחתון: כתוב A=(A+B)+(-B), הפעל עליון.',
              color: 'bg-cyan-50 border-cyan-300',
            },
          ].map(({ trigger, what, action, color }, i) => (
            <div key={i} className={`${color} border rounded-lg p-3`}>
              <div className="flex items-start gap-2">
                <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded flex-shrink-0">{i+1}</span>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-bold text-gray-800">כשרואים: <span className="text-purple-700">{trigger}</span></p>
                  <p className="text-sm text-gray-700">→ זה אומר: <strong>{what}</strong></p>
                  <p className="text-xs text-gray-600">מה לעשות: {action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════ */}
      {/* LECTURE MAP */}
      {/* ═══════════════════════════════════════════════ */}
      <Section title="מפת הרצאות — מאיפה כל נושא" icon={<GraduationCap className="w-5 h-5" />} color="text-blue-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {[
            { lectures: '1-9', topic: 'מערכות, מטריצות, דירוג, מרחבים וקטוריים', relevant: 'Q3.1' },
            { lectures: '10-11', topic: 'Span, בת"ל, אפיון בת"ל', relevant: 'Q3.2' },
            { lectures: '12-13', topic: 'שטייניץ, משפט המימדים', relevant: 'הוכחות ממד' },
            { lectures: '14-15', topic: 'סכום תת-מרחבים, נוסחת ממדים, השלמה לבסיס', relevant: 'Q4.2, Q5.2' },
            { lectures: '16', topic: 'כפל מטריצות, Trace', relevant: 'Q1' },
            { lectures: '17-19', topic: 'הפיכות, מט\' אלמנטריות, 9 תנאים שקולים', relevant: 'Q2.2' },
            { lectures: '20', topic: 'שחלוף, Null space, Row/Col space, Rank', relevant: 'Q1.1.2, Q5.2' },
            { lectures: '21-25', topic: 'דטרמיננטות — הגדרה, תכונות, פיתוח קופקטורים', relevant: 'Q2.1, Q3.1, Q4.1' },
          ].map(({ lectures, topic, relevant }, i) => (
            <div key={i} className="bg-blue-50 rounded-lg p-2 flex items-start gap-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded flex-shrink-0">הרצ&apos; {lectures}</span>
              <div>
                <p className="text-gray-800 text-xs">{topic}</p>
                <p className="text-blue-500 text-xs">רלוונטי ל: {relevant}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════ */}
      {/* FINAL SUMMARY */}
      {/* ═══════════════════════════════════════════════ */}
      <Section title="סיכום אחרון + טיפים למבחן" icon={<Zap className="w-5 h-5" />} color="text-purple-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-bold text-purple-800 text-sm mb-2">5 הדברים הכי חשובים</h3>
            <ul className="text-sm text-purple-700 space-y-2">
              <li><strong>1.</strong> שוויון מטריצות → איבר-איבר: [A]ᵢⱼ = [B]ᵢⱼ</li>
              <li><strong>2.</strong> &quot;נכון או לא&quot; → דוגמה נגדית 2×2</li>
              <li><strong>3.</strong> det גדול → בדוק תלות שורות לפני חישוב</li>
              <li><strong>4.</strong> &quot;A או B&quot; → שלילה: ¬A ∧ ¬B → סתירה</li>
              <li><strong>5.</strong> חסם תחתון → כתוב A = (A+B) + (-B)</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-bold text-green-800 text-sm mb-2">טעויות נפוצות</h3>
            <ul className="text-sm text-green-700 space-y-2">
              <li><strong>1.</strong> שוכחים לציין גדלים בהגדרת כפל מטריצות</li>
              <li><strong>2.</strong> מתחילים פיתוח קופקטורים 5×5 בלי לבדוק תלות</li>
              <li><strong>3.</strong> מניחים ש&quot;תמיד יש ערך α עם אינסוף פתרונות&quot;</li>
              <li><strong>4.</strong> שוכחים להשתמש בתוצאות סעיפים קודמים</li>
              <li><strong>5.</strong> בהוכחת בת&quot;ל — לא מזכירים מאיפה כל מקדם = 0</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-4 mt-2">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-amber-800 text-sm">אסטרטגיית פתרון סופית</h3>
          </div>
          <div className="text-sm text-amber-800 space-y-2">
            <p><strong>סדר:</strong> Q3 (40 דק&apos;) → Q1 (40 דק&apos;) → Q5 (45 דק&apos;) → Q4 (45 דק&apos;). דלגי על Q2.</p>
            <p><strong>לפני כל שאלה:</strong> קראי את כל הסעיפים לפני שמתחילים. שימי לב אם סעיף מאוחר משתמש בתוצאה של סעיף מוקדם.</p>
            <p><strong>אם נתקעת:</strong> עברי לשאלה הבאה. אפשר תמיד לחזור. עדיף 4 שאלות חלקיות מ-2 מושלמות.</p>
            <p><strong>בהוכחות:</strong> ציינו מאיזה משפט/הגדרה כל צעד נובע. &quot;מהגדרת כפל מטריצות&quot;, &quot;מאפיון בת&quot;ל (הרצאה 11)&quot; וכו&apos;.</p>
          </div>
        </div>

        <Tip>
          <strong>זכרי:</strong> עונים על 4 מתוך 5! דלגי על שאלה 2 (הכי ארוכה) ותרוויחי זמן לשאר השאלות. בהצלחה!
        </Tip>
      </Section>
    </div>
  );
}
