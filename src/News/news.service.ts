import { InjectModel } from '@nestjs/mongoose';
import { News } from './model/news.model';
import { Model } from 'mongoose';
import { NewsPostDto } from './dto/newspost.dto';
import { IUser } from '../User/model/User';
import { NewsGetDto } from './dto/newsget.dto';
import { NewsUserDto } from '../User/dto/newsuser.dto';

export class NewsService {
  constructor(@InjectModel('News') private readonly newsModel: Model<News>) {
    console.log(newsModel);
  }

  setNews(newNews: News, news: NewsPostDto, user: IUser): News {
    const userDto = new NewsUserDto();
    userDto.fromIUser(user);
    newNews.Text = news.text;
    newNews.Title = news.title;
    newNews.CreatedAt = new Date(Date.now());
    newNews.User = userDto;

    return newNews;
  }

  async addNews(news: NewsPostDto, user: IUser): Promise<News> {
    const preparedArticle = new this.newsModel();

    this.setNews(preparedArticle, news, user);

    return await preparedArticle.save();
  }

  async allNews(): Promise<NewsGetDto[]> {
    const result = [];
    console.log('!!! NEWS !!!');
    await this.newsModel.find({}, (err, newses) => {
      newses.forEach(e => {
        try {
          const dto = new NewsGetDto();
          dto.fromNew(e);
          result.push(dto);
          console.log('>> ', e);
        } catch (eeee) {
          console.log(eeee);
        }
      });
    });

    console.log('!!! NEWS !!!', result);

    return result;
  }

  async deleteNews(id: string): Promise<void> {
    console.log('DEL:', await await this.newsModel.findOne({ _id: id }).exec());
    await this.newsModel
      .findOne({ _id: id })
      .remove({ _id: id })
      .exec();
  }
}
