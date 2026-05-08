'use client';

import Link from 'next/link';
import { Crosshair, TrendingUp, TrendingDown, FileQuestion, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import {
  predictedQuestions,
  moedBStructure,
  lowProbabilityMoedB,
  highProbabilityMoedB,
  examTacticTips,
} from '@/data/moed-b-prediction';
import { topTheorems } from '@/data/top-theorems';
import { topHomework } from '@/data/top-homework';

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
        title="חיזוי מועד ב — מה צפוי במבחן?"
        subtitle="ניתוח מבוסס על מועד א 2025 (מה כבר נשאל), סימולציה 2025-26, ומבחני מועד ב 2022-2024. מטרה: לזהות מה צפוי לחזור ומה לא."
        gradient="from-rose-600 to-pink-700"
      />

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
          חיזוי 5 השאלות הצפויות
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

      {/* High vs Low probability lists */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-200 p-5">
          <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-600" />
            הסתברות גבוהה (לתת עדיפות)
          </h3>
          <ul className="space-y-2">
            {highProbabilityMoedB.map((t, i) => (
              <li key={i} className="bg-white rounded-lg p-3 border border-red-100 text-sm">
                <div className="font-semibold text-gray-900">{t.topic}</div>
                <div className="text-xs text-red-700 mt-0.5">{t.note}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-200 p-5">
          <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-gray-500" />
            הסתברות נמוכה (כבר נשאל ב-מועד א/סימולציה)
          </h3>
          <ul className="space-y-2">
            {lowProbabilityMoedB.map((t, i) => (
              <li key={i} className="bg-white rounded-lg p-3 border border-gray-200 text-sm">
                <div className="font-medium text-gray-700">{t.topic}</div>
                <div className="text-xs text-gray-500 mt-0.5">{t.reason}</div>
              </li>
            ))}
          </ul>
        </div>
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
          <strong>חישוב הסתברויות מבוסס על</strong>: ניתוח מבחני עבר 2022-2024, מועד א 2025, סימולציה 2025-26, ועל מסמך
          המיקוד מפי המרצים. <strong>לא תחזית מובטחת</strong> — אבל מקסם את הסיכוי לציון 90+.
        </div>
      </div>
    </div>
  );
}
