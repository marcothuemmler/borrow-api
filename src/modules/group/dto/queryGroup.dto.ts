import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryGroupDto {
  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional({ isArray: true })
  relations?: string[];
}
