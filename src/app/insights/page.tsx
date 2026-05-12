'use client';

import { useState } from 'react';
import {
  Brain,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import MathExpr from '@/components/MathExpr';
import {
  insightSections,
  insightTypeMeta,
  getTotalInsights,
  type InsightType,
  type Insight,
} from '@/data/insights';

function typeBadge(t?: InsightType) {
  if (!t) return null;
  const meta = insightTypeMeta[t];
  return (
    <span className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full border ${meta.cls}`}>
      {meta.label}
    </span>
  );
}

function InsightRow({ ins, isOpen, onToggle }: { ins: Insight; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-violet-300 transition-colors">
      <button
        onClick={onToggle}
        className="w-full text-right p-3 flex items-start justify-between gap-3 hover:bg-gray-50/50"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            {typeBadge(ins.type)}
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase mt-1 shrink-0 w-12">נתון:</span>
            <div className="flex-1 text-sm text-gray-900 font-medium">
              <MathExpr>{ins.given}</MathExpr>
            </div>
          </div>
          <div className="flex items-center gap-2 my-0.5 mr-12 text-gray-400">
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[10px] font-bold uppercase text-violet-700 mt-1 shrink-0 w-12">מסקנה:</span>
            <div className="flex-1 text-sm font-bold text-violet-900">
              <MathExpr>{ins.conclude}</MathExpr>
            </div>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
      </button>
      {isOpen && (
        <div className="px-3 pb-3 pt-1 border-t border-gray-100 bg-amber-50/30">
          <div className="flex items-start gap-2 text-sm text-gray-800 leading-relaxed">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>{ins.why}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionCard({
  section,
  isExpanded,
  onToggleSection,
  openInsights,
  toggleInsight,
}: {
  section: typeof insightSections[number];
  isExpanded: boolean;
  onToggleSection: () => void;
  openInsights: Record<string, boolean>;
  toggleInsight: (id: string) => void;
}) {
  const isMistakeSection = section.id === 'moed-a';
  return (
    <div className={`rounded-2xl border-2 shadow-sm overflow-hidden ${
      isMistakeSection ? 'border-rose-300 bg-rose-50/30' : 'border-gray-200 bg-white'
    }`}>
      <button
        onClick={onToggleSection}
        className="w-full text-right p-4 flex items-start justify-between gap-3 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${
            isMistakeSection ? 'bg-rose-500' : 'bg-violet-600'
          }`}>
            {section.order}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h3 className="font-bold text-gray-900 text-base">{section.sourceLabel}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-semibold">
                {section.insights.length} מסקנות
              </span>
              {isMistakeSection && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  החולשות שלך
                </span>
              )}
            </div>
            <div className="text-xs text-gray-600">{section.topic}</div>
            {section.description && (
              <div className="text-xs text-rose-700 italic mt-1">{section.description}</div>
            )}
          </div>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 space-y-2 border-t border-gray-100 pt-3">
          {section.insights.map((ins) => (
            <InsightRow
              key={ins.id}
              ins={ins}
              isOpen={!!openInsights[ins.id]}
              onToggle={() => toggleInsight(ins.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function InsightsPage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'fields-systems': true,  // start with first section open
  });
  const [openInsights, setOpenInsights] = useState<Record<string, boolean>>({});

  function toggleSection(id: string) {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleInsight(id: string) {
    setOpenInsights((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function expandAll() {
    const all: Record<string, boolean> = {};
    insightSections.forEach((s) => (all[s.id] = true));
    setExpandedSections(all);
  }

  function collapseAll() {
    setExpandedSections({});
    setOpenInsights({});
  }

  const total = getTotalInsights();

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Brain className="w-6 h-6" />}
        title="תובנות מ-HW + מבחני עבר"
        subtitle={`${total} תובנות בסדר הלמידה. כל סעיף מתאים לשיעורי בית או מבחן. לחיצה פותחת מסקנה — לחיצה שוב פותחת הסבר. ככה תזהי במבחן מה כל נתון נותן לך.`}
        gradient="from-violet-600 to-fuchsia-700"
      />

      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={expandAll}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors"
        >
          פתחי הכל
        </button>
        <button
          onClick={collapseAll}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          סגרי הכל
        </button>
        <span className="text-xs text-gray-500 mr-auto">
          {insightSections.length} סעיפים · {total} תובנות
        </span>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {insightSections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            isExpanded={!!expandedSections[section.id]}
            onToggleSection={() => toggleSection(section.id)}
            openInsights={openInsights}
            toggleInsight={toggleInsight}
          />
        ))}
      </div>

      {/* How to use */}
      <div className="bg-gradient-to-l from-violet-50 to-fuchsia-50 rounded-2xl border border-violet-200 p-5">
        <h3 className="font-bold text-violet-900 mb-2 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-violet-600" />
          איך להשתמש בדף הזה
        </h3>
        <ol className="text-sm text-violet-900 space-y-1.5 pr-5" style={{ listStyleType: 'decimal' }}>
          <li><strong>לפני המבחן:</strong> עברי על כל סעיף לפי הסדר — לחצי לפתיחה, ראי את הנתון, נסי לנחש את המסקנה לבד.</li>
          <li><strong>חזרה ממוקדת:</strong> סעיף 8 (מועד א 2026 — שלך) — שם החולשות. תני דגש לטעויות מסומנות.</li>
          <li><strong>במבחן:</strong> כשאת רואה "נתון: X" — דמייני אילו מסקנות זה פותח. הדף הזה הוא בעצם "אוצר מילים" של נתונים.</li>
          <li><strong>שינון:</strong> נסי לכסות את "מסקנה" ולנחש מ-"נתון". אז סגרי גם את "נתון" ונסי לזכור מההקשר.</li>
        </ol>
      </div>
    </div>
  );
}
