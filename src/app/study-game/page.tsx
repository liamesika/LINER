'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Brain,
  RotateCcw,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  ListChecks,
  Grid3X3,
  Trophy,
  Eye,
  EyeOff,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import {
  defCards,
  shuffle,
  getRandomDistractors,
  type DefCard,
} from '@/data/definitions-game';

type Mode = 'flashcards' | 'quiz' | 'match';
const STORAGE_KEY = 'liner-study-game-v1';

interface Stats {
  flashKnown: Record<string, number>;   // id → times marked known
  flashUnknown: Record<string, number>; // id → times marked unknown
  quizCorrect: Record<string, number>;
  quizWrong: Record<string, number>;
  matchBestTime?: number; // seconds
  matchPlays: number;
}

const emptyStats: Stats = {
  flashKnown: {},
  flashUnknown: {},
  quizCorrect: {},
  quizWrong: {},
  matchPlays: 0,
};

function useStats() {
  const [stats, setStats] = useState<Stats>(emptyStats);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStats({ ...emptyStats, ...JSON.parse(raw) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); } catch {}
  }, [stats, hydrated]);

  const recordFlash = useCallback((id: string, known: boolean) => {
    setStats((s) => ({
      ...s,
      flashKnown: known ? { ...s.flashKnown, [id]: (s.flashKnown[id] || 0) + 1 } : s.flashKnown,
      flashUnknown: !known ? { ...s.flashUnknown, [id]: (s.flashUnknown[id] || 0) + 1 } : s.flashUnknown,
    }));
  }, []);

  const recordQuiz = useCallback((id: string, correct: boolean) => {
    setStats((s) => ({
      ...s,
      quizCorrect: correct ? { ...s.quizCorrect, [id]: (s.quizCorrect[id] || 0) + 1 } : s.quizCorrect,
      quizWrong: !correct ? { ...s.quizWrong, [id]: (s.quizWrong[id] || 0) + 1 } : s.quizWrong,
    }));
  }, []);

  const recordMatch = useCallback((seconds: number) => {
    setStats((s) => ({
      ...s,
      matchBestTime: s.matchBestTime ? Math.min(s.matchBestTime, seconds) : seconds,
      matchPlays: s.matchPlays + 1,
    }));
  }, []);

  const reset = useCallback(() => {
    if (confirm('למחוק את כל הסטטיסטיקות? לא ניתן לבטל.')) {
      setStats(emptyStats);
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  }, []);

  return { stats, hydrated, recordFlash, recordQuiz, recordMatch, reset };
}

// ─── FLASHCARDS ───

