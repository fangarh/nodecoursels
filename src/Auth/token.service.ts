import { JwtService } from '@nestjs/jwt';
import { User } from '../Model/User/User';
import { IAuthPayload } from '../Model/DTO/Auth/authpayload.dto';
import { Injectable } from '@nestjs/common';
import { ResponseUserDto } from '../Model/DTO/User/responseuser.dto';
import { UserRepository } from '../Repository/user.repository';

@Injectable()
export class TokenService {
  tickInDay = 86400000;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserRepository,
  ) {}

  async signUser(userObj: ResponseUserDto): Promise<ResponseUserDto> {
    const payload: IAuthPayload = { username: userObj.username };
    const accessToken = await this.jwtService.sign(payload);

    userObj.accessToken = accessToken;
    userObj.accessTokenExpiredAt = new Date(Date.now() + 1 * this.tickInDay);
    userObj.refreshToken = '!!!';
    userObj.refreshTokenExpiredAt = new Date(Date.now() + 8 * this.tickInDay);
    console.log(userObj);
    return userObj;
  }

  async getPayload(token: string): Promise<User> {
    const payload = await this.jwtService.decode(token);
    console.log(payload['username']);

    return await this.userService.find(payload['username']);
  }

  async getUserFromPayload(token: string): Promise<string> {
    const payload = await this.jwtService.decode(token);

    return payload['username'];
  }
}
