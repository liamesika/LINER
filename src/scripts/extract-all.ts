/**
 * LINER PDF Extraction Script
 *
 * This script extracts content from all Linear Algebra PDFs in the LINER folder
 * and generates static TypeScript data files for the web app.
 *
 * Run with: npm run extract
 */

import * as fs from 'fs'
import * as path from 'path'

const LINER_PATH = '/Users/liamesika/Desktop/infi/LINER'
const OUTPUT_PATH = path.join(__dirname, '..', 'data')

interface ExtractedContent {
  definitions: any[]
  theorems: any[]
  proofs: any[]
  techniques: any[]
  formulas: any[]
  examples: any[]
}

interface WeekMapping {
  weekNumber: number
  title: string
  topics: string[]
  lectureFiles: string[]
  tutorialFiles: string[]
}

// Week mapping based on lecture sequence (26 lectures, ~13 weeks, 2 lectures per week)
const WEEK_MAPPINGS: WeekMapping[] = [
  { weekNumber: 1, title: 'Fields and Vector Spaces Basics', topics: ['fields', 'vector-spaces'], lectureFiles: ['LA01 lecture 01 2026.pdf', 'LA01 lecture 02 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_1_Omer.pdf'] },
  { weekNumber: 2, title: 'Subspaces and Linear Combinations', topics: ['subspaces', 'linear-combinations'], lectureFiles: ['LA01 lecture 03 2026.pdf', 'LA01 lecture 04 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_2_Omer.pdf'] },
  { weekNumber: 3, title: 'Span and Linear Independence', topics: ['span', 'linear-independence'], lectureFiles: ['LA01 lecture 05 2026.pdf', 'LA01 lecture 06 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_3_Omer.pdf'] },
  { weekNumber: 4, title: 'Basis and Dimension', topics: ['basis', 'dimension'], lectureFiles: ['LA01 lecture 07 2026.pdf', 'LA01 lecture 08 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_4_Omer.pdf'] },
  { weekNumber: 5, title: 'Linear Transformations', topics: ['linear-transformations'], lectureFiles: ['LA01 lecture 09 2026.pdf', 'LA01 lecture 10 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_5_Omer.pdf'] },
  { weekNumber: 6, title: 'Matrix Representation', topics: ['matrix-representation', 'change-of-basis'], lectureFiles: ['LA01 lecture 11 2026.pdf', 'LA01 lecture 12 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf'] },
  { weekNumber: 7, title: 'Rank and Nullity', topics: ['rank', 'nullity', 'systems-of-equations'], lectureFiles: ['LA01 lecture 13 2026.pdf', 'LA01 lecture 14 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf'] },
  { weekNumber: 8, title: 'Row Reduction and Systems', topics: ['row-reduction', 'systems-of-equations'], lectureFiles: ['LA01 lecture 15 2026.pdf', 'LA01 lecture 16 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf'] },
  { weekNumber: 9, title: 'Determinants', topics: ['determinants'], lectureFiles: ['LA01 lecture 17 2026.pdf', 'LA01 lecture 18 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf'] },
  { weekNumber: 10, title: 'Eigenvalues and Eigenvectors', topics: ['eigenvalues', 'eigenvectors'], lectureFiles: ['LA01 lecture 19 2026.pdf', 'LA01 lecture 20 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf'] },
  { weekNumber: 11, title: 'Diagonalization', topics: ['diagonalization'], lectureFiles: ['LA01 lecture 21 2026.pdf', 'LA01 lecture 22 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf'] },
  { weekNumber: 12, title: 'Inner Products and Orthogonality', topics: ['inner-products', 'orthogonality'], lectureFiles: ['LA01 lecture 23 2026.pdf', 'LA01 lecture 24 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf'] },
  { weekNumber: 13, title: 'Gram-Schmidt and Applications', topics: ['gram-schmidt', 'least-squares'], lectureFiles: ['LA01 lecture 25 2026.pdf', 'LA01 lecture 26 2026.pdf'], tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf'] },
]

async function loadPdfParse() {
  try {
    const pdfParse = await import('pdf-parse')
    return pdfParse.default
  } catch (e) {
    console.error('Failed to load pdf-parse:', e)
    return null
  }
}

async function extractPdfText(filePath: string): Promise<{ text: string; numPages: number }> {
  const pdfParse = await loadPdfParse()
  if (!pdfParse) {
    return { text: '', numPages: 0 }
  }

  try {
    const dataBuffer = fs.readFileSync(filePath)
    const data = await pdfParse(dataBuffer)
    return { text: data.text, numPages: data.numpages }
  } catch (e) {
    console.error(`Error extracting ${filePath}:`, e)
    return { text: '', numPages: 0 }
  }
}

function parseDefinitions(text: string, source: string, pageNum: number): any[] {
  const definitions: any[] = []

  // Pattern for definitions (common formats)
  const defPatterns = [
    /Definition\s*[\d.]*[:\s]*([^\n]+(?:\n(?!Definition|Theorem|Lemma|Proof|Corollary|Proposition)[^\n]+)*)/gi,
    /Def\s*[\d.]*[:\s]*([^\n]+(?:\n(?!Def|Thm|Lemma|Proof|Cor|Prop)[^\n]+)*)/gi,
    /הגדרה\s*[\d.]*[:\s]*([^\n]+(?:\n(?!הגדרה|משפט|למה|הוכחה)[^\n]+)*)/gi,
  ]

  for (const pattern of defPatterns) {
    let match
    while ((match = pattern.exec(text)) !== null) {
      const content = match[1]?.trim()
      if (content && content.length > 20) {
        definitions.push({
          type: 'definition',
          verbatimContent: content.substring(0, 2000),
          source,
          pageNumber: pageNum,
        })
      }
    }
  }

  return definitions
}

function parseTheorems(text: string, source: string, pageNum: number): any[] {
  const theorems: any[] = []

  const thmPatterns = [
    /Theorem\s*[\d.]*[:\s]*([^\n]+(?:\n(?!Definition|Theorem|Lemma|Proof|Corollary|Proposition)[^\n]+)*)/gi,
    /Thm\s*[\d.]*[:\s]*([^\n]+(?:\n(?!Def|Thm|Lemma|Proof|Cor|Prop)[^\n]+)*)/gi,
    /משפט\s*[\d.]*[:\s]*([^\n]+(?:\n(?!הגדרה|משפט|למה|הוכחה)[^\n]+)*)/gi,
  ]

  for (const pattern of thmPatterns) {
    let match
    while ((match = pattern.exec(text)) !== null) {
      const content = match[1]?.trim()
      if (content && content.length > 20) {
        theorems.push({
          type: 'theorem',
          verbatimContent: content.substring(0, 2000),
          source,
          pageNumber: pageNum,
        })
      }
    }
  }

  return theorems
}

function parseLemmas(text: string, source: string, pageNum: number): any[] {
  const lemmas: any[] = []

  const lemmaPatterns = [
    /Lemma\s*[\d.]*[:\s]*([^\n]+(?:\n(?!Definition|Theorem|Lemma|Proof|Corollary|Proposition)[^\n]+)*)/gi,
    /למה\s*[\d.]*[:\s]*([^\n]+(?:\n(?!הגדרה|משפט|למה|הוכחה)[^\n]+)*)/gi,
  ]

  for (const pattern of lemmaPatterns) {
    let match
    while ((match = pattern.exec(text)) !== null) {
      const content = match[1]?.trim()
      if (content && content.length > 20) {
        lemmas.push({
          type: 'lemma',
          verbatimContent: content.substring(0, 2000),
          source,
          pageNumber: pageNum,
        })
      }
    }
  }

  return lemmas
}

function parseProofs(text: string, source: string, pageNum: number): any[] {
  const proofs: any[] = []

  const proofPatterns = [
    /Proof[:\s]*([^\n]+(?:\n(?!Definition|Theorem|Lemma|Proof|Corollary|Proposition|QED|□)[^\n]+)*)/gi,
    /הוכחה[:\s]*([^\n]+(?:\n(?!הגדרה|משפט|למה|הוכחה|∎|□)[^\n]+)*)/gi,
  ]

  for (const pattern of proofPatterns) {
    let match
    while ((match = pattern.exec(text)) !== null) {
      const content = match[1]?.trim()
      if (content && content.length > 30) {
        proofs.push({
          type: 'proof',
          verbatimContent: content.substring(0, 3000),
          source,
          pageNumber: pageNum,
        })
      }
    }
  }

  return proofs
}

function parseCorollaries(text: string, source: string, pageNum: number): any[] {
  const corollaries: any[] = []

  const corPatterns = [
    /Corollary\s*[\d.]*[:\s]*([^\n]+(?:\n(?!Definition|Theorem|Lemma|Proof|Corollary|Proposition)[^\n]+)*)/gi,
    /מסקנה\s*[\d.]*[:\s]*([^\n]+(?:\n(?!הגדרה|משפט|למה|הוכחה|מסקנה)[^\n]+)*)/gi,
  ]

  for (const pattern of corPatterns) {
    let match
    while ((match = pattern.exec(text)) !== null) {
      const content = match[1]?.trim()
      if (content && content.length > 20) {
        corollaries.push({
          type: 'corollary',
          verbatimContent: content.substring(0, 2000),
          source,
          pageNumber: pageNum,
        })
      }
    }
  }

  return corollaries
}

function parseExamQuestions(text: string, source: string): any[] {
  const questions: any[] = []

  // Pattern for exam questions (numbered questions)
  const questionPatterns = [
    /(?:Question|Problem|Q\.?)\s*(\d+)[.\s:]*([^\n]+(?:\n(?!Question|Problem|Q\.?\s*\d)[^\n]+)*)/gi,
    /(\d+)\.\s*(?:\(\d+\s*(?:pts?|points?)\))?\s*([^\n]+(?:\n(?!\d+\.)[^\n]+)*)/gi,
    /שאלה\s*(\d+)[.\s:]*([^\n]+(?:\n(?!שאלה\s*\d)[^\n]+)*)/gi,
  ]

  for (const pattern of questionPatterns) {
    let match
    while ((match = pattern.exec(text)) !== null) {
      const qNum = match[1]
      const content = match[2]?.trim()
      if (content && content.length > 30) {
        questions.push({
          questionNumber: parseInt(qNum),
          content: content.substring(0, 2000),
          source,
        })
      }
    }
  }

  return questions
}

function getWeekForLecture(lectureFile: string): number {
  for (const week of WEEK_MAPPINGS) {
    if (week.lectureFiles.includes(lectureFile)) {
      return week.weekNumber
    }
  }
  return 1 // Default to week 1
}

function getWeekForTutorial(tutorialFile: string): number {
  for (const week of WEEK_MAPPINGS) {
    if (week.tutorialFiles.includes(tutorialFile)) {
      return week.weekNumber
    }
  }
  return 1
}

function detectTopic(content: string): string {
  const topicKeywords: Record<string, string[]> = {
    'fields': ['field', 'שדה', 'F', 'characteristic', 'מאפיין'],
    'vector-spaces': ['vector space', 'מרחב וקטורי', 'V', 'scalar', 'סקלר'],
    'subspaces': ['subspace', 'תת-מרחב', 'subset'],
    'linear-combinations': ['linear combination', 'צירוף לינארי'],
    'span': ['span', 'פרישה', 'Sp(', 'spanning'],
    'linear-independence': ['linearly independent', 'בלתי תלויים', 'dependent', 'תלויים'],
    'basis': ['basis', 'בסיס', 'bases'],
    'dimension': ['dimension', 'מימד', 'dim(', 'dim '],
    'linear-transformations': ['linear transformation', 'העתקה לינארית', 'T:', 'homomorphism'],
    'matrix-representation': ['matrix representation', 'ייצוג מטריצי', '[T]', 'representing matrix'],
    'change-of-basis': ['change of basis', 'מעבר בין בסיסים', 'transition matrix'],
    'rank': ['rank', 'דרגה', 'rk(', 'rank('],
    'nullity': ['nullity', 'nullspace', 'kernel', 'גרעין', 'ker('],
    'systems-of-equations': ['system of equations', 'מערכת משוואות', 'Ax=b', 'solution'],
    'row-reduction': ['row reduction', 'דירוג', 'echelon', 'pivot', 'Gaussian'],
    'determinants': ['determinant', 'דטרמיננטה', 'det(', '|A|'],
    'eigenvalues': ['eigenvalue', 'ערך עצמי', 'λ', 'characteristic polynomial'],
    'eigenvectors': ['eigenvector', 'וקטור עצמי', 'eigenspace'],
    'diagonalization': ['diagonalizable', 'לכסון', 'diagonal', 'D=P^{-1}AP'],
    'inner-products': ['inner product', 'מכפלה פנימית', '<', '>', '⟨', '⟩'],
    'orthogonality': ['orthogonal', 'אורתוגונל', 'perpendicular', 'ניצב'],
    'gram-schmidt': ['Gram-Schmidt', 'גרם-שמידט', 'orthonormalization'],
    'least-squares': ['least squares', 'ריבועים מזעריים', 'best approximation'],
  }

  const lowerContent = content.toLowerCase()

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    for (const keyword of keywords) {
      if (lowerContent.includes(keyword.toLowerCase())) {
        return topic
      }
    }
  }

  return 'other'
}

