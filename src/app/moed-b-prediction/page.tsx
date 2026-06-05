'use client';

import Link from 'next/link';
import { Crosshair, TrendingUp, TrendingDown, FileQuestion, Sparkles, GraduationCap, AlertTriangle, Trophy, BookOpen, ShieldCheck } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import {
  predictedQuestions,
  moedBStructure,
  lowProbabilityMoedB,
  highProbabilityMoedB,
  examTacticTips,
  top10HwToSolve,
  tieredProofs,
  predictedDefinitions,
  type ProofTier,
} from '@/data/moed-b-prediction';
import { topTheorems } from '@/data/top-theorems';
import { topHomework } from '@/data/top-homework';

function tierMeta(tier: ProofTier) {
  if (tier === 1) return { label: 'Tier 1 — בטחון גבוה', cls: 'bg-red-50 border-red-300 text-red-900', dot: 'bg-red-500', range: '70-85%' };
  if (tier === 2) return { label: 'Tier 2 — בטחון בינוני', cls: 'bg-orange-50 border-orange-300 text-orange-900', dot: 'bg-orange-500', range: '45-70%' };
  return { label: 'Tier 3 — בטחון נמוך', cls: 'bg-gray-50 border-gray-300 text-gray-700', dot: 'bg-gray-500', range: '25-50%' };
}

function defCategoryMeta(c: 'must-memorize' | 'should-know' | 'recognize') {
  if (c === 'must-memorize') return { label: 'חובה לשנן', cls: 'bg-red-100 text-red-700 border-red-300' };
  if (c === 'should-know') return { label: 'לדעת לנסח', cls: 'bg-amber-100 text-amber-700 border-amber-300' };
  return { label: 'רק להכיר', cls: 'bg-gray-100 text-gray-600 border-gray-300' };
}

function probColor(p: number) {
  if (p >= 80) return 'bg-red-500 text-white';
  if (p >= 70) return 'bg-orange-500 text-white';
  if (p >= 60) return 'bg-yellow-500 text-white';
  return 'bg-gray-400 text-white';
}

