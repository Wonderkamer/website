'use strict';

module.exports = {
  /**
    Ember CLI sends analytics information by default. The data is completely
    anonymous, but there are times when you might want to disable this behavior.

    Setting `disableAnalytics` to true will prevent any data from being sent.
  */
  disableAnalytics: false,

  /**
  Setting `isTypeScriptProject` to true will force the blueprint generators to generate TypeScript
  rather than JavaScript by default, when a TypeScript version of a given blueprint is available.
  */
  isTypeScriptProject: true,

  packageManager: 'pnpm',

  liveReload: true,
  ssl: false,
  host: '127.0.0.1',
  port: 4222,

  liveReloadJsUrl: 'http://127.0.0.1:4222/_lr/livereload.js?path=_lr/livereload',
};
