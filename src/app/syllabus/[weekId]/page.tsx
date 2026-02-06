'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  FileText,
  Lightbulb,
  BookMarked,
  Scroll,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { weeksData, getWeekByNumber } from '@/data/liner-weeks'
import type { KnowledgeItem } from '@/types'

function VerbatimBlock({ item, type }: { item: KnowledgeItem; type: string }) {
  const [expanded, setExpanded] = useState(false)

  const typeColors: Record<string, string> = {
    definition: 'definition-block',
    theorem: 'theorem-block',
    lemma: 'lemma-block',
    corollary: 'theorem-block',
    proof: 'proof-block',
  }

  return (
    <div className="mb-4">
      <div
        className={`verbatim-block ${typeColors[type] || ''} cursor-pointer`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                {type}
              </span>
              {item.likelihoodScore && item.likelihoodScore >= 80 && (
                <span className="badge likelihood-high text-xs">
                  {item.likelihoodScore}% likely
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <div className={`math-content whitespace-pre-wrap ${!expanded ? 'line-clamp-4' : ''}`}>
              {item.verbatimContent}
            </div>
          </div>
          <button className="shrink-0 p-1">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      <div className="source-citation px-4">
        Source: {item.source}, Page {item.pageNumber}
      </div>

      {item.explanation && expanded && (
        <div className="explanation-block mt-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">
            Explanation
          </div>
          <p className="text-sm">{item.explanation}</p>
        </div>
      )}
    </div>
  )
}

export default function WeekDetailPage() {
  const params = useParams()
  const router = useRouter()
  const weekNumber = parseInt(params.weekId as string)
  const week = getWeekByNumber(weekNumber)

  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<'definitions' | 'theorems' | 'proofs' | 'practice'>('definitions')

  useEffect(() => {
    const saved = localStorage.getItem('liner-completed-weeks')
    if (saved) {
      setCompletedWeeks(JSON.parse(saved))
    }
  }, [])

  if (!week) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Week not found</h1>
        <Link href="/syllabus" className="btn btn-primary">
          Back to Syllabus
        </Link>
      </div>
    )
  }

  const isCompleted = completedWeeks.includes(weekNumber)

  const toggleCompletion = () => {
    const newCompleted = isCompleted
      ? completedWeeks.filter(w => w !== weekNumber)
      : [...completedWeeks, weekNumber]
    setCompletedWeeks(newCompleted)
    localStorage.setItem('liner-completed-weeks', JSON.stringify(newCompleted))
  }

  const prevWeek = weekNumber > 1 ? weekNumber - 1 : null
  const nextWeek = weekNumber < weeksData.length ? weekNumber + 1 : null

  const tabs = [
    { id: 'definitions', label: 'Definitions', icon: BookMarked, count: week.definitions.length },
    { id: 'theorems', label: 'Theorems', icon: Lightbulb, count: week.theorems.length },
    { id: 'proofs', label: 'Proofs', icon: Scroll, count: week.proofs.length },
    { id: 'practice', label: 'Practice', icon: FileText, count: week.practiceQuestions.length },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/syllabus"
          className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft size={20} />
          Back to Syllabus
        </Link>
        <div className="flex items-center gap-2">
          {prevWeek && (
            <Link
              href={`/syllabus/${prevWeek}`}
              className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors"
              title={`Week ${prevWeek}`}
            >
              <ArrowLeft size={20} />
            </Link>
          )}
          {nextWeek && (
            <Link
              href={`/syllabus/${nextWeek}`}
              className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors"
              title={`Week ${nextWeek}`}
            >
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="card">
        <div className="flex items-start gap-4">
          <button onClick={toggleCompletion} className="mt-1">
            {isCompleted ? (
              <CheckCircle2 className="text-[var(--accent)]" size={32} />
            ) : (
              <Circle className="text-[var(--muted)] hover:text-[var(--primary)]" size={32} />
            )}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-[var(--primary)]" size={28} />
              <h1 className="text-2xl font-bold">Week {weekNumber}: {week.title}</h1>
            </div>
            {week.titleHe && (
              <p className="text-[var(--muted)] mb-2" dir="rtl">{week.titleHe}</p>
            )}
            <p className="text-[var(--muted)]">{week.description}</p>

            {/* Source Files */}
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <div className="text-sm text-[var(--muted)] mb-2">Source Files:</div>
              <div className="flex flex-wrap gap-2">
                {week.lectureFiles.map((file) => (
                  <span key={file} className="px-2 py-1 text-xs bg-[var(--border)]/50 rounded">
                    {file}
                  </span>
                ))}
                {week.tutorialFiles.map((file) => (
                  <span key={file} className="px-2 py-1 text-xs bg-[var(--secondary)]/20 rounded">
                    {file}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--border)]/30 hover:bg-[var(--border)]/50'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              activeTab === tab.id ? 'bg-white/20' : 'bg-[var(--border)]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'definitions' && (
          <>
            {week.definitions.length === 0 ? (
              <div className="text-center py-8 text-[var(--muted)]">
                No definitions extracted for this week yet.
              </div>
            ) : (
              week.definitions.map((def) => (
                <VerbatimBlock key={def.id} item={def} type="definition" />
              ))
            )}
          </>
        )}

        {activeTab === 'theorems' && (
          <>
            {week.theorems.length === 0 ? (
              <div className="text-center py-8 text-[var(--muted)]">
                No theorems extracted for this week yet.
              </div>
            ) : (
              week.theorems.map((thm) => (
                <VerbatimBlock key={thm.id} item={thm} type={thm.type} />
              ))
            )}
          </>
        )}

        {activeTab === 'proofs' && (
          <>
            {week.proofs.length === 0 ? (
              <div className="text-center py-8 text-[var(--muted)]">
                No proofs extracted for this week yet.
              </div>
            ) : (
              week.proofs.map((proof) => (
                <VerbatimBlock key={proof.id} item={proof} type="proof" />
              ))
            )}
          </>
        )}

        {activeTab === 'practice' && (
          <>
            {week.practiceQuestions.length === 0 ? (
              <div className="text-center py-8 text-[var(--muted)]">
                No practice questions for this week yet.
              </div>
            ) : (
              week.practiceQuestions.map((q, idx) => (
                <div key={q.id} className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium mb-2">{q.question}</div>
                      <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                        <span>Source: {q.source}</span>
                        <span>·</span>
                        <span className="capitalize">{q.difficulty}</span>
                        <span>·</span>
                        <span className="capitalize">{q.topic.replace(/-/g, ' ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between pt-6 border-t border-[var(--border)]">
        {prevWeek ? (
          <Link
            href={`/syllabus/${prevWeek}`}
            className="flex items-center gap-2 text-[var(--primary)] hover:underline"
          >
            <ArrowLeft size={18} />
            Week {prevWeek}
          </Link>
        ) : (
          <div />
        )}
        {nextWeek && (
          <Link
            href={`/syllabus/${nextWeek}`}
            className="flex items-center gap-2 text-[var(--primary)] hover:underline"
          >
            Week {nextWeek}
            <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </div>
  )
}
