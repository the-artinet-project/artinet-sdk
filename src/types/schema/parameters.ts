/**
 * @description Represents the base entity for FileParts
 * @optional name
 * @optional mimeType
 */
export interface FileBase {
  /**
   * @optional name of the file.
   */
  name?: string;

  /**
   * @optional MIME type of the file content.
   */
  mimeType?: string;
}

/**
 * @description Represents a file with its content encoded as a Base64 string.
 * @required bytes
 * @optional uri
 */
export interface FileWithBytes extends FileBase {
  /**
   * @required File content encoded as a Base64 string. Use this OR `uri`.
   */
  bytes: string;

  /**
   * @optional URI pointing to the file content.
   */
  uri?: never;
}

/**
 * @description Represents a file with its content encoded as a Base64 string.
 * @required uri
 * @optional bytes
 */
export interface FileWithUri extends FileBase {
  /**
   * @required URI pointing to the file content.
   */
  uri: string;

  /**
   * @optional File content encoded as a Base64 string. Use this OR `uri`.
   */
  bytes?: never;
}

/**
 * @description Represents the base entity for Parts
 * @optional metadata
 */
export interface PartBase {
  /**
   * @optional metadata associated with the part.
   */
  metadata?: Record<string, unknown>;
}

/**
 * @description Represents a part of a message containing text content.
 * @required kind
 * @required text
 */
export interface TextPart extends PartBase {
  /**
   * @required Type identifier for this part.
   */
  kind: "text";

  /**
   * @required The text content.
   */
  text: string;
}

/**
 * @description Represents a part of a message containing file content.
 * @required kind
 * @required file
 */
export interface FilePart extends PartBase {
  /**
   * @required Type identifier for this part.
   */
  kind: "file";

  /**
   * @required The file content, provided either inline or via URI.
   */
  file: FileWithBytes | FileWithUri;
}

/**
 * @description Represents a part of a message containing structured data (JSON).
 * @required kind
 * @required data
 */
export interface DataPart extends PartBase {
  /**
   * @required Type identifier for this part.
   */
  kind: "data";

  /**
   * @required The structured data content as a JSON object.
   */
  data: Record<string, unknown>;
}

/**
 * @description Represents a single part of a multi-part message. Can be text, file, or data.
 */
export type Part = TextPart | FilePart | DataPart;

/**
 * @description Represents an artifact generated or used by a task, potentially composed of multiple parts.
 * @required artifactId
 * @optional name
 * @optional description
 * @required parts
 * @optional metadata
 */
export interface Artifact {
  /**
   * @required Unique identifier for the artifact.
   */
  artifactId: string;

  /**
   * @optional name for the artifact.
   */
  name?: string;

  /**
   * @optional description of the artifact.
   */
  description?: string;

  /**
   * @required The constituent parts of the artifact.
   */
  parts: Part[];

  /**
   * @optional metadata associated with the artifact.
   */
  metadata?: Record<string, unknown>;
}

/**
 * @description Represents a message exchanged between a user and an agent.
 * @required role
 * @required parts
 * @optional metadata
 * @optional referenceTaskIds
 * @optional messageId
 * @optional taskId
 */
export interface Message {
  /**
   * @required The role of the sender (user or agent).
   */
  role: "user" | "agent";

  /**
   * @required The content of the message, composed of one or more parts.
   */
  parts: Part[];

  /**
   * @optional metadata associated with the message.
   */
  metadata?: Record<string, unknown>;

  /**
   * @optional List of tasks referenced as context by this message.
   */
  referenceTaskIds?: string[];

  /**
   * @required Identifier created by the message creator
   */
  messageId: string;

  /**
   * @optional Identifier of task the message is related to
   */
  taskId?: string;

  /**
   * @optional The context the message is associated with
   */
  contextId?: string;

  /**
   * @required Event type
   */
  kind: "message";
}
