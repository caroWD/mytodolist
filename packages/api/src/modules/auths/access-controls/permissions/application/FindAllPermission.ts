import type { IBaseRepository } from '../../../../primitives'
import type { Permission } from '../domain'

export class FindAllPermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(): Promise<Permission[]> {
    const permissions = await this._permissionRepository.findAll()

    return !permissions.length ? [] : permissions
  }
}
