'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  Flame,
  Target,
  BookMarked,
  Lightbulb,
  Scroll,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { likelihoodData, questionPatterns, getTopLikelihoodItems, getLikelihoodByType } from '@/data/liner-likelihood'
import type { LikelihoodItem } from '@/types'

function LikelihoodCard({ item, rank }: { item: LikelihoodItem; rank: number }) {
  const [expanded, setExpanded] = useState(false)

  const typeIcons: Record<string, React.ReactNode> = {
    theorem: <Lightbulb size={18} />,
    definition: <BookMarked size={18} />,
    proof: <Scroll size={18} />,
  }

  const getLikelihoodClass = (score: number) => {
    if (score >= 90) return 'likelihood-high'
    if (score >= 70) return 'likelihood-medium'
    return 'likelihood-low'
  }

  return (
    <div className="card">
      <div
        className="flex items-start gap-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
          rank <= 3 ? 'bg-[var(--warning)] text-white' :
          rank <= 10 ? 'bg-[var(--primary)] text-white' :
          'bg-[var(--border)] text-[var(--foreground)]'
        }`}>
          {rank}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[var(--muted)]">{typeIcons[item.itemType]}</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              {item.itemType}
            </span>
          </div>
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className={`badge ${getLikelihoodClass(item.likelihoodScore)}`}>
              {item.likelihoodScore}% likelihood
            </span>
            {item.evidence.recentTrend === 'increasing' && (
              <span className="text-xs text-[var(--accent)] flex items-center gap-1">
                <TrendingUp size={14} /> Trending
              </span>
            )}
          </div>
        </div>

        <button className="shrink-0 p-2 text-[var(--muted)]">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Info size={16} className="text-[var(--primary)]" />
                Evidence
              </div>
              <ul className="text-sm space-y-1 text-[var(--muted)]">
                <li>• Appeared {item.evidence.examFrequency} times in past exams</li>
                {item.evidence.examYears.length > 0 && (
                  <li>• Years: {item.evidence.examYears.join(', ')}</li>
                )}
                <li>• Homework overlap: {item.evidence.homeworkOverlap}%</li>
                <li>• Pattern similarity: {item.evidence.patternSimilarity}%</li>
                <li className="capitalize">• Recent trend: {item.evidence.recentTrend}</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Analysis</div>
              <p className="text-sm text-[var(--muted)]">
                {item.evidence.notes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function LikelihoodPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'theorems' | 'definitions'>('all')

  const getFilteredItems = () => {
    switch (activeTab) {
      case 'theorems':
        return getLikelihoodByType('theorem')
      case 'definitions':
        return getLikelihoodByType('definition')
      default:
        return likelihoodData
    }
  }

  const items = getFilteredItems().sort((a, b) => b.likelihoodScore - a.likelihoodScore)
  const topPatterns = questionPatterns.slice(0, 5)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Flame className="text-[var(--danger)]" size={32} />
          Exam Likelihood Engine
        </h1>
        <p className="text-[var(--muted)] mt-1">
          Ranked predictions of what will appear on your exam based on historical analysis
        </p>
      </div>

      {/* Info Banner */}
      <div className="card bg-[var(--primary)]/10 border-[var(--primary)]/30">
        <div className="flex items-start gap-4">
          <Target className="text-[var(--primary)] shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-semibold text-[var(--primary)]">How This Works</h3>
            <p className="text-sm mt-1">
              Likelihood scores are calculated based on: frequency in past exams (2022-2025),
              overlap with homework questions, pattern similarity to previous questions, and recent
              trends in exam content. Higher scores indicate greater probability of appearing.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-[var(--danger)]">
            {items.filter(i => i.likelihoodScore >= 90).length}
          </div>
          <div className="text-sm text-[var(--muted)]">Very Likely (90%+)</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-[var(--warning)]">
            {items.filter(i => i.likelihoodScore >= 70 && i.likelihoodScore < 90).length}
          </div>
          <div className="text-sm text-[var(--muted)]">Likely (70-89%)</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-[var(--accent)]">
            {items.filter(i => i.likelihoodScore < 70).length}
          </div>
          <div className="text-sm text-[var(--muted)]">Possible (&lt;70%)</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'All Items', count: likelihoodData.length },
          { id: 'theorems', label: 'Theorems', count: getLikelihoodByType('theorem').length },
          { id: 'definitions', label: 'Definitions', count: getLikelihoodByType('definition').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--border)]/30 hover:bg-[var(--border)]/50'
            }`}
          >
            {tab.label}
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
              activeTab === tab.id ? 'bg-white/20' : 'bg-[var(--border)]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Rankings */}
      <div className="space-y-4">
        {items.map((item, idx) => (
          <LikelihoodCard key={item.id} item={item} rank={idx + 1} />
        ))}
      </div>

      {/* Top Question Patterns */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="text-[var(--secondary)]" size={24} />
          Most Common Question Patterns
        </h2>
        <div className="space-y-4">
          {topPatterns.map((pattern, idx) => (
            <div
              key={pattern.id}
              className="flex items-start gap-4 p-4 bg-[var(--border)]/20 rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--secondary)] text-white flex items-center justify-center font-bold shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{pattern.patternName}</h3>
                  <span className="text-sm text-[var(--muted)]">
                    {pattern.frequency} occurrences
                  </span>
                </div>
                <p className="text-sm text-[var(--muted)] mb-2">{pattern.description}</p>
                <div className="text-sm bg-[var(--accent)]/10 p-2 rounded">
                  <span className="font-medium text-[var(--accent)]">Approach: </span>
                  {pattern.solutionApproach}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
