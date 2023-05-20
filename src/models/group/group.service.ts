import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Equal, Repository } from 'typeorm';
import { Group } from './group.entity';
import { User } from '../user/user.entity';
import { CreateGroupDto } from './dto/createGroup.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { QueryGroupDto } from './dto/queryGroupDto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectMapper()
    private readonly classMapper: Mapper,
  ) {}

  async findOne(id: string, query?: QueryGroupDto): Promise<Group> {
    let relations = query?.relations;
    if (relations && !Array.isArray(relations)) {
      relations = [relations];
    }
    return await this.groupRepository.findOneOrFail({
      where: { id },
      relations: relations,
    });
  }

  async create(group: CreateGroupDto): Promise<Group> {
    const owner = await this.userRepository.findOneByOrFail({
      id: Equal(group.creatorId),
    });
    const newGroup = this.groupRepository.create(group);
    newGroup.members = [owner];
    return this.groupRepository.save(newGroup);
  }

  async update(id: string, group: Partial<Group>): Promise<Group> {
    await this.groupRepository.update(id, group);
    return this.groupRepository.findOneByOrFail({ id });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.groupRepository.delete(id);
  }
}
