import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { RepositoryModule } from '../Repository/repository.module';
import { AuthModule } from '../Auth/auth.module';
import { ConfigModule } from '@nestjs/config';

const env = process.env.CONFIG_PATH_FOR_LOFT || 'development';

@Module({
  imports: [
    RepositoryModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${env}`,
      isGlobal: true,
    }),
  ],
  providers: [],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
