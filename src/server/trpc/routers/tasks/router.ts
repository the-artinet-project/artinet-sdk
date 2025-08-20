import { router } from "../../transport.js";
import { z } from "zod/v4";
import {
  TaskPushNotificationConfigSchema,
  GetTaskPushNotificationConfigParamsSchema,
  ListTaskPushNotificationConfigsParamsSchema,
  DeleteTaskPushNotificationConfigParamsSchema,
  ListTaskPushNotificationConfigResultSchema,
  TaskIdParamsSchema,
  TaskSchema,
  SendStreamingMessageSuccessResultSchema,
} from "../../../../types/index.js";
import {
  INVALID_REQUEST,
  PUSH_NOTIFICATION_NOT_SUPPORTED,
} from "../../../../utils/index.js";
import { agentProcedure } from "../../procedures/service.js";
import { zAsyncIterable } from "../../zAsyncIterable.js";
import { A2AServiceImpl } from "../../protocol/index.js";

const pushNotificationConfigRouter = router({
  set: agentProcedure
    .input(TaskPushNotificationConfigSchema)
    .output(TaskPushNotificationConfigSchema)
    .mutation(async ({ input }) => {
      console.log("task/pushNotificationConfig/set", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
  get: agentProcedure
    .input(GetTaskPushNotificationConfigParamsSchema)
    .output(TaskPushNotificationConfigSchema)
    .query(async ({ input }) => {
      console.log("task/pushNotificationConfig/get", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
  list: agentProcedure
    .input(ListTaskPushNotificationConfigsParamsSchema)
    .output(ListTaskPushNotificationConfigResultSchema)
    .query(async ({ input }) => {
      console.log("task/pushNotificationConfig/list", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
  delete: agentProcedure
    .input(DeleteTaskPushNotificationConfigParamsSchema)
    .output(z.null())
    .mutation(async ({ input }) => {
      console.log("task/pushNotificationConfig/delete", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
});

const resubscribeRoute = agentProcedure
  .input(TaskIdParamsSchema)
  .output(
    zAsyncIterable({
      yield: SendStreamingMessageSuccessResultSchema,
    })
  )
  .subscription(async function* (opts) {
    const { input } = opts;
    if (!input) {
      throw INVALID_REQUEST({ input: "No input" });
    }
    yield* (opts.ctx.service as A2AServiceImpl).resubscribe(
      input,
      opts.ctx.engine,
      opts.signal
    );
  });

const getTaskRoute = agentProcedure
  .input(TaskIdParamsSchema)
  .output(TaskSchema)
  .query(async ({ input, ctx }) => {
    return await (ctx.service as A2AServiceImpl).getTask(input);
  });

const cancelTaskRoute = agentProcedure
  .input(TaskIdParamsSchema)
  .output(TaskSchema)
  .mutation(async ({ input, ctx }) => {
    return await (ctx.service as A2AServiceImpl).cancelTask(input);
  });

export const taskRouter = router({
  resubscribe: resubscribeRoute,
  get: getTaskRoute,
  cancel: cancelTaskRoute,
  pushNotificationConfig: pushNotificationConfigRouter,
});
