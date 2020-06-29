import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { UserModule } from './User/user.module';
import { AppController } from './app.controller';
import { NewsModule } from './News/news.module';

const env = process.env.CONFIG_PATH_FOR_LOFT || 'development';
//// db: https://cloud.mongodb.com/v2/5eeb22efd415d861d2811527#clusters
@Module({
  imports: [
    UserModule,
    NewsModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${env}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MulterModule.register({
      dest: './upload',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'upload'),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
