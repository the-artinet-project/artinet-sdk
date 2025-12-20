/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { INVALID_PARAMS } from "~/utils/index.js";
import { logError } from "~/utils/logging/index.js";
import { z } from "zod/v4";

export async function validateSchema<T extends z.ZodSchema>(
  schema: T,
  data: unknown
): Promise<z.infer<T>> {
  return await schema.parseAsync(data).catch((error) => {
    logError("Schema validation failed", error.message, error);
    throw INVALID_PARAMS({
      data: {
        message: error.message,
      },
    });
  });
}
