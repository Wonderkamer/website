'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const isProductionLikeBuild = ['production', 'testing'].indexOf(EmberApp.env()) > -1;

module.exports = async function (defaults) {
  const { setConfig } = await import('@warp-drive/build-config');

  let app = new EmberApp(defaults, {
    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
      insertEmberWormholeElementToDom: false,
      include: [],
    },
    'ember-cli-terser': {
      enabled: isProductionLikeBuild,

      exclude: ['favicon-*.png', 'members/**/*.jpg', 'assets'],

      // Tell broccoli-terser-sourcemap to not add sourcemap URLs
      hiddenSourceMap: true,
    },
    babel: {
      plugins: [
        require.resolve('ember-concurrency/async-arrow-task-transform'), // due to https://ember-concurrency.com/docs/v4-upgrade/
      ],
    },
    fingerprint: {
      enabled: isProductionLikeBuild,
      exclude: ['favicon-*.png', 'members', 'assets'],
    },

    'ember-math-helpers': {
      only: ['mod', 'mult'],
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  });

  setConfig(app, __dirname, {
    // WarpDrive/EmberData settings go here (if any)
    compatWith: process.env.EMBER_DATA_FULL_COMPAT ? '99.0' : null,
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });

  // return app.toTree();
};
