import { defineConfig, globalIgnores } from 'eslint/config';
import * as globals from 'globals';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';

import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import js from '@eslint/js';

import {FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([{
  languageOptions: {
    globals: {
      ...globals.browser,
    },

    parser: tsParser,
    'ecmaVersion': 12,
    'sourceType': 'module',

    parserOptions: {
      'ecmaFeatures': {
        'jsx': true,
      },
    },
  },

  extends: fixupConfigRules(compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:storybook/recommended',
  )),

  plugins: {
    react: fixupPluginRules(react),
    '@typescript-eslint': typescriptEslint,
  },

  'rules': {
    'no-unused-vars': [0],
    // 'indent': ['error', 2],
    'react/prop-types': [0],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  },
}, {
  files: ['**/*.test.*'],

  languageOptions: {
    globals: {
      ...globals.jest,
    },
  },
}, globalIgnores([
  'dist/',
  'types/',
  'docs/',
  'demo/',
  '.storybook/',
  'coverage/',
  'scripts/',
  'src/**/*.story.tsx',
  'src/**/*.test.ts',
])]);
