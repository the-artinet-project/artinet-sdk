# Changelog

All notable changes to the @artinet/sdk package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.1] - 2025-05-08

### Added

- Utility for bundling agent code using `esbuild` (`src/utils/deployment/bundler.ts`).
- Task handler wrapper (`taskHandlerProxy`) and `fetchResponseProxy` for streamlined agent deployment logic (`src/utils/deployment/task-wrapper.ts`, `examples/task-wrapper.js`).
- Test deployment functionality (`testDeployment`) to test agent deployments in a sandboxed environment (`src/utils/deployment/test-deployment.ts`).
- New types for server deployment requests and responses (`ServerDeploymentRequestParams`, `ServerDeploymentResponse`, etc. in `src/types/extended-schema.ts`).
- Comprehensive tests for the new bundler and deployment features (`tests/bundler.test.ts`, `tests/deployment.test.ts`).
- Example agents demonstrating code deployment: `examples/code-deployment.js` and `examples/code-deployment.ts`.
- `esbuild` dependency for bundling.

### Changed

- **BREAKING**: Updated `rootDir` in `tsconfig.json` to `src` and `declarationDir` to `./dist/types`. This changes the output structure for type declarations.
- Type declaration paths in `package.json` updated to `dist/types/index.d.ts` to reflect `tsconfig.json` changes.
- Deprecated `JSONRPCSuccessResponse`, `JSONRPCErrorResponse` in `src/types/extended-schema.ts` in favor of the more general `JSONRPCResponse`.
- Enhanced error logging in `src/transport/rpc/parser.ts` by adding response data to parse errors.

## [0.3.0] - 2025-04-28

### Added

- Server option `register: boolean` in `A2AServerParams` to automatically register the agent with the [A2A Registry](https://artinet.io) on startup (default: `false`).
- `A2AServer.registerServer()` method to manually trigger agent registration.
- Server option `fallbackPath: string` in `A2AServerParams` to customize the fallback endpoint for serving the Agent Card (defaults to `/agent-card`). The standard `/.well-known/agent.json` endpoint remains.
- Client constructor option `fallbackPath: string` in `A2AClient` to specify a custom path when fetching the Agent Card if the standard paths fail.

### Changed

- **BREAKING:** Renamed server configuration type from `A2AServerOptions` to `A2AServerParams` for consistency.
- Updated dependencies to latest versions:
    - `eventsource-parser` to `^3.0.1`. Adapted streaming logic (`handleEventStream`) to use `EventSourceMessage` type from this library.
    - `express` to `^5.1.0`.
    - `jayson` to `^4.2.0`.
    - `node:16` to `node:22`
    - `ES2020` to `ES2022`
- Updated various code examples in documentation for improved clarity and consistency (`README.md`, `examples/`).

### Improved

- Refactored server JSON-RPC method handling:
    - Introduced `createJSONRPCMethod` helper for wrapping A2A method logic with dependency injection and error handling.
    - Exported default implementations for standard A2A methods (e.g., `defaultSendTaskMethod`) from `lib/middleware/a2a-methods.js`.
    - Provided `defaultCreateJSONRPCServer` factory demonstrating standard server setup. This simplifies advanced server customization.
- Significantly revised and expanded `README.md` documentation:
    - Updated Features, Class Documentation, and Usage sections.
    - Added detailed section on Server Registration & Discovery.
    - Corrected and clarified Advanced Server Customization examples.
- Updated test suite to incorporate tests for new server registration and fallback path functionalities.

## [0.2.0] - 2025-04-25

### Fixed

- Fixed TypeScript errors related to the `eventsource-parser` package imports
  - Updated imports to use the correct types from `eventsource-parser` v1.1.1
  - Properly typed the `EventSourceMessage` as `ParsedEvent`
  - Refactored `createParser` implementation to match the package's API
- Fixed streaming response handler to use the correct event type checking

### Changed

- Updated `tsconfig.json` to add `isolatedModules: true` for better compatibility with `ts-jest`
- Modified `package.json` test scripts to include `NODE_OPTIONS=--experimental-vm-modules` flag to support ES modules in Jest tests

### Improved

- Expanded test suite to achieve 80% code coverage
  - Added tests for all client methods
  - Added robust error handling tests
  - Added tests for streaming functionality
  - Added tests for push notification configuration
  - Added tests for edge cases in agent card fetching and capability detection

## [0.1.0] - 2025-04-22

### Added

- Initial release of the @artinet/sdk package
- Implementation of the Agent2Agent (A2A) Protocol client
- Support for sending tasks, retrieving statuses, and canceling operations
- Support for streaming responses and push notifications
- Comprehensive test suite and documentation

<!-- [Unreleased]: https://github.com/artinet/sdk/compare/v0.2.0...HEAD -->
[0.2.0]: https://github.com/the-artinet-project/artinet-sdk/commit/e0b908327e0251d6f6241f9b0294e16bc07fa527
[0.1.0]: https://github.com/the-artinet-project/artinet-sdk/commit/c07bd01a225b09de65b70144e8963b8a1143d324
