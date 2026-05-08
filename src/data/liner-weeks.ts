// Linear Algebra Study Weeks Data
// Based on LA01 Lectures 01-26 and Tirgul 1-13
// Content extracted from actual tirgul PDF text files
import type { StudyWeek, KnowledgeItem, PracticeQuestion, LinearAlgebraTopic } from '@/types'

// ============================================================
// WEEK 1 — Fields (שדות) — Tirgul 1
// ============================================================

const week1Definitions: KnowledgeItem[] = [
  {
    id: 'w1-def-field-axioms',
    type: 'definition',
    title: 'Field Axioms',
    titleHe: 'אקסיומות השדה',
    verbatimContent:
      'A field is a set F with two operations, addition (+) and multiplication (·), satisfying 12 axioms: ' +
      '(A1) Closure under addition. (A2) Commutativity of addition. (A3) Associativity of addition. ' +
      '(A4) Existence of additive identity 0_F: a + 0_F = a. (A5) Existence of additive inverse -a: a + (-a) = 0_F. ' +
      '(M1) Closure under multiplication. (M2) Commutativity of multiplication. (M3) Associativity of multiplication. ' +
      '(M4) Existence of multiplicative identity 1_F: a · 1_F = a. (M5) Existence of multiplicative inverse a^{-1} for a ≠ 0_F: a · a^{-1} = 1_F. ' +
      '(D) Distributivity: a · (b + c) = a · b + a · c. (S) 0_F ≠ 1_F.',
    source: 'Tirgul 1',
    pageNumber: 1,
    topic: 'fields',
    weekNumber: 1,
    tags: ['field', 'axioms', 'definition', 'fundamental'],
    relatedItems: ['w1-def-finite-field', 'w1-thm-no-zero-divisors'],
  },
  {
    id: 'w1-def-finite-field',
    type: 'definition',
    title: 'Finite Field',
    titleHe: 'שדה סופי',
    verbatimContent:
      'A field with a finite number of elements is called a finite field. ' +
      'Examples: F2 = {0,1} with addition and multiplication tables derived from the axioms (the multiplication is AND, the addition is XOR). ' +
      'F3 = {0,1,2} with addition and multiplication modulo 3.',
    source: 'Tirgul 1',
    pageNumber: 2,
    topic: 'fields',
    weekNumber: 1,
    tags: ['finite-field', 'F2', 'F3', 'binary'],
    relatedItems: ['w1-def-field-axioms'],
  },
  {
    id: 'w1-def-custom-operation',
    type: 'definition',
    title: 'Custom Binary Operation on R\\{1}',
    titleHe: 'הגדרת פעולות',
    verbatimContent:
      'Define the binary operation ⊙ on R\\{1} by x ⊙ y := x + y − x·y. ' +
      'Claims proved: R\\{1} is closed under ⊙; ⊙ is commutative; ⊙ is associative.',
    source: 'Tirgul 1',
    pageNumber: 3,
    topic: 'fields',
    weekNumber: 1,
    tags: ['binary-operation', 'closure', 'commutativity', 'associativity'],
    relatedItems: ['w1-def-field-axioms'],
  },
];

const week1Theorems: KnowledgeItem[] = [
  {
    id: 'w1-thm-no-zero-divisors',
    type: 'theorem',
    title: 'No Zero Divisors in a Field',
    titleHe: 'אין מחלקי אפס',
    verbatimContent:
      'In any field F (not necessarily finite), if a · b = 0_F then a = 0_F or b = 0_F.',
    source: 'Tirgul 1',
    pageNumber: 2,
    topic: 'fields',
    weekNumber: 1,
    tags: ['zero-divisors', 'field-property'],
    relatedItems: ['w1-def-field-axioms', 'w1-thm-neg-sum'],
  },
  {
    id: 'w1-thm-neg-sum',
    type: 'proposition',
    title: 'Negative of a Sum',
    titleHe: 'נגדי של סכום',
    verbatimContent:
      'For a, b in F: -(a + b) = -a + (-b). Proof uses additive associativity, commutativity, and the inverse axiom to show (a+b) + (-a + (-b)) = 0_F.',
    source: 'Tirgul 1',
    pageNumber: 2,
    topic: 'fields',
    weekNumber: 1,
    tags: ['additive-inverse', 'field-property'],
    relatedItems: ['w1-def-field-axioms', 'w1-thm-inv-product'],
  },
  {
    id: 'w1-thm-inv-product',
    type: 'proposition',
    title: 'Inverse of a Product',
    titleHe: 'הופכי של מכפלה',
    verbatimContent:
      'For a, b in F with a,b ≠ 0_F: (a·b)^{-1} = b^{-1} · a^{-1}. Proof: (a·b) · (b^{-1}·a^{-1}) = 1_F using multiplicative associativity and inverses.',
    source: 'Tirgul 1',
    pageNumber: 2,
    topic: 'fields',
    weekNumber: 1,
    tags: ['multiplicative-inverse', 'field-property'],
    relatedItems: ['w1-def-field-axioms', 'w1-thm-neg-sum'],
  },
  {
    id: 'w1-thm-double-equals',
    type: 'proposition',
    title: 'If x+x = y+y then x = y or 1_F + 1_F = 0_F',
    titleHe: 'שוויון כפל',
    verbatimContent:
      'Let x, y be in field F. If x + x = y + y then x = y or 1_F + 1_F = 0_F. ' +
      'Proof: If 1_F + 1_F ≠ 0_F, then x(1_F+1_F) = y(1_F+1_F), and we cancel (1_F+1_F) to get x = y.',
    source: 'Tirgul 1',
    pageNumber: 3,
    topic: 'fields',
    weekNumber: 1,
    tags: ['characteristic', 'field-property', 'cancellation'],
    relatedItems: ['w1-def-field-axioms'],
  },
];

const week1Proofs: KnowledgeItem[] = [];
const week1Techniques: KnowledgeItem[] = [];

const week1PracticeQuestions: PracticeQuestion[] = [
  {
    id: 'w1-pq-closure-proof',
    question:
      'Prove that R\\{1} is closed under the operation x ⊙ y = x + y − x·y. ' +
      '(Hint: assume x ⊙ y = 1 and derive a contradiction using the no-zero-divisors property.)',
    source: 'Tirgul 1',
    pageNumber: 3,
    topic: 'fields',
    weekNumber: 1,
    difficulty: 'medium',
    relatedTheorems: ['w1-thm-no-zero-divisors'],
    relatedDefinitions: ['w1-def-custom-operation'],
    solution:
      'Suppose x,y in R\\{1} and x⊙y = 1. Then x+y−xy = 1, so 0 = 1−x−y+xy = (1−x)(1−y). ' +
      'Since R is a field (no zero divisors), 1−x = 0 or 1−y = 0, contradicting x,y ∈ R\\{1}.',
  },
  {
    id: 'w1-pq-f3-verify',
    question:
      'Let F3 = {0,1,2} with addition and multiplication modulo 3. Verify that F3 is a field by checking the axioms. ' +
      'Show that 0 is the additive identity, 1 is the multiplicative identity, and every nonzero element has a multiplicative inverse.',
    source: 'Tirgul 1',
    pageNumber: 2,
    topic: 'fields',
    weekNumber: 1,
    difficulty: 'easy',
    relatedTheorems: [],
    relatedDefinitions: ['w1-def-field-axioms', 'w1-def-finite-field'],
    solution:
      'Closure, commutativity: seen from the tables. 0 is additive identity, 1 is multiplicative identity. ' +
      'Additive inverses: -1 = 2, -2 = 1. Multiplicative inverses: 1^{-1} = 1, 2^{-1} = 2 (since 2·2 = 4 ≡ 1 mod 3). ' +
      'Associativity and distributivity can be verified by exhaustive check.',
  },
];

// ============================================================
// WEEK 2 — Complex Numbers (מספרים מרוכבים) — Tirgul 2
// ============================================================

const week2Definitions: KnowledgeItem[] = [
  {
    id: 'w2-def-complex-numbers',
    type: 'definition',
    title: 'Complex Numbers',
    titleHe: 'מספרים מרוכבים',
    verbatimContent:
      'The set of complex numbers is C = {a + bi | a, b ∈ R}. ' +
      'For z = a + bi, w = c + di: addition z + w = (a+c) + (b+d)i; multiplication z·w = (ac−bd) + (ad+bc)i. ' +
      'Two complex numbers z,w are equal (z = w) iff a = c and b = d.',
    source: 'Tirgul 2',
    pageNumber: 1,
    topic: 'complex-numbers',
    weekNumber: 2,
    tags: ['complex', 'addition', 'multiplication', 'definition'],
    relatedItems: ['w2-def-real-imaginary', 'w2-def-conjugate', 'w2-def-modulus'],
  },
  {
    id: 'w2-def-real-imaginary',
    type: 'definition',
    title: 'Real and Imaginary Parts',
    titleHe: 'חלק ממשי ומדומה',
    verbatimContent:
      'For z = a + bi ∈ C: the real part is Re(z) = a and the imaginary part is Im(z) = b. ' +
      'Note: the imaginary part is a real number. For example, Im(i) = 1.',
    source: 'Tirgul 2',
    pageNumber: 1,
    topic: 'complex-numbers',
    weekNumber: 2,
    tags: ['real-part', 'imaginary-part'],
    relatedItems: ['w2-def-complex-numbers'],
  },
  {
    id: 'w2-def-conjugate',
    type: 'definition',
    title: 'Complex Conjugate',
    titleHe: 'צמוד מרוכב',
    verbatimContent:
      'For z = a + bi ∈ C, the complex conjugate is z̄ = a − bi.',
    source: 'Tirgul 2',
    pageNumber: 1,
    topic: 'complex-numbers',
    weekNumber: 2,
    tags: ['conjugate'],
    relatedItems: ['w2-def-complex-numbers', 'w2-thm-z-zbar'],
  },
  {
    id: 'w2-def-modulus',
    type: 'definition',
    title: 'Absolute Value (Norm / Modulus)',
    titleHe: 'ערך מוחלט (נורמה, מודול)',
    verbatimContent:
      'For z = a + bi ∈ C, the absolute value (also called norm or modulus) is |z| = √(a² + b²). ' +
      'The absolute value of a complex number is a non-negative real number.',
    source: 'Tirgul 2',
    pageNumber: 1,
    topic: 'complex-numbers',
    weekNumber: 2,
    tags: ['modulus', 'norm', 'absolute-value'],
    relatedItems: ['w2-def-complex-numbers', 'w2-thm-z-zbar'],
  },
  {
    id: 'w2-def-modular-equivalence',
    type: 'definition',
    title: 'Modular Equivalence',
    titleHe: 'שקילות מודולו',
    verbatimContent:
      'Let n ≥ 2 be a natural number. Integers a, b are equivalent modulo n (written a ≡ b mod n) ' +
      'iff a mod n = b mod n, i.e., they have the same remainder when divided by n. ' +
      'Equivalently, a ≡ b mod n iff n divides (a − b).',
    source: 'Tirgul 2',
    pageNumber: 3,
    topic: 'fields',
    weekNumber: 2,
    tags: ['modular-arithmetic', 'equivalence'],
    relatedItems: ['w2-def-Zn', 'w2-thm-Zp-field'],
  },
  {
    id: 'w2-def-Zn',
    type: 'definition',
    title: 'Residue Set Zn and Modular Operations',
    titleHe: 'קבוצת שאריות Zn',
    verbatimContent:
      'Let n ≥ 2. Define Zn = {0, 1, ..., n−1}. For a, b ∈ Zn: ' +
      'addition modulo n: a ⊕ b = (a + b) mod n; multiplication modulo n: a ⊙ b = (a · b) mod n.',
    source: 'Tirgul 2',
    pageNumber: 4,
    topic: 'fields',
    weekNumber: 2,
    tags: ['Zn', 'modular-operations'],
    relatedItems: ['w2-def-modular-equivalence', 'w2-thm-Zp-field'],
  },
];

const week2Theorems: KnowledgeItem[] = [
  {
    id: 'w2-thm-z-zbar',
    type: 'proposition',
    title: 'z · z̄ = |z|²',
    titleHe: 'z כפול הצמוד שווה למודול בריבוע',
    verbatimContent:
      'For z ∈ C: z · z̄ = |z|². Proof: z·z̄ = (a+bi)(a−bi) = a² + b² = |z|². ' +
      'Corollary: for z ≠ 0, the multiplicative inverse is z^{-1} = z̄/|z|² = a/(a²+b²) − b/(a²+b²) · i.',
    source: 'Tirgul 2',
    pageNumber: 2,
    topic: 'complex-numbers',
    weekNumber: 2,
    tags: ['conjugate', 'modulus', 'inverse'],
    relatedItems: ['w2-def-conjugate', 'w2-def-modulus', 'w2-thm-C-is-field'],
  },
  {
    id: 'w2-thm-C-is-field',
    type: 'theorem',
    title: 'C is a Field',
    titleHe: 'המרוכבים כשדה',
    verbatimContent:
      'The complex numbers with the operations defined above satisfy the field axioms. ' +
      'Closure and commutativity follow directly from the definition. 0+0i is the additive identity, 1+0i is the multiplicative identity. ' +
      'The additive inverse of a+bi is -a-bi. The multiplicative inverse exists by z·z̄ = |z|². Associativity and distributivity are left as exercises.',
    source: 'Tirgul 2',
    pageNumber: 2,
    topic: 'complex-numbers',
    weekNumber: 2,
    tags: ['field', 'complex-numbers'],
    relatedItems: ['w2-thm-z-zbar', 'w1-def-field-axioms'],
  },
  {
    id: 'w2-thm-conjugate-product',
    type: 'proposition',
    title: 'Conjugate of Product and Modulus of Product',
    titleHe: 'צמוד וערך מוחלט של מכפלה',
    verbatimContent:
      'For z1, z2, w1, w2 ∈ C: (1) conjugate(z1·z2) = conjugate(z1) · conjugate(z2). ' +
      '(2) |w1 · w2| = |w1| · |w2|.',
    source: 'Tirgul 2',
    pageNumber: 2,
    topic: 'complex-numbers',
    weekNumber: 2,
    tags: ['conjugate', 'modulus', 'multiplicative'],
    relatedItems: ['w2-def-conjugate', 'w2-def-modulus'],
  },
  {
    id: 'w2-thm-Zp-field',
    type: 'theorem',
    title: 'Zp is a Field iff p is Prime',
    titleHe: 'Zp שדה אם"ם p ראשוני',
    verbatimContent:
      'Let p ∈ N and Zp = {0, 1, ..., p−1} with addition and multiplication modulo p. ' +
      'Zp is a field if and only if p is prime. ' +
      'Note: if p is not prime, then p = a·b for a,b ∈ {1,...,p−1}, so a·b mod p = 0, giving zero divisors.',
    source: 'Tirgul 2',
    pageNumber: 4,
    topic: 'fields',
    weekNumber: 2,
    tags: ['Zp', 'prime', 'finite-field'],
    relatedItems: ['w2-def-Zn', 'w1-thm-no-zero-divisors'],
  },
  {
    id: 'w2-thm-modular-order',
    type: 'theorem',
    title: 'Order of Modular Operations',
    titleHe: 'סדר פעולות מודולו',
    verbatimContent:
      'For n ≥ 2 and a, b ∈ Z: (a + b) mod n = ((a mod n) + (b mod n)) mod n; ' +
      '(a · b) mod n = ((a mod n) · (b mod n)) mod n. ' +
      'That is, one can reduce modulo n at any intermediate step.',
    source: 'Tirgul 2',
    pageNumber: 3,
    topic: 'fields',
    weekNumber: 2,
    tags: ['modular-arithmetic', 'order-of-operations'],
    relatedItems: ['w2-def-modular-equivalence'],
  },
];

const week2PracticeQuestions: PracticeQuestion[] = [
  {
    id: 'w2-pq-R2-not-field',
    question:
      'Let R² be the set of pairs of reals with component-wise addition and multiplication. ' +
      'Prove or disprove: (R², +, ·) is a field.',
    source: 'Tirgul 2',
    pageNumber: 1,
    topic: 'complex-numbers',
    weekNumber: 2,
    difficulty: 'medium',
    relatedTheorems: ['w1-thm-no-zero-divisors'],
    relatedDefinitions: ['w1-def-field-axioms'],
    solution:
      'False. There exist zero divisors: (1,0)·(0,1) = (0,0). Since fields have no zero divisors, R² is not a field.',
  },
  {
    id: 'w2-pq-modular-computation',
    question: 'Compute 5^81 mod 17.',
    source: 'Tirgul 2',
    pageNumber: 4,
    topic: 'fields',
    weekNumber: 2,
    difficulty: 'medium',
    relatedTheorems: ['w2-thm-modular-order'],
    relatedDefinitions: ['w2-def-modular-equivalence'],
    solution:
      '5^81 = 5 · 5^80 = 5 · (5²)^40 = 5 · 25^40 ≡₁₇ 5 · 8^40 = 5 · (8²)^20 = 5 · 64^20 ≡₁₇ 5 · 13^20 = 5 · (13²)^10 = 5 · 169^10 ≡₁₇ 5 · (-1)^10 = 5 · 1 = 5.',
  },
  {
    id: 'w2-pq-triple-primes',
    question:
      'Let n ∈ N. Suppose n, n+2, n+4 are all prime. Prove that n = 3.',
    source: 'Tirgul 2',
    pageNumber: 5,
    topic: 'fields',
    weekNumber: 2,
    difficulty: 'medium',
    relatedTheorems: ['w2-thm-Zp-field'],
    relatedDefinitions: ['w2-def-modular-equivalence'],
    solution:
      'n > 1 since n is prime. There are three cases modulo 3: ' +
      'If n ≡ 1 mod 3, then n+2 ≡ 0 mod 3 so 3|(n+2), but n+2 > 3 so not prime — contradiction. ' +
      'If n ≡ 2 mod 3, then n+4 ≡ 0 mod 3 so 3|(n+4), but n+4 > 3 so not prime — contradiction. ' +
      'Therefore n ≡ 0 mod 3, meaning 3|n. Since n is prime, n = 3.',
  },
];

