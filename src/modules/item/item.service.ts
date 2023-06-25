import { Injectable, NotFoundException } from '@nestjs/common';
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
import { CrudRequest } from '@nestjsx/crud';
import { GetItemDto } from './dto/getItem.dto';
import { StorageService } from '../storage/storage.service';
import { UpdateItemDto } from './dto/updateItem.dto';

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
    private readonly storageService: StorageService,
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

  async patchOne(id: string, itemDto: UpdateItemDto | Partial<Item>) {
    const item = await this.itemRepository.findOneByOrFail({ id });
    const newItem = { ...item, ...itemDto };
    if (itemDto instanceof UpdateItemDto) {
      newItem.category = this.categoryRepository.create({
        id: itemDto.categoryId,
      });
    }
    return await this.itemRepository.save(newItem);
  }

  async getOneWithImageAndOwnerAvatar(req: CrudRequest): Promise<GetItemDto> {
    const item = await super.getOne(req);
    const dto = this.classMapper.map(item, Item, GetItemDto);
    dto.owner.imageUrl = await this.storageService.getPresignedUrlIfExists(
      `user/${item.owner.id}/cover`,
    );
    dto.imageUrl = await this.storageService.getPresignedUrlIfExists(
      `item/${item.id}/cover`,
    );
    return dto;
  }

  async putItemImage(request: CrudRequest, file: Express.Multer.File) {
    const item = await this.getOne(request);
    if (!item) {
      throw new NotFoundException('Item does not exist!');
    }
    return await this.storageService.putObject(`item/${item.id}/cover`, file);
  }

  async deleteItemImage(id: string) {
    await this.storageService.removeObject(`item/${id}/cover`);
  }
}
