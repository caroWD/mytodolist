import { getTemporalNow } from '../../../../../helpers'
import {
  AlreadyExistsError,
  BaseDescription,
  BaseName,
  NotFoundError,
  RootId,
  TempoUpdatedAt,
} from '../../../../primitives'
import { Role, type IRoleRepository } from '../domain'

export class EditRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const roleToEdit = await this._roleRepository.findOne(RootId.create(id))
    if (!roleToEdit) throw new NotFoundError('Role not found!')

    const roleName = BaseName.create(name)

    if (roleName.value !== roleToEdit.name.value) {
      const roleNameExists =
        await this._roleRepository.ensureAlreadyExists(roleName)
      if (roleNameExists)
        throw new AlreadyExistsError('Role name already exists!')
    }

    return await this._roleRepository.edit(
      new Role(
        roleToEdit.id,
        roleName,
        BaseDescription.create(description),
        roleToEdit.createdAt,
        TempoUpdatedAt.create(getTemporalNow()),
        roleToEdit.deletedAt
      )
    )
  }
}
