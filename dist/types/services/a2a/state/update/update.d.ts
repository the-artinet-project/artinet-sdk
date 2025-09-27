/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskContext, Message, Task, TaskArtifactUpdateEvent, TaskStatusUpdateEvent, UpdateEvent, TaskAndHistory } from "../../../../types/index.js";
export declare enum UpdateKind {
    Message = "message",
    Task = "task",
    StatusUpdate = "status-update",
    ArtifactUpdate = "artifact-update"
}
export interface UpdateProps<T extends UpdateEvent = UpdateEvent> {
    context: TaskContext;
    current: TaskAndHistory;
    update: T;
}
type UpdateFunction<T extends UpdateEvent> = (props: UpdateProps<T>) => Promise<boolean>;
export declare const updateMessage: UpdateFunction<Message>;
export declare const updateTask: UpdateFunction<Task>;
export declare const updateTaskStatusUpdate: UpdateFunction<TaskStatusUpdateEvent>;
export declare const updateTaskArtifactUpdate: UpdateFunction<TaskArtifactUpdateEvent>;
export declare const updateState: UpdateFunction<UpdateEvent>;
export {};
//# sourceMappingURL=update.d.ts.map