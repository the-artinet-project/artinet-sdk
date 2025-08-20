import { globalRepository } from "./repository.js";
import { agentInfoRoute } from "./routers/agentFAQ.js";
import { messageRouter } from "./routers/message/router.js";
import { taskRouter } from "./routers/tasks/router.js";
import { router } from "./transport.js";

export interface CreateAgentRouterParams {}

export const createAgentRouter = (params: CreateAgentRouterParams) => {
  return router({
    agentCard: agentInfoRoute,
    message: messageRouter,
    tasks: taskRouter,
  });
};

export type AgentRouter = Awaited<ReturnType<typeof createAgentRouter>>;
export { globalRepository };
