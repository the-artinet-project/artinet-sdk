import { AgentCardSchema } from "../../../types/index.js";
import { serviceProcedure } from "../procedures/service.js";

export const agentFAQRouter = serviceProcedure
  .output(AgentCardSchema)
  .query(async ({ ctx }) => {
    return ctx.service.getAgentCard();
  });
