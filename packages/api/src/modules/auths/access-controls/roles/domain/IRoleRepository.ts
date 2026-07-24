import type { IBaseRepository, RootId } from '../../../../primitives'
import type { Permission } from '../../permissions'
import type { Role, RolePermission } from './models'

export interface IRoleRepository extends IBaseRepository<Role> {
  addPermissionToRole(rolePermission: RolePermission): Promise<void>

  removePermissionToRole(rolePermission: RolePermission): Promise<void>

  findPermissionsToRole(roleId: RootId): Promise<Permission[]>

  ensurePermissionAlreadyExists(
    rolePermission: RolePermission
  ): Promise<boolean>
}
