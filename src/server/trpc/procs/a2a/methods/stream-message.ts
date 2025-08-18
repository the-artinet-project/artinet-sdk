import {
  AgentEngine,
  MessageSendParams,
  TaskState,
} from "../../../../../types/index.js";
import { ExecutionStream } from "../../../protocol/stream.js";
import { createExecutionContext } from "../../../procedures/service.js";
import {
  SUBMITTED_UPDATE,
  WORKING_UPDATE,
} from "../../../../../utils/index.js";
import { A2AServiceInterface } from "../interfaces/service.js";
import { ContextManagerInterface } from "../../../protocol/index.js";

export async function* streamMessage(
  input: MessageSendParams,
  service: A2AServiceInterface,
  agent: AgentEngine,
  contextManager: ContextManagerInterface,
  signal: AbortSignal
) {
  let contextId = input.message.contextId;
  const context = await createExecutionContext(
    input.message,
    service,
    contextManager,
    signal,
    contextId
  );

  const stream = new ExecutionStream(context);
  contextId = stream.getContextId();

  context.events.on("update", async (currentState, nextState) => {
    if (signal?.aborted) {
      service.addCancellation(contextId);
      return;
    }
    stream.addUpdate(nextState);
  });

  context.events.on("complete", () => {
    contextManager.deleteContext(contextId);
    stream.setCompleted();
  });

  context.events.on("error", () => {
    context.events.onComplete();
  });

  context.events.on("start", (request, currentState) => {
    let update =
      currentState?.task ?? SUBMITTED_UPDATE(context.command.taskId, contextId);
    stream.addUpdate({
      ...update,
      status: {
        ...update.status,
        state: TaskState.submitted,
      },
    });
    stream.addUpdate(WORKING_UPDATE(context.command.taskId, contextId)); //don't know why I was sending this working update here
  });
  yield* stream.stream(agent, service);
}
