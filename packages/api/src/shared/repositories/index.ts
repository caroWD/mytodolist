import { DB_DIALECT } from '../../config'
import {
  mysqlPermissionRepository,
  sqlitePermissionRepository,
} from './dependencies'

export const permissionRepository =
  DB_DIALECT === 'sqlite'
    ? sqlitePermissionRepository
    : DB_DIALECT === 'mysql'
      ? mysqlPermissionRepository
      : null
