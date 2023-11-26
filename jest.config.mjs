export default {
  preset: 'ts-jest',
  rootDir: './',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__tests__/__mocks__/fileMock.ts',
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(mp4)$': '<rootDir>/src/__tests__/__mocks__/fileMock.ts',
    '^@emotion/react/jsx-dev-runtime$': '@emotion/react/jsx-dev-runtime',
  },
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.{ts,tsx}',
    '!./src/*.d.ts',
    '!/node_modules/',
    '!<rootDir>/coverage/**',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  testEnvironment: 'jsdom', 
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  coverageThreshold: {
    "global": {
      "branches": 50,
      "functions": 50,
      "lines": 50,
      "statements": 50
    }
  }, 
  setupFilesAfterEnv: ['./jest-setup.ts'],
  resolver: 'jest-ts-webcompat-resolver',
};
