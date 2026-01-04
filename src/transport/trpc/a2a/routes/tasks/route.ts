/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod/v4";
import { router, A2AProcedure } from "../../trpc.js";
import { A2A } from "~/types/index.js";
import {
  INVALID_REQUEST,
  PUSH_NOTIFICATION_NOT_SUPPORTED,
} from "~/utils/errors.js";
import { zAsyncIterable } from "~/utils/zAsyncIterable.js";

const pushNotificationConfigRouter = router({
  set: A2AProcedure.input(A2A.TaskPushNotificationConfigSchema)
    .output(A2A.TaskPushNotificationConfigSchema)
    .mutation(async ({ input }) => {
      console.warn("task/pushNotificationConfig/set", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
  get: A2AProcedure.input(A2A.GetTaskPushNotificationConfigParamsSchema)
    .output(A2A.TaskPushNotificationConfigSchema)
    .query(async ({ input }) => {
      console.warn("task/pushNotificationConfig/get", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
  list: A2AProcedure.input(A2A.ListTaskPushNotificationConfigParamsSchema)
    .output(A2A.ListTaskPushNotificationConfigResultSchema)
    .query(async ({ input }) => {
      console.warn("task/pushNotificationConfig/list", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
  delete: A2AProcedure.input(A2A.DeleteTaskPushNotificationConfigParamsSchema)
    .output(z.null())
    .mutation(async ({ input }) => {
      console.warn("task/pushNotificationConfig/delete", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
});

const resubscribeRoute = A2AProcedure.input(A2A.TaskIdParamsSchema)
  .output(
    zAsyncIterable({
      yield: A2A.SendStreamingMessageSuccessResultSchema,
    })
  )
  .subscription(async function* (opts) {
    const { input } = opts;
    if (!input) {
      throw INVALID_REQUEST({ input: "No request detected" });
    }
    yield* opts.ctx.service.resubscribe(input, opts.ctx.context);
  });

const getTaskRoute = A2AProcedure.input(A2A.TaskIdParamsSchema)
  .output(A2A.TaskSchema)
  .query(async ({ input, ctx }) => {
    if (!input) {
      throw INVALID_REQUEST({ input: "No request detected" });
    }
    return await ctx.service.getTask(input);
  });

const cancelTaskRoute = A2AProcedure.input(A2A.TaskIdParamsSchema)
  .output(A2A.TaskSchema)
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
