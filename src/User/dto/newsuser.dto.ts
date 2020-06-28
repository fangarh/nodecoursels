import { IUser } from "../model/User";

export class NewsUserDto {
    firstName: String;
    id: string;
    image: String;
    middleName: String;
    surName: String;
    username: String;

    fromIUser(user: IUser) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.image = user.avatar || "";
        this.middleName = user.middleName;
        this.surName = user.lastName || "";
        this.username = user.username;

    }
}