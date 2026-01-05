/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { INVALID_PARAMS } from "~/utils/errors.js";
import { logger } from "~/config/index.js";
import { z } from "zod/v4";

export async function validateSchema<T extends z.ZodSchema>(
  schema: T,
  data: unknown
): Promise<z.output<T>> {
  return await schema.parseAsync(data).catch((error) => {
    logger.error("Schema validation failed", error);
    throw INVALID_PARAMS(error);
  });
}
