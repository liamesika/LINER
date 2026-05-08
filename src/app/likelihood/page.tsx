'use client';

import { TrendingUp, Target, BookOpen, AlertCircle, FileQuestion } from 'lucide-react';
import { topicFrequencies, getTopicsByLikelihood } from '@/data/exam-data';
import { getAllWeeks } from '@/data/weeks-content';
import { getHighLikelihoodHomework } from '@/data/liner-homework';

const topicHebrewMap: Record<string, string> = {
  'fields': 'שדות',
  'complex-numbers': 'מספרים מרוכבים',
  'linear-equations': 'משוואות ליניאריות',
  'vector-spaces': 'מרחבים וקטוריים',
  'subspaces': 'תת-מרחבים',
  'linear-combinations': 'צירופים לינאריים',
  'span': 'מרחב נפרש',
  'linear-independence': 'אי-תלות לינארית',
  'basis': 'בסיס',
  'dimension': 'מימד',
  'matrices': 'מטריצות',
  'invertible-matrices': 'מטריצות הפיכות',
  'systems-of-equations': 'מערכות משוואות',
  'row-reduction': 'דירוג שורות',
  'determinants': 'דטרמיננטות',
  'rank': 'דרגה',
  'row-column-space': 'מרחב שורות ועמודות',
  'other': 'אחר',
};

export default function LikelihoodPage() {
  const sortedTopics = getTopicsByLikelihood();
  const weeks = getAllWeeks();
  const highLikelihoodHw = getHighLikelihoodHomework();

  const likelyItems = weeks.flatMap(week => [
    ...week.definitions.map(d => ({
      title: d.title,
      type: 'definition' as const,
      week: week.weekNumber,
    })),
    ...week.theorems.map(t => ({
      title: t.title,
      type: 'theorem' as const,
      week: week.weekNumber,
    })),
  ]).slice(0, 30);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-indigo-600" />
          סבירות למבחן
        </h1>
        <p className="text-gray-500">מבוסס על ניתוח מבחנים קודמים</p>
      </div>

      {/* Important Alert */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <h3 className="font-medium text-red-800 flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5" />
          נושאים קריטיים - חובה לדעת!
        </h3>
        <div className="flex flex-wrap gap-2">
          {sortedTopics.filter(t => t.percentage >= 80).map(t => (
            <span key={t.topic} className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
              {t.topicHe} ({t.percentage}%)
            </span>
          ))}
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" />
          התפלגות נושאים לפי סבירות
        </h2>
        <div className="space-y-3">
          {sortedTopics.map((topic) => (
            <div key={topic.topic} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-gray-700">
                {topic.topicHe}
              </div>
              <div className="flex-1">
                <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      topic.percentage >= 80 ? 'bg-red-500' :
                      topic.percentage >= 60 ? 'bg-orange-500' :
                      topic.percentage >= 40 ? 'bg-yellow-500' :
                      'bg-gray-400'
                    }`}
                    style={{ width: `${topic.percentage}%` }}
                  />
                </div>
              </div>
              <div className="w-16 text-left">
                <span className={`font-bold ${
                  topic.percentage >= 80 ? 'text-red-600' :
                  topic.percentage >= 60 ? 'text-orange-600' :
                  'text-gray-600'
                }`}>
                  {topic.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High Likelihood Homework Exercises */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileQuestion className="w-5 h-5 text-orange-600" />
          תרגילים מש&quot;ב שסביר שיופיעו במבחן
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          תרגילים משיעורי הבית עם סבירות גבוהה להופיע במבחן, לפי ניתוח דפוסים ממבחנים קודמים
        </p>
        <div className="space-y-3">
          {highLikelihoodHw.map((hw, i) => (
            <div
              key={hw.id}
              className={`p-4 rounded-lg border ${
                hw.likelihoodScore >= 95 ? 'bg-red-50 border-red-200' :
                hw.likelihoodScore >= 90 ? 'bg-orange-50 border-orange-200' :
                'bg-yellow-50 border-yellow-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${
                  hw.likelihoodScore >= 95 ? 'bg-red-500' :
                  hw.likelihoodScore >= 90 ? 'bg-orange-500' :
                  'bg-yellow-500'
                }`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">תרגיל {hw.homeworkNumber} שאלה {hw.questionNumber}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      hw.likelihoodScore >= 95 ? 'bg-red-100 text-red-700' :
                      hw.likelihoodScore >= 90 ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {hw.likelihoodScore}%
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {topicHebrewMap[hw.topic] || hw.topic}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 font-mono">{hw.question}</p>
                  {hw.evidence?.reasoningHe && (
                    <p className="text-xs text-gray-500 mt-1">{hw.evidence.reasoningHe}</p>
                  )}
                  {hw.examAppearances > 0 && (
                    <p className="text-xs text-indigo-600 mt-1">
                      הופיע {hw.examAppearances} פעמים במבחנים
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example Questions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          דוגמאות לשאלות נפוצות
        </h2>
        <div className="space-y-4">
          {sortedTopics.slice(0, 5).map((topic) => (
            <div key={topic.topic} className="border-b border-gray-100 pb-4 last:border-0">
              <h3 className="font-medium text-gray-800 mb-2">{topic.topicHe}</h3>
              <ul className="space-y-1">
                {topic.exampleQuestions.map((q, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-indigo-400">-</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Top Items to Study */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">מה ללמוד קודם</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {likelyItems.slice(0, 12).map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                i < 4 ? 'bg-red-500' : i < 8 ? 'bg-orange-500' : 'bg-yellow-500'
              }`}>
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                <p className="text-xs text-gray-500">
                  {item.type === 'theorem' ? 'משפט' : 'הגדרה'} - שבוע {item.week}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
