import {
  NotFoundError,
  RootId,
  type IBaseRepository,
} from '../../../../primitives'
import type { Permission } from '../domain'

export class ArchivePermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string): Promise<void> {
    const permissionToArchive = await this._permissionRepository.findOne(
      RootId.create(id)
    )
    if (!permissionToArchive) throw new NotFoundError('Permission not found!')

    return await this._permissionRepository.archive(permissionToArchive.id)
  }
}
