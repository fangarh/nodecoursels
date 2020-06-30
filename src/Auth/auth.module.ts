import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.strategy';
import { TokenService } from './token.service';

import { ConfigModule } from '@nestjs/config';
import { LoftAuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { RepositoryModule } from '../Repository/repository.module';

const env = process.env.CONFIG_PATH_FOR_LOFT || 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${env}`,
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    RepositoryModule,
  ],
  providers: [AuthStrategy, LoftAuthGuard, TokenService],
  controllers: [AuthController],
  exports: [PassportModule, AuthStrategy, TokenService, LoftAuthGuard],
})
export class AuthModule {}
