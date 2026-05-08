'use client';

import { useState } from 'react';
import { ClipboardCheck, ChevronDown, ChevronUp, AlertTriangle, BookOpen, Star } from 'lucide-react';

// =============================================
// Types
// =============================================

interface QuizDef {
  id: string;
  quiz: string;
  quizHe: string;
  prompt: string;
  promptHe: string;
  definition: string;
  definitionHe: string;
  note?: string;
  noteHe?: string;
  important?: boolean;
}

// =============================================
// All Quiz Definitions — word for word
// =============================================

const quizDefinitions: QuizDef[] = [
  {
    id: 'subspace',
    quiz: 'Quiz 2 Simulation',
    quizHe: 'בוחן 2 — סימולציה',
    prompt: 'Let V be a vector space over a field F and let W ⊆ V. Define the following term: W is a subspace of V.',
    promptHe: 'יהא V מרחב וקטורי מעל שדה F ויהא W ⊆ V. הגדר את המושג הבא: W הוא תת-מרחב של V.',
    definition:
      'We say that W is a subspace of V if W is a vector space over the field F with respect to the same operations of addition and scalar multiplication defined in V.',
    definitionHe:
      'נאמר ש-W הוא תת-מרחב של V אם W הוא מרחב וקטורי מעל השדה F ביחס לאותן פעולות חיבור וכפל בסקלר המוגדרות ב-V.',
    important: true,
  },
  {
    id: 'not-in-span',
    quiz: 'Quiz 2 Group 3',
    quizHe: 'בוחן 2 — קבוצה 3',
    prompt:
      'Let V be a vector space over a field F and let v₁, . . . , vₖ, v ∈ V. Define the following term: v ∉ Span{v₁, . . . , vₖ}. Do not use any negation word or symbol, except possibly the symbol ≠.',
    promptHe:
      'יהא V מרחב וקטורי מעל שדה F ויהיו v₁, . . . , vₖ, v ∈ V. הגדר את המושג הבא: v ∉ Span{v₁, . . . , vₖ}. אל תשתמש במילת שלילה או סימן שלילה, מלבד הסימן ≠.',
    definition:
      'We say that v ∉ Span{v₁, . . . , vₖ} if for every α₁, . . . , αₖ ∈ F we have\nv ≠ α₁v₁ + · · · + αₖvₖ',
    definitionHe:
      'נאמר ש-v ∉ Span{v₁, . . . , vₖ} אם לכל α₁, . . . , αₖ ∈ F מתקיים\nv ≠ α₁v₁ + · · · + αₖvₖ',
    noteHe: 'שים לב: ההגדרה בלי מילת שלילה! לא "לא קיימים" אלא "לכל ... מתקיים ≠".',
    important: true,
  },
  {
    id: 'finitely-generated',
    quiz: 'Quiz 3 Simulation',
    quizHe: 'בוחן 3 — סימולציה',
    prompt:
      'Let V be a vector space over a field F. Define the following term: V is finitely generated.',
    promptHe:
      'יהא V מרחב וקטורי מעל שדה F. הגדר את המושג הבא: V נוצר סופית.',
    definition:
      'We say that V is finitely generated if V = {0_V}, or there exist v₁, . . . , vₖ ∈ V such that\nV = {α₁v₁ + · · · + αₖvₖ : α₁, . . . , αₖ ∈ F}\n\nEquivalently, V is finitely generated if there exists a finite subset S ⊆ V such that V = Span(S).',
    definitionHe:
      'נאמר ש-V נוצר סופית אם V = {0_V}, או שקיימים v₁, . . . , vₖ ∈ V כך ש-\nV = {α₁v₁ + · · · + αₖvₖ : α₁, . . . , αₖ ∈ F}\n\nבאופן שקול: V נוצר סופית אם קיימת תת-קבוצה סופית S ⊆ V כך ש-V = Span(S).',
    noteHe: 'שים לב: המקרה V = {0_V} צריך להיות מוזכר בנפרד!',
    important: true,
  },
  {
    id: 'matrix-mult',
    quiz: 'Quiz 3 Group 1',
    quizHe: 'בוחן 3 — קבוצה 1',
    prompt:
      'Let A ∈ M_{m×n}(F) and let B ∈ M_{n×r}(F). Define the following term: The matrix A · B.',
    promptHe:
      'תהא A ∈ M_{m×n}(F) ותהא B ∈ M_{n×r}(F). הגדר את המושג הבא: המטריצה A · B.',
    definition:
      'The matrix A · B is defined as the matrix of size m × r with entries defined by\n[A · B]ᵢⱼ = Σₖ₌₁ⁿ [A]ᵢₖ[B]ₖⱼ ,   ∀1 ≤ i ≤ m, ∀1 ≤ j ≤ r',
    definitionHe:
      'המטריצה A · B מוגדרת כמטריצה מגודל m × r שאיבריה מוגדרים על ידי\n[A · B]ᵢⱼ = Σₖ₌₁ⁿ [A]ᵢₖ[B]ₖⱼ ,   לכל 1 ≤ i ≤ m, לכל 1 ≤ j ≤ r',
    noteHe: 'חשוב: חייבים לציין את גודל המטריצה התוצאה (m × r) ואת הכמתים (לכל i, לכל j).',
    important: true,
  },
  {
    id: 'dim-3',
    quiz: 'Quiz 3 Group 2',
    quizHe: 'בוחן 3 — קבוצה 2',
    prompt:
      'Let V be a vector space over a field F. Define the following term: dim V = 3. If your definition uses any term that has already been defined in the course, you must define that term as well.',
    promptHe:
      'יהא V מרחב וקטורי מעל שדה F. הגדר את המושג הבא: dim V = 3. אם ההגדרה שלך משתמשת במושג שהוגדר בקורס, עליך להגדיר גם אותו.',
    definition:
      'We say that dim V = 3 if there exist v₁, v₂, v₃ ∈ V such that:\n(i) For every α₁, α₂, α₃ ∈ F such that α₁v₁ + α₂v₂ + α₃v₃ = 0_V we have α₁ = α₂ = α₃ = 0_F.\n(ii) We have V = {α₁v₁ + α₂v₂ + α₃v₃ : α₁, α₂, α₃ ∈ F}.',
    definitionHe:
      'נאמר ש-dim V = 3 אם קיימים v₁, v₂, v₃ ∈ V כך ש:\n(i) לכל α₁, α₂, α₃ ∈ F כך ש-α₁v₁ + α₂v₂ + α₃v₃ = 0_V מתקיים α₁ = α₂ = α₃ = 0_F.\n(ii) מתקיים V = {α₁v₁ + α₂v₂ + α₃v₃ : α₁, α₂, α₃ ∈ F}.',
    noteHe: 'שים לב: (i) = בת"ל, (ii) = פורשת. יחד = בסיס בגודל 3. חייבים לפרק את המושגים כי השאלה דורשת!',
    important: true,
  },
  {
    id: 'direct-sum',
    quiz: 'Quiz 3 Group 3',
    quizHe: 'בוחן 3 — קבוצה 3',
    prompt:
      'Let V be a vector space over a field F and let U, W be two subspaces of V. Define the following term: U ⊕ W = V.',
    promptHe:
      'יהא V מרחב וקטורי מעל שדה F ויהיו U, W שני תת-מרחבים של V. הגדר את המושג הבא: U ⊕ W = V.',
    definition:
      'We say that U ⊕ W = V if\nV = {u + w : u ∈ U, w ∈ W}\nand U ∩ W = {0_V}.',
    definitionHe:
      'נאמר ש-U ⊕ W = V אם\nV = {u + w : u ∈ U, w ∈ W}\nוגם U ∩ W = {0_V}.',
    noteHe: 'שני תנאים! (1) V = U + W (סכום), (2) U ∩ W = {0} (חיתוך טריוויאלי). אל תשכח אף אחד.',
    important: true,
  },
];

