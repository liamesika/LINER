// Battle Plan for Linear Algebra 1, Moed B 2025-26.
// Today: 2026-05-10 (Sunday). Exam: 2026-05-14 (Thursday).
//
// User profile (from her Moed A 2026 feedback report — final 50/100):
//   ✅ Strong:    1.2 (det of A+B with sym/anti-sym) 8/8
//   ⚠️ Medium:    1.1 (matrix algebra prop) 11/17, 2.1 (uniqueness rep) 10/13, 2.2 (LT existence) 9/12
//   ❌ Weak:      3.1 (LT proof) 7/13, 3.2 (Z_5 inverse) 3/12, 4.2.1 (subspace dim) 2/5
//   🚫 Skipped:   4.1 (parametric system) 0/12, 4.2.2 0/8, 5.1 + 5.2 not answered
//
// → Moed B priorities (heaviest weight = where she lost the most):
//   #1 Parametric systems (4.1) — must master
//   #2 Z_p computations (3.2)
//   #3 Span equality + rank theorems (5.1, 5.2)
//   #4 dim(U∩W) (4.2)
//   #5 Uniqueness of representation (2.1) — partial points lost
//
// Resources used:
//   Lectures PDF:  /LINER/LECTURES+PRACTICE/LA01 lecture XX 2026.pdf  (XX = 01..23)
//   HW:            /LINER/hw/                                          (HW2..HW12)
//   Past exams:    /LINER/PAST_EXAMS/                                   (Moed A+B 2022-25)
//   Checklist:     /LINER/צ'קליסט_משפטים_לינארית1.pdf                  (15 sections)
//   Topical sum.:  /LINER/סיכום_לינארית1_לפי_נושאים.pdf

// ─────────────────────── TYPES ───────────────────────

export type StudyDepth = 'memorize-fully' | 'know-and-state' | 'recognize-only';
export type ItemKind = 'definition' | 'theorem' | 'corollary' | 'note' | 'lemma';

export interface StudyItem {
  id: string;
  kind: ItemKind;
  title: string;          // Hebrew display name
  body?: string;          // formal content
  depth: StudyDepth;
  topTheoremRank?: number;   // optional link to /top-theorems#N
  requiresProof?: boolean;
}

export interface ExerciseItem {
  id: string;
  title: string;
  source: string;            // e.g. "HW3 Q1" or "תרגול 5"
  durationMinutes: number;
  topHomeworkRank?: number;  // optional link to /top-homework#N
  hint?: string;
}

export interface ProofTask {
  topTheoremRank: number;
  targetMinutes: number;
}

export interface PastExamRef {
  name: string;
  href: string;             // route in app, or "" if just a file
  filePath?: string;        // optional file path for reference
  durationMinutes: number;
  isMandatory: boolean;
  note?: string;
}

export interface TimeSlot {
  time: string;             // "09:00–10:00"
  hours: number;            // 1, 1.25, etc.
  type: 'theory' | 'practice' | 'memorize' | 'simulation' | 'review' | 'rest';
  lectureScope?: string;    // "הרצאות 1-2" / "הרצאה 5"
  lectureFiles?: string[];  // e.g. ["LA01 lecture 01 2026.pdf"]
  title: string;
  description?: string;
  weakPointCallout?: string; // "💡 ב-מועד א נפלת כאן — ..."
  items?: StudyItem[];
  exercises?: ExerciseItem[];
  proofsToWrite?: ProofTask[];
  pastExam?: PastExamRef;
}

export interface BattleDay {
  day: number;
  date: string;
  weekday: string;
  emoji: string;
  title: string;
  subtitle: string;
  goal: string;
  totalHours: number;
  accentColor: string;
  slots: TimeSlot[];
}

// ─────────────────────── DAY 1 (Sunday) — Lectures 1-12 ───────────────────────

