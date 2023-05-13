import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Group } from './group.entity';
import { User } from '../user/user.entity';
import { CreateGroupDto } from './dto/createGroup.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<Group> {
    return this.groupRepository.findOneOrFail({ where: { id } });
  }

  async create(group: CreateGroupDto): Promise<Group> {
    const owner = await this.userRepository.findOneOrFail({
      where: { id: group.creatorId },
    });
    const newGroup = this.groupRepository.create(group);
    newGroup.users = [owner];
    return this.groupRepository.save(newGroup);
  }

  async update(id: string, group: Partial<Group>): Promise<Group> {
    await this.groupRepository.update(id, group);
    return this.groupRepository.findOneOrFail({ where: { id } });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.groupRepository.delete(id);
  }
}
