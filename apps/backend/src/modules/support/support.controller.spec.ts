import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RecaptchaConfigRef } from '@nestlab/google-recaptcha';
import { RecaptchaRequestResolver } from '@nestlab/google-recaptcha/services/recaptcha-request.resolver';
import { RecaptchaValidatorResolver } from '@nestlab/google-recaptcha/services/recaptcha-validator.resolver';
import { Queue } from 'bullmq';

import { MAIL_QUEUE } from '../mail/constants/mail.constants';
import { MailService } from '../mail/mail.service';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';

describe('SupportController', () => {
  let controller: SupportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportService,
        MailService,
        { provide: RecaptchaRequestResolver, useValue: createMock<RecaptchaRequestResolver>() },
        { provide: RecaptchaValidatorResolver, useValue: createMock<RecaptchaValidatorResolver>() }, // Mock the missing dependency
        { provide: 'RECAPTCHA_LOGGER', useValue: createMock() }, // Mock the logger
        { provide: RecaptchaConfigRef, useValue: createMock<RecaptchaConfigRef>() }, // Mock the configuration
        ConfigService,
        { provide: `BullQueue_${MAIL_QUEUE}`, useValue: createMock<Queue>() },
      ],
      controllers: [SupportController],
    }).compile();

    controller = module.get<SupportController>(SupportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
