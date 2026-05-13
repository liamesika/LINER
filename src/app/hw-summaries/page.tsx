'use client';

import { useState } from 'react';
import {
  BookOpen,
  Lightbulb,
  AlertTriangle,
  Wrench,
  ChevronDown,
  ChevronUp,
  Target,
  Eye,
  PlayCircle,
  Compass,
  Brain,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import {
  hwSummaries,
  importanceColors,
  importanceLabels,
  type ProblemInsight,
  type HwSummary,
} from '@/data/hw-summaries';

function ImportanceBadge({ imp }: { imp: ProblemInsight['importance'] }) {
  const c = importanceColors[imp];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {importanceLabels[imp]}
    </span>
  );
}

function ProblemCard({ p, hwId }: { p: ProblemInsight; hwId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-violet-300 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right p-4 flex items-start justify-between gap-3 hover:bg-gray-50/50"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="font-mono text-xs font-bold bg-indigo-600 text-white px-2 py-0.5 rounded">
              {hwId} {p.qNum}
            </span>
            <ImportanceBadge imp={p.importance} />
          </div>
          <div className="text-sm font-bold text-gray-900 mb-1">{p.topic}</div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
          {/* 1. Given */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Eye className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">1️⃣ הנתון</div>
                <div className="text-sm text-slate-800 leading-relaxed">{p.given}</div>
              </div>
            </div>
          </div>

          {/* 2. Recognize */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1">2️⃣ מה לזהות מהנתון</div>
                <div className="text-sm text-purple-900 leading-relaxed">{p.recognize}</div>
              </div>
            </div>
          </div>

          {/* 3. First step */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Compass className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-green-800 uppercase tracking-wide mb-1">3️⃣ הצעד הראשון</div>
                <div className="text-sm text-green-900 leading-relaxed">{p.firstStep}</div>
              </div>
            </div>
          </div>

          {/* 4. Walkthrough */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <PlayCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-2">4️⃣ הליכה מודרכת — צעד-צעד</div>
                <ol className="space-y-1.5">
                  {p.walkthrough.map((step, i) => (
                    <li key={i} className="text-sm text-blue-900 leading-relaxed flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                      <span className="flex-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* 5. What it means */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">5️⃣ מה זה אומר — אינטואיציה</div>
                <div className="text-sm text-amber-900 leading-relaxed">{p.whatItMeans}</div>
              </div>
            </div>
          </div>

          {/* 6. Technique */}
          {p.technique && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-indigo-800 uppercase tracking-wide mb-1">🔧 טכניקה לזכור</div>
                  <div className="text-sm text-indigo-900 leading-relaxed">{p.technique}</div>
                </div>
              </div>
            </div>
          )}

          {/* 7. Trap */}
          {p.trap && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-red-800 uppercase tracking-wide mb-1">⚠️ מלכודת</div>
                  <div className="text-sm text-red-900 leading-relaxed">{p.trap}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HwSection({ hw }: { hw: HwSummary }) {
  const [expanded, setExpanded] = useState(true);
  const counts = {
    critical: hw.problems.filter(p => p.importance === 'critical').length,
    high: hw.problems.filter(p => p.importance === 'high').length,
    medium: hw.problems.filter(p => p.importance === 'medium').length,
  };
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full text-right p-5 bg-gradient-to-l ${hw.accent} text-white hover:opacity-95 transition-opacity`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="text-3xl">{hw.emoji}</div>
            <div className="text-right">
              <div className="font-extrabold text-xl">{hw.title}</div>
              <div className="text-sm opacity-90 mt-0.5">{hw.subtitle}</div>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-sm">
                  {hw.problems.length} שאלות
                </span>
                {counts.critical > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/40 backdrop-blur-sm font-bold">
                    🔴 {counts.critical} קריטיות
                  </span>
                )}
                {counts.high > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/40 backdrop-blur-sm">
                    🟡 {counts.high} חשובות
                  </span>
                )}
              </div>
            </div>
          </div>
          {expanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </div>
      </button>

      {expanded && (
        <div className="p-5 space-y-4">
          {/* Big picture */}
          <div className="bg-gradient-to-l from-violet-50 to-indigo-50 border-r-4 border-violet-500 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Target className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-violet-900 uppercase tracking-wide mb-1">תמונה כללית של ה-HW</div>
                <div className="text-sm text-violet-900 leading-relaxed">{hw.bigPicture}</div>
              </div>
            </div>
          </div>

          {/* Problems */}
          <div className="space-y-2.5">
            {hw.problems.map((p) => (
              <ProblemCard key={p.qNum} p={p} hwId={hw.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HwSummariesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={<BookOpen className="w-6 h-6" />}
        title="HW9 + HW10 + HW12 — הסבר עמוק שאלה-שאלה"
        subtitle="לכל שאלה: הנתון → איך לזהות → צעד ראשון → הליכה מודרכת → מה זה אומר. בעברית פשוטה. מבלי להעתיק פתרון רשמי — אבל מסביר בדיוק איך לחשוב."
        gradient="from-indigo-600 to-purple-700"
      />

      {/* Quick guide */}
      <div className="bg-gradient-to-l from-amber-50 to-orange-50 border-r-4 border-amber-500 rounded-2xl p-5">
        <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          המבנה של כל שאלה:
        </h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm text-amber-900">
          <div>1️⃣ <strong>הנתון</strong> — מה השאלה מוסרת לך</div>
          <div>2️⃣ <strong>מה לזהות</strong> — דפוסים, סימנים</div>
          <div>3️⃣ <strong>הצעד הראשון</strong> — מה לעשות מיד</div>
          <div>4️⃣ <strong>הליכה מודרכת</strong> — צעד-צעד</div>
          <div>5️⃣ <strong>מה זה אומר</strong> — אינטואיציה עמוקה</div>
          <div>🔧 <strong>טכניקה</strong> + ⚠️ <strong>מלכודת</strong></div>
        </div>
      </div>

      {/* HW sections */}
      {hwSummaries.map((hw) => (
        <HwSection key={hw.id} hw={hw} />
      ))}

      {/* Footer encouragement */}
      <div className="bg-gradient-to-l from-violet-600 to-indigo-700 rounded-2xl p-6 text-white text-center shadow-md">
        <div className="text-2xl font-extrabold mb-2">את לא תקועה — את חסרה אינטואיציה.</div>
        <div className="text-sm opacity-90 leading-relaxed">
          כל שאלה היא טריק ספציפי. ברגע שתקראי "מה לזהות" ו"הצעד הראשון" — תראי שזה לא קסם, זה דפוס.
          <br />
          קראי לפחות את כל הקריטיות (🔴) — זה 80% מהמבחן.
        </div>
      </div>
    </div>
  );
}
