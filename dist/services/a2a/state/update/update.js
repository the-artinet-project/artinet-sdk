/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { getCurrentTimestamp } from "../../../../utils/index.js";
import { logError } from "../../../../utils/logging/index.js";
import { processArtifactUpdate } from "./artifact.js";
export var UpdateKind;
(function (UpdateKind) {
    UpdateKind["Message"] = "message";
    UpdateKind["Task"] = "task";
    UpdateKind["StatusUpdate"] = "status-update";
    UpdateKind["ArtifactUpdate"] = "artifact-update";
})(UpdateKind || (UpdateKind = {}));
const isMessageInHistory = (task, message) => {
    return task.history?.find((msg) => msg.messageId === message.messageId);
};
const updateHistory = (current, updateMessage) => {
    if (!isMessageInHistory(current.task, updateMessage)) {
        // current.history = [...(current.history ?? []), updateMessage]; deprecating history
        current.task.history = [...(current.task.history ?? []), updateMessage];
    }
};
export const updateMessage = async (props) => {
    const { context, update } = props;
    if (!update || update.kind !== UpdateKind.Message) {
        logError("updateMessage", "Invalid update", update);
        return false;
    }
    context.latestUserMessage = update;
    return true;
};
export const updateTask = async (props) => {
    const { context, current, update } = props;
    if (!update || update.kind !== UpdateKind.Task) {
        logError("updateTask", "Invalid update kind", update);
        return false;
    }
    current.task = { ...current.task, ...update };
    if (context.latestUserMessage &&
        !isMessageInHistory(current.task, context.latestUserMessage)) {
        //todo seems that we can use updateHistory here instead (will change after we deprecate history fully & add update specific tests)
        current.task.history = [
            context.latestUserMessage,
            ...(current.task.history ?? []),
        ];
        // current.history = [context.latestUserMessage, ...(current.history ?? [])]; deprecating history
    }
    return true;
};
export const updateTaskStatusUpdate = async (props) => {
    const { current, update } = props;
    if (!update || update.kind !== UpdateKind.StatusUpdate) {
        logError("updateTaskStatusUpdate", "Invalid update kind", update);
        return false;
    }
    if (current.task.id === update.taskId) {
        current.task.status = update.status;
        current.task.status.timestamp = getCurrentTimestamp();
        if (update.status.message) {
            updateHistory(current, update.status.message);
        }
        return true;
    }
    logError("updateTaskStatusUpdate", "Invalid task id", update);
    return false;
};
export const updateTaskArtifactUpdate = async (props) => {
    const { current, update } = props;
    if (!update || update.kind !== UpdateKind.ArtifactUpdate) {
        logError("updateTaskArtifactUpdate", "Invalid update kind", update);
        return false;
    }
    if (current.task.id === update.taskId) {
        current.task.artifacts = processArtifactUpdate(update.append ?? false, current.task.artifacts ?? [], update.artifact);
        return true;
    }
    logError("updateTaskArtifactUpdate", "Invalid task id", update); //we should never get here, but just in case
    return true;
};
export const updateState = async (props) => {
    const { context, current, update } = props;
    if (!update || !update.kind) {
        logError("update", "Invalid update", update);
        return false;
    }
    if (!current || !current.task || !current.task.id) {
        logError("update", "Invalid current", current);
        return false;
    }
    if (!context || !context.contextId) {
        logError("update", "Invalid context", context);
        return false;
    }
    switch (update.kind) {
        case UpdateKind.Message:
            return updateMessage({
                context,
                current,
                update: update,
            });
        case UpdateKind.Task:
            return updateTask({
                context,
                current,
                update: update,
            });
        case UpdateKind.StatusUpdate:
            return updateTaskStatusUpdate({
                context,
                current,
                update: update,
            });
        case UpdateKind.ArtifactUpdate:
            return updateTaskArtifactUpdate({
                context,
                current,
                update: update,
            });
        default:
            return false;
    }
};
