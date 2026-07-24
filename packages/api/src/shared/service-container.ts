import { PermissionShared } from '../modules'
import { permissionRepository } from './repositories'

export const serviceContainer = {
  auth: {
    accessControl: {
      permission: new PermissionShared(permissionRepository),
    },
  },
}
