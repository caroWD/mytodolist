import { getTemporalNow } from '../../../../../helpers'
import {
  AlreadyExistsError,
  BaseDescription,
  BaseName,
  RootId,
  TempoCreatedAt,
  TempoDeletedAt,
  TempoUpdatedAt,
} from '../../../../primitives'
import { Role, type IRoleRepository } from '../domain'

export class AddRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const roleName = BaseName.create(name)

    const roleNameExists =
      await this._roleRepository.ensureAlreadyExists(roleName)
    if (roleNameExists)
      throw new AlreadyExistsError('Role name already exists!')

    return await this._roleRepository.add(
      new Role(
        RootId.create(id),
        roleName,
        BaseDescription.create(description),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoDeletedAt.create(null)
      )
    )
  }
}
