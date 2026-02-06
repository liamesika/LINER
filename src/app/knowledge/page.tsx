'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Library,
  Search,
  Filter,
  BookMarked,
  Lightbulb,
  Scroll,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react'
import { allDefinitions, allTheorems, allProofs, searchKnowledge, topicSummary } from '@/data/liner-knowledge'
import { weeksData } from '@/data/liner-weeks'
import type { KnowledgeItem, LinearAlgebraTopic } from '@/types'

type TabType = 'all' | 'definitions' | 'theorems' | 'proofs'

function KnowledgeCard({ item }: { item: KnowledgeItem }) {
  const [expanded, setExpanded] = useState(false)

  const typeStyles: Record<string, { bg: string; border: string; icon: React.ReactNode }> = {
    definition: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-l-blue-500', icon: <BookMarked size={16} /> },
    theorem: { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-l-purple-500', icon: <Lightbulb size={16} /> },
    lemma: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-l-amber-500', icon: <Lightbulb size={16} /> },
    corollary: { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-l-purple-400', icon: <Lightbulb size={16} /> },
    proof: { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-l-green-500', icon: <Scroll size={16} /> },
  }

  const style = typeStyles[item.type] || typeStyles.definition

  return (
    <div className={`card border-l-4 ${style.border} ${style.bg}`}>
      <div
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[var(--muted)]">{style.icon}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                {item.type}
              </span>
              {item.likelihoodScore && item.likelihoodScore >= 80 && (
                <span className="badge likelihood-high text-xs">
                  {item.likelihoodScore}%
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg">{item.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2 text-xs">
              <Link
                href={`/syllabus/${item.weekNumber}`}
                className="px-2 py-0.5 bg-[var(--border)] rounded hover:bg-[var(--primary)] hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Week {item.weekNumber}
              </Link>
              <span className="px-2 py-0.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded">
                {item.topic.replace(/-/g, ' ')}
              </span>
            </div>
          </div>
          <button className="shrink-0 p-1 text-[var(--muted)]">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <div className="math-content whitespace-pre-wrap mb-4">
            {item.verbatimContent}
          </div>
          <div className="text-sm text-[var(--muted)]">
            Source: {item.source}, Page {item.pageNumber}
          </div>
          {item.explanation && (
            <div className="mt-4 p-3 bg-[var(--warning)]/10 rounded-lg">
              <div className="text-xs font-semibold uppercase text-[var(--warning)] mb-1">
                Explanation
              </div>
              <p className="text-sm">{item.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<LinearAlgebraTopic | 'all'>('all')
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)

  const allItems = useMemo(() => {
    let items: KnowledgeItem[] = []

    switch (activeTab) {
      case 'definitions':
        items = allDefinitions
        break
      case 'theorems':
        items = allTheorems
        break
      case 'proofs':
        items = allProofs
        break
      default:
        items = [...allDefinitions, ...allTheorems, ...allProofs]
    }

    // Apply search
    if (searchQuery) {
      items = items.filter(
        item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.verbatimContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply topic filter
    if (selectedTopic !== 'all') {
      items = items.filter(item => item.topic === selectedTopic)
    }

    // Apply week filter
    if (selectedWeek !== 'all') {
      items = items.filter(item => item.weekNumber === selectedWeek)
    }

    // Sort by likelihood score
    return items.sort((a, b) => (b.likelihoodScore || 0) - (a.likelihoodScore || 0))
  }, [activeTab, searchQuery, selectedTopic, selectedWeek])

  const topics = Object.entries(topicSummary)
    .filter(([_, data]) => data.count > 0)
    .map(([key, data]) => ({ id: key, name: data.name }))

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTopic('all')
    setSelectedWeek('all')
  }

  const hasActiveFilters = searchQuery || selectedTopic !== 'all' || selectedWeek !== 'all'

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Library className="text-[var(--primary)]" size={32} />
          Knowledge Base
        </h1>
        <p className="text-[var(--muted)] mt-1">
          All definitions, theorems, and proofs from LA1
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search definitions, theorems, proofs..."
              className="w-full pl-10 pr-4 py-2 bg-[var(--border)]/30 border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
          >
            <Filter size={18} />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[var(--danger)]" />
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Topic</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value as LinearAlgebraTopic | 'all')}
                  className="w-full px-3 py-2 bg-[var(--border)]/30 border border-[var(--border)] rounded-lg"
                >
                  <option value="all">All Topics</option>
                  {topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
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
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="btn btn-secondary flex items-center gap-2 self-end"
                >
                  <X size={18} />
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'All', count: allDefinitions.length + allTheorems.length + allProofs.length },
          { id: 'definitions', label: 'Definitions', count: allDefinitions.length },
          { id: 'theorems', label: 'Theorems', count: allTheorems.length },
          { id: 'proofs', label: 'Proofs', count: allProofs.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
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

      {/* Results */}
      <div className="text-sm text-[var(--muted)] mb-4">
        Showing {allItems.length} items
      </div>

      <div className="space-y-4">
        {allItems.length === 0 ? (
          <div className="text-center py-12 text-[var(--muted)]">
            No items found matching your criteria.
          </div>
        ) : (
          allItems.map((item) => (
            <KnowledgeCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  )
}
