import { Body, Controller, Param, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { GetCategoryDto } from './dto/getCategory.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { Category } from './category.entity';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';

@Crud({
  model: { type: Category },
  dto: {
    create: CreateCategoryDto,
    update: UpdateCategoryDto,
    replace: UpdateCategoryDto,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
  params: {
    id: { type: 'uuid', primary: true, disabled: false, field: 'id' },
  },
  query: {
    join: {
      group: {
        eager: false,
      },
      items: {
        eager: false,
      },
      children: {
        eager: false,
      },
      parent: {
        eager: false,
      },
    },
  },
})
@Controller('categories')
@ApiTags('Categories')
@ApiBearerAuth()
export class CategoryController implements CrudController<Category> {
  constructor(public service: CategoryService) {}

  @Override()
  @ApiResponse({ type: GetCategoryDto })
  @UseInterceptors(MapInterceptor(Category, GetCategoryDto))
  async createOne(
    @Body() category: CreateCategoryDto,
  ): Promise<GetCategoryDto> {
    return this.service.create(category);
  }

  @Override()
  @ApiResponse({ type: GetCategoryDto })
  @UseInterceptors(MapInterceptor(Category, GetCategoryDto))
  async updateOne(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<GetCategoryDto> {
    return this.service.update(id, category);
  }

  @Override()
  @ApiResponse({ type: GetCategoryDto })
  @UseInterceptors(MapInterceptor(Category, GetCategoryDto))
  async getOne(@ParsedRequest() request: CrudRequest): Promise<GetCategoryDto> {
    return this.service.getOne(request);
  }

  @Override()
  @ApiResponse({ type: GetCategoryDto, isArray: true })
  @UseInterceptors(MapInterceptor(Category, GetCategoryDto, { isArray: true }))
  async getMany(
    @ParsedRequest() request: CrudRequest,
  ): Promise<GetManyDefaultResponse<GetCategoryDto> | GetCategoryDto[]> {
    return this.service.getMany(request);
  }
}
