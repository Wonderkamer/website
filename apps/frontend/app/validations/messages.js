import { debug } from '@ember/debug';

import defaultMessages from 'ember-changeset-validations/utils/messages';

import application from '../utils/application';

/**
 * This is basicly ember-intl-changeset-validations but then working.
 *
 * The translated messages are built lazily on first access. Under Embroider +
 * Vite the app's modules are imported eagerly during boot, which would run this
 * before the `intl` service exists (the container instance-initializer hasn't
 * set `application.instance` yet). Deferring the work until the messages are
 * actually read avoids looking up `intl` too early.
 */
let cached;

function buildMessages() {
  const intl = application.inject('intl');
  const messages = Object.assign({}, defaultMessages);

  Object.keys(messages).forEach((key) => {
    if (typeof messages[key] !== 'string') {
      return;
    }

    if (messages[key].substring(0, 1) === '_') {
      return;
    }

    const lookupKey = `validations.${key}`;

    if (intl.exists(lookupKey)) {
      messages[key] = intl.getTranslation(lookupKey, intl.primaryLocale);
    } else {
      debug(`missing validation translation: ${lookupKey} (${messages[key]})`);
    }
  });

  return messages;
}

/**
 * Proxy that builds (and caches) the translated messages the first time any
 * property is read, so the `intl` lookup happens after the app has booted.
 */
const messages = new Proxy(
  {},
  {
    get(_target, prop) {
      cached ??= buildMessages();

      return cached[prop];
    },
    ownKeys() {
      cached ??= buildMessages();

      return Reflect.ownKeys(cached);
    },
    getOwnPropertyDescriptor(_target, prop) {
      cached ??= buildMessages();

      return Object.getOwnPropertyDescriptor(cached, prop);
    },
    has(_target, prop) {
      cached ??= buildMessages();

      return prop in cached;
    },
  },
);

export default messages;
