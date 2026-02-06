// Linear Algebra Knowledge Base - Combined Data
// Aggregated from all weeks for easy searching

import type { KnowledgeItem } from '@/types'
import { weeksData } from './liner-weeks'

// Aggregate all knowledge items
export const allDefinitions: KnowledgeItem[] = weeksData.flatMap(w => w.definitions)
export const allTheorems: KnowledgeItem[] = weeksData.flatMap(w => w.theorems)
export const allProofs: KnowledgeItem[] = weeksData.flatMap(w => w.proofs)
export const allTechniques: KnowledgeItem[] = weeksData.flatMap(w => w.techniques)
export const allFormulas: KnowledgeItem[] = weeksData.flatMap(w => w.formulas)

// Combined knowledge data
export const knowledgeData = {
  definitions: allDefinitions,
  theorems: allTheorems,
  proofs: allProofs,
  techniques: allTechniques,
  formulas: allFormulas,
}

// Search function
export function searchKnowledge(query: string): KnowledgeItem[] {
  const lowerQuery = query.toLowerCase()
  const allItems = [
    ...allDefinitions,
    ...allTheorems,
    ...allProofs,
    ...allTechniques,
    ...allFormulas,
  ]

  return allItems.filter(item =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.verbatimContent.toLowerCase().includes(lowerQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    item.topic.toLowerCase().includes(lowerQuery)
  )
}

// Get items by topic
export function getItemsByTopic(topic: string): KnowledgeItem[] {
  const allItems = [
    ...allDefinitions,
    ...allTheorems,
    ...allProofs,
    ...allTechniques,
    ...allFormulas,
  ]
  return allItems.filter(item => item.topic === topic)
}

// Get items by week
export function getItemsByWeek(weekNumber: number): KnowledgeItem[] {
  const allItems = [
    ...allDefinitions,
    ...allTheorems,
    ...allProofs,
    ...allTechniques,
    ...allFormulas,
  ]
  return allItems.filter(item => item.weekNumber === weekNumber)
}

// Get high-likelihood items (score >= 80)
export function getHighLikelihoodItems(): KnowledgeItem[] {
  const allItems = [
    ...allDefinitions,
    ...allTheorems,
    ...allProofs,
  ]
  return allItems
    .filter(item => (item.likelihoodScore || 0) >= 80)
    .sort((a, b) => (b.likelihoodScore || 0) - (a.likelihoodScore || 0))
}

// Get item by ID
export function getItemById(id: string): KnowledgeItem | undefined {
  const allItems = [
    ...allDefinitions,
    ...allTheorems,
    ...allProofs,
    ...allTechniques,
    ...allFormulas,
  ]
  return allItems.find(item => item.id === id)
}

// Topic summary
export const topicSummary = {
  'fields': { name: 'Fields', count: getItemsByTopic('fields').length },
  'complex-numbers': { name: 'Complex Numbers', count: getItemsByTopic('complex-numbers').length },
  'linear-equations': { name: 'Linear Equations', count: getItemsByTopic('linear-equations').length },
  'vector-spaces': { name: 'Vector Spaces', count: getItemsByTopic('vector-spaces').length },
  'subspaces': { name: 'Subspaces', count: getItemsByTopic('subspaces').length },
  'linear-combinations': { name: 'Linear Combinations', count: getItemsByTopic('linear-combinations').length },
  'span': { name: 'Span', count: getItemsByTopic('span').length },
  'linear-independence': { name: 'Linear Independence', count: getItemsByTopic('linear-independence').length },
  'basis': { name: 'Basis', count: getItemsByTopic('basis').length },
  'dimension': { name: 'Dimension', count: getItemsByTopic('dimension').length },
  'matrices': { name: 'Matrices', count: getItemsByTopic('matrices').length },
  'invertible-matrices': { name: 'Invertible Matrices', count: getItemsByTopic('invertible-matrices').length },
  'systems-of-equations': { name: 'Systems of Equations', count: getItemsByTopic('systems-of-equations').length },
  'row-reduction': { name: 'Row Reduction', count: getItemsByTopic('row-reduction').length },
  'determinants': { name: 'Determinants', count: getItemsByTopic('determinants').length },
  'rank': { name: 'Rank', count: getItemsByTopic('rank').length },
  'row-column-space': { name: 'Row/Column Space', count: getItemsByTopic('row-column-space').length },
  'other': { name: 'Other', count: getItemsByTopic('other').length },
}