function FlashcardsMode({ recordFlash, stats }: { recordFlash: (id: string, k: boolean) => void; stats: Stats }) {
  const [order, setOrder] = useState<DefCard[]>(() => shuffle(defCards));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filterWeak, setFilterWeak] = useState(false);

  const filtered = useMemo(() => {
    if (!filterWeak) return order;
    return order.filter((c) => (stats.flashUnknown[c.id] || 0) > (stats.flashKnown[c.id] || 0));
  }, [order, filterWeak, stats]);

  const safeIdx = Math.min(idx, Math.max(0, filtered.length - 1));
  const card = filtered[safeIdx];

  const next = useCallback(() => {
    setFlipped(false);
    setIdx((i) => (i + 1) % Math.max(1, filtered.length));
  }, [filtered.length]);

  const prev = useCallback(() => {
    setFlipped(false);
    setIdx((i) => (i - 1 + filtered.length) % Math.max(1, filtered.length));
  }, [filtered.length]);

  const rate = useCallback((known: boolean) => {
    if (!card) return;
    recordFlash(card.id, known);
    next();
  }, [card, next, recordFlash]);

  const reshuffle = useCallback(() => {
    setOrder(shuffle(defCards));
    setIdx(0);
    setFlipped(false);
  }, []);

  if (!card) {
    return (
      <div className="text-center py-12 bg-emerald-50 border-2 border-emerald-200 rounded-2xl">
        <Trophy className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
        <div className="text-xl font-bold text-emerald-800 mb-1">כל הכבוד! לא נותרו כרטיסיות חלשות</div>
        <button
          onClick={() => setFilterWeak(false)}
          className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
        >
          הצג את כל הכרטיסיות
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm text-slate-600">
          <span className="font-bold text-indigo-700">{safeIdx + 1}</span> / {filtered.length}
          {filterWeak && <span className="text-amber-700 mr-2">· סינון חלשות</span>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setFilterWeak((v) => !v); setIdx(0); }}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${filterWeak ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
          >
            {filterWeak ? '⚡ רק חלשות' : 'סנן חלשות'}
          </button>
          <button
            onClick={reshuffle}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            ערבוב
          </button>
        </div>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped((f) => !f)}
        className={`relative min-h-[280px] cursor-pointer rounded-3xl p-6 md:p-10 shadow-lg border-2 transition-all duration-300 ${
          flipped
            ? 'bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-300'
            : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xl'
        }`}
      >
        <div className="absolute top-3 left-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {flipped ? 'הגדרה מלאה' : 'כותרת'}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
          {flipped ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          {flipped ? 'הסתר' : 'הצג'}
        </div>

        {!flipped ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
            <div className="text-[10px] font-bold text-violet-600 mb-3 uppercase tracking-wider">{card.source}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{card.title}</h2>
            <div className="text-sm text-slate-500">לחץ לחשיפת ההגדרה</div>
          </div>
        ) : (
          <div className="space-y-4 pt-6">
            <h2 className="text-2xl font-extrabold text-violet-900">{card.title}</h2>
            <div className="text-sm font-semibold text-violet-700 bg-violet-100 inline-block px-2 py-1 rounded">{card.short}</div>
            <p className="text-base text-slate-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: card.body }} />
            <div className="text-xs text-slate-500 pt-2 border-t border-violet-200">
              מילות מפתח: {card.keywords.join(' · ')}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={prev}
          className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center justify-center gap-2"
        >
          <ChevronRight className="w-4 h-4" />
          קודם
        </button>
        <button
          onClick={() => rate(false)}
          className="px-4 py-3 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold flex items-center justify-center gap-2 border-2 border-rose-200"
        >
          <X className="w-4 h-4" />
          לא ידעתי
        </button>
        <button
          onClick={() => rate(true)}
          className="px-4 py-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold flex items-center justify-center gap-2 border-2 border-emerald-200"
        >
          <Check className="w-4 h-4" />
          ידעתי
        </button>
        <button
          onClick={next}
          className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center justify-center gap-2"
        >
          הבא
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Per-card stats */}
      <div className="text-xs text-slate-500 text-center">
        כרטיס נוכחי: ידעתי <span className="font-bold text-emerald-700">{stats.flashKnown[card.id] || 0}</span> · לא ידעתי <span className="font-bold text-rose-700">{stats.flashUnknown[card.id] || 0}</span>
      </div>
    </div>
  );
}

// ─── QUIZ ───

interface QuizQ {
  card: DefCard;
  options: DefCard[]; // includes correct + 3 distractors, shuffled
}

function buildQuiz(): QuizQ[] {
  return shuffle(defCards).map((c) => {
    const distractors = getRandomDistractors(c.id, 3);
    return { card: c, options: shuffle([c, ...distractors]) };
  });
}

