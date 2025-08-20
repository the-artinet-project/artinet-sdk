import { z } from "zod/v4";

/**
 * @description Represents the type of event that occurred in the context of a task.
 */
export const KindSchema = z
  .enum([
    "artifact-update",
    "data",
    "file",
    "message",
    "status-update",
    "task",
    "text",
  ])
  .describe(
    "Represents the type of event that occurred in the context of a task."
  );
export const Kind = KindSchema.enum;
export type Kind = z.infer<typeof KindSchema>;
