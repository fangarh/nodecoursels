import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { CreateUserDto } from '../User/createuser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../User/user.service';
import { ResponseUserDto } from '../User/dto/responseuser.dto';
import { AuthStrategy } from '../Auth/auth.strategy';
import { JwtService } from '@nestjs/jwt';
import { IAuthPayload } from '../Auth/dto/authpayload.dto';
import { TokenService } from '../Auth/token.service';
import { AuthModule } from 'src/Auth/auth.module';

@Controller('api')
export class ApiController {
    constructor(private readonly userService: UserService, private readonly tokenService: TokenService) {
        console.log(userService)
    }

    @Post('login')
    async tryLogin(@Body('username') login: string, @Body('password') password: string) {
        let userObj = await this.userService.signIn(login, password)

        console.log(process.env.JWT_SECRET)

        userObj = await this.tokenService.sign(userObj);

        console.log(userObj.token)

        return new ResponseUserDto(userObj);
    }

    @Post('registration')
    async tryRegister(@Body() body: CreateUserDto) {
        let user = await this.userService.create(body);

        return user;
    }

    @Post('profile')
    async getUserProfile(@Body('userName') user: string) {
        let userObj = await this.userService.find(user);

        return new ResponseUserDto(userObj);
    }
} 