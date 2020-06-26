import { IPermissions, IToken } from "./model/ACL";

export class CreateUserDto {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    username: string;
    password: string;
    permissions: IPermissions
    token: IToken;
}