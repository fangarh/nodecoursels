import { InjectModel } from "@nestjs/mongoose";
import { News } from "./model/news.model";
import { Model } from "mongoose";
import { NewsPostDto } from "./dto/newspost.dto";
import { IUser } from "../User/model/User";
import { NewsGetDto } from "./dto/newsget.dto";
import { NewsUserDto } from "../User/dto/newsuser.dto";

export class NewsService {
    constructor(@InjectModel('News') private readonly newsModel: Model<News>) {
        console.log(newsModel)
    }

    setNews(newNews: News, news: NewsPostDto, user: IUser): News {
        let userDto = new NewsUserDto();
        userDto.fromIUser(user);
        newNews.Text = news.text;
        newNews.Title = news.title;
        newNews.CreatedAt = new Date(Date.now());
        newNews.User = userDto;

        return newNews;
    }

    async addNews(news: NewsPostDto, user: IUser): Promise<News> {


        const preparedArticle = new this.newsModel();
        console.log(preparedArticle)
        this.setNews(preparedArticle, news, user);
        console.log(preparedArticle)
        return await preparedArticle.save();
    }

    async allNews(): Promise<NewsGetDto[]> {
        let result = [];
        this.newsModel.find({}, (err, newses) => {
            console.log("", newses);
        })
        return result;
    }
}