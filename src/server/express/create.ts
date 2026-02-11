/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { FactoryParams as BaseFactoryParams } from '../../create/create.js';
import { BaseArgs, EmptyArgs } from '../../create/agent-builder.js';
import { AgentFactory as BaseAgentFactory } from '../../create/factory.js';
import { describe } from '../../create/index.js';
import { ServerParams as ExpressServerParams, ExpressAgentServer, serve } from './server.js';

export type FactoryParams = BaseFactoryParams<ExpressServerParams>;

/**
 * Fluent builder for constructing A2A agent execution engines.
 *
 * AgentFactory provides a type-safe, fluent API for composing multi-step
 * agent workflows. It supports method chaining to build complex agent behaviors
 * from individual processing steps, with automatic type inference for carried
 * arguments between steps.
 *
 * @template InputArguments - The arguments type received from previous steps (inferred automatically)
 *
 * @example
 * ```typescript
 * // Basic agent with text steps
 * const agent = cr8("MyAgent")
 *   .text(({ content }) => `You said: ${content}`)
 *   .agent;
 *
 * // Agent with carried args between steps
 * const agent = cr8("AnalysisAgent")
 *   .text(({ content }) => ({
 *     reply: `Analyzing: ${content}`,
 *     args: { originalContent: content }
 *   }))
 *   .data(({ args }) => ({
 *     wordCount: args?.originalContent?.split(' ').length,
 *     timestamp: Date.now()
 *   }))
 *   .text(({ args }) => `Analysis complete: ${args?.wordCount} words`)
 *   .agent;
 *
 * // Agent-to-agent orchestration
 * const orchestrator = cr8("Orchestrator")
 *   .text("Starting multi-agent workflow...")
 *   .sendMessage({ agent: otherAgent, message: "Process this" })
 *   .text(({ args }) => `Got result: ${args?.task?.status.state}`)
 *   .agent;
 * ```
 *
 * @public
 * @since 0.5.6
 */
export class AgentFactory<InputArguments extends BaseArgs = EmptyArgs> extends BaseAgentFactory<
    ExpressServerParams,
    ExpressAgentServer,
    InputArguments
> {
    /**
     * Creates a new AgentFactory instance.
     *
     * @template Input - The initial arguments type
     * @returns A new AgentFactory instance
     *
     * @example
     * ```typescript
     * const factory = AgentFactory.create(myCard, { params });
     * ```
     */
    static create(agentCard: describe.AgentCardParams, params?: FactoryParams) {
        return new AgentFactory<EmptyArgs>(describe.card(agentCard), params, [], ({ agent, serverParams }) =>
            serve({ agent, ...serverParams }),
        );
    }
}

/**
 * Creates a new AgentFactory instance for building agent workflows.
 *
 * This is the primary entry point for the fluent builder API. Accepts an
 * agent card (or name string) and optional factory parameters.
 *
 * @param agentCard - Agent card object or name string
 * @param params - Optional factory parameters (basePath, port, etc.)
 * @returns New AgentFactory instance
 *
 * @example
 * ```typescript
 * // Simple agent with name string
 * const agent = cr8("MyAgent")
 *   .text(({ content }) => `Echo: ${content}`)
 *   .agent;
 *
 * // Agent with full card and params
 * const agent = cr8(myAgentCard, { basePath: "/api" })
 *   .text("Hello!")
 *   .data(({ content }) => analyzeContent(content))
 *   .agent;
 *
 * // Get the engine directly
 * const engine = cr8("Processor")
 *   .text("Processing...")
 *   .engine;
 *
 * // Create and start server
 * const server = cr8("ServerAgent", { port: 3000 })
 *   .text("Ready to serve!")
 *   .server.start();
 * ```
 *
 * @public
 * @since 0.6.0
 */
export const cr8 = AgentFactory.create;

/**
 * @deprecated Use {@link cr8} instead
 * @note This export exists only to alert users that `AgentBuilder` is deprecated.
 * `AgentBuilder` no longer comes with the `createAgent` method.
 * @since 0.6.0
 */
export class AgentBuilder extends AgentFactory {
    constructor(agentCard: describe.AgentCardParams | string = 'default', params?: FactoryParams) {
        super(describe.card(typeof agentCard === 'string' ? { name: agentCard } : agentCard), params);
    }
}

export type {
    textStep,
    fileStep,
    dataStep,
    messageStep,
    artifactStep,
    statusStep,
    taskStep,
    MessageSender,
} from '~/create/create.js';

export { createStepEngine } from '~/create/create.js';
