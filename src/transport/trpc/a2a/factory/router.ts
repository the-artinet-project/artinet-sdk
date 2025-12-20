/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { agentCardRoute } from "../routes/info.js";
import { messageRouter } from "../routes/message/route.js";
import { taskRouter } from "../routes/tasks/route.js";
import { router } from "../trpc.js";

export const createA2ARouter = () => {
  return router({
    agentCard: agentCardRoute,
    message: messageRouter,
    tasks: taskRouter,
  });
};
export type A2ARouter = Awaited<ReturnType<typeof createA2ARouter>>;
export const createAgentRouter = createA2ARouter;
export type AgentRouter = A2ARouter;
