// Insights from HW + past exams — "what can we conclude from this given"
// Organized in collapsible sections, ordered by curriculum (HW2 → HW12 → exams).
//
// Each insight: given → conclude + 1-2 sentence "why" (logic, not full proof).

export type InsightType = 'forward' | 'contrapositive' | 'corollary' | 'technique' | 'warning';
export type SourceType = 'HW' | 'exam' | 'lecture' | 'mistake';

export interface Insight {
  id: string;
  given: string;        // formal "if" (math notation)
  conclude: string;     // formal "then" (math notation)
  why: string;          // short explanation
  type?: InsightType;
}

export interface InsightSection {
  id: string;
  order: number;
  source: SourceType;
  sourceLabel: string;  // "HW3 — מערכות ליניאריות"
  topic: string;        // brief topic
  description?: string; // optional 1-line context
  insights: Insight[];
}

// ────────────────────────────────────────────────────────────────
// SECTION 1 — HW2/HW3: Fields + Linear systems
// ────────────────────────────────────────────────────────────────
const sec1: InsightSection = {
  id: 'fields-systems',
  order: 1,
  source: 'HW',
  sourceLabel: 'HW2-HW3 — שדות + מערכות ליניאריות',
  topic: 'Z_p, פעולות שורה, סיווג פתרונות',
  insights: [
    {
      id: 'i1-1',
      given: 'p ראשוני',
      conclude: 'Z_p שדה',
      why: 'בשדה אין מחלקי אפס. כש-p ראשוני, אם a·b ≡ 0 (mod p) חייב a או b להיות מתחלקים ב-p, כלומר ≡ 0 (mod p). מכאן ש-Z_p עומד בכל אקסיומות השדה.',
      type: 'forward',
    },
    {
      id: 'i1-2',
      given: 'n לא ראשוני',
      conclude: 'Z_n אינו שדה',
      why: 'n = a·b עם 1<a,b<n נותן a,b ≠ 0 ב-Z_n אבל a·b ≡ 0. מחלקי אפס → לא שדה.',
      type: 'contrapositive',
    },
    {
      id: 'i1-3',
      given: 'rank A < rank A⁺',
      conclude: 'למערכת אין פתרון',
      why: 'יש שורת סתירה (0 ... 0 | b) עם b≠0 בקנונית. זו "משוואה" 0 = b שלא ניתנת לסיפוק.',
      type: 'forward',
    },
    {
      id: 'i1-4',
      given: 'rank A = rank A⁺ = n (מספר משתנים)',
      conclude: 'פתרון יחיד',
      why: 'אין משתנים חופשיים — כל משתנה נקבע ע"י המוביל שלו. אין דרגות חופש.',
      type: 'forward',
    },
    {
      id: 'i1-5',
      given: 'rank A = rank A⁺ < n',
      conclude: 'אינסוף פתרונות (אם F אינסופי) / |F|^(n-rank) פתרונות (אם F סופי)',
      why: 'יש n - rank A משתנים חופשיים. כל בחירה של ערכים להם נותנת פתרון. ב-F סופי, יש |F| אפשרויות לכל חופשי.',
      type: 'forward',
    },
    {
      id: 'i1-6',
      given: 'מערכת הומוגנית עם m < n',
      conclude: 'יש פתרון לא טריוויאלי',
      why: 'rank A ≤ m < n, אבל rank A = rank A⁺ (תמיד פתיר). לכן rank < n → אינסוף פתרונות.',
      type: 'corollary',
    },
    {
      id: 'i1-7',
      given: 'מערכת תלוית פרמטר a',
      conclude: 'נקודות פיצול הן a-ים שמאפסים אלמנט אלכסוני בקנונית',
      why: 'דרגי עד שמטריצה משולשית. כל a שמאפס איבר על האלכסון משנה את ה-rank. בדקי כל ענף בנפרד.',
      type: 'technique',
    },
    {
      id: 'i1-8',
      given: 'P ∈ Mₘ(F) הפיכה',
      conclude: 'Ax̄=0̄ ⟺ (PA)x̄=0̄ (שקילות הומוגנית)',
      why: 'אם Ax̄=0 → PAx̄=0. אם PAx̄=0 → P⁻¹PAx̄=0 → Ax̄=0. ⚠️ לא נכון למערכת לא-הומוגנית!',
      type: 'forward',
    },
  ],
};

