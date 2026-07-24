import { getTemporalFrom } from '../../../../../../helpers'
import type { BaseInsert, BaseSelect } from '../../../../../../types'
import {
  BaseDescription,
  BaseName,
  RootId,
  TempoCreatedAt,
  TempoDeletedAt,
  TempoUpdatedAt,
} from '../../../../../primitives'
import { Role, RoleDto } from '../../domain'

export class RoleMapper {
  public static async mapToRole(role: BaseSelect): Promise<Role> {
    return new Role(
      RootId.create(role.id),
      BaseName.create(role.name),
      BaseDescription.create(role.description),
      TempoCreatedAt.create(getTemporalFrom(role.createdAt)),
      TempoUpdatedAt.create(getTemporalFrom(role.updatedAt)),
      TempoDeletedAt.create(
        !role.deletedAt ? null : getTemporalFrom(role.deletedAt)
      )
    )
  }

  public static async mapToRoleInsert(role: Role): Promise<BaseInsert> {
    return {
      id: role.id.value,
      name: role.name.value,
      description: role.description.value,
      createdAt: role.createdAt.value.toJSON(),
      updatedAt: role.updatedAt.value.toJSON(),
      deletedAt: role.deletedAt.value?.toJSON() || null,
    }
  }

  public static async mapToRoleDto(role: Role): Promise<RoleDto> {
    return new RoleDto(
      role.id.value,
      role.name.value,
      role.description.value,
      role.createdAt.value.toJSON(),
      role.updatedAt.value.toJSON(),
      role.deletedAt.value?.toJSON() || null
    )
  }
}
