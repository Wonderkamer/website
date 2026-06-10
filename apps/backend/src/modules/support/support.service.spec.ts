import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Queue } from 'bullmq';

import { MailProcessor } from '../mail/mail.processor';
import { MailService } from '../mail/mail.service';
import { SupportService } from './support.service';

describe('SupportService', () => {
  let service: SupportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportService,
        ConfigService,
        {
          provide: MailService,
          useValue: createMock<MailService>(),
        },
        {
          provide: MailProcessor.name,
          useValue: createMock<Queue>(),
        },
      ],
    }).compile();

    service = module.get<SupportService>(SupportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
