import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from './schema/index'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const connectionString = process.env.DATABASE_URL

const url = new URL(connectionString)

const connectionConfig = {
  host: url.hostname,
  port: parseInt(url.port) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.replace('/', ''),
  ssl: {
    rejectUnauthorized: false,
  },
}

const pool = mysql.createPool(connectionConfig)

export const db = drizzle(pool, { schema, mode: 'planetscale' })
