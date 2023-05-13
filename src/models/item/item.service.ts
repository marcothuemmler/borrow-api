import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { Category } from '../category/category.entity';
import { Group } from '../group/group.entity';
import { CreateItemDto } from './dto/createItem.dto';
import { User } from '../user/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectMapper()
    private readonly classMapper: Mapper,
  ) {}

  async findOne(id: string): Promise<Item> {
    return this.itemRepository.findOneOrFail({
      where: { id },
      loadRelationIds: true,
    });
  }

  async create(item: CreateItemDto): Promise<Item> {
    const group = await this.groupRepository.findOneOrFail({
      where: { id: item.groupId },
    });
    const user = await this.userRepository.findOneOrFail({
      where: { id: item.ownerId },
    });
    const category = await this.categoryRepository.findOneOrFail({
      where: { id: item.categoryId },
    });
    const newItem = this.itemRepository.create(item);
    newItem.group = group;
    newItem.owner = user;
    newItem.category = category;
    return this.itemRepository.save(newItem);
  }

  async update(id: string, item: Partial<Item>): Promise<Item> {
    await this.itemRepository.update(id, item);
    return this.itemRepository.findOneOrFail({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
