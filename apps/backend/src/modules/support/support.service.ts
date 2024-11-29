import { Injectable } from '@nestjs/common';

import { MailService } from '../mail/mail.service';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class SupportService {
  constructor(private mailService: MailService) {}

  async sendContactEmail(contact: ContactDto) {
    await this.mailService.sendContactEmail(contact);
  }
}
