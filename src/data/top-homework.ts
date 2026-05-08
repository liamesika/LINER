// Top 10 homework-style problems most worth solving from memory before Moed B.
// Selection: representative of standard exam techniques, drawn from HW2-12 (2025-26),
// the simulation, and recurring exam patterns from past Moed B exams.
//
// Each problem has:
//   - prompt:    exact problem statement
//   - whyTop:    why this exemplifies a critical exam technique
//   - solution:  step-by-step worked solution
//   - template:  the reusable "skeleton" you should memorize
//   - traps:     where students typically lose points

export type HomeworkCategory =
  | 'systems'
  | 'matrices'
  | 'invertibility'
  | 'subspace-dim'
  | 'span-LI'
  | 'rank-nullity'
  | 'determinant'
  | 'transformation'
  | 'polynomial'
  | 'field';

export interface TopHomework {
  id: number;
  rank: number;
  name: string;
  category: HomeworkCategory;
  source: string;            // "HW6 Q3", "מועד א 2024 Q4", etc.
  difficulty: 'easy' | 'medium' | 'hard';
  techniqueSlug: string;     // identifier of reusable technique
  prompt: string;
  whyTop: string;
  solution: { step: number; text: string; math?: string }[];
  template: string;          // memorizable skeleton
  traps: string[];
}

