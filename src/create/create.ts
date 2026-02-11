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
 * **Key Features:**
 * - Fluent API with method chaining (`.text()`, `.data()`, `.file()`, etc.)
 * - Type-safe argument passing between steps via `args` carry pattern
 * - Multiple output types: text, file, data, message, artifact, status, task
 * - Agent-to-agent orchestration via `.sendMessage()`
 * - Static value shortcuts for simple steps
 * - Step skipping via `skip()` function
 *
 * **Basic Usage:**
 * ```typescript
 * import { cr8 } from "@artinet/sdk";
 *
 * const agent = cr8("MyAgent")
 *   .text(({ content }) => `You said: ${content}`)
 *   .data(({ content }) => ({ length: content?.length }))
 *   .agent;
 * ```
 *
 * @module A2ABuilder
 * @version 0.6
 * @since 0.5.6
 * @author The Artinet Project
 */

import { A2A } from '~/types/index.js';
import * as A from './agent-builder.js';
import * as transform from './transform.js';
import { ServiceParams } from '../services/a2a/factory/service.js';
import { describe } from './index.js';
import { extractTextContent } from '../services/a2a/helpers/content.js';
import { MessageParams } from './message-builder.js';
import { StatusUpdateParams, ArtifactUpdateParams, TaskParams } from './task-builder.js';
import { logger } from '~/config/index.js';
import { formatJson } from '~/utils/utils.js';
import { isProcessing } from '~/utils/constants.js';
import { ServerParams as BaseServerParams } from '~/server/params.js';

export interface MessageSender {
    sendMessage(params: A2A.MessageSendParams): Promise<A2A.SendMessageSuccessResult>;
}

/**
 * Type alias for text-based workflow steps.
 *
 * This type represents a step that processes or generates text content
 * within an agent workflow. Text steps are the most common type of step
 * and are used for message processing, content generation, and text-based
 * decision making.
 *
 * @template Input - Arguments received from previous step
 * @template Carry - Arguments passed to next step
 *
 * @example
 * ```typescript
 * // Simple text return
 * const greetingStep: textStep = async ({ content }) => {
 *   return `Hello! You said: ${content}`;
 * };
 *
 * // With carry args for next step
 * const analyzeStep: textStep = async ({ content }) => {
 *   return {
 *     reply: `Analyzed: ${content}`,
 *     args: { sentiment: 'positive', length: content?.length ?? 0 }
 *   };
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
export type textStep<Input extends A.bargs = A.empty, Carry extends A.bargs = A.empty> = A.Step<
    A2A.TextPart['text'],
    Input,
    Carry
>;

/**
 * Type alias for file-based workflow steps.
 *
 * This type represents a step that processes or generates file content
 * within an agent workflow. File steps handle document processing,
 * file generation, and file-based data operations.
 *
 * @template Input - Arguments received from previous step
 * @template Carry - Arguments passed to next step
 *
 * @example
 * ```typescript
 * // Return file with URI
 * const downloadStep: fileStep = async ({ content }) => {
 *   return { uri: `https://example.com/files/${content}.pdf` };
 * };
 *
 * // Return file with bytes
 * const generateStep: fileStep = async ({ args }) => {
 *   return {
 *     name: 'report.pdf',
 *     mimeType: 'application/pdf',
 *     bytes: generatePDF(args?.data)
 *   };
 * };
 *
 * // Return multiple files
 * const batchStep: fileStep = async () => {
 *   return [
 *     { uri: 'https://example.com/file1.pdf' },
 *     { uri: 'https://example.com/file2.pdf' }
 *   ];
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
export type fileStep<Input extends A.bargs = A.empty, Carry extends A.bargs = A.empty> = A.Step<
    A2A.FilePart['file'],
    Input,
    Carry
>;

/**
 * Type alias for data-based workflow steps.
 *
 * This type represents a step that processes or generates structured data
 * within an agent workflow. Data steps handle JSON processing, API responses,
 * and structured data transformations.
 *
 * @template Input - Arguments received from previous step
 * @template Carry - Arguments passed to next step
 *
 * @example
 * ```typescript
 * // Return structured data
 * const analyzeStep: dataStep = async ({ content }) => {
 *   const analysis = await analyzeMessage(content);
 *   return {
 *     sentiment: analysis.sentiment,
 *     entities: analysis.entities,
 *     confidence: analysis.confidence
 *   };
 * };
 *
 * // With carry args
 * const processStep: dataStep = async ({ args }) => {
 *   return {
 *     reply: { processed: true, input: args?.rawData },
 *     args: { processedAt: Date.now() }
 *   };
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
export type dataStep<Input extends A.bargs = A.empty, Carry extends A.bargs = A.empty> = A.Step<
    A2A.DataPart['data'],
    Input,
    Carry
>;

/**
 * Type alias for message-based workflow steps.
 *
 * This type represents a step that constructs or transforms complete A2A messages.
 * Message steps are useful when you need full control over the message structure,
 * including role, parts, and metadata.
 *
 * @template Input - Arguments received from previous step
 * @template Carry - Arguments passed to next step
 *
 * @example
 * ```typescript
 * // Return a string (auto-converted to message)
 * const simpleStep: messageStep = async () => {
 *   return "Hello from the agent!";
 * };
 *
 * // Return a full message object
 * const fullStep: messageStep = async ({ context }) => {
 *   return {
 *     role: "agent",
 *     parts: [
 *       { kind: "text", text: "Here is your report:" },
 *       { kind: "file", file: { uri: "https://example.com/report.pdf" } }
 *     ]
 *   };
 * };
 * ```
 *
 * @public
 * @since 0.6.0
 */
