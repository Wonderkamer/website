import { configs, disableTypedLints } from '@nullvoxpopuli/eslint-configs';

export default [
  {
    name: 'wonderkamer/common:ignores',
    ignores: ['dist/**', 'coverage/**', 'scripts/generate-exports.js'],
  },

  ...configs.ember(import.meta.dirname),

  // This is a generic utility library that intentionally leans on `any`/`object`
  // (deep-merge, diff, value objects, ...). Turn off the type-aware lints that
  // flag those patterns, matching the pre-flat-config behaviour.
  disableTypedLints.allTS,

  {
    name: 'wonderkamer/common:ts',
    files: ['**/*.{t,gt}s'],
    rules: {
      // Some glimmer/ember helper types aren't in the typed packages
      '@typescript-eslint/ban-ts-comment': 'off',

      'ember/use-ember-data-rfc-395-imports': 'warn',
      'ember/no-empty-glimmer-component-classes': 'warn',
    },
  },

  {
    name: 'wonderkamer/common:cjs',
    files: ['**/*.{j,cj}s'],
    rules: {
      'n/no-unpublished-require': [
        'error',
        {
          allowModules: ['@nullvoxpopuli/eslint-configs'],
        },
      ],
    },
  },

  {
    // The flat config file imports dev-only tooling.
    name: 'wonderkamer/common:config-files',
    files: ['*.mjs', '*.cjs', '*.js'],
    rules: {
      'n/no-unpublished-import': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },
];
