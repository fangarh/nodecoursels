import { IPermissions, IToken } from "./ACL";

export class CreateUserDto {
    Id: string;
    FirstName: string;
    LastName: string;
    MiddleName: string;
    UserName: string;
    Password: string;
    Permissions: IPermissions
    Token: IToken;
}