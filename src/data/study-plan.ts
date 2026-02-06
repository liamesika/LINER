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
            { name: 'linear-transformations', nameHe: 'העתקות לינאריות', priority: 'high', estimatedHours: 3 },
            { name: 'eigenvalues', nameHe: 'ערכים עצמיים ולכסון', priority: 'high', estimatedHours: 3 },
          ],
          tasks: [
            {
              id: 'sat-1',
              title: 'חזרה על העתקות לינאריות',
              description: 'הגדרות, גרעין, תמונה, משפט המימד',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 9-12', 'שיעורי בית 4-5'],
            },
            {
              id: 'sat-2',
              title: 'תרגול העתקות לינאריות',
              description: 'פתור 5 שאלות מייצוג מטריצי וגרעין/תמונה',
              type: 'practice',
              estimatedMinutes: 90,
              resources: ['מבחן 2024 מועד א', 'מבחן 2023 מועד ב'],
            },
            {
              id: 'sat-3',
              title: 'חזרה על ע"ע ולכסון',
              description: 'פולינום אופייני, מרחבים עצמיים, קריטריון לכסינות',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 19-22'],
            },
            {
              id: 'sat-4',
              title: 'תרגול לכסון',
              description: 'לכסן 3 מטריצות, בדוק לכסינות',
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
            { name: 'inner-products', nameHe: 'מכפלות פנימיות', priority: 'high', estimatedHours: 3 },
            { name: 'determinants', nameHe: 'דטרמיננטות', priority: 'medium', estimatedHours: 2 },
          ],
          tasks: [
            {
              id: 'sun-1',
              title: 'חזרה על מכפלות פנימיות',
              description: 'מרחבים אוניטריים, גרם-שמידט, ריבועים פחותים',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 23-26'],
            },
            {
              id: 'sun-2',
              title: 'שינון נוסחאות',
              description: 'שנן את כל נוסחאות הדטרמיננטות וגרם-שמידט',
              type: 'memorize',
              estimatedMinutes: 30,
              resources: ['טבלת נוסחאות'],
            },
            {
              id: 'sun-3',
              title: 'תרגול מכפלות פנימיות',
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
            { name: 'basis-dimension', nameHe: 'בסיס ומימד', priority: 'high', estimatedHours: 2 },
            { name: 'subspaces', nameHe: 'תת-מרחבים', priority: 'medium', estimatedHours: 1 },
            { name: 'exam-simulation', nameHe: 'סימולציית מבחן', priority: 'high', estimatedHours: 3 },
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
            { name: 'final-review', nameHe: 'חזרה אחרונה', priority: 'high', estimatedHours: 2 },
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
  linearTransformations: [
    { formula: 'dim(V) = dim(ker(T)) + dim(Im(T))', name: 'משפט המימד (Rank-Nullity)' },
    { formula: '[T]_B = [T(b₁)]_B ... [T(bₙ)]_B', name: 'מטריצה מייצגת' },
    { formula: '[T]_C = P⁻¹[T]_B·P', name: 'החלפת בסיס' },
    { formula: 'rank(AB) ≤ min(rank(A), rank(B))', name: 'אי-שוויון דרגות' },
  ],
  determinants: [
    { formula: 'det(AB) = det(A)·det(B)', name: 'כפליות דטרמיננטה' },
    { formula: 'det(A⁻¹) = 1/det(A)', name: 'דטרמיננטת הפיכה' },
    { formula: 'det(Aᵀ) = det(A)', name: 'דטרמיננטת שחלוף' },
    { formula: 'det(cA) = cⁿ·det(A)', name: 'כפל בסקלר' },
  ],
  eigenvalues: [
    { formula: 'det(A - λI) = 0', name: 'פולינום אופייני' },
    { formula: 'A·v = λ·v', name: 'הגדרת ע"ע ו-ו"ע' },
    { formula: 'A = PDP⁻¹', name: 'לכסון' },
    { formula: 'tr(A) = Σλᵢ, det(A) = Πλᵢ', name: 'עקבה ודטרמיננטה' },
  ],
  innerProducts: [
    { formula: '‖v‖ = √⟨v,v⟩', name: 'נורמה' },
    { formula: 'proj_u(v) = ⟨v,u⟩/⟨u,u⟩ · u', name: 'הטלה' },
    { formula: 'wₖ = vₖ - Σⱼ₌₁ᵏ⁻¹ proj_uⱼ(vₖ)', name: 'גרם-שמידט' },
    { formula: 'AᵀAx̂ = Aᵀb', name: 'משוואות נורמליות' },
  ],
};

// Study statistics
export const studyStats = {
  totalHours: 20,
  daysUntilExam: 4,
  topicsToReview: 10,
  practiceQuestionsTarget: 30,
};
