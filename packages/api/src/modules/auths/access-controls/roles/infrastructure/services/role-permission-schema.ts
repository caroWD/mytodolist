import { object, uuidv7 } from 'zod'

export const rolePermissionRequestSchema = object({
  roleId: uuidv7({ error: 'The Id must be in UUIDv7 format.' }),
  permissionId: uuidv7({ error: 'The Id must be in UUIDv7 format.' }),
})
