'use strict';

module.exports = {
  printWidth: 160,
  overrides: [
    {
      files: '*.{js,ts}',
      options: {
        singleQuote: true,
        printWidth: 160,
        importOrderSeparation: true,
        'eol-last': 'always',
      },
    },
    {
      files: '*.hbs',
      options: {
        parser: 'glimmer',
        singleQuote: false,
        // ember-template-lint stylistic rules
        'block-indentation': false,
        'linebreak-style': false,
        quotes: false,
        'self-closing-void-elements': false,
        'eol-last': 'never',
      },
    },
  ],
};
