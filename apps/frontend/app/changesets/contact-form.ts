import { validateFormat, validateLength, validatePresence } from 'ember-changeset-validations/validators';

class ContactForm {
  name: string = '';
  subject: string = '';
  email: string = '';
  phone: string = '';
  message: string = '';
  reCaptchaToken!: string;

  async save() {
    const url = '/support/contact';
    const headers = new Headers();

    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    headers.set('recaptcha', this.reCaptchaToken);

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        name: this.name,
        phone: this.phone,
        email: this.email,
        subject: this.subject,
        message: this.message,
      }),
    });

    return response.ok;
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
