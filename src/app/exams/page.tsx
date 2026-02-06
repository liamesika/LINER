'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  FileText,
  BarChart3,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { examsData, examQuestions, getMostCommonExamTopics } from '@/data/liner-exams'
import { questionPatterns } from '@/data/liner-likelihood'

export default function ExamsPage() {
  const [expandedExam, setExpandedExam] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'exams' | 'patterns' | 'analysis'>('exams')

  const topTopics = getMostCommonExamTopics().slice(0, 10)
  const topPatterns = questionPatterns.slice(0, 6)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <GraduationCap className="text-[var(--primary)]" size={32} />
          Exam Analysis
        </h1>
        <p className="text-[var(--muted)] mt-1">
          Past exam patterns, common topics, and question types
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-[var(--primary)]">{examsData.length}</div>
          <div className="text-sm text-[var(--muted)]">Past Exams</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-[var(--secondary)]">{examQuestions.length}</div>
          <div className="text-sm text-[var(--muted)]">Questions</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-[var(--accent)]">{topTopics.length}</div>
          <div className="text-sm text-[var(--muted)]">Topics Covered</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-[var(--warning)]">{questionPatterns.length}</div>
          <div className="text-sm text-[var(--muted)]">Question Patterns</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-2">
        <button
          onClick={() => setActiveTab('exams')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'exams'
              ? 'bg-[var(--primary)] text-white'
              : 'bg-[var(--border)]/30 hover:bg-[var(--border)]/50'
          }`}
        >
          <FileText size={18} />
          Past Exams
        </button>
        <button
          onClick={() => setActiveTab('patterns')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'patterns'
              ? 'bg-[var(--primary)] text-white'
              : 'bg-[var(--border)]/30 hover:bg-[var(--border)]/50'
          }`}
        >
          <TrendingUp size={18} />
          Question Patterns
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'analysis'
              ? 'bg-[var(--primary)] text-white'
              : 'bg-[var(--border)]/30 hover:bg-[var(--border)]/50'
          }`}
        >
          <BarChart3 size={18} />
          Topic Analysis
        </button>
      </div>

      {/* Content */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          {examsData.map((exam) => {
            const isExpanded = expandedExam === exam.id
            const questions = examQuestions.filter(
              q => q.examYear === exam.year && q.examSession === exam.session
            )

            return (
              <div key={exam.id} className="card">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedExam(isExpanded ? null : exam.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {exam.year} - Moed {exam.session}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                        <span>{questions.length} questions</span>
                        <span>·</span>
                        <span>{exam.totalPoints} points</span>
                        {exam.hasSolution && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1 text-[var(--accent)]">
                              <CheckCircle2 size={14} />
                              Solutions available
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="p-2">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[var(--border)]">
                    <div className="text-sm text-[var(--muted)] mb-4">
                      Source: {exam.sourceFile}
                    </div>

                    <div className="space-y-3">
                      {questions.map((q) => (
                        <div key={q.id} className="p-4 bg-[var(--border)]/20 rounded-lg">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--primary)] text-white rounded">
                                  Q{q.questionNumber}
                                </span>
                                {q.points && (
                                  <span className="text-xs text-[var(--muted)]">
                                    {q.points} pts
                                  </span>
                                )}
                                <span className={`px-2 py-0.5 text-xs rounded ${
                                  q.difficulty === 'hard'
                                    ? 'bg-[var(--danger)]/20 text-[var(--danger)]'
                                    : q.difficulty === 'medium'
                                    ? 'bg-[var(--warning)]/20 text-[var(--warning)]'
                                    : 'bg-[var(--accent)]/20 text-[var(--accent)]'
                                }`}>
                                  {q.difficulty}
                                </span>
                              </div>
                              <p className="text-sm mb-2">{q.question}</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-0.5 text-xs bg-[var(--secondary)]/20 text-[var(--secondary)] rounded">
                                  {q.topic.replace(/-/g, ' ')}
                                </span>
                                <span className="text-xs text-[var(--muted)]">
                                  Week {q.weekNumber}
                                </span>
                              </div>
                            </div>
                          </div>
                          {q.solution && (
                            <details className="mt-3">
                              <summary className="text-sm text-[var(--primary)] cursor-pointer hover:underline">
                                View Solution
                              </summary>
                              <div className="mt-2 p-3 bg-[var(--accent)]/10 rounded text-sm">
                                {q.solution}
                              </div>
                            </details>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'patterns' && (
        <div className="grid gap-4 md:grid-cols-2">
          {topPatterns.map((pattern) => (
            <div key={pattern.id} className="card">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                  <TrendingUp size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{pattern.patternName}</h3>
                    <span className="badge likelihood-high">
                      {pattern.frequency} times
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted)] mb-3">{pattern.description}</p>

                  <div className="mb-3">
                    <div className="text-xs font-semibold uppercase text-[var(--muted)] mb-1">
                      Typical Structure
                    </div>
                    <p className="text-sm bg-[var(--border)]/30 p-2 rounded">
                      {pattern.typicalStructure}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase text-[var(--muted)] mb-1">
                      Solution Approach
                    </div>
                    <p className="text-sm text-[var(--accent)]">
                      {pattern.solutionApproach}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {pattern.relatedTopics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 text-xs bg-[var(--primary)]/10 text-[var(--primary)] rounded"
                      >
                        {topic.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="text-[var(--primary)]" size={24} />
              Topic Distribution in Past Exams
            </h2>
            <div className="space-y-3">
              {topTopics.map((topic, idx) => {
                const maxCount = topTopics[0].count
                const percentage = (topic.count / maxCount) * 100

                return (
                  <div key={topic.topic} className="flex items-center gap-4">
                    <div className="w-8 text-sm font-medium text-[var(--muted)]">
                      #{idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium capitalize">
                          {topic.topic.replace(/-/g, ' ')}
                        </span>
                        <span className="text-sm text-[var(--muted)]">
                          {topic.count} questions
                        </span>
                      </div>
                      <div className="h-3 bg-[var(--border)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="text-[var(--warning)]" size={24} />
              Key Insights
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[var(--accent)] shrink-0 mt-0.5" size={18} />
                <span>
                  <strong>Eigenvalues & Diagonalization</strong> appear in nearly every exam.
                  Expect at least one question on finding eigenvalues, eigenvectors, and checking diagonalizability.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[var(--accent)] shrink-0 mt-0.5" size={18} />
                <span>
                  <strong>Gram-Schmidt process</strong> is a computational favorite.
                  Practice the algorithm step by step.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[var(--accent)] shrink-0 mt-0.5" size={18} />
                <span>
                  <strong>Proof questions</strong> often involve subspaces, linear independence,
                  or properties of linear transformations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[var(--accent)] shrink-0 mt-0.5" size={18} />
                <span>
                  <strong>Rank-Nullity theorem</strong> is used to verify answers.
                  Always check that dim(V) = rank(T) + nullity(T).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[var(--accent)] shrink-0 mt-0.5" size={18} />
                <span>
                  <strong>Least squares</strong> problems are becoming more common in recent exams.
                  Know the normal equations AᵀAx̂ = Aᵀb.
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
