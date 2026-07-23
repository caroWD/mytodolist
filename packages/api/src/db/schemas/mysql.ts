import {
  mysqlEnum,
  mysqlTable,
  primaryKey,
  varchar,
} from 'drizzle-orm/mysql-core'
import { getTemporalNow } from '../../helpers'

export const mysqlPermissionsTable = mysqlTable('permissions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: varchar('description', { length: 255 }).notNull(),
  createdAt: varchar('created_at', { length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  updatedAt: varchar('updated_at', { length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  deletedAt: varchar('deleted_at', { length: 27 })
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const mysqlRolesTable = mysqlTable('roles', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: varchar('description', { length: 255 }).notNull(),
  createdAt: varchar('created_at', { length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  updatedAt: varchar('updated_at', { length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  deletedAt: varchar('deleted_at', { length: 27 })
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const mysqlRolePermissionsTable = mysqlTable(
  'role_permissions',
  {
    roleId: varchar('role_id', { length: 36 })
      .notNull()
      .references(() => mysqlRolesTable.id),
    permissionId: varchar('permission_id', { length: 36 })
      .notNull()
      .references(() => mysqlPermissionsTable.id),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })]
)

export const mysqlTasksTable = mysqlTable('tasks', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: varchar('description', { length: 255 }).notNull(),
  icon: mysqlEnum('icon', [
    'work',
    'talk',
    'coffee',
    'gym',
    'study',
    'alarm',
    'undefined',
  ]).default('undefined'),
  status: mysqlEnum('status', [
    'pending',
    'in progress',
    'completed',
    "won't do",
  ]).default('pending'),
  createdAt: varchar('created_at', { length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  updatedAt: varchar('updated_at', { length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  deletedAt: varchar('deleted_at', { length: 27 })
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const mysqlUsersTable = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  handle: varchar('handle', { length: 30 }).notNull().unique(),
  firstName: varchar('first_name', { length: 80 }).notNull(),
  lastName: varchar('last_name', { length: 80 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  password: varchar('password', { length: 60 }).notNull(),
  avatar: varchar('avatar', { length: 255 })
    .$type<string | null>()
    .$onUpdate(() => null),
  roleId: varchar('role_id', { length: 36 })
    .notNull()
    .references(() => mysqlRolesTable.id),
  createdAt: varchar('created_at', { length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  updatedAt: varchar('updated_at', { length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  deletedAt: varchar('deleted_at', { length: 27 })
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const mysqlBoardsTable = mysqlTable('boards', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: varchar('description', { length: 255 }).notNull(),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => mysqlUsersTable.id),
  createdAt: varchar('created_at', { length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  updatedAt: varchar('updated_at', { length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  deletedAt: varchar('deleted_at', { length: 27 })
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const mysqlBoardTasksTable = mysqlTable(
  'board_tasks',
  {
    boardId: varchar('board_id', { length: 36 })
      .notNull()
      .references(() => mysqlBoardsTable.id),
    taskId: varchar('task_id', { length: 36 })
      .notNull()
      .references(() => mysqlTasksTable.id),
  },
  (table) => [primaryKey({ columns: [table.boardId, table.taskId] })]
)
