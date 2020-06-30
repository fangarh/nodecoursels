export class ACL {
  C: boolean;
  R: boolean;
  U: boolean;
  D: boolean;
}

export class Permissions {
  chat: ACL;
  news: ACL;
  settings: ACL;
}

export class Token {
  AccessToken: string;
  RefreshToken: string;
  AccessTokenExpiredAt: Date;
  RefreshTokenExpiredAt: Date;
}
