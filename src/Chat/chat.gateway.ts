import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

import { ChatUser } from '../Model/User/ChatUser';
import { ChatConnectDto } from '../Model/DTO/Chat/chatconnect.dto';
import { ChatListDto } from '../Model/DTO/Chat/chatlist.dto';
import { ChatMessageDto } from '../Model/DTO/Chat/chatmessage.dto';

import { ChatHistoryDto } from '../Model/DTO/Chat/chathistory.dto';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  users: ChatListDto = new ChatListDto();
  clients = {};
  historyMessage = {};

  @SubscribeMessage('message:add')
  handleMessage(client: Socket, payload: ChatMessageDto): void {
    console.log(payload);
    this.server.to(payload.roomId).emit('message:add', payload);
    client.emit('message:add', payload);
    this.addMessageToHistory(payload.senderId, payload.recipientId, payload);
    this.addMessageToHistory(payload.recipientId, payload.senderId, payload);
  }

  @SubscribeMessage('message:history')
  handleHistoryReq(client: Socket, payload: ChatHistoryDto): void {
    console.log(payload, client.id);

    if (
      this.historyMessage[payload.userId] &&
      this.historyMessage[payload.userId][payload.recipientId]
    ) {
      client.emit(
        'message:history',
        this.historyMessage[payload.userId][payload.recipientId],
      );
      console.log(this.historyMessage[payload.userId][payload.recipientId]);
    }
  }

  @SubscribeMessage('users:connect')
  hendleUserConnect(client: Socket, payload: ChatConnectDto): void {
    console.log('UC:', payload, client.id);
    const user = new ChatUser();
    user.SocketId = client.id;
    user.UserId = payload.userId;
    user.UserName = payload.username;

    client.emit('users:list', this.users.toJson());

    this.users.setValue(client.id, user);

    this.server.emit('users:add', {
      username: user.UserName,
      socketId: user.SocketId,
      userId: user.UserId,
    });
    //client.emit('message:add', 'sd');
    //this.server.broadcast.emit('message:add', 'qwewqeqwe');
  }

  afterInit(server: Server): void {
    console.log('Init: ' + server);
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
    this.users.remove(client.id);
    this.server.emit('users:leave', client.id);
  }

  handleConnection(client: Socket, ...args: any[]): void {
    console.log(`Client connected: ${client.id}`);
    console.log(args);
    //this.clients[client.id] = client;
    //console.log(client);
  }

  addMessageToHistory(
    senderId: string,
    recipientId: string,
    data: ChatMessageDto,
  ): void {
    if (this.historyMessage[senderId]) {
      if (this.historyMessage[senderId][recipientId]) {
        if (this.historyMessage[senderId][recipientId].length > 10) {
          this.historyMessage[senderId][recipientId].shift();
        }
        this.historyMessage[senderId][recipientId].push(data);
      } else {
        this.historyMessage[senderId][recipientId] = [];
        this.historyMessage[senderId][recipientId].push(data);
      }
    } else {
      this.historyMessage[senderId] = {};
      this.historyMessage[senderId][recipientId] = [];
      this.historyMessage[senderId][recipientId].push(data);
    }
  }
}
