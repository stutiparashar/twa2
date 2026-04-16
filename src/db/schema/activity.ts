import { relations } from 'drizzle-orm'
import { int, mysqlTable, mysqlEnum, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { randomUUID } from 'crypto'
import { modules } from './modules'
import { users } from './users'

export const activityLogs = mysqlTable('activity_logs', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('userId', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  activityType: mysqlEnum('activityType', ['module_started', 'module_completed', 'quiz_answered', 'achievement_unlocked']).notNull(),
  moduleId: int('moduleId').references(() => modules.id, { onDelete: 'set null' }),
  pointsEarned: int('pointsEarned').default(0).notNull(),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
})

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
  module: one(modules, {
    fields: [activityLogs.moduleId],
    references: [modules.id],
  }),
}))
