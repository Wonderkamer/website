import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HttpBasicAuthenticationMiddleware } from './basic-auth.middleware';
import { QueueModuleOptions } from './interfaces/queue.interface';
import { ConfigurableModuleClass } from './queue.module-definition';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('redis.host') ?? 'localhost',
          port: configService.get<number>('redis.port') ?? 6379,
        },
        defaultJobOptions: {
          removeOnComplete: { age: 60 },
          removeOnFail: { age: 60 },
          attempts: 10,
        },
      }),
      inject: [ConfigService], // Inject services or providers that your configuration might depend on
    }),
    BullBoardModule.forRoot({ route: '/queues', adapter: ExpressAdapter }),
  ],
  controllers: [],
  providers: [],
})
@Module({})
export class QueueModule extends ConfigurableModuleClass implements NestModule {
  static register(options: QueueModuleOptions): DynamicModule {
    // Assuming ConfigService is available and properly configured

    // register a queue
    const bullModules = options.queues.map((name) =>
      BullModule.registerQueue({
        name,
        // connection: { host: process.env.REDIS_HOST ?? 'localhost', port: parseInt(String(process.env.REDIS_PORT), 10) || 6379 },
      }),
    );

    // register a flow producer
    const flowProducers = (options.flows || []).map((flow) =>
      BullModule.registerFlowProducer({
        name: flow,
        // connection: { host: process.env.REDIS_HOST ?? 'localhost', port: parseInt(String(process.env.REDIS_PORT), 10) || 6379 },
      }),
    );

    // register
    const bullBoardModules = options.queues.map((name) => BullBoardModule.forFeature({ name, adapter: BullMQAdapter }));

    return {
      ...super.register(options as any),
      imports: [...bullModules, ...flowProducers, ...bullBoardModules],
      exports: [...bullModules, ...flowProducers],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new ExpressAdapter();

    serverAdapter.setBasePath('/job-queues');

    consumer.apply(HttpBasicAuthenticationMiddleware, serverAdapter.getRouter()).forRoutes('/job-queues');
  }
}
