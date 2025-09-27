/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { ServerDeploymentRequestParams, ServerDeploymentSuccessResponseParams } from "../../types/schemas/deployment/index.js";
import { Task, SendMessageRequest, Message } from "../../types/index.js";
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
export declare function testDeployment(params: ServerDeploymentRequestParams, requests: SendMessageRequest[]): AsyncIterable<Message | Task | ServerDeploymentSuccessResponseParams | null>;
//# sourceMappingURL=test-deployment.d.ts.map