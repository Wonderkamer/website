import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

import { ContactDto } from '../support/dto/contact.dto';
import { MAIL_QUEUE } from './constants/mail.constants';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue(MAIL_QUEUE)
    private mailQueue: Queue,
  ) {}

  async sendContactEmail(contact: ContactDto) {
    await this.mailQueue.add('mailer', {
      subject: 'Contact request from the website',
      template: './support-contact',
      context: Object.assign({ ...contact }),
    });

    await this.mailQueue.add('mailer', {
      to: contact?.email,
      subject: 'Contact request received',
      template: './support-contact-thankyou',
      context: Object.assign({ ...contact }),
    });
  }
}
