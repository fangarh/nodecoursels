import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
  Delete,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';

import { CreateUserDto } from '../User/dto/createuser.dto';
import { UserService } from '../User/user.service';
import { ResponseUserDto } from '../User/dto/responseuser.dto';
import { AuthStrategy } from '../Auth/auth.strategy';
import { TokenService } from '../Auth/token.service';
import { NewsGetDto } from '../News/dto/newsget.dto';
import { AuthGuard } from '../Auth/auth.guard';
import { NewsPostDto } from '../News/dto/newspost.dto';
import { NewsService } from '../News/news.service';
import { IUser } from '../User/model/User';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDto } from '../User/dto/updateprofile.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api')
export class ApiController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly strategy: AuthStrategy,
    private readonly newsService: NewsService,
  ) {
    console.log(userService);
  }

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

  @Get('profile')
  async getUserProfile(
    @Body('userName') user: string,
  ): Promise<ResponseUserDto> {
    const userObj = await this.userService.find(user);

    return new ResponseUserDto(userObj);
  }

  @UseGuards(AuthGuard)
  @Post('news')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async addNews(
    @Body() news: NewsPostDto,
    @Headers() headers: any,
  ): Promise<NewsGetDto[]> {
    const user = await this.tokenService.getPayload(headers['authorization']);

    await this.newsService.addNews(news, user);

    return this.newsService.allNews();
  }

  @Get('news')
  async getNews(): Promise<NewsGetDto[]> {
    return this.newsService.allNews();
  }

  @Delete('news/:id')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async deleteNews(@Param() params: any): Promise<NewsGetDto[]> {
    await this.newsService.deleteNews(params.id);
    return this.newsService.allNews();
  }

  @Patch('news/:id')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async updateNews(
    @Param() params: any,
    @Body() news: NewsPostDto,
  ): Promise<NewsGetDto[]> {
    await this.newsService.updateNews(params.id, news);
    return this.newsService.allNews();
  }

  @Patch('profile')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async updateProfile(@UploadedFile() avatar): Promise<void> {
    console.log('1:', avatar);

    //  console.log(profile);
  }
}
