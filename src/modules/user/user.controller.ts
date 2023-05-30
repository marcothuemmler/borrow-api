import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { GetUserDto } from './dto/getUser.dto';
import { GetCurrentUserId } from '../../common/decorators/get-current-user-id.decorator';
import { QueryUserDto } from './dto/queryUser.dto';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current-user')
  @ApiResponse({ type: GetUserDto })
  async findCurrentUser(
    @GetCurrentUserId() id: string,
    @Query() query: QueryUserDto,
  ) {
    return await this.userService.findOneWithGroupsAndGroupImages(id, query);
  }

  //get by id
  @Get(':id')
  @ApiResponse({ type: GetUserDto })
  @UseInterceptors(MapInterceptor(User, GetUserDto))
  async findOne(@Param('id') id: string): Promise<GetUserDto> {
    return await this.userService.findOne(id);
  }

  //update user
  @Put(':id')
  @ApiResponse({ type: GetUserDto })
  @UseInterceptors(MapInterceptor(User, GetUserDto))
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<any> {
    return this.userService.update(id, user);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    //handle error if user does not exist
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.userService.delete(id);
  }
}