const day1: BattleDay = {
  day: 1,
  date: '2026-05-10',
  weekday: 'ראשון',
  emoji: '🌱',
  title: 'יום 1 — יסודות (הרצאות 1-12)',
  subtitle: 'שדות → מערכות → מ"ו → תת-מרחב → span/בת"ל → בסיס',
  goal: 'לסיים היום עם הבנה: לדרג מטריצה, מה זה מ"ו ותת-מרחב, מה זה span ובת"ל, ומה זה בסיס. בלי הוכחות עדיין.',
  totalHours: 8,
  accentColor: 'from-emerald-500 to-teal-600',
  slots: [
    {
      time: '09:00–10:00',
      hours: 1,
      type: 'theory',
      lectureScope: 'הרצאה 1-2: שדות (Fields)',
      lectureFiles: ['LA01 lecture 01 2026.pdf', 'LA01 lecture 02 2026.pdf'],
      title: 'שדות + אקסיומות + Z_n',
      description: 'קראי את הרצאות 1-2 פעם אחת ברפרוף, אז פעם שנייה לאט. עברי על סעיף 1 בסיכום.',
      items: [
        { id: 'd1-1', kind: 'definition', title: 'שדה (Field)', body: 'קבוצה F עם +,· המקיימת אקסיומות חיבור (חילופיות, קיבוציות, אדיש 0_F, נגדי) + כפל (חילופיות, קיבוציות, אדיש 1_F, הופכי לכל x≠0) + פילוג. 0_F ≠ 1_F.', depth: 'memorize-fully' },
        { id: 'd1-2', kind: 'definition', title: 'אקסיומות שדה — 9 כללים', depth: 'know-and-state' },
        { id: 't1-1', kind: 'theorem', title: 'Q ו-R שדות עם פעולות סטנדרטיות', depth: 'recognize-only' },
        { id: 't1-2', kind: 'theorem', title: 'יחידות 0_F (האפס יחיד)', depth: 'know-and-state' },
        { id: 't1-3', kind: 'theorem', title: 'יחידות 1_F', depth: 'know-and-state' },
        { id: 't1-4', kind: 'theorem', title: 'יחידות הנגדי, יחידות ההופכי', depth: 'know-and-state' },
        { id: 't1-5', kind: 'theorem', title: 'אין מחלקי אפס: x·y = 0 ⟹ x = 0 או y = 0', body: 'חשוב במיוחד! משמש בהוכחות.', depth: 'memorize-fully' },
        { id: 't1-6', kind: 'theorem', title: 'תכונות הנגדי: -(-x)=x, (-x)(-y)=xy', depth: 'recognize-only' },
        { id: 't1-7', kind: 'theorem', title: 'תכונות ההופכי: (xy)⁻¹=y⁻¹x⁻¹', depth: 'recognize-only' },
      ],
    },
    {
      time: '10:00–11:00',
      hours: 1,
      type: 'theory',
      lectureScope: 'הרצאה 3-4: Z_n + תת-שדה (+ מספרים מרוכבים — לדלג)',
      lectureFiles: ['LA01 lecture 03 2026.pdf', 'LA01 lecture 04 2026.pdf'],
      title: 'Z_n שדה ⟺ n ראשוני',
      description: 'התמקדי ב-Z_n. מספרים מרוכבים — לרפרוף. נשאלים מעט במועד ב.',
      items: [
        { id: 'd1-3', kind: 'definition', title: 'חלוקה עם שארית: a = qb + r (0 ≤ r < b)', depth: 'know-and-state' },
        { id: 'd1-4', kind: 'definition', title: 'מחלק (a|b), זרים (gcd=1)', depth: 'know-and-state' },
        { id: 'd1-5', kind: 'definition', title: 'שקילות מודולו n: a ≡ b (mod n) ⟺ n | (a-b)', depth: 'memorize-fully' },
        { id: 'd1-6', kind: 'definition', title: 'Z_n = {0,1,...,n-1} עם +, · mod n', depth: 'memorize-fully' },
        { id: 't1-8', kind: 'theorem', title: 'n לא ראשוני ⟹ Z_n לא שדה', depth: 'know-and-state' },
        { id: 't1-9', kind: 'theorem', title: 'a∈Z_n זר ל-n ⟹ יש ל-a הופכי כפלי', depth: 'know-and-state' },
        { id: 't1-10', kind: 'corollary', title: 'n ראשוני ⟹ Z_n שדה!', depth: 'memorize-fully', body: 'לכן Z_5, Z_7, Z_11 שדות. Z_4, Z_6 לא!' },
        { id: 't1-11', kind: 'theorem', title: 'בזו (Bezout): a,b זרים ⟹ ∃x,y: ax+by=1', depth: 'know-and-state' },
        { id: 'd1-7', kind: 'definition', title: 'תת-שדה — תנאי מקוצר', depth: 'recognize-only' },
        { id: 'd1-8', kind: 'definition', title: 'מספר מרוכב z = a + bi', depth: 'recognize-only' },
      ],
    },
    {
      time: '11:00–11:15',
      hours: 0.25,
      type: 'rest',
      title: 'הפסקה ☕',
    },
    {
      time: '11:15–12:30',
      hours: 1.25,
      type: 'theory',
      lectureScope: 'הרצאה 5-6: מערכות ליניאריות + דירוג שורות',
      lectureFiles: ['LA01 lecture 05 2026.pdf', 'LA01 lecture 06 2026.pdf'],
      title: '3 פעולות שורה + REF + דרגה',
      description: 'הכי חשוב: 3 הפעולות + REF (יחידה!) + מספר פתרונות לפי דרגה. תזכורת: ב-מועד א שאלה 4.1 (פרמטרים) — 0/12. כאן הבסיס.',
      weakPointCallout: '💡 כל מה שתלמדי כאן הוא הבסיס לתרגיל #1 ביום 2 (פרמטרים). תקדישי תשומת לב מלאה!',
      items: [
        { id: 'd1-9', kind: 'definition', title: 'מערכת ליניארית עם m משוואות, n משתנים', depth: 'know-and-state' },
        { id: 'd1-10', kind: 'definition', title: 'מטריצת מקדמים מורחבת A⁺ ומנותקת A', depth: 'memorize-fully' },
        { id: 'd1-11', kind: 'definition', title: '3 פעולות שורה אלמנטריות', body: '(1) Rᵢ→αRᵢ (α≠0). (2) Rᵢ↔Rⱼ. (3) Rᵢ→Rᵢ+αRⱼ.', depth: 'memorize-fully' },
        { id: 'd1-12', kind: 'definition', title: 'מקדם מוביל של שורה', depth: 'memorize-fully' },
        { id: 'd1-13', kind: 'definition', title: 'מטריצה מדורגת (EF) ומדורגת קנונית (REF)', depth: 'memorize-fully' },
        { id: 'd1-14', kind: 'definition', title: 'משתנה קשור (יש מוביל) vs חופשי (אין מוביל)', depth: 'memorize-fully' },
        { id: 'd1-15', kind: 'definition', title: 'דרגה rank A = מספר מובילים בקנונית', depth: 'memorize-fully' },
        { id: 'd1-16', kind: 'definition', title: 'מערכת הומוגנית (כל ה-bᵢ = 0)', depth: 'know-and-state' },
        { id: 't1-12', kind: 'theorem', title: 'REF יחידה!', depth: 'memorize-fully' },
        { id: 't1-13', kind: 'corollary', title: 'מספר פתרונות לפי דרגה', body: 'rank A < rank A⁺ → אין; rank A = rank A⁺ = n → יחיד; rank A = rank A⁺ < n → אינסוף. אם F סופי: |F|^(n-rank A) פתרונות.', depth: 'memorize-fully' },
        { id: 't1-14', kind: 'corollary', title: '0 ≤ rank A ≤ min(m,n)', depth: 'know-and-state' },
        { id: 't1-15', kind: 'corollary', title: 'n < m → אין פתרון יחיד', depth: 'know-and-state' },
      ],
      exercises: [
        { id: 'e1-1', title: 'דרגי 2 מטריצות 3×3 לקנונית', source: 'נסי לבד מ-מבחן 2024 מועד א', durationMinutes: 25, hint: 'אל תשתמשי במחשבון. עבדי על נייר ביד.' },
      ],
    },
    {
      time: '12:30–13:30',
      hours: 1,
      type: 'rest',
      title: 'ארוחת צהריים 🥗',
    },
    {
      time: '13:30–14:30',
      hours: 1,
      type: 'theory',
      lectureScope: 'הרצאה 7-8: מרחב וקטורי + תת-מרחב',
      lectureFiles: ['LA01 lecture 07 2026.pdf', 'LA01 lecture 08 2026.pdf'],
      title: 'מ"ו + תת-מרחב (קריטריון מקוצר)',
      description: 'אקסיומות לדעת שיש 10. הקריטריון המקוצר חשוב!',
      items: [
        { id: 'd1-17', kind: 'definition', title: 'מרחב וקטורי V מעל F (10 אקסיומות)', body: 'חיבור: סגירות, חילופיות, קיבוציות, 0_V, נגדיים. כפל בסקלר: סגירות, קיבוציות, 1·v=v. פילוג: α(u+v)=αu+αv, (α+β)u=αu+βu.', depth: 'know-and-state' },
        { id: 't1-16', kind: 'theorem', title: 'M_{m×n}(F) הוא מ"ו', depth: 'recognize-only' },
        { id: 't1-17', kind: 'corollary', title: 'F^n מ"ו לכל n∈N', depth: 'know-and-state' },
        { id: 't1-18', kind: 'theorem', title: 'תכונות בסיסיות', body: '0_F · v = 0_V; α · 0_V = 0_V; α·v=0 ⟹ α=0 או v=0_V; (-1)·v = -v.', depth: 'know-and-state' },
        { id: 'd1-18', kind: 'definition', title: 'תת-מרחב W ⊆ V', body: 'W ≠ ∅ + סגור ל-LC: ∀α₁,α₂∈F, ∀w₁,w₂∈W: α₁w₁+α₂w₂ ∈ W.', depth: 'memorize-fully' },
        { id: 'd1-19', kind: 'definition', title: 'סכום U+W = {u+w : u∈U, w∈W}', depth: 'memorize-fully' },
        { id: 'd1-20', kind: 'definition', title: 'סכום ישר U⊕W (כש-U∩W = {0_V})', depth: 'memorize-fully' },
        { id: 't1-19', kind: 'theorem', title: 'הקריטריון המקוצר לתת-מרחב', body: '(1) 0_V ∈ W, (2) סגור לחיבור, (3) סגור לכפל בסקלר. שווה ערך לסגירות LC.', depth: 'memorize-fully' },
        { id: 't1-20', kind: 'theorem', title: 'W₁ ∩ W₂ תמיד תת-מרחב', depth: 'know-and-state' },
        { id: 't1-21', kind: 'theorem', title: 'U+W תמיד תת-מרחב', depth: 'know-and-state' },
        { id: 't1-22', kind: 'note', title: 'איחוד W₁ ∪ W₂ — לא בהכרח תת-מרחב!', depth: 'know-and-state' },
        { id: 't1-23', kind: 'note', title: 'V = W₁ ∪ W₂ ⟹ W₁=V או W₂=V', depth: 'recognize-only' },
      ],
      exercises: [
        { id: 'e1-2', title: 'בדקי: האם W = {(x,y,z) : x+y=z} ⊆ R³ תת-מרחב?', source: 'תרגול 5', durationMinutes: 15, hint: 'בדקי 3 תנאים: 0∈W, סגור לחיבור, סגור לכפל.' },
      ],
    },
    {
      time: '14:30–15:45',
      hours: 1.25,
      type: 'theory',
      lectureScope: 'הרצאה 9-10: span + תלות ליניארית',
      lectureFiles: ['LA01 lecture 09 2026.pdf', 'LA01 lecture 10 2026.pdf'],
      title: 'span + בת"ל / ת"ל — הלב של הקורס',
      description: 'הקטע הכי חשוב היום. אם תבלבלי — תיפלי במועד ב. תזכורת: שאלה 5.1 ב-מועד א — לא ענית!',
      weakPointCallout: '💡 ב-מועד א שאלה 5.1 (span equality) לא ענית בכלל. כל ההגדרות פה — לזכור מילה במילה!',
      items: [
        { id: 'd1-21', kind: 'definition', title: 'צירוף ליניארי (LC)', body: 'v הוא LC של v₁,...,vₖ אם ∃α₁,...,αₖ∈F: v = α₁v₁+...+αₖvₖ.', depth: 'memorize-fully' },
        { id: 'd1-22', kind: 'definition', title: 'span{v₁,...,vₖ}', body: 'קבוצת כל ה-LC. span∅ = {0_V}.', depth: 'memorize-fully' },
        { id: 'd1-23', kind: 'definition', title: 'קבוצה פורשת (spanning set): span(S) = V', depth: 'memorize-fully' },
        { id: 'd1-24', kind: 'definition', title: 'נוצר סופית (finitely generated)', depth: 'know-and-state' },
        { id: 't1-24', kind: 'theorem', title: 'span תמיד תת-מרחב!', depth: 'memorize-fully' },
        { id: 't1-25', kind: 'theorem', title: 'F^n נוצר סופית; F[x] לא נוצר סופית', depth: 'recognize-only' },
        { id: 't1-26', kind: 'theorem', title: 'A⊆B ⟹ spanA ⊆ spanB', depth: 'know-and-state' },
        { id: 't1-27', kind: 'theorem', title: 'v∈span{v₁,...,vₖ} ⟺ span{vᵢ} = span{vᵢ,v}', depth: 'know-and-state' },
        { id: 'd1-25', kind: 'definition', title: 'בלתי תלות ליניארית (בת"ל)', body: 'v₁,...,vₖ בת"ל אם: α₁v₁+...+αₖvₖ = 0_V ⟹ α₁=...=αₖ=0.', depth: 'memorize-fully' },
        { id: 'd1-26', kind: 'definition', title: 'תלות ליניארית (ת"ל)', body: '∃α₁,...,αₖ לא כולם 0 כך ש Σαᵢvᵢ = 0_V.', depth: 'memorize-fully' },
        { id: 't1-28', kind: 'theorem', title: 'ת"ל ⟺ ∃j: vⱼ ∈ span{v₁,...,vⱼ₋₁}', depth: 'memorize-fully' },
        { id: 't1-29', kind: 'theorem', title: 'יחידות הייצוג: בת"ל ⟹ LC יחיד', depth: 'memorize-fully', topTheoremRank: 10 },
        { id: 't1-30', kind: 'corollary', title: 'A בת"ל, B⊆A ⟹ B בת"ל', depth: 'know-and-state' },
        { id: 't1-31', kind: 'corollary', title: '0_V ∈ A ⟹ A ת"ל', depth: 'know-and-state' },
      ],
    },
    {
      time: '15:45–16:00',
      hours: 0.25,
      type: 'rest',
      title: 'הפסקה ☕',
    },
    {
      time: '16:00–17:00',
      hours: 1,
      type: 'theory',
      lectureScope: 'הרצאה 11-12: בסיס + שטיינל',
      lectureFiles: ['LA01 lecture 11 2026_251202_115331.pdf', 'LA01 lecture 12 2026.pdf'],
      title: 'בסיס = בת"ל + פורש',
      description: 'בסיס הכי חשוב. למת שטיינל לדעת לנסח (ההוכחה — מחר).',
      items: [
        { id: 'd1-27', kind: 'definition', title: 'בסיס של V', body: 'v₁,...,vₙ בסיס אם: (1) בת"ל, (2) פורשים את V.', depth: 'memorize-fully' },
        { id: 't1-32', kind: 'theorem', title: 'בסיס סטנדרטי של F^n: e₁,...,eₙ', depth: 'memorize-fully' },
        { id: 't1-33', kind: 'theorem', title: 'בסיס סטנדרטי של F_n[x]: 1, x, x², ..., xⁿ', depth: 'know-and-state' },
        { id: 't1-34', kind: 'theorem', title: 'בסיס סטנדרטי של M_{m×n}(F): E_{ij}', depth: 'recognize-only' },
        { id: 't1-35', kind: 'lemma', title: 'למת שטיינל (Steinitz)', body: '{v₁,...,vₖ} בסיס + {w₁,...,wₘ} פורש ⟹ k ≤ m.', depth: 'know-and-state', topTheoremRank: 6, requiresProof: true },
        { id: 't1-36', kind: 'corollary', title: 'כל שני בסיסים שווי גודל!', depth: 'memorize-fully' },
        { id: 't1-37', kind: 'theorem', title: 'V נוצר סופית, V≠{0} ⟹ קיים בסיס', depth: 'know-and-state' },
        { id: 't1-29', kind: 'note', title: 'יחידות הייצוג בבסיס', depth: 'memorize-fully' },
      ],
      exercises: [
        { id: 'e1-3', title: 'מצאי בסיס ל-span{(1,1,0), (0,1,1), (1,2,1)} ב-R³', source: 'HW2', durationMinutes: 20, hint: 'דרגי, ועמודות מובילות → בסיס.' },
      ],
    },
    {
      time: '17:00–18:00',
      hours: 1,
      type: 'memorize',
      title: 'שינון: הגדרות + משפטים מהיום',
      description: 'כתבי במחברת מהזיכרון את כל ההגדרות עם תג "memorize-fully". סמני ✓ אחרי שכתבת בהצלחה.',
      proofsToWrite: [],
    },
  ],
};

