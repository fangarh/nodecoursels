import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthStrategy } from './auth.strategy';
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
    providers: [AuthStrategy, TokenService],
    controllers: [],
    exports: [PassportModule, AuthStrategy, TokenService]
})
export class AuthModule {

}