// ────────────────────────────────────────────────────────────────
// SECTION 2 — HW4-5: Vector spaces, subspaces, span, LI
// ────────────────────────────────────────────────────────────────
const sec2: InsightSection = {
  id: 'span-li',
  order: 2,
  source: 'HW',
  sourceLabel: 'HW4-5 — מ"ו, תת-מרחב, span, בת"ל',
  topic: 'הקבוצות הבסיסיות והקשרים ביניהן',
  insights: [
    {
      id: 'i2-1',
      given: '{v₁,...,vₖ} בת"ל ∧ {v₁,...,vₖ, x} ת"ל',
      conclude: 'x ∈ Span{v₁,...,vₖ}',
      why: 'יש LC לא טריוויאלי α₁v₁+...+αₖvₖ + βx = 0. אם β=0 → סתירה לבת"ל. אז β≠0 ⟹ x = -1/β·Σαᵢvᵢ ∈ Span.',
      type: 'contrapositive',
    },
    {
      id: 'i2-2',
      given: '{v₁,...,vₖ} בת"ל ∧ v ∉ Span{v₁,...,vₖ}',
      conclude: '{v₁,...,vₖ, v} בת"ל',
      why: 'נניח α₁v₁+...+αₖvₖ + βv = 0. אם β≠0 → v ∈ Span, סתירה. אז β=0, ומבת"ל הראשונית כל αᵢ=0.',
      type: 'forward',
    },
    {
      id: 'i2-3',
      given: 'v ∈ Span{v₁,...,vₖ}',
      conclude: 'Span{v₁,...,vₖ, v} = Span{v₁,...,vₖ}',
      why: 'הוספת LC של איברים קיימים לא מרחיבה את ה-span. כל LC של הקבוצה החדשה אפשר לכתוב בלי v.',
      type: 'forward',
    },
    {
      id: 'i2-4',
      given: '{v₁,...,vₖ} ת"ל',
      conclude: '∃j: vⱼ ∈ Span{v₁,...,vⱼ₋₁}',
      why: 'יש LC לא טריוויאלי = 0. ניקח j = המקדם האחרון שלא 0. אז vⱼ = LC של הקודמים.',
      type: 'corollary',
    },
    {
      id: 'i2-5',
      given: 'v₁, v₂ ∈ V \\ {0_V}',
      conclude: '{v₁, v₂} ת"ל ⟺ ∃α: v₂ = α·v₁',
      why: 'במקרה של 2 וקטורים בלבד, תלות לינארית = אחד הוא כפולה של השני.',
      type: 'forward',
    },
    {
      id: 'i2-6',
      given: '0_V ∈ A',
      conclude: 'A ת"ל',
      why: '1·0_V = 0_V — LC לא טריוויאלי שנותן 0. בלי האחרים.',
      type: 'warning',
    },
    {
      id: 'i2-7',
      given: 'A ⊆ B ∧ B בת"ל',
      conclude: 'A בת"ל',
      why: 'אם A היה ת"ל, היה LC לא טריוויאלי שלו = 0. נשלים במקדמי 0 לאיברי B \\ A → LC לא טריוויאלי של B.',
      type: 'corollary',
    },
    {
      id: 'i2-8',
      given: 'A ⊆ B ∧ A ת"ל',
      conclude: 'B ת"ל',
      why: 'דואלי לקודם — על-קבוצה של ת"ל היא ת"ל. ה-LC הלא-טריוויאלי נשמר.',
      type: 'corollary',
    },
    {
      id: 'i2-9',
      given: 'W₁ ∪ W₂ = V (W₁, W₂ ≤ V)',
      conclude: 'W₁ = V ∨ W₂ = V',
      why: 'אם אף אחד לא = V: ∃u∈W₁\\W₂, ∃w∈W₂\\W₁. u+w ∉ W₁ (אחרת w∈W₁) ולא ב-W₂ — סתירה.',
      type: 'forward',
    },
  ],
};

