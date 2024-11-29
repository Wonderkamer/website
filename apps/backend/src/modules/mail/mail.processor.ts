import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bullmq';

import { MAIL_QUEUE } from './constants/mail.constants';

@Injectable()
@Processor(MAIL_QUEUE)
export class MailProcessor extends WorkerHost {
  @Inject()
  private readonly mailerService!: MailerService;

  private readonly logger = new Logger(MAIL_QUEUE);

  async process(job: Job) {
    this.logger.log(`Dispatching email '${job.data.subject}' to '${job.data.to}'`);

    try {
      await this.mailerService.sendMail(job.data);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
