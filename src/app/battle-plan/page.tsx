'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Swords,
  Calendar,
  CheckCircle2,
  Square,
  RotateCcw,
  Target,
  ClipboardCheck,
  BarChart3,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import {
  battlePlanG,
  moedGDailyFocus,
  moedGExamSignals,
  moedGFocusDrills,
  moedGSkillTracks,
  getAllTaskIds,
  type Block,
  type DayBlock,
  type PhaseBlock,
  type CheckpointBlock,
  type WeekBlock,
  type TipBlock,
  type PhaseColor,
  type DayType,
  type TopicTag,
} from '@/data/battle-plan-moed-g';

const EXAM_DATE = '2026-06-15';
const STORAGE_KEY = 'liner-battle-plan-moed-g-v1';
const LEVEL_STORAGE_KEY = 'liner-battle-plan-moed-g-levels-v1';

// ─── Phase color map ───
const phaseColor: Record<PhaseColor, string> = {
  foundation: 'bg-teal-600',
  build:      'bg-violet-700',
  advanced:   'bg-orange-700',
  review:     'bg-sky-700',
  exams:      'bg-pink-700',
  'exam-day': 'bg-red-600',
};

// ─── Day card color ───
const dayBorderColor: Record<DayType, string> = {
  study:      'border-r-indigo-500',
  rest:       'border-r-slate-400',
  review:     'border-r-sky-600',
  exam:       'border-r-red-500',
  'exam-day': 'border-r-red-600',
};

const dayBgColor: Record<DayType, string> = {
  study:      'bg-white',
  rest:       'bg-slate-50',
  review:     'bg-sky-50/50',
  exam:       'bg-red-50/50',
  'exam-day': 'bg-gradient-to-l from-red-50 to-amber-50',
};

const topicColor: Record<TopicTag, string> = {
  def:    'text-blue-700',
  thm:    'text-green-700',
  hw:     'text-orange-700',
  review: 'text-sky-700',
  exam:   'text-red-700',
  rest:   'text-slate-500',
};

const signalColor = {
  danger: 'border-red-300 bg-red-50 text-red-950',
  warning: 'border-amber-300 bg-amber-50 text-amber-950',
  good: 'border-emerald-300 bg-emerald-50 text-emerald-950',
};

// ─── localStorage hook ───
function useChecks() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {}
  }, [done, hydrated]);

  const toggle = useCallback((id: string) => {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const clearAll = useCallback(() => {
    if (confirm('למחוק את כל הסימונים? פעולה זו לא ניתנת לביטול.')) {
      setDone({});
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  }, []);

  return { done, toggle, hydrated, clearAll };
}

function useLevels() {
  const [levels, setLevels] = useState<Record<string, number>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LEVEL_STORAGE_KEY);
      if (raw) setLevels(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LEVEL_STORAGE_KEY, JSON.stringify(levels));
    } catch {}
  }, [levels, hydrated]);

  const setLevel = useCallback((id: string, level: number) => {
    setLevels((prev) => ({ ...prev, [id]: level }));
  }, []);

  return { levels, setLevel, hydrated };
}

// ─── Components ───

function Checkbox({ checked, onClick, hydrated }: { checked: boolean; onClick: () => void; hydrated: boolean }) {
  if (!hydrated) {
    return <Square className="w-4 h-4 text-slate-300 shrink-0 mt-1" />;
  }
  return (
    <button onClick={onClick} className="shrink-0 mt-1" aria-label="סימון">
      {checked ? (
        <CheckCircle2 className="w-4 h-4 text-green-600" />
      ) : (
        <Square className="w-4 h-4 text-slate-400 hover:text-slate-600" />
      )}
    </button>
  );
}