// ─────────────────────── DAY 2 (Monday) — Lectures 13-23 + 6 PROOFS ───────────────────────

const day2: BattleDay = {
  day: 2,
  date: '2026-05-11',
  weekday: 'שני',
  emoji: '🛠️',
  title: 'יום 2 — בנייה: מימד, מטריצות, det + 6 הוכחות',
  subtitle: 'הרצאות 13-23: dim → מטריצות → הפיכות → Nul/Col/Row → det',
  goal: 'את כותבת 6 הוכחות קריטיות מהזיכרון, מחשבת det 4×4, פותרת Z_p, ופותרת מערכת עם פרמטר.',
  totalHours: 8,
  accentColor: 'from-violet-500 to-purple-600',
  slots: [
    {
      time: '09:00–10:15',
      hours: 1.25,
      type: 'theory',
      lectureScope: 'הרצאה 13-15: מימד + משפט השלוש + dim(U+W)',
      lectureFiles: ['LA01 lecture 13 2026.pdf', 'LA01 lecture 14 2026.pdf', 'LA01 lecture 15 2026.pdf'],
      title: 'מימד — לב הקורס',
      description: 'משפט השלוש קריטי. dim(U+W) — שאלת מועד א 2025! ב-מועד א שלך 4.2 = 2/13 בלבד.',
      weakPointCallout: '💡 ב-מועד א שאלה 4.2 (dim subspace) קיבלת 2/5 + 0/8. כאן את חייבת לתפוס.',
      items: [
        { id: 'd2-1', kind: 'definition', title: 'dim V = מספר וקטורים בבסיס', depth: 'memorize-fully' },
        { id: 'd2-2', kind: 'definition', title: 'פרישה מינימלית, בת"ל מקסימלי', depth: 'know-and-state' },
        { id: 't2-1', kind: 'theorem', title: 'dimV = n ∈ N ⟺ V נוצר סופית', depth: 'know-and-state' },
        { id: 't2-2', kind: 'corollary', title: 'מסקנה 1: dim V = n ⟹ כל n+1 וקטורים ת"ל', depth: 'memorize-fully' },
        { id: 't2-3', kind: 'corollary', title: 'מסקנה 2: dim V = n ⟹ n-1 וקטורים לא פורשים', depth: 'memorize-fully' },
        { id: 't2-4', kind: 'theorem', title: '⭐ משפט השלוש (dim V = n)', body: 'dim V = n + יש n וקטורים → בסיס ⟺ בת"ל ⟺ פורשים.', depth: 'memorize-fully', topTheoremRank: 3, requiresProof: true },
        { id: 't2-5', kind: 'theorem', title: 'משפט ההשלמה לבסיס', body: 'dim V = n + k וקטורים בת"ל (k<n) ⟹ ניתן להשלים לבסיס.', depth: 'know-and-state' },
        { id: 't2-6', kind: 'theorem', title: 'W ≤ V נוצר סופית: dim W ≤ dim V; שוויון ⟹ W = V', depth: 'memorize-fully', topTheoremRank: 8 },
        { id: 't2-7', kind: 'theorem', title: '⭐ משפט המימדים הראשון', body: 'dim(U+W) = dim U + dim W − dim(U∩W).', depth: 'memorize-fully', topTheoremRank: 7 },
        { id: 't2-8', kind: 'theorem', title: 'U+W = span{u₁,...,uₖ, w₁,...,wₗ}', depth: 'know-and-state' },
        { id: 't2-9', kind: 'corollary', title: 'V = U⊕W ⟹ dim V = dim U + dim W', depth: 'know-and-state' },
      ],
    },
    {
      time: '10:15–10:30',
      hours: 0.25,
      type: 'rest',
      title: 'הפסקה ☕',
    },
    {
      time: '10:30–12:00',
      hours: 1.5,
      type: 'theory',
      lectureScope: 'הרצאה 16-18: מטריצות + הפיכות',
      lectureFiles: ['LA01 lecture 16 2026.pdf', 'LA01 lecture 17 2026.pdf', 'LA01 lecture 18 2026.pdf'],
      title: 'כפל מטריצות + הפיכות + טבלת השקילויות',
      description: 'טבלת 13 התנאים השקולים — חובה לדעת בעל פה. ב-מועד א 3.2 (Z_5 inverse) = 3/12.',
      weakPointCallout: '💡 ב-מועד א ב-3.2 קיבלת 3/12 בחישוב הופכי ב-Z_5. הטכניקה הזו דחופה!',
      items: [
        { id: 'd2-3', kind: 'definition', title: 'כפל מטריצות [AB]ᵢⱼ = Σₖ [A]ᵢₖ[B]ₖⱼ', depth: 'memorize-fully' },
        { id: 'd2-4', kind: 'definition', title: 'I_n מטריצת היחידה', depth: 'memorize-fully' },
        { id: 'd2-5', kind: 'definition', title: 'A,B מתחלפות (commute) אם AB=BA', depth: 'know-and-state' },
        { id: 't2-10', kind: 'theorem', title: 'אסוציאטיביות (AB)C = A(BC) + פילוג', depth: 'memorize-fully' },
        { id: 't2-11', kind: 'note', title: '⚠ AB ≠ BA כללי. יש מחלקי אפס.', depth: 'memorize-fully' },
        { id: 't2-12', kind: 'theorem', title: 'Ax̄ = x₁C̄₁ + ... + xₙC̄ₙ (LC של עמודות!)', depth: 'memorize-fully' },
        { id: 'd2-6', kind: 'definition', title: 'A הפיכה: ∃B: AB=BA=I_n. B = A⁻¹ יחיד.', depth: 'memorize-fully' },
        { id: 'd2-7', kind: 'definition', title: 'הפיכה משמאל / מימין', depth: 'know-and-state' },
        { id: 'd2-8', kind: 'definition', title: 'מטריצה אלמנטרית = I_n + פעולה אחת', depth: 'memorize-fully' },
        { id: 't2-13', kind: 'theorem', title: '⭐⭐ טבלת שקילויות ההפיכות', body: 'A הפיכה ⟺ rank=n ⟺ det≠0 ⟺ עמודות בת"ל ⟺ עמודות בסיס ⟺ NulA={0} ⟺ Ax=b פתיר יחיד ⟺ ColA=F^n ⟺ A מכפלת אלמנטריות ⟺ צורה קנונית = I_n.', depth: 'memorize-fully', topTheoremRank: 2, requiresProof: true },
        { id: 't2-14', kind: 'theorem', title: '(AB)⁻¹ = B⁻¹A⁻¹ (היפוך הסדר!)', depth: 'memorize-fully' },
        { id: 't2-15', kind: 'theorem', title: 'אלגוריתם ההיפוך: דרגי [A | I] עד [I | A⁻¹]', depth: 'memorize-fully' },
        { id: 't2-16', kind: 'theorem', title: 'A,B שקולות שורה ⟺ A הפיכה ⟺ B הפיכה', depth: 'know-and-state' },
        { id: 't2-17', kind: 'note', title: 'ל-A שורות אפסים ⟹ A לא הפיכה', depth: 'know-and-state' },
      ],
    },
    {
      time: '12:00–13:00',
      hours: 1,
      type: 'rest',
      title: 'ארוחת צהריים 🥗',
    },
    {
      time: '13:00–14:30',
      hours: 1.5,
      type: 'theory',
      lectureScope: 'הרצאה 19: שחלוף + Nul/Col/Row + Rank-Nullity',
      lectureFiles: ['LA01 lecture 19 2026.pdf'],
      title: 'שחלוף + 3 המרחבים + משפט הדרגה',
      description: 'משפט הדרגה (rank + dim Nul = n) — סבירות 95% במועד ב.',
      items: [
        { id: 'd2-9', kind: 'definition', title: 'שחלוף: [Aᵗ]ᵢⱼ = [A]ⱼᵢ', depth: 'memorize-fully' },
        { id: 'd2-10', kind: 'definition', title: 'סימטרית A=Aᵗ; אנטי-סימטרית A=-Aᵗ', depth: 'memorize-fully' },
        { id: 't2-18', kind: 'theorem', title: '(AB)ᵗ = BᵗAᵗ (היפוך הסדר!)', depth: 'memorize-fully' },
        { id: 't2-19', kind: 'theorem', title: 'A הפיכה ⟺ Aᵗ הפיכה; (Aᵗ)⁻¹ = (A⁻¹)ᵗ', depth: 'know-and-state' },
        { id: 'd2-11', kind: 'definition', title: 'NulA = {x̄∈F^n : Ax̄=0̄}', depth: 'memorize-fully' },
        { id: 'd2-12', kind: 'definition', title: 'ColA = span{עמודות A}', depth: 'memorize-fully' },
        { id: 'd2-13', kind: 'definition', title: 'RowA = span{שורות A} = ColAᵗ', depth: 'memorize-fully' },
        { id: 't2-20', kind: 'theorem', title: 'NulA תת"מ של F^n', depth: 'know-and-state' },
        { id: 't2-21', kind: 'theorem', title: 'Ax=b פתיר ⟺ b ∈ ColA', depth: 'memorize-fully' },
        { id: 't2-22', kind: 'theorem', title: 'A,B שקולות שורה ⟹ RowA = RowB', depth: 'know-and-state' },
        { id: 't2-23', kind: 'theorem', title: '⭐ dim ColA = dim RowA = rank A', depth: 'memorize-fully', topTheoremRank: 5, requiresProof: true },
        { id: 't2-24', kind: 'theorem', title: '⭐⭐ משפט הדרגה: rank A + dim NulA = n', depth: 'memorize-fully', topTheoremRank: 1, requiresProof: true },
        { id: 't2-25', kind: 'corollary', title: 'Ax=0 פתרון יחיד ⟺ עמודות בת"ל', depth: 'memorize-fully' },
        { id: 't2-26', kind: 'corollary', title: 'm < n ⟹ Ax=0 יש יותר מפתרון אחד', depth: 'memorize-fully' },
        { id: 't2-27', kind: 'corollary', title: 'A הפיכה ⟺ ColA=F^n ⟺ RowA=F^n ⟺ rank=n', depth: 'memorize-fully' },
        { id: 't2-28', kind: 'note', title: 'בסיס ל-RowA = שורות לא-אפס בקנונית', depth: 'memorize-fully' },
        { id: 't2-29', kind: 'note', title: 'dim NulA = מספר משתנים חופשיים', depth: 'memorize-fully' },
      ],
    },
    {
      time: '14:30–15:45',
      hours: 1.25,
      type: 'theory',
      lectureScope: 'הרצאה 20-23: דטרמיננטות',
      lectureFiles: ['LA01 lecture 20 2026.pdf', 'LA01 lecture 21 2026.pdf', 'LA01 lecture 22 2026.pdf', 'LA01 lecture 23 2026.pdf'],
      title: 'det — חישוב + תכונות + det(AB)',
      description: 'הגדרה אקסיומטית + פיתוח. det(AB)=det(A)det(B) הוכחה!',
      items: [
        { id: 'd2-14', kind: 'definition', title: 'מולטי-לינארית (לינארית בכל שורה בנפרד)', depth: 'know-and-state' },
        { id: 'd2-15', kind: 'definition', title: 'מתחלפת: 2 שורות זהות → 0', depth: 'know-and-state' },
        { id: 'd2-16', kind: 'definition', title: 'דטרמיננטה: מולטי-לינארית + מתחלפת + Δ(I)=1', depth: 'memorize-fully' },
        { id: 'd2-17', kind: 'definition', title: 'מינור Mᵢⱼ — det של מטריצה אחרי מחיקת שורה i ועמודה j', depth: 'memorize-fully' },
        { id: 't2-30', kind: 'theorem', title: '⭐ משפט (*) — פעולות שורה', body: 'Rᵢ→cRᵢ: det×c; Rᵢ↔Rⱼ: ×(-1); Rᵢ→Rᵢ+αRⱼ: ללא שינוי.', depth: 'memorize-fully' },
        { id: 't2-31', kind: 'theorem', title: 'A לא הפיכה ⟺ det A = 0', depth: 'memorize-fully' },
        { id: 't2-32', kind: 'theorem', title: 'יחידות פונקציית det (משפט חשוב 3)', depth: 'know-and-state' },
        { id: 't2-33', kind: 'theorem', title: 'det 2×2 = ad-bc', depth: 'memorize-fully' },
        { id: 't2-34', kind: 'theorem', title: 'פיתוח לפי שורה/עמודה: det = Σ (-1)^(i+j) [A]ᵢⱼ Mᵢⱼ', depth: 'memorize-fully' },
        { id: 't2-35', kind: 'theorem', title: 'A משולשית ⟹ det = מכפלת האלכסון', depth: 'memorize-fully' },
        { id: 't2-36', kind: 'theorem', title: '⭐⭐ det(AB) = det(A)·det(B)', depth: 'memorize-fully', topTheoremRank: 4, requiresProof: true },
        { id: 't2-37', kind: 'theorem', title: 'det(Aᵗ) = det(A)', depth: 'memorize-fully', topTheoremRank: 9 },
        { id: 't2-38', kind: 'corollary', title: 'A הפיכה ⟹ det(A⁻¹) = 1/det(A)', depth: 'know-and-state' },
        { id: 't2-39', kind: 'theorem', title: 'בלוקים משולשית: det = det(A)·det(B)', depth: 'recognize-only' },
        { id: 't2-40', kind: 'lemma', title: 'det(EA) = det(E)·det(A) (E אלמנטרית)', depth: 'know-and-state' },
      ],
    },
    {
      time: '15:45–16:00',
      hours: 0.25,
      type: 'rest',
      title: 'הפסקה ☕',
    },
    {
      time: '16:00–17:30',
      hours: 1.5,
      type: 'memorize',
      title: '🏆 שינון 6 הוכחות קריטיות',
      description: 'קראי כל הוכחה 3 פעמים, אז כתבי מהזיכרון. סטופר!',
      proofsToWrite: [
        { topTheoremRank: 1, targetMinutes: 12 },  // Rank-Nullity
        { topTheoremRank: 2, targetMinutes: 15 },  // Invertibility
        { topTheoremRank: 3, targetMinutes: 12 },  // Three Theorems
        { topTheoremRank: 4, targetMinutes: 10 },  // det(AB)
        { topTheoremRank: 5, targetMinutes: 12 },  // Row=Col
        { topTheoremRank: 6, targetMinutes: 10 },  // Steinitz
      ],
    },
    {
      time: '17:30–18:00',
      hours: 0.5,
      type: 'practice',
      title: 'תרגיל מהיר: דירוג למשולשית + det',
      exercises: [
        { id: 'e2-1', title: 'חישוב det 4×4 בדירוג', source: 'מועד א 2024', durationMinutes: 25, topHomeworkRank: 8 },
      ],
    },
  ],
};

