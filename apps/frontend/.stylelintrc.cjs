'use strict';

module.exports = {
  extends: ['stylelint-config-recommended'], //, 'stylelint-config-tailwindcss'],
  customSyntax: 'postcss-scss',
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'layer', 'apply', 'config', 'variants', 'responsive', 'screen', 'reference', 'source', 'plugin', 'theme', 'utility', 'custom-variant'],
      },
    ],
    'at-rule-no-deprecated': [
      true,
      {
        ignoreAtRules: ['tailwind', 'layer', 'apply', 'config', 'variants', 'responsive', 'screen', 'reference', 'source', 'plugin', 'theme', 'utility', 'custom-variant'],
      },
    ],
  },
};
