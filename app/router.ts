import EmberRouter from '@ember/routing/router';

import config from '@wonderkamer/website/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '' }, function () {
    this.route('about');
    this.route('impressions');
    this.route('members', { path: 'leden' }, function () {
      this.route('member', { path: ':slug' });
    });
    this.route('map');
    this.route('contact');
  });
  this.route('occupancy', { path: '/bezetting' });
});
