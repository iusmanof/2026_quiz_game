import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export class BaseQueryParams {
  @ApiPropertyOptional({
    type: Number,
    default: 1,
    description: 'pageNumber is number of portions that should be returned',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pageNumber: number = 1;

  @ApiPropertyOptional({
    type: Number,
    default: 10,
    description: 'pageSize is portions size that should be returned',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pageSize: number = 10;

  @ApiPropertyOptional({
    enum: SortDirection,
    default: SortDirection.Desc,
  })
  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection: SortDirection = SortDirection.Desc;

  calculateSkip() {
    return (this.pageNumber - 1) * this.pageSize;
  }
}
