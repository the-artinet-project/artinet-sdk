/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Agent Factory
 *
 * This module provides a fluent builder API for constructing A2A agents and
 * execution engines. It enables declarative definition of multi-step agent
 * workflows with type-safe step composition and automatic execution orchestration.
 *
 * **Key Features:**
 * - Fluent API with method chaining (`.text()`, `.data()`, `.file()`, etc.)
 * - Type-safe argument passing between steps via `args` carry pattern
 * - Multiple output types: text, file, data, message, artifact, status, task
 * - Agent-to-agent orchestration via `.sendMessage()`
 * - Static value shortcuts for simple steps
 * - Step skipping via `skip()` function
 *
 * @module AgentFactory
 * @version 0.6
 * @since 0.5.6
 * @author The Artinet Project
 */

import { A2A } from '~/types/index.js';
import * as A from './agent-builder.js';
import * as transform from './transform.js';
import { createAgent as createAgentImpl, ServiceParams } from '../services/a2a/factory/service.js';
import { describe } from './index.js';
import { Service } from '~/services/a2a/service.js';
import { MessageParams } from './message-builder.js';
import { StatusUpdateParams, ArtifactUpdateParams, TaskParams } from './task-builder.js';
import { logger } from '~/config/index.js';
import { v4 as uuidv4 } from 'uuid';
import { ServerParams as BaseServerParams } from '~/server/params.js';
import {
    FactoryParams,
    createStepEngine,
    textStep,
    fileStep,
    dataStep,
    messageStep,
    artifactStep,
    statusStep,
    taskStep,
    MessageSender,
} from './create.js';

const toFunction = <Ret extends A.AcceptedReturnValues, I extends A.bargs, C extends A.bargs, R extends A.rep<Ret, C>>(
    function_or_ret: unknown,
): A.Invocable<Ret, I, C, R> => {
    return typeof function_or_ret === 'function'
        ? (function_or_ret as A.Invocable<Ret, I, C, R>)
        : () => function_or_ret as R;
};

