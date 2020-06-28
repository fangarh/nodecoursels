import { NewsUserDto } from '../../User/dto/newsuser.dto';
import { News } from '../model/news.model';

export class NewsGetDto {
  constructor() {
    this.created_at = new Date(Date.now());
  }
  id: string;
  created_at: Date;
  text: string;
  title: string;
  user: NewsUserDto;

  fromNews(elem: News): void {
    this.id = elem.id;
    this.created_at = elem.CreatedAt;
    this.text = elem.Text;
    this.title = elem.Title;
    this.user = elem.User;
  }
}
