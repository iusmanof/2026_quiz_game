import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { getBasicAuthHeaderHelper } from '../helpers/get-basic-auth-header.helper';
import { createQuestionHelper } from '../helpers/create-question.helper';

describe('Questions e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });
  beforeEach(async () => {
    await request(app.getHttpServer()).delete('/testing/all-data').expect(204);
  });

  it('should return 401', async () => {
    await request(app.getHttpServer()).get('/sa/quiz/questions').expect(401);
  });

  it('GET /quiz/questions basic auth', async () => {
    const response = await request(app.getHttpServer())
      .get('/sa/quiz/questions')
      .set('Authorization', getBasicAuthHeaderHelper())
      .expect(200);

    expect(response.body).toEqual({
      pagesCount: expect.any(Number),
      page: expect.any(Number),
      pageSize: expect.any(Number),
      totalCount: expect.any(Number),
      items: expect.any(Array),
    });
  });

  it('POST /quiz/questions with basic auth', async () => {
    await createQuestionHelper(app);

    const getRes = await request(app.getHttpServer())
      .get('/sa/quiz/questions')
      .set('Authorization', getBasicAuthHeaderHelper())
      .expect(200);

    expect(getRes.body.items).toHaveLength(1);
    expect(getRes.body.items[0]).toMatchObject({
      body: 'Question',
      correctAnswers: ['answer'],
      published: false,
    });
  });

  it('DELETE /sa/quiz/questions/{id}', async () => {
    const question = await createQuestionHelper(app);
    const id = question.id;

    request(app.getHttpServer())
      .delete(`/sa/quiz/questions/${id}`)
      .set('Authorization', getBasicAuthHeaderHelper())
      .expect(201);

    await request(app.getHttpServer())
      .get(`/sa/quiz/questions/${id}`)
      .set('Authorization', getBasicAuthHeaderHelper())
      .expect(404);
  });

  it('PUT /sa/quiz/questions/{id}', async () => {
    const question = await createQuestionHelper(app);
    const id = question.id;

    await request(app.getHttpServer())
      .put(`/sa/quiz/questions/${id}/publish`)
      .set('Authorization', getBasicAuthHeaderHelper())
      .send({
        published: true,
      })
      .expect(204);
  });

  it('PUT /sa/quiz/questions/{id}/publish', async () => {
    const question = await createQuestionHelper(app);
    const id = question.id;

    await request(app.getHttpServer()).put(`/sa/quiz/questions/${id}`);
  });

  afterAll(async () => {
    await app.close();
  });
});
