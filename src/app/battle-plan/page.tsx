'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  Swords,
  Clock,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Calendar,
  BookOpen,
  Target,
  Coffee,
  Trophy,
  ExternalLink,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { battlePlan, examMeta, goldenRules } from '@/data/battle-plan-moed-b';
import { topTheorems } from '@/data/top-theorems';
import { topHomework } from '@/data/top-homework';

function typeColor(type: string) {
  switch (type) {
    case 'theory':
      return 'bg-purple-100 text-purple-700';
    case 'practice':
      return 'bg-blue-100 text-blue-700';
    case 'memorize':
      return 'bg-pink-100 text-pink-700';
    case 'simulation':
      return 'bg-red-100 text-red-700';
    case 'review':
      return 'bg-orange-100 text-orange-700';
    case 'rest':
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    theory: 'תיאוריה',
    practice: 'תרגול',
    memorize: 'שינון',
    simulation: 'סימולציה',
    review: 'סקירה',
    rest: 'הפסקה',
  };
  return map[type] ?? type;
}

function useTaskTracker() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('liner-battle-plan');
      if (stored) setDone(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('liner-battle-plan', JSON.stringify(done));
    } catch {}
  }, [done, hydrated]);

  const toggle = useCallback((key: string) => {
    setDone((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return { done, toggle, hydrated };
}

export default function BattlePlanPage() {
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const { done, toggle, hydrated } = useTaskTracker();

  // Stats
  const totalBlocks = battlePlan.reduce(
    (sum, d) => sum + d.blocks.filter((b) => b.type !== 'rest').length,
    0,
  );
  const completedBlocks = Object.entries(done).filter(([, v]) => v).length;
  const progressPct = totalBlocks > 0 ? Math.round((completedBlocks / totalBlocks) * 100) : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Swords className="w-6 h-6" />}
        title="תוכנית קרב — מועד ב 14.5"
        subtitle={`5 ימי לימוד × 8 שעות = 40 שעות. מהיום (${battlePlan[0].date}) עד יום המבחן. כל יום ממוקד במשהו ספציפי.`}
        gradient="from-violet-600 to-indigo-700"
      />

      {/* Exam countdown card */}
      <div className="bg-gradient-to-l from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">המבחן ביום</span>
            </div>
            <div className="text-2xl font-extrabold">{examMeta.examLabel}</div>
            <div className="text-sm opacity-90 mt-1">3 שעות, 5 שאלות, ענה על 4</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-extrabold">{examMeta.daysFromToday}</div>
            <div className="text-sm opacity-90">ימים נותרו</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            התקדמות בתוכנית
          </h3>
          <span className="text-sm font-bold text-indigo-700">
            {completedBlocks} / {totalBlocks} ({progressPct}%)
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-l from-violet-500 to-indigo-600 h-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Days */}
      <div className="space-y-3">
        {battlePlan.map((day) => {
          const isExpanded = expandedDay === day.day;
          const dayBlocks = day.blocks.filter((b) => b.type !== 'rest');
          const dayDone = dayBlocks.filter((_, i) => done[`d${day.day}-${i}`]).length;
          const dayPct = dayBlocks.length > 0 ? Math.round((dayDone / dayBlocks.length) * 100) : 0;
          const isExamDay = day.day === 6;

          return (
            <div
              key={day.day}
              className={`rounded-2xl border shadow-sm overflow-hidden ${
                isExamDay ? 'bg-gradient-to-l from-amber-50 to-orange-50 border-amber-300' : 'bg-white border-gray-200'
              }`}
            >
              <button
                onClick={() => setExpandedDay(isExpanded ? -1 : day.day)}
                className="w-full text-right p-5 hover:bg-gray-50/50 transition-colors flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${
                      isExamDay ? 'bg-amber-500' : dayPct === 100 ? 'bg-green-600' : 'bg-violet-600'
                    }`}
                  >
                    {isExamDay ? '🎯' : day.day}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900 text-lg">{day.title}</h3>
                      {!isExamDay && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-medium">
                          {day.totalHours} שעות
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {day.weekday}, {day.date}
                    </div>
                    <div className="text-sm text-gray-700">{day.focus}</div>
                    {!isExamDay && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden max-w-xs">
                          <div
                            className="bg-gradient-to-l from-violet-500 to-indigo-600 h-full"
                            style={{ width: `${dayPct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 font-medium">
                          {dayDone} / {dayBlocks.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
                  {/* Blocks */}
                  {day.blocks.map((b, i) => {
                    const key = `d${day.day}-${i}`;
                    const isDone = !!done[key];
                    const isRest = b.type === 'rest';
                    return (
                      <div
                        key={i}
                        className={`flex items-start gap-3 p-3 rounded-xl border ${
                          isRest
                            ? 'bg-gray-50 border-gray-200'
                            : isDone
                              ? 'bg-green-50 border-green-200'
                              : 'bg-white border-gray-200'
                        }`}
                      >
                        {!isRest && hydrated && (
                          <button onClick={() => toggle(key)} className="flex-shrink-0 mt-0.5">
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300 hover:text-gray-400" />
                            )}
                          </button>
                        )}
                        {isRest && <Coffee className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-sm font-mono text-gray-600">{b.time}</span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor(b.type)}`}
                            >
                              {typeLabel(b.type)}
                            </span>
                            {!isRest && b.hours > 0 && (
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {b.hours} שעות
                              </span>
                            )}
                          </div>
                          <div className={`text-sm ${isDone ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                            {b.task}
                          </div>
                          {b.ref && (
                            <Link
                              href={b.ref}
                              className="text-xs text-indigo-600 hover:text-indigo-800 mt-1 inline-flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {b.ref}
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Theorems for the day */}
                  {day.theoremsToReview.length > 0 && (
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                      <div className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
                        <Trophy className="w-4 h-4" /> משפטים לעבוד עליהם:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {day.theoremsToReview.map((rank) => {
                          const t = topTheorems.find((th) => th.rank === rank);
                          if (!t) return null;
                          return (
                            <Link
                              key={rank}
                              href={`/top-theorems#${rank}`}
                              className="text-xs px-3 py-1.5 bg-white rounded-full border border-purple-200 text-purple-800 hover:bg-purple-100"
                            >
                              {rank}. {t.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Homework for the day */}
                  {day.homeworkToSolve.length > 0 && (
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> תרגילים לפתור:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {day.homeworkToSolve.map((rank) => {
                          const h = topHomework.find((hw) => hw.rank === rank);
                          if (!h) return null;
                          return (
                            <Link
                              key={rank}
                              href={`/top-homework#${rank}`}
                              className="text-xs px-3 py-1.5 bg-white rounded-full border border-blue-200 text-blue-800 hover:bg-blue-100"
                            >
                              {rank}. {h.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Deliverable */}
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <div className="text-sm font-bold text-green-900 mb-1">בסוף היום אתה אמור:</div>
                    <div className="text-sm text-green-800">{day.deliverable}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Golden Rules */}
      <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6">
        <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2 text-lg">
          <Trophy className="w-5 h-5 text-amber-600" />
          כללי זהב למבחן (לזכור בעל פה)
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {goldenRules.map((r, i) => (
            <div key={i} className="tip-box">
              <div className="text-sm font-bold text-amber-900 mb-1">
                {i + 1}. {r.title}
              </div>
              <div className="text-sm text-amber-900">{r.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
