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
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/createItem.dto';
import { GetItemDto } from './dto/getItem.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { UpdateItemDto } from './dto/updateItem.dto';

@Controller('item')
@ApiTags('Item')
@ApiBearerAuth()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  //get by id
  @Get(':id')
  @UseInterceptors(MapInterceptor(Item, GetItemDto))
  @ApiResponse({ type: GetItemDto })
  async findOne(@Param('id') id: string): Promise<GetItemDto> {
    return await this.itemService.findOne(id);
  }

  //create item
  @Post()
  @ApiResponse({ type: GetItemDto })
  @UseInterceptors(MapInterceptor(Item, GetItemDto))
  async create(@Body() item: CreateItemDto): Promise<GetItemDto> {
    return this.itemService.create(item);
  }

  //update item
  @Put(':id')
  @ApiResponse({ type: GetItemDto })
  @UseInterceptors(MapInterceptor(Item, GetItemDto))
  async update(
    @Param('id') id: string,
    @Body() item: UpdateItemDto,
  ): Promise<GetItemDto> {
    return this.itemService.update(id, item);
  }

  //delete item
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    //handle error if item does not exist
    const item = await this.itemService.findOne(id);
    if (!item) {
      throw new NotFoundException('Item does not exist!');
    }
    return this.itemService.delete(id);
  }
}
