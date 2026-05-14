// Weekly schedule for Semester 2 + Moed G prep
// User attends university 9 AM - 9 PM daily
// 5 active courses + Linear Algebra 1 Moed G prep (15.6.2026)

export type SlotType =
  | 'class-lecture'    // הרצאה
  | 'class-tutorial'   // תרגול
  | 'moed-g-prep'      // הכנה למועד ג לינארית 1
  | 'study-hw'         // עבודה על HW
  | 'study-review'     // סקירה / חזרה
  | 'study-prep'       // הכנה להרצאה
  | 'break'            // הפסקה
  | 'lunch'            // ארוחת צהריים
  | 'travel'           // נסיעה (ZOOM אופציה)
  | 'free';            // זמן חופשי / רזרבה

export type Course =
  | 'linear-b'         // אלגברה לינארית ב'
  | 'data-struct'      // מבני נתונים
  | 'systems-c'        // תכנות מערכות בשפת C
  | 'calculus-b'       // חשבון אינפי ב'
  | 'logic-sets'       // לוגיקה ותורת הקבוצות
  | 'linear-a-moedg';  // מועד ג לינארית 1

export interface ScheduleSlot {
  start: string;       // "09:00"
  end: string;         // "10:30"
  type: SlotType;
  course?: Course;
  title: string;       // displayed text
  location?: string;
  instructor?: string;
  note?: string;
}

export interface DaySchedule {
  dayIdx: number;      // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
  dayName: string;
  dateLabel: string;   // optional
  slots: ScheduleSlot[];
  focusOfDay?: string;
}

export const courseLabels: Record<Course, string> = {
  'linear-b':       'אלגברה לינארית ב\'',
  'data-struct':    'מבני נתונים',
  'systems-c':      'תכנות מערכות C',
  'calculus-b':     'אינפי ב\'',
  'logic-sets':     'לוגיקה + קבוצות',
  'linear-a-moedg': 'לינארית 1 (מועד ג)',
};

