// Moed B 2025-26 Prediction — based on full analysis of:
//   - Moed A 2025 (what was tested)
//   - Simulation 2025-26 (what was hinted)
//   - Past Moed B exams (2022, 2023, 2024)
//   - מיקוד_6_משפטים_מועד_ב.pdf expert analysis
//
// Logic:
//   "What's tested in Moed A is unlikely to be re-tested verbatim in Moed B."
//   "Topics excluded from Moed A become high-priority for Moed B."
//   "The structure (5 questions, choose 4) and topic distribution stays similar."

export interface PredictedQuestion {
  qNum: number;
  estimatedPoints: 25;
  topic: string;
  subtopics: string[];
  estimatedProbability: number;     // % chance question of this type appears
  likelyFormat: string;             // proof / computation / open-ended
  suggestedTheorems: number[];      // theorem ranks from top-theorems.ts
  suggestedHomework: number[];      // homework ranks from top-homework.ts
  exampleQuestions: string[];       // historical examples
  whyThisTopic: string;             // reasoning based on Moed A absence
}

export const moedBStructure = {
  totalQuestions: 5,
  answer: 4,
  pointsPerQuestion: 25,
  durationHours: 3,
  noAuxiliaryMaterial: true,
  proofWeight: 0.5,                 // ~50% of questions need a real proof
  computationWeight: 0.5,
};

export const predictedQuestions: PredictedQuestion[] = [
  {
    qNum: 1,
    estimatedPoints: 25,
    topic: 'בת"ל / ייצוג יחיד / span',
    subtopics: ['בת"ל', 'ייצוג יחיד', 'span equality'],
    estimatedProbability: 70,
    likelyFormat: 'הגדרה (2 נק) + הוכחה (15 נק) + שאלה תחת תנאי (8 נק)',
    suggestedTheorems: [10, 6],
    suggestedHomework: [5, 6],
    exampleQuestions: [
      'הגדר v_1,...,v_k בת"ל. הוכח שקילות לייצוג יחיד. (מועד א 2025)',
      'הוכח span{v+u, v−u, w} = span{v, u, w} תחת תנאי על השדה.',
    ],
    whyThisTopic:
      'מועד א הציע "ייצוג יחיד" אבל ב-15 נק; מועד ב יכול לחזור על אותה תבנית או לעבור ל-span equality / Steinitz. שתי תבניות עם הסתברות גבוהה.',
  },
  {
    qNum: 2,
    estimatedPoints: 25,
    topic: 'העתקות ליניאריות + Rank-Nullity',
    subtopics: ['Ker(T)', 'Im(T)', 'משפט המימדים להעתקות', 'קיום העתקה'],
    estimatedProbability: 80,
    likelyFormat: 'הגדרה + משפט הדרגה (15 נק) + שאלת קיום העתקה (8 נק)',
    suggestedTheorems: [1, 3],
    suggestedHomework: [6],
    exampleQuestions: [
      'הגדר ker T ו-Im T. הוכח dim V = dim ker T + dim Im T. (מועד א 2025)',
      'הוכח/הפרך: קיים T: R_n[x] → R_n[x] עם תנאים נתונים.',
    ],
    whyThisTopic:
      'מועד א בדק את Rank-Nullity לטרנספורמציות. מועד ב סביר להמשיך — אבל בנוסח אחר (אולי דרך הוכחה ארוכה יותר, או חישוב Im/Ker בפועל).',
  },
  {
    qNum: 3,
    estimatedPoints: 25,
    topic: 'מטריצות + Z_p או הוכחת זהות מטריצית',
    subtopics: ['הופכי ב-Z_p', 'rank(AB)', 'מכפלות אלמנטריות'],
    estimatedProbability: 75,
    likelyFormat: 'תרגיל חישובי (12 נק) + הוכחה תאורטית (13 נק)',
    suggestedTheorems: [2, 4],
    suggestedHomework: [2, 4],
    exampleQuestions: [
      'חשב A⁻¹ או הוכח שאינה הפיכה — A ב-Z_5. (מועד א 2025)',
      'הוכח: dim ImT ≤ 1 ⟹ קיים α כך ש-T² = α·T. (מועד א 2025)',
    ],
    whyThisTopic:
      'תבנית ב-Moed A 2025 הייתה Z_5; מועד ב סביר לחזור עם שדה אחר (Z_3, Z_7) או לבקש להוכיח תכונה מבנית של מטריצות.',
  },
  {
    qNum: 4,
    estimatedPoints: 25,
    topic: 'מערכות ליניאריות עם פרמטר + dim(U+W)',
    subtopics: ['פרמטר', '0/1/∞ פתרונות', 'משפט המימדים הראשון'],
    estimatedProbability: 85,
    likelyFormat: 'מערכת תלוית-פרמטר (11 נק) + הוכחה על מימד תת-מרחבים (14 נק)',
    suggestedTheorems: [7, 8],
    suggestedHomework: [1, 7],
    exampleQuestions: [
      'מצא a ∈ R שעבורם המערכת אינסוף/0/1 פתרונות. (מועד א 2024 + 2025)',
      'הוכח: dim U = dim W = n−1, U ≠ W ⟹ dim(U∩W) = n−2. (מועד א 2025)',
    ],
    whyThisTopic:
      'תבנית "פרמטר + dim" חוזרת כמעט בכל מועד. מועד א 2025 שאל בדיוק את זה. מועד ב יחזור עם פרמטר אחר או תנאי שונה (n−2 vs n−3, U ⊆ W וכו\').',
  },
  {
    qNum: 5,
    estimatedPoints: 25,
    topic: 'תכונות span / שחלוף / דרגה',
    subtopics: ['span כללי', 'rank(AB) = rank(B)', 'rank(B^t) = rank(B)'],
    estimatedProbability: 75,
    likelyFormat: 'הוכחת שוויון span (10 נק) + שלוש סעיפי הוכחה על rank (15 נק)',
    suggestedTheorems: [5, 9],
    suggestedHomework: [4, 5],
    exampleQuestions: [
      'הוכח span{v+u, v−u, v+w} = span{v, u, w} (תחת 1+1≠0). (מועד א 2025)',
      'rank(A) = n. הוכח: (a) rank(AB)=rank(B), (b) rank(B^t)=rank(B), (c) rank(BA)=rank(B). (מועד א 2025)',
    ],
    whyThisTopic:
      'מועד א 2025 הוגיע יסוד שאלה זו. מועד ב סביר ש"יזיז" — או שיחזור על rank(B^t)=rank(B) דרך הוכחה אחרת (נשען על תורת המימד הקנונית).',
  },
];

