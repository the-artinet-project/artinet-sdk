import { PushNotificationConfig } from "./notification.js";
import { Message } from "./parameters.js";
import { TaskArtifactUpdateEvent } from "./task.js";
import { TaskStatusUpdateEvent } from "./task.js";
import {
  JSONRPCErrorResponse,
  JSONRPCRequestWithParams,
  JSONRPCSuccessResponse,
} from "./rpc.js";
import { Task } from "./task.js";

/**
 * @description Configuration for the send message request.
 * @required acceptedOutputModes
 * @optional historyLength
 * @optional pushNotificationConfig
 * @optional blocking
 */
export interface MessageSendConfiguration {
  /**
   * @required Accepted output modalities by the client.
   */
  acceptedOutputModes: string[];

  /**
   * @optional Number of recent messages to be retrieved.
   */
  historyLength?: number;

  /**
   * @optional Where the server should send notifications when disconnected.
   */
  pushNotificationConfig?: PushNotificationConfig;

  /**
   * @optional If the server should treat the client as a blocking request.
   */
  blocking?: boolean;
}

/**
 * @description Sent by the client to the agent as a request. May create, continue or restart a task.
 * @required message
 * @optional configuration
 * @optional metadata
 */
export interface MessageSendParams {
  /**
   * @required The message content to send to the agent for processing.
   */
  message: Message;

  /**
   * @optional configuration information for the message.
   */
  configuration?: MessageSendConfiguration;

  /**
   * @optional Extension metadata.
   */
  metadata?: Record<string, unknown>;
}

/**
 * @description Request to send a message/initiate a task.
 * @required id
 * @required method
 * @required params
 */
export type SendMessageRequest = JSONRPCRequestWithParams<
  "message/send",
  MessageSendParams
>;

/**
 * @description JSON-RPC success response model for the 'message/send' method.
 * @required result
 * @never error
 * @oneOf Message | Task
 */
export type SendMessageSuccessResponse = JSONRPCSuccessResponse<Message | Task>;

/**
 * @description JSON-RPC response model for the 'message/send' method.
 * @oneOf SendMessageSuccessResponse | JSONRPCErrorResponse
 */
export type SendMessageResponse =
  | SendMessageSuccessResponse
  | JSONRPCErrorResponse;

// Note: The response to SendMessageStreamingRequest is typically handled by the underlying protocol
// (like WebSocket messages containing TaskUpdateEvent) rather than a single JSON-RPC response object.
// The schema doesn't define a specific JSON-RPC response type for `tasks/subscribe`.

/**
 * @description Request to send a message/initiate a task and subscribe to streaming updates.
 * @required id
 * @required method
 * @required params
 */
export type SendStreamingMessageRequest = JSONRPCRequestWithParams<
  "message/stream",
  MessageSendParams
>;

/**
 * @description JSON-RPC success response model for the 'message/stream' method.
 * @required result
 * @never error
 * @oneOf Message | Task | TaskStatusUpdateEvent | TaskArtifactUpdateEvent
 */
export type SendStreamingMessageSuccessResponse = JSONRPCSuccessResponse<
  Message | Task | TaskStatusUpdateEvent | TaskArtifactUpdateEvent
>;

/**
 * @description Response to a streaming task operation, either through `message/stream` or a subscription.
 * @oneOf Message | Task | TaskStatusUpdateEvent | TaskArtifactUpdateEvent
 */
export type SendStreamingMessageResponse =
  | SendStreamingMessageSuccessResponse
  | JSONRPCErrorResponse;
