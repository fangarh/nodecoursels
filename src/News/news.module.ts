import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { AuthModule } from '../Auth/auth.module';
import { UserModule } from '../User/user.module';
import { NewsRepository } from '../Repository/news.repository';

@Module({
  imports: [AuthModule, UserModule, NewsRepository],
  providers: [],
  controllers: [NewsController],
  exports: [],
})
export class NewsModule {}
