import type { BaseRequest, IdRequest } from '../../../../../../types'
import {
  baseRequestSchema,
  idRequestSchema,
  type IBaseRepository,
} from '../../../../../primitives'
import {
  AddPermission,
  ArchivePermission,
  EditPermission,
  FindAllPermission,
  FindOnePermission,
  RemovePermission,
} from '../../application'
import type { Permission, PermissionDto } from '../../domain'
import { PermissionMapper } from './PermissionMapper'

export class PermissionShared {
  private readonly _add: AddPermission
  private readonly _edit: EditPermission
  private readonly _archive: ArchivePermission
  private readonly _remove: RemovePermission
  private readonly _findAll: FindAllPermission
  private readonly _findOne: FindOnePermission

  constructor(permissionRepository: IBaseRepository<Permission> | null) {
    if (!permissionRepository) throw new Error('Repository is null!')

    this._add = new AddPermission(permissionRepository)
    this._edit = new EditPermission(permissionRepository)
    this._archive = new ArchivePermission(permissionRepository)
    this._remove = new RemovePermission(permissionRepository)
    this._findAll = new FindAllPermission(permissionRepository)
    this._findOne = new FindOnePermission(permissionRepository)
  }

  async add(req: BaseRequest): Promise<void> {
    const { id, name, description } = await baseRequestSchema.parseAsync(req)

    return await this._add.handler(id, name, description)
  }

  async edit(req: BaseRequest): Promise<void> {
    const { id, name, description } = await baseRequestSchema.parseAsync(req)

    return await this._edit.handler(id, name, description)
  }

  async archive(req: IdRequest): Promise<void> {
    const { id } = await idRequestSchema.parseAsync(req)

    return await this._archive.handler(id)
  }

  async remove(req: IdRequest): Promise<void> {
    const { id } = await idRequestSchema.parseAsync(req)

    return await this._remove.handler(id)
  }

  async findAll(): Promise<PermissionDto[]> {
    const permissions = await this._findAll.handler()

    return !permissions.length
      ? []
      : Promise.all(
          permissions.map(
            async (permission) =>
              await PermissionMapper.mapToPermissionDto(permission)
          )
        )
  }

  async findOne(req: IdRequest): Promise<PermissionDto> {
    const { id } = await idRequestSchema.parseAsync(req)

    return await PermissionMapper.mapToPermissionDto(
      await this._findOne.handler(id)
    )
  }
}
