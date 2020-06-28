import { NewsUserDto } from "../../User/dto/newsuser.dto";

export class NewsGetDto {
    constructor() {
        this.created_at = new Date(Date.now());
    }
    id: string;
    created_at: Date;
    text: String;
    title: String;
    user: NewsUserDto;
}