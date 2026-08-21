import { defineRelations, sql } from 'drizzle-orm'
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core'

const idColumn = {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
}

const lifecycleColumns = {
  createdAt: text('created_at', { mode: 'text', length: 24 })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at', { mode: 'text', length: 24 })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  deletedAt: text('deleted_at', { mode: 'text', length: 24 })
    .$type<string | null>()
    .$onUpdate(() => null),
}

export const sqliteUsersTable = sqliteTable('users', {
  ...idColumn,
  handle: text('handle', { mode: 'text', length: 50 }).notNull().unique(),
  firstName: text('first_name', { mode: 'text', length: 81 }).notNull(),
  lastName: text('last_name', { mode: 'text', length: 81 }).notNull(),
  email: text('email', { mode: 'text', length: 150 }).notNull().unique(),
  password: text('password', { mode: 'text', length: 60 }).notNull(),
  avatar: text('avatar', { mode: 'text', length: 255 })
    .$type<string | null>()
    .$onUpdate(() => null),
  role: text('role', { enum: ['admin', 'user'], mode: 'text', length: 5 })
    .notNull()
    .default('user'),
  ...lifecycleColumns,
})

export const sqliteBoardsTable = sqliteTable('boards', {
  ...idColumn,
  name: text('name', { mode: 'text', length: 100 }).notNull(),
  description: text('description', { mode: 'text', length: 255 }).notNull(),
  ...lifecycleColumns,
})

export const sqliteTasksTable = sqliteTable(
  'tasks',
  {
    ...idColumn,
    name: text('name', { mode: 'text', length: 150 }).notNull(),
    description: text('description', { mode: 'text', length: 355 }).notNull(),
    emoji: text('emoji', {
      enum: ['work', 'meet', 'coffee', 'gym', 'study', 'alarm'],
      mode: 'text',
      length: 6,
    })
      .notNull()
      .default('coffee'),
    status: text('status', {
      enum: ['to_do', 'in_progress', 'completed', "won't_do"],
      mode: 'text',
      length: 11,
    })
      .notNull()
      .default('to_do'),
    ...lifecycleColumns,
  },
  (table) => [index('task_status_idx').on(table.status)]
)

export const sqliteUserBoardsTable = sqliteTable(
  'user_boards',
  {
    userId: integer('user_id', { mode: 'number' })
      .notNull()
      .references(() => sqliteUsersTable.id, { onDelete: 'cascade' }),
    boardId: integer('board_id', { mode: 'number' })
      .notNull()
      .references(() => sqliteBoardsTable.id, { onDelete: 'cascade' }),
  },
  (table) => [
    primaryKey({
      name: 'pk_user_id_board_id',
      columns: [table.userId, table.boardId],
    }),
  ]
)

export const sqliteBoardTasksTable = sqliteTable(
  'board_tasks',
  {
    boardId: integer('board_id', { mode: 'number' })
      .notNull()
      .references(() => sqliteBoardsTable.id, { onDelete: 'cascade' }),
    taskId: integer('task_id', { mode: 'number' })
      .notNull()
      .references(() => sqliteTasksTable.id, { onDelete: 'cascade' }),
  },
  (table) => [
    primaryKey({
      name: 'pk_board_id_task_id',
      columns: [table.boardId, table.taskId],
    }),
  ]
)

export const sqliteRelations = defineRelations(
  {
    sqliteUsersTable,
    sqliteBoardsTable,
    sqliteUserBoardsTable,
    sqliteTasksTable,
    sqliteBoardTasksTable,
  },
  (r) => ({
    sqliteUsersTable: {
      boards: r.many.sqliteBoardsTable({
        from: r.sqliteUsersTable.id.through(r.sqliteUserBoardsTable.userId),
        to: r.sqliteBoardsTable.id.through(r.sqliteUserBoardsTable.boardId),
      }),
      userBoards: r.many.sqliteUserBoardsTable(),
    },
    sqliteUserBoardsTable: {
      user: r.one.sqliteUsersTable({
        from: r.sqliteUserBoardsTable.userId,
        to: r.sqliteUsersTable.id,
      }),
      board: r.one.sqliteBoardsTable({
        from: r.sqliteUserBoardsTable.boardId,
        to: r.sqliteBoardsTable.id,
      }),
    },
    sqliteBoardsTable: {
      users: r.many.sqliteUsersTable(),
      tasks: r.many.sqliteTasksTable({
        from: r.sqliteBoardsTable.id.through(r.sqliteBoardTasksTable.boardId),
        to: r.sqliteTasksTable.id.through(r.sqliteBoardTasksTable.taskId),
      }),
      userBoards: r.many.sqliteUserBoardsTable(),
      boardTasks: r.many.sqliteBoardTasksTable(),
    },
    sqliteBoardTasksTable: {
      board: r.one.sqliteBoardsTable({
        from: r.sqliteBoardTasksTable.boardId,
        to: r.sqliteBoardsTable.id,
      }),
      task: r.one.sqliteTasksTable({
        from: r.sqliteBoardTasksTable.taskId,
        to: r.sqliteTasksTable.id,
      }),
    },
    sqliteTasksTable: {
      boards: r.many.sqliteBoardsTable(),
      boardTasks: r.many.sqliteBoardTasksTable(),
    },
  })
)
