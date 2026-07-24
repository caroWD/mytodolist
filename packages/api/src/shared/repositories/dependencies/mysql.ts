import { createPool } from 'mysql2/promise'
import { drizzle } from 'drizzle-orm/mysql2'
import { DB_MYSQL_DATABASE_URL } from '../../../config'
import { DrizzleMysqlPermissionRepository } from '../../../modules/auths/access-controls/permissions/infrastructure/repositories'

const client = createPool(DB_MYSQL_DATABASE_URL)

client.config = !client.config ? {} : client.config

const db = drizzle({ client })

export const mysqlPermissionRepository = new DrizzleMysqlPermissionRepository(
  db
)
