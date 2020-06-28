import { NewsUserDto } from "../../User/dto/newsuser.dto"
import { Document } from 'mongoose'
import { NewsPostDto } from "../dto/newspost.dto"
import { IUser } from "../../User/model/User";

export interface News extends Document {
    Id: string
    Text: string
    Title: string
    CreatedAt: Date
    User: NewsUserDto
}