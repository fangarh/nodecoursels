import { IPermissions, IToken } from "./ACL";
import { Document } from 'mongoose'

export interface IUser extends Document {
    Id: string;
    FirstName: string;
    LastName: string;
    MiddleName: string;
    UserName: string;
    Permissions: IPermissions
    Token: IToken;
}