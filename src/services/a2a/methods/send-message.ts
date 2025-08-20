import { createContext } from "../factory/context.js";
import {
  MessageSendParams,
  SendMessageSuccessResult,
  A2AEngine,
  A2AServiceInterface,
  ContextManagerInterface,
  TaskAndHistory,
  UpdateEvent,
  Context,
} from "~/types/index.js";

export async function sendMessage(
  input: MessageSendParams,
  service: A2AServiceInterface,
  agent: A2AEngine,
  contextManager: ContextManagerInterface<
    MessageSendParams,
    TaskAndHistory,
    UpdateEvent
  >,
  signal: AbortSignal
): Promise<SendMessageSuccessResult> {
  const contextId: string = input.message.contextId ?? "";
  const context: Context<MessageSendParams, TaskAndHistory, UpdateEvent> =
    await createContext(input, service, contextManager, signal, contextId);

  context.events.on("complete", () => {
    contextManager.deleteContext(context.events.contextId);
  });
  context.events.on("error", () => {
    context.events.onComplete();
  });
  await service.execute(agent, context);
  const state: TaskAndHistory = context.events.getState();
  return state.task ?? state;
}
export type SendMessageMethod = typeof sendMessage;
