/**
 * Export an Object with the app instance set to null. Later initilized by
 * `app/instance-initializers/container` during application boot.
 *
 * Exports {Object} containing an `instance` member (null by default).
 */
class Application {
  _instance: any = null;

  get instance() {
    return this._instance;
  }

  set instance(app) {
    this._instance = app;
  }

  inject(name: string) {
    return this._instance.lookup(`service:${name}`);
  }
}

export default new Application();
