import { z } from 'zod'

// Reusable schemas for nested validation
const questionOptionSchema = z.object({
  optionText: z.string().min(1, "Option text cannot be empty."),
  sortOrder: z.number()
})

const questionSchema = z.object({
  question: z.string().min(1, "Question text is required."),
  type: z.enum(['multiple-choice', 'true-false', 'text']),
  correctAnswer: z.string().min(1, "Correct answer is required."),
  explanation: z.string().optional(),
  hint: z.string().optional(),
  sortOrder: z.number(),
  options: z.array(questionOptionSchema).min(2, "Must have at least 2 options.").optional()
}).refine(
  (data) => {
    if (data.type === 'multiple-choice' && data.options) {
      return data.options.some(o => o.optionText === data.correctAnswer)
    }
    return true
  },
  { message: "Correct answer must match an option.", path: ['correctAnswer'] }
)

// Step 0: Basic Info
export const basicInfoSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  category: z.enum(['History', 'Science', 'Art & Culture', 'General']),
  estimatedTime: z.string().min(1, "Estimated time is required."),
  color: z.string().optional(),
  accentColor: z.string().optional()
})

// Step 1: Content Cards
export const contentCardsSchema = z.object({
  cards: z.array(z.object({
    type: z.literal('content'),
    title: z.string().min(1, "Title is required."),
    content: z.string().min(1, "Content is required.").refine(
      (val) => val !== '<p></p>',
      "Content is required."
    ),
    icon: z.string().optional(),
    image: z.string().nullable().optional(),
    sortOrder: z.number()
  })).optional()
})

// Step 2: Quiz Questions
export const quizQuestionsSchema = z.object({
  cards: z.array(z.object({
    type: z.literal('question'),
    title: z.string().min(1, "Quiz set title is required."),
    questions: z.array(questionSchema).min(1, "Must have at least one question."),
    icon: z.string().optional(),
    image: z.string().nullable().optional(),
    sortOrder: z.number()
  })).optional()
})

// Step 3: Achievements
export const achievementsSchema = z.object({
  cards: z.array(z.object({
    type: z.literal('achievement'),
    title: z.string().min(1, "Achievement title is required."),
    icon: z.string().min(1, "Achievement icon is required."),
    content: z.string().optional(),
    image: z.string().nullable().optional(),
    sortOrder: z.number()
  })).optional()
})

// Combined schema for full form validation
export const moduleFormSchema = basicInfoSchema
