'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { compatBuild } = require('@embroider/compat');
const { buildOnce } = require('@embroider/vite');

module.exports = async function (defaults) {
  const { setConfig } = await import('@warp-drive/build-config');

  const app = new EmberApp(defaults, {});

  setConfig(app, __dirname, {
    // WarpDrive/EmberData settings go here (if any)
    compatWith: process.env.EMBER_DATA_FULL_COMPAT ? '99.0' : null,
    deprecations: {
      DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false,
      // We provide Ember's reactivity via `import '@warp-drive/ember/install'`
      // in app.ts, so the legacy @ember-data/tracking package is not needed.
      DEPRECATE_TRACKING_PACKAGE: false,
    },
  });

  return compatBuild(app, buildOnce, {});
};
