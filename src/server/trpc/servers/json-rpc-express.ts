import { NextFunction, Request, Response } from "express";
import { A2AServiceInterface } from "../protocol/index.js";
import {
  PUSH_NOTIFICATION_NOT_SUPPORTED,
  INVALID_REQUEST,
  INVALID_PARAMS,
  METHOD_NOT_FOUND,
  SystemError,
} from "../../../utils/common/errors.js";

const isValidMethod = (method: string) => {
  return (
    method &&
    method !== "" &&
    method !== null &&
    method !== undefined &&
    typeof method === "string"
  );
};

const checkParams = (params: any, method: string) => {
  if (
    !params ||
    (typeof params === "object" && Object.keys(params).length === 0)
  ) {
    throw INVALID_PARAMS({
      data: {
        message: "No params provided",
        method,
      },
    });
  }
};

export async function jsonRpcExpressMiddleware(
  service: A2AServiceInterface,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { method, params, id, jsonrpc } = req.body;
  // Validate JSON-RPC format
  if (jsonrpc !== "2.0" || !id) {
    res.json({
      jsonrpc: "2.0",
      id: id || null,
      error: { code: -32600, message: "Invalid Request" },
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
        let headersSent = false;
        const stream = service.streamMessage(params);
        for await (const data of stream) {
          if (!headersSent) {
            res.writeHead(200, {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            });
            headersSent = true;
          }
          res.write(
            `data: ${JSON.stringify({ jsonrpc: "2.0", id, result: data })}\n\n`
          );
        }
        res.end();
        return;
      }
      case "tasks/resubscribe": {
        checkParams(params, method);
        let headersSent = false;
        const stream = service.resubscribe(params);
        for await (const data of stream) {
          if (!headersSent) {
            res.writeHead(200, {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            });
            headersSent = true;
          }
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
    return next(error);
    // console.error("jsonRPC Error:", id, method, error);
    // if (error instanceof SystemError) {
    //   console.log("system jsonRPC Error:");
    //   try {
    //     res.json({
    //       jsonrpc: "2.0",
    //       id,
    //       error: {
    //         code: error.code,
    //         message: error.message,
    //         data: error.data,
    //       },
    //     });
    //   } catch (error) {
    //     console.log("system jsonRPC Error response error:", error);
    //   }
    //   console.log("system jsonRPC Error response:");
    // } else {
    //   console.log("non-system jsonRPC Error:");
    //   res.json({
    //     jsonrpc: "2.0",
    //     id,
    //     error: {
    //       code: -32603,
    //       message: "Internal error",
    //       data: error instanceof Error ? error.message : String(error),
    //     },
    //   });
    //   console.log("non-system jsonRPC Error response:", id, method, error);
    // }
    // console.log("jsonRPC Error done:", id, method, error);
    // return;
  }
}
