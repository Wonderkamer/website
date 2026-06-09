import './assets/tailwind.css';
import './assets/fonts.css';
import './assets/styles.css';

import Application from '@ember/application';

import compatModules from '@embroider/virtual/compat-modules';
import config from '@wonderkamer/frontend/config/environment';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver.withModules(compatModules);
}

loadInitializers(App, config.modulePrefix, compatModules);
