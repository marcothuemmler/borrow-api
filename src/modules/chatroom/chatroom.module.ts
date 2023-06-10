import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './chatroom.entity';
import { Message } from '../message/message.entity';
import { ChatroomProfile } from './profile/chatroom.profile';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, Message])],
  providers: [ChatroomService, ChatroomProfile],
  controllers: [ChatroomController],
})
export class ChatroomModule {}
