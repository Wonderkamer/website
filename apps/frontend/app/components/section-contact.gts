import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { get } from '@ember/helper';
import { action } from '@ember/object';
import { service } from '@ember/service';

import UtilMarkdownFromUrl from './util/markdown-from-url';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import GRecaptcha from 'ember-g-recaptcha/components/g-recaptcha';
import { HeadlessForm } from 'ember-headless-form';
import { validateChangeset } from 'ember-headless-form-changeset';
import PortalTarget from 'ember-stargate/components/portal-target';

import { ContactForm, ContactFormValidations } from '../changesets/contact-form';

import type Owner from '@ember/owner';
import type { Metrics } from 'ember-metrics/services/metrics';

interface Signature {
  Element: HTMLDivElement;
}

export default class SectionContactComponent extends Component<Signature> {
  @service metrics!: Metrics;

  @tracked changeset: any;
  @tracked isSubmitted = false;
  @tracked isErrorneous = false;

  constructor(owner: Owner, args: SectionContactComponent['args']) {
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
      if (await this.changeset.save()) {
        this.metrics.trackEvent('GoogleAnalytics', {
          category: 'communication',
          action: 'submitted-contact-form',
        });
        this.isSubmitted = true;
      } else {
        this.isErrorneous = true;
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
  }

  <template>
    <div class="container mx-auto self-center px-4 py-8 lg:px-16" ...attributes>
      <div class="max-w-2xl">
        <p class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
          <span class="inline-block h-px w-8 bg-gray-900"></span>
          Contact
        </p>
        <h2 class="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">Zin om langs te komen?</h2>
        <p class="mt-4 text-lg text-gray-700">Laat een bericht achter, dan nemen we contact met je op. Of loop gewoon eens binnen.</p>
      </div>

      <div class="mt-10 grid gap-6 lg:grid-cols-5">

        {{! Contact info }}
        <div class="lg:col-span-2">
          <div class="rounded-3xl bg-white p-6 ring-1 ring-black/5 md:p-8">
            <div class="prose max-w-none">
              <UtilMarkdownFromUrl @url="/sections/contact.md" />
            </div>
            <div class="mt-6 space-y-3 text-sm">
              <a href="mailto:hallo@wonderkamer.com" class="flex items-center gap-3 font-medium text-gray-800 hover:text-gray-900">
                <svg class="h-5 w-5 flex-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75Z"
                  /><path stroke-linecap="round" stroke-linejoin="round" d="m3 7 9 6 9-6" /></svg>
                hallo@wonderkamer.com
              </a>
              <a
                href="https://www.instagram.com/wonderkamer.amsterdam/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 font-medium text-gray-800 hover:text-gray-900"
              >
                <svg class="h-5 w-5 flex-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  /><path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" /><path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                  /></svg>
                @wonderkamer.amsterdam
              </a>
            </div>
          </div>
        </div>

        {{! Contact form }}
        <div class="lg:col-span-3">
          <div class="rounded-3xl bg-white p-6 ring-1 ring-black/5 md:p-8">

            {{#if this.isSubmitted}}
              <div class="flex items-start gap-3 rounded-2xl bg-primary/30 p-5">
                <svg class="h-6 w-6 flex-none text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clip-rule="evenodd"
                  /></svg>
                <p class="m-0 text-gray-800">Bedankt voor je reactie, we nemen contact met je op...</p>
              </div>
            {{/if}}

            {{#unless this.isSubmitted}}

              <HeadlessForm
                @data={{this.changeset}}
                @dataMode="mutable"
                @onSubmit={{this.onSubmit}}
                @validate={{(validateChangeset)}}
                autocomplete="off"
                as |form|
              >
                <form.Field @name="name" as |field|>
                  <field.Label class="form-control mb-4 flex w-full flex-col items-start">
                    <div class="label justify-start pb-1">
                      <span class="label-text">Naam</span>
                    </div>
                    <field.Input class="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffe607] focus:border-[#ffe607]" />
                    <field.Errors class="w-full pt-1 text-right" as |errors|>
                      <span class="label-text-alt block w-full text-right text-xs text-orange-600">{{get (get errors 0) "message"}}</span>
                    </field.Errors>
                  </field.Label>
                </form.Field>

                <form.Field @name="email" as |field|>
                  <field.Label class="form-control mb-4 flex w-full flex-col items-start">
                    <div class="label justify-start pb-1">
                      <span class="label-text">E-mail</span>
                    </div>
                    <field.Input
                      @type="email"
                      class="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffe607] focus:border-[#ffe607]"
                    />
                    <field.Errors class="w-full pt-1 text-right" as |errors|>
                      <span class="label-text-alt block w-full text-right text-xs text-orange-600">{{get (get errors 0) "message"}}</span>
                    </field.Errors>
                  </field.Label>
                </form.Field>

                <form.Field @name="phone" as |field|>
                  <field.Label class="form-control mb-4 flex w-full flex-col items-start">
                    <div class="label justify-start pb-1">
                      <span class="label-text">Telefoon</span>
                    </div>
                    <field.Input
                      @type="tel"
                      class="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffe607] focus:border-[#ffe607]"
                    />
                    <field.Errors class="w-full pt-1 text-right" as |errors|>
                      <span class="label-text-alt block w-full text-right text-xs text-orange-600">{{get (get errors 0) "message"}}</span>
                    </field.Errors>
                  </field.Label>
                </form.Field>

                <form.Field @name="subject" as |field|>
                  <field.Label class="form-control mb-4 flex w-full flex-col items-start">
                    <div class="label justify-start pb-1">
                      <span class="label-text">Onderwerp</span>
                    </div>
                    <field.Input class="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffe607] focus:border-[#ffe607]" />
                    <field.Errors class="w-full pt-1 text-right" as |errors|>
                      <span class="label-text-alt block w-full text-right text-xs text-orange-600">{{get (get errors 0) "message"}}</span>
                    </field.Errors>
                  </field.Label>
                </form.Field>

                <form.Field @name="message" as |field|>
                  <field.Label class="form-control mb-4 flex w-full flex-col items-start">
                    <div class="label justify-start pb-1">
                      <span class="label-text">Boodschap</span>
                    </div>
                    <field.Textarea
                      class="textarea textarea-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffe607] focus:border-[#ffe607]"
                      rows="5"
                    />
                    <field.Errors class="w-full pt-1 text-right" as |errors|>
                      <span class="label-text-alt block w-full text-right text-xs text-orange-600">{{get (get errors 0) "message"}}</span>
                    </field.Errors>
                  </field.Label>
                </form.Field>

                <form.Field @name="reCaptchaToken" as |field|>
                  <field.Label class="form-control mb-4 flex w-full flex-col items-start">
                    <div class="label justify-start pb-1">
                      <span class="label-text">Are you real?</span>
                    </div>
                    <GRecaptcha @onSuccess={{this.onCaptchaResolved}} @onExpired={{this.onCaptchaExpired}} />
                    <field.Errors class="w-full pt-1 text-right" as |errors|>
                      <span class="label-text-alt block w-full text-right text-xs text-orange-600">{{get (get errors 0) "message"}}</span>
                    </field.Errors>
                  </field.Label>
                </form.Field>

                <button type="submit" class="btn btn-primary mt-2 w-full rounded-full">Verzend</button>
              </HeadlessForm>

              {{#if this.isErrorneous}}
                <p class="mt-4 text-sm text-orange-600">Er ging iets mis, probeer het nog een keer...</p>
              {{/if}}
            {{/unless}}

          </div>
        </div>
      </div>

      <PortalTarget @name="section-contact" />

    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SectionContact: typeof SectionContactComponent;
    'section-contact': typeof SectionContactComponent;
  }
}
