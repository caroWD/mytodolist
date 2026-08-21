import { defineRelations } from 'drizzle-orm'
import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

const idColumn = {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
}

const lifecycleColumns = {
  createdAt: timestamp('created_at', { mode: 'string', fsp: 6 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', fsp: 6 })
    .notNull()
    .defaultNow()
    .onUpdateNow(),
  deletedAt: timestamp('deleted_at', { mode: 'string', fsp: 6 })
    .$type<string | null>()
    .$onUpdate(() => null),
}

export const mysqlUsersTable = mysqlTable('users', {
  ...idColumn,
  handle: varchar('handle', { length: 50 }).notNull().unique(),
  firstName: varchar('first_name', { length: 81 }).notNull(),
  lastName: varchar('last_name', { length: 81 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  password: varchar('password', { length: 60 }).notNull(),
  avatar: varchar('avatar', { length: 255 })
    .$type<string | null>()
    .$onUpdate(() => null),
  role: mysqlEnum('role', ['admin', 'user']).notNull().default('user'),
  ...lifecycleColumns,
})

export const mysqlBoardsTable = mysqlTable('boards', {
  ...idColumn,
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  ...lifecycleColumns,
})

export const mysqlTasksTable = mysqlTable(
  'tasks',
  {
    ...idColumn,
    name: varchar('name', { length: 150 }).notNull(),
    description: varchar('description', { length: 355 }).notNull(),
    emoji: mysqlEnum('emoji', [
      'work',
      'meet',
      'coffee',
      'gym',
      'study',
      'alarm',
    ]).default('coffee'),
    status: mysqlEnum('status', [
      'to_do',
      'in_progress',
      'completed',
      "won't_do",
    ]).default('to_do'),
    ...lifecycleColumns,
  },
  (table) => [index('task_status_idx').on(table.status)]
)

export const mysqlUserBoardsTable = mysqlTable(
  'user_boards',
  {
    userId: int('user_id', { unsigned: true })
      .notNull()
      .references(() => mysqlUsersTable.id, { onDelete: 'cascade' }),
    boardId: int('board_id', { unsigned: true })
      .notNull()
      .references(() => mysqlBoardsTable.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.userId, table.boardId] })]
)

export const mysqlBoardTasksTable = mysqlTable(
  'board_tasks',
  {
    boardId: int('board_id', { unsigned: true })
      .notNull()
      .references(() => mysqlBoardsTable.id, { onDelete: 'cascade' }),
    taskId: int('task_id', { unsigned: true })
      .notNull()
      .references(() => mysqlTasksTable.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.boardId, table.taskId] })]
)

export const mysqlRelations = defineRelations(
  {
    mysqlUsersTable,
    mysqlBoardsTable,
    mysqlUserBoardsTable,
    mysqlTasksTable,
    mysqlBoardTasksTable,
  },
  (r) => ({
    mysqlUsersTable: {
      boards: r.many.mysqlBoardsTable({
        from: r.mysqlUsersTable.id.through(r.mysqlUserBoardsTable.userId),
        to: r.mysqlBoardsTable.id.through(r.mysqlUserBoardsTable.boardId),
      }),
      userBoards: r.many.mysqlUserBoardsTable(),
    },
    mysqlUserBoardsTable: {
      user: r.one.mysqlUsersTable({
        from: r.mysqlUserBoardsTable.userId,
        to: r.mysqlUsersTable.id,
      }),
      board: r.one.mysqlBoardsTable({
        from: r.mysqlUserBoardsTable.boardId,
        to: r.mysqlBoardsTable.id,
      }),
    },
    mysqlBoardsTable: {
      users: r.many.mysqlUsersTable(),
      tasks: r.many.mysqlTasksTable({
        from: r.mysqlBoardsTable.id.through(r.mysqlBoardTasksTable.boardId),
        to: r.mysqlTasksTable.id.through(r.mysqlBoardTasksTable.taskId),
      }),
      userBoards: r.many.mysqlUserBoardsTable(),
      boardTasks: r.many.mysqlBoardTasksTable(),
    },
    mysqlBoardTasksTable: {
      board: r.one.mysqlBoardsTable({
        from: r.mysqlBoardTasksTable.boardId,
        to: r.mysqlBoardsTable.id,
      }),
      task: r.one.mysqlTasksTable({
        from: r.mysqlBoardTasksTable.taskId,
        to: r.mysqlTasksTable.id,
      }),
    },
    mysqlTasksTable: {
      boards: r.many.mysqlBoardsTable(),
      boardTasks: r.many.mysqlBoardTasksTable(),
    },
  })
)
