# Changelog

All notable changes to the @artinet/sdk package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

- Expanded test suite to achieve 95% code coverage
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

[0.2.0]: https://github.com/artinet/sdk/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/artinet/sdk/releases/tag/v0.1.0