export const courseColors: Record<Course, { bg: string; text: string; border: string; dot: string }> = {
  'linear-b':       { bg: 'bg-violet-50',  text: 'text-violet-800',  border: 'border-violet-300',  dot: 'bg-violet-500' },
  'data-struct':    { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300', dot: 'bg-emerald-500' },
  'systems-c':      { bg: 'bg-sky-50',     text: 'text-sky-800',     border: 'border-sky-300',     dot: 'bg-sky-500' },
  'calculus-b':     { bg: 'bg-amber-50',   text: 'text-amber-800',   border: 'border-amber-300',   dot: 'bg-amber-500' },
  'logic-sets':     { bg: 'bg-rose-50',    text: 'text-rose-800',    border: 'border-rose-300',    dot: 'bg-rose-500' },
  'linear-a-moedg': { bg: 'bg-red-50',     text: 'text-red-900',     border: 'border-red-400',     dot: 'bg-red-600' },
};

// ════════════════════════════════════════════════════════════════
// WEEKLY SCHEDULE
// ════════════════════════════════════════════════════════════════

export const weekSchedule: DaySchedule[] = [
  // ───────────────────────── SUNDAY ─────────────────────────
  {
    dayIdx: 0,
    dayName: 'יום א\'',
    dateLabel: 'ראשון',
    focusOfDay: 'לוגיקה (הרצאה) + הכנה לטור\' לינארית ב\'',
    slots: [
      { start: '09:00', end: '09:15', type: 'break', title: '☕ הגעה + קפה' },
      { start: '09:15', end: '10:45', type: 'moed-g-prep', course: 'linear-a-moedg', title: '📐 מועד ג — הכנה יומית', note: 'לפי תוכנית הקרב — היום של הפאזה הנוכחית' },
      { start: '10:45', end: '11:15', type: 'study-prep', course: 'logic-sets', title: 'הכנה ללוגיקה — קריאה מהירה' },
      { start: '11:30', end: '14:00', type: 'class-lecture', course: 'logic-sets', title: '📚 לוגיקה — הרצאה', location: 'אולם האנגר H1', instructor: 'ד"ר ניב עדי' },
      { start: '14:00', end: '15:00', type: 'lunch', title: '🥗 ארוחת צהריים + הפסקה' },
      { start: '15:00', end: '16:30', type: 'study-review', course: 'logic-sets', title: 'סיכום ההרצאה + התחלת HW לוגיקה' },
      { start: '16:30', end: '18:00', type: 'study-hw', course: 'linear-b', title: 'הכנה לטור\' לינארית ב\' (ביום ד\')' },
      { start: '18:00', end: '18:30', type: 'break', title: '☕ הפסקה / חטיף' },
      { start: '18:30', end: '20:00', type: 'study-hw', course: 'calculus-b', title: 'HW אינפי ב\'' },
      { start: '20:00', end: '21:00', type: 'free', title: '💤 סיום — נסיעה הביתה' },
    ],
  },

  // ───────────────────────── MONDAY ─────────────────────────
  {
    dayIdx: 1,
    dayName: 'יום ב\'',
    dateLabel: 'שני',
    focusOfDay: 'מבני נתונים (הרצאה) + תכנות C (הרצאה)',
    slots: [
      { start: '09:00', end: '09:15', type: 'break', title: '☕ הגעה + קפה' },
      { start: '09:15', end: '10:45', type: 'moed-g-prep', course: 'linear-a-moedg', title: '📐 מועד ג — הכנה יומית' },
      { start: '10:45', end: '12:00', type: 'study-hw', course: 'logic-sets', title: 'המשך HW לוגיקה' },
      { start: '12:00', end: '13:00', type: 'lunch', title: '🥗 ארוחת צהריים' },
      { start: '13:00', end: '13:45', type: 'study-prep', course: 'data-struct', title: 'הכנה למבני נתונים — קריאת חומר' },
      { start: '13:45', end: '16:15', type: 'class-lecture', course: 'data-struct', title: '📚 מבני נתונים — הרצאה', location: 'אולם עופר 04', instructor: 'ד"ר קפלן שמואל' },
      { start: '16:15', end: '16:30', type: 'break', title: '☕ הפסקה' },
      { start: '16:30', end: '19:00', type: 'class-lecture', course: 'systems-c', title: '📚 תכנות C — הרצאה', location: 'אולם עופר 04', instructor: 'ד"ר לין רז' },
      { start: '19:00', end: '19:30', type: 'lunch', title: '🍽️ ארוחת ערב קלה' },
      { start: '19:30', end: '21:00', type: 'study-review', course: 'data-struct', title: 'סקירה: DS + C (מה למדנו היום)' },
    ],
  },

  // ───────────────────────── TUESDAY ─────────────────────────
  {
    dayIdx: 2,
    dayName: 'יום ג\'',
    dateLabel: 'שלישי',
    focusOfDay: '⚠️ יום עמוס — 3 שיעורים רצופים בבוקר',
    slots: [
      { start: '08:00', end: '09:30', type: 'class-lecture', course: 'linear-b', title: '📚 לינארית ב\' — הרצאה', location: 'ארזי עופר C.B02', instructor: 'מר כהן אורי' },
      { start: '09:30', end: '09:45', type: 'break', title: '☕ הפסקה קצרה' },
      { start: '09:45', end: '11:15', type: 'class-tutorial', course: 'data-struct', title: '📚 מבני נתונים — תרגול', location: 'ארזי עופר C.109', instructor: 'מר משיח רועי' },
      { start: '11:15', end: '11:30', type: 'break', title: '☕ הפסקה קצרה' },
      { start: '11:30', end: '13:00', type: 'class-tutorial', course: 'logic-sets', title: '📚 לוגיקה — תרגול', location: 'ארזי עופר C.209', instructor: 'גב\' גל שרון' },
      { start: '13:00', end: '14:00', type: 'lunch', title: '🥗 ארוחת צהריים + מנוחה אקטיבית' },
      { start: '14:00', end: '15:30', type: 'moed-g-prep', course: 'linear-a-moedg', title: '📐 מועד ג — הכנה יומית' },
      { start: '15:30', end: '17:00', type: 'study-hw', course: 'linear-b', title: 'התחלת HW לינארית ב\' (אחרי הרצאה הבוקר)' },
      { start: '17:00', end: '18:30', type: 'study-hw', course: 'data-struct', title: 'HW מבני נתונים (אחרי תרגול הבוקר)' },
      { start: '18:30', end: '19:00', type: 'break', title: '☕ הפסקה / חטיף' },
      { start: '19:00', end: '20:30', type: 'study-hw', course: 'systems-c', title: 'עבודה על פרויקט C' },
      { start: '20:30', end: '21:00', type: 'free', title: '💤 סיום' },
    ],
  },

  // ───────────────────────── WEDNESDAY ─────────────────────────
  {
    dayIdx: 3,
    dayName: 'יום ד\'',
    dateLabel: 'רביעי',
    focusOfDay: 'לינארית ב\' (תרגול) + אינפי ב\' (הרצאה)',
    slots: [
      { start: '08:00', end: '10:30', type: 'class-tutorial', course: 'linear-b', title: '📚 לינארית ב\' — תרגול', location: 'אולם האנגר H4', instructor: 'גב\' גל שרון' },
      { start: '10:30', end: '11:00', type: 'break', title: '☕ הפסקה' },
      { start: '11:00', end: '13:30', type: 'class-lecture', course: 'calculus-b', title: '📚 אינפי ב\' — הרצאה', location: 'אולם האנגר H1', instructor: 'ד"ר שמאי יוסף' },
      { start: '13:30', end: '14:30', type: 'lunch', title: '🥗 ארוחת צהריים' },
      { start: '14:30', end: '16:00', type: 'moed-g-prep', course: 'linear-a-moedg', title: '📐 מועד ג — הכנה יומית' },
      { start: '16:00', end: '17:30', type: 'study-hw', course: 'calculus-b', title: 'HW אינפי ב\' (אחרי הרצאה)' },
      { start: '17:30', end: '19:00', type: 'study-hw', course: 'linear-b', title: 'HW לינארית ב\' — סיום שבועי' },
      { start: '19:00', end: '19:30', type: 'break', title: '☕ הפסקה' },
      { start: '19:30', end: '21:00', type: 'study-hw', course: 'systems-c', title: 'פרויקט C — המשך' },
    ],
  },

  // ───────────────────────── THURSDAY ─────────────────────────
  {
    dayIdx: 4,
    dayName: 'יום ה\'',
    dateLabel: 'חמישי',
    focusOfDay: 'יום ZOOM — אינפי + C מהבוקר. תרגלת בעצמך אחה"צ',
    slots: [
      { start: '08:00', end: '09:30', type: 'class-lecture', course: 'calculus-b', title: '📚 אינפי ב\' — תרגול (ZOOM)', instructor: 'מר מחלין מקס', note: 'אפשר מהבית' },
      { start: '09:30', end: '09:45', type: 'break', title: '☕ הפסקה' },
      { start: '09:45', end: '11:15', type: 'class-tutorial', course: 'systems-c', title: '📚 תכנות C — תרגול (ZOOM)' },
      { start: '11:15', end: '11:30', type: 'travel', title: '🚌 נסיעה לאוניברסיטה (אם מהבית)' },
      { start: '11:30', end: '13:00', type: 'moed-g-prep', course: 'linear-a-moedg', title: '📐 מועד ג — הכנה יומית' },
      { start: '13:00', end: '14:00', type: 'lunch', title: '🥗 ארוחת צהריים' },
      { start: '14:00', end: '15:30', type: 'study-hw', course: 'data-struct', title: 'מבני נתונים — סיום HW שבועי' },
      { start: '15:30', end: '17:00', type: 'study-hw', course: 'logic-sets', title: 'לוגיקה — סיום HW שבועי' },
      { start: '17:00', end: '17:30', type: 'break', title: '☕ הפסקה' },
      { start: '17:30', end: '19:00', type: 'study-hw', course: 'calculus-b', title: 'אינפי — סיום HW שבועי' },
      { start: '19:00', end: '19:30', type: 'break', title: '🍽️ ארוחת ערב' },
      { start: '19:30', end: '21:00', type: 'study-hw', course: 'systems-c', title: 'פרויקט C — דחיפה לסיום' },
    ],
  },

  // ───────────────────────── FRIDAY ─────────────────────────
  {
    dayIdx: 5,
    dayName: 'יום ו\'',
    dateLabel: 'שישי',
    focusOfDay: 'יום קצר — מועד ג מורחב + סיום עניינים',
    slots: [
      { start: '09:00', end: '09:15', type: 'break', title: '☕ הגעה + קפה' },
      { start: '09:15', end: '11:00', type: 'moed-g-prep', course: 'linear-a-moedg', title: '📐 מועד ג — בלוק מורחב (יום מרכזי)' },
      { start: '11:00', end: '11:15', type: 'break', title: '☕ הפסקה' },
      { start: '11:15', end: '12:30', type: 'moed-g-prep', course: 'linear-a-moedg', title: '📐 מועד ג — תרגול מ-HW או מבחני עבר' },
      { start: '12:30', end: '13:30', type: 'lunch', title: '🥗 ארוחת צהריים' },
      { start: '13:30', end: '14:30', type: 'free', title: '🎒 סיום עניינים שהצטברו / מטלות פתוחות' },
      { start: '14:30', end: '15:00', type: 'free', title: '💤 שבת מתחילה — נסיעה הביתה' },
    ],
  },

  // ───────────────────────── SATURDAY ─────────────────────────
  {
    dayIdx: 6,
    dayName: 'שבת',
    dateLabel: 'שבת',
    focusOfDay: '🛋️ מנוחה אקטיבית — אופציונלי לעבור על משהו קל',
    slots: [
      { start: '10:00', end: '21:00', type: 'free', title: '🛋️ יום מנוחה — אל תרגישי אשמה לדלג', note: 'אופציונלי: 1 שעה קלה של רענון לפני הימים הקדימה' },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────

export const slotTypeMeta: Record<SlotType, { label: string; emoji: string; cls: string }> = {
  'class-lecture':  { label: 'הרצאה',       emoji: '📚', cls: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
  'class-tutorial': { label: 'תרגול',       emoji: '✏️', cls: 'bg-purple-100 text-purple-900 border-purple-300' },
  'moed-g-prep':    { label: 'מועד ג',      emoji: '📐', cls: 'bg-red-100 text-red-900 border-red-400 font-bold' },
  'study-hw':       { label: 'עבודת HW',    emoji: '📝', cls: 'bg-blue-50 text-blue-800 border-blue-200' },
  'study-review':   { label: 'סקירה',       emoji: '🔄', cls: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
  'study-prep':     { label: 'הכנה לשיעור', emoji: '📖', cls: 'bg-teal-50 text-teal-800 border-teal-200' },
  'break':          { label: 'הפסקה',       emoji: '☕', cls: 'bg-gray-100 text-gray-600 border-gray-200' },
  'lunch':          { label: 'ארוחה',       emoji: '🥗', cls: 'bg-amber-50 text-amber-800 border-amber-200' },
  'travel':         { label: 'נסיעה',       emoji: '🚌', cls: 'bg-slate-100 text-slate-700 border-slate-200' },
  'free':           { label: 'חופשי',       emoji: '💤', cls: 'bg-gray-50 text-gray-500 border-gray-200' },
};

// Compute weekly hours per course
export function getWeeklyHoursPerCourse(): Record<Course, number> {
  const hours: Record<Course, number> = {
    'linear-b': 0,
    'data-struct': 0,
    'systems-c': 0,
    'calculus-b': 0,
    'logic-sets': 0,
    'linear-a-moedg': 0,
  };
  for (const day of weekSchedule) {
    for (const slot of day.slots) {
      if (!slot.course) continue;
      const [sh, sm] = slot.start.split(':').map(Number);
      const [eh, em] = slot.end.split(':').map(Number);
      const minutes = (eh * 60 + em) - (sh * 60 + sm);
      hours[slot.course] += minutes / 60;
    }
  }
  return hours;
}
