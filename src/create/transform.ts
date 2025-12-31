/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import * as Builder from "./agent-builder.js";
import { describe } from "./index.js";
import { MessageParams } from "./message-builder.js";
import {
  StatusUpdateParams,
  ArtifactUpdateParams,
  TaskParams,
  TaskStatus,
} from "./task-builder.js";

export function hasCarry<
  Ret extends Builder.AcceptedReturnValues,
  Carried extends Builder.BaseArgs
>(
  ret: Builder.Reply<Ret, Carried>
): ret is Builder.ReturnAndCarry<Ret, Carried> {
  return (
    ret !== null && typeof ret === "object" && "reply" in ret && "args" in ret
  );
}

export function hasReply<
  Ret extends Builder.AcceptedReturnValues,
  Carried extends Builder.BaseArgs
>(ret: Builder.Reply<Ret, Carried>): ret is Builder.ReturnValue<Ret> {
  return ret !== null && typeof ret === "object" && "reply" in ret;
}

type PartInput =
  | { kind: "text"; part: A2A.TextPart["text"] }
  | { kind: "file"; part: A2A.FilePart["file"] }
  | { kind: "data"; part: A2A.DataPart["data"] };

function messagePart(params: {
  kind: "text";
  part: A2A.TextPart["text"];
}): A2A.TextPart;
function messagePart(params: {
  kind: "file";
  part: A2A.FilePart["file"];
}): A2A.FilePart;
function messagePart(params: {
  kind: "data";
  part: A2A.DataPart["data"];
}): A2A.DataPart;
function messagePart(params: PartInput): A2A.Part;
function messagePart(params: PartInput): A2A.Part {
  switch (params.kind) {
    case "text": {
      return describe.part.text(params.part);
    }
    case "file": {
      return describe.part.file(params.part);
    }
    case "data": {
      return describe.part.data(params.part);
    }
    default:
      throw new Error("Invalid part detected", { cause: params });
  }
}

export function Parts(
  kind: "text" | "file" | "data"
): Builder.Transform<Builder.AcceptedParts> {
  return async function* (
    payload: Builder.AcceptedParts | Builder.AcceptedParts[],
    { taskId, contextId }: A2A.Context
  ) {
    const parts = (Array.isArray(payload) ? payload : [payload]).map((part) =>
      messagePart({ kind, part } as PartInput)
    );
    yield describe.update.working({
      taskId,
      contextId,
      message: describe.message({ role: "agent", parts }),
    });
    return;
  };
}

export function Message(): Builder.Transform<Builder.Stateless<MessageParams>> {
  return async function* (
    payload:
      | Builder.Stateless<MessageParams>
      | Array<Builder.Stateless<MessageParams>>,
    { taskId, contextId }: A2A.Context
  ) {
    if (Array.isArray(payload)) {
      throw new Error("Array of messages is not supported");
    }
    const message =
      typeof payload === "string" ? describe.message(payload) : payload;
    yield describe.message({
      ...message,
      taskId,
      contextId,
    });
    return;
  };
}

export function Artifact(): Builder.Transform<
  Builder.Stateless<ArtifactUpdateParams>
> {
  return async function* (
    payload:
      | Builder.Stateless<ArtifactUpdateParams>
      | Array<Builder.Stateless<ArtifactUpdateParams>>,
    { taskId, contextId }: A2A.Context
  ) {
    const updates = Array.isArray(payload) ? payload : [payload];
    for (const update of updates) {
      const artifact =
        typeof update === "string" ? describe.artifact(update) : update;
      yield describe.update.artifact({
        ...artifact,
        taskId,
        contextId,
      });
    }
    return;
  };
}

export function Status(): Builder.Transform<
  Builder.Stateless<StatusUpdateParams>
> {
  return async function* (
    payload:
      | Builder.Stateless<StatusUpdateParams>
      | Array<Builder.Stateless<StatusUpdateParams>>,
    { taskId, contextId }: A2A.Context
  ) {
    const updates = Array.isArray(payload) ? payload : [payload];
    for (const update of updates) {
      const status =
        typeof update === "string" ? TaskStatus.create(update) : update;
      yield describe.update.status({
        ...status,
        taskId,
        contextId,
      });
    }
    return;
  };
}

export function Task(): Builder.Transform<Builder.Stateless<TaskParams>> {
  return async function* (
    payload:
      | Builder.Stateless<TaskParams>
      | Array<Builder.Stateless<TaskParams>>,
    { taskId, contextId }: A2A.Context
  ) {
    if (Array.isArray(payload)) {
      throw new Error("Array of tasks is not supported");
    }
    const task = typeof payload === "string" ? describe.task(payload) : payload;
    yield describe.task({ ...task, taskId, contextId });
    return;
  };
}

export async function* Reply<
  Ret extends Builder.AcceptedReturnValues,
  Carried extends Builder.BaseArgs
>(
  ret: Builder.Reply<Ret, Carried>,
  context: A2A.Context,
  transform: Builder.Transform<Ret>
): AsyncGenerator<A2A.Update, Carried | undefined, unknown> {
  if (Array.isArray(ret)) {
    yield* transform(ret, context);
  } else if (hasCarry(ret)) {
    yield* transform(ret.reply as Ret | Array<Ret>, context);
    return ret.args;
  } else if (hasReply(ret)) {
    yield* transform(ret.reply as Ret | Array<Ret>, context);
  } else {
    yield* transform(ret, context);
  }
  return;
}
