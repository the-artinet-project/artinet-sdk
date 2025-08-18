import { createExecutionContext } from "../../../procedures/service.js";
import {
  MessageSendParams,
  SendMessageSuccessResult,
  AgentEngine,
} from "../../../../../types/index.js";
import {
  A2AServiceInterface,
  ContextManagerInterface,
} from "../../../protocol/index.js";

export async function sendMessage(
  input: MessageSendParams,
  service: A2AServiceInterface,
  agent: AgentEngine,
  contextManager: ContextManagerInterface,
  signal: AbortSignal
): Promise<SendMessageSuccessResult> {
  const contextId = input.message.contextId;
  const context = await createExecutionContext(
    input.message,
    service,
    contextManager,
    signal,
    contextId
  );

  context.events.on("complete", () => {
    contextManager.deleteContext(context.events.contextId);
  });
  context.events.on("error", () => {
    context.events.onComplete();
  });
  await service.execute(agent, context);
  const state = context.events.getState();
  return state?.task ?? state;
}
