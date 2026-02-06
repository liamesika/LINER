'use client'

import { useState, useEffect } from 'react'
import {
  Map,
  Calendar,
  Clock,
  Target,
  CheckCircle2,
  Circle,
  Flame,
  BookOpen,
  Dumbbell,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2
} from 'lucide-react'
import { weeksData } from '@/data/liner-weeks'
import { getTopLikelihoodItems } from '@/data/liner-likelihood'
import { format, addDays, differenceInDays, isToday, isBefore, parseISO } from 'date-fns'

interface DayPlan {
  date: string
  tasks: {
    id: string
    title: string
    type: 'review' | 'practice' | 'new-material'
    weekNumber?: number
    completed: boolean
  }[]
}

interface StudyPlanData {
  examDate: string
  hoursPerDay: number
  plan: DayPlan[]
  createdAt: string
}

export default function RoadmapPage() {
  const [examDate, setExamDate] = useState('')
  const [hoursPerDay, setHoursPerDay] = useState(4)
  const [studyPlan, setStudyPlan] = useState<StudyPlanData | null>(null)
  const [expandedDay, setExpandedDay] = useState<string | null>(null)
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])

  // Load saved plan and completed weeks
  useEffect(() => {
    const savedPlan = localStorage.getItem('liner-study-plan')
    if (savedPlan) {
      setStudyPlan(JSON.parse(savedPlan))
    }
    const savedWeeks = localStorage.getItem('liner-completed-weeks')
    if (savedWeeks) {
      setCompletedWeeks(JSON.parse(savedWeeks))
    }
  }, [])

  // Generate study plan
  const generatePlan = () => {
    if (!examDate) {
      alert('Please select an exam date')
      return
    }

    const today = new Date()
    const exam = parseISO(examDate)
    const daysUntilExam = differenceInDays(exam, today)

    if (daysUntilExam < 1) {
      alert('Exam date must be in the future')
      return
    }

    const incompletedWeeks = weeksData.filter(w => !completedWeeks.includes(w.weekNumber))
    const topItems = getTopLikelihoodItems(10)

    const plan: DayPlan[] = []

    // Phase 1: Cover all weeks (70% of time)
    const weekDays = Math.ceil(daysUntilExam * 0.7)
    const weeksPerDay = Math.ceil(incompletedWeeks.length / weekDays)

    let weekIndex = 0
    for (let i = 0; i < weekDays && weekIndex < incompletedWeeks.length; i++) {
      const dayDate = addDays(today, i)
      const dayPlan: DayPlan = {
        date: format(dayDate, 'yyyy-MM-dd'),
        tasks: [],
      }

      // Add weeks to study this day
      for (let j = 0; j < weeksPerDay && weekIndex < incompletedWeeks.length; j++) {
        const week = incompletedWeeks[weekIndex]
        dayPlan.tasks.push({
          id: `week-${week.weekNumber}-${i}`,
          title: `Study Week ${week.weekNumber}: ${week.title}`,
          type: 'new-material',
          weekNumber: week.weekNumber,
          completed: false,
        })
        weekIndex++
      }

      // Add practice task every other day
      if (i % 2 === 1) {
        dayPlan.tasks.push({
          id: `practice-${i}`,
          title: 'Practice: Flashcards (30 min)',
          type: 'practice',
          completed: false,
        })
      }

      plan.push(dayPlan)
    }

    // Phase 2: Review and exam prep (30% of time)
    const reviewDays = daysUntilExam - weekDays
    for (let i = 0; i < reviewDays; i++) {
      const dayDate = addDays(today, weekDays + i)
      const dayPlan: DayPlan = {
        date: format(dayDate, 'yyyy-MM-dd'),
        tasks: [],
      }

      // Add high-likelihood item review
      const itemIndex = i % topItems.length
      dayPlan.tasks.push({
        id: `review-${i}`,
        title: `Review: ${topItems[itemIndex].title}`,
        type: 'review',
        completed: false,
      })

      // Add practice
      dayPlan.tasks.push({
        id: `exam-prep-${i}`,
        title: 'Exam Drill Practice (45 min)',
        type: 'practice',
        completed: false,
      })

      // Add review of completed weeks
      if (i < weeksData.length) {
        dayPlan.tasks.push({
          id: `week-review-${i}`,
          title: `Quick Review: Week ${(i % weeksData.length) + 1}`,
          type: 'review',
          weekNumber: (i % weeksData.length) + 1,
          completed: false,
        })
      }

      plan.push(dayPlan)
    }

    const newPlan: StudyPlanData = {
      examDate,
      hoursPerDay,
      plan,
      createdAt: new Date().toISOString(),
    }

    setStudyPlan(newPlan)
    localStorage.setItem('liner-study-plan', JSON.stringify(newPlan))
  }

  // Toggle task completion
  const toggleTask = (dayIndex: number, taskId: string) => {
    if (!studyPlan) return

    const newPlan = { ...studyPlan }
    const task = newPlan.plan[dayIndex].tasks.find(t => t.id === taskId)
    if (task) {
      task.completed = !task.completed
    }

    setStudyPlan(newPlan)
    localStorage.setItem('liner-study-plan', JSON.stringify(newPlan))
  }

  // Clear plan
  const clearPlan = () => {
    setStudyPlan(null)
    localStorage.removeItem('liner-study-plan')
  }

  // Calculate progress
  const getProgress = () => {
    if (!studyPlan) return { completed: 0, total: 0 }
    const total = studyPlan.plan.reduce((acc, day) => acc + day.tasks.length, 0)
    const completed = studyPlan.plan.reduce(
      (acc, day) => acc + day.tasks.filter(t => t.completed).length,
      0
    )
    return { completed, total }
  }

  const progress = getProgress()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Map className="text-[var(--primary)]" size={32} />
          Study Roadmap
        </h1>
        <p className="text-[var(--muted)] mt-1">
          Create a personalized day-by-day study plan for your exam
        </p>
      </div>

      {!studyPlan ? (
        /* Plan Creator */
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Create Your Study Plan</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                <Calendar className="inline mr-2" size={16} />
                Exam Date
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                className="w-full px-4 py-3 bg-[var(--border)]/30 border border-[var(--border)] rounded-lg text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Clock className="inline mr-2" size={16} />
                Hours per Day: {hoursPerDay}
              </label>
              <input
                type="range"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                min={1}
                max={8}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[var(--muted)]">
                <span>1 hour</span>
                <span>8 hours</span>
              </div>
            </div>

            {examDate && (
              <div className="p-4 bg-[var(--primary)]/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="text-[var(--primary)]" size={18} />
                  <span className="font-semibold">Plan Summary</span>
                </div>
                <ul className="text-sm space-y-1 text-[var(--muted)]">
                  <li>• {differenceInDays(parseISO(examDate), new Date())} days until exam</li>
                  <li>• {weeksData.length - completedWeeks.length} weeks to cover</li>
                  <li>• {hoursPerDay * differenceInDays(parseISO(examDate), new Date())} total study hours</li>
                </ul>
              </div>
            )}

            <button
              onClick={generatePlan}
              className="w-full btn btn-primary flex items-center justify-center gap-2 py-4 text-lg"
            >
              <Plus size={20} />
              Generate Study Plan
            </button>
          </div>
        </div>
      ) : (
        /* Study Plan View */
        <>
          {/* Progress Overview */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Target className="text-[var(--primary)]" size={24} />
                  Your Study Plan
                </h2>
                <p className="text-sm text-[var(--muted)]">
                  Exam: {format(parseISO(studyPlan.examDate), 'MMMM d, yyyy')}
                </p>
              </div>
              <button
                onClick={clearPlan}
                className="text-[var(--danger)] hover:bg-[var(--danger)]/10 p-2 rounded-lg transition-colors"
                title="Delete plan"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{progress.completed} / {progress.total} tasks</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress.total > 0 ? (progress.completed / progress.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-[var(--accent)]/10 rounded-lg">
                <div className="text-2xl font-bold text-[var(--accent)]">{progress.completed}</div>
                <div className="text-xs text-[var(--muted)]">Completed</div>
              </div>
              <div className="p-3 bg-[var(--warning)]/10 rounded-lg">
                <div className="text-2xl font-bold text-[var(--warning)]">
                  {progress.total - progress.completed}
                </div>
                <div className="text-xs text-[var(--muted)]">Remaining</div>
              </div>
              <div className="p-3 bg-[var(--primary)]/10 rounded-lg">
                <div className="text-2xl font-bold text-[var(--primary)]">
                  {differenceInDays(parseISO(studyPlan.examDate), new Date())}
                </div>
                <div className="text-xs text-[var(--muted)]">Days Left</div>
              </div>
            </div>
          </div>

          {/* Daily Plans */}
          <div className="space-y-3">
            {studyPlan.plan.map((day, dayIndex) => {
              const dayDate = parseISO(day.date)
              const isExpanded = expandedDay === day.date
              const dayCompleted = day.tasks.every(t => t.completed)
              const todayClass = isToday(dayDate) ? 'ring-2 ring-[var(--primary)]' : ''
              const pastClass = isBefore(dayDate, new Date()) && !isToday(dayDate) ? 'opacity-60' : ''

              return (
                <div key={day.date} className={`card ${todayClass} ${pastClass}`}>
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedDay(isExpanded ? null : day.date)}
                  >
                    <div className="flex items-center gap-4">
                      {dayCompleted ? (
                        <CheckCircle2 className="text-[var(--accent)]" size={24} />
                      ) : (
                        <Circle className="text-[var(--muted)]" size={24} />
                      )}
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {format(dayDate, 'EEEE, MMM d')}
                          {isToday(dayDate) && (
                            <span className="badge bg-[var(--primary)] text-white text-xs">Today</span>
                          )}
                        </div>
                        <div className="text-sm text-[var(--muted)]">
                          {day.tasks.filter(t => t.completed).length} / {day.tasks.length} tasks
                        </div>
                      </div>
                    </div>
                    <button className="p-2">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-2">
                      {day.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            task.completed ? 'bg-[var(--accent)]/10' : 'bg-[var(--border)]/20'
                          }`}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleTask(dayIndex, task.id)
                            }}
                          >
                            {task.completed ? (
                              <CheckCircle2 className="text-[var(--accent)]" size={22} />
                            ) : (
                              <Circle className="text-[var(--muted)]" size={22} />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className={`font-medium ${task.completed ? 'line-through text-[var(--muted)]' : ''}`}>
                              {task.title}
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            task.type === 'new-material' ? 'bg-[var(--primary)]/20 text-[var(--primary)]' :
                            task.type === 'practice' ? 'bg-[var(--secondary)]/20 text-[var(--secondary)]' :
                            'bg-[var(--warning)]/20 text-[var(--warning)]'
                          }`}>
                            {task.type === 'new-material' ? (
                              <><BookOpen size={12} className="inline mr-1" /> New</>
                            ) : task.type === 'practice' ? (
                              <><Dumbbell size={12} className="inline mr-1" /> Practice</>
                            ) : (
                              <><Flame size={12} className="inline mr-1" /> Review</>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
