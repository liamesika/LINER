'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle2,
  Square,
  Car,
  Coffee,
  Dumbbell,
  BookOpen,
  GraduationCap,
  Flame,
  Star,
  AlertTriangle,
  RotateCcw,
  Zap,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';

// ─── Types ────────────────────────────────────────────────────────────────────

type SlotType =
  | 'travel'
  | 'appointment'
  | 'club'
  | 'break'
  | 'study-proof'
  | 'study-hw'
  | 'study-mock'
  | 'study-review'
  | 'exam'
  | 'morning-home'
  | 'sleep';

interface Slot {
  start: string;
  end: string;
  type: SlotType;
  title: string;
  note?: string;
  location?: string;
  checkable?: boolean;
  proofTag?: string; // e.g. "rank-nullity"
}

interface Day {
  dayIdx: number; // JS getDay(): 1=Mon,2=Tue,...,5=Fri
  dayName: string;
  dateLabel: string;
  focusOfDay: string;
  examDay?: boolean;
  slots: Slot[];
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const slotMeta: Record<SlotType, { cls: string; emoji: string; label: string }> = {
  travel:       { cls: 'bg-slate-50 border-slate-300 text-slate-700',     emoji: '🚗', label: 'נסיעה' },
  appointment:  { cls: 'bg-amber-50 border-amber-400 text-amber-900',     emoji: '📍', label: 'פגישה' },
  club:         { cls: 'bg-purple-50 border-purple-400 text-purple-900',  emoji: '🏋️', label: 'מועדון' },
  break:        { cls: 'bg-slate-50 border-slate-200 text-slate-500',     emoji: '☕', label: 'הפסקה' },
  'study-proof':{ cls: 'bg-red-50 border-red-400 text-red-900',           emoji: '✍️', label: 'הוכחות' },
  'study-hw':   { cls: 'bg-blue-50 border-blue-400 text-blue-900',        emoji: '📝', label: 'תרגיל בית' },
  'study-mock': { cls: 'bg-emerald-50 border-emerald-500 text-emerald-900', emoji: '🎯', label: 'מבחן דמיה' },
  'study-review':{ cls: 'bg-indigo-50 border-indigo-400 text-indigo-900', emoji: '🔁', label: 'חזרה' },
  exam:         { cls: 'bg-rose-100 border-rose-600 text-rose-900 font-bold', emoji: '🏆', label: 'מבחן' },
  'morning-home':{ cls: 'bg-green-50 border-green-400 text-green-900',    emoji: '🌅', label: 'בית' },
  sleep:        { cls: 'bg-slate-100 border-slate-200 text-slate-400',    emoji: '😴', label: 'שינה' },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const days: Day[] = [
  // ─── MONDAY June 8 ───
  {
    dayIdx: 1,
    dayName: 'יום שני',
    dateLabel: '8.6.2026',
    focusOfDay: 'det(AB) הוכחה · Null(A)=Null(AᵀA) · שיחה עם מרצה',
    slots: [
      { start: '08:00', end: '11:30', type: 'morning-home', checkable: true,
        title: 'בית — rank-nullity + שקילויות הפיכות',
        note: 'שעה: rank-nullity מהזיכרון (ידיים ריקות). שעה: NulA כת"מ + הגדרות. שעה: 8 שקילויות הפיכות — כתבי אותן רצופות.' },
      { start: '11:30', end: '12:00', type: 'travel', title: 'נסיעה לג\'ל' },
      { start: '12:00', end: '12:45', type: 'appointment', title: 'ג\'ל' },
      { start: '12:45', end: '14:30', type: 'travel', title: 'נסיעה לאוניברסיטה' },
      { start: '14:30', end: '15:10', type: 'appointment', checkable: true,
        title: 'פגישה עם מרצה — 40 דקות',
        location: 'אוניברסיטה',
        note: 'לשאול: מה הפורמט המדויק של שאלת ההוכחה? האם נדרשת הגדרה לפני הוכחה? כמה נקודות לכל שאלה?' },
      { start: '15:10', end: '18:20', type: 'study-proof', checkable: true,
        title: 'הוכחה: det(AB) = det(A)·det(B)',
        location: 'אוניברסיטה',
        note: '45 דק: קרי את הוכחת 2 המקרים (B הפיכה / לא הפיכה). 60 דק: כתבי את ההוכחה מהזיכרון. 60 דק: HW11 Q1 — det מעל Z₅ + HW12 Q3 — בלוקים.',
        proofTag: 'det(AB)' },
      { start: '18:20', end: '18:30', type: 'break', title: 'הפסקה' },
      { start: '18:30', end: '20:30', type: 'club', title: 'מועדון' },
      { start: '20:30', end: '22:15', type: 'study-proof', checkable: true,
        title: 'הוכחה: AB=Iₙ ⇒ BA=Iₙ (W_k)',
        note: '30 דק: קרי את שרשרת W_k ב-top-homework. 45 דק: כתבי את כל 6 הצעדים מהזיכרון. 30 דק: בדוק מול המקור + תקני.',
        proofTag: 'AB=I→BA=I' },
      { start: '22:15', end: '23:45', type: 'study-proof', checkable: true,
        title: 'Null(A) = Null(AᵀA) — שני הכיוונים',
        note: 'כיוון א: Nul(A)⊆Nul(AᵀA). כיוון ב: xᵀAᵀAx=0 → ‖Ax‖²=0 → Ax=0. יישום: rank(A)=rank(AᵀA) לפי rank-nullity.',
        proofTag: 'Null(AᵀA)' },
      { start: '23:45', end: '00:00', type: 'sleep', title: 'סגירה ושינה' },
    ],
  },

  // ─── TUESDAY June 9 ───
  {
    dayIdx: 2,
    dayName: 'יום שלישי',
    dateLabel: '9.6.2026',
    focusOfDay: 'כל 5 ההוכחות ביד ריקה — ממוחשבת · Top HW חישובי',
    slots: [
      { start: '07:00', end: '08:00', type: 'travel', title: 'נסיעה לאוניברסיטה' },
      { start: '08:00', end: '10:30', type: 'study-proof', checkable: true,
        title: '5 הוכחות מהזיכרון — ממוחשבת',
        location: 'אוניברסיטה',
        note: '25 דק לכל הוכחה. סדר: (1) rank-nullity (2) det(AB) (3) AB=I⇒BA=I (4) שקילויות הפיכות — 3 זוגות (5) Null(AᵀA). אחרי כל אחת: ציין מה שגוי.' },
      { start: '10:30', end: '10:45', type: 'break', title: 'הפסקה' },
      { start: '10:45', end: '13:00', type: 'study-hw', checkable: true,
        title: 'Top HW חישובי — מערכות + הפיכות',
        location: 'אוניברסיטה',
        note: 'Top HW #1: מערכת פרמטרית — סווגי 0/1/∞ ותני פתרון כללי. Top HW #2: הופכי 3×3 מעל Z₇. HW9 Q4: הפיכות מעל Z_p.' },
      { start: '13:00', end: '14:00', type: 'break', title: 'ארוחת צהריים' },
      { start: '14:00', end: '16:30', type: 'study-hw', checkable: true,
        title: 'Top HW — rank-nullity + מימדים',
        location: 'אוניברסיטה',
        note: 'Top HW #3: מצאי בסיס ל-Nul(A) + Col(A) + אמתי rank-nullity. Top HW #7: dim(U∩W) כאשר dim U=dim W=n−1, U≠W — כל 4 הצעדים.' },
      { start: '16:30', end: '16:45', type: 'break', title: 'הפסקה' },
      { start: '16:45', end: '18:30', type: 'study-hw', checkable: true,
        title: 'det חישובי — HW11 + HW12',
        location: 'אוניברסיטה',
        note: 'HW11 Q3: הוכח/הפרך על det. HW12 Q2: det תלת-אלכסונית = n+1 (אינדוקציה). לסמן כל פעולת שורה בצד.' },
      { start: '18:30', end: '19:00', type: 'break', title: 'ארוחה + מנוחה' },
      { start: '19:00', end: '21:00', type: 'study-mock', checkable: true,
        title: 'מבחן דמיה — 2 שאלות בתנאי מבחן',
        location: 'אוניברסיטה',
        note: 'בחרי 2 שאלות מ-mock-exams. ממוחשבת — 45 דק לשאלה. לא לפתוח חומר עד הסוף. אחר כך בדקי ותקני.',
        proofTag: 'mock' },
    ],
  },

  // ─── WEDNESDAY June 10 ───
  {
    dayIdx: 3,
    dayName: 'יום רביעי',
    dateLabel: '10.6.2026',
    focusOfDay: 'LD⟺vⱼ∈span · מבחנים ישנים · מבחן דמיה מלא',
    slots: [
      { start: '07:00', end: '08:00', type: 'travel', title: 'נסיעה לאוניברסיטה' },
      { start: '08:00', end: '10:00', type: 'study-proof', checkable: true,
        title: 'LD ⟺ vⱼ ∈ span{v₁,...,vⱼ₋₁} + Row rank = Col rank',
        location: 'אוניברסיטה',
        note: '50 דק: LD ↔ vⱼ∈span — שני הכיוונים. 50 דק: Row rank = Col rank = rank(A) — הוכחה מהזיכרון. שני הנושאים האלה לא נשאלו אצלך.',
        proofTag: 'LD-char + RowRank' },
      { start: '10:00', end: '10:15', type: 'break', title: 'הפסקה' },
      { start: '10:15', end: '13:00', type: 'study-mock', checkable: true,
        title: 'מבחנים ישנים — מועד ב 2024 + מועד ב 2023',
        location: 'אוניברסיטה',
        note: 'ממוחשבת: בחרי שתי שאלות הוכחה מכל מבחן. בדקי כמה זמן לוקח. אל תסתכלי בפתרון לפני שתגמרי.' },
      { start: '13:00', end: '14:00', type: 'break', title: 'ארוחת צהריים' },
      { start: '14:00', end: '17:00', type: 'study-proof', checkable: true,
        title: 'כל 6 ההוכחות רצופות — ממוחשבת מלאה',
        location: 'אוניברסיטה',
        note: 'סדר לפי עדיפות: rank-nullity → det(AB) → AB=I→BA=I → שקילויות → Null(AᵀA) → LD-char. 25–30 דק כל אחת. תזמני.' },
      { start: '17:00', end: '17:30', type: 'break', title: 'הפסקה + אוויר' },
      { start: '17:30', end: '20:30', type: 'study-mock', checkable: true,
        title: 'מבחן דמיה מלא — 4 שאלות · 3 שעות',
        location: 'אוניברסיטה',
        note: 'בחרי מבחן מ-mock-exams. 45 דק לשאלה. תנאי מבחן אמיתיים — אין חומר. אחרי 3 שעות: בדקי וסמני מה חסר.',
        proofTag: 'mock-full' },
      { start: '20:30', end: '21:00', type: 'study-review', checkable: true,
        title: 'סגירה: 3 חולשות למחר',
        location: 'אוניברסיטה',
        note: 'כתבי 3 דברים: (א) הוכחה שלא יצאה חלקה. (ב) שגיאה חישובית שחזרה. (ג) הגדרה שאת לא בטוחה בה. זה מה שעובדים עליו מחר.' },
    ],
  },

  // ─── THURSDAY June 11 ───
  {
    dayIdx: 4,
    dayName: 'יום חמישי',
    dateLabel: '11.6.2026',
    focusOfDay: 'יום קל — רק חולשות · שינה מוקדמת',
    slots: [
      { start: '08:00', end: '10:00', type: 'study-review', checkable: true,
        title: 'QUICK_REFERENCE — כל 6 הוכחות בעיניים',
        note: 'פתחי את QUICK_REFERENCE_6_PROOFS.md. קראי בלי לכתוב. ציינו לעצמך: "את זה יודעת / זה פחות בטוחה".' },
      { start: '10:00', end: '10:15', type: 'break', title: 'הפסקה' },
      { start: '10:15', end: '12:30', type: 'study-proof', checkable: true,
        title: 'רק ההוכחות שלא יצאו חלקות — כותבת פעם אחת',
        note: 'לא לחזור על מה שיש בשליטה. רק את מה שסימנת אתמול כחלש — כותבת אותה פעם אחת לאט ובניקיון.' },
      { start: '12:30', end: '13:30', type: 'break', title: 'ארוחת צהריים ומנוחה' },
      { start: '13:30', end: '15:00', type: 'study-review', checkable: true,
        title: 'הגדרות must-memorize — פלאשקארד קצר',
        note: 'NulA, ColA, מטריצה אלמנטרית, rank(A), מטריצה הפיכה, det (אקסיומטי). בדקי שאת יכולה לכתוב כל אחת ב-2 שורות.' },
      { start: '15:00', end: '16:00', type: 'break', title: 'הפסקה / טיול קצר' },
      { start: '16:00', end: '17:30', type: 'study-review', checkable: true,
        title: 'מבחן עצמי בעל-פה — 5 שאלות',
        note: '(1) מה rank-nullity? תנסחי. (2) כתבי det(AB) — רק המבנה. (3) מה W_k? (4) Null(AᵀA) — הסבירי בעל-פה. (5) LD ↔ vⱼ∈span — מה הכיוון הקל?' },
      { start: '17:30', end: '21:00', type: 'break', title: 'מנוחה — לא לוגעת בחומר' },
      { start: '21:00', end: '00:00', type: 'sleep', title: 'שינה מוקדמת — חובה' },
    ],
  },

  // ─── FRIDAY June 12 — EXAM ───
  {
    dayIdx: 5,
    dayName: 'יום שישי',
    dateLabel: '12.6.2026',
    focusOfDay: 'יום המבחן',
    examDay: true,
    slots: [
      { start: '??:??', end: '??:??', type: 'exam',
        title: 'מבחן לינארית מועד ג',
        note: '5 שאלות — עונים על 4. 3 שעות. 25 נקודות לשאלה. ללא חומר עזר.' },
    ],
  },
];

// ─── Storage ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'liner-exam-week-v1';

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
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(done)); } catch {}
  }, [done, hydrated]);

  const toggle = useCallback((id: string) => {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const clearAll = useCallback(() => {
    if (confirm('למחוק את כל הסימונים?')) {
      setDone({});
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  }, []);

  return { done, toggle, hydrated, clearAll };
}

// ─── Countdown ────────────────────────────────────────────────────────────────

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const examDate = new Date('2026-06-12T09:00:00'); // assume 9am exam

    const tick = () => {
      const now = new Date();
      const diff = examDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ days, hours, minutes });
    };

    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

