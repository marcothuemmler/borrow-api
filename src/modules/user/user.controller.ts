import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { GetUserDto } from './dto/getUser.dto';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  GetManyDefaultResponse,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { FileInterceptor } from '@nestjs/platform-express';

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
    return await this.service.findOneWithProfileImage(request);
  }

  @Get('/with-groups/:id')
  @UseInterceptors(CrudRequestInterceptor)
  async getOneWithGroupsAndGroupImages(
    @ParsedRequest() request: CrudRequest,
  ): Promise<GetUserDto> {
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
  async putUserImage(
    @ParsedRequest() request: CrudRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.service.putUserImage(request, file);
  }

  @Override()
  async deleteOne(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
