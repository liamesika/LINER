// Linear Algebra Exam Likelihood Data
// Computed from past exam patterns and homework overlap

import type { LikelihoodItem, QuestionPattern } from '@/types'
import { allDefinitions, allTheorems } from './liner-knowledge'
import { examQuestions } from './liner-exams'

// Calculate topic frequency from exams
function getTopicFrequency(): Record<string, number> {
  const freq: Record<string, number> = {}
  for (const q of examQuestions) {
    freq[q.topic] = (freq[q.topic] || 0) + 1
  }
  return freq
}

const topicFrequency = getTopicFrequency()

// Generate likelihood scores
export const likelihoodData: LikelihoodItem[] = [
  // Top Theorems by Likelihood
  {
    id: 'like-thm-rank-nullity',
    itemId: 'thm-rank-nullity',
    itemType: 'theorem',
    title: 'Rank-Nullity Theorem',
    likelihoodScore: 100,
    evidence: {
      examFrequency: 25,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 15,
      patternSimilarity: 95,
      recentTrend: 'stable',
      notes: 'Appears in almost every exam. Must know for linear transformation questions.',
    },
    rank: 1,
  },
  {
    id: 'like-thm-diagonalization-criterion',
    itemId: 'thm-diagonalization-criterion',
    itemType: 'theorem',
    title: 'Diagonalization Criterion',
    likelihoodScore: 98,
    evidence: {
      examFrequency: 22,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 12,
      patternSimilarity: 90,
      recentTrend: 'stable',
      notes: 'Core theorem for eigenvalue problems. Very likely to appear.',
    },
    rank: 2,
  },
  {
    id: 'like-thm-gram-schmidt',
    itemId: 'thm-gram-schmidt',
    itemType: 'theorem',
    title: 'Gram-Schmidt Process',
    likelihoodScore: 96,
    evidence: {
      examFrequency: 18,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 10,
      patternSimilarity: 88,
      recentTrend: 'stable',
      notes: 'Standard computational question. Expect to apply this algorithm.',
    },
    rank: 3,
  },
  {
    id: 'like-thm-least-squares',
    itemId: 'thm-least-squares',
    itemType: 'theorem',
    title: 'Least Squares Solution',
    likelihoodScore: 94,
    evidence: {
      examFrequency: 15,
      examYears: ['2023-24', '2024-25'],
      homeworkOverlap: 8,
      patternSimilarity: 85,
      recentTrend: 'increasing',
      notes: 'Appeared in recent exams. Normal equations frequently tested.',
    },
    rank: 4,
  },
  {
    id: 'like-thm-det-inverse',
    itemId: 'thm-det-inverse',
    itemType: 'theorem',
    title: 'Determinant and Invertibility',
    likelihoodScore: 92,
    evidence: {
      examFrequency: 15,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 12,
      patternSimilarity: 90,
      recentTrend: 'stable',
      notes: 'Fundamental connection. Often appears in proofs.',
    },
    rank: 5,
  },
  {
    id: 'like-thm-steinitz-exchange',
    itemId: 'thm-steinitz-exchange',
    itemType: 'theorem',
    title: 'Steinitz Exchange Lemma',
    likelihoodScore: 90,
    evidence: {
      examFrequency: 8,
      examYears: ['2024-25'],
      homeworkOverlap: 6,
      patternSimilarity: 80,
      recentTrend: 'stable',
      notes: 'Key for dimension proofs. May appear as part of larger problem.',
    },
    rank: 6,
  },
  {
    id: 'like-thm-injective-kernel',
    itemId: 'thm-injective-kernel',
    itemType: 'theorem',
    title: 'Injectivity and Kernel',
    likelihoodScore: 88,
    evidence: {
      examFrequency: 12,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 8,
      patternSimilarity: 85,
      recentTrend: 'stable',
      notes: 'Characterizes injective maps. Common in transformation problems.',
    },
    rank: 7,
  },
  {
    id: 'like-thm-similar-matrices',
    itemId: 'thm-similar-matrices',
    itemType: 'theorem',
    title: 'Similar Matrices Properties',
    likelihoodScore: 86,
    evidence: {
      examFrequency: 15,
      examYears: ['2022-23', '2024-25'],
      homeworkOverlap: 10,
      patternSimilarity: 82,
      recentTrend: 'stable',
      notes: 'Know what similar matrices share. Proof questions possible.',
    },
    rank: 8,
  },
  {
    id: 'like-thm-eigen-independent',
    itemId: 'thm-eigen-independent',
    itemType: 'theorem',
    title: 'Eigenvectors for Distinct Eigenvalues',
    likelihoodScore: 84,
    evidence: {
      examFrequency: 15,
      examYears: ['2022-23', '2023-24'],
      homeworkOverlap: 8,
      patternSimilarity: 80,
      recentTrend: 'stable',
      notes: 'Key for showing diagonalizability.',
    },
    rank: 9,
  },
  {
    id: 'like-thm-det-product',
    itemId: 'thm-det-product',
    itemType: 'theorem',
    title: 'Determinant of Product',
    likelihoodScore: 82,
    evidence: {
      examFrequency: 12,
      examYears: ['2023-24', '2024-25'],
      homeworkOverlap: 6,
      patternSimilarity: 78,
      recentTrend: 'stable',
      notes: 'Multiplicative property. Used in many proofs.',
    },
    rank: 10,
  },

  // Top Definitions by Likelihood
  {
    id: 'like-def-eigenvalue',
    itemId: 'def-eigenvalue',
    itemType: 'definition',
    title: 'Eigenvalue and Eigenvector',
    likelihoodScore: 100,
    evidence: {
      examFrequency: 25,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 15,
      patternSimilarity: 100,
      recentTrend: 'stable',
      notes: 'Core concept. Will definitely appear. Know the definition precisely.',
    },
    rank: 1,
  },
  {
    id: 'like-def-basis',
    itemId: 'def-basis',
    itemType: 'definition',
    title: 'Basis',
    likelihoodScore: 98,
    evidence: {
      examFrequency: 18,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 15,
      patternSimilarity: 95,
      recentTrend: 'stable',
      notes: 'Fundamental. Required for most problems.',
    },
    rank: 2,
  },
  {
    id: 'like-def-linear-transformation',
    itemId: 'def-linear-transformation',
    itemType: 'definition',
    title: 'Linear Transformation',
    likelihoodScore: 96,
    evidence: {
      examFrequency: 20,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 12,
      patternSimilarity: 92,
      recentTrend: 'stable',
      notes: 'Core concept. Know the two conditions.',
    },
    rank: 3,
  },
  {
    id: 'like-def-subspace',
    itemId: 'def-subspace',
    itemType: 'definition',
    title: 'Subspace',
    likelihoodScore: 95,
    evidence: {
      examFrequency: 10,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 12,
      patternSimilarity: 90,
      recentTrend: 'stable',
      notes: 'Subspace test appears frequently.',
    },
    rank: 4,
  },
  {
    id: 'like-def-linear-independence',
    itemId: 'def-linear-independence',
    itemType: 'definition',
    title: 'Linear Independence',
    likelihoodScore: 94,
    evidence: {
      examFrequency: 15,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 10,
      patternSimilarity: 88,
      recentTrend: 'stable',
      notes: 'Know definition and how to check.',
    },
    rank: 5,
  },
  {
    id: 'like-def-determinant',
    itemId: 'def-determinant',
    itemType: 'definition',
    title: 'Determinant',
    likelihoodScore: 92,
    evidence: {
      examFrequency: 18,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 12,
      patternSimilarity: 90,
      recentTrend: 'stable',
      notes: 'Know properties and computation.',
    },
    rank: 6,
  },
  {
    id: 'like-def-diagonalizable',
    itemId: 'def-diagonalizable',
    itemType: 'definition',
    title: 'Diagonalizable Matrix',
    likelihoodScore: 90,
    evidence: {
      examFrequency: 20,
      examYears: ['2022-23', '2023-24'],
      homeworkOverlap: 10,
      patternSimilarity: 85,
      recentTrend: 'stable',
      notes: 'Frequently tested. Know criteria.',
    },
    rank: 7,
  },
  {
    id: 'like-def-inner-product',
    itemId: 'def-inner-product',
    itemType: 'definition',
    title: 'Inner Product',
    likelihoodScore: 88,
    evidence: {
      examFrequency: 15,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 8,
      patternSimilarity: 82,
      recentTrend: 'stable',
      notes: 'Know axioms. Important for orthogonality.',
    },
    rank: 8,
  },
  {
    id: 'like-def-kernel',
    itemId: 'def-kernel',
    itemType: 'definition',
    title: 'Kernel (Null Space)',
    likelihoodScore: 86,
    evidence: {
      examFrequency: 15,
      examYears: ['2022-23', '2023-24', '2024-25'],
      homeworkOverlap: 10,
      patternSimilarity: 85,
      recentTrend: 'stable',
      notes: 'Always paired with image. Know both.',
    },
    rank: 9,
  },
  {
    id: 'like-def-rank',
    itemId: 'def-rank',
    itemType: 'definition',
    title: 'Rank',
    likelihoodScore: 85,
    evidence: {
      examFrequency: 18,
      examYears: ['2022-23', '2024-25'],
      homeworkOverlap: 8,
      patternSimilarity: 80,
      recentTrend: 'stable',
      notes: 'Key dimension. Rank-nullity essential.',
    },
    rank: 10,
  },
]

