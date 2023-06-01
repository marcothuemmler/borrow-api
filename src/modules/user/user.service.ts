import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { SignupDto } from '../../auth/dto/signup.dto';
import * as argon2 from 'argon2';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { GetUserDto } from './dto/getUser.dto';
import { StorageService } from '../storage/storage.service';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectMapper()
    private readonly classMapper: Mapper,
    private readonly storageService: StorageService,
  ) {
    super(userRepository);
  }

  async findOneWithGroupsAndGroupImages(
    request: CrudRequest,
  ): Promise<GetUserDto> {
    const user = await super.getOne(request);
    const userDto = this.classMapper.map(user, User, GetUserDto);
    if (userDto.groups) {
      for (const group of userDto.groups) {
        group.imageUrl = await this.storageService.getPresignedUrlIfExists(
          `group/${group.id}/cover`,
        );
      }
    }
    return userDto;
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
    return this.userRepository.findOneOrFail({ where: { id } });
  }
}
