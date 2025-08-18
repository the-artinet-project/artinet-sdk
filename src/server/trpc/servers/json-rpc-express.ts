import { Request, Response } from "express";
import { A2AServiceInterface } from "../protocol/index.js";

export async function jsonRpcExpressMiddleware(
  service: A2AServiceInterface,
  req: Request,
  res: Response
): Promise<void> {
  const { method, params, id, jsonrpc } = req.body;

  // Validate JSON-RPC format
  if (jsonrpc !== "2.0") {
    res.json({
      jsonrpc: "2.0",
      id: id || null,
      error: { code: -32600, message: "Invalid Request" },
    });
    return;
  }

  try {
    let result;

    switch (method) {
      case "message/send": {
        result = await service.sendMessage(
          params,
          new AbortController().signal
        );
        break;
      }
      case "message/sendStreaming": {
        // For streaming, you need to handle SSE
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        });

        const stream = service.streamMessage(
          params,
          new AbortController().signal
        );
        for await (const chunk of stream) {
          res.write(
            `data: ${JSON.stringify({ jsonrpc: "2.0", id, result: chunk })}\n\n`
          );
        }
        res.end();
        return;
      }
      case "tasks/resubscribe": {
        // For streaming, you need to handle SSE
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        });

        const stream = service.resubscribe(
          params,
          new AbortController().signal
        );
        for await (const chunk of stream) {
          res.write(
            `data: ${JSON.stringify({ jsonrpc: "2.0", id, result: chunk })}\n\n`
          );
        }
        res.end();
        return;
      }
      case "tasks/get": {
        result = await service.getTask(params);
        break;
      }
      case "tasks/cancel": {
        result = await service.cancelTask(params);
        break;
      }
      default:
        res.json({
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: "Method not found" },
        });
        return;
    }

    res.json({ jsonrpc: "2.0", id, result });
  } catch (error) {
    res.json({
      jsonrpc: "2.0",
      id,
      error: {
        code: -32603,
        message: "Internal error",
        data: error instanceof Error ? error.message : String(error),
      },
    });
    return;
  }
}