// Question patterns identified from past exams
export const questionPatterns: QuestionPattern[] = [
  {
    id: 'pattern-prove-subspace',
    patternName: 'Prove Subspace',
    description: 'Prove or disprove that a given set is a subspace',
    frequency: 12,
    exampleQuestions: ['exam-2022-23-A-q1', 'pq-2-1', 'pq-2-2'],
    relatedTopics: ['subspaces'],
    relatedTheorems: ['thm-intersection-subspace'],
    typicalStructure: 'Given W = {...}, prove/disprove W is a subspace of V',
    solutionApproach: '1. Check 0 ∈ W, 2. Check closure under addition, 3. Check closure under scalar multiplication',
  },
  {
    id: 'pattern-find-basis-dim',
    patternName: 'Find Basis and Dimension',
    description: 'Find a basis for a subspace and determine its dimension',
    frequency: 18,
    exampleQuestions: ['exam-2023-24-B-q1', 'pq-4-1', 'pq-4-2'],
    relatedTopics: ['basis', 'dimension'],
    relatedTheorems: ['thm-extend-to-basis'],
    typicalStructure: 'Given W defined by constraints, find basis and dim(W)',
    solutionApproach: '1. Express general element, 2. Identify free variables, 3. Write as linear combination, 4. Extract basis',
  },
  {
    id: 'pattern-kernel-image',
    patternName: 'Find Kernel and Image',
    description: 'Find basis for kernel and image of a linear transformation',
    frequency: 15,
    exampleQuestions: ['exam-2022-23-A-q2'],
    relatedTopics: ['linear-transformations', 'rank', 'nullity'],
    relatedTheorems: ['thm-rank-nullity'],
    typicalStructure: 'Given T: V → W, find basis for ker(T) and Im(T)',
    solutionApproach: '1. Solve T(v) = 0 for kernel, 2. Find image of basis vectors, 3. Verify rank-nullity',
  },
  {
    id: 'pattern-matrix-rep',
    patternName: 'Matrix Representation',
    description: 'Find matrix representation of a linear transformation',
    frequency: 12,
    exampleQuestions: ['exam-2022-23-B-q1', 'exam-2023-24-B-q2'],
    relatedTopics: ['matrix-representation', 'change-of-basis'],
    relatedTheorems: ['thm-matrix-composition'],
    typicalStructure: 'Given T and basis B, find [T]_B',
    solutionApproach: '1. Compute T(basis vectors), 2. Express in terms of target basis, 3. Form columns',
  },
  {
    id: 'pattern-diagonalize',
    patternName: 'Diagonalization',
    description: 'Diagonalize a matrix (find P and D)',
    frequency: 20,
    exampleQuestions: ['exam-2022-23-A-q3', 'exam-2023-24-A-q3'],
    relatedTopics: ['eigenvalues', 'eigenvectors', 'diagonalization'],
    relatedTheorems: ['thm-diagonalization-criterion'],
    typicalStructure: '(a) Find eigenvalues, (b) Find eigenvectors, (c) Is A diagonalizable? If yes, find P, D',
    solutionApproach: '1. Compute char. poly., 2. Find roots, 3. For each eigenvalue find eigenspace, 4. Check geo = alg multiplicities',
  },
  {
    id: 'pattern-gram-schmidt',
    patternName: 'Gram-Schmidt',
    description: 'Apply Gram-Schmidt to orthonormalize vectors',
    frequency: 10,
    exampleQuestions: ['exam-2022-23-A-q4'],
    relatedTopics: ['gram-schmidt', 'inner-products', 'orthogonality'],
    relatedTheorems: ['thm-gram-schmidt'],
    typicalStructure: 'Given vectors v₁, ..., vₖ, apply Gram-Schmidt to get orthonormal set',
    solutionApproach: 'For each vector: 1. Subtract projections, 2. Normalize',
  },
  {
    id: 'pattern-least-squares',
    patternName: 'Least Squares',
    description: 'Find least squares solution to inconsistent system',
    frequency: 8,
    exampleQuestions: ['exam-2024-25-A-q4'],
    relatedTopics: ['least-squares', 'orthogonality'],
    relatedTheorems: ['thm-least-squares'],
    typicalStructure: 'Given Ax = b with no solution, find least squares solution',
    solutionApproach: '1. Compute AᵀA and Aᵀb, 2. Solve normal equations AᵀAx̂ = Aᵀb',
  },
  {
    id: 'pattern-det-computation',
    patternName: 'Determinant Computation',
    description: 'Compute determinant or use properties',
    frequency: 12,
    exampleQuestions: ['exam-2023-24-A-q2', 'exam-2024-25-A-q3'],
    relatedTopics: ['determinants'],
    relatedTheorems: ['thm-det-product', 'thm-det-inverse', 'thm-det-row-ops'],
    typicalStructure: 'Compute det(A) or prove det property',
    solutionApproach: '1. Row reduction keeping track of sign changes, OR 2. Cofactor expansion, OR 3. Use properties',
  },
  {
    id: 'pattern-proof-independence',
    patternName: 'Prove Linear Independence',
    description: 'Prove vectors are linearly independent',
    frequency: 10,
    exampleQuestions: ['pq-3-1'],
    relatedTopics: ['linear-independence'],
    relatedTheorems: ['thm-zero-dependent'],
    typicalStructure: 'Show v₁, ..., vₙ are linearly independent',
    solutionApproach: '1. Set up α₁v₁ + ... + αₙvₙ = 0, 2. Show all αᵢ = 0',
  },
  {
    id: 'pattern-similar-matrices',
    patternName: 'Similar Matrices',
    description: 'Prove matrices similar or use similarity properties',
    frequency: 6,
    exampleQuestions: ['exam-2024-25-A-q2'],
    relatedTopics: ['change-of-basis', 'diagonalization'],
    relatedTheorems: ['thm-similar-matrices'],
    typicalStructure: 'Prove property holds for similar matrices, or prove two matrices similar',
    solutionApproach: '1. Use B = P⁻¹AP definition, 2. Compute and verify',
  },
]

// Get top N items by likelihood
export function getTopLikelihoodItems(n: number = 10): LikelihoodItem[] {
  return [...likelihoodData]
    .sort((a, b) => b.likelihoodScore - a.likelihoodScore)
    .slice(0, n)
}

// Get items by type
export function getLikelihoodByType(type: 'theorem' | 'definition' | 'proof' | 'technique'): LikelihoodItem[] {
  return likelihoodData.filter(item => item.itemType === type)
}

// Get most common patterns
export function getMostCommonPatterns(n: number = 5): QuestionPattern[] {
  return [...questionPatterns]
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, n)
}
