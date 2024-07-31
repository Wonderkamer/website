import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

import { ContactForm, ContactFormValidations } from '../changesets/contact-form';

import type { Metrics } from 'ember-metrics/services/metrics';

interface Signature {
  Args: Record<string, never>;
}

export default class SectionContactComponent extends Component<Signature> {
  @service metrics!: Metrics;

  @tracked changeset: any;
  @tracked isSubmitted = false;

  @tracked reCaptchaReference: any;

  constructor(owner: unknown, args: Signature['Args']) {
    super(owner, args);

    this.changeset = Changeset(new ContactForm(), lookupValidator(ContactFormValidations), ContactFormValidations);
  }

  @action
  async onSubmit() {
    await this.changeset.validate();

    if (this.changeset.isInvalid) {
      return;
    }

    try {
      const response = await this.changeset.save();

      if (response.success === true) {
        this.metrics.trackEvent('GoogleAnalytics', {
          category: 'communication',
          action: 'submitted-contact-form',
        });
        this.isSubmitted = true;
      }
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  }

  @action
  onCaptchaResolved(token: string) {
    this.changeset['reCaptchaToken'] = token;

    this.changeset.validate();
  }

  @action
  onCaptchaExpired() {
    this.changeset['reCaptchaToken'] = null;

    this.changeset.validate();
    this.reCaptchaReference.resetReCaptcha();
  }
}
