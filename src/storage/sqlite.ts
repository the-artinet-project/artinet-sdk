/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from '~/types/index.js';
import { Tasks } from '~/services/a2a/managers.js';
import { eq, like, or /*Table, TableConfig*/ } from 'drizzle-orm';
import { BaseSQLiteDatabase, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { logger } from '~/config/index.js';

export const TABLE_NAME = 'artinet_tasks';
const CREATE_TASKS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}\
 (id TEXT PRIMARY KEY, contextId TEXT NOT NULL,\
  kind TEXT NOT NULL, status TEXT NOT NULL,\
  history TEXT NOT NULL,\
  artifacts TEXT NOT NULL,\
  metadata TEXT NOT NULL)`;

export const createTaskTable = async (db: BaseSQLiteDatabase<`sync` | `async`, any, TaskTable>): Promise<void> => {
    await db.run(CREATE_TASKS_TABLE_SQL);
};

/*export type TTable = Table<TableConfig>; //TODO: Unwind Config/Column types */

export const TaskTable = sqliteTable(TABLE_NAME, {
    id: text().primaryKey(),
    contextId: text().notNull(),
    kind: text('kind').$type<(typeof A2A.KindSchema.enum)['task']>().notNull(),
    status: text('status', { mode: 'json' }).$type<A2A.TaskStatus>().notNull(),
    history: text('history', { mode: 'json' }).$type<A2A.Message[]>().notNull().default([]),
    artifacts: text('artifacts', { mode: 'json' }).$type<A2A.Artifact[]>().notNull().default([]),
    metadata: text('metadata', { mode: 'json' }).$type<Record<string, unknown>>().notNull().default({}),
});

export type TaskTable = typeof TaskTable.$inferSelect;

export class SQLiteStore extends Tasks {
    constructor(
        private db: BaseSQLiteDatabase<`sync` | `async`, any, TaskTable>,
        tasks: Map<string, A2A.Task> = new Map(),
    ) {
        super(tasks);
        createTaskTable(db);
    }

    async get(id: string): Promise<A2A.Task | undefined> {
        let task = await super.get(id);
        if (task) {
            return task;
        }
        task = await this.db.select().from(TaskTable).where(eq(TaskTable.id, id)).get();
        if (task) {
            await super.set(id, task);
        }
        return task;
    }

    async set(id: string, data?: A2A.Task): Promise<void> {
        if (!data) {
            return;
        }

        if (id !== data.id) {
            logger.warn('SQLiteStore', `Task ID mismatch: ${id} !== ${data.id}`);
            throw new Error('Task ID mismatch');
        }

        await this.db
            .insert(TaskTable)
            .values({ ...data, id })
            .onConflictDoUpdate({
                target: [TaskTable.id],
                set: { ...data },
            })
            .execute();
        await super.set(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(TaskTable).where(eq(TaskTable.id, id)).execute();
        await super.delete(id);
    }

    async search(query: string): Promise<A2A.Task[]> {
        const trimmedQuery = query.trim();
        return await this.db
            .select()
            .from(TaskTable)
            .where(
                or(
                    eq(TaskTable.id, trimmedQuery),
                    eq(TaskTable.contextId, trimmedQuery),
                    like(TaskTable.status, `%${trimmedQuery}%`),
                ),
            )
            .execute();
    }
}