// ─── Components ───────────────────────────────────────────────────────────────

function SlotRow({
  slot,
  slotKey,
  done,
  onToggle,
  hydrated,
}: {
  slot: Slot;
  slotKey: string;
  done: boolean;
  onToggle: () => void;
  hydrated: boolean;
}) {
  const meta = slotMeta[slot.type];
  const isPassive = !slot.checkable;

  return (
    <div className={`flex items-start gap-2.5 py-2 px-3 rounded-lg border-r-4 ${meta.cls} ${done ? 'opacity-40' : ''} transition-opacity`}>
      {/* Time */}
      <div className="font-mono text-[0.7rem] font-bold whitespace-nowrap pt-0.5 min-w-[80px] text-inherit opacity-80">
        {slot.start}–{slot.end}
      </div>

      {/* Checkbox */}
      {slot.checkable && hydrated ? (
        <button onClick={onToggle} className="shrink-0 mt-0.5" aria-label="סימון">
          {done
            ? <CheckCircle2 className="w-4 h-4 text-green-600" />
            : <Square className="w-4 h-4 text-slate-400 hover:text-slate-600" />}
        </button>
      ) : (
        <div className="w-4 shrink-0" />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className={`text-[0.85rem] font-semibold leading-snug ${done ? 'line-through' : ''}`}>
          {meta.emoji} {slot.title}
        </div>
        {slot.location && (
          <div className="text-[0.68rem] mt-0.5 opacity-70 flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5" /> {slot.location}
          </div>
        )}
        {slot.note && (
          <div className="text-[0.7rem] mt-0.5 opacity-75 leading-relaxed">{slot.note}</div>
        )}
      </div>

      {/* Proof tag */}
      {slot.proofTag && (
        <div className="text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full bg-rose-600 text-white whitespace-nowrap shrink-0">
          {slot.proofTag}
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
  day: Day;
  isToday: boolean;
  done: Record<string, boolean>;
  onToggle: (id: string) => void;
  hydrated: boolean;
}) {
  const checkableSlots = day.slots.filter((s) => s.checkable);
  const keys = checkableSlots.map((s) => `d${day.dayIdx}-${s.start}`);
  const doneCount = keys.filter((k) => done[k]).length;
  const pct = keys.length > 0 ? Math.round((doneCount / keys.length) * 100) : 0;

  const headerCls = day.examDay
    ? 'bg-gradient-to-l from-rose-100 to-rose-50'
    : isToday
      ? 'bg-gradient-to-l from-violet-100 to-indigo-100'
      : 'bg-slate-50';

  const borderCls = day.examDay
    ? 'border-rose-500 ring-2 ring-rose-200'
    : isToday
      ? 'border-violet-500 ring-2 ring-violet-200'
      : 'border-slate-200';

  return (
    <div className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden ${borderCls}`}>
      {/* Header */}
      <div className={`p-3 ${headerCls} border-b border-slate-200`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-base text-slate-900">{day.dayName}</span>
            <span className="text-xs text-slate-500 font-mono">{day.dateLabel}</span>
            {isToday && (
              <span className="text-[10px] bg-violet-600 text-white px-2 py-0.5 rounded-full font-bold">היום</span>
            )}
            {day.examDay && (
              <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold">מבחן</span>
            )}
          </div>
          {keys.length > 0 && (
            <span className="text-xs font-mono font-bold text-slate-700">
              {doneCount}/{keys.length} ({pct}%)
            </span>
          )}
        </div>
        {day.focusOfDay && (
          <div className="text-xs text-slate-700 mt-1.5 flex items-start gap-1">
            <Star className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
            <span className="italic">{day.focusOfDay}</span>
          </div>
        )}
        {/* Progress bar */}
        {keys.length > 0 && (
          <div className="w-full bg-slate-200 rounded-full h-1 mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-l from-violet-500 to-indigo-600 h-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ExamWeekPage() {
  const { done, toggle, hydrated, clearAll } = useChecks();
  const countdown = useCountdown();
  const todayIdx = new Date().getDay();

  // Total checkable blocks across week
  const allKeys: string[] = [];
  for (const day of days) {
    for (const slot of day.slots) {
      if (slot.checkable) allKeys.push(`d${day.dayIdx}-${slot.start}`);
    }
  }
  const totalDone = allKeys.filter((k) => done[k]).length;
  const totalPct = allKeys.length > 0 ? Math.round((totalDone / allKeys.length) * 100) : 0;

  // Study hours estimate per day
  const studyHoursByDay: Record<number, number> = { 1: 9, 2: 10, 3: 12, 4: 4, 5: 0 };

  const urgencyColor =
    countdown.days <= 1 ? 'text-rose-600' :
    countdown.days <= 2 ? 'text-orange-600' :
    'text-violet-700';

  return (
    <div className="space-y-5">
      <PageHeader
        icon={<CalendarDays className="w-6 h-6" />}
        title="לוז שבוע המבחן — לינארית מועד ג"
        subtitle="ימים שני–שישי לפני המבחן. כל בלוק ניתן לסימון. ציון יעד: 90+."
        gradient="from-rose-600 to-violet-700"
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Countdown */}
        <div className="bg-white border-2 border-rose-200 rounded-xl p-3 shadow-sm text-center">
          <div className="text-[10px] text-rose-600 font-bold uppercase tracking-wide mb-1">זמן למבחן</div>
          <div className={`text-2xl font-extrabold ${urgencyColor}`}>{countdown.days}ד {countdown.hours}ש'</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{countdown.minutes} דקות</div>
        </div>

        {/* Week progress */}
        <div className="bg-white border-2 border-violet-200 rounded-xl p-3 shadow-sm text-center">
          <div className="text-[10px] text-violet-700 font-bold uppercase tracking-wide mb-1">השלמת שבוע</div>
          <div className="text-2xl font-extrabold text-violet-700">{totalPct}%</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{totalDone}/{allKeys.length} בלוקים</div>
        </div>

        {/* Total study hours */}
        <div className="bg-white border-2 border-blue-200 rounded-xl p-3 shadow-sm text-center">
          <div className="text-[10px] text-blue-700 font-bold uppercase tracking-wide mb-1">שעות לימוד</div>
          <div className="text-2xl font-extrabold text-blue-700">~35</div>
          <div className="text-[10px] text-slate-500 mt-0.5">שעות מוגדרות</div>
        </div>

        {/* Reset */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-3 shadow-sm flex flex-col items-center justify-center">
          <button
            onClick={clearAll}
            disabled={!hydrated || totalDone === 0}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            איפוס
          </button>
        </div>
      </div>

      {/* Study focus strip */}
      <div className="bg-gradient-to-l from-amber-50 to-orange-50 border border-amber-300 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-4 h-4 text-orange-600" />
          <span className="font-bold text-orange-900 text-sm">מה לפגוש בכל יום — לפי עדיפות</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {[
            { day: 'שני', focus: 'det(AB) + Null(AᵀA) + שיחת מרצה', hours: '~9ש\'' },
            { day: 'שלישי', focus: '5 הוכחות ממוחשבת + Top HW + דמיה', hours: '~10ש\'' },
            { day: 'רביעי', focus: 'LD-char + מבחנים ישנים + דמיה מלאה', hours: '~12ש\'' },
            { day: 'חמישי', focus: 'יום קל — חולשות בלבד + שינה מוקדמת', hours: '~4ש\'' },
          ].map(({ day, focus, hours }) => (
            <div key={day} className="bg-white/70 rounded-lg p-2 border border-amber-200">
              <div className="font-bold text-amber-900 mb-0.5">{day} <span className="font-mono text-amber-600 font-normal">{hours}</span></div>
              <div className="text-amber-800 leading-snug">{focus}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning: what NOT to re-study */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
        <div className="text-xs text-red-900">
          <span className="font-bold">אל תחזרי על אלה — נשאלו כבר:</span>{' '}
          משפט השלוש (מועד ב Q2), (AB)ᵗ=BᵗAᵗ (מועד ב Q1), dim(U∩W)=n−2 כשאלה (מועד ב Q3), מערכת 4 משתנים פרמטרית (מועד ב Q3).
          רפרוף קצר בלבד — לא להשקיע.
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl border border-slate-200 p-3">
        <div className="font-bold text-slate-700 text-xs mb-2 flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" /> מקרא
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(slotMeta) as SlotType[]).filter(t => t !== 'sleep').map((t) => {
            const m = slotMeta[t];
            return (
              <span key={t} className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border ${m.cls}`}>
                {m.emoji} {m.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Day Cards */}
      <div className="space-y-4">
        {days.map((day) => (
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

      {/* Exam tactics reminder */}
      <div className="bg-gradient-to-l from-indigo-50 to-violet-50 border border-indigo-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-indigo-900 text-sm">טקטיקות מבחן — לקרוא לפני שנכנסים</span>
        </div>
        <ul className="text-xs text-indigo-900 space-y-1 pr-4 list-disc">
          <li><strong>3 דקות ראשונות:</strong> עברי על כל 5 השאלות. דרגי מהקלה לקשה. בחרי 4.</li>
          <li><strong>35–40 דק לשאלה</strong> — תשאירי 20 דק לסקירה בסוף.</li>
          <li><strong>תקועה 15 דק?</strong> דלגי. חזרי אחר כך. אל תבזבזי שעה על שאלה אחת.</li>
          <li><strong>הוכחה = 50% מהציון.</strong> אל תרשמי רק תוצאה — כל צעד מוסבר = נקודות.</li>
          <li><strong>ציטוט שמות:</strong> "לפי משפט הדרגה" / "לפי שקילות (iv)↔(vii)" — נותן בהירות ונקודות.</li>
          <li><strong>פותחת הוכחה?</strong> תמיד רשמי: "יהא A ∈ M_n(F)..." — הגדרה ראשונה = 2 נקודות חינם.</li>
        </ul>
      </div>
    </div>
  );
}