// ─────────────────────── DAY 3 (Tuesday) — Moed A 2025 + HW + reproof ───────────────────────

const day3: BattleDay = {
  day: 3,
  date: '2026-05-12',
  weekday: 'שלישי',
  emoji: '⚔️',
  title: 'יום 3 — מבחן ראשון: מועד א 2025 + תרגילי החולשה שלך',
  subtitle: '3 שעות מבחן + ניתוח שגיאות + 5 תרגילי טופ-10',
  goal: 'את עוברת בסימולציה ראשונה. את שולטת ב-Z_p ובפרמטרים — שתי החולשות הגדולות שלך.',
  totalHours: 8,
  accentColor: 'from-amber-500 to-orange-600',
  slots: [
    {
      time: '09:00–12:00',
      hours: 3,
      type: 'simulation',
      title: '⚠️ מועד א 2025 בתנאי אמת',
      description: 'סטופר 180 דק. ללא חומר. ללא הפסקות. בחרי 4 שאלות בחוכמה. דלגי על תקועה אחרי 15 דק.',
      pastExam: { name: 'מועד א 2025', href: '/exam2025a', durationMinutes: 180, isMandatory: true },
    },
    {
      time: '12:00–13:00',
      hours: 1,
      type: 'rest',
      title: 'ארוחת צהריים + פירוק 🥗',
    },
    {
      time: '13:00–14:30',
      hours: 1.5,
      type: 'review',
      title: 'בדיקת תשובות + רשימת שגיאות',
      description: 'השווי לפתרון הרשמי. רשמי במחברת "השגיאות שלי" כל טעות. זו הרשימה הכי חשובה!',
      pastExam: { name: 'מועד א 2025 — פתרונות', href: '/exam2025a', durationMinutes: 90, isMandatory: true, note: 'בדיקה מול פתרון רשמי' },
    },
    {
      time: '14:30–14:45',
      hours: 0.25,
      type: 'rest',
      title: 'הפסקה ☕',
    },
    {
      time: '14:45–16:30',
      hours: 1.75,
      type: 'practice',
      title: '5 תרגילים מהטופ — דחוף לפי החולשות שלך',
      description: 'התמקדי: #1 פרמטרים (4.1 שלך = 0!), #2 Z_5 (3.2 = 3/12), #4 rank theorems (5.2 לא ענית), #5 span equality (5.1 לא ענית), #7 dim(U∩W) (4.2 = 2/13).',
      weakPointCallout: '💡 כל 5 התרגילים האלה הם תיקון ישיר לחולשות שלך מ-מועד א.',
      exercises: [
        { id: 'e3-1', title: '#1 מערכת תלוית-פרמטר', source: 'מועד א 2024', durationMinutes: 25, topHomeworkRank: 1, hint: 'תיקון ל-4.1 (0/12 שלך).' },
        { id: 'e3-2', title: '#2 הופכי ב-Z_5', source: 'HW7', durationMinutes: 20, topHomeworkRank: 2, hint: 'תיקון ל-3.2 (3/12 שלך).' },
        { id: 'e3-3', title: '#4 rank(AB) = rank(B)', source: 'מועד א 2025', durationMinutes: 25, topHomeworkRank: 4, hint: 'תיקון ל-5.2 שלא ענית.' },
        { id: 'e3-4', title: '#5 span equality', source: 'מועד א 2025', durationMinutes: 20, topHomeworkRank: 5, hint: 'תיקון ל-5.1 שלא ענית.' },
        { id: 'e3-5', title: '#7 dim(U∩W) = n−2', source: 'מועד א 2025', durationMinutes: 25, topHomeworkRank: 7, hint: 'תיקון ל-4.2 (2/5+0/8 שלך).' },
      ],
    },
    {
      time: '16:30–18:00',
      hours: 1.5,
      type: 'memorize',
      title: 'כתיבה מהזיכרון: 3 ההוכחות הראשונות',
      description: 'Rank-Nullity → Invertibility → Three Theorems. סטופר 10 דק לכל אחת. אם נכשלת — קראי שוב וכתבי שוב.',
      proofsToWrite: [
        { topTheoremRank: 1, targetMinutes: 10 },
        { topTheoremRank: 2, targetMinutes: 12 },
        { topTheoremRank: 3, targetMinutes: 10 },
      ],
    },
  ],
};

