import { relations } from 'drizzle-orm'
import { int, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { users } from './users'

export const certificates = mysqlTable('certificates', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  image: text('image'), // Template image for certificate
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
})

export const userCertificates = mysqlTable('user_certificates', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('userId', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  certificateId: int('certificateId').notNull().references(() => certificates.id, { onDelete: 'cascade' }),
  awardedAt: timestamp('awardedAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
})

export const certificatesRelations = relations(certificates, ({ many }) => ({
  users: many(userCertificates),
}))

export const userCertificatesRelations = relations(userCertificates, ({ one }) => ({
  user: one(users, { fields: [userCertificates.userId], references: [users.id] }),
  certificate: one(certificates, { fields: [userCertificates.certificateId], references: [certificates.id] }),
}))
