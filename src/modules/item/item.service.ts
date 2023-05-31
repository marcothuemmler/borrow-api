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
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ItemService extends TypeOrmCrudService<Item> {
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
  ) {
    super(itemRepository);
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
    return this.itemRepository.findOneOrFail({ where: { id: newItem.id } });
  }
}
