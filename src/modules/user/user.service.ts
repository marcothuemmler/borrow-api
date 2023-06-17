import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
import { Group } from '../group/group.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
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

  async delete(id: string, password: string) {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: ['groups', 'groups.members'],
    });
    const passwordMatches = await argon2.verify(user.hash, password);
    if (!passwordMatches) {
      throw new UnauthorizedException();
    }
    for (const group of user.groups) {
      if (group.members.length === 1) {
        await this.groupRepository.remove(group);
      }
    }
    await this.userRepository.remove(user);
  }

  async putUserImage(request: CrudRequest, file: Express.Multer.File) {
    const user = await this.getOne(request);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return await this.storageService.putObject(`user/${user.id}/cover`, file);
  }

  async findOneWithProfileImage(request: CrudRequest) {
    const user = await super.getOne(request);
    const userDto = this.classMapper.map(user, User, GetUserDto);
    userDto.imageUrl = await this.storageService.getPresignedUrlIfExists(
      `user/${user.id}/cover`,
    );
    return userDto;
  }

  async deleteUserImage(id: string) {
    await this.storageService.removeObject(`user/${id}/cover`);
  }
}