// ============================================================
// WEEK 3 — Linear Equations (משוואות ליניאריות) — Tirgul 3
// ============================================================

const week3Definitions: KnowledgeItem[] = [
  {
    id: 'w3-def-linear-system',
    type: 'definition',
    title: 'System of Linear Equations',
    titleHe: 'מערכת משוואות ליניאריות',
    verbatimContent:
      'Let F be a field and m, n ∈ N. A system of linear equations with n variables x1,...,xn and m equations over F is: ' +
      'a₁₁x₁ + ... + a₁ₙxₙ = b₁, ..., aₘ₁x₁ + ... + aₘₙxₙ = bₘ, where aᵢⱼ, bᵢ ∈ F.',
    source: 'Tirgul 3',
    pageNumber: 1,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['linear-system', 'definition'],
    relatedItems: ['w3-def-particular-solution', 'w3-def-augmented-matrix'],
  },
  {
    id: 'w3-def-particular-solution',
    type: 'definition',
    title: 'Particular and General Solution',
    titleHe: 'פתרון פרטי ופתרון כללי',
    verbatimContent:
      'A particular solution of a linear system in x1,...,xn over F is a list (s1,...,sn) of n values in F such that substituting sj for xj satisfies all equations. ' +
      'The solution set (general solution) is the set of all particular solutions.',
    source: 'Tirgul 3',
    pageNumber: 1,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['solution', 'particular', 'general'],
    relatedItems: ['w3-def-linear-system', 'w3-def-equivalent-systems'],
  },
  {
    id: 'w3-def-augmented-matrix',
    type: 'definition',
    title: 'Augmented and Reduced Coefficient Matrix',
    titleHe: 'מטריצת מקדמים מורחבת ומצומצמת',
    verbatimContent:
      'The augmented coefficient matrix A⁺ of a linear system has entries [aᵢⱼ | bᵢ]. ' +
      'The reduced coefficient matrix A has only the entries aᵢⱼ (without the constants bᵢ).',
    source: 'Tirgul 3',
    pageNumber: 1,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['matrix', 'augmented', 'coefficient'],
    relatedItems: ['w3-def-linear-system', 'w3-def-row-operations'],
  },
  {
    id: 'w3-def-equivalent-systems',
    type: 'definition',
    title: 'Equivalent Linear Systems',
    titleHe: 'מערכות שקולות',
    verbatimContent:
      'Two systems of linear equations over F are equivalent if they have the same solution set.',
    source: 'Tirgul 3',
    pageNumber: 1,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['equivalence', 'solution-set'],
    relatedItems: ['w3-def-linear-system', 'w3-thm-row-equiv-systems'],
  },
  {
    id: 'w3-def-row-operations',
    type: 'definition',
    title: 'Elementary Row Operations',
    titleHe: 'פעולות שורה אלמנטריות',
    verbatimContent:
      'The three elementary row operations on matrices are: ' +
      '(1) Ri → αRi: multiply row Ri by nonzero scalar α ∈ F. ' +
      '(2) Ri ↔ Rj: swap rows Ri and Rj. ' +
      '(3) Ri → Ri + αRj: add α times row Rj to row Ri.',
    source: 'Tirgul 3',
    pageNumber: 1,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['row-operations', 'elementary'],
    relatedItems: ['w3-def-augmented-matrix', 'w3-def-row-equivalent', 'w3-def-echelon-form'],
  },
  {
    id: 'w3-def-row-equivalent',
    type: 'definition',
    title: 'Row Equivalent Matrices',
    titleHe: 'מטריצות שקולות שורות',
    verbatimContent:
      'Two matrices are row equivalent if one can be obtained from the other by a finite number of elementary row operations.',
    source: 'Tirgul 3',
    pageNumber: 2,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['row-equivalent'],
    relatedItems: ['w3-def-row-operations', 'w3-thm-row-equiv-systems'],
  },
  {
    id: 'w3-def-leading-coefficient',
    type: 'definition',
    title: 'Leading Coefficient (Pivot)',
    titleHe: 'מקדם מוביל',
    verbatimContent:
      'The leading coefficient of a row (that is not all zeros) is the leftmost nonzero entry in that row.',
    source: 'Tirgul 3',
    pageNumber: 2,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['pivot', 'leading-coefficient'],
    relatedItems: ['w3-def-echelon-form'],
  },
  {
    id: 'w3-def-echelon-form',
    type: 'definition',
    title: 'Echelon Form (EF) and Reduced Row Echelon Form (RREF)',
    titleHe: 'מטריצה מדורגת וקאנונית',
    verbatimContent:
      'A matrix is in echelon form (EF) if: (1) all zero rows are below nonzero rows; (2) the leading coefficient of each row is in a column to the right of the leading coefficient of the row above. ' +
      'A matrix is in reduced row echelon form (RREF) if additionally: (1) it is in EF; (2) every leading coefficient equals 1_F; (3) every leading coefficient is the only nonzero entry in its column.',
    source: 'Tirgul 3',
    pageNumber: 2,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['echelon', 'RREF', 'canonical'],
    relatedItems: ['w3-def-leading-coefficient', 'w3-thm-unique-rref', 'w3-def-free-bound-vars'],
  },
  {
    id: 'w3-def-free-bound-vars',
    type: 'definition',
    title: 'Bound (Dependent) and Free Variables',
    titleHe: 'משתנה קשור ומשתנה חופשי',
    verbatimContent:
      'Given a linear system with n variables x1,...,xn over field F, let C⁺ be the RREF of the augmented matrix. ' +
      'Variable xj is called bound (dependent) if column j of C⁺ contains a leading coefficient. Otherwise xj is called free.',
    source: 'Tirgul 3',
    pageNumber: 2,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['free-variable', 'bound-variable', 'dependent', 'pivot-column'],
    relatedItems: ['w3-def-echelon-form', 'w3-thm-solution-count'],
  },
];

const week3Theorems: KnowledgeItem[] = [
  {
    id: 'w3-thm-row-equiv-systems',
    type: 'theorem',
    title: 'Row Equivalent Augmented Matrices Give Equivalent Systems',
    titleHe: 'שקילות שורות ושקילות מערכות',
    verbatimContent:
      'If the augmented matrices of two linear systems are row equivalent, then the systems are equivalent (same solution set).',
    source: 'Tirgul 3',
    pageNumber: 2,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['row-equivalent', 'solution-set'],
    relatedItems: ['w3-def-row-equivalent', 'w3-def-equivalent-systems'],
  },
  {
    id: 'w3-thm-unique-rref',
    type: 'theorem',
    title: 'Unique RREF',
    titleHe: 'יחידות הצורה הקאנונית',
    verbatimContent:
      'Every matrix is row equivalent to exactly one reduced row echelon form (RREF) matrix.',
    source: 'Tirgul 3',
    pageNumber: 2,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['RREF', 'uniqueness'],
    relatedItems: ['w3-def-echelon-form'],
  },
  {
    id: 'w3-thm-solution-count',
    type: 'theorem',
    title: 'Number of Solutions of a Linear System',
    titleHe: 'מספר הפתרונות של מערכת לינארית',
    verbatimContent:
      'Let F be a field, and consider a system with m equations in x1,...,xn with RREF C⁺. ' +
      'The system has a solution iff C⁺ has no contradiction row (0...0 | b with b ≠ 0). If solvable: ' +
      '- No free variables: unique solution. ' +
      '- k > 0 free variables: n^k solutions if F is finite with n elements, or infinitely many solutions if F is infinite.',
    source: 'Tirgul 3',
    pageNumber: 3,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['solution-count', 'free-variables', 'contradiction-row'],
    relatedItems: ['w3-def-free-bound-vars', 'w3-def-echelon-form'],
  },
];

const week3Techniques: KnowledgeItem[] = [
  {
    id: 'w3-tech-gauss-jordan',
    type: 'technique',
    title: "Gauss-Jordan Elimination Process",
    titleHe: "תהליך דירוג גאוס-ז'ורדן",
    verbatimContent:
      'To solve a linear system: (1) Write the augmented matrix. (2) Gauss-Jordan: ' +
      'find leftmost nonzero column; swap to put nonzero entry on top; use row operations to zero out entries below the pivot; repeat on the remaining submatrix. ' +
      '(3) Back-substitution: from bottom-up, zero out entries above each pivot and scale pivots to 1. ' +
      '(4) If a contradiction row appears, no solution. Otherwise, write the system from the RREF with bound variables on one side and free variables on the other.',
    source: 'Tirgul 3',
    pageNumber: 2,
    topic: 'linear-equations',
    weekNumber: 3,
    tags: ['Gauss-Jordan', 'elimination', 'row-reduction', 'technique'],
    relatedItems: ['w3-def-row-operations', 'w3-def-echelon-form', 'w3-thm-solution-count'],
  },
];

const week3PracticeQuestions: PracticeQuestion[] = [
  {
    id: 'w3-pq-solve-3x3',
    question:
      'Find the solution set of: x1 + 3x3 = 7, 2x2 − 4x3 = −8, 3x1 + 2x2 + 10x3 = 23.',
    source: 'Tirgul 3',
    pageNumber: 3,
    topic: 'linear-equations',
    weekNumber: 3,
    difficulty: 'easy',
    relatedTheorems: ['w3-thm-solution-count'],
    relatedDefinitions: ['w3-def-augmented-matrix', 'w3-def-echelon-form'],
    solution: 'After Gauss-Jordan elimination, the unique solution is (x1, x2, x3) = (1, 0, 2).',
  },
  {
    id: 'w3-pq-solve-Z3',
    question:
      'Find the solution set over Z3 for the system: x1 + 2x2 = 2, 2x1 + x2 = 1.',
    source: 'Tirgul 3',
    pageNumber: 5,
    topic: 'linear-equations',
    weekNumber: 3,
    difficulty: 'medium',
    relatedTheorems: ['w3-thm-solution-count', 'w2-thm-Zp-field'],
    relatedDefinitions: ['w3-def-free-bound-vars'],
    solution:
      'Row reduction gives x1 + 2x2 = 2 and 0 = 0. So x1 = x2 + 2 (since -2 ≡ 1 in Z3). ' +
      'Three solutions: (2,0), (0,1), (1,2).',
  },
  {
    id: 'w3-pq-parametric-system',
    question:
      'For the system x1 + x2 = α, 3x1 + αx2 = 1 (α ∈ R parameter): ' +
      '(1) For which values of α is there a unique solution? Find it. ' +
      '(2) For which α are there infinitely many solutions? ' +
      '(3) For which α is there no solution?',
    source: 'Tirgul 3',
    pageNumber: 6,
    topic: 'linear-equations',
    weekNumber: 3,
    difficulty: 'hard',
    relatedTheorems: ['w3-thm-solution-count'],
    relatedDefinitions: ['w3-def-free-bound-vars'],
    solution:
      'Row reduction: R2 → R2 − 3R1 gives (α−3)x2 = 1−3α. ' +
      'If α ≠ 3: unique solution x2 = (1−3α)/(α−3), x1 = α − (1−3α)/(α−3). ' +
      'If α = 3: contradiction row (0 0 | −8), no solution. No value of α gives infinitely many solutions.',
  },
];

// ============================================================
// WEEK 4 — Vector Spaces (מרחבים וקטוריים) — Tirgul 4
// ============================================================

const week4Definitions: KnowledgeItem[] = [
  {
    id: 'w4-def-Fn',
    type: 'definition',
    title: 'Fn — Column Vectors',
    titleHe: 'Fn — וקטורי עמודה',
    verbatimContent:
      'Let n ∈ N and F be a field. Define Fn = {column vectors (x1,...,xn)^T | x1,...,xn ∈ F}. ' +
      'Addition: component-wise. Scalar multiplication: multiply each component by the scalar. ' +
      'Two column vectors are equal iff they are equal component by component.',
    source: 'Tirgul 4',
    pageNumber: 1,
    topic: 'vector-spaces',
    weekNumber: 4,
    tags: ['Fn', 'column-vector', 'addition', 'scalar-multiplication'],
    relatedItems: ['w4-def-vector-space'],
  },
  {
    id: 'w4-def-vector-space',
    type: 'definition',
    title: 'Vector Space',
    titleHe: 'מרחב וקטורי',
    verbatimContent:
      'A vector space over a field F is a set V (whose elements are called vectors) with two operations — vector addition and scalar multiplication — satisfying 10 axioms (for all u,v,w ∈ V, α,β ∈ F): ' +
      '(1) Closure under addition. (2) Commutativity of addition. (3) Associativity of addition. ' +
      '(4) Existence of additive identity 0_V. (5) Existence of additive inverse -u. ' +
      '(6) Closure under scalar multiplication. (7) Associativity of scalar multiplication: α(βu) = (αβ)u. ' +
      '(8) Multiplicative identity: 1_F · u = u. (9) Vector distributivity: α(u+v) = αu + αv. ' +
      '(10) Scalar distributivity: (α+β)u = αu + βu. Note: multiplication between vectors is not defined.',
    source: 'Tirgul 4',
    pageNumber: 2,
    topic: 'vector-spaces',
    weekNumber: 4,
    tags: ['vector-space', 'axioms', 'definition', 'fundamental'],
    relatedItems: ['w4-def-Fn', 'w4-thm-vs-properties', 'w4-def-subspace'],
  },
  {
    id: 'w4-def-matrix-space',
    type: 'definition',
    title: 'Mm×n(F) — Matrix Space',
    titleHe: 'מרחב המטריצות',
    verbatimContent:
      'Let F be a field and m, n ∈ N. Mm×n(F) is the set of m×n matrices with entries from F. ' +
      'For A, B ∈ Mm×n(F): [A+B]ij = [A]ij + [B]ij. For α ∈ F: [αA]ij = α·[A]ij. ' +
      'Two matrices are equal iff they have the same dimensions and are equal entry by entry. ' +
      'Theorem: Mm×n(F) is a vector space over F.',
    source: 'Tirgul 4',
    pageNumber: 3,
    topic: 'vector-spaces',
    weekNumber: 4,
    tags: ['matrix-space', 'Mmn', 'vector-space'],
    relatedItems: ['w4-def-vector-space'],
  },
  {
    id: 'w4-def-function-space',
    type: 'definition',
    title: 'FA — Function Space',
    titleHe: 'מרחב הפונקציות',
    verbatimContent:
      'Let A be a nonempty set. FA = {f : A → F} is the set of functions from A to F. ' +
      'Addition: (f+g)(x) = f(x) + g(x). Scalar multiplication: (αf)(x) = α·f(x). ' +
      'Equality: f = g iff f(x) = g(x) for all x ∈ A. Theorem: FA is a vector space over F.',
    source: 'Tirgul 4',
    pageNumber: 4,
    topic: 'vector-spaces',
    weekNumber: 4,
    tags: ['function-space', 'FA', 'vector-space'],
    relatedItems: ['w4-def-vector-space'],
  },
  {
    id: 'w4-def-subspace',
    type: 'definition',
    title: 'Subspace (Vector Subspace)',
    titleHe: 'תת מרחב וקטורי',
    verbatimContent:
      'A vector subspace of a vector space V over F is a subset W ⊆ V that satisfies all 10 vector space axioms with the same operations. ' +
      'Shortcut criterion: W ⊆ V is a subspace iff (1) 0_V ∈ W; (2) closure under addition: u,v ∈ W ⟹ u+v ∈ W; (3) closure under scalar mult: u ∈ W, α ∈ F ⟹ αu ∈ W. ' +
      'Equivalently, (2)+(3) can be replaced by closure under linear combination: α1w1 + α2w2 ∈ W for all α1,α2 ∈ F, w1,w2 ∈ W.',
    source: 'Tirgul 4',
    pageNumber: 4,
    topic: 'subspaces',
    weekNumber: 4,
    tags: ['subspace', 'closure', 'criterion'],
    relatedItems: ['w4-def-vector-space', 'w4-thm-subspace-criterion-2'],
  },
];

