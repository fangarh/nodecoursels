import { NewsUserDto } from '../DTO/User/newsuser.dto';
import { Document } from 'mongoose';

export interface News extends Document {
  Id: string;
  Text: string;
  Title: string;
  CreatedAt: Date;
  User: NewsUserDto;
}