export type messageStep<Input extends A.bargs = A.empty, Carry extends A.bargs = A.empty> = A.Step<
    A.Stateless<MessageParams>,
    Input,
    Carry
>;

/**
 * Type alias for artifact-based workflow steps.
 *
 * This type represents a step that creates or updates artifacts within an agent
 * workflow. Artifacts are persistent, versioned outputs that can be referenced
 * across task sessions - useful for documents, generated files, or any content
 * that should be retrievable later.
 *
 * @template Input - Arguments received from previous step
 * @template Carry - Arguments passed to next step
 *
 * @example
 * ```typescript
 * // Create an artifact
 * const createArtifact: artifactStep = async ({ context, args }) => {
 *   return {
 *     artifactId: `report-${context.taskId}`,
 *     name: "Analysis Report",
 *     parts: [{ kind: "text", text: args?.analysisResult }]
 *   };
 * };
 *
 * // Using describe helper
 * const helperStep: artifactStep = async ({ context }) => {
 *   return describe.artifact({
 *     artifactId: context.taskId,
 *     parts: [{ kind: "text", text: "Generated content" }]
 *   });
 * };
 * ```
 *
 * @public
 * @since 0.6.0
 */
export type artifactStep<Input extends A.bargs = A.empty, Carry extends A.bargs = A.empty> = A.Step<
    A.Stateless<ArtifactUpdateParams>,
    Input,
    Carry
>;

/**
 * Type alias for status update workflow steps.
 *
 * This type represents a step that emits task status updates within an agent
 * workflow. Status steps are useful for communicating progress, state changes,
 * or intermediate results to the client during long-running operations.
 *
 * @template Input - Arguments received from previous step
 * @template Carry - Arguments passed to next step
 *
 * @example
 * ```typescript
 * // Simple status string
 * const progressStep: statusStep = async () => {
 *   return "working";
 * };
 *
 * // Status with message
 * const detailedStep: statusStep = async ({ args }) => {
 *   return {
 *     status: {
 *       state: A2A.TaskState.working,
 *       message: describe.message(`Processing step ${args?.step} of 5...`)
 *     }
 *   };
 * };
 *
 * // Mark completion
 * const completeStep: statusStep = async () => {
 *   return { status: { state: A2A.TaskState.completed } };
 * };
 * ```
 *
 * @public
 * @since 0.6.0
 */
export type statusStep<Input extends A.bargs = A.empty, Carry extends A.bargs = A.empty> = A.Step<
    A.Stateless<StatusUpdateParams>,
    Input,
    Carry
>;

