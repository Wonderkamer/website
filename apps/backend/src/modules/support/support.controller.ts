import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Recaptcha } from '@nestlab/google-recaptcha';

import { ContactDto } from './dto/contact.dto';
import { SupportService } from './support.service';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('contact')
  @Recaptcha()
  @HttpCode(HttpStatus.ACCEPTED) // accepted because we are not returning anything
  async contactReceived(@Body() contact: ContactDto): Promise<void> {
    await this.supportService.sendContactEmail(contact);
  }
}
