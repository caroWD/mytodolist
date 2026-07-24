import { PermissionShared, RoleShared } from '../modules'
import { permissionRepository, roleRepository } from './repositories'

export const serviceContainer = {
  auth: {
    accessControl: {
      permission: new PermissionShared(permissionRepository),
      role: new RoleShared(roleRepository, permissionRepository),
    },
  },
}
