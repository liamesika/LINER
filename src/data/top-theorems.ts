// Top 10 theorems + proofs to memorize for Linear Algebra 1, Moed B 2025-26.
// Selection rationale: Tier-1/Tier-2 from MOED_B_THEOREM_ANALYSIS_FINAL + dimension/U+W formula
// + transpose preserves det + unique-representation theorem (frequent on past Moed B exams).
//
// Proofs are written verbatim from lectures wherever possible (no shortcuts) so the user
// can memorize them word-for-word. Each entry is split into:
//   - statement: short formal statement
//   - whyAsked:  one-line "why this is likely" hook
//   - proof:     numbered steps (lecture-faithful, no compressed rewrites)
//   - traps:     common mistakes / things examiners deduct points for

export type TheoremCategory =
  | 'rank'
  | 'invertibility'
  | 'dimension'
  | 'basis'
  | 'determinant'
  | 'span'
  | 'subspace';

export interface TopTheorem {
  id: number;
  rank: number;                    // 1 = highest priority
  probability: number;             // 0–100
  tier: 1 | 2 | 3;
  name: string;                    // Hebrew display name
  nameEn: string;
  category: TheoremCategory;
  lecture: string;                 // origin lectures
  statement: string;               // formal statement (math, LTR)
  preconditions: string;           // conditions to state when invoking
  whyAsked: string;                // 1-line hook
  proof: { step: number; text: string; math?: string }[];
  keyLemmas: string[];             // prior results used
  traps: string[];                 // examiners' favorite point-deductions
  variants: string[];              // exam-style variations of the question
}

