/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextFunction, Request, Response } from "express";
import { A2A } from "~/types/index.js";
import { logger } from "~/config/index.js";
import { formatJson } from "~/utils/common/utils.js";
import { A2AError } from "@a2a-js/sdk/server";
const isValidMethod = (method: string) => {
  return (
    method &&
    method !== "" &&
    method !== null &&
    method !== undefined &&
    typeof method === "string"
  );
};

const checkParams = (params: unknown, method: string) => {
  if (!params || (typeof params !== "object" && !Array.isArray(params))) {
    throw A2AError.invalidParams("Invalid Parameters", {
      params,
      method,
    });
  } else if (typeof params === "object" && Object.keys(params).length === 0) {
    throw A2AError.invalidParams("Params Required", {
      params,
      method,
    });
  }
};
/**
 * @deprecated Use the jsonRpcHandler from @a2a-js/sdk/server/express instead
 */
export async function jsonRPCMiddleware(
  service: A2A.Service,
  req: Request,
  res: Response,
  next: NextFunction,
  extendedAgentCard?: A2A.AgentCard
): Promise<void> {
  const { method, params, id, jsonrpc } = req.body;
  if (
    jsonrpc !== "2.0" ||
    (typeof id !== "string" &&
      typeof id === "number" &&
      !Number.isInteger(id) &&
      id !== null)
  ) {
    res.json({
      jsonrpc: "2.0",
      id: id || null,
      error: A2AError.invalidRequest(
        `Invalid JSONRPC info: ${formatJson({ method, params, id, jsonrpc })}`
      ).toJSONRPCError(),
    });
    return;
  }

  try {
    if (!isValidMethod(method)) {
      throw A2AError.invalidRequest("No method provided");
    }

    let result;

    switch (method) {
      case "message/send": {
        checkParams(params, method);
        result = await service.sendMessage(params);
        break;
      }
      case "message/stream": {
        checkParams(params, method);
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        });
        const stream = service.streamMessage(params);
        for await (const data of stream) {
          res.write(
            `data: ${JSON.stringify({ jsonrpc: "2.0", id, result: data })}\n\n`
          );
        }
        res.end();
        return;
      }
      case "tasks/resubscribe": {
        checkParams(params, method);
        const stream = service.resubscribe(params);

        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        });
        for await (const data of stream) {
          res.write(
            `data: ${JSON.stringify({ jsonrpc: "2.0", id, result: data })}\n\n`
          );
        }
        res.end();
        return;
      }
      case "tasks/get": {
        checkParams(params, method);
        result = await service.getTask(params);
        break;
      }
      case "tasks/cancel": {
        checkParams(params, method);
        result = await service.cancelTask(params);
        break;
      }
      //todo: Implement push notifications
      //todo: Implement Tasks List
      case "tasks/pushNotificationConfig/set":
      case "tasks/pushNotificationConfig/get":
      case "tasks/pushNotificationConfig/delete":
      case "task/pushNotificationConfig/list": {
        throw A2AError.pushNotificationNotSupported();
      }

      case "agent/getAuthenticatedExtendedCard": {
        if (
          !extendedAgentCard ||
          (await service.getAgentCard()).supportsAuthenticatedExtendedCard !==
            true
        ) {
          throw A2AError.authenticatedExtendedCardNotConfigured();
        }
        result = extendedAgentCard;
        break;
      }

      default:
        throw A2AError.methodNotFound(method);
    }
    res.json({ jsonrpc: "2.0", id, result });
  } catch (error) {
    logger.error("jsonRPCMiddleware[Error]:", error);
    logger.warn("jsonRPCMiddleware[Error]: Request body", {
      request: req.body,
    });
    return next(error);
  }
}