// ─────────────────────── DAY 4 (Wednesday) — Moed B 2024 + final review ───────────────────────

const day4: BattleDay = {
  day: 4,
  date: '2026-05-13',
  weekday: 'רביעי',
  emoji: '🎯',
  title: 'יום 4 — מבחן שני: מועד ב 2024 + סקירה סופית',
  subtitle: 'מבחן מועד ב אמיתי + שינון אחרון של כל 6 ההוכחות',
  goal: 'כל 6 ההוכחות יושבות. את מוכנה.',
  totalHours: 8,
  accentColor: 'from-blue-500 to-indigo-600',
  slots: [
    {
      time: '09:00–12:00',
      hours: 3,
      type: 'simulation',
      title: '⚠️ מועד ב 2024 בתנאי אמת — הסימולציה הקרובה ביותר',
      description: 'הכי קרוב למועד ב שלך. סטופר. ללא חומר. בחרי 4 שאלות.',
      pastExam: { name: 'מועד ב 2024', href: '/exam2024b', durationMinutes: 180, isMandatory: true },
    },
    {
      time: '12:00–13:00',
      hours: 1,
      type: 'rest',
      title: 'ארוחת צהריים 🥗',
    },
    {
      time: '13:00–14:30',
      hours: 1.5,
      type: 'review',
      title: 'בדיקה + רשימת שגיאות מעודכנת',
      description: 'מה חוזר משלשום? אלה הנקודות לחזק לפני שינה.',
    },
    {
      time: '14:30–15:30',
      hours: 1,
      type: 'practice',
      title: 'מועד ב 2023: 1-2 שאלות מנושאי חולשה',
      description: 'אל תעשי את כל המבחן! רק את מה שעוד טעית בו.',
      pastExam: { name: 'מועד ב 2023 — סלקטיבי', href: '/exam2023b', durationMinutes: 60, isMandatory: false },
    },
    {
      time: '15:30–15:45',
      hours: 0.25,
      type: 'rest',
      title: 'הפסקה ☕',
    },
    {
      time: '15:45–17:00',
      hours: 1.25,
      type: 'memorize',
      title: 'כל 6 ההוכחות — סיבוב אחרון',
      description: 'סטופר 10 דק לכל. אם נכשלת — חזרי וכתבי שוב.',
      proofsToWrite: [
        { topTheoremRank: 1, targetMinutes: 10 },
        { topTheoremRank: 2, targetMinutes: 12 },
        { topTheoremRank: 3, targetMinutes: 10 },
        { topTheoremRank: 4, targetMinutes: 8 },
        { topTheoremRank: 5, targetMinutes: 10 },
        { topTheoremRank: 6, targetMinutes: 8 },
      ],
    },
    {
      time: '17:00–18:00',
      hours: 1,
      type: 'review',
      title: 'דף נוסחאות + 8 כללי הזהב + הכנת ערכת מבחן',
      description: 'רענון אחרון. רשימת מלכודות. עט×3, מחק, סרגל, תעודה, שעון. שינה מוקדמת!',
    },
  ],
};

