// Battle Plan — Moed G (June 15, 2026)
// 33 days from May 13 → June 15
// Ported from /LINER/battle-plan-moed-g.html — same structure, interactive checkboxes

export type PhaseColor = 'foundation' | 'build' | 'advanced' | 'review' | 'exams' | 'exam-day';
export type DayType = 'study' | 'rest' | 'review' | 'exam' | 'exam-day';
export type TopicTag = 'def' | 'thm' | 'hw' | 'review' | 'exam' | 'rest';

export interface Task {
  id: string;
  text: string;       // may contain inline HTML for math
}

export interface DayBlock {
  kind: 'day';
  id: string;
  date: string;       // "ד' 13.5"
  dayNum: number;
  type: DayType;
  topic: string;
  topicType: TopicTag;
  tasks: Task[];
  hours: string;      // "1.5ש'" or "—"
}

export interface PhaseBlock {
  kind: 'phase';
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  color: PhaseColor;
}

export interface CheckpointBlock {
  kind: 'checkpoint';
  id: string;
  title: string;
  body: string;       // may contain inline HTML
}

export interface WeekBlock {
  kind: 'week';
  id: string;
  title: string;
}

export interface TipBlock {
  kind: 'tip';
  id: string;
  body: string;
}

export type Block = PhaseBlock | CheckpointBlock | WeekBlock | DayBlock | TipBlock;

// Helper to build day blocks compactly
const d = (
  id: string,
  date: string,
  dayNum: number,
  type: DayType,
  topic: string,
  topicType: TopicTag,
  hours: string,
  tasks: string[],
): DayBlock => ({
  kind: 'day',
  id,
  date,
  dayNum,
  type,
  topic,
  topicType,
  hours,
  tasks: tasks.map((text, i) => ({ id: `${id}-t${i}`, text })),
});

