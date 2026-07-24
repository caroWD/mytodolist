import {
  NotFoundError,
  RootId,
  type IBaseRepository,
} from '../../../../primitives'
import type { Permission } from '../domain'

export class RemovePermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string): Promise<void> {
    const permissionToRemove = await this._permissionRepository.findOne(
      RootId.create(id)
    )
    if (!permissionToRemove) throw new NotFoundError('Permission not found!')

    return await this._permissionRepository.remove(permissionToRemove.id)
  }
}
