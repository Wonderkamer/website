'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'wonderkamer',
    podModulePrefix: 'wonderkamer/pods',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      baseUrlApi: '',
    },
  };

  ENV['ember-cli-mirage'] = { enabled: true, autostart: true };

  ENV['googleMutantLeaflet'] = {
    apiKey: 'AIzaSyCzKKPg9tJyLo4MqB3quf4PPjKgTMwJ7Rk',
    libraries: [],
    include: true,
  };

  ENV['gReCaptcha'] = {
    jsUrl: 'https://www.google.com/recaptcha/api.js?render=explicit', // default
    siteKey: '6LfxAKwZAAAAAMRHZAx0NYh6Mr0rzHnQOwzgL8-4', // secret is is stored in github action keys, and placed into /public/.htaccess
  };

  ENV['contentSecurityPolicy'] = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval' *.googleapis.com www.google-analytics.com",
    'font-src': "'self' fonts.gstatic.com",
    'img-src': "'self' data: *.googleapis.com maps.gstatic.com *.gstatic.com",
    'connect-src': "'self' www.google-analytics.com",
    'style-src': "'self' 'unsafe-inline' *.googleapis.com",
  };

  ENV['moment'] = {
    // Options:
    // 'all' - all years, all timezones
    // 'subset' - 2012-2022, all timezones
    // 'none' - no data, just timezone API
    includeTimezone: 'all',
    includeLocales: ['nl'],
  };

  const googleTrackingIdsPerEnvironment = {
    development: 'UA-178010455-2',
    testing: 'UA-178010455-2',
    production: 'UA-178010455-1',
  };

  ENV['metricsAdapters'] = [
    {
      name: 'GoogleAnalytics',
      environments: ['development', 'testing', 'production'],
      config: {
        id: googleTrackingIdsPerEnvironment[environment] || googleTrackingIdsPerEnvironment['testing'],
        // Use `analytics_debug.js` in development
        debug: environment !== 'production',
        // Use verbose tracing of GA events
        trace: environment !== 'production',
        // Ensure development env hits aren't sent to GA
        sendHitTask: environment !== 'development',
        // Specify Google Analytics plugins
        require: [], //['ecommerce']
      },
    },
  ];

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.APP.baseUrlApi = 'https://dev.wonderkamer.com';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
