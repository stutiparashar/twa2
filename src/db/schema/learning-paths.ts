import { relations } from 'drizzle-orm'
import { int, mysqlTable, mysqlEnum, text, timestamp, varchar, boolean } from 'drizzle-orm/mysql-core'
import { users } from './users'
import { modules } from './modules'

// Note: certificates imported lazily via relations to avoid circular barrel dependency
import { certificates } from '@/db/schema/certificates'

export const learningPaths = mysqlTable('learning_paths', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  coverImage: text('coverImage'),
  difficulty: mysqlEnum('difficulty', ['Beginner', 'Intermediate', 'Advanced']).notNull(),
  estimatedTime: varchar('estimatedTime', { length: 50 }),
  prerequisites: text('prerequisites'),
  isSequential: boolean('isSequential').default(false).notNull(),
  status: mysqlEnum('status', ['published', 'draft', 'pending']).default('draft').notNull(),
  authorId: varchar('authorId', { length: 36 }).notNull().references(() => users.id),
  // certificateId stored as plain int; FK enforced at DB level via migration
  certificateId: int('certificateId'),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
})

export const learningPathModules = mysqlTable('learning_path_modules', {
  id: int('id').primaryKey().autoincrement(),
  learningPathId: int('learningPathId').notNull().references(() => learningPaths.id, { onDelete: 'cascade' }),
  moduleId: int('moduleId').notNull().references(() => modules.id, { onDelete: 'cascade' }),
  sortOrder: int('sortOrder').default(0).notNull(),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
})

export const learningPathsRelations = relations(learningPaths, ({ one, many }) => ({
  author: one(users, { fields: [learningPaths.authorId], references: [users.id] }),
  certificate: one(certificates, { fields: [learningPaths.certificateId], references: [certificates.id] }),
  modules: many(learningPathModules),
}))

export const learningPathModulesRelations = relations(learningPathModules, ({ one }) => ({
  learningPath: one(learningPaths, { fields: [learningPathModules.learningPathId], references: [learningPaths.id] }),
  module: one(modules, { fields: [learningPathModules.moduleId], references: [modules.id] }),
}))
