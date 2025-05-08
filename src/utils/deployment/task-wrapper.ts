import { Task, TaskContext, TaskYieldUpdate } from "../../index.js";
import { env } from "process";

export const taskHandlerProxy = async (
  taskHandler: (
    context: TaskContext
  ) => AsyncGenerator<TaskYieldUpdate, Task | void, unknown>
) => {
  if (!env.hostOnYield && !env.Context) {
    const err = new Error("invalid runtime environment");
    throw err;
  }
  const context = env.Context as unknown as TaskContext;
  const onYieldProxy = env.hostOnYield as unknown as (
    yieldValue: TaskYieldUpdate
  ) => Promise<void>;

  if (!onYieldProxy || !context) {
    const err = new Error("invalid runtime environment");
    throw err;
  }
  const generator = taskHandler(context);
  for await (const yieldValue of generator) {
    onYieldProxy(yieldValue);
  }
};

export const fetchResponseProxy = async (
  agentID: string,
  messages: { role: string; content: string }[]
): Promise<string> => {
  if (!env.hostFetchResponse) {
    const err = new Error("invalid runtime environment");
    throw err;
  }
  const fetchResponseImpl = env.hostFetchResponse as unknown as (
    agentID: string,
    messages: { role: string; content: string }[]
  ) => Promise<string>;
  return fetchResponseImpl(agentID, messages);
};