function PhaseHeader({ b }: { b: PhaseBlock }) {
  return (
    <div className={`${phaseColor[b.color]} text-white px-4 py-3 rounded-lg mt-6 mb-3 flex justify-between items-center flex-wrap gap-2 shadow-sm`}>
      <div className="font-bold text-base flex items-center gap-2">
        <span className="text-xl">{b.emoji}</span>
        {b.title}
      </div>
      <div className="text-xs opacity-92 font-medium">{b.subtitle}</div>
    </div>
  );
}

function CheckpointCard({ b }: { b: CheckpointBlock }) {
  return (
    <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-3.5 my-3">
      <div className="font-bold text-amber-800 text-sm mb-1 font-rubik">{b.title}</div>
      <div className="text-sm text-amber-900" dangerouslySetInnerHTML={{ __html: b.body }} />
    </div>
  );
}

function WeekTitle({ b }: { b: WeekBlock }) {
  return (
    <div className="bg-violet-100 border-r-2 border-violet-700 text-violet-900 px-3 py-1.5 rounded text-sm font-bold my-2.5">
      {b.title}
    </div>
  );
}

function DayCard({ b, checks, toggle, hydrated, isToday }: { b: DayBlock; checks: Record<string, boolean>; toggle: (id: string) => void; hydrated: boolean; isToday: boolean }) {
  const doneCount = b.tasks.filter((t) => checks[t.id]).length;
  const allDone = b.tasks.length > 0 && doneCount === b.tasks.length;
  return (
    <div
      className={`${dayBgColor[b.type]} ${dayBorderColor[b.type]} border border-slate-200 border-r-[3px] rounded-md px-3.5 py-2.5 my-1.5 grid gap-3 ${isToday ? 'ring-2 ring-violet-500 ring-offset-1' : ''}`}
      style={{ gridTemplateColumns: '90px 1fr auto' }}
    >
      <div className="font-mono text-xs font-semibold text-slate-600">
        {b.date}
        <span className="block text-[10px] text-slate-400 font-rubik mt-0.5 font-medium">יום {b.dayNum}</span>
        {isToday && <span className="inline-block text-[9px] bg-violet-600 text-white px-1.5 py-0.5 rounded mt-1 font-bold">היום</span>}
      </div>
      <div className="min-w-0">
        <div className={`font-bold text-sm ${topicColor[b.topicType]} mb-1`}>
          {allDone && '✓ '}
          {b.topic}
        </div>
        {b.tasks.length > 0 && (
          <ul className="space-y-0.5">
            {b.tasks.map((t) => {
              const checked = !!checks[t.id];
              return (
                <li key={t.id} className="flex items-start gap-2">
                  <Checkbox checked={checked} onClick={() => toggle(t.id)} hydrated={hydrated} />
                  <span
                    className={`text-[0.82rem] leading-relaxed ${checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}
                    dangerouslySetInnerHTML={{ __html: t.text }}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className={`font-mono text-[0.7rem] font-semibold px-2 py-0.5 rounded-full self-center whitespace-nowrap ${b.type === 'exam' || b.type === 'exam-day' ? 'bg-red-200 text-red-900' : 'bg-slate-100 text-slate-600'}`}>
        {b.hours}
      </div>
    </div>
  );
}

function TipCard({ b }: { b: TipBlock }) {
  return (
    <div className="bg-emerald-50 border-r-2 border-emerald-500 rounded-md px-3.5 py-2 my-1.5 text-[0.82rem] text-emerald-900" dangerouslySetInnerHTML={{ __html: b.body }} />
  );
}

function ExamAnalysis() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-5 h-5 text-red-600" />
        <h2 className="font-extrabold text-slate-900">ניתוח מועד א + מועד ב השנה</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {moedGExamSignals.map((signal) => (
          <div key={signal.title} className={`rounded-lg border p-3 ${signalColor[signal.tone]}`}>
            <div className="font-bold text-sm mb-1">{signal.title}</div>
            <p className="text-xs leading-relaxed">{signal.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FocusDrills() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
      <div className="flex items-center gap-2 mb-3">
        <ClipboardCheck className="w-5 h-5 text-violet-700" />
        <h2 className="font-extrabold text-slate-900">רשימת תרגילים להשקעה נוספת</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-3">
        {moedGFocusDrills.map((drill) => (
          <article key={drill.rank} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-slate-900">
                  #{drill.rank} {drill.title}
                </div>
                <div className="text-[0.72rem] text-slate-500 mt-0.5">{drill.source}</div>
              </div>
              <span className="shrink-0 rounded-full bg-violet-100 text-violet-800 px-2 py-0.5 text-[0.7rem] font-bold">
                {drill.extraTime}
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mt-2">{drill.why}</p>
            <p className="text-xs text-violet-900 leading-relaxed mt-2 bg-white border border-violet-100 rounded-md p-2">
              <strong>מדד הצלחה:</strong> {drill.target}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DailyFocusCard({ todayISO }: { todayISO: string }) {
  const current = moedGDailyFocus.find((day) => day.id.endsWith(todayISO));

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-5 h-5 text-sky-700" />
        <h2 className="font-extrabold text-slate-900">משימות יומיות: 90 דקות נטו השבוע</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-3">
        {moedGDailyFocus.map((day) => {
          const isCurrent = current?.id === day.id;
          return (
            <article key={day.id} className={`rounded-lg border p-3 ${isCurrent ? 'border-sky-400 bg-sky-50' : 'border-slate-200 bg-white'}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="text-xs font-mono text-slate-500">{day.date}</div>
                  <div className="text-sm font-extrabold text-slate-900">{day.title}</div>
                </div>
                <span className="rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-[0.7rem] font-bold">{day.minutes}</span>
              </div>
              <ul className="space-y-1">
                {day.tasks.map((task) => (
                  <li key={task} className="text-xs leading-relaxed text-slate-700 flex gap-2">
                    <span className="text-sky-700 font-bold">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 rounded-md bg-slate-50 border border-slate-200 p-2 text-xs font-semibold text-slate-700">
                {day.scoreTarget}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function LevelTracker({ levels, setLevel, hydrated }: { levels: Record<string, number>; setLevel: (id: string, level: number) => void; hydrated: boolean }) {
  const average = moedGSkillTracks.length
    ? moedGSkillTracks.reduce((sum, track) => sum + (levels[track.id] ?? 0), 0) / moedGSkillTracks.length
    : 0;
  const readiness = Math.round((average / 3) * 100);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-700" />
          <h2 className="font-extrabold text-slate-900">מעקב רמה מדויק</h2>
        </div>
        <div className="text-sm font-extrabold text-emerald-700">{readiness}% מוכנות לפי סימון עצמי</div>
      </div>
      <div className="space-y-3">
        {moedGSkillTracks.map((track) => {
          const level = levels[track.id] ?? 0;
          return (
            <article key={track.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="grid md:grid-cols-[1fr_auto] gap-3">
                <div>
                  <div className="text-sm font-extrabold text-slate-900">{track.title}</div>
                  <p className="text-xs text-slate-600 mt-1">{track.evidence}</p>
                  <p className="text-xs text-slate-700 mt-1"><strong>עולה רמה כש:</strong> {track.nextThreshold}</p>
                </div>
                <div className="flex items-center gap-1 self-start" aria-label={`רמה עבור ${track.title}`}>
                  {[0, 1, 2, 3].map((value) => (
                    <button
                      key={value}
                      type="button"
                      disabled={!hydrated}
                      onClick={() => setLevel(track.id, value)}
                      className={`w-9 h-8 rounded-md border text-xs font-bold transition-colors ${
                        level === value
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-400'
                      } disabled:opacity-40`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// ─── Main Page ───

export default function BattlePlanPage() {
  const { done, toggle, hydrated, clearAll } = useChecks();
  const levelState = useLevels();

  const todayISO = new Date().toISOString().slice(0, 10);
  const examDate = new Date(EXAM_DATE);
  const today = new Date(todayISO);
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Compute total progress
  const allTaskIds = useMemo(() => getAllTaskIds(), []);
  const totalDone = useMemo(() => allTaskIds.filter((id) => done[id]).length, [allTaskIds, done]);
  const totalPct = allTaskIds.length > 0 ? Math.round((totalDone / allTaskIds.length) * 100) : 0;

  // Determine today's day number based on date
  const todayDayNum = useMemo(() => {
    // Plan starts May 13, 2026
    const start = new Date('2026-05-13');
    const diffMs = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
    return diffDays >= 1 && diffDays <= 34 ? diffDays : null;
  }, [today]);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Swords className="w-6 h-6" />}
        title="תוכנית קרב — מועד ג 15.6"
        subtitle="33 ימים · 5 פאזות · 1.5-2 שעות/יום. סמני ✓ כל משימה — נשמר אוטומטית בדפדפן."
        gradient="from-violet-600 to-indigo-700"
      />

      {/* Top stats banner */}
      <div className="grid md:grid-cols-3 gap-3">
        <div className="bg-gradient-to-l from-red-500 to-orange-500 rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center gap-2 text-xs opacity-90 mb-1">
            <Calendar className="w-4 h-4" />
            המבחן ביום
          </div>
          <div className="text-base font-extrabold">יום ב׳, 15 ביוני 2026</div>
          <div className="text-3xl font-extrabold mt-1">{daysLeft} <span className="text-sm font-medium opacity-90">ימים</span></div>
        </div>

        <div className="bg-white border-2 border-violet-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-violet-700 font-bold uppercase tracking-wide mb-1">התקדמות כוללת</div>
          <div className="text-3xl font-extrabold text-violet-700">{totalPct}%</div>
          <div className="text-xs text-slate-600 mt-1">{totalDone} / {allTaskIds.length} משימות</div>
          <div className="w-full bg-violet-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-gradient-to-l from-violet-500 to-indigo-600 h-full transition-all duration-500" style={{ width: `${totalPct}%` }} />
          </div>
        </div>

        <div className="bg-white border-2 border-amber-200 rounded-xl p-4 shadow-sm flex flex-col">
          <div className="text-xs text-amber-700 font-bold uppercase tracking-wide mb-1">פעולות</div>
          <button
            onClick={clearAll}
            disabled={!hydrated || totalDone === 0}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            נקי את כל הסימונים
          </button>
          <div className="text-[0.7rem] text-slate-500 mt-auto pt-2">הסימונים נשמרים בדפדפן (localStorage)</div>
        </div>
      </div>

      <ExamAnalysis />
      <FocusDrills />
      <DailyFocusCard todayISO={todayISO} />
      <LevelTracker levels={levelState.levels} setLevel={levelState.setLevel} hydrated={levelState.hydrated} />

      {/* Plan blocks */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6">
        {battlePlanG.map((b: Block) => {
          switch (b.kind) {
            case 'phase':
              return <PhaseHeader key={b.id} b={b} />;
            case 'checkpoint':
              return <CheckpointCard key={b.id} b={b} />;
            case 'week':
              return <WeekTitle key={b.id} b={b} />;
            case 'day':
              return <DayCard key={b.id} b={b} checks={done} toggle={toggle} hydrated={hydrated} isToday={b.dayNum === todayDayNum} />;
            case 'tip':
              return <TipCard key={b.id} b={b} />;
            default:
              return null;
          }
        })}
      </div>

      {/* Bottom — final encouragement */}
      <div className="bg-gradient-to-l from-violet-600 to-indigo-700 rounded-2xl p-5 text-white text-center shadow-md">
        <div className="text-lg font-extrabold mb-1">את יכולה לעשות את זה 💪</div>
        <div className="text-sm opacity-90">33 ימים. צעד אחר צעד. סימון אחר סימון. ב-15.6 תהיי מוכנה.</div>
      </div>
    </div>
  );
}
