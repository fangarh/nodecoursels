import { Controller, Post, Body } from '@nestjs/common';

import { TokenService } from './token.service';
import { AuthStrategy } from './auth.strategy';
import { ResponseUserDto } from '../Model/DTO/User/responseuser.dto';
import { CreateUserDto } from '../Model/DTO/User/createuser.dto';
import { IUser } from '../Model/User/User';
import { UserRepository } from '../Repository/user.repository';

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
  async tryRegister(@Body() body: CreateUserDto): Promise<IUser> {
    return await this.userService.create(body);
  }
}
