module.exports = {
  ...require('./test/jest-common'),
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 10,
      functions: 15,
      lines: 15,
    },
    './src/shared/utils.js': {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '__server_tests__/',
  ],
  projects: [
    './test/jest.lint.js',
    './test/jest.client.js',
    './test/jest.server.js',
  ],
}
