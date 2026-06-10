import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';

import { ContactDto } from '../support/dto/contact.dto';
import { MAIL_QUEUE } from './constants/mail.constants';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    @InjectQueue(MAIL_QUEUE)
    private mailQueue: Queue,
    private readonly configService: ConfigService,
  ) {}

  async sendContactEmail(contact: ContactDto) {
    const defaultRecipient = this.configService.get<string>('mailer.defaults.to', { infer: true }) ?? '"De Wonderkamer" <hallo@wonderkamer.com>';

    await this.mailQueue.add('mailer', {
      to: defaultRecipient,
      replyTo: contact?.email,
      subject: 'Contact request from the website',
      template: './support-contact',
      context: Object.assign({ ...contact }),
    });

    if (contact?.email) {
      await this.mailQueue.add('mailer', {
        to: contact.email,
        subject: 'Contact request received',
        template: './support-contact-thankyou',
        context: Object.assign({ ...contact }),
      });

      return;
    }

    this.logger.warn('No contact email provided; skipping thank-you email to visitor.');
  }
}
