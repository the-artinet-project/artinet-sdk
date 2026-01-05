/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { v4 as uuidv4 } from "uuid";
import { Kindless } from "./base.js";
export class Message {
  private readonly _message: A2A.Message;
  constructor(params: Partial<Kindless<A2A.Message>> = {}) {
    const messageId = params.messageId ?? uuidv4();
    this._message = {
      ...params,
      role: params.role ?? "agent",
      parts: params.parts ?? [],
      messageId,
      kind: A2A.Kind.message,
    };
  }
  get message(): A2A.Message {
    return this._message;
  }
  static create(params: MessageParams = {}): A2A.Message {
    return new Message(
      typeof params === "string"
        ? { parts: [{ text: params, kind: "text" }] }
        : params
    ).message;
  }
}
/* named intermediate type for message params to coax the type system */
export type BaseMessageParams = Partial<Kindless<A2A.Message>>;
export type MessageParams = BaseMessageParams | string;

export const isMessageParams = (params: any): params is MessageParams => {
  return (
    typeof params === "string" ||
    (typeof params === "object" && params !== null && "parts" in params)
  );
};

/**
 * Convenience factory function for creating a message builder with default parameters.
 *
 * @returns New {@link A2A.Message} with default parameters
 * @defaults {
 *   role: "agent",
 *   parts: [],
 *   messageId: uuidv4(),
 *   kind: "message",
 * }
 * @example
 * ```typescript
 * const message = message();
 * ```
 *
 * @public
 * @since 0.6.0
 */
export const message = Message.create;

/**
 * @deprecated Use {@link message} instead.
 * @since 0.6.0
 */
export const MessageBuilder = Message;

export class MessageSendConfiguration {
  private readonly _configuration: A2A.MessageSendConfiguration;
  constructor(
    params: Partial<A2A.MessageSendConfiguration> | null | undefined = {}
  ) {
    this._configuration = !params
      ? {}
      : {
          ...params,
        };
  }
  get configuration(): A2A.MessageSendConfiguration {
    return this._configuration;
  }
}

/**
 * @deprecated Use {@link messageSendParams} instead.
 * @since 0.6.0
 */
export const MessageSendConfigurationBuilder = MessageSendConfiguration;

export type MessageSendParamsParams =
  | Partial<Kindless<A2A.MessageSendParams>>
  | MessageParams;

/**
 * Convenience factory function for creating a message send params with default parameters.
 *
 * @returns New {@link A2A.MessageSendParams} with default parameters
 * @defaults {
 *   message: {
 *     role: "user",
 *     parts: [],
 *     messageId: uuidv4(),
 *     kind: "message",
 *   },
 *   configuration: undefined,
 *   metadata: undefined,
 * }
 * @example
 * ```typescript
 * const params = messageSendParams("hello there");
 * ```
 *
 * @public
 * @since 0.6.0
 */
export function messageSendParams(
  params: MessageSendParamsParams
): A2A.MessageSendParams {
  if (!isMessageParams(params)) {
    return {
      message: message(params.message),
      configuration: new MessageSendConfiguration(params.configuration)
        .configuration,
      metadata: params.metadata,
    };
  }

  if (typeof params === "string") {
    return {
      message: message({
        role: "user",
        parts: [{ text: params, kind: "text" }],
      }),
    };
  }

  params.role = params.role ?? "user";
  return {
    message: message(params),
  };
}
/**
 * @deprecated Use {@link messageSendParams} instead.
 * @since 0.6.0
 */
export const createMessageSendParams = messageSendParams;
