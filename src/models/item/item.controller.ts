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
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('item')
@ApiTags('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  //get by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return await this.itemService.findOne(id);
  }

  //create item
  @Post()
  async create(@Body() item: Item): Promise<Item> {
    return this.itemService.create(item);
  }

  //update item
  @Put(':id')
  async update(@Param('id') id: string, @Body() item: Item): Promise<Item> {
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