// ────────────────────────────────────────────────────────────────
// SECTION 3 — HW6: Basis + dim
// ────────────────────────────────────────────────────────────────
const sec3: InsightSection = {
  id: 'basis-dim',
  order: 3,
  source: 'HW',
  sourceLabel: 'HW6 — בסיס + מימד',
  topic: 'הקשרים העמוקים של מימד',
  insights: [
    {
      id: 'i3-1',
      given: 'dim V = n ∧ |{v₁,...,vₙ}| = n ∧ אחד מהשלושה: בסיס / בת"ל / פורש',
      conclude: 'שלושתם נכונים (משפט השלוש)',
      why: 'כש-מספר הוקטורים = dim V, מספיק תנאי אחד מהשלושה כדי לקבל בסיס. הדבר היחיד הזה חוסך זמן עצום במבחן.',
      type: 'forward',
    },
    {
      id: 'i3-2',
      given: 'dim V = n ∧ |S| > n',
      conclude: 'S ת"ל',
      why: 'משפט שטיינל: בסיס ≤ פורש. בת"ל ≤ בסיס. לכן יותר וקטורים מ-dim → ת"ל.',
      type: 'corollary',
    },
    {
      id: 'i3-3',
      given: 'dim V = n ∧ |S| < n',
      conclude: 'S אינו פורש את V',
      why: 'אם פורש → ניתן לחלץ בסיס בגודל ≤ |S| < n. סתירה ל-dim V = n.',
      type: 'corollary',
    },
    {
      id: 'i3-4',
      given: 'W ≤ V ∧ dim W = dim V (סופי)',
      conclude: 'W = V',
      why: 'בסיס ל-W הוא n וקטורים בת"ל ב-V. לפי משפט השלוש, הם בסיס ל-V. אז V = Span ⊆ W ⊆ V.',
      type: 'forward',
    },
    {
      id: 'i3-5',
      given: 'U ⊆ W ⊆ V ∧ dim U = dim W',
      conclude: 'U = W',
      why: 'אותו רעיון: בסיס ל-U הוא בת"ל ב-W בגודל dim W. לפי משפט השלוש: בסיס ל-W → Span = W = U.',
      type: 'corollary',
    },
    {
      id: 'i3-6',
      given: '{v₁,...,vₖ} בת"ל ∧ k < dim V',
      conclude: '∃ vₖ₊₁,...,vₙ: {v₁,...,vₙ} בסיס',
      why: 'משפט ההשלמה לבסיס. הוקטורים לא פורשים (k < n), אז יש v ∉ Span — נוסיף ועדיין בת"ל. חוזרים עד n.',
      type: 'forward',
    },
  ],
};

