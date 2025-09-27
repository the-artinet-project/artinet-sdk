/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * @description Defines base properties common to all message or artifact parts.
 */
export declare const PartBaseSchema: z.ZodObject<{
    /**
     * @optional Optional metadata associated with this part.
     */
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata?: Record<string, unknown> | undefined;
}, {
    metadata?: Record<string, unknown> | undefined;
}>;
export type PartBase = z.infer<typeof PartBaseSchema>;
/**
 * @description Defines base properties for a file.
 */
export declare const FileBaseSchema: z.ZodObject<{
    /**
     * @optional An optional name for the file (e.g., "document.pdf").
     */
    name: z.ZodOptional<z.ZodString>;
    /**
     * @optional The MIME type of the file (e.g., "application/pdf").
     */
    mimeType: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    mimeType?: string | undefined;
}, {
    name?: string | undefined;
    mimeType?: string | undefined;
}>;
export type FileBase = z.infer<typeof FileBaseSchema>;
/**
 * @description Represents a file with its content provided directly as a base64-encoded string.
 */
export declare const FileWithBytesSchema: z.ZodObject<{
    /**
     * @optional An optional name for the file (e.g., "document.pdf").
     */
    name: z.ZodOptional<z.ZodString>;
    /**
     * @optional The MIME type of the file (e.g., "application/pdf").
     */
    mimeType: z.ZodOptional<z.ZodString>;
} & {
    /**
     * @required The base64-encoded content of the file.
     */
    bytes: z.ZodString;
    /**
     * @optional The `uri` property must be absent when `bytes` is present.
     */
    uri: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    bytes: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    uri?: undefined;
}, {
    bytes: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    uri?: undefined;
}>;
export type FileWithBytes = z.infer<typeof FileWithBytesSchema>;
/**
 * @description Represents a file with its content located at a specific URI.
 */
export declare const FileWithUriSchema: z.ZodObject<{
    /**
     * @optional An optional name for the file (e.g., "document.pdf").
     */
    name: z.ZodOptional<z.ZodString>;
    /**
     * @optional The MIME type of the file (e.g., "application/pdf").
     */
    mimeType: z.ZodOptional<z.ZodString>;
} & {
    /**
     * @required A URL pointing to the file's content. (keeping as string for now)
     */
    uri: z.ZodString;
    /**
     * @optional The `bytes` property must be absent when `uri` is present.
     */
    bytes: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    uri: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    bytes?: undefined;
}, {
    uri: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    bytes?: undefined;
}>;
export type FileWithUri = z.infer<typeof FileWithUriSchema>;
/**
 * @description Represents a file with its content provided directly as a base64-encoded string or located at a specific URI.
 */
export declare const FileSchema: z.ZodUnion<[z.ZodObject<{
    /**
     * @optional An optional name for the file (e.g., "document.pdf").
     */
    name: z.ZodOptional<z.ZodString>;
    /**
     * @optional The MIME type of the file (e.g., "application/pdf").
     */
    mimeType: z.ZodOptional<z.ZodString>;
} & {
    /**
     * @required The base64-encoded content of the file.
     */
    bytes: z.ZodString;
    /**
     * @optional The `uri` property must be absent when `bytes` is present.
     */
    uri: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    bytes: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    uri?: undefined;
}, {
    bytes: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    uri?: undefined;
}>, z.ZodObject<{
    /**
     * @optional An optional name for the file (e.g., "document.pdf").
     */
    name: z.ZodOptional<z.ZodString>;
    /**
     * @optional The MIME type of the file (e.g., "application/pdf").
     */
    mimeType: z.ZodOptional<z.ZodString>;
} & {
    /**
     * @required A URL pointing to the file's content. (keeping as string for now)
     */
    uri: z.ZodString;
    /**
     * @optional The `bytes` property must be absent when `uri` is present.
     */
    bytes: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    uri: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    bytes?: undefined;
}, {
    uri: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    bytes?: undefined;
}>]>;
export type File = z.infer<typeof FileSchema>;
/**
 * @description Represents a file segment within a message or artifact. The file content can be
 * provided either directly as bytes or as a URI.
 */
