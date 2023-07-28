import { validateLength, validatePresence, validateFormat } from 'ember-changeset-validations/validators';
import fetch from 'fetch';

class ContactForm {
  name = '';
  subject = '';
  email = '';
  phone = '';
  message = '';
  reCaptchaToken = null;

  async save() {
    const url = '/contact-form.php';
    let headers = new Headers();

    //    headers.set('Authorization', 'Basic ' + btoa('pre' + ':' + 'view'));
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        name: this.name,
        phone: this.phone,
        email: this.email,
        subject: this.subject,
        message: this.message,
        reCaptchaToken: this.reCaptchaToken,
      }),
    });

    return await response.json();
  }
}

const ContactFormValidations = {
  name: [
    validatePresence({
      presence: true,
      ignoreBlank: true,
      description: 'naam',
    }),
    validateLength({ max: 30, description: 'naam' }),
  ],
  email: [
    validatePresence({
      presence: true,
      ignoreBlank: true,
      description: 'e-mail',
    }),
    validateFormat({ type: 'email', description: 'e-mail' }),
  ],
  phone: [
    validatePresence({
      presence: true,
      ignoreBlank: true,
      description: 'telefoon',
    }),
    validateLength({ max: 30, description: 'telefoon' }),
  ],
  subject: [
    validatePresence({
      presence: true,
      ignoreBlank: true,
      description: 'onderwerp',
    }),
    validateLength({ max: 120, description: 'onderwerp' }),
  ],
  message: [
    validatePresence({
      presence: true,
      ignoreBlank: true,
      description: 'boodschap',
    }),
    validateLength({ max: 1000, description: 'boodschap' }),
  ],
  reCaptchaToken: [
    validatePresence({
      presence: true,
      ignoreBlank: true,
      description: 'captcha',
    }),
  ],
};

export { ContactForm, ContactFormValidations };