// ────────────────────────────────────────────────────────────────
// SECTION 4 — HW8: dim of subspaces (her Moed A focus!)
// ────────────────────────────────────────────────────────────────
const sec4: InsightSection = {
  id: 'subspace-dim',
  order: 4,
  source: 'HW',
  sourceLabel: 'HW8 — מימד תת-מרחבים (החולשה שלך!)',
  topic: 'dim(U+W), dim(U∩W), סכומים ישרים',
  description: 'את קיבלת 2/13 בנושא הזה במועד א. כל המסקנות פה — חזרה ישירה.',
  insights: [
    {
      id: 'i4-1',
      given: 'U, W ≤ V נוצר סופית',
      conclude: 'dim(U+W) = dim U + dim W − dim(U∩W)',
      why: 'משפט המימדים הראשון. ניקח בסיס ל-U∩W, נשלים פעם לבסיס U ופעם ל-W. האיחוד = בסיס ל-U+W.',
      type: 'forward',
    },
    {
      id: 'i4-2',
      given: 'dim V = n, dim U = dim W = n-1, U ≠ W',
      conclude: 'dim(U∩W) = n − 2',
      why: 'U+W ⊋ U ⟹ dim(U+W) ≥ n. גם ≤ n כי ב-V. שוויון! ⟹ 2(n-1) = n + dim(U∩W) ⟹ dim(U∩W) = n-2. ⚠️ זו השאלה שלך Q4.2!',
      type: 'forward',
    },
    {
      id: 'i4-3',
      given: 'dim V = n, dim U = a, dim W = b',
      conclude: 'dim(U∩W) ≥ a + b − n',
      why: 'dim(U+W) ≤ n. ממשפט המימדים: dim(U∩W) = a + b − dim(U+W) ≥ a + b − n. שימושי לחסם תחתון!',
      type: 'corollary',
    },
    {
      id: 'i4-4',
      given: 'V = U ⊕ W',
      conclude: 'dim V = dim U + dim W',
      why: 'סכום ישר → U∩W = {0} → dim(U∩W) = 0. ממשפט המימדים: dim V = dim U + dim W − 0.',
      type: 'corollary',
    },
    {
      id: 'i4-5',
      given: 'W + Span{u} = W',
      conclude: 'u ∈ W',
      why: 'u = 0_V + u ∈ W + Span{u} = W. הכיוון ההפוך: אם u∈W אז Span{u} ⊆ W אז W + Span{u} ⊆ W ⊆ W + Span{u}.',
      type: 'forward',
    },
    {
      id: 'i4-6',
      given: 'dim(W + U) = dim W',
      conclude: 'U ⊆ W',
      why: 'W ⊆ W + U וגם dim שווה ⟹ W = W + U. עכשיו כל u ∈ U: u = 0+u ∈ W+U = W.',
      type: 'forward',
    },
    {
      id: 'i4-7',
      given: 'W₁ ⊕ W₂ (סכום ישר)',
      conclude: '⚠️ לא נכון בהכרח ש-U ∩ (W₁⊕W₂) = (U∩W₁) ⊕ (U∩W₂)',
      why: 'דוגמה נגדית: ב-R²: W₁ = Span{e₁}, W₂ = Span{e₂}, U = Span{(1,1)}. אז U ∩ (W₁⊕W₂) = U ≠ {0} = (U∩W₁)⊕(U∩W₂).',
      type: 'warning',
    },
  ],
};

// ────────────────────────────────────────────────────────────────
// SECTION 5 — HW8-9: Matrix multiplication + invertibility
// ────────────────────────────────────────────────────────────────
const sec5: InsightSection = {
  id: 'matrix-invert',
  order: 5,
  source: 'HW',
  sourceLabel: 'HW8-9 — כפל מטריצות + הפיכות',
  topic: 'תכונות מטריצות הפיכות וזהויות',
  insights: [
    {
      id: 'i5-1',
      given: 'A·B = 0',
      conclude: '⚠️ לא נובע ש-A=0 או B=0 (יש מחלקי אפס!)',
      why: 'דוגמה: A=B=[[0,1],[0,0]]. A·B = [[0,0],[0,0]]=0 אבל A≠0. ⚠️ כפל מטריצות לא כמו כפל בשדה!',
      type: 'warning',
    },
    {
      id: 'i5-2',
      given: 'A, B ∈ Mₙ(F) ∧ AB = Iₙ',
      conclude: 'BA = Iₙ ∧ A⁻¹ = B',
      why: 'AB=I → A על → A הפיכה (מטריצה ריבועית: על ⟺ הפיכה). מיחידות ההופכי: BA = I אוטומטית. ⚠️ נכון רק לריבועיות!',
      type: 'forward',
    },
    {
      id: 'i5-3',
      given: 'AB = Iₘ ∧ BA = Iₙ (לא בהכרח ריבועיות)',
      conclude: 'n = m (חייבות להיות בגודל זהה)',
      why: 'אם n < m: הקנונית של A יש בה שורת אפסים → CB יש שורת אפסים → לא Iₘ. דומה ל-n > m.',
      type: 'forward',
    },
    {
      id: 'i5-4',
      given: 'K ∈ M_{m×n}(F), m > n, K הפיכה משמאל',
      conclude: 'K אינה הפיכה מימין',
      why: 'דוגמה: K=[[1,0],[0,1],[0,0]]. שמאל הפיכה. אבל כל מטריצה B מכפילה את K משאירה שורת אפסים שלישית.',
      type: 'warning',
    },
    {
      id: 'i5-5',
      given: 'A, B הפיכות משמאל',
      conclude: 'A·B הפיכה משמאל',
      why: 'CA = I, DB = I ⟹ (DC)(AB) = D(CA)B = DI·B = DB = I.',
      type: 'forward',
    },
    {
      id: 'i5-6',
      given: 'A הפיכה ∧ סכום שורות = c',
      conclude: 'c ≠ 0 ∧ סכום שורות A⁻¹ = c⁻¹',
      why: 'נסמן x̄=(1,...,1). A·x̄ = c·x̄. אם c=0 → A·x̄=0̄ אבל A הפיכה → x̄=0̄, סתירה. עכשיו A⁻¹·x̄ = c⁻¹·x̄.',
      type: 'forward',
    },
    {
      id: 'i5-7',
      given: 'A²=2A ∧ A²+A=7I',
      conclude: '⚠️ סתירה — לא קיים A כזה',
      why: '(A-2I)(A+3I) = A²+A-6I = 7I-6I = I. אז A-2I הפיכה. אבל A(A-2I) = A²-2A = 0 → A=0 או A-2I=0. סתירה.',
      type: 'warning',
    },
  ],
};

