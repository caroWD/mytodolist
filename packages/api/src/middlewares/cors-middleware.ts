import { ACCEPTED_ORIGINS } from '../config'
import cors from 'cors'

export const corsMiddleware = (
  acceptedOrigins: string[] = ACCEPTED_ORIGINS.split(';')
) =>
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)

      if (acceptedOrigins.includes(origin)) return callback(null, true)

      return callback(new Error('Not allowed by CORS.'))
    },
  })
