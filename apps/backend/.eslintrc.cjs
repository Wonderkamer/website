'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

const baseConfig = configs.nodeESM();

const config = {
  ...baseConfig,

  overrides: [
    ...baseConfig.overrides,
    {
      plugins: ['import'],
      files: ['**/*.ts'],
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
      },
      settings: {
        // https://www.npmjs.com/package/eslint-import-resolver-typescript
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: false, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
            project: '.',
          },
        },
      },
    },

    {
      files: ['**/*.ts'],
      rules: {
        /**
         * any can be useful
         */
        '@typescript-eslint/no-explicit-any': 'off',
        /**
         * The following types do are not defined by the definitely typed packages
         * - @glimmer/tracking/primitives/cache
         *   - getValue
         * - @ember/helper
         *   - invokeHelper
         *   - capabilities
         *   - setHelperManager
         */
        '@typescript-eslint/ban-ts-comment': 'off',
        /**
         * Circular dependencies are a fact of life in NestJS
         */
        'import/no-cycle': 'off',

        /**
         * Using some experimental features is fine
         */
        'n/no-unsupported-features/node-builtins': 'warn',
      },
    },
    {
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
  ],
};

module.exports = config;
