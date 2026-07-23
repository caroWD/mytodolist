import { uuidv7 } from 'zod'
import { tempoSchema } from '../../tempos'

export const rootSchema = tempoSchema.extend({
  id: uuidv7({ error: 'The Id must be in UUIDv7 format.' }),
})
