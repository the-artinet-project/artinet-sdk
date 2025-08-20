import { z } from "zod/v4";

/**
 * @description Base interface for all JSON-RPC messages (Requests and Responses).
 */
export const JSONRPCMessageSchema = z
  .object({
    /**
     * @required Specifies the JSON-RPC version. Must be "2.0".
     * @default "2.0"
     * @const "2.0"
     */
    jsonrpc: z
      .literal("2.0")
      .describe("Specifies the JSON-RPC version. Must be '2.0'."),

    /**
     * @optional An identifier established by the Client that MUST contain a String, Number.
     * @description Can be a string, number. Responses must have the same ID as the request they relate to.
     * Notifications (requests without an expected response) should omit the ID.
     */
    id: z
      .union([z.string(), z.number()])
      .optional()
      .describe(
        "An identifier established by the Client that MUST contain a String, Number. Responses must have the same ID as the request they relate to. Notifications (requests without an expected response) should omit the ID."
      ),
  })
  .describe(
    "Base interface for all JSON-RPC messages (Requests and Responses)."
  );
export type JSONRPCMessage = z.infer<typeof JSONRPCMessageSchema>;

/**
 * @description Represents a JSON-RPC request object base structure.
 */
export const JSONRPCRequestSchema = JSONRPCMessageSchema.extend({
  /**
   * @required Request identifier.
   */
  id: z
    .union([z.string(), z.number()])
    .describe(
      "Request identifier. Must be a String, Number, or NULL. The value MUST remain the same throughout the request."
    ),
  /**
   * @required A string containing the name of the method to be invoked.
   */
  method: z
    .string()
    .describe(
      "A String containing the name of the method to be invoked. Method names that begin with the word rpc are reserved and MUST NOT be used."
    ),

  /**
   * @optional Parameters for the method. Can be a structured object, an array, or omitted.
   * @description A Structured value that holds the parameter values to be used during the invocation of the method.
   */
  params: z
    .record(z.string(), z.unknown())
    .optional()
    .describe(
      "A Structured value that holds the parameter values to be used during the invocation of the method."
    ),
}).describe("Represents a JSON-RPC request object base structure.");
export type JSONRPCRequest = z.infer<typeof JSONRPCRequestSchema>;

// /**
//  * @description Represents a JSON-RPC request object with parameters.
//  */
// export const JSONRPCRequestWithParamsSchema = JSONRPCRequestSchema.extend({
//   params: z.unknown(),
// });
// export type JSONRPCRequestWithParams = z.infer<
//   typeof JSONRPCRequestWithParamsSchema
// >;

/**
 * @description Represents a JSON-RPC 2.0 Error object, included in an error response.
 */
export const JSONRPCErrorSchema = z
  .object({
    /**
     * @required A number indicating the error type that occurred.
     */
    code: z
      .number()
      .describe(
        "A Number indicating the error type that occurred. This MUST be an integer."
      ),

    /**
     * @required A string providing a short description of the error.
     */
    message: z
      .string()
      .describe(
        "A String providing a short description of the error. The message SHOULD be limited to a concise single sentence."
      ),

    /**
     * @optional A Primitive or Structured value that contains additional information about the error.
     */
    data: z
      .unknown()
      .optional()
      .describe(
        "A Primitive or Structured value that contains additional information about the error."
      ),
  })
  .describe(
    "Represents a JSON-RPC 2.0 Error object, included in an error response."
  );
export type JSONRPCError = z.infer<typeof JSONRPCErrorSchema>;

/**
 * @description Represents a JSON-RPC 2.0 Success Response object.
 */
export const JSONRPCSuccessResponseSchema = JSONRPCMessageSchema.extend({
  /**
   * @required The result object on success
   * @description The value of this member is determined by the method invoked on the Server.
   */
  result: z
    .unknown()
    .describe(
      "The value of this member is determined by the method invoked on the Server."
    ),

  /**
   * @optional The error object on failure
   * @description Optional 'never' helps enforce exclusivity
   */
  error: z
    .never()
    .optional()
    .describe("Optional 'never' helps enforce exclusivity"),
}).describe("Represents a JSON-RPC 2.0 Success Response object.");

export type JSONRPCSuccessResponse = z.infer<
  typeof JSONRPCSuccessResponseSchema
>;

/**
 * @description Represents a JSON-RPC 2.0 Error Response object.
 */
export const JSONRPCErrorResponseSchema = JSONRPCMessageSchema.extend({
  /**
   * @optional The result object on success
   * @description Optional 'never' helps enforce exclusivity
   */
  result: z
    .never()
    .optional()
    .describe("Optional 'never' helps enforce exclusivity"),
  /**
   * @required The result object on failure
   */
  error: JSONRPCErrorSchema.extend({}).describe(
    "Represents a JSON-RPC 2.0 Error Response object."
  ),
}).describe("Represents a JSON-RPC 2.0 Error Response object.");
export type JSONRPCErrorResponse = z.infer<typeof JSONRPCErrorResponseSchema>;
