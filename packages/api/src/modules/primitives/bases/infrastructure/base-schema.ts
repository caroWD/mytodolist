import { string } from 'zod'
import { rootSchema } from '../../roots'

export const baseSelectSchema = rootSchema.extend({
  name: string({ error: 'The Name must be a string.' }),
  description: string({ error: 'The Description must be a string.' }),
})

export const baseInsertSchema = baseSelectSchema.partial({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})

export const baseRequestSchema = baseSelectSchema.pick({
  id: true,
  name: true,
  description: true,
})

export const idRequestSchema = baseRequestSchema.pick({ id: true })
