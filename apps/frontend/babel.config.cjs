const { babelCompatSupport, templateCompatSupport } = require('@embroider/compat/babel');

module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        allExtensions: true,
        onlyRemoveTypeImports: true,
        allowDeclareFields: true,
      },
    ],
    [
      'babel-plugin-ember-template-compilation',
      {
        enableLegacyModules: ['ember-cli-htmlbars', 'ember-cli-htmlbars-inline-precompile', 'htmlbars-inline-precompile'],
        transforms: [...templateCompatSupport()],
      },
    ],
    // ember-concurrency v4 async-arrow task transform
    // (was configured under the `babel` key of the old ember-cli-build.js).
    require.resolve('ember-concurrency/async-arrow-task-transform'),
    [
      'module:decorator-transforms',
      {
        runtime: {
          import: require.resolve('decorator-transforms/runtime-esm'),
        },
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: __dirname,
        useESModules: true,
        regenerator: false,
      },
    ],
    ...babelCompatSupport(),
  ],

  generatorOpts: {
    compact: false,
  },
};
