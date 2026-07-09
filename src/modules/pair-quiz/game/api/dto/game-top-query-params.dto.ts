import { Transform, Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, Matches, Min } from 'class-validator';

export class GameTopQueryParamsDto {
  @Transform(({ value }: { value: string | string[] | undefined }) => {
    if (value === undefined) return undefined;
    return Array.isArray(value) ? value : [value];
  })
  @IsArray()
  @IsOptional()
  @Matches(/^(avgScores|sumScore|gamesCount|winsCount|lossesCount|drawsCount)\s+(asc|desc)$/i, {
    each: true,
  })
  sort: string[] = ['avgScores desc', 'sumScore desc'];

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pageNumber: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pageSize: number = 10;
}
