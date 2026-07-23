import 'dotenv/config'
import './dotenv.config'

export const {
  NODE_ENV = 'development',
  PORT = 3000,
  ACCEPTED_ORIGINS = 'http://localhost::4000',
} = process.env
