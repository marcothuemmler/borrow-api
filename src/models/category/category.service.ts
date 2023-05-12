import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOneOrFail({ where: { id } });
  }

  async create(category: Partial<Category>): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
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
