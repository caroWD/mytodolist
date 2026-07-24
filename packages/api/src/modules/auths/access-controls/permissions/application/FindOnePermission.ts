import {
  NotFoundError,
  RootId,
  type IBaseRepository,
} from '../../../../primitives'
import type { Permission } from '../domain'

export class FindOnePermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string): Promise<Permission> {
    const permissionFinded = await this._permissionRepository.findOne(
      RootId.create(id)
    )
    if (!permissionFinded) throw new NotFoundError('Permission not found!')

    return permissionFinded
  }
}
