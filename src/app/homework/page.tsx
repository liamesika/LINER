'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  FileQuestion,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Target,
  BookOpen,
  Info
} from 'lucide-react'
import { homeworkData, getHomeworkStats, getHomeworkByLikelihoodLevel } from '@/data/liner-homework'
import { weeksData } from '@/data/liner-weeks'
import type { HomeworkQuestion, LikelihoodLevel } from '@/types'

// Likelihood level styling
const likelihoodStyles: Record<LikelihoodLevel, { bg: string; text: string; border: string; gradient: string }> = {
  'גבוהה מאוד': {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-r-red-500',
    gradient: 'from-red-500 to-red-600',
  },
  'גבוהה': {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-r-orange-500',
    gradient: 'from-orange-500 to-orange-600',
  },
  'בינונית': {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-300',
    border: 'border-r-yellow-500',
    gradient: 'from-yellow-500 to-yellow-600',
  },
  'נמוכה': {
    bg: 'bg-gray-100 dark:bg-gray-800/50',
    text: 'text-gray-600 dark:text-gray-400',
    border: 'border-r-gray-400',
    gradient: 'from-gray-400 to-gray-500',
  },
}

function HomeworkCard({ hw, rank }: { hw: HomeworkQuestion; rank: number }) {
  const [expanded, setExpanded] = useState(false)
  const style = likelihoodStyles[hw.likelihoodLevel]

  return (
    <div className={`card border-r-4 ${style.border}`}>
      <div
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          {/* Rank Badge */}
          <div className={`shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${style.gradient} text-white flex items-center justify-center font-bold text-lg shadow-md`}>
            {rank}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header Row */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--primary)] text-white rounded">
                ש״ב {hw.homeworkNumber} · שאלה {hw.questionNumber}
              </span>
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${style.bg} ${style.text}`}>
                {hw.likelihoodLevel} ({hw.likelihoodScore}%)
              </span>
              {hw.examAppearances > 0 && (
                <span className="text-xs text-[var(--warning)] flex items-center gap-1 font-medium">
                  <Flame size={14} />
                  הופיע {hw.examAppearances} פעמים במבחנים
                </span>
              )}
            </div>

            {/* Question */}
            <p className="font-medium mb-3 text-base leading-relaxed">{hw.question}</p>

            {/* Meta Tags */}
            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                href={`/syllabus/${hw.weekNumber}`}
                className="px-2 py-1 bg-[var(--border)] rounded-full hover:bg-[var(--primary)] hover:text-white transition-colors flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <BookOpen size={12} />
                שבוע {hw.weekNumber}
              </Link>
              <span className="px-2 py-1 bg-[var(--secondary)]/20 text-[var(--secondary)] rounded-full">
                {hw.topic.replace(/-/g, ' ')}
              </span>
              <span className={`px-2 py-1 rounded-full ${
                hw.difficulty === 'hard' ? 'bg-[var(--danger)]/20 text-[var(--danger)]' :
                hw.difficulty === 'medium' ? 'bg-[var(--warning)]/20 text-[var(--warning)]' :
                'bg-[var(--accent)]/20 text-[var(--accent)]'
              }`}>
                {hw.difficulty === 'hard' ? 'קשה' : hw.difficulty === 'medium' ? 'בינוני' : 'קל'}
              </span>
            </div>
          </div>

          <button className="shrink-0 p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-4">
          {/* Evidence - הסבר סבירות */}
          {hw.evidence && (
            <div className="p-4 bg-[var(--primary)]/10 rounded-lg">
              <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Target size={16} className="text-[var(--primary)]" />
                למה הסבירות {hw.likelihoodLevel}?
              </div>
              <p className="text-sm text-[var(--foreground)] mb-2">{hw.evidence.reasoningHe}</p>
              <div className="flex flex-wrap gap-3 text-xs text-[var(--muted)]">
                <span>הופעה במבחנים: {hw.evidence.examFrequency}</span>
                <span>דמיון לדפוסים: {hw.evidence.patternSimilarity}%</span>
                <span>מרכזיות הנושא: {hw.evidence.topicCentrality}%</span>
              </div>
            </div>
          )}

          {/* Related Concepts */}
          {(hw.relatedDefinitions.length > 0 || hw.relatedTheorems.length > 0) && (
            <div>
              <div className="text-sm font-semibold mb-2">מושגים קשורים</div>
              <div className="flex flex-wrap gap-2">
                {hw.relatedDefinitions.map((defId) => (
                  <span key={defId} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    {defId}
                  </span>
                ))}
                {hw.relatedTheorems.map((thmId) => (
                  <span key={thmId} className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                    {thmId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Solution */}
          {hw.solution && (
            <div>
              <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[var(--accent)]" />
                גישת פתרון
              </div>
              <div className="p-3 bg-[var(--accent)]/10 rounded-lg text-sm font-mono" dir="ltr">
                {hw.solution}
              </div>
            </div>
          )}

          {/* Solution Steps */}
          {hw.solutionSteps && hw.solutionSteps.length > 0 && (
            <div>
              <div className="text-sm font-semibold mb-2">שלבי פתרון</div>
              <ol className="text-sm space-y-1 list-decimal list-inside text-[var(--muted)]" dir="ltr">
                {hw.solutionSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Source Citation */}
          <div className="pt-2 border-t border-[var(--border)] text-xs text-[var(--muted)]">
            מקור: {hw.source}, עמוד {hw.pageNumber}
          </div>
        </div>
      )}
    </div>
  )
}

export default function HomeworkPage() {
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all')
  const [sortBy, setSortBy] = useState<'likelihood' | 'week'>('likelihood')
  const [filterLevel, setFilterLevel] = useState<LikelihoodLevel | 'all'>('all')

  const stats = useMemo(() => getHomeworkStats(), [])

  const filteredHomework = useMemo(() => {
    let items = selectedWeek === 'all'
      ? homeworkData
      : homeworkData.filter(h => h.weekNumber === selectedWeek)

    // Apply level filter
    if (filterLevel !== 'all') {
      items = items.filter(h => h.likelihoodLevel === filterLevel)
    }

    // Apply sorting
    if (sortBy === 'likelihood') {
      items = [...items].sort((a, b) => b.likelihoodScore - a.likelihoodScore)
    } else {
      items = [...items].sort((a, b) => a.weekNumber - b.weekNumber || a.homeworkNumber - b.homeworkNumber)
    }

    return items
  }, [selectedWeek, filterLevel, sortBy])

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FileQuestion className="text-[var(--primary)]" size={32} />
          חיזוי שאלות ממבחנים
        </h1>
        <p className="text-[var(--muted)] mt-1">
          שאלות שיעורי בית מדורגות לפי סבירות הופעה במבחן
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setFilterLevel(filterLevel === 'גבוהה מאוד' ? 'all' : 'גבוהה מאוד')}
          className={`card text-center transition-all hover:scale-[1.02] ${filterLevel === 'גבוהה מאוד' ? 'ring-2 ring-red-500' : ''}`}
        >
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.byLevel['גבוהה מאוד']}</div>
          <div className="text-xs text-[var(--muted)]">גבוהה מאוד</div>
          <div className="text-[10px] text-red-500">90%+</div>
        </button>
        <button
          onClick={() => setFilterLevel(filterLevel === 'גבוהה' ? 'all' : 'גבוהה')}
          className={`card text-center transition-all hover:scale-[1.02] ${filterLevel === 'גבוהה' ? 'ring-2 ring-orange-500' : ''}`}
        >
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.byLevel['גבוהה']}</div>
          <div className="text-xs text-[var(--muted)]">גבוהה</div>
          <div className="text-[10px] text-orange-500">75-89%</div>
        </button>
        <button
          onClick={() => setFilterLevel(filterLevel === 'בינונית' ? 'all' : 'בינונית')}
          className={`card text-center transition-all hover:scale-[1.02] ${filterLevel === 'בינונית' ? 'ring-2 ring-yellow-500' : ''}`}
        >
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.byLevel['בינונית']}</div>
          <div className="text-xs text-[var(--muted)]">בינונית</div>
          <div className="text-[10px] text-yellow-600">50-74%</div>
        </button>
        <button
          onClick={() => setFilterLevel(filterLevel === 'נמוכה' ? 'all' : 'נמוכה')}
          className={`card text-center transition-all hover:scale-[1.02] ${filterLevel === 'נמוכה' ? 'ring-2 ring-gray-500' : ''}`}
        >
          <div className="text-2xl font-bold text-gray-500">{stats.byLevel['נמוכה']}</div>
          <div className="text-xs text-[var(--muted)]">נמוכה</div>
          <div className="text-[10px] text-gray-500">&lt;50%</div>
        </button>
      </div>

      {/* Info Box */}
      <div className="card bg-[var(--primary)]/5 border-[var(--primary)]/20">
        <div className="flex items-start gap-3">
          <Info size={20} className="text-[var(--primary)] shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-semibold mb-1">איך מחושבת הסבירות?</div>
            <p className="text-[var(--muted)]">
              הציונים מבוססים על ניתוח מבחני עבר (2022-2025), תדירות הופעה של נושאים,
              דמיון לדפוסי שאלות חוזרים, ומרכזיות הנושא בקורס. כל ציון מגובה בראיות.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">סינון לפי שבוע</label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--border)]/30 border border-[var(--border)] rounded-lg"
            >
              <option value="all">כל השבועות</option>
              {weeksData.map((week) => (
                <option key={week.weekNumber} value={week.weekNumber}>
                  שבוע {week.weekNumber}: {week.titleHe || week.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">מיון לפי</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full px-3 py-2 bg-[var(--border)]/30 border border-[var(--border)] rounded-lg"
            >
              <option value="likelihood">סבירות (גבוה לנמוך)</option>
              <option value="week">מספר שבוע</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-[var(--muted)]">
        <span>מציג {filteredHomework.length} שאלות</span>
        {filterLevel !== 'all' && (
          <button
            onClick={() => setFilterLevel('all')}
            className="text-[var(--primary)] hover:underline"
          >
            נקה סינון
          </button>
        )}
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {filteredHomework.length === 0 ? (
          <div className="text-center py-12 text-[var(--muted)]">
            לא נמצאו שאלות התואמות את הקריטריונים.
          </div>
        ) : (
          filteredHomework.map((hw, index) => (
            <HomeworkCard
              key={hw.id}
              hw={hw}
              rank={sortBy === 'likelihood' ? index + 1 : 0}
            />
          ))
        )}
      </div>

      {/* Summary Footer */}
      <div className="card bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">סיכום</div>
            <div className="text-sm text-[var(--muted)]">
              {stats.withExamAppearances} שאלות הופיעו במבחנים קודמים ·
              ממוצע סבירות: {stats.avgScore}%
            </div>
          </div>
          <Link
            href="/practice"
            className="btn btn-primary flex items-center gap-2"
          >
            <Target size={18} />
            תרגול
          </Link>
        </div>
      </div>
    </div>
  )
}
