import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { DB_SQLITE_FILE_NAME } from '../../../config'
import { DrizzleSqlitePermissionRepository } from '../../../modules/auths/access-controls/permissions/infrastructure/repositories'
import { DrizzleSqliteRoleRepository } from '../../../modules/auths/access-controls/roles/infrastructure/repositories'

const client = createClient({ url: DB_SQLITE_FILE_NAME })
const db = drizzle({ client })

export const sqlitePermissionRepository = new DrizzleSqlitePermissionRepository(
  db
)

export const sqliteRoleRepository = new DrizzleSqliteRoleRepository(db)
