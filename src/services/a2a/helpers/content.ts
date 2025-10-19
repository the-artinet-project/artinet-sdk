/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  Message,
  Task,
  TaskArtifactUpdateEvent,
  TaskStatusUpdateEvent,
  UpdateEvent,
} from "~/types/index.js";
import { getParts } from "./part.js";

/**
 * Extracts the content of an agent response.
 * @param input - The input event.
 * @returns The content of the input event.
 */
export function getContent(input: UpdateEvent): string | undefined {
  const parts = getParts(
    (input as Message)?.parts ??
      (input as Task)?.status?.message?.parts ??
      (input as TaskStatusUpdateEvent)?.status?.message?.parts ??
      (input as TaskArtifactUpdateEvent)?.artifact?.parts ??
      []
  );
  return (
    parts.text ??
    parts.file.map((file) => file.bytes).join("\n") ??
    parts.file.map((file) => file.uri).join("\n") ??
    parts.data.map((data) => JSON.stringify(data)).join("\n") ??
    undefined
  );
}
