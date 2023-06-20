import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GroupService } from './group.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGroupDto } from './dto/createGroup.dto';
import { GetGroupDto } from './dto/getGroup.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { Group } from './group.entity';
import { UpdateGroupDto } from './dto/updateGroup.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  GetManyDefaultResponse,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { InviteMembersDto } from './dto/invite-members.dto';

@Crud({
  model: {
    type: Group,
  },
  dto: {
    create: CreateGroupDto,
    update: UpdateGroupDto,
    replace: UpdateGroupDto,
  },
  params: {
    id: { type: 'uuid', primary: true, disabled: false, field: 'id' },
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
  query: {
    join: {
      members: {
        eager: false,
      },
      items: {
        eager: false,
      },
      'items.category': {
        eager: false,
      },
      'items.owner': {
        eager: false,
      },
      categories: {
        eager: false,
      },
    },
  },
})
@Controller('groups')
@ApiTags('Groups')
@ApiBearerAuth()
export class GroupController implements CrudController<Group> {
  constructor(public service: GroupService) {}

  @Override()
  @ApiResponse({ type: GetGroupDto })
  @UseInterceptors(MapInterceptor(Group, GetGroupDto))
  async getOne(@ParsedRequest() query: CrudRequest): Promise<GetGroupDto> {
    return this.service.getOne(query);
  }

  @Override()
  @ApiResponse({ type: GetGroupDto, isArray: true })
  @UseInterceptors(MapInterceptor(Group, GetGroupDto, { isArray: true }))
  async getMany(
    @ParsedRequest() query: CrudRequest,
  ): Promise<GetManyDefaultResponse<GetGroupDto> | GetGroupDto[]> {
    return this.service.getMany(query);
  }

  @Override()
  @ApiResponse({ type: GetGroupDto })
  @UseInterceptors(MapInterceptor(Group, GetGroupDto))
  async createOne(@Body() group: CreateGroupDto): Promise<GetGroupDto> {
    return this.service.create(group);
  }

  @Override()
  @ApiResponse({ type: GetGroupDto })
  @UseInterceptors(MapInterceptor(Group, GetGroupDto))
  async updateOne(
    @ParsedRequest() query: CrudRequest,
    @Body() group: UpdateGroupDto,
  ): Promise<GetGroupDto> {
    return this.service.updateOne(query, group);
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
    await this.service.putGroupImage(request, file);
  }

  @Put(':id/members/:userId')
  async addMember(@Param('id') id: string, @Param('userId') userId: string) {
    await this.service.addMember(id, userId);
  }

  @Put(':id/invitations')
  async addInvitations(
    @Param('id') id: string,
    @Body() invitations: InviteMembersDto,
  ) {
    await this.service.addInvitations(id, invitations);
  }

  @Delete(':id/members/:userId')
  async removeMember(@Param('id') id: string, @Param('userId') userId: string) {
    await this.service.removeMember(id, userId);
  }

  @Delete(':id/invitations/:userId')
  async removeInvitation(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    await this.service.removeInvitation(id, userId);
  }
}
