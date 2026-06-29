import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { getBasicAuthHeaderHelper } from './get-basic-auth-header.helper';
import { CreateQuestionDto } from '@modules/pair-quiz/questions/api/dto/create-question.dto';
import { QuestionViewModel } from '@modules/pair-quiz/questions/api/view/question.view-model';

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

  expect(res.body).toEqual({
    id: expect.any(String),
    body: 'Question',
    correctAnswers: ['answer'],
    published: false,
    createdAt: expect.any(String),
    updatedAt: null,
  });

  return res.body as QuestionViewModel;
};
