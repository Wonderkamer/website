'use strict';

// https://dev.to/jelhan/format-glimmer-templates-with-prettier-ipa

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: ['octane', 'ember-template-lint-plugin-prettier:recommended'],
};
