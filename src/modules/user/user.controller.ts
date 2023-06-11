import { Body, Controller, Param, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { GetUserDto } from './dto/getUser.dto';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';

@Crud({
  model: { type: User },
  dto: {
    update: UpdateUserDto,
    replace: UpdateUserDto,
  },
  params: {
    id: { type: 'uuid', primary: true, disabled: false, field: 'id' },
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase', 'createOneBase'],
  },
  query: {
    join: {
      groups: {
        eager: false,
      },
      items: {
        eager: false,
      },
    },
  },
})
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @Override()
  @ApiResponse({ type: GetUserDto })
  async getOne(@ParsedRequest() request: CrudRequest): Promise<GetUserDto> {
    return await this.service.findOneWithGroupsAndGroupImages(request);
  }

  @Override()
  @ApiResponse({ type: GetUserDto })
  @UseInterceptors(MapInterceptor(User, GetUserDto, { isArray: true }))
  async getMany(
    @ParsedRequest() request: CrudRequest,
  ): Promise<GetManyDefaultResponse<GetUserDto> | GetUserDto[]> {
    return await this.service.getMany(request);
  }

  @Override()
  @ApiResponse({ type: GetUserDto })
  @UseInterceptors(MapInterceptor(User, GetUserDto))
  async updateOne(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<GetUserDto> {
    return this.service.update(id, user);
  }
}
