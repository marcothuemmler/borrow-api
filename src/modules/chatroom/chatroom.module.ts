import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './chatroom.entity';
import { Message } from '../message/message.entity';
import { ChatroomProfile } from './profile/chatroom.profile';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, Message]), StorageModule],
  providers: [ChatroomService, ChatroomProfile],
  controllers: [ChatroomController],
})
export class ChatroomModule {}
