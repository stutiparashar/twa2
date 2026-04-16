import { relations } from 'drizzle-orm'
import { boolean, int, mysqlTable, mysqlEnum, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { randomUUID } from 'crypto'
import { modules } from './modules'
import { users } from './users'
import { questions } from './questions'

export const userModuleProgress = mysqlTable('user_module_progress', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('userId', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  moduleId: int('moduleId').notNull().references(() => modules.id, { onDelete: 'cascade' }),
  status: mysqlEnum('status', ['not_started', 'in_progress', 'completed']).default('not_started').notNull(),
  currentCardIndex: int('currentCardIndex').default(0).notNull(),
  score: int('score'),
  completedAt: timestamp('completedAt', { mode: 'date', fsp: 3 }),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
})

export const userAnswers = mysqlTable('user_answers', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('userId', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  questionId: int('questionId').notNull().references(() => questions.id, { onDelete: 'cascade' }),
  answer: varchar('answer', { length: 500 }).notNull(),
  isCorrect: boolean('isCorrect').default(false).notNull(),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
})

export const userModuleProgressRelations = relations(userModuleProgress, ({ one }) => ({
  user: one(users, {
    fields: [userModuleProgress.userId],
    references: [users.id],
  }),
  module: one(modules, {
    fields: [userModuleProgress.moduleId],
    references: [modules.id],
  }),
}))

export const userAnswersRelations = relations(userAnswers, ({ one }) => ({
  user: one(users, {
    fields: [userAnswers.userId],
    references: [users.id],
  }),
  question: one(questions, {
    fields: [userAnswers.questionId],
    references: [questions.id],
  }),
}))