async function extractLectures() {
  console.log('Extracting lectures...')
  const lecturesPath = path.join(LINER_PATH, 'LECTURES+PRACTICE')
  const files = fs.readdirSync(lecturesPath).filter(f => f.startsWith('LA01 lecture') && f.endsWith('.pdf'))

  const allContent: ExtractedContent = {
    definitions: [],
    theorems: [],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
  }

  for (const file of files) {
    console.log(`  Processing: ${file}`)
    const filePath = path.join(lecturesPath, file)
    const { text, numPages } = await extractPdfText(filePath)

    const weekNum = getWeekForLecture(file)

    // Parse content
    const definitions = parseDefinitions(text, file, 1)
    const theorems = parseTheorems(text, file, 1)
    const lemmas = parseLemmas(text, file, 1)
    const proofs = parseProofs(text, file, 1)
    const corollaries = parseCorollaries(text, file, 1)

    // Add week and topic info
    for (const def of definitions) {
      def.weekNumber = weekNum
      def.topic = detectTopic(def.verbatimContent)
      def.id = `def-${file.replace(/[^a-zA-Z0-9]/g, '-')}-${allContent.definitions.length}`
      def.title = extractTitle(def.verbatimContent, 'Definition')
      allContent.definitions.push(def)
    }

    for (const thm of theorems) {
      thm.weekNumber = weekNum
      thm.topic = detectTopic(thm.verbatimContent)
      thm.id = `thm-${file.replace(/[^a-zA-Z0-9]/g, '-')}-${allContent.theorems.length}`
      thm.title = extractTitle(thm.verbatimContent, 'Theorem')
      allContent.theorems.push(thm)
    }

    for (const lemma of lemmas) {
      lemma.weekNumber = weekNum
      lemma.topic = detectTopic(lemma.verbatimContent)
      lemma.id = `lem-${file.replace(/[^a-zA-Z0-9]/g, '-')}-${allContent.theorems.length}`
      lemma.type = 'lemma'
      lemma.title = extractTitle(lemma.verbatimContent, 'Lemma')
      allContent.theorems.push(lemma)
    }

    for (const cor of corollaries) {
      cor.weekNumber = weekNum
      cor.topic = detectTopic(cor.verbatimContent)
      cor.id = `cor-${file.replace(/[^a-zA-Z0-9]/g, '-')}-${allContent.theorems.length}`
      cor.type = 'corollary'
      cor.title = extractTitle(cor.verbatimContent, 'Corollary')
      allContent.theorems.push(cor)
    }

    for (const proof of proofs) {
      proof.weekNumber = weekNum
      proof.topic = detectTopic(proof.verbatimContent)
      proof.id = `prf-${file.replace(/[^a-zA-Z0-9]/g, '-')}-${allContent.proofs.length}`
      proof.title = extractTitle(proof.verbatimContent, 'Proof')
      allContent.proofs.push(proof)
    }
  }

  return allContent
}