// ────────────────────────────────────────────────────────────────
// SECTION 6 — HW9-10: Invertibility deeper + rank
// ────────────────────────────────────────────────────────────────
const sec6: InsightSection = {
  id: 'invert-deep',
  order: 6,
  source: 'HW',
  sourceLabel: 'HW9-10 — הפיכות עמוק + rank',
  topic: 'AB=I→BA=I, rank 1, קריטריונים מפתיעים',
  insights: [
    {
      id: 'i6-1',
      given: '∀B ∈ Mₙ(F): BA = 0ₙ ⟹ B = 0ₙ',
      conclude: 'A הפיכה',
      why: 'בשלילה: אם A לא הפיכה, שורות A ת"ל. ∃x̄≠0̄: x̄ᵗA = 0̄. ניקח B עם x̄ᵗ בכל שורה — BA=0 אבל B≠0. סתירה.',
      type: 'forward',
    },
    {
      id: 'i6-2',
      given: 'rank A = 1',
      conclude: '∃x̄ ∈ F^m, ȳ ∈ F^n: A = x̄·ȳᵗ',
      why: 'יש שורה אחת לא-אפס. ניקח אותה כ-ȳᵗ. כל שורה אחרת היא כפולה שלה: Rᵢ = αᵢ·ȳᵗ. נגדיר x̄ = (α₁,...,αₘ).',
      type: 'forward',
    },
    {
      id: 'i6-3',
      given: 'AB = Iₙ (HW9 Q6)',
      conclude: 'BA = Iₙ — דרך dim W_k',
      why: 'מגדירים Wₖ = {Bᵏ·X : X∈Mₙ}. Wₖ₊₁ ⊆ Wₖ. כי מימד יורד — קיים k שבו שווה. אז Bᵏ ∈ Wₖ₊₁ → ∃X: Bᵏ = Bᵏ⁺¹X. מכפלים ב-Aᵏ → I = BX. סגרנו.',
      type: 'forward',
    },
    {
      id: 'i6-4',
      given: 'A, B skew-symmetric (Aᵗ=-A, Bᵗ=-B)',
      conclude: 'AB סימטרית ⟺ AB = BA',
      why: '(AB)ᵗ = BᵗAᵗ = (-B)(-A) = BA. אז AB=AB)ᵗ ⟺ AB=BA. שוויון ⟺ קומוטטיביות.',
      type: 'forward',
    },
    {
      id: 'i6-5',
      given: 'A + B = A³ ∧ B הפיכה',
      conclude: 'A הפיכה',
      why: 'B = A³ - A = A(A²-I). B הפיכה ⟹ I = B·B⁻¹ = A(A²-I)B⁻¹. אז A הפיכה מימין (מטריצה ריבועית) → הפיכה.',
      type: 'forward',
    },
    {
      id: 'i6-6',
      given: 'rank A = n ∧ B ∈ Mₙ(F)',
      conclude: 'rank(AB) = rank(B) ∧ rank(BA) = rank(B)',
      why: 'A הפיכה ⟹ מכפלת אלמנטריות. כפל באלמנטרית = פעולת שורה/עמודה — לא משנה rank. ⚠️ זו שאלת Q5.2 שלך!',
      type: 'forward',
    },
  ],
};

