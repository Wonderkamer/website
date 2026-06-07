import '@glint/environment-ember-loose';

import type { ComponentLike } from '@glint/template';
import type EmberHeadlessFormRegistry from 'ember-headless-form/template-registry';
import type EmberHeadlessFormChangesetRegistry from 'ember-headless-form-changeset/template-registry';
import type EmberIntlRegistry from 'ember-intl/template-registry';
import type EmberPageTitleRegistry from 'ember-page-title/template-registry';
import type EmberStargateRegistry from 'ember-stargate/template-registry';
import type EmberStyleModifierRegistry from 'ember-style-modifier/template-registry';
import type EmberTruthHelpersRegistry from 'ember-truth-helpers/template-registry';

// Register the globally-invokable helpers, modifiers and components provided by
// our addons so Glint can resolve them in loose-mode (`.hbs`) templates.
declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends
      EmberHeadlessFormRegistry,
      EmberHeadlessFormChangesetRegistry,
      EmberIntlRegistry,
      EmberPageTitleRegistry,
      EmberStargateRegistry,
      EmberStyleModifierRegistry,
      EmberTruthHelpersRegistry {
    // ember-g-recaptcha ships no Glint types; register the surface we use.
    GRecaptcha: ComponentLike<{
      Element: HTMLDivElement;
      Args: {
        onSuccess?: (token: string) => void;
        onExpired?: () => void;
        ref?: unknown;
      };
    }>;
  }
}
