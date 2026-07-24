import type { MySql2Database } from 'drizzle-orm/mysql2'
import {
  NotFoundError,
  type BaseName,
  type IBaseRepository,
  type RootId,
} from '../../../../../primitives'
import type { Permission } from '../../domain'
import { PermissionMapper } from '../services'
import { mysqlPermissionsTable } from '../../../../../../db'
import { eq } from 'drizzle-orm'
import { getTemporalNow } from '../../../../../../helpers'

export class DrizzleMysqlPermissionRepository implements IBaseRepository<Permission> {
  private readonly _db: MySql2Database

  constructor(db: MySql2Database) {
    this._db = db
  }

  async add(entity: Permission): Promise<void> {
    const permission = await PermissionMapper.mapToPermissionInsert(entity)

    const [result] = await this._db
      .insert(mysqlPermissionsTable)
      .values(permission)

    if (!result.affectedRows)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async edit(entity: Permission): Promise<void> {
    const permission = await PermissionMapper.mapToPermissionInsert(entity)

    const [result] = await this._db
      .update(mysqlPermissionsTable)
      .set({
        name: permission.name,
        description: permission.description,
        updatedAt: permission.updatedAt,
      })
      .where(eq(mysqlPermissionsTable.id, permission.id))

    if (!result.affectedRows)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async archive(id: RootId): Promise<void> {
    const [permission] = await this._db
      .select({ deletedAt: mysqlPermissionsTable.deletedAt })
      .from(mysqlPermissionsTable)
      .where(eq(mysqlPermissionsTable.id, id.value))
    if (!permission) throw new NotFoundError('Permission not found!')

    const [result] = await this._db
      .update(mysqlPermissionsTable)
      .set({
        updatedAt: getTemporalNow().toJSON(),
        deletedAt: !permission.deletedAt ? getTemporalNow().toJSON() : null,
      })
      .where(eq(mysqlPermissionsTable.id, id.value))

    if (!result.affectedRows)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async remove(id: RootId): Promise<void> {
    const [result] = await this._db
      .delete(mysqlPermissionsTable)
      .where(eq(mysqlPermissionsTable.id, id.value))

    if (!result.affectedRows)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findAll(): Promise<Permission[]> {
    const permissions = await this._db.select().from(mysqlPermissionsTable)

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
      .from(mysqlPermissionsTable)
      .where(eq(mysqlPermissionsTable.id, id.value))

    return !permission
      ? null
      : await PermissionMapper.mapToPermission(permission)
  }

  async ensureAlreadyExists(name: BaseName): Promise<boolean> {
    const [permission] = await this._db
      .select()
      .from(mysqlPermissionsTable)
      .where(eq(mysqlPermissionsTable.name, name.value))

    return !permission ? false : true
  }
}
