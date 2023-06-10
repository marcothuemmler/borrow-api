import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Group } from './group.entity';
import { User } from '../user/user.entity';
import { CreateGroupDto } from './dto/createGroup.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { StorageService } from '../storage/storage.service';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class GroupService extends TypeOrmCrudService<Group> {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectMapper()
    private readonly classMapper: Mapper,
    private readonly storageService: StorageService,
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

  async putGroupImage(request: CrudRequest, file: Express.Multer.File) {
    const group = await this.getOne(request);
    if (!group) {
      throw new NotFoundException('Group does not exist!');
    }
    return await this.storageService.putObject(`group/${group.id}/cover`, file);
  }

  async addMember(id: string, userId: string) {
    const group = await this.groupRepository.findOneOrFail({
      where: { id },
      relations: ['members'],
    });
    const user = await this.userRepository.findOneByOrFail({
      id: Equal(userId),
    });
    group.members.push(user);
    await this.groupRepository.save(group);
  }
}
