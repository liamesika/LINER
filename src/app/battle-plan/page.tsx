'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Swords,
  Clock,
  CheckCircle2,
  Circle,
  Calendar,
  BookOpen,
  Target,
  Coffee,
  Trophy,
  ExternalLink,
  GraduationCap,
  FileCheck,
  Brain,
  Sparkles,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import MathExpr from '@/components/MathExpr';
import {
  battlePlan,
  examMeta,
  goldenRules,
  getDayProgressKeys,
  type BattleDay,
} from '@/data/battle-plan-moed-b';
import { topTheorems } from '@/data/top-theorems';
import { topHomework } from '@/data/top-homework';

// ───────────────────────── helpers ─────────────────────────

function typeColor(type: string) {
  switch (type) {
    case 'theory':     return 'bg-violet-100 text-violet-700 border-violet-200';
    case 'practice':   return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'memorize':   return 'bg-pink-100 text-pink-700 border-pink-200';
    case 'simulation': return 'bg-red-100 text-red-700 border-red-200';
    case 'review':     return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'rest':       return 'bg-gray-100 text-gray-600 border-gray-200';
    default:           return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

function typeLabel(type: string) {
  const m: Record<string, string> = {
    theory: 'תיאוריה',
    practice: 'תרגול',
    memorize: 'שינון',
    simulation: 'סימולציה',
    review: 'סקירה',
    rest: 'הפסקה',
  };
  return m[type] ?? type;
}

function importanceBadge(imp: string) {
  if (imp === 'critical') return { label: 'קריטי', cls: 'bg-red-100 text-red-700 border-red-200' };
  if (imp === 'must')     return { label: 'חובה', cls: 'bg-amber-100 text-amber-700 border-amber-200' };
  return { label: 'מומלץ', cls: 'bg-gray-100 text-gray-600 border-gray-200' };
}

function useTaskTracker() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('liner-battle-plan-v2');
      if (stored) setDone(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('liner-battle-plan-v2', JSON.stringify(done));
    } catch {}
  }, [done, hydrated]);

  const toggle = useCallback((key: string) => {
    setDone((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return { done, toggle, hydrated };
}

// ───────────────────────── reusable check item ─────────────────────────

interface CheckItemProps {
  itemKey: string;
  done: boolean;
  hydrated: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

function CheckItem({ itemKey, done, hydrated, onToggle, children, className = '' }: CheckItemProps) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {hydrated ? (
        <button onClick={onToggle} className="flex-shrink-0 mt-0.5" aria-label="Toggle">
          {done ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <Circle className="w-5 h-5 text-gray-300 hover:text-gray-500" />
          )}
        </button>
      ) : (
        <Circle className="w-5 h-5 text-gray-200 flex-shrink-0 mt-0.5" />
      )}
      <div className={`flex-1 ${done ? 'opacity-50' : ''}`}>{children}</div>
    </div>
  );
}

// ───────────────────────── DayView ─────────────────────────

function DayView({
  day,
  done,
  toggle,
  hydrated,
}: {
  day: BattleDay;
  done: Record<string, boolean>;
  toggle: (k: string) => void;
  hydrated: boolean;
}) {
  type Tab = 'schedule' | 'lectures' | 'definitions' | 'theorems' | 'proofs' | 'exercises' | 'exams';

  // Determine which tabs are non-empty
  const tabs = useMemo<{ id: Tab; label: string; icon: React.ReactNode; count: number }[]>(() => {
    const t: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
      { id: 'schedule', label: 'לו"ז היום', icon: <Calendar className="w-4 h-4" />, count: day.blocks.length },
    ];
    if (day.lectures.length)        t.push({ id: 'lectures',    label: 'הרצאות',       icon: <BookOpen className="w-4 h-4" />,    count: day.lectures.length });
    if (day.definitions.length)     t.push({ id: 'definitions', label: 'הגדרות',       icon: <Brain className="w-4 h-4" />,        count: day.definitions.length });
    if (day.theorems.length)        t.push({ id: 'theorems',    label: 'משפטים',       icon: <Sparkles className="w-4 h-4" />,     count: day.theorems.length });
    if (day.proofsToMemorize.length) t.push({ id: 'proofs',     label: 'הוכחות לשנן',  icon: <Trophy className="w-4 h-4" />,       count: day.proofsToMemorize.length });
    if (day.exercises.length)       t.push({ id: 'exercises',   label: 'תרגילים',       icon: <GraduationCap className="w-4 h-4" />, count: day.exercises.length });
    if (day.pastExams.length)       t.push({ id: 'exams',       label: 'מבחני עבר',    icon: <FileCheck className="w-4 h-4" />,    count: day.pastExams.length });
    return t;
  }, [day]);

  const [activeTab, setActiveTab] = useState<Tab>('schedule');

  // Per-tab progress
  const progressByTab = useMemo(() => {
    const m: Record<Tab, { done: number; total: number }> = {
      schedule:    { done: day.blocks.filter((_, i) => done[`d${day.day}-block-${i}`]).length, total: day.blocks.length },
      lectures:    { done: day.lectures.filter((l) => done[`d${day.day}-lec-${l.number}`]).length, total: day.lectures.length },
      definitions: { done: day.definitions.filter((d) => done[`d${day.day}-def-${d.id}`]).length, total: day.definitions.length },
      theorems:    { done: day.theorems.filter((t) => done[`d${day.day}-thm-${t.id}`]).length, total: day.theorems.length },
      proofs:      { done: day.proofsToMemorize.filter((p) => done[`d${day.day}-proof-${p.topTheoremRank}`]).length, total: day.proofsToMemorize.length },
      exercises:   { done: day.exercises.filter((e) => done[`d${day.day}-ex-${e.id}`]).length, total: day.exercises.length },
      exams:       { done: day.pastExams.filter((e) => done[`d${day.day}-exam-${e.name}`]).length, total: day.pastExams.length },
    };
    return m;
  }, [day, done]);

  // Overall day progress
  const allKeys = getDayProgressKeys(day);
  const overallDone = allKeys.filter((k) => done[k]).length;
  const overallPct = allKeys.length > 0 ? Math.round((overallDone / allKeys.length) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Header banner */}
      <div className={`bg-gradient-to-l ${day.accentColor} rounded-2xl p-5 text-white shadow-md`}>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{day.emoji}</div>
            <div>
              <div className="text-xs opacity-80">{day.weekday}, {day.date}</div>
              <div className="text-2xl font-extrabold">{day.title}</div>
              <div className="text-sm opacity-90 max-w-xl mt-0.5">{day.subtitle}</div>
            </div>
          </div>
          {day.totalHours > 0 && (
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <div className="text-2xl font-extrabold">{day.totalHours}<span className="text-sm font-normal mr-1">שעות</span></div>
              <div className="text-xs opacity-80">תקציב היום</div>
            </div>
          )}
        </div>
        {/* Progress bar */}
        {hydrated && allKeys.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="opacity-90">התקדמות היום</span>
              <span className="font-bold">{overallDone}/{allKeys.length} ({overallPct}%)</span>
            </div>
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="bg-white h-full transition-all duration-500" style={{ width: `${overallPct}%` }} />
            </div>
          </div>
        )}
        <div className="mt-4 bg-white/15 backdrop-blur-sm rounded-xl p-3 text-sm">
          <div className="flex items-start gap-2">
            <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold">המטרה: </span>
              {day.goal}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-100">
          {tabs.map((t) => {
            const p = progressByTab[t.id];
            const pct = p.total > 0 ? Math.round((p.done / p.total) * 100) : 0;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 border-b-2 ${
                  isActive
                    ? 'border-violet-600 text-violet-700 bg-violet-50/50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  pct === 100 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {p.done}/{p.total}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="p-5">
          {activeTab === 'schedule' && <ScheduleTab day={day} done={done} toggle={toggle} hydrated={hydrated} />}
          {activeTab === 'lectures' && <LecturesTab day={day} done={done} toggle={toggle} hydrated={hydrated} />}
          {activeTab === 'definitions' && <DefinitionsTab day={day} done={done} toggle={toggle} hydrated={hydrated} />}
          {activeTab === 'theorems' && <TheoremsTab day={day} done={done} toggle={toggle} hydrated={hydrated} />}
          {activeTab === 'proofs' && <ProofsTab day={day} done={done} toggle={toggle} hydrated={hydrated} />}
          {activeTab === 'exercises' && <ExercisesTab day={day} done={done} toggle={toggle} hydrated={hydrated} />}
          {activeTab === 'exams' && <ExamsTab day={day} done={done} toggle={toggle} hydrated={hydrated} />}
        </div>
      </div>
    </div>
  );
}

// ───────────── Tab: Schedule ─────────────

function ScheduleTab({ day, done, toggle, hydrated }: { day: BattleDay; done: Record<string, boolean>; toggle: (k: string) => void; hydrated: boolean }) {
  return (
    <div className="space-y-2">
      {day.blocks.map((b, i) => {
        const key = `d${day.day}-block-${i}`;
        const isDone = !!done[key];
        const isRest = b.type === 'rest';
        return (
          <div
            key={i}
            className={`rounded-xl border p-4 transition-colors ${
              isRest
                ? 'bg-gray-50 border-gray-200'
                : isDone
                  ? 'bg-green-50/50 border-green-200'
                  : 'bg-white border-gray-200 hover:border-violet-300'
            }`}
          >
            <CheckItem
              itemKey={key}
              done={isDone}
              hydrated={hydrated && !isRest}
              onToggle={() => toggle(key)}
            >
              {isRest && <Coffee className="w-5 h-5 text-gray-400 inline-block ml-2 align-text-bottom" />}
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-mono text-sm font-bold text-gray-700">{b.time}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColor(b.type)}`}>
                  {typeLabel(b.type)}
                </span>
                {!isRest && b.hours > 0 && (
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {b.hours}ש
                  </span>
                )}
              </div>
              <div className={`text-base font-semibold ${isDone ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                {b.task}
              </div>
              {b.details && (
                <div className="text-sm text-gray-600 mt-1 leading-relaxed">{b.details}</div>
              )}
              {b.ref && (
                <Link
                  href={b.ref}
                  className="text-xs text-violet-600 hover:text-violet-800 mt-2 inline-flex items-center gap-1 font-medium"
                >
                  <ExternalLink className="w-3 h-3" />
                  פתחי {b.ref}
                </Link>
              )}
            </CheckItem>
          </div>
        );
      })}
    </div>
  );
}

// ───────────── Tab: Lectures ─────────────

function LecturesTab({ day, done, toggle, hydrated }: { day: BattleDay; done: Record<string, boolean>; toggle: (k: string) => void; hydrated: boolean }) {
  return (
    <div className="space-y-3">
      <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 text-sm text-blue-900">
        <strong>איך לקרוא הרצאה:</strong> פתחי את הסעיף בסיכום הראשי, קראי פעם אחת ברפרוף, ואז פעם שנייה לאט. סמני ✓ כשסיימת.
      </div>
      {day.lectures.map((l) => {
        const key = `d${day.day}-lec-${l.number}`;
        const isDone = !!done[key];
        return (
          <div key={l.number} className={`rounded-xl border p-4 ${isDone ? 'bg-green-50/40 border-green-200' : 'bg-white border-gray-200'}`}>
            <CheckItem itemKey={key} done={isDone} hydrated={hydrated} onToggle={() => toggle(key)}>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">הרצאה {l.number}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ~{l.durationMinutes} דק
                </span>
                <span className="text-xs text-gray-500">· {l.summarySection}</span>
              </div>
              <div className="text-base font-bold text-gray-900 mb-2">{l.title}</div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="text-xs font-semibold text-gray-700 mb-1.5">מה ללמוד:</div>
                <ul className="space-y-1">
                  {l.whatToLearn.map((w, j) => (
                    <li key={j} className="text-sm text-gray-800 flex items-start gap-2">
                      <span className="text-indigo-500 mt-1">●</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CheckItem>
          </div>
        );
      })}
    </div>
  );
}

// ───────────── Tab: Definitions ─────────────

function DefinitionsTab({ day, done, toggle, hydrated }: { day: BattleDay; done: Record<string, boolean>; toggle: (k: string) => void; hydrated: boolean }) {
  return (
    <div className="space-y-3">
      <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 text-sm text-blue-900">
        <strong>שינון הגדרות:</strong> קראי בקול. אז סגרי את המסך וכתבי במחברת. השווי. חזרי 3 פעמים על "קריטיות".
      </div>
      {day.definitions.map((d) => {
        const key = `d${day.day}-def-${d.id}`;
        const isDone = !!done[key];
        const imp = importanceBadge(d.importance);
        return (
          <div key={d.id} className={`rounded-xl border p-4 ${isDone ? 'bg-green-50/40 border-green-200' : 'definition-box'}`}>
            <CheckItem itemKey={key} done={isDone} hydrated={hydrated} onToggle={() => toggle(key)}>
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="font-bold text-blue-900">{d.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${imp.cls}`}>{imp.label}</span>
                <span className="text-xs text-gray-500">הרצאה {d.lectureRef}</span>
              </div>
              <div className="text-sm text-gray-800 leading-relaxed">{d.body}</div>
            </CheckItem>
          </div>
        );
      })}
    </div>
  );
}

// ───────────── Tab: Theorems ─────────────

function TheoremsTab({ day, done, toggle, hydrated }: { day: BattleDay; done: Record<string, boolean>; toggle: (k: string) => void; hydrated: boolean }) {
  return (
    <div className="space-y-3">
      <div className="bg-purple-50 rounded-xl p-3 border border-purple-100 text-sm text-purple-900">
        <strong>משפטים:</strong> זה רק <em>ניסוח</em>. אם יש כפתור "להוכחה" — זה משפט שצריך לדעת לכתוב את ההוכחה (יש דף מיוחד עם הוכחה מילה במילה).
      </div>
      {day.theorems.map((t) => {
        const key = `d${day.day}-thm-${t.id}`;
        const isDone = !!done[key];
        const imp = importanceBadge(t.importance);
        return (
          <div key={t.id} className={`rounded-xl border p-4 ${isDone ? 'bg-green-50/40 border-green-200' : 'theorem-box'}`}>
            <CheckItem itemKey={key} done={isDone} hydrated={hydrated} onToggle={() => toggle(key)}>
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="font-bold text-purple-900">{t.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${imp.cls}`}>{imp.label}</span>
                {t.requiresProof && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200 font-medium">
                    דרוש להוכיח
                  </span>
                )}
                <span className="text-xs text-gray-500">הרצאה {t.lectureRef}</span>
              </div>
              <div className="text-sm text-gray-800 leading-relaxed">{t.statement}</div>
              {t.topTheoremRank && (
                <Link
                  href={`/top-theorems#${t.topTheoremRank}`}
                  className="inline-flex items-center gap-1 text-xs text-purple-700 hover:text-purple-900 mt-2 font-semibold"
                >
                  <ExternalLink className="w-3 h-3" />
                  פתחי הוכחה מלאה (Top #{t.topTheoremRank})
                </Link>
              )}
            </CheckItem>
          </div>
        );
      })}
    </div>
  );
}

// ───────────── Tab: Proofs to Memorize ─────────────

function ProofsTab({ day, done, toggle, hydrated }: { day: BattleDay; done: Record<string, boolean>; toggle: (k: string) => void; hydrated: boolean }) {
  return (
    <div className="space-y-3">
      <div className="bg-pink-50 rounded-xl p-3 border border-pink-100 text-sm text-pink-900">
        <strong>שינון הוכחות:</strong> קראי את ההוכחה 3 פעמים, אז כתבי מהזיכרון תוך זמן יעד. אם נכשלת — קראי שוב. סמני ✓ כשהצלחת לכתוב מהזיכרון בלי שגיאות.
      </div>
      {day.proofsToMemorize.map((p) => {
        const t = topTheorems.find((th) => th.rank === p.topTheoremRank);
        if (!t) return null;
        const key = `d${day.day}-proof-${p.topTheoremRank}`;
        const isDone = !!done[key];
        return (
          <div key={p.topTheoremRank} className={`rounded-xl border-2 p-4 ${isDone ? 'bg-green-50/50 border-green-300' : 'bg-gradient-to-l from-pink-50 to-rose-50 border-pink-200'}`}>
            <CheckItem itemKey={key} done={isDone} hydrated={hydrated} onToggle={() => toggle(key)}>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-pink-600 text-white font-bold">#{p.topTheoremRank}</span>
                <span className="font-bold text-gray-900 text-base">{t.name}</span>
                <span className="text-xs text-pink-700 font-semibold">הסתברות {t.probability}%</span>
              </div>
              <div className="bg-white/70 rounded-lg p-2.5 mb-2 border border-pink-100">
                <div className="text-xs font-semibold text-gray-700 mb-1">הניסוח (מה את צריכה להוכיח):</div>
                <MathExpr block>{t.statement}</MathExpr>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-gray-700">
                  <Clock className="w-3.5 h-3.5" />
                  זמן יעד: <strong>{p.targetMinutes} דק</strong>
                </span>
                <Link
                  href={`/top-theorems#${p.topTheoremRank}`}
                  className="inline-flex items-center gap-1 text-pink-700 hover:text-pink-900 font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  פתחי הוכחה מלאה
                </Link>
              </div>
            </CheckItem>
          </div>
        );
      })}
    </div>
  );
}

// ───────────── Tab: Exercises ─────────────

function ExercisesTab({ day, done, toggle, hydrated }: { day: BattleDay; done: Record<string, boolean>; toggle: (k: string) => void; hydrated: boolean }) {
  return (
    <div className="space-y-3">
      <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 text-sm text-blue-900">
        <strong>תרגילים:</strong> נסי לבד 10-15 דק לפני שאת פותחת פתרון. אם תקועה — קראי <em>צעד אחד בלבד</em> מהפתרון, סגרי, וניסי שוב.
      </div>
      {day.exercises.map((ex) => {
        const hw = ex.topHomeworkRank ? topHomework.find((h) => h.rank === ex.topHomeworkRank) : undefined;
        const key = `d${day.day}-ex-${ex.id}`;
        const isDone = !!done[key];
        return (
          <div key={ex.id} className={`rounded-xl border p-4 ${isDone ? 'bg-green-50/40 border-green-200' : 'bg-white border-gray-200'}`}>
            <CheckItem itemKey={key} done={isDone} hydrated={hydrated} onToggle={() => toggle(key)}>
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                {hw && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold">#{hw.rank}</span>
                )}
                <span className="font-bold text-gray-900">{ex.title}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ~{ex.durationMinutes} דק
                </span>
              </div>
              {ex.description && (
                <div className="text-sm text-gray-600 mb-2">{ex.description}</div>
              )}
              {hw && (
                <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                  <div className="text-xs font-semibold text-gray-700 mb-1">השאלה:</div>
                  <div className="text-sm text-gray-800 whitespace-pre-line line-clamp-3">{hw.prompt}</div>
                  <Link
                    href={`/top-homework#${hw.rank}`}
                    className="inline-flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 mt-1.5 font-semibold"
                  >
                    <ExternalLink className="w-3 h-3" />
                    פתחי שאלה מלאה + פתרון
                  </Link>
                </div>
              )}
            </CheckItem>
          </div>
        );
      })}
    </div>
  );
}

// ───────────── Tab: Past Exams ─────────────

function ExamsTab({ day, done, toggle, hydrated }: { day: BattleDay; done: Record<string, boolean>; toggle: (k: string) => void; hydrated: boolean }) {
  return (
    <div className="space-y-3">
      <div className="warning-box">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-900">
            <strong>תנאי מבחן אמיתיים:</strong> סטופר. ללא חומר עזר. ללא הפסקות אמצע. אם תקועה ב-15 דק — דלגי ותחזרי בסוף.
          </div>
        </div>
      </div>
      {day.pastExams.map((ex) => {
        const key = `d${day.day}-exam-${ex.name}`;
        const isDone = !!done[key];
        return (
          <div key={ex.name} className={`rounded-xl border-2 p-5 ${isDone ? 'bg-green-50/50 border-green-300' : ex.isMandatory ? 'bg-gradient-to-l from-red-50 to-orange-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
            <CheckItem itemKey={key} done={isDone} hydrated={hydrated} onToggle={() => toggle(key)}>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <FileCheck className="w-5 h-5 text-red-600" />
                <span className="font-bold text-gray-900 text-lg">{ex.name}</span>
                {ex.isMandatory && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-600 text-white font-bold">חובה</span>
                )}
                <span className="text-xs text-gray-700 flex items-center gap-1 mr-auto">
                  <Clock className="w-3.5 h-3.5" />
                  {ex.durationMinutes} דק
                </span>
              </div>
              {ex.note && <div className="text-sm text-gray-700 mb-2">{ex.note}</div>}
              <Link
                href={ex.href}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                פתחי את המבחן
              </Link>
            </CheckItem>
          </div>
        );
      })}
    </div>
  );
}

// ───────────────────────── MAIN PAGE ─────────────────────────

export default function BattlePlanPage() {
  // Default to today's day if it matches
  const todayISO = new Date().toISOString().slice(0, 10);
  const matchingDay = battlePlan.findIndex((d) => d.date === todayISO);
  const initialDay = matchingDay >= 0 ? matchingDay : 0;

  const [currentDay, setCurrentDay] = useState<number>(initialDay);
  const { done, toggle, hydrated } = useTaskTracker();

  const day = battlePlan[currentDay];

  // Days from today to exam
  const examDate = new Date(examMeta.examDate);
  const today = new Date(todayISO);
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Swords className="w-6 h-6" />}
        title="תוכנית קרב — מועד ב 14.5"
        subtitle={`4 ימי לימוד עד המבחן. כל יום מסודר ב-7 קטגוריות: לו"ז, הרצאות, הגדרות, משפטים, הוכחות, תרגילים, מבחני עבר. סמני ✓ כשסיימת — ההתקדמות נשמרת.`}
        gradient="from-violet-600 to-indigo-700"
      />

      {/* Exam countdown */}
      <div className="bg-gradient-to-l from-red-500 to-orange-500 rounded-2xl p-5 text-white shadow-lg flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-7 h-7" />
          <div>
            <div className="text-sm opacity-90">המבחן ביום</div>
            <div className="text-xl font-extrabold">{examMeta.examLabel}</div>
            <div className="text-sm opacity-90">3 שעות · 5 שאלות · ענה על 4</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-extrabold">{daysLeft}</div>
          <div className="text-sm opacity-90">ימים נותרו</div>
        </div>
      </div>

      {/* Day selector — pills */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setCurrentDay(Math.max(0, currentDay - 1))}
            disabled={currentDay === 0}
            className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="flex gap-2 flex-1 overflow-x-auto">
            {battlePlan.map((d, i) => {
              const isActive = i === currentDay;
              const isToday = d.date === todayISO;
              const keys = getDayProgressKeys(d);
              const dayDone = keys.filter((k) => done[k]).length;
              const dayPct = keys.length > 0 ? Math.round((dayDone / keys.length) * 100) : 0;
              return (
                <button
                  key={d.day}
                  onClick={() => setCurrentDay(i)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-l from-violet-600 to-indigo-700 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {isToday && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                      היום
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{d.emoji}</span>
                    <div className="text-right">
                      <div className="text-xs opacity-80">{d.weekday}</div>
                      <div>יום {d.day}</div>
                    </div>
                  </div>
                  {hydrated && keys.length > 0 && (
                    <div className={`mt-1 h-1 rounded-full overflow-hidden ${isActive ? 'bg-white/30' : 'bg-gray-200'}`}>
                      <div className={`h-full ${isActive ? 'bg-white' : 'bg-violet-500'}`} style={{ width: `${dayPct}%` }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setCurrentDay(Math.min(battlePlan.length - 1, currentDay + 1))}
            disabled={currentDay === battlePlan.length - 1}
            className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Active day */}
      <DayView day={day} done={done} toggle={toggle} hydrated={hydrated} />

      {/* Golden Rules */}
      <details className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
        <summary className="p-5 cursor-pointer hover:bg-amber-50/50 transition-colors">
          <span className="font-bold text-amber-900 inline-flex items-center gap-2 text-lg">
            <Trophy className="w-5 h-5 text-amber-600" />
            8 כללי זהב למבחן (לחצי לפתיחה)
          </span>
        </summary>
        <div className="p-5 pt-0">
          <div className="grid md:grid-cols-2 gap-3">
            {goldenRules.map((r, i) => (
              <div key={i} className="tip-box">
                <div className="text-sm font-bold text-amber-900 mb-1">
                  {i + 1}. {r.title}
                </div>
                <div className="text-sm text-amber-900 leading-relaxed">{r.body}</div>
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