// ─────────────────────── DAY 5 (Thursday) — EXAM ───────────────────────

const day5: BattleDay = {
  day: 5,
  date: '2026-05-14',
  weekday: 'חמישי',
  emoji: '🏆',
  title: 'יום המבחן',
  subtitle: 'בוקר רגוע, סקירה קלה, מבחן',
  goal: 'את שולטת. אל תלמדי חומר חדש!',
  totalHours: 0,
  accentColor: 'from-rose-500 to-red-600',
  slots: [
    {
      time: '07:00–08:00',
      hours: 0,
      type: 'rest',
      title: 'ארוחת בוקר טובה ☕',
      description: 'אל תלמדי חומר חדש! פשוט תני למוח לעבוד.',
    },
    {
      time: '08:00–09:00',
      hours: 0,
      type: 'review',
      title: 'סקירה קלה — 3 ההוכחות הראשונות + טבלת השקילויות',
      description: 'רק לרענן. אל תיכנסי לפרטים.',
    },
    {
      time: '09:00 ואילך',
      hours: 0,
      type: 'simulation',
      title: '🎯 המבחן! 3 שעות, 5 שאלות, 4 לתשובה.',
      description: 'התחילי בשאלות שאת בטוחה בהן. הקצי 35-40 דק לשאלה. דלגי על תקועה אחרי 15 דק. בהצלחה!',
    },
  ],
};

