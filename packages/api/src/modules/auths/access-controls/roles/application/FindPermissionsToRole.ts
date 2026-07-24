import { NotFoundError, RootId } from '../../../../primitives'
import type { Permission } from '../../permissions'
import type { IRoleRepository } from '../domain'

export class FindPermissionsToRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(roleId: string): Promise<Permission[]> {
    const role = await this._roleRepository.findOne(RootId.create(roleId))
    if (!role) throw new NotFoundError('Role not found!')

    const permissions = await this._roleRepository.findPermissionsToRole(
      role.id
    )

    return !permissions.length ? [] : permissions
  }
}
