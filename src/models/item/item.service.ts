import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { Category } from '../category/category.entity';
import { Group } from '../group/group.entity';
import { CreateItemDto } from './dto/createItem.dto';
import { User } from '../user/user.entity';

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
  ) {}

  async findOne(id: string): Promise<Item> {
    return this.itemRepository.findOneOrFail({ where: { id } });
  }

  async create(item: CreateItemDto): Promise<Item> {
    const category = await this.categoryRepository.findOneOrFail({
      where: { id: item.categoryId },
    });
    const user = await this.userRepository.findOneOrFail({
      where: { id: item.ownerId },
    });
    const newItem = this.itemRepository.create(item);
    newItem.category = category;
    newItem.group = category.group;
    user.items = [...(user.items || []), newItem];
    await this.userRepository.save(user);
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