// ─────────────────────── EXPORTS ───────────────────────

export const battlePlan: BattleDay[] = [day1, day2, day3, day4, day5];

export const examMeta = {
  examDate: '2026-05-14',
  examLabel: 'יום חמישי, 14 במאי 2026',
  daysFromToday: 4,
  totalStudyHours: 32,
  hoursPerDay: 8,
  studyDays: 4,
};

export const goldenRules = [
  { title: 'תמיד לציין תנאים', body: 'A ∈ M_n(F), F שדה, V נוצר סופית. "תשובה לא מוסברת = 0 נקודות".' },
  { title: 'בקשי את שם המשפט', body: '"לפי משפט הדרגה...", "לפי משפט השלוש...".' },
  { title: 'אם זה אמ"מ — שני כיוונים', body: 'הוכיחי (⇒) ואז (⇐).' },
  { title: 'פצלי למקרים בעת פרמטר', body: 'אם יש a ∈ R בשאלה, חייבת לבחון את כל ערכי a שמשנים את הדירוג.' },
  { title: 'דירוג שורה: פעולה אחת בכל פעם', body: 'אסור לערבב מספר פעולות בשורה אחת — מורידים נקודות.' },
  { title: '(AB)ᵗ = BᵗAᵗ — היפוך הסדר', body: 'גם להופכי: (AB)⁻¹ = B⁻¹·A⁻¹. שכחה = הורדת נקודות.' },
  { title: 'בדקי לפני שמחלקת', body: 'בכל שדה (במיוחד Z_p): ודאי שהאיבר ≠ 0 לפני הופכי.' },
  { title: 'אל תסתמכי על תוצאות שלא הוכחו בקורס', body: '"אסור להישען על חומר שלא נלמד".' },
];

