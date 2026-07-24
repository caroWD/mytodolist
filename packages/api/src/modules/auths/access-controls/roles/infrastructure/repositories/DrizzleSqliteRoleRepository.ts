import {
  type RootId,
  type BaseName,
  NotFoundError,
} from '../../../../../primitives'
import { PermissionMapper, type Permission } from '../../../permissions'
import type { IRoleRepository, Role, RolePermission } from '../../domain'
import { RoleMapper, RolePermissionMapper } from '../services'
import {
  sqlitePermissionsTable,
  sqliteRolePermissionsTable,
  sqliteRolesTable,
} from '../../../../../../db'
import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import { and, eq } from 'drizzle-orm'
import { getTemporalNow } from '../../../../../../helpers'

export class DrizzleSqliteRoleRepository implements IRoleRepository {
  private readonly _db: LibSQLDatabase

  constructor(db: LibSQLDatabase) {
    this._db = db
  }

  async addPermissionToRole(rolePermission: RolePermission): Promise<void> {
    const rolePermissionMapped =
      await RolePermissionMapper.mapToRolePermissionInsert(rolePermission)

    const { rowsAffected } = await this._db
      .insert(sqliteRolePermissionsTable)
      .values(rolePermissionMapped)

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async removePermissionToRole(rolePermission: RolePermission): Promise<void> {
    const rolePermissionMapped =
      await RolePermissionMapper.mapToRolePermissionInsert(rolePermission)

    const { rowsAffected } = await this._db
      .delete(sqliteRolePermissionsTable)
      .where(
        and(
          eq(sqliteRolePermissionsTable.roleId, rolePermissionMapped.roleId),
          eq(
            sqliteRolePermissionsTable.permissionId,
            rolePermissionMapped.permissionId
          )
        )
      )

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findPermissionsToRole(roleId: RootId): Promise<Permission[]> {
    const permissions = (
      await this._db
        .select()
        .from(sqliteRolePermissionsTable)
        .where(eq(sqliteRolePermissionsTable.roleId, roleId.value))
        .innerJoin(
          sqlitePermissionsTable,
          eq(sqliteRolePermissionsTable.permissionId, sqlitePermissionsTable.id)
        )
    ).map((result) => result.permissions)

    return !permissions.length
      ? []
      : await Promise.all(
          permissions.map(
            async (permission) =>
              await PermissionMapper.mapToPermission(permission)
          )
        )
  }

  async ensurePermissionAlreadyExists(
    rolePermission: RolePermission
  ): Promise<boolean> {
    const rolePermissionMapped =
      await RolePermissionMapper.mapToRolePermissionInsert(rolePermission)

    const [exists] = await this._db
      .select()
      .from(sqliteRolePermissionsTable)
      .where(
        and(
          eq(sqliteRolePermissionsTable.roleId, rolePermissionMapped.roleId),
          eq(
            sqliteRolePermissionsTable.permissionId,
            rolePermissionMapped.permissionId
          )
        )
      )

    return !exists ? false : true
  }

  async add(entity: Role): Promise<void> {
    const role = await RoleMapper.mapToRoleInsert(entity)

    const { rowsAffected } = await this._db
      .insert(sqliteRolesTable)
      .values(role)

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async edit(entity: Role): Promise<void> {
    const role = await RoleMapper.mapToRoleInsert(entity)

    const { rowsAffected } = await this._db
      .update(sqliteRolesTable)
      .set({
        name: role.name,
        description: role.description,
        updatedAt: role.updatedAt,
      })
      .where(eq(sqliteRolesTable.id, role.id))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async archive(id: RootId): Promise<void> {
    const [role] = await this._db
      .select({ deletedAt: sqliteRolesTable.deletedAt })
      .from(sqliteRolesTable)
      .where(eq(sqliteRolesTable.id, id.value))
    if (!role) throw new NotFoundError('Role not found!')

    const { rowsAffected } = await this._db
      .update(sqliteRolesTable)
      .set({
        updatedAt: getTemporalNow().toJSON(),
        deletedAt: !role.deletedAt ? getTemporalNow().toJSON() : null,
      })
      .where(eq(sqliteRolesTable.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async remove(id: RootId): Promise<void> {
    const { rowsAffected } = await this._db
      .delete(sqliteRolesTable)
      .where(eq(sqliteRolesTable.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findAll(): Promise<Role[]> {
    const roles = await this._db.select().from(sqliteRolesTable)

    return !roles.length
      ? []
      : await Promise.all(
          roles.map(async (role) => await RoleMapper.mapToRole(role))
        )
  }

  async findOne(id: RootId): Promise<Role | null> {
    const [role] = await this._db
      .select()
      .from(sqliteRolesTable)
      .where(eq(sqliteRolesTable.id, id.value))

    return !role ? null : await RoleMapper.mapToRole(role)
  }

  async ensureAlreadyExists(name: BaseName): Promise<boolean> {
    const [role] = await this._db
      .select({ name: sqliteRolesTable.name })
      .from(sqliteRolesTable)
      .where(eq(sqliteRolesTable.name, name.value))

    return !role ? false : true
  }
}
