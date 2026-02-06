// Data adapter: transforms LINER exam data into BDIDA-compatible format

import { examQuestions } from './liner-exams';

export interface ExamQuestion {
  id: string;
  year: number;
  moed: 'a' | 'b';
  questionNumber: number;
  subQuestion?: string;
  topic: string;
  points: number;
  question: string;
  solution: string;
}

export interface Exam {
  year: number;
  moed: 'a' | 'b';
  questions: ExamQuestion[];
}

export interface TopicFrequency {
  topic: string;
  topicHe: string;
  count: number;
  percentage: number;
  exampleQuestions: string[];
}

function topicToHebrew(topic: string): string {
  const map: Record<string, string> = {
    'fields': 'שדות',
    'complex-numbers': 'מספרים מרוכבים',
    'linear-equations': 'משוואות ליניאריות',
    'vector-spaces': 'מרחבים וקטוריים',
    'subspaces': 'תת-מרחבים',
    'linear-combinations': 'צירופים לינאריים',
    'span': 'מרחב נפרש',
    'linear-independence': 'אי-תלות לינארית',
    'basis': 'בסיס',
    'dimension': 'מימד',
    'matrices': 'מטריצות',
    'invertible-matrices': 'מטריצות הפיכות',
    'systems-of-equations': 'מערכות משוואות',
    'row-reduction': 'דירוג שורות',
    'determinants': 'דטרמיננטות',
    'rank': 'דרגה',
    'row-column-space': 'מרחב שורות ועמודות',
    'other': 'אחר',
  };
  return map[topic] || topic.replace(/-/g, ' ');
}

function parseYear(yearStr: string): number {
  // '2022-23' → 2022, '2023-24' → 2023, '2024-25' → 2024
  const match = yearStr.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : 2024;
}

// Transform exam questions
const transformedQuestions: ExamQuestion[] = examQuestions.map((q) => ({
  id: q.id,
  year: parseYear(q.examYear),
  moed: q.examSession.toLowerCase() as 'a' | 'b',
  questionNumber: q.questionNumber,
  subQuestion: undefined,
  topic: topicToHebrew(q.topic),
  points: q.points || 20,
  question: q.question,
  solution: q.solution,
}));

// Group into exams
const examMap = new Map<string, ExamQuestion[]>();
for (const q of transformedQuestions) {
  const key = `${q.year}-${q.moed}`;
  if (!examMap.has(key)) examMap.set(key, []);
  examMap.get(key)!.push(q);
}

const exams: Exam[] = Array.from(examMap.entries())
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, questions]) => ({
    year: questions[0].year,
    moed: questions[0].moed,
    questions: questions.sort((a, b) => a.questionNumber - b.questionNumber),
  }));

// Compute topic frequencies
const topicCounts = new Map<string, { count: number; examples: string[] }>();
for (const q of examQuestions) {
  const topic = q.topic;
  if (!topicCounts.has(topic)) topicCounts.set(topic, { count: 0, examples: [] });
  const entry = topicCounts.get(topic)!;
  entry.count++;
  if (entry.examples.length < 2) {
    entry.examples.push(q.question.length > 80 ? q.question.slice(0, 80) + '...' : q.question);
  }
}

const totalQuestions = examQuestions.length;
export const topicFrequencies: TopicFrequency[] = Array.from(topicCounts.entries())
  .map(([topic, data]) => ({
    topic,
    topicHe: topicToHebrew(topic),
    count: data.count,
    percentage: Math.round((data.count / totalQuestions) * 100),
    exampleQuestions: data.examples,
  }))
  .sort((a, b) => b.percentage - a.percentage);

export function getAllExams(): Exam[] {
  return exams;
}

export function getTopicsByLikelihood(): TopicFrequency[] {
  return topicFrequencies;
}
