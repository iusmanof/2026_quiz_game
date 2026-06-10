import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseQueryParams } from '@core/dto/base.query-params.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum SortBy {
  CreatedAt = 'createdAt',
  body = 'body',
  correctAnswers = 'correctAnswers',
}

export enum PublishedStatus {
  All = 'all',
  Published = 'published',
  NotPublished = 'notPublished',
}

export class QueryParamsDto extends BaseQueryParams {
  @ApiPropertyOptional({
    enum: SortBy,
    default: SortBy.CreatedAt,
  })
  @IsEnum(SortBy)
  @IsOptional()
  sortBy: SortBy = SortBy.CreatedAt;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  bodySearchTerm?: string;

  @ApiPropertyOptional({
    enum: PublishedStatus,
    default: PublishedStatus.All,
  })
  @IsEnum(PublishedStatus)
  @IsOptional()
  publishedStatus: PublishedStatus = PublishedStatus.All;
}
