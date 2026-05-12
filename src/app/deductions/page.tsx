'use client';

import { useState, useMemo } from 'react';
import {
  Lightbulb,
  Search,
  Star,
  ArrowLeft,
  X,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import MathExpr from '@/components/MathExpr';
import {
  allDeductions,
  categoryLabels,
  categoryColors,
  type DeductionCategory,
  type Deduction,
} from '@/data/deductions';

type Filter = 'all' | 'starred' | DeductionCategory;

function DeductionCard({ d }: { d: Deduction }) {
  const c = categoryColors[d.category];
  return (
    <div className={`rounded-2xl border-2 ${c.border} ${c.bg} p-4 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full bg-white border ${c.border} ${c.text}`}>
            {categoryLabels[d.category]}
          </span>
          {d.starred && (
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              חובה לדעת
            </span>
          )}
          {d.source && (
            <span className="text-[10px] text-gray-500">{d.source}</span>
          )}
        </div>
      </div>

      <h3 className={`font-bold text-base ${c.text} mb-3`}>{d.title}</h3>

      {/* Given → Deduce */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase mt-0.5 shrink-0 w-12">נתון:</span>
          <div className="flex-1 text-sm text-gray-900 font-medium">
            <MathExpr>{d.given}</MathExpr>
          </div>
        </div>
        <div className="flex items-center gap-2 my-1 text-gray-400">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <div className="flex items-start gap-2">
          <span className={`text-[10px] font-bold uppercase mt-0.5 shrink-0 w-12 ${c.text}`}>מסקנה:</span>
          <div className={`flex-1 text-sm font-bold ${c.text}`}>
            <MathExpr>{d.deduce}</MathExpr>
          </div>
        </div>
      </div>

      {/* Why */}
      <div className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <span>{d.why}</span>
      </div>

      {d.example && (
        <div className="mt-2 text-xs text-gray-600 italic border-r-2 border-gray-300 pr-2">
          דוגמה: {d.example}
        </div>
      )}
    </div>
  );
}

export default function DeductionsPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = allDeductions;
    if (filter === 'starred') list = list.filter((d) => d.starred);
    else if (filter !== 'all') list = list.filter((d) => d.category === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((d) =>
        d.title.toLowerCase().includes(q) ||
        d.given.toLowerCase().includes(q) ||
        d.deduce.toLowerCase().includes(q) ||
        d.why.toLowerCase().includes(q),
      );
    }
    return list;
  }, [filter, query]);

  // counts per category
  const countByCategory = useMemo(() => {
    const map: Partial<Record<DeductionCategory, number>> = {};
    for (const d of allDeductions) {
      map[d.category] = (map[d.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const starredCount = allDeductions.filter((d) => d.starred).length;

  const categories: DeductionCategory[] = ['span', 'LI', 'dim', 'subspace', 'rank', 'invertibility', 'determinant'];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Lightbulb className="w-6 h-6" />}
        title="קיצורי הסקה — Given → Deduce"
        subtitle={`${allDeductions.length} מסקנות לוגיות שחוזרות שוב ושוב במבחנים. לכל נתון — מה אפשר להסיק מיד. סנני לפי נושא או חפשי טקסט.`}
        gradient="from-amber-500 to-orange-600"
      />

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חיפוש בהגדרה, מסקנה, או הסבר..."
          className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            filter === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
          }`}
        >
          הכל ({allDeductions.length})
        </button>
        <button
          onClick={() => setFilter('starred')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 ${
            filter === 'starred' ? 'bg-amber-500 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
          }`}
        >
          <Star className="w-3 h-3" />
          חובה לדעת ({starredCount})
        </button>
        {categories.map((cat) => {
          const c = categoryColors[cat];
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isActive ? `${c.bg.replace('50', '600')} text-white` : `bg-white ${c.text} border ${c.border} hover:${c.bg}`
              }`}
              style={isActive ? {
                backgroundColor: c.dot.replace('bg-', '').includes('indigo') ? '#4f46e5'
                  : c.dot.includes('violet') ? '#7c3aed'
                  : c.dot.includes('purple') ? '#9333ea'
                  : c.dot.includes('emerald') ? '#10b981'
                  : c.dot.includes('blue') ? '#2563eb'
                  : c.dot.includes('orange') ? '#ea580c'
                  : '#e11d48'
              } : undefined}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : c.dot}`} />
              {categoryLabels[cat]} ({countByCategory[cat] ?? 0})
            </button>
          );
        })}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">אין תוצאות תואמות</p>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-500">
            {filtered.length} מסקנות
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((d) => (
              <DeductionCard key={d.id} d={d} />
            ))}
          </div>
        </>
      )}

      {/* How to use */}
      <div className="bg-gradient-to-l from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-5">
        <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          איך להשתמש בדף הזה
        </h3>
        <ol className="text-sm text-amber-900 space-y-1.5 pr-5" style={{ listStyleType: 'decimal' }}>
          <li><strong>במבחן:</strong> כשאת רואה "נתון: X", חפשי כאן את X — תיראי מיד מה ניתן להסיק.</li>
          <li><strong>בסקירה:</strong> סנני "חובה לדעת" — אלה הקיצורים שחוזרים הכי הרבה במבחנים.</li>
          <li><strong>שינון:</strong> כסי את עמודת "מסקנה" וננסי לנחש מהנתון.</li>
          <li><strong>חיפוש:</strong> מילים כמו "dim", "rank", "span" — מסננות אוטומטית.</li>
        </ol>
      </div>
    </div>
  );
}
