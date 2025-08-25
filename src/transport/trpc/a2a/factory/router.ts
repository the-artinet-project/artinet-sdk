/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { agentInfoRoute } from "../routes/info.js";
import { messageRouter } from "../routes/message/route.js";
import { taskRouter } from "../routes/tasks/route.js";
import { router } from "../trpc.js";

export interface CreateA2ARouterParams {}
//eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createA2ARouter = (_params: CreateA2ARouterParams) => {
  return router({
    agentCard: agentInfoRoute,
    message: messageRouter,
    tasks: taskRouter,
  });
};
export type A2ARouter = Awaited<ReturnType<typeof createA2ARouter>>;
