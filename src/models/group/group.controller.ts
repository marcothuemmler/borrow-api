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
import { GroupService } from './group.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/createGroup.dto';
import { GetGroupDto } from './dto/getGroup.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { Group } from './group.entity';
import { UpdateGroupDto } from './dto/updateGroup.dto';

@Controller('group')
@ApiTags('Group')
@ApiBearerAuth()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  //get by id
  @Get(':id')
  @ApiResponse({ type: GetGroupDto })
  @UseInterceptors(MapInterceptor(Group, GetGroupDto))
  async findOne(@Param('id') id: string): Promise<GetGroupDto> {
    return await this.groupService.findOne(id);
  }

  //create group
  @Post()
  @ApiResponse({ type: GetGroupDto })
  @UseInterceptors(MapInterceptor(Group, GetGroupDto))
  async create(@Body() group: CreateGroupDto): Promise<GetGroupDto> {
    return this.groupService.create(group);
  }

  //update group
  @Put(':id')
  @ApiResponse({ type: GetGroupDto })
  @UseInterceptors(MapInterceptor(Group, GetGroupDto))
  async update(
    @Param('id') id: string,
    @Body() group: UpdateGroupDto,
  ): Promise<any> {
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
