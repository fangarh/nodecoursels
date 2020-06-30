/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, Headers } from '@nestjs/common';

import { TokenService } from './token.service';
import { AuthStrategy } from './auth.strategy';
import { ResponseUserDto } from '../Model/DTO/User/responseuser.dto';
import { CreateUserDto } from '../Model/DTO/User/createuser.dto';
import { User } from '../Model/User/User';
import { UserRepository } from '../Repository/user.repository';
import { RefreshTokenDto } from '../Model/DTO/Auth/refreshtoken.dto';

@Controller('api')
export class AuthController {
  constructor(
    private readonly userService: UserRepository,
    private readonly tokenService: TokenService,
    private readonly strategy: AuthStrategy,
  ) {}

  @Post('login')
  async tryLogin(
    @Body('username') login: string,
    @Body('password') password: string,
  ): Promise<ResponseUserDto> {
    const userObj = await this.userService.signIn(login, password);
    let userToSign = new ResponseUserDto(userObj);

    userToSign = await this.tokenService.signUser(userToSign);

    return userToSign;
  }

  @Post('registration')
  async tryRegister(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.create(body);
  }

  @Post('refresh-token')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async refreshToken(@Headers() headers: any): Promise<RefreshTokenDto> {
    const rToken = headers['authorization'];
    console.log(headers.host);
    const authToken = await this.tokenService.getRefreshPayload(rToken);

    console.log(authToken);

    const newTokenData = await this.tokenService.reSignUser(
      authToken.userName,
      rToken,
    );

    console.log(newTokenData);

    return newTokenData;
  }
}
