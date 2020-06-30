import { Permissions, Token } from './ACL';
import { Document } from 'mongoose';

export class User extends Document {
  id: string;
  firstName: string;
  surName: string;
  middleName: string;
  username: string;
  permissions: Permissions;
  token: Token;
  password: string;
  salt: string;
  avatar: string;
  refreshToken: string;
}
