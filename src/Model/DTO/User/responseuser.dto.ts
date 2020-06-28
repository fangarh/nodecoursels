import { IUser } from '../../User/User';

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

  accessToken: string;
  refreshToken: string;
  accessTokenExpiredAt: Date;
  refreshTokenExpiredAt: Date;

  permission: {
    chat: any;
    news: any;
    settings: any;
  };

  fromIUser(user: IUser): void {
    this.id = user.id;
    this.image = user.avatar;
    this.username = user.username;
    this.firstName = user.firstName;
    this.middleName = user.middleName;
    this.surName = user.surName;
    this.accessToken = user.token.AccessToken || 'access';
    this.refreshToken = user.token.RefreshToken || 'refresh';
    this.accessTokenExpiredAt =
      user.token.AccessTokenExpiredAt || new Date('1d');
    this.refreshTokenExpiredAt =
      user.token.RefreshTokenExpiredAt || new Date('7d');
    this.permission = user.permissions;
  }
}
