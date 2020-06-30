import { JwtService } from '@nestjs/jwt';
import { User } from '../Model/User/User';
import { IAuthPayload } from '../Model/DTO/Auth/authpayload.dto';
import { Injectable } from '@nestjs/common';
import { ResponseUserDto } from '../Model/DTO/User/responseuser.dto';
import { UserRepository } from '../Repository/user.repository';
import { IRefreshPayloadDto } from '../Model/DTO/Auth/refreshtokenpayload.dto';
import { RefreshTokenDto } from '../Model/DTO/Auth/refreshtoken.dto';

@Injectable()
export class TokenService {
  tickInDay = 86400000;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserRepository,
  ) {}

  async signUser(userObj: ResponseUserDto): Promise<ResponseUserDto> {
    const payload: IAuthPayload = { username: userObj.username };
    const refreshPayload: IRefreshPayloadDto = {
      userName: userObj.username,
      id: userObj.id,
    };
    const accessToken = await this.jwtService.sign(payload);

    userObj.accessToken = accessToken;
    userObj.accessTokenExpiredAt = new Date(Date.now() + 1 * this.tickInDay);
    userObj.refreshToken = await this.jwtService.sign(refreshPayload);
    userObj.refreshTokenExpiredAt = new Date(Date.now() + 8 * this.tickInDay);
    this.userService.updateUserRefreshToken(
      userObj.username,
      userObj.refreshToken,
    );
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

  async getRefreshPayload(token: string): Promise<IRefreshPayloadDto> {
    const payload = await this.jwtService.decode(token);

    const resultPayload: IRefreshPayloadDto = {
      userName: payload['userName'],
      id: payload['id'],
    };

    return resultPayload;
  }

  async reSignUser(
    userName: string,
    refreshToken: string,
  ): Promise<RefreshTokenDto> {
    const userObj = await this.userService.find(userName);

    if (!userObj) return new RefreshTokenDto();
    if (userObj.refreshToken !== refreshToken) return new RefreshTokenDto();

    const payload: IAuthPayload = { username: userObj.username };
    const refreshPayload: IRefreshPayloadDto = {
      userName: userObj.username,
      id: userObj.id,
    };
    const accessToken = await this.jwtService.sign(payload);
    const newTokenData: RefreshTokenDto = {
      accessToken: accessToken,
      accessTokenExpiredAt: new Date(Date.now() + 1 * this.tickInDay),
      refreshToken: await this.jwtService.sign(refreshPayload),
      refreshTokenExpiredAt: new Date(Date.now() + 8 * this.tickInDay),
    };

    this.userService.updateUserRefreshToken(
      userObj.username,
      newTokenData.refreshToken,
    );
    console.log(newTokenData);
    return newTokenData;
  }
}
