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

import {
  StepBuilder,
  Step,
  StepOutput,
  StepOutputWithForwardArgs,
  A2A,
  AgentEngine,
  StepParams,
  StepWithKind,
  FactoryParams,
  Command,
  A2ARuntime,
} from "~/types/index.js";
import { createAgent } from "./service.js";
import { v4 as uuidv4 } from "uuid";
import { getContent } from "../helpers/content.js";
import { SUBMITTED_UPDATE, WORKING_UPDATE } from "~/utils/index.js";
/**
 * Type alias for text-based workflow steps.
 *
 * This type represents a step that processes or generates text content
 * within an agent workflow. Text steps are the most common type of step
 * and are used for message processing, content generation, and text-based
 * decision making.
 *
 * @template TCommand - The command type, defaults to MessageSendParams
 * @template TPart - The text part type, defaults to A2A.TextPart["text"]
 * @template TInboundArgs - Arguments received from previous step
 * @template TForwardArgs - Arguments passed to next step
 * @template TOutput - The output type of the step
 *
 * @example
 * ```typescript
 * const greetingStep: textStep = async ({ command, context, content, args }) => {
 *   const userName = command.message.metadata?.userName || 'there';
 *   return `Hello, ${userName}! How can I help you today?`;
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
export type textStep<
  TCommand extends A2ARuntime["command"] = A2ARuntime["command"],
  TPart extends A2A.TextPart["text"] = A2A.TextPart["text"],
  TInboundArgs extends readonly unknown[] = [],
  TForwardArgs extends readonly unknown[] = [],
  TOutput extends
    | StepOutput<TPart>
    | StepOutputWithForwardArgs<TPart, TForwardArgs>
    | Array<TPart>
    | TPart = StepOutput<TPart>
> = Step<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>;

/**
 * Type alias for file-based workflow steps.
 *
 * This type represents a step that processes or generates file content
 * within an agent workflow. File steps handle document processing,
 * file generation, and file-based data operations.
 *
 * @template TCommand - The command type, defaults to MessageSendParams
 * @template TPart - The file part type, defaults to A2A.FilePart["file"]
 * @template TInboundArgs - Arguments received from previous step
 * @template TForwardArgs - Arguments passed to next step
 * @template TOutput - The output type of the step
 *
 * @example
 * ```typescript
 * const documentStep: fileStep = async ({ command, context, args }) => {
 *   const content = generateDocument(command.message.content);
 *   return {
 *     name: 'report.pdf',
 *     mimeType: 'application/pdf',
 *     bytes: content
 *   };
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
export type fileStep<
  TCommand extends A2ARuntime["command"] = A2ARuntime["command"],
  TPart extends A2A.FilePart["file"] = A2A.FilePart["file"],
  TInboundArgs extends readonly unknown[] = [],
  TForwardArgs extends readonly unknown[] = [],
  TOutput extends
    | StepOutput<TPart>
    | StepOutputWithForwardArgs<TPart, TForwardArgs>
    | Array<TPart>
    | TPart = StepOutput<TPart>
> = Step<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>;

/**
 * Type alias for data-based workflow steps.
 *
 * This type represents a step that processes or generates structured data
 * within an agent workflow. Data steps handle JSON processing, API responses,
 * and structured data transformations.
 *
 * @template TCommand - The command type, defaults to MessageSendParams
 * @template TPart - The data part type, defaults to A2A.DataPart["data"]
 * @template TInboundArgs - Arguments received from previous step
 * @template TForwardArgs - Arguments passed to next step
 * @template TOutput - The output type of the step
 *
 * @example
 * ```typescript
 * const analyzeStep: dataStep = async ({ command, context, args }) => {
 *   const analysis = await analyzeMessage(command.message.content);
 *   return {
 *     sentiment: analysis.sentiment,
 *     entities: analysis.entities,
 *     confidence: analysis.confidence
 *   };
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
export type dataStep<
  TCommand extends A2ARuntime["command"] = A2ARuntime["command"],
  TPart extends A2A.DataPart["data"] = A2A.DataPart["data"],
  TInboundArgs extends readonly unknown[] = [],
  TForwardArgs extends readonly unknown[] = [],
  TOutput extends
    | StepOutput<TPart>
    | StepOutputWithForwardArgs<TPart, TForwardArgs>
    | Array<TPart>
    | TPart = StepOutput<TPart>
> = Step<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>;
/**
 * Utility type to extract forward arguments from step output.
 *
 * This helper type extracts the forward arguments type from a step output,
 * enabling proper type chaining between workflow steps.
 *
 * @template O - The output type to extract arguments from
 * @internal
 */
