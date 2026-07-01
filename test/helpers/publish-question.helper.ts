import { INestApplication } from '@nestjs/common';
import { getBasicAuthHeaderHelper } from './get-basic-auth-header.helper';
import request from 'supertest';
import { QuestionViewModel } from '@modules/pair-quiz/questions/api/view/question.view-model';

export const publishQuestionHelper = async (
  app: INestApplication,
  questionId: string,
  published = true,
): Promise<void> => {
  const res = await request(app.getHttpServer())
    .put(`/sa/quiz/questions/${questionId}/publish`)
    .set('Authorization', getBasicAuthHeaderHelper())
    .send({ published });

  expect(res.status).toBe(204);
};

export const publishQuestionsHelper = async (
  app: INestApplication,
  questions: QuestionViewModel[],
) => {
  for (const question of questions) {
    await publishQuestionHelper(app, question.id);
  }
};
