/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod/v4";
import { validateSchema } from "./schema-validation.js";
import { logger } from "~/config/index.js";

export function safeParse<T = any>(json: string): T {
  try {
    return JSON.parse(json);
  } catch (error) {
    logger.warn("safeParse error:", error, json);
    return {} as T;
  }
}

export async function safeParseSchema<T extends z.ZodSchema>(
  json: string,
  schema: T
): Promise<z.infer<T>> {
  return await validateSchema(schema, safeParse(json));
}