const week4Theorems: KnowledgeItem[] = [
  {
    id: 'w4-thm-vs-properties',
    type: 'theorem',
    title: 'Properties of Vector Spaces',
    titleHe: 'תכונות של מרחב וקטורי',
    verbatimContent:
      'Let V be a vector space: (1) The additive identity is unique. (2) Every vector has a unique additive inverse -v. ' +
      '(3) 0_F · v = 0_V for all v. (4) α · 0_V = 0_V for all α. ' +
      '(5) If α·v = 0_V then α = 0_F or v = 0_V. (6) (-1_F)·v = -v for all v.',
    source: 'Tirgul 4',
    pageNumber: 4,
    topic: 'vector-spaces',
    weekNumber: 4,
    tags: ['vector-space', 'properties'],
    relatedItems: ['w4-def-vector-space'],
  },
  {
    id: 'w4-thm-field-is-vs',
    type: 'proposition',
    title: 'Every Field is a Vector Space Over Itself',
    titleHe: 'כל שדה הוא מרחב וקטורי מעל עצמו',
    verbatimContent:
      'Every field is a vector space over itself (and over any subfield). ' +
      'The field axioms include all vector space axioms plus additional requirements (e.g., multiplicative inverse). ' +
      'Example: C is a vector space over C and also over R.',
    source: 'Tirgul 4',
    pageNumber: 5,
    topic: 'vector-spaces',
    weekNumber: 4,
    tags: ['field', 'vector-space', 'subfield'],
    relatedItems: ['w4-def-vector-space', 'w1-def-field-axioms'],
  },
  {
    id: 'w4-thm-subspace-criterion-2',
    type: 'proposition',
    title: 'Alternative Subspace Criterion',
    titleHe: 'קריטריון מקוצר שני לתת מרחב',
    verbatimContent:
      'W ⊆ V is a subspace if: (1) W ≠ ∅; (2) for all v, u ∈ W and α ∈ F: v + αu ∈ W. ' +
      'Proof: (1) Since W ≠ ∅, pick v ∈ W; choosing α = -1, u = v gives 0_V ∈ W. ' +
      '(2) Choosing α = 1 gives closure under addition. (3) Choosing v = 0_V gives closure under scalar multiplication.',
    source: 'Tirgul 4',
    pageNumber: 5,
    topic: 'subspaces',
    weekNumber: 4,
    tags: ['subspace', 'criterion', 'alternative'],
    relatedItems: ['w4-def-subspace'],
  },
  {
    id: 'w4-thm-union-subspaces',
    type: 'proposition',
    title: 'Union of Subspaces',
    titleHe: 'איחוד של תת מרחבים',
    verbatimContent:
      'Let V be a vector space over F and W1, W2 ⊆ V be subspaces. If W1 ∪ W2 = V, then W1 = V or W2 = V. ' +
      'Remark (without proof): the union of two subspaces is generally not a subspace.',
    source: 'Tirgul 4',
    pageNumber: 6,
    topic: 'subspaces',
    weekNumber: 4,
    tags: ['union', 'subspace'],
    relatedItems: ['w4-def-subspace'],
  },
  {
    id: 'w4-thm-homogeneous-subspace',
    type: 'proposition',
    title: 'Solution Set of Homogeneous System is a Subspace',
    titleHe: 'פתרונות מערכת הומוגנית הם תת מרחב',
    verbatimContent:
      'The solution set of a homogeneous linear system is a vector subspace. ' +
      'A non-homogeneous system (where the constants are not all zero) does NOT have a subspace as its solution set.',
    source: 'Tirgul 4',
    pageNumber: 6,
    topic: 'subspaces',
    weekNumber: 4,
    tags: ['homogeneous', 'subspace', 'solution-set'],
    relatedItems: ['w4-def-subspace', 'w3-def-linear-system'],
  },
];

const week4PracticeQuestions: PracticeQuestion[] = [
  {
    id: 'w4-pq-not-vs',
    question:
      'Let R² with operations ⊕ and ⊙ defined by (x1,y1) ⊕ (x2,y2) = (x1+x2+2, y1+y2+3) and α ⊙ (x,y) = (αx, αy). ' +
      'Is this a vector space? Justify.',
    source: 'Tirgul 4',
    pageNumber: 2,
    topic: 'vector-spaces',
    weekNumber: 4,
    difficulty: 'medium',
    relatedTheorems: [],
    relatedDefinitions: ['w4-def-vector-space'],
    solution:
      'No. Vector distributivity (axiom 9) fails: 5⊙((1,2)⊕(3,4)) = 5⊙(6,9) = (30,45), but 5⊙(1,2) ⊕ 5⊙(3,4) = (5,10) ⊕ (15,20) = (22,33). These are not equal.',
  },
  {
    id: 'w4-pq-subspace-check-Re0',
    question:
      'Is the set {z ∈ C | Re(z) = 0} a subspace of C over R?',
    source: 'Tirgul 4',
    pageNumber: 5,
    topic: 'subspaces',
    weekNumber: 4,
    difficulty: 'easy',
    relatedTheorems: ['w4-thm-subspace-criterion-2'],
    relatedDefinitions: ['w4-def-subspace'],
    solution:
      'Yes. Elements are of the form bi for b ∈ R. (1) 0 = 0·i ∈ set. (2) Closed under linear combination: α(b1·i) + β(b2·i) = (αb1 + βb2)·i which has Re = 0. ' +
      'Note: it is NOT a subspace over C (since i·(bi) = -b which has Re ≠ 0 in general).',
  },
  {
    id: 'w4-pq-union-axes',
    question:
      'Is S = {(x,y) ∈ R² | xy = 0} a subspace of R²?',
    source: 'Tirgul 4',
    pageNumber: 5,
    topic: 'subspaces',
    weekNumber: 4,
    difficulty: 'medium',
    relatedTheorems: [],
    relatedDefinitions: ['w4-def-subspace'],
    solution:
      'No. S is the union of the two coordinate axes. 0 ∈ S (since 0·0=0), and S is closed under scalar multiplication (α·x·α·y = α²·xy = 0). ' +
      'But S is NOT closed under addition: (1,0) ∈ S and (0,1) ∈ S, but (1,0)+(0,1) = (1,1) ∉ S since 1·1 ≠ 0.',
  },
];

// ============================================================
// WEEK 5 — Linear Combinations / Span (צירוף ליניארי / פרוש) — Tirgul 5
// ============================================================

const week5Definitions: KnowledgeItem[] = [
  {
    id: 'w5-def-linear-combination',
    type: 'definition',
    title: 'Linear Combination',
    titleHe: 'צירוף ליניארי',
    verbatimContent:
      'Let V be a vector space over F. Let v1,...,vn ∈ V and α1,...,αn ∈ F. ' +
      'The vector α1v1 + ... + αnvn is called a linear combination of v1,...,vn with coefficients α1,...,αn.',
    source: 'Tirgul 5',
    pageNumber: 1,
    topic: 'linear-combinations',
    weekNumber: 5,
    tags: ['linear-combination', 'definition'],
    relatedItems: ['w5-def-span', 'w4-def-vector-space'],
  },
  {
    id: 'w5-def-span',
    type: 'definition',
    title: 'Span',
    titleHe: 'פרוש',
    verbatimContent:
      'Let V be a vector space over F. The span of vectors v1,...,vm ∈ V is the set of all their linear combinations: ' +
      'span(v1,...,vm) = {α1v1 + ... + αmvm | α1,...,αm ∈ F}. ' +
      'Example: span(0_V) = {0_V}.',
    source: 'Tirgul 5',
    pageNumber: 3,
    topic: 'span',
    weekNumber: 5,
    tags: ['span', 'definition'],
    relatedItems: ['w5-def-linear-combination', 'w5-def-spanning-set', 'w5-thm-span-is-subspace'],
  },
  {
    id: 'w5-def-spanning-set',
    type: 'definition',
    title: 'Spanning Set',
    titleHe: 'קבוצה פורשת',
    verbatimContent:
      'Vectors v1,...,vm ∈ V span V if V = span(v1,...,vm). If H is a subspace of V and H = span(v1,...,vp), ' +
      'then {v1,...,vp} is called a spanning set for H.',
    source: 'Tirgul 5',
    pageNumber: 3,
    topic: 'span',
    weekNumber: 5,
    tags: ['spanning-set', 'definition'],
    relatedItems: ['w5-def-span'],
  },
];

const week5Theorems: KnowledgeItem[] = [
  {
    id: 'w5-thm-span-is-subspace',
    type: 'theorem',
    title: 'Span is a Subspace',
    titleHe: 'פרוש הוא תת מרחב וקטורי',
    verbatimContent:
      'Let V be a vector space over F and v1,...,vk ∈ V. Then span(v1,...,vk) ⊆ V is a subspace of V.',
    source: 'Tirgul 5',
    pageNumber: 3,
    topic: 'span',
    weekNumber: 5,
    tags: ['span', 'subspace'],
    relatedItems: ['w5-def-span', 'w4-def-subspace'],
  },
  {
    id: 'w5-thm-span-add-remove',
    type: 'theorem',
    title: 'Adding a Vector to Span',
    titleHe: 'הוספת וקטור לפרוש',
    verbatimContent:
      'Let V be a vector space over F and v1,...,vk, u ∈ V. Then span{v1,...,vk} = span{v1,...,vk, u} ' +
      'if and only if u ∈ span{v1,...,vk}.',
    source: 'Tirgul 5',
    pageNumber: 4,
    topic: 'span',
    weekNumber: 5,
    tags: ['span', 'redundant-vector'],
    relatedItems: ['w5-def-span'],
  },
  {
    id: 'w5-thm-subset-span',
    type: 'theorem',
    title: 'Subset Implies Span Containment',
    titleHe: 'הכלה של קבוצות וספאן',
    verbatimContent:
      'Let A, B be finite sets of vectors in V. If A ⊆ span{B}, then span{A} ⊆ span{B}. ' +
      'Corollary: if A ⊆ span{B} and B ⊆ span{A}, then span{A} = span{B}.',
    source: 'Tirgul 5',
    pageNumber: 5,
    topic: 'span',
    weekNumber: 5,
    tags: ['span', 'containment', 'corollary'],
    relatedItems: ['w5-def-span', 'w5-thm-span-is-subspace'],
  },
  {
    id: 'w5-thm-replace-in-span',
    type: 'proposition',
    title: 'Replacing a Vector in a Spanning Set',
    titleHe: 'החלפת וקטור בפרוש',
    verbatimContent:
      'Let v1, v2, v3, v ∈ V. Suppose v ∈ span{v1,v2,v3} and v ∉ span{v2,v3}. Then span{v1,v2,v3} = span{v,v2,v3}. ' +
      'Proof: v = α1v1 + α2v2 + α3v3. Since v ∉ span{v2,v3}, we must have α1 ≠ 0. Then v1 = α1^{-1}v − (α2/α1)v2 − (α3/α1)v3 ∈ span{v,v2,v3}.',
    source: 'Tirgul 5',
    pageNumber: 5,
    topic: 'span',
    weekNumber: 5,
    tags: ['span', 'replacement', 'spanning-set'],
    relatedItems: ['w5-def-span', 'w5-thm-subset-span'],
  },
];

const week5Techniques: KnowledgeItem[] = [
  {
    id: 'w5-tech-check-lc',
    type: 'technique',
    title: 'Checking if a Vector is a Linear Combination',
    titleHe: 'בדיקה אם וקטור הוא צירוף ליניארי',
    verbatimContent:
      'To check if vector b is a linear combination of v1,...,vk: set up the equation x1v1 + ... + xkvk = b, ' +
      'which gives a system of linear equations. Solve using Gauss-Jordan. If a solution exists, b is a linear combination. ' +
      'If no solution (contradiction row), b is not a linear combination.',
    source: 'Tirgul 5',
    pageNumber: 1,
    topic: 'linear-combinations',
    weekNumber: 5,
    tags: ['linear-combination', 'system', 'Gauss-Jordan'],
    relatedItems: ['w5-def-linear-combination', 'w3-tech-gauss-jordan'],
  },
  {
    id: 'w5-tech-subspace-via-span',
    type: 'technique',
    title: 'Proving a Subspace via Span',
    titleHe: 'הוכחת תת מרחב באמצעות פרוש',
    verbatimContent:
      'To prove W ⊆ V is a subspace, it suffices to find vectors v1,...,vn ∈ V such that W = span{v1,...,vn}. ' +
      'Since span is always a subspace, this immediately proves W is a subspace. ' +
      'Typically used for solution sets of homogeneous systems: solve the system, express the general solution as a linear combination of specific vectors.',
    source: 'Tirgul 5',
    pageNumber: 6,
    topic: 'span',
    weekNumber: 5,
    tags: ['subspace', 'span', 'technique'],
    relatedItems: ['w5-thm-span-is-subspace', 'w4-def-subspace'],
  },
];

const week5PracticeQuestions: PracticeQuestion[] = [
  {
    id: 'w5-pq-not-in-span',
    question:
      'Let v1 = (1,0,0)^T, v2 = (0,1,0)^T ∈ F3³. Is the vector (0,0,1)^T a linear combination of v1 and v2?',
    source: 'Tirgul 5',
    pageNumber: 1,
    topic: 'linear-combinations',
    weekNumber: 5,
    difficulty: 'easy',
    relatedTheorems: [],
    relatedDefinitions: ['w5-def-linear-combination'],
    solution:
      'No. If (0,0,1)^T = α1(1,0,0)^T + α2(0,1,0)^T = (α1, α2, 0)^T, then we need 0 = 1 in the third component, which is impossible. ' +
      'Geometrically, any linear combination of v1 and v2 lies in the xy-plane and cannot reach the z-axis.',
  },
  {
    id: 'w5-pq-is-lc',
    question:
      'Is the vector (1,2,3)^T a linear combination of (2,0,4)^T, (1,1,1)^T, (5,4,1)^T ∈ R³?',
    source: 'Tirgul 5',
    pageNumber: 1,
    topic: 'linear-combinations',
    weekNumber: 5,
    difficulty: 'medium',
    relatedTheorems: ['w3-thm-solution-count'],
    relatedDefinitions: ['w5-def-linear-combination'],
    solution:
      'Set up x1(2,0,4)^T + x2(1,1,1)^T + x3(5,4,1)^T = (1,2,3)^T. Row reduce the augmented matrix. ' +
      'The system is consistent (no contradiction row), so yes. The unique solution is x1 = -1/5, x2 = 22/5, x3 = -3/5.',
    solutionSteps: [
      'Write the augmented matrix [2 1 5 | 1; 0 1 4 | 2; 4 1 1 | 3]',
      'R3 → R3 − 2R1: [2 1 5 | 1; 0 1 4 | 2; 0 -1 -9 | 1]',
      'R3 → R3 + R2: [2 1 5 | 1; 0 1 4 | 2; 0 0 -5 | 3]',
      'Back-substitute to find x3 = -3/5, x2 = 22/5, x1 = -1/5',
    ],
  },
  {
    id: 'w5-pq-find-spanning-set',
    question:
      'Prove that U1 = {(x1,x2,x3,x4)^T ∈ Z5⁴ | x1+2x2+3x3+x4=0 and 2x1+3x2+x3+2x4=0} is a subspace of Z5⁴ by finding a spanning set.',
    source: 'Tirgul 5',
    pageNumber: 6,
    topic: 'span',
    weekNumber: 5,
    difficulty: 'hard',
    relatedTheorems: ['w5-thm-span-is-subspace'],
    relatedDefinitions: ['w5-def-span', 'w4-def-subspace'],
    solution:
      'Row reduce: the RREF gives x1 = 2x3 + 4x4, x2 = 0. So the general solution is t1·(2,0,1,0)^T + t2·(4,0,0,1)^T for t1,t2 ∈ Z5. ' +
      'Therefore U1 = span{(2,0,1,0)^T, (4,0,0,1)^T}, which is a subspace since every span is a subspace.',
  },
];

// ============================================================
// ASSEMBLE WEEKS
// ============================================================

