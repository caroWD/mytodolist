import type { RolePermission } from '../../domain'

export class RolePermissionMapper {
  public static async mapToRolePermissionInsert(
    rolePermission: RolePermission
  ): Promise<{ roleId: string; permissionId: string }> {
    return {
      roleId: rolePermission.roleId.value,
      permissionId: rolePermission.permissionId.value,
    }
  }
}
