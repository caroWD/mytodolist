import type { RootId } from '../../../../../primitives'

export class RolePermission {
  private _roleId: RootId
  private _permissionId: RootId

  constructor(roleId: RootId, permissionId: RootId) {
    this._roleId = roleId
    this._permissionId = permissionId
  }

  get roleId(): RootId {
    return this._roleId
  }

  get permissionId(): RootId {
    return this._permissionId
  }
}
