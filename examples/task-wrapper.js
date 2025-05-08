export const taskHandlerProxy = async (taskHandler) => {
  if (!env.hostOnYield && !env.Context) {
    const err = new Error("invalid runtime environment");
    throw err;
  }
  const context = env.Context;
  const onYieldProxy = env.hostOnYield;

  if (!onYieldProxy || !context) {
    const err = new Error("invalid runtime environment");
    throw err;
  }
  const generator = taskHandler(context);
  for await (const yieldValue of generator) {
    onYieldProxy(yieldValue);
  }
};

export const fetchResponseProxy = async (agentID, messages) => {
  if (!env.hostFetchResponse) {
    const err = new Error("invalid runtime environment");
    throw err;
  }
  const fetchResponseImpl = env.hostFetchResponse;
  return fetchResponseImpl(agentID, messages);
};
