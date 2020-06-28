import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { ApiService } from './api.service';
import { AuthStrategy } from '../Auth/auth.strategy';
import { UserModule } from '../User/user.module';
import { UserService } from '../User/user.service';
import { AuthModule } from '../Auth/auth.module';
import { NewsModule } from '../News/news.module';


@Module({
    imports: [AuthModule, UserModule, NewsModule],

    controllers: [ApiController],
    providers: [ApiService],
})
export class ApiModule { }