import { Body, Controller, UseInterceptors } from '@nestjs/common';
import { GroupService } from './group.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/createGroup.dto';
import { GetGroupDto } from './dto/getGroup.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { Group } from './group.entity';
import { UpdateGroupDto } from './dto/updateGroup.dto';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';

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
}
