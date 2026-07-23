import * as z from 'zod'
import type {
  baseInsertSchema,
  baseRequestSchema,
  baseSelectSchema,
  idRequestSchema,
} from '../modules'

declare module 'bun' {
  interface Env {
    NODE_ENV?: 'development' | 'production'
    PORT?: number
    ACCEPTED_ORIGINS?: string
  }
}

export type BaseSelect = z.infer<typeof baseSelectSchema>

export type BaseInsert = z.infer<typeof baseInsertSchema>

export type BaseRequest = z.infer<typeof baseRequestSchema>

export type IdRequest = z.infer<typeof idRequestSchema>

export type AuthResponse = {
  message: string
  status: boolean
  token: string | null
}

export type BaseResponse = Omit<AuthResponse, 'token'>
