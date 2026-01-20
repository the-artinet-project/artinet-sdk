export default {
  errorOnDeprecated: false,
  // silent: true,
  forceExit: true,
  testEnvironment: "node",
  preset: "ts-jest",
  extensionsToTreatAsEsm: [".ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^~/(.*).js$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};