function extractTitle(content: string, type: string): string {
  // Try to get first meaningful line
  const firstLine = content.split('\n')[0].trim()
  if (firstLine.length > 10 && firstLine.length < 100) {
    return firstLine
  }
  return `${type} (${content.substring(0, 50)}...)`
}

async function extractTutorials() {
  console.log('Extracting tutorials...')
  const tutorialsPath = path.join(LINER_PATH, 'LECTURES+PRACTICE')
  const files = fs.readdirSync(tutorialsPath).filter(f => f.includes('Tirgul') && f.endsWith('.pdf'))

  const questions: any[] = []

  for (const file of files) {
    console.log(`  Processing: ${file}`)
    const filePath = path.join(tutorialsPath, file)
    const { text } = await extractPdfText(filePath)

    const weekNum = getWeekForTutorial(file)
    const extracted = parseExamQuestions(text, file)

    for (const q of extracted) {
      q.weekNumber = weekNum
      q.topic = detectTopic(q.content)
      q.id = `tut-q-${file.replace(/[^a-zA-Z0-9]/g, '-')}-${q.questionNumber}`
      q.type = 'tutorial'
      questions.push(q)
    }
  }

  return questions
}

async function extractExams() {
  console.log('Extracting exams...')
  const examsPath = path.join(LINER_PATH, 'PAST_EXAMS')
  const files = fs.readdirSync(examsPath).filter(f => f.endsWith('.pdf'))

  const exams: any[] = []
  const allQuestions: any[] = []

  // Group files by exam
  const examGroups: Record<string, string[]> = {}

  for (const file of files) {
    // Parse exam info from filename
    const yearMatch = file.match(/(\d{4}-\d{2})/)
    const moed = file.includes('MoedA') ? 'A' : file.includes('MoedB') ? 'B' : 'simulation'
    const isEng = file.includes('Eng') || file.includes('eng')
    const isSolution = file.toLowerCase().includes('solution')

    if (yearMatch) {
      const key = `${yearMatch[1]}-${moed}`
      if (!examGroups[key]) examGroups[key] = []
      examGroups[key].push(file)
    }
  }

  for (const [key, groupFiles] of Object.entries(examGroups)) {
    const [year, session] = key.split('-') as [string, 'A' | 'B' | 'simulation']

    // Find English exam file (prefer non-solution)
    const examFile = groupFiles.find(f =>
      (f.includes('Eng') || f.includes('eng')) && !f.toLowerCase().includes('solution')
    ) || groupFiles[0]

    const solutionFile = groupFiles.find(f => f.toLowerCase().includes('solution'))

    console.log(`  Processing: ${examFile}`)
    const filePath = path.join(examsPath, examFile)
    const { text } = await extractPdfText(filePath)

    const questions = parseExamQuestions(text, examFile)

    for (const q of questions) {
      q.examYear = year
      q.examSession = session
      q.topic = detectTopic(q.content)
      q.id = `exam-${year}-${session}-q${q.questionNumber}`
      allQuestions.push(q)
    }

    exams.push({
      id: `exam-${year}-${session}`,
      year,
      session,
      language: 'eng',
      sourceFile: examFile,
      hasSolution: !!solutionFile,
      questions: questions.map(q => q.id),
    })
  }

  return { exams, questions: allQuestions }
}

