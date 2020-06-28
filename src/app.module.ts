import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';
import { MulterModule } from '@nestjs/platform-express';

const env = process.env.CONFIG_PATH_FOR_LOFT || 'development';
//// db: https://cloud.mongodb.com/v2/5eeb22efd415d861d2811527#clusters
@Module({
  imports: [
    UserModule,
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
