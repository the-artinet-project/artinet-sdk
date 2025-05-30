import {
  ServerDeploymentRequestParams,
  ServerDeploymentResponse,
  TestServerDeploymentRequest,
  A2ARequest,
  JSONRPCResponse,
  Task,
  SendMessageRequest,
} from "../../types/index.js";
import { A2AClient } from "../../client/a2a-client.js";
import { executeStreamEvents } from "../../transport/index.js";
import { logDebug } from "../../index.js";

/**
 * @fileoverview Provides a utility for testing agent deployments.
 * This module allows developers to simulate the deployment of an agent's code
 * to a sandboxed environment and then send test tasks to it to verify its behavior.
 */

const testExecuteStreamEvents = executeStreamEvents as <
  Req extends A2ARequest | TestServerDeploymentRequest,
  StreamRes extends JSONRPCResponse | ServerDeploymentResponse,
>(
  baseUrl: URL,
  method: Req["method"],
  params: Req["params"],
  customHeaders: Record<string, string>
) => AsyncIterable<NonNullable<StreamRes["result"]>>;

/**
 * Tests an agent deployment by sending its code to a test deployment endpoint
 * and then issuing a series of test task requests to the deployed agent.
 *
 * This function first initiates a deployment to `https://agents.artinet.io/test/deploy`,
 * streaming deployment status events. Once a successful deployment event with a URL
 * is received, it creates an `A2AClient` for that URL and sends each of the provided
 * `SendTaskRequest`s to the deployed agent.
 *
 * It yields all events from the deployment stream and all resulting tasks from the
 * test requests.
 *
 * @param params - The parameters for the server deployment, including the agent's
 *                 name, agent card, and the bundled code.
 * @param requests - An array of `SendTaskRequest` objects to be sent to the
 *                   deployed agent for testing.
 * @returns An asynchronous iterable that yields `ServerDeploymentResponse` events
 *          during the deployment phase, and `Task` objects resulting from the
 *          test requests. Yields `null` for other event types not explicitly handled.
 */
export async function* testDeployment(
  params: ServerDeploymentRequestParams,
  requests: SendMessageRequest[]
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
      deploymentEvent &&
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
