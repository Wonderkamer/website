import { registerAs } from '@nestjs/config';
import { toBoolean } from '@wonderkamer/common/util/to-boolean';

export interface FeaturesConfig {
  animateSpinner: boolean;
}

export default registerAs(
  'features',
  (): FeaturesConfig => ({
    animateSpinner: toBoolean(process.env.FEATURE_ANIMATE_SPINNER ?? true),
  }),
);
