import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GroupService } from './group.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGroupDto } from './dto/createGroup.dto';
import { GetGroupDto } from './dto/getGroup.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { Group } from './group.entity';
import { UpdateGroupDto } from './dto/updateGroup.dto';
import { QueryGroupDto } from './dto/queryGroupDto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('group')
@ApiTags('Group')
@ApiBearerAuth()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  //get by id
  @Get(':id')
  @ApiResponse({ type: GetGroupDto })
  @UseInterceptors(MapInterceptor(Group, GetGroupDto))
  async findOne(
    @Param('id') id: string,
    @Query() query: QueryGroupDto,
  ): Promise<GetGroupDto> {
    return await this.groupService.findOne(id, query);
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

  @Put('cover/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async putGroupCover(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const group = await this.groupService.findOne(id);
    if (!group) {
      throw new NotFoundException('Group does not exist!');
    }
    await this.groupService.putGroupImage(id, file);
  }
}
