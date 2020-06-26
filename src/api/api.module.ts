import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { ApiService } from './api.service';
import { AuthStrategy } from '../Auth/auth.strategy';
import { UserModule } from '../User/user.module';
import { UserService } from '../User/user.service';
import { AuthModule } from '../Auth/auth.module';


@Module({
    imports: [AuthModule, UserModule],

    controllers: [ApiController],
    providers: [ApiService],
})
export class ApiModule { }