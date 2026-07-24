import type {
  BaseRequest,
  IdRequest,
  RolePermissionRequest,
} from '../../../../../../types'
import {
  baseRequestSchema,
  idRequestSchema,
  type IBaseRepository,
} from '../../../../../primitives'
import {
  PermissionMapper,
  type Permission,
  type PermissionDto,
} from '../../../permissions'
import {
  AddPermissionToRole,
  AddRole,
  ArchiveRole,
  EditRole,
  FindAllRole,
  FindOneRole,
  FindPermissionsToRole,
  RemovePermissionToRole,
  RemoveRole,
} from '../../application'
import type { IRoleRepository, RoleDto } from '../../domain'
import { rolePermissionRequestSchema } from './role-permission-schema'
import { RoleMapper } from './RoleMapper'

export class RoleShared {
  private readonly _addPermission: AddPermissionToRole
  private readonly _add: AddRole
  private readonly _archive: ArchiveRole
  private readonly _edit: EditRole
  private readonly _findAll: FindAllRole
  private readonly _findOne: FindOneRole
  private readonly _findPermissions: FindPermissionsToRole
  private readonly _removePermission: RemovePermissionToRole
  private readonly _remove: RemoveRole

  constructor(
    roleRepository: IRoleRepository | null,
    permissionRepository: IBaseRepository<Permission> | null
  ) {
    if (!roleRepository) throw new Error('Role repository is null!')
    if (!permissionRepository) throw new Error('Permission repository is null!')

    this._addPermission = new AddPermissionToRole(
      roleRepository,
      permissionRepository
    )
    this._add = new AddRole(roleRepository)
    this._archive = new ArchiveRole(roleRepository)
    this._edit = new EditRole(roleRepository)
    this._findAll = new FindAllRole(roleRepository)
    this._findOne = new FindOneRole(roleRepository)
    this._findPermissions = new FindPermissionsToRole(roleRepository)
    this._removePermission = new RemovePermissionToRole(
      roleRepository,
      permissionRepository
    )
    this._remove = new RemoveRole(roleRepository)
  }

  async addPermission(req: RolePermissionRequest): Promise<void> {
    const { roleId, permissionId } =
      await rolePermissionRequestSchema.parseAsync(req)

    return await this._addPermission.handler(roleId, permissionId)
  }

  async add(req: BaseRequest): Promise<void> {
    const { id, name, description } = await baseRequestSchema.parseAsync(req)

    return await this._add.handler(id, name, description)
  }

  async archive(req: IdRequest): Promise<void> {
    const { id } = await idRequestSchema.parseAsync(req)

    return await this._archive.handler(id)
  }

  async edit(req: BaseRequest): Promise<void> {
    const { id, name, description } = await baseRequestSchema.parseAsync(req)

    return await this._edit.handler(id, name, description)
  }

  async findAll(): Promise<RoleDto[]> {
    const roles = await this._findAll.handler()

    return !roles.length
      ? []
      : Promise.all(
          roles.map(async (role) => await RoleMapper.mapToRoleDto(role))
        )
  }

  async findOne(req: IdRequest): Promise<RoleDto> {
    const { id } = await idRequestSchema.parseAsync(req)

    return await RoleMapper.mapToRoleDto(await this._findOne.handler(id))
  }

  async findPermissions(req: IdRequest): Promise<PermissionDto[]> {
    const { id } = await idRequestSchema.parseAsync(req)

    const permissions = await this._findPermissions.handler(id)

    return !permissions.length
      ? []
      : Promise.all(
          permissions.map(
            async (permission) =>
              await PermissionMapper.mapToPermissionDto(permission)
          )
        )
  }

  async removePermission(req: RolePermissionRequest): Promise<void> {
    const { roleId, permissionId } =
      await rolePermissionRequestSchema.parseAsync(req)

    return await this._removePermission.handler(roleId, permissionId)
  }

  async remove(req: IdRequest): Promise<void> {
    const { id } = await idRequestSchema.parseAsync(req)

    return await this._remove.handler(id)
  }
}
