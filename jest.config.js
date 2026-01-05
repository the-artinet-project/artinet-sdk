export default {
  testTimeout: 30000,
  forceExit: true,
  testEnvironment: "node",
  preset: "ts-jest",
  extensionsToTreatAsEsm: [".ts"],
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
