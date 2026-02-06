// Linear Algebra Study App Types

export type KnowledgeType =
  | 'definition'
  | 'theorem'
  | 'lemma'
  | 'corollary'
  | 'proposition'
  | 'proof'
  | 'technique'
  | 'formula'
  | 'example';

export type LinearAlgebraTopic =
  | 'fields'
  | 'vector-spaces'
  | 'subspaces'
  | 'linear-combinations'
  | 'span'
  | 'linear-independence'
  | 'basis'
  | 'dimension'
  | 'linear-transformations'
  | 'matrix-representation'
  | 'change-of-basis'
  | 'rank'
  | 'nullity'
  | 'systems-of-equations'
  | 'row-reduction'
  | 'determinants'
  | 'eigenvalues'
  | 'eigenvectors'
  | 'diagonalization'
  | 'inner-products'
  | 'orthogonality'
  | 'gram-schmidt'
  | 'least-squares'
  | 'singular-values'
  | 'jordan-form'
  | 'bilinear-forms'
  | 'quadratic-forms'
  | 'other';

export interface KnowledgeItem {
  id: string;
  type: KnowledgeType;
  title: string;
  titleHe?: string;
  verbatimContent: string;
  explanation?: string;
  source: string;
  pageNumber: number;
  sectionHeader?: string;
  topic: LinearAlgebraTopic;
  weekNumber: number;
  tags: string[];
  relatedItems: string[];
  likelihoodScore?: number;
  examFrequency?: number;
}

export interface StudyWeek {
  id: string;
  weekNumber: number;
  title: string;
  titleHe?: string;
  description: string;
  topics: LinearAlgebraTopic[];
  lectureFiles: string[];
  tutorialFiles: string[];
  definitions: KnowledgeItem[];
  theorems: KnowledgeItem[];
  proofs: KnowledgeItem[];
  techniques: KnowledgeItem[];
  formulas: KnowledgeItem[];
  examples: KnowledgeItem[];
  practiceQuestions: PracticeQuestion[];
  isCompleted: boolean;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  source: string;
  pageNumber: number;
  topic: LinearAlgebraTopic;
  weekNumber: number;
  difficulty: 'easy' | 'medium' | 'hard';
  relatedTheorems: string[];
  relatedDefinitions: string[];
  solution?: string;
  solutionSteps?: string[];
}

export type LikelihoodLevel = 'גבוהה מאוד' | 'גבוהה' | 'בינונית' | 'נמוכה';

export interface LikelihoodEvidenceHe {
  examFrequency: number;
  examYears: string[];
  patternSimilarity: number;
  topicCentrality: number;
  reasoningHe: string;
}

export interface HomeworkQuestion extends PracticeQuestion {
  homeworkNumber: number;
  questionNumber: string;
  likelihoodScore: number;
  likelihoodLevel: LikelihoodLevel;
  examAppearances: number;
  similarExamQuestions: string[];
  evidence?: LikelihoodEvidenceHe;
}

export interface ExamQuestion extends PracticeQuestion {
  examYear: string;
  examSession: 'A' | 'B' | 'simulation';
  questionNumber: number;
  points?: number;
  timeEstimate?: number;
  solution: string;
  commonMistakes?: string[];
}

export interface ExamData {
  id: string;
  year: string;
  session: 'A' | 'B' | 'simulation';
  language: 'eng' | 'heb';
  sourceFile: string;
  questions: ExamQuestion[];
  topicDistribution: Record<LinearAlgebraTopic, number>;
  difficultyDistribution: Record<'easy' | 'medium' | 'hard', number>;
  totalPoints: number;
  hasSolution: boolean;
}

export interface QuizData {
  id: string;
  quizNumber: number;
  group: number | 'simulation';
  year: string;
  language: 'eng' | 'heb';
  sourceFile: string;
  questions: ExamQuestion[];
  hasSolution: boolean;
}

export interface LikelihoodItem {
  id: string;
  itemId: string;
  itemType: 'theorem' | 'definition' | 'proof' | 'technique' | 'question-pattern';
  title: string;
  likelihoodScore: number;
  evidence: LikelihoodEvidence;
  rank: number;
}

export interface LikelihoodEvidence {
  examFrequency: number;
  examYears: string[];
  homeworkOverlap: number;
  patternSimilarity: number;
  recentTrend: 'increasing' | 'stable' | 'decreasing';
  notes: string;
}

export interface QuestionPattern {
  id: string;
  patternName: string;
  description: string;
  frequency: number;
  exampleQuestions: string[];
  relatedTopics: LinearAlgebraTopic[];
  relatedTheorems: string[];
  typicalStructure: string;
  solutionApproach: string;
}

export interface StudyPlan {
  id: string;
  examDate: string;
  availableDays: number;
  hoursPerDay: number;
  weakTopics: LinearAlgebraTopic[];
  dailySchedule: DailyStudyTask[];
  createdAt: string;
}

export interface DailyStudyTask {
  date: string;
  dayNumber: number;
  tasks: StudyTask[];
  isCompleted: boolean;
  totalHours: number;
}

export interface StudyTask {
  id: string;
  title: string;
  description: string;
  type: 'review' | 'practice' | 'new-material' | 'exam-drill';
  weekNumber?: number;
  topics: LinearAlgebraTopic[];
  estimatedMinutes: number;
  priority: 'high' | 'medium' | 'low';
  relatedItems: string[];
  isCompleted: boolean;
}

export interface PracticeSession {
  id: string;
  mode: 'flashcard' | 'identify-tool' | 'exam-drill';
  startedAt: string;
  completedAt?: string;
  questions: PracticeAttempt[];
  score: number;
  totalQuestions: number;
}

export interface PracticeAttempt {
  questionId: string;
  userAnswer?: string;
  isCorrect: boolean;
  timeSpent: number;
  revealedAt?: string;
}

export interface UserProgress {
  completedWeeks: number[];
  completedItems: string[];
  practiceHistory: PracticeSession[];
  weakAreas: LinearAlgebraTopic[];
  strongAreas: LinearAlgebraTopic[];
  lastStudyDate: string;
  totalStudyTime: number;
  streak: number;
}

export interface DebugInfo {
  totalDefinitions: number;
  totalTheorems: number;
  totalProofs: number;
  totalTechniques: number;
  totalFormulas: number;
  totalExamples: number;
  totalWeeks: number;
  totalHomeworkQuestions: number;
  totalExamQuestions: number;
  totalQuizQuestions: number;
  totalExams: number;
  totalQuizzes: number;
  missingSourceRefs: string[];
  extractionDate: string;
  sourceFiles: string[];
}
