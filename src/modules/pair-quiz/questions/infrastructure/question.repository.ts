import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Question } from '@modules/pair-quiz/questions/domain/question.entity';
import { CreateQuestionDto } from '@modules/pair-quiz/questions/api/dto/create-question.dto';

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
}

export default QuestionRepository;
