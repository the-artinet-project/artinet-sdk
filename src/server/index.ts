/**
 * We'll need to remove express from the core package in order to decouple express logic from core business logic.
 * Moving forward, it will be a peer dependency and can be used via `@artinet/sdk/express`.
 * ```typescript
 * import { createAgentServer } from "@artinet/sdk/express";
 * ```
 */
export * from "./express/index.js";
//TODO: detect which server adapter is being used and export the appropriate adapter for the cr8 module
//We'll default to httpTransportHandler if one is not detected
export { native } from "./adapters/a2a_request_handler.js";
export { tasks } from "./adapters/loadable.js";
