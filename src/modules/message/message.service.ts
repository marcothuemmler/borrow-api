import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { GetMessageDto } from './dto/get-message.dto';
import { ChatRoom } from '../chatroom/chatroom.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async create(messageDto: CreateMessageDto) {
    const newMessage = this.messageRepository.create(messageDto);
    newMessage.room = this.chatRoomRepository.create({ id: messageDto.roomId });
    newMessage.sender = await this.userRepository.findOneByOrFail({
      id: messageDto.senderId,
    });
    newMessage.recipient = await this.userRepository.findOneByOrFail({
      id: messageDto.recipientId,
    });
    const message = await this.messageRepository.save(newMessage);
    return this.classMapper.map(message, Message, GetMessageDto);
  }

  async find(roomId: string) {
    const messages = await this.messageRepository.find({
      where: { room: { id: roomId } },
      relations: ['recipient', 'sender'],
      order: { created_at: 'ASC' },
    });
    return this.classMapper.mapArray(messages, Message, GetMessageDto);
  }
}
