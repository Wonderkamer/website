import { UserPreferenceKey } from '../enums/user-preference-key';

import type { PreferenceMeta } from '../types';

export const UserPreferencesDefinitions: PreferenceMeta<'user'>[] = [
  {
    key: UserPreferenceKey.selectedOrganisationProfileId,
    type: 'string',
    default: null,
    public: false,
    label: 'Selected Organisation Profile',
    description: 'The organisation profile that is currently selected',
  },
  {
    key: UserPreferenceKey.theme,
    type: 'string',
    default: null,
    public: false,
    label: 'Theme Color',
    description: 'The theme color that is currently selected',
  },
];
