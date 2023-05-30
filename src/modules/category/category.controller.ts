import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { GetCategoryDto } from './dto/getCategory.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { Category } from './category.entity';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //get by id
  @Get(':id')
  @ApiResponse({ type: GetCategoryDto })
  @UseInterceptors(MapInterceptor(Category, GetCategoryDto))
  async findOne(@Param('id') id: string): Promise<GetCategoryDto> {
    return await this.categoryService.findOne(id);
  }

  //create category
  @Post()
  @ApiResponse({ type: GetCategoryDto })
  @UseInterceptors(MapInterceptor(Category, GetCategoryDto))
  async create(@Body() category: CreateCategoryDto): Promise<GetCategoryDto> {
    return this.categoryService.create(category);
  }

  //update category
  @Put(':id')
  @ApiResponse({ type: GetCategoryDto })
  @UseInterceptors(MapInterceptor(Category, GetCategoryDto))
  async update(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<GetCategoryDto> {
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
