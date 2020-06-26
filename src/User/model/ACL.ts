export interface IACL {
    C: boolean;
    R: boolean;
    U: boolean;
    D: boolean;
}

export interface IPermissions {
    chat: IACL;
    news: IACL;
    settings: IACL;
}

export interface IToken {
    AccessToken: string;
    RefreshToken: string;
    AccessTokenExpiredAt: Date;
    RefreshTokenExpiredAt: Date;
}