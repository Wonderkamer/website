import Application from '@ember/application';
import application from '@wonderkamer/website/utils/application';
/**
 * initialize runs upon app instance initialization. It simply set the instance.
 * `application.instance` is used by `app/validations/messages` to lookup the
 * i18n service so it can translate error messages.
 */
export function initialize(applicationInstance: Application) {
  application.instance = applicationInstance;
}

export default {
  initialize,
};
