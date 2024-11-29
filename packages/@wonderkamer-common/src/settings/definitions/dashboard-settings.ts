import { DashboardSettingKey } from '../enums/dashboard-setting-key';

import type { SettingMeta } from '../types';

export enum DashboardSettingsDefinitionsCategory {
  categoryName = 'some-category-name',
}

export const DashboardSettingsDefinitions: SettingMeta<'dashboard'>[] = [
  {
    key: DashboardSettingKey.dummySetting,
    type: 'string',
    default: null,
    category: DashboardSettingsDefinitionsCategory.categoryName,
    public: true,
    label: 'Dummy',
    description: 'This is a dummy setting.',
  },
];
