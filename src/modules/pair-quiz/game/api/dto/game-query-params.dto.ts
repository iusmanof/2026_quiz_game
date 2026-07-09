import { BaseQueryParams } from '@core/dto/base.query-params.dto';
import { IsEnum, IsOptional } from 'class-validator';

export enum GameSortBy {
  PairCreatedDate = 'pairCreatedDate',
  Status = 'status',
}

export class GameQueryParamsDto extends BaseQueryParams {
  @IsOptional()
  @IsEnum(GameSortBy)
  sortBy: GameSortBy = GameSortBy.PairCreatedDate;
}
