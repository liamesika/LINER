export type HomeworkPriority = 'must' | 'recommended' | 'skip';

export interface FocusQuestion {
  question: string;
  priority: HomeworkPriority;
  timeMinutes: number;
  reason: string;
  examSkill: string;
}

export interface HomeworkFocusSet {
  homeworkNumber: number;
  title: string;
  verdict: string;
  focus: string;
  questions: FocusQuestion[];
}

export const homeworkFocusSets: HomeworkFocusSet[] = [
  {
    homeworkNumber: 1,
    title: 'שדות',
    verdict: 'לא לפתור הכל. זו מטלת יסודות, לא מרכז המבחן.',
    focus: 'לקחת רק את שפת האקסיומות, מחלקי אפס, והוכחות קצרות בשדה.',
    questions: [
      {
        question: 'שאלה 1',
        priority: 'recommended',
        timeMinutes: 10,
        reason: 'רק לקרוא כדי לדעת לנסח שלילת אקסיומות. לא להשקיע בזה שעה.',
        examSkill: 'הגדרות ושפה פורמלית',
      },
      {
        question: 'שאלה 2',
        priority: 'must',
        timeMinutes: 25,
        reason: 'הוכחות קצרות מתוך אקסיומות שדה. זה מחזק כתיבה מסודרת במבחן.',
        examSkill: 'שימוש באקסיומות, אין מחלקי אפס',
      },
      {
        question: 'שאלה 3',
        priority: 'skip',
        timeMinutes: 0,
        reason: 'אם היא וריאציה ארוכה של אקסיומות, התועלת כרגע נמוכה ביחס לזמן.',
        examSkill: 'לא בעדיפות למועד ג',
      },
      {
        question: 'שאלה 4',
        priority: 'skip',
        timeMinutes: 0,
        reason: 'בניית שדה עם 4 איברים היא יפה, אבל פחות סביר שתכריע את מועד ג.',
        examSkill: 'מבנה שדה מתקדם',
      },
      {
        question: 'שאלה 5',
        priority: 'recommended',
        timeMinutes: 15,
        reason: 'תת-שדה והוכחת סגירות הם רעיון שחוזר אחר כך בתת-מרחבים.',
        examSkill: 'סגירות לתת-מבנה',
      },
    ],
  },
  {
    homeworkNumber: 2,
    title: 'מרוכבים ומבני שדה',
    verdict: 'לסנן חזק. רוב זה לא שווה זמן נוסף עכשיו.',
    focus: 'רק חשבון בסיסי, מחלקי אפס, ו-Z_n כשדה/לא שדה.',
    questions: [
      {
        question: 'שאלה 1',
        priority: 'recommended',
        timeMinutes: 15,
        reason: 'מספיק לעשות 2 סעיפים כדי לוודא שאין חלודה בחשבון מרוכבים.',
        examSkill: 'חישוב טכני קצר',
      },
      {
        question: 'שאלה 2',
        priority: 'skip',
        timeMinutes: 0,
        reason: 'אם זו הוכחת תכונות מרוכבים ארוכה, היא פחות חשובה מהחומר הליניארי.',
        examSkill: 'לא בעדיפות',
      },
      {
        question: 'שאלה 3',
        priority: 'recommended',
        timeMinutes: 20,
        reason: 'בדיקת שדה על R² מלמדת לזהות אקסיומה שנכשלת.',
        examSkill: 'הוכח/הפרך מבנה אלגברי',
      },
      {
        question: 'שאלה 4',
        priority: 'must',
        timeMinutes: 20,
        reason: 'מחלקי אפס ו-Z_n חשובים לכל עבודה מעל Z₅/Z₇/Z₂₃.',
        examSkill: 'שדות סופיים ומודולו',
      },
      {
        question: 'שאלות 5-6',
        priority: 'skip',
        timeMinutes: 0,
        reason: 'רק אם נשאר זמן אחרי מטלות 3,4,8,9,11,12.',
        examSkill: 'תוספת, לא ליבה',
      },
    ],
  },
  {
    homeworkNumber: 3,
    title: 'מערכות משוואות ודירוג',
    verdict: 'מטלת חובה. כאן לא מקצרים יותר מדי.',
    focus: 'דירוג, משתנים חופשיים, rank(A) מול rank(A⁺), ופרמטרים.',
    questions: [
      {
        question: 'שאלה 1',
        priority: 'recommended',
        timeMinutes: 20,
        reason: 'חימום לדירוג. לעשות אם יש טעויות טכניות בדירוג.',
        examSkill: 'RREF בסיסי',
      },
      {
        question: 'שאלה 2',
        priority: 'must',
        timeMinutes: 45,
        reason: 'זו אחת התבניות הכי קריטיות למועד ג, במיוחד אחרי מועד א שלך.',
        examSkill: 'סיווג 0/1/∞ פתרונות',
      },
      {
        question: 'שאלה 3',
        priority: 'must',
        timeMinutes: 25,
        reason: 'בודקת אם את מבינה מה RREF אומר, לא רק יודעת לחשב.',
        examSkill: 'בניית מערכת לפי סוג פתרונות',
      },
      {
        question: 'שאלה 4',
        priority: 'recommended',
        timeMinutes: 20,
        reason: 'מודולו ושדות סופיים חוזרים בהפיכות ובדטרמיננטות.',
        examSkill: 'חשבון מעל Z_p',
      },
      {
        question: 'שאלות 5-6',
        priority: 'skip',
        timeMinutes: 0,
        reason: 'רק אחרי שהשאלות עם הדירוג והפרמטרים סגורות.',
        examSkill: 'הרחבה',
      },
    ],
  },
  {
    homeworkNumber: 4,
    title: 'מרחבים וקטוריים ותת-מרחבים',
    verdict: 'חשובה, אבל לא כל הסעיפים שווים. ללמוד דרך תבניות.',
    focus: 'תת-מרחב: אפס, חיבור, כפל בסקלר. איחוד/חיתוך תתי-מרחבים.',
    questions: [
      {
        question: 'שאלה 1',
        priority: 'recommended',
        timeMinutes: 20,
        reason: 'טוב לזיהוי מה נכשל כשקבוצה אינה מרחב וקטורי.',
        examSkill: 'הפרכת אקסיומה אחת',
      },
      {
        question: 'שאלה 2',
        priority: 'must',
        timeMinutes: 30,
        reason: 'הוכחת תת-מרחב היא תבנית שחוזרת המון.',
        examSkill: 'קריטריון תת-מרחב',
      },
      {
        question: 'שאלה 3',
        priority: 'must',
        timeMinutes: 25,
        reason: 'אם יש קריטריון מקוצר לתת-מרחב, זה בדיוק מה שצריך במבחן.',
        examSkill: 'סגירות לצירוף ליניארי',
      },
      {
        question: 'שאלה 4',
        priority: 'must',
        timeMinutes: 35,
        reason: 'חיתוך ואיחוד תתי-מרחבים הם שאלות הוכחה קלאסיות.',
        examSkill: 'U∩W, U∪W',
      },
      {
        question: 'שאלה 5',
        priority: 'skip',
        timeMinutes: 0,
        reason: 'אם זו דוגמה מוזרה של R⁺ כמרחב, היא פחות רלוונטית כרגע.',
        examSkill: 'דוגמת קצה',
      },
      {
        question: 'שאלה 6',
        priority: 'recommended',
        timeMinutes: 20,
        reason: 'לעשות רק אחרי שאלה 4. זו וריאציה קשה יותר על איחוד תתי-מרחבים.',
        examSkill: 'הוכחה בשלילה עם תתי-מרחבים',
      },
    ],
  },
  {
    homeworkNumber: 5,
    title: 'Span ופרישה',
    verdict: 'לפתור את רוב הליבה. זה שפה של כל הקורס.',
    focus: 'שוויון span, הכלה דו-כיוונית, והסרת וקטורים מיותרים.',
    questions: [
      {
        question: 'שאלה 1',
        priority: 'must',
        timeMinutes: 30,
        reason: 'הוכח/הפרך על span הוא דפוס מבחני נפוץ.',
        examSkill: 'דוגמא נגדית והכלת span',
      },
      {
        question: 'שאלה 2',
        priority: 'must',
        timeMinutes: 30,
        reason: 'מציאת קבוצה פורשת מכינה לבסיס ומימד.',
        examSkill: 'כתיבה כצירוף ליניארי',
      },
      {
        question: 'שאלה 3',
        priority: 'recommended',
        timeMinutes: 20,
        reason: 'לעשות אם את לא מרגישה בטוחה בגיאומטריה של span.',
        examSkill: 'הבנה גיאומטרית',
      },
      {
        question: 'שאלה 4',
        priority: 'must',
        timeMinutes: 30,
        reason: 'זו בדיוק תבנית “וקטור מיותר לא משנה span”.',
        examSkill: 'מניפולציות span',
      },
    ],
  },
  {
    homeworkNumber: 6,
    title: 'תלות ואי-תלות ליניארית',
    verdict: 'מטלת ליבה. לפתור לפי רמת קושי עולה.',
    focus: 'בת"ל דרך מערכת הומוגנית, ת"ל דרך צירוף לא טריוויאלי, ופרמטר מעל Z_p.',
    questions: [
      {
        question: 'שאלה 1',
        priority: 'must',
        timeMinutes: 30,
        reason: 'בסיס טכני לכל שאלת בת"ל/ת"ל.',
        examSkill: 'פתרון מערכת הומוגנית',
      },
      {
        question: 'שאלה 2',
        priority: 'must',
        timeMinutes: 30,
        reason: 'משלב בת"ל עם שדה סופי ופרמטר.',
        examSkill: 'Z₅ + rank',
      },
      {
        question: 'שאלה 4',
        priority: 'must',
        timeMinutes: 30,
        reason: 'הוכחת שמירת בת"ל היא תבנית הוכחה חשובה.',
        examSkill: 'הוכחת בת"ל כללית',
      },
      {
        question: 'שאלות 5-6',
        priority: 'recommended',
        timeMinutes: 25,
        reason: 'רק אם שאלות 1,2,4 זורמות.',
        examSkill: 'העמקה',
      },
    ],
  },
  {
    homeworkNumber: 8,
    title: 'מטריצות, בסיס ומימד',
    verdict: 'חובה גבוהה מאוד, בעיקר מימדים.',
    focus: 'בסיס, מימד, משפט המימדים, וסכום ישר.',
    questions: [
      {
        question: 'שאלה 1',
        priority: 'recommended',
        timeMinutes: 20,
        reason: 'כפל מטריצות חשוב, אבל לא להיתקע על חישובים ארוכים.',
        examSkill: 'כפל מטריצות',
      },
      {
        question: 'שאלה 2',
        priority: 'recommended',
        timeMinutes: 20,
        reason: 'תכונות כפל הן רקע לשאלות rank והפיכות.',
        examSkill: 'אלגברת מטריצות',
      },
      {
        question: 'שאלה 3',
        priority: 'must',
        timeMinutes: 40,
        reason: 'בסיס ומימד מופיעים כמעט בכל מבחן.',
        examSkill: 'מציאת בסיס ומימד',
      },
      {
        question: 'שאלה 4',
        priority: 'must',
        timeMinutes: 45,
        reason: 'זו אחת החולשות שלך ממועד א, ולכן חובה לחזור עליה יותר מפעם אחת.',
        examSkill: 'dim(U+W), dim(U∩W)',
      },
    ],
  },
  {
    homeworkNumber: 9,
    title: 'הפיכות מטריצות',
    verdict: 'מטלת חובה למועד ג.',
    focus: 'חישוב הופכי, פרמטר, הוכח/הפרך, ו-AB=I ⇒ BA=I.',
    questions: [
      {
        question: 'שאלה 1',
        priority: 'must',
        timeMinutes: 35,
        reason: 'חישוב [A|I] חייב להיות אוטומטי.',
        examSkill: 'חישוב הופכי',
      },
      {
        question: 'שאלה 2',
        priority: 'must',
        timeMinutes: 35,
        reason: 'הפיכות עם פרמטר היא תבנית מבחן חזקה.',
        examSkill: 'פרמטר + הפיכות',
      },
      {
        question: 'שאלה 3',
        priority: 'must',
        timeMinutes: 25,
        reason: 'הוכח/הפרך על הפיכות חוזר הרבה.',
        examSkill: 'טענות הפיכות',
      },
      {
        question: 'שאלה 4',
        priority: 'must',
        timeMinutes: 30,
        reason: 'במיוחד אם יש סעיף מעל Z₇/Z₅. זה תיקון ישיר לחולשה שלך.',
        examSkill: 'הפיכות מעל Z_p',
      },
      {
        question: 'שאלה 6',
        priority: 'must',
        timeMinutes: 35,
        reason: 'AB=I ⇒ BA=I היא הוכחה מרכזית בטבלת השקילויות.',
        examSkill: 'הוכחת הפיכות תיאורטית',
      },
    ],
  },
  {
    homeworkNumber: 10,
    title: 'הפיכות מתקדמת, מערכות שקולות, עקבה',
    verdict: 'לבחור חכם. לא הכל באותה עדיפות.',
    focus: 'שקילות מערכות, משוואות מטריציות, rank/trace רק לפי זמן.',
    questions: [
      {
        question: 'שאלה 1',
        priority: 'must',
        timeMinutes: 25,
        reason: 'מחבר מערכות ליניאריות עם מטריצות הפיכות.',
        examSkill: 'מערכות שקולות',
      },
      {
        question: 'שאלה 2',
        priority: 'recommended',
        timeMinutes: 30,
        reason: 'משוואה מטריצית להוכחת הפיכות. טוב אם יש זמן.',
        examSkill: 'פירוק פולינום במטריצה',
      },
      {
        question: 'שאלה 3',
        priority: 'recommended',
        timeMinutes: 25,
        reason: 'דרגה 1/אנטי-סימטרית יכולים להופיע כטענת הוכח/הפרך.',
        examSkill: 'rank ותכונות שחלוף',
      },
      {
        question: 'שאלה 4',
        priority: 'must',
        timeMinutes: 30,
        reason: 'אידמפוטנטית היא תבנית קלאסית לשאלת rank/מימד.',
        examSkill: 'A²=A',
      },
      {
        question: 'שאלות 5-6',
        priority: 'recommended',
        timeMinutes: 20,
        reason: 'עקבה פחות מרכזית מדטרמיננטות והפיכות, אבל קל לקחת נקודות אם נשאל.',
        examSkill: 'trace',
      },
    ],
  },
  {
    homeworkNumber: 11,
    title: 'דטרמיננטות: תכונות',
    verdict: 'חובה, במיוחד אחרי מועד ב.',
    focus: 'דטרמיננטה מעל Z_p, פעולות שורה, det(Aᵗ), det(AB), det(cA).',
    questions: [
      {
        question: 'שאלה 1',
        priority: 'must',
        timeMinutes: 40,
        reason: 'משלב דטרמיננטה, פרמטר ושדה סופי.',
        examSkill: 'det מעל Z₅',
      },
      {
        question: 'שאלה 2',
        priority: 'recommended',
        timeMinutes: 25,
        reason: 'לעשות אם זו תרגולת פעולות שורה/תכונות בסיס.',
        examSkill: 'פעולות שורה על det',
      },
      {
        question: 'שאלה 3',
        priority: 'must',
        timeMinutes: 35,
        reason: 'הוכח/הפרך על det הוא דפוס מבחני חזק.',
        examSkill: 'תכונות דטרמיננטה',
      },
      {
        question: 'שאלה 4',
        priority: 'recommended',
        timeMinutes: 25,
        reason: 'אקסיומות det חשובות להבנה, אבל אחרי שאלות 1 ו-3.',
        examSkill: 'מולטי-לינאריות/אלטרנטיביות',
      },
    ],
  },
  {
    homeworkNumber: 12,
    title: 'דטרמיננטות: חישוב',
    verdict: 'חובה לתרגל, אבל לא לטבוע באינדוקציות.',
    focus: 'חישוב det נקי, קופקטורים, מטריצות תלת-אלכסוניות, ובלוקים.',
    questions: [
      {
        question: 'שאלה 1',
        priority: 'must',
        timeMinutes: 35,
        reason: 'חישוב det הוא נקודות טכניות במבחן.',
        examSkill: 'פיתוח לפי שורה/עמודה',
      },
      {
        question: 'שאלה 2',
        priority: 'must',
        timeMinutes: 35,
        reason: 'רקורסיה/אינדוקציה על det מופיעה כמאתגרת אבל סטנדרטית.',
        examSkill: 'det תלת-אלכסונית',
      },
      {
        question: 'שאלה 3',
        priority: 'must',
        timeMinutes: 30,
        reason: 'בלוקים ו-det(AB) הם תבניות עם סיכוי גבוה.',
        examSkill: 'בלוקים וכפליות det',
      },
      {
        question: 'שאלות 4-6',
        priority: 'recommended',
        timeMinutes: 30,
        reason: 'לבחור אחת בלבד אם יש זמן. לא כולן שוות השקעה לפני מועד ג.',
        examSkill: 'העמקת det',
      },
    ],
  },
];

export const priorityLabels: Record<HomeworkPriority, string> = {
  must: 'חובה',
  recommended: 'כדאי',
  skip: 'לדלג כרגע',
};

export function getPriorityCounts() {
  return homeworkFocusSets.reduce(
    (acc, set) => {
      set.questions.forEach((question) => {
        acc[question.priority] += 1;
      });
      return acc;
    },
    { must: 0, recommended: 0, skip: 0 } satisfies Record<HomeworkPriority, number>,
  );
}
