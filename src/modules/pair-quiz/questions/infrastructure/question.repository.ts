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

  async findById(id: string) {
    return this.dataSource.getRepository(Question).findOne({
      where: { id },
    });
  }

  async create(createQuestionDto: CreateQuestionDto) {
    const repo = this.dataSource.getRepository(Question);

    const question = repo.create({
      body: createQuestionDto.body,
      correctAnswers: createQuestionDto.correctAnswers,
    });
    await repo.save(question);
    return question;
  }

  async delete(id: string) {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Question)
      .where('id = :id', { id: id })
      .execute();
  }

  async update(id: string, dto: UpdateQuestionDto) {
    await this.dataSource
      .createQueryBuilder()
      .update(Question)
      .set({ body: dto.body, correctAnswers: dto.correctAnswers, updatedAt: new Date() })
      .where('id = :id', { id })
      .execute();
  }

  async setPublished(id: string, dto: PublishedQuestionDto) {
    await this.dataSource
      .createQueryBuilder()
      .update(Question)
      .set({
        published: dto.published,
        updatedAt: new Date(),
      })
      .where('id = :id', { id })
      .execute();
  }

  async deleteAllQuestion() {
    await this.dataSource.createQueryBuilder().delete().from(Question).execute();
  }
}

export default QuestionRepository;
