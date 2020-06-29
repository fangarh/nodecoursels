import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { IAuthPayload } from '../Model/DTO/Auth/authpayload.dto';
import { User } from '../Model/User/User';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../Repository/user.repository';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      secretOrKey: process.env.JWT_SECRET,
    });
    console.log('Strategy inited: ', process.env.JWT_SECRET);
  }

  async validate(payload: IAuthPayload): Promise<User> {
    console.log('PAYLOAD ', payload);
    const { username } = payload;
    const user = await this.userService.find(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
