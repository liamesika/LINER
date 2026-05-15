'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Square,
  BookOpen,
  GraduationCap,
  Coffee,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import {
  weekSchedule,
  courseLabels,
  courseColors,
  slotTypeMeta,
  getWeeklyHoursPerCourse,
  type ScheduleSlot,
  type Course,
  type DaySchedule,
} from '@/data/weekly-schedule';

const STORAGE_KEY = 'liner-weekly-schedule-checks-v1';

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
    if (confirm('למחוק את כל הסימונים של השבוע?')) {
      setDone({});
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  }, []);

  return { done, toggle, hydrated, clearAll };
}

function SlotRow({
  slot,
  slotKey,
  done,
  onToggle,
  hydrated,
}: {
  slot: ScheduleSlot;
  slotKey: string;
  done: boolean;
  onToggle: () => void;
  hydrated: boolean;
}) {
  const meta = slotTypeMeta[slot.type];
  const isFixed = slot.type === 'class-lecture' || slot.type === 'class-tutorial';
  const isPassive = slot.type === 'break' || slot.type === 'lunch' || slot.type === 'free' || slot.type === 'travel';
  const courseColor = slot.course ? courseColors[slot.course] : null;

  return (
    <div className={`flex items-start gap-2.5 py-1.5 px-2.5 rounded-md border-r-[3px] ${meta.cls} ${done ? 'opacity-50' : ''} transition-opacity`}>
      {/* Time */}
      <div className="font-mono text-[0.72rem] font-semibold whitespace-nowrap pt-0.5 min-w-[78px]">
        {slot.start}–{slot.end}
      </div>

      {/* Checkbox (only for active study/prep slots) */}
      {!isFixed && !isPassive && hydrated && (
        <button onClick={onToggle} className="shrink-0 mt-0.5" aria-label="סימון">
          {done ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Square className="w-4 h-4 text-slate-400 hover:text-slate-600" />}
        </button>
      )}
      {(isFixed || isPassive) && <div className="w-4 shrink-0" />}

      {/* Title + meta */}
      <div className="flex-1 min-w-0">
        <div className={`text-[0.84rem] font-semibold leading-snug ${done ? 'line-through' : ''}`}>
          {meta.emoji} {slot.title}
        </div>
        {(slot.location || slot.instructor) && (
          <div className="text-[0.7rem] mt-0.5 opacity-80 flex items-center gap-2 flex-wrap">
            {slot.location && (
              <span className="inline-flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {slot.location}</span>
            )}
            {slot.instructor && <span>· {slot.instructor}</span>}
          </div>
        )}
        {slot.note && (
          <div className="text-[0.7rem] mt-0.5 opacity-75 italic">{slot.note}</div>
        )}
      </div>

      {/* Course tag */}
      {slot.course && courseColor && (
        <div className={`text-[0.65rem] font-bold px-1.5 py-0.5 rounded ${courseColor.bg} ${courseColor.text} border ${courseColor.border} whitespace-nowrap`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${courseColor.dot} ml-1 align-middle`} />
          {courseLabels[slot.course]}
        </div>
      )}
    </div>
  );
}

function DayCard({
  day,
  isToday,
  done,
  onToggle,
  hydrated,
}: {
  day: DaySchedule;
  isToday: boolean;
  done: Record<string, boolean>;
  onToggle: (id: string) => void;
  hydrated: boolean;
}) {
  // Count total work blocks and how many done
  const workSlots = day.slots.filter((s) => s.type === 'study-hw' || s.type === 'study-review' || s.type === 'study-prep' || s.type === 'moed-g-prep');
  const workKeys = workSlots.map((s) => `d${day.dayIdx}-${s.start}`);
  const doneCount = workKeys.filter((k) => done[k]).length;
  const pct = workKeys.length > 0 ? Math.round((doneCount / workKeys.length) * 100) : 0;

  return (
    <div className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden ${isToday ? 'border-violet-500 ring-2 ring-violet-200' : 'border-slate-200'}`}>
      {/* Header */}
      <div className={`p-3 ${isToday ? 'bg-gradient-to-l from-violet-100 to-indigo-100' : 'bg-slate-50'} border-b border-slate-200`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="font-bold text-base text-slate-900">{day.dayName}</div>
            <div className="text-xs text-slate-500">{day.dateLabel}</div>
            {isToday && (
              <span className="text-[10px] bg-violet-600 text-white px-2 py-0.5 rounded-full font-bold">היום</span>
            )}
          </div>
          {workKeys.length > 0 && (
            <div className="text-xs text-slate-600 font-mono font-semibold">
              {doneCount}/{workKeys.length} ({pct}%)
            </div>
          )}
        </div>
        {day.focusOfDay && (
          <div className="text-xs text-slate-700 mt-1 italic flex items-start gap-1">
            <AlertCircle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
            {day.focusOfDay}
          </div>
        )}
      </div>

      {/* Slots */}
      <div className="p-2 space-y-1">
        {day.slots.map((slot, i) => {
          const slotKey = `d${day.dayIdx}-${slot.start}`;
          return (
            <SlotRow
              key={i}
              slot={slot}
              slotKey={slotKey}
              done={!!done[slotKey]}
              onToggle={() => onToggle(slotKey)}
              hydrated={hydrated}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function WeeklySchedulePage() {
  const { done, toggle, hydrated, clearAll } = useChecks();
  const todayIdx = new Date().getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

  const hoursPerCourse = useMemo(() => getWeeklyHoursPerCourse(), []);

  // Total work blocks done across the week
  const allWorkKeys = useMemo(() => {
    const keys: string[] = [];
    for (const day of weekSchedule) {
      for (const slot of day.slots) {
        if (slot.type === 'study-hw' || slot.type === 'study-review' || slot.type === 'study-prep' || slot.type === 'moed-g-prep') {
          keys.push(`d${day.dayIdx}-${slot.start}`);
        }
      }
    }
    return keys;
  }, []);
  const totalDone = allWorkKeys.filter((k) => done[k]).length;
  const totalPct = allWorkKeys.length > 0 ? Math.round((totalDone / allWorkKeys.length) * 100) : 0;

  return (
    <div className="space-y-5">
      <PageHeader
        icon={<Calendar className="w-6 h-6" />}
        title="לוז שבועי — סמסטר ב' + הכנה למועד ג"
        subtitle="5 קורסים פעילים (לינארית ב' · אינפי ב' · מבני נתונים · תכנות C · לוגיקה) + הכנה יומית למועד ג. סמני ✓ על כל בלוק שסיימת — נשמר בדפדפן."
        gradient="from-indigo-600 to-purple-700"
      />

      {/* Top stats */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-white border-2 border-violet-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-violet-700 font-bold uppercase tracking-wide mb-1">השלמת השבוע</div>
          <div className="text-3xl font-extrabold text-violet-700">{totalPct}%</div>
          <div className="text-xs text-slate-600 mt-1">{totalDone} / {allWorkKeys.length} בלוקי עבודה</div>
          <div className="w-full bg-violet-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-gradient-to-l from-violet-500 to-indigo-600 h-full transition-all duration-500" style={{ width: `${totalPct}%` }} />
          </div>
          <button
            onClick={clearAll}
            disabled={!hydrated || totalDone === 0}
            className="mt-3 inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            איפוס סימונים
          </button>
        </div>

        <div className="bg-white border-2 border-amber-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-amber-700 font-bold uppercase tracking-wide mb-2">שעות שבועיות לפי קורס</div>
          <div className="space-y-1">
            {(Object.keys(hoursPerCourse) as Course[]).map((course) => {
              const hours = hoursPerCourse[course];
              const color = courseColors[course];
              const pctOfMax = Math.min(100, (hours / 10) * 100);
              return (
                <div key={course} className="flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${color.dot} shrink-0`} />
                  <span className="text-xs text-slate-700 flex-1 truncate">{courseLabels[course]}</span>
                  <span className="text-xs font-mono font-semibold text-slate-800">{hours.toFixed(1)}ש'</span>
                  <div className="w-16 bg-slate-100 rounded-full h-1 overflow-hidden">
                    <div className={`h-full ${color.dot}`} style={{ width: `${pctOfMax}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 text-xs">
        <div className="font-bold text-slate-700 mb-2 flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> מקרא</div>
        <div className="flex flex-wrap gap-2">
          {(['class-lecture', 'class-tutorial', 'moed-g-prep', 'study-hw', 'study-review', 'study-prep', 'break', 'lunch', 'travel', 'free'] as const).map((t) => {
            const m = slotTypeMeta[t];
            return (
              <span key={t} className={`text-[0.7rem] font-semibold px-2 py-0.5 rounded-full border ${m.cls}`}>
                {m.emoji} {m.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Days */}
      <div className="space-y-3">
        {weekSchedule.map((day) => (
          <DayCard
            key={day.dayIdx}
            day={day}
            isToday={day.dayIdx === todayIdx}
            done={done}
            onToggle={toggle}
            hydrated={hydrated}
          />
        ))}
      </div>

      {/* How to use */}
      <div className="bg-gradient-to-l from-violet-50 to-indigo-50 rounded-xl border border-violet-200 p-4">
        <h3 className="font-bold text-violet-900 mb-2 flex items-center gap-2"><Clock className="w-4 h-4" /> איך להשתמש בלוז</h3>
        <ol className="text-sm text-violet-900 space-y-1 pr-5" style={{ listStyleType: 'decimal' }}>
          <li><strong>בלוקי הרצאה/תרגול</strong> (כחול/סגול): קבועים, אי-אפשר להזיז. תגיעי בזמן.</li>
          <li><strong>בלוק מועד ג</strong> (אדום): 1.5 שעות יומיות לפי <a href="/battle-plan" className="underline">תוכנית הקרב</a>.</li>
          <li><strong>בלוקי HW + סקירה</strong> (כחול בהיר/ציאן): סמני ✓ כשסיימת.</li>
          <li><strong>הפסקות / ארוחות</strong> (אפור): קבועות — חשובות לריכוז.</li>
          <li><strong>שבת</strong>: מנוחה אקטיבית. אל תרגישי אשמה לדלג.</li>
          <li>אם פספסת בלוק — תוכלי לדחות לחלון "חופשי" בערב.</li>
        </ol>
      </div>
    </div>
  );
}
