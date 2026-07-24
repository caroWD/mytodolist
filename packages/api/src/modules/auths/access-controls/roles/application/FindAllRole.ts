import type { IRoleRepository, Role } from '../domain'

export class FindAllRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(): Promise<Role[]> {
    const roles = await this._roleRepository.findAll()

    return !roles.length ? [] : roles
  }
}
