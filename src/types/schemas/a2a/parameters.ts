/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod";
import { KindSchema } from "./kind.js";

/**
 * @description Defines base properties common to all message or artifact parts.
 */
export const PartBaseSchema = z
  .object({
    /**
     * @optional Optional metadata associated with this part.
     */
    metadata: z
      .record(z.string(), z.unknown())
      .optional()
      .describe("Optional metadata associated with this part."),
  })
  .describe("Defines base properties common to all message or artifact parts.");

export type PartBase = z.infer<typeof PartBaseSchema>;

/**
 * @description Defines base properties for a file.
 */
export const FileBaseSchema = z
  .object({
    /**
     * @optional An optional name for the file (e.g., "document.pdf").
     */
    name: z
      .string()
      .optional()
      .describe("An optional name for the file (e.g., 'document.pdf')."),
    /**
     * @optional The MIME type of the file (e.g., "application/pdf").
     */
    mimeType: z
      .string()
      .optional()
      .describe("The MIME type of the file (e.g., 'application/pdf')."),
  })
  .describe("Defines base properties for a file.");

export type FileBase = z.infer<typeof FileBaseSchema>;

/**
 * @description Represents a file with its content provided directly as a base64-encoded string.
 */
export const FileWithBytesSchema = FileBaseSchema.extend({
  /**
   * @required The base64-encoded content of the file.
   */
  bytes: z.string().describe("The base64-encoded content of the file."),
  /**
   * @optional The `uri` property must be absent when `bytes` is present.
   */
  uri: z.never().optional().describe("The URI of the file."),
}).describe(
  "Represents a file with its content provided directly as a base64-encoded string."
);

export type FileWithBytes = z.infer<typeof FileWithBytesSchema>;

/**
 * @description Represents a file with its content located at a specific URI.
 */
export const FileWithUriSchema = FileBaseSchema.extend({
  /**
   * @required A URL pointing to the file's content. (keeping as string for now)
   */
  uri: z.string().describe("A URL pointing to the file's content."),
  /**
   * @optional The `bytes` property must be absent when `uri` is present.
   */
  bytes: z
    .never()
    .optional()
    .describe("The base64-encoded content of the file."),
}).describe("Represents a file with its content located at a specific URI.");
export type FileWithUri = z.infer<typeof FileWithUriSchema>;

/**
 * @description Represents a file with its content provided directly as a base64-encoded string or located at a specific URI.
 */
export const FileSchema = z
  .union([FileWithBytesSchema, FileWithUriSchema])
  .describe(
    "Represents a file with its content provided directly as a base64-encoded string or located at a specific URI."
  );

export type File = z.infer<typeof FileSchema>;

/**
 * @description Represents a file segment within a message or artifact. The file content can be
 * provided either directly as bytes or as a URI.
 */
export const FilePartSchema = PartBaseSchema.extend({
  /**
   * @required The type of this part, used as a discriminator. Always 'file'.
   */
  kind: KindSchema.refine((kind) => kind === "file").describe(
    "The type of this object, used as a discriminator. Always 'file' for a FilePart."
  ),
  /**
   * @required The file content, represented as either a URI or as base64-encoded bytes.
   */
  file: FileSchema.describe(
    "The file content, represented as either a URI or as base64-encoded bytes."
  ),
}).describe("Represents a file segment within a message or artifact.");

export type FilePart = z.infer<typeof FilePartSchema>;

/**
 * @description Represents a text segment within a message or artifact.
 */
export const TextPartSchema = PartBaseSchema.extend({
  /**
   * @required The type of this object, used as a discriminator. Always 'text' for a TextPart.
   */
  kind: KindSchema.refine((kind) => kind === "text").describe(
    "The type of this object, used as a discriminator. Always 'text' for a TextPart."
  ),
  /**
   * @required The string content of the text part.
   */
  text: z.string().describe("The string content of the text part."),
}).describe("Represents a text segment within a message or artifact.");
export type TextPart = z.infer<typeof TextPartSchema>;

/**
 * @description Represents a structured data segment (e.g., JSON) within a message or artifact.
 */
export const DataPartSchema = PartBaseSchema.extend({
  /**
   * @required The type of this object, used as a discriminator. Always 'data' for a DataPart.
   */
  kind: KindSchema.refine((kind) => kind === "data").describe(
    "The type of this object, used as a discriminator. Always 'data' for a DataPart."
  ),
  /**
   * @required The structured data content of the data part.
   */
  data: z
    .record(z.string(), z.unknown())
    .describe("The structured data content of the data part."),
}).describe(
  "Represents a structured data segment (e.g., JSON) within a message or artifact."
);
export type DataPart = z.infer<typeof DataPartSchema>;

