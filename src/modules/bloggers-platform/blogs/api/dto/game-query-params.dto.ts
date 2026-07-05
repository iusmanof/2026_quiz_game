import { BaseQueryParams } from '@core/dto/base.query-params.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { PostsSortBy } from '@modules/bloggers-platform/posts/api/dto/posts-query-params.dto';

export enum GameSortBy {
  PairCreatedDate = 'pairCreatedDate',
}

export class GameQueryParamsDto extends BaseQueryParams {
  @IsEnum(PostsSortBy)
  @IsOptional()
  sortBy: GameSortBy = GameSortBy.PairCreatedDate;
}
