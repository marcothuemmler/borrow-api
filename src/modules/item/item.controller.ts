import {
  Body,
  Controller,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateItemDto } from './dto/createItem.dto';
import { GetItemDto } from './dto/getItem.dto';
import { MapInterceptor } from '@automapper/nestjs';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  GetManyDefaultResponse,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { UpdateItemDto } from './dto/updateItem.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Crud({
  model: { type: Item },
  dto: { create: CreateItemDto, update: UpdateItemDto, replace: UpdateItemDto },
  params: {
    id: { type: 'uuid', primary: true, disabled: false, field: 'id' },
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
  query: {
    join: {
      group: {
        eager: false,
      },
      category: {
        eager: false,
      },
      owner: {
        eager: false,
      },
    },
  },
})
@Controller('items')
@ApiTags('Items')
@ApiBearerAuth()
export class ItemController implements CrudController<Item> {
  constructor(public service: ItemService) {}

  @Override()
  @ApiResponse({ type: GetItemDto })
  @UseInterceptors(MapInterceptor(Item, GetItemDto))
  async createOne(@Body() item: CreateItemDto): Promise<GetItemDto> {
    return this.service.create(item);
  }

  @Override()
  @ApiResponse({ type: GetItemDto })
  getOne(@ParsedRequest() query: CrudRequest): Promise<GetItemDto> {
    return this.service.getOneWithOwnerAvatar(query);
  }

  @Override()
  @ApiResponse({ type: GetItemDto })
  @UseInterceptors(MapInterceptor(Item, GetItemDto))
  async updateOne(
    @Param('id') id: string,
    @Body() item: UpdateItemDto | Partial<Item>,
  ): Promise<GetItemDto> {
    return await this.service.patchOne(id, item);
  }

  @Override()
  @ApiResponse({ type: GetItemDto, isArray: true })
  @UseInterceptors(MapInterceptor(Item, GetItemDto, { isArray: true }))
  async getMany(
    @ParsedRequest() query: CrudRequest,
  ): Promise<GetManyDefaultResponse<GetItemDto> | GetItemDto[]> {
    return this.service.getMany(query);
  }

  @UseInterceptors(FileInterceptor('file'), CrudRequestInterceptor)
  @ApiParam({ name: 'id', type: 'string' })
  @Put('cover/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          required: ['file'],
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async putGroupImage(
    @ParsedRequest() request: CrudRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.service.putItemImage(request, file);
  }
}
