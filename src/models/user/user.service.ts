import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectMapper()
    private readonly classMapper: Mapper,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async create(user: CreateUserDto): Promise<User> {
    // TODO: firebase / fusionAuth / ...
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    // TODO: firebase / fusionAuth / ...
    const newUser = this.userRepository.create(user);
    await this.userRepository.update(id, newUser);
    return this.findOne(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