/**
 * @description A discriminated union representing a part of a message or artifact, which can
 * be text, a file, or structured data.
 */
export const PartSchema = z
  .union([TextPartSchema, FilePartSchema, DataPartSchema])
  .describe(
    "A discriminated union representing a part of a message or artifact, which can be text, a file, or structured data."
  );
export type Part = z.infer<typeof PartSchema>;

/**
 * @description Represents a file, data structure, or other resource generated by an agent during a task.
 */
export const ArtifactSchema = z
  .object({
    /**
     * @required A unique identifier for the artifact within the scope of the task.
     */
    artifactId: z
      .string()
      .describe(
        "A unique identifier for the artifact within the scope of the task."
      ),
    /**
     * @optional A human-readable name for the artifact.
     */
    name: z
      .string()
      .optional()
      .describe("A human-readable name for the artifact."),
    /**
     * @optional A human-readable description of the artifact.
     */
    description: z
      .string()
      .optional()
      .describe("A human-readable description of the artifact."),
    /**
     * @optional An array of content parts that make up the artifact.
     */
    parts: z
      .array(PartSchema)
      .describe("An array of content parts that make up the artifact."),
    /**
     * @optional Optional metadata for extensions. The key is an extension-specific identifier.
     */
    metadata: z
      .record(z.string(), z.unknown())
      .optional()
      .describe(
        "Optional metadata for extensions. The key is an extension-specific identifier."
      ),
    /**
     * @optional The URIs of extensions that are relevant to this artifact.
     */
    extension: z
      .array(z.string())
      .optional()
      .describe("The URIs of extensions that are relevant to this artifact."),
  })
  .describe(
    "Represents a file, data structure, or other resource generated by an agent during a task. It can be composed of multiple parts."
  );
export type Artifact = z.infer<typeof ArtifactSchema>;

/**
 * @description Represents the role of a message sender.
 */
export const MessageRoleSchema = z
  .enum(["user", "agent"])
  .describe(
    "Identifies the sender of the message. `user` for the client, `agent` for the service."
  );
export type MessageRole = z.infer<typeof MessageRoleSchema>;

/**
 * @description Represents a single message in the conversation between a user and an agent.
 */
export const MessageSchema = z
  .object({
    /**
     * @required Identifies the sender of the message. `user` for the client, `agent` for the service.
     */
    role: MessageRoleSchema.describe(
      "Identifies the sender of the message. `user` for the client, `agent` for the service."
    ),

    /**
     * @required An array of content parts that form the message body. A message can be
     * composed of multiple parts of different types (e.g., text and files).
     */
    parts: z
      .array(PartSchema)
      .describe(
        "An array of content parts that form the message body. A message can be composed of multiple parts of different types (e.g., text and files)."
      ),
    /**
     * @optional Optional metadata for extensions. The key is an extension-specific identifier.
     */
    metadata: z
      .record(z.string(), z.unknown())
      .optional()
      .describe(
        "Optional metadata for extensions. The key is an extension-specific identifier."
      ),
    /**
     * @optional The URIs of extensions that are relevant to this message.
     */
    extensions: z
      .array(z.string())
      .optional()
      .describe("The URIs of extensions that are relevant to this message."),
    /**
     * @optional A list of other task IDs that this message references for additional context.
     */
    referenceTaskIds: z
      .array(z.string())
      .optional()
      .describe(
        "A list of other task IDs that this message references for additional context."
      ),
    /**
     * @required A unique identifier for the message, typically a UUID, generated by the sender.
     */
    messageId: z
      .string()
      .describe(
        "A unique identifier for the message, typically a UUID, generated by the sender."
      ),
    /**
     * @optional The identifier of the task this message is part of. Can be omitted for the first message of a new task.
     */
    taskId: z
      .string()
      .optional()
      .describe(
        "The identifier of the task this message is part of. Can be omitted for the first message of a new task."
      ),
    /**
     * @optional The context identifier for this message, used to group related interactions.
     */
    contextId: z
      .string()
      .optional()
      .describe(
        "The context identifier for this message, used to group related interactions."
      ),
    /**
     * @required The type of this object, used as a discriminator. Always 'message' for a Message.
     */
    kind: KindSchema.refine((kind) => kind === "message").describe(
      "The type of this object, used as a discriminator. Always 'message' for a Message."
    ),
  })
  .describe(
    "Represents a single message in the conversation between a user and an agent."
  );
export type Message = z.infer<typeof MessageSchema>;
