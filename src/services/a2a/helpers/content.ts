/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { getParts } from "./part.js";

/**
 * Extracts the content of an agent response.
 * @param input - The input event.
 * @returns The content of the input event.
 */
export function getContent(input: A2A.Update): string | undefined {
  const parts = getParts(
    (input as A2A.Message)?.parts ??
      (input as A2A.Task)?.status?.message?.parts ??
      (input as A2A.TaskStatusUpdateEvent)?.status?.message?.parts ??
      (input as A2A.TaskArtifactUpdateEvent)?.artifact?.parts ??
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
