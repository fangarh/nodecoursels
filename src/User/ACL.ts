export interface IACL {
    id: string;
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
    AccessTokenExpiredAt: string;
    RefreshTokenExpiredAt: string;
}