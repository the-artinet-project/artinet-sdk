import { createServer, method } from "@danscan/zod-jsonrpc";
import { z } from "zod/v4";
import {
  MessageSendParamsSchema,
  SendMessageSuccessResultSchema,
  SendStreamingMessageSuccessResultSchema,
  TaskQueryParamsSchema,
  TaskSchema,
  TaskIdParamsSchema,
  TaskPushNotificationConfigSchema,
  GetTaskPushNotificationConfigParamsSchema,
  ListTaskPushNotificationConfigsParamsSchema,
  DeleteTaskPushNotificationConfigParamsSchema,
  AgentCardSchema,
  SendMessageSuccessResult,
  SendStreamingMessageSuccessResult,
  Task,
  TaskPushNotificationConfig,
  AgentCard,
} from "../../types/index.js";

export const SendMessageMethod = method(
  {
    paramsSchema: MessageSendParamsSchema,
    resultSchema: SendMessageSuccessResultSchema,
  },
  async (params) => {
    console.log("SendMessageMethod", params);
    return {
      message: "hello world",
    } as unknown as SendMessageSuccessResult;
  }
);

export const SendStreamingMessageMethod = method(
  {
    paramsSchema: MessageSendParamsSchema,
    resultSchema: SendStreamingMessageSuccessResultSchema,
  },
  async (params) => {
    console.log("SendStreamingMessageMethod", params);
    return {
      message: "hello world",
    } as unknown as SendStreamingMessageSuccessResult;
  }
);

export const TaskResubscribeMethod = method(
  {
    paramsSchema: TaskIdParamsSchema,
    resultSchema: SendStreamingMessageSuccessResultSchema,
  },
  async (params) => {
    console.log("TaskResubscribeMethod", params);
    return {
      message: "hello world",
    } as unknown as SendStreamingMessageSuccessResult;
  }
);

export const GetTaskMethod = method(
  {
    paramsSchema: TaskQueryParamsSchema,
    resultSchema: TaskSchema,
  },
  async (params) => {
    console.log("GetTaskMethod", params);
    return {
      message: "hello world",
    } as unknown as Task;
  }
);

export const CancelTaskMethod = method(
  {
    paramsSchema: TaskIdParamsSchema,
    resultSchema: TaskSchema,
  },
  async (params) => {
    console.log("CancelTaskMethod", params);
    return {
      message: "hello world",
    } as unknown as Task;
  }
);

export const SetTaskPushNotificationConfigMethod = method(
  {
    paramsSchema: TaskPushNotificationConfigSchema,
    resultSchema: TaskPushNotificationConfigSchema,
  },
  async (params) => {
    console.log("SetTaskPushNotificationConfigMethod", params);
    return {
      message: "hello world",
    } as unknown as TaskPushNotificationConfig;
  }
);

export const GetTaskPushNotificationConfigMethod = method(
  {
    paramsSchema: GetTaskPushNotificationConfigParamsSchema,
    resultSchema: TaskPushNotificationConfigSchema,
  },
  async (params) => {
    console.log("GetTaskPushNotificationConfigMethod", params);
    return {
      message: "hello world",
    } as unknown as TaskPushNotificationConfig;
  }
);

export const ListTaskPushNotificationConfigMethod = method(
  {
    paramsSchema: ListTaskPushNotificationConfigsParamsSchema,
    resultSchema: TaskPushNotificationConfigSchema,
  },
  async (params) => {
    console.log("ListTaskPushNotificationConfigMethod", params);
    return {
      message: "hello world",
    } as unknown as TaskPushNotificationConfig;
  }
);

export const DeleteTaskPushNotificationConfigMethod = method(
  {
    paramsSchema: DeleteTaskPushNotificationConfigParamsSchema,
    resultSchema: z.null(),
  },
  async (params) => {
    console.log("DeleteTaskPushNotificationConfigMethod", params);
    return null;
  }
);

export const GetAuthenticatedExtendedCardMethod = method(
  {
    paramsSchema: z.never().optional(),
    resultSchema: AgentCardSchema,
  },
  async (params) => {
    console.log("GetAuthenticatedExtendedCardMethod", params);
    return {
      message: "hello world",
    } as unknown as AgentCard;
  }
);

export const server = createServer({
  "message/send": SendMessageMethod,
  "message/sendStreaming": SendStreamingMessageMethod,
  "task/resubscribe": TaskResubscribeMethod,
  "task/get": GetTaskMethod,
  "task/cancel": CancelTaskMethod,
  "task/pushNotificationConfig/set": SetTaskPushNotificationConfigMethod,
  "task/pushNotificationConfig/get": GetTaskPushNotificationConfigMethod,
  "task/pushNotificationConfig/list": ListTaskPushNotificationConfigMethod,
  "task/pushNotificationConfig/delete": DeleteTaskPushNotificationConfigMethod,
  "agent/getAuthenticatedExtendedCard": GetAuthenticatedExtendedCardMethod,
});

const client = server.createClient(async (request) => {
  console.log("sendRequest", request);
  return server.request(request);
});

client["message/send"]({
  message: {
    messageId: "123",
    kind: "message",
    role: "user",
    parts: [{ kind: "text", text: "hello world" }],
    contextId: "456",
    metadata: {
      id: "789",
      kind: "task",
      status: "pending",
      createdAt: new Date(),
    },
    taskId: "789",
  },
});
