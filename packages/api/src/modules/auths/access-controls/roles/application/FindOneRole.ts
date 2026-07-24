import { NotFoundError, RootId } from '../../../../primitives'
import type { IRoleRepository, Role } from '../domain'

export class FindOneRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string): Promise<Role> {
    const roleFinded = await this._roleRepository.findOne(RootId.create(id))
    if (!roleFinded) throw new NotFoundError('Role not found!')

    return roleFinded
  }
}
