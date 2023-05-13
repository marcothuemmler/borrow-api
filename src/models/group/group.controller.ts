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
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/createGroup.dto';

@Controller('group')
@ApiTags('Group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  //get by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Group> {
    return await this.groupService.findOne(id);
  }

  //create group
  @Post()
  async create(@Body() group: CreateGroupDto): Promise<Group> {
    return this.groupService.create(group);
  }

  //update group
  @Put(':id')
  async update(@Param('id') id: string, @Body() group: Group): Promise<any> {
    return this.groupService.update(id, group);
  }

  //delete group
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    //handle error if group does not exist
    const group = await this.groupService.findOne(id);
    if (!group) {
      throw new NotFoundException('Group does not exist!');
    }
    return this.groupService.delete(id);
  }
}
