'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Lightbulb,
  Printer,
} from 'lucide-react';
import MathExpr from '@/components/MathExpr';
import { getMockExamById, mockExams } from '@/data/mock-exams';

function Timer({ totalMinutes }: { totalMinutes: number }) {
  const [seconds, setSeconds] = useState(totalMinutes * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <div className="bg-gray-900 text-white rounded-xl p-3 flex items-center gap-3 shadow-lg">
      <Clock className="w-5 h-5" />
      <span className="font-mono text-2xl font-bold tabular-nums">
        {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
      </span>
      <div className="flex gap-1">
        <button
          onClick={() => setRunning(!running)}
          className={`text-xs px-2 py-1 rounded font-semibold ${running ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {running ? 'עצרי' : 'התחילי'}
        </button>
        <button
          onClick={() => { setSeconds(totalMinutes * 60); setRunning(false); }}
          className="text-xs px-2 py-1 rounded font-semibold bg-gray-700 hover:bg-gray-600"
        >
          איפוס
        </button>
      </div>
    </div>
  );
}

export default function MockExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;
  const exam = getMockExamById(examId);

  const [showSolutions, setShowSolutions] = useState<Record<string, boolean>>({});
  const [showAllSolutions, setShowAllSolutions] = useState(false);

  if (!exam) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <p className="text-gray-500">מבחן לא נמצא</p>
        <Link href="/mock-exams" className="text-violet-600 hover:underline mt-4 inline-block">
          ← חזרי לרשימת מבחנים
        </Link>
      </div>
    );
  }

  const togglePart = (key: string) => {
    setShowSolutions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto" dir="rtl">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap no-print">
        <button
          onClick={() => router.push('/mock-exams')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowRight className="w-4 h-4" />
          חזרי למבחנים
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            הדפסה
          </button>
          <button
            onClick={() => setShowAllSolutions(!showAllSolutions)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
              showAllSolutions ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-violet-600 text-white hover:bg-violet-700'
            }`}
          >
            {showAllSolutions ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showAllSolutions ? 'הסתר כל הפתרונות' : 'הצג כל הפתרונות'}
          </button>
        </div>
      </div>

      {/* Timer */}
      <div className="flex justify-end no-print">
        <Timer totalMinutes={exam.durationMinutes} />
      </div>

      {/* Exam Header (printable) */}
      <div className="bg-white rounded-2xl border-2 border-gray-300 p-8 shadow-md print:border-black print:shadow-none">
        <div className="text-center border-b-2 border-gray-300 pb-4 mb-4">
          <h1 className="text-2xl font-extrabold mb-1">אלגברה לינארית 1 — {exam.title}</h1>
          <p className="text-sm text-gray-600">{exam.subtitle}</p>
          <p className="text-xs text-gray-500 mt-2">אוניברסיטת רייכמן · מועד ב 2025-26</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <strong>משך הבחינה:</strong> {exam.durationMinutes / 60} שעות
          </div>
          <div>
            <strong>חומר עזר:</strong> אין
          </div>
          <div>
            <strong>מספר שאלות:</strong> {exam.questions.length}
          </div>
          <div>
            <strong>לענות על:</strong> 4 שאלות
          </div>
        </div>

        <div className="bg-amber-50 border-r-4 border-amber-500 p-4 rounded">
          <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            הוראות
          </h3>
          <ul className="text-sm text-amber-900 space-y-1 mr-4" style={{ listStyleType: 'disc' }}>
            {exam.instructions.map((ins, i) => (
              <li key={i}>{ins}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Questions */}
      {exam.questions.map((q) => (
        <div key={q.qNum} className="bg-white rounded-2xl border-2 border-gray-300 p-6 shadow-md print:border-black print:shadow-none print-break">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="text-xl font-extrabold">שאלה {q.qNum} ({q.totalPoints} נקודות)</h2>
              <span className="text-xs text-gray-500">{q.title}</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1 italic no-print">מבוסס על: {q.basedOn}</p>
          </div>

          <div className="space-y-4">
            {q.parts.map((part, partIdx) => {
              const key = `${q.qNum}-${partIdx}`;
              const isShown = showAllSolutions || !!showSolutions[key];
              return (
                <div key={key} className="border-r-2 border-gray-200 pr-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="font-bold text-gray-900 shrink-0">{part.label}</span>
                    <span className="text-xs text-gray-500 shrink-0">({part.points} נק)</span>
                  </div>
                  <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-line mb-2">
                    {part.text}
                  </div>

                  {part.hint && !isShown && (
                    <details className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-2 no-print">
                      <summary className="text-xs font-semibold text-blue-800 cursor-pointer flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" />
                        רמז
                      </summary>
                      <div className="text-xs text-blue-900 mt-1">{part.hint}</div>
                    </details>
                  )}

                  <button
                    onClick={() => togglePart(key)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors no-print ${
                      isShown ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-violet-100 text-violet-800 hover:bg-violet-200'
                    }`}
                  >
                    {isShown ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {isShown ? 'הסתר פתרון' : 'הצג פתרון'}
                  </button>

                  {isShown && (
                    <div className="mt-3 bg-green-50 border-r-4 border-green-500 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-bold text-green-900 uppercase">פתרון</span>
                      </div>
                      <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">
                        {part.solution}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* End footer */}
      <div className="bg-gray-100 rounded-2xl p-5 text-center">
        <p className="text-sm font-semibold text-gray-700">סוף המבחן</p>
        <p className="text-xs text-gray-500 mt-1">בהצלחה במועד ב! 💪</p>
      </div>
    </div>
  );
}

