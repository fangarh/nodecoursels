import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { AuthModule } from '../Auth/auth.module';
import { UserModule } from '../User/user.module';

import { RepositoryModule } from '../Repository/repository.module';

@Module({
  imports: [AuthModule, UserModule, RepositoryModule],
  providers: [],
  controllers: [NewsController],
  exports: [],
})
export class NewsModule {}
