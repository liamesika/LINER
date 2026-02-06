'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Dumbbell,
  Shuffle,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Target,
  Clock,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Flame
} from 'lucide-react'
import { allDefinitions, allTheorems } from '@/data/liner-knowledge'
import { homeworkData } from '@/data/liner-homework'
import { weeksData } from '@/data/liner-weeks'
import type { KnowledgeItem } from '@/types'

type PracticeMode = 'flashcard' | 'identify-tool' | 'exam-drill'

interface FlashcardState {
  items: KnowledgeItem[]
  currentIndex: number
  revealed: boolean
  score: { correct: number; total: number }
}

export default function PracticePage() {
  const [mode, setMode] = useState<PracticeMode | null>(null)
  const [flashcardState, setFlashcardState] = useState<FlashcardState | null>(null)
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all')
  const [selectedType, setSelectedType] = useState<'all' | 'definitions' | 'theorems'>('all')
  const [practiceHistory, setPracticeHistory] = useState<{ date: string; score: number; mode: string }[]>([])

  // Load practice history
  useEffect(() => {
    const saved = localStorage.getItem('liner-practice-history')
    if (saved) {
      setPracticeHistory(JSON.parse(saved))
    }
  }, [])

  // Get items for practice
  const getItems = (): KnowledgeItem[] => {
    let items: KnowledgeItem[] = []

    if (selectedType === 'definitions' || selectedType === 'all') {
      items = [...items, ...allDefinitions]
    }
    if (selectedType === 'theorems' || selectedType === 'all') {
      items = [...items, ...allTheorems]
    }

    if (selectedWeek !== 'all') {
      items = items.filter(item => item.weekNumber === selectedWeek)
    }

    return items
  }

  // Shuffle array
  const shuffle = <T,>(arr: T[]): T[] => {
    const newArr = [...arr]
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
    }
    return newArr
  }

  // Start flashcard mode
  const startFlashcards = () => {
    const items = shuffle(getItems())
    if (items.length === 0) {
      alert('No items available for practice with current filters.')
      return
    }
    setFlashcardState({
      items,
      currentIndex: 0,
      revealed: false,
      score: { correct: 0, total: 0 },
    })
    setMode('flashcard')
  }

  // Navigate flashcards
  const nextCard = (correct: boolean) => {
    if (!flashcardState) return

    const newScore = {
      correct: flashcardState.score.correct + (correct ? 1 : 0),
      total: flashcardState.score.total + 1,
    }

    if (flashcardState.currentIndex >= flashcardState.items.length - 1) {
      // Session complete
      const history = [...practiceHistory, {
        date: new Date().toISOString(),
        score: Math.round((newScore.correct / newScore.total) * 100),
        mode: 'flashcard',
      }]
      setPracticeHistory(history)
      localStorage.setItem('liner-practice-history', JSON.stringify(history))

      setFlashcardState({
        ...flashcardState,
        score: newScore,
      })
    } else {
      setFlashcardState({
        ...flashcardState,
        currentIndex: flashcardState.currentIndex + 1,
        revealed: false,
        score: newScore,
      })
    }
  }

  const prevCard = () => {
    if (!flashcardState || flashcardState.currentIndex <= 0) return
    setFlashcardState({
      ...flashcardState,
      currentIndex: flashcardState.currentIndex - 1,
      revealed: false,
    })
  }

  const revealCard = () => {
    if (!flashcardState) return
    setFlashcardState({
      ...flashcardState,
      revealed: true,
    })
  }

  const resetPractice = () => {
    setFlashcardState(null)
    setMode(null)
  }

  // Render mode selection
  if (!mode) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Dumbbell className="text-[var(--primary)]" size={32} />
            Practice Mode
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Strengthen your understanding with flashcards and drills
          </p>
        </div>

        {/* Filters */}
        <div className="card">
          <h2 className="font-semibold mb-4">Configure Practice</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Week</label>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-[var(--border)]/30 border border-[var(--border)] rounded-lg"
              >
                <option value="all">All Weeks</option>
                {weeksData.map((week) => (
                  <option key={week.weekNumber} value={week.weekNumber}>
                    Week {week.weekNumber}: {week.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as typeof selectedType)}
                className="w-full px-3 py-2 bg-[var(--border)]/30 border border-[var(--border)] rounded-lg"
              >
                <option value="all">All Types</option>
                <option value="definitions">Definitions Only</option>
                <option value="theorems">Theorems Only</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-[var(--muted)]">
            {getItems().length} items available for practice
          </div>
        </div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={startFlashcards}
            className="card hover:border-[var(--primary)] transition-colors text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <Shuffle size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Flashcards</h3>
                <p className="text-sm text-[var(--muted)]">Title → Definition</p>
              </div>
            </div>
            <p className="text-sm text-[var(--muted)]">
              See the title, try to recall the definition/statement, then reveal to check.
            </p>
          </button>

          <button
            onClick={() => alert('Identify-the-tool mode coming soon!')}
            className="card hover:border-[var(--secondary)] transition-colors text-left opacity-75"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                <Target size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Identify the Tool</h3>
                <p className="text-sm text-[var(--muted)]">Question → Theorem</p>
              </div>
            </div>
            <p className="text-sm text-[var(--muted)]">
              See a problem and identify which theorem/technique to use.
            </p>
          </button>

          <button
            onClick={() => alert('Exam drill mode coming soon!')}
            className="card hover:border-[var(--accent)] transition-colors text-left opacity-75"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                <Clock size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Exam Drill</h3>
                <p className="text-sm text-[var(--muted)]">Timed practice</p>
              </div>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Timed practice with high-likelihood exam questions.
            </p>
          </button>
        </div>

        {/* Practice History */}
        {practiceHistory.length > 0 && (
          <div className="card">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Flame className="text-[var(--warning)]" size={20} />
              Recent Practice
            </h2>
            <div className="space-y-2">
              {practiceHistory.slice(-5).reverse().map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[var(--border)]/20 rounded-lg">
                  <div className="text-sm">
                    <span className="font-medium capitalize">{session.mode}</span>
                    <span className="text-[var(--muted)] ml-2">
                      {new Date(session.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`text-sm font-bold ${
                    session.score >= 80 ? 'text-[var(--accent)]' :
                    session.score >= 50 ? 'text-[var(--warning)]' :
                    'text-[var(--danger)]'
                  }`}>
                    {session.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render flashcard mode
  if (mode === 'flashcard' && flashcardState) {
    const currentItem = flashcardState.items[flashcardState.currentIndex]
    const isComplete = flashcardState.score.total === flashcardState.items.length

    if (isComplete) {
      const percentage = Math.round((flashcardState.score.correct / flashcardState.score.total) * 100)

      return (
        <div className="max-w-2xl mx-auto">
          <div className="card text-center py-12">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
              percentage >= 80 ? 'bg-[var(--accent)]/20 text-[var(--accent)]' :
              percentage >= 50 ? 'bg-[var(--warning)]/20 text-[var(--warning)]' :
              'bg-[var(--danger)]/20 text-[var(--danger)]'
            }`}>
              {percentage >= 80 ? <CheckCircle2 size={48} /> : <Target size={48} />}
            </div>
            <h2 className="text-2xl font-bold mb-2">Session Complete!</h2>
            <p className="text-4xl font-bold mb-4" style={{
              color: percentage >= 80 ? 'var(--accent)' :
                     percentage >= 50 ? 'var(--warning)' :
                     'var(--danger)'
            }}>
              {percentage}%
            </p>
            <p className="text-[var(--muted)] mb-6">
              {flashcardState.score.correct} / {flashcardState.score.total} correct
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={resetPractice} className="btn btn-secondary flex items-center gap-2">
                <RotateCcw size={18} />
                New Session
              </button>
              <button onClick={startFlashcards} className="btn btn-primary flex items-center gap-2">
                <Shuffle size={18} />
                Try Again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <button onClick={resetPractice} className="text-[var(--muted)] hover:text-[var(--foreground)]">
            ← Exit
          </button>
          <div className="text-sm text-[var(--muted)]">
            {flashcardState.currentIndex + 1} / {flashcardState.items.length}
          </div>
          <div className="text-sm font-medium">
            Score: {flashcardState.score.correct}/{flashcardState.score.total}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((flashcardState.currentIndex + 1) / flashcardState.items.length) * 100}%` }}
          />
        </div>

        {/* Flashcard */}
        <div className="card min-h-[400px] flex flex-col">
          <div className="flex-1">
            {/* Front (always visible) */}
            <div className="mb-4">
              <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded ${
                currentItem.type === 'definition' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
              }`}>
                {currentItem.type}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">{currentItem.title}</h2>

            {!flashcardState.revealed ? (
              <div className="flex-1 flex items-center justify-center py-8">
                <button
                  onClick={revealCard}
                  className="btn btn-primary flex items-center gap-2 text-lg px-8 py-4"
                >
                  <Eye size={24} />
                  Reveal Answer
                </button>
              </div>
            ) : (
              <div className="mt-6">
                <div className="verbatim-block math-content">
                  {currentItem.verbatimContent}
                </div>
                <div className="source-citation mt-2">
                  Source: {currentItem.source}, Page {currentItem.pageNumber}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          {flashcardState.revealed && (
            <div className="mt-6 pt-4 border-t border-[var(--border)]">
              <div className="text-center text-sm text-[var(--muted)] mb-4">
                Did you get it right?
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => nextCard(false)}
                  className="btn btn-secondary flex items-center gap-2 px-8"
                >
                  <XCircle size={20} />
                  No
                </button>
                <button
                  onClick={() => nextCard(true)}
                  className="btn btn-primary flex items-center gap-2 px-8"
                >
                  <CheckCircle2 size={20} />
                  Yes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevCard}
            disabled={flashcardState.currentIndex === 0}
            className="btn btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <button
            onClick={() => nextCard(false)}
            className="btn btn-secondary flex items-center gap-2"
          >
            Skip
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    )
  }

  return null
}
