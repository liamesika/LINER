'use client';

import Link from 'next/link';
import { FileText, Clock, ChevronLeft, Target, BookOpen } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { mockExams } from '@/data/mock-exams';

function difficultyBadge(d: string) {
  if (d === 'מאוזן') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (d === 'תיאורטי') return 'bg-violet-100 text-violet-700 border-violet-200';
  return 'bg-rose-100 text-rose-700 border-rose-200';
}

export default function MockExamsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={<FileText className="w-6 h-6" />}
        title="מבחני הדמיה"
        subtitle="3 מבחנים בפורמט אמיתי של רייכמן, מבוססים על HW2-12 ומבחני עבר. כל מבחן: 5 שאלות × 25 נק, 3 שעות, ענה על 4."
        gradient="from-slate-700 to-gray-900"
      />

      <div className="space-y-4">
        {mockExams.map((exam) => (
          <Link
            key={exam.id}
            href={`/mock-exams/${exam.id}`}
            className="block bg-white rounded-2xl border-2 border-gray-200 shadow-sm hover:border-violet-400 hover:shadow-md transition-all overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="text-xl font-extrabold text-gray-900">{exam.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${difficultyBadge(exam.difficulty)}`}>
                      {exam.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{exam.subtitle}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {exam.durationMinutes} דקות
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {exam.questions.length} שאלות
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3.5 h-3.5" />
                      ענה על 4 מתוך 5
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {exam.topics.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronLeft className="w-6 h-6 text-gray-300 mt-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-gradient-to-l from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-5">
        <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          איך להשתמש במבחני ההדמיה
        </h3>
        <ol className="text-sm text-amber-900 space-y-1.5 pr-5" style={{ listStyleType: 'decimal' }}>
          <li><strong>תנאי אמת:</strong> סטופר 3 שעות, נייר ועט, ללא חומר עזר.</li>
          <li><strong>בחירת שאלות:</strong> בדקי את כל 5 השאלות תחילה, בחרי 4. דלגי על הקשה ביותר.</li>
          <li><strong>פתרון תחילה לבד:</strong> אל תפתחי "הצג פתרון" לפני שניסית 15 דק.</li>
          <li><strong>סדר מומלץ:</strong> מבחן 1 (מאוזן) → מבחן 2 (תיאורטי) → מבחן 3 (מאתגר).</li>
          <li><strong>אחרי כל מבחן:</strong> רשמי את השגיאות. חזרי על נושאים חלשים.</li>
        </ol>
      </div>
    </div>
  );
}
