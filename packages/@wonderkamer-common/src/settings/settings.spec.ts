import { describe, expect, test } from '@jest/globals';

import { UserPreferenceKey } from './enums/user-preference-key';

import type { Preference, PreferenceMeta, SettingMeta } from './types';

describe('Configuration', () => {
  test('Can create a configuration object without meta', () => {
    const userPreference: Preference<'user'> = {
      key: UserPreferenceKey.selectedOrganisationProfileId,
      value: 'some value',
    };

    expect(userPreference).toEqual({
      key: 'selectedOrganisationProfileId',
      value: 'some value',
    });
  });

  test('Can create a configuration object as meta', () => {
    const userPreferenceMeta: PreferenceMeta<'user'> = {
      key: UserPreferenceKey.selectedOrganisationProfileId,
      type: 'uuid',
      default: null,
      public: false,
      label: 'Selected Organisation Profile',
      description: 'The organisation profile that is currently selected',
    };

    expect(userPreferenceMeta).toEqual({
      default: null,
      description: 'The organisation profile that is currently selected',
      key: UserPreferenceKey.selectedOrganisationProfileId,
      label: 'Selected Organisation Profile',
      public: false,
      type: 'uuid',
    });
  });
});
