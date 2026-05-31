import {
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  Filter,
  MinusCircle,
  Star,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import {
  getPriorityCounts,
  homeworkFocusSets,
  priorityLabels,
  type HomeworkPriority,
} from '@/data/homework-focus';

const priorityStyle: Record<HomeworkPriority, string> = {
  must: 'bg-red-50 text-red-800 border-red-200',
  recommended: 'bg-amber-50 text-amber-800 border-amber-200',
  skip: 'bg-slate-100 text-slate-600 border-slate-200',
};

const priorityIcon: Record<HomeworkPriority, React.ReactNode> = {
  must: <Star className="w-4 h-4" />,
  recommended: <CheckCircle2 className="w-4 h-4" />,
  skip: <MinusCircle className="w-4 h-4" />,
};

function StatCard({
  value,
  label,
  className,
}: {
  value: number | string;
  label: string;
  className: string;
}) {
  return (
    <div className={`rounded-xl border p-4 bg-white ${className}`}>
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="text-xs mt-1 opacity-80">{label}</div>
    </div>
  );
}

export default function HomeworkFocusPage() {
  const counts = getPriorityCounts();
  const totalMinutes = homeworkFocusSets.reduce(
    (sum, set) => sum + set.questions.reduce((inner, question) => inner + question.timeMinutes, 0),
    0,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<BookOpenCheck className="w-6 h-6" />}
        title="מיקוד שאלות ממטלות"
        subtitle="לכל מטלה: מה חובה לפתור, מה כדאי רק אם יש זמן, ומה אפשר לדלג כרגע. המטרה היא לא לסיים הכל, אלא להשקיע במקומות שמעלים ציון."
        gradient="from-emerald-600 to-teal-700"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard value={counts.must} label="שאלות חובה" className="border-red-200 text-red-800" />
        <StatCard value={counts.recommended} label="שאלות כדאי" className="border-amber-200 text-amber-800" />
        <StatCard value={counts.skip} label="דילוג כרגע" className="border-slate-200 text-slate-700" />
        <StatCard value={`${Math.round(totalMinutes / 60)}ש׳`} label="זמן נטו לכל המיקוד" className="border-emerald-200 text-emerald-800" />
      </div>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-5 h-5 text-emerald-700" />
          <h2 className="font-extrabold text-slate-900">כלל העבודה</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-900">
            <strong>חובה:</strong> לפתור בכתב, בלי להציץ, ואז לבדוק מול פתרון.
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900">
            <strong>כדאי:</strong> לפתור רק אם שאלות החובה באותה מטלה כבר זורמות.
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-700">
            <strong>לדלג כרגע:</strong> לא כי זה לא חשוב, אלא כי זה פחות יעיל לפני מועד ג.
          </div>
        </div>
      </section>

      <div className="space-y-4">
        {homeworkFocusSets.map((set) => {
          const mustCount = set.questions.filter((question) => question.priority === 'must').length;
          const minutes = set.questions.reduce((sum, question) => sum + question.timeMinutes, 0);

          return (
            <section key={set.homeworkNumber} id={`hw-${set.homeworkNumber}`} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 p-4 md:p-5 bg-slate-50">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-xs font-bold text-emerald-700">מטלה {set.homeworkNumber}</div>
                    <h2 className="text-xl font-extrabold text-slate-900 mt-1">{set.title}</h2>
                    <p className="text-sm text-slate-700 mt-2">{set.verdict}</p>
                    <p className="text-sm text-emerald-900 mt-1 font-semibold">{set.focus}</p>
                  </div>
                  <div className="flex gap-2 text-xs font-bold">
                    <span className="rounded-full bg-red-100 text-red-800 px-3 py-1">{mustCount} חובה</span>
                    <span className="rounded-full bg-white text-slate-700 px-3 py-1 border border-slate-200 flex items-center gap-1">
                      <Clock3 className="w-3.5 h-3.5" />
                      {minutes} דק׳
                    </span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {set.questions.map((question) => (
                  <article key={`${set.homeworkNumber}-${question.question}`} className="p-4 md:p-5">
                    <div className="grid lg:grid-cols-[160px_1fr] gap-3">
                      <div className="flex lg:flex-col items-center lg:items-start gap-2">
                        <div className="font-extrabold text-slate-900">{question.question}</div>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${priorityStyle[question.priority]}`}>
                          {priorityIcon[question.priority]}
                          {priorityLabels[question.priority]}
                        </span>
                        {question.timeMinutes > 0 && (
                          <span className="text-xs text-slate-500">{question.timeMinutes} דק׳</span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-slate-800 leading-relaxed">{question.reason}</p>
                        <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-xs text-slate-700">
                          <strong>מה זה מאמן:</strong> {question.examSkill}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
