import { INestApplication } from '@nestjs/common';
import { CreateQuestionDto } from '@modules/pair-quiz/questions/api/dto/create-question.dto';
import { QuestionViewModel } from '@modules/pair-quiz/questions/api/view/question.view-model';
import request from 'supertest';
import { getBasicAuthHeaderHelper } from './get-basic-auth-header.helper';

export const createQuestionHelper = async (
  app: INestApplication,
  dto: CreateQuestionDto = {
    body: 'Question',
    correctAnswers: ['answer'],
  },
): Promise<QuestionViewModel> => {
  const res = await request(app.getHttpServer())
    .post('/sa/quiz/questions')
    .set('Authorization', getBasicAuthHeaderHelper())
    .send(dto)
    .expect(201);

  return res.body as QuestionViewModel;
};
