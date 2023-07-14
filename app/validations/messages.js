import application from '@wonderkamer/website/utils/application';
import defaultMessages from 'ember-changeset-validations/utils/messages';
import { debug } from '@ember/debug';

/**
 * This is basicly ember-intl-changeset-validations but then working
 */
const intl = application.instance.lookup('service:intl');

const messages = Object.assign({}, defaultMessages);

Object.keys(messages).forEach((key) => {
  if (typeof messages[key] !== 'string') {
    return;
  }

  if (messages[key].substring(0, 1) === '_') {
    return;
  }

  let lookupKey = `validations.${key}`;
  if (intl.exists(lookupKey)) {
    messages[key] = intl.lookup(lookupKey);
  } else {
    debug(`missing validation translation: ${lookupKey} (${messages[key]})`);
  }
});

export default messages;
