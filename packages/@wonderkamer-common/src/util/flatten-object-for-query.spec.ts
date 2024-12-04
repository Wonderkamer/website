import { describe, expect, test } from '@jest/globals';

import { flattenObjectForQuery } from './flatten-object-for-query';

test('flattens deep object', () => {
  const object = {
    page: {
      page: 1,
      take: 10,
    },
    filter: {
      query: 'query',
    },
    something: {
      very: { deep: 'query' },
    },
    even: {
      very: { deep: ['arrays'] },
    },
  };

  const flattened = flattenObjectForQuery(object);

  expect(flattened).toEqual({
    'even[very][deep][0]': 'arrays',
    'page[page]': 1,
    'page[take]': 10,
    'filter[query]': 'query',
    'something[very][deep]': 'query',
  });
});
