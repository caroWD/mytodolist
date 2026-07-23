import 'dotenv/config'
import './dotenv.config'

export const {
  NODE_ENV = 'development',
  PORT = 3000,
  ACCEPTED_ORIGINS = 'http://localhost::4000',
  DB_DIALECT = 'sqlite',
  DB_SQLITE_FILE_NAME = 'file:local.db',
  DB_MYSQL_DATABASE_URL = 'mysql://root:mypassword@localhost:3306/mysql',
} = process.env
