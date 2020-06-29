import { User } from '../../User/User';

export class NewsUserDto {
  firstName: string;
  id: string;
  image: string;
  middleName: string;
  surName: string;
  username: string;

  fromIUser(user: User): void {
    this.id = user.id;
    this.firstName = user.firstName;
    this.image = user.avatar || '';
    this.middleName = user.middleName;
    this.surName = user.surName || '';
    this.username = user.username;
  }
}
