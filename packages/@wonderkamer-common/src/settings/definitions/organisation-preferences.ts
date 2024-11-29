import { OrganisationPreferenceKey } from '../enums/organisation-preference-key';

import type { PreferenceMeta } from '../types';

export const OrganisationPreferencesDefinitions: PreferenceMeta<'organisation'>[] = [
  {
    key: OrganisationPreferenceKey.dummySetting,
    type: 'string',
    default: 'light',
    public: false,
    label: 'Dummy Setting',
    description: 'This is a dummy setting.',
  },
];