function QuizMode({ recordQuiz, stats }: { recordQuiz: (id: string, c: boolean) => void; stats: Stats }) {
  const [qs, setQs] = useState<QuizQ[]>(() => buildQuiz());
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [finished, setFinished] = useState(false);

  const q = qs[idx];

  const pick = (id: string) => {
    if (selected) return;
    setSelected(id);
    const isCorrect = id === q.card.id;
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      wrong: s.wrong + (isCorrect ? 0 : 1),
    }));
    recordQuiz(q.card.id, isCorrect);
  };

  const next = () => {
    setSelected(null);
    if (idx + 1 >= qs.length) {
      setFinished(true);
    } else {
      setIdx(idx + 1);
    }
  };

  const restart = () => {
    setQs(buildQuiz());
    setIdx(0);
    setSelected(null);
    setScore({ correct: 0, wrong: 0 });
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score.correct / qs.length) * 100);
    return (
      <div className="text-center bg-gradient-to-br from-violet-50 to-indigo-50 border-2 border-violet-300 rounded-3xl p-8">
        <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <div className="text-3xl font-extrabold text-violet-900 mb-2">סיימת!</div>
        <div className="text-5xl font-extrabold text-violet-700 mb-2">{pct}%</div>
        <div className="text-lg text-slate-700 mb-1">
          <span className="text-emerald-700 font-bold">{score.correct} נכון</span>
          {' · '}
          <span className="text-rose-700 font-bold">{score.wrong} שגוי</span>
        </div>
        <div className="text-sm text-slate-600 mb-6">מתוך {qs.length} שאלות</div>
        <button
          onClick={restart}
          className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          סיבוב חדש
        </button>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm text-slate-600">
          שאלה <span className="font-bold text-indigo-700">{idx + 1}</span> / {qs.length}
        </div>
        <div className="text-xs flex gap-3">
          <span className="text-emerald-700 font-semibold">✓ {score.correct}</span>
          <span className="text-rose-700 font-semibold">✗ {score.wrong}</span>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="text-[10px] font-bold text-violet-600 mb-2 uppercase tracking-wider">{q.card.source} · איזו הגדרה?</div>
        <p className="text-base md:text-lg text-slate-900 leading-relaxed mb-1" dangerouslySetInnerHTML={{ __html: q.card.body }} />
        <div className="text-xs text-slate-500 mt-2">מילות מפתח: {q.card.keywords.join(' · ')}</div>
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        {q.options.map((opt) => {
          const isCorrect = opt.id === q.card.id;
          const isPicked = selected === opt.id;
          let cls = 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50';
          if (selected) {
            if (isCorrect) cls = 'bg-emerald-100 border-emerald-400 text-emerald-900';
            else if (isPicked) cls = 'bg-rose-100 border-rose-400 text-rose-900';
            else cls = 'bg-slate-50 border-slate-200 text-slate-500 opacity-70';
          }
          return (
            <button
              key={opt.id}
              onClick={() => pick(opt.id)}
              disabled={!!selected}
              className={`text-right px-4 py-3 rounded-xl border-2 font-bold transition-all ${cls}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-base">{opt.title}</span>
                {selected && isCorrect && <Check className="w-5 h-5 text-emerald-600 shrink-0" />}
                {selected && isPicked && !isCorrect && <X className="w-5 h-5 text-rose-600 shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="space-y-2">
          {selected !== q.card.id && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 text-sm">
              <div className="font-bold text-amber-800 mb-1">התשובה הנכונה: {q.card.title}</div>
              <div className="text-amber-900">{q.card.short}</div>
            </div>
          )}
          <button
            onClick={next}
            className="w-full px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-2"
          >
            {idx + 1 >= qs.length ? 'סיים' : 'הבא'}
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── MATCH (Memory) ───

interface MatchCard {
  uid: string;
  defId: string;
  side: 'title' | 'short';
  text: string;
}

function buildMatchDeck(pairCount: number): MatchCard[] {
  const picked = shuffle(defCards).slice(0, pairCount);
  const cards: MatchCard[] = [];
  picked.forEach((d) => {
    cards.push({ uid: `${d.id}-t`, defId: d.id, side: 'title', text: d.title });
    cards.push({ uid: `${d.id}-s`, defId: d.id, side: 'short', text: d.short });
  });
  return shuffle(cards);
}

function MatchMode({ recordMatch, stats }: { recordMatch: (s: number) => void; stats: Stats }) {
  const PAIRS = 8;
  const [deck, setDeck] = useState<MatchCard[]>(() => buildMatchDeck(PAIRS));
  const [flipped, setFlipped] = useState<string[]>([]); // uids currently face-up (max 2)
  const [matched, setMatched] = useState<Set<string>>(new Set()); // defIds matched
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [won, setWon] = useState(false);
  const [wrongPair, setWrongPair] = useState<string[] | null>(null);

  useEffect(() => {
    if (won || !startTime) return;
    const t = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [startTime, won]);

  const restart = useCallback(() => {
    setDeck(buildMatchDeck(PAIRS));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setStartTime(null);
    setElapsed(0);
    setWon(false);
    setWrongPair(null);
  }, []);

  const click = (uid: string) => {
    if (wrongPair) return;
    if (flipped.includes(uid)) return;
    const card = deck.find((c) => c.uid === uid);
    if (!card || matched.has(card.defId)) return;
    if (!startTime) setStartTime(Date.now());

    if (flipped.length === 0) {
      setFlipped([uid]);
    } else if (flipped.length === 1) {
      const newFlipped = [...flipped, uid];
      setFlipped(newFlipped);
      setMoves((m) => m + 1);

      const a = deck.find((c) => c.uid === newFlipped[0])!;
      const b = card;
      if (a.defId === b.defId && a.side !== b.side) {
        // match!
        const newMatched = new Set(matched);
        newMatched.add(a.defId);
        setTimeout(() => {
          setMatched(newMatched);
          setFlipped([]);
          if (newMatched.size === PAIRS) {
            const seconds = Math.floor((Date.now() - (startTime || Date.now())) / 1000);
            recordMatch(seconds);
            setWon(true);
          }
        }, 500);
      } else {
        setWrongPair(newFlipped);
        setTimeout(() => {
          setFlipped([]);
          setWrongPair(null);
        }, 1100);
      }
    }
  };

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');

  if (won) {
    return (
      <div className="text-center bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-3xl p-8">
        <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <div className="text-3xl font-extrabold text-emerald-900 mb-2">ניצחון!</div>
        <div className="text-base text-slate-700 mb-1">
          <span className="font-bold text-emerald-700">{moves}</span> מהלכים · <span className="font-bold text-emerald-700">{mm}:{ss}</span>
        </div>
        {stats.matchBestTime !== undefined && (
          <div className="text-sm text-slate-600 mb-4">
            שיא אישי: {String(Math.floor(stats.matchBestTime / 60)).padStart(2, '0')}:{String(stats.matchBestTime % 60).padStart(2, '0')}
          </div>
        )}
        <button
          onClick={restart}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          סיבוב חדש
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm text-slate-600">
          התאמות: <span className="font-bold text-emerald-700">{matched.size}</span> / {PAIRS}
        </div>
        <div className="text-sm text-slate-600 font-mono">
          ⏱ {mm}:{ss} · {moves} מהלכים
        </div>
        <button
          onClick={restart}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          חדש
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {deck.map((c) => {
          const isMatched = matched.has(c.defId);
          const isFlipped = flipped.includes(c.uid) || isMatched;
          const isWrong = wrongPair?.includes(c.uid) ?? false;
          return (
            <button
              key={c.uid}
              onClick={() => click(c.uid)}
              disabled={isMatched || !!wrongPair}
              className={`min-h-[100px] md:min-h-[120px] rounded-xl p-3 text-right text-xs md:text-sm font-semibold transition-all border-2 ${
                isMatched
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900 opacity-70'
                  : isWrong
                    ? 'bg-rose-100 border-rose-400 text-rose-900'
                    : isFlipped
                      ? c.side === 'title'
                        ? 'bg-indigo-100 border-indigo-400 text-indigo-900'
                        : 'bg-violet-100 border-violet-400 text-violet-900'
                      : 'bg-gradient-to-br from-slate-700 to-slate-900 border-slate-700 text-white hover:from-slate-600 hover:to-slate-800 cursor-pointer'
              }`}
            >
              {isFlipped ? (
                <div className="flex flex-col h-full justify-between">
                  <div className="text-[9px] font-bold uppercase tracking-wider opacity-70">
                    {c.side === 'title' ? 'הגדרה' : 'תיאור'}
                  </div>
                  <div className="text-center leading-tight">{c.text}</div>
                  <div />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Sparkles className="w-7 h-7 opacity-50" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="text-xs text-slate-500 text-center">
        התאם כל הגדרה לתיאור המקוצר שלה · {PAIRS} זוגות
      </div>
    </div>
  );
}

// ─── Main Page ───

export default function StudyGamePage() {
  const [mode, setMode] = useState<Mode>('flashcards');
  const { stats, hydrated, recordFlash, recordQuiz, recordMatch, reset } = useStats();

  const totalFlashAttempts = useMemo(() => {
    return Object.values(stats.flashKnown).reduce((a, b) => a + b, 0)
      + Object.values(stats.flashUnknown).reduce((a, b) => a + b, 0);
  }, [stats]);

  const totalQuizAttempts = useMemo(() => {
    return Object.values(stats.quizCorrect).reduce((a, b) => a + b, 0)
      + Object.values(stats.quizWrong).reduce((a, b) => a + b, 0);
  }, [stats]);

  const quizAccuracy = useMemo(() => {
    const correct = Object.values(stats.quizCorrect).reduce((a, b) => a + b, 0);
    return totalQuizAttempts > 0 ? Math.round((correct / totalQuizAttempts) * 100) : 0;
  }, [stats, totalQuizAttempts]);

  // weak cards: more unknown than known OR more wrong than correct
  const weakCards = useMemo(() => {
    return defCards.filter((c) => {
      const u = (stats.flashUnknown[c.id] || 0) + (stats.quizWrong[c.id] || 0);
      const k = (stats.flashKnown[c.id] || 0) + (stats.quizCorrect[c.id] || 0);
      return u > 0 && u >= k;
    });
  }, [stats]);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Brain className="w-6 h-6" />}
        title="🎮 משחק הגדרות"
        subtitle="20 ההגדרות הכי חשובות למבחן · 3 מצבים: כרטיסיות, חידון, זיכרון. הסטטיסטיקה נשמרת בדפדפן."
        gradient="from-violet-600 to-fuchsia-700"
      />

      {/* Stats Banner */}
      <div className="grid md:grid-cols-4 gap-3">
        <div className="bg-white border-2 border-indigo-200 rounded-xl p-3 shadow-sm">
          <div className="text-[10px] text-indigo-700 font-bold uppercase tracking-wide mb-1">הגדרות</div>
          <div className="text-2xl font-extrabold text-indigo-700">{defCards.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">הכי חשובות</div>
        </div>
        <div className="bg-white border-2 border-emerald-200 rounded-xl p-3 shadow-sm">
          <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wide mb-1">כרטיסיות</div>
          <div className="text-2xl font-extrabold text-emerald-700">{hydrated ? totalFlashAttempts : '—'}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">סבבים</div>
        </div>
        <div className="bg-white border-2 border-violet-200 rounded-xl p-3 shadow-sm">
          <div className="text-[10px] text-violet-700 font-bold uppercase tracking-wide mb-1">חידון</div>
          <div className="text-2xl font-extrabold text-violet-700">{hydrated ? `${quizAccuracy}%` : '—'}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{hydrated ? `${totalQuizAttempts} ניסיונות` : 'דיוק'}</div>
        </div>
        <div className="bg-white border-2 border-amber-200 rounded-xl p-3 shadow-sm">
          <div className="text-[10px] text-amber-700 font-bold uppercase tracking-wide mb-1">חלשות</div>
          <div className="text-2xl font-extrabold text-amber-700">{hydrated ? weakCards.length : '—'}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">לחזור עליהן</div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm grid grid-cols-3 gap-2">
        {[
          { id: 'flashcards' as Mode, label: 'כרטיסיות', icon: <Layers className="w-4 h-4" />, hint: 'הצג / הסתר' },
          { id: 'quiz' as Mode,       label: 'חידון',    icon: <ListChecks className="w-4 h-4" />, hint: 'בחר נכון' },
          { id: 'match' as Mode,      label: 'זיכרון',   icon: <Grid3X3 className="w-4 h-4" />, hint: 'התאם זוגות' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-3 py-3 rounded-xl font-bold flex flex-col items-center gap-1 transition-all ${
              mode === m.id
                ? 'bg-gradient-to-l from-violet-600 to-fuchsia-600 text-white shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {m.icon}
              <span className="text-sm md:text-base">{m.label}</span>
            </div>
            <span className={`text-[10px] ${mode === m.id ? 'text-white/80' : 'text-slate-500'}`}>{m.hint}</span>
          </button>
        ))}
      </div>

      {/* Active Mode */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6">
        {mode === 'flashcards' && <FlashcardsMode recordFlash={recordFlash} stats={stats} />}
        {mode === 'quiz' && <QuizMode recordQuiz={recordQuiz} stats={stats} />}
        {mode === 'match' && <MatchMode recordMatch={recordMatch} stats={stats} />}
      </div>

      {/* Weak cards list */}
      {hydrated && weakCards.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
          <div className="font-bold text-amber-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            הגדרות לחזור עליהן ({weakCards.length})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {weakCards.map((c) => (
              <span key={c.id} className="text-xs bg-white border border-amber-300 text-amber-900 px-2 py-1 rounded-lg font-semibold">
                {c.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={reset}
          disabled={!hydrated || (totalFlashAttempts === 0 && totalQuizAttempts === 0 && stats.matchPlays === 0)}
          className="text-xs px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          איפוס סטטיסטיקה
        </button>
      </div>
    </div>
  );
}
