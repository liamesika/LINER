'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  Circle,
  FileText,
  ChevronRight,
  BookMarked,
  Lightbulb
} from 'lucide-react'
import { weeksData } from '@/data/liner-weeks'

export default function SyllabusPage() {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('liner-completed-weeks')
    if (saved) {
      setCompletedWeeks(JSON.parse(saved))
    }
  }, [])

  const toggleWeekCompletion = (weekNumber: number) => {
    const newCompleted = completedWeeks.includes(weekNumber)
      ? completedWeeks.filter(w => w !== weekNumber)
      : [...completedWeeks, weekNumber]
    setCompletedWeeks(newCompleted)
    localStorage.setItem('liner-completed-weeks', JSON.stringify(newCompleted))
  }

  const progress = (completedWeeks.length / weeksData.length) * 100

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookOpen className="text-[var(--primary)]" size={32} />
            Weekly Syllabus
          </h1>
          <p className="text-[var(--muted)] mt-1">13 weeks covering all Linear Algebra 1 topics</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-[var(--muted)]">
            {completedWeeks.length} / {weeksData.length} completed
          </div>
          <div className="w-32 h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Weeks Grid */}
      <div className="grid gap-4">
        {weeksData.map((week) => {
          const isCompleted = completedWeeks.includes(week.weekNumber)
          const totalItems = week.definitions.length + week.theorems.length + week.proofs.length
          const practiceCount = week.practiceQuestions.length

          return (
            <div
              key={week.id}
              className={`card transition-all ${isCompleted ? 'border-[var(--accent)]/50 bg-[var(--accent)]/5' : ''}`}
            >
              <div className="flex items-start gap-4">
                {/* Completion Toggle */}
                <button
                  onClick={() => toggleWeekCompletion(week.weekNumber)}
                  className="mt-1 shrink-0"
                  aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="text-[var(--accent)]" size={28} />
                  ) : (
                    <Circle className="text-[var(--muted)] hover:text-[var(--primary)]" size={28} />
                  )}
                </button>

                {/* Week Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Week {week.weekNumber}: {week.title}
                      </h2>
                      {week.titleHe && (
                        <div className="text-sm text-[var(--muted)] mt-0.5" dir="rtl">
                          {week.titleHe}
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/syllabus/${week.weekNumber}`}
                      className="btn btn-primary flex items-center gap-2 shrink-0"
                    >
                      Study Now
                      <ChevronRight size={18} />
                    </Link>
                  </div>

                  <p className="text-[var(--muted)] mb-4">{week.description}</p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-[var(--primary)]" />
                      <span>{week.lectureFiles.length} lectures</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookMarked size={16} className="text-[var(--secondary)]" />
                      <span>{week.definitions.length} definitions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lightbulb size={16} className="text-[var(--warning)]" />
                      <span>{week.theorems.length} theorems</span>
                    </div>
                    {practiceCount > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--accent)]">✎</span>
                        <span>{practiceCount} practice problems</span>
                      </div>
                    )}
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {week.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs rounded-full bg-[var(--primary)]/10 text-[var(--primary)]"
                      >
                        {topic.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