export const weeksData: StudyWeek[] = [
  {
    id: 'week-1',
    weekNumber: 1,
    title: 'Fields',
    titleHe: 'שדות',
    description:
      'Field axioms (12 axioms), examples of fields (R, F2, F3), counter-examples (N, Z are not fields), properties: no zero divisors, negative of sum, inverse of product, custom operations on R\\{1}.',
    topics: ['fields'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 01 2026.pdf', 'LA01 lecture 02 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_1_Omer.pdf'],
    definitions: week1Definitions,
    theorems: week1Theorems,
    proofs: week1Proofs,
    techniques: week1Techniques,
    formulas: [],
    examples: [],
    practiceQuestions: week1PracticeQuestions,
    isCompleted: false,
  },
  {
    id: 'week-2',
    weekNumber: 2,
    title: 'Complex Numbers',
    titleHe: 'מספרים מרוכבים',
    description:
      'Definition of complex numbers (C), operations (addition, multiplication), real/imaginary parts, conjugate, modulus, z·z̄=|z|², C is a field, modular arithmetic, Zp is a field iff p is prime.',
    topics: ['complex-numbers', 'fields'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 03 2026.pdf', 'LA01 lecture 04 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_2_Omer.pdf'],
    definitions: week2Definitions,
    theorems: week2Theorems,
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: week2PracticeQuestions,
    isCompleted: false,
  },
  {
    id: 'week-3',
    weekNumber: 3,
    title: 'Linear Equations',
    titleHe: 'משוואות ליניאריות',
    description:
      'Systems of linear equations, augmented matrix, elementary row operations, row equivalence, echelon form, RREF, Gauss-Jordan elimination, free/bound variables, solution counting, parametric systems.',
    topics: ['linear-equations', 'row-reduction'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 05 2026.pdf', 'LA01 lecture 06 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_3_Omer.pdf'],
    definitions: week3Definitions,
    theorems: week3Theorems,
    proofs: [],
    techniques: week3Techniques,
    formulas: [],
    examples: [],
    practiceQuestions: week3PracticeQuestions,
    isCompleted: false,
  },
  {
    id: 'week-4',
    weekNumber: 4,
    title: 'Vector Spaces',
    titleHe: 'מרחבים וקטוריים',
    description:
      'Vector spaces (10 axioms), Fn column vectors, Mm×n(F) matrix spaces, FA function spaces, vector space properties, subspaces, subspace criteria (standard and alternative), union of subspaces, homogeneous system solution sets.',
    topics: ['vector-spaces', 'subspaces'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 07 2026.pdf', 'LA01 lecture 08 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_4_Omer.pdf'],
    definitions: week4Definitions,
    theorems: week4Theorems,
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: week4PracticeQuestions,
    isCompleted: false,
  },
  {
    id: 'week-5',
    weekNumber: 5,
    title: 'Linear Combinations and Span',
    titleHe: 'צירוף ליניארי ופרוש',
    description:
      'Linear combinations, span of vectors, span is a subspace, spanning sets, checking membership in span via Gauss-Jordan, adding/removing vectors from span, replacing vectors in spanning sets, proving subspaces via span.',
    topics: ['linear-combinations', 'span'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 09 2026.pdf', 'LA01 lecture 10 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_5_Omer.pdf'],
    definitions: week5Definitions,
    theorems: week5Theorems,
    proofs: [],
    techniques: week5Techniques,
    formulas: [],
    examples: [],
    practiceQuestions: week5PracticeQuestions,
    isCompleted: false,
  },
  // ============================================================
  // WEEK 6 — Tirgul 6: Linear Dependence (תלות לינארית)
  // ============================================================
  {
    id: 'week-6',
    weekNumber: 6,
    title: 'Linear Dependence',
    titleHe: 'תלות לינארית',
    description: 'Linear dependence and independence of vectors, checking dependence via row reduction, properties of linearly dependent and independent sets',
    topics: ['linear-independence'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 11 2026.pdf', 'LA01 lecture 12 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf'],
    definitions: [
      {
        id: 'def-t6-linear-dependence',
        type: 'definition',
        title: 'Linear Independence and Dependence',
        titleHe: 'בלתי תלות לינארית ותלות לינארית',
        verbatimContent: `Let V be a vector space over a field F and let v1, ..., vk in V.
1. The vectors v1, ..., vk are linearly independent (LI) if for all a1, ..., ak in F, whenever a1*v1 + ... + ak*vk = 0_V then a1 = ... = ak = 0_F.
2. The vectors v1, ..., vk are linearly dependent (LD) if there exist a1, ..., ak in F, not all zero, such that a1*v1 + ... + ak*vk = 0_V.
When all scalars in the equation are zero, we call it the trivial combination. Being LI means the only zero-combination is the trivial one.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf',
        pageNumber: 1,
        topic: 'linear-independence',
        weekNumber: 6,
        tags: ['linear-independence', 'linear-dependence', 'fundamental'],
        relatedItems: ['def-t6-checking-dependence'],
        likelihoodScore: 98,
        examFrequency: 15,
      },
      {
        id: 'def-t6-checking-dependence',
        type: 'definition',
        title: 'Checking Linear Dependence via Row Reduction',
        titleHe: 'בדיקת תלות לינארית',
        verbatimContent: `To check if v1, ..., vk are LI or LD: write a1*v1 + ... + ak*vk = 0_V, convert to a homogeneous system of equations (with a1, ..., ak as unknowns), and row-reduce. If the only solution is trivial (all free variables are zero), the vectors are LI. If there is a free variable, there exists a non-trivial solution and the vectors are LD.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf',
        pageNumber: 2,
        topic: 'linear-independence',
        weekNumber: 6,
        tags: ['row-reduction', 'technique', 'checking-dependence'],
        relatedItems: ['def-t6-linear-dependence'],
        likelihoodScore: 90,
        examFrequency: 10,
      },
    ],
    theorems: [
      {
        id: 'thm-t6-properties-of-dependence',
        type: 'theorem',
        title: 'Properties of Linear Dependence',
        titleHe: 'תכונות של תלות לינארית',
        verbatimContent: `Let V be a vector space over F.
1. 0_V is linearly dependent.
2. A single vector v1 is LD if and only if v1 = 0_V.
3. If one of v1, ..., vm is the zero vector, then they are LD.
4. v, u in V are LD if and only if there exists a scalar a in F such that u = a*v or v = a*u.
5. If A = {v1, ..., vm} is LI and B is a subset of A, then B is also LI.
6. v1, ..., vk are LI if and only if for every v in span{v1, ..., vk} there exist unique scalars a1, ..., ak such that v = a1*v1 + ... + ak*vk.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf',
        pageNumber: 4,
        topic: 'linear-independence',
        weekNumber: 6,
        tags: ['properties', 'zero-vector', 'uniqueness'],
        relatedItems: ['def-t6-linear-dependence'],
        likelihoodScore: 92,
        examFrequency: 10,
      },
      {
        id: 'thm-t6-dependence-predecessors',
        type: 'theorem',
        title: 'Dependence via Predecessors and Others',
        titleHe: 'תלות לינארית דרך קודמים ואחרים',
        verbatimContent: `Let V be a vector space over F.
7. v1, ..., vk are LD if and only if there exists 1 <= j <= k such that vj in span{v1, ..., v_{j-1}}.
8. v1, ..., vk are LD if and only if there exists 1 <= j <= k such that vj in span{v1, ..., v_{j-1}, v_{j+1}, ..., vk}.
(Proofs in lecture.)`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf',
        pageNumber: 4,
        topic: 'linear-independence',
        weekNumber: 6,
        tags: ['characterization', 'span', 'dependence'],
        relatedItems: ['thm-t6-properties-of-dependence'],
        likelihoodScore: 88,
        examFrequency: 8,
      },
      {
        id: 'thm-t6-li-v1v2-iff-v1plusv2-v1minusv2',
        type: 'theorem',
        title: '{v1, v2} LI iff {v1+v2, v1-v2} LI (over R)',
        titleHe: '{v1, v2} בת"ל אם"ם {v1+v2, v1-v2} בת"ל',
        verbatimContent: `Let V be a vector space over R and let v1, v2 in V. Then {v1, v2} is LI if and only if {v1+v2, v1-v2} is LI.
Proof sketch: If a*(v1+v2) + b*(v1-v2) = 0, then (a+b)*v1 + (a-b)*v2 = 0. Since v1,v2 are LI, a+b=0 and a-b=0, giving a=b=0. The reverse direction is similar, rewriting a*v1+b*v2 as ((a+b)/2)*(v1+v2) + ((a-b)/2)*(v1-v2) = 0.
Remark: This holds over any field F where 1_F + 1_F != 0_F.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf',
        pageNumber: 5,
        topic: 'linear-independence',
        weekNumber: 6,
        tags: ['proof', 'equivalence', 'linear-independence'],
        relatedItems: ['def-t6-linear-dependence'],
        likelihoodScore: 80,
        examFrequency: 5,
      },
    ],
    proofs: [],
    techniques: [
      {
        id: 'tech-t6-row-reduce-for-li',
        type: 'technique',
        title: 'Row Reduction to Check Independence',
        titleHe: 'דירוג לבדיקת בת"ל',
        verbatimContent: `To determine if vectors are LI: form the equation a1*v1 + ... + ak*vk = 0, translate to a homogeneous linear system, form the augmented matrix, and apply Gauss-Jordan elimination. If every variable is a pivot variable (no free variables), the vectors are LI. If there is a free variable, they are LD.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf',
        pageNumber: 2,
        topic: 'linear-independence',
        weekNumber: 6,
        tags: ['technique', 'row-reduction', 'gauss-jordan'],
        relatedItems: ['def-t6-checking-dependence'],
      },
    ],
    formulas: [],
    examples: [],
    practiceQuestions: [
      {
        id: 'pq-t6-1',
        question: 'Are the vectors v1=(1,1,0), v2=(0,0,1), v3=(2,2,-1) in R^3 spanning? Are they linearly independent?',
        source: 'Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf',
        pageNumber: 2,
        topic: 'linear-independence',
        weekNumber: 6,
        difficulty: 'medium',
        relatedTheorems: ['thm-t6-properties-of-dependence'],
        relatedDefinitions: ['def-t6-linear-dependence'],
        solution: 'They do not span R^3 and they are LD since v3 = 2*v1 - v2, giving the non-trivial relation 2*v1 - v2 - v3 = 0.',
      },
      {
        id: 'pq-t6-2',
        question: 'Are the vectors v1=(1,1,0), v2=(0,0,1), v3=(1,2,3) in R^3 spanning? Are they linearly independent?',
        source: 'Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf',
        pageNumber: 3,
        topic: 'linear-independence',
        weekNumber: 6,
        difficulty: 'medium',
        relatedTheorems: [],
        relatedDefinitions: ['def-t6-linear-dependence'],
        solution: 'Yes (spanning) and Yes (LI). Row reduction of the system yields the identity matrix, so each vector in R^3 has a unique representation and the only zero-combination is trivial.',
      },
      {
        id: 'pq-t6-3',
        question: 'For which values of a in Z_5 are the three matrices in M_{2x2}(Z_5): ((1,a),(0,0)), ((2,a+1),(a,0)), ((3,a+2),(3,0)) linearly dependent?',
        source: 'Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf',
        pageNumber: 4,
        topic: 'linear-independence',
        weekNumber: 6,
        difficulty: 'hard',
        relatedTheorems: ['thm-t6-properties-of-dependence'],
        relatedDefinitions: ['def-t6-linear-dependence'],
        solution: 'Row reduction with parameter a shows a free variable exists iff (-2a+2)(a-2) = 0 in Z_5, i.e. (3a+2)(a+3) = 0, giving a = 1 or a = 2. For a = 0,3,4 the vectors are LI.',
      },
    ],
    isCompleted: false,
  },

  // ============================================================
  // WEEK 7 — Tirgul 7: Basis (בסיס)
  // ============================================================
  {
    id: 'week-7',
    weekNumber: 7,
    title: 'Basis',
    titleHe: 'בסיס',
    description: 'Definition of basis, standard bases, dimension, Steinitz exchange lemma, properties of dimension',
    topics: ['basis'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 13 2026.pdf', 'LA01 lecture 14 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf'],
    definitions: [
      {
        id: 'def-t7-basis',
        type: 'definition',
        title: 'Basis',
        titleHe: 'בסיס',
        verbatimContent: `Let V be a vector space over a field F. A set of vectors B = {v1, ..., vn} in V is a basis of V if it is linearly independent and spans V (i.e., V = span{v1, ..., vn}).
Remark: If v1, ..., vn is a basis of V, then for every v in V there is a unique representation of v as a linear combination of v1, ..., vn, i.e., unique scalars a1, ..., an in F such that v = a1*v1 + ... + an*vn.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf',
        pageNumber: 1,
        topic: 'basis',
        weekNumber: 7,
        tags: ['basis', 'fundamental', 'unique-representation'],
        relatedItems: ['def-t7-standard-basis', 'def-t7-dimension'],
        likelihoodScore: 98,
        examFrequency: 18,
      },
      {
        id: 'def-t7-standard-basis',
        type: 'definition',
        title: 'Standard Basis and Unit Vectors',
        titleHe: 'בסיס סטנדרטי ווקטורי יחידה',
        verbatimContent: `Let ei in F^n be the i-th unit vector of order n: a vector with n components, all 0_F except the i-th coordinate which is 1_F.
The n unit vectors {e1, ..., en} form the standard basis of F^n.
Similarly, {1, x, ..., x^n} is the standard basis of F_n[x], and M_{m x n}(F) has a standard basis of m*n matrices with 1 in one entry and 0 elsewhere.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf',
        pageNumber: 1,
        topic: 'basis',
        weekNumber: 7,
        tags: ['standard-basis', 'unit-vector', 'examples'],
        relatedItems: ['def-t7-basis'],
        likelihoodScore: 85,
        examFrequency: 8,
      },
      {
        id: 'def-t7-dimension',
        type: 'definition',
        title: 'Dimension',
        titleHe: 'מימד',
        verbatimContent: `Let V be a vector space over a field F.
1. If V = {0_V}, then the empty set is a basis of V, and dim V = 0.
2. If V is not finitely generated, then dim V = infinity.
3. If V is finitely generated and V != {0_V}, then there exist v1, ..., vn in V that form a basis of V, and dim V = n.
Examples: dim F^n = n, dim M_{n x m}(F) = n*m, dim F_n[x] = n+1.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf',
        pageNumber: 3,
        topic: 'basis',
        weekNumber: 7,
        tags: ['dimension', 'fundamental'],
        relatedItems: ['def-t7-basis'],
        likelihoodScore: 95,
        examFrequency: 15,
      },
    ],
    theorems: [
      {
        id: 'thm-t7-steinitz-exchange',
        type: 'theorem',
        title: 'Steinitz Exchange Lemma',
        titleHe: 'למת ההחלפה של שטייניץ',
        verbatimContent: `Let V be a finitely generated vector space over a field F. If {v1, ..., vk} is LI and {w1, ..., wm} is spanning, then k <= m.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf',
        pageNumber: 2,
        topic: 'basis',
        weekNumber: 7,
        tags: ['steinitz', 'exchange-lemma', 'key-theorem'],
        relatedItems: ['def-t7-dimension', 'thm-t7-all-bases-same-size'],
        likelihoodScore: 92,
        examFrequency: 10,
      },
      {
        id: 'thm-t7-all-bases-same-size',
        type: 'theorem',
        title: 'All Bases Have the Same Size',
        titleHe: 'לכל הבסיסים אותו גודל',
        verbatimContent: `Let V be a finitely generated vector space. Any two bases of V have the same number of elements.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf',
        pageNumber: 3,
        topic: 'basis',
        weekNumber: 7,
        tags: ['dimension', 'well-defined'],
        relatedItems: ['thm-t7-steinitz-exchange', 'def-t7-dimension'],
        likelihoodScore: 90,
        examFrequency: 8,
      },
      {
        id: 'thm-t7-dim-n-equivalences',
        type: 'theorem',
        title: 'Equivalences for Sets of Size dim(V)',
        titleHe: 'תנאים שקולים לקבוצה בגודל dim V',
        verbatimContent: `Let V be a vector space over F with dim V = n, and let B = {v1, ..., vn} be a set of n vectors in V. The following are equivalent:
1. B is a basis of V.
2. B is linearly independent.
3. B spans V.
Also equivalent: B is a basis iff B is a minimal spanning set iff B is a maximal LI set.
Furthermore: any n+1 vectors are LD, and any n-1 vectors do not span V.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf',
        pageNumber: 3,
        topic: 'basis',
        weekNumber: 7,
        tags: ['equivalence', 'basis', 'dimension', 'key-theorem'],
        relatedItems: ['def-t7-basis', 'def-t7-dimension'],
        likelihoodScore: 95,
        examFrequency: 12,
      },
    ],
    proofs: [],
    techniques: [
      {
        id: 'tech-t7-verify-basis',
        type: 'technique',
        title: 'Verifying a Basis',
        titleHe: 'בדיקה שקבוצה היא בסיס',
        verbatimContent: `To verify B is a basis of V: show B spans V (every vector is a linear combination of B) and B is LI (the only zero-combination is trivial), both via row reduction. If dim V is known and |B| = dim V, it suffices to prove either spanning or LI alone.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf',
        pageNumber: 2,
        topic: 'basis',
        weekNumber: 7,
        tags: ['technique', 'row-reduction'],
        relatedItems: ['def-t7-basis', 'thm-t7-dim-n-equivalences'],
      },
    ],
    formulas: [],
    examples: [],
    practiceQuestions: [
      {
        id: 'pq-t7-1',
        question: 'Show that B = {(1,1,1), (2,0,3), (0,-1,1)} is a basis of R^3.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf',
        pageNumber: 1,
        topic: 'basis',
        weekNumber: 7,
        difficulty: 'medium',
        relatedTheorems: ['thm-t7-dim-n-equivalences'],
        relatedDefinitions: ['def-t7-basis'],
        solution: 'Row-reduce the augmented matrix [v1|v2|v3|b] and show that for every b in R^3 there is a unique solution. Since dim R^3 = 3 and |B|=3, showing either LI or spanning suffices.',
      },
      {
        id: 'pq-t7-2',
        question: 'Given that B = {x-3, x^2-9} is a basis of W = {p(x) in R_2[x] | p(3) = 0}, determine if C = {-2x+6, x^2+3x-18, 2x^2-5x-3} is also a basis.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf',
        pageNumber: 2,
        topic: 'basis',
        weekNumber: 7,
        difficulty: 'medium',
        relatedTheorems: ['thm-t7-dim-n-equivalences'],
        relatedDefinitions: ['def-t7-basis'],
        solution: 'No. C is not LI because the third polynomial is a linear combination of the first two: 2x^2-5x-3 = (11/2)*(-2x+6) + 2*(x^2+3x-18). Since dim W = 2 but |C| = 3, C cannot be a basis.',
      },
      {
        id: 'pq-t7-3',
        question: 'Prove or disprove: there exist 4 vectors in R^3 such that every 3 of them are linearly independent.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf',
        pageNumber: 4,
        topic: 'basis',
        weekNumber: 7,
        difficulty: 'hard',
        relatedTheorems: ['thm-t7-dim-n-equivalences'],
        relatedDefinitions: ['def-t7-basis'],
        solution: 'True. Take the standard basis e1, e2, e3 and add v4 = (1,1,1). No pair among e1,e2,e3 spans v4 (it is not in any coordinate plane), so any 3 of the 4 are LI.',
      },
    ],
    isCompleted: false,
  },

  // ============================================================
  // WEEK 8 — Tirgul 8: Extension to Basis / Direct Sum
  // ============================================================
  {
    id: 'week-8',
    weekNumber: 8,
    title: 'Extension to Basis and Direct Sum',
    titleHe: 'השלמה לבסיס וסכום ישר',
    description: 'Extending a linearly independent set to a basis, sum of subspaces, dimension theorem, direct sum',
    topics: ['basis', 'dimension'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 15 2026.pdf', 'LA01 lecture 16 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf'],
    definitions: [
      {
        id: 'def-t8-sum-of-subspaces',
        type: 'definition',
        title: 'Sum of Subspaces',
        titleHe: 'סכום של תתי מרחבים',
        verbatimContent: `Let V be a vector space over F. Let U, W be subspaces of V. Their sum is defined as:
U + W = { u + w | u in U, w in W }.
U + W is a subspace of V, and U, W are both contained in U + W.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf',
        pageNumber: 2,
        topic: 'dimension',
        weekNumber: 8,
        tags: ['sum', 'subspaces', 'fundamental'],
        relatedItems: ['def-t8-direct-sum', 'thm-t8-dimension-theorem'],
        likelihoodScore: 90,
        examFrequency: 10,
      },
      {
        id: 'def-t8-direct-sum',
        type: 'definition',
        title: 'Direct Sum',
        titleHe: 'סכום ישר',
        verbatimContent: `Let U, W be subspaces of a vector space V. V is a direct sum of U and W if:
1. V = U + W.
2. U intersection W = {0_V}.
In this case we write V = U (+) W (direct sum).`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf',
        pageNumber: 5,
        topic: 'dimension',
        weekNumber: 8,
        tags: ['direct-sum', 'fundamental'],
        relatedItems: ['def-t8-sum-of-subspaces', 'thm-t8-direct-sum-criterion'],
        likelihoodScore: 92,
        examFrequency: 12,
      },
    ],
    theorems: [
      {
        id: 'thm-t8-extension-to-basis',
        type: 'theorem',
        title: 'Extension to Basis',
        titleHe: 'השלמה לבסיס',
        verbatimContent: `Let V be a finitely generated vector space over F with dim V = n. If v1, ..., vk in V are LI with k < n, then there exist v_{k+1}, ..., vn in V such that v1, ..., vk, ..., vn is a basis of V.
Remark: The extension to a basis is generally not unique.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf',
        pageNumber: 1,
        topic: 'basis',
        weekNumber: 8,
        tags: ['extension', 'basis', 'key-theorem'],
        relatedItems: ['def-t8-sum-of-subspaces'],
        likelihoodScore: 95,
        examFrequency: 12,
      },
      {
        id: 'thm-t8-dimension-theorem',
        type: 'theorem',
        title: 'First Dimension Theorem',
        titleHe: 'משפט המימדים הראשון',
        verbatimContent: `Let U, W be subspaces of a finitely generated vector space V over F. Then:
dim(U + W) = dim U + dim W - dim(U intersection W).`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf',
        pageNumber: 3,
        topic: 'dimension',
        weekNumber: 8,
        tags: ['dimension-theorem', 'key-theorem', 'inclusion-exclusion'],
        relatedItems: ['def-t8-sum-of-subspaces', 'def-t8-direct-sum'],
        likelihoodScore: 98,
        examFrequency: 15,
      },
      {
        id: 'thm-t8-direct-sum-criterion',
        type: 'theorem',
        title: 'Direct Sum via Dimension',
        titleHe: 'סכום ישר לפי מימד',
        verbatimContent: `Let U, W be subspaces of a finitely generated vector space V such that V = U + W. Then V = U (+) W (direct sum) if and only if dim V = dim U + dim W.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf',
        pageNumber: 5,
        topic: 'dimension',
        weekNumber: 8,
        tags: ['direct-sum', 'criterion', 'dimension'],
        relatedItems: ['def-t8-direct-sum', 'thm-t8-dimension-theorem'],
        likelihoodScore: 90,
        examFrequency: 10,
      },
      {
        id: 'thm-t8-direct-sum-unique-representation',
        type: 'proposition',
        title: 'Direct Sum Equivalent Condition: Unique Representation',
        titleHe: 'תנאי שקול לסכום ישר: הצגה יחידה',
        verbatimContent: `Let V be a vector space, and U, W subspaces. U intersection W = {0_V} if and only if for every v in U + W there exist unique u in U and w in W such that v = u + w.
Proof: If the intersection is trivial and u1+w1 = u2+w2, then u1-u2 = w2-w1 is in both U and W, hence equals 0. Conversely, if representation is unique, any v in the intersection satisfies v = v + 0 = 0 + v, so v = 0.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf',
        pageNumber: 6,
        topic: 'dimension',
        weekNumber: 8,
        tags: ['direct-sum', 'unique-representation', 'equivalent-condition'],
        relatedItems: ['def-t8-direct-sum'],
        likelihoodScore: 88,
        examFrequency: 8,
      },
    ],
    proofs: [],
    techniques: [
      {
        id: 'tech-t8-extend-to-basis',
        type: 'technique',
        title: 'Algorithm: Extend LI Set to Basis',
        titleHe: 'אלגוריתם: השלמה לבסיס',
        verbatimContent: `Given LI vectors u1, ..., uk in V = R^n: compute span{u1, ..., uk} to find which coordinate constraints a general element satisfies. Choose a vector not in that span. Verify the new set is still LI (it will be if the new vector is not a linear combination of the previous ones). Repeat until you have dim V vectors.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf',
        pageNumber: 1,
        topic: 'basis',
        weekNumber: 8,
        tags: ['technique', 'extension', 'algorithm'],
        relatedItems: ['thm-t8-extension-to-basis'],
      },
    ],
    formulas: [],
    examples: [],
    practiceQuestions: [
      {
        id: 'pq-t8-1',
        question: 'Let S = {u1=(1,0,1,2), u2=(0,1,1,2)} in R^4 and U = span(S). Extend S to a basis of R^4, and find a subspace W such that U intersection W = {0} and dim W = dim R^4 - dim U.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf',
        pageNumber: 1,
        topic: 'basis',
        weekNumber: 8,
        difficulty: 'hard',
        relatedTheorems: ['thm-t8-extension-to-basis'],
        relatedDefinitions: ['def-t8-direct-sum'],
        solution: 'A general element of span(S) is (a, b, a+b, 2a+2b). Choosing u3=(0,0,1,0) (3rd coordinate not equal to sum of first two) and u4=(0,0,0,1), we get a basis of R^4. Then W = span{u3, u4}, dim W = 2, and U intersection W = {0} since u1,u2,u3,u4 are LI.',
      },
      {
        id: 'pq-t8-2',
        question: 'Compute dim(span{(1,0,0,0),(0,1,1,0)} intersection span{(0,0,1,0),(0,1,0,1)}) in R^4.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf',
        pageNumber: 3,
        topic: 'dimension',
        weekNumber: 8,
        difficulty: 'medium',
        relatedTheorems: ['thm-t8-dimension-theorem'],
        relatedDefinitions: ['def-t8-sum-of-subspaces'],
        solution: 'Let U = span{(1,0,0,0),(0,1,1,0)}, W = span{(0,0,1,0),(0,1,0,1)}. Both have dim 2. Their sum spans all 4 vectors, which row-reduce to show dim(U+W) = 3. By the dimension theorem: dim(U intersection W) = 2 + 2 - 3 = 1.',
      },
      {
        id: 'pq-t8-3',
        question: 'Prove that R_n[x] = {p(x) in R_n[x] | p(0) = 0} + {p(x) in R_n[x] | p(1) = 0}.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf',
        pageNumber: 3,
        topic: 'dimension',
        weekNumber: 8,
        difficulty: 'hard',
        relatedTheorems: ['thm-t8-dimension-theorem'],
        relatedDefinitions: ['def-t8-sum-of-subspaces'],
        solution: 'For any p(x) = a_n*x^n + ... + a_1*x + a_0, write p(x) = (a_n*x^n + ... + a_1*x + a_0*x) + (a_0 - a_0*x). The first summand vanishes at 0, the second vanishes at 1. Alternatively, use the dimension theorem: each subspace has dimension n, their intersection has dimension n-1, so the sum has dimension n + n - (n-1) = n+1 = dim R_n[x].',
      },
    ],
    isCompleted: false,
  },

  // ============================================================
  // WEEK 9 — Tirgul 9: Matrices (מטריצות)
  // ============================================================
  {
    id: 'week-9',
    weekNumber: 9,
    title: 'Matrices',
    titleHe: 'מטריצות',
    description: 'Matrix multiplication, matrix-vector product as linear combination of columns, identity matrix, invertible matrices, inversion algorithm, diagonal matrices',
    topics: ['matrices'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 17 2026.pdf', 'LA01 lecture 18 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf'],
    definitions: [
      {
        id: 'def-t9-matrix-multiplication',
        type: 'definition',
        title: 'Matrix Multiplication',
        titleHe: 'כפל מטריצות',
        verbatimContent: `For A in M_{m x p}(F) and B in M_{p x n}(F), the product AB is a matrix of size m x n whose (i,j)-entry is the dot product of the i-th row of A with the j-th column of B:
[AB]_{ij} = a_{i1}*b_{1j} + ... + a_{ip}*b_{pj} = sum_{k=1}^{p} a_{ik}*b_{kj}.
Remark: A and B can be multiplied only if the number of columns of A equals the number of rows of B.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 1,
        topic: 'matrices',
        weekNumber: 9,
        tags: ['matrix-multiplication', 'fundamental'],
        relatedItems: ['def-t9-matrix-vector-product', 'thm-t9-matrix-properties'],
        likelihoodScore: 95,
        examFrequency: 15,
      },
      {
        id: 'def-t9-matrix-vector-product',
        type: 'definition',
        title: 'Matrix-Vector Product as Linear Combination of Columns',
        titleHe: 'כפל מטריצה בווקטור כצירוף לינארי של עמודות',
        verbatimContent: `Let A be an m x n matrix with columns a1, ..., an, and let x in F^n. Then:
A*x = x1*a1 + x2*a2 + ... + xn*an.
That is, A*x is a linear combination of the columns of A with the entries of x as coefficients. In particular, A*x is in span{a1, ..., an} for all x.
Corollary: AB can be viewed as the matrix whose columns are A*b1, A*b2, ..., A*bm where bj are the columns of B.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 3,
        topic: 'matrices',
        weekNumber: 9,
        tags: ['column-interpretation', 'linear-combination', 'key-insight'],
        relatedItems: ['def-t9-matrix-multiplication'],
        likelihoodScore: 92,
        examFrequency: 12,
      },
      {
        id: 'def-t9-identity-matrix',
        type: 'definition',
        title: 'Identity Matrix',
        titleHe: 'מטריצת היחידה',
        verbatimContent: `I_n in M_{n x n}(F) is the matrix whose columns are the unit vectors e1, ..., en in order. Its diagonal entries are all 1 and all other entries are 0. It satisfies I_n * v = v for all v in F^n, and I*A = A*I = A for all square matrices A.
Also: A*e_i extracts the i-th column of A.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 3,
        topic: 'matrices',
        weekNumber: 9,
        tags: ['identity-matrix', 'unit-vectors'],
        relatedItems: ['def-t9-invertible-matrix'],
        likelihoodScore: 88,
        examFrequency: 10,
      },
      {
        id: 'def-t9-invertible-matrix',
        type: 'definition',
        title: 'Invertible Matrix',
        titleHe: 'מטריצה הפיכה',
        verbatimContent: `A matrix A in M_n(F) is called left-invertible if there exists B with BA = I_n; right-invertible if there exists C with AC = I_n; invertible if there exists B with AB = BA = I_n. The matrix B is called the inverse of A, denoted A^{-1}. The inverse is unique.
Key fact: If AB = I_n then necessarily BA = I_n (one-sided implies two-sided for square matrices).`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 4,
        topic: 'matrices',
        weekNumber: 9,
        tags: ['invertible', 'inverse', 'fundamental'],
        relatedItems: ['def-t9-identity-matrix', 'tech-t9-inversion-algorithm'],
        likelihoodScore: 95,
        examFrequency: 15,
      },
      {
        id: 'def-t9-diagonal-matrix',
        type: 'definition',
        title: 'Diagonal Matrix',
        titleHe: 'מטריצה אלכסונית',
        verbatimContent: `A matrix D in M_n(F) is called diagonal if i != j implies a_{ij} = 0_F, i.e., all off-diagonal entries are zero.
A diagonal matrix is invertible if and only if all its diagonal entries are nonzero. If invertible, its inverse is the diagonal matrix with entries 1/a_{ii}.
Diagonal matrices commute: if D1, D2 are diagonal, then D1*D2 = D2*D1.
The set of diagonal matrices is a subspace of M_n(F) of dimension n.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 7,
        topic: 'matrices',
        weekNumber: 9,
        tags: ['diagonal', 'commutative', 'subspace'],
        relatedItems: ['def-t9-invertible-matrix'],
        likelihoodScore: 85,
        examFrequency: 8,
      },
    ],
    theorems: [
      {
        id: 'thm-t9-matrix-properties',
        type: 'theorem',
        title: 'Properties of Matrix Multiplication',
        titleHe: 'תכונות כפל מטריצות',
        verbatimContent: `For matrices of compatible sizes:
1. (AB)C = A(BC) (associativity).
2. A(B + C) = AB + AC (left distributivity).
3. (B + C)A = BA + CA (right distributivity).
4. a*(AB) = (a*A)*B = A*(a*B) (scalar associativity).
Note: Commutativity does NOT hold in general (AB != BA), and cancellation does NOT hold (BA = CA does not imply B = C).`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 1,
        topic: 'matrices',
        weekNumber: 9,
        tags: ['associativity', 'distributivity', 'non-commutativity'],
        relatedItems: ['def-t9-matrix-multiplication'],
        likelihoodScore: 90,
        examFrequency: 10,
      },
      {
        id: 'thm-t9-zero-divisors',
        type: 'proposition',
        title: 'Zero Divisors Exist in Matrices',
        titleHe: 'קיימים מחלקי אפס במטריצות',
        verbatimContent: `For any field F, there exist A, B in M_n(F) such that AB = 0 but A != 0 and B != 0.
Also: there exist A, B, C in M_n(F) with A != 0 such that BA = CA but B != C (cancellation fails).`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 2,
        topic: 'matrices',
        weekNumber: 9,
        tags: ['zero-divisors', 'non-cancellation'],
        relatedItems: ['thm-t9-matrix-properties'],
        likelihoodScore: 75,
        examFrequency: 5,
      },
      {
        id: 'thm-t9-zero-column-persists',
        type: 'theorem',
        title: 'Zero Column Persists Under Left Multiplication',
        titleHe: 'עמודת אפסים נשמרת בכפל משמאל',
        verbatimContent: `Let F be a field and A in M_n(F). If the j-th column of A is a zero column (all entries are 0_F), then for every B in M_n(F), the j-th column of BA is also a zero column.
Proof: [BA]_{ij} = sum_{k=1}^n [B]_{ik}*[A]_{kj} = sum_{k=1}^n [B]_{ik}*0_F = 0_F.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 2,
        topic: 'matrices',
        weekNumber: 9,
        tags: ['zero-column', 'multiplication'],
        relatedItems: ['def-t9-matrix-multiplication'],
        likelihoodScore: 78,
        examFrequency: 5,
      },
      {
        id: 'thm-t9-invertible-system',
        type: 'theorem',
        title: 'Invertible Matrix and Unique Solution',
        titleHe: 'מטריצה הפיכה ופתרון יחיד',
        verbatimContent: `If A in M_n(F) is invertible, then for every b in F^n, the equation Ax = b has a unique solution given by x = A^{-1}*b.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 5,
        topic: 'matrices',
        weekNumber: 9,
        tags: ['invertible', 'unique-solution', 'systems'],
        relatedItems: ['def-t9-invertible-matrix'],
        likelihoodScore: 92,
        examFrequency: 12,
      },
    ],
    proofs: [],
    techniques: [
      {
        id: 'tech-t9-inversion-algorithm',
        type: 'technique',
        title: 'Matrix Inversion Algorithm',
        titleHe: 'אלגוריתם היפוך מטריצה',
        verbatimContent: `To find A^{-1}: form the augmented matrix (A | I_n) and apply row reduction until the left side becomes I_n. The right side then becomes A^{-1}: (A | I_n) -> ... -> (I_n | A^{-1}).
If the left side cannot be reduced to I_n (i.e., the RREF has a zero row), then A is not invertible.`,
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 4,
        topic: 'matrices',
        weekNumber: 9,
        tags: ['algorithm', 'inversion', 'row-reduction'],
        relatedItems: ['def-t9-invertible-matrix'],
      },
    ],
    formulas: [],
    examples: [],
    practiceQuestions: [
      {
        id: 'pq-t9-1',
        question: 'Prove that AB = BA if and only if (A+B)^2 = A^2 + 2AB + B^2.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 2,
        topic: 'matrices',
        weekNumber: 9,
        difficulty: 'medium',
        relatedTheorems: ['thm-t9-matrix-properties'],
        relatedDefinitions: ['def-t9-matrix-multiplication'],
        solution: 'Expand (A+B)^2 = A^2 + AB + BA + B^2 using distributivity. Then (A+B)^2 = A^2 + 2AB + B^2 iff AB + BA = 2AB, i.e., BA - AB = 0, i.e., AB = BA.',
      },
      {
        id: 'pq-t9-2',
        question: 'Find whether the matrix A = [[1,2,1],[1,1,1],[2,1,1]] in M_3(R) is invertible, and if so find A^{-1}.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 4,
        topic: 'matrices',
        weekNumber: 9,
        difficulty: 'medium',
        relatedTheorems: ['thm-t9-invertible-system'],
        relatedDefinitions: ['def-t9-invertible-matrix'],
        solution: 'Apply the inversion algorithm: (A | I_3) row-reduces to (I_3 | A^{-1}). The RREF of A is I_3 so A is invertible. A^{-1} = [[0,-1,1],[1,-1,0],[-1,3,-1]].',
      },
      {
        id: 'pq-t9-3',
        question: 'Let A = [[i,0,0],[0,i,a],[0,0,i]] in M_3(C). Find all values of a in C for which A is invertible, and compute A^{-1}.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf',
        pageNumber: 6,
        topic: 'matrices',
        weekNumber: 9,
        difficulty: 'hard',
        relatedTheorems: ['thm-t9-invertible-system'],
        relatedDefinitions: ['def-t9-invertible-matrix'],
        solution: 'Apply the inversion algorithm. Row reduction produces a factor (a^2 + 1) in the third pivot. A is not invertible when a^2 + 1 = 0, i.e., a = i or a = -i. For all other a, A is invertible with A^{-1} = [[-i,0,0],[0,-i, ai/(a^2+1)],[0,0, -i/(a^2+1)]] (after full Gauss-Jordan reduction).',
      },
    ],
    isCompleted: false,
  },
  // ============================================================
  // WEEK 10 — Invertible Matrices (מטריצות הפיכות) — Tirgul 10
  // ============================================================
  {
    id: 'week-10',
    weekNumber: 10,
    title: 'Invertible Matrices',
    titleHe: 'מטריצות הפיכות',
    description: 'Elementary matrices, the Invertible Matrix Theorem, inversion algorithm, transpose and trace',
    topics: ['invertible-matrices'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 19 2026.pdf', 'LA01 lecture 20 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf'],
    definitions: [
      {
        id: 'def-elementary-matrix',
        type: 'definition',
        title: 'Elementary Matrix',
        titleHe: 'מטריצה אלמנטרית',
        verbatimContent:
          'Let E in Mn(F). We say E is an elementary matrix if E is obtained from In by applying a single elementary row operation. That is, there exist 1 <= i != j <= n and c != 0 such that E is obtained from In by one of: Ri -> cRi, Ri <-> Rj, or Ri -> Ri + cRj.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 1,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['elementary-matrix', 'row-operations', 'fundamental'],
        relatedItems: ['thm-elementary-invertible', 'thm-invertible-product-elementary'],
      },
      {
        id: 'def-transpose',
        type: 'definition',
        title: 'Transpose',
        titleHe: 'שחלוף',
        verbatimContent:
          'Let A in Mm×n(F). The transpose of A, denoted A^t, is the n×m matrix satisfying [A^t]_ij = [A]_ji for all 1 <= i <= n and 1 <= j <= m. In other words, the columns of A become the rows of A^t and vice versa.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 5,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['transpose', 'matrix-operation'],
        relatedItems: ['def-symmetric-matrix', 'thm-transpose-properties'],
      },
      {
        id: 'def-symmetric-matrix',
        type: 'definition',
        title: 'Symmetric and Anti-Symmetric Matrix',
        titleHe: 'מטריצה סימטרית ואנטי-סימטרית',
        verbatimContent:
          'Let A in Mn(F). A is called symmetric if A^t = A, and anti-symmetric if A^t = -A.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 5,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['symmetric', 'anti-symmetric', 'transpose'],
        relatedItems: ['def-transpose'],
      },
      {
        id: 'def-trace',
        type: 'definition',
        title: 'Trace',
        titleHe: 'עקבה',
        verbatimContent:
          'Let A in Mn(F) be a square matrix. The trace of A is the sum of the diagonal entries: trace(A) = sum_{i=1}^{n} [A]_{i,i}. The trace is a function trace: Mn(F) -> F defined only for square matrices.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 6,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['trace', 'diagonal', 'matrix-function'],
        relatedItems: ['thm-trace-linear', 'thm-trace-commutative'],
      },
    ],
    theorems: [
      {
        id: 'thm-elementary-invertible',
        type: 'theorem',
        title: 'Elementary Matrices are Invertible',
        titleHe: 'מטריצות אלמנטריות הפיכות',
        verbatimContent:
          'Every elementary matrix is invertible, and its inverse E^{-1} is the elementary matrix corresponding to the reverse row operation.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 1,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['elementary-matrix', 'invertible', 'row-operations'],
        relatedItems: ['def-elementary-matrix'],
      },
      {
        id: 'thm-row-equiv-elementary',
        type: 'theorem',
        title: 'Row Equivalence via Elementary Matrices',
        titleHe: 'שקילות שורות באמצעות מטריצות אלמנטריות',
        verbatimContent:
          'Let A, B in Mm×n(F) and suppose B is obtained from A by a single elementary row operation. Let E in Mm(F) be the corresponding elementary matrix. Then EA = B. Consequently, if A and B are row-equivalent, there exist elementary matrices E1,...,Ek in Mm(F) such that Ek · ... · E1 · A = B.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 2,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['row-equivalence', 'elementary-matrix'],
        relatedItems: ['def-elementary-matrix', 'thm-invertible-product-elementary'],
      },
      {
        id: 'thm-invertible-product-elementary',
        type: 'theorem',
        title: 'Invertible Matrix Equals Product of Elementary Matrices',
        titleHe: 'מטריצה הפיכה היא מכפלה של מטריצות אלמנטריות',
        verbatimContent:
          'A square matrix A is invertible if and only if A is row-equivalent to I. In that case A is a product of elementary matrices. The row operations (= multiplication by elementary matrices) that transform A to I also transform I to A^{-1}.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 2,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['invertible', 'elementary-matrix', 'row-reduction'],
        relatedItems: ['thm-invertible-matrix-theorem', 'def-elementary-matrix'],
      },
      {
        id: 'thm-invertible-matrix-theorem',
        type: 'theorem',
        title: 'Invertible Matrix Theorem',
        titleHe: 'משפט המטריצה ההפיכה',
        verbatimContent:
          'Let F be a field and A in Mn(F). The following are equivalent: (1) A is invertible. (2) For every b in F^n, Ax=b has a unique solution. (3) There exists b in F^n such that Ax=b has a unique solution. (4) Ax=0 has only the trivial solution. (5) A is row-equivalent to In. (6) A is a product of elementary matrices. (7) The columns of A are linearly independent. (8) The columns of A span F^n. (9) The columns of A form a basis for F^n. (10) The rows of A are linearly independent. (11) The rows of A span F^n. (12) The rows of A form a basis for F^n. (13) A^t is invertible.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 3,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['invertible-matrix-theorem', 'equivalences', 'fundamental'],
        relatedItems: ['thm-invertible-product-elementary'],
        likelihoodScore: 95,
        examFrequency: 8,
      },
      {
        id: 'thm-transpose-properties',
        type: 'theorem',
        title: 'Properties of Transpose',
        titleHe: 'תכונות השחלוף',
        verbatimContent:
          'Let A, B be matrices of appropriate sizes. Then: (1) (A^t)^t = A. (2) (A +/- B)^t = A^t +/- B^t. (3) (alphaA)^t = alphaA^t. (4) (AB)^t = B^t A^t. (5) (A^t)^{-1} = (A^{-1})^t.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 5,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['transpose', 'properties'],
        relatedItems: ['def-transpose'],
      },
      {
        id: 'thm-trace-linear',
        type: 'proposition',
        title: 'Trace is Linear',
        titleHe: 'העקבה מכבדת צירופים לינאריים',
        verbatimContent:
          'Let A, B in Mn(F) and alpha, beta in F. Then trace(alphaA + betaB) = alpha*trace(A) + beta*trace(B).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 6,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['trace', 'linearity'],
        relatedItems: ['def-trace', 'thm-trace-commutative'],
      },
      {
        id: 'thm-trace-commutative',
        type: 'lemma',
        title: 'Trace of Product is Commutative',
        titleHe: 'קומוטטיביות עקבה של מכפלה',
        verbatimContent:
          'For any two matrices C, D in Mn(F), tr(C * D) = tr(D * C).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 7,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['trace', 'commutative', 'product'],
        relatedItems: ['def-trace', 'thm-trace-linear'],
      },
    ],
    proofs: [
      {
        id: 'proof-trace-aat-zero',
        type: 'proof',
        title: 'Proof: trace(AA^t) = 0 implies A = 0 over R',
        titleHe: 'הוכחה: trace(AA^t) = 0 גורר A = 0 מעל R',
        verbatimContent:
          'The (i,i) entry of AA^t equals the sum of squares of the entries in the i-th row of A. Therefore trace(AA^t) = sum of squares of all entries of A. Over R, this sum is zero iff every entry is zero, so A = 0. Note: this fails over other fields (e.g., over C, the matrix A = [[i, i],[1, 1]] satisfies trace(AA^t)=0 but A != 0).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 7,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['trace', 'transpose', 'real-matrices'],
        relatedItems: ['def-trace', 'def-transpose'],
      },
    ],
    techniques: [
      {
        id: 'tech-inversion-algorithm',
        type: 'technique',
        title: 'Matrix Inversion Algorithm',
        titleHe: 'אלגוריתם היפוך מטריצה',
        verbatimContent:
          'To find A^{-1}: Augment A with the identity matrix (A | I_n), then row-reduce to canonical form. If the left side becomes I_n, the right side is A^{-1}: (A | I_n) -> ... -> (I_n | A^{-1}).',
        explanation: 'Row-reduce the augmented matrix [A | I]. Every row operation applied to A is simultaneously applied to I. If A reduces to I, then I has become A^{-1}.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 3,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['inversion', 'algorithm', 'row-reduction'],
        relatedItems: ['thm-invertible-product-elementary'],
      },
      {
        id: 'tech-2x2-inverse-formula',
        type: 'technique',
        title: '2x2 Inverse Formula',
        titleHe: 'נוסחה להופכית של מטריצה 2x2',
        verbatimContent:
          'A 2x2 matrix [[a,b],[c,d]] is invertible if and only if ad - bc != 0. In that case, A^{-1} = (1/(ad-bc)) * [[d, -b],[-c, a]].',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 4,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['2x2', 'inverse', 'formula'],
        relatedItems: ['thm-invertible-matrix-theorem'],
      },
    ],
    formulas: [
      {
        id: 'formula-2x2-inverse',
        type: 'formula',
        title: '2x2 Inverse',
        titleHe: 'הופכית 2x2',
        verbatimContent:
          'For A = [[a,b],[c,d]]: A^{-1} = (1/(ad-bc)) [[d,-b],[-c,a]], provided ad - bc != 0.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 4,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['formula', '2x2', 'inverse'],
        relatedItems: ['tech-2x2-inverse-formula'],
      },
      {
        id: 'formula-dim-antisymmetric',
        type: 'formula',
        title: 'Dimension of Symmetric and Anti-Symmetric Matrices',
        titleHe: 'מימד מרחב מטריצות סימטריות ואנטי-סימטריות',
        verbatimContent:
          'Assuming 1_F + 1_F != 0_F: dim(AS) = n(n-1)/2 and dim(SYM) = n(n+1)/2, where AS = {A in Mn(F) | A^t = -A} and SYM = {A in Mn(F) | A^t = A}.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 5,
        topic: 'invertible-matrices',
        weekNumber: 10,
        tags: ['dimension', 'symmetric', 'anti-symmetric'],
        relatedItems: ['def-symmetric-matrix'],
      },
    ],
    examples: [],
    practiceQuestions: [
      {
        id: 'pq-10-1',
        question:
          'Find the elementary matrices corresponding to the following row operations on 4xn matrices: (1) R2 -> 4R2, (2) R2 <-> R4, (3) R1 -> R1 - R3.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 1,
        topic: 'invertible-matrices',
        weekNumber: 10,
        difficulty: 'easy',
        relatedTheorems: ['thm-row-equiv-elementary'],
        relatedDefinitions: ['def-elementary-matrix'],
      },
      {
        id: 'pq-10-2',
        question:
          'Find the inverse of the elementary matrix E in M4(R) that corresponds to the row operation R3 -> R3 + 2R2.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 2,
        topic: 'invertible-matrices',
        weekNumber: 10,
        difficulty: 'easy',
        relatedTheorems: ['thm-elementary-invertible'],
        relatedDefinitions: ['def-elementary-matrix'],
        solution:
          'E corresponds to R3 -> R3 + 2R2. The inverse operation is R3 -> R3 - 2R2. So E^{-1} = [[1,0,0,0],[0,1,0,0],[0,-2,1,0],[0,0,0,1]].',
      },
      {
        id: 'pq-10-3',
        question:
          'Assuming 1_F + 1_F != 0_F, compute dim(AS) and dim(SYM) where AS = {A in Mn(F) | A^t = -A} and SYM = {A in Mn(F) | A^t = A}.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf',
        pageNumber: 5,
        topic: 'invertible-matrices',
        weekNumber: 10,
        difficulty: 'hard',
        relatedTheorems: [],
        relatedDefinitions: ['def-symmetric-matrix', 'def-transpose'],
        solution:
          'For AS: diagonal entries must be 0, and [A]_ij = -[A]_ji for i != j. A basis is {B_ij}_{i<j} where B_ij has 1 in position (i,j) and -1 in position (j,i). So dim(AS) = n(n-1)/2. Then dim(SYM) = n^2 - n(n-1)/2 = n(n+1)/2.',
      },
    ],
    isCompleted: false,
  },

  // ============================================================
  // WEEK 11 — Ax = b (Systems of Equations) — Tirgul 11
  // ============================================================
  {
    id: 'week-11',
    weekNumber: 11,
    title: 'Systems of Equations Ax=b',
    titleHe: 'מערכות משוואות Ax=b',
    description:
      'Linear systems as matrix equations, null space, homogeneous vs non-homogeneous systems, volume functions and introduction to determinants',
    topics: ['systems-of-equations', 'determinants'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 21 2026.pdf', 'LA01 lecture 22 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf'],
    definitions: [
      {
        id: 'def-linear-system-matrix',
        type: 'definition',
        title: 'Linear System Ax = b',
        titleHe: 'מערכת ליניארית Ax = b',
        verbatimContent:
          'Let F be a field, A in Mm*n(F), b in F^m, x in F^n. The linear system Ax = b with variables (x1,...,xn) is the system: a11*x1 + ... + a1n*xn = b1, ..., am1*x1 + ... + amn*xn = bm. A solution is any column vector v in F^n satisfying Av = b.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 1,
        topic: 'systems-of-equations',
        weekNumber: 11,
        tags: ['linear-system', 'matrix-equation', 'fundamental'],
        relatedItems: ['def-null-space'],
      },
      {
        id: 'def-null-space',
        type: 'definition',
        title: 'Null Space',
        titleHe: 'מרחב האפס',
        verbatimContent:
          'Let F be a field and A in Mm*n(F). The null space of A, denoted NulA, is the set of all solutions to the homogeneous system Ax = 0. In set notation: NulA = {x in F^n : Ax = 0}. The null space is a vector subspace of F^n.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 1,
        topic: 'systems-of-equations',
        weekNumber: 11,
        tags: ['null-space', 'kernel', 'subspace', 'homogeneous'],
        relatedItems: ['def-linear-system-matrix', 'thm-null-space-subspace'],
      },
      {
        id: 'def-multilinear',
        type: 'definition',
        title: 'Multilinear Function',
        titleHe: 'פונקציה מולטי-ליניארית',
        verbatimContent:
          'Given a matrix A in Mn(F) with rows R1,...,Rn, a function Delta: Mn(F) -> F is called multilinear if it is linear in each row. That is, for all R1,...,Rn, R, S in M1*n(F) and alpha, beta in F: Delta with row i replaced by alphaR + betaS equals alpha * Delta(with row i = R) + beta * Delta(with row i = S).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 4,
        topic: 'determinants',
        weekNumber: 11,
        tags: ['multilinear', 'determinant-property', 'volume-function'],
        relatedItems: ['def-alternating', 'def-volume-function'],
      },
      {
        id: 'def-alternating',
        type: 'definition',
        title: 'Alternating Function',
        titleHe: 'פונקציה מתחלפת',
        verbatimContent:
          'A function Delta: Mn(F) -> F is called alternating if for every A in Mn(F) having two equal rows, Delta(A) = 0.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 4,
        topic: 'determinants',
        weekNumber: 11,
        tags: ['alternating', 'determinant-property'],
        relatedItems: ['def-multilinear', 'def-volume-function'],
      },
      {
        id: 'def-volume-function',
        type: 'definition',
        title: 'Volume Function',
        titleHe: 'פונקציית נפח',
        verbatimContent:
          'A function Delta: Mn(F) -> F is called a volume function if it is multilinear, alternating, and satisfies Delta(In) = 1.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 5,
        topic: 'determinants',
        weekNumber: 11,
        tags: ['volume-function', 'determinant', 'fundamental'],
        relatedItems: ['def-multilinear', 'def-alternating', 'thm-det-unique'],
      },
      {
        id: 'def-upper-lower-triangular',
        type: 'definition',
        title: 'Upper/Lower Triangular Matrix',
        titleHe: 'מטריצה משולשית עליונה/תחתונה',
        verbatimContent:
          'A square matrix A in Mn(F) is called upper triangular if all entries below the main diagonal are zero (for all i > j, a_ij = 0). It is called lower triangular if all entries above the main diagonal are zero (for all j > i, a_ij = 0). A matrix is called triangular if it is upper or lower triangular.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 5,
        topic: 'determinants',
        weekNumber: 11,
        tags: ['triangular', 'upper-triangular', 'lower-triangular'],
        relatedItems: ['thm-det-triangular'],
      },
    ],
    theorems: [
      {
        id: 'thm-null-space-subspace',
        type: 'proposition',
        title: 'Null Space is a Subspace',
        titleHe: 'מרחב האפס הוא תת-מרחב',
        verbatimContent:
          'For any A in Mm*n(F), the null space NulA (= the solution set of the homogeneous system Ax = 0) is a vector subspace of F^n. That is: (1) 0 in NulA, and (2) for all v, w in NulA and alpha, beta in F: alpha*v + beta*w in NulA.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 2,
        topic: 'systems-of-equations',
        weekNumber: 11,
        tags: ['null-space', 'subspace'],
        relatedItems: ['def-null-space'],
      },
      {
        id: 'thm-null-space-dim',
        type: 'proposition',
        title: 'Dimension of Null Space Equals Number of Free Variables',
        titleHe: 'מימד מרחב האפס שווה למספר המשתנים החופשיים',
        verbatimContent:
          'The dimension of the null space of A equals the number of free variables. To find a basis for NulA, row-reduce A, then for each free variable set it to 1 and all other free variables to 0 -- the resulting vector is a basis element.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 2,
        topic: 'systems-of-equations',
        weekNumber: 11,
        tags: ['null-space', 'dimension', 'free-variables', 'basis'],
        relatedItems: ['def-null-space'],
      },
      {
        id: 'thm-solution-set-structure',
        type: 'theorem',
        title: 'Structure of Solution Set for Non-Homogeneous System',
        titleHe: 'מבנה קבוצת הפתרונות למערכת לא הומוגנית',
        verbatimContent:
          'Let F be a field, A in Mm*n(F), b in F^m. Define H = {u in F^n : Au = 0} and G = {w in F^n : Aw = b}. Then for every x0 in G: G = {u + x0 : u in H}. In words: if x0 is a particular solution of Ax = b and u is any solution of Ax = 0, then x0 + u is also a solution of Ax = b, and all solutions arise this way.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 2,
        topic: 'systems-of-equations',
        weekNumber: 11,
        tags: ['solution-set', 'homogeneous', 'non-homogeneous', 'affine'],
        relatedItems: ['def-null-space', 'def-linear-system-matrix'],
        likelihoodScore: 90,
        examFrequency: 6,
      },
      {
        id: 'thm-det-unique',
        type: 'theorem',
        title: 'Uniqueness of Volume Function (Determinant)',
        titleHe: 'קיום ויחידות פונקציית הנפח (דטרמיננטה)',
        verbatimContent:
          'There exists a unique volume function Delta: Mn(F) -> F. It is called the determinant and denoted det(A).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 5,
        topic: 'determinants',
        weekNumber: 11,
        tags: ['determinant', 'existence', 'uniqueness'],
        relatedItems: ['def-volume-function'],
        likelihoodScore: 85,
        examFrequency: 5,
      },
      {
        id: 'thm-det-row-operations',
        type: 'theorem',
        title: 'Effect of Row Operations on Determinant',
        titleHe: 'השפעת פעולות שורה על הדטרמיננטה',
        verbatimContent:
          'Let A in Mn(F) and B obtained from A by one elementary row operation. Then: (1) If Ri -> cRi (c != 0): det(B) = c * det(A). (2) If Ri <-> Rj (i != j): det(B) = -det(A). (3) If Ri -> Ri + cRj (i != j): det(B) = det(A).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 5,
        topic: 'determinants',
        weekNumber: 11,
        tags: ['determinant', 'row-operations', 'elementary'],
        relatedItems: ['def-volume-function', 'thm-det-unique'],
        likelihoodScore: 90,
        examFrequency: 7,
      },
      {
        id: 'thm-det-triangular',
        type: 'theorem',
        title: 'Determinant of Triangular Matrix',
        titleHe: 'דטרמיננטה של מטריצה משולשית',
        verbatimContent:
          'If A is a triangular matrix, then det(A) equals the product of the diagonal entries.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 5,
        topic: 'determinants',
        weekNumber: 11,
        tags: ['determinant', 'triangular', 'diagonal'],
        relatedItems: ['def-upper-lower-triangular'],
      },
      {
        id: 'thm-multilinear-zero-row',
        type: 'theorem',
        title: 'Multilinear Function Vanishes on Matrices with Zero Row',
        titleHe: 'פונקציה מולטי-ליניארית מתאפסת על מטריצה עם שורת אפסים',
        verbatimContent:
          'Let Delta be multilinear. If A has a zero row, then Delta(A) = 0.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 4,
        topic: 'determinants',
        weekNumber: 11,
        tags: ['multilinear', 'zero-row'],
        relatedItems: ['def-multilinear'],
      },
      {
        id: 'thm-row-swap-alternating',
        type: 'proposition',
        title: 'Row Swap Sign Change Implies Alternating',
        titleHe: 'החלפת שורות עם שינוי סימן גוררת מתחלפת',
        verbatimContent:
          'Let Delta: Mn(R) -> R be such that for all A, B where B is obtained from A by swapping two rows, Delta(A) = -Delta(B). Then Delta is alternating.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 5,
        topic: 'determinants',
        weekNumber: 11,
        tags: ['alternating', 'row-swap'],
        relatedItems: ['def-alternating'],
      },
    ],
    proofs: [],
    techniques: [
      {
        id: 'tech-det-by-row-reduction',
        type: 'technique',
        title: 'Computing Determinant by Row Reduction',
        titleHe: 'חישוב דטרמיננטה בדירוג',
        verbatimContent:
          'To compute det(A): perform a sequence of row operations to reach a triangular matrix. Track the effect: adding a multiple of one row to another does not change det; swapping two rows negates det; multiplying a row by c multiplies det by c. Then det = product of diagonal entries (adjusted for the operations performed).',
        explanation: 'Reduce to triangular form, then multiply diagonal entries with sign/scalar adjustments.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 5,
        topic: 'determinants',
        weekNumber: 11,
        tags: ['determinant', 'computation', 'row-reduction'],
        relatedItems: ['thm-det-row-operations', 'thm-det-triangular'],
      },
    ],
    formulas: [
      {
        id: 'formula-det-scalar-multiple',
        type: 'formula',
        title: 'Determinant of Scalar Multiple',
        titleHe: 'דטרמיננטה של כפולה סקלרית',
        verbatimContent:
          'det(alpha * A) = alpha^n * det(A). In particular, det(-A) = (-1)^n * det(A).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 6,
        topic: 'determinants',
        weekNumber: 11,
        tags: ['determinant', 'scalar', 'formula'],
        relatedItems: ['thm-det-row-operations'],
      },
    ],
    examples: [],
    practiceQuestions: [
      {
        id: 'pq-11-1',
        question:
          'Let A = [[1,2,1,0],[0,1,0,3],[3,1,3,1]] in M3x4(R). Find a basis for NulA.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 1,
        topic: 'systems-of-equations',
        weekNumber: 11,
        difficulty: 'medium',
        relatedTheorems: ['thm-null-space-dim'],
        relatedDefinitions: ['def-null-space'],
        solution:
          'Row-reduce to get x + z - 6w = 0, y + 3w = 0. Free variables: z, w. Basis: {(-1,0,1,0), (6,-3,0,1)}.',
      },
      {
        id: 'pq-11-2',
        question:
          'Let A in M2(R) and 0 != b in R^2 such that (2,1)^t and (4,5)^t are both solutions to Ax = b. Find the general solution to Ax = b.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 3,
        topic: 'systems-of-equations',
        weekNumber: 11,
        difficulty: 'medium',
        relatedTheorems: ['thm-solution-set-structure'],
        relatedDefinitions: ['def-null-space'],
        solution:
          'A homogeneous solution: (4,5)^t - (2,1)^t = (2,4)^t, so (-2,-4)^t in NulA. Since A is 2x2 with exactly 1 free variable, H = span{(-2,-4)^t}. General solution: G = {(2,1)^t + t(-2,-4)^t : t in R} = {(2-2t, 1-4t) : t in R}.',
      },
      {
        id: 'pq-11-3',
        question:
          'Compute the determinant of [[1,2,3],[1,4,3],[0,3,0]] by row reduction.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 6,
        topic: 'determinants',
        weekNumber: 11,
        difficulty: 'medium',
        relatedTheorems: ['thm-det-row-operations', 'thm-det-triangular'],
        relatedDefinitions: [],
        solution:
          'R2 -> R2 - R1 gives [[1,2,3],[0,2,0],[0,3,0]]. R2 -> (1/2)R2 gives factor 2. R3 -> R3 - 3R2 gives [[1,2,3],[0,1,0],[0,0,-3]]. Upper triangular: product 1*1*(-3) = -3. With factor: 2*(-3) = -6.',
      },
      {
        id: 'pq-11-4',
        question:
          'Let A be an 11x11 real matrix whose entries are all odd integers. Prove that 1024 divides det(A). (Hint: the sum of two odd numbers is divisible by 2.)',
        source: 'Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf',
        pageNumber: 7,
        topic: 'determinants',
        weekNumber: 11,
        difficulty: 'hard',
        relatedTheorems: ['thm-det-row-operations'],
        relatedDefinitions: [],
        solution:
          'For each i from 2 to 11, perform Ri -> Ri + R1. Each new row has even entries. Factor out 2 from each of the 10 modified rows: det(A) = 2^10 * det(C) = 1024 * det(C) where C has integer entries, so det(C) is an integer.',
      },
    ],
    isCompleted: false,
  },

  // ============================================================
  // WEEK 12 — Determinants (דטרמיננטה) — Tirgul 12
  // ============================================================
  {
    id: 'week-12',
    weekNumber: 12,
    title: 'Determinants',
    titleHe: 'דטרמיננטה',
    description:
      'Determinant via minors (cofactor expansion), determinant with parameters, Vandermonde matrix, determinant and invertibility, multiplicativity, block matrices',
    topics: ['determinants'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 23 2026.pdf', 'LA01 lecture 24 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf'],
    definitions: [
      {
        id: 'def-minor',
        type: 'definition',
        title: 'Minor',
        titleHe: 'מינור',
        verbatimContent:
          'The (i,j)-minor of a matrix A in Mn(F), denoted M_ij, is the determinant of the (n-1)x(n-1) matrix obtained from A by removing row i and column j.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 1,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['minor', 'cofactor', 'determinant'],
        relatedItems: ['thm-cofactor-expansion'],
      },
      {
        id: 'def-det-recursive',
        type: 'definition',
        title: 'Recursive Definition of Determinant',
        titleHe: 'הגדרה רקורסיבית של דטרמיננטה',
        verbatimContent:
          'For n = 1: det((a)) = a. For n > 1: det(A) = sum_{j=1}^{n} (-1)^{1+j} * [A]_{1j} * M_{1j} (expansion along the first row).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 1,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['determinant', 'recursive', 'cofactor-expansion'],
        relatedItems: ['def-minor', 'thm-cofactor-expansion'],
      },
      {
        id: 'def-block-matrix',
        type: 'definition',
        title: 'Block Matrix',
        titleHe: 'מטריצת בלוקים',
        verbatimContent:
          'A block matrix is a way of writing a matrix by describing its parts as smaller matrices. For example, K in M4(R) can be written as K = [[A, B],[C, D]] where A, B, C, D in M2(R).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 7,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['block-matrix', 'partition'],
        relatedItems: ['thm-block-diagonal-det'],
      },
    ],
    theorems: [
      {
        id: 'thm-cofactor-expansion',
        type: 'theorem',
        title: 'Cofactor Expansion (Any Row or Column)',
        titleHe: 'פיתוח לפי מינורים מכל שורה או עמודה',
        verbatimContent:
          'Let A in Mn(F) and let 1 <= i <= n. The determinant can be computed by expanding along row i: det(A) = sum_{j=1}^{n} (-1)^{i+j} * [A]_ij * M_ij. Similarly, expanding along column j: det(A) = sum_{i=1}^{n} (-1)^{i+j} * [A]_ij * M_ij. The sign pattern is: +, -, +, -, ... starting from (-1)^{i+j}.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 1,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['cofactor-expansion', 'minors', 'determinant'],
        relatedItems: ['def-minor'],
        likelihoodScore: 90,
        examFrequency: 7,
      },
      {
        id: 'thm-2x2-det',
        type: 'proposition',
        title: '2x2 Determinant Formula',
        titleHe: 'נוסחת דטרמיננטה 2x2',
        verbatimContent:
          'For a matrix [[a,b],[c,d]] in M2(F): det = ad - bc.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 2,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['2x2', 'determinant', 'formula'],
        relatedItems: ['thm-cofactor-expansion'],
      },
      {
        id: 'thm-det-invertible',
        type: 'theorem',
        title: 'A Matrix is Invertible iff det != 0',
        titleHe: 'מטריצה הפיכה אמ"מ הדטרמיננטה שונה מאפס',
        verbatimContent:
          'A square matrix A in Mn(F) is invertible if and only if det(A) != 0.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 3,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['determinant', 'invertible', 'fundamental'],
        relatedItems: ['thm-invertible-matrix-theorem'],
        likelihoodScore: 95,
        examFrequency: 9,
      },
      {
        id: 'thm-det-transpose-eq',
        type: 'theorem',
        title: 'Determinant of Transpose',
        titleHe: 'דטרמיננטה של שחלוף',
        verbatimContent:
          'For a square matrix A in Mn(F): det(A) = det(A^t).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 6,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['determinant', 'transpose'],
        relatedItems: ['def-transpose'],
      },
      {
        id: 'thm-det-multiplicative',
        type: 'theorem',
        title: 'Determinant is Multiplicative',
        titleHe: 'הדטרמיננטה כפלית',
        verbatimContent:
          'The determinant is multiplicative: for two square matrices A, B in Mn(F) of the same size, det(AB) = det(A) * det(B).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 6,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['determinant', 'multiplicative', 'product'],
        relatedItems: ['thm-det-invertible'],
        likelihoodScore: 90,
        examFrequency: 7,
      },
      {
        id: 'thm-vandermonde-det',
        type: 'theorem',
        title: 'Vandermonde Determinant',
        titleHe: 'דטרמיננטה של ונדרמונד',
        verbatimContent:
          'The Vandermonde matrix V with entries V_ij = x_i^{j-1} has determinant det(V) = product_{1 <= i < j <= n} (x_j - x_i). For 3x3 with parameters a, b, c: det(V) = (b-a)(c-a)(c-b). The Vandermonde matrix is invertible if and only if all x_i are distinct.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 5,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['vandermonde', 'determinant', 'product-formula'],
        relatedItems: ['thm-det-invertible'],
        likelihoodScore: 80,
        examFrequency: 4,
      },
      {
        id: 'thm-det-integer-matrix',
        type: 'proposition',
        title: 'Determinant of Integer Matrix is Integer',
        titleHe: 'דטרמיננטה של מטריצה שלמה היא שלם',
        verbatimContent:
          'If A in Mn(R) has all integer entries, then det(A) is an integer. Proof by induction on n using cofactor expansion: base case n=1, det((a))=a is integer; inductive step uses that minors are determinants of (n-1)x(n-1) integer matrices.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 6,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['determinant', 'integer', 'induction'],
        relatedItems: ['thm-cofactor-expansion'],
      },
      {
        id: 'thm-block-diagonal-det',
        type: 'proposition',
        title: 'Determinant of Block Diagonal Matrix',
        titleHe: 'דטרמיננטה של מטריצת בלוקים אלכסונית',
        verbatimContent:
          'Let A, D in Mn(F) and K = [[A, O],[O, D]] in M2n(F) where O is the nxn zero matrix. Then det(K) = det(A) * det(D).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 7,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['block-matrix', 'determinant', 'diagonal'],
        relatedItems: ['def-block-matrix'],
      },
    ],
    proofs: [
      {
        id: 'proof-antisymmetric-odd-singular',
        type: 'proof',
        title: 'Odd-order Anti-Symmetric Matrix over Field with 1+1!=0 is Singular',
        titleHe: 'הוכחה: מטריצה אנטי-סימטרית מסדר אי-זוגי לא הפיכה (כש-1+1!=0)',
        verbatimContent:
          'If n is odd, A is anti-symmetric (A^t = -A), and 1+1 != 0 in F, then: det(A) = det(A^t) = det(-A) = (-1)^n det(A) = -det(A). So 2*det(A) = 0, and since 1+1 != 0, det(A) = 0. Hence A is not invertible. Note: this fails in Z_2 where I_3 is anti-symmetric and invertible.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 6,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['anti-symmetric', 'singular', 'odd-order', 'characteristic'],
        relatedItems: ['def-symmetric-matrix', 'thm-det-invertible'],
      },
    ],
    techniques: [
      {
        id: 'tech-cofactor-choose-sparse',
        type: 'technique',
        title: 'Choose Row/Column with Most Zeros for Cofactor Expansion',
        titleHe: 'בחירת שורה/עמודה עם הכי הרבה אפסים לפיתוח מינורים',
        verbatimContent:
          'When computing a determinant via cofactor expansion, any row or column yields the same result. Choose the row or column with the most zeros to minimize computation.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 2,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['cofactor', 'efficiency', 'computation'],
        relatedItems: ['thm-cofactor-expansion'],
      },
      {
        id: 'tech-det-parameter',
        type: 'technique',
        title: 'Determinant with Parameter',
        titleHe: 'דטרמיננטה עם פרמטר',
        verbatimContent:
          'When a matrix has a parameter alpha, det(A) becomes a polynomial in alpha. The matrix is non-invertible exactly for the values of alpha that are roots of this polynomial. Combine row-reduction and cofactor expansion to simplify.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 3,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['parameter', 'polynomial', 'invertibility'],
        relatedItems: ['thm-det-invertible'],
      },
    ],
    formulas: [
      {
        id: 'formula-vandermonde-3x3',
        type: 'formula',
        title: 'Vandermonde 3x3 Determinant',
        titleHe: 'דטרמיננטה של ונדרמונד 3x3',
        verbatimContent:
          'det([[1,a,a^2],[1,b,b^2],[1,c,c^2]]) = (b-a)(c-a)(c-b).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 5,
        topic: 'determinants',
        weekNumber: 12,
        tags: ['vandermonde', 'formula'],
        relatedItems: ['thm-vandermonde-det'],
      },
    ],
    examples: [],
    practiceQuestions: [
      {
        id: 'pq-12-1',
        question:
          'Compute the determinant of [[1,1,-1],[2,3,4],[5,1,1]] using cofactor expansion along the first row.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 2,
        topic: 'determinants',
        weekNumber: 12,
        difficulty: 'medium',
        relatedTheorems: ['thm-cofactor-expansion'],
        relatedDefinitions: ['def-minor'],
        solution:
          '1*(3*1-4*1) - 1*(2*1-4*5) + (-1)*(2*1-3*5) = (-17) + 2 + (-7) = -22.',
      },
      {
        id: 'pq-12-2',
        question:
          'For which values of alpha in R is the matrix [[1,1,1],[1,alpha,-1],[1,alpha^2,1]] invertible?',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 3,
        topic: 'determinants',
        weekNumber: 12,
        difficulty: 'medium',
        relatedTheorems: ['thm-det-invertible'],
        relatedDefinitions: [],
        solution:
          'After row reduction: det = 2(alpha^2 - 1) = 2(alpha-1)(alpha+1). The matrix is invertible when alpha != 1 and alpha != -1.',
      },
      {
        id: 'pq-12-3',
        question:
          'If A in Mn(F) satisfies A^2 - 2A + I = 0, show that A - I is not invertible but A is invertible.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 6,
        topic: 'determinants',
        weekNumber: 12,
        difficulty: 'hard',
        relatedTheorems: ['thm-det-invertible', 'thm-det-multiplicative'],
        relatedDefinitions: [],
        solution:
          'A^2 - 2A + I = (A-I)^2 = 0, so det((A-I)^2) = (det(A-I))^2 = 0, hence det(A-I) = 0, so A-I not invertible. Also A^2 - 2A = -I implies A(A-2I) = -I, so det(A)*det(A-2I) = det(-I) = (-1)^n != 0, hence det(A) != 0.',
      },
      {
        id: 'pq-12-4',
        question:
          'If A in Mn(F) satisfies A^3 + A^2 + A + I = 0, prove that A is invertible.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf',
        pageNumber: 6,
        topic: 'determinants',
        weekNumber: 12,
        difficulty: 'hard',
        relatedTheorems: ['thm-det-invertible', 'thm-det-multiplicative'],
        relatedDefinitions: [],
        solution:
          'Rearrange: A^3 + A^2 + A = -I, so A(A^2+A+I) = -I. Take determinants: det(A)*det(A^2+A+I) = (-1)^n != 0. Since this product is nonzero, det(A) != 0, so A is invertible.',
      },
    ],
    isCompleted: false,
  },

  // ============================================================
  // WEEK 13 — Row/Column Space (מרחב שורות ומרחב עמודות) — Tirgul 13
  // ============================================================
  {
    id: 'week-13',
    weekNumber: 13,
    title: 'Row Space and Column Space',
    titleHe: 'מרחב שורות ומרחב עמודות',
    description:
      'Row space, column space, rank of a matrix, dimension theorem, and rank inequalities for products',
    topics: ['row-column-space', 'rank'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 25 2026.pdf', 'LA01 lecture 26 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf'],
    definitions: [
      {
        id: 'def-row-space',
        type: 'definition',
        title: 'Row Space',
        titleHe: 'מרחב השורות',
        verbatimContent:
          'Let F be a field and A in Mm*n(F). The row space of A, denoted RowA, is the set of all linear combinations of the rows of A. Denoting the rows as r1,...,rm (as elements of F^n): RowA = Span{r1,...,rm}. The row space is a vector subspace of F^n.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 1,
        topic: 'row-column-space',
        weekNumber: 13,
        tags: ['row-space', 'span', 'subspace'],
        relatedItems: ['def-column-space', 'thm-row-equiv-same-row-space'],
      },
      {
        id: 'def-column-space',
        type: 'definition',
        title: 'Column Space',
        titleHe: 'מרחב העמודות',
        verbatimContent:
          'Let F be a field and A in Mm*n(F). The column space of A, denoted ColA, is the set of all linear combinations of the columns of A. Denoting the columns as a1,...,an (as elements of F^m): ColA = Span{a1,...,an}. The column space is a vector subspace of F^m.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 3,
        topic: 'row-column-space',
        weekNumber: 13,
        tags: ['column-space', 'span', 'subspace'],
        relatedItems: ['def-row-space', 'thm-col-basis-pivot-columns'],
      },
      {
        id: 'def-rank',
        type: 'definition',
        title: 'Rank of a Matrix',
        titleHe: 'דרגה של מטריצה',
        verbatimContent:
          'Let A in Mm*n(F). The rank of A, denoted rank(A) or r(A), is the number of leading entries (pivots) in the row echelon form of A.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 3,
        topic: 'rank',
        weekNumber: 13,
        tags: ['rank', 'pivots', 'leading-entries'],
        relatedItems: ['thm-rank-equals-dim-row-col', 'thm-dimension-theorem-matrix'],
      },
    ],
    theorems: [
      {
        id: 'thm-row-equiv-same-row-space',
        type: 'theorem',
        title: 'Row-Equivalent Matrices Have Same Row Space',
        titleHe: 'מטריצות שקולות שורה בעלות אותו מרחב שורות',
        verbatimContent:
          'Row-equivalent matrices have the same row space.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 1,
        topic: 'row-column-space',
        weekNumber: 13,
        tags: ['row-space', 'row-equivalence'],
        relatedItems: ['def-row-space'],
      },
      {
        id: 'thm-row-basis-from-echelon',
        type: 'corollary',
        title: 'Basis for Row Space from Row Echelon Form',
        titleHe: 'בסיס למרחב שורות מצורה מדורגת',
        verbatimContent:
          'If A, B in Mm*n(F) are row-equivalent and B is in row echelon form, then the nonzero rows of B form a basis for RowA.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 1,
        topic: 'row-column-space',
        weekNumber: 13,
        tags: ['row-space', 'basis', 'echelon'],
        relatedItems: ['thm-row-equiv-same-row-space', 'def-row-space'],
      },
      {
        id: 'thm-col-basis-pivot-columns',
        type: 'corollary',
        title: 'Basis for Column Space from Pivot Columns',
        titleHe: 'בסיס למרחב עמודות מעמודות עם איבר מוביל',
        verbatimContent:
          'Let A, C in Mm*n(F) be row-equivalent and suppose C is in row echelon (or reduced row echelon) form. Then the columns of A corresponding to the pivot columns of C form a basis for ColA.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 3,
        topic: 'row-column-space',
        weekNumber: 13,
        tags: ['column-space', 'basis', 'pivot-columns'],
        relatedItems: ['def-column-space'],
        likelihoodScore: 85,
        examFrequency: 6,
      },
      {
        id: 'thm-rank-equals-dim-row-col',
        type: 'theorem',
        title: 'dim(ColA) = dim(RowA)',
        titleHe: 'מימד מרחב העמודות שווה למימד מרחב השורות',
        verbatimContent:
          'Let A in Mm*n(F). Then dim(ColA) = dim(RowA). Proof sketch: dim(ColA) = number of pivot columns = number of pivots = number of nonzero rows after reduction = dim(RowA).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 3,
        topic: 'rank',
        weekNumber: 13,
        tags: ['rank', 'row-space', 'column-space', 'dimension'],
        relatedItems: ['def-rank', 'def-row-space', 'def-column-space'],
        likelihoodScore: 90,
        examFrequency: 6,
      },
      {
        id: 'thm-rank-corollary',
        type: 'corollary',
        title: 'Rank Equals dim(ColA) and dim(RowA)',
        titleHe: 'הדרגה שווה למימד מרחב העמודות ולמימד מרחב השורות',
        verbatimContent:
          'rank(A) = dim(ColA) = dim(RowA).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 3,
        topic: 'rank',
        weekNumber: 13,
        tags: ['rank', 'dimension'],
        relatedItems: ['thm-rank-equals-dim-row-col', 'def-rank'],
      },
      {
        id: 'thm-dimension-theorem-matrix',
        type: 'theorem',
        title: 'Rank-Nullity Theorem (Dimension Theorem for Matrices)',
        titleHe: 'משפט המימדים השני (במונחי מטריצות)',
        verbatimContent:
          'Let A in Mm*n(F). Then dim(NulA) + rank(A) = n. (Number of free variables + number of pivots = number of columns.)',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 3,
        topic: 'rank',
        weekNumber: 13,
        tags: ['rank-nullity', 'dimension-theorem', 'fundamental'],
        relatedItems: ['def-null-space', 'def-rank'],
        likelihoodScore: 95,
        examFrequency: 8,
      },
      {
        id: 'thm-rank-transpose',
        type: 'proposition',
        title: 'rank(A) = rank(A^t)',
        titleHe: 'rank(A) = rank(A^t)',
        verbatimContent:
          'For any matrix A: rank(A) = rank(A^t). Proof: rank(A) = dim(Col(A)) = dim(Row(A^t)) = rank(A^t).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 4,
        topic: 'rank',
        weekNumber: 13,
        tags: ['rank', 'transpose'],
        relatedItems: ['def-rank', 'def-transpose'],
      },
      {
        id: 'thm-col-AB-subset-col-A',
        type: 'proposition',
        title: 'Col(AB) is Contained in Col(A)',
        titleHe: 'Col(AB) מוכל ב-Col(A)',
        verbatimContent:
          'For A, B in Mn(F): Col(AB) is a subset of Col(A). Proof: each column of AB is a linear combination of the columns of A (with coefficients from the corresponding column of B).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 4,
        topic: 'rank',
        weekNumber: 13,
        tags: ['column-space', 'product', 'containment'],
        relatedItems: ['def-column-space', 'thm-rank-product-inequality'],
      },
      {
        id: 'thm-rank-product-inequality',
        type: 'proposition',
        title: 'rank(AB) <= min{rank(A), rank(B)}',
        titleHe: 'rank(AB) <= min{rank(A), rank(B)}',
        verbatimContent:
          'For A, B in Mn(F): rank(AB) <= min{rank(A), rank(B)}. Proof uses Col(AB) subset of Col(A) for rank(A) bound, and transpose argument (rank(AB) = rank((AB)^t) = rank(B^t A^t)) for rank(B) bound.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 4,
        topic: 'rank',
        weekNumber: 13,
        tags: ['rank', 'inequality', 'product'],
        relatedItems: ['thm-col-AB-subset-col-A', 'thm-rank-transpose'],
        likelihoodScore: 80,
        examFrequency: 5,
      },
      {
        id: 'thm-rank-sum-AB-zero',
        type: 'proposition',
        title: 'rank(A) + rank(B) <= n when AB = 0',
        titleHe: 'rank(A) + rank(B) <= n כאשר AB = 0',
        verbatimContent:
          'Let A in Mm*n(F) and B in Mn*p(F) with AB = O. Then rank(A) + rank(B) <= n. Proof: AB = 0 means every column of B is in NulA, so Col(B) subset of NulA, hence rank(B) = dim(Col(B)) <= dim(NulA) = n - rank(A).',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 5,
        topic: 'rank',
        weekNumber: 13,
        tags: ['rank', 'null-space', 'inequality'],
        relatedItems: ['thm-dimension-theorem-matrix', 'def-null-space'],
      },
    ],
    proofs: [],
    techniques: [
      {
        id: 'tech-basis-row-space',
        type: 'technique',
        title: 'Finding Basis for Row Space',
        titleHe: 'מציאת בסיס למרחב שורות',
        verbatimContent:
          'To find a basis for RowA: row-reduce A to echelon form. The nonzero rows of the echelon form are a basis for RowA. (Row operations preserve the row space.)',
        explanation: 'Row-reduce and take nonzero rows.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 1,
        topic: 'row-column-space',
        weekNumber: 13,
        tags: ['row-space', 'basis', 'algorithm'],
        relatedItems: ['thm-row-basis-from-echelon'],
      },
      {
        id: 'tech-basis-col-space',
        type: 'technique',
        title: 'Finding Basis for Column Space',
        titleHe: 'מציאת בסיס למרחב עמודות',
        verbatimContent:
          'To find a basis for ColA: row-reduce A. Identify the pivot columns. The corresponding columns from the ORIGINAL matrix A (not the reduced form) form a basis for ColA. (Row operations do NOT preserve column space, but they preserve linear dependence relations among columns.)',
        explanation: 'Row-reduce, find pivot columns, take those columns from the original matrix.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 3,
        topic: 'row-column-space',
        weekNumber: 13,
        tags: ['column-space', 'basis', 'algorithm', 'pivot-columns'],
        relatedItems: ['thm-col-basis-pivot-columns'],
      },
      {
        id: 'tech-extract-basis-from-spanning',
        type: 'technique',
        title: 'Extracting a Basis from a Spanning Set',
        titleHe: 'חילוץ בסיס מקבוצה פורשת',
        verbatimContent:
          'Given U = Span{v1,...,vk}, to find a basis: place the vectors as rows (or columns) of a matrix, row-reduce, and read off a basis from row space (nonzero rows) or column space (pivot columns of original). This removes linearly dependent vectors while preserving the span.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 4,
        topic: 'row-column-space',
        weekNumber: 13,
        tags: ['basis', 'spanning-set', 'algorithm'],
        relatedItems: ['tech-basis-row-space', 'tech-basis-col-space'],
      },
    ],
    formulas: [],
    examples: [],
    practiceQuestions: [
      {
        id: 'pq-13-1',
        question:
          'Let A = [[2,2,2,1],[3,3,4,2],[0,0,1,1]] in M3x4(R). Find a basis for RowA.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 1,
        topic: 'row-column-space',
        weekNumber: 13,
        difficulty: 'medium',
        relatedTheorems: ['thm-row-basis-from-echelon'],
        relatedDefinitions: ['def-row-space'],
        solution:
          'Row-reduce A. After Gauss-Jordan, nonzero rows are (1,1,0,0) and (0,0,1,1). These form a basis for RowA.',
      },
      {
        id: 'pq-13-2',
        question:
          'For the same matrix A = [[2,2,2,1],[3,3,4,2],[0,0,1,1]], find a basis for ColA.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 3,
        topic: 'row-column-space',
        weekNumber: 13,
        difficulty: 'medium',
        relatedTheorems: ['thm-col-basis-pivot-columns'],
        relatedDefinitions: ['def-column-space'],
        solution:
          'After row-reduction, pivot columns are columns 1 and 3. Take columns 1 and 3 from the original A: ColA = Span{(2,3,0)^t, (2,4,1)^t}.',
      },
      {
        id: 'pq-13-3',
        question:
          'Find a basis for U = Span{(1,2,3)^t, (0,2,4)^t, (2,-3,-7)^t, (-1,-1,-4)^t} in R^3.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 4,
        topic: 'row-column-space',
        weekNumber: 13,
        difficulty: 'medium',
        relatedTheorems: ['thm-col-basis-pivot-columns'],
        relatedDefinitions: ['def-column-space'],
        solution:
          'Place vectors as columns of a 3x4 matrix and row-reduce. Pivot columns are 1 and 2. Basis: {(1,2,3)^t, (0,2,4)^t}.',
      },
      {
        id: 'pq-13-4',
        question:
          'Prove or disprove: (1) There exists A in M3x3(F) with F^3 = RowA direct-sum ColA. (2) There exists A in M4x4(F) with F^4 = RowA direct-sum ColA.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf',
        pageNumber: 4,
        topic: 'row-column-space',
        weekNumber: 13,
        difficulty: 'hard',
        relatedTheorems: ['thm-rank-equals-dim-row-col'],
        relatedDefinitions: ['def-row-space', 'def-column-space'],
        solution:
          '(1) False: if F^3 = RowA + ColA (direct sum) then dim(RowA) + dim(ColA) = 3. But dim(RowA) = dim(ColA) = rank(A), so 2*rank(A) = 3, impossible since rank is an integer. (2) True: the tirgul gives a 4x4 matrix A with rank 2 whose RowA and ColA span complementary 2-dimensional subspaces of F^4, so F^4 = RowA direct-sum ColA.',
      },
    ],
    isCompleted: false,
  },

];