async function extractQuizzes() {
  console.log('Extracting quizzes...')
  const examsPath = path.join(LINER_PATH, 'PAST_EXAMS')
  const files = fs.readdirSync(examsPath).filter(f => f.includes('Quiz') && f.endsWith('.pdf'))

  const quizzes: any[] = []
  const allQuestions: any[] = []

  for (const file of files) {
    // Skip Hebrew and solution files for primary extraction
    if (file.includes('heb') && !file.includes('eng')) continue
    if (file.toLowerCase().includes('solution')) continue

    const quizMatch = file.match(/Quiz(\d+)/)
    const groupMatch = file.match(/group(\d+)/)
    const quizNum = quizMatch ? parseInt(quizMatch[1]) : 1
    const group = groupMatch ? parseInt(groupMatch[1]) : (file.includes('simulation') ? 'simulation' : 1)

    console.log(`  Processing: ${file}`)
    const filePath = path.join(examsPath, file)
    const { text } = await extractPdfText(filePath)

    const questions = parseExamQuestions(text, file)

    for (const q of questions) {
      q.quizNumber = quizNum
      q.group = group
      q.topic = detectTopic(q.content)
      q.id = `quiz${quizNum}-g${group}-q${q.questionNumber}`
      allQuestions.push(q)
    }

    quizzes.push({
      id: `quiz${quizNum}-g${group}`,
      quizNumber: quizNum,
      group,
      year: '2026',
      sourceFile: file,
      questions: questions.map(q => q.id),
    })
  }

  return { quizzes, questions: allQuestions }
}

