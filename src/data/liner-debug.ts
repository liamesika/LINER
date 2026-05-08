// Linear Algebra App Debug Information

import type { DebugInfo } from '@/types'
import { weeksData } from './liner-weeks'
import { allDefinitions, allTheorems, allProofs, allTechniques, allFormulas } from './liner-knowledge'
import { examQuestions, examsData } from './liner-exams'
import { homeworkData } from './liner-homework'

export const debugInfo: DebugInfo = {
  totalDefinitions: allDefinitions.length,
  totalTheorems: allTheorems.length,
  totalProofs: allProofs.length,
  totalTechniques: allTechniques.length,
  totalFormulas: allFormulas.length,
  totalExamples: weeksData.reduce((acc, w) => acc + w.examples.length, 0),
  totalWeeks: weeksData.length,
  totalHomeworkQuestions: homeworkData.length,
  totalExamQuestions: examQuestions.length,
  totalQuizQuestions: 0, // Quizzes data can be added separately
  totalExams: examsData.length,
  totalQuizzes: 0,
  missingSourceRefs: [],
  extractionDate: new Date().toISOString(),
  sourceFiles: [
    // Lectures
    'LA01 lecture 01 2026.pdf',
    'LA01 lecture 02 2026.pdf',
    'LA01 lecture 03 2026.pdf',
    'LA01 lecture 04 2026.pdf',
    'LA01 lecture 05 2026.pdf',
    'LA01 lecture 06 2026.pdf',
    'LA01 lecture 07 2026.pdf',
    'LA01 lecture 08 2026.pdf',
    'LA01 lecture 09 2026.pdf',
    'LA01 lecture 10 2026.pdf',
    'LA01 lecture 11 2026.pdf',
    'LA01 lecture 12 2026.pdf',
    'LA01 lecture 13 2026.pdf',
    'LA01 lecture 14 2026.pdf',
    'LA01 lecture 15 2026.pdf',
    'LA01 lecture 16 2026.pdf',
    'LA01 lecture 17 2026.pdf',
    'LA01 lecture 18 2026.pdf',
    'LA01 lecture 19 2026.pdf',
    'LA01 lecture 20 2026.pdf',
    'LA01 lecture 21 2026.pdf',
    'LA01 lecture 22 2026.pdf',
    'LA01 lecture 23 2026.pdf',
    'LA01 lecture 24 2026.pdf',
    'LA01 lecture 25 2026.pdf',
    'LA01 lecture 26 2026.pdf',
    // Tutorials
    'Lin_Alg_I_2025-2026_Tirgul_1_Omer.pdf',
    'Lin_Alg_I_2025-2026_Tirgul_2_Omer.pdf',
    'Lin_Alg_I_2025-2026_Tirgul_3_Omer.pdf',
    'Lin_Alg_I_2025-2026_Tirgul_4_Omer.pdf',
    'Lin_Alg_I_2025-2026_Tirgul_5_Omer.pdf',
    'Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf',
    'Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf',
    'Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf',
    'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
    'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
    'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
    'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
    'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
    // Exams
    'LA1_2022-23_MoedA_Eng.pdf',
    'LA1_2022-23_MoedB_Eng.pdf',
    'LA1_2023-24_MoedA_Eng.pdf',
    'LA1_2023-24_MoedB_Eng.pdf',
    'LA1_2024-25_MoedA_Eng.pdf',
    'LA1_2024-25_MoedB_Eng.pdf',
  ],
}

// Diagnostic functions
export function getDataSummary() {
  return {
    knowledge: {
      definitions: allDefinitions.length,
      theorems: allTheorems.length,
      proofs: allProofs.length,
      techniques: allTechniques.length,
      formulas: allFormulas.length,
    },
    syllabus: {
      weeks: weeksData.length,
      totalItems: weeksData.reduce((acc, w) =>
        acc + w.definitions.length + w.theorems.length + w.proofs.length, 0
      ),
    },
    exams: {
      totalExams: examsData.length,
      totalQuestions: examQuestions.length,
      years: [...new Set(examsData.map(e => e.year))],
    },
    homework: {
      totalQuestions: homeworkData.length,
      highLikelihood: homeworkData.filter(h => h.likelihoodScore >= 80).length,
    },
  }
}

export function validateData(): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Check for missing required fields
  for (const def of allDefinitions) {
    if (!def.id) errors.push(`Definition missing id: ${def.title}`)
    if (!def.verbatimContent) errors.push(`Definition missing content: ${def.id}`)
    if (!def.source) errors.push(`Definition missing source: ${def.id}`)
  }

  for (const thm of allTheorems) {
    if (!thm.id) errors.push(`Theorem missing id: ${thm.title}`)
    if (!thm.verbatimContent) errors.push(`Theorem missing content: ${thm.id}`)
    if (!thm.source) errors.push(`Theorem missing source: ${thm.id}`)
  }

  for (const hw of homeworkData) {
    if (!hw.id) errors.push(`Homework missing id: ${hw.question}`)
    if (hw.likelihoodScore < 0 || hw.likelihoodScore > 100) {
      errors.push(`Invalid likelihood score for: ${hw.id}`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
