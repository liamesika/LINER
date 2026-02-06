// Data adapter: transforms LINER weeks data into BDIDA-compatible format

import { weeksData } from './liner-weeks';

export interface Definition {
  id: string;
  title: string;
  content: string;
  notation?: string;
  examples?: string[];
  source: string;
}

export interface Theorem {
  id: string;
  title: string;
  statement: string;
  proof?: string;
  source: string;
}

export interface Technique {
  id: string;
  title: string;
  description: string;
  steps?: string[];
  whenToUse: string;
  source: string;
}

export interface WeekContent {
  weekNumber: number;
  title: string;
  titleHe: string;
  lectures: number[];
  topics: string[];
  summary: string;
  definitions: Definition[];
  theorems: Theorem[];
  techniques: Technique[];
  keyFormulas?: string[];
  commonMistakes?: string[];
  examTips?: string[];
}

function extractLectureNumbers(files: string[]): number[] {
  const nums: number[] = [];
  for (const f of files) {
    const match = f.match(/lecture\s*(\d+)/i);
    if (match) nums.push(parseInt(match[1], 10));
  }
  return nums.length > 0 ? nums : [1];
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

const weeksContent: WeekContent[] = weeksData.map((week) => {
  const definitions: Definition[] = week.definitions.map((d) => ({
    id: d.id,
    title: d.titleHe || d.title,
    content: d.verbatimContent,
    notation: undefined,
    examples: d.explanation ? [d.explanation] : undefined,
    source: `${d.source}, עמ' ${d.pageNumber}`,
  }));

  const theorems: Theorem[] = week.theorems.map((t) => {
    // Check if there's a matching proof in the proofs array
    const matchingProof = week.proofs.find(
      (p) => p.relatedItems.includes(t.id) || p.title.includes(t.title)
    );
    return {
      id: t.id,
      title: t.titleHe || t.title,
      statement: t.verbatimContent,
      proof: matchingProof?.verbatimContent || undefined,
      source: `${t.source}, עמ' ${t.pageNumber}`,
    };
  });

  const techniques: Technique[] = week.techniques.map((t) => ({
    id: t.id,
    title: t.titleHe || t.title,
    description: t.verbatimContent,
    steps: t.explanation ? t.explanation.split('\n').filter(Boolean) : undefined,
    whenToUse: t.explanation || 'ראה תיאור',
    source: `${t.source}, עמ' ${t.pageNumber}`,
  }));

  // Extract key formulas from formulas array
  const keyFormulas = week.formulas.map((f) => f.verbatimContent);

  return {
    weekNumber: week.weekNumber,
    title: week.title,
    titleHe: week.titleHe || week.title,
    lectures: extractLectureNumbers(week.lectureFiles),
    topics: week.topics.map(topicToHebrew),
    summary: week.description,
    definitions,
    theorems,
    techniques,
    keyFormulas: keyFormulas.length > 0 ? keyFormulas : undefined,
  };
});

export function getAllWeeks(): WeekContent[] {
  return weeksContent;
}

export function getWeekContent(weekNumber: number): WeekContent | undefined {
  return weeksContent.find((w) => w.weekNumber === weekNumber);
}
