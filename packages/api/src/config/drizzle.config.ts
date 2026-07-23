import { defineConfig } from 'drizzle-kit'
import {
  DB_DIALECT,
  DB_MYSQL_DATABASE_URL,
  DB_SQLITE_FILE_NAME,
} from './config'

export default defineConfig({
  out: '../drizzle',
  schema:
    DB_DIALECT === 'sqlite'
      ? './src/db/schemas/sqlite.ts'
      : DB_DIALECT === 'mysql'
        ? './src/db/schemas/mysql.ts'
        : 'error',
  dialect: DB_DIALECT,
  dbCredentials: {
    url:
      DB_DIALECT === 'sqlite'
        ? DB_SQLITE_FILE_NAME
        : DB_DIALECT === 'mysql'
          ? DB_MYSQL_DATABASE_URL
          : 'error',
  },
})
