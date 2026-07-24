import { NotFoundError, RootId } from '../../../../primitives'
import type { IRoleRepository } from '../domain'

export class ArchiveRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string): Promise<void> {
    const roleToArchive = await this._roleRepository.findOne(RootId.create(id))
    if (!roleToArchive) throw new NotFoundError('Role not found!')

    return await this._roleRepository.archive(roleToArchive.id)
  }
}