function calculateLikelihood(
  definitions: any[],
  theorems: any[],
  examQuestions: any[],
  quizQuestions: any[]
): any[] {
  const likelihood: any[] = []

  // Calculate frequency of topics in exams
  const topicFrequency: Record<string, number> = {}
  for (const q of [...examQuestions, ...quizQuestions]) {
    topicFrequency[q.topic] = (topicFrequency[q.topic] || 0) + 1
  }

  // Score theorems
  for (const thm of theorems) {
    const topicScore = (topicFrequency[thm.topic] || 0) * 10
    const baseScore = 50
    const score = Math.min(100, baseScore + topicScore)

    likelihood.push({
      id: `like-${thm.id}`,
      itemId: thm.id,
      itemType: 'theorem',
      title: thm.title,
      likelihoodScore: score,
      evidence: {
        examFrequency: topicFrequency[thm.topic] || 0,
        examYears: [],
        homeworkOverlap: 0,
        patternSimilarity: 0,
        recentTrend: 'stable' as const,
        notes: `Topic "${thm.topic}" appears ${topicFrequency[thm.topic] || 0} times in exams`,
      },
      rank: 0,
    })
  }

  // Score definitions
  for (const def of definitions) {
    const topicScore = (topicFrequency[def.topic] || 0) * 8
    const baseScore = 40
    const score = Math.min(100, baseScore + topicScore)

    likelihood.push({
      id: `like-${def.id}`,
      itemId: def.id,
      itemType: 'definition',
      title: def.title,
      likelihoodScore: score,
      evidence: {
        examFrequency: topicFrequency[def.topic] || 0,
        examYears: [],
        homeworkOverlap: 0,
        patternSimilarity: 0,
        recentTrend: 'stable' as const,
        notes: `Topic "${def.topic}" appears ${topicFrequency[def.topic] || 0} times in exams`,
      },
      rank: 0,
    })
  }

  // Sort and assign ranks
  likelihood.sort((a, b) => b.likelihoodScore - a.likelihoodScore)
  likelihood.forEach((item, idx) => {
    item.rank = idx + 1
  })

  return likelihood
}

