'use client';

import Link from 'next/link';
import {
  BookOpen,
  TrendingUp,
  GraduationCap,
  Trophy,
  Crosshair,
  Swords,
  Layers,
  Calculator,
  ChevronLeft,
  Calendar,
  Target,
  Brain,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { getAllWeeks } from '@/data/weeks-content';
import { topTheorems } from '@/data/top-theorems';
import { topHomework } from '@/data/top-homework';
import { battlePlan, examMeta } from '@/data/battle-plan-moed-b';

export default function Dashboard() {
  const weeks = getAllWeeks();

  const stats = {
    definitions: weeks.reduce((sum, w) => sum + w.definitions.length, 0),
    theorems: weeks.reduce((sum, w) => sum + w.theorems.length, 0),
    techniques: weeks.reduce((sum, w) => sum + w.techniques.length, 0),
    weeks: weeks.length,
  };

  const today = battlePlan[0];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Calculator className="w-6 h-6" />}
        title="LINER — אלגברה לינארית"
        subtitle="מערכת לימוד מותאמת מועד ב 2025-26. תוכנית קרב, top 10 משפטים+הוכחות, top 10 תרגילים, וחיזוי המבחן."
        gradient="from-indigo-600 to-blue-700"
      />

      {/* Exam countdown — primary CTA */}
      <Link href="/battle-plan" className="block">
        <div className="bg-gradient-to-l from-red-500 via-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-7 h-7 mt-1" />
              <div>
                <div className="text-sm opacity-90">המבחן ביום</div>
                <div className="text-xl font-extrabold">{examMeta.examLabel}</div>
                <div className="text-sm opacity-90 mt-1">3 שעות · 5 שאלות · ענה על 4</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold">{examMeta.daysFromToday}</div>
              <div className="text-sm opacity-90">ימים נותרו</div>
            </div>
            <ChevronLeft className="w-6 h-6 opacity-70" />
          </div>
        </div>
      </Link>

      {/* Battle Plan + Today block */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/battle-plan" className="block">
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition-shadow h-full">
            <div className="flex items-start justify-between mb-3">
              <Swords className="w-7 h-7" />
              <ChevronLeft className="w-5 h-5 opacity-70" />
            </div>
            <h3 className="text-xl font-extrabold mb-1">תוכנית קרב</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              {examMeta.studyDays} ימי לימוד × {examMeta.hoursPerDay} שעות = {examMeta.totalStudyHours} שעות. כל יום
              ממוקד במשהו ספציפי.
            </p>
          </div>
        </Link>

        <Link href="/moed-b-prediction" className="block">
          <div className="bg-gradient-to-br from-rose-500 to-pink-700 rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition-shadow h-full">
            <div className="flex items-start justify-between mb-3">
              <Crosshair className="w-7 h-7" />
              <ChevronLeft className="w-5 h-5 opacity-70" />
            </div>
            <h3 className="text-xl font-extrabold mb-1">חיזוי המבחן</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              ניתוח 5 השאלות הצפויות לפי מועד א 2025 וסימולציה. מה לשים עליו דגש, ומה כבר נשאל.
            </p>
          </div>
        </Link>
      </div>

      {/* Top 10 cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/top-theorems" className="block">
          <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-sm hover:shadow-md transition-all h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 font-bold">
                {topTheorems.length} משפטים
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-1">Top 10 משפטים + הוכחות</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              10 ההוכחות הסבירות למבחן, עם הוכחה מילה במילה, מלכודות, ווריאציות.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              {topTheorems.slice(0, 3).map((t) => (
                <span key={t.id} className="px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                  #{t.rank} {t.probability}%
                </span>
              ))}
              <span className="text-gray-400">+ 7 נוספים</span>
            </div>
          </div>
        </Link>

        <Link href="/top-homework" className="block">
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-sm hover:shadow-md transition-all h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold">
                {topHomework.length} תרגילים
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-1">Top 10 תרגילים</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              10 התרגילים שמכינים אותך לכל סוג שאלה — פתרון מלא + תבנית לזכור.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-green-50 text-green-700">
                {topHomework.filter((h) => h.difficulty === 'easy').length} קלים
              </span>
              <span className="px-2 py-0.5 rounded bg-yellow-50 text-yellow-700">
                {topHomework.filter((h) => h.difficulty === 'medium').length} בינוניים
              </span>
              <span className="px-2 py-0.5 rounded bg-red-50 text-red-700">
                {topHomework.filter((h) => h.difficulty === 'hard').length} קשים
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card" style={{ '--stat-accent': '#2563eb' } as React.CSSProperties}>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{stats.definitions}</p>
              <p className="text-xs text-gray-500">הגדרות</p>
            </div>
          </div>
        </div>
        <div className="stat-card" style={{ '--stat-accent': '#9333ea' } as React.CSSProperties}>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{stats.theorems}</p>
              <p className="text-xs text-gray-500">משפטים</p>
            </div>
          </div>
        </div>
        <div className="stat-card" style={{ '--stat-accent': '#16a34a' } as React.CSSProperties}>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{stats.techniques}</p>
              <p className="text-xs text-gray-500">טכניקות</p>
            </div>
          </div>
        </div>
        <div className="stat-card" style={{ '--stat-accent': '#4f46e5' } as React.CSSProperties}>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{stats.weeks}</p>
              <p className="text-xs text-gray-500">שבועות</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's plan preview */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-violet-600" />
            התוכנית של היום ({today.weekday}, {today.date})
          </h2>
          <Link href="/battle-plan" className="text-sm text-violet-600 hover:underline">
            לתוכנית המלאה
          </Link>
        </div>
        <div className="p-5">
          <div className="font-bold text-gray-900 mb-1">{today.title}</div>
          <div className="text-sm text-gray-600 mb-3">{today.subtitle}</div>
          <div className="space-y-2">
            {today.blocks.slice(0, 4).map((b, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="font-mono text-xs text-gray-500 w-24 flex-shrink-0">{b.time}</span>
                <span className="text-gray-800 flex-1">{b.task}</span>
              </div>
            ))}
            <Link href="/battle-plan" className="block text-center text-sm text-violet-600 hover:underline pt-2 border-t border-gray-50">
              + עוד {today.blocks.length - 4} שעות פעילות
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/weeks"
          className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-4 hover:from-indigo-600 hover:to-indigo-700 transition-all"
        >
          <Layers className="w-6 h-6 mb-2" />
          <p className="font-semibold">לימוד שבועי</p>
          <p className="text-sm text-indigo-100">סיכומים לפי שבועות</p>
        </Link>
        <Link
          href="/knowledge"
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          <BookOpen className="w-6 h-6 mb-2" />
          <p className="font-semibold">בסיס ידע</p>
          <p className="text-sm text-blue-100">הגדרות + משפטים מלאים</p>
        </Link>
        <Link
          href="/exams"
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 hover:from-orange-600 hover:to-orange-700 transition-all"
        >
          <TrendingUp className="w-6 h-6 mb-2" />
          <p className="font-semibold">מבחני עבר</p>
          <p className="text-sm text-orange-100">מבחנים + פתרונות</p>
        </Link>
        <Link
          href="/summary"
          className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl p-4 hover:from-emerald-600 hover:to-teal-700 transition-all"
        >
          <BookOpen className="w-6 h-6 mb-2" />
          <p className="font-semibold">סיכום מלא</p>
          <p className="text-sm text-emerald-100">כל החומר במקום אחד</p>
        </Link>
      </div>
    </div>
  );
}
