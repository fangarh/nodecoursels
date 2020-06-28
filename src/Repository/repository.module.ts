import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { NewsRepository } from './news.repository';
import { UserSchema } from './scema/user.schema';
import { UserRepository } from './user.repository';
import { NewsSchema } from './scema/news.schema';

const env = process.env.CONFIG_PATH_FOR_LOFT || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${env}`,
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [],
  providers: [NewsRepository, UserRepository],
  exports: [NewsRepository, UserRepository],
})
export class RepositoryModule {}
