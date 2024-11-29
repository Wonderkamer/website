import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

import configuration from './config/redis.config';

const { error } = config({ path: join(process.cwd(), `/../../.env.${process.env.NODE_ENV}`) });

if (error) {
  throw error;
}

const configService = new ConfigService(configuration());

export default new DataSource({
  type: 'postgres',
  host: configService.get('database.host'),
  port: configService.get('database.port'),
  username: configService.get('database.username'),
  password: configService.get('database.password'),
  database: configService.get('database.database'),
  extra: configService.get('database.extra'),
  entities: [],
  migrations: [join(__dirname, 'migrations/*')],
});
