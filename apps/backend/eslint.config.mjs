import globals from 'globals';
import tseslint from 'typescript-eslint';

import { configs } from '@nullvoxpopuli/eslint-configs';

export default [
  {
    name: 'wonderkamer/backend:ignores',
    ignores: ['dist/**', 'coverage/**'],
  },

  ...configs.node(import.meta.dirname),

  // Apply typescript-eslint's recommended rules to TS files. This also turns off
  // the conflicting core rules (no-redeclare / no-unused-vars) in favour of the
  // type-aware versions, which understand things like NestJS DI constructor
  // parameter properties and imported decorators (Body, Response, ...).
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),

  {
    name: 'wonderkamer/backend:ts',
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // turn on errors for missing imports
      'import/no-unresolved': 'warn',
      'n/no-missing-import': 'off',
      'import/named': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: true,
          prefer: 'no-type-imports',
        },
      ],
      // NestJS injects dependencies via constructor parameter properties that
      // are only used through `this`; don't flag those (or `_`-prefixed args).
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // any can be useful
      '@typescript-eslint/no-explicit-any': 'off',
      // Some glimmer/ember helper types aren't in the typed packages
      '@typescript-eslint/ban-ts-comment': 'off',
      // Circular dependencies are a fact of life in NestJS
      'import/no-cycle': 'off',
      // Using some experimental features is fine
      'n/no-unsupported-features/node-builtins': 'warn',
    },
    settings: {
      // https://www.npmjs.com/package/eslint-import-resolver-typescript
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
      'import/resolver': {
        typescript: {
          // always try to resolve types under `<root>@types` even when they
          // contain no source code (e.g. `@types/unist`)
          alwaysTryTypes: false,
          project: '.',
        },
      },
    },
  },

  {
    name: 'wonderkamer/backend:cjs',
    files: ['**/*.{j,cj}s'],
    rules: {
      'n/no-unpublished-require': [
        'error',
        {
          allowModules: [],
        },
      ],
    },
  },

  {
    name: 'wonderkamer/backend:tests',
    files: ['**/*.spec.ts', '**/*.e2e-spec.ts', 'test/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
  },

  {
    // Dev tooling config files run under the local toolchain's Node, not the
    // app's declared engines range, so don't gate them on node-builtins support.
    name: 'wonderkamer/backend:config-files',
    files: ['*.mjs', '*.cjs', '*.js'],
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },
];
