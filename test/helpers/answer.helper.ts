import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const answerHelper = async (app: INestApplication, accessToken: string, answer: string) => {
  const res = await request(app.getHttpServer())
    .post('/pair-game-quiz/pairs/my-current/answers')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({ answer })
    .expect(200);

  return res.body;
};
