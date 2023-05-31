import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Equal, Repository } from 'typeorm';
import { Group } from '../group/group.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectMapper()
    private readonly classMapper: Mapper,
  ) {
    super(categoryRepository);
  }

  async create(category: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    newCategory.group = await this.groupRepository.findOneByOrFail({
      id: Equal(category.groupId),
    });
    newCategory.parent = await this.categoryRepository.findOneBy({
      id: Equal(category.parentId),
    });
    await this.categoryRepository.save(newCategory);
    return this.categoryRepository.findOneOrFail({
      where: { id: newCategory.id },
    });
  }

  async update(id: string, category: UpdateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    newCategory.parent = await this.categoryRepository.findOneBy({
      id: Equal(category.parentId),
    });
    if (category.groupId) {
      newCategory.group = await this.groupRepository.findOneByOrFail({
        id: Equal(category.groupId),
      });
    }
    await this.categoryRepository.update(id, newCategory);
    return this.categoryRepository.findOneOrFail({ where: { id } });
  }
}
