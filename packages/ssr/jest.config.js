const { pathsToModuleNameMapper } = require(`ts-jest/utils`);

const { compilerOptions } = require(`./tsconfig`);

module.exports = {
  preset: `ts-jest`,
  testEnvironment: `jsdom`,
  testPathIgnorePatterns: [`/node_modules/`, `/.next/`],
  snapshotResolver: `<rootDir>/tests/snapshotResolver.ts`,
  testMatch: [`**/__tests__/**/*.[jt]s?(x)`, `**/?(*.)+(specs|tests).[tj]s?(x)`],
  collectCoverage: true,
  collectCoverageFrom: [`src/**/*.ts(x)?`],
  coverageDirectory: `<rootDir>/tests/coverage/`,
  setupFilesAfterEnv: [`<rootDir>/tests/setupTests.ts`],
  modulePaths: [`<rootDir>/src/`],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: `<rootDir>/src/`,
  }),
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/tests/mocks/fileTransformer.js`,
  },
  globals: {
    NODE_ENV: `test`,
    'ts-jest': {
      tsconfig: `tsconfig.jest.json`,
      diagnostics: true,
    },
  },
};