'use client';

import { useState } from 'react';
import {
  BookOpen, ChevronDown, ChevronUp, Lightbulb, AlertTriangle,
  CheckCircle, ArrowRight, Link2, Zap,
} from 'lucide-react';

/* ── helper components ───────────────────────── */

function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono bg-gray-100 px-1 rounded text-sm">{children}</span>;
}

function Collapse({ title, icon, color, children }: {
  title: string; icon?: React.ReactNode; color?: string; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-lg overflow-hidden ${color || 'border-gray-200 bg-gray-50'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-black/5 transition-colors"
      >
        <span className="font-bold text-sm flex items-center gap-2">
          {icon}{title}
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm space-y-2 border-t pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

function ProofStep({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-indigo-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{num}</span>
        <span className="font-bold text-indigo-900 text-sm">{title}</span>
      </div>
      <div className="text-sm text-indigo-800 space-y-2 mr-8">{children}</div>
    </div>
  );
}

function Intuition({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
      <div className="font-bold text-yellow-800 text-sm mb-2 flex items-center gap-2">
        <Lightbulb className="w-4 h-4" /> אינטואיציה
      </div>
      <div className="text-sm text-yellow-900 space-y-2">{children}</div>
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

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 flex gap-2">
      <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-amber-800">{children}</div>
    </div>
  );
}

/* ── main page ───────────────────────────────── */

export default function SteinitzPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-l from-indigo-600 to-purple-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Link2 className="w-7 h-7" />
          שטייניץ + משפט המימדים — הבנה מעמיקה
        </h1>
        <p className="mt-2 text-indigo-100">
          הרצאות 12–13 | איך שטייניץ מוכיח את משפט המימדים, ולמה הם אותו דבר
        </p>
      </div>

      {/* ═══════════ THE BIG PICTURE ═══════════ */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-900">
          <BookOpen className="w-5 h-5" />
          התמונה הגדולה — מה הבעיה בכלל?
        </h2>
        <div className="space-y-4">
          <Intuition>
            <p>נגיד שיש לנו מרחב <M>V</M>. מצאנו בסיס אחד עם <strong>3 וקטורים</strong> ובסיס אחר עם <strong>5 וקטורים</strong>.</p>
            <p>מה ה-dim V? 3 או 5? <strong>הבעיה: אולי בסיסים שונים יכולים להיות בגדלים שונים?</strong></p>
            <p className="font-bold text-yellow-900 mt-2">זה מה ש&quot;משפט המימדים הראשון&quot; פותר — הוא אומר שזה <span className="text-red-600 underline">בלתי אפשרי</span>. לכל בסיס יש בדיוק אותו מספר וקטורים.</p>
          </Intuition>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="font-bold text-indigo-900 text-sm mb-2">שני המשפטים והקשר ביניהם:</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded mt-0.5">למה</span>
                <div>
                  <p className="font-bold text-purple-900">למת שטייניץ: &quot;בת&quot;ל קטנה מפורשת&quot;</p>
                  <p className="text-purple-800">אם <M>v₁,...,vₖ</M> בת&quot;ל ו-<M>w₁,...,wₘ</M> פורשים — אז <M>k ≤ m</M>.</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  מיידי <ArrowRight className="w-3 h-3" />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded mt-0.5">משפט</span>
                <div>
                  <p className="font-bold text-green-900">משפט המימדים: &quot;כל הבסיסים שווים בגודלם&quot;</p>
                  <p className="text-green-800">אם <M>v₁,...,vₖ</M> ו-<M>w₁,...,wₘ</M> שני בסיסים — אז <M>k = m</M>.</p>
                </div>
              </div>
            </div>
          </div>

          <Tip>
            <strong>המפתח:</strong> שטייניץ הוא ה&quot;מנוע&quot;. משפט המימדים הוא רק &quot;להפעיל את שטייניץ פעמיים&quot;. אם אתה יודע את שטייניץ, משפט המימדים הוא 3 שורות.
          </Tip>
        </div>
      </div>

      {/* ═══════════ STEINITZ LEMMA ═══════════ */}
      <div className="bg-white rounded-xl border-2 border-purple-300 p-6">
        <h2 className="font-bold text-xl mb-4 flex items-center gap-2 text-purple-900">
          <Zap className="w-5 h-5" />
          למת שטייניץ (הרצאה 12 — ניסוח, הרצאה 13 — הוכחה)
        </h2>

        <div className="space-y-4">
          {/* Statement */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="font-bold text-purple-900 text-sm mb-2">
              <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded">ניסוח הלמה</span>
            </div>
            <p>יהי <M>V</M> מ&quot;ו מעל שדה <M>F</M>, ויהיו <M>k, m ∈ ℕ</M>.</p>
            <p>יהיו <M>v₁,...,vₖ, w₁,...,wₘ ∈ V</M>.</p>
            <p>נניח ש-<M>v₁,...,vₖ</M> <strong>בת&quot;ל</strong> ו-<M>w₁,...,wₘ</M> <strong>פורשים</strong> את <M>V</M>.</p>
            <p className="font-bold text-lg text-center my-2 text-red-700">אזי k ≤ m</p>
          </div>

          {/* Intuition */}
          <Intuition>
            <p><strong>במילים פשוטות:</strong> קבוצה בלתי תלויה לא יכולה להיות <strong>גדולה יותר</strong> מקבוצה פורשת.</p>
            <p className="mt-2"><strong>למה זה הגיוני?</strong> חשוב על זה כך:</p>
            <p>• קבוצה <strong>פורשת</strong> = &quot;מספיק חומר גלם לבנות את כל V&quot;</p>
            <p>• קבוצה <strong>בת&quot;ל</strong> = &quot;אף וקטור לא מיותר&quot;</p>
            <p>אם יש לך 3 וקטורים שפורשים (מספיק חומר גלם), אתה לא יכול למצוא 4 וקטורים שכולם &quot;לא מיותרים&quot; — כי אתה יכול לבנות כל אחד מ-3 הפורשים.</p>

            <p className="mt-2"><strong>דוגמה קונקרטית ב-<M>ℝ³</M>:</strong></p>
            <p>• <M>&#123;e₁, e₂&#125;</M> — בת&quot;ל (2 וקטורים)</p>
            <p>• <M>&#123;e₁, e₂, e₃&#125;</M> — פורשים ובת&quot;ל (בסיס, 3 וקטורים)</p>
            <p>• <M>&#123;e₁, e₂, e₃, (1,1,1)&#125;</M> — פורשים אבל <strong>ת&quot;ל</strong> (4 וקטורים)</p>
            <p>שטייניץ אומר: 2 ≤ 3 ✓. ואכן, אם היו 4 בת&quot;ל, זה היה סותר את שטייניץ כי 4 {'>'} 3.</p>
          </Intuition>

          {/* Full Proof */}
          <div className="bg-indigo-50 border border-indigo-300 rounded-lg p-4">
            <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              הוכחה מלאה (הרצאה 13)
            </h3>

            <div className="mb-3 bg-white border border-indigo-200 rounded p-3 text-sm">
              <p className="font-bold text-indigo-800">שיטת ההוכחה: בשלילה!</p>
              <p>נניח בשלילה ש-<M>m {'<'} k</M> (יש <strong>יותר</strong> בת&quot;ל מפורשים). נגיע לסתירה.</p>
            </div>

            <div className="space-y-3">
              <ProofStep num={1} title="v₁ מחליף את w₁">
                <p>מכיוון ש-<M>w₁,...,wₘ</M> פורשים את V:</p>
                <p className="text-center font-mono bg-white rounded p-1">V = Span&#123;w₁,...,wₘ&#125;</p>
                <p>בפרט <M>v₁ ∈ V</M>, ולכן:</p>
                <p className="text-center font-mono bg-yellow-50 rounded p-1 border border-yellow-200">v₁ = α₁w₁ + α₂w₂ + ... + αₘwₘ</p>
                <p>מכיוון ש-<M>v₁,...,vₖ</M> בת&quot;ל, בפרט <M>v₁ ≠ 0_V</M>.</p>
                <p>לכן <strong>קיים</strong> <M>1 ≤ j ≤ m</M> כך ש-<M>αⱼ ≠ 0_F</M>.</p>
                <p className="mt-1">(אם כל המקדמים היו 0, היינו מקבלים <M>v₁ = 0_V</M> — סתירה)</p>
                <p className="mt-1">בלי הגבלת הכלליות (בה&quot;כ), נניח <M>j = 1</M> (שינוי סדר ה-w-ים).</p>

                <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded p-2">
                  <p className="font-bold text-emerald-800">מבודדים את w₁:</p>
                  <p className="text-center font-mono">α₁w₁ = v₁ − α₂w₂ − ... − αₘwₘ</p>
                  <p className="text-center font-mono">w₁ = α₁⁻¹v₁ − α₁⁻¹α₂w₂ − ... − α₁⁻¹αₘwₘ</p>
                  <p className="mt-1">כלומר: <M>w₁ ∈ Span&#123;v₁, w₂,...,wₘ&#125;</M></p>
                </div>

                <p className="mt-2">ממשפט שקילות Span (#):</p>
                <p className="text-center font-mono bg-green-50 rounded p-1 border border-green-200 font-bold">Span&#123;v₁, w₂,...,wₘ&#125; = V ✓</p>
                <p className="text-xs text-gray-600 mt-1">(הוספנו את v₁ — לא שינה את Span כי v₁ כבר ב-V. הסרנו את w₁ — לא שינה כי w₁ ∈ Span&#123;v₁,w₂,...,wₘ&#125;)</p>
              </ProofStep>

              <ProofStep num={2} title="v₂ מחליף את w₂">
                <p>עכשיו <M>Span&#123;v₁, w₂,...,wₘ&#125; = V</M>, ולכן:</p>
                <p className="text-center font-mono bg-yellow-50 rounded p-1 border border-yellow-200">v₂ = β₁v₁ + β₂w₂ + ... + βₘwₘ</p>
                <p><strong>שאלה:</strong> האם יכול להיות שכל <M>β₂ = ... = βₘ = 0</M>?</p>
                <p><strong>לא!</strong> כי אז <M>v₂ = β₁v₁</M>, כלומר <M>v₁, v₂</M> ת&quot;ל — סתירה (הם חלק מ-<M>v₁,...,vₖ</M> שהם בת&quot;ל).</p>
                <p className="mt-1">לכן קיים <M>2 ≤ j ≤ m</M> עם <M>βⱼ ≠ 0</M>. בה&quot;כ <M>j = 2</M>.</p>

                <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded p-2">
                  <p className="font-bold text-emerald-800">מבודדים את w₂:</p>
                  <p className="text-center font-mono">w₂ = β₂⁻¹v₂ − β₂⁻¹β₁v₁ − β₂⁻¹β₃w₃ − ... − β₂⁻¹βₘwₘ</p>
                </div>

                <p className="mt-2">ממשפט שקילות Span (#):</p>
                <p className="text-center font-mono bg-green-50 rounded p-1 border border-green-200 font-bold">Span&#123;v₁, v₂, w₃,...,wₘ&#125; = V ✓</p>
              </ProofStep>

              <div className="flex items-center justify-center py-1">
                <span className="text-indigo-500 font-bold text-sm">⋮ ממשיכים כך — בכל שלב vᵢ מחליף את wᵢ ⋮</span>
              </div>

              <ProofStep num={3} title="אחרי m צעדים — הסתירה!">
                <p>אחרי <M>m</M> צעדים של החלפות, קיבלנו:</p>
                <p className="text-center font-mono bg-green-50 rounded p-1 border border-green-200 font-bold">Span&#123;v₁, v₂, ..., vₘ&#125; = V</p>
                <p>כלומר <M>v₁,...,vₘ</M> פורשים את <M>V</M>.</p>

                <p className="mt-2">אבל הנחנו ש-<M>m {'<'} k</M>, לכן קיים <M>v_(m+1)</M>!</p>
                <p><M>v_(m+1) ∈ V = Span&#123;v₁,...,vₘ&#125;</M></p>

                <div className="mt-2 bg-red-50 border border-red-300 rounded p-2">
                  <p className="font-bold text-red-800">סתירה!</p>
                  <p><M>v_(m+1) ∈ Span&#123;v₁,...,vₘ&#125;</M> אומר שלפי משפט (**), <M>v₁,...,vₘ, v_(m+1)</M> ת&quot;ל.</p>
                  <p>אבל <M>v₁,...,vₖ</M> בת&quot;ל (נתון) ⟹ בפרט <M>v₁,...,v_(m+1)</M> בת&quot;ל.</p>
                  <p className="font-bold">סתירה! ∎</p>
                </div>

                <p className="mt-2">לכן ההנחה <M>m {'<'} k</M> שגויה, ומתקיים <M>k ≤ m</M>.</p>
              </ProofStep>
            </div>
          </div>

          <Intuition>
            <p><strong>מה קורה בהוכחה?</strong> &quot;משחק כיסאות מוזיקליים&quot;:</p>
            <p>• יש m כיסאות (= m פורשים).</p>
            <p>• אנחנו מכניסים את ה-v-ים אחד-אחד, ובכל פעם &quot;מסלקים&quot; w אחד.</p>
            <p>• אחרי m כניסות, כל הכיסאות תפוסים ע&quot;י v₁,...,vₘ.</p>
            <p>• אם k {'>'} m, יש v נוסף שרוצה כיסא אבל אין מקום — הוא נפרש ע&quot;י הקיימים ⟹ סתירה לבת&quot;ל.</p>
          </Intuition>

          <Warning>
            <strong>שימו לב:</strong> בכל שלב, הסיבה שאפשר למצוא <M>βⱼ ≠ 0</M> עם <M>j ≥ i</M> (ולא <M>j {'<'} i</M>) היא <strong>בדיוק</strong> כי <M>v₁,...,vₖ</M> בת&quot;ל. אם היו ת&quot;ל, לא הייתה סתירה ולא היינו יכולים להוכיח.
          </Warning>
        </div>
      </div>

      {/* ═══════════ DIMENSION THEOREM ═══════════ */}
      <div className="bg-white rounded-xl border-2 border-green-300 p-6">
        <h2 className="font-bold text-xl mb-4 flex items-center gap-2 text-green-900">
          <CheckCircle className="w-5 h-5" />
          משפט המימדים הראשון — &quot;כל הבסיסים שווים בגודלם&quot;
        </h2>

        <div className="space-y-4">
          {/* Statement */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="font-bold text-green-900 text-sm mb-2">
              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">משפט (הרצאה 12)</span>
            </div>
            <p>יהי <M>V</M> מ&quot;ו מעל שדה <M>F</M>.</p>
            <p>יהיו <M>v₁,...,vₖ</M> ו-<M>w₁,...,wₘ</M> <strong>שני בסיסים</strong> של <M>V</M>.</p>
            <p className="font-bold text-lg text-center my-2 text-red-700">אזי k = m</p>
          </div>

          {/* Proof */}
          <div className="bg-green-50 border border-green-300 rounded-lg p-4">
            <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              הוכחה — 3 שורות בלבד!
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white rounded p-3 border border-green-200">
                <p className="font-bold text-green-800 mb-1">כיוון 1 — k ≤ m:</p>
                <p>• <M>v₁,...,vₖ</M> הוא בסיס ⟹ בפרט <strong>בת&quot;ל</strong></p>
                <p>• <M>w₁,...,wₘ</M> הוא בסיס ⟹ בפרט <strong>פורש</strong> את V</p>
                <p>• מ<strong>למת שטייניץ</strong>: <M>k ≤ m</M> ✓</p>
              </div>
              <div className="bg-white rounded p-3 border border-green-200">
                <p className="font-bold text-green-800 mb-1">כיוון 2 — m ≤ k:</p>
                <p>• <M>w₁,...,wₘ</M> הוא בסיס ⟹ בפרט <strong>בת&quot;ל</strong></p>
                <p>• <M>v₁,...,vₖ</M> הוא בסיס ⟹ בפרט <strong>פורש</strong> את V</p>
                <p>• מ<strong>למת שטייניץ</strong>: <M>m ≤ k</M> ✓</p>
              </div>
              <div className="bg-emerald-100 rounded p-3 border border-emerald-300 text-center">
                <p className="font-bold text-emerald-800">משני הכיוונים: k ≤ m ו-m ≤ k ⟹ k = m ∎</p>
              </div>
            </div>
          </div>

          <Intuition>
            <p><strong>למה ההוכחה כל כך קצרה?</strong></p>
            <p>כי בסיס = בת&quot;ל + פורש. אז כשיש שני בסיסים, כל אחד &quot;משחק שני תפקידים&quot;:</p>
            <p className="mt-1">• פעם ראשונה: הראשון בת&quot;ל, השני פורש ⟹ שטייניץ ⟹ k ≤ m</p>
            <p>• פעם שנייה: <strong>מחליפים תפקידים!</strong> השני בת&quot;ל, הראשון פורש ⟹ שטייניץ ⟹ m ≤ k</p>
            <p className="font-bold mt-2">זה הטריק: שטייניץ נותן ≤, אבל אם מפעילים אותו פעמיים (מחליפים תפקידים) — מקבלים =</p>
          </Intuition>
        </div>
      </div>

      {/* ═══════════ THE CONNECTION ═══════════ */}
      <div className="bg-white rounded-xl border-2 border-amber-300 p-6">
        <h2 className="font-bold text-xl mb-4 flex items-center gap-2 text-amber-900">
          <Link2 className="w-5 h-5" />
          הקשר — אפשר ללמוד אחד ולגזור את השני?
        </h2>

        <div className="space-y-4">
          <div className="bg-gradient-to-l from-green-50 to-purple-50 border rounded-lg p-4">
            <p className="font-bold text-lg text-center mb-3">התשובה: כן! 100%</p>
            <div className="space-y-2 text-sm">
              <p><strong>אם אתה יודע את שטייניץ ⟹ משפט המימדים הוא מיידי.</strong></p>
              <p>כל מה שצריך לשנות: במקום &quot;קבוצה בת&quot;ל + קבוצה פורשת&quot; — שים &quot;בסיס + בסיס&quot; והפעל פעמיים.</p>
            </div>
          </div>

          {/* Visual map */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-bold text-sm text-gray-800 mb-3">מפת הקשרים:</p>
            <div className="space-y-2 text-sm font-mono">
              <div className="bg-purple-100 rounded p-2 border border-purple-200">
                <span className="font-bold">למת שטייניץ</span>: בת&quot;ל + פורשת ⟹ k ≤ m
              </div>
              <div className="text-center text-purple-600 font-bold">↓ שימוש ×2 (החלפת תפקידים)</div>
              <div className="bg-green-100 rounded p-2 border border-green-200">
                <span className="font-bold">משפט המימדים</span>: בסיס + בסיס ⟹ k = m
              </div>
              <div className="text-center text-green-600 font-bold">↓ מיידי</div>
              <div className="bg-blue-100 rounded p-2 border border-blue-200">
                <span className="font-bold">הגדרת dim V</span> = מספר הוקטורים בכל בסיס (מוגדר היטב!)
              </div>
              <div className="text-center text-blue-600 font-bold">↓</div>
              <div className="bg-orange-100 rounded p-2 border border-orange-200">
                <span className="font-bold">מסקנה 1</span>: n+1 וקטורים ב-dim V = n הם ת&quot;ל
              </div>
              <div className="text-center text-orange-600 font-bold">↓</div>
              <div className="bg-rose-100 rounded p-2 border border-rose-200">
                <span className="font-bold">מסקנה 2</span>: n-1 וקטורים ב-dim V = n לא פורשים
              </div>
            </div>
          </div>

          <Tip>
            <strong>למבחן:</strong> אם שואלים &quot;הוכח שכל הבסיסים שווים בגודלם&quot; — צריך לכתוב את 3 השורות ולהשתמש בשטייניץ כ&quot;נתון&quot; (אלא אם כן ביקשו ממך גם להוכיח את שטייניץ).
          </Tip>
        </div>
      </div>

      {/* ═══════════ COROLLARY: n+1 ARE LD ═══════════ */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-xl mb-4 flex items-center gap-2 text-orange-900">
          <AlertTriangle className="w-5 h-5" />
          מסקנה 1: n+1 וקטורים ב-dim V = n הם ת&quot;ל
        </h2>

        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="font-bold text-orange-900 mb-1">
              <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded">מסקנה</span> (הרצאה 12/13)
            </p>
            <p>יהי <M>V</M> מ&quot;ו מעל <M>F</M>, יהי <M>0 ≤ n ∈ ℤ</M> ונניח ש-<M>dim V = n</M>.</p>
            <p className="font-bold">אזי, כל <M>n+1</M> וקטורים ב-V הם תלויים לינארית.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-2">הוכחה (בשלילה):</h3>
            <div className="text-sm space-y-2">
              <p>נניח בשלילה שקיימים <M>w₁,...,w_(n+1) ∈ V</M> שהם <strong>בת&quot;ל</strong>.</p>
              <p><strong>מקרה 1 (n = 0):</strong> <M>V = &#123;0_V&#125;</M>, אז <M>w₁ = 0_V</M>. אבל <M>1 · 0_V = 0_V</M> עם מקדם <M>1 ≠ 0</M> — סתירה לבת&quot;ל.</p>
              <p><strong>מקרה 2 (n {'>'} 0):</strong></p>
              <p>מכיוון ש-<M>dim V = n</M>, קיימים <M>v₁,...,vₙ ∈ V</M> שמהווים <strong>בסיס</strong> של V.</p>
              <p>בפרט: <M>v₁,...,vₙ</M> <strong>פורשים</strong> את V ויש בהם <M>n</M> וקטורים.</p>
              <p>אבל <M>w₁,...,w_(n+1)</M> <strong>בת&quot;ל</strong> ויש בהם <M>n+1</M> וקטורים.</p>
              <p>מ<strong>למת שטייניץ</strong>: <M>n+1 ≤ n</M> — <strong>סתירה!</strong> ∎</p>
            </div>
          </div>

          <Intuition>
            <p><strong>שימוש נפוץ:</strong> אם <M>dim V = 3</M> ונתנו לך 4 וקטורים — הם <strong>בהכרח</strong> ת&quot;ל. לא צריך לבדוק. זה מיידי מהמסקנה.</p>
          </Intuition>
        </div>
      </div>

      {/* ═══════════ COROLLARY 2: n-1 DON'T SPAN ═══════════ */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-xl mb-4 flex items-center gap-2 text-rose-900">
          <AlertTriangle className="w-5 h-5" />
          מסקנה 2: n-1 וקטורים ב-dim V = n לא פורשים
        </h2>

        <div className="space-y-4">
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
            <p className="font-bold text-rose-900 mb-1">
              <span className="bg-rose-600 text-white text-xs px-2 py-0.5 rounded">מסקנה</span> (הרצאה 13)
            </p>
            <p>יהי <M>V</M> מ&quot;ו מעל <M>F</M>, יהי <M>n ∈ ℕ</M> ונניח ש-<M>dim V = n</M>.</p>
            <p className="font-bold">אזי, כל <M>n-1</M> וקטורים ב-V לא פורשים את V.</p>
          </div>

          <Collapse
            title="הוכחה"
            icon={<CheckCircle className="w-4 h-4 text-gray-700" />}
            color="border-gray-300 bg-gray-50"
          >
            <p>נניח בשלילה שקיימים <M>w₁,...,w_(n-1) ∈ V</M> שפורשים את V.</p>
            <p>מכיוון ש-<M>dim V = n</M> ו-<M>1 ≤ n</M>, קיימים <M>v₁,...,vₙ</M> בסיס של V.</p>
            <p>בפרט <M>v₁,...,vₙ</M> <strong>בת&quot;ל</strong>.</p>
            <p>ו-<M>w₁,...,w_(n-1)</M> <strong>פורשים</strong>.</p>
            <p>מלמת שטייניץ: <M>n ≤ n-1</M> — <strong>סתירה!</strong> ∎</p>
          </Collapse>

          <Intuition>
            <p><strong>שתי המסקנות הן &quot;מראה&quot; של שטייניץ:</strong></p>
            <p>• <strong>מסקנה 1:</strong> &quot;יותר מדי וקטורים&quot; ⟹ בהכרח ת&quot;ל</p>
            <p>• <strong>מסקנה 2:</strong> &quot;מעט מדי וקטורים&quot; ⟹ בהכרח לא פורשים</p>
            <p className="font-bold mt-1">בדיוק n וקטורים = &quot;הכמות הנכונה&quot; — יכולים להיות בסיס (אם בת&quot;ל ⟺ אם פורשים).</p>
          </Intuition>
        </div>
      </div>

      {/* ═══════════ THREE EQUIVALENCES ═══════════ */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-xl mb-4 flex items-center gap-2 text-blue-900">
          <Zap className="w-5 h-5" />
          משפט השלישייה: n וקטורים ב-dim V = n
        </h2>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="font-bold text-blue-900 mb-1">
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">משפט</span> (הרצאה 13)
            </p>
            <p>יהי <M>V</M> מ&quot;ו מעל <M>F</M>, <M>n ∈ ℕ</M> ו-<M>dim V = n</M>.</p>
            <p>יהיו <M>v₁,...,vₙ ∈ V</M>. אזי <strong>שלושת התנאים הבאים שקולים</strong>:</p>
            <div className="mt-2 space-y-1 font-bold">
              <p>(1) <M>v₁,...,vₙ</M> בסיס של V</p>
              <p>(2) <M>v₁,...,vₙ</M> בת&quot;ל</p>
              <p>(3) <M>v₁,...,vₙ</M> פורשים את V</p>
            </div>
          </div>

          <Collapse
            title="הוכחה (1⟹2⟹3⟹1)"
            icon={<CheckCircle className="w-4 h-4 text-blue-700" />}
            color="border-blue-300 bg-blue-50"
          >
            <p className="font-bold">(1⟹2):</p>
            <p>לפי הגדרה — בסיס הוא בפרט בת&quot;ל.</p>

            <p className="font-bold mt-3">(2⟹3): נניח <M>v₁,...,vₙ</M> בת&quot;ל. נוכיח שפורשים.</p>
            <p>נניח בשלילה ש-<M>v₁,...,vₙ</M> <strong>לא</strong> פורשים את V.</p>
            <p>אזי קיים <M>v ∈ V</M> כך ש-<M>v ∉ Span&#123;v₁,...,vₙ&#125;</M>.</p>
            <p>ממשפט (**): <M>v₁,...,vₙ, v</M> <strong>בת&quot;ל</strong> (הוספת וקטור שלא ב-Span שומר על בת&quot;ל).</p>
            <p>כלומר, יש n+1 וקטורים בת&quot;ל במרחב ממד n.</p>
            <p><strong>סתירה למסקנה 1!</strong> ∎</p>

            <p className="font-bold mt-3">(3⟹1): נניח <M>v₁,...,vₙ</M> פורשים. נוכיח שבסיס.</p>
            <p>מספיק להוכיח שבת&quot;ל.</p>
            <p>נניח בשלילה ש-<M>v₁,...,vₙ</M> ת&quot;ל.</p>
            <p>לפי משפט (**), קיים <M>1 ≤ j ≤ n</M> כך ש-<M>vⱼ ∈ Span&#123;v₁,...,v_(j-1)&#125;</M>.</p>
            <p>נסיר את <M>vⱼ</M>. ממשפט (#): <M>Span&#123;v₁,...,v_(j-1),v_(j+1),...,vₙ&#125; = Span&#123;v₁,...,vₙ&#125; = V</M>.</p>
            <p>קיבלנו n-1 וקטורים פורשים — <strong>סתירה למסקנה 2!</strong> ∎</p>
          </Collapse>

          <Intuition>
            <p><strong>למה זה כל כך שימושי?</strong></p>
            <p>אם <M>dim V = 5</M> ויש לך 5 וקטורים, <strong>מספיק לבדוק רק אחד מהתנאים</strong>:</p>
            <p>• בדקת שבת&quot;ל? ⟹ אוטומטית גם פורשים וגם בסיס!</p>
            <p>• בדקת שפורשים? ⟹ אוטומטית גם בת&quot;ל וגם בסיס!</p>
            <p className="font-bold mt-1">זה חוסך עבודה כפולה במבחן.</p>
          </Intuition>
        </div>
      </div>

      {/* ═══════════ EXAM STRATEGY ═══════════ */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-900">
          <Zap className="w-5 h-5 text-amber-500" />
          איך ללמוד — אסטרטגיה למבחן
        </h2>

        <div className="space-y-4">
          <div className="bg-gradient-to-l from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
            <p className="font-bold text-amber-900 mb-2">סדר הלמידה המומלץ:</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <p><strong>ללמוד את שטייניץ לעומק</strong> — זו ההוכחה הארוכה והקשה. הכל נובע ממנה.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <p><strong>משפט המימדים</strong> — פשוט &quot;שטייניץ פעמיים&quot;. 3 שורות. לא צריך לשנן בנפרד.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <p><strong>מסקנות 1 + 2</strong> — שתיהן &quot;שלילה + שטייניץ&quot;. 3 שורות כל אחת.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                <p><strong>משפט השלישייה</strong> — נובע ממסקנות 1+2. מאוד שימושי בשאלות.</p>
              </div>
            </div>
          </div>

          <Warning>
            <strong>טעות נפוצה:</strong> מנסים לשנן כל משפט בנפרד. <strong>לא!</strong> תשנן רק את שטייניץ. כל השאר נובע ממנו ב-3 שורות כל פעם.
          </Warning>

          <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm space-y-1">
            <p className="text-yellow-400"># תרשים זרימה — מה צריך לזכור?</p>
            <p></p>
            <p className="text-white">שטייניץ (בת&quot;ל ≤ פורשת)  ← <span className="text-red-400">ההוכחה הגדולה!</span></p>
            <p> ├── משפט המימדים (k = m) ← שטייניץ ×2</p>
            <p> ├── מסקנה 1 (n+1 ⟹ ת&quot;ל) ← שלילה + שטייניץ</p>
            <p> ├── מסקנה 2 (n-1 ⟹ לא פורשת) ← שלילה + שטייניץ</p>
            <p> └── שלישייה (בסיס ⟺ בת&quot;ל ⟺ פורשת) ← מסקנות 1+2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