function generateWeeksData(content: ExtractedContent, tutorialQuestions: any[]): any[] {
  const weeks = WEEK_MAPPINGS.map(mapping => ({
    id: `week-${mapping.weekNumber}`,
    weekNumber: mapping.weekNumber,
    title: mapping.title,
    description: `Week ${mapping.weekNumber}: ${mapping.title}`,
    topics: mapping.topics,
    lectureFiles: mapping.lectureFiles,
    tutorialFiles: mapping.tutorialFiles,
    definitions: content.definitions.filter(d => d.weekNumber === mapping.weekNumber),
    theorems: content.theorems.filter(t => t.weekNumber === mapping.weekNumber),
    proofs: content.proofs.filter(p => p.weekNumber === mapping.weekNumber),
    techniques: content.techniques.filter(t => t.weekNumber === mapping.weekNumber),
    formulas: content.formulas.filter(f => f.weekNumber === mapping.weekNumber),
    examples: content.examples.filter(e => e.weekNumber === mapping.weekNumber),
    practiceQuestions: tutorialQuestions.filter(q => q.weekNumber === mapping.weekNumber),
    isCompleted: false,
  }))

  return weeks
}

function writeDataFile(filename: string, varName: string, data: any, typeImport: string) {
  const content = `// Auto-generated by extract-all.ts - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}

import type { ${typeImport} } from '@/types'

export const ${varName}: ${typeImport}${Array.isArray(data) ? '[]' : ''} = ${JSON.stringify(data, null, 2)}
`

  fs.writeFileSync(path.join(OUTPUT_PATH, filename), content)
  console.log(`  Written: ${filename}`)
}

