/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:storybook/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  overrides: [{
    files: ['*.test.*'],
    env: {
      jest: true
    }
  }],
  'rules': {
    'no-unused-vars': [0],
    'indent': ['error', 2],
    'react/prop-types': [0],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  }
};