export declare const FilePartSchema: z.ZodObject<{
    /**
     * @optional Optional metadata associated with this part.
     */
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    /**
     * @required The type of this part, used as a discriminator. Always 'file'.
     */
    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    /**
     * @required The file content, represented as either a URI or as base64-encoded bytes.
     */
    file: z.ZodUnion<[z.ZodObject<{
        /**
         * @optional An optional name for the file (e.g., "document.pdf").
         */
        name: z.ZodOptional<z.ZodString>;
        /**
         * @optional The MIME type of the file (e.g., "application/pdf").
         */
        mimeType: z.ZodOptional<z.ZodString>;
    } & {
        /**
         * @required The base64-encoded content of the file.
         */
        bytes: z.ZodString;
        /**
         * @optional The `uri` property must be absent when `bytes` is present.
         */
        uri: z.ZodOptional<z.ZodNever>;
    }, "strip", z.ZodTypeAny, {
        bytes: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        uri?: undefined;
    }, {
        bytes: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        uri?: undefined;
    }>, z.ZodObject<{
        /**
         * @optional An optional name for the file (e.g., "document.pdf").
         */
        name: z.ZodOptional<z.ZodString>;
        /**
         * @optional The MIME type of the file (e.g., "application/pdf").
         */
        mimeType: z.ZodOptional<z.ZodString>;
    } & {
        /**
         * @required A URL pointing to the file's content. (keeping as string for now)
         */
        uri: z.ZodString;
        /**
         * @optional The `bytes` property must be absent when `uri` is present.
         */
        bytes: z.ZodOptional<z.ZodNever>;
    }, "strip", z.ZodTypeAny, {
        uri: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        bytes?: undefined;
    }, {
        uri: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        bytes?: undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    file: {
        bytes: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        uri?: undefined;
    } | {
        uri: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        bytes?: undefined;
    };
    kind: "file";
    metadata?: Record<string, unknown> | undefined;
}, {
    file: {
        bytes: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        uri?: undefined;
    } | {
        uri: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        bytes?: undefined;
    };
    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
    metadata?: Record<string, unknown> | undefined;
}>;
export type FilePart = z.infer<typeof FilePartSchema>;
/**
 * @description Represents a text segment within a message or artifact.
 */
export declare const TextPartSchema: z.ZodObject<{
    /**
     * @optional Optional metadata associated with this part.
     */
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    /**
     * @required The type of this object, used as a discriminator. Always 'text' for a TextPart.
     */
    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    /**
     * @required The string content of the text part.
     */
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
    kind: "text";
    metadata?: Record<string, unknown> | undefined;
}, {
    text: string;
    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
    metadata?: Record<string, unknown> | undefined;
}>;
export type TextPart = z.infer<typeof TextPartSchema>;
/**
 * @description Represents a structured data segment (e.g., JSON) within a message or artifact.
 */
export declare const DataPartSchema: z.ZodObject<{
    /**
     * @optional Optional metadata associated with this part.
     */
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    /**
     * @required The type of this object, used as a discriminator. Always 'data' for a DataPart.
     */
    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    /**
     * @required The structured data content of the data part.
     */
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, unknown>;
    kind: "data";
    metadata?: Record<string, unknown> | undefined;
}, {
    data: Record<string, unknown>;
    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
    metadata?: Record<string, unknown> | undefined;
}>;
export type DataPart = z.infer<typeof DataPartSchema>;
/**
 * @description A discriminated union representing a part of a message or artifact, which can
 * be text, a file, or structured data.
 */
export declare const PartSchema: z.ZodUnion<[z.ZodObject<{
    /**
     * @optional Optional metadata associated with this part.
     */
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    /**
     * @required The type of this object, used as a discriminator. Always 'text' for a TextPart.
     */
    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    /**
     * @required The string content of the text part.
     */
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
    kind: "text";
    metadata?: Record<string, unknown> | undefined;
}, {
    text: string;
    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
    metadata?: Record<string, unknown> | undefined;
}>, z.ZodObject<{
    /**
     * @optional Optional metadata associated with this part.
     */
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    /**
     * @required The type of this part, used as a discriminator. Always 'file'.
     */
    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    /**
     * @required The file content, represented as either a URI or as base64-encoded bytes.
     */
    file: z.ZodUnion<[z.ZodObject<{
        /**
         * @optional An optional name for the file (e.g., "document.pdf").
         */
        name: z.ZodOptional<z.ZodString>;
        /**
         * @optional The MIME type of the file (e.g., "application/pdf").
         */
        mimeType: z.ZodOptional<z.ZodString>;
    } & {
        /**
         * @required The base64-encoded content of the file.
         */
        bytes: z.ZodString;
        /**
         * @optional The `uri` property must be absent when `bytes` is present.
         */
        uri: z.ZodOptional<z.ZodNever>;
    }, "strip", z.ZodTypeAny, {
        bytes: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        uri?: undefined;
    }, {
        bytes: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        uri?: undefined;
    }>, z.ZodObject<{
        /**
         * @optional An optional name for the file (e.g., "document.pdf").
         */
        name: z.ZodOptional<z.ZodString>;
        /**
         * @optional The MIME type of the file (e.g., "application/pdf").
         */
        mimeType: z.ZodOptional<z.ZodString>;
    } & {
        /**
         * @required A URL pointing to the file's content. (keeping as string for now)
         */
        uri: z.ZodString;
        /**
         * @optional The `bytes` property must be absent when `uri` is present.
         */
        bytes: z.ZodOptional<z.ZodNever>;
    }, "strip", z.ZodTypeAny, {
        uri: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        bytes?: undefined;
    }, {
        uri: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        bytes?: undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    file: {
        bytes: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        uri?: undefined;
    } | {
        uri: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        bytes?: undefined;
    };
    kind: "file";
    metadata?: Record<string, unknown> | undefined;
}, {
    file: {
        bytes: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        uri?: undefined;
    } | {
        uri: string;
        name?: string | undefined;
        mimeType?: string | undefined;
        bytes?: undefined;
    };
    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
    metadata?: Record<string, unknown> | undefined;
}>, z.ZodObject<{
    /**
     * @optional Optional metadata associated with this part.
     */
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    /**
     * @required The type of this object, used as a discriminator. Always 'data' for a DataPart.
     */
    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    /**
     * @required The structured data content of the data part.
     */
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, unknown>;
    kind: "data";
    metadata?: Record<string, unknown> | undefined;
}, {
    data: Record<string, unknown>;
    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
    metadata?: Record<string, unknown> | undefined;
}>]>;
export type Part = z.infer<typeof PartSchema>;
/**
 * @description Represents a file, data structure, or other resource generated by an agent during a task.
 */
export declare const ArtifactSchema: z.ZodObject<{
    /**
     * @required A unique identifier for the artifact within the scope of the task.
     */
    artifactId: z.ZodString;
    /**
     * @optional A human-readable name for the artifact.
     */
    name: z.ZodOptional<z.ZodString>;
    /**
     * @optional A human-readable description of the artifact.
     */
    description: z.ZodOptional<z.ZodString>;
    /**
     * @optional An array of content parts that make up the artifact.
     */
    parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        /**
         * @optional Optional metadata associated with this part.
         */
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        /**
         * @required The type of this object, used as a discriminator. Always 'text' for a TextPart.
         */
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        /**
         * @required The string content of the text part.
         */
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
        kind: "text";
        metadata?: Record<string, unknown> | undefined;
    }, {
        text: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
    }>, z.ZodObject<{
        /**
         * @optional Optional metadata associated with this part.
         */
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        /**
         * @required The type of this part, used as a discriminator. Always 'file'.
         */
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        /**
         * @required The file content, represented as either a URI or as base64-encoded bytes.
         */
        file: z.ZodUnion<[z.ZodObject<{
            /**
             * @optional An optional name for the file (e.g., "document.pdf").
             */
            name: z.ZodOptional<z.ZodString>;
            /**
             * @optional The MIME type of the file (e.g., "application/pdf").
             */
            mimeType: z.ZodOptional<z.ZodString>;
        } & {
            /**
             * @required The base64-encoded content of the file.
             */
            bytes: z.ZodString;
            /**
             * @optional The `uri` property must be absent when `bytes` is present.
             */
            uri: z.ZodOptional<z.ZodNever>;
        }, "strip", z.ZodTypeAny, {
            bytes: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            uri?: undefined;
        }, {
            bytes: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            uri?: undefined;
        }>, z.ZodObject<{
            /**
             * @optional An optional name for the file (e.g., "document.pdf").
             */
            name: z.ZodOptional<z.ZodString>;
            /**
             * @optional The MIME type of the file (e.g., "application/pdf").
             */
            mimeType: z.ZodOptional<z.ZodString>;
        } & {
            /**
             * @required A URL pointing to the file's content. (keeping as string for now)
             */
            uri: z.ZodString;
            /**
             * @optional The `bytes` property must be absent when `uri` is present.
             */
            bytes: z.ZodOptional<z.ZodNever>;
        }, "strip", z.ZodTypeAny, {
            uri: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            bytes?: undefined;
        }, {
            uri: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            bytes?: undefined;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        file: {
            bytes: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            uri?: undefined;
        } | {
            uri: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            bytes?: undefined;
        };
        kind: "file";
        metadata?: Record<string, unknown> | undefined;
    }, {
        file: {
            bytes: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            uri?: undefined;
        } | {
            uri: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            bytes?: undefined;
        };
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
    }>, z.ZodObject<{
        /**
         * @optional Optional metadata associated with this part.
         */
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        /**
         * @required The type of this object, used as a discriminator. Always 'data' for a DataPart.
         */
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        /**
         * @required The structured data content of the data part.
         */
        data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        data: Record<string, unknown>;
        kind: "data";
        metadata?: Record<string, unknown> | undefined;
    }, {
        data: Record<string, unknown>;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
    }>]>, "many">;
    /**
     * @optional Optional metadata for extensions. The key is an extension-specific identifier.
     */
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    /**
     * @optional The URIs of extensions that are relevant to this artifact.
     */
    extension: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    artifactId: string;
    parts: ({
        file: {
            bytes: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            uri?: undefined;
        } | {
            uri: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            bytes?: undefined;
        };
        kind: "file";
        metadata?: Record<string, unknown> | undefined;
    } | {
        text: string;
        kind: "text";
        metadata?: Record<string, unknown> | undefined;
    } | {
        data: Record<string, unknown>;
        kind: "data";
        metadata?: Record<string, unknown> | undefined;
    })[];
    description?: string | undefined;
    name?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    extension?: string[] | undefined;
}, {
    artifactId: string;
    parts: ({
        file: {
            bytes: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            uri?: undefined;
        } | {
            uri: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            bytes?: undefined;
        };
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
    } | {
        text: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
    } | {
        data: Record<string, unknown>;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
    })[];
    description?: string | undefined;
    name?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    extension?: string[] | undefined;
}>;
export type Artifact = z.infer<typeof ArtifactSchema>;
/**
 * @description Represents the role of a message sender.
 */
export declare const MessageRoleSchema: z.ZodEnum<["user", "agent"]>;
export type MessageRole = z.infer<typeof MessageRoleSchema>;
/**
 * @description Represents a single message in the conversation between a user and an agent.
 */
export declare const MessageSchema: z.ZodObject<{
    /**
     * @required Identifies the sender of the message. `user` for the client, `agent` for the service.
     */
    role: z.ZodEnum<["user", "agent"]>;
    /**
     * @required An array of content parts that form the message body. A message can be
     * composed of multiple parts of different types (e.g., text and files).
     */
    parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        /**
         * @optional Optional metadata associated with this part.
         */
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        /**
         * @required The type of this object, used as a discriminator. Always 'text' for a TextPart.
         */
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        /**
         * @required The string content of the text part.
         */
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
        kind: "text";
        metadata?: Record<string, unknown> | undefined;
    }, {
        text: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
    }>, z.ZodObject<{
        /**
         * @optional Optional metadata associated with this part.
         */
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        /**
         * @required The type of this part, used as a discriminator. Always 'file'.
         */
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        /**
         * @required The file content, represented as either a URI or as base64-encoded bytes.
         */
        file: z.ZodUnion<[z.ZodObject<{
            /**
             * @optional An optional name for the file (e.g., "document.pdf").
             */
            name: z.ZodOptional<z.ZodString>;
            /**
             * @optional The MIME type of the file (e.g., "application/pdf").
             */
            mimeType: z.ZodOptional<z.ZodString>;
        } & {
            /**
             * @required The base64-encoded content of the file.
             */
            bytes: z.ZodString;
            /**
             * @optional The `uri` property must be absent when `bytes` is present.
             */
            uri: z.ZodOptional<z.ZodNever>;
        }, "strip", z.ZodTypeAny, {
            bytes: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            uri?: undefined;
        }, {
            bytes: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            uri?: undefined;
        }>, z.ZodObject<{
            /**
             * @optional An optional name for the file (e.g., "document.pdf").
             */
            name: z.ZodOptional<z.ZodString>;
            /**
             * @optional The MIME type of the file (e.g., "application/pdf").
             */
            mimeType: z.ZodOptional<z.ZodString>;
        } & {
            /**
             * @required A URL pointing to the file's content. (keeping as string for now)
             */
            uri: z.ZodString;
            /**
             * @optional The `bytes` property must be absent when `uri` is present.
             */
            bytes: z.ZodOptional<z.ZodNever>;
        }, "strip", z.ZodTypeAny, {
            uri: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            bytes?: undefined;
        }, {
            uri: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            bytes?: undefined;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        file: {
            bytes: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            uri?: undefined;
        } | {
            uri: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            bytes?: undefined;
        };
        kind: "file";
        metadata?: Record<string, unknown> | undefined;
    }, {
        file: {
            bytes: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            uri?: undefined;
        } | {
            uri: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            bytes?: undefined;
        };
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
    }>, z.ZodObject<{
        /**
         * @optional Optional metadata associated with this part.
         */
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        /**
         * @required The type of this object, used as a discriminator. Always 'data' for a DataPart.
         */
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        /**
         * @required The structured data content of the data part.
         */
        data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        data: Record<string, unknown>;
        kind: "data";
        metadata?: Record<string, unknown> | undefined;
    }, {
        data: Record<string, unknown>;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
    }>]>, "many">;
    /**
     * @optional Optional metadata for extensions. The key is an extension-specific identifier.
     */
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    /**
     * @optional The URIs of extensions that are relevant to this message.
     */
    extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * @optional A list of other task IDs that this message references for additional context.
     */
    referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * @required A unique identifier for the message, typically a UUID, generated by the sender.
     */
    messageId: z.ZodString;
    /**
     * @optional The identifier of the task this message is part of. Can be omitted for the first message of a new task.
     */
    taskId: z.ZodOptional<z.ZodString>;
    /**
     * @optional The context identifier for this message, used to group related interactions.
     */
    contextId: z.ZodOptional<z.ZodString>;
    /**
     * @required The type of this object, used as a discriminator. Always 'message' for a Message.
     */
    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
}, "strip", z.ZodTypeAny, {
    kind: "message";
    parts: ({
        file: {
            bytes: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            uri?: undefined;
        } | {
            uri: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            bytes?: undefined;
        };
        kind: "file";
        metadata?: Record<string, unknown> | undefined;
    } | {
        text: string;
        kind: "text";
        metadata?: Record<string, unknown> | undefined;
    } | {
        data: Record<string, unknown>;
        kind: "data";
        metadata?: Record<string, unknown> | undefined;
    })[];
    role: "user" | "agent";
    messageId: string;
    metadata?: Record<string, unknown> | undefined;
    extensions?: string[] | undefined;
    referenceTaskIds?: string[] | undefined;
    taskId?: string | undefined;
    contextId?: string | undefined;
}, {
    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
    parts: ({
        file: {
            bytes: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            uri?: undefined;
        } | {
            uri: string;
            name?: string | undefined;
            mimeType?: string | undefined;
            bytes?: undefined;
        };
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
    } | {
        text: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
    } | {
        data: Record<string, unknown>;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
    })[];
    role: "user" | "agent";
    messageId: string;
    metadata?: Record<string, unknown> | undefined;
    extensions?: string[] | undefined;
    referenceTaskIds?: string[] | undefined;
    taskId?: string | undefined;
    contextId?: string | undefined;
}>;
export type Message = z.infer<typeof MessageSchema>;
//# sourceMappingURL=parameters.d.ts.map