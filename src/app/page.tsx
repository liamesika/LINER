'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Brain,
  TrendingUp,
  CheckCircle2,
  Clock,
  Target,
  Flame,
  ChevronLeft,
  GraduationCap,
  Dumbbell,
  FileQuestion,
  Library
} from 'lucide-react'
import { weeksData } from '@/data/liner-weeks'
import { getTopLikelihoodItems } from '@/data/liner-likelihood'
import { getHighLikelihoodHomework, getHomeworkStats } from '@/data/liner-homework'

export default function Dashboard() {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('liner-completed-weeks')
    if (saved) {
      setCompletedWeeks(JSON.parse(saved))
    }
  }, [])

  const progress = (completedWeeks.length / weeksData.length) * 100
  const topLikelihood = getTopLikelihoodItems(5)
  const topHomework = getHighLikelihoodHomework().slice(0, 5)
  const hwStats = getHomeworkStats()

  const totalDefinitions = weeksData.reduce((acc, w) => acc + w.definitions.length, 0)
  const totalTheorems = weeksData.reduce((acc, w) => acc + w.theorems.length, 0)

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Brain className="text-[var(--primary)]" size={36} />
            מרכז הלימוד - אלגברה לינארית
          </h1>
          <p className="text-[var(--muted)] mt-1">מערכת הלימוד המקיפה שלך לאלגברה לינארית 1</p>
        </div>
        <Link
          href="/roadmap"
          className="btn btn-primary flex items-center gap-2"
        >
          <Clock size={18} />
          צור תוכנית לימודים
        </Link>
      </div>

      {/* Progress Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Target className="text-[var(--primary)]" size={24} />
            סקירת התקדמות
          </h2>
          <span className="text-lg font-bold text-[var(--primary)]">{progress.toFixed(0)}%</span>
        </div>
        <div className="progress-bar mb-4">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-[var(--border)]/30 rounded-lg">
            <div className="text-2xl font-bold text-[var(--primary)]">{completedWeeks.length}</div>
            <div className="text-sm text-[var(--muted)]">שבועות הושלמו</div>
          </div>
          <div className="text-center p-4 bg-[var(--border)]/30 rounded-lg">
            <div className="text-2xl font-bold text-[var(--secondary)]">{weeksData.length - completedWeeks.length}</div>
            <div className="text-sm text-[var(--muted)]">שבועות נותרו</div>
          </div>
          <div className="text-center p-4 bg-[var(--border)]/30 rounded-lg">
            <div className="text-2xl font-bold text-[var(--accent)]">{totalDefinitions}</div>
            <div className="text-sm text-[var(--muted)]">הגדרות</div>
          </div>
          <div className="text-center p-4 bg-[var(--border)]/30 rounded-lg">
            <div className="text-2xl font-bold text-[var(--warning)]">{totalTheorems}</div>
            <div className="text-sm text-[var(--muted)]">משפטים</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/syllabus" className="card hover:border-[var(--primary)] transition-colors group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
              <BookOpen size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">לימוד שבועי</h3>
              <p className="text-sm text-[var(--muted)]">{weeksData.length} שבועות של חומר</p>
            </div>
            <ChevronLeft className="text-[var(--muted)] group-hover:text-[var(--primary)]" />
          </div>
        </Link>

        <Link href="/homework" className="card hover:border-[var(--warning)] transition-colors group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[var(--warning)]/10 text-[var(--warning)] group-hover:bg-[var(--warning)] group-hover:text-white transition-colors">
              <FileQuestion size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">שיעורי בית</h3>
              <p className="text-sm text-[var(--muted)]">{hwStats.byLevel['גבוהה מאוד']} שאלות בסבירות גבוהה</p>
            </div>
            <ChevronLeft className="text-[var(--muted)] group-hover:text-[var(--warning)]" />
          </div>
        </Link>

        <Link href="/practice" className="card hover:border-[var(--secondary)] transition-colors group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-white transition-colors">
              <Dumbbell size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">תרגול</h3>
              <p className="text-sm text-[var(--muted)]">כרטיסיות ותרגילים</p>
            </div>
            <ChevronLeft className="text-[var(--muted)] group-hover:text-[var(--secondary)]" />
          </div>
        </Link>
      </div>

      {/* Top Likelihood Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Flame className="text-[var(--danger)]" size={24} />
              הכי סביר במבחן
            </h2>
            <Link href="/likelihood" className="text-sm text-[var(--primary)] hover:underline">
              הצג הכל ←
            </Link>
          </div>
          <div className="space-y-3">
            {topLikelihood.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-[var(--border)]/20 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.title}</div>
                  <div className="text-xs text-[var(--muted)]">
                    {item.itemType === 'theorem' ? 'משפט' : item.itemType === 'definition' ? 'הגדרה' : item.itemType}
                  </div>
                </div>
                <div className={`badge ${item.likelihoodScore >= 90 ? 'likelihood-critical' : item.likelihoodScore >= 70 ? 'likelihood-high' : 'likelihood-medium'}`}>
                  {item.likelihoodScore}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="text-[var(--accent)]" size={24} />
              שאלות ש״ב בסבירות גבוהה
            </h2>
            <Link href="/homework" className="text-sm text-[var(--primary)] hover:underline">
              הצג הכל ←
            </Link>
          </div>
          <div className="space-y-3">
            {topHomework.map((hw) => (
              <div key={hw.id} className="p-3 bg-[var(--border)]/20 rounded-lg">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm line-clamp-2">{hw.question}</div>
                    <div className="text-xs text-[var(--muted)] mt-1">
                      שבוע {hw.weekNumber} · {hw.topic.replace(/-/g, ' ')}
                    </div>
                  </div>
                  <div className={`shrink-0 px-2 py-1 text-xs font-bold rounded-full ${
                    hw.likelihoodLevel === 'גבוהה מאוד' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                    hw.likelihoodLevel === 'גבוהה' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}>
                    {hw.likelihoodLevel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* More Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/knowledge" className="card text-center hover:border-[var(--primary)] transition-colors">
          <Library size={32} className="mx-auto mb-2 text-[var(--primary)]" />
          <div className="font-semibold">בסיס ידע</div>
          <div className="text-xs text-[var(--muted)]">{totalDefinitions + totalTheorems} פריטים</div>
        </Link>
        <Link href="/exams" className="card text-center hover:border-[var(--accent)] transition-colors">
          <GraduationCap size={32} className="mx-auto mb-2 text-[var(--accent)]" />
          <div className="font-semibold">ניתוח מבחנים</div>
          <div className="text-xs text-[var(--muted)]">דפוסים וטיפים</div>
        </Link>
        <Link href="/likelihood" className="card text-center hover:border-[var(--danger)] transition-colors">
          <TrendingUp size={32} className="mx-auto mb-2 text-[var(--danger)]" />
          <div className="font-semibold">סיכויי הופעה</div>
          <div className="text-xs text-[var(--muted)]">ניתוח סטטיסטי</div>
        </Link>
        <Link href="/roadmap" className="card text-center hover:border-[var(--secondary)] transition-colors">
          <Target size={32} className="mx-auto mb-2 text-[var(--secondary)]" />
          <div className="font-semibold">תוכנית לימודים</div>
          <div className="text-xs text-[var(--muted)]">תכנון אישי</div>
        </Link>
      </div>

      {/* Weekly Progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="text-[var(--accent)]" size={24} />
            התקדמות שבועית
          </h2>
          <Link href="/syllabus" className="text-sm text-[var(--primary)] hover:underline">
            צפה בסילבוס ←
          </Link>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-13 gap-2">
          {weeksData.map((week) => (
            <Link
              key={week.id}
              href={`/syllabus/${week.weekNumber}`}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                completedWeeks.includes(week.weekNumber)
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--border)]/30 hover:bg-[var(--border)]/50'
              }`}
              title={week.titleHe || week.title}
            >
              {week.weekNumber}
            </Link>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[var(--accent)]"></div>
            <span>הושלם</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[var(--border)]/50"></div>
            <span>טרם הושלם</span>
          </div>
        </div>
      </div>
    </div>
  )
}
