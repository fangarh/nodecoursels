import { IUser } from '../User';


export class ResponseUserDto {
    constructor(user: IUser = undefined) {
        if (user) {
            this.fromIUser(user);
        }
    }

    id: string;
    image: string;
    username: string;

    firstName: string;
    middleName: string;
    surName: string;

    accessToken: String;
    refreshToken: String;
    accessTokenExpiredAt: Date;
    refreshTokenExpiredAt: Date;

    permission: {
        chat: {},
        news: {},
        settings: {},
    }

    fromIUser(user: IUser) {
        this.id = user.id;
        this.image = user.avatar;
        this.username = user.username;
        this.firstName = user.firstName;
        this.middleName = user.middleName;
        this.surName = user.lastName;
        this.accessToken = user.token.AccessToken || "access";
        this.refreshToken = user.token.RefreshToken || "refresh";
        this.accessTokenExpiredAt = user.token.AccessTokenExpiredAt || new Date('1d');
        this.refreshTokenExpiredAt = user.token.RefreshTokenExpiredAt || new Date('7d');
        this.permission = user.permissions;
    }
}