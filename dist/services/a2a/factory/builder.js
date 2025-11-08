/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview A2A Agent Builder and Execution Engine Factory
 *
 * This module provides a fluent builder API for constructing A2A agents and
 * execution engines. It enables declarative definition of multi-step agent
 * workflows with type-safe step composition and automatic execution orchestration.
 *
 * @module A2ABuilder
 * @version 0.5.7
 * @since 0.5.6
 * @author The Artinet Project
 */
import { TaskState, } from "../../../types/index.js";
import { createAgent } from "./service.js";
import { v4 as uuidv4 } from "uuid";
import { getContent } from "../helpers/content.js";
/**
 * Fluent builder for constructing A2A agent execution engines.
 *
 * The EngineBuilder provides a type-safe, fluent API for composing multi-step
 * agent workflows. It supports method chaining to build complex agent behaviors
 * from individual processing steps, with automatic type inference and validation.
 *
 * @template TCommand - The command type, defaults to MessageSendParams
 * @template TInboundArgs - The arguments type received from previous steps
 *
 * @example
 * ```typescript
 * const agent = EngineBuilder.create()
 *   .text(async ({ command }) => {
 *     return `Processing: ${command.message.content}`;
 *   })
 *   .data(async ({ args }) => {
 *     return { processed: true, timestamp: Date.now() };
 *   })
 *   .text(async ({ args }) => {
 *     return `Completed at ${new Date(args[0].timestamp)}`;
 *   })
 *   .createAgent({ agentCard: myAgentCard });
 * ```
 *
 * @public
 * @since 0.5.6
 */
export class EngineBuilder {
    //@typescript-eslint/no-explicit-any
    steps = [];
    /**
     * Private constructor to enforce factory method usage.
     *
     * @param steps - Initial steps array
     */
    constructor(
    //@typescript-eslint/no-explicit-any
    steps = []) {
        this.steps = steps;
    }
    /**
     * Creates a new EngineBuilder instance.
     *
     * @template TCommand - The command type for the builder
     * @template TInboundArgs - The initial arguments type
     * @returns A new EngineBuilder instance
     *
     * @example
     * ```typescript
     * const builder = EngineBuilder.create<MyCommand, [string, number]>();
     * ```
     */
    static create() {
        return new EngineBuilder();
    }
    addStep(step) {
        return new EngineBuilder([
            ...this.steps,
            step,
        ]);
    }
    /**
     * Adds a text processing step to the workflow.
     *
     * @template TPart - The text part type
     * @template TForwardArgs - Arguments to forward to next step
     * @template TOutput - The output type of the step
     * @param step - The text step implementation
     * @returns New builder instance with updated type parameters
     *
     * @example
     * ```typescript
     * builder.text(async ({ command, args }) => {
     *   return `Hello, ${command.message.content}!`;
     * });
     * ```
     */
    text(step) {
        return this.addStep({
            step: step,
            kind: "text",
        });
    }
    /**
     * Adds a file processing step to the workflow.
     *
     * @template TPart - The file part type
     * @template TForwardArgs - Arguments to forward to next step
     * @template TOutput - The output type of the step
     * @param step - The file step implementation
     * @returns New builder instance with updated type parameters
     *
     * @example
     * ```typescript
     * builder.file(async ({ command, args }) => {
     *   return {
     *     name: 'output.txt',
     *     mimeType: 'text/plain',
     *     bytes: Buffer.from(command.message.content)
     *   };
     * });
     * ```
     */
    file(step) {
        return this.addStep({
            step: step,
            kind: "file",
        });
    }
    /**
     * Adds a data processing step to the workflow.
     *
     * @template TPart - The data part type
     * @template TForwardArgs - Arguments to forward to next step
     * @template TOutput - The output type of the step
     * @param step - The data step implementation
     * @returns New builder instance with updated type parameters
     *
     * @example
     * ```typescript
     * builder.data(async ({ command, args }) => {
     *   return {
     *     analysis: analyzeText(command.message.content),
     *     timestamp: Date.now()
     *   };
     * });
     * ```
     */
    data(step) {
        return this.addStep({
            step: step,
            kind: "data",
        });
    }
    /**
     * Creates a complete A2A agent using the built workflow.
     *
     * @param params - Agent factory parameters (excluding engine)
     * @returns Configured A2A agent instance
     *
     * @example
     * ```typescript
     * const agent = builder.createAgent({
     *   agentCard: {
     *     id: 'my-agent',
     *     name: 'Assistant Agent',
     *     capabilities: ['text-processing']
     *   }
     * });
     * ```
     */
    createAgent(params) {
        return createAgent({
            ...params,
            engine: this.createAgentEngine(),
        });
    }
    /**
     * Creates an agent execution engine from the built workflow.
     *
     * @returns Agent execution engine function
     *
     * @example
     * ```typescript
     * const engine = builder.createAgentEngine();
     * // Use engine with service execution
     * ```
     */
    createAgentEngine() {
        return createAgentExecutor(this.build());
    }
    /**
     * Builds the step list for the workflow.
     *
     * @returns Array of workflow steps
     * @throws Error if no steps have been added
     *
     * @example
     * ```typescript
     * const steps = builder.build();
     * ```
     */
    build() {
        if (this.steps.length === 0) {
            throw new Error("No steps provided");
        }
        return this.steps;
    }
}
/**
 * Convenience factory function for creating an agent builder with default parameters.
 *
 * @returns New EngineBuilder instance with MessageSendParams command type
 *
 * @example
 * ```typescript
 * const agent = AgentBuilder()
 *   .text(async ({ command }) => `Hello ${command.message.content}!`)
 *   .createAgent({ agentCard: myCard });
 * ```
 *
 * @public
 * @since 0.5.6
 */
