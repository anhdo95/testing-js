module.exports = {
  roots: ['<rootDir>/src'],
  // we have no coverageThreshold on this project...
  coverageThreshold: {},
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)'],
  setupFilesAfterEnv: ['./tests/setup-env.js'],
  // watchPlugins: [
  //   require.resolve('jest-watch-typeahead/filename'),
  //   require.resolve('jest-watch-typeahead/testname'),
  // ],
}
