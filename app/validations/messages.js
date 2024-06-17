import { debug } from '@ember/debug';
import application from '@wonderkamer/website/utils/application';
import defaultMessages from 'ember-changeset-validations/utils/messages';

/**
 * This is basicly ember-intl-changeset-validations but then working
 */
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

export default messages;