export const AgentBuilder = () => EngineBuilder.create();
const partToMessagePart = (kind, part) => {
    switch (kind) {
        case "text": {
            return { kind: "text", text: part };
        }
        case "file": {
            const filePart = part;
            return filePart.uri
                ? {
                    kind: "file",
                    file: {
                        uri: filePart.uri,
                        name: filePart.name,
                        mimeType: filePart.mimeType,
                    },
                }
                : {
                    kind: "file",
                    file: {
                        bytes: filePart.bytes ?? "",
                        name: filePart.name,
                        mimeType: filePart.mimeType,
                    },
                };
        }
        case "data": {
            return { kind: "data", data: part };
        }
        default:
            throw new Error("Invalid part kind");
    }
};
/**
 * Creates an agent execution engine from a list of workflow steps.
 *
 * This function transforms a list of step definitions into an executable
 * agent engine that processes commands through the defined workflow,
 * yielding updates as each step completes.
 *
 * @param stepsList - Array of workflow steps to execute
 * @returns Agent execution engine function
 *
 * @example
 * ```typescript
 * const steps = [
 *   { kind: 'text', step: greetingStep },
 *   { kind: 'data', step: analysisStep }
 * ];
 * const engine = createAgentExecutor(steps);
 * ```
 *
 * @public
 * @since 0.5.6
 */
export function createAgentExecutor(stepsList) {
    return async function* (context) {
        const content = getContent(context.command.message);
        const stepArgs = {
            command: context.command,
            context: context,
            content: content,
            args: [],
        };
        const contextId = context.contextId ?? context.command.message.contextId;
        const taskId = context.State().task.id ?? context.command.message.taskId;
        if (!contextId || !taskId) {
            throw new Error("Context ID and task ID are required");
        }
        const taskStarted = {
            taskId: taskId,
            contextId: contextId,
            kind: "status-update",
            status: {
                state: TaskState.submitted,
                timestamp: new Date().toISOString(),
            },
            final: false,
        };
        yield taskStarted;
        const finalMessage = {
            taskId: taskId,
            contextId: contextId,
            messageId: uuidv4(),
            kind: "message",
            role: "agent",
            parts: [],
        };
        for (const step of stepsList) {
            const ret = await step.step({ ...stepArgs });
            let parts = [];
            if (Array.isArray(ret)) {
                parts = ret.map((part) => partToMessagePart(step.kind, part));
                const taskStatusUpdate = {
                    taskId: taskId,
                    contextId: contextId,
                    kind: "status-update",
                    status: {
                        state: TaskState.working,
                        timestamp: new Date().toISOString(),
                        message: {
                            messageId: uuidv4(),
                            kind: "message",
                            role: "agent",
                            parts: parts,
                        },
                    },
                    final: false,
                };
                yield taskStatusUpdate;
            }
            else if (typeof ret === "object") {
                parts = Array.isArray(ret.parts)
                    ? ret.parts.map((part) => partToMessagePart(step.kind, part))
                    : [partToMessagePart(step.kind, ret.parts)];
                const taskStatusUpdate = {
                    taskId: taskId,
                    contextId: contextId,
                    kind: "status-update",
                    status: {
                        state: TaskState.working,
                        timestamp: new Date().toISOString(),
                        message: {
                            messageId: uuidv4(),
                            kind: "message",
                            role: "agent",
                            parts: parts,
                        },
                    },
                    final: false,
                };
                yield taskStatusUpdate;
                stepArgs.args = ret.args;
            }
            else {
                parts = [partToMessagePart(step.kind, ret)];
                const taskStatusUpdate = {
                    taskId: taskId,
                    contextId: contextId,
                    kind: "status-update",
                    status: {
                        state: TaskState.working,
                        timestamp: new Date().toISOString(),
                        message: {
                            messageId: uuidv4(),
                            kind: "message",
                            role: "agent",
                            parts: parts,
                        },
                    },
                    final: false,
                };
                yield taskStatusUpdate;
            }
            finalMessage.parts.push(...parts);
        }
        const task = {
            kind: "task",
            id: taskId,
            contextId: contextId,
            status: {
                state: TaskState.completed,
                timestamp: new Date().toISOString(),
                message: finalMessage,
            },
        };
        yield task;
    };
}
