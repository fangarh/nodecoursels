import { Permissions, Token } from '../../User/ACL';

export class CreateUserDto {
  id: string;
  firstName: string;
  surName: string;
  middleName: string;
  username: string;
  password: string;
  permissions: Permissions;
  token: Token;
}
