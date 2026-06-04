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
    const recipient = job.data.to ?? '(mailer default recipient)';

    this.logger.log(`Dispatching email '${job.data.subject}' to '${recipient}'`);

    try {
      const result = await this.mailerService.sendMail(job.data);

      this.logger.log(
        `Email sent '${job.data.subject}' accepted=${JSON.stringify(result.accepted)} rejected=${JSON.stringify(result.rejected)}`,
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
