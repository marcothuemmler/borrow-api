import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './chatroom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  providers: [ChatroomService],
  controllers: [ChatroomController],
})
export class ChatroomModule {}
