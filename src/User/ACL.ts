export interface IACL {
    Id: string;
    Create: boolean;
    Read: boolean;
    Update: boolean;
    Delete: boolean;
}

export interface IPermissions {
    Chat: IACL;
    News: IACL;
    Settings: IACL;
}

export interface IToken {
    AccessToken: string;
    RefreshToken: string;
    AccessTokenExpiredAt: string;
    RefreshTokenExpiredAt: string;
}