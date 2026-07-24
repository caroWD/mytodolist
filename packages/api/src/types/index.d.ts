import * as z from 'zod'
import type {
  baseInsertSchema,
  baseRequestSchema,
  baseSelectSchema,
  idRequestSchema,
} from '../modules'
import type { rolePermissionRequestSchema } from '../modules'

declare module 'bun' {
  interface Env {
    NODE_ENV?: 'development' | 'production'
    PORT?: number
    ACCEPTED_ORIGINS?: string
    DB_DIALECT?:
      | 'postgresql'
      | 'mysql'
      | 'sqlite'
      | 'turso'
      | 'singlestore'
      | 'mssql'
      | 'cockroach'
      | 'duckdb'
    DB_SQLITE_FILE_NAME?: string
    DB_MYSQL_DATABASE_URL?: string
  }
}

export type BaseSelect = z.infer<typeof baseSelectSchema>

export type BaseInsert = z.infer<typeof baseInsertSchema>

export type BaseRequest = z.infer<typeof baseRequestSchema>

export type IdRequest = z.infer<typeof idRequestSchema>

export type RolePermissionRequest = z.infer<typeof rolePermissionRequestSchema>

export type AuthResponse = {
  message: string
  status: boolean
  token: string | null
}

export type BaseResponse = Omit<AuthResponse, 'token'>
