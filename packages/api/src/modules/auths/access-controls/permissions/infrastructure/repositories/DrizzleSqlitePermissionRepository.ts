import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import {
  NotFoundError,
  type BaseName,
  type IBaseRepository,
  type RootId,
} from '../../../../../primitives'
import type { Permission } from '../../domain'
import { PermissionMapper } from '../services'
import { sqlitePermissionsTable } from '../../../../../../db'
import { eq } from 'drizzle-orm'
import { getTemporalNow } from '../../../../../../helpers'

export class DrizzleSqlitePermissionRepository implements IBaseRepository<Permission> {
  private readonly _db: LibSQLDatabase

  constructor(db: LibSQLDatabase) {
    this._db = db
  }

  async add(entity: Permission): Promise<void> {
    const permission = await PermissionMapper.mapToPermissionInsert(entity)

    const { rowsAffected } = await this._db
      .insert(sqlitePermissionsTable)
      .values(permission)

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async edit(entity: Permission): Promise<void> {
    const permission = await PermissionMapper.mapToPermissionInsert(entity)

    const { rowsAffected } = await this._db
      .update(sqlitePermissionsTable)
      .set({
        name: permission.name,
        description: permission.description,
        updatedAt: permission.updatedAt,
      })
      .where(eq(sqlitePermissionsTable.id, permission.id))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async archive(id: RootId): Promise<void> {
    const [permission] = await this._db
      .select({ deletedAt: sqlitePermissionsTable.deletedAt })
      .from(sqlitePermissionsTable)
      .where(eq(sqlitePermissionsTable.id, id.value))
    if (!permission) throw new NotFoundError('Permission not found!')

    const { rowsAffected } = await this._db
      .update(sqlitePermissionsTable)
      .set({
        updatedAt: getTemporalNow().toJSON(),
        deletedAt: !permission.deletedAt ? getTemporalNow().toJSON() : null,
      })
      .where(eq(sqlitePermissionsTable.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async remove(id: RootId): Promise<void> {
    const { rowsAffected } = await this._db
      .delete(sqlitePermissionsTable)
      .where(eq(sqlitePermissionsTable.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findAll(): Promise<Permission[]> {
    const permissions = await this._db.select().from(sqlitePermissionsTable)

    return !permissions.length
      ? []
      : Promise.all(
          permissions.map(
            async (permission) =>
              await PermissionMapper.mapToPermission(permission)
          )
        )
  }

  async findOne(id: RootId): Promise<Permission | null> {
    const [permission] = await this._db
      .select()
      .from(sqlitePermissionsTable)
      .where(eq(sqlitePermissionsTable.id, id.value))

    return !permission
      ? null
      : await PermissionMapper.mapToPermission(permission)
  }

  async ensureAlreadyExists(name: BaseName): Promise<boolean> {
    const [permission] = await this._db
      .select({ name: sqlitePermissionsTable.name })
      .from(sqlitePermissionsTable)
      .where(eq(sqlitePermissionsTable.name, name.value))

    return !permission ? false : true
  }
}
