import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthStrategy } from './auth.strategy';
import { from } from 'rxjs';
import { UserModule } from '../User/user.module';
import { TokenService } from './token.service';

import { ConfigModule } from '@nestjs/config';

const env = process.env.CONFIG_PATH_FOR_LOFT || "development"
@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: `.env.${env}`,
        isGlobal: true
    }), PassportModule.register({ defaultStrategy: "jwt" }), JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: '1d'
        }
    }), UserModule],
    providers: [AuthStrategy, TokenService],
    controllers: [],
    exports: [PassportModule, AuthStrategy, TokenService]
})
export class AuthModule {
    constructor() {
        console.log(">>>Strategy inited:", process.env.JWT_SECRET);
    }
}