import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../User/user.service';
import { IAuthPayload } from './dto/authpayload.dto';
import { IUser } from '../User/model/User';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      secretOrKey: process.env.JWT_SECRET,
    });
    console.log('Strategy inited:', process.env.JWT_SECRET);
  }

  async validate(payload: IAuthPayload): Promise<IUser> {
    console.log('PAYLOAD', payload);
    const { username } = payload;
    const user = await this.userService.find(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
