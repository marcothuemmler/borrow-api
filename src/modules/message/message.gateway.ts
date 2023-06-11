import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MessageGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() messageDto: CreateMessageDto) {
    const message = await this.messageService.create(messageDto);
    this.server.to(messageDto.roomId).emit('message', message);
  }

  @SubscribeMessage('findMessages')
  async findAll(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);
    const messages = await this.messageService.find(room);
    this.server.to(room).to(client.id).emit('messages', messages);
  }
}
