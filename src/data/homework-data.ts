// Data adapter: transforms LINER homework data into BDIDA-compatible format

import { homeworkData } from './liner-homework';

export interface HomeworkQuestion {
  id: string;
  homeworkNumber: number;
  questionNumber: number;
  subQuestion?: string;
  topic: string;
  question: string;
  solution: string;
  keyTechnique?: string;
}

export interface HomeworkSet {
  number: number;
  title: string;
  topics: string[];
  questions: HomeworkQuestion[];
}

function topicToHebrew(topic: string): string {
  const map: Record<string, string> = {
    'fields': 'שדות',
    'vector-spaces': 'מרחבים וקטוריים',
    'subspaces': 'תת-מרחבים',
    'linear-combinations': 'צירופים לינאריים',
    'span': 'מרחב נפרש',
    'linear-independence': 'אי-תלות לינארית',
    'basis': 'בסיס',
    'dimension': 'מימד',
    'linear-transformations': 'העתקות לינאריות',
    'matrix-representation': 'ייצוג מטריצי',
    'change-of-basis': 'החלפת בסיס',
    'rank': 'דרגה',
    'nullity': 'מימד הגרעין',
    'systems-of-equations': 'מערכות משוואות',
    'row-reduction': 'דירוג שורות',
    'determinants': 'דטרמיננטות',
    'eigenvalues': 'ערכים עצמיים',
    'eigenvectors': 'וקטורים עצמיים',
    'diagonalization': 'לכסון',
    'inner-products': 'מכפלות פנימיות',
    'orthogonality': 'אורתוגונליות',
    'gram-schmidt': 'גרם-שמידט',
    'least-squares': 'ריבועים פחותים',
    'singular-values': 'ערכים סינגולריים',
    'jordan-form': 'צורת ז\'ורדן',
    'bilinear-forms': 'תבניות בילינאריות',
    'quadratic-forms': 'תבניות ריבועיות',
    'other': 'אחר',
  };
  return map[topic] || topic.replace(/-/g, ' ');
}

// Group homework by homework number
const hwSetMap = new Map<number, HomeworkQuestion[]>();
for (const hw of homeworkData) {
  const num = hw.homeworkNumber;
  if (!hwSetMap.has(num)) hwSetMap.set(num, []);
  hwSetMap.get(num)!.push({
    id: hw.id,
    homeworkNumber: hw.homeworkNumber,
    questionNumber: typeof hw.questionNumber === 'string' ? parseInt(hw.questionNumber, 10) || 1 : hw.questionNumber,
    subQuestion: undefined,
    topic: topicToHebrew(hw.topic),
    question: hw.question,
    solution: hw.solution || 'ראה פתרון בקובץ המקור',
    keyTechnique: hw.evidence?.reasoningHe || undefined,
  });
}

// Determine title for each HW set
function getHwTitle(num: number): string {
  const questions = hwSetMap.get(num) || [];
  const topics = [...new Set(questions.map((q) => q.topic))];
  return topics.slice(0, 2).join(' + ');
}

export const homeworkSets: HomeworkSet[] = Array.from(hwSetMap.entries())
  .sort(([a], [b]) => a - b)
  .map(([num, questions]) => ({
    number: num,
    title: getHwTitle(num),
    topics: [...new Set(questions.map((q) => q.topic))],
    questions,
  }));

export function getAllHomework(): HomeworkSet[] {
  return homeworkSets;
}