export const topHomework: TopHomework[] = [
  {
    id: 1,
    rank: 1,
    name: 'מערכת תלוית-פרמטר: מתי 0/1/∞ פתרונות',
    category: 'systems',
    source: 'HW3 + מועד א 2024 שאלה 4.1',
    difficulty: 'medium',
    techniqueSlug: 'parametric-system',
    prompt:
      'יהי a ∈ R, ונתונה המערכת:\nx + a y = 1\na x + a y + z = a + 1\n(a+1) x + 2a y + (a+1) z = a + 3\nקבעו עבור אילו a אין פתרון, יש פתרון יחיד, ויש אינסוף — בכל מקרה תנו את הפתרון הכללי.',
    whyTop:
      'תבנית קלאסית: דירוג עם פרמטר → פיצול לפי ערכים שמכפלים את האיברים האלכסוניים. נשאל ב-מועד א 2024.',
    solution: [
      {
        step: 1,
        text: 'כותבים מטריצה מורחבת ומדרגים: R_2 → R_2 − a·R_1, R_3 → R_3 − (a+1)R_1.',
        math:
          '[1  a    0   | 1     ]\n[0  a−a²  1  | 1     ]\n[0  a−a²  a+1 | 2    ]',
      },
      {
        step: 2,
        text: 'R_3 → R_3 − R_2:',
        math:
          '[1  a    0  | 1]\n[0  a−a² 1  | 1]\n[0  0    a  | 1]',
      },
      {
        step: 3,
        text: 'נקודות פיצול: a − a² = a(1−a) = 0 ⟺ a = 0 או a = 1. נבחן שלושה מקרים.',
      },
      {
        step: 4,
        text: 'מקרה a = 0: שורה 3 הופכת ל-(0,0,0|1) → אין פתרון. rank(A) = 2 < rank(A⁺) = 3.',
      },
      {
        step: 5,
        text: 'מקרה a = 1: שורה 2 ושורה 3 הופכות ל-(0,0,1|1). אחרי R_3 → R_3 − R_2 מקבלים שורת אפסים → אינסוף פתרונות. rank=2<3. הפתרון הכללי: x = 1−t, y = t, z = 1, t∈R.',
      },
      {
        step: 6,
        text: 'מקרה a ≠ 0, 1: rank(A) = rank(A⁺) = 3 = n → פתרון יחיד. ההופכי: z = 1/a, ואז y = (1)/(a−a²), x = 1 − a·y.',
      },
    ],
    template:
      '1. כתוב מורחבת. 2. דרג עד שהמטריצה משולשית. 3. זהה פרמטרים על האלכסון/האחרונה. 4. קבע נקודות פיצול. 5. בכל ענף — בדוק rank(A) מול rank(A⁺) ו-n. 6. אינסוף → מצא פתרון פרטי + פתרון הומוגני.',
    traps: [
      'לא לעבוד בשורות בו זמנית בכפל מספר',
      'לשכוח לבדוק ש-α ≠ 0 לפני חלוקה',
      'לא לפצל לכל המקרים — חייב לכל a ∈ R',
    ],
  },

  {
    id: 2,
    rank: 2,
    name: 'הופכי מעל Z_p (שדה סופי)',
    category: 'invertibility',
    source: 'HW7 + מועד א 2025 שאלה 3.2',
    difficulty: 'medium',
    techniqueSlug: 'inverse-zp',
    prompt:
      'נתונה A ∈ M_4(Z_5):\nA = [[1,0,2,1],[1,3,0,1],[0,0,0,1],[0,1,1,3]]\nחשב A⁻¹ או הוכח ש-A אינה הפיכה.',
    whyTop:
      'נשאל ב-מועד א 2025. בודק חישוב ב-Z_p (לזכור: −1 ≡ 4, חישוב הופכי כפלי). תבנית: בונים [A | I] ומדרגים.',
    solution: [
      {
        step: 1,
        text: 'בונים [A | I_4] ומבצעים פעולות שורה תוך עבודה ב-Z_5.',
      },
      {
        step: 2,
        text: 'R_2 → R_2 − R_1: השורה השנייה הופכת ל-(0,3,3,0,4,1,0,0). (שים לב: −1 ≡ 4 ב-Z_5).',
      },
      {
        step: 3,
        text: 'R_2 → R_2 − 3·R_4 (ב-Z_5: −3 ≡ 2): מתקבלת שורה (0,0,0,1,4,1,0,2).',
      },
      {
        step: 4,
        text: 'R_3 → R_3 − R_2: מתקבלת שורת אפסים בארבע העמודות הראשונות → A לא הפיכה!',
      },
      {
        step: 5,
        text: 'מסקנה: A שקולת שורה למטריצה עם שורת אפסים → rank(A) < 4 → A אינה הפיכה. ∎',
      },
    ],
    template:
      '1. [A|I]. 2. דרג. 3. אם הגעת לשורת אפסים בצד שמאל → לא הפיכה. 4. אחרת המשך עד שצד שמאל = I, וצד ימין = A⁻¹.',
    traps: [
      'לעבוד עם מספרים שליליים — תמיד להמיר ל-mod p',
      'לטעון על הפיכות ב-לי בלי לסיים את הדירוג',
      'לחלק בלי לחשב הופכי כפלי (ב-Z_5: 2⁻¹=3, 3⁻¹=2, 4⁻¹=4)',
    ],
  },

  {
    id: 3,
    rank: 3,
    name: 'בסיס ל-Nul(A) ובדיקת משפט הדרגה',
    category: 'rank-nullity',
    source: 'HW8 Q2-3',
    difficulty: 'medium',
    techniqueSlug: 'nul-basis',
    prompt:
      'נתונה A = [[1,2,3,4],[2,4,6,8],[1,2,4,5]]. מצא בסיס ל-NulA, ל-ColA, ל-RowA, וודא ש-rank(A) + dim(NulA) = 4.',
    whyTop:
      'תבנית קלאסית. בודק שאתה יכול לקרוא משלוש "מרחבים" מטבלה אחת מדורגת. שאלה כמעט בכל מועד.',
    solution: [
      {
        step: 1,
        text: 'מדרגים את A: R_2→R_2−2R_1 (אפס), R_3→R_3−R_1 (0,0,1,1).',
        math:
          '[1 2 3 4]\n[0 0 0 0]\n[0 0 1 1]',
      },
      {
        step: 2,
        text: 'הצורה הקנונית: R_1→R_1−3R_3 → [1 2 0 1; 0 0 1 1; 0 0 0 0]. עמודות מובילות: 1, 3. משתנים חופשיים: x_2, x_4.',
      },
      {
        step: 3,
        text: 'בסיס ל-NulA: x_2=1, x_4=0 → x_1=−2, x_3=0 → v_1=(−2,1,0,0). x_2=0, x_4=1 → x_1=−1, x_3=−1 → v_2=(−1,0,−1,1). dim(NulA) = 2.',
      },
      {
        step: 4,
        text: 'בסיס ל-RowA: השורות הלא-אפס בצורה הקנונית: (1,2,0,1), (0,0,1,1). dim(RowA) = 2.',
      },
      {
        step: 5,
        text: 'בסיס ל-ColA: עמודות 1, 3 של A המקורית: (1,2,1)^t, (3,6,4)^t. dim(ColA) = 2.',
      },
      {
        step: 6,
        text: 'בדיקה: rank(A) = 2, dim(NulA) = 2, n = 4. 2 + 2 = 4 ✓.',
      },
    ],
    template:
      '1. דרג לקנונית. 2. עמודות מובילות → ColA דרך עמודות המקור. שורות לא-אפס → RowA. 3. הצב 1 בכל משתנה חופשי בנפרד → NulA. 4. אמת rank+dim(Nul)=n.',
    traps: [
      'לבחור עמודות הקנונית במקום עמודות A המקורית ל-ColA',
      'לשכוח לסמן על מינוס בעמודה המובילה כשמחשבים Nul',
    ],
  },

  {
    id: 4,
    rank: 4,
    name: 'rank(AB) = rank(B) כאשר A ריבועית הפיכה',
    category: 'rank-nullity',
    source: 'מועד א 2025 שאלה 5.2',
    difficulty: 'medium',
    techniqueSlug: 'rank-product',
    prompt:
      'יהיו A, B ∈ M_n(F) ונתון rank(A) = n. הוכח: (1) rank(AB) = rank(B), (2) rank(B^t) = rank(B), (3) rank(BA) = rank(B).',
    whyTop:
      'נשאל ב-מועד א 2025. רגיל לחזור ב-מועד ב כי הוא משלב שלוש טכניקות — אלמנטריות, שחלוף, מולטיפליקטיביות.',
    solution: [
      {
        step: 1,
        text: '(1) rank(A)=n ⟹ A הפיכה ⟹ A מתפרקת למכפלת אלמנטריות: E_k·...·E_1·A = I_n. לכן (E_k·...·E_1)·AB = (E_k·...·E_1·A)·B = I_n·B = B.',
      },
      {
        step: 2,
        text: 'מכאן AB ו-B שקולות שורה (מחוברות בשרשרת פעולות שורה). שתי מטריצות שקולות שורה הן בעלות אותו rank. לכן rank(AB) = rank(B). ✓',
      },
      {
        step: 3,
        text: '(2) row-rank(B) = col-rank(B^t) (לפי הגדרת שחלוף). אבל rank(M) = row-rank(M) = col-rank(M) לכל M. לכן rank(B) = rank(B^t). ✓',
      },
      {
        step: 4,
        text: '(3) rank(BA) = rank((BA)^t) = rank(A^t·B^t). מ-rank(A^t) = rank(A) = n ⟹ A^t הפיכה. לפי (1): rank(A^t·B^t) = rank(B^t). מ-(2): rank(B^t) = rank(B). לכן rank(BA) = rank(B). ✓',
      },
    ],
    template:
      'הפיכה מצד אחד → מכפלה אלמנטריות → שקילות שורה → שימור rank. צד שני: שחלף כדי להפוך לצד הראשון.',
    traps: [
      'לא להוכיח שכל E אלמנטרית הפיכה (לרוב מקבלים את זה כידוע, אבל יש בוחנים שמבקשים)',
      'לבלבל בין rank(AB) ל-rank(BA)',
    ],
  },

  {
    id: 5,
    rank: 5,
    name: 'שוויון span (להראות span = span)',
    category: 'span-LI',
    source: 'מועד א 2025 שאלה 5.1 + HW5',
    difficulty: 'easy',
    techniqueSlug: 'span-equality',
    prompt:
      'יהיו v_1, v_2, v_3 וקטורים במ"ו V מעל F. בהנחה ש-1_F + 1_F ≠ 0_F, הוכח:\nspan{v_1+v_2, v_1−v_2, v_1+v_3} = span{v_1, v_2, v_3}.',
    whyTop:
      'נשאל ב-מועד א 2025 שאלה 5.1. מודל לכל שאלת span — שני כיוונים, החלפה.',
    solution: [
      {
        step: 1,
        text: '(⊆) ברור: כל הוקטורים בקבוצה השמאלית הם LC של {v_1, v_2, v_3}. לכן span{LHS} ⊆ span{v_1, v_2, v_3}.',
      },
      {
        step: 2,
        text: '(⊇) מספיק להראות ש-v_1, v_2, v_3 ∈ span{LHS}.',
      },
      {
        step: 3,
        text: 'v_1: (v_1+v_2) + (v_1−v_2) = 2v_1 = (1+1)v_1. בהנחה 1+1≠0 ⟹ ניתן לחלק: v_1 = (1+1)⁻¹·[(v_1+v_2)+(v_1−v_2)] ∈ span{LHS}.',
      },
      {
        step: 4,
        text: 'v_2: (v_1+v_2) − (v_1−v_2) = 2v_2 ⟹ v_2 = (1+1)⁻¹·[(v_1+v_2)−(v_1−v_2)] ∈ span{LHS}.',
      },
      {
        step: 5,
        text: 'v_3: v_1 ∈ span{LHS} (לפי 3), ו-(v_1+v_3) ∈ LHS. לכן v_3 = (v_1+v_3) − v_1 ∈ span{LHS}. ∎',
      },
    ],
    template:
      '1. כיוון קל ראשון (LC של ה"ל). 2. כיוון שני: בטא כל איבר של ה"רחב" כ-LC של ה"צר". 3. אם יש פעולה הופכית — ציין שהיא חוקית.',
    traps: [
      'לא לציין מתי 1+1≠0 דרוש (קריטי בזירת F סופי)',
      'לא להוכיח את שני הכיוונים',
      'לבלבל בין span{v_1, v_2, v_3} ל-{v_1, v_2, v_3}',
    ],
  },

  {
    id: 6,
    rank: 6,
    name: 'קיום/אי-קיום של העתקה ליניארית',
    category: 'transformation',
    source: 'מועד א 2025 שאלה 2.2',
    difficulty: 'medium',
    techniqueSlug: 'lt-existence',
    prompt:
      'הוכח או הפרך: קיים אופרטור ליניארי S: R_2[x] → R_2[x] עם:\nS(1+2x−x²) = 1+x, S(2−x+x²) = x², S(−5x²+7x−4) = 1−x+x².',
    whyTop:
      'נשאל ב-מועד א 2025. תבנית: בודקים אם הוקטורים בקלט תלויים, ואז דורשים את אותו יחס בפלט.',
    solution: [
      {
        step: 1,
        text: 'מחפשים יחס ליניארי בין שלושת הוקטורים בקלט: האם קיימים α, β כך ש-α(1+2x−x²) + β(2−x+x²) = −5x²+7x−4?',
      },
      {
        step: 2,
        text: 'משוואות: α + 2β = −4, 2α − β = 7, −α + β = −5. פותרים: 2α−β=7 ו−α+β=−5 ⟹ α=2, β=−3. בודקים: 2+2(−3)=−4 ✓.',
      },
      {
        step: 3,
        text: 'לכן בקלט: 2(1+2x−x²) − 3(2−x+x²) = −5x²+7x−4.',
      },
      {
        step: 4,
        text: 'אם S קיימת לינארית, אז גם בפלט: S(−5x²+7x−4) = 2·S(1+2x−x²) − 3·S(2−x+x²) = 2(1+x) − 3(x²) = 2 + 2x − 3x².',
      },
      {
        step: 5,
        text: 'אבל מהנתון S(−5x²+7x−4) = 1−x+x² ≠ 2+2x−3x². סתירה ⟹ S לא קיימת. ∎',
      },
    ],
    template:
      '1. בדוק האם וקטורי הקלט בת"ל. 2. אם תלויים — מצא יחס. 3. החל את היחס על הפלט בלינאריות. 4. השווה לתוצאה הנדרשת. 5. אם וקטורי הקלט בת"ל — ההעתקה תמיד קיימת (משפט: ניתן לקבוע על בסיס).',
    traps: [
      'לא לבדוק אם הקלטים תלויים — שגיאה גדולה',
      'לדלג על אישור מספרי של היחס',
      'בלינאריות: T(α v + β u) = α T(v) + β T(u) — לא לטעות בסימנים',
    ],
  },

  {
    id: 7,
    rank: 7,
    name: 'מימד החיתוך של שני (n−1)-תתי-מרחב',
    category: 'subspace-dim',
    source: 'מועד א 2025 שאלה 4.2',
    difficulty: 'hard',
    techniqueSlug: 'subspace-intersection',
    prompt:
      'יהיו V מ"ו ממימד n ≥ 2 מעל F, ויהיו U, W תתי-מרחב כך ש-U ≠ W ו-dim U = dim W = n−1. הוכח dim(U ∩ W) = n − 2.',
    whyTop:
      'נשאל ב-מועד א 2025. שילוב משפט המימדים + טענת dim W = dim V ⟹ W = V.',
    solution: [
      {
        step: 1,
        text: 'משפט המימדים הראשון: dim(U+W) = dim U + dim W − dim(U∩W) = 2(n−1) − dim(U∩W) = 2n − 2 − dim(U∩W).',
      },
      {
        step: 2,
        text: 'מכיוון ש-U+W ⊆ V: dim(U+W) ≤ n. לכן 2n − 2 − dim(U∩W) ≤ n ⟹ dim(U∩W) ≥ n − 2.',
      },
      {
        step: 3,
        text: 'גם U ∩ W ⊆ U ⟹ dim(U∩W) ≤ dim U = n−1. לכן n−2 ≤ dim(U∩W) ≤ n−1.',
      },
      {
        step: 4,
        text: 'נניח בשלילה ש-dim(U∩W) = n−1. אז U∩W ⊆ U ו-dim(U∩W) = dim U = n−1 ⟹ U∩W = U. דומה: U∩W = W. לכן U = W — סתירה לנתון U ≠ W.',
      },
      {
        step: 5,
        text: 'לכן dim(U ∩ W) = n − 2. ∎',
      },
    ],
    template:
      '1. משפט המימדים הראשון. 2. dim(sum) ≤ dim(V) → חסם תחתון על dim(intersection). 3. intersection ⊆ each → חסם עליון. 4. שלילה על השוויון ⟹ intersection = U = W → סתירה.',
    traps: [
      'לא לציטט את משפט המימדים בשם',
      'לא להשתמש ב-dim W = dim V ⟹ W = V (טענה 8 בטופ)',
      'לא לטעון שחיתוך תת-מרחב הוא תת-מרחב',
    ],
  },

  {
    id: 8,
    rank: 8,
    name: 'דטרמיננטה של מטריצה כללית 4×4 בדירוג',
    category: 'determinant',
    source: 'HW10-11',
    difficulty: 'medium',
    techniqueSlug: 'determinant-row-reduction',
    prompt:
      'חשב det של A = [[2,1,3,1],[0,1,2,3],[1,0,1,1],[3,2,5,4]] באמצעות פעולות שורה (משולשית).',
    whyTop:
      'תבנית עבודה: לדרג למשולשית, לעקוב אחר משפט (*), ולקרוא det כמכפלת האלכסון. תבנית סטנדרטית בכל מועד.',
    solution: [
      {
        step: 1,
        text: 'R_1 ↔ R_3 (החלפת שורות → ×(−1)):',
        math:
          '[1 0 1 1]\n[0 1 2 3]\n[2 1 3 1]\n[3 2 5 4]',
      },
      {
        step: 2,
        text: 'R_3 → R_3 − 2R_1, R_4 → R_4 − 3R_1 (לא משנה det):',
        math:
          '[1 0 1 1]\n[0 1 2 3]\n[0 1 1 −1]\n[0 2 2 1]',
      },
      {
        step: 3,
        text: 'R_3 → R_3 − R_2, R_4 → R_4 − 2R_2:',
        math:
          '[1 0 1 1]\n[0 1 2 3]\n[0 0 −1 −4]\n[0 0 −2 −5]',
      },
      {
        step: 4,
        text: 'R_4 → R_4 − 2R_3:',
        math:
          '[1 0 1 1]\n[0 1 2 3]\n[0 0 −1 −4]\n[0 0 0  3]',
      },
      {
        step: 5,
        text: 'det(משולשית) = 1·1·(−1)·3 = −3. עקבנו אחר החלפה אחת בלבד → det(A) = (−1)·(−3) = 3.',
      },
    ],
    template:
      '1. דרג למשולשית. 2. עקוב אחר כל פעולה: כפל שורה ב-c → ×c, החלפה → ×(−1), הוספת כפולה → לא משנה. 3. det = (−1)^swaps · (∏ c_i)⁻¹ · ∏(אלכסון).',
    traps: [
      'לשכוח לעקוב אחר החלפות שורות',
      'לחלק שורה מבלי לחשב את המכפיל ההפוך',
      'להשתמש בפעולת עמודה בלי להתאים את הסימן',
    ],
  },

  {
    id: 9,
    rank: 9,
    name: 'סימטרית/אנטי-סימטרית: מכפלות',
    category: 'matrices',
    source: 'מועד א 2025 שאלה 1.2',
    difficulty: 'easy',
    techniqueSlug: 'symmetric-skew',
    prompt:
      'יהיו A, B ∈ M_n(R), A סימטרית ו-B אנטי-סימטרית. הוכח או הפרך: (A+B)(A−B) סימטרית.',
    whyTop:
      'נשאל ב-מועד א 2025. דוגמה לחישוב טרנספוז עם תכונות הסימטריה. שאלת 8 נקודות פשוטה.',
    solution: [
      {
        step: 1,
        text: 'נכון. נחשב את הטרנספוז של (A+B)(A−B).',
      },
      {
        step: 2,
        text: '[(A+B)(A−B)]^t = (A−B)^t · (A+B)^t (היפוך הסדר!) = (A^t − B^t)(A^t + B^t).',
      },
      {
        step: 3,
        text: 'A סימטרית ⟹ A^t = A. B אנטי-סימטרית ⟹ B^t = −B. לכן: (A^t − B^t)(A^t + B^t) = (A − (−B))(A + (−B)) = (A+B)(A−B).',
      },
      {
        step: 4,
        text: 'קיבלנו [(A+B)(A−B)]^t = (A+B)(A−B) ⟹ סימטרית. ∎',
      },
    ],
    template:
      '1. כתוב טרנספוז של מכפלה (היפוך סדר!). 2. החלף תכונות סימטריה. 3. קבל ערך השווה למקור / מינוסו.',
    traps: [
      'שכחה (AB)^t = B^t A^t (היפוך)',
      'לבלבל בין סימטרית לאנטי-סימטרית',
      'לא להעלות את −B לסימן',
    ],
  },

  {
    id: 10,
    rank: 10,
    name: 'תת-מרחב ב-F[x]: קבוצת פולינומים מקיימים תנאי',
    category: 'polynomial',
    source: 'HW5 + HW9',
    difficulty: 'medium',
    techniqueSlug: 'polynomial-subspace',
    prompt:
      'תהי U = {p ∈ R_3[x] | p(1) = 0 ו-p\'(0) = 0}. הוכח ש-U תת-מרחב של R_3[x], ומצא בסיס ומימד.',
    whyTop:
      'תבנית: תת-מרחב מוגדר ע"י משוואות ליניאריות → אפשר לפתור כמערכת על המקדמים. מופיע ברגיל ב-מועד ב.',
    solution: [
      {
        step: 1,
        text: 'יהי p(x) = a + bx + cx² + dx³ ב-R_3[x]. p(1) = a+b+c+d = 0. p\'(x) = b + 2cx + 3dx², ולכן p\'(0) = b = 0.',
      },
      {
        step: 2,
        text: 'תנאים: b = 0 ו-a+c+d = 0 (אחרי הצבת b=0). לכן a = −c−d, b = 0, c, d חופשיים.',
      },
      {
        step: 3,
        text: 'כל p ∈ U: p(x) = (−c−d) + 0·x + cx² + dx³ = c(−1+x²) + d(−1+x³).',
      },
      {
        step: 4,
        text: 'תת-מרחב: U הוא span{−1+x², −1+x³} → תת-מרחב.',
      },
      {
        step: 5,
        text: 'בת"ל: c(−1+x²) + d(−1+x³) = 0 ⟺ −c−d = 0, c = 0, d = 0 ⟹ c = d = 0. לכן בסיס.',
      },
      {
        step: 6,
        text: 'בסיס: {−1+x², −1+x³}, dim U = 2. ∎',
      },
    ],
    template:
      '1. כתוב פולינום כללי במקדמים. 2. תרגם תנאים למשוואות במקדמים. 3. פתור מערכת → זיהוי משתנים חופשיים. 4. החזר לפולינומים → בסיס.',
    traps: [
      'לבלבל בין R_n[x] (דרגה ≤ n, n+1 מקדמים)',
      'להבחין בין p(c)=0 (הצבה) לבין p\'(c)=0 (נגזרת)',
      'לא להוכיח בסיס בשתי הדרכים: בת"ל + פורש',
    ],
  },
];

export function getHomeworkByCategory(c: HomeworkCategory): TopHomework[] {
  return topHomework.filter((h) => h.category === c);
}

export function getHomeworkByRank(rank: number): TopHomework | undefined {
  return topHomework.find((h) => h.rank === rank);
}