/**
 * Type alias for task-based workflow steps.
 *
 * This type represents a step that creates or manipulates complete A2A tasks.
 * Task steps provide full control over the task object, including status,
 * artifacts, and history. Useful for complex orchestration scenarios or
 * when you need to return a complete task representation.
 *
 * @template Input - Arguments received from previous step
 * @template Carry - Arguments passed to next step
 *
 * @example
 * ```typescript
 * // Return task from string
 * const simpleTask: taskStep = async () => {
 *   return "Task completed successfully";
 * };
 *
 * // Return full task object
 * const fullTask: taskStep = async ({ context, args }) => {
 *   return describe.task({
 *     id: context.taskId,
 *     contextId: context.contextId,
 *     status: { state: A2A.TaskState.completed },
 *     artifacts: [args?.generatedArtifact]
 *   });
 * };
 *
 * // With carry for chaining
 * const chainTask: taskStep = async ({ context }) => {
 *   const task = describe.task({ id: context.taskId });
 *   return { reply: task, args: { taskSnapshot: task } };
 * };
 * ```
 *
 * @public
 * @since 0.6.0
 */
export type taskStep<Input extends A.bargs = A.empty, Carry extends A.bargs = A.empty> = A.Step<
    A.Stateless<TaskParams>,
    Input,
    Carry
>;

export type FactoryParams<ServerParams extends BaseServerParams = BaseServerParams> = Omit<
    ServiceParams,
    'engine' | 'agentCard'
> &
    Omit<ServerParams, 'agent'>;

/**
 * Creates an agent execution engine from a list of workflow steps.
 *
 * This function transforms a list of resolved step definitions into an executable
 * A2A engine that processes contexts through the defined workflow. The engine
 * is an async generator that yields updates as each step completes.
 *
 * **Execution Flow:**
 * 1. Yields "submitted" status update
 * 2. Executes each step in order, yielding transformed results
 * 3. Passes carried args from one step to the next
 * 4. Yields final task on completion
 *
 * @param stepsList - Array of resolved workflow steps (from AgentFactory.steps)
 * @returns A2A.Engine async generator function
 * @throws Error if stepsList is empty
 *
 * @example
 * ```typescript
 * // Typically accessed via AgentFactory
 * const engine = cr8("MyAgent")
 *   .text("Hello")
 *   .data({ timestamp: Date.now() })
 *   .engine;
 *
 * // Or create manually from steps
 * const engine = createStepEngine(factory.steps);
 *
 * // Execute the engine
 * for await (const update of engine(context)) {
 *   console.log(update.kind, update);
 * }
 * ```
 *
 * @public
 * @since 0.5.6
 */
export function createStepEngine(stepsList: A.Resolved[]): A2A.Engine {
    if (stepsList.length === 0) {
        throw new Error('No steps provided');
    }
    return async function* (context: A2A.Context) {
        logger.info(`engine[context:${context.contextId}]: starting`);
        logger.debug(`engine[context:${context.contextId}]: taskId: ${context.taskId}`);
        const content = extractTextContent(context.userMessage);
        let _skipStep = false;
        const input: A.InputArguments = {
            message: context.messages,
            context: context,
            content: content,
            skip: () => {
                _skipStep = true;
                return;
            },
        };

        const submitted: A2A.TaskStatusUpdateEvent = describe.update.submitted({
            contextId: context.contextId,
            taskId: context.taskId,
        });
        logger.debug(`engine[context:${context.contextId}]: submitted`);
        yield submitted;

        for (const step of stepsList) {
            if (await context.isCancelled()) {
                break;
            }

            logger.debug(`engine[context:${context.contextId}]: executing step[${step.id}]: ${step.kind}`);
            const ret = await step.step({ ...input });
            if (_skipStep) {
                _skipStep = false;
                logger.debug(`engine[context:${context.contextId}]: skipping step[${step.id}]`);
                continue;
            }

            logger.debug(`engine[context:${context.contextId}]: transforming step[${step.id}]`);
            const carried = yield* transform.Reply(ret, context, step.handler);
            input.args = carried;
        }

        const task: A2A.Task = await context.getTask();
        logger.debug(`engine[context:${context.contextId}]: completed task[${task.id}]: ${formatJson(task)}`);
        task.status.state = isProcessing(task.status.state) ? A2A.TaskState.completed : task.status.state;
        yield task;
    };
}