// =============================================
// Components
// =============================================

function DefCard({ def, showEnglish }: { def: QuizDef; showEnglish: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`rounded-xl border-2 overflow-hidden ${def.important ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200 bg-white'}`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3 text-right">
          {def.important && <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />}
          <div>
            <div className="text-xs text-gray-500 mb-0.5">{def.quizHe}</div>
            <div className="font-bold text-gray-900 text-sm">{def.promptHe.split('.').slice(-2, -1)[0].trim().replace(/הגדר את המושג הבא: /, '')}</div>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100">
          {/* Question */}
          <div className="pt-3">
            <div className="text-xs font-bold text-gray-500 mb-1">השאלה כפי שהופיעה בבוחן:</div>
            <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-800">{def.promptHe}</div>
            {showEnglish && (
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mt-2 italic" dir="ltr">{def.prompt}</div>
            )}
          </div>

          {/* Definition — Hebrew */}
          <div>
            <div className="text-xs font-bold text-green-700 mb-1">התשובה — הגדרה מלאה בעברית:</div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <pre className="text-sm text-green-900 whitespace-pre-wrap font-sans leading-relaxed">{def.definitionHe}</pre>
            </div>
          </div>

          {/* Definition — English */}
          {showEnglish && (
            <div>
              <div className="text-xs font-bold text-blue-700 mb-1">Original English answer:</div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4" dir="ltr">
                <pre className="text-sm text-blue-900 whitespace-pre-wrap font-sans leading-relaxed">{def.definition}</pre>
              </div>
            </div>
          )}

          {/* Note */}
          {def.noteHe && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">{def.noteHe}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================
// Main Page
// =============================================

export default function QuizzesPage() {
  const [showEnglish, setShowEnglish] = useState(false);
  const [expandAll, setExpandAll] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-l from-rose-600 to-pink-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardCheck className="w-8 h-8" />
          <h1 className="text-2xl font-bold">הגדרות מבחנים — כל הבחנים</h1>
        </div>
        <p className="text-pink-200 text-sm">
          כל ההגדרות שהופיעו בבחנים בקורס, מילה במילה, מתורגמות לעברית.
          שאלה 1 בכל בוחן שווה 5 נקודות — הגדרה מדויקת = 5 נקודות בטוחות.
        </p>
      </div>

      {/* Stats & Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500">
              <strong className="text-gray-900">{quizDefinitions.length}</strong> הגדרות מ-<strong className="text-gray-900">7</strong> בחנים
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              בוחן 2 + בוחן 3 (כל הקבוצות + סימולציות)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEnglish(!showEnglish)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                showEnglish ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-600'
              }`}
            >
              {showEnglish ? 'הסתר אנגלית' : 'הצג אנגלית'}
            </button>
            <button
              onClick={() => setExpandAll(!expandAll)}
              className="text-xs px-3 py-1.5 rounded-lg border bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
            >
              {expandAll ? 'סגור הכל' : 'פתח הכל'}
            </button>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex gap-2">
          <BookOpen className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800 space-y-1">
            <p className="font-bold">טיפים לשאלת ההגדרה בבוחן:</p>
            <ul className="space-y-0.5 mr-3">
              <li>&#8226; כתוב את ההגדרה <strong>מילה במילה</strong> כפי שנלמדה. אל תנסה לנסח מחדש.</li>
              <li>&#8226; אם השאלה אומרת &quot;Define the term&quot; — תן את ההגדרה הפורמלית, לא הסבר אינטואיטיבי.</li>
              <li>&#8226; אם השאלה דורשת &quot;define that term as well&quot; — פרק כל מושג שמוזכר בהגדרה.</li>
              <li>&#8226; שים לב לכמתים: &quot;לכל&quot; (∀) vs &quot;קיים&quot; (∃). טעות בכמת = הגדרה שגויה.</li>
              <li>&#8226; 5 נקודות בטוחות אם שננת את ההגדרות!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quiz 2 Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="bg-rose-100 text-rose-700 text-sm px-3 py-1 rounded-lg">בוחן 2</span>
          פרישה, תת-מרחבים
        </h2>
        <div className="space-y-3">
          {quizDefinitions.filter(d => d.quiz.includes('Quiz 2')).map(def =>
            expandAll ? <DefCardOpen key={def.id} def={def} showEnglish={showEnglish} /> : <DefCard key={def.id} def={def} showEnglish={showEnglish} />
          )}
        </div>
      </div>

      {/* Quiz 3 Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="bg-violet-100 text-violet-700 text-sm px-3 py-1 rounded-lg">בוחן 3</span>
          מטריצות, מימד, סכום ישר
        </h2>
        <div className="space-y-3">
          {quizDefinitions.filter(d => d.quiz.includes('Quiz 3')).map(def =>
            expandAll ? <DefCardOpen key={def.id} def={def} showEnglish={showEnglish} /> : <DefCard key={def.id} def={def} showEnglish={showEnglish} />
          )}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="font-bold text-white text-lg mb-4">שינון מהיר — כל ההגדרות בשורה אחת</h2>
        <div className="space-y-3">
          <div className="text-sm">
            <span className="text-pink-400 font-bold">תת-מרחב:</span>
            <span className="text-gray-300"> W תת-מרחב של V אם W הוא מ&quot;ו מעל F עם אותן פעולות של V.</span>
          </div>
          <div className="text-sm">
            <span className="text-pink-400 font-bold">v ∉ Span:</span>
            <span className="text-gray-300"> לכל α₁,...,αₖ ∈ F מתקיים v ≠ α₁v₁ + ... + αₖvₖ.</span>
          </div>
          <div className="text-sm">
            <span className="text-pink-400 font-bold">נוצר סופית:</span>
            <span className="text-gray-300"> V = {'{'}0{'}'} או קיימים v₁,...,vₖ כך ש-V = Span(v₁,...,vₖ).</span>
          </div>
          <div className="text-sm">
            <span className="text-pink-400 font-bold">כפל מטריצות:</span>
            <span className="text-gray-300"> [A·B]ᵢⱼ = Σₖ [A]ᵢₖ[B]ₖⱼ. גודל m×r. לכל i, לכל j.</span>
          </div>
          <div className="text-sm">
            <span className="text-pink-400 font-bold">dim V = 3:</span>
            <span className="text-gray-300"> קיימים v₁,v₂,v₃ — בת&quot;ל (כל צ&quot;ל=0 → מקדמים 0) + פורשים (V = כל הצ&quot;ל).</span>
          </div>
          <div className="text-sm">
            <span className="text-pink-400 font-bold">סכום ישר U⊕W=V:</span>
            <span className="text-gray-300"> V = {'{'}u+w | u∈U, w∈W{'}'} וגם U∩W = {'{'}0{'}'}.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Always-open version
function DefCardOpen({ def, showEnglish }: { def: QuizDef; showEnglish: boolean }) {
  return (
    <div className={`rounded-xl border-2 overflow-hidden ${def.important ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200 bg-white'}`}>
      <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {def.important && <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />}
          <div>
            <div className="text-xs text-gray-500 mb-0.5">{def.quizHe}</div>
            <div className="font-bold text-gray-900 text-sm">{def.promptHe.split('.').slice(-2, -1)[0].trim().replace(/הגדר את המושג הבא: /, '')}</div>
          </div>
        </div>
      </div>
      <div className="px-5 pb-5 space-y-4">
        <div className="pt-3">
          <div className="text-xs font-bold text-gray-500 mb-1">השאלה כפי שהופיעה בבוחן:</div>
          <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-800">{def.promptHe}</div>
          {showEnglish && (
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mt-2 italic" dir="ltr">{def.prompt}</div>
          )}
        </div>
        <div>
          <div className="text-xs font-bold text-green-700 mb-1">התשובה — הגדרה מלאה בעברית:</div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <pre className="text-sm text-green-900 whitespace-pre-wrap font-sans leading-relaxed">{def.definitionHe}</pre>
          </div>
        </div>
        {showEnglish && (
          <div>
            <div className="text-xs font-bold text-blue-700 mb-1">Original English answer:</div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4" dir="ltr">
              <pre className="text-sm text-blue-900 whitespace-pre-wrap font-sans leading-relaxed">{def.definition}</pre>
            </div>
          </div>
        )}
        {def.noteHe && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">{def.noteHe}</p>
          </div>
        )}
      </div>
    </div>
  );
}
