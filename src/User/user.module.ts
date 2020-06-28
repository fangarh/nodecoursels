import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { RepositoryModule } from '../Repository/repository.module';
import { AuthModule } from '../Auth/auth.module';

@Module({
  imports: [RepositoryModule, AuthModule],
  providers: [],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
