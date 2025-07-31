/**
 * @description Supported A2A transport protocols.
 */
export enum TransportProtocol {
  /** JSON-RPC 2.0 over HTTP (mandatory) */
  JSONRPC = "JSONRPC",
  /** gRPC over HTTP/2 (optional) */
  GRPC = "GRPC",
  /** REST-style HTTP with JSON (optional) */
  HTTP_JSON = "HTTP+JSON",
}

/**
 * @description Declares a combination of a target URL and a transport protocol for interacting with the agent.
 * This allows agents to expose the same functionality over multiple transport mechanisms.
 */
export interface AgentInterface {
  /**
   * @required The URL where this interface is available. Must be a valid absolute HTTPS URL in production.
   */
  url: string;

  /**
   * @required The transport protocol supported at this URL.
   */
  transport: TransportProtocol | string;
}
