import '@glint/environment-ember-loose';

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
      EmberTruthHelpersRegistry {}
}
