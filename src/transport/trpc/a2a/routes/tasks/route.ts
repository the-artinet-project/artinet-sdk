/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod";
import { router, A2AProcedure } from "../../trpc.js";
import {
  TaskPushNotificationConfigSchema,
  GetTaskPushNotificationConfigParamsSchema,
  ListTaskPushNotificationConfigsParamsSchema,
  DeleteTaskPushNotificationConfigParamsSchema,
  ListTaskPushNotificationConfigResultSchema,
  TaskIdParamsSchema,
  TaskSchema,
  SendStreamingMessageSuccessResultSchema,
} from "~/types/index.js";
import {
  INVALID_REQUEST,
  PUSH_NOTIFICATION_NOT_SUPPORTED,
  zAsyncIterable,
} from "~/utils/index.js";

const pushNotificationConfigRouter = router({
  set: A2AProcedure.input(TaskPushNotificationConfigSchema)
    .output(TaskPushNotificationConfigSchema)
    .mutation(async ({ input }) => {
      console.warn("task/pushNotificationConfig/set", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
  get: A2AProcedure.input(GetTaskPushNotificationConfigParamsSchema)
    .output(TaskPushNotificationConfigSchema)
    .query(async ({ input }) => {
      console.warn("task/pushNotificationConfig/get", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
  list: A2AProcedure.input(ListTaskPushNotificationConfigsParamsSchema)
    .output(ListTaskPushNotificationConfigResultSchema)
    .query(async ({ input }) => {
      console.warn("task/pushNotificationConfig/list", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
  delete: A2AProcedure.input(DeleteTaskPushNotificationConfigParamsSchema)
    .output(z.null())
    .mutation(async ({ input }) => {
      console.warn("task/pushNotificationConfig/delete", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
});

const resubscribeRoute = A2AProcedure.input(TaskIdParamsSchema)
  .output(
    zAsyncIterable({
      yield: SendStreamingMessageSuccessResultSchema,
    })
  )
  .subscription(async function* (opts) {
    const { input } = opts;
    if (!input) {
      throw INVALID_REQUEST({ input: "No request detected" });
    }
    yield* opts.ctx.service.resubscribe(input, {
      engine: opts.ctx.engine,
      signal: opts.signal,
    });
  });

const getTaskRoute = A2AProcedure.input(TaskIdParamsSchema)
  .output(TaskSchema)
  .query(async ({ input, ctx }) => {
    if (!input) {
      throw INVALID_REQUEST({ input: "No request detected" });
    }
    return await ctx.service.getTask(input);
  });

const cancelTaskRoute = A2AProcedure.input(TaskIdParamsSchema)
  .output(TaskSchema)
  .mutation(async ({ input, ctx }) => {
    if (!input) {
      throw INVALID_REQUEST({ input: "No request detected" });
    }
    return await ctx.service.cancelTask(input);
  });

export const taskRouter = router({
  resubscribe: resubscribeRoute,
  get: getTaskRoute,
  cancel: cancelTaskRoute,
  pushNotificationConfig: pushNotificationConfigRouter,
});
