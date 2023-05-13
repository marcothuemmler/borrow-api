import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //get by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  //create category
  @Post()
  async create(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(category);
  }

  //update category
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<any> {
    return this.categoryService.update(id, category);
  }

  //delete category
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    //handle error if category does not exist
    const category = await this.categoryService.findOne(id);
    if (!category) {
      throw new NotFoundException('Category does not exist!');
    }
    return this.categoryService.delete(id);
  }
}
