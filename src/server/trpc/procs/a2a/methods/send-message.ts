import { createExecutionContext } from "../../../procedures/service.js";
import {
  MessageSendParams,
  SendMessageSuccessResult,
} from "../../../../../types/index.js";
import {
  A2AServiceInterface,
  ContextManagerInterface,
  ExecutionEngine,
} from "../../../protocol/index.js";

export async function sendMessage(
  input: MessageSendParams,
  signal: AbortSignal,
  service: A2AServiceInterface,
  engine: ExecutionEngine,
  contextManager: ContextManagerInterface
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
  await service.execute(engine, context);
  const state = context.events.getState();
  return state?.task ?? state;
}
