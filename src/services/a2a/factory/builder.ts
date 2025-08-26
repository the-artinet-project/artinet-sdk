/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  StepBuilder,
  Step,
  StepOutput,
  StepOutputWithForwardArgs,
  MessageSendParams,
  TextPart,
  DataPart,
  FilePart,
  Context,
  TaskStatusUpdateEvent,
  TaskState,
  AgentEngine,
  StepParams,
  StepWithKind,
  Task,
  FactoryParams,
  Command,
  Message,
  Part,
} from "~/types/index.js";
import { createAgent } from "./service.js";

export type textStep<
  TCommand extends MessageSendParams = MessageSendParams,
  TPart extends TextPart["text"] = TextPart["text"],
  TInboundArgs extends readonly unknown[] = [],
  TForwardArgs extends readonly unknown[] = [],
  TOutput extends
    | StepOutput<TPart>
    | StepOutputWithForwardArgs<TPart, TForwardArgs>
    | Array<TPart>
    | TPart = StepOutput<TPart>,
> = Step<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>;

export type fileStep<
  TCommand extends MessageSendParams = MessageSendParams,
  TPart extends FilePart["file"] = FilePart["file"],
  TInboundArgs extends readonly unknown[] = [],
  TForwardArgs extends readonly unknown[] = [],
  TOutput extends
    | StepOutput<TPart>
    | StepOutputWithForwardArgs<TPart, TForwardArgs>
    | Array<TPart>
    | TPart = StepOutput<TPart>,
> = Step<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>;

export type dataStep<
  TCommand extends MessageSendParams = MessageSendParams,
  TPart extends DataPart["data"] = DataPart["data"],
  TInboundArgs extends readonly unknown[] = [],
  TForwardArgs extends readonly unknown[] = [],
  TOutput extends
    | StepOutput<TPart>
    | StepOutputWithForwardArgs<TPart, TForwardArgs>
    | Array<TPart>
    | TPart = StepOutput<TPart>,
> = Step<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>;
//@typescript-eslint/no-explicit-any
type OutArgsOf<O> = O extends StepOutputWithForwardArgs<any, infer A> ? A : [];

export class EngineBuilder<
  TCommand extends MessageSendParams = MessageSendParams,
  TInboundArgs extends readonly unknown[] = [],
> implements StepBuilder<TCommand, TInboundArgs>
{
  //@typescript-eslint/no-explicit-any
  private steps: Array<StepWithKind<TCommand, any, any, any, any, any>> = [];
  private constructor(
    //@typescript-eslint/no-explicit-any
    steps: Array<StepWithKind<TCommand, any, any, any, any, any>> = []
  ) {
    this.steps = steps;
  }

  public static create<
    TCommand extends MessageSendParams = MessageSendParams,
    TInboundArgs extends readonly unknown[] = [],
  >() {
    return new EngineBuilder<TCommand, TInboundArgs>();
  }

  addStep<
    TPart extends
      | DataPart["data"]
      | FilePart["file"]
      | TextPart["text"] = TextPart["text"],
    TForwardArgs extends readonly unknown[] = [],
    TOutput extends
      | StepOutput<TPart>
      | StepOutputWithForwardArgs<TPart, TForwardArgs>
      | Array<TPart>
      | TPart = StepOutput<TPart>,
    TKind extends "text" | "file" | "data" = "text",
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

  public text<
    TPart extends TextPart["text"] = TextPart["text"],
    TForwardArgs extends readonly unknown[] = [],
    TOutput extends
      | StepOutput<TPart>
      | StepOutputWithForwardArgs<TPart, TForwardArgs>
      | Array<TPart>
      | TPart = StepOutput<TPart>,
  >(step: textStep<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>) {
    return this.addStep<TPart, TForwardArgs, TOutput, "text">({
      step: step,
      kind: "text",
    });
  }

  public file<
    TPart extends FilePart["file"] = FilePart["file"],
    TForwardArgs extends readonly unknown[] = [],
    TOutput extends
      | StepOutput<TPart>
      | StepOutputWithForwardArgs<TPart, TForwardArgs>
      | Array<TPart>
      | TPart = StepOutput<TPart>,
  >(step: fileStep<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>) {
    return this.addStep<TPart, TForwardArgs, TOutput, "file">({
      step: step,
      kind: "file",
    });
  }

  public data<
    TPart extends DataPart["data"] = DataPart["data"],
    TForwardArgs extends readonly unknown[] = [],
    TOutput extends
      | StepOutput<TPart>
      | StepOutputWithForwardArgs<TPart, TForwardArgs>
      | Array<TPart>
      | TPart = StepOutput<TPart>,
  >(step: dataStep<TCommand, TPart, TInboundArgs, TForwardArgs, TOutput>) {
    return this.addStep<TPart, TForwardArgs, TOutput, "data">({
      step: step,
      kind: "data",
    });
  }

  public createAgent(params: Omit<FactoryParams, "engine">) {
    return createAgent({
      ...params,
      engine: this.createAgentEngine(),
    });
  }

  public createAgentEngine() {
    return createAgentExecutor(this.build() as StepWithKind<Command>[]);
  }

  public build() {
    if (this.steps.length === 0) {
      throw new Error("No steps provided");
    }
    return this.steps;
  }
}

