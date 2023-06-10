import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { User } from '../user/user.entity';
import { MessageGateway } from './message.gateway';
import { MessageProfile } from './profile/message.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User])],
  providers: [MessageService, MessageGateway, MessageProfile],
})
export class MessageModule {}
