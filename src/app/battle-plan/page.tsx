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
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  FileText,
  Brain,
  Sparkles,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import MathExpr from '@/components/MathExpr';
import {
  battlePlan,
  examMeta,
  goldenRules,
  getDayProgressKeys,
  getAllDayItems,
  type BattleDay,
  type TimeSlot,
  type StudyItem,
  type StudyDepth,
} from '@/data/battle-plan-moed-b';
import { topTheorems } from '@/data/top-theorems';
import { topHomework } from '@/data/top-homework';

// ─────────────────────── helpers ───────────────────────

function slotTypeColor(t: string) {
  switch (t) {
    case 'theory':     return 'bg-violet-100 text-violet-700 border-violet-200';
    case 'practice':   return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'memorize':   return 'bg-pink-100 text-pink-700 border-pink-200';
    case 'simulation': return 'bg-red-100 text-red-700 border-red-200';
    case 'review':     return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'rest':       return 'bg-gray-100 text-gray-600 border-gray-200';
    default:           return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

function slotTypeLabel(t: string) {
  const m: Record<string, string> = {
    theory: 'תיאוריה',
    practice: 'תרגול',
    memorize: 'שינון',
    simulation: 'סימולציה',
    review: 'סקירה',
    rest: 'הפסקה',
  };
  return m[t] ?? t;
}

function depthMeta(d: StudyDepth) {
  switch (d) {
    case 'memorize-fully':
      return {
        label: 'ללמוד היטב',
        cls: 'bg-red-100 text-red-700 border-red-300',
        dotCls: 'bg-red-500',
        order: 0,
      };
    case 'know-and-state':
      return {
        label: 'לדעת לנסח',
        cls: 'bg-amber-100 text-amber-700 border-amber-300',
        dotCls: 'bg-amber-500',
        order: 1,
      };
    case 'recognize-only':
      return {
        label: 'רק להכיר',
        cls: 'bg-gray-100 text-gray-600 border-gray-300',
        dotCls: 'bg-gray-400',
        order: 2,
      };
  }
}

function kindIcon(k: string) {
  if (k === 'definition') return '📘';
  if (k === 'theorem') return '⭐';
  if (k === 'lemma') return '🔧';
  if (k === 'corollary') return '↪';
  if (k === 'note') return '💡';
  return '•';
}

function kindLabel(k: string) {
  const m: Record<string, string> = {
    definition: 'הגדרה',
    theorem: 'משפט',
    lemma: 'למה',
    corollary: 'מסקנה',
    note: 'הערה',
  };
  return m[k] ?? k;
}

function useTaskTracker() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('liner-battle-plan-v3');
      if (stored) setDone(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('liner-battle-plan-v3', JSON.stringify(done));
    } catch {}
  }, [done, hydrated]);

  const toggle = useCallback((key: string) => {
    setDone((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return { done, toggle, hydrated };
}

// ─────────────────────── small components ───────────────────────

function CheckBox({ checked, onClick, hydrated }: { checked: boolean; onClick: () => void; hydrated: boolean }) {
  if (!hydrated) return <Circle className="w-5 h-5 text-gray-200 shrink-0 mt-0.5" />;
  return (
    <button onClick={onClick} className="shrink-0 mt-0.5" aria-label="Toggle">
      {checked ? (
        <CheckCircle2 className="w-5 h-5 text-green-600" />
      ) : (
        <Circle className="w-5 h-5 text-gray-300 hover:text-gray-500" />
      )}
    </button>
  );
}

function DepthBadge({ depth }: { depth: StudyDepth }) {
  const m = depthMeta(depth);
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border font-semibold ${m.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dotCls}`} />
      {m.label}
    </span>
  );
}

function StudyItemRow({
  item,
  done,
  onToggle,
  hydrated,
}: {
  item: StudyItem;
  done: boolean;
  onToggle: () => void;
  hydrated: boolean;
}) {
  return (
    <div className={`rounded-lg border px-3 py-2.5 flex items-start gap-3 ${done ? 'bg-green-50/40 border-green-200' : 'bg-white border-gray-200'}`}>
      <CheckBox checked={done} onClick={onToggle} hydrated={hydrated} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="text-sm leading-none">{kindIcon(item.kind)}</span>
          <span className="text-[10px] uppercase tracking-wide text-gray-500 font-bold">{kindLabel(item.kind)}</span>
          <DepthBadge depth={item.depth} />
          {item.requiresProof && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200 font-semibold">
              הוכחה
            </span>
          )}
        </div>
        <div className={`text-sm font-semibold ${done ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
          {item.title}
        </div>
        {item.body && <div className="text-xs text-gray-700 mt-1 leading-relaxed">{item.body}</div>}
        {item.topTheoremRank && (
          <Link
            href={`/top-theorems#${item.topTheoremRank}`}
            className="inline-flex items-center gap-1 text-xs text-purple-700 hover:text-purple-900 mt-1.5 font-semibold"
          >
            <ExternalLink className="w-3 h-3" />
            הוכחה מלאה (Top #{item.topTheoremRank})
          </Link>
        )}
      </div>
    </div>
  );
}

// ─────────────────────── main slot card ───────────────────────

function SlotCard({
  slot,
  slotIndex,
  dayNum,
  done,
  toggle,
  hydrated,
}: {
  slot: TimeSlot;
  slotIndex: number;
  dayNum: number;
  done: Record<string, boolean>;
  toggle: (k: string) => void;
  hydrated: boolean;
}) {
  const isRest = slot.type === 'rest';
  const slotKey = `d${dayNum}-slot-${slotIndex}`;
  const slotDone = !!done[slotKey];

  // Group items by depth
  const grouped = useMemo(() => {
    if (!slot.items) return { 'memorize-fully': [], 'know-and-state': [], 'recognize-only': [] };
    return slot.items.reduce(
      (acc, item) => {
        acc[item.depth].push(item);
        return acc;
      },
      {
        'memorize-fully': [] as StudyItem[],
        'know-and-state': [] as StudyItem[],
        'recognize-only': [] as StudyItem[],
      },
    );
  }, [slot.items]);

  // Slot-level progress (count items inside)
  const itemKeys = (slot.items ?? []).map((i) => `d${dayNum}-item-${i.id}`);
  const itemDone = itemKeys.filter((k) => done[k]).length;
  const itemPct = itemKeys.length > 0 ? Math.round((itemDone / itemKeys.length) * 100) : null;

  return (
    <div
      className={`rounded-2xl border-2 overflow-hidden transition-colors ${
        isRest
          ? 'bg-gray-50/50 border-gray-200'
          : slotDone
            ? 'bg-green-50/30 border-green-300'
            : 'bg-white border-gray-200 hover:border-violet-300'
      }`}
    >
      {/* Slot header */}
      <div className={`p-4 ${isRest ? '' : 'border-b border-gray-100'}`}>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <CheckBox checked={slotDone} onClick={() => toggle(slotKey)} hydrated={hydrated && !isRest} />
            {isRest && <Coffee className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-mono text-sm font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                  {slot.time}
                </span>
                {!isRest && slot.hours > 0 && (
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {slot.hours}ש
                  </span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${slotTypeColor(slot.type)}`}>
                  {slotTypeLabel(slot.type)}
                </span>
                {slot.lectureScope && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                    📚 {slot.lectureScope}
                  </span>
                )}
              </div>
              <div className={`text-base font-bold ${slotDone ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {slot.title}
              </div>
              {slot.description && (
                <div className="text-sm text-gray-600 mt-1 leading-relaxed">{slot.description}</div>
              )}
              {slot.lectureFiles && slot.lectureFiles.length > 0 && (
                <div className="text-xs text-gray-500 mt-1.5 flex items-start gap-1">
                  <FileText className="w-3 h-3 mt-0.5 shrink-0" />
                  <span className="font-mono leading-relaxed">{slot.lectureFiles.join(' · ')}</span>
                </div>
              )}
            </div>
          </div>
          {itemPct !== null && (
            <div className="text-xs text-gray-500 flex flex-col items-end shrink-0">
              <span className="font-bold">{itemDone}/{itemKeys.length}</span>
              <div className="w-16 h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-violet-500 transition-all" style={{ width: `${itemPct}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Weak point callout */}
        {slot.weakPointCallout && (
          <div className="mt-3 bg-rose-50 border border-rose-200 rounded-lg p-2.5 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-900 font-medium leading-relaxed">{slot.weakPointCallout}</div>
          </div>
        )}
      </div>

      {/* Slot body */}
      {(slot.items?.length || slot.exercises?.length || slot.proofsToWrite?.length || slot.pastExam) && (
        <div className="p-4 space-y-4">
          {/* Items grouped by depth */}
          {(['memorize-fully', 'know-and-state', 'recognize-only'] as const).map((depth) => {
            const list = grouped[depth];
            if (list.length === 0) return null;
            const m = depthMeta(depth);
            return (
              <div key={depth}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${m.dotCls}`} />
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-700">
                    {m.label} ({list.length})
                  </span>
                </div>
                <div className="space-y-1.5">
                  {list.map((item) => {
                    const k = `d${dayNum}-item-${item.id}`;
                    return (
                      <StudyItemRow
                        key={item.id}
                        item={item}
                        done={!!done[k]}
                        onToggle={() => toggle(k)}
                        hydrated={hydrated}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Exercises */}
          {slot.exercises && slot.exercises.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 mt-3">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wide text-blue-700">תרגילים ({slot.exercises.length})</span>
              </div>
              <div className="space-y-2">
                {slot.exercises.map((ex) => {
                  const k = `d${dayNum}-ex-${ex.id}`;
                  const isDone = !!done[k];
                  const hw = ex.topHomeworkRank ? topHomework.find((h) => h.rank === ex.topHomeworkRank) : undefined;
                  return (
                    <div key={ex.id} className={`rounded-lg border p-3 flex items-start gap-3 ${isDone ? 'bg-green-50/40 border-green-200' : 'bg-blue-50/40 border-blue-200'}`}>
                      <CheckBox checked={isDone} onClick={() => toggle(k)} hydrated={hydrated} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className={`font-bold text-sm ${isDone ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {ex.title}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            ~{ex.durationMinutes} דק
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">מקור: {ex.source}</div>
                        {ex.hint && (
                          <div className="text-xs text-gray-700 mt-1 italic flex items-start gap-1">
                            <Lightbulb className="w-3 h-3 mt-0.5 text-amber-500 shrink-0" />
                            <span>{ex.hint}</span>
                          </div>
                        )}
                        {hw && (
                          <Link
                            href={`/top-homework#${hw.rank}`}
                            className="inline-flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 mt-1.5 font-semibold"
                          >
                            <ExternalLink className="w-3 h-3" />
                            פתחי שאלה מלאה + פתרון (Top #{hw.rank})
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Proofs to write */}
          {slot.proofsToWrite && slot.proofsToWrite.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 mt-3">
                <Trophy className="w-4 h-4 text-pink-600" />
                <span className="text-xs font-bold uppercase tracking-wide text-pink-700">
                  הוכחות לכתוב מהזיכרון ({slot.proofsToWrite.length})
                </span>
              </div>
              <div className="space-y-2">
                {slot.proofsToWrite.map((p) => {
                  const t = topTheorems.find((th) => th.rank === p.topTheoremRank);
                  if (!t) return null;
                  const k = `d${dayNum}-proof-${p.topTheoremRank}-${slotIndex}`;
                  const isDone = !!done[k];
                  return (
                    <div key={p.topTheoremRank} className={`rounded-lg border-2 p-3 flex items-start gap-3 ${isDone ? 'bg-green-50/50 border-green-300' : 'bg-pink-50/50 border-pink-200'}`}>
                      <CheckBox checked={isDone} onClick={() => toggle(k)} hydrated={hydrated} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-pink-600 text-white font-bold">#{p.topTheoremRank}</span>
                          <span className={`font-bold text-sm ${isDone ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {t.name}
                          </span>
                          <span className="text-xs text-pink-700 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            יעד {p.targetMinutes} דק
                          </span>
                          <span className="text-xs text-gray-500">· {t.probability}% סבירות</span>
                        </div>
                        <div className="bg-white rounded p-2 text-xs border border-pink-100">
                          <MathExpr block>{t.statement}</MathExpr>
                        </div>
                        <Link
                          href={`/top-theorems#${p.topTheoremRank}`}
                          className="inline-flex items-center gap-1 text-xs text-pink-700 hover:text-pink-900 mt-1.5 font-semibold"
                        >
                          <ExternalLink className="w-3 h-3" />
                          קראי את ההוכחה לפני שאת כותבת
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Past exam */}
          {slot.pastExam && (
            <div className="bg-gradient-to-l from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <CheckBox
                  checked={!!done[`d${dayNum}-exam-${slot.pastExam.name}-${slotIndex}`]}
                  onClick={() => toggle(`d${dayNum}-exam-${slot.pastExam!.name}-${slotIndex}`)}
                  hydrated={hydrated}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <FileCheck className="w-5 h-5 text-red-600" />
                    <span className="font-bold text-gray-900">{slot.pastExam.name}</span>
                    {slot.pastExam.isMandatory && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-600 text-white font-bold">חובה</span>
                    )}
                    <span className="text-xs text-gray-700 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {slot.pastExam.durationMinutes} דק
                    </span>
                  </div>
                  {slot.pastExam.note && <div className="text-sm text-gray-700 mb-2">{slot.pastExam.note}</div>}
                  <Link
                    href={slot.pastExam.href}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    פתחי את המבחן
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────── DayView ───────────────────────

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
  const allKeys = getDayProgressKeys(day);
  const overallDone = allKeys.filter((k) => done[k]).length;
  const overallPct = allKeys.length > 0 ? Math.round((overallDone / allKeys.length) * 100) : 0;

  // Mini stats from items
  const agg = getAllDayItems(day);
  const stats = {
    definitions: agg.definitions.length,
    theorems: agg.theorems.length + agg.corollaries.length,
    exercises: agg.exercises.length,
    proofs: agg.proofs.length,
  };

  return (
    <div className="space-y-4">
      {/* Day banner */}
      <div className={`bg-gradient-to-l ${day.accentColor} rounded-2xl p-5 text-white shadow-md`}>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{day.emoji}</div>
            <div>
              <div className="text-xs opacity-80">{day.weekday}, {day.date}</div>
              <div className="text-2xl font-extrabold">{day.title}</div>
              <div className="text-sm opacity-90 max-w-2xl mt-0.5">{day.subtitle}</div>
            </div>
          </div>
          {day.totalHours > 0 && (
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <div className="text-2xl font-extrabold">
                {day.totalHours}<span className="text-sm font-normal mr-1">שעות</span>
              </div>
              <div className="text-xs opacity-80">תקציב היום</div>
            </div>
          )}
        </div>

        {/* Progress */}
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

        {/* Stats */}
        {(stats.definitions > 0 || stats.theorems > 0 || stats.exercises > 0 || stats.proofs > 0) && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {stats.definitions > 0 && (
              <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-xl font-extrabold flex items-center justify-center gap-1">
                  <Brain className="w-4 h-4" /> {stats.definitions}
                </div>
                <div className="text-[10px] opacity-80">הגדרות</div>
              </div>
            )}
            {stats.theorems > 0 && (
              <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-xl font-extrabold flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4" /> {stats.theorems}
                </div>
                <div className="text-[10px] opacity-80">משפטים</div>
              </div>
            )}
            {stats.exercises > 0 && (
              <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-xl font-extrabold flex items-center justify-center gap-1">
                  <GraduationCap className="w-4 h-4" /> {stats.exercises}
                </div>
                <div className="text-[10px] opacity-80">תרגילים</div>
              </div>
            )}
            {stats.proofs > 0 && (
              <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-xl font-extrabold flex items-center justify-center gap-1">
                  <Trophy className="w-4 h-4" /> {stats.proofs}
                </div>
                <div className="text-[10px] opacity-80">הוכחות</div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 bg-white/15 backdrop-blur-sm rounded-xl p-3 text-sm flex items-start gap-2">
          <Target className="w-4 h-4 mt-0.5 shrink-0" />
          <div>
            <span className="font-bold">המטרה: </span>
            {day.goal}
          </div>
        </div>
      </div>

      {/* Depth legend (only if there are items) */}
      {agg.definitions.length + agg.theorems.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-3 flex items-center justify-center gap-4 flex-wrap text-xs">
          <span className="text-gray-500 font-medium">מקרא:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-red-700 font-semibold">ללמוד היטב</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-amber-700 font-semibold">לדעת לנסח</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-400" />
            <span className="text-gray-600 font-semibold">רק להכיר</span>
          </span>
        </div>
      )}

      {/* Slots */}
      <div className="space-y-3">
        {day.slots.map((slot, i) => (
          <SlotCard
            key={i}
            slot={slot}
            slotIndex={i}
            dayNum={day.day}
            done={done}
            toggle={toggle}
            hydrated={hydrated}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────── MAIN PAGE ───────────────────────

export default function BattlePlanPage() {
  const todayISO = new Date().toISOString().slice(0, 10);
  const matchingDay = battlePlan.findIndex((d) => d.date === todayISO);
  const initialDay = matchingDay >= 0 ? matchingDay : 0;

  const [currentDay, setCurrentDay] = useState<number>(initialDay);
  const { done, toggle, hydrated } = useTaskTracker();

  const day = battlePlan[currentDay];

  const examDate = new Date(examMeta.examDate);
  const today = new Date(todayISO);
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Swords className="w-6 h-6" />}
        title="תוכנית קרב — מועד ג 15.6"
        subtitle="עברנו ממועד ב למועד ג. התוכנית המלאה והמפורטת (33 ימים) נמצאת בקובץ HTML מודפס. הסקירה כאן נשארת כרפרנס מהיר."
        gradient="from-violet-600 to-indigo-700"
      />

      {/* ── Callout to HTML plan ── */}
      <div className="bg-gradient-to-l from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm">
        <div className="flex items-start gap-3 flex-wrap">
          <div className="text-3xl">📄</div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-amber-900 text-base mb-1">תוכנית הקרב המלאה — 33 ימים</div>
            <div className="text-sm text-amber-900 mb-2">
              התוכנית המפורטת (יום-יום, עם תיבות סימון, פאזות, תאריכים מדויקים) נמצאת בקובץ HTML עצמאי:
            </div>
            <code className="block bg-white border border-amber-200 rounded px-2 py-1 text-xs text-amber-900 font-mono mb-2" dir="ltr">
              /Users/liamesika/Desktop/infi/LINER/battle-plan-moed-g.html
            </code>
            <div className="text-xs text-amber-800">
              פתחי אותו בדפדפן (דאבל-קליק). אפשר להדפיס. כל המידע — פאזות 1-5, סקירה, ומבחנים.
            </div>
          </div>
        </div>
      </div>

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

      {/* Day pills */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setCurrentDay(Math.max(0, currentDay - 1))}
            disabled={currentDay === 0}
            className="shrink-0 p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
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
                  className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all relative ${
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
            className="shrink-0 p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Day */}
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