export const AgentBuilder = () => EngineBuilder.create<MessageSendParams>();

const partToMessagePart = (
  kind: "text" | "file" | "data",
  part: FilePart["file"] | DataPart["data"] | TextPart["text"]
): FilePart | DataPart | TextPart => {
  switch (kind) {
    case "text": {
      return { kind: "text", text: part as TextPart["text"] };
    }
    case "file": {
      const filePart: FilePart["file"] = part as FilePart["file"];
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
      return { kind: "data", data: part as DataPart["data"] };
    }
    default:
      throw new Error("Invalid part kind");
  }
};

export function createAgentExecutor(stepsList: StepWithKind[]): AgentEngine {
  return async function* (context: Context) {
    const stepArgs: StepParams = {
      command: context.command,
      context: context,
      args: [],
    };
    const contextId = context.command.message.contextId;
    const taskId = context.command.message.taskId;
    const messageId = context.command.message.messageId;
    if (!contextId || !taskId) {
      throw new Error("Context ID and task ID are required");
    }
    const taskStarted: TaskStatusUpdateEvent = {
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
    const finalMessage: Message = {
      taskId: taskId,
      contextId: contextId,
      messageId: messageId,
      kind: "message",
      role: "agent",
      parts: [],
    };
    for (const step of stepsList) {
      const ret = await step.step({ ...stepArgs });
      let parts: Part[] = [];
      if (Array.isArray(ret)) {
        parts = ret.map((part) => partToMessagePart(step.kind, part));
        const taskStatusUpdate: TaskStatusUpdateEvent = {
          taskId: taskId,
          contextId: contextId,
          kind: "status-update",
          status: {
            state: TaskState.working,
            timestamp: new Date().toISOString(),
            message: {
              messageId: messageId,
              kind: "message",
              role: "agent",
              parts: parts,
            },
          },
          final: false,
        };
        yield taskStatusUpdate;
      } else if (typeof ret === "object") {
        parts = Array.isArray(ret.parts)
          ? ret.parts.map((part) => partToMessagePart(step.kind, part))
          : [partToMessagePart(step.kind, ret.parts)];
        const taskStatusUpdate: TaskStatusUpdateEvent = {
          taskId: taskId,
          contextId: contextId,
          kind: "status-update",
          status: {
            state: TaskState.working,
            timestamp: new Date().toISOString(),
            message: {
              messageId: messageId,
              kind: "message",
              role: "agent",
              parts: parts,
            },
          },
          final: false,
        };
        yield taskStatusUpdate;
        stepArgs.args = (ret as StepOutputWithForwardArgs<any, any>).args;
      } else {
        parts = [partToMessagePart(step.kind, ret)];
        const taskStatusUpdate: TaskStatusUpdateEvent = {
          taskId: taskId,
          contextId: contextId,
          kind: "status-update",
          status: {
            state: TaskState.working,
            timestamp: new Date().toISOString(),
            message: {
              messageId: messageId,
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
    const task: Task = {
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
