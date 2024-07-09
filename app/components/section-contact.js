import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Changeset } from 'ember-changeset';
import { action } from '@ember/object';
import { ContactForm, ContactFormValidations } from '../changesets/contact-form';
import lookupValidator from 'ember-changeset-validations';
import { inject as service } from '@ember/service';

export default class SectionContactComponent extends Component {
  @service metrics;

  @tracked changeset;
  @tracked isSubmitted = false;

  @tracked reCaptchaReference;

  constructor(...rest) {
    super(...rest);

    this.changeset = new Changeset(new ContactForm(), lookupValidator(ContactFormValidations), ContactFormValidations);
  }

  @action
  onSubmit() {
    this.changeset.validate().then(() => {
      if (this.changeset.isInvalid) {
        return;
      }

      this.changeset.save().then((response) => {
        if (response['success'] === true) {
          this.metrics.trackEvent('GoogleAnalytics', {
            category: 'communication',
            action: 'submitted-contact-form',
          });

          this.isSubmitted = true;
        }
      });
    });
  }

  @action
  onCaptchaResolved(token) {
    this.changeset.reCaptchaToken = token;

    this.changeset.validate();
  }

  @action
  onCaptchaExpired() {
    this.changeset.reCaptchaToken = null;

    this.changeset.validate();
    this.reCaptchaReference.resetReCaptcha();
  }
}
