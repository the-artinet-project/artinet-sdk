/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextFunction, Request, Response } from "express";
import { A2A } from "~/types/index.js";
import {
  PUSH_NOTIFICATION_NOT_SUPPORTED,
  INVALID_REQUEST,
  INVALID_PARAMS,
  METHOD_NOT_FOUND,
  AUTHENTICATED_EXTENDED_CARD_NOT_CONFIGURED,
} from "~/utils/index.js";
import { logger } from "~/config/index.js";

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
    throw INVALID_PARAMS({
      data: {
        message: "Invalid params",
        method,
      },
    });
  } else if (typeof params === "object" && Object.keys(params).length === 0) {
    throw INVALID_PARAMS({
      data: {
        message: "No params provided",
        method,
      },
    });
  }
};

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
    (id && typeof id !== "string" && typeof id !== "number" && id !== null)
  ) {
    res.json({
      jsonrpc: "2.0",
      id: id || null,
      error: { code: A2A.ErrorCodeInvalidRequest, message: "Invalid Request" },
    });
    return;
  }

  try {
    if (!isValidMethod(method)) {
      throw INVALID_REQUEST({
        data: {
          message: "No method provided",
          method,
        },
      });
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
        throw PUSH_NOTIFICATION_NOT_SUPPORTED({
          data: {
            message: "Push notifications not supported",
            method,
          },
        });
      }

      case "agent/getAuthenticatedExtendedCard": {
        if (
          !extendedAgentCard ||
          (await service.getAgentCard()).supportsAuthenticatedExtendedCard !==
            true
        ) {
          throw AUTHENTICATED_EXTENDED_CARD_NOT_CONFIGURED({
            data: {
              message: "Authenticated Extended Card is not configured",
              method,
            },
          });
        }
        result = extendedAgentCard;
        break;
      }

      default:
        throw METHOD_NOT_FOUND({
          data: {
            message: "Method not found",
            method,
          },
        });
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
