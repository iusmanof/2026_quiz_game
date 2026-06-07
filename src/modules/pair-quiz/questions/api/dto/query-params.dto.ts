import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseQueryParams } from '@core/dto/base.query-params.dto';

export enum SortBy {
  CreatedAt = 'createdAt',
}

export enum PublishedStatus {
  All = 'all',
  Published = 'published',
  NotPublished = 'notPublished',
}

export class QueryParamsDto extends BaseQueryParams {
  @IsEnum(SortBy)
  @IsOptional()
  sortBy: SortBy = SortBy.CreatedAt;

  @IsString()
  @IsOptional()
  bodySearchTerm?: string;

  @IsEnum(PublishedStatus)
  @IsOptional()
  publishedStatus: PublishedStatus = PublishedStatus.All;
}
