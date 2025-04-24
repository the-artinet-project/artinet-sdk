/**
 * Artinet SDK - A TypeScript implementation of the Agent2Agent (A2A) Protocol
 * @packageDocumentation
 */

// ---- Client Side API ----

// Reexport the core client class
export { A2AClient } from "./client.js";

// ---- Server Side API ----

// Export the server implementation
export { 
  A2AServer, 
  InMemoryTaskStore, 
  FileStore,
  A2AError
} from "./server/index.js";

// Export server types
export type { 
  A2AServerOptions,
  TaskStore, 
  TaskAndHistory,
  TaskHandler, 
  TaskContext, 
  TaskYieldUpdate 
} from "./server/index.js";

// Reexport the error utility
export { RpcError } from "./lib/errors.js";

// Export the logger for configuration
export { logger, configureLogger, type LogLevel } from "./utils/logger.js";

// Reexport necessary types from the schema
export type {
  // Core protocol types
  AgentCard,
  AgentProvider,
  AgentCapabilities,
  AgentSkill,
  AgentAuthentication,

  // Task related types
  Task,
  TaskState,
  TaskStatus,
  TaskHistory,
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,

  // Message and content types
  Message,
  Part,
  TextPart,
  FilePart,
  DataPart,
  FileContent,

  // Parameter types for API methods
  TaskSendParams,
  TaskQueryParams,
  TaskIdParams,
  TaskPushNotificationConfig,
  PushNotificationConfig,

  // JSON-RPC types
  JSONRPCRequest,
  JSONRPCResponse,
  JSONRPCError,
} from "./lib/schema.js";
