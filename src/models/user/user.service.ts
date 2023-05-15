import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { SignupDto } from '../../auth/dto/signup.dto';
import * as argon2 from 'argon2';

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

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async create(signupDto: SignupDto): Promise<User> {
    const hash = await argon2.hash(signupDto.password);
    const newUser = this.userRepository.create(signupDto);
    newUser.hash = hash;
    return this.userRepository.save(newUser);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.update(id, newUser);
    return this.findOne(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
