import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../Model/User/User';
import { News } from '../Model/News/News';
import { NewsUserDto } from '../Model/DTO/User/newsuser.dto';
import { NewsPostDto } from '../Model/DTO/News/newspost.dto';
import { NewsGetDto } from '../Model/DTO/News/newsget.dto';

export class NewsRepository {
  constructor(@InjectModel('News') private readonly newsModel: Model<News>) {
    console.log(newsModel);
  }

  setNews(newNews: News, news: NewsPostDto, user: User): News {
    const userDto = new NewsUserDto();
    userDto.fromIUser(user);
    newNews.Text = news.text;
    newNews.Title = news.title;
    newNews.CreatedAt = new Date(Date.now());
    newNews.User = userDto;

    return newNews;
  }

  async addNews(news: NewsPostDto, user: User): Promise<News> {
    const preparedArticle = new this.newsModel();

    this.setNews(preparedArticle, news, user);

    return await preparedArticle.save();
  }

  async allNews(): Promise<NewsGetDto[]> {
    const result = [];
    const newses = await this.newsModel.find({});

    await newses.forEach(e => {
      const dto = new NewsGetDto();
      dto.fromNews(e);
      result.push(dto);
    });

    console.log('!!! NEWS!!!', result);

    return result;
  }

  async deleteNews(id: string): Promise<void> {
    console.log('DEL: ', await this.newsModel.findOne({ _id: id }).exec());
    await this.newsModel
      .findOne({ _id: id })
      .remove({ _id: id })
      .exec();
  }

  async updateNews(id: string, news: NewsPostDto): Promise<void> {
    const element = await this.newsModel.findOne({ _id: id }).exec();
    element.Title = news.title;
    element.Text = news.text;
    await element.save();
  }
}
