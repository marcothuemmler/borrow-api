import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { SignupDto } from '../../auth/dto/signup.dto';
import * as argon2 from 'argon2';
import { QueryUserDto } from './dto/queryUser.dto';
import { GetUserDto } from './dto/getUser.dto';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectMapper()
    private readonly classMapper: Mapper,
    private readonly minioService: MinioService,
  ) {}

  async findOne(id: string, query?: QueryUserDto): Promise<User> {
    let relations = query?.relations;
    if (relations && !Array.isArray(relations)) {
      relations = [relations];
    }
    return await this.userRepository.findOneOrFail({
      where: { id },
      relations: relations,
    });
  }

  async findOneWithGroupsAndGroupImages(
    id: string,
    query?: QueryUserDto,
  ): Promise<GetUserDto> {
    let relations = query?.relations;
    if (relations && !Array.isArray(relations)) {
      relations = [relations];
    }
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: relations,
    });
    const userDto = this.classMapper.map(user, User, GetUserDto);
    if (userDto.groups) {
      for (const group of userDto.groups) {
        try {
          const objectName = `group/${group.id}/cover`;
          await this.minioService.client.statObject(
            process.env.MINIO_BUCKET_NAME,
            objectName,
          );
          group.imageUrl = await this.minioService.client.presignedUrl(
            'GET',
            process.env.MINIO_BUCKET_NAME,
            objectName,
          );
        } catch (ignored) {}
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
    return this.findOne(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
