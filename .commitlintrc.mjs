import config from '@commitlint/config-conventional';

config.rules['type-enum'][2].push('content');

export default {
  extends: ['@commitlint/config-conventional'],
};
