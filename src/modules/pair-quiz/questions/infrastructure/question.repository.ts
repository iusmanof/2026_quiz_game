import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Question } from '@modules/pair-quiz/questions/domain/question.entity';
import { CreateQuestionDto } from '@modules/pair-quiz/questions/api/dto/create-question.dto';
import { UpdateQuestionDto } from '@modules/pair-quiz/questions/api/dto/update-question.dto';
import { PublishedQuestionDto } from '@modules/pair-quiz/questions/api/dto/published-question.dto';

@Injectable()
class QuestionRepository {
  constructor(
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const repo = this.dataSource.getRepository(Question);

    const question = repo.create({
      body: createQuestionDto.body,
      correctAnswers: createQuestionDto.correctAnswers,
    });
    await repo.save(question);
  }

  async delete(id: number) {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Question)
      .where('id = :id', { id: id })
      .execute();
  }

  async update(id: number, dto: UpdateQuestionDto) {
    await this.dataSource
      .createQueryBuilder()
      .update(Question)
      .set({ body: dto.body, correctAnswers: dto.correctAnswers })
      .where('id = :id', { id })
      .execute();
  }

  async setPublished(id: number, dto: PublishedQuestionDto) {
    await this.dataSource
      .createQueryBuilder()
      .update(Question)
      .set({ published: dto.published })
      .where('id = :id', { id })
      .execute();
  }

  async deleteAll() {
    await this.dataSource.createQueryBuilder().delete().from(Question).execute();
  }
}

export default QuestionRepository;
