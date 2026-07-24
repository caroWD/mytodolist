import { DB_DIALECT } from '../../config'
import {
  mysqlPermissionRepository,
  mysqlRoleRepository,
  sqlitePermissionRepository,
  sqliteRoleRepository,
} from './dependencies'

export const permissionRepository =
  DB_DIALECT === 'sqlite'
    ? sqlitePermissionRepository
    : DB_DIALECT === 'mysql'
      ? mysqlPermissionRepository
      : null

export const roleRepository =
  DB_DIALECT === 'sqlite'
    ? sqliteRoleRepository
    : DB_DIALECT === 'mysql'
      ? mysqlRoleRepository
      : null
