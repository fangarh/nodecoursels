import { IPermissions, IToken } from "./ACL";
import { Document } from 'mongoose'

export interface IUser extends Document {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    username: string;
    permissions: IPermissions
    token: IToken;
    password: string;
    salt: string;
    avatar: string;
}