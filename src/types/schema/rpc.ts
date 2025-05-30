/**
 * @description Base interface for all JSON-RPC messages (Requests and Responses).
 * @required jsonrpc
 * @optional id
 */
export interface JSONRPCMessage {
  /**
   * @required Specifies the JSON-RPC version. Must be "2.0".
   * @default "2.0"
   * @const "2.0"
   */
  readonly jsonrpc: "2.0";

  /**
   * @optional An identifier established by the Client that MUST contain a String, Number.
   * @description Can be a string, number. Responses must have the same ID as the request they relate to.
   * Notifications (requests without an expected response) should omit the ID.
   */
  id?: number | string;
}

/**
 * @description Represents a JSON-RPC request object base structure.
 * @required method
 * @optional params
 */
export interface JSONRPCRequest<Method = string, Params = unknown>
  extends JSONRPCMessage {
  /**
   * @required Request identifier.
   */
  id: number | string;

  /**
   * @required The name of the method to be invoked.
   */
  method: Method;

  /**
   * @optional Parameters for the method. Can be a structured object, an array, or omitted.
   * @description A Structured value that holds the parameter values to be used during the invocation of the method.
   */
  params?: Params;
}

/**
 * @description Represents a JSON-RPC error object.
 * @required code
 * @required message
 * @optional data
 */
export interface JSONRPCError<Code = number, Data = unknown> {
  /**
   * @required A number indicating the error type that occurred.
   */
  code: Code;

  /**
   * @required A string providing a short description of the error.
   */
  message: string;

  /**
   * @optional A Primitive or Structured value that contains additional information about the error.
   */
  data?: Data;
}

/**
 * @description Represents a JSON-RPC 2.0 Success Response object.
 * @required result
 * @never error
 */
export interface JSONRPCSuccessResponse<R = unknown> extends JSONRPCMessage {
  /**
   * @required The result object on success
   */
  result: R;

  /**
   * @optional The error object on failure
   * @description Optional 'never' helps enforce exclusivity
   */
  error?: never;
}

/**
 * @description Represents a JSON-RPC 2.0 Error Response object.
 * @never result
 * @required error
 */
export interface JSONRPCErrorResponse<E = unknown> extends JSONRPCMessage {
  /**
   * @optional The result object on success
   * @description Optional 'never' helps enforce exclusivity
   */
  result?: never;
  /**
   * @required The result object on failure
   */
  error: E;
}

/**
 * @description Represents a JSON-RPC response object.
 * @oneOf JSONRPCSuccessResponse | JSONRPCErrorResponse
 */
export type JSONRPCResponse<R = unknown, E = unknown> =
  | JSONRPCSuccessResponse<R>
  | JSONRPCErrorResponse<E>;
