import {
  NotFoundError,
  RootId,
  type IBaseRepository,
} from '../../../../primitives'
import type { Permission } from '../../permissions'
import { RolePermission, type IRoleRepository } from '../domain'

export class RemovePermissionToRole {
  private readonly _roleRepository: IRoleRepository
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(
    roleRepository: IRoleRepository,
    permissionRepository: IBaseRepository<Permission>
  ) {
    this._roleRepository = roleRepository
    this._permissionRepository = permissionRepository
  }

  async handler(roleId: string, permissionId: string): Promise<void> {
    const role = await this._roleRepository.findOne(RootId.create(roleId))
    if (!role) throw new NotFoundError('Role not found!')

    const permission = await this._permissionRepository.findOne(
      RootId.create(permissionId)
    )
    if (!permission) throw new NotFoundError('Permission not found!')

    const rolePermission = new RolePermission(role.id, permission.id)

    const permissionExistsInRole =
      await this._roleRepository.ensurePermissionAlreadyExists(rolePermission)
    if (!permissionExistsInRole)
      throw new NotFoundError('Permission not found in the Role!')

    return await this._roleRepository.removePermissionToRole(rolePermission)
  }
}
