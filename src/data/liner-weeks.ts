// Linear Algebra Study Weeks Data
// Based on LA01 Lectures 01-26 and Tirgul 1-13

import type { StudyWeek, KnowledgeItem, PracticeQuestion, LinearAlgebraTopic } from '@/types'

export const weeksData: StudyWeek[] = [
  {
    id: 'week-1',
    weekNumber: 1,
    title: 'Fields and Vector Spaces',
    titleHe: 'שדות ומרחבים וקטוריים',
    description: 'Introduction to algebraic structures: fields and vector spaces over fields',
    topics: ['fields', 'vector-spaces'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 01 2026.pdf', 'LA01 lecture 02 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_1_Omer.pdf'],
    definitions: [
      {
        id: 'def-field',
        type: 'definition',
        title: 'Field',
        titleHe: 'שדה',
        verbatimContent: `A field (F, +, ·) is a set F with two binary operations + (addition) and · (multiplication) such that:
1. (F, +) is an abelian group with identity 0
2. (F\\{0}, ·) is an abelian group with identity 1
3. Distributivity: a·(b+c) = a·b + a·c for all a,b,c ∈ F`,
        explanation: 'Common examples: ℝ (real numbers), ℂ (complex numbers), ℚ (rationals), ℤₚ (integers mod prime p)',
        source: 'LA01 lecture 01 2026.pdf',
        pageNumber: 2,
        topic: 'fields',
        weekNumber: 1,
        tags: ['algebraic-structure', 'field', 'fundamental'],
        relatedItems: ['def-vector-space'],
        likelihoodScore: 75,
        examFrequency: 3,
      },
      {
        id: 'def-vector-space',
        type: 'definition',
        title: 'Vector Space',
        titleHe: 'מרחב וקטורי',
        verbatimContent: `A vector space over a field F is a set V together with two operations:
1. Vector addition: V × V → V, (u, v) ↦ u + v
2. Scalar multiplication: F × V → V, (α, v) ↦ αv

satisfying the following axioms (∀ u, v, w ∈ V and ∀ α, β ∈ F):
(V1) u + (v + w) = (u + v) + w (associativity)
(V2) u + v = v + u (commutativity)
(V3) ∃ 0 ∈ V: v + 0 = v (zero vector)
(V4) ∀ v ∈ V, ∃ (-v) ∈ V: v + (-v) = 0 (additive inverse)
(V5) α(βv) = (αβ)v
(V6) 1·v = v
(V7) α(u + v) = αu + αv
(V8) (α + β)v = αv + βv`,
        explanation: 'Examples: Fⁿ (n-tuples), F[x] (polynomials), matrices Mₘₓₙ(F), function spaces',
        source: 'LA01 lecture 01 2026.pdf',
        pageNumber: 5,
        topic: 'vector-spaces',
        weekNumber: 1,
        tags: ['vector-space', 'axioms', 'fundamental'],
        relatedItems: ['def-field', 'def-subspace'],
        likelihoodScore: 95,
        examFrequency: 8,
      },
    ],
    theorems: [
      {
        id: 'thm-zero-unique',
        type: 'theorem',
        title: 'Uniqueness of Zero Vector',
        verbatimContent: `In any vector space V, the zero vector 0 is unique.
Proof: Suppose 0 and 0' are both zero vectors. Then:
0 = 0 + 0' (since 0' is a zero)
  = 0' (since 0 is a zero)`,
        source: 'LA01 lecture 01 2026.pdf',
        pageNumber: 8,
        topic: 'vector-spaces',
        weekNumber: 1,
        tags: ['uniqueness', 'zero-vector'],
        relatedItems: ['def-vector-space'],
        likelihoodScore: 60,
        examFrequency: 2,
      },
      {
        id: 'thm-zero-scalar',
        type: 'theorem',
        title: 'Zero Scalar Multiplication',
        verbatimContent: `For any vector v in a vector space V over field F:
0·v = 0 (zero scalar times any vector equals zero vector)
α·0 = 0 (any scalar times zero vector equals zero vector)
(-1)·v = -v`,
        source: 'LA01 lecture 02 2026.pdf',
        pageNumber: 3,
        topic: 'vector-spaces',
        weekNumber: 1,
        tags: ['scalar-multiplication', 'properties'],
        relatedItems: ['def-vector-space'],
        likelihoodScore: 70,
        examFrequency: 3,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [
      {
        id: 'pq-1-1',
        question: 'Prove that ℤ (integers) is not a field.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_1_Omer.pdf',
        pageNumber: 1,
        topic: 'fields',
        weekNumber: 1,
        difficulty: 'easy',
        relatedTheorems: [],
        relatedDefinitions: ['def-field'],
      },
      {
        id: 'pq-1-2',
        question: 'Verify that F² = {(a,b) : a,b ∈ F} with componentwise operations is a vector space over F.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_1_Omer.pdf',
        pageNumber: 2,
        topic: 'vector-spaces',
        weekNumber: 1,
        difficulty: 'medium',
        relatedTheorems: [],
        relatedDefinitions: ['def-vector-space'],
      },
    ],
    isCompleted: false,
  },
  {
    id: 'week-2',
    weekNumber: 2,
    title: 'Subspaces and Linear Combinations',
    titleHe: 'תתי-מרחבים וצירופים לינאריים',
    description: 'Subspaces, linear combinations, and their properties',
    topics: ['subspaces', 'linear-combinations'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 03 2026.pdf', 'LA01 lecture 04 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_2_Omer.pdf'],
    definitions: [
      {
        id: 'def-subspace',
        type: 'definition',
        title: 'Subspace',
        titleHe: 'תת-מרחב',
        verbatimContent: `A subset W of a vector space V over F is called a subspace of V if W is itself a vector space over F with the same operations.

Subspace Test: W ⊆ V is a subspace if and only if:
1. W ≠ ∅ (equivalently, 0 ∈ W)
2. W is closed under addition: u, v ∈ W ⟹ u + v ∈ W
3. W is closed under scalar multiplication: α ∈ F, v ∈ W ⟹ αv ∈ W

Equivalently: W is a subspace iff αu + βv ∈ W for all α, β ∈ F and u, v ∈ W`,
        explanation: 'Always check the three conditions. The zero vector must be in any subspace.',
        source: 'LA01 lecture 03 2026.pdf',
        pageNumber: 2,
        topic: 'subspaces',
        weekNumber: 2,
        tags: ['subspace', 'test', 'fundamental'],
        relatedItems: ['def-vector-space'],
        likelihoodScore: 95,
        examFrequency: 10,
      },
      {
        id: 'def-linear-combination',
        type: 'definition',
        title: 'Linear Combination',
        titleHe: 'צירוף לינארי',
        verbatimContent: `Let V be a vector space over F and let v₁, v₂, ..., vₙ ∈ V.
A linear combination of v₁, ..., vₙ is any vector of the form:
α₁v₁ + α₂v₂ + ... + αₙvₙ
where α₁, ..., αₙ ∈ F are scalars.`,
        source: 'LA01 lecture 03 2026.pdf',
        pageNumber: 5,
        topic: 'linear-combinations',
        weekNumber: 2,
        tags: ['linear-combination', 'fundamental'],
        relatedItems: ['def-span'],
        likelihoodScore: 90,
        examFrequency: 8,
      },
    ],
    theorems: [
      {
        id: 'thm-intersection-subspace',
        type: 'theorem',
        title: 'Intersection of Subspaces',
        verbatimContent: `Let W₁ and W₂ be subspaces of V. Then W₁ ∩ W₂ is also a subspace of V.

More generally: If {Wᵢ}ᵢ∈I is any collection of subspaces of V, then ∩ᵢ∈I Wᵢ is a subspace of V.`,
        source: 'LA01 lecture 03 2026.pdf',
        pageNumber: 8,
        topic: 'subspaces',
        weekNumber: 2,
        tags: ['intersection', 'subspace'],
        relatedItems: ['def-subspace'],
        likelihoodScore: 85,
        examFrequency: 5,
      },
      {
        id: 'thm-sum-subspace',
        type: 'theorem',
        title: 'Sum of Subspaces',
        verbatimContent: `Let W₁ and W₂ be subspaces of V. The sum:
W₁ + W₂ = {w₁ + w₂ : w₁ ∈ W₁, w₂ ∈ W₂}
is the smallest subspace of V containing both W₁ and W₂.`,
        source: 'LA01 lecture 04 2026.pdf',
        pageNumber: 3,
        topic: 'subspaces',
        weekNumber: 2,
        tags: ['sum', 'subspace'],
        relatedItems: ['def-subspace', 'thm-intersection-subspace'],
        likelihoodScore: 80,
        examFrequency: 4,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [
      {
        id: 'pq-2-1',
        question: 'Is W = {(x,y,z) ∈ ℝ³ : x + y + z = 0} a subspace of ℝ³? Prove or disprove.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_2_Omer.pdf',
        pageNumber: 1,
        topic: 'subspaces',
        weekNumber: 2,
        difficulty: 'easy',
        relatedTheorems: [],
        relatedDefinitions: ['def-subspace'],
      },
      {
        id: 'pq-2-2',
        question: 'Is W = {(x,y,z) ∈ ℝ³ : x + y + z = 1} a subspace of ℝ³? Prove or disprove.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_2_Omer.pdf',
        pageNumber: 1,
        topic: 'subspaces',
        weekNumber: 2,
        difficulty: 'easy',
        relatedTheorems: [],
        relatedDefinitions: ['def-subspace'],
      },
    ],
    isCompleted: false,
  },
  {
    id: 'week-3',
    weekNumber: 3,
    title: 'Span and Linear Independence',
    titleHe: 'פרישה ואי-תלות לינארית',
    description: 'Spanning sets, linear independence, and their relationship',
    topics: ['span', 'linear-independence'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 05 2026.pdf', 'LA01 lecture 06 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_3_Omer.pdf'],
    definitions: [
      {
        id: 'def-span',
        type: 'definition',
        title: 'Span',
        titleHe: 'פרישה',
        verbatimContent: `Let S = {v₁, v₂, ..., vₙ} ⊆ V. The span of S is:
Sp(S) = Sp(v₁, ..., vₙ) = {α₁v₁ + ... + αₙvₙ : αᵢ ∈ F}

The span is the set of all linear combinations of vectors in S.
We say S spans V (or S is a spanning set for V) if Sp(S) = V.

Convention: Sp(∅) = {0}`,
        source: 'LA01 lecture 05 2026.pdf',
        pageNumber: 2,
        topic: 'span',
        weekNumber: 3,
        tags: ['span', 'spanning-set', 'fundamental'],
        relatedItems: ['def-linear-combination', 'def-basis'],
        likelihoodScore: 95,
        examFrequency: 12,
      },
      {
        id: 'def-linear-independence',
        type: 'definition',
        title: 'Linear Independence',
        titleHe: 'אי-תלות לינארית',
        verbatimContent: `Vectors v₁, v₂, ..., vₙ ∈ V are linearly independent if:
α₁v₁ + α₂v₂ + ... + αₙvₙ = 0 ⟹ α₁ = α₂ = ... = αₙ = 0

Equivalently: The only linear combination equal to 0 is the trivial one.

Vectors are linearly dependent if they are not linearly independent, i.e., there exist scalars α₁, ..., αₙ not all zero such that α₁v₁ + ... + αₙvₙ = 0.`,
        explanation: 'To check independence: set up the equation, solve for scalars, verify only trivial solution exists.',
        source: 'LA01 lecture 05 2026.pdf',
        pageNumber: 6,
        topic: 'linear-independence',
        weekNumber: 3,
        tags: ['linear-independence', 'fundamental'],
        relatedItems: ['def-span', 'def-basis'],
        likelihoodScore: 98,
        examFrequency: 15,
      },
    ],
    theorems: [
      {
        id: 'thm-span-subspace',
        type: 'theorem',
        title: 'Span is a Subspace',
        verbatimContent: `For any subset S of V, Sp(S) is a subspace of V.
Moreover, Sp(S) is the smallest subspace containing S.`,
        source: 'LA01 lecture 05 2026.pdf',
        pageNumber: 4,
        topic: 'span',
        weekNumber: 3,
        tags: ['span', 'subspace'],
        relatedItems: ['def-span', 'def-subspace'],
        likelihoodScore: 80,
        examFrequency: 4,
      },
      {
        id: 'thm-dependence-one-combination',
        type: 'theorem',
        title: 'Dependence via Linear Combination',
        verbatimContent: `Let v₁, ..., vₙ be vectors in V. They are linearly dependent if and only if one of them can be written as a linear combination of the others.`,
        source: 'LA01 lecture 05 2026.pdf',
        pageNumber: 10,
        topic: 'linear-independence',
        weekNumber: 3,
        tags: ['linear-dependence', 'characterization'],
        relatedItems: ['def-linear-independence'],
        likelihoodScore: 85,
        examFrequency: 6,
      },
      {
        id: 'thm-zero-dependent',
        type: 'theorem',
        title: 'Zero Vector Implies Dependence',
        verbatimContent: `Any set of vectors containing the zero vector is linearly dependent.`,
        source: 'LA01 lecture 06 2026.pdf',
        pageNumber: 2,
        topic: 'linear-independence',
        weekNumber: 3,
        tags: ['zero-vector', 'linear-dependence'],
        relatedItems: ['def-linear-independence'],
        likelihoodScore: 75,
        examFrequency: 3,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [
      {
        id: 'pq-3-1',
        question: 'Determine if v₁=(1,2,3), v₂=(4,5,6), v₃=(7,8,9) are linearly independent in ℝ³.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_3_Omer.pdf',
        pageNumber: 1,
        topic: 'linear-independence',
        weekNumber: 3,
        difficulty: 'medium',
        relatedTheorems: [],
        relatedDefinitions: ['def-linear-independence'],
      },
    ],
    isCompleted: false,
  },
  {
    id: 'week-4',
    weekNumber: 4,
    title: 'Basis and Dimension',
    titleHe: 'בסיס ומימד',
    description: 'Bases of vector spaces, dimension, and fundamental theorems',
    topics: ['basis', 'dimension'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 07 2026.pdf', 'LA01 lecture 08 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_4_Omer.pdf'],
    definitions: [
      {
        id: 'def-basis',
        type: 'definition',
        title: 'Basis',
        titleHe: 'בסיס',
        verbatimContent: `A basis for a vector space V is a set B = {v₁, ..., vₙ} ⊆ V such that:
1. B is linearly independent
2. B spans V (i.e., Sp(B) = V)

Equivalently: B is a basis iff every v ∈ V can be written uniquely as:
v = α₁v₁ + α₂v₂ + ... + αₙvₙ
for some unique scalars α₁, ..., αₙ ∈ F.`,
        explanation: 'A basis is a minimal spanning set and a maximal independent set.',
        source: 'LA01 lecture 07 2026.pdf',
        pageNumber: 2,
        topic: 'basis',
        weekNumber: 4,
        tags: ['basis', 'fundamental'],
        relatedItems: ['def-span', 'def-linear-independence', 'def-dimension'],
        likelihoodScore: 98,
        examFrequency: 18,
      },
      {
        id: 'def-dimension',
        type: 'definition',
        title: 'Dimension',
        titleHe: 'מימד',
        verbatimContent: `The dimension of a finite-dimensional vector space V, denoted dim(V), is the number of vectors in any basis of V.

Convention: dim({0}) = 0

If V has no finite basis, V is called infinite-dimensional.`,
        source: 'LA01 lecture 07 2026.pdf',
        pageNumber: 8,
        topic: 'dimension',
        weekNumber: 4,
        tags: ['dimension', 'fundamental'],
        relatedItems: ['def-basis'],
        likelihoodScore: 95,
        examFrequency: 15,
      },
      {
        id: 'def-coordinates',
        type: 'definition',
        title: 'Coordinate Vector',
        titleHe: 'וקטור קואורדינטות',
        verbatimContent: `Let B = {v₁, ..., vₙ} be an ordered basis for V. If v = α₁v₁ + ... + αₙvₙ, then the coordinate vector of v with respect to B is:
[v]_B = (α₁, α₂, ..., αₙ) ∈ Fⁿ`,
        source: 'LA01 lecture 08 2026.pdf',
        pageNumber: 4,
        topic: 'basis',
        weekNumber: 4,
        tags: ['coordinates', 'basis'],
        relatedItems: ['def-basis'],
        likelihoodScore: 88,
        examFrequency: 10,
      },
    ],
    theorems: [
      {
        id: 'thm-basis-unique-rep',
        type: 'theorem',
        title: 'Unique Representation',
        verbatimContent: `Let B = {v₁, ..., vₙ} be a basis for V. Then every vector v ∈ V can be written uniquely as a linear combination of B.`,
        source: 'LA01 lecture 07 2026.pdf',
        pageNumber: 5,
        topic: 'basis',
        weekNumber: 4,
        tags: ['basis', 'uniqueness'],
        relatedItems: ['def-basis'],
        likelihoodScore: 85,
        examFrequency: 7,
      },
      {
        id: 'thm-steinitz-exchange',
        type: 'theorem',
        title: 'Steinitz Exchange Lemma',
        verbatimContent: `Let V be a vector space. If {u₁, ..., uₘ} is linearly independent and {w₁, ..., wₙ} spans V, then m ≤ n.

Corollary: Any two bases of a finite-dimensional vector space have the same number of elements.`,
        source: 'LA01 lecture 07 2026.pdf',
        pageNumber: 12,
        topic: 'dimension',
        weekNumber: 4,
        tags: ['steinitz', 'exchange', 'key-theorem'],
        relatedItems: ['def-basis', 'def-dimension'],
        likelihoodScore: 90,
        examFrequency: 8,
      },
      {
        id: 'thm-extend-to-basis',
        type: 'theorem',
        title: 'Extension to Basis',
        verbatimContent: `Let V be a finite-dimensional vector space with dim(V) = n.
1. Any linearly independent set can be extended to a basis.
2. Any spanning set contains a basis.
3. If W is a subspace of V, then dim(W) ≤ dim(V), with equality iff W = V.`,
        source: 'LA01 lecture 08 2026.pdf',
        pageNumber: 6,
        topic: 'basis',
        weekNumber: 4,
        tags: ['basis', 'extension'],
        relatedItems: ['def-basis', 'def-dimension'],
        likelihoodScore: 92,
        examFrequency: 12,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [
      {
        id: 'pq-4-1',
        question: 'Find a basis for the subspace W = {(x,y,z) ∈ ℝ³ : x - y + z = 0}.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_4_Omer.pdf',
        pageNumber: 1,
        topic: 'basis',
        weekNumber: 4,
        difficulty: 'medium',
        relatedTheorems: ['thm-extend-to-basis'],
        relatedDefinitions: ['def-basis', 'def-subspace'],
      },
      {
        id: 'pq-4-2',
        question: 'Find dim(W) where W = {p(x) ∈ ℝ[x]₃ : p(1) = 0}.',
        source: 'Lin_Alg_I_2025-2026_Tirgul_4_Omer.pdf',
        pageNumber: 2,
        topic: 'dimension',
        weekNumber: 4,
        difficulty: 'medium',
        relatedTheorems: [],
        relatedDefinitions: ['def-dimension'],
      },
    ],
    isCompleted: false,
  },
  {
    id: 'week-5',
    weekNumber: 5,
    title: 'Linear Transformations',
    titleHe: 'העתקות לינאריות',
    description: 'Linear maps between vector spaces, kernel, image',
    topics: ['linear-transformations'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 09 2026.pdf', 'LA01 lecture 10 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_5_Omer.pdf'],
    definitions: [
      {
        id: 'def-linear-transformation',
        type: 'definition',
        title: 'Linear Transformation',
        titleHe: 'העתקה לינארית',
        verbatimContent: `A function T: V → W between vector spaces over F is called a linear transformation (or linear map) if for all u, v ∈ V and α ∈ F:
1. T(u + v) = T(u) + T(v) (additivity)
2. T(αv) = αT(v) (homogeneity)

Equivalently: T(αu + βv) = αT(u) + βT(v) for all α, β ∈ F and u, v ∈ V.`,
        explanation: 'Linear maps preserve linear combinations: T(Σαᵢvᵢ) = ΣαᵢT(vᵢ)',
        source: 'LA01 lecture 09 2026.pdf',
        pageNumber: 2,
        topic: 'linear-transformations',
        weekNumber: 5,
        tags: ['linear-map', 'fundamental'],
        relatedItems: ['def-kernel', 'def-image'],
        likelihoodScore: 98,
        examFrequency: 20,
      },
      {
        id: 'def-kernel',
        type: 'definition',
        title: 'Kernel (Null Space)',
        titleHe: 'גרעין',
        verbatimContent: `The kernel (or null space) of a linear transformation T: V → W is:
ker(T) = {v ∈ V : T(v) = 0}

ker(T) is a subspace of V.`,
        source: 'LA01 lecture 09 2026.pdf',
        pageNumber: 6,
        topic: 'linear-transformations',
        weekNumber: 5,
        tags: ['kernel', 'null-space'],
        relatedItems: ['def-linear-transformation', 'def-nullity'],
        likelihoodScore: 95,
        examFrequency: 15,
      },
      {
        id: 'def-image',
        type: 'definition',
        title: 'Image (Range)',
        titleHe: 'תמונה',
        verbatimContent: `The image (or range) of a linear transformation T: V → W is:
Im(T) = {T(v) : v ∈ V} = {w ∈ W : ∃v ∈ V, T(v) = w}

Im(T) is a subspace of W.`,
        source: 'LA01 lecture 09 2026.pdf',
        pageNumber: 8,
        topic: 'linear-transformations',
        weekNumber: 5,
        tags: ['image', 'range'],
        relatedItems: ['def-linear-transformation', 'def-rank'],
        likelihoodScore: 95,
        examFrequency: 15,
      },
    ],
    theorems: [
      {
        id: 'thm-T-zero',
        type: 'theorem',
        title: 'T(0) = 0',
        verbatimContent: `For any linear transformation T: V → W, T(0_V) = 0_W.`,
        source: 'LA01 lecture 09 2026.pdf',
        pageNumber: 4,
        topic: 'linear-transformations',
        weekNumber: 5,
        tags: ['linear-map', 'property'],
        relatedItems: ['def-linear-transformation'],
        likelihoodScore: 70,
        examFrequency: 4,
      },
      {
        id: 'thm-injective-kernel',
        type: 'theorem',
        title: 'Injectivity and Kernel',
        verbatimContent: `A linear transformation T: V → W is injective (one-to-one) if and only if ker(T) = {0}.`,
        source: 'LA01 lecture 10 2026.pdf',
        pageNumber: 3,
        topic: 'linear-transformations',
        weekNumber: 5,
        tags: ['injective', 'kernel'],
        relatedItems: ['def-kernel', 'def-linear-transformation'],
        likelihoodScore: 92,
        examFrequency: 12,
      },
      {
        id: 'thm-determined-by-basis',
        type: 'theorem',
        title: 'Linear Maps Determined by Basis',
        verbatimContent: `Let B = {v₁, ..., vₙ} be a basis for V and let w₁, ..., wₙ ∈ W be arbitrary vectors. Then there exists a unique linear transformation T: V → W such that T(vᵢ) = wᵢ for i = 1, ..., n.`,
        source: 'LA01 lecture 10 2026.pdf',
        pageNumber: 6,
        topic: 'linear-transformations',
        weekNumber: 5,
        tags: ['basis', 'uniqueness'],
        relatedItems: ['def-linear-transformation', 'def-basis'],
        likelihoodScore: 88,
        examFrequency: 8,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [],
    isCompleted: false,
  },
  {
    id: 'week-6',
    weekNumber: 6,
    title: 'Matrix Representation',
    titleHe: 'ייצוג מטריצי',
    description: 'Representing linear transformations as matrices, change of basis',
    topics: ['matrix-representation', 'change-of-basis'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 11 2026.pdf', 'LA01 lecture 12 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_6_Omer.pdf'],
    definitions: [
      {
        id: 'def-matrix-representation',
        type: 'definition',
        title: 'Matrix Representation',
        titleHe: 'ייצוג מטריצי',
        verbatimContent: `Let T: V → W be a linear transformation, B = {v₁,...,vₙ} a basis for V, and C = {w₁,...,wₘ} a basis for W.
The matrix representation of T with respect to B and C is the m×n matrix [T]_B^C where:
- The j-th column is [T(vⱼ)]_C (coordinates of T(vⱼ) in basis C)

Then: [T(v)]_C = [T]_B^C · [v]_B`,
        source: 'LA01 lecture 11 2026.pdf',
        pageNumber: 3,
        topic: 'matrix-representation',
        weekNumber: 6,
        tags: ['matrix', 'representation', 'fundamental'],
        relatedItems: ['def-linear-transformation', 'def-coordinates'],
        likelihoodScore: 95,
        examFrequency: 15,
      },
      {
        id: 'def-change-of-basis',
        type: 'definition',
        title: 'Change of Basis Matrix',
        titleHe: 'מטריצת מעבר',
        verbatimContent: `Let B and B' be two bases for V. The change of basis matrix from B to B' is:
P_B^B' = [I]_B^B'

where I: V → V is the identity map. Then: [v]_B' = P_B^B' · [v]_B

Properties:
- P_B'^B = (P_B^B')⁻¹
- If T: V → V and A = [T]_B, A' = [T]_B', then A' = P⁻¹AP where P = P_B^B'`,
        source: 'LA01 lecture 12 2026.pdf',
        pageNumber: 5,
        topic: 'change-of-basis',
        weekNumber: 6,
        tags: ['change-of-basis', 'transition'],
        relatedItems: ['def-matrix-representation', 'def-coordinates'],
        likelihoodScore: 92,
        examFrequency: 12,
      },
    ],
    theorems: [
      {
        id: 'thm-matrix-composition',
        type: 'theorem',
        title: 'Matrix of Composition',
        verbatimContent: `Let S: U → V and T: V → W be linear transformations. Then:
[T ∘ S] = [T] · [S]
(with appropriate bases)`,
        source: 'LA01 lecture 11 2026.pdf',
        pageNumber: 8,
        topic: 'matrix-representation',
        weekNumber: 6,
        tags: ['composition', 'matrix'],
        relatedItems: ['def-matrix-representation'],
        likelihoodScore: 85,
        examFrequency: 8,
      },
      {
        id: 'thm-similar-matrices',
        type: 'theorem',
        title: 'Similar Matrices',
        verbatimContent: `Two matrices A and B are similar (A ~ B) if there exists an invertible matrix P such that B = P⁻¹AP.

Matrices are similar iff they represent the same linear transformation with respect to different bases.

Similar matrices have the same:
- Determinant
- Trace
- Rank
- Characteristic polynomial
- Eigenvalues`,
        source: 'LA01 lecture 12 2026.pdf',
        pageNumber: 10,
        topic: 'change-of-basis',
        weekNumber: 6,
        tags: ['similar', 'matrices', 'key-theorem'],
        relatedItems: ['def-change-of-basis'],
        likelihoodScore: 95,
        examFrequency: 15,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [],
    isCompleted: false,
  },
  {
    id: 'week-7',
    weekNumber: 7,
    title: 'Rank and Nullity',
    titleHe: 'דרגה ואפסיות',
    description: 'Rank-nullity theorem and applications to systems of equations',
    topics: ['rank', 'nullity', 'systems-of-equations'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 13 2026.pdf', 'LA01 lecture 14 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_7_Omer.pdf'],
    definitions: [
      {
        id: 'def-rank',
        type: 'definition',
        title: 'Rank',
        titleHe: 'דרגה',
        verbatimContent: `The rank of a linear transformation T: V → W is:
rank(T) = dim(Im(T))

For a matrix A: rank(A) = dim(column space of A) = dim(row space of A)`,
        source: 'LA01 lecture 13 2026.pdf',
        pageNumber: 2,
        topic: 'rank',
        weekNumber: 7,
        tags: ['rank', 'dimension'],
        relatedItems: ['def-image', 'def-dimension'],
        likelihoodScore: 95,
        examFrequency: 18,
      },
      {
        id: 'def-nullity',
        type: 'definition',
        title: 'Nullity',
        titleHe: 'אפסיות',
        verbatimContent: `The nullity of a linear transformation T: V → W is:
nullity(T) = dim(ker(T))

For a matrix A: nullity(A) = dim(null space of A)`,
        source: 'LA01 lecture 13 2026.pdf',
        pageNumber: 3,
        topic: 'nullity',
        weekNumber: 7,
        tags: ['nullity', 'dimension'],
        relatedItems: ['def-kernel', 'def-dimension'],
        likelihoodScore: 90,
        examFrequency: 12,
      },
    ],
    theorems: [
      {
        id: 'thm-rank-nullity',
        type: 'theorem',
        title: 'Rank-Nullity Theorem',
        titleHe: 'משפט הדרגה והאפסיות',
        verbatimContent: `Let T: V → W be a linear transformation where V is finite-dimensional. Then:
dim(V) = rank(T) + nullity(T)

Equivalently: dim(V) = dim(Im(T)) + dim(ker(T))

For an m×n matrix A: n = rank(A) + nullity(A)`,
        explanation: 'This is one of the most important theorems. It connects the dimensions of kernel and image.',
        source: 'LA01 lecture 13 2026.pdf',
        pageNumber: 6,
        topic: 'rank',
        weekNumber: 7,
        tags: ['rank-nullity', 'fundamental-theorem', 'key-theorem'],
        relatedItems: ['def-rank', 'def-nullity'],
        likelihoodScore: 100,
        examFrequency: 25,
      },
      {
        id: 'thm-rank-row-col',
        type: 'theorem',
        title: 'Row Rank Equals Column Rank',
        verbatimContent: `For any matrix A: row rank(A) = column rank(A) = rank(A)`,
        source: 'LA01 lecture 14 2026.pdf',
        pageNumber: 4,
        topic: 'rank',
        weekNumber: 7,
        tags: ['rank', 'row-space', 'column-space'],
        relatedItems: ['def-rank'],
        likelihoodScore: 85,
        examFrequency: 8,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [],
    isCompleted: false,
  },
  {
    id: 'week-8',
    weekNumber: 8,
    title: 'Row Reduction and Systems',
    titleHe: 'דירוג ומערכות משוואות',
    description: 'Gaussian elimination, echelon forms, solving linear systems',
    topics: ['row-reduction', 'systems-of-equations'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 15 2026.pdf', 'LA01 lecture 16 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_8_Omer.pdf'],
    definitions: [
      {
        id: 'def-row-echelon',
        type: 'definition',
        title: 'Row Echelon Form',
        titleHe: 'צורת מדרגות',
        verbatimContent: `A matrix is in row echelon form (REF) if:
1. All zero rows are at the bottom
2. The leading entry (pivot) of each nonzero row is to the right of the pivot in the row above
3. All entries below a pivot are zero

A matrix is in reduced row echelon form (RREF) if additionally:
4. Each pivot is 1
5. Each pivot is the only nonzero entry in its column`,
        source: 'LA01 lecture 15 2026.pdf',
        pageNumber: 2,
        topic: 'row-reduction',
        weekNumber: 8,
        tags: ['echelon', 'row-reduction'],
        relatedItems: ['def-elementary-operations'],
        likelihoodScore: 88,
        examFrequency: 10,
      },
      {
        id: 'def-elementary-operations',
        type: 'definition',
        title: 'Elementary Row Operations',
        titleHe: 'פעולות אלמנטריות',
        verbatimContent: `The three elementary row operations are:
1. Swap two rows: Rᵢ ↔ Rⱼ
2. Multiply a row by a nonzero scalar: Rᵢ → cRᵢ (c ≠ 0)
3. Add a multiple of one row to another: Rᵢ → Rᵢ + cRⱼ

Each operation is reversible and preserves the solution set of Ax = b.`,
        source: 'LA01 lecture 15 2026.pdf',
        pageNumber: 4,
        topic: 'row-reduction',
        weekNumber: 8,
        tags: ['elementary-operations', 'row-reduction'],
        relatedItems: ['def-row-echelon'],
        likelihoodScore: 80,
        examFrequency: 6,
      },
    ],
    theorems: [
      {
        id: 'thm-rref-unique',
        type: 'theorem',
        title: 'Uniqueness of RREF',
        verbatimContent: `Every matrix has a unique reduced row echelon form.`,
        source: 'LA01 lecture 15 2026.pdf',
        pageNumber: 8,
        topic: 'row-reduction',
        weekNumber: 8,
        tags: ['rref', 'uniqueness'],
        relatedItems: ['def-row-echelon'],
        likelihoodScore: 75,
        examFrequency: 4,
      },
      {
        id: 'thm-solutions-structure',
        type: 'theorem',
        title: 'Structure of Solutions',
        verbatimContent: `For a linear system Ax = b:
1. If b ∉ Col(A), there is no solution
2. If b ∈ Col(A), let x₀ be a particular solution. Then:
   {x : Ax = b} = x₀ + ker(A) = {x₀ + h : h ∈ ker(A)}

The solution set is either empty or an affine subspace.`,
        source: 'LA01 lecture 16 2026.pdf',
        pageNumber: 5,
        topic: 'systems-of-equations',
        weekNumber: 8,
        tags: ['solutions', 'structure'],
        relatedItems: ['def-kernel'],
        likelihoodScore: 90,
        examFrequency: 12,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [],
    isCompleted: false,
  },
  {
    id: 'week-9',
    weekNumber: 9,
    title: 'Determinants',
    titleHe: 'דטרמיננטות',
    description: 'Definition, properties, and computation of determinants',
    topics: ['determinants'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 17 2026.pdf', 'LA01 lecture 18 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_9_Omer.pdf'],
    definitions: [
      {
        id: 'def-determinant',
        type: 'definition',
        title: 'Determinant',
        titleHe: 'דטרמיננטה',
        verbatimContent: `The determinant is the unique function det: Mₙ(F) → F satisfying:
1. det is multilinear in rows (linear in each row)
2. det is alternating (swapping two rows negates the determinant)
3. det(I) = 1

Explicit formula: det(A) = Σ_{σ∈Sₙ} sign(σ) · a₁,σ(1) · a₂,σ(2) · ... · aₙ,σ(n)

For 2×2: det[a b; c d] = ad - bc
For 3×3: det = a(ei-fh) - b(di-fg) + c(dh-eg) (cofactor expansion)`,
        source: 'LA01 lecture 17 2026.pdf',
        pageNumber: 3,
        topic: 'determinants',
        weekNumber: 9,
        tags: ['determinant', 'fundamental'],
        relatedItems: [],
        likelihoodScore: 95,
        examFrequency: 18,
      },
    ],
    theorems: [
      {
        id: 'thm-det-product',
        type: 'theorem',
        title: 'Determinant of Product',
        verbatimContent: `For square matrices A and B: det(AB) = det(A) · det(B)`,
        source: 'LA01 lecture 17 2026.pdf',
        pageNumber: 10,
        topic: 'determinants',
        weekNumber: 9,
        tags: ['determinant', 'product'],
        relatedItems: ['def-determinant'],
        likelihoodScore: 92,
        examFrequency: 12,
      },
      {
        id: 'thm-det-inverse',
        type: 'theorem',
        title: 'Determinant and Invertibility',
        verbatimContent: `A square matrix A is invertible if and only if det(A) ≠ 0.
Moreover: det(A⁻¹) = 1/det(A)`,
        source: 'LA01 lecture 18 2026.pdf',
        pageNumber: 4,
        topic: 'determinants',
        weekNumber: 9,
        tags: ['determinant', 'invertibility', 'key-theorem'],
        relatedItems: ['def-determinant'],
        likelihoodScore: 95,
        examFrequency: 15,
      },
      {
        id: 'thm-det-transpose',
        type: 'theorem',
        title: 'Determinant of Transpose',
        verbatimContent: `det(Aᵀ) = det(A)`,
        source: 'LA01 lecture 18 2026.pdf',
        pageNumber: 6,
        topic: 'determinants',
        weekNumber: 9,
        tags: ['determinant', 'transpose'],
        relatedItems: ['def-determinant'],
        likelihoodScore: 85,
        examFrequency: 8,
      },
      {
        id: 'thm-det-row-ops',
        type: 'theorem',
        title: 'Determinant and Row Operations',
        verbatimContent: `Effect of row operations on det(A):
1. Swap two rows: det changes sign
2. Multiply row by c: det multiplies by c
3. Add multiple of one row to another: det unchanged`,
        source: 'LA01 lecture 17 2026.pdf',
        pageNumber: 8,
        topic: 'determinants',
        weekNumber: 9,
        tags: ['determinant', 'row-operations'],
        relatedItems: ['def-determinant', 'def-elementary-operations'],
        likelihoodScore: 88,
        examFrequency: 10,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [],
    isCompleted: false,
  },
  {
    id: 'week-10',
    weekNumber: 10,
    title: 'Eigenvalues and Eigenvectors',
    titleHe: 'ערכים עצמיים ווקטורים עצמיים',
    description: 'Eigenvalues, eigenvectors, characteristic polynomial',
    topics: ['eigenvalues', 'eigenvectors'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 19 2026.pdf', 'LA01 lecture 20 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_10_Omer.pdf'],
    definitions: [
      {
        id: 'def-eigenvalue',
        type: 'definition',
        title: 'Eigenvalue and Eigenvector',
        titleHe: 'ערך עצמי ווקטור עצמי',
        verbatimContent: `Let T: V → V be a linear operator (or A an n×n matrix).
A scalar λ ∈ F is an eigenvalue of T if there exists a nonzero vector v ∈ V such that:
T(v) = λv (or Av = λv)

Such a nonzero v is called an eigenvector corresponding to λ.

The eigenspace for λ is: E_λ = ker(T - λI) = {v ∈ V : Tv = λv}`,
        explanation: 'Eigenvectors are scaled (not rotated) by T. Eigenspaces always contain 0 but 0 is never an eigenvector.',
        source: 'LA01 lecture 19 2026.pdf',
        pageNumber: 2,
        topic: 'eigenvalues',
        weekNumber: 10,
        tags: ['eigenvalue', 'eigenvector', 'fundamental'],
        relatedItems: ['def-characteristic-polynomial'],
        likelihoodScore: 100,
        examFrequency: 25,
      },
      {
        id: 'def-characteristic-polynomial',
        type: 'definition',
        title: 'Characteristic Polynomial',
        titleHe: 'פולינום אופייני',
        verbatimContent: `The characteristic polynomial of a matrix A (or operator T) is:
p_A(λ) = det(A - λI)

This is a monic polynomial of degree n. Its roots are the eigenvalues of A.`,
        source: 'LA01 lecture 19 2026.pdf',
        pageNumber: 6,
        topic: 'eigenvalues',
        weekNumber: 10,
        tags: ['characteristic-polynomial'],
        relatedItems: ['def-eigenvalue', 'def-determinant'],
        likelihoodScore: 95,
        examFrequency: 18,
      },
      {
        id: 'def-algebraic-geometric-mult',
        type: 'definition',
        title: 'Algebraic and Geometric Multiplicity',
        verbatimContent: `For an eigenvalue λ:
- Algebraic multiplicity: multiplicity of λ as a root of the characteristic polynomial
- Geometric multiplicity: dim(E_λ) = dim(ker(A - λI))

Always: 1 ≤ geometric mult ≤ algebraic mult`,
        source: 'LA01 lecture 20 2026.pdf',
        pageNumber: 3,
        topic: 'eigenvalues',
        weekNumber: 10,
        tags: ['multiplicity', 'algebraic', 'geometric'],
        relatedItems: ['def-eigenvalue'],
        likelihoodScore: 90,
        examFrequency: 12,
      },
    ],
    theorems: [
      {
        id: 'thm-eigen-independent',
        type: 'theorem',
        title: 'Eigenvectors for Distinct Eigenvalues',
        verbatimContent: `Eigenvectors corresponding to distinct eigenvalues are linearly independent.

Corollary: If an n×n matrix has n distinct eigenvalues, it is diagonalizable.`,
        source: 'LA01 lecture 19 2026.pdf',
        pageNumber: 10,
        topic: 'eigenvalues',
        weekNumber: 10,
        tags: ['eigenvectors', 'independence', 'key-theorem'],
        relatedItems: ['def-eigenvalue', 'def-linear-independence'],
        likelihoodScore: 95,
        examFrequency: 15,
      },
      {
        id: 'thm-sum-product-eigenvalues',
        type: 'theorem',
        title: 'Trace and Determinant via Eigenvalues',
        verbatimContent: `For an n×n matrix A with eigenvalues λ₁, ..., λₙ (counted with multiplicity):
- tr(A) = λ₁ + λ₂ + ... + λₙ
- det(A) = λ₁ · λ₂ · ... · λₙ`,
        source: 'LA01 lecture 20 2026.pdf',
        pageNumber: 8,
        topic: 'eigenvalues',
        weekNumber: 10,
        tags: ['trace', 'determinant', 'eigenvalues'],
        relatedItems: ['def-eigenvalue', 'def-determinant'],
        likelihoodScore: 88,
        examFrequency: 10,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [],
    isCompleted: false,
  },
  {
    id: 'week-11',
    weekNumber: 11,
    title: 'Diagonalization',
    titleHe: 'לכסון',
    description: 'When and how to diagonalize matrices',
    topics: ['diagonalization'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 21 2026.pdf', 'LA01 lecture 22 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_11_Omer.pdf'],
    definitions: [
      {
        id: 'def-diagonalizable',
        type: 'definition',
        title: 'Diagonalizable Matrix',
        titleHe: 'מטריצה לכסינה',
        verbatimContent: `A matrix A is diagonalizable if it is similar to a diagonal matrix, i.e., there exists an invertible P such that:
P⁻¹AP = D
where D is diagonal.

Equivalently: A is diagonalizable iff there exists a basis of eigenvectors for Fⁿ.`,
        source: 'LA01 lecture 21 2026.pdf',
        pageNumber: 2,
        topic: 'diagonalization',
        weekNumber: 11,
        tags: ['diagonalizable', 'fundamental'],
        relatedItems: ['thm-similar-matrices', 'def-eigenvalue'],
        likelihoodScore: 98,
        examFrequency: 20,
      },
    ],
    theorems: [
      {
        id: 'thm-diagonalization-criterion',
        type: 'theorem',
        title: 'Diagonalization Criterion',
        verbatimContent: `An n×n matrix A is diagonalizable if and only if:
1. The characteristic polynomial splits completely (all roots in F), AND
2. For each eigenvalue λ: geometric multiplicity = algebraic multiplicity

Equivalently: A is diagonalizable iff the sum of dimensions of eigenspaces equals n.`,
        explanation: 'To diagonalize: find eigenvalues, find eigenvectors, form P from eigenvectors as columns.',
        source: 'LA01 lecture 21 2026.pdf',
        pageNumber: 6,
        topic: 'diagonalization',
        weekNumber: 11,
        tags: ['diagonalization', 'criterion', 'key-theorem'],
        relatedItems: ['def-diagonalizable', 'def-algebraic-geometric-mult'],
        likelihoodScore: 100,
        examFrequency: 22,
      },
      {
        id: 'thm-powers-diagonal',
        type: 'theorem',
        title: 'Powers of Diagonalizable Matrices',
        verbatimContent: `If A = PDP⁻¹ where D is diagonal, then:
Aⁿ = PDⁿP⁻¹

where Dⁿ = diag(λ₁ⁿ, λ₂ⁿ, ..., λₖⁿ)`,
        source: 'LA01 lecture 22 2026.pdf',
        pageNumber: 4,
        topic: 'diagonalization',
        weekNumber: 11,
        tags: ['powers', 'application'],
        relatedItems: ['def-diagonalizable'],
        likelihoodScore: 85,
        examFrequency: 10,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [],
    isCompleted: false,
  },
  {
    id: 'week-12',
    weekNumber: 12,
    title: 'Inner Products and Orthogonality',
    titleHe: 'מכפלות פנימיות ואורתוגונליות',
    description: 'Inner product spaces, orthogonal vectors and subspaces',
    topics: ['inner-products', 'orthogonality'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 23 2026.pdf', 'LA01 lecture 24 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_12_Omer.pdf'],
    definitions: [
      {
        id: 'def-inner-product',
        type: 'definition',
        title: 'Inner Product',
        titleHe: 'מכפלה פנימית',
        verbatimContent: `An inner product on a real vector space V is a function ⟨·,·⟩: V×V → ℝ satisfying:
1. ⟨u,v⟩ = ⟨v,u⟩ (symmetry)
2. ⟨αu + βv, w⟩ = α⟨u,w⟩ + β⟨v,w⟩ (linearity in first argument)
3. ⟨v,v⟩ ≥ 0 and ⟨v,v⟩ = 0 iff v = 0 (positive definiteness)

Standard inner product on ℝⁿ: ⟨x,y⟩ = x₁y₁ + x₂y₂ + ... + xₙyₙ = xᵀy`,
        source: 'LA01 lecture 23 2026.pdf',
        pageNumber: 2,
        topic: 'inner-products',
        weekNumber: 12,
        tags: ['inner-product', 'fundamental'],
        relatedItems: ['def-norm', 'def-orthogonal'],
        likelihoodScore: 95,
        examFrequency: 15,
      },
      {
        id: 'def-norm',
        type: 'definition',
        title: 'Norm (Length)',
        titleHe: 'נורמה',
        verbatimContent: `The norm of a vector v in an inner product space is:
‖v‖ = √⟨v,v⟩

Properties:
- ‖v‖ ≥ 0, with equality iff v = 0
- ‖αv‖ = |α| · ‖v‖
- ‖u + v‖ ≤ ‖u‖ + ‖v‖ (triangle inequality)`,
        source: 'LA01 lecture 23 2026.pdf',
        pageNumber: 5,
        topic: 'inner-products',
        weekNumber: 12,
        tags: ['norm', 'length'],
        relatedItems: ['def-inner-product'],
        likelihoodScore: 85,
        examFrequency: 8,
      },
      {
        id: 'def-orthogonal',
        type: 'definition',
        title: 'Orthogonal Vectors',
        titleHe: 'וקטורים אורתוגונליים',
        verbatimContent: `Two vectors u and v are orthogonal (u ⊥ v) if ⟨u,v⟩ = 0.

A set of vectors is orthogonal if every pair is orthogonal.
A set is orthonormal if it is orthogonal and each vector has norm 1.`,
        source: 'LA01 lecture 23 2026.pdf',
        pageNumber: 8,
        topic: 'orthogonality',
        weekNumber: 12,
        tags: ['orthogonal', 'orthonormal'],
        relatedItems: ['def-inner-product', 'def-norm'],
        likelihoodScore: 92,
        examFrequency: 12,
      },
      {
        id: 'def-orthogonal-complement',
        type: 'definition',
        title: 'Orthogonal Complement',
        titleHe: 'משלים אורתוגונלי',
        verbatimContent: `The orthogonal complement of a subspace W ⊆ V is:
W⊥ = {v ∈ V : ⟨v,w⟩ = 0 for all w ∈ W}

W⊥ is a subspace of V.`,
        source: 'LA01 lecture 24 2026.pdf',
        pageNumber: 3,
        topic: 'orthogonality',
        weekNumber: 12,
        tags: ['orthogonal-complement'],
        relatedItems: ['def-orthogonal', 'def-subspace'],
        likelihoodScore: 90,
        examFrequency: 10,
      },
    ],
    theorems: [
      {
        id: 'thm-cauchy-schwarz',
        type: 'theorem',
        title: 'Cauchy-Schwarz Inequality',
        verbatimContent: `For all u, v in an inner product space:
|⟨u,v⟩| ≤ ‖u‖ · ‖v‖

Equality holds iff u and v are linearly dependent.`,
        source: 'LA01 lecture 23 2026.pdf',
        pageNumber: 12,
        topic: 'inner-products',
        weekNumber: 12,
        tags: ['inequality', 'cauchy-schwarz', 'key-theorem'],
        relatedItems: ['def-inner-product', 'def-norm'],
        likelihoodScore: 90,
        examFrequency: 10,
      },
      {
        id: 'thm-orthonormal-independent',
        type: 'theorem',
        title: 'Orthonormal Sets are Independent',
        verbatimContent: `Any orthonormal set is linearly independent.`,
        source: 'LA01 lecture 23 2026.pdf',
        pageNumber: 14,
        topic: 'orthogonality',
        weekNumber: 12,
        tags: ['orthonormal', 'independence'],
        relatedItems: ['def-orthogonal', 'def-linear-independence'],
        likelihoodScore: 85,
        examFrequency: 8,
      },
      {
        id: 'thm-orthogonal-decomposition',
        type: 'theorem',
        title: 'Orthogonal Decomposition',
        verbatimContent: `If W is a finite-dimensional subspace of an inner product space V, then:
V = W ⊕ W⊥

Every v ∈ V can be uniquely written as v = w + w⊥ where w ∈ W and w⊥ ∈ W⊥.`,
        source: 'LA01 lecture 24 2026.pdf',
        pageNumber: 6,
        topic: 'orthogonality',
        weekNumber: 12,
        tags: ['decomposition', 'direct-sum'],
        relatedItems: ['def-orthogonal-complement'],
        likelihoodScore: 88,
        examFrequency: 10,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [],
    isCompleted: false,
  },
  {
    id: 'week-13',
    weekNumber: 13,
    title: 'Gram-Schmidt and Applications',
    titleHe: 'גרם-שמידט ויישומים',
    description: 'Gram-Schmidt process, orthogonal projection, least squares',
    topics: ['gram-schmidt', 'least-squares'] as LinearAlgebraTopic[],
    lectureFiles: ['LA01 lecture 25 2026.pdf', 'LA01 lecture 26 2026.pdf'],
    tutorialFiles: ['Lin_Alg_I_2025-2026_Tirgul_13_Omer.pdf'],
    definitions: [
      {
        id: 'def-orthogonal-projection',
        type: 'definition',
        title: 'Orthogonal Projection',
        titleHe: 'היטל אורתוגונלי',
        verbatimContent: `The orthogonal projection of v onto a subspace W is the unique vector proj_W(v) ∈ W such that:
v - proj_W(v) ∈ W⊥

If {u₁,...,uₖ} is an orthonormal basis for W:
proj_W(v) = ⟨v,u₁⟩u₁ + ⟨v,u₂⟩u₂ + ... + ⟨v,uₖ⟩uₖ`,
        source: 'LA01 lecture 25 2026.pdf',
        pageNumber: 2,
        topic: 'gram-schmidt',
        weekNumber: 13,
        tags: ['projection', 'orthogonal'],
        relatedItems: ['def-orthogonal-complement'],
        likelihoodScore: 92,
        examFrequency: 12,
      },
    ],
    theorems: [
      {
        id: 'thm-gram-schmidt',
        type: 'theorem',
        title: 'Gram-Schmidt Process',
        titleHe: 'תהליך גרם-שמידט',
        verbatimContent: `Given linearly independent vectors {v₁,...,vₖ}, the Gram-Schmidt process produces an orthonormal set {u₁,...,uₖ} spanning the same subspace:

w₁ = v₁,  u₁ = w₁/‖w₁‖
w₂ = v₂ - ⟨v₂,u₁⟩u₁,  u₂ = w₂/‖w₂‖
w₃ = v₃ - ⟨v₃,u₁⟩u₁ - ⟨v₃,u₂⟩u₂,  u₃ = w₃/‖w₃‖
...
wₖ = vₖ - Σⱼ₌₁ᵏ⁻¹ ⟨vₖ,uⱼ⟩uⱼ,  uₖ = wₖ/‖wₖ‖`,
        explanation: 'At each step: subtract projections onto previous vectors, then normalize.',
        source: 'LA01 lecture 25 2026.pdf',
        pageNumber: 5,
        topic: 'gram-schmidt',
        weekNumber: 13,
        tags: ['gram-schmidt', 'orthonormalization', 'key-theorem'],
        relatedItems: ['def-orthogonal', 'def-orthogonal-projection'],
        likelihoodScore: 98,
        examFrequency: 18,
      },
      {
        id: 'thm-best-approximation',
        type: 'theorem',
        title: 'Best Approximation',
        verbatimContent: `Let W be a finite-dimensional subspace of V. For any v ∈ V:
proj_W(v) is the unique vector in W closest to v.

That is: ‖v - proj_W(v)‖ < ‖v - w‖ for all w ∈ W, w ≠ proj_W(v)`,
        source: 'LA01 lecture 25 2026.pdf',
        pageNumber: 10,
        topic: 'gram-schmidt',
        weekNumber: 13,
        tags: ['best-approximation', 'projection'],
        relatedItems: ['def-orthogonal-projection'],
        likelihoodScore: 88,
        examFrequency: 10,
      },
      {
        id: 'thm-least-squares',
        type: 'theorem',
        title: 'Least Squares Solution',
        verbatimContent: `The least squares solution to Ax = b (where Ax = b may have no solution) is any x̂ satisfying:
AᵀAx̂ = Aᵀb

This x̂ minimizes ‖Ax - b‖.

If A has full column rank, then AᵀA is invertible and:
x̂ = (AᵀA)⁻¹Aᵀb`,
        source: 'LA01 lecture 26 2026.pdf',
        pageNumber: 4,
        topic: 'least-squares',
        weekNumber: 13,
        tags: ['least-squares', 'normal-equations', 'key-theorem'],
        relatedItems: ['def-orthogonal-projection'],
        likelihoodScore: 95,
        examFrequency: 15,
      },
    ],
    proofs: [],
    techniques: [],
    formulas: [],
    examples: [],
    practiceQuestions: [],
    isCompleted: false,
  },
]

// Helper function to get all definitions
export function getAllDefinitions(): KnowledgeItem[] {
  return weeksData.flatMap(w => w.definitions)
}

// Helper function to get all theorems
export function getAllTheorems(): KnowledgeItem[] {
  return weeksData.flatMap(w => w.theorems)
}

// Helper function to get all proofs
export function getAllProofs(): KnowledgeItem[] {
  return weeksData.flatMap(w => w.proofs)
}

// Helper function to get week by number
export function getWeekByNumber(num: number): StudyWeek | undefined {
  return weeksData.find(w => w.weekNumber === num)
}