/**
 * Fluent builder for constructing A2A agent execution engines.
 *
 * AgentFactory provides a type-safe, fluent API for composing multi-step
 * agent workflows. It supports method chaining to build complex agent behaviors
 * from individual processing steps, with automatic type inference for carried
 * arguments between steps.
 *
 * @template I - The arguments type received from previous steps (inferred automatically)
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
export class AgentFactory<
    ServerParams extends BaseServerParams,
    ServerType extends unknown,
    I extends A.bargs = A.empty,
> implements A.AgentBuilder<I> {
    /**
     * Protected constructor to enforce factory method usage.
     * @param agentCard - The agent card to use
     * @param params - The parameters to use
     * @param steps - Initial steps array
     */
    protected constructor(
        private readonly _agentCard: A2A.AgentCard,
        private readonly _params?: FactoryParams<ServerParams>,
        //@typescript-eslint/no-explicit-any
        private readonly _steps: Array<A.Resolved<any, any, any, any, any>> = [],
        private readonly _serve: (params: {
            agent: Service;
            serverParams?: FactoryParams<ServerParams>;
        }) => ServerType = () => {
            throw new Error('Serve function not provided');
        },
    ) {}

    /**
     * Builds the step list for the workflow.
     *
     * @returns Array of workflow steps
     * @throws Error if no steps have been added
     *
     * @example
     * ```typescript
     * const steps = cr8.steps;
     * ```
     */
    //@typescript-eslint/no-explicit-any
    get steps(): Array<A.Resolved<any, any, any, any, any>> {
        return this._steps;
    }

    /**
     * The {@link A2A.AgentCard} to use
     * @returns The {@link A2A.AgentCard}
     */
    get agentCard(): A2A.AgentCard {
        return this._agentCard;
    }

    /**
     * The {@link FactoryParams} to use
     * @returns The {@link FactoryParams}
     */
    get params(): FactoryParams<ServerParams> | undefined {
        return this._params;
    }

    /**
     * Creates an agent execution engine from the built workflow.
     *
     * @returns The {@link A2A.Engine}
     *
     * @example
     * ```typescript
     * const engine = builder.engine;
     * // Use engine with service execution
     * ```
     */
    get engine(): A2A.Engine {
        return createStepEngine(this.steps);
    }

    /**
     * Creates a complete A2A agent using the built workflow.
     *
     * @param params - The {@link ServiceParams} to use
     * @returns The {@link Service}
     *
     * @example
     * ```typescript
     * const agent = cr8({
     *     id: 'my-agent',
     *     name: 'Assistant Agent',
     *     capabilities: ['text-processing']
     *   }).agent;
     * ```
     */
    get agent(): Service {
        return createAgentImpl({
            ...this._params,
            agentCard: this._agentCard,
            engine: this.engine,
        });
    }

    get server() {
        return this._serve({
            agent: this.agent,
            serverParams: this._params,
        });
    }

    from(engine: A2A.Engine = this.engine) {
        return createAgentImpl({
            ...this._params,
            agentCard: this._agentCard,
            engine: engine,
        });
    }

    serve(engine: A2A.Engine = this.engine): ServerType {
        return this._serve({
            agent: this.from(engine),
            serverParams: this._params,
        });
    }

    addStep<
        Ret extends A.AcceptedReturnValues = A.text,
        C extends A.bargs = A.empty,
        R extends A.rep<Ret, C> = A.rep<Ret, C>,
        Kind extends A.AcceptedKinds = 'text',
    >(step: A.Resolved<Ret, I, C, R, Kind>): AgentFactory<ServerParams, ServerType, A.inferCarry<R>> {
        return new AgentFactory<ServerParams, ServerType, A.inferCarry<R>>(
            this._agentCard,
            this._params,
            [...this.steps, step],
            this._serve,
        );
    }

    /**
     * Adds a text processing step to the workflow.
     *
     * Text steps are the most common step type, producing text content that
     * becomes a TextPart in the agent's response message.
     *
     * @param step - A text step function or static string value
     * @returns New builder instance with updated type parameters
     *
     * @example
     * ```typescript
     * // Static text
     * builder.text("Hello, world!")
     *
     * // Dynamic text from content
     * builder.text(({ content }) => `You said: ${content}`)
     *
     * // With carried args
     * builder.text(({ args }) => ({
     *   reply: `Processing ${args?.itemCount} items`,
     *   args: { processedAt: Date.now() }
     * }))
     * ```
     */
    public text<C extends A.bargs = A.empty>(
        text: A.text,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.text, C>>>;
    public text<C extends A.bargs = A.empty>(
        step: textStep<I, C>,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.text, C>>>;

    public text<Carry extends A.BaseArgs = A.EmptyArgs>(
        step_or_text: textStep<I, Carry> | A.Stateless<A2A.TextPart['text']>,
    ): AgentFactory<ServerParams, ServerType, A.inferCarry<A.Reply<A.Stateless<A2A.TextPart['text']>, Carry>>> {
        const stepFn: textStep<I, Carry> = toFunction(step_or_text);
        return this.addStep<
            A.Stateless<A2A.TextPart['text']>,
            Carry,
            A.Reply<A.Stateless<A2A.TextPart['text']>, Carry>,
            'text'
        >({
            id: uuidv4(),
            step: stepFn,
            kind: A2A.Kind['text'],
            handler: transform.Parts('text'),
        });
    }

    /**
     * Adds a file processing step to the workflow.
     *
     * File steps produce file content that becomes a FilePart in the agent's
     * response. Files can be specified by URI or inline bytes/base64 content.
     *
     * @param step - A file step function or static file object
     * @returns New builder instance with updated type parameters
     *
     * @example
     * ```typescript
     * // Static file by URI
     * builder.file({ uri: "https://example.com/doc.pdf" })
     *
     * // Dynamic file generation
     * builder.file(async ({ args }) => ({
     *   name: 'report.pdf',
     *   mimeType: 'application/pdf',
     *   bytes: await generatePDF(args?.data)
     * }))
     *
     * // Multiple files
     * builder.file(() => [
     *   { uri: "https://example.com/file1.pdf" },
     *   { uri: "https://example.com/file2.pdf" }
     * ])
     * ```
     */
    public file<C extends A.bargs = A.empty, R extends A.rep<A.file, C> = A.rep<A.file, C>>(
        file: A.file,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.file, C>>>;
    public file<C extends A.bargs = A.empty, R extends A.rep<A.file, C> = A.rep<A.file, C>>(
        step: fileStep<I, C>,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.file, C>>>;

    public file<Carry extends A.BaseArgs = A.EmptyArgs>(
        step_or_file: fileStep<I, Carry> | A.Stateless<A2A.FilePart['file']>,
    ): AgentFactory<ServerParams, ServerType, A.inferCarry<A.Reply<A.Stateless<A2A.FilePart['file']>, Carry>>> {
        const stepFn: fileStep<I, Carry> = toFunction(step_or_file);
        return this.addStep<
            A.Stateless<A2A.FilePart['file']>,
            Carry,
            A.Reply<A.Stateless<A2A.FilePart['file']>, Carry>,
            'file'
        >({
            id: uuidv4(),
            step: stepFn,
            kind: A2A.Kind['file'],
            handler: transform.Parts('file'),
        });
    }

    /**
     * Adds a data processing step to the workflow.
     *
     * Data steps produce structured JSON data that becomes a DataPart in the
     * agent's response. Useful for returning complex objects, API responses,
     * or any structured data.
     *
     * @param step - A data step function or static data object
     * @returns New builder instance with updated type parameters
     *
     * @example
     * ```typescript
     * // Static data
     * builder.data({ status: "ok", version: "1.0.0" })
     *
     * // Dynamic data
     * builder.data(async ({ content }) => ({
     *   analysis: await analyzeText(content),
     *   timestamp: Date.now()
     * }))
     *
     * // With carried args
     * builder.data(({ args }) => ({
     *   reply: { result: args?.computedValue * 2 },
     *   args: { doubled: true }
     * }))
     * ```
     */
    public data<C extends A.bargs = A.empty>(
        data: A.data,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.data, C>>>;
    public data<C extends A.bargs = A.empty>(
        step: dataStep<I, C>,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.data, C>>>;

    public data<Carry extends A.BaseArgs = A.EmptyArgs>(
        step_or_data: dataStep<I, Carry> | A.Stateless<A2A.DataPart['data']>,
    ): AgentFactory<ServerParams, ServerType, A.inferCarry<A.Reply<A.Stateless<A2A.DataPart['data']>, Carry>>> {
        const stepFn: dataStep<I, Carry> = toFunction(step_or_data);
        return this.addStep<
            A.Stateless<A2A.DataPart['data']>,
            Carry,
            A.Reply<A.Stateless<A2A.DataPart['data']>, Carry>,
            'data'
        >({
            id: uuidv4(),
            step: stepFn,
            kind: A2A.Kind['data'],
            handler: transform.Parts('data'),
        });
    }

    /**
     * Adds a message step to the workflow.
     *
     * Message steps yield complete A2A messages with full control over role,
     * parts, and metadata. Use when you need to construct complex multi-part
     * messages or control the message structure directly.
     *
     * @param step - A message step function or static message/string
     * @returns New builder instance with updated type parameters
     *
     * @example
     * ```typescript
     * // Simple string message
     * builder.message("Hello from the agent!")
     *
     * // Full message with parts
     * builder.message(({ context }) => ({
     *   role: "agent",
     *   parts: [
     *     { kind: "text", text: "Here are your files:" },
     *     { kind: "file", file: { uri: "https://example.com/doc.pdf" } }
     *   ]
     * }))
     *
     * // Using describe helper
     * builder.message(({ args }) => describe.message({
     *   role: "agent",
     *   parts: [{ kind: "text", text: args?.greeting }]
     * }))
     * ```
     */
    public message<C extends A.bargs = A.empty>(
        message: A.sMessage,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.sMessage, C>>>;
    public message<C extends A.bargs = A.empty>(
        step: messageStep<I, C>,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.sMessage, C>>>;

    public message<Carry extends A.BaseArgs = A.EmptyArgs>(
        step_or_message: messageStep<I, Carry> | A.Stateless<MessageParams>,
    ): AgentFactory<ServerParams, ServerType, A.inferCarry<A.Reply<A.Stateless<MessageParams>, Carry>>> {
        const stepFn: messageStep<I, Carry> = toFunction(step_or_message);
        return this.addStep<A.Stateless<MessageParams>, Carry, A.Reply<A.Stateless<MessageParams>, Carry>, 'message'>({
            id: uuidv4(),
            step: stepFn,
            kind: A2A.Kind['message'],
            handler: transform.Message(),
        });
    }

    /**
     * Adds an artifact step to the workflow.
     *
     * Artifact steps create persistent, versioned outputs that can be referenced
     * across task sessions. Use for documents, generated files, or content that
     * clients may need to retrieve later.
     *
     * @param step - An artifact step function or static artifact object
     * @returns New builder instance with updated type parameters
     *
     * @example
     * ```typescript
     * // Static artifact
     * builder.artifact(describe.artifact({
     *   artifactId: "report-001",
     *   parts: [{ kind: "text", text: "Report content" }]
     * }))
     *
     * // Dynamic artifact
     * builder.artifact(async ({ context, args }) => ({
     *   artifactId: `analysis-${context.taskId}`,
     *   name: "Analysis Results",
     *   parts: [{ kind: "data", data: args?.analysisData }]
     * }))
     * ```
     */
    public artifact<C extends A.bargs = A.empty>(
        step: artifactStep<I, C>,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.sArtifact, C>>>;
    public artifact<C extends A.bargs = A.empty>(
        artifact: A.sArtifact,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.sArtifact, C>>>;

    public artifact<Carry extends A.BaseArgs = A.EmptyArgs>(
        step_or_artifact: artifactStep<I, Carry> | A.Stateless<ArtifactUpdateParams>,
    ): AgentFactory<ServerParams, ServerType, A.inferCarry<A.Reply<A.Stateless<ArtifactUpdateParams>, Carry>>> {
        const stepFn: artifactStep<I, Carry> = toFunction(step_or_artifact);
        return this.addStep<
            A.Stateless<ArtifactUpdateParams>,
            Carry,
            A.Reply<A.Stateless<ArtifactUpdateParams>, Carry>,
            'artifact-update'
        >({
            id: uuidv4(),
            step: stepFn,
            kind: A2A.Kind['artifact-update'],
            handler: transform.Artifact(),
        });
    }

    /**
     * Adds a status update step to the workflow.
     *
     * Status steps emit task state updates during execution. Use to communicate
     * progress, intermediate states, or completion to clients. Supports simple
     * state strings or full status objects with messages.
     *
     * @param step - A status step function, status object, or state string
     * @returns New builder instance with updated type parameters
     *
     * @example
     * ```typescript
     * // Simple state string
     * builder.status("working")
     *
     * // Status with message
     * builder.status(({ args }) => ({
     *   status: {
     *     state: A2A.TaskState.working,
     *     message: describe.message(`Step ${args?.step} of 5 complete`)
     *   }
     * }))
     *
     * // Mark completion
     * builder.status(() => ({
     *   status: { state: A2A.TaskState.completed }
     * }))
     * ```
     */
    public status<C extends A.bargs = A.empty>(
        status: A.sUpdate,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.sUpdate, C>>>;
    public status<C extends A.bargs = A.empty>(
        step: statusStep<I, C>,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.sUpdate, C>>>;

    public status<Carry extends A.BaseArgs = A.EmptyArgs>(
        step_or_status: statusStep<I, Carry> | A.Stateless<StatusUpdateParams>,
    ): AgentFactory<ServerParams, ServerType, A.inferCarry<A.Reply<A.Stateless<StatusUpdateParams>, Carry>>> {
        const stepFn: statusStep<I, Carry> = toFunction(step_or_status);
        return this.addStep<
            A.Stateless<StatusUpdateParams>,
            Carry,
            A.Reply<A.Stateless<StatusUpdateParams>, Carry>,
            'status-update'
        >({
            id: uuidv4(),
            step: stepFn,
            kind: A2A.Kind['status-update'],
            handler: transform.Status(),
        });
    }

    /**
     * Adds a task step to the workflow.
     *
     * Task steps yield complete A2A task objects. Use when you need full control
     * over the task representation, including status, artifacts, and history.
     * Particularly useful for orchestration scenarios or final task construction.
     *
     * @param step - A task step function, task object, or string
     * @returns New builder instance with updated type parameters
     *
     * @example
     * ```typescript
     * // Simple string (auto-converted to task)
     * builder.task("Operation completed")
     *
     * // Full task object
     * builder.task(({ context }) => describe.task({
     *   id: context.taskId,
     *   contextId: context.contextId,
     *   status: { state: A2A.TaskState.completed }
     * }))
     *
     * // With carried args
     * builder.task(({ context }) => ({
     *   reply: describe.task({ id: context.taskId }),
     *   args: { completedAt: Date.now() }
     * }))
     * ```
     */
    public task<C extends A.bargs = A.empty>(
        task: A.sTask,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.sTask, C>>>;
    public task<C extends A.bargs = A.empty>(
        step: taskStep<I, C>,
    ): AgentFactory<ServerParams, ServerType, A.inC<A.rep<A.sTask, C>>>;

    public task<Carry extends A.BaseArgs = A.EmptyArgs>(
        step_or_task_or_string: taskStep<I, Carry> | A.Stateless<TaskParams> | string,
    ): AgentFactory<ServerParams, ServerType, A.inferCarry<A.Reply<A.Stateless<TaskParams>, Carry>>> {
        const stepFn: taskStep<I, Carry> = toFunction(step_or_task_or_string);
        return this.addStep<A.Stateless<TaskParams>, Carry, A.Reply<A.Stateless<TaskParams>, Carry>, 'task'>({
            id: uuidv4(),
            step: stepFn,
            kind: 'task',
            handler: transform.Task(),
        });
    }

    /**
     * Adds an agent-to-agent orchestration step to the workflow.
     *
     * This step sends a message to another agent (local Service or remote A2A Server)
     * and yields the response as a task. Enables multi-agent workflows where one
     * agent delegates work to others.
     *
     * **Note:** This is currently a blocking call. Streaming responses are not
     * yet supported in orchestration steps.
     * @note Args passed from the previous step are inserted, by default,
     *  (`unshift`) as `DataPart`s onto the forwarded `Message`.`Parts`.
     *
     * @param agent - The target agent (Agent or AgentMessenger)
     * @param message - Message to send (defaults to context.userMessage)
     * @returns New builder instance with task carry args (args.task)
     *
     * @example
     * ```typescript
     * // Delegate to another agent
     * const orchestrator = cr8("Orchestrator")
     *   .text("Starting workflow...")
     *   .sendMessage({ agent: analysisAgent, message: "Analyze this data" })
     *   .text(({ args }) => `Analysis result: ${args?.task?.status.state}`)
     *   .agent;
     *
     * // Chain multiple agents
     * const pipeline = cr8("Pipeline")
     *   .sendMessage({ agent: preprocessor })
     *   .sendMessage({ agent: analyzer })
     *   .sendMessage({ agent: postprocessor })
     *   .text(({ args }) => `Final result: ${args?.task?.status.message}`)
     *   .agent;
     *
     * // Forward user's message to another agent
     * const proxy = cr8("Proxy")
     *   .sendMessage({ agent: targetAgent }) // uses context.userMessage
     *   .agent;
     * ```
     */
    public sendMessage<Carry extends A.BaseArgs = { task?: A2A.Task }>(agent_and_message: {
        agent: MessageSender;
        message?: A.sMessage | string;
    }): AgentFactory<ServerParams, ServerType, A.inferCarry<A.Reply<A.Stateless<TaskParams>, Carry>>> {
        const stepFn: taskStep<I, Carry> = async ({ context, args }) => {
            logger.info('sendMessage: Sending message: ', {
                agent: agent_and_message.agent.constructor.name,
            });
            const messageSendParams: A2A.MessageSendParams = describe.messageSendParams(
                agent_and_message.message ?? structuredClone(context.userMessage),
            );

            if (args) {
                /**We extract the parts of the first A2A protocol object we encounter in the args */
                if (args.task || args.message || args.update) {
                    const parts: A2A.Part[] = [];
                    if (args.message) {
                        parts.push(...(A2A.MessageSchema.safeParse(args.message).data?.parts ?? []));
                    }
                    if (args.task) {
                        parts.push(...(A2A.TaskSchema.safeParse(args.task).data?.status?.message?.parts ?? []));
                    }
                    if (args.update) {
                        parts.push(
                            ...(A2A.TaskStatusUpdateEventSchema.safeParse(args.update).data?.status?.message?.parts ??
                                []),
                        );
                        parts.push(
                            ...(A2A.TaskArtifactUpdateEventSchema.safeParse(args.update).data?.artifact?.parts ?? []),
                        );
                    }
                    parts.forEach((part) => {
                        messageSendParams.message.parts.unshift(part);
                    });
                } else {
                    messageSendParams.message.parts.unshift(describe.part.data({ ...args }));
                }
            }

            const response: A2A.SendMessageSuccessResult | null = await agent_and_message.agent
                .sendMessage(messageSendParams)
                .catch((error) => {
                    logger.error('sendMessage: Error sending message: ', error);
                    return null;
                });

            if (!response) {
                logger.warn('sendMessage: No response from agent');
            }

            const task: A2A.Task = response
                ? describe.task({
                      ...response,
                      taskId: context.taskId,
                      contextId: context.contextId,
                  })
                : describe.task({
                      taskId: context.taskId,
                      contextId: context.contextId,
                      state: A2A.TaskState.working,
                      message: describe.message('No response from agent'),
                  });
            return {
                reply: task,
                args: {
                    task,
                },
            };
        };

        return this.addStep<A.Stateless<TaskParams>, Carry, A.Reply<A.Stateless<TaskParams>, Carry>, 'task'>({
            id: uuidv4(),
            step: stepFn,
            kind: 'task',
            handler: transform.Task(),
        });
    }
}
