import {
  ServerDeploymentRequestParams,
  ServerDeploymentResponse,
  TestServerDeploymentRequest,
  A2ARequest,
  JSONRPCResponse,
  Task,
  SendTaskRequest,
} from "../../types/index.js";
import { A2AClient } from "../../client/a2a-client.js";
import { executeStreamEvents } from "../../transport/index.js";
import { logDebug } from "../../index.js";

const testExecuteStreamEvents = executeStreamEvents as <
  Req extends A2ARequest | TestServerDeploymentRequest,
  StreamRes extends JSONRPCResponse | ServerDeploymentResponse,
>(
  baseUrl: URL,
  method: Req["method"],
  params: Req["params"],
  customHeaders: Record<string, string>
) => AsyncIterable<NonNullable<StreamRes["result"]>>;

export async function* testDeployment(
  params: ServerDeploymentRequestParams,
  requests: SendTaskRequest[]
): AsyncIterable<Task | ServerDeploymentResponse | null> {
  const generator = await testExecuteStreamEvents(
    new URL("https://agents.artinet.io/test/deploy"),
    "/test/deploy" as any,
    params as any,
    {}
  );

  const requestExecutor = async (url: string) =>
    async function* () {
      const testClient = new A2AClient(url);
      for (const request of requests) {
        const task = await testClient.sendTask({
          id: request.params.id,
          message: request.params.message,
        });
        logDebug("testDeployment", "task: ", task);
        yield task;
      }
    };

  for await (const event of generator) {
    const deploymentEvent: ServerDeploymentResponse =
      event as ServerDeploymentResponse;
    if (
      deploymentEvent.result &&
      deploymentEvent.result.deploymentId &&
      deploymentEvent.result.url
    ) {
      logDebug("testDeployment", "deployment-event: ", deploymentEvent);
      yield event;
      const innerGenerator = await requestExecutor(deploymentEvent.result.url);
      for await (const task of innerGenerator()) {
        yield task;
      }
    } else {
      yield event;
      logDebug("testDeployment", "event-received: ", event);
    }
  }
}
