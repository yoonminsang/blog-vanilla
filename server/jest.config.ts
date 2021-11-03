export default {
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  // testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+test.ts'],
  // [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ]
  transform: {
    '\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
