import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { from } from 'rxjs';
import { UserModule } from '../User/user.module';
import { TokenService } from './token.service';

@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: '1d'
        }
    }), PassportModule.register({ defaultStrategy: "jwt" }), UserModule],
    providers: [AuthService, TokenService],
    controllers: [],
    exports: [PassportModule, AuthService, TokenService]
})
export class AuthModule {

}