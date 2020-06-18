import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';

const env = process.env.CONFIG_FOR_LOFT || "development"

@Module({
  imports: [ApiModule, UserModule, ConfigModule.forRoot({
    envFilePath: `.env.${env}`,
    isGlobal: true
  }), MongooseModule.forRoot(process.env.MONGO_CONNECT, {
    useNewUrlParser: true, useUnifiedTopology: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
