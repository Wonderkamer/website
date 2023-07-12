// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:ember/recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
  },
  rules: {
    // add your custom rules and overrides for node files here
    'no-unused-vars': ['error', { args: 'none' }],
    'prettier/prettier': ['error', { singleQuote: true, printWidth: 160 }],
    'ember/classic-decorator-hooks': 'error',
    'ember/classic-decorator-no-classic-methods': 'error',

    // this can be removed once the following is fixed
    // https://github.com/mysticatea/eslint-plugin-node/issues/77
    'node/no-unpublished-require': 'off',
  },
  overrides: [
    // node files
    {
      files: [
        '.prettierrc.js',
        '.commitlintrc.js',
        '.template-lintrc.js',
        'lint-staged.config.js',
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js',
      ],
      env: {
        node: true,
      },
    },
  ],
};
