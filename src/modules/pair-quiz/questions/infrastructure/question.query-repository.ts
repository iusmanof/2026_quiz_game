import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryParamsDto } from '@modules/pair-quiz/questions/api/dto/query-params.dto';

@Injectable()
export class QuestionQueryRepository {
  constructor(
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {}

  async getAll(query: QueryParamsDto) {
    return { items: 1, totalCount: 2 };
  }
}
