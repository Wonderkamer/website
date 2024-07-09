import Application from '@ember/application';
import type IntlService from 'ember-intl/services/intl';

export default {
  name: 'intl',
  after: 'container',
  async initialize(applicationInstance: Application) {
    const intl: IntlService = applicationInstance.lookup('service:intl') as IntlService;

    intl.setLocale('nl');

    function missingMessage(key: string, locales: string[], options?: Record<string, unknown>): string {
      const indexSubKey = '_';

      // retry with ._ added to the key
      if (indexSubKey !== key.split('.').pop()) {
        return intl.t(`${key}.${indexSubKey}`, options as any);
      }

      // was this a retry, then rename the key...
      if (indexSubKey === key.split('.').pop()) {
        key = key
          .split('.')
          .splice(0, key.split('.').length - 1)
          .join('.');
      }

      return `${key}`;
    }

    intl.setOnMissingTranslation(missingMessage);
  },
};
