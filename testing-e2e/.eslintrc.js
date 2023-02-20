const path = require('path')

module.exports = {
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
    'jest/globals': true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'prettier',
    'plugin:react/recommended',
    'plugin:testing-library/react',
    'plugin:jest/recommended',
  ],
  plugins: [
    'import',
    'react',
    'react-hooks',
    'jest',
    'jest-dom',
    'testing-library',
  ],
  rules: {
    // https://github.com/benmosher/eslint-plugin-import/issues/1446
    'import/named': 'off',
    'jest/require-hook': 'off',
    'jest/expect-expect': 'off',
    'jest/require-top-level-describe': 'off',
    'jest/prefer-expect-assertions': 'off',
  },
  settings: {'import/resolver': 'node'},
  overrides: [
    {
      files: ['**/src/**'],
      settings: {'import/resolver': 'webpack'},
    },
    {
      files: ['**/__tests__/**'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config.js'),
          },
        },
      },
    },
  ],
}
