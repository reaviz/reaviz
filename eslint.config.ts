import { defineConfig, globalIgnores } from 'eslint/config';
import * as globals from 'globals';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';

import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import js from '@eslint/js';

import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
        'plugin:storybook/recommended'
      )
    ),

    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks)
    },

    rules: {
      'no-unused-vars': [0],
      // 'indent': ['error', 2],
      'react/prop-types': [0],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'react-hooks/exhaustive-deps': ['warn'],
      // React Compiler readiness rules (new in eslint-plugin-react-hooks v7) —
      // disabled until the codebase adopts React Compiler
      'react-hooks/preserve-manual-memoization': [0],
      'react-hooks/immutability': [0],
      'react-hooks/set-state-in-effect': [0],
      'react-hooks/refs': [0]
    }
  },
  {
    files: ['**/*.test.*'],

    languageOptions: {
      globals: {
        ...globals.vitest
      }
    }
  },
  globalIgnores([
    'eslint.config.ts',
    'vite.config.ts',
    'storybook-static/',
    'dist/',
    'types/',
    'docs/',
    'demo/',
    '.storybook/',
    'coverage/',
    'scripts/',
    'src/**/*.story.tsx',
    'src/**/*.test.ts'
  ])
]);
