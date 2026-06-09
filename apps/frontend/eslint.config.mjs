import { configs, disableTypedLints } from '@nullvoxpopuli/eslint-configs';

const emberConfig = configs.ember(import.meta.dirname);

// nvp registers the plugins we want to tweak (ember, @typescript-eslint, n, ...)
// across several flat-config objects. Flat config requires a plugin to be
// registered in the same object a rule is used in, so collect nvp's plugin
// instances and re-register the ones our overrides reference.
const registeredPlugins = Object.assign({}, ...emberConfig.map((config) => config.plugins).filter(Boolean));

const sharedPlugins = {
  ember: registeredPlugins.ember,
  '@typescript-eslint': registeredPlugins['@typescript-eslint'],
  n: registeredPlugins.n,
};

export default [
  {
    name: 'wonderkamer/frontend:ignores',
    ignores: ['dist/**', 'tmp/**', 'coverage/**', 'compat/**', 'vendor/**', 'declarations/**'],
  },

  // ember-eslint (via nvp v6) already applies the gjs/gts recommended configs.
  ...emberConfig,

  // The app has a fair amount of necessarily-untyped glue with Ember/Embroider
  // internals (config-meta-loader, container lookups, intl). Turn off the
  // type-aware lints that flag those, matching the pre-flat-config behaviour.
  disableTypedLints.allTS,

  {
    name: 'wonderkamer/frontend:ts',
    files: ['**/*.{t,gt}s'],
    plugins: sharedPlugins,
    rules: {
      // any can be useful
      '@typescript-eslint/no-explicit-any': 'off',
      // Some glimmer/ember helper types aren't in the typed packages
      '@typescript-eslint/ban-ts-comment': 'off',

      'ember/use-ember-data-rfc-395-imports': 'warn',
    },
  },

  {
    name: 'wonderkamer/frontend:cjs',
    files: ['**/*.{j,cj}s'],
    plugins: sharedPlugins,
    rules: {
      'n/no-unpublished-require': [
        'error',
        {
          allowModules: ['@embroider/compat', '@embroider/vite', '@nullvoxpopuli/eslint-configs', 'ember-cli'],
        },
      ],
    },
  },

  {
    // Dev tooling config files run under the local toolchain's Node, not the
    // app's declared engines range.
    name: 'wonderkamer/frontend:config-files',
    files: ['*.mjs', '*.cjs', '*.js'],
    plugins: sharedPlugins,
    rules: {
      'n/no-unpublished-import': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },
];