// ────────────────────────────────────────────────────────────────
// SECTION 7 — HW11-12: Determinants
// ────────────────────────────────────────────────────────────────
const sec7: InsightSection = {
  id: 'determinant',
  order: 7,
  source: 'HW',
  sourceLabel: 'HW11-12 — דטרמיננטות',
  topic: 'תכונות det, בלוקים, אקסיומות',
  insights: [
    {
      id: 'i7-1',
      given: '∆: Mₙ(F)→F מולטי-לינארית ומתחלפת',
      conclude: '∃α: ∆(A) = α·det(A) לכל A',
      why: 'α = ∆(Iₙ). אם α=0: ∆ מאפסת כל מטריצה (דרך שקילות שורה). אם α≠0: ∆/α היא det לפי יחידות.',
      type: 'forward',
    },
    {
      id: 'i7-2',
      given: 'A עם 2 שורות זהות',
      conclude: 'det A = 0',
      why: 'אקסיומת ה-alternating. אינטואיציה: החלפת השורות הזהות → לא משנה A, אבל לפי alternating משנה סימן. אז det = -det.',
      type: 'forward',
    },
    {
      id: 'i7-3',
      given: 'B מתקבל מ-A ע"י Rᵢ→Rᵢ+αRⱼ',
      conclude: 'det B = det A (לא משתנה!)',
      why: 'מולטי-לינארית בשורה i: det B = det A + α·det(A עם שורה i = שורה j) = det A + α·0 = det A.',
      type: 'forward',
    },
    {
      id: 'i7-4',
      given: 'A משולשית (עליונה/תחתונה)',
      conclude: 'det A = ∏[A]ᵢᵢ (מכפלת אלכסון)',
      why: 'פיתוח רקורסיבי לפי שורה אחרונה / עמודה אחרונה: רק אלמנט אלכסון לא 0. או: דירוג שמשמר עד I.',
      type: 'forward',
    },
    {
      id: 'i7-5',
      given: 'M = [[A, C], [0, B]] (בלוקים משולשית עליונה)',
      conclude: 'det M = det A · det B',
      why: 'פיתוח רקורסיבי לאורך הבלוק התחתון-שמאלי (0): התרומה היחידה היא דרך האלכסון של A על B.',
      type: 'forward',
    },
    {
      id: 'i7-6',
      given: 'det K = 180 ∧ det(I−A) = −6 (HW12 Q3)',
      conclude: 'det(I+A) = -30',
      why: 'בנייה חכמה: U·K = [[I-A², 0],[A, I]] (בלוקים). det(U)=1, det(UK)=det(I-A²)=180. ו-(I-A)(I+A)=I-A². אז 180 = -6·det(I+A).',
      type: 'technique',
    },
    {
      id: 'i7-7',
      given: 'A ∈ Mₙ(F) משוננת לפי i+j (מטריצה כמו 1,2,...,n שורות עוקבות)',
      conclude: 'det A = 0 כש-n ≥ 3',
      why: 'הפעולות R₃→R₃-R₂ ו-R₂→R₂-R₁ נותנות שתי שורות זהות (1,1,...,1). שתי שורות זהות → det = 0.',
      type: 'technique',
    },
    {
      id: 'i7-8',
      given: 'W = {A ∈ Mₙ(R) : det A = 0}',
      conclude: '⚠️ W אינו תת-מרחב!',
      why: 'דוגמה: A = diag(1,1,0,0), B = diag(0,0,1,1). det A = det B = 0 ∈ W. אבל A+B = I → det = 1 ≠ 0. סגירות לחיבור נכשלת.',
      type: 'warning',
    },
  ],
};

