import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Group } from '../group/group.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectMapper()
    private readonly classMapper: Mapper,
  ) {}

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOneOrFail({
      where: { id },
      loadRelationIds: true,
    });
  }

  async create(category: CreateCategoryDto): Promise<Category> {
    const group = await this.groupRepository.findOneOrFail({
      where: { id: category.groupId },
    });
    const newCategory = this.categoryRepository.create(category);
    newCategory.group = group;
    if (category.parentCategoryId) {
      newCategory.parent = await this.categoryRepository.findOneOrFail({
        where: { id: category.parentCategoryId },
      });
    }
    await this.categoryRepository.save(newCategory);
    return this.findOne(newCategory.id);
  }

  async update(id: string, category: UpdateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    if (category.parentCategoryId) {
      newCategory.parent = await this.categoryRepository.findOneOrFail({
        where: { id: category.parentCategoryId },
      });
    } else {
      newCategory.parent = null;
    }
    if (category.groupId) {
      newCategory.group = await this.groupRepository.findOneOrFail({
        where: { id: category.groupId },
      });
    }
    await this.categoryRepository.update(id, newCategory);
    return this.findOne(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }
}
