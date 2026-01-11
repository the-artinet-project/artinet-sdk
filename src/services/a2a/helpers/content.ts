/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { getParts } from "./part.js";

/**
 * Extracts the content of an agent response.
 * @param input - The input event.
 * @param legacy - Whether to use the legacy content extraction logic.
 * @returns The content of the input event.
 */
export function extractTextContent(
  input: A2A.Update,
  legacy = true
): string | undefined {
  const parts = getParts(
    (input as A2A.Message)?.parts ??
      (input as A2A.Task)?.status?.message?.parts ??
      (input as A2A.TaskStatusUpdateEvent)?.status?.message?.parts ??
      (input as A2A.TaskArtifactUpdateEvent)?.artifact?.parts ??
      []
  );
  if (legacy) {
    return (
      parts.text ??
      parts.file?.map((file) => file.bytes).join("\n") ??
      parts.file?.map((file) => file.uri).join("\n") ??
      parts.data?.map((data) => JSON.stringify(data)).join("\n") ??
      undefined
    );
  }
  return parts.text && parts.text !== ""
    ? parts.text
    : parts.file?.map((file) => file.bytes ?? file.uri).join("\n") ??
        parts.data?.map((data) => JSON.stringify(data)).join("\n") ??
        undefined;
}

/**
 * @deprecated Use extractTextContent instead.
 */
export const getContent = extractTextContent;
