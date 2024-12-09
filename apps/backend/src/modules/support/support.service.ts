import { Injectable, Logger } from '@nestjs/common';

import { MailService } from '../mail/mail.service';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class SupportService {
  private readonly logger = new Logger(SupportService.name);

  constructor(private mailService: MailService) {}

  async sendContactEmail(contact: ContactDto) {
    try {
      await this.mailService.sendContactEmail(contact);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
