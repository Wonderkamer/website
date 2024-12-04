import type { DashboardSettingKey } from './enums/dashboard-setting-key';
import type { OrganisationPreferenceKey } from './enums/organisation-preference-key';
import type { UserPreferenceKey } from './enums/user-preference-key';

// mapping of entity names to their key types
type EntityKeys = {
  dashboard: DashboardSettingKey;
  user: UserPreferenceKey;
  organisation: OrganisationPreferenceKey;
};

type ConfigurationType = 'string' | 'number' | 'boolean' | 'password' | 'uuid' | 'options';

type Configuration<Entity extends keyof EntityKeys> = {
  key: EntityKeys[Entity];
  value: any;
};

type ConfigurationMeta<Entity extends keyof EntityKeys> = {
  key: EntityKeys[Entity];
  type: ConfigurationType;
  options?: never;
  default: any;
  public: boolean;
  component?: (settings: Setting<Entity>[] | Preference<Entity>[]) => string | undefined;
  label: string;
  description: string;
  category?: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
};

type OptionsTypeConfigurationOptions = {
  label: string;
  value: any;
};

type OptionsTypeConfiguration<Entity extends keyof EntityKeys> = {
  key: EntityKeys[Entity];
  default: any;
  public: boolean;
  type: 'options';
  options: OptionsTypeConfigurationOptions[];
  component?: (settings: Setting<Entity>[] | Preference<Entity>[]) => string | undefined;
};

export type Setting<Entity extends keyof EntityKeys> = Configuration<Entity>;
export type Preference<Entity extends keyof EntityKeys> = Configuration<Entity>;

export type SettingMeta<Entity extends keyof EntityKeys> = ConfigurationMeta<Entity> | OptionsTypeConfiguration<Entity>;
export type PreferenceMeta<Entity extends keyof EntityKeys> = ConfigurationMeta<Entity> | OptionsTypeConfiguration<Entity>;

export type DashboardSettings = {
  [key in DashboardSettingKey]?: any;
};

export type UserPreference = {
  [key in UserPreferenceKey]?: any;
};

export type OrganisationPreference = {
  [key in OrganisationPreferenceKey]?: any;
};
