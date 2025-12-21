/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { A2A } from "~/types/index.js";
import { logger } from "~/config/index.js";

export async function getReferences(
  tasks: A2A.Tasks,
  referenceTaskIds?: string[]
): Promise<A2A.Task[]> {
  if (!referenceTaskIds) {
    return [];
  }
  try {
    const references: (A2A.Task | undefined)[] = await Promise.all(
      referenceTaskIds.map((referenceTaskId) => {
        return tasks.get(referenceTaskId).catch((error) => {
          logger.error("getReferences", "failed to load reference", error, {
            referenceTaskId,
          });
          return undefined;
        });
      })
    );
    return references
      .filter((reference) => reference !== undefined)
      .map((reference) => reference);
  } catch (error) {
    logger.error("getReferences", "failed to load references", error, {
      referenceTaskIds,
    });
    return [];
  }
}
