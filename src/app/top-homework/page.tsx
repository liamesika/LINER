'use client';

import { useState } from 'react';
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Wrench,
  FileQuestion,
  CheckCircle2,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import MathExpr from '@/components/MathExpr';
import { topHomework, type TopHomework } from '@/data/top-homework';

function difficultyColor(d: 'easy' | 'medium' | 'hard') {
  if (d === 'easy') return 'bg-green-50 text-green-700 border-green-200';
  if (d === 'medium') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  return 'bg-red-50 text-red-700 border-red-200';
}

function difficultyLabel(d: 'easy' | 'medium' | 'hard') {
  if (d === 'easy') return 'קל';
  if (d === 'medium') return 'בינוני';
  return 'קשה';
}

function categoryLabel(c: string) {
  const map: Record<string, string> = {
    systems: 'מערכות ליניאריות',
    matrices: 'מטריצות',
    invertibility: 'הפיכות',
    'subspace-dim': 'מימד תת-מרחב',
    'span-LI': 'span / בת"ל',
    'rank-nullity': 'דרגה',
    determinant: 'דטרמיננטה',
    transformation: 'העתקה ליניארית',
    polynomial: 'פולינומים',
    field: 'שדות',
  };
  return map[c] ?? c;
}

function HomeworkCard({ h, expanded, onToggle }: { h: TopHomework; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-right p-5 hover:bg-gray-50 transition-colors flex items-start justify-between gap-4"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {h.rank}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-bold text-gray-900 text-lg">{h.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${difficultyColor(h.difficulty)}`}>
                {difficultyLabel(h.difficulty)}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {categoryLabel(h.category)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mb-2">מקור: {h.source}</div>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-800 whitespace-pre-line border border-gray-100">
              {h.prompt}
            </div>
            <div className="text-xs text-blue-700 italic mt-2">{h.whyTop}</div>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
          {/* Solution */}
          <div className="proof-box">
            <div className="text-sm font-bold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> פתרון מלא:
            </div>
            <ol className="space-y-3">
              {h.solution.map((s) => (
                <li key={s.step} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center">
                    {s.step}
                  </span>
                  <div className="flex-1 text-sm text-gray-800 leading-relaxed">
                    {s.text}
                    {s.math && (
                      <MathExpr block className="mt-2">
                        {s.math}
                      </MathExpr>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Template */}
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <div className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <Wrench className="w-4 h-4" /> תבנית לזכור (skeleton):
            </div>
            <div className="text-sm text-indigo-900 whitespace-pre-line">{h.template}</div>
          </div>

          {/* Traps */}
          {h.traps.length > 0 && (
            <div className="warning-box">
              <div className="text-sm font-bold text-red-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> איפה מאבדים נקודות:
              </div>
              <ul className="space-y-1">
                {h.traps.map((trap, i) => (
                  <li key={i} className="text-sm text-red-800 flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">⚠</span>
                    <span>{trap}</span>
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

export default function TopHomeworkPage() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const rankedHomework = [...topHomework].sort((a, b) => a.rank - b.rank);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<GraduationCap className="w-6 h-6" />}
        title="Top 10 תרגילים מומלצים"
        subtitle="10 שאלות שיעורי הבית הכי סבירות למועד ג — מסודרות מחדש אחרי מועד ב ולפי החולשות ממועד א."
        gradient="from-blue-600 to-cyan-700"
      />

      <div className="rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2 text-xs text-blue-950">
        <div className="mb-1 font-bold">רשימת מקור קצרה:</div>
        <ol className="grid gap-x-5 gap-y-1 pr-4 sm:grid-cols-2 lg:grid-cols-3" style={{ listStyleType: 'decimal' }}>
          {rankedHomework.map((h) => (
            <li key={h.id}>
              <span className="font-semibold">{h.source}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="stat-card" style={{ '--stat-accent': '#16a34a' } as React.CSSProperties}>
          <div className="text-2xl font-bold text-green-700">{topHomework.filter((h) => h.difficulty === 'easy').length}</div>
          <div className="text-xs text-gray-500">קלים</div>
        </div>
        <div className="stat-card" style={{ '--stat-accent': '#ca8a04' } as React.CSSProperties}>
          <div className="text-2xl font-bold text-yellow-700">{topHomework.filter((h) => h.difficulty === 'medium').length}</div>
          <div className="text-xs text-gray-500">בינוניים</div>
        </div>
        <div className="stat-card" style={{ '--stat-accent': '#dc2626' } as React.CSSProperties}>
          <div className="text-2xl font-bold text-red-700">{topHomework.filter((h) => h.difficulty === 'hard').length}</div>
          <div className="text-xs text-gray-500">קשים</div>
        </div>
        <div className="stat-card" style={{ '--stat-accent': '#4f46e5' } as React.CSSProperties}>
          <div className="text-2xl font-bold text-indigo-700">{topHomework.length}</div>
          <div className="text-xs text-gray-500">סה"כ</div>
        </div>
      </div>

      <div className="space-y-4">
        {rankedHomework.map((h) => (
          <div key={h.id} id={`${h.rank}`}>
            <HomeworkCard
              h={h}
              expanded={expandedId === h.id}
              onToggle={() => setExpandedId(expandedId === h.id ? null : h.id)}
            />
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-l from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
          <FileQuestion className="w-5 h-5" />
          איך לעבוד עם הדף הזה
        </h3>
        <ol className="text-sm text-blue-800 space-y-1.5 pr-5" style={{ listStyleType: 'decimal' }}>
          <li>נסה לפתור כל תרגיל לבד <strong>לפני</strong> שאתה פותח את הפתרון.</li>
          <li>קרא את הפתרון רק אחרי שניסית 10-15 דק.</li>
          <li>שנן את ה-"תבנית" — היא חוזרת על עצמה בעוד תרגילים.</li>
          <li>לפני המבחן, סקור את ה-"מלכודות" של כל תרגיל.</li>
        </ol>
      </div>
    </div>
  );
}