//@typescript-eslint/no-explicit-any
type OutArgsOf<O> = O extends StepOutputWithForwardArgs<any, infer A> ? A : [];

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
export class EngineBuilder<
  TCommand extends A2ARuntime["command"] = A2ARuntime["command"],
  TInboundArgs extends readonly unknown[] = []
> implements StepBuilder<TCommand, TInboundArgs>
{
  //@typescript-eslint/no-explicit-any
  private steps: Array<StepWithKind<TCommand, any, any, any, any, any>> = [];

  /**
   * Protected constructor to enforce factory method usage.
   *
   * @param steps - Initial steps array
   */
  protected constructor(
    //@typescript-eslint/no-explicit-any
    steps: Array<StepWithKind<TCommand, any, any, any, any, any>> = []
  ) {
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
  public static create<
    TCommand extends A2ARuntime["command"] = A2ARuntime["command"],
    TInboundArgs extends readonly unknown[] = []
  >() {
    return new EngineBuilder<TCommand, TInboundArgs>();
  }

  addStep<
    TPart extends
      | A2A.DataPart["data"]
      | A2A.FilePart["file"]
      | A2A.TextPart["text"] = A2A.TextPart["text"],
    TForwardArgs extends readonly unknown[] = [],
    TOutput extends
      | StepOutput<TPart>
      | StepOutputWithForwardArgs<TPart, TForwardArgs>
      | Array<TPart>
      | TPart = StepOutput<TPart>,
    TKind extends "text" | "file" | "data" = "text"
  >(
    step: StepWithKind<
      TCommand,
      TPart,
      TInboundArgs,
      TForwardArgs,
      TOutput,
      TKind
    >
  ) {
    return new EngineBuilder<TCommand, OutArgsOf<TOutput>>([
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
  public text<
    TPart extends A2A.TextPart["text"] = A2A.TextPart["text"],
    TForwardArgs extends readonly unknown[] = [],
    TOutput extends
      | StepOutput<TPart>
      | StepOutputWithForwardArgs<TPart, TForwardArgs>
      | Array<TPart>
      | TPart = StepOutput<TPart>
  >(step: textStep<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>) {
    return this.addStep<TPart, TForwardArgs, TOutput, "text">({
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
  public file<
    TPart extends A2A.FilePart["file"] = A2A.FilePart["file"],
    TForwardArgs extends readonly unknown[] = [],
    TOutput extends
      | StepOutput<TPart>
      | StepOutputWithForwardArgs<TPart, TForwardArgs>
      | Array<TPart>
      | TPart = StepOutput<TPart>
  >(step: fileStep<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>) {
    return this.addStep<TPart, TForwardArgs, TOutput, "file">({
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
  public data<
    TPart extends A2A.DataPart["data"] = A2A.DataPart["data"],
    TForwardArgs extends readonly unknown[] = [],
    TOutput extends
      | StepOutput<TPart>
      | StepOutputWithForwardArgs<TPart, TForwardArgs>
      | Array<TPart>
      | TPart = StepOutput<TPart>
  >(step: dataStep<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>) {
    return this.addStep<TPart, TForwardArgs, TOutput, "data">({
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
  public createAgent(params: Omit<FactoryParams, "engine">) {
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
  public createAgentEngine() {
    return createAgentExecutor(this.build() as StepWithKind<Command>[]);
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
  public build() {
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
export const AgentBuilder = () => EngineBuilder.create<A2ARuntime["command"]>();

const partToMessagePart = (
  kind: "text" | "file" | "data",
  part: A2A.FilePart["file"] | A2A.DataPart["data"] | A2A.TextPart["text"]
): A2A.FilePart | A2A.DataPart | A2A.TextPart => {
  switch (kind) {
    case "text": {
      return { kind: "text", text: part as A2A.TextPart["text"] };
    }
    case "file": {
      const filePart: A2A.FilePart["file"] = part as A2A.FilePart["file"];
      if (filePart.uri) {
        return {
          kind: "file",
          file: {
            uri: filePart.uri,
            name: filePart.name,
            mimeType: filePart.mimeType,
          },
        };
      }
      if (!filePart.bytes) {
        throw new Error("File bytes are required when uri is not provided");
      }
      return {
        kind: "file",
        file: {
          bytes: filePart.bytes,
          name: filePart.name,
          mimeType: filePart.mimeType,
        },
      };
    }
    case "data": {
      return { kind: "data", data: part as A2A.DataPart["data"] };
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
export function createAgentExecutor(stepsList: StepWithKind[]): AgentEngine {
  return async function* (context: A2ARuntime["context"]) {
    const content = getContent(context.command.message);
    const stepArgs: StepParams = {
      command: context.command,
      context: context,
      content: content,
      args: [],
    };

    const contextId = context.contextId;
    const taskId = context.State().task.id;

    if (!contextId || !taskId) {
      throw new Error("Context ID and task ID are required");
    }
    const taskStarted: A2A.TaskStatusUpdateEvent = SUBMITTED_UPDATE(
      taskId,
      contextId
    );
    yield taskStarted;
    let finalState: A2A.TaskState = A2A.TaskState.completed;
    const finalMessage: A2A.Message = {
      taskId: taskId,
      contextId: contextId,
      messageId: uuidv4(),
      kind: "message",
      role: "agent",
      parts: [],
    };
    for (const step of stepsList) {
      if (context.isCancelled()) {
        finalState = A2A.TaskState.canceled;
        break;
      }
      const ret = await step.step({ ...stepArgs });
      let parts: A2A.Part[] = [];
      if (Array.isArray(ret)) {
        parts = ret.map((part) => partToMessagePart(step.kind, part));
        const taskStatusUpdate: A2A.TaskStatusUpdateEvent = WORKING_UPDATE(
          taskId,
          contextId,
          {
            messageId: uuidv4(),
            kind: "message",
            role: "agent",
            parts: parts,
          }
        );
        yield taskStatusUpdate;
      } else if (ret !== null && typeof ret === "object") {
        parts = Array.isArray(ret.parts)
          ? ret.parts.map((part) => partToMessagePart(step.kind, part))
          : [partToMessagePart(step.kind, ret.parts)];
        const taskStatusUpdate: A2A.TaskStatusUpdateEvent = WORKING_UPDATE(
          taskId,
          contextId,
          {
            messageId: uuidv4(),
            kind: "message",
            role: "agent",
            parts: parts,
          }
        );
        yield taskStatusUpdate;
        stepArgs.args = (ret as StepOutputWithForwardArgs<any, any>).args;
      } else {
        parts = [partToMessagePart(step.kind, ret)];
        const taskStatusUpdate: A2A.TaskStatusUpdateEvent = WORKING_UPDATE(
          taskId,
          contextId,
          {
            messageId: uuidv4(),
            kind: "message",
            role: "agent",
            parts: parts,
          }
        );
        yield taskStatusUpdate;
      }
      finalMessage.parts.push(...parts);
    }
    const task: A2A.Task = {
      kind: "task",
      id: taskId,
      contextId: contextId,
      status: {
        state: finalState,
        timestamp: new Date().toISOString(),
        message: finalMessage,
      },
    };
    yield task;
  };
}
