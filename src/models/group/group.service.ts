import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Group } from './group.entity';
import { User } from '../user/user.entity';
import { CreateGroupDto } from './dto/createGroup.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class GroupService extends TypeOrmCrudService<Group> {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectMapper()
    private readonly classMapper: Mapper,
  ) {
    super(groupRepository);
  }

  async create(group: CreateGroupDto): Promise<Group> {
    const owner = await this.userRepository.findOneByOrFail({
      id: Equal(group.creatorId),
    });
    const newGroup = this.groupRepository.create(group);
    newGroup.members = [owner];
    return this.groupRepository.save(newGroup);
  }
}
