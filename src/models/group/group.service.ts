import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async findOne(id: string): Promise<Group> {
    return this.groupRepository.findOneOrFail({ where: { id } });
  }

  async create(group: Partial<Group>): Promise<Group> {
    const newGroup = this.groupRepository.create(group);
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
