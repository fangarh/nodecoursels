import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Headers,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { NewsPostDto } from '../Model/DTO/News/newspost.dto';
import { NewsGetDto } from '../Model/DTO/News/newsget.dto';
import { LoftAuthGuard } from '../Auth/auth.guard';

import { TokenService } from '../Auth/token.service';
import { AuthStrategy } from '../Auth/auth.strategy';
import { NewsRepository } from '../Repository/news.repository';
import { UserRepository } from '../Repository/user.repository';

@Controller('api')
export class NewsController {
  constructor(
    private readonly userService: UserRepository,
    private readonly tokenService: TokenService,
    private readonly strategy: AuthStrategy,
    private readonly newsService: NewsRepository,
  ) {
    console.log(userService);
  }

  @UseGuards(LoftAuthGuard)
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
    console.log('!!! ');

    await this.newsService.updateNews(params.id, news);
    return this.newsService.allNews();
  }
}
