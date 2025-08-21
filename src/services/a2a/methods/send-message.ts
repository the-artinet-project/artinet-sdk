import { createContext } from "../factory/context.js";
import {
  MessageSendParams,
  SendMessageSuccessResult,
  TaskAndHistory,
  UpdateEvent,
  CoreContext,
  MethodParams,
} from "~/types/index.js";

export async function sendMessage(
  input: MessageSendParams,
  params: MethodParams
): Promise<SendMessageSuccessResult> {
  const { service, agent, contextManager, signal } = params;
  const contextId: string = input.message.contextId ?? "";
  const context: CoreContext<MessageSendParams, TaskAndHistory, UpdateEvent> =
    await createContext(
      input,
      service,
      contextManager,
      signal,
      contextId,
      service.eventOverrides
    );

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
