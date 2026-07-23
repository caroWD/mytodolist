import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { getTemporalNow } from '../../helpers'

export const sqlitePermissionsTable = sqliteTable('permissions', {
  id: text('id', { mode: 'text', length: 36 }).primaryKey(),
  name: text('name', { mode: 'text', length: 50 }).notNull().unique(),
  description: text('description', { mode: 'text', length: 255 }).notNull(),
  createdAt: text('created_at', { mode: 'text', length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at', { mode: 'text', length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  deletedAt: text('deleted_at', { mode: 'text', length: 27 })
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const sqliteRolesTable = sqliteTable('roles', {
  id: text('id', { mode: 'text', length: 36 }).primaryKey(),
  name: text('name', { mode: 'text', length: 50 }).notNull().unique(),
  description: text('description', { mode: 'text', length: 255 }).notNull(),
  createdAt: text('created_at', { mode: 'text', length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at', { mode: 'text', length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  deletedAt: text('deleted_at', { mode: 'text', length: 27 })
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const sqliteRolePermissionsTable = sqliteTable(
  'role_permissions',
  {
    roleId: text('role_id', { mode: 'text', length: 36 })
      .notNull()
      .references(() => sqliteRolesTable.id),
    permissionId: text('permission_id', { mode: 'text', length: 36 })
      .notNull()
      .references(() => sqlitePermissionsTable.id),
  },
  (table) => [
    primaryKey({
      name: 'pk_role_permissions_idx',
      columns: [table.roleId, table.permissionId],
    }),
  ]
)

export const sqliteTasksTable = sqliteTable('tasks', {
  id: text('id', { mode: 'text', length: 36 }).primaryKey(),
  name: text('name', { mode: 'text', length: 50 }).notNull().unique(),
  description: text('description', { mode: 'text', length: 255 }).notNull(),
  icon: text('icon', {
    mode: 'text',
    enum: ['work', 'talk', 'coffee', 'gym', 'study', 'alarm', 'undefined'],
    length: 9,
  }).default('undefined'),
  status: text('status', {
    mode: 'text',
    enum: ['pending', 'in progress', 'completed', "won't do"],
    length: 11,
  }).default('pending'),
  createdAt: text('created_at', { mode: 'text', length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at', { mode: 'text', length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  deletedAt: text('deleted_at', { mode: 'text', length: 27 })
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const sqliteUsersTable = sqliteTable('users', {
  id: text('id', { mode: 'text', length: 36 }).primaryKey(),
  handle: text('handle', { mode: 'text', length: 30 }).notNull().unique(),
  firstName: text('first_name', { mode: 'text', length: 80 }).notNull(),
  lastName: text('last_name', { mode: 'text', length: 80 }).notNull(),
  email: text('email', { mode: 'text', length: 150 }).notNull().unique(),
  password: text('password', { mode: 'text', length: 60 }).notNull(),
  avatar: text('avatar', { mode: 'text', length: 255 })
    .$type<string | null>()
    .$onUpdate(() => null),
  roleId: text('role_id', { mode: 'text', length: 36 })
    .notNull()
    .references(() => sqliteRolesTable.id),
  createdAt: text('created_at', { mode: 'text', length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at', { mode: 'text', length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  deletedAt: text('deleted_at', { mode: 'text', length: 27 })
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const sqliteBoardsTable = sqliteTable('boards', {
  id: text('id', { mode: 'text', length: 36 }).primaryKey(),
  name: text('name', { mode: 'text', length: 50 }).notNull().unique(),
  description: text('description', { mode: 'text', length: 255 }).notNull(),
  userId: text('user_id', { mode: 'text', length: 36 })
    .notNull()
    .references(() => sqliteUsersTable.id),
  createdAt: text('created_at', { mode: 'text', length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at', { mode: 'text', length: 27 })
    .notNull()
    .default(getTemporalNow().toJSON()),
  deletedAt: text('deleted_at', { mode: 'text', length: 27 })
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const sqliteBoardTasksTable = sqliteTable(
  'board_tasks',
  {
    boardId: text('board_id', { mode: 'text', length: 36 })
      .notNull()
      .references(() => sqliteBoardsTable.id),
    taskId: text('task_id', { mode: 'text', length: 36 })
      .notNull()
      .references(() => sqliteTasksTable.id),
  },
  (table) => [
    primaryKey({
      name: 'pk_board_tasks_idx',
      columns: [table.boardId, table.boardId],
    }),
  ]
)
