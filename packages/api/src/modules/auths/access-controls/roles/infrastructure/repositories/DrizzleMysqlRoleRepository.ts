import type { MySql2Database } from 'drizzle-orm/mysql2'
import {
  type RootId,
  type BaseName,
  NotFoundError,
} from '../../../../../primitives'
import { PermissionMapper, type Permission } from '../../../permissions'
import type { IRoleRepository, Role, RolePermission } from '../../domain'
import { RoleMapper, RolePermissionMapper } from '../services'
import {
  mysqlPermissionsTable,
  mysqlRolePermissionsTable,
  mysqlRolesTable,
} from '../../../../../../db'
import { and, eq } from 'drizzle-orm'
import { getTemporalNow } from '../../../../../../helpers'

export class DrizzleMysqlRoleRepository implements IRoleRepository {
  private readonly _db: MySql2Database

  constructor(db: MySql2Database) {
    this._db = db
  }

  async addPermissionToRole(rolePermission: RolePermission): Promise<void> {
    const rolePermissionMapped =
      await RolePermissionMapper.mapToRolePermissionInsert(rolePermission)

    const [result] = await this._db
      .insert(mysqlRolePermissionsTable)
      .values(rolePermissionMapped)

    if (!result.affectedRows)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async removePermissionToRole(rolePermission: RolePermission): Promise<void> {
    const rolePermissionMapped =
      await RolePermissionMapper.mapToRolePermissionInsert(rolePermission)

    const [result] = await this._db
      .delete(mysqlRolePermissionsTable)
      .where(
        and(
          eq(mysqlRolePermissionsTable.roleId, rolePermissionMapped.roleId),
          eq(
            mysqlRolePermissionsTable.permissionId,
            rolePermissionMapped.permissionId
          )
        )
      )

    if (!result.affectedRows)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findPermissionsToRole(roleId: RootId): Promise<Permission[]> {
    const permissions = (
      await this._db
        .select()
        .from(mysqlRolePermissionsTable)
        .where(eq(mysqlRolePermissionsTable.roleId, roleId.value))
        .innerJoin(
          mysqlPermissionsTable,
          eq(mysqlRolePermissionsTable.permissionId, mysqlPermissionsTable.id)
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
      .from(mysqlRolePermissionsTable)
      .where(
        and(
          eq(mysqlRolePermissionsTable.roleId, rolePermissionMapped.roleId),
          eq(
            mysqlRolePermissionsTable.permissionId,
            rolePermissionMapped.permissionId
          )
        )
      )

    return !exists ? false : true
  }

  async add(entity: Role): Promise<void> {
    const role = await RoleMapper.mapToRoleInsert(entity)

    const [result] = await this._db.insert(mysqlRolesTable).values(role)

    if (!result.affectedRows)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async edit(entity: Role): Promise<void> {
    const role = await RoleMapper.mapToRoleInsert(entity)

    const [result] = await this._db
      .update(mysqlRolesTable)
      .set({
        name: role.name,
        description: role.description,
        updatedAt: role.updatedAt,
      })
      .where(eq(mysqlRolesTable.id, role.id))

    if (!result.affectedRows)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async archive(id: RootId): Promise<void> {
    const [role] = await this._db
      .select({ deletedAt: mysqlRolesTable.deletedAt })
      .from(mysqlRolesTable)
      .where(eq(mysqlRolesTable.id, id.value))
    if (!role) throw new NotFoundError('Role not found!')

    const [result] = await this._db
      .update(mysqlRolesTable)
      .set({
        updatedAt: getTemporalNow().toJSON(),
        deletedAt: !role.deletedAt ? getTemporalNow().toJSON() : null,
      })
      .where(eq(mysqlRolesTable.id, id.value))

    if (!result.affectedRows)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async remove(id: RootId): Promise<void> {
    const [result] = await this._db
      .delete(mysqlRolesTable)
      .where(eq(mysqlRolesTable.id, id.value))

    if (!result.affectedRows)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findAll(): Promise<Role[]> {
    const roles = await this._db.select().from(mysqlRolesTable)

    return !roles.length
      ? []
      : await Promise.all(
          roles.map(async (role) => await RoleMapper.mapToRole(role))
        )
  }

  async findOne(id: RootId): Promise<Role | null> {
    const [role] = await this._db
      .select()
      .from(mysqlRolesTable)
      .where(eq(mysqlRolesTable.id, id.value))

    return !role ? null : await RoleMapper.mapToRole(role)
  }

  async ensureAlreadyExists(name: BaseName): Promise<boolean> {
    const [role] = await this._db
      .select({ name: mysqlRolesTable.name })
      .from(mysqlRolesTable)
      .where(eq(mysqlRolesTable.name, name.value))

    return !role ? false : true
  }
}
