import { relations } from 'drizzle-orm'
import { boolean, index, int, mysqlTable, mysqlEnum, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { randomUUID } from 'crypto'

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }),
  image: varchar('image', { length: 500 }),
  bio: text('bio'),
  totalPoints: int('totalPoints').default(0).notNull(),
  rank: int('rank'),
  currentStreak: int('currentStreak').default(0).notNull(),
  longestStreak: int('longestStreak').default(0).notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date', fsp: 3 }),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date', fsp: 3 }).defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
}))

export const accounts = mysqlTable('accounts', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  userId: varchar('userId', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 50 }).notNull(),
  provider: varchar('provider', { length: 50 }).notNull(),
  providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: int('expires_at'),
  token_type: varchar('token_type', { length: 50 }),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: varchar('session_state', { length: 100 }),
}, (table) => ({
  providerProviderAccountIdIdx: index('accounts_provider_providerAccountId_idx').on(table.provider, table.providerAccountId),
}))

export const sessions = mysqlTable('sessions', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  sessionToken: varchar('sessionToken', { length: 255 }).notNull().unique(),
  userId: varchar('userId', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date', fsp: 3 }).notNull(),
}, (table) => ({
  sessionTokenIdx: index('sessions_sessionToken_idx').on(table.sessionToken),
}))

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}))