export const topTheorems: TopTheorem[] = [
  {
    id: 1,
    rank: 1,
    probability: 95,
    tier: 1,
    name: 'משפט הדרגה (Rank-Nullity)',
    nameEn: 'Rank-Nullity Theorem',
    category: 'rank',
    lecture: 'הרצאות 13-18',
    statement: 'rank(A) + dim(NulA) = n',
    preconditions: 'A ∈ M_{m×n}(F), n = מספר העמודות',
    whyAsked:
      'לא נשאל ב-מועד א 2025. מקשר בין מערכות, מימד ודרגה — כמעט תמיד מופיע ב-מועד ב.',
    proof: [
      {
        step: 1,
        text: 'מדרגים את A לצורה הקנונית C ע"י פעולות שורה אלמנטריות. נסמן k = rank(A) = מספר המקדמים המובילים ב-C.',
      },
      {
        step: 2,
        text: 'מספר המשתנים הקשורים = k. מספר המשתנים החופשיים = n − k.',
      },
      {
        step: 3,
        text: 'בונים בסיס ל-NulA: לכל משתנה חופשי במקום j, מציבים x_j = 1 והאחרים = 0, ומחשבים את המשתנים הקשורים מהמשוואות.',
      },
      {
        step: 4,
        text: 'מקבלים n − k וקטורים. הם בת"ל: כל וקטור שונה מהאחרים במקום אחד שבו הוא 1 והאחרים 0.',
      },
      {
        step: 5,
        text: 'כל פתרון של Ax̄ = 0̄ הוא צירוף ליניארי של הוקטורים האלו (לפי בחירת ערכים למשתנים החופשיים), לכן הם פורשים את NulA.',
      },
      {
        step: 6,
        text: 'לכן הם בסיס ל-NulA, ומכאן dim(NulA) = n − k. סה"כ: rank(A) + dim(NulA) = k + (n−k) = n. ∎',
      },
    ],
    keyLemmas: [
      'יחידות הצורה הקנונית',
      'פעולות שורה לא משנות את NulA',
      'משתנה חופשי = עמודה ללא מקדם מוביל',
    ],
    traps: [
      'לא לציין n = מספר העמודות (לא השורות!)',
      'לא להוכיח שהוקטורים בת"ל ופורשים — שני התנאים נדרשים',
      'להניח ש-A ריבועית — המשפט נכון לכל m×n',
    ],
    variants: [
      'הוכח: אם m < n אז Ax̄ = 0̄ יש פתרון לא טריוויאלי (דרך rank ≤ m < n)',
      'הוכח: אם A ∈ M_n(F) ו-Ax̄ = 0̄ יש רק פתרון טריוויאלי, אז A הפיכה',
    ],
  },

  {
    id: 2,
    rank: 2,
    probability: 90,
    tier: 1,
    name: 'משפט שקילויות ההפיכות',
    nameEn: 'Invertibility Equivalence Table',
    category: 'invertibility',
    lecture: 'הרצאות 16-18',
    statement: 'עבור A ∈ M_n(F), כל התנאים הבאים שקולים זה לזה',
    preconditions: 'A ∈ M_n(F), F שדה',
    whyAsked:
      'מועד א בדק חלקים בלבד; טבלת השקילויות המלאה נשארה — מועד ב אוהב את זה. כל זוג תנאים יכול להישאל.',
    proof: [
      {
        step: 1,
        text: 'התנאים השקולים: (i) A הפיכה ⟺ (ii) rank(A) = n ⟺ (iii) det(A) ≠ 0 ⟺ (iv) עמודות A בת"ל ⟺ (v) עמודות A בסיס ל-F^n ⟺ (vi) Ax̄ = 0̄ רק טריוויאלי ⟺ (vii) NulA = {0̄} ⟺ (viii) ColA = F^n ⟺ (ix) A מכפלה של מטריצות אלמנטריות.',
      },
      {
        step: 2,
        text: '(i)⇒(ii): A הפיכה ⟹ A שקולת שורה ל-I_n ⟹ הצורה הקנונית של A היא I_n ⟹ n מקדמים מובילים ⟹ rank(A)=n.',
      },
      {
        step: 3,
        text: '(ii)⇒(v): n מקדמים מובילים ⟹ עמודות A הן n וקטורים בת"ל ב-F^n. dim(F^n)=n, ולפי משפט השלוש: n וקטורים בת"ל במ"ו ממימד n הם בסיס.',
      },
      {
        step: 4,
        text: '(v)⇒(vi): אם עמודות A בסיס, הצירוף הליניארי היחיד ש-=0̄ הוא הטריוויאלי. אבל Ax̄ = x_1 C̄_1 + ... + x_n C̄_n, לכן Ax̄ = 0̄ ⟹ x̄ = 0̄.',
      },
      {
        step: 5,
        text: '(vi)⇒(vii): NulA = {x̄ : Ax̄=0̄} = {0̄}.',
      },
      {
        step: 6,
        text: '(vii)⇒(i): מ-rank-nullity, dim(NulA)=0 ⟹ rank(A)=n ⟹ הצורה הקנונית של A היא I_n ⟹ קיימות E_1,...,E_k כך ש E_k···E_1·A = I_n ⟹ A הפיכה משמאל. הוכחה דומה מ-A^t (rank A^t = n) נותנת הפיכות מימין. לכן A הפיכה.',
      },
      {
        step: 7,
        text: '(i)⇒(iii): A הפיכה ⟹ A·A⁻¹ = I_n ⟹ det(A)·det(A⁻¹) = 1 ⟹ det(A) ≠ 0. הכיוון השני: אם det(A)≠0, A לא ניתנת לדירוג לשורת אפסים, לכן הצורה הקנונית = I_n, לכן הפיכה. ∎',
      },
    ],
    keyLemmas: [
      'משפט הדרגה (Rank-Nullity)',
      'משפט השלוש (dim V = n)',
      'det(AB) = det(A)·det(B)',
      'Ax̄ = x_1 C̄_1 + ... + x_n C̄_n',
    ],
    traps: [
      'לא לבנות שרשרת מעגלית — להוכיח לפחות 4-5 כיוונים',
      'לא לציין F שדה / A ריבועית',
      'לא להבחין בין הפיכות משמאל / מימין',
    ],
    variants: [
      'הוכח: A הפיכה ⟺ עמודות A בסיס ל-F^n',
      'הוכח: A הפיכה ⟺ det(A) ≠ 0',
      'הוכח: A הפיכה ⟺ Ax̄ = b̄ פתיר יחיד לכל b̄',
    ],
  },

  {
    id: 3,
    rank: 3,
    probability: 85,
    tier: 1,
    name: 'משפט השלוש (dim V = n)',
    nameEn: 'The Three Theorems',
    category: 'dimension',
    lecture: 'הרצאות 13-18',
    statement:
      'אם dim V = n ויהיו v_1,...,v_n ∈ V, אז שלושת התנאים שקולים: (1) בסיס, (2) בת"ל, (3) פורשים.',
    preconditions: 'V מ"ו נוצר סופית מעל F, dim V = n, יש לנו בדיוק n וקטורים',
    whyAsked: 'לא נשאל ב-מועד א 2025. מסתמך על הקורולרים החזקים של מימד.',
    proof: [
      {
        step: 1,
        text: '(1)⇒(2): לפי הגדרת בסיס.',
      },
      {
        step: 2,
        text: '(2)⇒(3) בשלילה: נניח v_1,...,v_n בת"ל אך לא פורשים. אז קיים v ∈ V, v ∉ span{v_1,...,v_n}. נטען ש-v_1,...,v_n,v בת"ל: יהיו α_1,...,α_n,β סקלרים כך ש α_1 v_1 + ... + α_n v_n + β v = 0_V. אם β≠0, אז v = (-1/β)(α_1 v_1 + ... + α_n v_n) ∈ span{v_1,...,v_n} — סתירה. לכן β=0. אז α_1 v_1 + ... + α_n v_n = 0_V, ומכיוון ש-v_1,...,v_n בת"ל גם α_1=...=α_n=0. אז v_1,...,v_n,v הם n+1 וקטורים בת"ל ב-V — סתירה למסקנה ש-dim V = n ⟹ כל n+1 וקטורים ת"ל. ∎',
      },
      {
        step: 3,
        text: '(3)⇒(1) בשלילה: נניח v_1,...,v_n פורשים אך ת"ל. אז קיים j כך ש v_j ∈ span{v_1,...,v_{j-1}, v_{j+1},...,v_n}. לכן span{v_1,...,v_n} = span{v_1,...,v_{j-1}, v_{j+1},...,v_n} = V — וכך n−1 וקטורים פורשים את V. אבל לפי המסקנה: dim V = n ⟹ כל n−1 וקטורים אינם פורשים — סתירה. ∎',
      },
    ],
    keyLemmas: [
      'מסקנה 1: dim V = n ⟹ כל n+1 וקטורים ת"ל',
      'מסקנה 2: dim V = n ⟹ n−1 וקטורים לא פורשים',
      'למת שטיינל (Steinitz)',
    ],
    traps: [
      'לא לכתוב את הסתירה במפורש — חייב לציין איזה משפט/מסקנה הופר',
      'לבלבל בין n וקטורים ל-n+1 / n−1',
      'לא לבדוק ש-V נוצר סופית',
    ],
    variants: [
      'הוכח: אם dim V = n ו-v_1,...,v_n בת"ל, אז הם בסיס',
      'הוכח: כל קבוצה בת"ל ניתן להשלים לבסיס',
    ],
  },

  {
    id: 4,
    rank: 4,
    probability: 75,
    tier: 1,
    name: 'מולטיפליקטיביות הדטרמיננטה',
    nameEn: 'det(AB) = det(A)·det(B)',
    category: 'determinant',
    lecture: 'הרצאות 20-23',
    statement: 'det(AB) = det(A) · det(B)',
    preconditions: 'A, B ∈ M_n(F)',
    whyAsked:
      'הוכחה דרך פיצול למקרים. לא הוכח ב-מועד א 2025 (רק חישבו דטרמיננטות).',
    proof: [
      {
        step: 1,
        text: 'מקרה 1 — B אינה הפיכה: אז rank(B) < n, ולכן rank(AB) ≤ rank(B) < n, ומכאן AB אינה הפיכה. לכן det(AB) = 0 = det(A)·0 = det(A)·det(B). ✓',
      },
      {
        step: 2,
        text: 'מקרה 2 — B הפיכה: B מתפרקת למכפלת מטריצות אלמנטריות B = E_1·E_2·...·E_k.',
      },
      {
        step: 3,
        text: 'הלמה (חייב לצטט!): לכל E אלמנטרית ולכל A: det(EA) = det(E)·det(A). זה נובע מתכונת המעבר של דטרמיננטה תחת פעולת שורה.',
      },
      {
        step: 4,
        text: 'נחשב: det(AB) = det(A·E_1·E_2·...·E_k). נשתמש בלמה k פעמים מימין: det(A·E_1·E_2·...·E_k) = det(A·E_1·E_2·...·E_{k-1})·det(E_k) = ... = det(A)·det(E_1)·det(E_2)·...·det(E_k).',
      },
      {
        step: 5,
        text: 'מצד שני, det(B) = det(E_1·...·E_k) = det(E_1)·...·det(E_k) (אותה למה, החל מ-A=I_n). לכן det(AB) = det(A)·det(B). ∎',
      },
    ],
    keyLemmas: [
      'rank(AB) ≤ rank(B) ו-rank(AB) ≤ rank(A)',
      'A הפיכה ⟺ A מכפלת מטריצות אלמנטריות',
      'A לא הפיכה ⟺ det(A) = 0',
      'det(EA) = det(E)·det(A) עבור E אלמנטרית',
    ],
    traps: [
      'לא לפצל למקרים (חובה!)',
      'להחליף בין AB ל-BA — הסדר חשוב',
      'לא להוכיח שגם B מתפרק לאלמנטריות (זו תכונה של מטריצה הפיכה)',
    ],
    variants: [
      'הוכח: אם A,B ∈ M_n(F) הפיכות אז AB הפיכה',
      'הוכח: det(A^k) = (det A)^k',
    ],
  },

  {
    id: 5,
    rank: 5,
    probability: 70,
    tier: 2,
    name: 'דרגת שורות = דרגת עמודות = דרגה',
    nameEn: 'Row Rank = Column Rank = Rank',
    category: 'rank',
    lecture: 'הרצאות 13-18',
    statement: 'dim(ColA) = dim(RowA) = rank(A)',
    preconditions: 'A ∈ M_{m×n}(F)',
    whyAsked: 'לא נשאל ב-מועד א 2025. מקשר בין מרחב שורות ועמודות.',
    proof: [
      {
        step: 1,
        text: 'חלק 1 — dim(RowA) = rank(A): מדרגים את A לצורה הקנונית C. פעולות שורה לא משנות את RowA, כלומר RowA = RowC.',
      },
      {
        step: 2,
        text: 'השורות הלא-אפס של C הן בת"ל (כל אחת מתחילה בעמודה ייחודית עם 1) ופורשות את RowC. לכן הן בסיס ל-RowC.',
      },
      {
        step: 3,
        text: 'מספר השורות הלא-אפס = מספר המקדמים המובילים = rank(A). לכן dim(RowA) = rank(A). ✓',
      },
      {
        step: 4,
        text: 'חלק 2 — dim(ColA) = rank(A): נסמן ב-j_1 < j_2 < ... < j_k את אינדקסי העמודות בעלות מקדם מוביל בצורה הקנונית C. נטען שעמודות A באינדקסים אלו (C̄_{j_1},...,C̄_{j_k}) הן בסיס ל-ColA.',
      },
      {
        step: 5,
        text: 'בת"ל: צירוף ליניארי שלהן = 0̄ אמ"מ הצירוף המתאים של עמודות C באינדקסים אלו = 0̄ (פעולות שורה משמרות יחסי תלות בין עמודות). העמודות המובילות של C הן e_1,...,e_k (וקטורי הסטנדרט הראשונים של F^m), שכמובן בת"ל.',
      },
      {
        step: 6,
        text: 'פורשים: כל עמודה אחרת C̄_j (j ∉ {j_1,...,j_k}) ניתנת לכתיבה כצירוף ליניארי של עמודות C המובילות (לפי הצורה הקנונית). אותו צירוף עובד עבור עמודות A. לכן ColA = span{C̄_{j_1},...,C̄_{j_k}}.',
      },
      {
        step: 7,
        text: 'לכן dim(ColA) = k = rank(A). ∎',
      },
    ],
    keyLemmas: [
      'פעולות שורה משמרות RowA',
      'פעולות שורה משמרות יחסי תלות בין עמודות',
      'בצורה הקנונית: שורות לא-אפס בת"ל; עמודות מובילות בת"ל',
    ],
    traps: [
      'לא להבחין שעמודות C ≠ עמודות A — היחסים הליניאריים שווים, אבל הוקטורים שונים',
      'להניח ש-A ריבועית',
      'לא לציין dim(F^m) ו-dim(F^n) — Col⊆F^m, Row⊆F^n',
    ],
    variants: [
      'הוכח: rank(A) = rank(A^t)',
      'הוכח: פעולות שורה לא משנות את RowA',
    ],
  },

  {
    id: 6,
    rank: 6,
    probability: 70,
    tier: 2,
    name: 'למת ההחלפה של שטיינל',
    nameEn: 'Steinitz Exchange Lemma',
    category: 'basis',
    lecture: 'הרצאות 11-12',
    statement:
      'אם {v_1,...,v_k} בסיס ו-{w_1,...,w_m} פורשים את V, אז k ≤ m. בפרט: כל שני בסיסים של V באותו גודל.',
    preconditions: 'V מ"ו, {v_1,...,v_k} בסיס, {w_1,...,w_m} פורש',
    whyAsked: 'יסוד תורת המימד. לא נשאל ב-מועד א 2025.',
    proof: [
      {
        step: 1,
        text: 'בשלילה: נניח k > m.',
      },
      {
        step: 2,
        text: 'מכיוון ש-{w_1,...,w_m} פורש את V ו-v_1 ∈ V, ניתן לכתוב v_1 = α_1 w_1 + ... + α_m w_m. v_1 ≠ 0_V (כי הוא חלק מבסיס), לכן לפחות α_j אחד אינו 0. נחליף את w_j ב-v_1: S_1 = {v_1, w_1, ..., ŵ_j, ..., w_m} — הקבוצה עדיין פורשת (כי w_j = (1/α_j)·(v_1 − Σ_{i≠j} α_i w_i) ∈ span(S_1)).',
      },
      {
        step: 3,
        text: 'נמשיך באינדוקציה: בשלב i, יש לנו S_i = {v_1,...,v_i, w_{σ(1)},...,w_{σ(m-i)}} פורש. כותבים v_{i+1} כצירוף, ומכיוון ש-v_1,...,v_{i+1} בת"ל, לפחות אחד המקדמים של ה-w-ים הוא לא 0. מחליפים את אותו w ב-v_{i+1}.',
      },
      {
        step: 4,
        text: 'לאחר m צעדים: S_m = {v_1, v_2, ..., v_m} פורשת את V (כל ה-w-ים הוחלפו).',
      },
      {
        step: 5,
        text: 'מכיוון ש-k > m, קיים v_{m+1} בבסיס שעדיין לא הוחלף. v_{m+1} ∈ V = span{v_1,...,v_m}, ולכן v_{m+1} צירוף ליניארי של v_1,...,v_m — סתירה לבת"ל של {v_1,...,v_k}. ∎',
      },
      {
        step: 6,
        text: 'מסקנה (כל שני בסיסים שווי גודל): יהיו B_1 (גודל k), B_2 (גודל m) שני בסיסים. B_1 בסיס ו-B_2 פורש ⟹ k ≤ m. B_2 בסיס ו-B_1 פורש ⟹ m ≤ k. לכן k = m. ∎',
      },
    ],
    keyLemmas: [
      'אם α_j ≠ 0 ניתן לבטא את w_j מ-(v_1, w_1,...,w_m)',
      'span נשמר תחת החלפת איבר ב-LC חוקי',
    ],
    traps: [
      'לא להראות ש-α_j ≠ 0 קיים — חייב לנמק (כי v_1 ≠ 0_V)',
      'לדלג על ההכללה האינדוקטיבית',
      'לא לסיים בסתירה הסופית — צריך להגיד "v_{m+1} ∈ span{v_1,...,v_m} סותר בת"ל"',
    ],
    variants: [
      'הוכח: כל שני בסיסים של V הם באותו גודל',
      'הוכח: |LI set| ≤ |spanning set|',
    ],
  },

  {
    id: 7,
    rank: 7,
    probability: 65,
    tier: 2,
    name: 'משפט המימדים הראשון',
    nameEn: 'First Dimension Theorem (U+W)',
    category: 'dimension',
    lecture: 'הרצאות 13-18',
    statement: 'dim(U + W) = dim U + dim W − dim(U ∩ W)',
    preconditions: 'U, W תתי-מרחב של V נוצר סופית',
    whyAsked:
      'נשאל ב-מועד א 2025 שאלה 4.2 (dim(U∩W)=n−2). יכול להופיע שוב בצורה שונה.',
    proof: [
      {
        step: 1,
        text: 'נסמן d = dim(U ∩ W). יהי {u_1,...,u_d} בסיס ל-U ∩ W.',
      },
      {
        step: 2,
        text: 'משפט ההשלמה: ניתן להשלים אותו לבסיס של U: {u_1,...,u_d, x_1,...,x_p} בסיס ל-U, כאשר dim U = d + p.',
      },
      {
        step: 3,
        text: 'דומה: {u_1,...,u_d, y_1,...,y_q} בסיס ל-W, כאשר dim W = d + q.',
      },
      {
        step: 4,
        text: 'נטען ש-B = {u_1,...,u_d, x_1,...,x_p, y_1,...,y_q} בסיס ל-U + W.',
      },
      {
        step: 5,
        text: 'פורש: כל v ∈ U+W נכתב v = u + w עם u ∈ U, w ∈ W. u הוא LC של {u_i, x_j}, w הוא LC של {u_i, y_k}, לכן v הוא LC של B.',
      },
      {
        step: 6,
        text: 'בת"ל: נניח Σ α_i u_i + Σ β_j x_j + Σ γ_k y_k = 0_V. אז Σ γ_k y_k = -(Σα_i u_i + Σβ_j x_j) ∈ U. גם Σ γ_k y_k ∈ W (LC של y-ים). לכן Σ γ_k y_k ∈ U ∩ W.',
      },
      {
        step: 7,
        text: 'אבל {u_1,...,u_d, y_1,...,y_q} בסיס ל-W. אם Σ γ_k y_k ∈ U ∩ W ⊆ U, ניתן לכתוב Σ γ_k y_k = Σ δ_i u_i. מהיותם בסיס ל-W: γ_k = 0 לכל k.',
      },
      {
        step: 8,
        text: 'נשאר Σ α_i u_i + Σ β_j x_j = 0_V. {u_i, x_j} בסיס ל-U ⟹ α_i = β_j = 0 לכל i,j. לכן B בת"ל.',
      },
      {
        step: 9,
        text: '|B| = d + p + q = (d+p) + (d+q) − d = dim U + dim W − dim(U∩W). ∎',
      },
    ],
    keyLemmas: [
      'משפט ההשלמה לבסיס',
      'U ∩ W ⊆ U ∩ W וגם ⊆ U וגם ⊆ W',
      'U + W = span(B_U ∪ B_W)',
    ],
    traps: [
      'לא להראות שהקבוצה M פורשת',
      'הטעות הגדולה: לדלג על הצעד שבו Σγ_k y_k ∈ U ∩ W',
      'לא להניח ש-V נוצר סופית',
    ],
    variants: [
      'הוכח: אם U⊕W אז dim(U+W) = dim U + dim W',
      'הוכח: שני (n−1)-מימדיים שונים → dim(U∩W) = n − 2 (מועד א 2025)',
    ],
  },

  {
    id: 8,
    rank: 8,
    probability: 60,
    tier: 2,
    name: 'תת-מרחב באותו מימד = שווה',
    nameEn: 'dim W = dim V ⟹ W = V',
    category: 'subspace',
    lecture: 'הרצאות 13-18',
    statement: 'אם W תת-מרחב של V נוצר סופית, אז dim W ≤ dim V; ושוויון מתקיים אמ"מ W = V.',
    preconditions: 'V נוצר סופית, W ≤ V (תת-מרחב)',
    whyAsked:
      'מופיע פעמים רבות בשאלות על dim(U+W), שאלות נכון/לא נכון, וכשמסיקים ש-2 תתי-מרחבים שווים.',
    proof: [
      {
        step: 1,
        text: 'V נוצר סופית, dim V = n. נטען ש-W גם נוצר סופית: כל קבוצה בת"ל ב-W היא גם בת"ל ב-V, ולכן בגודל ≤ n. נבחר קבוצה בת"ל ב-W בגודל מקסימלי k ≤ n.',
      },
      {
        step: 2,
        text: 'נטען שהיא פורשת את W: יהי w ∈ W. אם w ∉ span{w_1,...,w_k} אז {w_1,...,w_k, w} בת"ל ב-W בגודל k+1 — סתירה למקסימליות. לכן w ∈ span{w_1,...,w_k}. אז w_1,...,w_k בסיס ל-W ו-dim W = k ≤ n = dim V.',
      },
      {
        step: 3,
        text: 'אם dim W = dim V = n: יהי B_W = {w_1,...,w_n} בסיס ל-W. הוא בת"ל ב-V. לפי משפט השלוש (dim V = n + n וקטורים בת"ל), B_W בסיס גם ל-V.',
      },
      {
        step: 4,
        text: 'לכן V = span(B_W) ⊆ W ⊆ V, ומכאן W = V. ∎',
      },
      {
        step: 5,
        text: 'הכיוון השני (W = V ⟹ dim W = dim V): טריוויאלי.',
      },
    ],
    keyLemmas: [
      'משפט השלוש (Three Theorems)',
      'W ≤ V ⟹ כל בת"ל ב-W בת"ל ב-V',
      'V נוצר סופית ⟹ W נוצר סופית',
    ],
    traps: [
      'לא להוכיח קודם ש-W נוצר סופית',
      'לא לצטט את משפט השלוש בצעד 3',
    ],
    variants: [
      'הוכח: אם U ⊆ W ו-dim U = dim W (סופי) אז U = W',
      'הוכח: V מ"ו ממימד n, W ≤ V — אם dim W = n אז W = V',
    ],
  },

  {
    id: 9,
    rank: 9,
    probability: 55,
    tier: 2,
    name: 'det(Aᵗ) = det(A)',
    nameEn: 'Determinant Invariance under Transpose',
    category: 'determinant',
    lecture: 'הרצאות 20-23',
    statement: 'det(A^t) = det(A) לכל A ∈ M_n(F)',
    preconditions: 'A ∈ M_n(F)',
    whyAsked:
      'משמש להסיק שתכונות שורות תקפות גם לעמודות. הוכחה קצרה ויפה — אהובה על בוחנים.',
    proof: [
      {
        step: 1,
        text: 'מקרה 1 — A לא הפיכה: אז גם A^t לא הפיכה (הפיכות נשמרת תחת שחלוף). לכן det(A) = 0 = det(A^t). ✓',
      },
      {
        step: 2,
        text: 'מקרה 2 — A הפיכה: A = E_1·E_2·...·E_k (מכפלת אלמנטריות).',
      },
      {
        step: 3,
        text: 'A^t = (E_1·...·E_k)^t = E_k^t · E_{k-1}^t · ... · E_1^t.',
      },
      {
        step: 4,
        text: 'למה: לכל E אלמנטרית, det(E^t) = det(E). הוכחה לפי שלושת הסוגים: (i) כפל שורה: E סימטרית ⟹ E^t = E. (ii) החלפת שורות: E^t = E (שוב סימטרית). (iii) הוספת כפולה Rᵢ→Rᵢ+αRⱼ: E^t היא מטריצת ההוספה ההפוכה (Rⱼ→Rⱼ+αRᵢ), שגם לה det = 1.',
      },
      {
        step: 5,
        text: 'משתמשים במולטיפליקטיביות: det(A^t) = det(E_k^t)·...·det(E_1^t) = det(E_k)·...·det(E_1) = det(E_1)·...·det(E_k) (קומוטטיביות בשדה) = det(A). ∎',
      },
    ],
    keyLemmas: [
      'A הפיכה ⟺ A^t הפיכה',
      'A הפיכה ⟺ A מכפלת אלמנטריות',
      '(AB)^t = B^t A^t',
      'det(AB) = det(A)·det(B)',
    ],
    traps: [
      'לא לפצל למקרים',
      'לא להוכיח את הלמה לאלמנטריות',
      'לבלבל בין (E_1·...·E_k)^t = E_k^t·...·E_1^t (היפוך הסדר!)',
    ],
    variants: [
      'הוכח: rank(A) = rank(A^t) (דרך det על תתי-מטריצות)',
      'הוכח: det פיתוח לפי עמודה = פיתוח לפי שורה',
    ],
  },

  {
    id: 10,
    rank: 10,
    probability: 55,
    tier: 2,
    name: 'יחידות הייצוג (LI ⟺ ייצוג יחיד)',
    nameEn: 'Linear Independence ⟺ Unique Representation',
    category: 'span',
    lecture: 'הרצאות 10-12',
    statement:
      'v_1,...,v_k בת"ל אמ"מ לכל α_1,...,α_k, β_1,...,β_k ∈ F: α_1 v_1 + ... + α_k v_k = β_1 v_1 + ... + β_k v_k ⟹ α_i = β_i לכל i.',
    preconditions: 'V מ"ו מעל F, v_1,...,v_k ∈ V',
    whyAsked:
      'נשאל ב-מועד א 2025 שאלה 1.1.2 (15 נקודות). יכול לחזור בצורה הפוכה / שיקול דומה.',
    proof: [
      {
        step: 1,
        text: '(⇒) נניח v_1,...,v_k בת"ל. נניח α_1 v_1 + ... + α_k v_k = β_1 v_1 + ... + β_k v_k. אז (α_1 − β_1)v_1 + ... + (α_k − β_k)v_k = 0_V.',
      },
      {
        step: 2,
        text: 'מבת"ל: α_i − β_i = 0 לכל i. לכן α_i = β_i לכל i. ✓',
      },
      {
        step: 3,
        text: '(⇐) נניח שלכל ייצוג יש יחידות. נראה ש-v_1,...,v_k בת"ל. נניח α_1 v_1 + ... + α_k v_k = 0_V.',
      },
      {
        step: 4,
        text: 'אבל גם 0·v_1 + ... + 0·v_k = 0_V. לכן יש לנו שני ייצוגים של 0_V כצירוף ליניארי. מהיחידות: α_i = 0 לכל i. לכן הוקטורים בת"ל. ∎',
      },
    ],
    keyLemmas: [
      'הגדרת בת"ל',
      'אקסיומות מרחב וקטורי (חיסור)',
    ],
    traps: [
      'לא להוכיח את שני הכיוונים — זה אמ"מ',
      'לא לחסר את שני הצדדים — זה הצעד הקריטי',
      'לבלבל בין "ייצוג יחיד של 0" לבין "ייצוג יחיד של כל וקטור"',
    ],
    variants: [
      'הוכח: אם v_1,...,v_k בסיס, אז כל v ∈ V יש לו ייצוג יחיד',
      'הוכח: v_1,...,v_k בת"ל ⟺ ייצוג של 0_V יחיד',
    ],
  },
];

export function getTheoremByRank(rank: number): TopTheorem | undefined {
  return topTheorems.find((t) => t.rank === rank);
}

export function getTheoremsByCategory(category: TheoremCategory): TopTheorem[] {
  return topTheorems.filter((t) => t.category === category);
}

export function getTier1Theorems(): TopTheorem[] {
  return topTheorems.filter((t) => t.tier === 1);
}
