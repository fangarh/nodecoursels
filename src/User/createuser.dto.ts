import { IPermissions, IToken } from "./ACL";

export class CreateUserDto {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    userName: string;
    password: string;
    permissions: IPermissions
    token: IToken;
}