// Topics already tested in Moed A 2025 — LOWER probability for Moed B
export const lowProbabilityMoedB = [
  {
    topic: 'אסוציאטיביות כפל מטריצות (AB)C = A(BC)',
    reason: 'נשאל בסימולציה',
  },
  {
    topic: '(AB)^t = B^t A^t — הוכחה',
    reason: 'נשאל בסימולציה',
  },
  {
    topic: 'דטרמיננטה של בלוקים משולשית',
    reason: 'נשאל בסימולציה',
  },
  {
    topic: 'C כמרחב וקטורי מעל R',
    reason: 'נשאל ב-מועד א',
  },
  {
    topic: 'תכונות סימטריות + אנטי-סימטריות + det',
    reason: 'נשאל ב-מועד א (1.2)',
  },
];

// Topics LIKELY to appear in Moed B (NOT tested in Moed A)
export const highProbabilityMoedB = [
  {
    topic: 'משפט הדרגה (rank + dim NulA = n)',
    note: 'לא נשאל ב-מועד א ⟹ הסתברות 95%',
  },
  {
    topic: 'טבלת שקילויות ההפיכות (15 תנאים)',
    note: 'מועד א בדק חלקית; שרשרת מלאה לא',
  },
  {
    topic: 'משפט השלוש (dim V = n)',
    note: 'לא נשאל ב-מועד א',
  },
  {
    topic: 'det(AB) = det(A)·det(B) — הוכחה',
    note: 'מועד א רק חישב det. הוכחה לא',
  },
  {
    topic: 'דרגת שורות = דרגת עמודות',
    note: 'לא נשאל ב-מועד א',
  },
  {
    topic: 'למת שטיינל (החלפה)',
    note: 'יסוד תורת המימד; לא נשאל ב-מועד א',
  },
];

export const examTacticTips = [
  {
    title: 'בחר את 4 השאלות בחוכמה',
    body: 'יש 5 שאלות, חייב לענות על 4. עבור על כל 5 ב-3 הדקות הראשונות; דרג מהקלה לקשה; דלג על השאלה הכי לא בטוחה.',
  },
  {
    title: 'הקצה זמן: 35-40 דק לשאלה',
    body: '180 דק / 4 שאלות = 45 דק לכל שאלה, אבל השאר 20 דק לסקירה.',
  },
  {
    title: 'אם אתה תקוע ב-15 דק — דלג',
    body: 'חזור אליה אחר כך. אסון לבזבז שעה על שאלה אחת.',
  },
  {
    title: 'הוכחה = 50% מהציון',
    body: 'אל תרשום רק תוצאה. כל טענה צריכה הצדקה. "תשובה לא מוסברת = 0 נקודות".',
  },
  {
    title: 'ציין את שמות המשפטים',
    body: '"לפי משפט הדרגה" / "לפי משפט השלוש" / "לפי למת שטיינל" — נותן ביטחון ומונע אי-הבנה.',
  },
];
