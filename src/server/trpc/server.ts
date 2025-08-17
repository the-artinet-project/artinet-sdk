import { globalRepository } from "./repository.js";
import { agentFAQRouter } from "./routers/agentFAQ.js";
import { messageRouter } from "./routers/message/router.js";
import { taskRouter } from "./routers/tasks/router.js";
import { router } from "./transport.js";

export const agentRouter = router({
  agentCard: agentFAQRouter,
  message: messageRouter,
  tasks: taskRouter,
});
export type AgentRouter = typeof agentRouter;
export { globalRepository };
