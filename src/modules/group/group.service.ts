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
import { InviteMembersDto } from './dto/invite-members.dto';
import { GetGroupDto } from './dto/getGroup.dto';

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
      relations: ['members', 'invitations'],
    });
    const user = await this.userRepository.findOneOrFail({
      where: { id: Equal(userId) },
      relations: ['invitations'],
    });
    if (group.members.includes(user)) return;
    group.invitations = group.invitations.filter(
      (invitedUser) => invitedUser.id != user.id,
    );
    user.invitations.filter((invitation) => invitation.id != id);
    group.members.push(user);
    await this.userRepository.save(user);
    await this.groupRepository.save(group);
  }

  async removeMember(id: string, userId: string) {
    const group = await this.groupRepository.findOneOrFail({
      where: { id },
      relations: ['members'],
    });
    group.members = group.members.filter((member) => member.id != userId);
    if (group.members.length === 0) {
      await this.groupRepository.remove(group);
    } else {
      await this.groupRepository.save(group);
    }
  }

  async addInvitation(id: string, userId: string) {
    const group = await this.groupRepository.findOneOrFail({
      where: { id },
      relations: ['invitations'],
    });
    const user = await this.userRepository.findOneByOrFail({
      id: Equal(userId),
    });
    if (group.invitations.includes(user)) return;
    group.invitations.push(user);
    await this.groupRepository.save(group);
  }

  async removeInvitation(id: string, userId: string) {
    const group = await this.groupRepository.findOneOrFail({
      where: { id },
      relations: ['invitations'],
    });
    const user = await this.userRepository.findOneOrFail({
      where: { id: Equal(userId) },
      relations: ['invitations'],
    });
    user.invitations.filter((invitation) => invitation.id != id);
    group.invitations = group.invitations.filter(
      (invitation) => invitation.id != user.id,
    );
    await this.userRepository.save(user);
    await this.groupRepository.save(group);
  }

  async addInvitations(id: string, invitationDto: InviteMembersDto) {
    const group = await this.groupRepository.findOneOrFail({
      where: { id },
      relations: ['invitations'],
    });
    for (const email of invitationDto.emails) {
      try {
        const user = await this.userRepository.findOneOrFail({
          where: { email },
        });
        group.invitations.push(user);
      } catch (error) {}
    }
    await this.groupRepository.save(group);
  }

  async getOneByRequest(query: CrudRequest) {
    const group = await super.getOneOrFail(query);
    const dto = this.classMapper.map(group, Group, GetGroupDto);
    for (const item of dto.items || []) {
      item.imageUrl = await this.storageService.getPresignedUrlIfExists(
        `item/${item.id}/cover`,
      );
    }
    return dto;
  }
}
