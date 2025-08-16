import { router } from "../../transport.js";
import { resubscribeRoute } from "./resubscribe.js";
import { getTaskRoute } from "./get.js";
import { cancelTaskRoute } from "./cancel.js";
import { z } from "zod/v4";
import {
  TaskPushNotificationConfigSchema,
  GetTaskPushNotificationConfigParamsSchema,
  ListTaskPushNotificationConfigsParamsSchema,
  DeleteTaskPushNotificationConfigParamsSchema,
  ListTaskPushNotificationConfigResultSchema,
} from "../../../../types/index.js";
import { PUSH_NOTIFICATION_NOT_SUPPORTED } from "../../../../utils/index.js";
import { serviceProcedure } from "../../procedures/service.js";

const pushNotificationConfigRouter = router({
  set: serviceProcedure
    .input(TaskPushNotificationConfigSchema)
    .output(TaskPushNotificationConfigSchema)
    .mutation(async ({ input }) => {
      console.log("task/pushNotificationConfig/set", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
  get: serviceProcedure
    .input(GetTaskPushNotificationConfigParamsSchema)
    .output(TaskPushNotificationConfigSchema)
    .query(async ({ input }) => {
      console.log("task/pushNotificationConfig/get", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
  list: serviceProcedure
    .input(ListTaskPushNotificationConfigsParamsSchema)
    .output(ListTaskPushNotificationConfigResultSchema)
    .query(async ({ input }) => {
      console.log("task/pushNotificationConfig/list", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
  delete: serviceProcedure
    .input(DeleteTaskPushNotificationConfigParamsSchema)
    .output(z.null())
    .mutation(async ({ input }) => {
      console.log("task/pushNotificationConfig/delete", input);
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }),
});

export const taskRouter = router({
  resubscribe: resubscribeRoute,
  get: getTaskRoute,
  cancel: cancelTaskRoute,
  pushNotificationConfig: pushNotificationConfigRouter,
});
