import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Group } from '../group/group.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

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
    return this.categoryRepository.save(newCategory);
  }

  async update(id: string, category: Partial<Category>): Promise<Category> {
    await this.categoryRepository.update(id, category);
    return this.categoryRepository.findOneOrFail({ where: { id } });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }
}
