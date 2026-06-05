'use client';

import { useState } from 'react';
import {
  Trophy,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Target,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import MathExpr from '@/components/MathExpr';
import { topTheorems, type TopTheorem } from '@/data/top-theorems';

function probColor(p: number) {
  if (p >= 85) return 'bg-red-500 text-white';
  if (p >= 70) return 'bg-orange-500 text-white';
  if (p >= 55) return 'bg-yellow-500 text-white';
  return 'bg-gray-400 text-white';
}

function tierLabel(tier: 1 | 2 | 3) {
  if (tier === 1) return { text: 'Tier 1 — חובה', color: 'bg-red-50 text-red-700 border-red-200' };
  if (tier === 2) return { text: 'Tier 2 — חשוב', color: 'bg-orange-50 text-orange-700 border-orange-200' };
  return { text: 'Tier 3 — נחמד', color: 'bg-gray-50 text-gray-700 border-gray-200' };
}

function categoryLabel(c: string) {
  const map: Record<string, string> = {
    rank: 'דרגה',
    invertibility: 'הפיכות',
    dimension: 'מימד',
    basis: 'בסיס',
    determinant: 'דטרמיננטה',
    span: 'span',
    subspace: 'תת-מרחב',
  };
  return map[c] ?? c;
}

function TheoremCard({ t, expanded, onToggle }: { t: TopTheorem; expanded: boolean; onToggle: () => void }) {
  const tier = tierLabel(t.tier);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-right p-5 hover:bg-gray-50 transition-colors flex items-start justify-between gap-4"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${probColor(t.probability)}`}>
            {t.rank}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-bold text-gray-900 text-lg">{t.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${tier.color}`}>
                {tier.text}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {categoryLabel(t.category)}
              </span>
              <span className="text-xs text-gray-500">{t.lecture}</span>
            </div>
            <div className="text-sm text-gray-600 mb-2">{t.nameEn}</div>
            <div className="theorem-box my-2">
              <div className="text-xs font-bold text-purple-700 mb-1">משפט:</div>
              <MathExpr block>{t.statement}</MathExpr>
              {t.preconditions && (
                <div className="text-xs text-gray-600 mt-2">
                  <strong>תנאים:</strong> {t.preconditions}
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 italic flex items-start gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-500" />
              <span>{t.whyAsked}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={`text-xs px-2 py-1 rounded-full font-bold ${probColor(t.probability)}`}>
            {t.probability}%
          </span>
          {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
          {/* Proof */}
          <div className="proof-box">
            <div className="text-sm font-bold text-green-800 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> הוכחה (מילה במילה מההרצאה):
            </div>
            <ol className="space-y-3">
              {t.proof.map((p) => (
                <li key={p.step} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center">
                    {p.step}
                  </span>
                  <div className="flex-1 text-sm text-gray-800 leading-relaxed">
                    {p.text}
                    {p.math && (
                      <MathExpr block className="mt-2">
                        {p.math}
                      </MathExpr>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Key Lemmas */}
          {t.keyLemmas.length > 0 && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" /> כלים שצריך לצטט בהוכחה:
              </div>
              <ul className="space-y-1">
                {t.keyLemmas.map((lemma, i) => (
                  <li key={i} className="text-sm text-blue-800 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">●</span>
                    <span>{lemma}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Traps */}
          {t.traps.length > 0 && (
            <div className="warning-box">
              <div className="text-sm font-bold text-red-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> מלכודות נפוצות (מורידים נקודות):
              </div>
              <ul className="space-y-1">
                {t.traps.map((trap, i) => (
                  <li key={i} className="text-sm text-red-800 flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">⚠</span>
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Variants */}
          {t.variants.length > 0 && (
            <div className="tip-box">
              <div className="text-sm font-bold text-amber-900 mb-2">וריאציות שעלו במבחני עבר:</div>
              <ul className="space-y-1">
                {t.variants.map((v, i) => (
                  <li key={i} className="text-sm text-amber-900 flex items-start gap-2">
                    <span className="text-amber-600 mt-1">→</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TopTheoremsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(2);
  const [filterTier, setFilterTier] = useState<'all' | 1 | 2>('all');

  const rankedTheorems = [...topTheorems].sort((a, b) => a.rank - b.rank);
  const filtered = rankedTheorems.filter((t) => filterTier === 'all' || t.tier === filterTier);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Trophy className="w-6 h-6" />}
        title="Top 10 משפטים + הוכחות"
        subtitle="10 ההוכחות הכי סבירות למועד ג 2025-26 — מכויל אחרי מועד ב. משפט השלוש כבר הופיע ולכן ירד משמעותית בסבירות."
        gradient="from-purple-600 to-indigo-700"
      />

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-gray-600">סינון:</span>
        {[
          { v: 'all', label: 'הכל' },
          { v: 1, label: 'Tier 1 — חובה' },
          { v: 2, label: 'Tier 2 — חשוב' },
        ].map((opt) => (
          <button
            key={opt.v as string | number}
            onClick={() => setFilterTier(opt.v as 'all' | 1 | 2)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterTier === opt.v
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-500">{filtered.length} משפטים</span>
      </div>

      <div className="space-y-4">
        {filtered.map((t) => (
          <div key={t.id} id={`${t.rank}`}>
            <TheoremCard
              t={t}
              expanded={expandedId === t.id}
              onToggle={() => setExpandedId(expandedId === t.id ? null : t.id)}
            />
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-l from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
        <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          איך לעבוד עם הדף הזה
        </h3>
        <ol className="text-sm text-purple-800 space-y-1.5 pr-5" style={{ listStyleType: 'decimal' }}>
          <li>קרא את 6 ההוכחות הראשונות (Tier 1+2) פעם אחת בעיון.</li>
          <li>סגור את הדפדפן וכתוב את ההוכחה במחברת מהזיכרון.</li>
          <li>חזור והשווה — שים לב למלכודות.</li>
          <li>חזור על תהליך זה 2-3 פעמים לכל הוכחה.</li>
          <li>ביום המבחן, סקור את 3 ההוכחות הראשונות בלבד.</li>
        </ol>
      </div>
    </div>
  );
}
