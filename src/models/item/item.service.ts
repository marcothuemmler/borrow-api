import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Item } from './item.entity';
import { Category } from '../category/category.entity';
import { Group } from '../group/group.entity';
import { CreateItemDto } from './dto/createItem.dto';
import { User } from '../user/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UpdateItemDto } from './dto/updateItem.dto';

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
      relations: ['owner', 'category'],
    });
  }

  async findByGroupId(groupId: string): Promise<Item[]> {
    return await this.itemRepository.find({
      where: { group: { id: groupId } },
      relations: ['owner', 'category'],
    });
  }

  async create(item: CreateItemDto): Promise<Item> {
    const newItem = this.itemRepository.create(item);
    newItem.group = await this.groupRepository.findOneByOrFail({
      id: Equal(item.groupId),
    });
    newItem.owner = await this.userRepository.findOneByOrFail({
      id: Equal(item.ownerId),
    });
    newItem.category = await this.categoryRepository.findOneByOrFail({
      id: Equal(item.categoryId),
    });
    await this.itemRepository.save(newItem);
    return this.findOne(newItem.id);
  }

  async update(id: string, item: UpdateItemDto): Promise<Item> {
    const newItem = this.itemRepository.create(item);
    newItem.category = await this.categoryRepository.findOneByOrFail({
      id: Equal(item.categoryId),
    });
    await this.itemRepository.update(id, newItem);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
