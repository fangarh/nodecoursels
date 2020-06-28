import { Controller, Get, Post, Body, Inject, UseGuards, Headers } from '@nestjs/common';
import { CreateUserDto } from '../User/dto/createuser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../User/user.service';
import { ResponseUserDto } from '../User/dto/responseuser.dto';
import { AuthStrategy } from '../Auth/auth.strategy';
import { JwtService } from '@nestjs/jwt';
import { IAuthPayload } from '../Auth/dto/authpayload.dto';
import { TokenService } from '../Auth/token.service';
import { AuthModule } from '../Auth/auth.module';
import { NewsGetDto } from '../News/dto/newsget.dto';
import { NewsUserDto } from '../User/dto/newsuser.dto';
import { AuthGuard } from '../Auth/auth.guard';
import { NewsPostDto } from '../News/dto/newspost.dto';
import { NewsService } from '../News/news.service';

@Controller('api')
export class ApiController {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly strategy: AuthStrategy,
        private readonly newsService: NewsService) {
        console.log(userService)
    }

    @Post('login')
    async tryLogin(@Body('username') login: string, @Body('password') password: string) {
        let userObj = await this.userService.signIn(login, password)

        let userToSign = new ResponseUserDto(userObj);

        userToSign = await this.tokenService.signUser(userToSign);

        console.log(">>>", userToSign)

        return userToSign;
    }

    @Post('registration')
    async tryRegister(@Body() body: CreateUserDto) {
        let user = await this.userService.create(body);

        return user;
    }

    @Get('profile')
    async getUserProfile(@Body('userName') user: string) {
        let userObj = await this.userService.find(user);

        return new ResponseUserDto(userObj);
    }

    @UseGuards(AuthGuard)
    @Post('news')
    async addNews(@Body() news: NewsPostDto, @Headers() headers: any): Promise<NewsGetDto[]> {
        let user = await this.tokenService.getPayload(headers["authorization"]);

        this.newsService.addNews(news, user);

        return [];
    }

    @UseGuards(AuthGuard)
    @Get('news')
    async getNews(@Headers() headers: any): Promise<NewsGetDto[]> {
        // this.tokenService.getPayload(headers["authorization"]));
        /*      let usr: NewsUserDto = new NewsUserDto()
              usr.firstName = "1";
              usr.id = "5ef5acda79c1d91e70f062f5";
              usr.username = "user1";
      
              return [{
                  id: " Primary key",
                  created_at: new Date(Date.now()),
                  text: "String",
                  title: "String",
                  user: usr
              }];*/

        return this.newsService.allNews()
    }
} 