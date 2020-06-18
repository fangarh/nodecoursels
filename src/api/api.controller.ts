import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { CreateUserDto } from '../User/createuser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../User/user.service';

@Controller('api')
export class ApiController {
    constructor(@Inject() private readonly userService: UserService) {
        console.log(userService)
    }
    @Post('login')
    tryLogin(@Body('login') login: string, @Body('password') password: string): any {
        return "gggg " + login + " " + password;
    }

    @Post('register')
    tryRegister(@Body() body: CreateUserDto) {
        console.log(body);
    }
}