async function main() {
  console.log('LINER PDF Extraction Script')
  console.log('===========================\n')

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true })
  }

  // Extract all content
  const lectureContent = await extractLectures()
  const tutorialQuestions = await extractTutorials()
  const { exams, questions: examQuestions } = await extractExams()
  const { quizzes, questions: quizQuestions } = await extractQuizzes()

  // Generate weeks data
  const weeks = generateWeeksData(lectureContent, tutorialQuestions)

  // Calculate likelihood
  const likelihood = calculateLikelihood(
    lectureContent.definitions,
    lectureContent.theorems,
    examQuestions,
    quizQuestions
  )

  // Generate debug info
  const debugInfo = {
    totalDefinitions: lectureContent.definitions.length,
    totalTheorems: lectureContent.theorems.length,
    totalProofs: lectureContent.proofs.length,
    totalTechniques: lectureContent.techniques.length,
    totalFormulas: lectureContent.formulas.length,
    totalExamples: lectureContent.examples.length,
    totalWeeks: weeks.length,
    totalHomeworkQuestions: tutorialQuestions.length,
    totalExamQuestions: examQuestions.length,
    totalQuizQuestions: quizQuestions.length,
    totalExams: exams.length,
    totalQuizzes: quizzes.length,
    missingSourceRefs: [],
    extractionDate: new Date().toISOString(),
    sourceFiles: [
      ...new Set([
        ...lectureContent.definitions.map(d => d.source),
        ...lectureContent.theorems.map(t => t.source),
        ...exams.map(e => e.sourceFile),
        ...quizzes.map(q => q.sourceFile),
      ])
    ],
  }

  console.log('\nWriting data files...')

  // Write all data files
  writeDataFile('liner-weeks.ts', 'weeksData', weeks, 'StudyWeek')
  writeDataFile('liner-knowledge.ts', 'knowledgeData', {
    definitions: lectureContent.definitions,
    theorems: lectureContent.theorems,
    proofs: lectureContent.proofs,
    techniques: lectureContent.techniques,
    formulas: lectureContent.formulas,
  }, 'KnowledgeItem')
  writeDataFile('liner-homework.ts', 'homeworkData', tutorialQuestions, 'PracticeQuestion')
  writeDataFile('liner-exams.ts', 'examsData', { exams, questions: examQuestions }, 'ExamData')
  writeDataFile('liner-quizzes.ts', 'quizzesData', { quizzes, questions: quizQuestions }, 'QuizData')
  writeDataFile('liner-likelihood.ts', 'likelihoodData', likelihood, 'LikelihoodItem')
  writeDataFile('liner-debug.ts', 'debugInfo', debugInfo, 'DebugInfo')

  console.log('\n✅ Extraction complete!')
  console.log(`\nSummary:`)
  console.log(`  - ${debugInfo.totalDefinitions} definitions`)
  console.log(`  - ${debugInfo.totalTheorems} theorems`)
  console.log(`  - ${debugInfo.totalProofs} proofs`)
  console.log(`  - ${debugInfo.totalWeeks} weeks`)
  console.log(`  - ${debugInfo.totalExams} exams`)
  console.log(`  - ${debugInfo.totalQuizzes} quizzes`)
  console.log(`  - ${debugInfo.totalExamQuestions} exam questions`)
  console.log(`  - ${debugInfo.totalHomeworkQuestions} tutorial questions`)
}

main().catch(console.error)
