// https://dev.to/jelhan/format-glimmer-templates-with-prettier-ipa

module.exports = {
  singleQuote: true,
  printWidth: 160,
  importOrderSeparation: true,
  'eol-last': 'always',
  overrides: [
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
