// Study plan data for Linear Algebra exam
// Adapted from BDIDA format

export interface StudyDay {
  date: string;
  dayName: string;
  dayNameHe: string;
  isStudyDay: boolean;
  topics: StudyTopic[];
  tasks: StudyTask[];
}

export interface StudyTopic {
  name: string;
  nameHe: string;
  priority: 'high' | 'medium' | 'low';
  estimatedHours: number;
}

export interface StudyTask {
  id: string;
  title: string;
  description: string;
  type: 'review' | 'practice' | 'memorize' | 'exam-simulation';
  estimatedMinutes: number;
  resources: string[];
}

export interface WeekPlan {
  weekNumber: number;
  startDate: string;
  endDate: string;
  focus: string;
  days: StudyDay[];
}

export function generateStudyPlan(): WeekPlan[] {
  const plan: WeekPlan[] = [
    {
      weekNumber: 1,
      startDate: '2026-02-07',
      endDate: '2026-02-10',
      focus: 'סיכום אינטנסיבי לקראת המבחן',
      days: [
        {
          date: '2026-02-07',
          dayName: 'Saturday',
          dayNameHe: 'שבת',
          isStudyDay: true,
          topics: [
            { name: 'matrices', nameHe: 'מטריצות', priority: 'high', estimatedHours: 3 },
            { name: 'invertible-matrices', nameHe: 'מטריצות הפיכות', priority: 'high', estimatedHours: 3 },
          ],
          tasks: [
            {
              id: 'sat-1',
              title: 'חזרה על מטריצות',
              description: 'כפל מטריצות, מטריצות אלמנטריות, דירוג',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 13-14', 'שיעורי בית 8'],
            },
            {
              id: 'sat-2',
              title: 'תרגול מטריצות',
              description: 'פתור 5 שאלות על כפל מטריצות ודירוג',
              type: 'practice',
              estimatedMinutes: 90,
              resources: ['מבחן 2024 מועד א', 'מבחן 2023 מועד ב'],
            },
            {
              id: 'sat-3',
              title: 'חזרה על מטריצות הפיכות',
              description: 'הפיכות, מציאת הופכי, תכונות מטריצות הפיכות',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 15-16'],
            },
            {
              id: 'sat-4',
              title: 'תרגול מטריצות הפיכות',
              description: 'מצא הופכי ל-3 מטריצות, הוכח הפיכות',
              type: 'practice',
              estimatedMinutes: 90,
              resources: ['מבחנים 2022-2024'],
            },
          ],
        },
        {
          date: '2026-02-08',
          dayName: 'Sunday',
          dayNameHe: 'ראשון',
          isStudyDay: true,
          topics: [
            { name: 'rank', nameHe: 'דרגה ומרחב שורות/עמודות', priority: 'high', estimatedHours: 3 },
            { name: 'determinants', nameHe: 'דטרמיננטות', priority: 'medium', estimatedHours: 2 },
          ],
          tasks: [
            {
              id: 'sun-1',
              title: 'חזרה על דרגה ומרחב שורות/עמודות',
              description: 'דרגה, מרחב שורות, מרחב עמודות, מרחב האפס',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 19-20'],
            },
            {
              id: 'sun-2',
              title: 'שינון נוסחאות',
              description: 'שנן את כל נוסחאות הדטרמיננטות והדרגה',
              type: 'memorize',
              estimatedMinutes: 30,
              resources: ['טבלת נוסחאות'],
            },
            {
              id: 'sun-3',
              title: 'תרגול דרגה ומרחבים',
              description: 'פתור 5 שאלות ממבחנים',
              type: 'practice',
              estimatedMinutes: 90,
              resources: ['מבחנים'],
            },
            {
              id: 'sun-4',
              title: 'חזרה על דטרמיננטות',
              description: 'תכונות, חישוב, קשר להפיכות',
              type: 'review',
              estimatedMinutes: 45,
              resources: ['הרצאות 15-18'],
            },
            {
              id: 'sun-5',
              title: 'תרגול דטרמיננטות',
              description: 'פתור 3 שאלות חישוב דטרמיננטה',
              type: 'practice',
              estimatedMinutes: 60,
              resources: ['מבחנים'],
            },
          ],
        },
        {
          date: '2026-02-09',
          dayName: 'Monday',
          dayNameHe: 'שני',
          isStudyDay: true,
          topics: [
            { name: 'basis', nameHe: 'בסיס ומימד', priority: 'high', estimatedHours: 2 },
            { name: 'subspaces', nameHe: 'תת-מרחבים', priority: 'medium', estimatedHours: 1 },
            { name: 'other', nameHe: 'סימולציית מבחן', priority: 'high', estimatedHours: 3 },
          ],
          tasks: [
            {
              id: 'mon-1',
              title: 'חזרה על בסיס ומימד',
              description: 'אי-תלות לינארית, בסיס, מימד, משפטים מרכזיים',
              type: 'review',
              estimatedMinutes: 45,
              resources: ['הרצאות 5-8'],
            },
            {
              id: 'mon-2',
              title: 'תרגול בסיס ומימד',
              description: 'מצא בסיס לתת-מרחב, בדוק אי-תלות',
              type: 'practice',
              estimatedMinutes: 60,
              resources: ['מבחנים'],
            },
            {
              id: 'mon-3',
              title: 'חזרה מהירה על תת-מרחבים',
              description: 'בדיקת תת-מרחב, חיתוך, סכום ישר',
              type: 'review',
              estimatedMinutes: 30,
              resources: ['הרצאות 3-4'],
            },
            {
              id: 'mon-4',
              title: 'מבחן הכנה',
              description: 'פתור מבחן שלם בתנאי מבחן (3 שעות)',
              type: 'exam-simulation',
              estimatedMinutes: 180,
              resources: ['מבחן 2024 מועד א או 2022 מועד ב'],
            },
          ],
        },
        {
          date: '2026-02-10',
          dayName: 'Tuesday',
          dayNameHe: 'שלישי',
          isStudyDay: true,
          topics: [
            { name: 'other', nameHe: 'חזרה אחרונה', priority: 'high', estimatedHours: 2 },
          ],
          tasks: [
            {
              id: 'tue-1',
              title: 'חזרה על נוסחאות',
              description: 'עבור על כל הנוסחאות החשובות',
              type: 'memorize',
              estimatedMinutes: 30,
              resources: ['דף נוסחאות'],
            },
            {
              id: 'tue-2',
              title: 'חזרה על טעויות',
              description: 'עבור על הטעויות מהסימולציה אתמול',
              type: 'review',
              estimatedMinutes: 45,
              resources: ['הפתרון שלך מאתמול'],
            },
            {
              id: 'tue-3',
              title: 'מנוחה לפני המבחן',
              description: 'הפסק ללמוד 2-3 שעות לפני המבחן',
              type: 'review',
              estimatedMinutes: 0,
              resources: [],
            },
          ],
        },
      ],
    },
  ];

  return plan;
}