export default function MoedBPredictionPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Crosshair className="w-6 h-6" />}
        title="חיזוי מועד ג — מה צפוי במבחן?"
        subtitle="ניתוח מבוסס על מועד א 2026 + מועד ב 2026 שלך. הוצאתי את כל 18 הנושאים שכבר נשאלו בשני המועדים + העתקות ליניאריות שלא נלמדו."
        gradient="from-rose-600 to-pink-700"
      />

      {/* Top 10 HW box — the headline */}
      <div className="bg-gradient-to-l from-violet-600 to-indigo-700 rounded-2xl p-1 shadow-xl">
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-6 h-6 text-violet-600" />
            <h2 className="text-xl font-extrabold text-gray-900">Top 10 שאלות HW לפתור למועד ג</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-semibold">
              עדיפות מקסימלית
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-violet-200 text-violet-900 text-xs uppercase">
                  <th className="py-2 px-2 text-right w-12">#</th>
                  <th className="py-2 px-2 text-right">מקור</th>
                  <th className="py-2 px-2 text-right">נושא</th>
                  <th className="py-2 px-2 text-right">למה</th>
                </tr>
              </thead>
              <tbody>
                {top10HwToSolve.map((q) => {
                  const hw = q.hwTopRank ? topHomework.find((h) => h.rank === q.hwTopRank) : undefined;
                  return (
                    <tr key={q.rank} className="border-b border-gray-100 hover:bg-violet-50/30 transition-colors">
                      <td className="py-2.5 px-2 font-bold text-violet-700">
                        {q.rank}.
                      </td>
                      <td className="py-2.5 px-2 font-mono text-xs font-semibold text-gray-800 whitespace-nowrap">
                        {q.source}
                      </td>
                      <td className="py-2.5 px-2 text-gray-900 font-medium">
                        {hw ? (
                          <Link href={`/top-homework#${hw.rank}`} className="text-blue-700 hover:underline">
                            {q.topic}
                          </Link>
                        ) : (
                          q.topic
                        )}
                      </td>
                      <td className="py-2.5 px-2 text-gray-600 text-xs leading-snug">
                        {q.why}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
            <div>
              <strong>סדר עבודה מומלץ:</strong> 1→2→3 דחוף ביותר (rank-nullity + AB=I→BA=I + det(AB)). 4→6 חשוב. 7→10 אם נשאר זמן. תרגילים מסומנים בכחול יש להם פתרון מלא ב-Top 10 תרגילים.
            </div>
          </div>
        </div>
      </div>

      {/* Excluded topics — important context */}
      <div className="bg-gray-900 rounded-2xl p-5 text-white shadow-md">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-gray-400" />
          ⛔ נשאל כבר — לא לבזבז זמן (מועד א + מועד ב)
        </h3>
        <div className="grid md:grid-cols-2 gap-2">
          {lowProbabilityMoedB.map((t, i) => (
            <div key={i} className="bg-gray-800/60 rounded-lg p-2.5 text-sm">
              <div className="font-medium text-gray-200">{t.topic}</div>
              <div className="text-xs text-gray-500 mt-0.5">{t.reason}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Structure */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <FileQuestion className="w-5 h-5 text-rose-600" />
          מבנה המבחן
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center bg-rose-50 rounded-xl p-3 border border-rose-100">
            <div className="text-2xl font-bold text-rose-700">{moedBStructure.totalQuestions}</div>
            <div className="text-xs text-gray-600">שאלות</div>
          </div>
          <div className="text-center bg-rose-50 rounded-xl p-3 border border-rose-100">
            <div className="text-2xl font-bold text-rose-700">{moedBStructure.answer}</div>
            <div className="text-xs text-gray-600">לענות עליהן</div>
          </div>
          <div className="text-center bg-rose-50 rounded-xl p-3 border border-rose-100">
            <div className="text-2xl font-bold text-rose-700">{moedBStructure.pointsPerQuestion}</div>
            <div className="text-xs text-gray-600">נקודות לשאלה</div>
          </div>
          <div className="text-center bg-rose-50 rounded-xl p-3 border border-rose-100">
            <div className="text-2xl font-bold text-rose-700">{moedBStructure.durationHours}</div>
            <div className="text-xs text-gray-600">שעות</div>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600 italic">
          ללא חומר עזר. שאלות שמכילות הוכחות ≈ 50% מהציון. תשובות לא מוסברות = 0 נקודות.
        </div>
      </div>

      {/* Predicted questions */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-600" />
          חיזוי 5 השאלות הצפויות — מועד ג
        </h2>

        {predictedQuestions.map((q) => (
          <div key={q.qNum} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center font-bold text-lg">
                    Q{q.qNum}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{q.topic}</h3>
                    <div className="flex items-center gap-2 flex-wrap mt-1">
                      {q.subtopics.map((s) => (
                        <span key={s} className="topic-badge">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full font-bold flex-shrink-0 ${probColor(q.estimatedProbability)}`}>
                  {q.estimatedProbability}%
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
                <div className="text-xs font-bold text-gray-700 mb-1">פורמט צפוי:</div>
                <div className="text-sm text-gray-800">{q.likelyFormat}</div>
              </div>

              <div className="bg-amber-50 rounded-lg p-3 mb-3 border border-amber-100">
                <div className="text-xs font-bold text-amber-800 mb-1">למה הנושא הזה?</div>
                <div className="text-sm text-amber-900">{q.whyThisTopic}</div>
              </div>

              {q.exampleQuestions.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs font-bold text-gray-700 mb-1.5">דוגמאות ממבחנים אמיתיים:</div>
                  <ul className="space-y-1">
                    {q.exampleQuestions.map((ex, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-rose-500 mt-0.5">→</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested resources */}
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {q.suggestedTheorems.length > 0 && (
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                    <div className="text-xs font-bold text-purple-900 mb-2">משפטים לחזור:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {q.suggestedTheorems.map((rank) => {
                        const t = topTheorems.find((th) => th.rank === rank);
                        if (!t) return null;
                        return (
                          <Link
                            key={rank}
                            href={`/top-theorems#${rank}`}
                            className="text-xs px-2.5 py-1 bg-white rounded-full border border-purple-200 text-purple-800 hover:bg-purple-100"
                          >
                            {rank}. {t.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
                {q.suggestedHomework.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <div className="text-xs font-bold text-blue-900 mb-2">תרגילים מקבילים:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {q.suggestedHomework.map((rank) => {
                        const h = topHomework.find((hw) => hw.rank === rank);
                        if (!h) return null;
                        return (
                          <Link
                            key={rank}
                            href={`/top-homework#${rank}`}
                            className="text-xs px-2.5 py-1 bg-white rounded-full border border-blue-200 text-blue-800 hover:bg-blue-100"
                          >
                            {rank}. {h.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* High probability list */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-200 p-5">
        <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-red-600" />
          ✅ הסתברות גבוהה (לתת עדיפות)
        </h3>
        <ul className="grid md:grid-cols-2 gap-2">
          {highProbabilityMoedB.map((t, i) => (
            <li key={i} className="bg-white rounded-lg p-3 border border-red-100 text-sm">
              <div className="font-semibold text-gray-900">{t.topic}</div>
              <div className="text-xs text-red-700 mt-0.5">{t.note}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* ─────────── Tiered Proofs (calibrated) ─────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
          <div>
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-violet-600" />
              🎯 הוכחות מכוילות לפי 3 רמות בטחון
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              לא 95%+ על שום הוכחה. ההערכה כנה ומבוססת על מה שנשאל במועד א + מועד ב שלך + ניתוח מבחני עבר 2022-2025.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            הערכה כנה
          </div>
        </div>

        {[1, 2, 3].map((t) => {
          const tier = t as ProofTier;
          const meta = tierMeta(tier);
          const proofs = tieredProofs.filter((p) => p.tier === tier);
          return (
            <div key={t} className={`mb-4 rounded-xl border-2 ${meta.cls} p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
                <span className="font-bold text-sm">{meta.label}</span>
                <span className="text-xs opacity-70">({meta.range})</span>
              </div>
              <div className="space-y-2">
                {proofs.map((p) => (
                  <div key={p.rank} className="bg-white rounded-lg border border-gray-200 p-3">
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-violet-600 text-white font-bold">#{p.rank}</span>
                        <span className="font-bold text-sm text-gray-900">{p.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        p.probabilityHigh >= 70 ? 'bg-red-100 text-red-700' :
                        p.probabilityHigh >= 55 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {p.probabilityLow}–{p.probabilityHigh}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded p-2 mb-2" dir="ltr">
                      {p.statement}
                    </div>
                    <div className="text-xs text-green-800 bg-green-50 rounded p-2 border border-green-100 mb-1.5">
                      <strong>✓ למה בטוח:</strong> {p.whyConfident}
                    </div>
                    {p.whyNot && (
                      <div className="text-xs text-amber-800 bg-amber-50 rounded p-2 border border-amber-100">
                        <strong>⚠️ למה לא בטוח:</strong> {p.whyNot}
                      </div>
                    )}
                    <Link
                      href={`/top-theorems#${p.topTheoremRank}`}
                      className="inline-flex items-center gap-1 text-xs text-violet-700 hover:text-violet-900 mt-2 font-semibold"
                    >
                      פתחי הוכחה מלאה →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ─────────── Definitions (calibrated) ─────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="mb-4">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            📚 הגדרות צפויות
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            כל שאלה במבחן בד"כ מתחילה ב-"הגדירי X" (2-3 נקודות). הגדרות הכי סבירות למועד ג (לא כולל מה שנשאל במועד א/ב).
          </p>
        </div>

        {(['must-memorize', 'should-know', 'recognize'] as const).map((cat) => {
          const meta = defCategoryMeta(cat);
          const defs = predictedDefinitions.filter((d) => d.category === cat && !d.alreadyTested);
          if (defs.length === 0) return null;
          return (
            <div key={cat} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${meta.cls}`}>
                  {meta.label}
                </span>
                <span className="text-xs text-gray-500">({defs.length} הגדרות)</span>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {defs.map((d) => (
                  <div key={d.rank} className="bg-blue-50/50 rounded-lg border border-blue-200 p-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-bold text-sm text-blue-900">{d.title}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold">{d.probability}%</span>
                    </div>
                    <div className="text-xs text-gray-800 leading-relaxed mb-2">{d.body}</div>
                    {d.pairedWith && (
                      <div className="text-[10px] text-blue-700 font-semibold">🔗 {d.pairedWith}</div>
                    )}
                    <div className="text-[10px] text-gray-500 italic mt-1">{d.whyLikely}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Already-tested definitions — collapsed */}
        <details className="mt-3 bg-gray-50 rounded-lg border border-gray-200">
          <summary className="cursor-pointer p-3 text-xs font-semibold text-gray-600 hover:text-gray-900">
            הגדרות שכבר נשאלו במועד א או מועד ב ({predictedDefinitions.filter((d) => d.alreadyTested).length})
          </summary>
          <div className="p-3 pt-0 grid md:grid-cols-2 gap-2">
            {predictedDefinitions.filter((d) => d.alreadyTested).map((d) => (
              <div key={d.rank} className="bg-white rounded p-2 border border-gray-200 text-xs">
                <div className="font-semibold text-gray-700 line-through">{d.title}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{d.whyLikely}</div>
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* Exam tactics */}
      <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6">
        <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-amber-600" />
          טקטיקה ביום המבחן
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {examTacticTips.map((t, i) => (
            <div key={i} className="tip-box">
              <div className="text-sm font-bold text-amber-900 mb-1">
                {i + 1}. {t.title}
              </div>
              <div className="text-sm text-amber-900">{t.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-l from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100 text-center">
        <div className="text-sm text-rose-900">
          <strong>חישוב הסתברויות מבוסס על</strong>: מועד א 2026 ומועד ב 2026 שלך, ניתוח מבחני עבר 2022-2025, וסילבוס הקורס.
          <strong> לא תחזית מובטחת</strong> — אבל מקסם את הסיכוי לציון 90+ במועד ג.
        </div>
      </div>
    </div>
  );
}