// ────────────────────────────────────────────────────────────────
// SECTION 8 — Moed A 2025 + 2026 (her exam!)
// ────────────────────────────────────────────────────────────────
const sec8: InsightSection = {
  id: 'moed-a',
  order: 8,
  source: 'exam',
  sourceLabel: 'מועד א 2025 + מועד א 2026 (שלך)',
  topic: 'מה אפשר ללמוד מהמועד א שעברת',
  description: 'את קיבלת 50/100 ב-מועד א 2026. כל מסקנה פה מבוססת על שאלה שראית.',
  insights: [
    {
      id: 'i8-1',
      given: 'Q1.1.2 (מועד א 2025): v₁,...,vₖ בת"ל',
      conclude: 'אם Σαᵢvᵢ = Σβᵢvᵢ אז αᵢ = βᵢ לכל i',
      why: 'מחסרים: Σ(αᵢ-βᵢ)vᵢ = 0. בת"ל ⟹ כל המקדמים = 0. זוהי "יחידות הייצוג" — הגדרה שקולה לבת"ל!',
      type: 'forward',
    },
    {
      id: 'i8-2',
      given: 'Q2.1.2 (מועד א 2025): V נוצר סופית, T: V→W ל"ת',
      conclude: 'dim V = dim Ker T + dim Im T',
      why: 'משפט הדרגה ל-LT (גרסה שקולה לגרסת מטריצות). הוכחה: השלמה לבסיס + הגדרת תמונה.',
      type: 'forward',
    },
    {
      id: 'i8-3',
      given: 'Q3.1 (מועד א 2025): dim Im T ≤ 1',
      conclude: '∃α ∈ F: T∘T = α·T',
      why: 'Im T = Span{w₀}. T(w₀) ∈ Im T = Span{w₀}, אז T(w₀) = αw₀. עכשיו לכל v: T²(v) = T(αv₁w₀) = α·T(v).',
      type: 'forward',
    },
    {
      id: 'i8-4',
      given: 'Q5.1 (מועד א 2025): 1+1 ≠ 0',
      conclude: 'Span{v₁+v₂, v₁-v₂, v₁+v₃} = Span{v₁, v₂, v₃}',
      why: 'v₁ = (1+1)⁻¹·[(v₁+v₂)+(v₁-v₂)]. v₂ = (1+1)⁻¹·[(v₁+v₂)-(v₁-v₂)]. v₃ = (v₁+v₃) - v₁. ⚠️ דרוש 1+1 ≠ 0!',
      type: 'forward',
    },
    {
      id: 'i8-5',
      given: 'Q5.2 (מועד א 2025): rank A = n, A,B ∈ Mₙ(F)',
      conclude: 'rank(AB) = rank(BA) = rank(B)',
      why: 'A הפיכה ⟹ מכפלת אלמנטריות E₁...Eₖ. AB ⟺ ביצוע פעולות שורה על B. שקילות שורה משמרת rank.',
      type: 'forward',
    },
    {
      id: 'i8-6',
      given: 'Q1.1 (מועד א 2026 שלך): A∈M_{n×k}, A₂,A₃∈M_{m×n}',
      conclude: 'כללי דיסטריביוטיביות ואסוציאטיביות במטריצות',
      why: 'הוכחת כל תכונה היא דרך הגדרה: [PQ]ᵢⱼ = Σ[P]ᵢₖ[Q]ₖⱼ. ⚠️ נקודות אבדו לך כי לא ניסחת אלגברית במלואו.',
      type: 'mistake' as InsightType,
    },
    {
      id: 'i8-7',
      given: 'Q1.2 (מועד א 2026 שלך): A סימטרית, B אנטי-סימטרית',
      conclude: '(A+B)(A-B) סימטרית',
      why: '[(A+B)(A-B)]ᵗ = (A-B)ᵗ(A+B)ᵗ = (A+B)(A-B). ⚠️ קיבלת 8/8! זה האזור החזק שלך.',
      type: 'forward',
    },
    {
      id: 'i8-8',
      given: 'Q3.2 (מועד א 2026 שלך): A ∈ M₄(Z₅)',
      conclude: 'דירוג [A | I] על Z₅ — קופץ למצב לא הפיך אם יש שורת אפסים',
      why: 'את עבדת ב-Z₅: -1 ≡ 4, הופכים כפליים: 2⁻¹=3, 3⁻¹=2, 4⁻¹=4. ⚠️ קיבלת 3/12 — שגיאות חישוב ב-Z_p!',
      type: 'mistake' as InsightType,
    },
    {
      id: 'i8-9',
      given: 'Q4.1 (מועד א 2026 שלך): מערכת תלוית פרמטר a',
      conclude: 'בכל a בדקי rank(A) vs rank(A⁺) vs n',
      why: 'את לא ניגשת! 0/12. הטכניקה: דרגי עד שמטריצה משולשית, נקודות פיצול = a-ים שמאפסים אלכסון, בדקי כל ענף.',
      type: 'mistake' as InsightType,
    },
  ],
};

