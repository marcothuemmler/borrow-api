import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { GetMessageDto } from './dto/get-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectMapper()
    private readonly classMapper: Mapper,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    const newMessage = this.messageRepository.create(createMessageDto);
    newMessage.sender = await this.userRepository.findOneByOrFail({
      id: createMessageDto.senderId,
    });
    newMessage.recipient = await this.userRepository.findOneByOrFail({
      id: createMessageDto.recipientId,
    });
    const message = await this.messageRepository.save(newMessage);
    return this.classMapper.map(message, Message, GetMessageDto);
  }

  async find(myId: string, otherId: string) {
    const messages = await this.messageRepository.find({
      where: [
        { sender: { id: myId }, recipient: { id: otherId } },
        { sender: { id: otherId }, recipient: { id: myId } },
      ],
      relations: ['recipient', 'sender'],
      order: { created_at: 'ASC' },
    });
    return this.classMapper.mapArray(messages, Message, GetMessageDto);
  }
}
