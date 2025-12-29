import globals from 'globals';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import js from '@eslint/js';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      'eslint.config.mjs',
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
      'src/**/*.test.ts',
    ]
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    ...fixupConfigRules(compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
      'plugin:storybook/recommended',
    ))[0],

    plugins: {
      react: fixupPluginRules(react),
      '@typescript-eslint': typescriptEslint,
    },

    rules: {
      'no-unused-vars': [0],
      'react/prop-types': [0],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
    },
  },
  {
    files: ['**/*.test.*'],

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  }
];
