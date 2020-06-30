import * as Collections from 'typescript-collections';
import { ChatUser } from '../../../Model/User/ChatUser';

export class ChatListDto {
  users: Collections.Dictionary<string, ChatUser> = new Collections.Dictionary<
    string,
    ChatUser
  >();

  setValue(id: string, user: ChatUser): void {
    this.users.setValue(id, user);
  }

  remove(id: string): void {
    this.users.remove(id);
  }

  toJson(): any {
    const users2 = {};
    this.users.values().forEach(element => {
      users2[element.SocketId] = {
        username: element.UserName,
        socketId: element.SocketId,
        userId: element.UserId,
        activeRoom: element.ActiveRoom,
      };
    });

    console.log(users2);

    return Object.values(users2);
  }
}