// Key formulas for Linear Algebra
export const keyFormulas = {
  matrices: [
    { formula: 'rank(A) + nullity(A) = n', name: 'משפט המימד (Rank-Nullity)' },
    { formula: 'rank(AB) ≤ min(rank(A), rank(B))', name: 'אי-שוויון דרגות' },
    { formula: 'A·A⁻¹ = A⁻¹·A = I', name: 'הגדרת הפיכות' },
    { formula: '(AB)⁻¹ = B⁻¹·A⁻¹', name: 'הופכי של מכפלה' },
  ],
  determinants: [
    { formula: 'det(AB) = det(A)·det(B)', name: 'כפליות דטרמיננטה' },
    { formula: 'det(A⁻¹) = 1/det(A)', name: 'דטרמיננטת הפיכה' },
    { formula: 'det(Aᵀ) = det(A)', name: 'דטרמיננטת שחלוף' },
    { formula: 'det(cA) = cⁿ·det(A)', name: 'כפל בסקלר' },
  ],
  rankAndSpaces: [
    { formula: 'rank(A) = dim(Col(A)) = dim(Row(A))', name: 'דרגה = מימד מרחב עמודות' },
    { formula: 'dim(Null(A)) = n - rank(A)', name: 'מימד מרחב האפס' },
    { formula: 'Row(A) = Row(RREF(A))', name: 'מרחב שורות נשמר בדירוג' },
    { formula: 'rank(A) = rank(Aᵀ)', name: 'דרגת שורות = דרגת עמודות' },
  ],
  basisAndDimension: [
    { formula: 'dim(W₁+W₂) = dim(W₁)+dim(W₂)-dim(W₁∩W₂)', name: 'נוסחת מימדים' },
    { formula: '|B| = dim(V) for any basis B', name: 'גודל בסיס = מימד' },
    { formula: 'V = W₁ ⊕ W₂ ⟺ V = W₁+W₂, W₁∩W₂ = {0}', name: 'סכום ישר' },
    { formula: 'Ax = b consistent ⟺ b ∈ Col(A)', name: 'פתירות מערכת' },
  ],
};

// Study statistics
export const studyStats = {
  totalHours: 20,
  daysUntilExam: 4,
  topicsToReview: 10,
  practiceQuestionsTarget: 30,
};