// Aggregate getters used by the page UI
export function getAllDayItems(day: BattleDay) {
  const items = day.slots.flatMap((s) => s.items ?? []);
  return {
    definitions: items.filter((i) => i.kind === 'definition'),
    theorems: items.filter((i) => i.kind === 'theorem' || i.kind === 'lemma'),
    corollaries: items.filter((i) => i.kind === 'corollary' || i.kind === 'note'),
    exercises: day.slots.flatMap((s) => s.exercises ?? []),
    pastExams: day.slots.map((s) => s.pastExam).filter((x): x is PastExamRef => !!x),
    proofs: day.slots.flatMap((s) => s.proofsToWrite ?? []),
  };
}

export function getDayProgressKeys(day: BattleDay): string[] {
  const keys: string[] = [];
  day.slots.forEach((s, si) => {
    keys.push(`d${day.day}-slot-${si}`);
    s.items?.forEach((i) => keys.push(`d${day.day}-item-${i.id}`));
    s.exercises?.forEach((e) => keys.push(`d${day.day}-ex-${e.id}`));
    s.proofsToWrite?.forEach((p) => keys.push(`d${day.day}-proof-${p.topTheoremRank}-${si}`));
    if (s.pastExam) keys.push(`d${day.day}-exam-${s.pastExam.name}-${si}`);
  });
  return keys;
}
