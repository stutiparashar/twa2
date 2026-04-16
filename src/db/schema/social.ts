import { relations } from 'drizzle-orm'
import { int, mysqlTable, mysqlEnum, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { randomUUID } from 'crypto'
import { users } from './users'

export const friendships = mysqlTable('friendships', {
  id: int('id').primaryKey().autoincrement(),
  requesterId: varchar('requesterId', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  receiverId: varchar('receiverId', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: mysqlEnum('status', ['pending', 'accepted']).default('pending').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
})

export const moduleProposals = mysqlTable('module_proposals', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description'),
  proposerId: varchar('proposerId', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  category: mysqlEnum('category', ['History', 'Science', 'Art & Culture', 'General']).notNull(),
  votes: int('votes').default(0).notNull(),
  status: mysqlEnum('status', ['pending', 'approved', 'rejected']).default('pending').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
})

export const proposalVotes = mysqlTable('proposal_votes', {
  id: int('id').primaryKey().autoincrement(),
  proposalId: int('proposalId').notNull().references(() => moduleProposals.id, { onDelete: 'cascade' }),
  userId: varchar('userId', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
})

export const friendshipsRelations = relations(friendships, ({ one }) => ({
  requester: one(users, {
    fields: [friendships.requesterId],
    references: [users.id],
  }),
  receiver: one(users, {
    fields: [friendships.receiverId],
    references: [users.id],
  }),
}))

export const moduleProposalsRelations = relations(moduleProposals, ({ one, many }) => ({
  proposer: one(users, {
    fields: [moduleProposals.proposerId],
    references: [users.id],
  }),
  votes: many(proposalVotes),
}))

export const proposalVotesRelations = relations(proposalVotes, ({ one }) => ({
  proposal: one(moduleProposals, {
    fields: [proposalVotes.proposalId],
    references: [moduleProposals.id],
  }),
  user: one(users, {
    fields: [proposalVotes.userId],
    references: [users.id],
  }),
}))