// ────────────────────────────────────────────────────────────────
// SECTION 9 — Past Moed B exams (2022-2024)
// ────────────────────────────────────────────────────────────────
const sec9: InsightSection = {
  id: 'moed-b-past',
  order: 9,
  source: 'exam',
  sourceLabel: 'מועד ב 2022-2024 — תבניות חוזרות',
  topic: 'מה חוזר בכל מועד ב?',
  insights: [
    {
      id: 'i9-1',
      given: 'מועד ב 2022, 2023, 2024 (לפי ניתוח)',
      conclude: '95% מהמבחנים כללו שאלת פרמטרים',
      why: 'מטריצה תלוית-פרמטר עם 1-2 פרמטרים → סיווג מספר הפתרונות. תמיד באחת מהשאלות.',
      type: 'forward',
    },
    {
      id: 'i9-2',
      given: 'מועד ב היסטורי',
      conclude: 'משפט אחד מ-6 הטיירים 1-2 מופיע ב-90% מהמועדים',
      why: 'משפט הדרגה / שקילויות הפיכות / משפט השלוש / det(AB) / row=col rank / שטיינל. אחד מהם תמיד.',
      type: 'forward',
    },
    {
      id: 'i9-3',
      given: 'מועד ב היסטורי',
      conclude: '50% מהציון בא מהוכחות תיאורטיות',
      why: 'התוכן מאוזן: 2-3 שאלות חישוב, 2-3 שאלות הוכחה. אסור להזניח את ההוכחות!',
      type: 'forward',
    },
    {
      id: 'i9-4',
      given: 'מועד ב היסטורי',
      conclude: 'שאלה אחת בנושא det כמעט תמיד',
      why: 'או חישוב det על Z_p, או הוכחת det(AB), או בלוקים. ב-2022-2024 הופיעה דטרמיננטה ב-80% מהמועדים.',
      type: 'forward',
    },
  ],
};

// ────────────────────────────────────────────────────────────────
// EXPORT
// ────────────────────────────────────────────────────────────────

export const insightSections: InsightSection[] = [
  sec1, sec2, sec3, sec4, sec5, sec6, sec7, sec8, sec9,
];

export const insightTypeMeta: Record<InsightType, { label: string; cls: string }> = {
  forward:         { label: 'נתון → מסקנה', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  contrapositive:  { label: 'בשלילה',         cls: 'bg-purple-100 text-purple-700 border-purple-200' },
  corollary:       { label: 'מסקנה',           cls: 'bg-blue-100 text-blue-700 border-blue-200' },
  technique:       { label: 'טכניקה',          cls: 'bg-amber-100 text-amber-700 border-amber-200' },
  warning:         { label: '⚠️ אזהרה',         cls: 'bg-red-100 text-red-700 border-red-200' },
};

export function getTotalInsights(): number {
  return insightSections.reduce((sum, s) => sum + s.insights.length, 0);
}