export const battlePlanG: Block[] = [
  // ════════════ PHASE 1: FOUNDATION ════════════
  { kind: 'phase', id: 'p1', emoji: '🌱', title: 'פאזה 1 — יסודות', subtitle: '10 ימים · 13.5 → 22.5 · 1.5 שעות/יום', color: 'foundation' },
  { kind: 'checkpoint', id: 'c1', title: '🎯 מטרת הפאזה', body: 'שדות, מערכות ליניאריות, מרחב וקטורי, תת-מרחב. <strong>אין הוכחות עדיין</strong> — קודם הבנה ושימוש.' },
  { kind: 'week', id: 'w1', title: '📍 שבוע 1 — שדות + מערכות ליניאריות' },

  d('d1', 'ד\' 13.5', 1, 'study', 'פתיחה: שדות + Z_n', 'def', '1.5ש\'', [
    'דף ההגדרות: סעיף 1 (אקסיומות שדה)',
    '<span class="mathb">Z_p</span> שדה ⟺ p ראשוני (להבין למה)',
  ]),
  d('d2', 'ה\' 14.5', 2, 'study', 'תכונות שדה + מספרים מרוכבים', 'def', '1.5ש\'', [
    'אין מחלקי אפס · הופכי כפלי · תת-שדה',
    'מספרים מרוכבים (רפרוף — לא נשאלים הרבה)',
    'HW2 שאלות בסיסיות',
  ]),
  d('d3', 'ו\' 15.5', 3, 'study', 'מערכות ליניאריות + פעולות שורה', 'def', '1.5ש\'', [
    '3 פעולות שורה אלמנטריות (בעל פה!)',
    'צורה מדורגת (EF) ומדורגת קנונית (RREF)',
    'תרגול: דרגי 2 מטריצות 3×3 ביד',
  ]),
  d('d4', 'ש\' 16.5', 4, 'rest', '🛋️ שבת — מנוחה', 'rest', '—', [
    'אופציונלי: רפרוף בסיכום ההגדרות. בלי לחץ.',
  ]),
  d('d5', 'א\' 17.5', 5, 'study', 'דרגה + סיווג מספר פתרונות', 'def', '1.5ש\'', [
    '<span class="mathb">rank(A)</span>, משתנה קשור / חופשי',
    'משפט: <span class="mathb">rank(A) &lt; rank(A⁺)</span> → אין · <span class="mathb">= n</span> → יחיד · <span class="mathb">&lt; n</span> → אינסוף',
    'HW3 שאלה 1',
  ]),
  d('d6', 'ב\' 18.5', 6, 'study', 'HW3 שאלה 2 — מערכות תלויות פרמטר', 'hw', '2ש\'', [
    'תבנית: דרגי, מצאי נקודות פיצול, בדקי כל מקרה',
    '2(a), 2(b) — שתי וריאציות',
  ]),
  d('d7', 'ג\' 19.5', 7, 'study', 'HW3 סיום + סקירת שבוע', 'hw', '1.5ש\'', [
    'HW3 שאלה 4 — פרמה הקטן',
    'סקירה: שבוע 1 — מה אני זוכרת?',
  ]),

  { kind: 'checkpoint', id: 'c2', title: '✅ סוף שבוע 1 — את אמורה לדעת:', body: 'הגדרת שדה + <span class="mathb">Z_n</span> · דירוג לקנונית · זיהוי rank · פתרון מערכת תלוית פרמטר בכל הענפים.' },

  { kind: 'week', id: 'w2', title: '📍 שבוע 2 — מרחב וקטורי + תת-מרחב' },

  d('d8', 'ד\' 20.5', 8, 'study', 'מרחב וקטורי + תת-מרחב', 'def', '1.5ש\'', [
    '10 אקסיומות (לזכור שיש 10, לא בעל פה)',
    'דוגמאות: <span class="mathb">F^n, M_{m×n}, F[x]</span>',
    'קריטריון מקוצר לתת-מרחב',
  ]),
  d('d9', 'ה\' 21.5', 9, 'study', 'HW4 — תרגול תת-מרחב', 'hw', '1.5ש\'', [
    'בדיקה אם קבוצה היא תת-מרחב (3 תנאים)',
    'חיתוך תת-מרחב = תת-מרחב · איחוד — לא',
  ]),
  d('d10', 'ו\' 22.5', 10, 'study', 'Span + צירוף ליניארי', 'def', '1.5ש\'', [
    'הגדרת Span · <span class="mathb">Span(∅) = {0_V}</span>',
    'Span תמיד תת-מרחב',
    'תרגיל: <span class="mathb">v ∈ Span ⟺ Span{...,v} = Span{...}</span>',
  ]),

  // ════════════ PHASE 2: BUILD ════════════
  { kind: 'phase', id: 'p2', emoji: '🛠️', title: 'פאזה 2 — בנייה: span/בת"ל/בסיס/מימד', subtitle: '11 ימים · 23.5 → 2.6 · 1.5-2 שעות/יום', color: 'build' },
  { kind: 'checkpoint', id: 'c3', title: '🎯 מטרת הפאזה', body: 'להכיר את 2 המשפטים המרכזיים: <strong>משפט השלוש</strong> ו-<strong>משפט המימדים הראשון</strong>. ולפתור את HW5 + HW6 + HW8.' },

  d('d11', 'ש\' 23.5', 11, 'rest', '🛋️ שבת — מנוחה', 'rest', '—', []),

  d('d12', 'א\' 24.5', 12, 'study', 'בלתי תלות ליניארית (בת"ל)', 'def', '2ש\'', [
    'הגדרת בת"ל / ת"ל · 0_V בקבוצה → ת"ל',
    'משפט: ת"ל ⟺ <span class="mathb">∃j: v_j ∈ Span{v_1,...,v_{j-1}}</span>',
    'משפט: יחידות הייצוג (בת"ל)',
  ]),
  d('d13', 'ב\' 25.5', 13, 'study', 'HW5 — span + בת"ל', 'hw', '2ש\'', [
    'שוויון Span (הוכחת הכלה דו-כיוונית)',
    'דוגמה: <span class="mathb">Span{v_1+v_2, v_1−v_2, v_1+v_3}</span> תחת <span class="mathb">1+1≠0</span>',
  ]),
  d('d14', 'ג\' 26.5', 14, 'study', 'בסיס', 'def', '1.5ש\'', [
    'הגדרה: בת"ל + פורש',
    'בסיסים סטנדרטיים: <span class="mathb">F^n, F_n[x], M_{m×n}</span>',
    'משפט יחידות הייצוג בבסיס',
  ]),
  d('d15', 'ד\' 27.5', 15, 'study', 'מימד + שטיינל', 'def', '1.5ש\'', [
    '<span class="mathb">dim V</span> · 2 מסקנות (n+1 ת"ל · n-1 לא פורש)',
    'למת שטיינל — ניסוח (לא הוכחה)',
  ]),
  d('d16', 'ה\' 28.5', 16, 'study', '⭐ משפט השלוש + משפט ההשלמה', 'thm', '2ש\'', [
    '<span class="mathb">dim V = n + n וקטורים</span> → בסיס ⟺ בת"ל ⟺ פורש',
    'משפט ההשלמה לבסיס',
    '<span class="mathb">W ≤ V, dim W = dim V → W = V</span>',
  ]),
  d('d17', 'ו\' 29.5', 17, 'study', '⭐ משפט המימדים הראשון', 'thm', '2ש\'', [
    '<span class="mathb">dim(U+W) = dim U + dim W − dim(U∩W)</span>',
    'מסקנות: סכום ישר · חסם תחתון',
  ]),
  d('d18', 'ש\' 30.5', 18, 'rest', '🛋️ שבת — מנוחה', 'rest', '—', []),
  d('d19', 'א\' 31.5', 19, 'study', 'HW8 שאלה 4 — לב dim(U∩W)', 'hw', '2ש\'', [
    '4(a) — <span class="mathb">dim V=6, dim U≥4, dim W≥5 → dim(U∩W)≥3</span>',
    '4(b) — <span class="mathb">W + Span{u} = W ⟺ u ∈ W</span>',
    '4(e) — <span class="mathb">dim U = dim W = n-1, U≠W → dim(U∩W) = n-2</span>',
  ]),
  d('d20', 'ב\' 1.6', 20, 'study', 'כפל מטריצות', 'def', '1.5ש\'', [
    'הגדרת כפל · אסוציאטיביות · אין קומוטטיביות',
    '<span class="mathb">Ax̄ = LC של עמודות</span> · <span class="mathb">Ax̄=b̄ פתיר ⟺ b̄ ∈ ColA</span>',
    'HW8 שאלה 1-2 — חישובי כפל',
  ]),
  d('d21', 'ג\' 2.6', 21, 'study', 'מטריצה הפיכה + טבלת שקילויות', 'def', '2ש\'', [
    'הגדרה דו-צדדית · מטריצה אלמנטרית',
    '13 התנאים השקולים (קראי בדף עזר ההפיכות שלך!)',
  ]),

  { kind: 'checkpoint', id: 'c4', title: '✅ סוף שבוע 3 — את אמורה לדעת:', body: 'משפט השלוש · משפט המימדים הראשון · הגדרת מטריצה הפיכה · 13 התנאים השקולים.' },

  // ════════════ PHASE 3: ADVANCED ════════════
  { kind: 'phase', id: 'p3', emoji: '🎯', title: 'פאזה 3 — הפיכות + NulA + דטרמיננטות', subtitle: '5 ימים · 3.6 → 7.6 · 1.5-2 שעות/יום', color: 'advanced' },
  { kind: 'checkpoint', id: 'c5', title: '🎯 מטרת הפאזה', body: 'לסגור את כל החומר: AB=I→BA=I · משפט הדרגה · דטרמיננטות. <strong>סוף הפאזה הזו = שליטה בכל החומר!</strong>' },

  d('d22', 'ד\' 3.6', 22, 'study', 'HW9 — הופכים', 'hw', '2ש\'', [
    'HW9 שאלה 1 — הופכים ב-<span class="mathb">R</span>',
    'HW9 שאלה 4(a) — הופכי ב-<span class="mathb">Z_7</span> (טבלת הופכים בצד!)',
  ]),
  d('d23', 'ה\' 4.6', 23, 'study', '⭐ AB=I → BA=I + שחלוף', 'thm', '2ש\'', [
    'HW9 שאלה 6 — הוכחה דרך dim W_k',
    'שחלוף: <span class="mathb">(AB)^t = B^t A^t</span> · סימטרית / אנטי-סימטרית',
  ]),
  d('d24', 'ו\' 5.6', 24, 'study', 'NulA, ColA, RowA + משפט הדרגה', 'def', '2ש\'', [
    '3 המרחבים · בסיס לכל אחד',
    '⭐ <span class="mathb">rank A + dim NulA = n</span>',
    'משפט: <span class="mathb">dim ColA = dim RowA = rank A</span>',
  ]),
  d('d25', 'ש\' 6.6', 25, 'rest', '🛋️ שבת — מנוחה', 'rest', '—', []),
  d('d26', 'א\' 7.6', 26, 'study', 'דטרמיננטות — אקסיומות + תכונות', 'def', '2.5ש\'', [
    'מולטי-לינארית + אלטרנטיבית + <span class="mathb">det(I)=1</span>',
    'משפט (*): פעולות שורה · משפט יחידות (חשוב 3)',
    '⭐ <span class="mathb">det(AB) = det(A)·det(B)</span> · <span class="mathb">A הפיכה ⟺ det≠0</span>',
    'HW11 שאלה 1 · HW12 שאלות 1, 2',
  ]),

  { kind: 'checkpoint', id: 'c6', title: '✅ סוף יום 26 — את אמורה לדעת את כל החומר!', body: 'עכשיו נשארו 8 ימים: 4 לסקירה אינטגרטיבית, 4 למבחנים. אין יותר חומר חדש.' },

  // ════════════ PHASE 4: REVIEW ════════════
  { kind: 'phase', id: 'p4', emoji: '📚', title: 'פאזה 4 — שבוע סקירה', subtitle: '4 ימים · 8.6 → 10.6 · 2 שעות/יום', color: 'review' },
  { kind: 'checkpoint', id: 'c7', title: '🎯 מטרת הפאזה', body: 'לאחד את כל החומר. בכל יום: סקירה ממוקדת + תרגול מ-HW או דף עזר. <strong>זמן לזהות חולשות וטרם הן יהפכו לבעיות.</strong>' },

  d('d27', 'ב\' 8.6', 27, 'review', 'סקירה: שדות + מערכות + Z_p + span/בת"ל', 'review', '2ש\'', [
    'דף הגדרות סעיפים 1-7 · דף קיצורי הסקה (LI/span)',
    'HW3 שאלות מאתגרות · HW5',
  ]),
  d('d28', 'ג\' 9.6', 28, 'review', 'סקירה: בסיס + מימד + מטריצות', 'review', '2ש\'', [
    'משפט השלוש (כתבי מהזיכרון!) · משפט המימדים',
    'HW6 + HW8 שאלות חזרה · דף ההפיכות שלך',
  ]),
  d('d29', 'ד\' 10.6', 29, 'review', 'סקירה: הפיכות + Nul + Rank-Nullity', 'review', '2ש\'', [
    'דף עזר ההפיכות (הכל) · 13 התנאים בעל פה',
    'HW9 שאלה 6 · HW10 שאלה 5(b) · משפט הדרגה',
  ]),

  // ════════════ PHASE 5: EXAMS ════════════
  { kind: 'phase', id: 'p5', emoji: '📝', title: 'פאזה 5 — מבחנים מבחנים מבחנים', subtitle: '4 ימים · 11.6 → 14.6 · 3-4 שעות/יום', color: 'exams' },
  { kind: 'checkpoint', id: 'c8', title: '🎯 מטרת הפאזה', body: 'שום חומר חדש. רק מבחנים בתנאי אמת — סטופר, נייר, ללא חומר עזר. אחרי כל מבחן: 30 דקות ניתוח שגיאות.' },

  d('d30', 'ה\' 11.6', 30, 'exam', '📝 מבחן הדמיה 1 (מאוזן)', 'exam', '3.5ש\'', [
    '3 שעות תנאי אמת · 30 דק ניתוח',
    'קובץ: <code>LINER/mock-exams/exam-1-balanced.html</code>',
  ]),
  d('d31', 'ו\' 12.6', 31, 'exam', '📝 מבחן הדמיה 2 (תיאורטי) או מועד ב 2024', 'exam', '3.5ש\'', [
    'בחרי: מבחן 2 (תיאורטי, דגש על הוכחות) או מועד ב 2024',
    '3 שעות + 30 דק ניתוח',
  ]),
  d('d32', 'ש\' 13.6', 32, 'exam', '📝 מבחן הדמיה 3 (מאתגר) — אופציונלי בשבת', 'exam', '3.5ש\' / —', [
    'אם את לא לחוצה — מנוחה ביום זה',
    'אחרת: מבחן 3 (HW9 Q6 בגרסה מורחבת)',
  ]),
  d('d33', 'א\' 14.6', 33, 'exam', '📝 סופר-מבחן + סקירה אחרונה', 'exam', '4ש\'', [
    'סופר-מבחן (10 שאלות מקיף) — סלקטיבית רק על חולשות',
    'כתיבת 6 הוכחות מהזיכרון',
    '17:00 הפסקה · ערכת המבחן מוכנה · שינה מוקדמת',
  ]),

  // ════════════ EXAM DAY ════════════
  { kind: 'phase', id: 'p6', emoji: '🎯', title: 'יום המבחן', subtitle: '15.6.2026 · יום ב\'', color: 'exam-day' },

  d('d34', 'ב\' 15.6', 34, 'exam-day', '🎯 מועד ג — אלגברה לינארית 1', 'exam', '🎯', [
    '07:00 — ארוחת בוקר טובה. <strong>אל תלמדי חומר חדש!</strong>',
    '08:00 — רענון של 3 ההוכחות הראשונות + טבלת השקילויות (10 דק כל אחד)',
    '08:30 — נסיעה',
    '<strong>09:00 — המבחן 💪</strong>',
  ]),

  // ════════════ TIPS ════════════
  { kind: 'phase', id: 'tips', emoji: '💡', title: 'כללים זהב לכל התוכנית', subtitle: '', color: 'foundation' },
  { kind: 'tip', id: 't1', body: '<strong>1. עקביות > כמות.</strong> 1.5 שעות ביום קבוע במשך 33 ימים = 45 שעות מעמיקות. מבחני קצב לא עובדים.' },
  { kind: 'tip', id: 't2', body: '<strong>2. אל תדלגי על HW.</strong> 80% מהמבחן הוא וריאציות של HW. כל שאלה ב-HW = הזדמנות לחזק תבנית.' },
  { kind: 'tip', id: 't3', body: '<strong>3. כתיבה > קריאה.</strong> אחרי שקראת הוכחה, סגרי את הדף וכתבי במחברת מהזיכרון. שגית? תקני וחזרי.' },
  { kind: 'tip', id: 't4', body: '<strong>4. עקבי אחר חולשות.</strong> בסוף כל שבוע: רשמי 3 דברים שאת עוד לא בטוחה בהם. בסקירה (יום 27-29) — חזרי אליהם.' },
  { kind: 'tip', id: 't5', body: '<strong>5. שבת = מנוחה.</strong> אל תרגישי אשמה לדלג. המוח לומד גם בלי שאת בכוח דוחקת בו.' },
  { kind: 'tip', id: 't6', body: '<strong>6. ימי המבחנים — אל תוסיפי חומר חדש.</strong> רק חזרה + סימולציה. יום לפני המבחן — מנוחה בלבד.' },
];

// Compute total task IDs for progress tracking
export function getAllTaskIds(): string[] {
  return battlePlanG
    .filter((b): b is DayBlock => b.kind === 'day')
    .flatMap((day) => day.tasks.map((t) => t.id));
}
