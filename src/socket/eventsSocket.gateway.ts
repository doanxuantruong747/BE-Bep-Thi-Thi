/** @format */

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('notiDevice')
  async handleNotiDevice(@MessageBody() message: string) {
    this.server.emit('notificationDevice', message);
  }

  @SubscribeMessage('notiFromClient')
  async handleNotiFromClient(@MessageBody() data: any) {
    return data;
  }
}
