import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryUserDto {
  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional({ isArray: true })
  relations?: string[];
}
