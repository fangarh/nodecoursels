import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';

const env = process.env.CONFIG_PATH_FOR_LOFT || "development"
//// db: https://cloud.mongodb.com/v2/5eeb22efd415d861d2811527#clusters
@Module({
  imports: [ApiModule, UserModule, ConfigModule.forRoot({
    envFilePath: `.env.${env}`,
    isGlobal: true
  }), MongooseModule.forRoot(process.env.MONGO_CONNECT, {
    useNewUrlParser: true, useUnifiedTopology: true
  })],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
